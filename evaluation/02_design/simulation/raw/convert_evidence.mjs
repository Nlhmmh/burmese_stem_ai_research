// Format saved simulation evidence. No generation, scoring or database calls.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const rawDirectory = path.dirname(fileURLToPath(import.meta.url));
const validCase = id => /^SIM(?:\d{2}-[ABC]|-LANG-\d{2}|-CM-\d{2})$/.test(id);

export function caseEvidence(evidence, id) {
  if (!validCase(id)) throw new Error('Use a case ID such as SIM01-B.');
  const group = evidence.cases[id];
  if (!group) throw new Error(`No records found for ${id}.`);
  return { ...evidence, scope: `Only ${id}.`, includedCounts: counts({ [id]: group }), cases: { [id]: group } };
}

function counts(cases) {
  const groups = Object.values(cases);
  return { cases: groups.length, simulationRecords: groups.reduce((n, g) => n + g.simulationRecords.length, 0),
    providerRecords: groups.reduce((n, g) => n + g.providerRecords.length, 0) };
}

export function combineEvidence(runDirectory = rawDirectory, caseId) {
  const cases = Object.create(null), sources = [];
  for (const [file, collection, idField] of [
    ['SIM-RUN-01-results.jsonl', 'simulationRecords', 'id'],
    ['SIM-RUN-01-provider.jsonl', 'providerRecords', 'caseId'],
  ]) {
    const bytes = fs.readFileSync(path.join(runDirectory, file));
    const text = bytes.toString('utf8');
    const entries = text.split(/\r?\n/).flatMap((line, index) => {
      if (!line.trim()) return [];
      try { return [{ line: index + 1, record: JSON.parse(line) }]; }
      catch { throw new Error(`${file}, line ${index + 1}: invalid JSON.`); }
    });
    for (const { line, record } of entries) {
      const id = record?.[idField];
      if (typeof id !== 'string' || !validCase(id)) throw new Error(`${file}, line ${line}: invalid case ID.`);
      if (collection === 'simulationRecords') {
        if (cases[id]) throw new Error(`Duplicate simulation case ${id}.`);
        cases[id] = { simulationRecords: [], providerRecords: [] };
      } else if (!cases[id]) throw new Error(`${file}, line ${line}: unknown simulation case ${id}.`);
      cases[id][collection].push({ source: { file, line }, record });
    }
    sources.push({ file, records: entries.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  const sorted = Object.fromEntries(Object.entries(cases).sort(([a], [b]) => a.localeCompare(b)));
  const evidence = { format: 'simulation-evidence-by-case-v2', scope: 'All records from the two execution logs.',
    notes: [
      'This is a formatted evidence copy, not a new simulation or human review.',
      'All original execution-log fields and source line numbers are retained.',
      'simulationRecords contain capture-time contentOutcome and reviewer fields, which were blank or Not assessed.',
      'Human judgements and scores are separate in the case register and human_content_scores.csv; they are not imported here.',
      'Provider records include rejected or undelivered outputs. These are not additional delivered content assessments.',
      'Sources describe complete input files; includedCounts describe this export.',
    ], sources, includedCounts: counts(sorted), cases: sorted };
  return caseId === undefined ? evidence : caseEvidence(evidence, caseId);
}

function main(args) {
  if (args.includes('--help')) {
    console.log('Usage: node convert_evidence.mjs [--case SIM01-B] [--run-dir DIRECTORY] [--output FILE.json] [--refresh]');
    console.log('Default: write the complete file and one JSON file per simulation case.');
    return;
  }
  const options = {};
  for (let i = 0; i < args.length;) {
    if (args[i] === '--refresh' && !options['--refresh']) { options['--refresh'] = true; i++; continue; }
    if (!['--case', '--run-dir', '--output'].includes(args[i]) || !args[i + 1]
      || args[i + 1].startsWith('--') || options[args[i]] !== undefined) throw new Error('Invalid arguments. Use --help.');
    options[args[i]] = args[i + 1];
    i += 2;
  }
  const output = path.resolve(options['--output'] ?? path.join(rawDirectory, 'readable',
    options['--case'] ? `${options['--case']}.json` : 'evidence_by_case.json'));
  if (path.extname(output).toLowerCase() !== '.json') throw new Error('Output must end in .json.');
  const evidence = combineEvidence(path.resolve(options['--run-dir'] ?? rawDirectory), options['--case']);
  const exports = [{ file: output, evidence }];
  if (!options['--case']) for (const id of Object.keys(evidence.cases)) {
    exports.push({ file: path.join(path.dirname(output), `${id}.json`), evidence: caseEvidence(evidence, id) });
  }
  if (new Set(exports.map(item => item.file)).size !== exports.length) throw new Error('Output conflicts with a case filename.');
  const files = exports.map(item => ({ file: item.file, evidence: item.evidence,
    formatted: JSON.stringify(item.evidence, null, 2) + '\n' }));
  for (const { file, evidence: next, formatted } of files) {
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') !== formatted) {
      if (!options['--refresh']) throw new Error('Output exists with different content. Choose a new --output path or use --refresh for generated files.');
      const previous = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (!['simulation-evidence-by-case-v1', 'simulation-evidence-by-case-v2'].includes(previous.format)
        || JSON.stringify(Object.keys(previous.cases ?? {})) !== JSON.stringify(Object.keys(next.cases))) {
        throw new Error('Refusing to refresh an unrecognised evidence file.');
      }
      for (const [id, group] of Object.entries(next.cases)) {
        for (const field of ['simulationRecords', 'providerRecords']) {
          if (JSON.stringify(previous.cases[id][field]) !== JSON.stringify(group[field])) {
            throw new Error('Refusing to refresh changed execution records. Choose a new --output path.');
          }
        }
      }
    }
  }
  for (const { file, formatted } of files) {
    if (fs.existsSync(file)) {
      if (fs.readFileSync(file, 'utf8') !== formatted) fs.writeFileSync(file, formatted);
      continue;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, formatted, { flag: 'wx' });
  }
  console.log(JSON.stringify({ output, files: files.length, ...evidence.includedCounts }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
