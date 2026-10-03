// Step 27: front-matter counts, recorded-claim cross-check and input identities only.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const base='evaluation/04_paper/',docPath=base+'assignment_5_front_matter.md';
const inputPath=base+'raw/FRONT-RUN-01-input.json',outputPath=base+'raw/FRONT-RUN-01-verification.json';
const registerPath='evaluation/03_results/evidence_register.csv';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const runId='FRONT-20261003-PAPER-01',mode=process.argv[2];
const words=s=>s.trim().split(/\s+/).length;
if(mode==='--intake'){
 const wordInput=JSON.parse(read(base+'raw/WORD-RUN-01-input.json'));
 const wordCheck=JSON.parse(read(base+'raw/WORD-RUN-01-verification.json'));
 if(hash(registerPath)!==wordInput.registerHash||hash(base+'word_allocation.md')!==wordCheck.allocationHash)throw Error('Prior drafting identities changed');
 const input={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtCapture:execFileSync('git',['status','--short'],{encoding:'utf8'}),records:wordInput.records,registerHash:wordInput.registerHash,productionHashes:wordInput.productionHashes,allocationHash:wordCheck.allocationHash,userInstruction:'Do Step 27. Keywords must be 6',priorPlanKeywordLimit:5,currentRequestedKeywords:6,officialBriefAvailable:false,bodyStatus:'Undrafted; front matter requested now and must be reconciled after body drafting',scope:'Writing from recorded findings; no new evaluation or reference appraisal; no E/R IDs or evidence-register edits'};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(input,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({runId,registeredArtefacts:input.records.length,keywordsRequired:6}));
}else if(mode==='--verify'){
 const input=JSON.parse(read(inputPath)),doc=read(docPath),failures=[];
 const check=(ok,msg)=>{if(!ok)failures.push(msg);};
 const section=h=>doc.split('## '+h+'\n')[1]?.split(/^## /m)[0].trim();
 const title=section('Title'),abstract=section('Abstract'),keywords=section('Keywords').split('\n').filter(l=>l.startsWith('- ')).map(l=>l.slice(2).trim());
 check(words(title)<=10,'Title exceeds 10 whitespace words');check(words(title.replaceAll('-',' '))<=10,'Title exceeds 10 with hyphens split');
 check(words(abstract)===140&&words(abstract)<=150,'Abstract target/count mismatch');check(words(abstract.replaceAll('-',' '))<=150,'Abstract exceeds 150 with hyphens split');
 check(keywords.length===6&&new Set(keywords).size===6&&keywords.every(Boolean),'Need six distinct nonempty keywords');
 const interpretation=read('evaluation/03_results/results_interpretation.md');
 check(interpretation.includes('18 Pass, 71 Partial, two Fail among 91 delivered outputs'),'Content counts lack retained support');
 check(interpretation.includes('six U Pass/three U Partial'),'Usability counts lack retained support');
 for(const token of ['under tested conditions','Researcher-endorsed','Technical usability inspection','remain partial','remain unestablished'])check(abstract.includes(token),'Abstract qualification missing '+token);
 for(const token of ['body is not yet drafted','six keywords','five','standalone','after body drafting'])check(doc.replace(/\s+/g,' ').includes(token),'Missing drafting/keyword-rule disclosure '+token);
 for(const r of input.records)check(hash(r.path)===r.hash,'Registered artefact changed '+r.id);
 check(hash(registerPath)===input.registerHash,'Evidence register changed');check(hash(base+'word_allocation.md')===input.allocationHash,'Step 26 allocation changed');
 for(const [p,h] of Object.entries(input.productionHashes))check(hash(p)===h,'B01 production changed '+p);
 for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);
  check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,outputPath)),'Missing local link '+p+' '+m[1]);}
 const report={runId,checkedAt:new Date().toISOString(),titleWords:words(title),titleWordsWithHyphensSplit:words(title.replaceAll('-',' ')),abstractWords:words(abstract),abstractWordsWithHyphensSplit:words(abstract.replaceAll('-',' ')),keywords:keywords.length,keywordsRequired:6,bodyReconciliationPending:true,officialBriefAvailable:false,priorRegisteredArtefactsPreserved:input.records.length,productionFilesPreserved:Object.keys(input.productionHashes).length,evidenceRegisterUnchanged:hash(registerPath)===input.registerHash,allocationUnchanged:hash(base+'word_allocation.md')===input.allocationHash,frontMatterHash:hash(docPath),failures};
 if(failures.length)process.exitCode=1;else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,outputPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake or --verify [--save]');
