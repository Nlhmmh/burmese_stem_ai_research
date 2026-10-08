import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { buildEvaluation, writeExports } from './convert_readable_evidence.mjs';

const design = path.dirname(fileURLToPath(import.meta.url));
const read = file => fs.readFileSync(path.join(design, file), 'utf8');
const jsonl = file => read(file).trim().split('\n').map(JSON.parse);
const builds = Object.fromEntries(['dynamic', 'optimisation', 'static', 'usability'].map(name => [name, buildEvaluation(name)]));

test('all 80 cases have the recorded outcome, conditions and original report locator', () => {
  for (const [name, count] of [['dynamic', 40], ['optimisation', 17], ['static', 14], ['usability', 9]]) {
    assert.equal(Object.keys(builds[name].cases).length, count);
    for (const c of Object.values(builds[name].cases)) {
      const r = c.caseRegister;
      assert.equal(r.record.caseId, c.caseId);
      assert.ok(r.record.conditions && r.record.expectedResult && r.record.actualResult && r.record.limitation);
      const line = read(r.source.file).split('\n')[r.source.line - 1];
      assert.ok(line.startsWith('| ' + c.caseId + ' |'));
      assert.equal(line.slice(1, -1).split(/(?<!\\)\|/)[5].trim(), r.record.outcome);
      assert.ok(c.evidenceReferences.length);
    }
  }
});

test('dynamic API/state records and original assertions are copied without changes', () => {
  const b = builds.dynamic;
  for (const [i, original] of jsonl('dynamic/raw/DYN-RUN-01-api-database.jsonl').entries()) {
    const wrapped = b.cases[original.caseId].records.apiAndDatabase.find(x => x.source.line === i + 1);
    assert.deepEqual(wrapped.record, original);
  }
  const summary = JSON.parse(read('dynamic/raw/DYN-RUN-01-summary.json'));
  for (const [i, original] of summary.cases.entries()) {
    assert.deepEqual(b.cases[original.caseId].records.originalAssertions[0], {
      source: { file: 'dynamic/raw/DYN-RUN-01-summary.json', pointer: '/cases/' + i }, record: original
    });
  }
  assert.equal(b.cases['DYN-10'].records.originalAssertions[0].record.outcome, 'Fail');
  assert.equal(b.cases['DYN-10'].caseRegister.record.outcome, 'Pass');
  assert.ok(b.cases['DYN-10'].records.assertionCorrection[0].record.lines.length);
  assert.equal(Object.keys(b.cases).filter(id => id.startsWith('TIM-')).length, 15);
  for (const c of Object.values(b.cases).filter(c => c.caseId.startsWith('TIM-'))) assert.equal(c.records.timing.length, 1);
});

test('missing live-call measurements and manual-only cases never acquire invented machine evidence', () => {
  const c = builds.dynamic.cases;
  for (const id of ['DYN-05', 'DYN-06']) {
    assert.equal(c[id].measurements.providerCalls.value, null);
    assert.equal(c[id].measurements.providerCalls.status, 'not_instrumented');
    assert.equal(c[id].caseRegister.record.outcome, 'Partial Pass');
  }
  for (const id of ['DYN-01', 'DYN-13']) {
    assert.equal(c[id].records.apiAndDatabase, undefined);
    assert.equal(c[id].records.originalAssertions, undefined);
    assert.ok(c[id].records.commandObservations);
  }
  for (let n = 1; n <= 12; n++) assert.equal(c['UI-' + String(n).padStart(2, '0')].records.manualBrowserObservations.length, 1);
  assert.equal(c['UI-01'].records.browserNetwork, undefined);
  assert.equal(c['UI-11'].records.browserNetwork[0].decodedJson.responseBody.error.code, 'SESSION_GENERATION_FAILED');
  assert.equal(c['UI-12'].records.browserNetwork[0].record.response.status, 201);
});

test('all HAR API entries are retained; resource entries remain traceable and decoded bodies preserve original strings', () => {
  const original = JSON.parse(read('dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/network.har')).log.entries;
  const wrapped = builds.dynamic.index.sharedRecords.browserNetwork;
  const apiEntries = original.filter(r => /^\/api(?:\/|$)/.test(new URL(r.request.url).pathname));
  assert.equal(wrapped.length, apiEntries.length);
  wrapped.forEach(r => assert.deepEqual(r.record, original[Number(r.source.pointer.split('/').at(-1))]));
  const resources = builds.dynamic.index.sharedRecords.browserResourceReferences;
  assert.equal(resources.length + wrapped.length, original.length);
  for (const r of resources) {
    const entry = original[Number(r.source.pointer.split('/').at(-1))];
    assert.equal(r.request.url, entry.request.url);
    assert.equal(r.response.status, entry.response.status);
    assert.ok(!/^\/api(?:\/|$)/.test(new URL(r.request.url).pathname));
  }
  for (const r of wrapped) {
    if (r.decodedJson?.responseBody) assert.deepEqual(r.decodedJson.responseBody, JSON.parse(r.record.response.content.text));
    if (r.decodedJson?.requestBody) assert.deepEqual(r.decodedJson.requestBody, JSON.parse(r.record.request.postData.text));
  }
});

test('bounds counters and concurrent outcomes remain exactly as recorded', () => {
  const b = builds.optimisation;
  for (const [i, original] of jsonl('optimisation/raw/BND-RUN-01-results.jsonl').entries()) {
    const entries = original.caseId ? b.cases[original.caseId].records.boundsResults : b.index.sharedRecords.boundsResults;
    assert.deepEqual(entries.find(x => x.source.line === i + 1).record, original);
  }
  assert.equal(b.cases['BND-15'].records.boundsResults[0].record.providerCallDelta, 2);
  assert.equal(b.cases['BND-16'].records.boundsResults[0].record.providerCallDelta, 0);
});

test('static command excerpts preserve both attempts; inspections are not machine logs', () => {
  const b = builds.static, file = 'static/raw/STA-RUN-01-command-log.md', lines = read(file).split('\n');
  for (let n = 1; n <= 14; n++) {
    const c = b.cases['STA-' + String(n).padStart(2, '0')];
    if (n <= 7) {
      const r = c.records.commandOutput[0];
      assert.deepEqual(r.record.lines, lines.slice(r.source.lineStart - 1, r.source.lineEnd));
    } else {
      assert.equal(c.evidenceType, 'recorded_source_inspection');
      assert.equal(c.records.commandOutput, undefined);
    }
  }
  assert.match(b.cases['STA-04'].records.commandOutput[0].record.lines.join('\n'), /EPERM/);
  assert.match(b.cases['STA-04'].records.commandOutput[0].record.lines.join('\n'), /passed/);
  assert.deepEqual(b.cases['STA-03'].records.coverage[0].record, JSON.parse(read('static/raw/STA-03-coverage-summary.json')));
});

test('usability retains every observation, correction, explicit provider label and shared request', () => {
  const b = builds.usability, raw = 'usability/raw/RUN-B01-20261002-USABILITY-01/';
  const observations = [...jsonl(raw + 'observations.jsonl'), ...jsonl(raw + 'navigation_addendum.jsonl')];
  assert.equal(observations.length, 133);
  const byId = new Map(observations.map(r => [r.id, r]));
  for (const r of observations) for (const id of r.criteria) {
    assert.deepEqual(b.cases[id].records.browserObservations.find(x => x.record.id === r.id).record, r);
  }
  for (const r of jsonl(raw + 'observation_corrections.jsonl')) for (const id of byId.get(r.id).criteria) {
    assert.deepEqual(b.cases[id].records.observationCorrections.find(x => x.record.id === r.id).record, r);
  }
  for (const [i, r] of jsonl(raw + 'provider.jsonl').entries()) {
    const observation = byId.get(r.label);
    const arrays = observation ? observation.criteria.map(id => b.cases[id].records.providerRequests) : [b.index.sharedRecords.providerRequests];
    for (const a of arrays) assert.deepEqual(a.find(x => x.source.line === i + 1).record, r);
  }
  assert.equal(b.cases.U5.caseRegister.record.outcome, 'Partial');
  assert.equal(b.cases.U8.caseRegister.record.outcome, 'Partial');
  assert.equal(b.cases.U9.caseRegister.record.outcome, 'Partial');
});

test('source manifests describe current bytes; identical exports are safe and differing output is refused atomically', () => {
  for (const b of Object.values(builds)) for (const s of b.index.sources) {
    const bytes = fs.readFileSync(path.join(design, s.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), s.sha256);
    assert.equal(bytes.length, s.bytes);
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'readable-converter-test-'));
  const file = path.join(dir, 'case.json'), pending = path.join(dir, 'pending.json');
  const exports = [{ file, evidence: builds.dynamic.cases['DYN-05'] }];
  writeExports(exports);
  const bytes = fs.readFileSync(file);
  writeExports(exports);
  assert.deepEqual(fs.readFileSync(file), bytes);
  assert.throws(() => writeExports([{ file: pending, evidence: {} }, { file, evidence: { different: true } }]), /different content/);
  assert.equal(fs.existsSync(pending), false);
  assert.deepEqual(fs.readFileSync(file), bytes);
});
