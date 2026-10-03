import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const raw = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(raw, '../../../..');
const app = path.join(root, 'burmese_stem_ai'), run = path.join(raw, 'RUN-B01-20261003-SCENARIO-02');
const hash = input => crypto.createHash('sha256').update(input).digest('hex');
const previous = JSON.parse(fs.readFileSync(path.join(root, 'evaluation/02_design/informed_argument/raw/ARG-RUN-01-input-verification.json')));
for (const [file, expected] of Object.entries(previous.productionHashes)) assert.equal(hash(fs.readFileSync(path.join(root, file))), expected, file);
if (fs.existsSync(run)) throw new Error('Refusing to overwrite run');
fs.mkdirSync(path.join(run, 'screenshots'), { recursive: true });
const save = (name, value) => fs.writeFileSync(path.join(run, name), JSON.stringify(value, null, 2) + '\n');
const require = createRequire(path.join(app, 'package.json'));
require('@next/env').loadEnvConfig(app, false);
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-key-here') throw new Error('Live provider not configured; credentials not recorded');
const freePort = async () => {
  const server = net.createServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port; await new Promise(resolve => server.close(resolve)); return port;
};
const dbPort = await freePort(), appPort = await freePort(), dbDir = fs.mkdtempSync('/tmp/burmese-scenario-');
const dbUrl = `mongodb://127.0.0.1:${dbPort}/burmese_scenario_test`, browserUrl = `http://scenario-b01.localhost:${appPort}`;
const metadata = { runId: path.basename(run), method: 'DA-SCN', baseline: 'B01 production / ROOTTESTS-02 test profile', sourceCommit: previous.productionSourceCommit,
  head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), startedAt: new Date().toISOString(), timezone: 'Pacific/Auckland',
  node: process.version, npm: execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim(), mongodb: execFileSync('mongod', ['--version'], { encoding: 'utf8' }).split('\n')[0],
  buildId: fs.readFileSync(path.join(app, '.next/BUILD_ID'), 'utf8').trim(), browserUrl, dbUrl, dbDir, productionHashes: previous.productionHashes,
  protocolHash: hash(fs.readFileSync(path.join(root, 'evaluation/00_protocol/evaluation_protocol.md'))),
  masterPlanHash: hash(fs.readFileSync(path.join(root, 'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md'))),
  referenceHash: hash(fs.readFileSync(path.join(root, 'evaluation/02_design/simulation/content_reference_notes.md'))),
  worktreeAtStart: execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' }),
  provider: { mode: 'Live forwarded unchanged; no fixtures; public HTTP/proxy and browser with real isolated MongoDB', model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
    url: 'https://api.openai.com/v1/responses', timeoutMs: 20000, store: false, strictJsonSchema: true, automaticRetries: false },
  evaluator: 'Codex technical scenario execution and provisional content observations; not a human participant or qualified independent reviewer',
  sourceCopiesCreated: 0, identity: 'Dedicated artificial browser identity; learner UUID/cookie removed from exported evidence' };
save('metadata.json', metadata);
fs.copyFileSync(path.join(root, 'evaluation/00_protocol/evaluation_protocol.md'), path.join(run, 'protocol_at_execution.md'));
const waitPort = async port => {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try { await new Promise((resolve, reject) => { const socket = net.connect(port, '127.0.0.1'); socket.once('connect', () => { socket.end(); resolve(); }); socket.once('error', reject); }); return; }
    catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  } throw new Error('Server startup timeout');
};
const mongo = spawn('mongod', ['--dbpath', dbDir, '--port', String(dbPort), '--bind_ip', '127.0.0.1', '--logpath', path.join(dbDir, 'mongod.log'), '--quiet'], { stdio: 'ignore' });
const log = fs.openSync(path.join(run, 'app-console.log'), 'a');
let next; const mongoose = require('mongoose');
try {
  await waitPort(dbPort);
  await mongoose.connect(dbUrl);
  assert.equal(await mongoose.connection.db.collection('sessions').countDocuments(), 0);
  assert.equal(await mongoose.connection.db.collection('profiles').countDocuments(), 0);
  await mongoose.disconnect();
  next = spawn(process.execPath, ['--require', path.join(raw, 'live_capture.cjs'), path.join(app, 'node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(appPort)],
    { cwd: app, env: { ...process.env, DB_URL: dbUrl, SCENARIO_RUN_DIRECTORY: run }, stdio: ['ignore', log, log] });
  await waitPort(appPort);
  console.log(JSON.stringify({ status: 'ready', browserUrl, run }));
  while (!fs.existsSync(path.join(run, 'finish.flag'))) await new Promise(resolve => setTimeout(resolve, 500));
  await mongoose.connect(dbUrl);
  const clean = value => JSON.parse(JSON.stringify(value, (key, item) => key === 'learnerId' ? 'SCENARIO-LEARNER-01' : item));
  save('database_snapshot.json', clean({ sessions: await mongoose.connection.db.collection('sessions').find({}).toArray(), profiles: await mongoose.connection.db.collection('profiles').find({}).toArray() }));
  for (const [file, expected] of Object.entries(metadata.productionHashes)) assert.equal(hash(fs.readFileSync(path.join(root, file))), expected, file);
  metadata.finishedAt = new Date().toISOString(); metadata.productionUnchangedAfterRun = true; save('metadata.json', metadata);
} finally {
  if (mongoose.connection.readyState) await mongoose.disconnect();
  if (next) next.kill('SIGTERM'); mongo.kill('SIGTERM'); fs.closeSync(log);
  console.log('Stopped isolated scenario servers; synthetic database retained at ' + dbDir);
}
