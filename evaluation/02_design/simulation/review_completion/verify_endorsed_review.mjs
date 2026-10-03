// Read-only checks; optional modes emit apply_patch input for derived records.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const design = path.dirname(dir);
const root = path.resolve(design, '../../..');
const read = file => fs.readFileSync(file, 'utf8');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const records = read(path.join(design, 'raw/SIM-RUN-01-results.jsonl')).trim().split('\n').map(JSON.parse);
const official = path.join(design, 'human_content_scores.csv');
const fields = ['case_id', 'output_id', 'technical_correctness', 'contextual_relevance', 'language_adequacy', 'explanation_beyond_translation', 'adaptation_appropriateness', 'assessor', 'competence', 'reference', 'rationale', 'content_outcome'];
const quote = value => '"' + String(value).replaceAll('"', '""') + '"';
const scores = [], totals = { Pass: 0, Partial: 0, Fail: 0 };
let exactTextFields = 0;
const failures = [], ambiguity = [];
for (const record of records) {
  const file = path.join(design, 'human_review', record.id + '.md');
  const full = read(file);
  assert.ok(full.includes('AI-assisted assessment reviewed and endorsed by Nathan on 2 October 2026'), record.id + ' provenance');
  assert.ok(full.includes('Nathan — authorised typed sign-off recorded by Codex, 2 October 2026.'), record.id + ' signature');
  assert.ok(!/\bpending\b|human review required|not completed qualified human judgement/i.test(full), record.id + ' stale review status');
  assert.ok(full.includes('Technical outcome: ' + record.technicalOutcome), record.id + ' changed technical outcome');
  if (record.technicalOutcome === 'Fail') failures.push(record.id);
  if (!record.steps[0].response.session) ambiguity.push(record.id);
  for (const step of record.steps) {
    if (step.step === 'initial' && step.response.session) {
      for (const item of [...Object.values(step.response.session.explanations), step.response.session.reflectivePrompt, step.response.session.hint]) {
        for (const value of [item.en, item.my]) {
          assert.ok(full.includes(value), record.id + ' changed original text'); exactTextFields++;
        }
      }
    }
    if (step.response.adaptation) for (const value of Object.values(step.response.adaptation.content)) {
      assert.ok(full.includes(value), record.id + ' changed adaptation text'); exactTextFields++;
    }
  }
  // SIM01-A retains original entries; the endorsed recheck is authoritative.
  const effective = record.id === 'SIM01-A' ? full.slice(full.indexOf('## AI-assisted recheck')) : full;
  const assessedKeys = [];
  for (const section of effective.split('### Qualified human judgement — ').slice(1)) {
    const key = section.split('\n')[0].trim();
    const boundary = section.indexOf('\n## ');
    const text = boundary < 0 ? section : section.slice(0, boundary);
    const dimensionRows = text.split('\n').filter(line => /^\| (Technical correctness|Contextual relevance|Language adequacy|Explanation beyond translation|Adaptation appropriateness)/.test(line));
    assert.equal(dimensionRows.length, 5, record.id + '/' + key + ' dimensions');
    const dimensions = dimensionRows.map(line => line.split('|')[2].trim());
    assert.ok(dimensions.every(score => ['0', '1', '2', 'NA'].includes(score)));
    const outcome = dimensions.includes('0') ? 'Fail' : dimensions.includes('1') ? 'Partial' : 'Pass';
    const conclusion = text.split('\n').find(line => line.startsWith('Overall content conclusion '));
    assert.ok(conclusion && new RegExp(': (?:\\*\\*)?' + outcome + '(?:\\b| )').test(conclusion), record.id + '/' + key + ' inconsistent conclusion');
    assert.equal(dimensions[4] === 'NA', key === 'initial', record.id + '/' + key + ' adaptation applicability');
    const reference = text.split('\n').find(line => line.startsWith('References consulted '));
    const rationale = dimensionRows.map(line => { const parts = line.split('|'); return parts[1].trim() + ': ' + parts.slice(3, -1).join('|').trim(); }).join(' ');
    scores.push([record.id, key, ...dimensions, 'Nathan', 'User-provided: postgraduate-level knowledge; strong STEM background; native Burmese; advanced English. AI-assisted drafting/source checks by Codex; endorsed 2026-10-02.', reference.slice(reference.indexOf(': ') + 2), rationale, outcome]);
    totals[outcome]++; assessedKeys.push(key);
  }
  const delivered = record.steps.flatMap(step => step.step === 'initial' && step.response.session ? ['initial'] : step.response.adaptation ? [step.step] : []);
  assert.deepEqual(assessedKeys, delivered, record.id + ' assessment/delivery mismatch');
}
assert.equal(records.length, 55); assert.equal(scores.length, 91);
assert.deepEqual(totals, { Pass: 18, Partial: 71, Fail: 2 });
assert.deepEqual(failures.sort(), ['SIM-CM-13', 'SIM-CM-16', 'SIM05-C'].sort());
assert.equal(ambiguity.length, 8);
const a = read(path.join(design, 'human_review/SIM01-A.md'));
assert.ok(a.includes('Reviewer signature and review date: Nathan, 2 Oct 2026'));
assert.ok(a.includes('| Language adequacy (English and Burmese) | 1 | Reflective prompt burmese version contains korean word'));
const amended = read(path.join(design, 'human_review/SIM04-A.md'));
assert.ok(amended.includes('Real world examples has "အလွင့်မပျံဘဲ" which is a minor issue. Suggest "လွင့်ပျံမသွားပဲ"'), 'Nathan amendment preserved');
const originalManifest = path.join(design, 'raw/SIM-RUN-01-manifest.sha256');
const entries = read(originalManifest).trim().split('\n');
for (const entry of entries) {
  const match = entry.match(/^([a-f0-9]{64})  (.+)$/); assert.ok(match);
  assert.equal(hash(path.join(root, match[2])), match[1], 'Original evidence changed: ' + match[2]);
}
const csv = [fields, ...scores].map(row => row.map(quote).join(',')).join('\n') + '\n';
function patch(file, next) {
  if (fs.existsSync(file)) return `*** Update File: ${file}\n@@\n${read(file).trimEnd().split('\n').map(l => '-' + l).join('\n')}\n${next.trimEnd().split('\n').map(l => '+' + l).join('\n')}\n`;
  return `*** Add File: ${file}\n${next.trimEnd().split('\n').map(l => '+' + l).join('\n')}\n`;
}
if (process.argv.includes('--scores-patch')) {
  process.stdout.write('*** Begin Patch\n' + patch(official, csv) + '*** End Patch');
} else {
  assert.equal(read(official), csv, 'Official CSV does not match endorsed worksheet scores');
  const result = {
    endorsementDate: '2026-10-02', timezone: 'Pacific/Auckland', reviewer: 'Nathan',
    authorisation: 'User confirmed review/acceptance of all drafts and explicitly requested Codex to sign on his behalf.',
    signatureType: 'authorised typed sign-off; AI-assisted drafting disclosed', reviewClockTimes: 'not recorded',
    worksheets: 55, deliveredOutputAssessments: 91, contentOutcomes: totals,
    technicalFailuresPreserved: failures, controlledAmbiguityCases: ambiguity.length,
    exactOriginalTextFieldsPreserved: exactTextFields,
    userAmendmentsPreserved: ['SIM01-A original comments/signature and Partial conclusion', 'SIM04-A language score 1, wording rationale and Partial conclusion'],
    originalSimulationManifest: { sha256: hash(originalManifest), entriesVerified: entries.length, outcome: 'Pass' },
    checks: 'Pass: provenance, sign-offs, delivery/assessment mapping, scoring rule, CSV synchronisation, original text and immutable evidence integrity',
    claimsExcluded: ['independent external review', 'certified terminology', 'participant comprehension', 'learning benefit', 'all routes or content passed'],
  };
  if (process.argv.includes('--records-patch')) {
    const validation = path.join(dir, 'review_validation.json');
    const files = [path.join(dir, 'approval_record.md'), path.join(dir, 'verify_endorsed_review.mjs'), path.join(dir, 'record_endorsement.mjs'), path.join(design, 'qualified_human_judgement.md'), path.join(design, '00_run_metadata.md'), official, path.join(design, 'review_drafts/additional_reference_notes.md'), ...records.map(record => path.join(design, 'human_review', record.id + '.md'))];
    const json = JSON.stringify(result, null, 2) + '\n';
    const lines = files.map(file => hash(file) + '  ' + path.relative(root, file));
    lines.push(crypto.createHash('sha256').update(json).digest('hex') + '  ' + path.relative(root, validation));
    const manifest = lines.sort().join('\n') + '\n';
    process.stdout.write('*** Begin Patch\n' + patch(validation, json) + patch(path.join(dir, 'review_manifest.sha256'), manifest) + '*** End Patch');
  } else {
    for (const entry of read(path.join(dir, 'review_manifest.sha256')).trim().split('\n')) {
      const [, expected, relative] = entry.match(/^([a-f0-9]{64})  (.+)$/);
      assert.equal(hash(path.join(root, relative)), expected, 'Endorsed review changed: ' + relative);
    }
    assert.deepEqual(JSON.parse(read(path.join(dir, 'review_validation.json'))), result);
    console.log(JSON.stringify(result));
  }
}
