// Step 29 documentation audit. No application, provider or database execution.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const base='evaluation/04_paper/', docPath=base+'submission_risk_review.md';
const inputPath=base+'raw/RISK-RUN-01-input.json', outputPath=base+'raw/RISK-RUN-01-verification.json';
const registerPath='evaluation/03_results/evidence_register.csv';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const runId='RISKS-20261003-PAPER-01', mode=process.argv[2];
if(mode==='--intake'){
  const prior=JSON.parse(read(base+'raw/REF-RUN-01-input.json'));
  const refs=JSON.parse(read(base+'raw/REF-RUN-01-verification.json'));
  if(hash(registerPath)!==prior.registerHash||hash(base+'reference_strategy.md')!==refs.strategyHash)throw Error('Prior identities changed');
  const drafting={...prior.priorDraftingHashes};
  for(const p of [base+'reference_strategy.md',base+'raw/REF-RUN-01-input.json',base+'raw/REF-RUN-01-verification.json'])drafting[p]=hash(p);
  const input={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtCapture:execFileSync('git',['status','--short'],{encoding:'utf8'}),records:prior.records,registerHash:prior.registerHash,productionHashes:prior.productionHashes,priorDraftingHashes:drafting,scope:'Administrative submission-risk review using recorded evidence; no new results, E/R IDs, app/test/provider/DB execution, source changes, human endorsement or publication clearance'};
  fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(input,null,2)+'\n',{flag:'wx'});
  console.log(JSON.stringify({runId,records:input.records.length,draftingFiles:Object.keys(drafting).length,productionFiles:Object.keys(input.productionHashes).length}));
}else if(mode==='--verify'){
  const input=JSON.parse(read(inputPath)), doc=read(docPath), failures=[];
  const check=(ok,msg)=>{if(!ok)failures.push(msg);};
  for(const r of input.records)check(hash(r.path)===r.hash,'Registered artefact changed '+r.id);
  check(hash(registerPath)===input.registerHash,'Evidence register changed');
  for(const [p,h] of Object.entries(input.priorDraftingHashes))check(hash(p)===h,'Prior drafting capture changed '+p);
  for(const [p,h] of Object.entries(input.productionHashes))check(hash(p)===h,'B01 production changed '+p);
  const riskRows=doc.split('\n').filter(l=>/^\| RISK-\d{2} \|/.test(l));
  check(riskRows.length===14,'Need fourteen submission risks');
  for(let n=1;n<=14;n++)check(riskRows.some(l=>l.startsWith('| RISK-'+String(n).padStart(2,'0')+' |')),'Missing risk '+n);
  const methodRows=doc.split('\n').filter(l=>/^\| (?:CA-|DA-|EX-)/.test(l));
  check(methodRows.length===15,'Need fourteen performed methods plus skipped optional-expert row');
  for(const id of ['CA-GAI','CA-LIT','CA-ARG','CA-SCN','DA-STA','DA-DYN','DA-BND','DA-SIM','DA-BB','DA-WB','DA-UI','DA-ARG','DA-SCN','DA-LIT']){
    check(doc.includes(id),'Missing method mapping '+id);
  }
  for(const token of ['all thirteen F outcomes remain Partial','six Pass / three Partial','18 Pass, 71 Partial, two Fail','44 technical Pass, eight controlled initial ambiguities, three technical Fail','21 Pass, two Partial, one Fail','361 deterministic + 12 isolated MongoDB','24 PIRQOA','six keywords','not a grade prediction','no new E/R ID','preference-save infrastructure fault','public-release clearance','1,000 narrative words'])check(doc.includes(token),'Missing outcome/scope safeguard '+token);
  const known=new Set(input.records.map(r=>r.id));
  for(const id of doc.match(/\bE\d{3}\b/g)||[])check(known.has(id)||['E028','E032'].includes(id),'Unresolved evidence '+id);
  const master=read('docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md');
  const step=master.split('# 38. Step 29')[1]?.split('# 39. Step 30')[0]||'';
  check(step.includes('REVIEW COMPLETE')&&step.includes('submission_risk_review.md'),'Master Step 29 status/link missing');
  check(!step.includes('Design — partially completed')&&!step.includes('- [ ] SLR'),'Outdated method checklist remains');
  for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
    if(/^(https?:|mailto:|#)/.test(m[1]))continue;
    const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);
    check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,outputPath)),'Missing local link '+p+' '+m[1]);
  }
  const audit=JSON.parse(execFileSync(process.execPath,['evaluation/03_results/raw/audit_evidence_register.mjs'],{cwd:root,encoding:'utf8'}));
  check(audit.failures.length===0,'Retained register/manifest audit failed');
  const report={runId,checkedAt:new Date().toISOString(),riskRows:riskRows.length,methodRows:methodRows.length,reviewComplete:true,submissionReady:false,gradePrediction:false,priorRegisteredArtefactsPreserved:input.records.length,priorDraftingCapturesPreserved:Object.keys(input.priorDraftingHashes).length,productionFilesPreserved:Object.keys(input.productionHashes).length,registerUnchanged:hash(registerPath)===input.registerHash,retainedAudit:{records:audit.recordCount,manifests:audit.manifestCount,manifestEntries:audit.manifestEntries,priorRowsPreserved:audit.priorRowsPreserved,privacyFindingLocations:audit.privacyFindings.length},reviewHash:hash(docPath),failures};
  if(failures.length)process.exitCode=1;
  else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,outputPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
  console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake or --verify [--save]');
