// Read-only checks for documentation consolidation, not runtime evaluation.
import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const run = (command, args, options = {}) => cp.execFileSync(command, args, { cwd: root, maxBuffer: 30 * 1024 * 1024, ...options });
const read = file => fs.readFileSync(path.join(root, file));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const index = JSON.parse(read('evaluation/archive/consolidation_index.json'));
// Later test-only runs may add evidence without changing protected historical records.
const supplemental = index.supplementalWhiteBoxCoverage;
const supplementalFiles = supplemental ? Object.keys(supplemental.files) : [];
for (const file of supplementalFiles) {
  assert.ok(file.startsWith(supplemental.directory + '/'), 'Supplement must be inside its own run directory');
  assert.equal(sha(read(file)), supplemental.files[file], 'Supplementary evidence changed: ' + file);
}
assert.equal(sha(read(index.archive)), index.archiveSha256, 'Archive identity changed');
const archivedPaths = run('unzip', ['-Z1', index.archive], { encoding: 'utf8' }).trim().split('\n').sort();
assert.deepEqual(archivedPaths, index.entries.map(entry => entry.originalPath).sort());
for (const entry of index.entries) {
  assert.equal(sha(run('unzip', ['-p', index.archive, entry.originalPath])), entry.originalSha256, entry.originalPath);
  assert.ok(fs.existsSync(path.join(root, entry.currentReport)), 'Missing current destination: ' + entry.currentReport);
  assert.equal(fs.existsSync(path.join(root, entry.originalPath)), entry.standaloneRetained, 'Unexpected standalone path: ' + entry.originalPath);
}

const active = run('rg', ['--files', 'evaluation', '-g', '*.md'], { encoding: 'utf8' }).trim().split('\n').sort();
assert.deepEqual(active, index.currentReports.map(report => report.path).sort());
assert.equal(active.length, 21);
for (const report of index.currentReports) assert.equal(sha(read(report.path)), report.sha256, 'Current report changed: ' + report.path);

const protectedFiles = run('rg', ['--files', 'evaluation', '-g', '!*.md'], { encoding: 'utf8' }).trim().split('\n').filter(file => !file.startsWith('evaluation/archive/') && !supplementalFiles.includes(file)).sort();
const protectedDigest = sha(protectedFiles.map(file => file + '\0' + sha(read(file))).join('\n'));
assert.equal(protectedFiles.length, index.protectedNonMarkdown.files);
assert.equal(protectedDigest, index.protectedNonMarkdown.sha256, 'Original non-Markdown evidence changed');
assert.equal(sha(read('evaluation/04_paper/assignment_5_working_paper.md')), index.paperSha256, 'Paper changed');
assert.equal(sha(read('docs/INFOSYS_720_Assignment_5.pdf')), index.submissionPdfSha256, 'Submission PDF changed');
// The coverage supplement permits only root tests and their unit-test configuration to change.
const testOnlyExclusions = supplemental ? [':(exclude)burmese_stem_ai/tests/**', ':(exclude)burmese_stem_ai/vitest.config.mts'] : [];
run('git', ['diff', '--exit-code', index.priorCommit, '--', 'burmese_stem_ai', ...testOnlyExclusions]);
if (supplemental) {
  const verified = JSON.parse(read(supplemental.directory + '/verification.json'));
  assert.equal(verified.result, 'Pass');
  assert.equal(verified.deterministicTests, 511);
  assert.equal(verified.integrationTests, 12);
  assert.equal(verified.productionChanges, 0);
  assert.equal(verified.sourceCopiesCreated, 0);
  const metadata = JSON.parse(read(supplemental.directory + '/metadata.json'));
  for (const [file, expected] of Object.entries(metadata.productionHashes)) {
    assert.equal(sha(read(file)), expected, 'Production file changed after supplement: ' + file);
  }
  for (const [file, expected] of Object.entries(metadata.testHashes)) {
    assert.equal(sha(read(file)), expected, 'Test/config changed after supplement: ' + file);
  }
}
run('git', ['diff', '--check']);

let localLinks = 0, fragments = 0;
for (const file of [...active, 'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md']) {
  const text = read(file).toString('utf8');
  for (const match of text.matchAll(/!?\[[^\]\n]*\]\(([^\s)]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [raw, fragment] = href.split('#');
    const target = raw ? path.resolve(root, path.dirname(file), decodeURI(raw)) : path.join(root, file);
    assert.ok(fs.existsSync(target), file + ' broken link: ' + href);
    localLinks++;
    if (fragment && target.endsWith('.md')) {
      const headings = [...fs.readFileSync(target, 'utf8').matchAll(/^#{1,6} +(.+)$/gm)].map(h => h[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-'));
      assert.ok(headings.includes(decodeURI(fragment)), file + ' broken heading: ' + href);
      fragments++;
    }
  }
}

function csv(text) {
  const rows = []; let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted; }
    else if (c === ',' && !quoted) { row.push(value); value = ''; }
    else if (c === '\n' && !quoted) { row.push(value); rows.push(row); row = []; value = ''; }
    else if (c !== '\r') value += c;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}
const scores = csv(read('evaluation/02_design/simulation/human_content_scores.csv').toString('utf8'));
const header = scores.shift();
const outcomeIndex = header.indexOf('content_outcome');
assert.ok(outcomeIndex >= 0); assert.equal(scores.length, 91);
const totals = { Pass: 0, Partial: 0, Fail: 0 };
for (const row of scores) { assert.ok(row[outcomeIndex] in totals); totals[row[outcomeIndex]]++; }
assert.deepEqual(totals, { Pass: 18, Partial: 71, Fail: 2 });
const annotations = JSON.parse(read('evaluation/02_design/simulation/bilingual_assessment/annotations.json'));
assert.equal(annotations.findings.length, 41);

// Substantive preservation checks prevent another summary-only consolidation.
const archived = file => run('unzip', ['-p', index.archive, file], { encoding: 'utf8' });
const interview = archived('evaluation/01_conceptual/genai/GENAI-01_interview.md');
const recordedInterview = interview.slice(interview.indexOf('# 7. Master Context Prompt'), interview.indexOf('# 18. Controlled Clarification Prompts'));
const interviewReport = read('evaluation/01_conceptual/genai/GENAI-01_analysis.md').toString('utf8');
const fencedExchanges = [...recordedInterview.matchAll(/```[^\n]*\n[\s\S]*?```/g)].map(m => m[0]);
assert.equal(fencedExchanges.length, 20, 'Master prompt, acknowledgement and nine prompt/response pairs');
for (const exchange of fencedExchanges) assert.ok(interviewReport.includes(exchange), 'Interview exchange was altered or omitted');
assert.equal([...interviewReport.matchAll(/^### Fixed Question \d+ — /gm)].length, 9);

const simulationReport = read('evaluation/02_design/simulation/simulation_analysis.md').toString('utf8');
const reviewFiles = index.entries.filter(e => /^evaluation\/02_design\/simulation\/human_review\/[^/]+\.md$/.test(e.originalPath));
assert.equal(reviewFiles.length, 55);
assert.equal([...simulationReport.matchAll(/^<summary>SIM/gm)].length, 55);
let assessmentTables = 0;
const assessedOutputs = new Set();
for (const entry of reviewFiles) {
  const original = archived(entry.originalPath);
  const id = path.basename(entry.originalPath, '.md');
  assert.ok(simulationReport.includes('<summary>' + id + ' —'), 'Missing full case: ' + id);
  const tables = [...original.matchAll(/\| Dimension \| Score[^\n]*\n(?:\|[^\n]*\n)+/g)];
  for (const heading of original.matchAll(/^### Qualified human judgement — (.+)$/gm)) assessedOutputs.add(id + '/' + heading[1]);
  assessmentTables += tables.length;
  for (const table of tables) assert.ok(simulationReport.includes(table[0].trimEnd()), 'Score rationale changed: ' + id);
  // English/Burmese generated paragraphs and route metadata are retained, not replaced with descriptions.
  for (const match of original.matchAll(/(?:English|Burmese):\n\n([^\n]+(?:\n(?!\n)[^\n]+)*)/g)) {
    assert.ok(simulationReport.includes(match[1].trimEnd()), 'Generated text changed: ' + id);
  }
}
assert.equal(assessedOutputs.size, 91, 'Distinct delivered output assessments');
assert.equal(assessmentTables, 92, '91 outputs plus SIM01-A retained original/recheck table');
assert.equal([...simulationReport.matchAll(/^\| Dimension \| Score/gm)].length, 92);
const bilingualReport = read('evaluation/02_design/simulation/bilingual_assessment/results.md').toString('utf8');
for (const finding of annotations.findings) {
  assert.ok(bilingualReport.includes('| ' + finding.id + ' |'), 'Missing annotation: ' + finding.id);
  assert.ok(bilingualReport.includes(finding.en), 'Missing English span: ' + finding.id);
  assert.ok(bilingualReport.includes(finding.my), 'Missing Burmese span: ' + finding.id);
  assert.ok(bilingualReport.includes(finding.reason), 'Missing annotation rationale: ' + finding.id);
}
const contractGroups = [
  ['static/static_analysis_test_cases.md', 'static/static_analysis_test_cases.md', 'STA-', 14],
  ['dynamic/dynamic_analysis_test_cases.md', 'dynamic/dynamic_analysis.md', 'DYN-', 13],
  ['optimisation/bounds_analysis_test_cases.md', 'optimisation/bounds_analysis.md', 'BND-', 17],
  ['black_box/black_box_test_cases.md', 'black_box/black_box_analysis.md', 'BB', 24],
];
const comparable = s => s.replace(/!?\[([^\]\n]*)\]\([^\s)]+\)/g, '$1').replace(/<br\s*\/?>/g, ' ').replace(/\\\|/g, '|').replace(/[*`]/g, '').replace(/\s+/g, ' ').trim();
function caseRows(file) {
  const text = read(file).toString('utf8');
  const header = '| ' + index.unifiedCaseTables.columns.join(' | ') + ' |';
  assert.equal(text.split(header).length - 1, 1, 'One integrated register: ' + file);
  const body = text.slice(text.indexOf(header)).split('\n').slice(2);
  const rows = [];
  for (const line of body) {
    if (!line.startsWith('| ')) break;
    const cells = line.slice(1, -1).split(/(?<!\\)\|/).map(c => c.trim());
    assert.equal(cells.length, 8, 'Eight columns: ' + file + ' / ' + cells[0]);
    assert.ok(cells.every(Boolean), 'Every case field populated: ' + cells[0]);
    rows.push(cells);
  }
  return rows;
}
let integratedRegisterRows = 0;
for (const report of index.unifiedCaseTables.reports) {
  const rows = caseRows(report.path);
  assert.equal(rows.length, report.rowCount, report.path);
  assert.deepEqual(rows.map(r => r[0]), report.caseIds, 'Stable case identities');
  for (const expected of report.expectedContractHashes) {
    const cell = rows.find(r => r[0] === expected.id)[3];
    const normal = cell.replace(/<br\s*\/?>/g, ' ').replace(/\\\|/g, '|').replace(/\s+/g, ' ').trim();
    assert.equal(sha(normal), expected.sha256, 'Expected-result contract: ' + expected.id);
  }
  integratedRegisterRows += rows.length;
}
let detailedTestCases = 0;
for (const [source, destination, prefix, count] of contractGroups) {
  const text = archived('evaluation/02_design/' + source);
  const rows = caseRows('evaluation/02_design/' + destination);
  const matches = [...text.matchAll(new RegExp('^### ' + prefix + '\\d{2} — [^\\n]+\\n[\\s\\S]*?(?=^#{1,3} |$(?![\\s\\S]))', 'gm'))];
  assert.equal(matches.length, count, source + ' case definitions');
  for (const match of matches) {
    const id = match[0].match(new RegExp(prefix + '\\d{2}'))[0];
    const row = rows.find(r => r[0] === id);
    assert.ok(row, 'Missing case: ' + id);
    const tableExpected = [...match[0].matchAll(/^\| Expected \| ([^\n]+?) \|$/gm)].map(m => m[1]);
    const paragraphExpected = [...match[0].matchAll(/(?:^|\n)(?:- )?\*\*Expected[^*]*:\*\*\s*([\s\S]*?)(?=\n(?:- )?\*\*[^*]+:\*\*|$)/g)].map(m => m[1]);
    for (const value of [...tableExpected, ...paragraphExpected]) {
      assert.ok(comparable(row[3]).includes(comparable(value)), 'Expected assertion omitted: ' + id);
    }
    // Input/action fields remain in the same row, rather than deferred to a second case section.
    for (const field of match[0].matchAll(/(?:^|\n)(?:- )?\*\*(?:Action|Actions|Input|Inputs|Precondition|Payload):\*\*\s*([\s\S]*?)(?=\n(?:- )?\*\*[^*]+:\*\*|$)/g)) {
      assert.ok(comparable(row[1] + ' ' + row[2]).includes(comparable(field[1])), 'Action/input omitted: ' + id);
    }
  }
  detailedTestCases += count;
}
const whiteBoxReport = read('evaluation/02_design/white_box/white_box_evaluation.md').toString('utf8');
assert.equal([...whiteBoxReport.matchAll(/WB-T-\d{4}: /g)].length, 361);
assert.equal([...whiteBoxReport.matchAll(/WB-DB-\d{3}: /g)].length, 12);
assert.equal([...whiteBoxReport.matchAll(/WB01-M\d{2}: /g)].length, 39);
const namedTests = csv(read('evaluation/02_design/white_box/white_box_results.csv').toString('utf8'));
const namedHeaders = namedTests.shift();
const htmlText = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', ' / ');
for (const test of namedTests) {
  const id = test[namedHeaders.indexOf('test_id')];
  const contract = (id + ': ' + htmlText(test[namedHeaders.indexOf('named_assertion_contract')])).replace(/\s+/g, ' ');
  assert.ok(whiteBoxReport.includes(contract), 'Named assertion contract omitted: ' + id);
}
const bbRows = caseRows('evaluation/02_design/black_box/black_box_analysis.md');
const bbSource = archived('evaluation/02_design/black_box/black_box_test_cases.md');
for (const id of ['BB20', 'BB21']) {
  const sourceCase = bbSource.match(new RegExp('^### ' + id + ' — [^\\n]+\\n([\\s\\S]*?)(?=^#{1,3} |$(?![\\s\\S]))', 'm'))[1];
  for (const variant of sourceCase.matchAll(/- \*\*([^*]+):\*\*\s*([\s\S]*?)(?=\n- \*\*|$)/g)) {
    if (variant[1] === 'Mapping') continue;
    assert.ok(comparable(bbRows.find(r => r[0] === id)[3]).includes(comparable(variant[1] + ': ' + variant[2])), 'Length/count oracle omitted: ' + id);
  }
}
const scenarioSource = archived('evaluation/02_design/scenario/photosynthesis_scenario.md');
const scenarioRows = caseRows('evaluation/02_design/scenario/photosynthesis_scenario.md');
const operationCases = {
  '3 initial': 'B / SCN-B', '5 Medium / skip': 'D / SCN-D', '6 Needs Support / concept_unclear': 'E / SCN-E',
  '7 capped support, API only': 'SCN-CAP-API-01', '8 High / fade, API only': 'SCN-FADE-API-01',
  '10 relevant follow-up': 'G / SCN-G', '11 unrelated follow-up rejected': 'H / SCN-H',
  '13 Resume': 'J / SCN-J', '14 explicit Finish': 'J / SCN-J', '16 Review': 'J / SCN-J',
  '17 completed response rejected': 'SCN-COMPLETED-API-01',
};
for (const line of scenarioSource.split('\n')) {
  if (!line.startsWith('| ')) continue;
  const cells = line.slice(1, -1).split('|').map(v => v.trim());
  if (!(cells[0] in operationCases)) continue;
  const trail = `${cells[0]}: round ${cells[1]}; events ${cells[2]}; adaptations ${cells[3]}; stored follow-ups ${cells[4]}; status ${cells[5]}; action provider calls ${cells[6]}.`;
  assert.ok(scenarioRows.find(r => r[0] === operationCases[cells[0]])[4].includes(trail), 'Scenario state/call trail changed: ' + cells[0]);
}
for (const [file, count] of [
  ['evaluation/02_design/black_box/black_box_results.csv', 24],
  ['evaluation/02_design/white_box/white_box_results.csv', 373],
  ['evaluation/03_results/master_results.csv', 225],
  ['evaluation/03_results/pirqoa_traceability.csv', 24],
  ['evaluation/03_results/evidence_register.csv', 69],
]) assert.equal(csv(read(file).toString('utf8')).length - 1, count, file);

console.log(JSON.stringify({
  id: index.id, outcome: 'Pass', archivedOriginalsVerified: archivedPaths.length,
  activeMarkdownFiles: active.length, removedStandaloneMarkdownFiles: index.removedStandaloneMarkdownFiles,
  unchangedNonMarkdownEvidenceFiles: protectedFiles.length, localLinksChecked: localLinks,
  headingLinksChecked: fragments, contentScoresVerified: scores.length, contentOutcomes: totals,
  bilingualAnnotationsVerified: annotations.findings.length,
  applicationUnchanged: !supplemental, productionApplicationUnchanged: true,
  supplementaryWhiteBoxRunVerified: supplemental?.runId ?? null,
  verbatimInterviewBlocksVerified: fencedExchanges.length, detailedOperationalCasesVerified: detailedTestCases,
  fullSimulationCasesVerified: reviewFiles.length, outputAssessmentRationaleTablesVerified: assessmentTables,
  distinctAssessedOutputsVerified: assessedOutputs.size,
  integratedCaseTablesVerified: index.unifiedCaseTables.reports.length, integratedRegisterRowsVerified: integratedRegisterRows,
  namedWhiteBoxAssertionsVerified: 373, routeCombinationsVerified: 39,
  workingPaperUnchanged: true, submissionPdfUnchanged: true,
  evaluationRerun: Boolean(supplemental), historicalEvaluationResultsReplaced: false,
}, null, 2));
