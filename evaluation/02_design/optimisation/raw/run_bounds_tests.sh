#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
app_dir="$repo_dir/burmese_stem_ai"
config_file="$repo_dir/evaluation/02_design/optimisation/raw/vitest.bounds.config.mts"

if ! command -v mongod >/dev/null 2>&1; then
  echo "Bounds analysis requires the local mongod executable." >&2
  exit 1
fi

bounds_db_dir="$(mktemp -d /tmp/burmese-stem-bounds.XXXXXX)"
bounds_db_port="$(node -e 'const net=require("node:net");const server=net.createServer();server.listen(0,"127.0.0.1",()=>{process.stdout.write(String(server.address().port));server.close();});')"
mongod_pid=""

cleanup() {
  if [[ -n "$mongod_pid" ]]; then
    kill "$mongod_pid" >/dev/null 2>&1 || true
    wait "$mongod_pid" >/dev/null 2>&1 || true
  fi
  case "$bounds_db_dir" in
    /tmp/burmese-stem-bounds.*) rm -rf -- "$bounds_db_dir" ;;
    *) echo "Refusing to remove unexpected temporary path: $bounds_db_dir" >&2 ;;
  esac
}
trap cleanup EXIT INT TERM

mongod \
  --dbpath "$bounds_db_dir" \
  --port "$bounds_db_port" \
  --bind_ip 127.0.0.1 \
  --logpath "$bounds_db_dir/mongod.log" \
  --quiet &
mongod_pid="$!"

node -e '
const net = require("node:net");
const port = Number(process.argv[1]);
const deadline = Date.now() + 10000;
function connect() {
  const socket = net.createConnection({ host: "127.0.0.1", port });
  socket.once("connect", () => { socket.end(); process.exit(0); });
  socket.once("error", () => {
    socket.destroy();
    if (Date.now() >= deadline) process.exit(1);
    setTimeout(connect, 100);
  });
}
connect();
' "$bounds_db_port"

export TEST_MONGODB_URI="mongodb://127.0.0.1:${bounds_db_port}/burmese_stem_bounds_test"
echo "BND_RUN_META database=burmese_stem_bounds_test host=127.0.0.1 port=${bounds_db_port} db_dir=${bounds_db_dir} cleanup=trap"
echo "BND_RUN_META node=$(node --version) npm=$(npm --version) mongod=$(mongod --version | head -n 1)"
cd "$app_dir"
npm exec -- vitest run --config "$config_file" --reporter=verbose
