// Step 26: drafting budget and read-only integrity checks. No app/LLM/DB/test run.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const base='evaluation/04_paper/',docPath=base+'word_allocation.md';
const inputPath=base+'raw/WORD-RUN-01-input.json',outputPath=base+'raw/WORD-RUN-01-verification.json';
const registerPath='evaluation/03_results/evidence_register.csv';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const runId='ALLOCATE-20261003-PAPER-01';
const scaffoldPath=base+'assignment_5_paper_scaffold.md',packPath='evaluation/03_results/paper_figures_and_tables.md';
const placement=[['Figure 1',2,'2. Figure 1'],['Table 1',2,'3. Table 1'],['Table 2',2,'4. Table 2'],['Table 3',3,'5. Table 3'],['Table 4',3,'6. Table 4'],['Figure 2',3,'7. Figure 2'],['Table 5',4,'9. Table 5']];
// Local planning estimate only. Not Microsoft Word or an official counting rule.
const count=s=>(s.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/https?:\/\/\S+/g,'').match(/[\p{L}\p{N}]+(?:[’'\-][\p{L}\p{N}]+)*/gu)||[]).length;
function sourceMetrics(){const pack=read(packPath),items=placement.map(([item,section,prefix])=>{
 const source=pack.split('## '+prefix+' — ')[1].split(/^## /m)[0].trim();
 const lines=source.split('\n'),tableLines=lines.filter(l=>l.startsWith('|')&&!/^\|[-: |]+\|$/.test(l));
 const tableWords=count(tableLines.join('\n')),total=count(source);
 return {item,section,tableWords,captionNoteSourceWords:total-tableWords,total};
 });return {counter:'Unicode letter/number tokens; internal apostrophes/hyphens kept; link labels kept and URLs/image alt text removed',status:'Approximate insertion-block estimate, not final submission count',items,bySection:Object.fromEntries([2,3,4].map(section=>[section,items.filter(i=>i.section===section).reduce((sum,i)=>sum+i.total,0)])),total:items.reduce((sum,i)=>sum+i.total,0),captionReferences:count(pack.split('## 11. References used in captions and notes\n')[1])};}
const mode=process.argv[2];
if(mode==='--intake'){
 const prior=JSON.parse(read('evaluation/03_results/raw/STRUCTURE-RUN-01-input.json'));
 const verification=JSON.parse(read('evaluation/03_results/raw/STRUCTURE-RUN-01-verification.json'));
 const records=[...prior.records.map(r=>({id:r.evidence_id,path:r.path,hash:r.locator_or_hash.slice(7)})),{id:'E073',path:scaffoldPath,hash:verification.scaffoldHash},{id:'E074',path:'evaluation/03_results/raw/STRUCTURE-RUN-01-manifest.sha256',hash:verification.manifestHash}];
 if(hash(registerPath)!==verification.registerHash||records.some(r=>hash(r.path)!==r.hash))throw Error('Step 25 evidence identity changed before allocation');
 const productionHashes=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json')).productionHashes;
 const input={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtCapture:execFileSync('git',['status','--short'],{encoding:'utf8'}),registerHash:hash(registerPath),records,productionHashes,sourceMetrics:sourceMetrics(),planningSources:['docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md §§2,34–36','docs/INFOSYS_720_Assignment_5_Complete_Plan.md (historical numbering)','evaluation/00_protocol/evaluation_protocol.md (standalone-brief caveat)'],officialBriefAvailable:false,scope:'Administrative word allocation, not new evaluation evidence; E073 retained immutable; evidence register not edited'};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(input,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({runId,registeredArtefacts:records.length,productionFiles:Object.keys(productionHashes).length,metrics:input.sourceMetrics},null,2));
}else if(mode==='--verify'){
 const input=JSON.parse(read(inputPath)),doc=read(docPath),failures=[];
 const check=(ok,msg)=>{if(!ok)failures.push(msg);};
 function tableAfter(heading){const section=doc.split(heading+'\n')[1]?.split(/^## /m)[0];if(!section)throw Error('Missing '+heading);
  return section.split('\n').filter(l=>l.startsWith('|')).slice(2).map(l=>l.slice(1,l.lastIndexOf('|')).split('|').map(v=>v.trim()));}
 const main=tableAfter('## 2. Section targets'),concept=tableAfter('## 3. Conceptual evaluation — 1,000 words'),design=tableAfter('## 4. Design evaluation — 1,100 words'),results=tableAfter('## 5. Results and interpretation — 600 words');
 const target=r=>Number(r[1].replaceAll(',','')),sum=rows=>rows.reduce((n,r)=>n+target(r),0);
 check(main.map(target).join(',')==='200,1000,1100,600,150','Top-level targets changed');
 check(sum(main)===3050,'Body total must be 3050');check(sum(concept)===1000,'Conceptual subtotal mismatch');check(sum(design)===1100,'Design subtotal mismatch');check(sum(results)===600,'Results subtotal mismatch');
 check(sum(main)+140===3190,'Body plus abstract mismatch');
 const analytical=[15,60,75,90],blackWhite=[100,100],argumentScenario=[100,80];
 check(analytical.reduce((a,b)=>a+b,0)===target(design.find(r=>r[0].startsWith('3.2 '))),'Analytical subdivisions mismatch');
 check(blackWhite.reduce((a,b)=>a+b,0)===target(design.find(r=>r[0].startsWith('3.4 '))),'Testing subdivisions mismatch');
 check(argumentScenario.reduce((a,b)=>a+b,0)===target(design.find(r=>r[0].startsWith('3.5 '))),'Argument/scenario subdivisions mismatch');
 for(const text of ['15 + 60 + 75 + 90 = 240','100 + 100 = 200','100 + 80 = 180','3,050','3,190','130–150','800–1,200','500–750'])check(doc.includes(text),'Missing explicit allocation '+text);
 const scaffoldHeadings=[...read(scaffoldPath).matchAll(/^#{2,4} (.+)$/gm)].map(m=>m[1]);
 for(const heading of scaffoldHeadings.filter(h=>/^\d+\.\d+ /.test(h)))check(doc.includes(heading),'Unallocated subsection '+heading);
 for(const r of input.records)check(hash(r.path)===r.hash,'Prior evidence changed '+r.id);
 check(hash(registerPath)===input.registerHash,'Evidence register changed');
 for(const [p,h] of Object.entries(input.productionHashes))check(hash(p)===h,'B01 production changed '+p);
 const metrics=sourceMetrics();check(JSON.stringify(metrics)===JSON.stringify(input.sourceMetrics),'Insertion estimate/source changed');
 for(const token of ['Unconfirmed','No overall maximum','not an official submission count','Step 27','not drafted','citations','Conclusion','References'])check(doc.includes(token),'Missing scope/counting qualification '+token);
 check(doc.includes('870–1,290')&&doc.includes('900–1,330'),'Prior allocation conflict not recorded');
 for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);
  check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,outputPath)),'Missing local link '+p+' '+m[1]);}
 const report={runId,checkedAt:new Date().toISOString(),bodyTarget:sum(main),abstractTarget:140,bodyAndAbstractTarget:3190,sectionTargets:main.map(r=>({section:r[0],words:target(r)})),conceptualSum:sum(concept),designSum:sum(design),resultsSum:sum(results),sourceMetrics:metrics,priorRegisteredArtefactsPreserved:input.records.length,evidenceRegisterUnchanged:hash(registerPath)===input.registerHash,productionFilesPreserved:Object.keys(input.productionHashes).length,officialBriefAvailable:false,officialCountingRules:'Unconfirmed; planning ledger only',paperProse:'not drafted',allocationHash:hash(docPath),failures};
 if(failures.length)process.exitCode=1;else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,outputPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake or --verify [--save]');
