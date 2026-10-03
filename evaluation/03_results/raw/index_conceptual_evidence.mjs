// Uses the bundled public spreadsheet API; prints an append patch, does not edit CSV.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const runtime='/Users/nlh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node';
const require=createRequire(runtime+'/package.json');
const {Workbook}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const root=process.cwd();
const register='evaluation/03_results/evidence_register.csv';
const csv=fs.readFileSync(register,'utf8');
const workbook=await Workbook.fromCSV(csv,{sheetName:'Evidence'});
const sheet=workbook.worksheets.getItem('Evidence');
const unknown='Not recorded; indexed 2026-10-03';
const conceptual='Original A3 seven-stage framework / retained conceptual evidence; not B01 production';
const criteria='C1|C2|C3|C5; historical C4 completeness/boundaries supplementary only; not protocol C4 literature result';
const details=[
 ['E049','GENAI-01',conceptual+'; embedded master prompt v1.0','CA-GAI','GENAI-Q01..Q09','raw_interview','Fixed nine-question interview with raw responses; recorded metadata; blank later planning templates are not executed results','evaluation/01_conceptual/genai/GENAI-01_interview.md','2026-09-28T11:10+13:00','Nay Lin Htet (recorded interviewer); GPT-5.6 Sol UI-reported responses','Recorded ChatGPT Temporary Chat; High; no browsing; version not independently verified',criteria],
 ['E050','GENAI-01',conceptual,'CA-GAI','GENAI-01 coded findings','interview_analysis','Derived coded findings and historical criterion judgements; not an independent interview or human expert study','evaluation/01_conceptual/genai/GENAI-01_analysis.md',unknown,'Researcher interpretation as recorded; retrospective indexing by Codex','Derived from retained GENAI-01 transcript; original analysis capture date unrecorded',criteria],
 ['E051','INDEX-20261003-CA-LIT',conceptual+' / supplied Assignment 2','CA-LIT','Conceptual literature matrix Evidence_ID rows','conceptual_literature_matrix','Original conceptual literature mappings with support levels and limits; distinct from design literature E045','evaluation/01_conceptual/literature/literature_matrix.csv',unknown,'Researcher interpretation as recorded; retrospective indexing by Codex','Supplied A2 SLR/SSR sources as recorded; no new search or runtime','C4 literature consistency; C1|C2|C3|C5 supporting mappings; historical C4 boundary label kept distinct'],
 ['E052','INDEX-20261003-CA-LIT',conceptual+' / supplied Assignment 2','CA-LIT','Conceptual literature synthesis judgements and limitations','conceptual_literature_synthesis','Qualified conceptual literature synthesis; historical pending next steps preserved; not a fresh design evaluation','evaluation/01_conceptual/literature/literature_synthesis.md',unknown,'Researcher interpretation as recorded; retrospective indexing by Codex','Assignment-mediated literature analysis; source-access limits retained','C4 literature consistency; C1|C2|C3|C5 supporting mappings; historical C4 boundary label kept distinct'],
 ['E053','INDEX-20261003-CA-ARG',conceptual,'CA-ARG','Stage/theory traceability and criterion matrix','conceptual_informed_argument','Original conceptual problem-requirement-theory traceability; analytical reasoning not empirical effects; distinct from E039','evaluation/01_conceptual/informed_argument/traceability.md',unknown,'Researcher interpretation as recorded; retrospective indexing by Codex','Retained conceptual argument and cited assignment/theory evidence; no new study',criteria],
 ['E054','INDEX-20261003-CA-SCN',conceptual+'; historical session executable commit unrecorded','CA-SCN','Photosynthesis scenario supplied content and section 4 boundaries','conceptual_scenario','Historical supplied photosynthesis output and bounded walkthrough; missing cap/fade/history observations retained; distinct from E042','evaluation/01_conceptual/scenario/photosynthesis_scenario.md',unknown,'Supplied scenario and researcher interpretation as recorded; retrospective indexing by Codex','Historical supplied content; original execution date/model/commit unrecorded; no new app run',criteria],
 ['E055','INDEX-20261003-CA-SYN',conceptual,'CA-SYN','Conceptual triangulation criterion and finding tables','derived_conceptual_synthesis','Triangulation of four conceptual methods; derived document not a fifth independent method; expert study absent','evaluation/01_conceptual/conceptual_triangulation.md',unknown,'Researcher interpretation as recorded; retrospective indexing by Codex','Derived conceptual synthesis; no independent replication or new human endorsement',criteria],
 ['E056','INDEX-20261003-CA-REF','Refined conceptual framework: framework_refinements.md section 26; not original GENAI input or new B01 freeze','CA-REF','Refinement decision matrix and section 26 frozen version','framework_refinement_decisions','Accepted qualified rejected and deferred decisions plus frozen seven-stage refinement; preserve conceptual versus implementation identities','evaluation/01_conceptual/framework_refinements.md',unknown,'Researcher interpretation as recorded; retrospective indexing by Codex','Derived refinement decisions from retained conceptual methods; no new runtime',criteria],
 ['E057','AUDIT-20261003-EVIDENCE-01','Mixed conceptual identities / B01 production commit 37faefa236829aa3d79e023faa1fb72a086b5c2a / ROOTTESTS-02','EV-REG','Step 20 retained-evidence integrity and provenance','evidence_register_audit','52 retained entries; 43 historical rows preserved; 10 manifests and 66 production identities checked; criterion/method crosswalk and restricted-original release boundaries','evaluation/03_results/evidence_register_audit.md','2026-10-03','Codex evidence indexing and read-only audit under user direction','SHA-256 and CSV checks; Artifact Tool inspection; no application/provider/database execution or publication','Integrity/provenance support only; no FURPS content or learner-result promotion'],
];
const rows=details.map(d=>{const [id,run,baseline,method,cases,kind,description,p,captured,evaluator,mode,criterion]=d;const h=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');return [id,run,baseline,method,cases,kind,description,p,'sha256:'+h,captured,evaluator,mode,criterion,'REQ-01|REQ-02|REQ-03','RQ1|RQ2|RQ3'];});
sheet.getRange('A45:O53').values=rows;
await workbook.recalculate();
const roundtrip=sheet.getRange('A45:O53').values;
if(JSON.stringify(roundtrip)!==JSON.stringify(rows))throw Error('Spreadsheet append verification failed');
const lines=roundtrip.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','));
const last=csv.trimEnd().split('\n').at(-1);
const patch='*** Begin Patch\n*** Update File: '+root+'/'+register+'\n@@\n '+last+'\n'+lines.map(l=>'+'+l).join('\n')+'\n*** End Patch';
console.log(JSON.stringify({patch,addedRows:rows.length,engineInspection:(await workbook.inspect({kind:'table',range:'Evidence!A45:D53',tableMaxRows:9,tableMaxCols:4})).ndjson}));
