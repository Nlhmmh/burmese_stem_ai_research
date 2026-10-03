// Phase E: assemble authored prose with unchanged captured insertions; audit only.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const base='evaluation/04_paper/', narrativePath=base+'raw/PHASE-E-01-narrative.md';
const docPath=base+'assignment_5_working_paper.md', notesPath=base+'phase_e_drafting_record.md';
const inputPath=base+'raw/PHASE-E-01-input.json', outPath=base+'raw/PHASE-E-01-verification.json';
const scaffoldPath=base+'assignment_5_paper_scaffold.md', packPath='evaluation/03_results/paper_figures_and_tables.md';
const registerPath='evaluation/03_results/evidence_register.csv', runId='DRAFT-20261003-PHASE-E-01';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const count=s=>(s.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/https?:\/\/\S+/g,'').match(/[\p{L}\p{N}]+(?:[’'\-][\p{L}\p{N}]+)*/gu)||[]).length;
const placement=[['FIGURE1','2. Figure 1','2.1'],['TABLE1','3. Table 1','2.1'],['TABLE2','4. Table 2','2.6'],['TABLE3','5. Table 3','3.1'],['TABLE4','6. Table 4','3.7'],['FIGURE2','7. Figure 2','3.5'],['TABLE5','9. Table 5','4.2']];
const authors=['Athukorala','Dunlosky','Goodhue','Hevner','Htet','Ji','Kleidermacher','Kuzu','Sweller','Tran','van de Pol','Venable'];
const citationPatterns=[
 /Athukorala\s*(?:&|and)\s*De Silva,?\s*\(?2025\)?/g,
 /Dunlosky\s*(?:&|and)\s*Rawson,?\s*\(?2012\)?/g,
 /Goodhue\s*(?:&|and)\s*Thompson,?\s*\(?1995\)?/g,
 /Hevner et al\.,?\s*\(?2004\)?/g,
 /Htet,?\s*\(?2026\)?/g,
 /Ji et al\.,?\s*\(?2024\)?/g,
 /Kleidermacher\s*(?:&|and)\s*Zou,?\s*\(?2026\)?/g,
 /Kuzu,?\s*\(?2026\)?/g,
 /Sweller,?\s*\(?1988\)?/g,
 /Tran et al\.,?\s*\(?2023\)?/g,
 /[Vv]an de Pol et al\.,?\s*\(?2010\)?/g,
 /Venable et al\.,?\s*\(?2016\)?/g
];
function blocks(){
 const pack=read(packPath);
 return Object.fromEntries(placement.map(([key,prefix])=>{
  const source=pack.split('## '+prefix+' — ')[1];if(!source)throw Error('Missing '+prefix);
  const [title,...lines]=source.split('\n'), body=lines.join('\n').split(/^## /m)[0].trim();
  return [key,(key.startsWith('TABLE')?'**'+prefix.replace(/^\d+\. /,'').replace(/Table (\d)/,'Table $1.')+' '+title+'**\n\n':'')+body.replaceAll('](paper_assets/','](../03_results/paper_assets/')];
 }));
}
function front(){
 const source=read(base+'assignment_5_front_matter.md');
 const section=h=>source.split('## '+h+'\n')[1].split(/^## /m)[0].trim();
 return {title:section('Title'),abstract:section('Abstract'),keywords:section('Keywords')};
}
function entries(){
 return read(base+'reference_strategy.md').split('## 5. Candidate APA 7 reference pool\n')[1].split(/^## /m)[0].split('\n\n')
  .filter(p=>authors.includes(p.split(',')[0])&&/^\w[\s\S]*\(\d{4}\)\./.test(p));
}
function sectionTexts(s){
 const headings=[...s.matchAll(/^#{2,4} (.+)$/gm)];
 return headings.map((m,i)=>({heading:m[1],text:s.slice(m.index+m[0].length,headings[i+1]?.index)}));
}
function metrics(){
 const source=read(narrativePath).replace(/<<[A-Z0-9]+>>/g,'');
 const parts=sectionTexts(source).map(p=>({heading:p.heading,words:count(p.text)}));
 const targets=[200,1000,1100,600,150];
 const sections=targets.map((target,i)=>({section:i+1,target,actual:parts.filter(p=>new RegExp('^'+(i+1)+'(?:\\.| )').test(p.heading)).reduce((sum,p)=>sum+p.words,0)}));
 const insertion=Object.entries(blocks()).map(([key,text])=>{
  const lines=text.split('\n').filter(l=>l.startsWith('|')&&!/^\|[-: |]+\|$/.test(l));
  const cells=count(lines.join('\n'));return {key,words:count(text),tableCells:cells,captionNoteSource:count(text)-cells};
 });
 const f=front();
 const narrativeWhitespaceWords=source.replace(/^#{2,4} .+$/gm,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/https?:\/\/\S+/g,'').trim().split(/\s+/).length;
 return {counter:'Unicode letter/number tokens, internal apostrophes/hyphens kept; Markdown link labels included, URLs/image alt text excluded; headings and insertions excluded from narrative',
 sections,subsections:parts,bodyWords:sections.reduce((s,r)=>s+r.actual,0),abstractWords:count(f.abstract),titleWords:f.title.split(/\s+/).length,keywords:f.keywords.split('\n').filter(l=>l.startsWith('- ')).length,
 narrativeWhitespaceWords,headingWords:count(sectionTexts(paper()).map(p=>p.heading).join('\n')),keywordWords:count(f.keywords),
 insertionWords:insertion.reduce((s,r)=>s+r.words,0),tableCellWords:insertion.reduce((s,r)=>s+r.tableCells,0),captionNoteSourceWords:insertion.reduce((s,r)=>s+r.captionNoteSource,0),referenceWords:count(entries().join('\n\n')),insertion};
}
function paper(){
 let prose=read(narrativePath);for(const [key,value] of Object.entries(blocks()))prose=prose.replace('<<'+key+'>>',value);
 if(/<<[A-Z0-9]+>>/.test(prose))throw Error('Unexpanded marker');
 const f=front();
 return '# Assignment 5 — Working paper\n\n## Title\n\n'+f.title+'\n\n## Abstract\n\n'+f.abstract+'\n\n## Keywords\n\n'+f.keywords+'\n\n'+prose.trim()+'\n\n## References\n\n'+entries().join('\n\n')+'\n';
}
const mode=process.argv[2];
if(mode==='--intake'){
 const prior=JSON.parse(read(base+'raw/RISK-RUN-01-input.json'));
 const drafting={...prior.priorDraftingHashes};
 for(const p of [base+'submission_risk_review.md',base+'raw/RISK-RUN-01-input.json',base+'raw/RISK-RUN-01-verification.json'])drafting[p]=hash(p);
 if(hash(registerPath)!==prior.registerHash)throw Error('Prior register changed');
 const input={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtCapture:execFileSync('git',['status','--short'],{encoding:'utf8'}),records:prior.records,registerHash:prior.registerHash,productionHashes:prior.productionHashes,priorDraftingHashes:drafting,initialNarrativeHash:hash(narrativePath),scope:'Authored working paper/administrative drafting checks only; no E/R IDs, register mutation, app/test/provider/DB execution, source changes, new human endorsement, official-brief verification or public-release clearance'};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(input,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({runId,records:input.records.length,priorDraftingCaptures:Object.keys(drafting).length}));
}else if(mode==='--metrics')console.log(JSON.stringify(metrics(),null,2));
else if(mode==='--paper-patch'){
 const result=paper(), exists=fs.existsSync(path.resolve(root,docPath));
 const change=exists?'*** Update File: '+path.resolve(root,docPath)+'\n@@\n'+read(docPath).trimEnd().split('\n').map(l=>'-'+l).join('\n')+'\n':'*** Add File: '+path.resolve(root,docPath)+'\n';
 console.log('*** Begin Patch\n'+change+result.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch');
}else if(mode==='--verify'){
 const input=JSON.parse(read(inputPath)),doc=read(docPath), failures=[];
 const check=(ok,msg)=>{if(!ok)failures.push(msg);},m=metrics();
 check(doc===paper(),'Paper differs from authored/unchanged-block assembly');
 const headings=s=>[...s.matchAll(/^#{2,4} (.+)$/gm)].map(m=>m[1]);
 check(JSON.stringify(headings(doc))===JSON.stringify(headings(read(scaffoldPath))),'Prescribed 28 headings/order mismatch');
 check(!/Draft pending|Drafting note|\[Pending|<<[A-Z0-9]+>>/.test(doc),'Administrative placeholder left in paper');
 for(const [key,text] of Object.entries(blocks()))check(doc.includes(text)&&read(scaffoldPath).includes(text),'Captured insertion changed '+key);
 for(const r of m.sections)check(Math.abs(r.actual-r.target)<=Math.max(5,r.target*.03),'Section outside 3% drafting tolerance '+r.section+' '+r.actual);
 const body=doc.split('## References\n')[0].replace(/\[([^\]]*)\]\([^)]*\)/g,'$1');
 const citationCounts=citationPatterns.map((re,i)=>({author:authors[i],count:[...body.matchAll(re)].length}));
 check(entries().length===12,'Need twelve actually used references');
 for(const r of citationCounts)check(r.count>0,'Uncited reference '+r.author);
 check(!/^(?:Grady|Wood|Nair),/m.test(doc.split('## References\n')[1]),'Unused candidate reference');
 check(m.abstractWords<=150&&m.titleWords<=10&&m.keywords===6,'Front-matter counts invalid');
 const labels=front().keywords.split('\n').filter(l=>l.startsWith('- '));check(new Set(labels).size===6,'Duplicate keyword');
 for(const token of ['self-reported','two provider calls','52.825','API-only','91 delivered','BB22','Not assessed','no participant','Partially supported','ဒြပ်ထု','မရှိတော့ဘဲ'])check(doc.toLowerCase().includes(token.toLowerCase()),'Missing evidence/claim limit '+token);
 for(const r of input.records)check(hash(r.path)===r.hash,'Registered evidence changed '+r.id);
 check(hash(registerPath)===input.registerHash,'Evidence register changed');
 for(const [p,h] of Object.entries(input.priorDraftingHashes))check(hash(p)===h,'Prior drafting capture changed '+p);
 for(const [p,h] of Object.entries(input.productionHashes))check(hash(p)===h,'B01 production changed '+p);
  const ids=new Set(input.records.map(r=>r.id));
  for(const id of doc.match(/\bE\d{3}\b/g)||[])check(ids.has(id),'Unknown evidence ID '+id);
  const resultIds=new Set([...read('evaluation/03_results/master_results.csv').matchAll(/^"?(R\d{3})"?[,]/gm)].map(m=>m[1]));
  check(resultIds.size===225,'Master results count mismatch');
  for(const hit of doc.matchAll(/\bR(\d{3})(?:[–-](?:R)?(\d{3}))?/g)){
   const start=+hit[1],end=+(hit[2]||hit[1]);
   for(let n=start;n<=end;n++)check(resultIds.has('R'+String(n).padStart(3,'0')),'Unknown result '+n);
  }
 for(const p of [docPath,notesPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const hit of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(hit[1]))continue;
  const target=path.resolve(root,path.dirname(p),hit[1].split('#')[0]);
  check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,outPath)),'Missing local link '+p+' '+hit[1]);
 }
 const report={runId,checkedAt:new Date().toISOString(),draftingStatus:'Body/front matter assembled and reconciled; citation correspondence and Markdown structural checks complete; official rules/rendered submission pending',metrics:m,prescribedHeadings:headings(doc).length,unchangedInsertionBlocks:7,referenceEntries:entries().length,citationCounts,citationAuditLimit:'Known author-year forms plus manual claim/version/access review; not a generic citation parser or new full-text appraisal',frontMatterCopiedUnchanged:true,priorRegisteredArtefactsPreserved:input.records.length,priorDraftingCapturesPreserved:Object.keys(input.priorDraftingHashes).length,productionFilesPreserved:Object.keys(input.productionHashes).length,registerUnchanged:hash(registerPath)===input.registerHash,submissionReady:false,paperHash:hash(docPath),narrativeHash:hash(narrativePath),draftingRecordHash:hash(notesPath),failures};
 if(failures.length)process.exitCode=1;else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,outPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake, --metrics, --paper-patch, --verify [--save]');
