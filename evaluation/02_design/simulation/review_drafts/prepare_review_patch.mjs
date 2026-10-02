// Emit an apply_patch document; never silently overwrite user-authored review.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { initial, adaptation, references } from './assessment_notes.mjs';
const draftDir=path.dirname(fileURLToPath(import.meta.url)), design=path.dirname(draftDir);
const rows=fs.readFileSync(path.join(design,'raw/SIM-RUN-01-results.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
const batchArg=process.argv.find(a=>a.startsWith('--batch='));
const selected=batchArg?rows.slice(Number(batchArg.split('=')[1])*8,Number(batchArg.split('=')[1])*8+8):rows;
const date='2 October 2026';
const competence='User-provided background for Nathan: postgraduate-level knowledge with a strong STEM background; native Burmese speaker with advanced English proficiency. This describes the intended human reviewer, not the AI drafter.';
const disclaimer=`> **AI-assisted draft prepared by Codex for Nathan on ${date}.** Scores and rationales are suggestions for Nathan's recheck, not completed qualified human judgement. No human endorsement or signature is inferred. Original generated content and technical results are unchanged. Proposed Burmese replacements are not a certified terminology glossary.`;
const signature=`Nathan — human recheck and endorsement pending. AI draft date: ${date}; actual human review/approval date: pending.`;
function ref(r){const [id,title,url]=references[r.base];return `AI-source check: ${id} — [${title}](${url}), accessed 2 October 2026; checked against ${r.base} in the unchanged frozen reference set. This does not claim Nathan has already consulted the source.`+(r.base==='SIM12'?' Supplement S01: [ORNL fibre/composite performance](https://www.ornl.gov/publication/initial-assessment-alternative-carbon-fiber-geometries-design-cost-effective); see [additional reference notes](../review_drafts/additional_reference_notes.md).':'')+(r.base==='SIM07'?' Supplement S02: [NIST pH measurement](https://www.nist.gov/how-do-you-measure-it/how-do-you-measure-acidity-ph-ocean); see [additional reference notes](../review_drafts/additional_reference_notes.md).':'');}
function assessment(r,key){
 const adapted=key!=='initial', a=adapted?adaptation[`${r.id}/${key}`]:initial[r.id];
 assert.ok(a,`Missing handwritten assessment: ${r.id}/${key}`);
 const t=a[0],l=a[1],context=!adapted&&['SIM13','SIM16'].includes(r.base)?1:2;
 const technical=adapted?a[3]:a[2],language=adapted?a[4]:a[3];
 const evidence=adapted?a[5]:a[4],explain=!adapted&&r.id==='SIM11-A'?1:2;
 const score=adapted?a[2]:'NA';
 const contextual=context===1?'The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed. Partial interpretation qualification only; do not infer the intended meaning.':`The ${adapted?'adaptation remains focused on the stored active concept':'sections address the explicit question within its STEM domain'}. This is relevance within the recorded context, not evidence of learner understanding.`;
 const dimensions=[['Technical correctness',t,technical],['Contextual relevance',context,contextual],['Language adequacy (English and Burmese)',l,language],['Explanation beyond translation',explain,adapted?'The retained bilingual output supplies explanatory statements rather than just a translated term. '+evidence:evidence],['Adaptation appropriateness (adaptation only)'+(!adapted?' — use NA for initial output':''),score,adapted?evidence:'NA — initial generation, not an adaptation. Fade and cap do not create additional content.']];
 const required=dimensions.map(d=>d[1]).filter(s=>s!=='NA');
 const outcome=required.includes(0)?'Fail':required.includes(1)?'Partial':'Pass';
 const concerns=dimensions.filter(d=>d[1]===0||d[1]===1).map(d=>`${d[0]}: ${d[2]}`).join(' ');
 return {dimensions,outcome,concerns:concerns||'No material issue identified in this draft at the frozen introductory scope. Analogy boundaries and native terminology preference still require Nathan\'s confirmation.'};
}
function section(r,key){const a=assessment(r,key);return `### Qualified human judgement — ${key}\n\nAssessor: Nathan — intended human reviewer; AI draft by Codex, endorsement pending. Date: ${date} (draft preparation, not confirmed human review).\n\nRelevant STEM / English / Burmese competence: ${competence}\n\nReferences consulted (use the frozen reference set, record additions separately): ${ref(r)}\n\n| Dimension | Score (2 / 1 / 0 / NA) | Evidence and rationale |\n| --- | --- | --- |\n${a.dimensions.map(([d,s,why])=>`| ${d} | ${s} | ${why.replaceAll('|','/')} |`).join('\n')}\n\nMaterial errors / analogy limitations / terminology concerns: ${a.concerns}\n\nOverall content conclusion (Pass / Partial / Fail / Not assessed): **Provisional ${a.outcome} — AI-assisted draft; Nathan's endorsement pending.**\n\nCannot independently judge/certify: preferred Burmese textbook terminology, target-learner comprehension, or learning benefit. Scores are text-level suggestions, not certified native/domain judgements.\n\n`;}
let patch='*** Begin Patch\n', outputCount=0, preserved=[];
for(const r of selected){
 const file=path.join(design,'human_review',`${r.id}.md`), old=fs.readFileSync(file,'utf8');
 assert.ok(!old.includes('AI-assisted draft prepared by Codex'),'Refusing repeat application after human edits');
 const humanExisting=/\| Technical correctness \| [012] \|/.test(old);
 let next=old.replace(/^(# .*\n)/,`$1\n${disclaimer}\n`);
 next=next.replace('**Content has not been assessed.**','**AI draft assessment supplied below; qualified human endorsement remains pending.**');
 if(humanExisting){
   preserved.push(r.id);
   next=next.replace('References consulted (use the frozen reference set, record additions separately): ____________________',`References consulted (use the frozen reference set, record additions separately): ${ref(r)}`);
   next+=`\n## AI-assisted recheck — existing Nathan entries retained\n\nYour original scores, comments and signature above are preserved. The existing language score 1 permits only Partial under the frozen rule, so the original Pass conclusion needs rechecking rather than silent replacement. Fade adds no generated support; therefore the existing yes about meaningful adaptation is not evidence of an adaptation in this Path A case. Ambiguous-input qualification is not applicable to the explicit photosynthesis question.\n\n${section(r,'initial')}Human endorsement of this recheck: pending Nathan's confirmation.\n`;
   outputCount++;
 }else{
   const keys=r.steps.flatMap((s,i)=>i===0&&s.response.session?['initial']:s.response.adaptation?[s.step]:[]);
   for(const key of keys){
     const heading=`### Qualified human judgement — ${key}`;
     const start=next.indexOf(heading); assert.ok(start>=0,heading);
     const rest=next.slice(start+heading.length), found=rest.search(/\n## /);
     const end=found<0?next.length:start+heading.length+found+1;
     next=next.slice(0,start)+section(r,key)+next.slice(end);
     outputCount++;
   }
   if(!r.steps[0].response.session){
     const network=r.base==='SIM15';
     const quoted=r.steps[0].response.error.message;
     next=next.replace('Assessor and competence: ____________________',`Assessor and competence: Nathan (intended reviewer; endorsement pending); AI draft by Codex, ${date}. ${competence}`);
     next=next.replace('Was clarification appropriate and useful? ____________________',`Was clarification appropriate and useful? Provisionally yes: “${network?'network':'current'}” is underspecified, and the message asks for context instead of generating an unconfirmed concept. The learner must submit a new inquiry because no session exists.`);
     next=next.replace('Rationale / references: ____________________',`Rationale / references: ${ref(r)} Actual message: “${quoted}” The listed alternatives demonstrate why a domain choice is needed. References support the STEM meaning, not proof of the learner's intent.`);
     next=next.replace('Conclusion: ____________________','Conclusion: Provisional contextual adequacy 2 for asking clarification; language-support limitation because the delivered message is English-only. Burmese wording/translation fidelity: NA, no Burmese message supplied. Initial/adapted-content ratings: NA, no session content exists. Qualified judgement pending Nathan.');
   }
   const outputs=r.steps.flatMap((s,i)=>i===0&&s.response.session?[assessment(r,'initial')]:s.response.adaptation?[assessment(r,s.step)]:[]);
   const concerns=outputs.filter(a=>a.outcome!=='Pass').map(a=>a.concerns).join(' ');
   const adapted=r.steps.some(s=>s.response.adaptation);
   const limitedAdapt=r.steps.filter(s=>s.response.adaptation).some(s=>adaptation[`${r.id}/${s.step}`][2]<2);
   next=next.replace('Did support meaningfully change and stay concept-scoped? ____________________',`Did support meaningfully change and stay concept-scoped? ${!r.sessionId?'NA — no session was created.':!adapted?'NA for adaptation: no accepted adaptation was delivered; initial content is assessed above.':limitedAdapt?'Partially: content stays on the active concept, but at least one adaptation repeats an earlier perspective or lacks a distinct scaffold. See output-specific rationale.':'Provisionally yes within the active concept: the recorded examples/perspectives add support described in the output tables. This does not establish educational effectiveness.'}${r.failure?' The failed step delivered no new support and cannot be treated as an adaptation pass.':''}`);
   next=next.replace('For ambiguous input: was the initial interpretation explicitly qualified? ____________________',`For ambiguous input: was the initial interpretation explicitly qualified? ${!r.sessionId?'Yes, ambiguity was explicitly surfaced, not resolved; the learner must provide context.':['SIM13','SIM16'].includes(r.base)?'Partially: a technical-domain label appears, but the response does not clearly invite confirmation or contrast other meanings. Nathan should decide whether that meets F2; no full interpretation pass is claimed.':'NA — the original inquiry already gives an explicit or sufficiently identifiable STEM context.'}`);
   next=next.replace('Language-help usefulness / translation fidelity: ____________________',`Language-help usefulness / translation fidelity: ${!r.sessionId?'Burmese adequacy cannot be judged because only an English clarification message was delivered.':'See each language-adequacy row for exact defects and proposed replacements. Retaining useful English terminology is acceptable; foreign-script intrusions, wrong quantity terms and contradictory wording are not.'}${r.path==='LANG'?' Bilingual override is technical evidence only; the term-focused usefulness is limited as described, and no browser rendering was assessed.':''}`);
   const outcome=!outputs.length?'Not assessed for generated explanations; contextual clarification assessed provisionally':outputs.some(a=>a.outcome==='Fail')?'Provisional Fail':outputs.some(a=>a.outcome==='Partial')?'Provisional Partial':'Provisional Pass at the frozen introductory scope';
   next=next.replace('Overall session content conclusion: ____________________',`Overall session content conclusion: ${outcome}; qualified human endorsement pending.${r.failure?' Technical intended-path failure remains Fail independently of the scores for earlier delivered content.':''}${concerns?' Priority recheck: '+concerns:''}`);
   next=next.replace('Reviewer signature and review date: ____________________',`Reviewer signature and review date: ${signature}`);
   if(r.failure){
     const text=r.id==='SIM05-C'?'NA for the missing conceptual output: provider AbortError; no content was delivered. Assess the earlier initial/simpler outputs only. No content correctness or Burmese judgement is possible for the failed step.':'Rejection is consistent with the unchanged-concept validator: the model labels the same interpretation corrected. That is not proof the rejected explanation is factually false. A better bounded response could confirm the intended interpretation and revise support; that would require a separately authorised application change/new baseline. Do not score the rejected text as delivered support.';
     next=next.replace('Qualified judgement of failure / appropriateness of rejection: ____________________',`Qualified judgement of failure / appropriateness of rejection: AI draft for Nathan, ${date}: ${text} Human assessment/endorsement pending.`);
   }
 }
 assert.ok(!next.includes('____________________'),`Unfilled field in ${r.id}`);
 patch+=`*** Update File: ${file}\n@@\n${old.trimEnd().split('\n').map(l=>'-'+l).join('\n')}\n${next.trimEnd().split('\n').map(l=>'+'+l).join('\n')}\n`;
}
assert.equal(Object.keys(initial).length,47); assert.equal(Object.keys(adaptation).length,44);
if(!batchArg)assert.equal(outputCount,91);
patch+='*** End Patch';
if(process.argv.includes('--summary'))console.log(JSON.stringify({cases:rows.length,outputs:outputCount,preservedHumanEntries:preserved}));
else process.stdout.write(patch);
