// Read existing logs, group by their recorded labels, and pretty-print JSON.
// No application, database, browser or model calls are made.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const rawDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultRun = path.join(rawDirectory, 'RUN-B01-20261002-BLACKBOX-01');

export function caseEvidence(evidence, caseId) {
  if (!/^BB\d{2}$/.test(caseId)) throw new Error('Use a case ID such as BB06.');
  const group = evidence.cases[caseId];
  if (!group) throw new Error(`No records found for ${caseId}.`);
  return {
    ...evidence,
    scope: `Only ${caseId}; other records are not included.`,
    includedCounts: {
      cases: 1,
      otherGroups: 0,
      httpRecords: group.httpRecords.length,
      providerRecords: group.providerRecords.length,
    },
    cases: { [caseId]: group },
    otherRecords: {},
  };
}

export function combineEvidence(runDirectory, caseId) {
  if (caseId !== undefined && !/^BB\d{2}$/.test(caseId)) {
    throw new Error('Use a case ID such as BB06.');
  }
  const cases = Object.create(null);
  const otherRecords = Object.create(null);
  const sources = [];
  for (const [file, labelField, collection] of [
    ['http.jsonl', 'caseId', 'httpRecords'],
    ['provider.jsonl', 'label', 'providerRecords'],
  ]) {
    const bytes = fs.readFileSync(path.join(runDirectory, file));
    let records = 0;
    for (const [index, line] of bytes.toString('utf8').split(/\r?\n/).entries()) {
      if (!line.trim()) continue;
      let record;
      try { record = JSON.parse(line); }
      catch { throw new Error(`${file}, line ${index + 1}: invalid JSON.`); }
      if (!record || Array.isArray(record) || typeof record !== 'object'
        || typeof record[labelField] !== 'string' || !record[labelField]) {
        throw new Error(`${file}, line ${index + 1}: missing record label.`);
      }
      const label = record[labelField];
      const groups = /^BB\d{2}$/.test(label) ? cases : otherRecords;
      groups[label] ??= { httpRecords: [], providerRecords: [] };
      groups[label][collection].push({ source: { file, line: index + 1 }, record });
      records++;
    }
    sources.push({ file, records, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  const sortedCases = Object.fromEntries(Object.entries(cases).sort(([a], [b]) => a.localeCompare(b)));
  const groups = [...Object.values(sortedCases), ...Object.values(otherRecords)];
  const evidence = {
    format: 'black-box-evidence-by-case-v1',
    runDirectory: path.basename(path.resolve(runDirectory)),
    scope: 'All records from both source logs.',
    notes: [
      'This is a formatted copy for review, not a new test run or a Pass/Fail judgement.',
      'Every record keeps all original fields and its original source line number.',
      'HTTP records use caseId; provider records use label. Only exact BB## labels go into cases.',
      'Setup, browser and addendum labels remain in otherRecords. No case mapping is guessed.',
      'Records remain in source order within each array; arrays do not pair requests automatically.',
      'A case may include a provider request for session creation even when its response makes none.',
      'The counts in sources describe the complete logs; includedCounts describe this export.',
    ],
    sources,
    includedCounts: {
      cases: Object.keys(sortedCases).length,
      otherGroups: Object.keys(otherRecords).length,
      httpRecords: groups.reduce((sum, group) => sum + group.httpRecords.length, 0),
      providerRecords: groups.reduce((sum, group) => sum + group.providerRecords.length, 0),
    },
    cases: sortedCases,
    otherRecords,
  };
  return caseId === undefined ? evidence : caseEvidence(evidence, caseId);
}

function main(args) {
  if (args.includes('--help')) {
    console.log('Usage: node convert_evidence.mjs [--case BB06] [--run-dir DIRECTORY] [--output FILE.json]');
    console.log('Default: write the complete file and one BB##.json per case in the same output folder.');
    return;
  }
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    if (!['--case', '--run-dir', '--output'].includes(args[i]) || !args[i + 1]
      || args[i + 1].startsWith('--') || options[args[i]] !== undefined) {
      throw new Error('Invalid arguments. Use --help.');
    }
    options[args[i]] = args[i + 1];
  }
  const runDirectory = path.resolve(options['--run-dir'] ?? defaultRun);
  const output = path.resolve(options['--output'] ?? path.join(rawDirectory, 'readable',
    options['--case'] ? `${options['--case']}.json` : 'evidence_by_case.json'));
  if (path.extname(output).toLowerCase() !== '.json') throw new Error('Output must end in .json.');
  const evidence = combineEvidence(runDirectory, options['--case']);
  const exports = [{ file: output, evidence }];
  if (!options['--case']) {
    for (const caseId of Object.keys(evidence.cases)) {
      exports.push({ file: path.join(path.dirname(output), `${caseId}.json`),
        evidence: caseEvidence(evidence, caseId) });
    }
  }
  if (new Set(exports.map(item => item.file)).size !== exports.length) {
    throw new Error('Output filename conflicts with a case file. Use evidence_by_case.json.');
  }
  const files = exports.map(item => ({ file: item.file,
    formatted: JSON.stringify(item.evidence, null, 2) + '\n' }));
  // Re-running is safe: leave identical output alone and never replace other content.
  // Check every destination first, so a conflict does not leave a partial export.
  for (const { file, formatted } of files) {
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') !== formatted) {
      throw new Error('Output exists with different content. Choose a new --output path.');
    }
  }
  for (const { file, formatted } of files) {
    if (fs.existsSync(file)) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, formatted, { flag: 'wx' });
  }
  console.log(JSON.stringify({ output, files: files.map(item => item.file),
    ...evidence.includedCounts }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
