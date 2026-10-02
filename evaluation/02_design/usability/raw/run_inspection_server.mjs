import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const raw = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(raw, '../../../..');
const app = path.join(root, 'burmese_stem_ai');
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const baseline = '37faefa236829aa3d79e023faa1fb72a086b5c2a';
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
if (fs.existsSync(run)) throw new Error('Refusing to overwrite run');
const tracked = execFileSync('git', ['ls-files', 'burmese_stem_ai'], { cwd: root, encoding: 'utf8' }).trim().split('\n');
const production = tracked.filter(file => !file.startsWith('burmese_stem_ai/tests/') && !/^burmese_stem_ai\/vitest\./.test(file) && file !== 'burmese_stem_ai/scripts/run-integration-tests.sh');
const productionHashes = {};
for (const file of production) {
  const actual = hash(fs.readFileSync(path.join(root, file)));
  assert.equal(actual, hash(execFileSync('git', ['show', baseline + ':' + file], { cwd: root })), file);
  productionHashes[file] = actual;
}
fs.mkdirSync(path.join(run, 'screenshots'), { recursive: true });
const write = (name, value) => fs.writeFileSync(path.join(run, name), JSON.stringify(value, null, 2) + '\n');
write('control.json', { mode: 'ready', label: 'usability', delayMs: 1500 });
const freePort = async () => {
  const server = net.createServer();
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const value = server.address().port; await new Promise(resolve => server.close(resolve)); return value;
};
const dbPort = await freePort(), appPort = await freePort();
const dbDir = fs.mkdtempSync('/tmp/burmese-usability-');
const dbUrl = `mongodb://127.0.0.1:${dbPort}/burmese_usability_inspection`;
const browserUrl = `http://ui-b01.localhost:${appPort}`;
const metadata = { runId: path.basename(run), baseline: 'B01 production / ROOTTESTS-02 test profile', sourceCommit: baseline, head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), startedAt: new Date().toISOString(), timezone: 'Pacific/Auckland', node: process.version, npm: execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim(), mongodb: execFileSync('mongod', ['--version'], { encoding: 'utf8' }).split('\n')[0], buildId: fs.readFileSync(path.join(app, '.next/BUILD_ID'), 'utf8').trim(), browserUrl, dbUrl, dbDir, productionHashes, lockHash: productionHashes['burmese_stem_ai/package-lock.json'], protocolHash: hash(fs.readFileSync(path.join(root, 'evaluation/00_protocol/evaluation_protocol.md'))), worktree: execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' }), provider: 'Controlled fixtures; dummy key; zero external calls; generated-content quality not assessed', sourceCopiesCreated: 0, evaluator: 'Codex technical inspection under user direction; not a participant study or qualified independent language review' };
write('metadata.json', metadata);
const waitPort = async port => {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try { await new Promise((resolve, reject) => { const s = net.connect(port, '127.0.0.1'); s.once('connect', () => { s.end(); resolve(); }); s.once('error', reject); }); return; }
    catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  throw new Error('Server startup timeout');
};
const mongo = spawn('mongod', ['--dbpath', dbDir, '--port', String(dbPort), '--bind_ip', '127.0.0.1', '--logpath', path.join(dbDir, 'mongod.log'), '--quiet'], { stdio: 'ignore' });
const logs = fs.openSync(path.join(run, 'app-console.log'), 'a');
let next;
const require = createRequire(path.join(app, 'package.json'));
const mongoose = require('mongoose');
try {
  await waitPort(dbPort);
  next = spawn(process.execPath, ['--require', path.join(raw, 'provider-hook.cjs'), path.join(app, 'node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(appPort)], { cwd: app, env: { ...process.env, DB_URL: dbUrl, OPENAI_API_KEY: 'inspection-dummy-not-a-secret', OPENAI_MODEL: 'controlled-inspection', BB_RUN_DIRECTORY: run }, stdio: ['ignore', logs, logs] });
  await waitPort(appPort);
  console.log(JSON.stringify({ status: 'ready', browserUrl, run }));
  while (!fs.existsSync(path.join(run, 'finish.flag'))) await new Promise(resolve => setTimeout(resolve, 500));
  await mongoose.connect(dbUrl);
  write('database_snapshot.json', { sessions: await mongoose.connection.db.collection('sessions').find({}).toArray(), profiles: await mongoose.connection.db.collection('profiles').find({}).toArray() });
  metadata.finishedAt = new Date().toISOString(); write('metadata.json', metadata);
} finally {
  if (mongoose.connection.readyState) await mongoose.disconnect();
  if (next) next.kill('SIGTERM'); mongo.kill('SIGTERM'); fs.closeSync(logs);
  console.log('Stopped isolated servers; synthetic database retained at ' + dbDir);
}
