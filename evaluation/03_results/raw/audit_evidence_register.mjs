// Step 20: read-only evidence audit; never executes the application or old runners.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {encoding:'utf8'}).trim();
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export function parseCSV(text) {
  text = text.replace(/^\uFEFF/, '');
  const rows=[]; let row=[], value='', quoted=false;
  for(let i=0;i<text.length;i++) {
    const c=text[i];
    if(c==='"') { if(quoted && text[i+1]==='"'){value+='"'; i++;} else quoted=!quoted; }
    else if(c===',' && !quoted){row.push(value);value='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(value);if(row.some(Boolean))rows.push(row);row=[];value='';}
    else value+=c;
  }
  if(quoted)throw Error('Unclosed CSV quote');
  if(value||row.length){row.push(value);rows.push(row);}
  return rows;
}
const relative = p => path.relative(root, p);
const failures=[];
const read = p => fs.readFileSync(path.resolve(root,p));
const check = (p, expected) => {
  const abs=path.resolve(root,p);
  if(!abs.startsWith(root+path.sep)){failures.push({path:p,reason:'Outside repository'});return;}
  if(!fs.existsSync(abs)){failures.push({path:p,reason:'Missing'});return;}
  const actual=digest(fs.readFileSync(abs));
  if(actual!==expected)failures.push({path:p,reason:'Hash mismatch',expected,actual});
};
const registerPath='evaluation/03_results/evidence_register.csv';
const bytes=read(registerPath), matrix=parseCSV(bytes.toString());
const header=matrix.shift();
const expectedHeader='evidence_id,run_id,baseline_id,method_id,case_id,artefact,description,path,locator_or_hash,captured_at,evaluator,dependency_mode,criteria,requirements,research_questions';
if(header.join(',')!==expectedHeader)failures.push({reason:'Unexpected schema'});
const records=matrix.map(row=>Object.fromEntries(header.map((name,i)=>[name,row[i]])));
for(const [i,row] of matrix.entries())if(row.length!==15||row.some(v=>!v.trim()))failures.push({row:i+2,reason:'Missing field or wrong width'});
for(const key of ['evidence_id','path'])if(new Set(records.map(r=>r[key])).size!==records.length)failures.push({reason:`Duplicate ${key}`});
const retired=['E028','E029','E030','E031','E032'];
const knownMethods=new Set(['DA-STA','DA-DYN','DA-BND','DE-SIM','DE-BB','DE-WB','DA-UI','DA-ARG','DA-SCN','DA-LIT','CA-GAI','CA-LIT','CA-ARG','CA-SCN','CA-SYN','CA-REF','EV-REG']);
for(const r of records){
  if(!knownMethods.has(r.method_id))failures.push({reason:'Unmapped method',id:r.evidence_id,method:r.method_id});
  if(retired.includes(r.evidence_id))failures.push({reason:'Retired ID reused',id:r.evidence_id});
  if(!/^sha256:[a-f0-9]{64}$/.test(r.locator_or_hash))failures.push({reason:'Invalid locator',id:r.evidence_id});
  else check(r.path,r.locator_or_hash.slice(7));
  if(!r.requirements.split('|').every(v=>/^REQ-0[123]$/.test(v))||!r.research_questions.split('|').every(v=>/^RQ[123]$/.test(v)))failures.push({reason:'Invalid REQ/RQ mapping',id:r.evidence_id});
}
const manifests=[];const covered=new Set(records.map(r=>path.resolve(root,r.path)));
for(const r of records.filter(r=>r.path.endsWith('.sha256'))){
  const entries=[];
  for(const line of read(r.path).toString().split(/\r?\n/).filter(Boolean)){
    const m=line.match(/^([a-f0-9]{64})\s+\*?(.+)$/);
    if(!m){failures.push({manifest:r.path,reason:'Malformed entry'});continue;}
    const name=m[2];
    // Existing manifests document two bases: repo root or manifest directory.
    // Choose an existing candidate only when unambiguous; hashes still must match.
    const candidates=[...new Set((path.isAbsolute(name)?[name]:[path.resolve(root,name),path.resolve(root,path.dirname(r.path),name)]).filter(p=>p.startsWith(root+path.sep)&&fs.existsSync(p)))];
    if(candidates.length!==1){failures.push({manifest:r.path,path:name,reason:'Missing or ambiguous manifest target'});continue;}
    const abs=candidates[0];
    check(relative(abs),m[1]);covered.add(abs);entries.push(relative(abs));
  }
  manifests.push({id:r.evidence_id,path:r.path,entries:entries.length,paths:entries});
}
const metadata=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json'));
for(const [p,h] of Object.entries(metadata.productionHashes))check(p,h);
const priorPath='evaluation/03_results/raw/REGISTER-AUDIT-01-input.json';
let priorRowsPreserved=null;
if(fs.existsSync(path.resolve(root,priorPath))){
  const prior=JSON.parse(read(priorPath));
  priorRowsPreserved=records.slice(0,prior.records.length).every((r,i)=>JSON.stringify(r)===JSON.stringify(prior.records[i]));
  if(!priorRowsPreserved)failures.push({reason:'Historical rows changed'});
}
const citations=[];
for(const p of ['docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md','evaluation/03_results/evidence_register_audit.md']){
  if(!fs.existsSync(path.resolve(root,p)))continue;
  const ids=[...new Set(read(p).toString().match(/\bE\d{3}\b/g)||[])];
  const unresolved=ids.filter(id=>!records.some(r=>r.evidence_id===id)&&!retired.includes(id));
  citations.push({path:p,ids,retiredReferences:ids.filter(id=>retired.includes(id)),unresolved});
  if(unresolved.length)failures.push({path:p,reason:'Unresolved cited evidence IDs',ids:unresolved});
}
// Bounded text scan: report locations and categories only, never values.
const patterns=[
  ['provider_key',/\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ['private_key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['database_credentials',/mongodb(?:\+srv)?:\/\/[^\s/]+:[^\s/@]+@/],
  ['bearer_credential',/Bearer\s+[A-Za-z0-9_.-]{30,}/i],
  ['cookie_assignment',/(?:set-cookie|cookie)["']?\s*[:=]\s*["']?[^\r\n]{0,120}(?:learner|session|token)[^\r\n]{0,40}=/i],
];
const privacyFindings=[];let scannedTextFiles=0;
for(const abs of covered){
  if(!fs.existsSync(abs)||!fs.statSync(abs).isFile()||!abs.startsWith(root+path.sep)||!abs.includes('/evaluation/'))continue;
  if(!/\.(?:md|csv|json|jsonl|har|txt|log|mjs|ts|sha256)$/.test(abs))continue;
  const content=fs.readFileSync(abs,'utf8');scannedTextFiles++;
  for(const [category,re] of patterns)if(re.test(content))privacyFindings.push({path:relative(abs),category});
}
const result={auditId:'AUDIT-20261003-EVIDENCE-01',capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),registerHash:digest(bytes),recordCount:records.length,records,retiredIds:retired,citations,manifestCount:manifests.length,manifestEntries:manifests.reduce((s,m)=>s+m.entries,0),manifests,productionCommit:metadata.sourceCommit,productionFiles:Object.keys(metadata.productionHashes).length,priorRowsPreserved,scannedTextFiles,privacyFindings,failures};
const target=process.argv[2];
if(target)fs.writeFileSync(path.resolve(root,target),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({recordCount:result.recordCount,manifestCount:result.manifestCount,manifestEntries:result.manifestEntries,productionFiles:result.productionFiles,priorRowsPreserved,scannedTextFiles,privacyFindings,failures},null,2));
if(failures.length)process.exitCode=1;
