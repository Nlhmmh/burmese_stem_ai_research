// Resume only this run's isolated synthetic database for an explicit Back check.
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const prior = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
const addendum = { purpose: 'Explicit desktop/mobile Back activation after main inspection; no provider call expected', startedAt: new Date().toISOString(), browserUrl: prior.browserUrl, dbUrl: prior.dbUrl, sourceCopiesCreated: 0 };
const file = path.join(run, 'navigation_addendum_metadata.json');
if (fs.existsSync(file)) throw new Error('Refusing to overwrite addendum');
fs.writeFileSync(file, JSON.stringify(addendum, null, 2) + '\n', { flag: 'wx' });
const dbPort = new URL(prior.dbUrl).port, appPort = new URL(prior.browserUrl).port;
const wait = async port => {
  for (let attempt = 0; attempt < 200; attempt++) {
    try { await new Promise((resolve, reject) => { const s = net.connect(port, '127.0.0.1'); s.once('connect', () => { s.end(); resolve(); }); s.once('error', reject); }); return; }
    catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  throw new Error('Startup timeout');
};
const logs = fs.openSync(path.join(run, 'navigation_addendum_server.log'), 'a');
const mongo = spawn('mongod', ['--dbpath', prior.dbDir, '--port', dbPort, '--bind_ip', '127.0.0.1', '--logpath', path.join(prior.dbDir, 'mongod-addendum.log'), '--quiet'], { stdio: 'ignore' });
let next;
try {
  await wait(dbPort);
  next = spawn(process.execPath, ['--require', path.join(raw, 'provider-hook.cjs'), path.join(root, 'burmese_stem_ai/node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', appPort], { cwd: path.join(root, 'burmese_stem_ai'), env: { ...process.env, DB_URL: prior.dbUrl, OPENAI_API_KEY: 'inspection-dummy-not-a-secret', OPENAI_MODEL: 'controlled-inspection', BB_RUN_DIRECTORY: run }, stdio: ['ignore', logs, logs] });
  await wait(appPort); console.log('Navigation addendum ready: ' + prior.browserUrl);
  while (!fs.existsSync(path.join(run, 'finish_addendum.flag'))) await new Promise(resolve => setTimeout(resolve, 500));
  addendum.finishedAt = new Date().toISOString(); fs.writeFileSync(file, JSON.stringify(addendum, null, 2) + '\n');
} finally { if (next) next.kill('SIGTERM'); mongo.kill('SIGTERM'); fs.closeSync(logs); console.log('Addendum servers stopped'); }
