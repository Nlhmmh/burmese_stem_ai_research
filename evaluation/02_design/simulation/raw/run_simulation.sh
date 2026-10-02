#!/usr/bin/env bash
set -euo pipefail
repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
app_dir="$repo_dir/burmese_stem_ai"
raw_dir="$repo_dir/evaluation/02_design/simulation/raw"
git -C "$repo_dir" diff --exit-code 37faefa236829aa3d79e023faa1fb72a086b5c2a -- burmese_stem_ai
if [[ -e "$raw_dir/SIM-RUN-01-results.jsonl" ]]; then
  echo "Refusing to overwrite an existing simulation run. Use a new run ID." >&2
  exit 1
fi
simulation_db_dir="$(mktemp -d /tmp/burmese-stem-simulation.XXXXXX)"
simulation_db_port="$(node -e 'const s=require("node:net").createServer();s.listen(0,"127.0.0.1",()=>{process.stdout.write(String(s.address().port));s.close();});')"
simulation_mongod_pid=""
cleanup() {
  if [[ -n "$simulation_mongod_pid" ]]; then
    kill "$simulation_mongod_pid" >/dev/null 2>&1 || true
    wait "$simulation_mongod_pid" >/dev/null 2>&1 || true
  fi
  echo "SIM_CLEANUP isolated server stopped; temporary data retained at $simulation_db_dir"
}
trap cleanup EXIT INT TERM
mongod --dbpath "$simulation_db_dir" --port "$simulation_db_port" --bind_ip 127.0.0.1 --logpath "$simulation_db_dir/mongod.log" --quiet &
simulation_mongod_pid="$!"
node -e '
const net=require("node:net"),port=Number(process.argv[1]),deadline=Date.now()+10000;
function ready(){const s=net.createConnection({host:"127.0.0.1",port});s.once("connect",()=>{s.end();process.exit(0)});s.once("error",()=>{s.destroy();if(Date.now()>deadline)process.exit(1);setTimeout(ready,100)})}ready();
' "$simulation_db_port"
export TEST_MONGODB_URI="mongodb://127.0.0.1:${simulation_db_port}/burmese_stem_simulation_test"
echo "SIM_RUN_META uri=$TEST_MONGODB_URI db_dir=$simulation_db_dir"
echo "SIM_RUN_META node=$(node --version) npm=$(npm --version) mongo=$(mongod --version | head -n 1) head=$(git -C "$repo_dir" rev-parse HEAD)"
cd "$app_dir"
npm exec -- vitest run --config "$raw_dir/vitest.simulation.config.mts" --reporter=verbose
