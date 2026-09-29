#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -n "${TEST_MONGODB_URI:-}" ]]; then
  exec npm exec -- vitest run --config "$project_dir/vitest.integration.config.mts"
fi

if ! command -v mongod >/dev/null 2>&1; then
  echo "MongoDB integration tests require mongod or TEST_MONGODB_URI." >&2
  exit 1
fi

test_db_dir="$(mktemp -d /tmp/burmese-stem-test.XXXXXX)"
test_db_port="$(node -e 'const net=require("node:net");const server=net.createServer();server.listen(0,"127.0.0.1",()=>{process.stdout.write(String(server.address().port));server.close();});')"
mongod_pid=""

cleanup() {
  if [[ -n "$mongod_pid" ]]; then
    kill "$mongod_pid" >/dev/null 2>&1 || true
    wait "$mongod_pid" >/dev/null 2>&1 || true
  fi
  case "$test_db_dir" in
    /tmp/burmese-stem-test.*) rm -rf -- "$test_db_dir" ;;
    *) echo "Refusing to remove unexpected temporary path: $test_db_dir" >&2 ;;
  esac
}
trap cleanup EXIT INT TERM

mongod \
  --dbpath "$test_db_dir" \
  --port "$test_db_port" \
  --bind_ip 127.0.0.1 \
  --logpath "$test_db_dir/mongod.log" \
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
' "$test_db_port"

export TEST_MONGODB_URI="mongodb://127.0.0.1:${test_db_port}/burmese_stem_refinement_test"
npm exec -- vitest run --config "$project_dir/vitest.integration.config.mts"
