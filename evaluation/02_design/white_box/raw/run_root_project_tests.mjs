import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const app = path.join(root, 'burmese_stem_ai');
const run = path.join(root, 'evaluation/02_design/white_box/raw/RUN-B01-20261002-ROOTTESTS-02');
const baseline = '37faefa236829aa3d79e023faa1fb72a086b5c2a';
const mode = process.argv[2];
if (!['unit', 'integration', 'verify'].includes(mode)) throw new Error('Use unit, integration or verify');
fs.mkdirSync(run, { recursive: true });
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => { const file = path.join(dir, entry.name); return entry.isDirectory() ? walk(file) : [file]; }); }
const tracked = execFileSync('git', ['ls-files', 'burmese_stem_ai'], { cwd: root, encoding: 'utf8' }).trim().split('\n');
const production = tracked.filter(file => !file.startsWith('burmese_stem_ai/tests/') && !/^burmese_stem_ai\/vitest\./.test(file) && file !== 'burmese_stem_ai/scripts/run-integration-tests.sh');
const productionHashes = {};
for (const file of production) {
  const expected = hash(execFileSync('git', ['show', baseline + ':' + file], { cwd: root }));
  const actual = hash(fs.readFileSync(path.join(root, file)));
  assert.equal(actual, expected, 'Production changed: ' + file);
  productionHashes[file] = actual;
}
const testFiles = [...walk(path.join(app, 'tests')), path.join(app, 'vitest.config.mts'), path.join(app, 'vitest.integration.config.mts'), path.join(app, 'scripts/run-integration-tests.sh')];
const testHashes = Object.fromEntries(testFiles.map(file => [path.relative(root, file), hash(fs.readFileSync(file))]));
const metadataFile = path.join(run, 'metadata.json');
if (!fs.existsSync(metadataFile)) fs.writeFileSync(metadataFile, JSON.stringify({ runId: path.basename(run), baseline: 'B01 production code with project test/config version ROOTTESTS-02', productionCommit: baseline, head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), startedAt: new Date().toISOString(), timezone: 'Pacific/Auckland', cwd: app, node: process.version, npm: execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim(), vitest: JSON.parse(fs.readFileSync(path.join(app, 'node_modules/vitest/package.json'))).version, productionHashes, testHashes, worktree: execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' }), sourceCopiesCreated: 0, externalProviderCalls: 0, sourceUsed: 'Root burmese_stem_ai project' }, null, 2) + '\n', { flag: 'wx' });
const env = { ...process.env, OPENAI_API_KEY: '', OPENAI_MODEL: 'controlled-test', DB_URL: '', TEST_MONGODB_URI: '', TEST_EVIDENCE_DIRECTORY: '', NO_COLOR: '1' };
delete env.FORCE_COLOR;
async function command(id, args, phaseEnv = env) {
  const file = path.join(run, id + '.log');
  if (fs.existsSync(file)) throw new Error('Refusing to overwrite ' + file);
  const log = fs.createWriteStream(file, { flags: 'wx' });
  const startedAt = new Date().toISOString();
  log.write('$ npm ' + args.join(' ') + '\n');
  const child = spawn('npm', args, { cwd: app, env: phaseEnv, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', data => log.write(data)); child.stderr.on('data', data => log.write(data));
  const exitCode = await new Promise(resolve => { child.on('error', error => { log.write(String(error)); resolve(-1); }); child.on('exit', resolve); });
  await new Promise(resolve => log.end(resolve));
  const result = { id, command: ['npm', ...args], cwd: app, startedAt, endedAt: new Date().toISOString(), exitCode, log: path.relative(root, file) };
  fs.appendFileSync(path.join(run, 'commands.jsonl'), JSON.stringify(result) + '\n'); console.log(JSON.stringify(result));
  assert.equal(exitCode, 0, 'Failed command; retained log: ' + file);
}
if (mode === 'unit') {
  await command('01-unit', ['test', '--', '--reporter=default', '--reporter=json', '--outputFile=' + path.join(run, '01-unit.json')]);
  await command('02-project-coverage', ['run', 'test:coverage', '--', '--reporter=default', '--reporter=json', '--outputFile=' + path.join(run, '02-project-coverage.json')]);
  fs.cpSync(path.join(app, 'coverage'), path.join(run, 'coverage'), { recursive: true, errorOnExist: true, force: false });
  await command('03-lint', ['run', 'lint']);
  await command('04-typescript', ['exec', '--', 'tsc', '--noEmit', '--incremental', 'false']);
} else if (mode === 'integration') {
  await command('05-integration', ['run', 'test:integration'], { ...env, TEST_EVIDENCE_DIRECTORY: path.join(run, '05-integration') });
  await command('06-all', ['run', 'test:all'], { ...env, TEST_EVIDENCE_DIRECTORY: path.join(run, '06-all') });
} else {
  const reports = ['01-unit.json', '02-project-coverage.json'].map(file => JSON.parse(fs.readFileSync(path.join(run, file))));
  for (const report of reports) { assert.equal(report.numTotalTests, 361); assert.equal(report.numPassedTests, 361); assert.equal(report.numFailedTests, 0); assert.equal(report.numPendingTests, 0); }
  const commands = fs.readFileSync(path.join(run, 'commands.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line));
  assert.equal(commands.length, 6); for (const result of commands) assert.equal(result.exitCode, 0);
  for (const phase of ['05-integration', '06-all']) {
    const log = fs.readFileSync(path.join(run, phase + '.log'), 'utf8');
    assert.match(log, /12 passed \(12\)/);
    const records = fs.readFileSync(path.join(run, phase, 'database-observations.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line));
    assert.equal(records.length, 7);
    for (const record of records) for (const session of record.sessions) { assert.ok(session.adaptationRound <= 2); assert.ok(session.adaptations.length <= 2); assert.ok(session.followUps.length <= 2); }
  }
  const coverage = JSON.parse(fs.readFileSync(path.join(run, 'coverage/coverage-summary.json')));
  const files = Object.keys(coverage).filter(file => file !== 'total');
  for (const prefix of ['app/', 'components/', 'services/', 'data/', 'lib/', 'i18n/']) assert.ok(files.some(file => file.startsWith(path.join(app, prefix))), prefix);
  assert.ok(files.includes(path.join(app, 'proxy.ts'))); assert.ok(files.includes(path.join(app, 'data/tx/index.js')));
  const original = JSON.parse(fs.readFileSync(metadataFile));
  assert.deepEqual(original.productionHashes, productionHashes);
  const documentationChanges = [];
  assert.deepEqual(Object.keys(original.testHashes).sort(), Object.keys(testHashes).sort());
  for (const [file, expected] of Object.entries(original.testHashes)) {
    if (file === 'burmese_stem_ai/tests/README.md' && testHashes[file] !== expected) {
      documentationChanges.push({ file, recordedHash: expected, currentHash: testHashes[file] });
    } else assert.equal(testHashes[file], expected, 'Executable test/config changed: ' + file);
  }
  const result = { verification: 'Pass', checkedAt: new Date().toISOString(), deterministicTests: 361, integrationTests: 12, testsSkipped: 0, productionFilesVerified: production.length, productionChanges: 0, sourceCopiesCreated: 0, applicationCoverageFiles: files.length, coverage: coverage.total, documentationChanges, note: 'Checks retained execution evidence; does not rerun tests or rewrite original metadata.' };
  if (process.argv.includes('--record-cleanup')) fs.writeFileSync(path.join(run, 'verification_after_cleanup.json'), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(result));
}
if (mode !== 'verify') {
  const metadata = JSON.parse(fs.readFileSync(metadataFile)); metadata.lastPhaseEndedAt = new Date().toISOString(); fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + '\n');
}
