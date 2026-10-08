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
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bb-evidence-converter-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const http = [
    { caseId: 'setup', data: { preferences: null } },
    { caseId: 'BB06', request: { overallSupportNeed: 'high' }, providerCalls: 0,
      before: { sessions: [] }, after: { sessions: [{ content: 'မြန်မာ', round: 0 }] } },
  ];
  const provider = [
    { label: 'BB06', mode: 'ready', instructions: 'First line\nSecond line', input: { question: 'cell' } },
    { label: 'UI29-initial-error', mode: 'non2xx' },
    { label: 'BB08-addendum', mode: 'ready' },
  ];
  for (const [name, rows] of [['http.jsonl', http], ['provider.jsonl', provider]]) {
    fs.writeFileSync(path.join(directory, name), rows.map(row => JSON.stringify(row)).join('\n') + '\n');
  }
  return { directory, http, provider };
}

test('all records and fields are retained with exact labels and source lines', t => {
  const { directory, http, provider } = fixture(t);
  const result = combineEvidence(directory);
  assert.deepEqual(result.includedCounts,
    { cases: 1, otherGroups: 3, httpRecords: 2, providerRecords: 3 });
  assert.deepEqual(result.cases.BB06.httpRecords[0],
    { source: { file: 'http.jsonl', line: 2 }, record: http[1] });
  assert.deepEqual(result.cases.BB06.providerRecords[0].record, provider[0]);
  assert.deepEqual(result.otherRecords.setup.httpRecords[0].record, http[0]);
  assert.deepEqual(result.otherRecords['UI29-initial-error'].providerRecords[0].record, provider[1]);
  assert.deepEqual(result.otherRecords['BB08-addendum'].providerRecords[0].record, provider[2]);
  assert.equal(result.cases.BB08, undefined);
  assert.ok(result.sources.every(source => /^[a-f0-9]{64}$/.test(source.sha256)));
  assert.deepEqual(combineEvidence(directory), result);
});

test('case-only export is clearly marked and rejects missing or invalid case IDs', t => {
  const { directory } = fixture(t);
  const result = combineEvidence(directory, 'BB06');
  assert.deepEqual(result.includedCounts,
    { cases: 1, otherGroups: 0, httpRecords: 1, providerRecords: 1 });
  assert.deepEqual(result.otherRecords, {});
  assert.equal(result.sources[0].records, 2);
  assert.match(result.scope, /Only BB06/);
  assert.throws(() => combineEvidence(directory, 'BB99'), /No records found/);
  assert.throws(() => combineEvidence(directory, '../BB06'), /Use a case ID/);
});

test('invalid records fail with a source line instead of being silently dropped', t => {
  const { directory } = fixture(t);
  fs.appendFileSync(path.join(directory, 'http.jsonl'), '{broken\n');
  assert.throws(() => combineEvidence(directory), /http.jsonl, line 3: invalid JSON/);
  fs.writeFileSync(path.join(directory, 'http.jsonl'), '{}\n');
  assert.throws(() => combineEvidence(directory), /missing record label/);
});

test('CLI produces formatted JSON, leaves sources unchanged and refuses different output', t => {
  const { directory } = fixture(t);
  const output = path.join(directory, 'readable.json');
  const original = ['http.jsonl', 'provider.jsonl'].map(file => fs.readFileSync(path.join(directory, file)));
  const args = [script, '--run-dir', directory, '--output', output];
  execFileSync(process.execPath, args);
  const bytes = fs.readFileSync(output, 'utf8');
  assert.equal(bytes, JSON.stringify(combineEvidence(directory), null, 2) + '\n');
  execFileSync(process.execPath, args);
  assert.equal(fs.readFileSync(output, 'utf8'), bytes);
  for (const [index, file] of ['http.jsonl', 'provider.jsonl'].entries()) {
    assert.deepEqual(fs.readFileSync(path.join(directory, file)), original[index]);
  }
  fs.writeFileSync(output, 'do not replace');
  assert.throws(() => execFileSync(process.execPath, args, { stdio: 'pipe' }), /Choose a new --output/);
  assert.equal(fs.readFileSync(output, 'utf8'), 'do not replace');
});

test('default CLI creates a separate file for every case, including zero-provider cases', t => {
  const { directory } = fixture(t);
  fs.appendFileSync(path.join(directory, 'http.jsonl'), JSON.stringify(
    { caseId: 'BB11', providerCalls: 0, data: { adaptationRound: 2 } }) + '\n');
  const output = path.join(directory, 'readable', 'evidence_by_case.json');
  const args = [script, '--run-dir', directory, '--output', output];
  execFileSync(process.execPath, args);
  assert.deepEqual(fs.readdirSync(path.dirname(output)).sort(),
    ['BB06.json', 'BB11.json', 'evidence_by_case.json']);
  for (const caseId of ['BB06', 'BB11']) {
    const actual = JSON.parse(fs.readFileSync(path.join(path.dirname(output), `${caseId}.json`)));
    assert.deepEqual(actual, combineEvidence(directory, caseId));
  }
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(path.dirname(output), 'BB11.json')))
    .cases.BB11.providerRecords, []);
  execFileSync(process.execPath, args);
});

test('--case creates only the selected case file', t => {
  const { directory } = fixture(t);
  const output = path.join(directory, 'one-case', 'BB06.json');
  execFileSync(process.execPath,
    [script, '--run-dir', directory, '--case', 'BB06', '--output', output]);
  assert.deepEqual(fs.readdirSync(path.dirname(output)), ['BB06.json']);
  assert.deepEqual(JSON.parse(fs.readFileSync(output)), combineEvidence(directory, 'BB06'));
});

test('case-file conflicts are detected before any export is written', t => {
  const { directory } = fixture(t);
  const output = path.join(directory, 'evidence_by_case.json');
  const existingCase = path.join(directory, 'BB06.json');
  fs.writeFileSync(existingCase, 'keep this file');
  assert.throws(() => execFileSync(process.execPath,
    [script, '--run-dir', directory, '--output', output], { stdio: 'pipe' }), /Choose a new --output/);
  assert.equal(fs.existsSync(output), false);
  assert.equal(fs.readFileSync(existingCase, 'utf8'), 'keep this file');
});
