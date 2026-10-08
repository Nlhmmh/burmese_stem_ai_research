import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const app = path.join(root, 'burmese_stem_ai');
const runId = process.argv[2];
assert.match(runId ?? '', /^RUN-B01-\d{8}-COVERAGE-\d{2}$/);
const run = path.join(root, 'evaluation/02_design/white_box/raw', runId);
assert.ok(!fs.existsSync(run), 'Use a new run ID. Saved evidence must not be overwritten.');
const priorRun = 'RUN-B01-20261008-COVERAGE-03';
const prior = JSON.parse(fs.readFileSync(path.join(path.dirname(run), priorRun, 'metadata.json')));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function verifyProduction() {
  for (const [file, expected] of Object.entries(prior.productionHashes)) {
    assert.equal(hash(path.join(root, file)), expected, 'Production changed: ' + file);
  }
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
verifyProduction();
fs.mkdirSync(run);
const testHashes = Object.fromEntries([
  ...walk(path.join(app, 'tests')),
  path.join(app, 'vitest.config.mts'), path.join(app, 'vitest.integration.config.mts')
].map(file => [path.relative(root, file), hash(file)]));
const metadata = {
  runId, source: 'Root burmese_stem_ai application',
  productionCommit: prior.productionCommit,
  head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  worktree: execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' }),
  startedAt: new Date().toISOString(), timezone: 'Pacific/Auckland',
  node: process.version,
  npm: execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim(),
  vitest: JSON.parse(fs.readFileSync(path.join(app, 'node_modules/vitest/package.json'))).version,
  productionHashes: prior.productionHashes, testHashes,
  dependencyLockSha256: hash(path.join(app, 'package-lock.json')),
  sourceCopiesCreated: 0, liveProviderCalls: 0, previousRunPreserved: priorRun,
  integration: { rerun: false, retainedRun: priorRun, passedTests: 12 },
  notes: [
    'Production code and coverage scope are unchanged.',
    'Unknown helper errors are injected at the LLM boundary, not observed live-provider errors.',
    'This run executes deterministic tests, coverage, lint and TypeScript only.'
  ]
};
fs.writeFileSync(path.join(run, 'metadata.json'), JSON.stringify(metadata, null, 2) + '\n', { flag: 'wx' });
const env = { ...process.env, OPENAI_API_KEY: '', OPENAI_MODEL: 'controlled-test', DB_URL: '', TEST_MONGODB_URI: '', NO_COLOR: '1' };
delete env.FORCE_COLOR;
async function command(id, args) {
  const file = path.join(run, id + '.log');
  const log = fs.createWriteStream(file, { flags: 'wx' });
  const startedAt = new Date().toISOString();
  log.write('$ npm ' + args.join(' ') + '\n');
  const child = spawn('npm', args, { cwd: app, env, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', data => log.write(data));
  child.stderr.on('data', data => log.write(data));
  const exitCode = await new Promise(resolve => {
    child.on('error', error => { log.write(String(error)); resolve(-1); });
    child.on('exit', resolve);
  });
  await new Promise(resolve => log.end(resolve));
  const result = { id, command: ['npm', ...args], cwd: app, startedAt,
    endedAt: new Date().toISOString(), exitCode, log: path.relative(root, file) };
  fs.appendFileSync(path.join(run, 'commands.jsonl'), JSON.stringify(result) + '\n');
  console.log(JSON.stringify(result));
  assert.equal(exitCode, 0, 'Failed check; see ' + file);
}
await command('01-unit', ['test', '--', '--reporter=default', '--reporter=json', '--outputFile=' + path.join(run, '01-unit.json')]);
await command('02-coverage', ['run', 'test:coverage', '--', '--reporter=default', '--reporter=json', '--outputFile=' + path.join(run, '02-coverage.json')]);
fs.copyFileSync(path.join(app, 'coverage/coverage-summary.json'), path.join(run, 'coverage-summary.json'), fs.constants.COPYFILE_EXCL);
await command('03-lint', ['run', 'lint', '--', '--max-warnings', '0']);
await command('04-typescript', ['exec', '--', 'tsc', '--noEmit', '--incremental', 'false']);
verifyProduction();
for (const [file, expected] of Object.entries(testHashes)) {
  assert.equal(hash(path.join(root, file)), expected, 'Test changed during execution: ' + file);
}
const unit = JSON.parse(fs.readFileSync(path.join(run, '01-unit.json')));
const covered = JSON.parse(fs.readFileSync(path.join(run, '02-coverage.json')));
for (const report of [unit, covered]) {
  assert.equal(report.numFailedTests, 0);
  assert.equal(report.numPendingTests, 0);
  assert.equal(report.numPassedTests, report.numTotalTests);
}
assert.equal(unit.numTotalTests, covered.numTotalTests);
const summary = JSON.parse(fs.readFileSync(path.join(run, 'coverage-summary.json')));
const adaptation = summary[path.join(app, 'services/adaptation.service.ts')];
const result = {
  result: 'Pass', endedAt: new Date().toISOString(),
  deterministicTests: unit.numTotalTests,
  deterministicFiles: unit.testResults.length, skippedTests: unit.numPendingTests,
  integrationTestsRerun: 0, retainedIntegrationRun: priorRun,
  productionFilesVerified: Object.keys(prior.productionHashes).length,
  productionChanges: 0, sourceCopiesCreated: 0,
  coverage: summary.total,
  coverageEntries: Object.keys(summary).length - 1,
  adaptationServiceCoverage: adaptation
};
fs.writeFileSync(path.join(run, 'verification.json'), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify(result));
