// Emit an apply_patch document for Nathan's explicitly authorised endorsement.
// Does not write files, change ratings, or modify frozen simulation evidence.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const design = path.dirname(dir);
const records = fs.readFileSync(path.join(design, 'raw/SIM-RUN-01-results.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
const signature = '**Nathan — authorised typed sign-off recorded by Codex, 2 October 2026.**';
const replacements = [
  ['> **AI-assisted draft prepared by Codex for Nathan on 2 October 2026.** Scores and rationales are suggestions for Nathan\'s recheck, not completed qualified human judgement. No human endorsement or signature is inferred. Original generated content and technical results are unchanged. Proposed Burmese replacements are not a certified terminology glossary.', '> **AI-assisted assessment reviewed and endorsed by Nathan on 2 October 2026.** Nathan confirmed reviewing and accepting all the draft files and authorised Codex to record a typed sign-off. Original drafting/source checks were performed by Codex; generated content and technical results are unchanged. Proposed Burmese replacements are not a certified terminology glossary. See [approval record](../review_completion/approval_record.md).'],
  ['**AI draft assessment supplied below; qualified human endorsement remains pending.**', '**Assessment reviewed and endorsed by Nathan, 2 October 2026; AI-assisted drafting disclosed.**'],
  ['Assessor: Nathan — intended human reviewer; AI draft by Codex, endorsement pending. Date: 2 October 2026 (draft preparation, not confirmed human review).', 'Assessor: Nathan. Review/endorsement date: 2 October 2026. Original drafting and source checks: Codex; Nathan confirmed review and acceptance.'],
  ['Nathan (intended reviewer; endorsement pending); AI draft by Codex, 2 October 2026.', 'Nathan (review completed and endorsed, 2 October 2026); original AI-assisted drafting by Codex.'],
  ['This describes the intended human reviewer, not the AI drafter.', 'This describes the human reviewer, not the AI drafter; qualifications are user-provided.'],
  ['This does not claim Nathan has already consulted the source.', 'Source consultation was performed by Codex; Nathan reviewed and endorsed the assessment. Direct source consultation by Nathan is not asserted.'],
  ['Cannot independently judge/certify: preferred Burmese textbook terminology, target-learner comprehension, or learning benefit. Scores are text-level suggestions, not certified native/domain judgements.', 'Limitations: these endorsed text-level judgements are not certified textbook terminology, participant-comprehension evidence or learning-benefit evidence. No independent second reviewer is recorded.'],
  ['No material issue identified in this draft at the frozen introductory scope. Analogy boundaries and native terminology preference still require Nathan\'s confirmation.', 'No material issue identified at the frozen introductory scope; Nathan endorsed this assessment. Analogy boundaries and terminology preferences are not independently certified.'],
  ['native recheck remains necessary', 'the wording proposal is endorsed by Nathan, not certified textbook terminology'],
  ['native terminology endorsement is pending', 'Nathan endorsed this terminology assessment; textbook terminology is not independently certified'],
  ['subject to native terminology recheck', 'endorsed as an editorial proposal, not certified textbook terminology'],
  ['Nathan should decide whether that meets F2; no full interpretation pass is claimed.', 'Nathan endorsed the Partial qualification assessment; no full interpretation pass is claimed.'],
  ['Qualified judgement pending Nathan.', 'Assessment reviewed and endorsed by Nathan, 2 October 2026.'],
  ['Human assessment/endorsement pending.', 'Nathan reviewed and endorsed this failure assessment, 2 October 2026.'],
  ['AI draft for Nathan, 2 October 2026:', 'AI-assisted assessment endorsed by Nathan, 2 October 2026:'],
  ['; qualified human endorsement pending.', '; reviewed and endorsed by Nathan, 2 October 2026.'],
  ['Priority recheck:', 'Recorded concerns:'],
  ['Provisionally yes', 'Yes within the stated scope'],
  ['Provisional contextual adequacy', 'Contextual adequacy'],
  ['contextual clarification assessed provisionally', 'contextual clarification assessed and endorsed'],
  ['Overall session content conclusion: Provisional ', 'Overall session content conclusion: '],
  ['Your original scores, comments and signature above are preserved. The existing language score 1 permits only Partial under the frozen rule, so the original Pass conclusion needs rechecking rather than silent replacement.', 'Your saved scores, comments, Partial conclusion and signature above are preserved. The existing language score 1 permits only Partial under the frozen rule; Nathan has endorsed this recheck and the Partial conclusion.'],
  ['Human endorsement of this recheck: pending Nathan\'s confirmation.', 'Human endorsement of this recheck: Nathan, 2 October 2026.'],
];
const batch = process.argv.find(a => a.startsWith('--batch='));
const selected = batch ? records.slice(Number(batch.split('=')[1]) * 2, Number(batch.split('=')[1]) * 2 + 2) : records;
let patch = '*** Begin Patch\n';
for (const record of selected) {
  const file = path.join(design, 'human_review', record.id + '.md');
  const before = fs.readFileSync(file, 'utf8');
  assert.ok(!before.includes('authorised typed sign-off recorded by Codex'), 'Already endorsed: ' + record.id);
  let after = before;
  for (const [from, to] of replacements) after = after.replaceAll(from, to);
  after = after.replace(/\*\*Provisional (Pass|Partial|Fail) — AI-assisted draft; Nathan's endorsement pending\.\*\*/g, '**$1 — reviewed and endorsed by Nathan, 2 October 2026 (AI-assisted drafting disclosed).**');
  after = after.replace(/^Reviewer signature and review date: .*\bpending\b.*$/gm, 'Reviewer signature and review date: ' + signature);
  if (!after.includes(signature)) after += '\nAuthorised sign-off for this worksheet, including any retained original entries and appended recheck: ' + signature + '\n';
  assert.ok(!/\bpending\b|endorsement remains|still require Nathan's confirmation/.test(after), record.id + ' unresolved status');
  patch += `*** Update File: ${file}\n@@\n${before.trimEnd().split('\n').map(l => '-' + l).join('\n')}\n${after.trimEnd().split('\n').map(l => '+' + l).join('\n')}\n`;
}
patch += '*** End Patch';
process.stdout.write(patch);
