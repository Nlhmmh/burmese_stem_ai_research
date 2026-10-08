// Step 28: reference inventory/correspondence and read-only provenance checks.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const base='evaluation/04_paper/',docPath=base+'reference_strategy.md';
const inputPath=base+'raw/REF-RUN-01-input.json',outputPath=base+'raw/REF-RUN-01-verification.json';
const registerPath='evaluation/03_results/evidence_register.csv';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const runId='REFERENCES-20261003-PAPER-01',mode=process.argv[2];
const expectedAuthors=['Athukorala','Dunlosky','Goodhue','Grady','Hevner','Htet','Ji','Kleidermacher','Kuzu','Nair','Sweller','Tran','van de Pol','Venable','Wood'];
const citedForms=[['Goodhue','1995'],['Hevner','2004'],['van de Pol','2010'],['Venable','2016']];
if(mode==='--intake'){
 const prior=JSON.parse(read(base+'raw/WORD-RUN-01-input.json'));
 const front=JSON.parse(read(base+'raw/FRONT-RUN-01-verification.json'));
 const extraPaths=[base+'word_allocation.md',base+'assignment_5_front_matter.md',base+'raw/WORD-RUN-01-input.json',base+'raw/WORD-RUN-01-verification.json',base+'raw/FRONT-RUN-01-input.json',base+'raw/FRONT-RUN-01-verification.json'];
 if(hash(registerPath)!==prior.registerHash||hash(base+'assignment_5_front_matter.md')!==front.frontMatterHash)throw Error('Prior identities changed');
 const input={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtCapture:execFileSync('git',['status','--short'],{encoding:'utf8'}),records:prior.records,registerHash:prior.registerHash,productionHashes:prior.productionHashes,priorDraftingHashes:Object.fromEntries(extraPaths.map(p=>[p,hash(p)])),expectedCandidateAuthors:expectedAuthors,currentCitationForms:citedForms,bodyStatus:'Not drafted; current audit limited to existing figure/table material and scaffold',scope:'Reference strategy; selected metadata rechecks, no full-text reappraisal or new SLR, no app/test/provider/DB execution; no E/R IDs or register edit'};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(input,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({runId,registeredArtefacts:input.records.length,candidateReferences:15,currentCitationKeys:4}));
}else if(mode==='--verify'){
 const input=JSON.parse(read(inputPath)),doc=read(docPath),failures=[];const check=(ok,msg)=>{if(!ok)failures.push(msg);};
 const inventory=doc.split('## 2. Claim-to-source inventory\n')[1]?.split(/^## /m)[0];
 const rows=inventory.split('\n').filter(l=>l.startsWith('|')).slice(2).map(l=>l.slice(1,l.lastIndexOf('|')).split('|').map(v=>v.trim()));
 check(rows.length===15,'Need fifteen source inventory rows');check(new Set(rows.map(r=>r[0])).size===15,'Duplicate reference IDs');
 const bibliography=doc.split('## 5. Candidate APA 7 reference pool\n')[1]?.split(/^## /m)[0];
 const entries=bibliography.split('\n\n').filter(p=>/^[A-Z]|^van de Pol/.test(p)).filter(p=>/^\w[\s\S]*\(\d{4}\)\./.test(p));
 check(entries.length===15,'Need fifteen APA candidate entries');
 check(entries.map(p=>p.split(',')[0]).join('|')===expectedAuthors.join('|'),'Bibliographic order/author identities mismatch');
 const locator=/https:\/\/(?:doi\.org\/[^\s)]+|arxiv\.org\/abs\/[^\s)]+|www\.informit\.com\/[^\s)]+)/g;
 const locators=entries.flatMap(e=>[...new Set(e.match(locator)||[])]);check(new Set(locators).size===13,'Expected thirteen external locators plus print book and local assignment');
 check(entries.filter(e=>e.includes('[Preprint]')).length===2,'Keep two distinct versioned preprint entries');
 for(const [author,year] of citedForms){
  const entry=entries.find(e=>e.startsWith(author+','));check(!!entry&&entry.includes('('+year+').'),'Existing paper reference missing '+author);
  for(const p of ['evaluation/03_results/paper_figures_and_tables.md',base+'assignment_5_paper_scaffold.md']){
   const split=read(p).split(p.includes('paper_figures')?'## 11. References':'## References'),body=split[0],refs=split[1];
   check(body.includes(author)&&body.includes(year),'Existing citation missing '+p+' '+author);check(refs.includes(author+',')&&refs.includes('('+year+').'),'Existing reference correspondence mismatch '+p+' '+author);
  }
 }
 for(const token of ['final body audit pending','not a final paper bibliography','as cited in Htet, 2026','2023 five-author','2026 six-author','Version 7','metadata-only','not added to the frozen','six keywords','Grady','Wood'])check(doc.toLowerCase().includes(token.toLowerCase()),'Missing source/continuity safeguard '+token);
 for(const r of input.records)check(hash(r.path)===r.hash,'Registered artefact changed '+r.id);
 check(hash(registerPath)===input.registerHash,'Evidence register changed');
 for(const [p,h] of Object.entries(input.priorDraftingHashes))check(hash(p)===h,'Prior drafting capture changed '+p);
 for(const [p,h] of Object.entries(input.productionHashes))check(hash(p)===h,'B01 production changed '+p);
 for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,outputPath)),'Missing link '+p+' '+m[1]);}
 const report={runId,checkedAt:new Date().toISOString(),candidateReferences:entries.length,sourceInventoryRows:rows.length,distinctExternalReferenceLocators:new Set(locators).size,currentCaptionCitationKeys:citedForms.map(([a,y])=>a+' '+y),currentCaptionCorrespondence:'Four keys resolve in E069 and E073 and the candidate pool',fullPaperCitationAudit:'Pending: body not drafted; candidate-only entries are not final-paper orphans',sourceAccess:'Inherited E040/E047/E059 limits; selected fresh metadata checks disclosed, not all original texts read',priorRegisteredArtefactsPreserved:input.records.length,priorDraftingFilesPreserved:Object.keys(input.priorDraftingHashes).length,productionFilesPreserved:Object.keys(input.productionHashes).length,registerUnchanged:hash(registerPath)===input.registerHash,strategyHash:hash(docPath),failures};
 if(failures.length)process.exitCode=1;else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,outputPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake or --verify [--save]');
