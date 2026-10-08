// Step 22: recorded-evidence traceability only. No application/test/provider/DB execution.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const runtime='/Users/nlh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node';
const require=createRequire(runtime+'/package.json');
const {Workbook}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const hash=p=>sha(fs.readFileSync(path.resolve(root,p)));
const dir='evaluation/03_results/';
const matrixPath=dir+'pirqoa_traceability.csv',notesPath=dir+'pirqoa_traceability_notes.md';
const masterPath=dir+'master_results.csv',registerPath=dir+'evidence_register.csv';
const inputPath=dir+'raw/PIRQOA-RUN-01-input.json',manifestPath=dir+'raw/PIRQOA-RUN-01-manifest.sha256';
const verificationPath=dir+'raw/PIRQOA-RUN-01-verification.json';
const helperPath=dir+'raw/build_pirqoa_traceability.mjs';
const headers='problem,issue,requirement_id,requirement,rq,objective,artefact,framework_stages,criteria,result_ids,evidence_ids,supported_claim,unsupported_claim_or_gap'.split(',');
function parseCSV(s){s=s.replace(/^\uFEFF/,'');const rows=[];let row=[],v='',q=false;
 for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(q&&s[i+1]==='"'){v+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(v);v='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&s[i+1]==='\n')i++;row.push(v);if(row.some(Boolean))rows.push(row);row=[];v='';}else v+=c;}if(q)throw Error('Unclosed CSV quote');if(v||row.length){row.push(v);rows.push(row);}return rows;}
const objects=m=>m.slice(1).map(r=>Object.fromEntries(m[0].map((h,i)=>[h,r[i]])));
const csv=m=>m.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
const addPatch=(p,s)=>'*** Add File: '+path.resolve(root,p)+'\n'+s.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';
const registerBytes=read(registerPath),register=objects(parseCSV(registerBytes));
const evidence=new Map(register.map(r=>[r.evidence_id,r]));
const imported=await Workbook.fromCSV(read(masterPath),{sheetName:'Results'});
const resultRows=objects(imported.worksheets.getItem('Results').getUsedRange().values);
const results=new Map(resultRows.map(r=>[r.result_id,r]));
if(resultRows.length!==225||results.size!==225)throw Error('Expected 225 immutable master results');
const reqs={
 'REQ-01':{rq:'RQ1',problem:'Specialised English STEM terminology, limited Burmese resources and potentially misleading literal translation.',requirement:'Identify specialised terms and provide context-sensitive Burmese support, preserving useful English terms.',objective:'Develop multilingual STEM terminology support.'},
 'REQ-02':{rq:'RQ2',problem:'Translation alone may be insufficient for conceptual STEM support.',requirement:'Provide clear concept explanations and examples beyond translation.',objective:'Develop conceptual STEM explanation.'},
 'REQ-03':{rq:'RQ3',problem:'Static or unstructured assistance offers insufficient adaptive scaffolding.',requirement:'Provide structured, learner-responsive assistance through bounded adaptive scaffolding.',objective:'Develop an adaptive scaffolding approach.'}
};
const rows=[],topics=[];
function add(req,topic,issue,artefact,stages,criteria,ids,supported,gap){
 const q=reqs[req],selected=ids.split('|').map(id=>{if(!results.has(id))throw Error('Unknown result '+id);return results.get(id);});
 const eids=[...new Set(selected.flatMap(r=>r.evidence_ids.split('|')))].sort();
 rows.push([q.problem,issue,req,q.requirement,q.rq,q.objective,artefact,stages,criteria,ids,eids.join('|'),supported,gap]);
 topics.push({topic,csv_row:rows.length+1,requirement_id:req,issue});
}
const conceptual='Refined conceptual framework E056 section 26; current CA-ARG v2 E058 (historical evidence separately identified through result baselines)';
const poc='B01 proof of concept; root-project production identity; ROOTTESTS-02 where white-box evidence is used';
const both=conceptual+'; '+poc;

add('REQ-01','RQ1-overall','Insufficient terminology and contextual language support (overall assessment)',both,'1|2|3|7','C1|C2|C3|C4|C5|F1|F2|F3|F12|F13|U1|U6|U8',
 'R001|R002|R003|R004|R005|R006|R007|R008|R080|R081|R082|R091|R092|R093|R098|R100|R177|R178|R185|R188|R190|R191|R198|R203|R204|R205|R210|R220|R221|R223|R224',
 'Partially supported overall. A literature-grounded framework and functioning PoC integrate concept/domain identification, bounded context repair and selective Burmese/English presentation in recorded cases. F1–F3 remain Partial; readable display and working routes establish bounded implementation capability.',
 'Reliable intended-meaning interpretation, accurate Burmese terminology and an optimal retention policy are not established. Live unchanged-correction failures, eight initial no-session ambiguities, material gravity/ion wording failures and English errors in Burmese UI remain. No validated ATE, participant barrier-reduction study, universal domain coverage, independent expert study or superiority claim.');
add('REQ-01','RQ1-terminology','A target specialised term must be established before relevant support can be selected',conceptual,'1|2','C1|C2|C4',
 'R001|R002|R004|R006|R007|R191',
 'Conceptually justified responsibility: target identification and disciplinary context make later support accountable to the intended concept. The current argument provides cited warrants and removal/counterargument tests.',
 'Learner-inquiry interpretation is not corpus-level automatic term extraction. No extraction precision/recall benchmark, authoritative Burmese glossary or proof that separate stages/calls are uniquely necessary. The 2023 preprint and A2 later journal source retain their recorded version/access limits.');
add('REQ-01','RQ1-context','The same term can denote different STEM concepts or domains',poc,'1|2|7','F2|F6|F9',
 'R081|R123|R146|R149|R155|R160|R177|R192|R200|R201|R202',
 'Tested contracts accept ready/corrected interpretations, expose controlled ambiguity and preserve previous/current concept trace. A recorded cell correction and controlled public-HTTP/browser fixtures reconstruct corrected context without replacing the session.',
 'Mechanical correction does not guarantee the learner’s intended sense. SIM-CM-13/16 failed because purported corrections were unchanged and rejected; initial ambiguous current/network attempts did not create sessions. No successful downstream correction is attributed to these unsuccessful attempts.');
add('REQ-01','RQ1-language-presentation','Learners may need Burmese and English terms despite a saved single-language preference',poc,'3|7','F3|F6|F12|U6',
 'R082|R091|R098|R122|R146|R151|R156|R160|R169|R178|R188',
 'Recorded preference modes and language-help routes support bilingual per-adaptation display while keeping the saved profile and original session snapshot unchanged. Visual glyph/wrapping checks pass within the inspected viewports/locales/themes.',
 'Bilingual visibility does not certify translation fidelity or beginner suitability. Some fixtures reuse paragraphs; no new qualified semantic endorsement was performed. Viewport emulation and readable Unicode are not physical-device or WCAG conformance evidence.');
add('REQ-01','RQ1-term-retention','Literal translation or excessive English retention can obscure technical meaning',both,'3|7','C3|C4|F3|F6|U6',
 'R003|R004|R008|R082|R178|R190|R203|R204|R205|R210',
 'Conceptual and design literature support selective retention of useful English technical terms with contextual explanation. The PoC can revise language support rather than automatically translating every term or altering the profile.',
 'The exact Burmese/English balance remains partially supported. Endorsed mass/weight and ion net-charge errors persist; fresh Photosynthesis retains nontechnical English and lacks an explicit Burmese pairing for chemical energy. Its new content is provisional Codex analysis, not a new human endorsement.');
add('REQ-01','RQ1-correction-bounds','A mistaken concept interpretation needs a bounded repair path without an unrestricted conversation',both,'1|2|7','C2|C4|F2|F6|F7|F9|F13',
 'R002|R004|R007|R012|R081|R085|R086|R146|R150|R160|R192|R200|R201|R214|R216',
 'Context-reinterpretation uses a bounded clarification, application-selected route and persisted prior/current interpretation. Corrected, still-ambiguous and capped outcomes are distinguishable in the recorded contracts; rejected corrections leave state unchanged.',
 'Rejected unchanged corrections are delivery Fail, not successful repair. Generated remaining-ambiguity support consumes a bounded round; the original zero-round supplemental assertion remains Fail. A generic correction badge still appears on an ambiguous outcome (severity 1). No eighth stage or general chat is inferred.');
add('REQ-01','RQ1-enabling-safety','Language support also requires usable inquiry and controlled input/error boundaries',poc,'1|3; enabling interface/provider boundary','F1|F12|F13|U1|U8',
 'R080|R091|R092|R093|R100|R128|R149|R154|R170|R171|R172|R175|R213|R219|R225',
 'Enabling technical evidence: tested inquiry limits, structured-output rejection and safe recovery prevent rejected/malformed initial support from being persisted. Labelled input and keyboard submission work in the recorded inspection.',
 'These controls do not demonstrate reduced learner language barriers. U8 remains Partial because errors are English-only in Burmese UI; preference-save infrastructure-fault UI was not assessed. Fifteen local timing attempts are descriptive, not an SLA or hard timeout guarantee.');

add('REQ-02','RQ2-overall','Insufficient conceptual support beyond translation (overall assessment)',both,'2|4|5|7','C1|C2|C3|C4|C5|F4|F6|U2|U6',
 'R001|R002|R003|R004|R005|R007|R009|R010|R083|R085|R094|R098|R117|R119|R149|R157|R159|R160|R179|R186|R187|R196|R203|R204|R205|R207|R208|R209|R210|R217|R220|R221',
 'Partially supported overall. The framework separates core concept meaning from supporting scaffolds, and recorded PoC outputs provide layered explanations, examples, reflection and hints beyond isolated term translation. F4 remains Partial; visible structure and bounded revised support are demonstrated.',
 'Meaningful structure does not establish consistently correct science, natural Burmese, novel adaptation or improved understanding/retention. Delivered-output ratings are mixed, including two material initial content Fail cases. Fresh scenario content remains provisional; no learner experiment or independent expert validation.');
add('REQ-02','RQ2-core-scaffold-rationale','Core meaning and pedagogical assistance need distinguishable responsibilities',conceptual,'2|4|5','C1|C2|C3|C4',
 'R002|R003|R004|R007|R009|R010|R062|R063|R179|R186',
 'Conceptually justified core meaning plus qualified scaffold selection: the cited current argument supports concept-focused explanation and purposeful assistance, with removal tests and counterarguments. Refinement clarifies Stage 4/5 responsibilities rather than merging them.',
 'Explanation and scaffolding can overlap. Labels and five selected forms are local design choices, not a uniquely proven cognitive sequence. No measured cognitive-load reduction, competence-calibrated scaffolding or superiority over a glossary/tutor alternative.');
add('REQ-02','RQ2-five-support-forms','Learners need explanatory structure rather than a translated isolated word',poc,'4|5','F4|U2|U6',
 'R083|R094|R098|R117|R149|R157|R179|R186|R187|R206|R207',
 'Recorded initial sessions contain Simple Explanation, Real-World Example, Technical Explanation, Reflective Prompt and revealable Hint. Schema/contract checks preserve all five areas, and browser observations distinguish them from adaptations and follow-up answers.',
 'The presence of five fields and visible hierarchy is structural evidence, not proof that an analogy is appropriate, a hint is sufficient, reflection is used or an explanation teaches successfully. The fresh scenario technical-scope concern remains.');
add('REQ-02','RQ2-explanation-revision','An additional example or revised explanation should offer meaningful concept-focused support',both,'4|5|7','C2|C3|F4|F6',
 'R010|R012|R083|R085|R119|R146|R159|R160|R179|R203|R209|R217',
 'The concept-unclear route requests revised core meaning and a scaffold, while simpler/exemplar routes target the chosen support form. Recorded delivered revisions include causal explanations and different examples; the fresh second adaptation adds a making-versus-taking-food contrast and analogy.',
 'This is not a misconception diagnosis or a guarantee of meaningful novelty. BB07/08 prefixed fixtures were not semantically assessed; literal repetition rejection is not pedagogical non-repetition. The first fresh Photosynthesis example largely repeats prior content and receives no unconditional novelty Pass.');
add('REQ-02','RQ2-scientific-language-quality','Incorrect definitions or technical language can defeat otherwise structured support',poc,'3|4|5','F3|F4|F6',
 'R082|R083|R179|R196|R198|R203|R204|R205|R208|R210',
 'Qualified assessment is available for the recorded simulation outputs: 91 delivered-output ratings comprise 18 Pass, 71 Partial and two Fail. The review makes scientific and language defects visible instead of treating JSON/technical delivery as correctness.',
 'SIM04-B initial has material mass/weight terminology errors; SIM08-B initial reverses the nonzero net-charge definition in Burmese. The later better adaptations do not repair those initial outputs. Nathan endorsed AI-assisted reviews, not an independent second assessment; failed/not-delivered steps are not delivered content. Fresh bacterial/chloroplast scope wording is a provisional concern.');
add('REQ-02','RQ2-readable-presentation','Conceptual explanations and hints must be distinguishable and visually readable',poc,'4|5; enabling presentation','U2|U6|F4',
 'R083|R094|R098|R117|R157|R186|R207|R210|R221',
 'Technical inspection supports visible section hierarchy, hint reveal and bilingual glyph/wrapping readability at the recorded desktop/mobile widths, locales and themes. These are bounded presentation properties enabling conceptual support.',
 'Readable text does not establish semantic fidelity, satisfaction, comprehension, learnability or accessibility certification. Controlled fixture inspection and viewport emulation are not participant or physical-phone evidence.');

add('REQ-03','RQ3-overall','Insufficient structured, learner-responsive assistance (overall assessment)',both,'5|6A|6B|7','C1|C2|C3|C4|C5|F5|F6|F7|F8|F9|F10|F11|F12|F13|U3|U4|U5|U7|U8|U9',
 'R001|R002|R003|R004|R005|R010|R011|R012|R084|R085|R086|R087|R088|R089|R090|R091|R092|R095|R096|R097|R099|R100|R101|R143|R146|R147|R148|R150|R151|R174|R180|R181|R182|R183|R184|R189|R194|R197|R198|R199|R200|R201|R203|R212|R213|R214|R220|R221|R222',
 'Partially supported overall. The framework is instantiated as an optional two-level self-report, deterministic route selection, bounded generation, scoped follow-up and durable state/history. Recorded external and internal checks corroborate tested mechanics; F5–F13 retain Partial aggregate outcomes.',
 'Responsive system mechanics do not establish calibrated contingency, pedagogical fading, transfer of responsibility or improved learning. Live route failures, mixed support quality, duplicate provider work under contention, BB22 oracle failure and U5/U8/U9 Partials remain. The exact two-round dose is not validated as optimal.');
add('REQ-03','RQ3-learner-response','Learners need a low-burden way to request support without a forced diagnosis',both,'6A|6B|7','C1|C3|F5|U3',
 'R011|R084|R095|R146|R160|R175|R180',
 'Supported bounded mechanism: High, Medium and Needs Support collect overall self-reported need. Medium/Needs Support may choose one of five help types, skip or cancel/back. Invalid/conflicting inputs are rejected; response events retain the signal and selected route.',
 'Legacy understanding is a storage/API name for self-report, not a competence measure. Difficulty selection is optional and does not diagnose misconceptions. No objective mastery/quiz or full proficiency profile was evaluated.');
add('REQ-03','RQ3-route-control','Support requests need deterministic routing rather than model-controlled lifecycle decisions',poc,'7; re-entry to 1|2|3|4|5 when permitted','F2|F3|F5|F6|F7|F9|F13',
 'R084|R085|R086|R110|R118|R119|R122|R123|R146|R149|R150|R158|R159|R160|R175|R181|R199|R200|R201|R216|R217',
 'Application-owned routing selects fade, default/explicit Stage 5 scaffolds, language help, concept clarification or bounded reinterpretation. The recorded 39 response/difficulty/round combinations test route/provider/save decisions; structured contracts fail before invalid persistence.',
 'A selected route does not guarantee delivered support quality. Live abort and unchanged-correction failures remain Fail; semantic novelty of controlled BB07/08 fixtures is Not assessed. Generated remaining-ambiguity support uses a round; its original zero-round oracle failure is retained.');
add('REQ-03','RQ3-contingency','Assistance should respond to need, but the available signal is only self-reported',conceptual,'5|6A|6B|7','C2|C3|C4|F5|F6',
 'R002|R003|R004|R010|R011|R012|R084|R085|R180|R181|R189|R194|R222',
 'Conceptual support with qualification: the cited scaffolding benchmark warrants collecting a learner signal and revising assistance. The PoC implements response-to-route responsiveness, a limited structural proxy for contingency.',
 'No competence diagnosis, measured TTF fit, performance-calibrated support, learner improvement or transfer of responsibility is established. Preference/state persistence is engineering continuity rather than evidence of adaptive pedagogy.');
add('REQ-03','RQ3-fade','Low self-reported need should reduce generation without implying automatic completion',both,'6A|7','C3|F5|F6|F7|F11',
 'R003|R011|R012|R085|R086|R090|R121|R137|R138|R139|R146|R158|R181|R197|R206|R222',
 'Bounded implementation evidence: High records a fade event with no adaptation/provider call or round increment in directly instrumented checks. Explicit Finish remains separate; High at round 2 can leave the stored session in_progress.',
 'Withholding generation on High is not demonstrated educational fading or mastery. DYN-06 retains its indirect-count Partial Pass. The fresh scenario High-at-cap observation was API-only because the capped UI did not offer that response action.');
add('REQ-03','RQ3-round-bound','Generated support needs a server-enforced stopping rule and atomic state transitions',poc,'7','F6|F7|F9|F11|F13',
 'R085|R086|R088|R090|R120|R132|R133|R134|R135|R136|R140|R141|R142|R143|R144|R145|R146|R150|R161|R162|R163|R176|R181|R197|R199|R206|R222',
 'Strong bounded mechanical support: generated, persisted adaptations alone increment the round, capped responses record events without round 3 or generation, and completion is separate/idempotent. Real isolated-DB contention admits one atomic state write and rejects the stale contender.',
 'Two rounds is an engineering guard rail, not an optimal learning dose or global cost ceiling. BND-15 makes two provider calls for one accepted write. Failed SIM05-C did not reach its later cap step; that unreached step is not a Pass. DYN-05 retains indirect counts; fresh cap response checks are API-only.');
add('REQ-03','RQ3-follow-up','Supporting questions must stay concept-scoped and not silently change adaptation state',poc,'5; concept-scoped follow-up leaves Stage 7 state unchanged','F8|F9|F13',
 'R087|R124|R125|R148|R150|R164|R165|R173|R182|R187|R206|R211',
 'Supported tested mechanism: current active concept, latest relevant scaffold/route and preferences reach follow-up generation. Relevant answers persist independently; unrelated topics are controlled, 500/501-character boundaries and the two-question cap are checked, and Stage 7 state stays unchanged.',
 'Scope/answer fixtures and one fresh Photosynthesis answer do not establish universal live scope-classification accuracy or factual quality. Follow-up wording is not automatically converted into a difficulty type and does not consume adaptation rounds or create general chat.');
add('REQ-03','RQ3-continuity','History and reopening a session should preserve its visible support state',poc,'3|5|6A|6B|7; enabling state continuity','F9|F10|F11|U5|U7',
 'R088|R089|R090|R097|R099|R126|R147|R150|R166|R167|R168|R176|R183|R194|R206|R212|R214',
 'Enabling technical support: owned newest-first History, Review of stored adaptations/events/follow-ups and Resume across tested statuses/rounds preserve active/corrected concept trace. Legacy reads and atomic reconstruction are exercised without replacing session IDs.',
 'Persistence is not adaptive teaching success. Not every possible legacy document was tested; raw clarification/preferences are not individually rendered as history fields. U5 remains Partial for modal focus and the ambiguous-outcome badge remains a severity-1 inconsistency.');
add('REQ-03','RQ3-preferences','Support preferences need continuity without silently changing prior session context',poc,'3|7; enabling preference continuity','F3|F12|U5|U8',
 'R082|R091|R097|R100|R151|R156|R169|R183|R188|R194|R218|R219',
 'Enabling technical support: valid preference updates persist, old session snapshots remain independent of later profile changes, and bilingual overrides do not rewrite the saved profile. Preferences remain a modal; locale/theme inspection is within browser-presentation scope.',
 'Preferences do not establish diagnosed learner proficiency or calibrated support fit. Invalid preference choices are UI-unreachable (Not applicable), not forced browser passes; preference-save infrastructure-fault recovery was Not assessed. No claim of synchronised profile locale/theme is inferred.');
add('REQ-03','RQ3-controlled-errors-ownership','Failures and ownership boundaries must protect state without concealing unsuccessful support',poc,'1|5|7; enabling provider/API/DAO safeguards','F7|F9|F10|F13|U8',
 'R089|R092|R115|R128|R147|R149|R150|R170|R171|R174|R175|R184|R193|R199|R200|R201|R213|R215|R219|R224',
 'Enabling technical support: tested safe envelopes and validation reject invalid/malformed outputs before writes, and foreign-session attempts do not mutate foreign state. Live failed responses also leave stored state unchanged; explicit recovery is observed in recorded paths.',
 'Safe rejection does not turn intended-route delivery Fail into Pass. BB22’s absent-identity 400 oracle remains Fail because the public proxy provisions a scoped anonymous cookie. No leakage was observed, but authenticated-user security was not certified. A 20-second timer does not imply a hard wall-clock ceiling (SIM05-C: 52.825 s); original restricted cookie-bearing evidence is not cleared for publication.');
add('REQ-03','RQ3-usability-limits','The complete adaptive workflow needs clear feedback and consistent keyboard/localised interaction',poc,'5|6A|6B|7; enabling UI','U3|U4|U5|U7|U8|U9',
 'R095|R096|R097|R099|R100|R101|R212|R213|R214|R218|R219|R221',
 'Technical inspection covers optional choices, skip/back, pending/adapting, routes, round limits, completion, recovery and state reconstruction. Usability remains six Pass/three Partial across the specified distributed desktop/mobile, locale/theme and keyboard inspection scope.',
 'USI-01 modal focus and USI-02 English-only errors are severity 2; USI-03 remaining-ambiguity badge is severity 1. Fixtures and viewport emulation are not participant satisfaction/learnability, a physical-phone test or WCAG certification. No fixes or new human endorsement are inferred.');

function check(matrix){
 const failures=[],[header,...data]=matrix;
 if(JSON.stringify(header)!==JSON.stringify(headers))failures.push('Unexpected 13-column schema');
 if(data.length!==24)failures.push('Expected 24 traceability rows');
 const counts={};const usedResults=new Set(),usedEvidence=new Set();
 for(const [i,row] of data.entries()){
  const number=i+2;if(row.length!==13||row.some(v=>typeof v!=='string'||!v.trim()))failures.push('Missing/wrong field row '+number);
  const q=reqs[row[2]];if(!q||row[4]!==q.rq||row[0]!==q.problem||row[3]!==q.requirement||row[5]!==q.objective)failures.push('PIRQOA identity mismatch row '+number);
  counts[row[2]]=(counts[row[2]]||0)+1;
  const ids=row[9].split('|');if(new Set(ids).size!==ids.length)failures.push('Duplicate result row '+number);
  const linked=ids.map(id=>results.get(id));for(const id of ids){usedResults.add(id);if(!results.has(id))failures.push('Unknown R ID '+id);}
  if(linked.some(r=>r&&!r.requirements.split('|').includes(row[2])))failures.push('REQ contribution mismatch row '+number);
  const expected=[...new Set(linked.filter(Boolean).flatMap(r=>r.evidence_ids.split('|')))].sort().join('|');
  if(row[10]!==expected)failures.push('Evidence does not equal selected-result provenance row '+number);
  const union=new Set(linked.filter(Boolean).flatMap(r=>r.criteria.split('|')));
  for(const c of row[8].split('|'))if(!/^(C[1-5]|F(?:[1-9]|1[0-3])|U[1-9])$/.test(c)||!union.has(c))failures.push('Unsubstantiated criterion '+c+' row '+number);
  for(const e of row[10].split('|')){usedEvidence.add(e);if(!evidence.has(e))failures.push('Unknown E ID '+e);}
  if(/\b(?:Stage 8|eighth stage implemented)\b/i.test(row[7]))failures.push('Unallowed eighth stage row '+number);
 }
 if(JSON.stringify(counts)!==JSON.stringify({'REQ-01':7,'REQ-02':6,'REQ-03':11}))failures.push('Requirement coverage counts');
 for(const req of Object.keys(reqs))if(!data.some(r=>r[2]===req&&r[11].startsWith('Partially supported overall.')))failures.push('Missing qualified overall assessment '+req);
 const prior=JSON.parse(read(inputPath));
 if(!read(registerPath).startsWith(prior.registerBytes))failures.push('Prior 58 register bytes changed');
 for(const r of prior.records)if(hash(r.path)!==r.locator_or_hash.slice(7))failures.push('Changed prior evidence '+r.evidence_id);
 if(hash(masterPath)!==prior.masterHash)failures.push('Immutable master results changed');
 for(const [p,h] of Object.entries(prior.productionHashes))if(hash(p)!==h)failures.push('Changed B01 file '+p);
 return {rows:data.length,columns:13,requirementRows:counts,linkedResults:usedResults.size,linkedEvidence:usedEvidence.size,prior58RowsBytePreserved:read(registerPath).startsWith(prior.registerBytes),masterResultsUnchanged:hash(masterPath)===prior.masterHash,productionFiles:Object.keys(prior.productionHashes).length,registeredEvidence:register.length,failures};
}
const mode=process.argv[2];
if(mode==='--prepare'){
 if(register.length!==58||fs.existsSync(path.resolve(root,matrixPath)))throw Error('Intake mismatch or capture exists');
 const snapshot={runId:'TRACE-20261003-PIRQOA-01',capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),registerHash:sha(registerBytes),registerBytes,records:register,masterHash:hash(masterPath),topics,productionHashes:JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json')).productionHashes};
 if(fs.existsSync(path.resolve(root,inputPath))){const prior=JSON.parse(read(inputPath));if(prior.registerBytes!==registerBytes||prior.masterHash!==hash(masterPath)||JSON.stringify(prior.topics)!==JSON.stringify(topics))throw Error('Existing intake differs');}
 else fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(snapshot,null,2)+'\n',{flag:'wx'});
 const wb=Workbook.create(),sheet=wb.worksheets.add('PIRQOA');const matrix=[headers,...rows];sheet.getRange('A1:M25').values=matrix;wb.recalculate();
 if(JSON.stringify(sheet.getUsedRange().values)!==JSON.stringify(matrix))throw Error('Engine changed authored values');
 const summary=check(matrix);if(summary.failures.length)throw Error(JSON.stringify(summary.failures));
 const inspection=await wb.inspect({kind:'region',sheetId:'PIRQOA',range:'C1:K4',maxChars:1600,tableMaxCellChars:90});
 // Disposable compact preview uses selected exact columns, not extra CSV fields.
 const view=wb.worksheets.add('Preview');view.getRange('A1:F7').values=[['Requirement','Issue','Stages','Criteria','Supported claim','Remaining gap'],...rows.filter(r=>r[11].startsWith('Partially supported overall.')).concat([rows[1],rows[8],rows[18]]).map(r=>[r[2],r[1],r[7],r[8],r[11],r[12]])];
 view.showGridLines=false;view.getRange('A1:F7').format.font={name:'Arial',size:10};view.getRange('A1:F7').format.wrapText=true;view.getRange('A1:F7').format.verticalAlignment='top';
 view.getRange('A1:A7').format.columnWidth=14;view.getRange('B1:B7').format.columnWidth=30;view.getRange('C1:C7').format.columnWidth=20;view.getRange('D1:D7').format.columnWidth=30;view.getRange('E1:F7').format.columnWidth=78;
 view.getRange('A1:F1').format={fill:'#23374D',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:28};view.getRange('A2:F7').format.rowHeight=160;
 wb.recalculate();const blob=await wb.render({sheetName:'Preview',range:'A1:F7',scale:1,format:'png'});fs.writeFileSync('/private/tmp/a5-step22.IP8NdJ/matrix-preview.png',new Uint8Array(await blob.arrayBuffer()));
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(matrixPath,csv(sheet.getUsedRange().values))+'*** End Patch',summary:{...summary,topics,inspection:inspection.ndjson}}));
}else if(mode==='--register-preview'){
 const wb=await Workbook.fromCSV(read(registerPath),{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 s.getRange('A1:D4').format.columnWidth=38;s.getRange('A1:D4').format.wrapText=true;s.getRange('A1:D4').format.rowHeight=38;
 wb.recalculate();const blob=await wb.render({sheetName:'Evidence',range:'A1:D4',scale:1,format:'png'});fs.writeFileSync('/private/tmp/a5-step22.IP8NdJ/register-before.png',new Uint8Array(await blob.arrayBuffer()));
 console.log((await wb.inspect({kind:'region',sheetId:'Evidence',range:'A1:D4',maxChars:1000})).ndjson);
}else if(mode==='--manifest-patch'){
 const prior=JSON.parse(read(inputPath));const paths=[matrixPath,notesPath,inputPath,helperPath,...prior.records.map(r=>r.path),...Object.keys(prior.productionHashes)];
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(manifestPath,[...new Set(paths)].map(p=>hash(p)+'  '+p).join('\n')+'\n')+'*** End Patch'}));
}else if(mode==='--append-patch'){
 const prior=JSON.parse(read(inputPath));if(registerBytes!==prior.registerBytes)throw Error('Append only once to exact original index');
 const specs=[['E064',matrixPath,'pirqoa_traceability','24 traceability rows covering all three REQ/RQs with qualified claims explicit gaps and existing immutable R/evidence IDs'],['E065',notesPath,'pirqoa_traceability_notes','PIRQOA identities coverage index direct-versus-enabling evidence and claim boundaries; Step 23 handover'],['E066',manifestPath,'pirqoa_traceability_manifest','58 original evidence identities unchanged 225-row master and 66 B01 hashes plus Step 22 inputs and derived output']];
 const additions=specs.map(([id,p,a,d])=>[id,'TRACE-20261003-PIRQOA-01','Mixed conceptual identities / B01 production / ROOTTESTS-02','EV-REG','Step 22 PIRQOA traceability',a,d,p,'sha256:'+hash(p),'2026-10-03','Codex recorded-evidence traceability under user direction; no new human endorsement','Artifact Tool CSV and SHA-256 checks; no application provider database test or participant execution','C1-C5|F1-F13|U1-U9 traceability with retained gaps','REQ-01|REQ-02|REQ-03','RQ1|RQ2|RQ3']);
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');s.getRange('A60:O62').values=additions;wb.recalculate();if(JSON.stringify(s.getRange('A60:O62').values)!==JSON.stringify(additions))throw Error('Register append changed values');
 const last=registerBytes.trimEnd().split('\n').at(-1);console.log(JSON.stringify({patch:'*** Begin Patch\n*** Update File: '+path.resolve(root,registerPath)+'\n@@\n '+last+'\n'+csv(additions).trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch'}));
}else if(mode==='--verify'){
 const wb=await Workbook.fromCSV(read(matrixPath),{sheetName:'PIRQOA'});wb.recalculate();const matrix=wb.worksheets.getItem('PIRQOA').getUsedRange().values;
 if(JSON.stringify(matrix)!==JSON.stringify(parseCSV(read(matrixPath))))throw Error('Engine roundtrip changed CSV');
 const report=check(matrix);for(const r of register)if(hash(r.path)!==r.locator_or_hash.slice(7))report.failures.push('Registered hash mismatch '+r.evidence_id);
 for(const line of read(manifestPath).trim().split('\n')){const [h,p]=line.split('  ');if(hash(p)!==h)report.failures.push('Manifest hash mismatch '+p);}
 for(const p of [notesPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);if(!fs.existsSync(target)&&!(process.argv.includes('--save')&&target===path.resolve(root,verificationPath)))report.failures.push('Missing local link '+p+' '+m[1]);}
 const output={...report,runId:'TRACE-20261003-PIRQOA-01',capturedAt:new Date().toISOString(),matrixHash:hash(matrixPath),masterHash:hash(masterPath),registerHash:hash(registerPath),manifestHash:hash(manifestPath)};
 if(report.failures.length){console.log(JSON.stringify(output,null,2));process.exitCode=1;}else{if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,verificationPath),JSON.stringify(output,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(output,null,2));}
}else throw Error('Use --prepare, --register-preview, --manifest-patch, --append-patch, or --verify [--save]');
