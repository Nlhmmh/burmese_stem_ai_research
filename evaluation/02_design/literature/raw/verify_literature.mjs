// Documentation/evidence integrity only. No app, provider, DB or source-copy run.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../../../..');
const prefix = 'evaluation/02_design/literature/';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const hashText = value => crypto.createHash('sha256').update(value).digest('hex');
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trimEnd();
function csv(text) {
  const rows = []; let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted; }
    else if (c === ',' && !quoted) { row.push(value); value = ''; }
    else if (c === '\n' && !quoted) { row.push(value.replace(/\r$/, '')); rows.push(row); row = []; value = ''; }
    else value += c;
  }
  assert.equal(quoted, false, 'closed CSV quoting');
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows.filter(row => row.some(value => value));
}
const registerPath = 'evaluation/03_results/evidence_register.csv';
const register = csv(read(registerPath));
const evidence = register.slice(1);
assert.equal(register[0].length, 15);
assert.equal(new Set(evidence.map(row => row[0])).size, evidence.length);
for (const row of evidence) {
  assert.equal(row.length, 15, row[0]);
  assert.equal('sha256:' + sha(row[7]), row[8], row[0] + ' artefact hash');
}
const previous = evidence.filter(row => Number(row[0].slice(1)) <= 44);
assert.equal(previous.length, 39, '39 retained registered records; retired E028-32 absent');
const head = git(['rev-parse', 'HEAD']);
const originalRegister = csv(git(['show', `${head}:${registerPath}`]));
assert.deepEqual([register[0], ...previous], originalRegister, 'previous register rows unchanged');
const baseline = JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json'));
assert.equal(Object.keys(baseline.productionHashes).length, 66);
for (const [file, expected] of Object.entries(baseline.productionHashes)) assert.equal(sha(file), expected, file);
const matrixFile = prefix + 'literature_matrix.csv';
const matrix = csv(read(matrixFile));
const header = matrix[0]; const rows = matrix.slice(1);
assert.equal(header.length, 17);
assert.equal(rows.length, 13);
assert.deepEqual(rows.map(row => row[0]), Array.from({ length: 13 }, (_, i) => 'DL' + String(i + 1).padStart(2, '0')));
const ratings = new Set(['Strong', 'Moderate', 'Limited', 'Contradictory/uncertain']);
const sources = read(prefix + 'reference_verification.md');
const synthesis = read(prefix + 'literature_synthesis.md');
const sourceIds = new Set([...sources.matchAll(/\| (LIT-(?:R\d{2}|A2)) \|/g)].map(match => match[1]));
assert.equal(sourceIds.size, 12);
const evidenceIds = new Set(evidence.map(row => row[0]));
for (const row of rows) {
  assert.equal(row.length, header.length, row[0] + ' rectangular CSV');
  assert.ok(row.every(value => value.trim()), row[0] + ' populated fields');
  assert.match(row[2], /A2 PDF p/);
  assert.ok(ratings.has(row[12]), row[0] + ' rating');
  for (const sourceId of row[3].split('|')) assert.ok(sourceIds.has(sourceId), row[0] + ': ' + sourceId);
  for (const evidenceId of row[10].split('|')) assert.ok(evidenceIds.has(evidenceId), row[0] + ': ' + evidenceId);
  assert.match(row[15], /REQ-0[123]/); assert.match(row[16], /RQ[123]/);
}
for (const sourceId of ['LIT-R01', 'LIT-R02', 'LIT-R03', 'LIT-R04', 'LIT-R05']) assert.ok(rows.some(row => row[3].split('|').includes(sourceId)));
for (const file of [prefix + 'literature_synthesis.md', prefix + 'reference_verification.md']) {
  for (const match of read(file).matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1]; if (/^https?:/.test(target)) continue;
    // Generated outputs are verified after capture; no placeholder link accepted.
    if (target.startsWith('raw/LIT-RUN-01-')) continue;
    assert.ok(fs.existsSync(path.resolve(root, path.dirname(file), target.split('#')[0])), file + ': ' + target);
  }
}
for (const token of ['Not assessed', 'BB22', 'USI-02', 'two Fail', 'Skipped', 'provisionally Partial']) assert.ok(synthesis.includes(token), token + ' limitation retained');
assert.ok(sources.includes('No new publication'));
const outputs = [matrixFile, prefix + 'literature_synthesis.md', prefix + 'reference_verification.md', prefix + 'raw/verify_literature.mjs'];
const inputs = new Set(previous.map(row => row[7]));
for (const file of [
  'docs/INFOSYS_720_Assignment_2.pdf', 'docs/INFOSYS_720_Assignment_3.pdf', 'docs/INFOSYS_720_Assignment_4.pdf',
  'evaluation/01_conceptual/literature/literature_matrix.csv', 'evaluation/01_conceptual/literature/literature_synthesis.md',
  'evaluation/00_protocol/refined_contract_cross_reference.md',
  'evaluation/02_design/simulation/human_content_scores.csv', 'evaluation/02_design/simulation/failure_analysis.md',
  'evaluation/02_design/usability/issues.csv', 'evaluation/02_design/white_box/white_box_evaluation.md',
  'evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json',
]) inputs.add(file);
const resultFile = prefix + 'raw/LIT-RUN-01-verification.json';
const manifestFile = prefix + 'raw/LIT-RUN-01-manifest.sha256';
const ratingCounts = Object.fromEntries([...ratings].map(rating => [rating, rows.filter(row => row[12] === rating).length]));
const paths = [...new Set([...inputs, ...Object.keys(baseline.productionHashes), ...outputs, resultFile])].sort();
if (process.argv.includes('--check-register')) {
  const captured = JSON.parse(read(resultFile));
  assert.deepEqual(captured.previousRegisterRows, previous);
  for (const [file, expected] of Object.entries(captured.inputHashes)) assert.equal(sha(file), expected, file);
  const newIds = ['E045', 'E046', 'E047', 'E048'];
  assert.deepEqual(evidence.filter(row => !previous.includes(row)).map(row => row[0]), newIds);
  assert.equal(evidence.length, 43);
  for (const id of newIds) assert.equal(evidence.find(row => row[0] === id)[3], 'DA-LIT');
  for (const line of read(manifestFile).trim().split('\n')) {
    const match = line.match(/^([0-9a-f]{64})  (.+)$/); assert.ok(match, 'manifest syntax');
    assert.equal(sha(match[2]), match[1], match[2] + ' manifest hash');
  }
  for (const file of outputs.filter(file => file.endsWith('.md'))) {
    for (const match of read(file).matchAll(/\]\(([^)]+)\)/g)) {
      if (!/^https?:/.test(match[1])) assert.ok(fs.existsSync(path.resolve(root, path.dirname(file), match[1].split('#')[0])), 'all final local links');
    }
  }
  console.log(JSON.stringify({ result: 'Pass: retained source/evidence and final register integrity', records: evidence.length, unchangedPrevious: previous.length, added: newIds, matrixRows: rows.length, ratingCounts, productionFilesUnchanged: 66, manifestEntries: paths.length }));
} else {
  assert.equal(evidence.length, 39, 'capture before register append');
  const result = {
    analysisId: 'ANALYSIS-B01-20261003-DESIGN-LITERATURE-01', method: 'DA-LIT', analysisDate: '2026-10-03', timezone: 'Pacific/Auckland', checkedAtUtc: new Date().toISOString(),
    headAtCapture: head, worktreeAtCapture: git(['status', '--short']), baseline: 'B01-A5-EVALUATION production / ROOTTESTS-02 test profile', productionSourceCommit: baseline.sourceCommit,
    result: 'Pass: documentation/evidence integrity only', matrixRows: rows.length, matrixColumns: header.length, ratingCounts, sourceIdentities: sourceIds.size, ssrSystemsCovered: 5,
    existingRegisteredArtefactsVerified: previous.length, previousRegisterRows: previous, productionFilesUnchanged: 66,
    productionHashes: baseline.productionHashes, inputHashes: Object.fromEntries([...inputs].sort().map(file => [file, sha(file)])),
    protocolAtStart: { path: 'evaluation/00_protocol/evaluation_protocol.md', sha256: hashText(git(['show', `${head}:evaluation/00_protocol/evaluation_protocol.md`]) + '\n'), reproduce: `git show ${head}:evaluation/00_protocol/evaluation_protocol.md` },
    masterPlanAtStart: { path: 'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md', sha256: hashText(git(['show', `${head}:docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md`]) + '\n') },
    externalReferenceAccess: 'See reference_verification.md: three primary named-locator inspections; one publisher-index abstract; seven assignment-mediated sources. No new corpus publication.',
    applicationRunsAdded: 0, providerCallsAdded: 0, humanReviewsAdded: 0, sourceCopiesCreated: 0,
    authoringCorrection: 'First checker invocation rejected two over-deep Assignment 2 relative links before writing evidence. Links corrected and checker rerun; not a PoC failure.',
    note: 'Hash/CSV/link integrity is not an application test or a new content/learner result. Navigation completion edits and final evidence-register append are separately checked.',
  };
  fs.writeFileSync(path.join(root, resultFile), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  fs.writeFileSync(path.join(root, manifestFile), paths.map(file => `${sha(file)}  ${file}`).join('\n') + '\n', { flag: 'wx' });
  console.log(JSON.stringify({ result: result.result, matrixRows: rows.length, ratingCounts, previousRegisteredRecords: previous.length, productionFilesUnchanged: 66, manifestEntries: paths.length, outputHashes: Object.fromEntries([...outputs, manifestFile].map(file => [file, sha(file)])) }));
}
