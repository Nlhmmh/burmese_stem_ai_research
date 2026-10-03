// Emit apply_patch input for derived case/per-assertion registers.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const raw=path.dirname(fileURLToPath(import.meta.url)),design=path.dirname(raw),run=path.join(raw,'RUN-B01-20261002-BLACKBOX-01');
const read=name=>fs.readFileSync(path.join(run,name),'utf8');
const api=read('results.jsonl').trim().split('\n').map(JSON.parse),browser=JSON.parse(read('browser_observations.json')),extra=read('public_boundary_addendum.jsonl').trim().split('\n').map(JSON.parse);
const notes={
 BB01:'201 creation, structured bilingual content, round-zero state and retrieval passed with controlled ready output.',
 BB02:'All five invalid/malformed inquiry variants returned safe 400 without writes/provider-seam calls.',
 BB03:'Contextualised fixture accepted and ambiguous fixture returned controlled 422; browser clarified without a session. This does not test live LLM interpretation.',
 BB04:'All three preferences persist; browser presentation and both single-language bilingual overrides observed. Exact initial SIM01-B fixture has existing endorsed assessment; no new general language-quality claim.',
 BB05:'All five stored support areas and hint reveal verified; exact initial fixture previously endorsed. First browser predicate wrongly required Hide Hint; retained UI03b recheck corrects this non-oracle assumption.',
 BB06:'High recorded fade 0→0 with no provider-seam call/adaptation; Finish remained available and worked.',
 BB07:'Both default route/type/round/persistence transitions passed. Meaningful novelty of fixture adaptations is Not assessed; prefixes on reused paragraphs are not semantic novelty.',
 BB08:'All five explicit routes, skip, clarification requirement, bilingual overrides, corrected concept/trace and UI choices executed. First extra ambiguity assertion wrongly expected no round: generated clarification actually uses one round. Retained addendum confirms this. Fixture semantic appropriateness/non-repetition Not assessed.',
 BB09:'Round-one adaptation/event persisted exactly once and survived API/browser retrieval.',
 BB10:'Second adaptation persisted with round 2 and review_recommended; browser limit feedback matched.',
 BB11:'At cap, extra response persisted 2→2 with no new adaptation/provider-seam call; browser prevented a further adaptation and retained limit feedback after reload.',
 BB12:'Relevant fixture answer persisted once without changing Stage7. Addendum provider-input capture used corrected active concept/latest scaffold/route; answer quality there is not assessed.',
 BB13:'Unrelated fixture answer rejected with safe 422 and newSessionRecommended; no write; browser preserved follow-up allowance.',
 BB14:'API owner scoping/order/labels passed; final browser History contained exactly its own ten sessions newest-first, independently checked against snapshot.',
 BB15:'API projections matched stored fields; browser Review restored exact initial/adapted/follow-up text and all event entries after completion. Raw clarification and preference values are not separately displayed as history fields.',
 BB16:'Rounds 0/1/2 survived API/browser reload, retaining next actions and bound; corrected concept/previous-current trace also survived reload.',
 BB17:'Valid preference PATCH/GET and reload passed; old/new snapshots remained independent; invalid/unknown/type/empty updates were 400 with no write.',
 BB18:'Six controlled non-2xx/real-20s-timeout variants across three paths returned safe 502 and unchanged state; exactly one seam call each. Browser initial/follow-up recovery demonstrated. No external provider latency claim.',
 BB19:'24 malformed-output injections across initial/adaptation/follow-up/correction returned controlled 502 without writes. Browser malformed adaptation/follow-up errors and explicit recovery verified.',
 BB20:'1000 accepted and 1001 rejected at the real HTTP boundary; rejection made no provider-seam call/write.',
 BB21:'500 accepted, 501 rejected, third question 409; exactly two stored answers and browser limit feedback.',
 BB22:'Foreign detail/respond/follow-up/completion and forged-header attempts were 404 with no foreign mutation; browser ownership rejection passed. Frozen absent-identity 400 expectation failed: public proxy issued anonymous cookie and 200 empty History. No-cookie/invalid-cookie addendum confirmed isolation. This is an oracle/boundary mismatch, not observed leakage.',
 BB23:'Invalid/conflicting responses, malformed bodies, invalid/missing UUIDs and invalid completion payloads returned the expected safe codes without provider-seam calls/writes.',
 BB24:'Completion/repeat were idempotent; post-completion response rejected 409 without event/adaptation/provider-seam call; browser completion/Review matched.',
};
const outcome=r=>['BB07','BB08'].includes(r.id)?'Partial':r.outcome;
const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
const csv=rows=>rows.map(row=>row.map(quote).join(',')).join('\n')+'\n';
const summary=csv([['case_id','run_id','execution_status','first_api_outcome','assessed_case_outcome','api_assertions','browser_observation_ids','evidence_ids','qualification'],...api.map(r=>[r.id,'RUN-B01-20261002-BLACKBOX-01','Executed',r.outcome,outcome(r),r.assertions.length,browser.filter(b=>b.maps.includes(r.id)).map(b=>b.id).join('|'),'E024|E025|E026|E027',notes[r.id]])]);
const assertions=[['case_id','assertion_id','scope','outcome','assertion','evidence_locator']];
for(const r of api)r.assertions.forEach((a,i)=>assertions.push([r.id,r.id+'-API-'+String(i+1).padStart(3,'0'),'first frozen API execution',a.pass?'Pass':'Fail',a.name,'raw/RUN-B01-20261002-BLACKBOX-01/results.jsonl#'+r.id+'.assertions['+i+']']));
for(const r of extra)r.checks.forEach((a,i)=>assertions.push([r.id.split('-')[0],r.id+'-'+i,'post-observation public addendum',a.pass?'Pass':'Fail',a.name,'raw/RUN-B01-20261002-BLACKBOX-01/public_boundary_addendum.jsonl#'+r.id]));
for(const r of browser)r.checks.forEach((a,i)=>assertions.push([r.maps.join('|'),r.id+'-'+i,'browser observation (first attempts and rechecks retained)',a.pass?'Pass':'Fail',a.name,'raw/RUN-B01-20261002-BLACKBOX-01/browser_observations.json#'+r.id]));
for(const id of ['BB07','BB08'])assertions.push([id,id+'-CONTENT-SCOPE','content adequacy','Not assessed','Meaningful semantic novelty/route-appropriate quality of synthetic adaptation fixtures is not live-model or qualified-human evidence.','black_box_analysis.md#content-and-method-boundaries']);
let spec=fs.readFileSync(path.join(design,'black_box_test_cases.md'),'utf8');
spec=spec.replace('| Status | Planned; no black-box case executed by this file |','| Status | Executed with qualifications: 24 cases accounted for; assessed 21 Pass, 2 Partial, 1 Fail; first API outcomes 22 Pass/2 Fail retained |').replace('| Evaluator / run ID | `TO RECORD` |','| Evaluator / run ID | Codex technical evaluation under user direction / `RUN-B01-20261002-BLACKBOX-01` |');
for(const r of api)spec=spec.replace(`| ${r.id} | Not run | Not assessed | — | — |`,`| ${r.id} | Executed | ${outcome(r)} | E024–E027 | ${notes[r.id]} |`);
spec=spec.replace('## Method rule','## Recorded execution\n\nSee [analysis and oracle discrepancies](black_box_analysis.md), [run metadata](00_run_metadata.md), [case results](black_box_results.csv), and [per-assertion results](black_box_assertions.csv). The pre-run specification is retained unchanged in `raw/RUN-B01-20261002-BLACKBOX-01/frozen_test_cases.md`. Current assessed outcomes account for fixture-only content limits; they do not overwrite the first API outcomes or failed browser predicates. No application source was changed.\n\n## Method rule');
function patch(file,next){if(fs.existsSync(file)){const old=fs.readFileSync(file,'utf8');return `*** Update File: ${file}\n@@\n${old.trimEnd().split('\n').map(l=>'-'+l).join('\n')}\n${next.trimEnd().split('\n').map(l=>'+'+l).join('\n')}\n`;}return `*** Add File: ${file}\n${next.trimEnd().split('\n').map(l=>'+'+l).join('\n')}\n`;}
process.stdout.write('*** Begin Patch\n'+patch(path.join(design,'black_box_results.csv'),summary)+patch(path.join(design,'black_box_assertions.csv'),csv(assertions))+patch(path.join(design,'black_box_test_cases.md'),spec)+'*** End Patch');
