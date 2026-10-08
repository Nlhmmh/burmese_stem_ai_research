// Documentation/evidence integrity only: no application, provider or DB execution.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../../../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
function csv(text) {
  const rows = []; let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted; }
    else if (c === ',' && !quoted) { row.push(value); value = ''; }
    else if (c === '\n' && !quoted) { row.push(value.replace(/\r$/, '')); rows.push(row); row = []; value = ''; }
    else value += c;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}
const register = csv(read('evaluation/03_results/evidence_register.csv'));
const evidence = register.slice(1).filter(row => row[0]);
const existing = evidence.filter(row => Number(row[0].slice(1)) <= 38);
for (const row of existing) {
  assert.equal(row.length, 15, row[0]);
  assert.equal('sha256:' + sha(row[7]), row[8], row[0] + ' retained artefact');
}
const baseline = JSON.parse(read('evaluation/02_design/usability/raw/RUN-B01-20261002-USABILITY-01/metadata.json'));
for (const [file, expected] of Object.entries(baseline.productionHashes)) assert.equal(sha(file), expected, file);
const analysisFile = 'evaluation/02_design/informed_argument/traceability.md';
const analysis = read(analysisFile);
assert.deepEqual([...analysis.matchAll(/^### (IA-D\d{2}) /gm)].map(match => match[1]), Array.from({ length: 8 }, (_, i) => 'IA-D' + String(i + 1).padStart(2, '0')));
assert.equal((analysis.match(/\*\*Conclusion: Supported/g) ?? []).length, 2);
assert.equal((analysis.match(/\*\*Conclusion: Partially supported/g) ?? []).length, 6);
const inputPaths = new Set(existing.map(row => row[7]));
for (const file of [
  'docs/INFOSYS_720_Assignment_2.pdf', 'docs/INFOSYS_720_Assignment_3.pdf', 'docs/INFOSYS_720_Assignment_4.pdf',
  'evaluation/01_conceptual/literature/literature_matrix.csv', 'evaluation/01_conceptual/literature/literature_synthesis.md',
  'evaluation/01_conceptual/informed_argument/traceability.md',
  'evaluation/00_protocol/refined_contract_cross_reference.md',
  'evaluation/02_design/dynamic/dynamic_analysis_test_cases.md', 'evaluation/02_design/optimisation/bounds_analysis.md',
  'evaluation/02_design/simulation/failure_analysis.md', 'evaluation/02_design/simulation/human_content_scores.csv',
  'evaluation/02_design/black_box/black_box_analysis.md', 'evaluation/02_design/white_box/white_box_evaluation.md',
  'evaluation/02_design/usability/issues.csv',
  'evaluation/02_design/usability/raw/RUN-B01-20261002-USABILITY-01/navigation_addendum_verification.json',
]) inputPaths.add(file);
const result = {
  analysisId: 'ANALYSIS-B01-20261003-INFORMED-ARGUMENT-01', analysisDate: '2026-10-03', timezone: 'Pacific/Auckland', checkedAtUtc: new Date().toISOString(),
  headAtCheck: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  result: 'Pass: documentation/evidence integrity only', existingRegisteredArtefactsVerified: existing.length,
  arguments: 8, argumentConclusions: { Supported: 2, 'Partially supported': 6 },
  productionFilesUnchanged: Object.keys(baseline.productionHashes).length, productionSourceCommit: baseline.sourceCommit,
  productionHashes: baseline.productionHashes, inputHashes: Object.fromEntries([...inputPaths].sort().map(file => [file, sha(file)])),
  protocolAtAnalysisStart: { path: 'evaluation/00_protocol/evaluation_protocol.md', hash: sha('evaluation/00_protocol/evaluation_protocol.md'), reproduce: 'git show HEAD_AT_CHECK:evaluation/00_protocol/evaluation_protocol.md; subsequent edits record completion only' },
  executionsAdded: 0, providerCallsAdded: 0, humanReviewsAdded: 0, sourceCopiesCreated: 0,
  note: 'Source reading and source/evidence hashes are not new functional, content-quality or learner evaluation results',
};
fs.writeFileSync(path.join(directory, 'ARG-RUN-01-input-verification.json'), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
const outputPaths = ['evaluation/02_design/informed_argument/traceability.md','evaluation/02_design/informed_argument/reference_verification.md','evaluation/02_design/informed_argument/raw/verify_argument.mjs','evaluation/02_design/informed_argument/raw/ARG-RUN-01-input-verification.json'];
const manifestPaths = [...new Set([...inputPaths, ...Object.keys(baseline.productionHashes), ...outputPaths])].sort();
fs.writeFileSync(path.join(directory, 'ARG-RUN-01-manifest.sha256'), manifestPaths.map(file => `${sha(file)}  ${file}`).join('\n') + '\n', { flag: 'wx' });
for (const file of outputPaths.filter(file => file.endsWith('.md'))) {
  for (const match of read(file).matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1]; if (/^https?:/.test(target)) continue;
    assert.ok(fs.existsSync(path.resolve(root, path.dirname(file), target.split('#')[0])), file + ': ' + target);
  }
}
console.log(JSON.stringify({ result: result.result, existingRegisteredArtefactsVerified: existing.length, productionFilesUnchanged: result.productionFilesUnchanged, arguments: 8, manifestEntries: manifestPaths.length, localOutputLinksResolve: true }));
