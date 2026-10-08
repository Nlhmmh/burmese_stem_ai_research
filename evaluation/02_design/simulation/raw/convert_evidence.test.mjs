import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { combineEvidence } from './convert_evidence.mjs';

const script = fileURLToPath(new URL('./convert_evidence.mjs', import.meta.url));
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'simulation-evidence-converter-'));
  const raw = path.join(directory, 'raw'); fs.mkdirSync(raw);
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const rows = [{ id: 'SIM01-B', steps: [{ response: { content: 'မြန်မာ' } }], contentOutcome: 'Not assessed' },
    { id: 'SIM14-A', technicalOutcome: 'Controlled ambiguity', finalStoredState: [] }];
  const providers = [{ caseId: 'SIM01-B', step: 'initial', request: { input: 'line 1\nline 2' } },
    { caseId: 'SIM14-A', step: 'initial', response: { output: [] } }];
  for (const [file, data] of [['SIM-RUN-01-results.jsonl', rows], ['SIM-RUN-01-provider.jsonl', providers]]) {
    fs.writeFileSync(path.join(raw, file), data.map(row => JSON.stringify(row)).join('\n') + '\n');
  }
  fs.writeFileSync(path.join(directory, 'human_content_scores.csv'),
    '"case_id","output_id","rationale","content_outcome"\n"SIM01-B","initial","မြန်မာ, ""quoted""\nsecond line","Partial"\n');
  return { directory, raw, rows, providers };
}

test('preserves execution logs without importing human judgements', t => {
  const { raw, rows, providers } = fixture(t);
  const evidence = combineEvidence(raw);
  assert.deepEqual(evidence.includedCounts, { cases: 2, simulationRecords: 2, providerRecords: 2 });
  assert.deepEqual(evidence.cases['SIM01-B'].simulationRecords[0],
    { source: { file: 'SIM-RUN-01-results.jsonl', line: 1 }, record: rows[0] });
  assert.deepEqual(evidence.cases['SIM01-B'].providerRecords[0].record, providers[0]);
  assert.equal(evidence.cases['SIM01-B'].simulationRecords[0].record.contentOutcome, 'Not assessed');
  assert.equal(Object.hasOwn(evidence.cases['SIM01-B'], 'contentAssessments'), false);
  assert.equal(evidence.sources.length, 2);
  assert.ok(evidence.sources.every(source => source.file.endsWith('.jsonl')));
  fs.writeFileSync(path.join(raw, '../human_content_scores.csv'), 'not valid CSV');
  assert.deepEqual(combineEvidence(raw), evidence);
});

test('case-only copy keeps the requested case and rejects unknown IDs', t => {
  const { raw } = fixture(t);
  assert.deepEqual(Object.keys(combineEvidence(raw, 'SIM01-B').cases), ['SIM01-B']);
  assert.throws(() => combineEvidence(raw, 'SIM99-A'), /No records found/);
  assert.throws(() => combineEvidence(raw, '../SIM01-B'), /Use a case ID/);
});

test('malformed JSON and orphan provider records fail instead of being dropped', t => {
  const { raw } = fixture(t);
  const file = path.join(raw, 'SIM-RUN-01-provider.jsonl');
  fs.writeFileSync(file, '{broken\n');
  assert.throws(() => combineEvidence(raw), /invalid JSON/);
  fs.writeFileSync(file, '{"caseId":"SIM99-A"}\n');
  assert.throws(() => combineEvidence(raw), /unknown simulation case/);
});

test('CLI exports every case, reruns safely and leaves all sources unchanged', t => {
  const { directory, raw } = fixture(t);
  const files = ['SIM-RUN-01-results.jsonl', 'SIM-RUN-01-provider.jsonl', '../human_content_scores.csv'];
  const originals = files.map(file => fs.readFileSync(path.join(raw, file)));
  const output = path.join(directory, 'readable', 'evidence_by_case.json');
  const args = [script, '--run-dir', raw, '--output', output];
  execFileSync(process.execPath, args); execFileSync(process.execPath, args);
  assert.deepEqual(fs.readdirSync(path.dirname(output)).sort(), ['SIM01-B.json', 'SIM14-A.json', 'evidence_by_case.json']);
  for (const id of ['SIM01-B', 'SIM14-A']) {
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(path.dirname(output), `${id}.json`))), combineEvidence(raw, id));
  }
  files.forEach((file, i) => assert.deepEqual(fs.readFileSync(path.join(raw, file)), originals[i]));
});

test('CLI exports just one selected case and never overwrites conflicting output', t => {
  const { directory, raw } = fixture(t);
  const output = path.join(directory, 'readable', 'SIM01-B.json');
  const args = [script, '--run-dir', raw, '--case', 'SIM01-B', '--output', output];
  execFileSync(process.execPath, args);
  assert.deepEqual(fs.readdirSync(path.dirname(output)), ['SIM01-B.json']);
  fs.writeFileSync(output, 'keep existing');
  assert.throws(() => execFileSync(process.execPath, args, { stdio: 'pipe' }), /Choose a new --output/);
  assert.equal(fs.readFileSync(output, 'utf8'), 'keep existing');
});

test('--refresh removes imported review fields only from recognised, unchanged generated evidence', t => {
  const { directory, raw } = fixture(t);
  const output = path.join(directory, 'readable', 'SIM01-B.json');
  const next = combineEvidence(raw, 'SIM01-B');
  const previous = structuredClone(next);
  previous.format = 'simulation-evidence-by-case-v1';
  previous.cases['SIM01-B'].contentAssessments = [{ record: { content_outcome: 'Partial' } }];
  fs.mkdirSync(path.dirname(output));
  fs.writeFileSync(output, JSON.stringify(previous));
  const args = [script, '--run-dir', raw, '--case', 'SIM01-B', '--output', output, '--refresh'];
  execFileSync(process.execPath, args);
  assert.deepEqual(JSON.parse(fs.readFileSync(output)), next);
  previous.cases['SIM01-B'].simulationRecords[0].record.steps = [];
  const edited = JSON.stringify(previous);
  fs.writeFileSync(output, edited);
  assert.throws(() => execFileSync(process.execPath, args, { stdio: 'pipe' }), /changed execution records/);
  assert.equal(fs.readFileSync(output, 'utf8'), edited);
});
