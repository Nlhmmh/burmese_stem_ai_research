// Step 21: documentation-only consolidation. Never executes the app or a test runner.
// --prepare emits an apply_patch payload; --append-patch indexes retained outputs;
// --verify reads and checks the completed table. Do not regenerate immutable R IDs.
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
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const digest=s=>crypto.createHash('sha256').update(s).digest('hex');
const out='evaluation/03_results/';
const registerPath=out+'evidence_register.csv';
const masterPath=out+'master_results.csv';
const notesPath=out+'consolidation_notes.md';
const inputPath=out+'raw/MASTER-RUN-01-input.json';
const manifestPath=out+'raw/MASTER-RUN-01-manifest.sha256';
const verificationPath=out+'raw/MASTER-RUN-01-verification.json';
const previewPath=out+'raw/MASTER-RUN-01-preview.png';
const headers='result_id,baseline_id,artefact,method_ids,criteria,requirements,research_questions,execution_status,outcome,evidence_ids,interpretation,limitations,conflicting_evidence,follow_up'.split(',');
const B01='B01-A5-EVALUATION';
const ALL='REQ-01|REQ-02|REQ-03';
const noConflict='None recorded within this row\'s stated scope; absence is not exhaustive confirmation.';
const scopeLimit='Recorded coverage only; no learner benefit, mastery, semantic correctness or generalisation is inferred from a structural pass.';
function parseCSV(s){
  s=s.replace(/^\uFEFF/,'');const rows=[];let row=[],v='',q=false;
  for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(q&&s[i+1]==='"'){v+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(v);v='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&s[i+1]==='\n')i++;row.push(v);if(row.some(Boolean))rows.push(row);row=[];v='';}else v+=c;}
  if(q)throw Error('Unclosed CSV quote');if(v||row.length){row.push(v);rows.push(row);}return rows;
}
const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
const csv=matrix=>matrix.map(r=>r.map(quote).join(',')).join('\n')+'\n';
const objRows=matrix=>matrix.slice(1).map(r=>Object.fromEntries(matrix[0].map((h,i)=>[h,r[i]])));
const registerBytes=read(registerPath), records=objRows(parseCSV(registerBytes));
const byId=new Map(records.map(r=>[r.evidence_id,r]));
const E=ids=>ids.split('|').map(id=>{if(!byId.has(id))throw Error('Unknown evidence '+id);return byId.get(id);});
const source=id=>byId.get(id).path;
const clean=s=>String(s).replace(/\*\*/g,'').replace(/`/g,'').trim();
function table(p,predicate,contents=read(p)){return contents.split(/\r?\n/).filter(l=>l.startsWith('|')).map(l=>l.slice(1,l.lastIndexOf('|')).split('|').map(clean)).filter(predicate);}
async function imported(p){const wb=await Workbook.fromCSV(read(p),{sheetName:'Source'});return objRows(wb.worksheets.getItem('Source').getUsedRange().values);}
function refineMappings(data){
 const scoped={
 'STA-01':'F13','STA-02':'F1|F5|F6|F7|F8|F9|F10|F11|F12|F13','STA-03':'F1|F5|F6|F7|F8|F9|F10|F11|F12|F13','STA-04':'F7|F9','STA-05':'F1|F5|F6|F7|F8|F9|F10|F11|F12|F13','STA-06':'F13','STA-07':'F13','STA-08':'F1|F6|F8|F13','STA-09':'F5|F6|F7|F11|F13','STA-10':'F7|F9|F10|F11|F12|F13','STA-11':'F1|F6|F8|F13','STA-12':'F10|F13','STA-13':'F9|F11|F12','STA-14':'F13',
 'DYN-01':'F1|U1','DYN-02':'F1|F4|F9|U2','DYN-03':'F5|F6|F9','DYN-04':'F6|F7|F9','DYN-05':'F7|U7','DYN-06':'F5|F6|F7','DYN-07':'F3|F6|F12|U6','DYN-08':'F2|F6|F9','DYN-09':'F8|F9','DYN-10':'F8|F13','DYN-11':'F9|F10|F11','DYN-12':'F11|F13','DYN-13':'F1|F13|U8',
 'BND-01':'F1|F9','BND-02':'F5|F6|F7|F9','BND-03':'F5|F6|F7|F9','BND-04':'F7|F9','BND-05':'F7|F9','BND-06':'F7|F9','BND-07':'F7|F9','BND-08':'F7|F9','BND-09':'F5|F6|F7|F9','BND-10':'F5|F6|F7|F9','BND-11':'F5|F6|F7|F9|F11','BND-12':'F11','BND-13':'F11','BND-14':'F11|F13','BND-15':'F7|F9','BND-16':'F7|F9','BND-17':'F7|F13',
 'WB01':'F2|F3|F5|F6|F7|F9|F13','WB02':'F9|F10|F11|F13','WB03':'F8|F9|F13','WB04':'F1|F2|F3|F4|F6|F8|F13','WB05':'F7|F8|F9|F10|F11|F12','WB06':'F3|F12',
 'IA-D01':'F2|F6','IA-D02':'F3|F12|U6|U8','IA-D03':'F4|F6|U2','IA-D04':'F5|U3','IA-D05':'F6|F7|F9','IA-D06':'F8','IA-D07':'F9|F10|F11|F12|U5|U7','IA-D08':'F10|F13|U8',
 'DL01':'F3|F4','DL02':'F4|U2','DL03':'F4|F8','DL04':'F3|F6|F12|U6','DL05':'F5|F6|F7|F12|U3','DL06':'F3|F6','DL07':'F2','DL08':'F2|F6|F9','DL09':'F1|F2|F4|F6|F8|F13','DL10':'F5|F7|F9|F10|F11','DL11':'F2|F3|F4|F5|F6|F7|F8|F9','DL12':'F2|F3|F4|F6','DL13':'F6|F7',
 'SCN-CQ01':'F4','SCN-CQ02':'F4','SCN-CQ03':'F6','SCN-CQ04':'F3|U6','SCN-CQ05':'F8'
 };
 for(const r of data){
  const caseId=r[2].match(/^(STA-\d{2}|DYN-\d{2}|BND-\d{2}|WB0[1-6]|IA-D0[1-8]|DL\d{2}|SCN-CQ0[1-5])\b/)?.[1];
  // The explicitly Blocked first attempt is not the final STA-04 assessment.
  if(caseId&&scoped[caseId]&&r[7]!=='Blocked')r[4]=scoped[caseId];
  if(r[2]==='BND-01 / Create session'){r[5]='REQ-01|REQ-03';r[6]='RQ1|RQ3';}
  if(r[2]==='Step 19 optional expert study')r[3]='EX-C|EX-D';
 }
 return data;
}
const rows=[],groups=[];
function add({baseline=B01,artefact,methods,criteria,requirements=ALL,status='Executed',outcome,evidence,interpretation,limitations=scopeLimit,conflict=noConflict,follow='Carry this bounded finding into Step 22; no B01 fix or rerun in this consolidation.'}){
  E(evidence);const rq=requirements.split('|').map(r=>'RQ'+r.slice(-1)).join('|');
  rows.push(['R'+String(rows.length+1).padStart(3,'0'),baseline,artefact,methods,criteria,requirements,rq,status,outcome,evidence,interpretation,limitations,conflict,follow]);
}
function group(name,fn){const start=rows.length+1;fn();groups.push({name,first:'R'+String(start).padStart(3,'0'),last:'R'+String(rows.length).padStart(3,'0'),count:rows.length-start+1});}
const conceptualMethods='CA-GAI|CA-LIT|CA-ARG|CA-SCN';
const conceptBase=byId.get('E056').baseline_id;
const historicalLimit='Historical original A3 conceptual evidence, not a B01 run or a new human expert study; shared sources and Photosynthesis examples are not independent replications. E057 crosswalk applies; E058 is the current argument.';

async function assemble(){
group('Current protocol C1–C5 synthesis (bounded analyst judgement)',()=>{
  const data=[
    ['C1','Fully supported','All three requirements map to explicit responsibilities in the refined seven-stage framework; E058 supplies literature warrants and removal tests.','This supports conceptual coverage, not that requirements are empirically satisfied or that the exact seven-stage topology is uniquely necessary.','E049|E051|E052|E054|E055|E056|E058|E059'],
    ['C2','Partially supported','The refined sequence, bounded feedback routes and distinction between core meaning and scaffolds are defensible.','Stage responsibilities overlap and language/adaptation selection remains a qualified design inference, not a uniquely validated algorithm.','E049|E050|E052|E054|E055|E056|E058'],
    ['C3','Partially supported','TTF task alignment and scaffolding provide relevant warrants for responsive support.','Stated need is not competence diagnosis; calibrated contingency, fading and transfer of responsibility are not established.','E050|E052|E055|E056|E058|E059'],
    ['C4','Partially supported','The recorded A2 literature and focused primary-source revision support the capabilities in principle.','Historical completeness/boundary C4 is not protocol literature-consistency C4. Transfer to Burmese STEM, exact response rules and two-round optimality are not validated by the corpus.','E051|E052|E056|E057|E058|E059'],
    ['C5','Partially supported','The historical Photosynthesis content instantiates the conceptual responsibilities and a check–example–check loop.','Historical scenario commit/model/date, exact selected responses, second adaptation, fade, cap and follow-up answer were not recorded. E042 is a different B01 design scenario, not retrospective historical evidence.','E054|E055|E056|E057']
  ];for(const [c,o,i,l,e] of data)add({baseline:conceptBase,artefact:'Refined conceptual framework / protocol '+c,methods:conceptualMethods,criteria:c,outcome:o,evidence:e,interpretation:i,limitations:l,conflict:c==='C3'?'E055 historical structural contingency/fading support is qualified by the literature benchmark in E058; no historical observation is rewritten.':c==='C5'?'E055 calls scenario applicability strongly supported for its scenario; supplied-observation omissions in E054 prevent a full-workflow claim.':noConflict});
});
group('Current literature-grounded conceptual argument: IA-C01–IA-C07',()=>{
  const criteria=['C1|C2|C4','C1|C2|C4','C1|C3|C4','C1|C2|C4','C1|C2|C3|C4','C1|C3|C4','C1|C2|C3|C4'];
  const requirements=['REQ-01','REQ-01|REQ-02','REQ-01','REQ-02','REQ-02|REQ-03','REQ-03',ALL];
  const limits=['Target identification is not deterministic ATE or validated extraction accuracy.','A fluent answer can interpret the wrong sense; bounded repair is justified, not certified reliable.','Burmese-specific transfer and term-selection accuracy remain unverified; no universal bilingual ratio.','Complete fields do not prove factual accuracy, reduced cognitive load or improved learning.','A collection of support labels does not establish contingency, fading or responsibility transfer.','Self-report is a low-burden support request, not objective understanding or misconception diagnosis.','No calibrated fading, optimal adaptation mapping or pedagogically optimal two-round cap is established.'];
  const matrix=table(source('E058'),r=>/^IA-C0[1-7] \/ /.test(r[0]));if(matrix.length!==7)throw Error('IA-C source count');
  matrix.forEach((r,i)=>add({baseline:byId.get('E058').baseline_id,artefact:r[0],methods:'CA-ARG',criteria:criteria[i],requirements:requirements[i],outcome:i===0||i===3?'Conceptually justified':'Justified with qualification',evidence:'E056|E058|E059|E060',interpretation:r[2]+': '+r[3],limitations:limits[i],conflict:'E053 remains historical; v2 is a strengthened scholarly argument, not a second independent method or new empirical result.'}));
});
group('Historical GenAI criterion judgements and C4 crosswalk',()=>{
 const data=table(source('E050'),r=>/^C[1-5]$/.test(r[0])&&r.length===4).slice(-5);if(data.length!==5)throw Error('GenAI source count');
 data.forEach(r=>add({baseline:byId.get('E050').baseline_id,artefact:'GENAI-01 historical '+r[0]+(r[0]==='C4'?' completeness/boundaries':''),methods:'CA-GAI',criteria:r[0]==='C4'?'C2':r[0],outcome:r[1],evidence:'E049|E050|E057',interpretation:'Recorded critique: '+r[2]+'. Concern: '+r[3]+(r[0]==='C4'?'. Historical C4 is supplementary to coherence, not a literature-consistency assessment.':''),limitations:'One fixed nine-question no-browse GenAI interview; model/version UI-reported, no independent expert/literature inspection or empirical learner validation.'}));
});
group('Historical conceptual literature findings',()=>{
 const section=read(source('E052')).split('# 12. Inputs for Later Triangulation')[1].split('# 13.')[0];
 const data=section.split('\n').filter(l=>/^\|/.test(l)).map(l=>l.slice(1,l.lastIndexOf('|')).split('|').map(clean)).filter(r=>r.length===2&&r[0]!=='Finding / Theme'&&!r[0].startsWith('---'));
 for(const r of data)add({baseline:byId.get('E052').baseline_id,artefact:'CA-LIT / '+r[0],methods:'CA-LIT',criteria:'C4',outcome:r[1],evidence:'E051|E052',interpretation:'Recorded literature relationship: '+r[0]+'. '+r[1]+'.',limitations:'Supplied Assignment 2 SLR/SSR corpus; partly assignment-mediated and other-language/domain evidence. Capability support does not validate exact seven stages, routes, Burmese output or learning benefit.'});
});
group('Historical conceptual triangulation findings (derived, not extra methods)',()=>{
 const section=read(source('E055')).split('# 5. Full Triangulation Matrix')[1].split('# 6. Areas')[0];
 const data=table(source('E055'),r=>r.length===6&&r[0]!=='Finding / Issue'&&!r[0].startsWith('---'),section);if(data.length!==25)throw Error('Triangulation source count '+data.length);
 for(const r of data){const verdict=r[5].split('.')[0];add({baseline:byId.get('E055').baseline_id,artefact:'Historical triangulation / '+r[0],methods:conceptualMethods,criteria:'C1|C2|C3|C5',status:'Recorded',outcome:verdict,evidence:'E049|E050|E051|E052|E053|E054|E055|E057',interpretation:r[5]+' Recorded positions: GenAI '+r[1]+'; literature '+r[2]+'; original argument '+r[3]+'; scenario '+r[4]+'.',limitations:historicalLimit,conflict:/fading|Contingency/i.test(r[0])?'Current E058 distinguishes structural responsiveness from performance-calibrated scaffolding; historical wording is retained, not adopted as learner-effect evidence.':/Scenario applicability/i.test(r[0])?'E054 supplied observations omit fade/cap and other lifecycle outcomes; the historical scenario support is not complete workflow execution.':noConflict});}
});
group('Framework refinement decisions (source R01–R18, not master R IDs)',()=>{
 const data=table(source('E056'),r=>/^R\d{2}$/.test(r[0])&&r.length===7);if(data.length!==18)throw Error('Refinement source count');
 for(const r of data)add({baseline:conceptBase,artefact:'Refinement decision '+r[0]+' / '+r[1],methods:conceptualMethods,criteria:'C1|C2|C3|C4',status:'Recorded',outcome:r[6],evidence:'E051|E052|E055|E056|E058',interpretation:'Retained decision: '+r[1]+' — '+r[6]+'. Source positions: '+r.slice(2,6).join('; ')+'.',limitations:'A scope/refinement decision, not a passed behavioural test; rejected additions were not implemented or empirically compared. Current argument strengthens warrants without rewriting original decisions.'});
});
group('FURPS Functionality aggregate F1–F13: original Partial outcomes retained',()=>{
 const data=table('evaluation/00_protocol/evaluation_protocol.md',r=>/^F\d+$/.test(r[0])&&r.length===5);if(data.length!==13)throw Error('FURPS source count');
 const ids=['E005|E026|E033','E006|E019|E021|E026|E033','E019|E022|E023|E026|E033|E037','E022|E023|E026|E033|E042','E026|E033|E037','E015|E021|E022|E026|E033|E042','E015|E026|E033|E042','E009|E026|E033|E042','E015|E026|E033|E037|E042','E026|E033|E037','E026|E033|E037|E042','E026|E033|E037','E013|E021|E026|E033|E037'];
 const limits=['Controlled HTTP/structure support does not certify all live generation; overall composite coverage remains qualified.','Initial controlled ambiguity and live same-interpretation correction failures limit intended-context reliability.','Prompt-only script rules, endorsed material wording defects and provisional fresh content prevent universal language-quality support.','91 endorsed output ratings are mixed; explanation structure is not scientific accuracy or educational effectiveness.','Route/input collection works in tested paths; localisation and semantic support adequacy remain qualified.','BB07/08 novelty unassessed and SIM05-C/CM-13/16 route failures remain; literal non-repetition is not pedagogical novelty.','State bound supported in tested transitions; two rounds is an engineering limit, not an optimal teaching dose.','Controlled scope outcomes/current context do not establish universal live answer/scope quality.','Tested legacy/atomic retrieval is bounded by recorded fixtures, not all possible old or distributed database states.','Learner isolation is scoped anonymous identity, not authenticated-user security certification; BB22 oracle failure remains.','Full stored trace reconstructs tested sessions; modal focus, ambiguity badge and historical/missing snapshot limits remain.','Profile snapshots/presentation work in tested configurations; invalid-choice UI unreachable and infrastructure-fault save UI untested.','Controlled safe errors do not establish a hard 20-second wall-clock timeout; Burmese errors and public-boundary oracle mismatch remain.'];
 data.forEach((r,i)=>{if(r[2]!=='Partial')throw Error('Unexpected F promotion');add({artefact:'FURPS aggregate '+r[0],methods:'DA-STA|DA-DYN|DA-BND|DA-SIM|DA-BB|DA-WB|DA-UI|DA-ARG|DA-SCN|DA-LIT',criteria:r[0],outcome:r[2],evidence:ids[i],interpretation:r[4]+' Additional UI/scenario/literature evidence does not retrospectively promote this aggregate.',limitations:limits[i],conflict:'Mechanical Pass findings coexist with content/coverage qualifications; retain the source-specific counterexamples rather than voting across methods.'});});
});
group('FURPS Usability aggregate U1–U9',()=>{
 const data=table('evaluation/00_protocol/evaluation_protocol.md',r=>/^U[1-9]$/.test(r[0])&&r.length===6);if(data.length!==9)throw Error('Usability source count');
 for(const r of data)add({artefact:'FURPS aggregate '+r[0],methods:'DA-UI',criteria:r[0],requirements:ALL,outcome:r[2],evidence:'E036|E037|E038',interpretation:r[5]+' Highest recorded severity '+r[3]+'.',limitations:'Technical evaluator inspection using controlled fixtures, desktop/mobile viewport emulation and distributed configurations; no participant study, physical-phone test, qualified new content review or WCAG certification.',conflict:r[0]==='U6'?'Visual rendering Pass does not cancel mixed semantic Burmese ratings in E022/E023.':r[0]==='U7'?'USI-03 severity-1 generic correction badge remains even though the explicit ambiguity trace is accurate.':r[2]==='Partial'?'USI-01 modal focus and/or USI-02 English-only errors remain severity 2; no source fixes made.':noConflict});
});
group('Formal static cases STA-01–STA-14',()=>{
 const data=table(source('E002'),r=>/^STA-\d{2}$/.test(r[0])&&r.length===4).slice(0,14);if(data.length!==14)throw Error('Static source count');
 for(const r of data)add({artefact:r[0]+' / formal static evidence',methods:'DA-STA',criteria:'F1|F5|F6|F7|F9|F10|F11|F12|F13',outcome:r[2],evidence:r[3].split(', ').join('|'),interpretation:r[1],limitations:r[0]==='STA-03'?'This historical V8 report covers configured services/DAO, not the full project. E034 is the separate later 42-file report.':scopeLimit,conflict:r[0]==='STA-04'?'First attempt was Blocked by localhost EPERM; permitted unchanged retry passed. Both attempts remain in E001.':noConflict});
});
group('Dynamic cases DYN-01–DYN-13',()=>{
 const data=table('evaluation/02_design/dynamic/dynamic_analysis.md',r=>/^DYN-\d{2}$/.test(r[0])&&r.length===4);if(data.length!==13)throw Error('Dynamic source count');
 for(const r of data)add({artefact:r[0]+' / dynamic observation',methods:'DA-DYN',criteria:'F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F13',outcome:r[2],evidence:r[0]==='DYN-10'?'E005|E008|E009':r[0]==='DYN-13'?'E004|E008|E010|E011|E012|E013':'E005|E006|E008|E010|E011|E012',interpretation:r[1]+'. '+r[3]+'.',limitations:/DYN-0[56]/.test(r[0])?'Original zero-provider count is indirect. Later directly instrumented bounds/WB/scenario evidence corroborates the bound without promoting this Partial Pass.':'Recorded live local API/database and English/light desktop observations; display is not qualified linguistic/scientific adequacy or general learner usability.',conflict:r[0]==='DYN-10'?'Original driver checked the wrong response property path; retained adjudication E009 explains why intended scope outcome passed.':noConflict});
});
group('Bounds cases BND-01–BND-17',()=>{
 const data=table('evaluation/02_design/optimisation/bounds_analysis.md',r=>/^BND-\d{2}$/.test(r[0])&&r.length===6);if(data.length!==17)throw Error('Bounds source count');
 for(const r of data)add({artefact:r[0]+' / '+r[1],methods:'DA-BND',criteria:'F5|F6|F7|F9|F11|F13',requirements:'REQ-03',outcome:r[5],evidence:'E014|E015|E016|E017',interpretation:r[2]+'. Provider seam calls: '+r[3]+'. Persistence: '+r[4]+'.',limitations:'Deterministic provider with real isolated MongoDB; demonstrates bounded mechanics, not live language quality, teaching optimality or production-load performance.',conflict:r[0]==='BND-15'?'Two valid generation-capable contenders made two provider calls; only one atomic write succeeded. Stored-state protection does not prevent duplicate provider cost.':noConflict});
});
group('White-box groups WB01–WB06 and structural coverage',()=>{
 const data=table('evaluation/02_design/white_box/white_box_evaluation.md',r=>/^WB0[1-6]$/.test(r[0])&&r.length===3);if(data.length!==6)throw Error('WB source count');
 for(const r of data)add({artefact:r[0]+' / root-project structural assertions',methods:'DA-WB',criteria:'F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13',outcome:r[2],evidence:'E033|E034|E035',interpretation:r[1]+'. Recorded suite: 361 deterministic tests in 26 files plus 12 real MongoDB tests in two files; no skipped tests.',limitations:'B01 production hashes, separate ROOTTESTS-02 test/config profile. Mocked providers cannot establish live interpretation, semantic novelty, scientific accuracy or learner benefit; database/browser runs are not merged into V8.',conflict:'BB07/08 Partial, BB22 Fail and live simulation failures remain; handler-level identity assumptions cannot override the public proxy.'});
 add({artefact:'Application-wide V8 coverage / ROOTTESTS-02',methods:'DA-WB',criteria:'F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13',outcome:'Descriptive only',evidence:'E033|E034|E035',interpretation:'42 executable files: statements 708/976 (72.54%); branches 627/821 (76.37%); functions 128/200 (64.00%); lines 680/922 (73.75%).',limitations:'Coverage is structural and incomplete, excludes tests/config/generated files/assets and does not include real database/browser execution. No universal success threshold or educational interpretation.',conflict:'Do not compare this expanded scope as a regression against the earlier narrower STA-03 89.54% statement coverage.'});
});
group('Black-box BB01–BB24 assessed case outcomes',()=>{});
const bb=await imported('evaluation/02_design/black_box/black_box_results.csv');
const bbGroup=groups.at(-1);const bbStart=rows.length+1;
const bbCriteria=['F1|F4','F1|F13','F2','F3|F12','F4','F5|F6|F7','F6','F2|F3|F5|F6','F9','F7|F9','F7','F8','F8','F9|F10','F9|F11','F9|F11','F12','F13','F13','F1','F8','F10|F13','F5|F13','F11'];
if(bb.length!==24)throw Error('BB source count');
bb.forEach((r,i)=>add({artefact:r.case_id+' / public HTTP/browser',methods:'DA-BB',criteria:bbCriteria[i],status:r.execution_status,outcome:r.assessed_case_outcome,evidence:r.evidence_ids,interpretation:r.qualification+' First API outcome retained: '+r.first_api_outcome+'.',limitations:'Production-build proxy/services/DAO and isolated MongoDB, controlled provider fixtures; seam counts are not external-provider counts. No new fixture semantic or qualified human endorsement.',conflict:r.case_id==='BB22'?'Frozen absent-identity 400 oracle failed: public proxy created a scoped anonymous cookie and returned 200 empty History. Foreign-access rejection passed; no leakage observed.':r.case_id==='BB08'?'First supplemental zero-round ambiguity expectation failed; accepted generated clarification consumes a bounded round. Post-observation addendum is not a frozen-oracle replacement.':r.case_id==='BB07'?'Mechanical route/type/state passed, but prefixed reused paragraphs do not establish semantic novelty.':noConflict}));
Object.assign(bbGroup,{first:'R'+String(bbStart).padStart(3,'0'),last:rows.at(-1)[0],count:bb.length});
group('Design informed arguments IA-D01–IA-D08',()=>{
 const data=table(source('E039'),r=>/^IA-D0[1-8]$/.test(r[0])&&r.length===6);if(data.length!==8)throw Error('IA-D count');
 const req=['REQ-01|REQ-02','REQ-01','REQ-02|REQ-03','REQ-03',ALL,'REQ-03','REQ-01|REQ-03',ALL];
 data.forEach((r,i)=>add({artefact:r[0]+' / '+r[2],methods:'DA-ARG',criteria:'F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13',requirements:req[i],outcome:i===3||i===5?'Supported':'Partially supported',evidence:'E039|E040|E041',interpretation:r[3]+'. Recorded implementation locators: '+r[4]+'. Conclusion: '+r[5]+'.',limitations:'Literature-grounded inference from recorded design evidence, not a new application run or independent learner-effect study. Supported rows concern stated-need collection or concept-scoped mechanism only.',conflict:'Shared technical/content evidence is not an extra replication merely because cited by an informed argument.'}));
});
const dl=await imported('evaluation/02_design/literature/literature_matrix.csv');
const dlStart=rows.length+1;if(dl.length!==13)throw Error('DL count');
for(const r of dl)add({artefact:r.case_id+' / '+r.capability,methods:'DA-LIT',criteria:'F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13',requirements:r.requirements,outcome:r.literature_support,evidence:'E045|E046|E047|E048',interpretation:r.source_identity+'. Literature warrant: '+r.literature_evidence+' Implementation relationship: '+r.implementation_outcome,limitations:r.primary_access+'. '+r.remaining_limitation+'. '+r.context_and_counterevidence,conflict:'Literature support uses Strong/Moderate/Limited/Contradictory or uncertain, not FURPS scoring; '+r.support_relationship+'.',follow:'Use this corpus-bounded comparison in Step 22; retain source-access/transfer limits and do not claim superiority or universal novelty.'});
groups.push({name:'Design literature comparisons DL01–DL13 (native support scale)',first:'R'+String(dlStart).padStart(3,'0'),last:rows.at(-1)[0],count:dl.length});
group('Simulation technical outcomes, delivered content and failed content',()=>{
 add({artefact:'Simulation full-run attempt accounting',methods:'DA-SIM',criteria:'F1|F2|F3|F4|F5|F6|F7|F9|F13',outcome:'Mixed',evidence:'E018|E019|E020|E021',interpretation:'55 planned attempts (48 core plus seven routes): 44 technical Pass, eight initial controlled ambiguities without sessions, three technical Fail. 102 provider attempts; no automatic model retry.',limitations:'Route-handler/service/database execution, not public HTTP/proxy/browser. Attempts are not independent delivered-output content ratings. Aborted predecessor run is excluded from this denominator.',conflict:'Original E020 pending-review wording is historical capture state; E022/E023 document later review completion without changing raw execution.'});
 const failures=[['SIM05-C','Configured abort timer 20000 ms; observed fetch elapsed 52825 ms; handler 502 ADAPTATION_GENERATION_FAILED.','A hard 20-second wall-clock ceiling is not supported; cause of delayed abort unestablished.'],['SIM-CM-13','Cell correction provider said corrected but returned the same concept/name/domain; validator rejected it with handler 502.','No accepted corrected support or downstream loop from this failed response.'],['SIM-CM-16','Inheritance correction provider said corrected but returned the same concept/name/domain; validator rejected it with handler 502.','No accepted corrected support or downstream loop from this failed response.']];
 for(const [id,i,l] of failures)add({artefact:id+' / failed intended response',methods:'DA-SIM',criteria:'F2|F6|F9|F13',outcome:'Fail',evidence:'E018|E019|E021',interpretation:i+' Stored document unchanged across failed step; dependent later steps not executed.',limitations:l+' Rejected output is not scored as delivered learner content.',conflict:'Safe error/no mutation supports F13 mechanics but cannot convert failed intended-route delivery into Pass.'});
 add({artefact:'SIM14-A/B/C, SIM15-A/B/C, SIM-CM-14/15 / initial ambiguity',methods:'DA-SIM',criteria:'F2|F6|F9',outcome:'Controlled ambiguity',evidence:'E019|E021|E022|E023',interpretation:'Eight initial requests returned controlled 422 clarification with no created session; no response endpoint or correction/adaptation loop could operate on those attempts.',limitations:'Downstream path Not applicable because no session; not eight successful corrected-session workflows and not delivered support content.',conflict:'A controlled ambiguity outcome is separate from the three technical Fail cases.'});
 add({artefact:'Endorsed simulation delivered-output assessments',methods:'DA-SIM',criteria:'F2|F3|F4|F6',outcome:'Mixed',evidence:'E022|E023',interpretation:'91 delivered outputs: 18 Pass, 71 Partial, two Fail. Nathan reviewed/endorsed AI-assisted worksheets and authorised typed sign-offs on 2 October 2026; saved SIM04-A amendment retained.',limitations:'User-reported postgraduate STEM/native Burmese/advanced English competence; not an independent second assessor, participant experiment or textbook-language certification. Codex source checks are not attributed to Nathan. Failed/not-delivered steps are excluded.',conflict:'Technical structure passes coexist with material terminology and scientific-definition failures; later better adaptations do not retroactively repair initial delivered text.'});
 add({artefact:'SIM04-B initial / endorsed content failure',methods:'DA-SIM',criteria:'F3|F4',requirements:'REQ-01|REQ-02',outcome:'Fail',evidence:'E022|E023',interpretation:'Gravity initial output: Burmese mass becomes အစုလိုက်အပြုံလိုက် (en masse) instead of ဒြပ်ထု and simple wording substitutes weight; English loosely treats gravity as acceleration. Material terminology errors retained.',limitations:'One delivered output and recorded assessor rationale; no new review or claim that all gravity outputs fail.',conflict:'SIM04-B adaptation has a Partial rating; it does not erase the initial Fail.'});
 add({artefact:'SIM08-B initial / endorsed content failure',methods:'DA-SIM',criteria:'F3|F4',requirements:'REQ-01|REQ-02',outcome:'Fail',evidence:'E022|E023',interpretation:'Ion initial output: Burmese net charge မရှိတော့ဘဲ says without net charge, contradicting an ion\'s nonzero net charge; technical correctness and language adequacy rated 0.',limitations:'One delivered output and recorded assessor rationale; suggested corrections are review evidence, not changed app output.',conflict:'SIM08-B medium-skip adaptation Pass does not retroactively repair the initial definition Fail.'});
});
group('Fresh B01 Photosynthesis scenario and provisional content',()=>{
 add({artefact:'RUN-B01-20261003-SCENARIO-02 / technical walkthrough',methods:'DA-SCN',criteria:'F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13',outcome:'Pass',evidence:'E042|E043|E044',interpretation:'18 HTTP requests, five live calls, 24 browser observations/27 screenshots; two adaptations, four response events and one stored follow-up; explicit Finish reaches completed round 2. Fifteen recorded-evidence checks passed.',limitations:'One desktop scenario, not 15 independent cases or a learner study. Cap response, High at cap and post-completion rejection were separately labelled API-only, not available UI actions. Preflight/recorder corrections retained.',conflict:'Technical Pass is separate from provisional content Partial and earlier simulation failures.'});
 const content=table(source('E042'),r=>/^SCN-CQ0[1-5]/.test(r[0])&&r.length===3);if(content.length!==5)throw Error('Scenario CQ count');
 for(const r of content)add({artefact:r[0]+' / provisional scenario content',methods:'DA-SCN',criteria:'F2|F3|F4|F6|F8',outcome:r[0].startsWith('SCN-CQ02')?'Concern identified':'Partial',evidence:'E042|E043|E044',interpretation:r[1],limitations:r[2]+' Codex analysis only, not a new Nathan/qualified human endorsement. SCN-R02 is a disclosed post-generation source addition.',conflict:'Earlier simulation endorsement is for different outputs; structure/readable Unicode cannot certify this new content.'});
});
group('Retained usability issues USI-01–USI-03',()=>{});
const ui=await imported('evaluation/02_design/usability/issues.csv');const uiStart=rows.length+1;if(ui.length!==3)throw Error('Issue count');
for(const r of ui)add({artefact:r.issue_id+' / '+r.screen,methods:'DA-UI',criteria:r.criteria,outcome:'Concern identified',evidence:'E036|E037|E038',interpretation:'Severity '+r.severity+'. '+r.actual+'. Task effect: '+r.task_effect+'. '+r.status+'.',limitations:'Technical evaluator judgement, not measured participant difficulty; '+r.workaround+'. No production fix.',conflict:'Criterion consequences remain U5/U8/U9 Partial; severity-1 USI-03 can coexist with U7 Pass.',follow:r.recommendation+' Any implementation change requires a new baseline and affected retest; not authorised by Step 21.'});
Object.assign(groups.at(-1),{first:'R'+String(uiStart).padStart(3,'0'),last:rows.at(-1)[0],count:3});
group('Explicit blocked, unassessed, skipped, NA and provenance limits',()=>{
 add({artefact:'STA-04 first integration attempt',methods:'DA-STA',criteria:'F9',status:'Blocked',outcome:'Blocked',evidence:'E001|E002',interpretation:'First isolated MongoDB attempt could not bind localhost in sandbox (EPERM 127.0.0.1); no pass claimed for that attempt.',limitations:'Historical environment blocker resolved by permitted unchanged retry; not a current unresolved application defect.',conflict:'Final STA-04 Pass and the first Blocked attempt are separate execution records, not contradictory app outcomes.'});
 add({artefact:'BB08 supplemental frozen zero-round ambiguity expectation',methods:'DA-BB',criteria:'F6|F7',outcome:'Fail',evidence:'E024|E025|E026|E027',interpretation:'First extra assertion expected no round for a generated ambiguity clarification; actual accepted clarification consumed one bounded round. Failure and post-observation addendum retained.',limitations:'Oracle mismatch, not evidence of round 3 or uncontrolled routing; no retrospective rewrite of the expectation.',conflict:'Assessed BB08 remains Partial for fixture semantics; passing bound checks do not erase this original assertion failure.'});
 add({artefact:'BB07/BB08 fixture semantic novelty',methods:'DA-BB',criteria:'F6',status:'Not run',outcome:'Not assessed',evidence:'E024|E025|E026|E027',interpretation:'Reused paragraphs with prefixes exercise routes and persistence but were not subjected to a new qualified novelty/appropriateness review.',limitations:'Do not infer meaningful explanation change from different strings or full structured fields.',conflict:'Mechanical assertions pass while the assessed composite cases remain Partial.'});
 add({artefact:'Preferences invalid-option browser validation',methods:'DA-UI',criteria:'F12|U8',status:'Not applicable',outcome:'Not applicable',evidence:'E036|E037|E038',interpretation:'Invalid choices cannot be selected through bounded preference controls; DOM was not modified to force unreachable UI states.',limitations:'This NA is UI reachability only; API invalid-input guards were independently tested, not substituted as UI observations.'});
 add({artefact:'Preferences infrastructure-fault save UI',methods:'DA-UI',criteria:'F12|F13|U8',status:'Not run',outcome:'Not assessed',evidence:'E036|E037|E038',interpretation:'Preference-save infrastructure fault was not injected in the browser inspection.',limitations:'Server/database error tests do not establish browser recovery for this unexecuted save path.'});
 add({baseline:'Conceptual/design evaluation scope; no expert study baseline',artefact:'Step 19 optional expert study',methods:'Not applicable',criteria:'C1|C2|C3|C4|C5|F2|F3|F4|F6',status:'Skipped',outcome:'Not assessed',evidence:'E055|E057',interpretation:'Optional expert interviews were intentionally not performed. GenAI critique, technical inspection and user-endorsed worksheets are not substituted as independent expert-study evidence.',limitations:'No external expert triangulation; no fabricated participant, competence, transcript or endorsement.',follow:'Disclose the optional-study omission in Step 22 and the paper; no interview is required by this consolidation.'});
 add({artefact:'Participant usability / learning / full accessibility',methods:'DA-UI|DA-SIM',criteria:'U1|U2|U3|U4|U5|U6|U7|U8|U9|C3',status:'Not run',outcome:'Not assessed',evidence:'E022|E023|E037|E058',interpretation:'No participant usability, learning-gain/retention study or full WCAG conformance audit was conducted.',limitations:'Technical observation and user-endorsed content review cannot establish satisfaction, learnability, accessibility certification, calibrated fading or improved achievement.'});
 add({baseline:conceptBase,artefact:'Pedagogical optimality / validated learner fit',methods:'CA-ARG|DA-ARG|DA-LIT',criteria:'C3|C4|F6|F7',status:'Not run',outcome:'Not assessed',evidence:'E039|E046|E058|E059',interpretation:'The exact route mapping/two-round cap and local TTF dimensions are engineering/design interpretations, not validated pedagogical parameters or fit scales.',limitations:'Neither seven responsibilities nor this adaptation dose is established as uniquely necessary or optimal.'});
 add({artefact:'Literature-relative universal novelty / superiority',methods:'DA-LIT',criteria:'C4|F2|F3|F4|F6',status:'Not run',outcome:'Not assessed',evidence:'E045|E046|E047|E048',interpretation:'Integrated concept support is demonstrated within the recorded A2 comparison scope, not proven universally novel or better than reviewed systems.',limitations:'Five SSR summaries and filtered A2 corpus are not exhaustive system-capability audits or comparative learner/performance experiments.'});
 add({baseline:'Mixed conceptual identities / B01 / ROOTTESTS-02',artefact:'Step 20 provenance and restricted-original release boundary',methods:'Not applicable',criteria:'C1|C2|C3|C4|C5|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13',status:'Recorded',outcome:'Qualified integrity support',evidence:'E057|E060',interpretation:'Historical C4 and DE method aliases are crosswalked; E028–E032 retired; original capture dates remain unknown where unrecorded; current argument does not redate historical evidence.',limitations:'Synthetic cookie-bearing black-box originals remain restricted and need labelled redacted derivatives before public sharing. A hash match is not content correctness or public-release clearance.',conflict:'Do not rerun an old living-index hash checkpoint after this documented register extension and call the changed index corruption.'});
});
const timing=await imported('evaluation/02_design/dynamic/timings.csv');const numbers=timing.map(r=>Number(r.elapsed_ms)).sort((a,b)=>a-b);if(numbers.length!==15)throw Error('Timing count');
group('Descriptive timing evidence (not a performance success oracle)',()=>add({artefact:'TIM-PHOTO/GRAV/CURRENT/INHERIT/PH / fifteen live initial attempts',methods:'DA-DYN',criteria:'F1|F13',outcome:'Descriptive only',evidence:'E004|E007',interpretation:'15 attempts, five fixed inquiries × three repetitions, all HTTP 201. Client elapsed range '+(numbers[0]/1000).toFixed(3)+'–'+(numbers.at(-1)/1000).toFixed(3)+' s; mean '+(numbers.reduce((a,b)=>a+b,0)/15000).toFixed(3)+' s; median '+(numbers[7]/1000).toFixed(3)+' s.',limitations:'Sequential local dev/live-provider observations, not controlled load benchmark, SLA pass/fail, population estimate or extrapolation to adaptation latency. No failed timing exclusion or retry.'}));
return refineMappings(rows);
}

function checks(matrix){
 const failures=[];const [h,...data]=matrix;
 if(JSON.stringify(h)!==JSON.stringify(headers))failures.push('Wrong 14-column schema');
 const ids=new Set();for(const [i,r] of data.entries()){
   if(r.length!==14||r.some(v=>typeof v!=='string'||!v.trim()))failures.push('Missing/wrong field at row '+(i+2));
   if(!/^R\d{3}$/.test(r[0])||ids.has(r[0]))failures.push('Invalid/duplicate R ID '+r[0]);ids.add(r[0]);
   for(const e of (r[9]||'').split('|'))if(!byId.has(e))failures.push('Unknown E ID '+e);
   if(!(r[4]||'').split('|').every(c=>/^(C[1-5]|F(?:[1-9]|1[0-3])|U[1-9])$/.test(c)))failures.push('Invalid criterion '+r[0]);
   if(!(r[5]||'').split('|').every(c=>/^REQ-0[123]$/.test(c)))failures.push('Invalid REQ '+r[0]);
   if(r[6]!==r[5].split('|').map(c=>'RQ'+c.slice(-1)).join('|'))failures.push('REQ/RQ mismatch '+r[0]);
   if(!['Executed','Recorded','Not run','Blocked','Skipped','Not applicable'].includes(r[7]))failures.push('Invalid status '+r[0]);
   for(const e of (r.join(' ').match(/\bE\d{3}\b/g)||[]))if(!byId.has(e)&&!['E028','E029','E030','E031','E032'].includes(e))failures.push('Unresolved contextual E ID '+e);
 }
 const expected=[...Array.from({length:5},(_,i)=>'C'+(i+1)),...Array.from({length:13},(_,i)=>'F'+(i+1)),...Array.from({length:9},(_,i)=>'U'+(i+1))];
 for(const c of expected)if(!data.some(r=>r[2]===(c.startsWith('C')?'Refined conceptual framework / protocol ':'FURPS aggregate ')+c))failures.push('Missing criterion aggregate '+c);
 const f=data.filter(r=>/^FURPS aggregate F/.test(r[2]));if(f.length!==13||f.some(r=>r[8]!=='Partial'))failures.push('FURPS outcome promotion');
 const u=data.filter(r=>/^FURPS aggregate U/.test(r[2]));if(u.filter(r=>r[8]==='Pass').length!==6||u.filter(r=>r[8]==='Partial').length!==3)failures.push('Usability outcome drift');
 for(const method of ['CA-GAI','CA-LIT','CA-ARG','CA-SCN','DA-STA','DA-DYN','DA-BND','DA-SIM','DA-BB','DA-WB','DA-UI','DA-ARG','DA-SCN','DA-LIT'])if(!data.some(r=>r[3].split('|').includes(method)))failures.push('Missing method '+method);
 for(const r of records)if(hash(r.path)!==r.locator_or_hash.slice(7))failures.push('Changed evidence '+r.evidence_id);
 const production=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json'));
 for(const [p,h] of Object.entries(production.productionHashes))if(hash(p)!==h)failures.push('Changed production '+p);
 const current=read(registerPath);const prior=JSON.parse(read(inputPath));if(!current.startsWith(prior.registerBytes))failures.push('Prior 55 register bytes changed');
 const bb=data.filter(r=>/^BB\d{2} \/ public/.test(r[2]));if(bb.length!==24||bb.filter(r=>r[8]==='Pass').length!==21||bb.filter(r=>r[8]==='Partial').length!==2||bb.filter(r=>r[8]==='Fail').length!==1)failures.push('BB assessed drift');
 return {resultCount:data.length,columns:14,criterionAggregates:27,canonicalMethods:14,prior55RowsBytePreserved:current.startsWith(prior.registerBytes),registeredEvidence:records.length,productionFiles:Object.keys(production.productionHashes).length,groups:prior.groups,failures};
}
function addPatch(p,content){return '*** Add File: '+path.resolve(root,p)+'\n'+content.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';}
function replacePatch(p,content){return '*** Update File: '+path.resolve(root,p)+'\n@@\n'+read(p).trimEnd().split('\n').map(l=>'-'+l).join('\n')+'\n'+content.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';}
const mode=process.argv[2];
if(mode==='--correct-traceability-patch'){
 const original=parseCSV(read(masterPath));const adjusted=structuredClone(original);refineMappings(adjusted.slice(1));
 const wb=Workbook.create(),sheet=wb.worksheets.add('Corrected mappings');sheet.getRange('A1:N'+adjusted.length).values=adjusted;wb.recalculate();
 if(JSON.stringify(sheet.getUsedRange().values)!==JSON.stringify(adjusted))throw Error('Correction changed text');
 if(adjusted.slice(1).some((r,i)=>r[0]!==original[i+1][0]||r[2]!==original[i+1][2]))throw Error('Correction changed immutable IDs');
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+replacePatch(masterPath,csv(adjusted))+'*** End Patch'}));
}else if(mode==='--refresh-consolidation-hashes-patch'){
 const prior=JSON.parse(read(inputPath));const paths=[masterPath,notesPath,inputPath,out+'raw/build_master_results.mjs',...prior.records.map(r=>r.path),...Object.keys(prior.productionHashes)];
 const manifest=[...new Set(paths)].map(p=>hash(p)+'  '+p).join('\n')+'\n';
 const replacements={'E061':hash(masterPath),'E062':hash(notesPath),'E063':digest(manifest)};
 let current=read(registerPath);for(const [id,h] of Object.entries(replacements)){const old=byId.get(id);if(!old)throw Error('Missing derived record '+id);current=current.replace(old.locator_or_hash,'sha256:'+h);}
 if(!current.startsWith(prior.registerBytes))throw Error('Prior records changed');
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+replacePatch(manifestPath,manifest)+replacePatch(registerPath,current)+'*** End Patch'}));
}else if(mode==='--refine-draft-patch'){
 if(records.length!==55||fs.existsSync(path.resolve(root,manifestPath)))throw Error('Only an unregistered draft may be refined');
 const original=read(masterPath);const matrix=parseCSV(original);refineMappings(matrix.slice(1));
 console.log(JSON.stringify({patch:'*** Begin Patch\n*** Update File: '+path.resolve(root,masterPath)+'\n@@\n'+original.trimEnd().split('\n').map(l=>'-'+l).join('\n')+'\n'+csv(matrix).trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch'}));
}else if(mode==='--prepare'){
 if(fs.existsSync(path.resolve(root,masterPath))||fs.existsSync(path.resolve(root,inputPath)))throw Error('Immutable first capture already exists; use --verify');
 if(records.length!==55)throw Error('Expected 55 pre-consolidation records');
 // Capture original bytes and source identities before any register append.
 await assemble();
 const snapshot={runId:'RESULTS-20261003-MASTER-01',capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),registerHash:digest(registerBytes),registerBytes,records,groups,productionHashes:JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json')).productionHashes,resultKeys:rows.map(r=>({result_id:r[0],artefact:r[2]}))};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(snapshot,null,2)+'\n',{flag:'wx'});
 const matrix=[headers,...rows],wb=Workbook.create(),sheet=wb.worksheets.add('Master Results');
 sheet.getRange('A1:N'+matrix.length).values=matrix;wb.recalculate();
 const inspected=await wb.inspect({kind:'region',sheetId:'Master Results',range:'A1:J4',maxChars:1300,tableMaxCellChars:60});
 const values=sheet.getRange('A1:N'+matrix.length).values;if(JSON.stringify(values)!==JSON.stringify(matrix))throw Error('Engine authoring changed text');
 const report=checks(matrix);if(report.failures.length)throw Error(JSON.stringify(report.failures));
 // Bounded preview only: CSV remains a flat, unstyled 14-field data record.
 sheet.getRange('A1:N'+matrix.length).format.font={name:'Arial',size:10};
 sheet.getRange('A1:J1').format={fill:'#23374D',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:30};
 sheet.getRange('A1:A7').format.columnWidth=10;sheet.getRange('B1:B7').format.columnWidth=32;sheet.getRange('C1:C7').format.columnWidth=38;
 sheet.getRange('D1:D7').format.columnWidth=30;sheet.getRange('E1:G7').format.columnWidth=22;sheet.getRange('H1:J7').format.columnWidth=28;
 sheet.getRange('A1:J7').format.wrapText=true;sheet.getRange('A2:J7').format.rowHeight=82;
 sheet.showGridLines=false;sheet.freezePanes.freezeRows(1);
 const preview=await wb.render({sheetName:'Master Results',range:'A1:J7',scale:1,format:'png'});
 fs.writeFileSync(path.resolve(root,previewPath),new Uint8Array(await preview.arrayBuffer()));
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(masterPath,csv(values))+'*** End Patch',summary:{...report,inspection:inspected.ndjson||inspected}}));
}else if(mode==='--append-patch'){
 const prior=JSON.parse(read(inputPath));if(read(registerPath)!==prior.registerBytes)throw Error('Append only once to unchanged 55-row index');
 const registeredFiles=[masterPath,notesPath,manifestPath];for(const p of registeredFiles)if(!fs.existsSync(path.resolve(root,p)))throw Error('Output missing '+p);
 const specs=[['E061',masterPath,'master_results','Immutable consolidated results with prescribed 14-column schema; mixed findings and historical/current scopes distinguished'],['E062',notesPath,'consolidation_notes','Decision rules native outcome scales coverage index conflicts omissions and Step 22 handover'],['E063',manifestPath,'consolidation_manifest','Input and derived-output identities plus 55 prior evidence files and 66 unchanged B01 production hashes']];
 const additions=specs.map(([id,p,a,d])=>[id,'RESULTS-20261003-MASTER-01','Mixed conceptual identities / B01 production / ROOTTESTS-02','EV-REG','Step 21 consolidation',a,d,p,'sha256:'+hash(p),'2026-10-03','Codex recorded-evidence synthesis under user direction; no new human endorsement','Artifact Tool CSV inspection and SHA-256 checks; no application provider database or test execution','C1-C5|F1-F13|U1-U9 consolidated within method scope',ALL,'RQ1|RQ2|RQ3']);
 const wb=await Workbook.fromCSV(read(registerPath),{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 // Inspect the existing flat CSV before its values-only append; preserve bytes.
 const originalInspection=await wb.inspect({kind:'region',sheetId:'Evidence',range:'A1:D4',maxChars:1200});
 const before=await wb.render({sheetName:'Evidence',range:'A1:D4',scale:1,format:'png'});
 fs.writeFileSync('/private/tmp/a5-step21.QUBj87/register-before.png',new Uint8Array(await before.arrayBuffer()));
 s.getRange('A57:O59').values=additions;wb.recalculate();
 if(JSON.stringify(s.getRange('A57:O59').values)!==JSON.stringify(additions))throw Error('Register append changed values');
 const last=read(registerPath).trimEnd().split('\n').at(-1);
 console.log(JSON.stringify({patch:'*** Begin Patch\n*** Update File: '+path.resolve(root,registerPath)+'\n@@\n '+last+'\n'+csv(additions).trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch'}));
}else if(mode==='--manifest-patch'){
 const prior=JSON.parse(read(inputPath));const paths=[masterPath,notesPath,inputPath,out+'raw/build_master_results.mjs',...prior.records.map(r=>r.path),...Object.keys(prior.productionHashes)];
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(manifestPath,[...new Set(paths)].map(p=>hash(p)+'  '+p).join('\n')+'\n')+'*** End Patch'}));
}else if(mode==='--verify'){
 const wb=await Workbook.fromCSV(read(masterPath),{sheetName:'Master Results'});wb.recalculate();
 const matrix=wb.worksheets.getItem('Master Results').getUsedRange().values;
 if(JSON.stringify(matrix)!==JSON.stringify(parseCSV(read(masterPath))))throw Error('CSV engine roundtrip changed text');
 const result=checks(matrix),prior=JSON.parse(read(inputPath));
 if(JSON.stringify(matrix.slice(1).map(r=>({result_id:r[0],artefact:r[2]})))!==JSON.stringify(prior.resultKeys))result.failures.push('Immutable R ID mapping changed');
 for(const line of read(manifestPath).trim().split('\n')){const [h,...pieces]=line.split('  ');const p=pieces.join('  ');if(hash(p)!==h)result.failures.push('Manifest mismatch '+p);}
 for(const p of [notesPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);if(!fs.existsSync(target)&&!m[1].includes('pirqoa_traceability.csv')&&!(process.argv.includes('--save')&&target===path.resolve(root,verificationPath)))result.failures.push('Missing local link '+p+': '+m[1]);}
 const summary={...result,capturedAt:new Date().toISOString(),masterHash:hash(masterPath),registerHash:hash(registerPath),manifestHash:hash(manifestPath)};
 if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,verificationPath),JSON.stringify(summary,null,2)+'\n',{flag:'wx'});
 if(process.argv.includes('--verification-patch'))console.log(JSON.stringify({patch:'*** Begin Patch\n'+replacePatch(verificationPath,JSON.stringify(summary,null,2)+'\n')+'*** End Patch',summary}));
 else console.log(JSON.stringify(summary,null,2));if(summary.failures.length)process.exitCode=1;
}else throw Error('Use --prepare, --manifest-patch, --append-patch, or --verify [--save]');
