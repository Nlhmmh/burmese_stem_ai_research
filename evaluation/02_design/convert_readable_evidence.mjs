// Format saved evidence only. Never starts the application, MongoDB, browser or model.
// Usage: node evaluation/02_design/convert_readable_evidence.mjs
// Options: --evaluation dynamic|optimisation|static|usability|all --case ID --output-dir DIR
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const design = path.dirname(fileURLToPath(import.meta.url));
const configurations = {
  dynamic: { report: 'dynamic/dynamic_analysis.md', runId: 'RUN-B01-20261001-DYNAMIC-01' },
  optimisation: { report: 'optimisation/bounds_analysis.md', runId: 'RUN-B01-20261001-BOUNDS-01' },
  static: { report: 'static/static_analysis_test_cases.md', runId: 'RUN-B01-20260930-STATIC-01' },
  usability: { report: 'usability/usability_inspection.md', runId: 'RUN-B01-20261002-USABILITY-01' }
};
const casePattern = /^(?:DYN-\d{2}|TIM-[A-Z]+-\d{2}|UI-\d{2}|BND-\d{2}|STA-\d{2}|U[1-9])$/;
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const plain = text => text.replaceAll('<br>', '\n').replaceAll('\\|', '|').trim();
const splitRow = line => line.trim().slice(1, -1).split(/(?<!\\)\|/).map(plain);

class Sources {
  constructor() { this.files = new Map(); }
  text(file) {
    if (!this.files.has(file)) {
      const bytes = fs.readFileSync(path.resolve(design, file));
      this.files.set(file, { file, sha256: sha256(bytes), bytes: bytes.length, text: bytes.toString('utf8') });
    }
    return this.files.get(file).text;
  }
  wrap(file, record, location = {}) { this.text(file); return { source: { file, ...location }, record }; }
  json(file) { return JSON.parse(this.text(file)); }
  jsonl(file) {
    return this.text(file).split(/\r?\n/).flatMap((line, i) => {
      if (!line.trim()) return [];
      try { return [this.wrap(file, JSON.parse(line), { line: i + 1 })]; }
      catch { throw new Error(`${file}:${i + 1}: invalid JSON`); }
    });
  }
  csv(file) {
    // Quoted CSV, including escaped quotes and embedded newlines.
    const text = this.text(file), rows = [];
    let row = [], field = '', quoted = false, line = 1, startLine = 1;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (quoted && text[i + 1] === '"') { field += '"'; i++; }
        else quoted = !quoted;
      } else if (c === ',' && !quoted) { row.push(field); field = ''; }
      else if (c === '\n' && !quoted) {
        row.push(field.replace(/\r$/, '')); rows.push({ values: row, line: startLine });
        row = []; field = ''; startLine = line + 1;
      } else field += c;
      if (c === '\n') line++;
    }
    assert.equal(quoted, false, file + ': unclosed CSV quote');
    if (field || row.length) { row.push(field); rows.push({ values: row, line: startLine }); }
    const header = rows.shift().values;
    return rows.filter(r => r.values.some(Boolean)).map(r => {
      assert.equal(r.values.length, header.length, file + ': CSV columns');
      return this.wrap(file, Object.fromEntries(header.map((h, i) => [h, r.values[i]])), { line: r.line });
    });
  }
  table(file, firstColumn) {
    const lines = this.text(file).split('\n');
    const index = lines.findIndex(l => l.startsWith('| ' + firstColumn + ' |'));
    assert.ok(index >= 0, file + ': missing ' + firstColumn + ' table');
    const header = splitRow(lines[index]), records = [];
    for (let i = index + 2; i < lines.length && lines[i].startsWith('|'); i++) {
      const cells = splitRow(lines[i]); assert.equal(cells.length, header.length, file + ':' + (i + 1));
      records.push(this.wrap(file, Object.fromEntries(header.map((h, j) => [h, cells[j]])), { line: i + 1 }));
    }
    return records;
  }
  excerpt(file, heading) {
    const lines = this.text(file).split('\n');
    const start = lines.findIndex(l => l.startsWith(heading));
    assert.ok(start >= 0, file + ': missing heading ' + heading);
    let end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
    if (end < 0) end = lines.length;
    return this.wrap(file, { lines: lines.slice(start, end) }, { lineStart: start + 1, lineEnd: end });
  }
  manifest() { return [...this.files.values()].map(({ text, ...item }) => item); }
}

function linkReferences(evidence, report) {
  return [...evidence.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(([, label, target]) => {
    const [file, fragment] = target.split('#');
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(report), file));
    // Readable exports reference themselves; no hash cycle or source-file claim.
    const derived = /\/raw\/readable\//.test(resolved);
    return { label, file: resolved, ...(fragment ? { fragment } : {}), derived };
  });
}

export function buildEvaluation(name) {
  const config = configurations[name];
  if (!config) throw new Error('Unknown evaluation: ' + name);
  const sources = new Sources();
  const cases = Object.fromEntries(sources.table(config.report, 'Case').map(item => {
    const r = item.record, id = r.Case;
    assert.ok(casePattern.test(id), 'Invalid case: ' + id);
    return [id, {
      format: 'readable-evaluation-case-v1', evaluation: name, runId: config.runId, caseId: id,
      notes: ['Formatted saved evidence, not a new evaluation or a new Pass/Fail decision.',
        'Records retain their original fields and source line numbers or JSON pointers.',
        'Source/reference paths are relative to evaluation/02_design; line numbers are one-based and JSON pointers are zero-based.',
        'The case register is a report, not an additional machine assertion.',
        'Shared or unlabelled records stay in index.json; no case association is guessed.'],
      caseRegister: sources.wrap(config.report, {
        caseId: id, action: r['Case details / action'], conditions: r['Conditions / inputs'],
        expectedResult: r['Expected result'], actualResult: r['Actual result'],
        outcome: r.Outcome, limitation: r.Limitation
      }, { line: item.source.line }),
      evidenceReferences: linkReferences(r.Evidence, config.report),
      records: {}, sharedEvidence: { file: `${name}/raw/readable/index.json`, pointer: '/sharedRecords' }
    }];
  }));
  const sharedRecords = {};
  const attach = (id, type, wrapped) => {
    const target = cases[id] ? cases[id].records : sharedRecords;
    (target[type] ??= []).push(wrapped);
  };

  if (name === 'dynamic') {
    const raw = 'dynamic/raw/';
    const api = sources.jsonl(raw + 'DYN-RUN-01-api-database.jsonl');
    for (const r of api) attach(r.record.caseId, 'apiAndDatabase', r);
    const summaryFile = raw + 'DYN-RUN-01-summary.json', summary = sources.json(summaryFile);
    summary.cases.forEach((r, i) => attach(r.caseId, 'originalAssertions', sources.wrap(summaryFile, r, { pointer: '/cases/' + i })));
    const { cases: summaryCases, ...runMetadata } = summary;
    sharedRecords.runMetadata = [sources.wrap(summaryFile, runMetadata, { pointer: '/', excludedField: 'cases' })];
    for (const r of sources.csv('dynamic/timings.csv')) attach(r.record.case_id, 'timing', r);
    const command = raw + 'DYN-RUN-01-command-log.md';
    sharedRecords.commandLog = [sources.wrap(command, { lines: sources.text(command).split('\n') })];
    for (const id of ['DYN-01', 'DYN-02']) attach(id, 'commandObservations', sources.excerpt(command, '## Readiness and initial generation'));
    attach('DYN-13', 'commandObservations', sources.excerpt(command, '## DYN-13 controlled failure'));
    const adjudication = raw + 'DYN-RUN-01-adjudication.md';
    attach('DYN-10', 'assertionCorrection', sources.wrap(adjudication, { lines: sources.text(adjudication).split('\n') }));
    const browser = raw + 'manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/';
    const observations = sources.table(browser + 'observations.md', 'Observation');
    const harFile = browser + 'network.har', har = sources.json(harFile);
    sharedRecords.browserNetwork = har.log.entries.flatMap((r, i) => {
      if (!/^\/api(?:\/|$)/.test(new URL(r.request.url).pathname)) return [];
      const wrapped = sources.wrap(harFile, r, { pointer: '/log/entries/' + i });
      // Decode JSON text for readability, retaining the complete original HAR entry.
      const decoded = {};
      for (const [key, content] of [['requestBody', r.request.postData], ['responseBody', r.response.content]]) {
        if (content?.text && !content.encoding && /json/i.test(content.mimeType ?? '')) {
          try { decoded[key] = JSON.parse(content.text); } catch { /* Original text is retained. */ }
        }
      }
      if (Object.keys(decoded).length) wrapped.decodedJson = decoded;
      return [wrapped];
    });
    // Static assets are not test requests. Keep locators rather than copying scripts/fonts.
    sharedRecords.browserResourceReferences = har.log.entries.flatMap((r, i) =>
      /^\/api(?:\/|$)/.test(new URL(r.request.url).pathname) ? [] : [{
        source: { file: harFile, pointer: '/log/entries/' + i },
        note: 'Non-API resource entry remains unchanged in the original HAR; its body is not duplicated here.',
        request: { method: r.request.method, url: r.request.url },
        response: { status: r.response.status }
      }]);
    sharedRecords.browserNetworkMetadata = [sources.wrap(harFile,
      Object.fromEntries(Object.entries(har.log).filter(([key]) => key !== 'entries')),
      { pointer: '/log', excludedField: 'entries' })];
    sharedRecords.manualBrowserReport = [sources.wrap(browser + 'observations.md', { lines: sources.text(browser + 'observations.md').split('\n') })];
    for (const r of observations) {
      const id = r.record.Observation.match(/^UI-\d{2}/)?.[0];
      assert.ok(cases[id], 'Missing UI case ' + id);
      attach(id, 'manualBrowserObservations', r);
      for (const related of r.record['Related cases'].match(/DYN-\d{2}/g) ?? []) attach(related, 'separateManualBrowserObservations', r);
    }
    // Only the two timestamps explicitly recorded in the browser report get case links.
    for (const [id, time] of [['UI-11', '2026-10-01T05:31:09.698Z'], ['UI-12', '2026-10-01T05:37:46.343Z']]) {
      const matching = sharedRecords.browserNetwork.filter(r => r.record.startedDateTime === time && r.record.request.method === 'POST');
      assert.equal(matching.length, 1, id + ': recorded HAR request');
      for (const r of matching) { attach(id, 'browserNetwork', r); attach('DYN-13', 'separateBrowserNetwork', r); }
    }
    for (const c of Object.values(cases)) {
      c.measurements = { providerCalls: { status: 'not_instrumented', value: null } };
      c.notes.push('API and manual browser records can use different sessions/actions. They are kept separate.',
        'Provider requests were not directly counted. Missing counts are not zero.');
    }
  }

  if (name === 'optimisation') {
    const raw = 'optimisation/raw/';
    for (const r of sources.jsonl(raw + 'BND-RUN-01-results.jsonl')) attach(r.record.caseId, 'boundsResults', r);
    const file = raw + 'BND-RUN-01-command-log.md';
    sharedRecords.commandLog = [sources.wrap(file, { lines: sources.text(file).split('\n') })];
    for (const c of Object.values(cases)) c.notes.push(
      'Counts describe the deterministic provider seam, not calls to an external model.',
      'Setup calls are excluded from action deltas. A write attempt is not necessarily an accepted save.',
      'Test assertions are in the linked test source; the JSONL record is a compact result, not an assertion transcript.');
  }

  if (name === 'static') {
    const raw = 'static/raw/', command = raw + 'STA-RUN-01-command-log.md';
    sharedRecords.commandLog = [sources.wrap(command, { lines: sources.text(command).split('\n') })];
    for (const c of Object.values(cases)) {
      const n = Number(c.caseId.slice(4));
      c.evidenceType = n <= 7 ? 'recorded_command_output' : 'recorded_source_inspection';
      if (n <= 7) attach(c.caseId, 'commandOutput', sources.excerpt(command, '## ' + c.caseId + ' '));
      else c.notes.push('No separate machine log exists for this source-inspection finding. Use the case register and linked B01 source files.');
      c.notes.push('Command output is a saved transcription, not a raw terminal stream. Historical counts are not current coverage.');
    }
    const coverage = raw + 'STA-03-coverage-summary.json';
    attach('STA-03', 'coverage', sources.wrap(coverage, sources.json(coverage), { pointer: '/' }));
  }

  if (name === 'usability') {
    const raw = 'usability/raw/RUN-B01-20261002-USABILITY-01/';
    const observations = [...sources.jsonl(raw + 'observations.jsonl'), ...sources.jsonl(raw + 'navigation_addendum.jsonl')];
    const observationMap = new Map(observations.map(r => [r.record.id, r]));
    for (const r of observations) {
      for (const id of r.record.criteria) {
        assert.ok(cases[id], 'Unknown criterion ' + id);
        attach(id, 'browserObservations', r);
      }
    }
    for (const file of ['observations.csv', 'navigation_addendum.csv']) for (const r of sources.csv(raw + file)) {
      for (const id of r.record.criterion.split('|')) attach(id, 'reviewSheet', r);
    }
    for (const [file, type, labelKey] of [
      ['observation_corrections.jsonl', 'observationCorrections', 'id'],
      ['layout_checks.jsonl', 'layoutChecks', 'id'],
      ['fixture_controls.jsonl', 'fixtureControls', 'label'],
      ['provider.jsonl', 'providerRequests', 'label'],
      ['fixture_outputs.jsonl', 'fixtureOutputs', 'label']
    ]) for (const r of sources.jsonl(raw + file)) {
      const observation = observationMap.get(r.record[labelKey]);
      if (observation) for (const id of observation.record.criteria) attach(id, type, r);
      else attach(undefined, type, r);
    }
    for (const r of sources.csv('usability/issues.csv')) for (const id of r.record.criteria.split('|')) attach(id, 'recordedIssues', r);
    for (const file of ['metadata.json', 'ui_seeds.json', 'route_seeds.json', 'seeded_documents.json',
      'route_seed_documents.json', 'database_snapshot.json', 'verification.json', 'manifest_verification.json',
      'keyboard_modal_trace.json', 'navigation_addendum_verification.json']) {
      sharedRecords[file] = [sources.wrap(raw + file, sources.json(raw + file), { pointer: '/' })];
    }
    for (const id of ['U5', 'U9']) for (const r of sharedRecords['keyboard_modal_trace.json']) attach(id, 'keyboardFocus', r);
    for (const id of ['U3', 'U4', 'U7', 'U9']) for (const r of sharedRecords['navigation_addendum_verification.json']) attach(id, 'backNavigationVerification', r);
    for (const c of Object.values(cases)) c.notes.push(
      'Observations use their explicit criteria arrays. One capture may support several U criteria.',
      'Original observations, corrections and the derived review sheet are separate; no correction is applied silently.',
      'Provider records are linked only when their label exactly matches a recorded capture ID; general labels stay shared.',
      'Screenshots and DOM files remain at the paths in browserObservations, relative to the historical run folder.',
      'Ratings describe a technical inspection, not participant feedback or translation-quality assessment.');
  }

  const manifest = sources.manifest();
  for (const c of Object.values(cases)) c.sources = manifest;
  return { cases, index: {
    format: 'readable-evaluation-index-v1', evaluation: name, runId: config.runId,
    notes: ['Mechanical formatting of saved records only; no new test was run.',
      'Shared records remain shared. Case labels and criteria are taken from the originals, not guessed.'],
    cases: Object.keys(cases).map(caseId => ({ caseId, file: caseId + '.json' })), sources: manifest, sharedRecords
  } };
}

export function writeExports(exports) {
  const outputs = exports.map(({ file, evidence }) => ({ file: path.resolve(file), text: JSON.stringify(evidence, null, 2) + '\n' }));
  assert.equal(new Set(outputs.map(x => x.file)).size, outputs.length, 'Conflicting output paths');
  // Validate all destinations before writing anything. Never replace differing output.
  for (const { file, text } of outputs) {
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') !== text) throw new Error(
      `Output exists with different content: ${file}. Choose a new --output-dir.`);
  }
  for (const { file, text } of outputs) {
    if (fs.existsSync(file)) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text, { flag: 'wx' });
  }
  return outputs.map(x => x.file);
}

function main(args) {
  if (args.includes('--help')) {
    console.log('Usage: node evaluation/02_design/convert_readable_evidence.mjs [--evaluation dynamic|optimisation|static|usability|all] [--case ID] [--output-dir DIR]');
    console.log('Default: one JSON per case plus index.json under each evaluation/raw/readable/. Reads saved evidence only.');
    return;
  }
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    if (!['--evaluation', '--case', '--output-dir'].includes(args[i]) || !args[i + 1] || args[i + 1].startsWith('--') || options[args[i]]) throw new Error('Invalid arguments. Use --help.');
    options[args[i]] = args[i + 1];
  }
  const selected = options['--evaluation'] ?? 'all';
  if (selected !== 'all' && !configurations[selected]) throw new Error('Unknown evaluation. Use --help.');
  if (options['--case'] && (!casePattern.test(options['--case']) || selected === 'all')) throw new Error('--case requires a valid case ID and one --evaluation.');
  const names = selected === 'all' ? Object.keys(configurations) : [selected], exports = [];
  for (const name of names) {
    const built = buildEvaluation(name);
    const dir = options['--output-dir'] ? path.join(path.resolve(options['--output-dir']), name) : path.join(design, name, 'raw/readable');
    const ids = options['--case'] ? [options['--case']] : Object.keys(built.cases);
    for (const id of ids) {
      if (!built.cases[id]) throw new Error('No case ' + id + ' in ' + name);
      exports.push({ file: path.join(dir, id + '.json'), evidence: built.cases[id] });
    }
    const index = options['--case'] ? { ...built.index, cases: built.index.cases.filter(c => ids.includes(c.caseId)) } : built.index;
    exports.push({ file: path.join(dir, 'index.json'), evidence: index });
  }
  const files = writeExports(exports);
  console.log(JSON.stringify({ evaluations: names, caseFiles: exports.filter(x => path.basename(x.file) !== 'index.json').length, totalFiles: files.length }, null, 2));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
