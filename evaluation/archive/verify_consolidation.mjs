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
for (const report of index.currentReports) assert.equal(sha(read(report.path)), report.sha256, 'Current summary changed: ' + report.path);

const protectedFiles = run('rg', ['--files', 'evaluation', '-g', '!*.md'], { encoding: 'utf8' }).trim().split('\n').filter(file => !file.startsWith('evaluation/archive/')).sort();
const protectedDigest = sha(protectedFiles.map(file => file + '\0' + sha(read(file))).join('\n'));
assert.equal(protectedFiles.length, index.protectedNonMarkdown.files);
assert.equal(protectedDigest, index.protectedNonMarkdown.sha256, 'Original non-Markdown evidence changed');
assert.equal(sha(read('evaluation/04_paper/assignment_5_working_paper.md')), index.paperSha256, 'Paper changed');
assert.equal(sha(read('docs/INFOSYS_720_Assignment_5.pdf')), index.submissionPdfSha256, 'Submission PDF changed');
run('git', ['diff', '--exit-code', index.priorCommit, '--', 'burmese_stem_ai']);
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
  bilingualAnnotationsVerified: annotations.findings.length, applicationUnchanged: true,
  workingPaperUnchanged: true, submissionPdfUnchanged: true, evaluationRerun: false,
}, null, 2));
