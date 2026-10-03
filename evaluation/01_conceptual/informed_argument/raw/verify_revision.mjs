// Documentation-only checks and append preparation using the bundled public API.
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
const dir='evaluation/01_conceptual/informed_argument/';
const registerPath='evaluation/03_results/evidence_register.csv';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,p))).digest('hex');
const prior=JSON.parse(read('evaluation/03_results/raw/REGISTER-AUDIT-01-final.json'));
const workbook=await Workbook.fromCSV(read(registerPath),{sheetName:'Evidence'});
const sheet=workbook.worksheets.getItem('Evidence');
const header=sheet.getRange('A1:O1').values[0];
const oldValues=sheet.getRange('A2:O53').values;
// The engine may normalise ISO timestamps. Verify original CSV bytes separately
// and permit equivalent timestamp display only in the in-memory inspection.
const equivalent=(actual,expected,column)=>actual===expected||(column===9&&Number.isFinite(new Date(actual).getTime())&&new Date(actual).getTime()===new Date(expected).getTime());
if(!oldValues.every((r,i)=>r.every((v,j)=>equivalent(v,prior.records[i][header[j]],j))))throw Error('Prior 52 rows changed');
const csv=read(registerPath), appendOffset=csv.indexOf('"E058",');
const originalPrefix=appendOffset<0?csv:csv.slice(0,appendOffset);
if(crypto.createHash('sha256').update(originalPrefix).digest('hex')!==prior.registerHash)throw Error('Original register bytes changed');
for(const r of prior.records)if(hash(r.path)!==r.locator_or_hash.slice(7))throw Error('Prior artefact hash changed: '+r.evidence_id);
const production=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json'));
for(const [p,h] of Object.entries(production.productionHashes))if(hash(p)!==h)throw Error('Production identity changed: '+p);
const documents=['traceability_v2.md','reference_verification_v2.md','revision_notes_v2.md','README.md'].map(n=>dir+n);
const failures=[];let localLinksChecked=0,anchorsChecked=0;
const slug=s=>s.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/ /g,'-');
for(const p of documents){
  for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
    if(/^https?:/.test(m[1]))continue;
    const [name,anchor]=m[1].split('#');
    const target=path.resolve(root,path.dirname(p),name||path.basename(p));
    if(!fs.existsSync(target)){
      const futureTargets=[path.resolve(root,dir+'raw/CAARG-V2-manifest.sha256'),path.resolve(root,dir+'raw/CAARG-V2-verification.json')];
      const preparing=process.argv.includes('--manifest')||process.argv.includes('--append-patch');
      const ownRecord=process.argv.includes('--save')&&target===futureTargets[1];
      if((preparing&&futureTargets.includes(target))||ownRecord)continue;
      failures.push({path:p,reason:'Missing local link',target:m[1]});continue;
    }
    localLinksChecked++;
    if(anchor){anchorsChecked++;const headings=[...fs.readFileSync(target,'utf8').matchAll(/^#{1,6}\s+(.+)$/gm)].map(x=>slug(x[1]));if(!headings.includes(anchor))failures.push({path:p,reason:'Missing heading anchor',target:m[1]});}
  }
}
const text=read(dir+'traceability_v2.md');
const main=text.split('## 7. References')[0], refs=text.split('## 7. References')[1];
const expectedCitations=[['Dunlosky','2012'],['Goodhue','1995'],['Hevner','2004'],['Ji','2024'],['Kleidermacher','2026'],['Sweller','1988'],['Tran','2023'],['van de Pol','2010'],['Venable','2016']];
for(const [author,year] of expectedCitations){if(!new RegExp(author+'[^\n]{0,100}'+year).test(main)||!new RegExp(author+'[^\n]{0,200}'+year).test(refs))failures.push({reason:'Missing citation/reference pair',author,year});}
const stages=[...text.matchAll(/^### IA-C0[1-7] — /gm)];
if(stages.length!==7)failures.push({reason:'Not exactly seven stage arguments'});
for(let i=0;i<stages.length;i++){const block=text.slice(stages[i].index,stages[i+1]?.index||text.indexOf('## 4. Cross-stage'));for(const token of ['**Problem and requirement.**','**Research warrant.**','removal test','**Counterargument and limit.**','**Conclusion:'])if(!block.includes(token))failures.push({reason:'Missing argument component',stage:i+1,token});}
if(process.argv.includes('--manifest')){
  if(sheet.getRange('A54').values[0][0])throw Error('Cannot regenerate registered revision manifest');
  // The future verification JSON is deliberately excluded to avoid hash cycles.
  const inputs=[...documents,dir+'raw/verify_revision.mjs',dir+'traceability.md','evaluation/01_conceptual/framework_refinements.md','evaluation/01_conceptual/conceptual_triangulation.md','evaluation/01_conceptual/literature/literature_matrix.csv','evaluation/01_conceptual/literature/literature_synthesis.md','evaluation/02_design/informed_argument/reference_verification.md','evaluation/03_results/raw/REGISTER-AUDIT-01-final.json',...Object.keys(production.productionHashes)];
  fs.writeFileSync(path.resolve(root,dir+'raw/CAARG-V2-manifest.sha256'),inputs.map(p=>hash(p)+'  '+p).join('\n')+'\n');
  console.log(JSON.stringify({manifestEntries:inputs.length,priorRecords:52,productionFiles:66}));
} else if(process.argv.includes('--append-patch')){
  if(sheet.getRange('A54').values[0][0])throw Error('Revision rows already present');
  const baseline='Final conceptual framework E056 section 26 / conceptual argument v2; not a new B01 baseline';
  const ids=[
    ['E058','CA-ARG','IA-C01..IA-C07|C1..C5','revised_conceptual_argument','Dated literature-grounded conceptual revision with nine sources; seven warrants removal tests counterarguments and qualified conclusions; E053 historical argument retained',dir+'traceability_v2.md','C1|C2|C3 bounded conceptual rationale; C4 focused literature contribution; C5 not directly assessed'],
    ['E059','CA-ARG','CAARG-L01..CAARG-L09','conceptual_source_verification','Primary-source locators and explicit access/version/transfer limits; nine reference-citation pairs; additional sources not inserted into frozen A2 corpus',dir+'reference_verification_v2.md','C3|C4 scholarly warrants and limits; not empirical learning or content evidence'],
    ['E060','EV-REG','Conceptual CA-ARG v2 documentation integrity','revision_integrity_manifest','Revision files and retained conceptual/source inputs plus 66 B01 production identities; original 52 rows and artefact hashes unchanged',dir+'raw/CAARG-V2-manifest.sha256','Integrity and revision provenance only; no result promotion'],
  ];
  const rows=ids.map(([id,method,cases,kind,description,p,criterion])=>[id,'ANALYSIS-20261003-CONCEPTUAL-ARGUMENT-02',baseline,method,cases,kind,description,p,'sha256:'+hash(p),'2026-10-03','Codex literature/conceptual synthesis under user direction; no new human endorsement','Focused primary-source checking and retained conceptual artefacts; TTF abstract warrant reuses E040; no app/provider/database/participant execution',criterion,'REQ-01|REQ-02|REQ-03','RQ1|RQ2|RQ3']);
  sheet.getRange('A54:O56').values=rows;
  await workbook.recalculate();
  if(!sheet.getRange('A54:O56').values.every((r,i)=>r.every((v,j)=>equivalent(v,rows[i][j],j))))throw Error('Spreadsheet values mismatch');
  const lines=rows.map(r=>r.map(v=>'"'+v.replaceAll('"','""')+'"').join(','));
  const last=read(registerPath).trimEnd().split('\n').at(-1);
  const patch='*** Begin Patch\n*** Update File: '+path.resolve(root,registerPath)+'\n@@\n '+last+'\n'+lines.map(l=>'+'+l).join('\n')+'\n*** End Patch';
  console.log(JSON.stringify({patch,addedRecords:3,inspection:(await workbook.inspect({kind:'table',range:'Evidence!A54:D56',tableMaxRows:3,tableMaxCols:4})).ndjson}));
} else {
  const values=sheet.getRange('A2:O56').values;
  const records=values.map(row=>Object.fromEntries(header.map((h,i)=>[h,row[i]])));
  for(const r of records)if(hash(r.path)!==r.locator_or_hash?.slice(7))failures.push({reason:'Registered hash mismatch',id:r.evidence_id});
  if(records.length!==55||new Set(records.map(r=>r.evidence_id)).size!==55||new Set(records.map(r=>r.path)).size!==55)failures.push({reason:'Register shape/duplicates'});
  const manifestLines=read(dir+'raw/CAARG-V2-manifest.sha256').trim().split('\n');
  for(const line of manifestLines){const m=line.match(/^([a-f0-9]{64})  (.+)$/);if(!m||hash(m[2])!==m[1])failures.push({reason:'Manifest hash mismatch'});}
  const result={analysis:'ANALYSIS-20261003-CONCEPTUAL-ARGUMENT-02',capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),registerHash:hash(registerPath),registerRecords:records.length,prior52RowsPreserved:true,prior52ArtefactHashesUnchanged:true,productionFilesUnchanged:Object.keys(production.productionHashes).length,stageArguments:stages.length,citationReferencePairs:expectedCitations.length,localLinksChecked,anchorsChecked,manifestEntries:manifestLines.length,failures,inspection:(await workbook.inspect({kind:'table',range:'Evidence!A54:D56',tableMaxRows:3,tableMaxCols:4})).ndjson};
  if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,dir+'raw/CAARG-V2-verification.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
  console.log(JSON.stringify(result,null,2));
}
if(failures.length)process.exitCode=1;
