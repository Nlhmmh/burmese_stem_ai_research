// Step 25: document structure and provenance only. No app/tests/provider/DB execution.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const runtime='/Users/nlh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node';
const require=createRequire(runtime+'/package.json');
const {Workbook}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const dir='evaluation/03_results/',runId='STRUCTURE-20261003-PAPER-01';
const docPath='evaluation/04_paper/assignment_5_paper_scaffold.md';
const packPath=dir+'paper_figures_and_tables.md',registerPath=dir+'evidence_register.csv';
const inputPath=dir+'raw/STRUCTURE-RUN-01-input.json',manifestPath=dir+'raw/STRUCTURE-RUN-01-manifest.sha256';
const verificationPath=dir+'raw/STRUCTURE-RUN-01-verification.json',helperPath=dir+'raw/check_paper_structure.mjs';
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const hash=p=>sha(fs.readFileSync(path.resolve(root,p)));
function parseCSV(s){const out=[];let row=[],v='',q=false;s=s.replace(/^\uFEFF/,'');
 for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(q&&s[i+1]==='"'){v+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(v);v='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&s[i+1]==='\n')i++;row.push(v);if(row.some(Boolean))out.push(row);row=[];v='';}else v+=c;}
 if(q)throw Error('Unclosed CSV quote');if(v||row.length){row.push(v);out.push(row);}return out;}
const objects=m=>m.slice(1).map(r=>Object.fromEntries(m[0].map((h,i)=>[h,r[i]])));
const csv=m=>m.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
const addPatch=(p,s)=>'*** Add File: '+path.resolve(root,p)+'\n'+s.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';
const replacePatch=(p,before,after)=>'*** Update File: '+path.resolve(root,p)+'\n@@\n'+before.trimEnd().split('\n').map(l=>'-'+l).join('\n')+'\n'+after.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';
const registerBytes=read(registerPath),register=objects(parseCSV(registerBytes));
const pack=read(packPath),doc=read(docPath),previewDir=process.env.STEP25_PREVIEW_DIR;
const placement=[['FIGURE1','2. Figure 1','2.1 Artefact Selection and Evaluation Criteria'],['TABLE1','3. Table 1','2.1 Artefact Selection and Evaluation Criteria'],['TABLE2','4. Table 2','2.6 Triangulation, Refinement, and Conceptual Evaluation Summary'],['TABLE3','5. Table 3','3.1 FURPS Functionality and Usability Criteria'],['TABLE4','6. Table 4','3.7 Design Evaluation Summary'],['FIGURE2','7. Figure 2','3.5 Informed Argument and Scenario'],['TABLE5','9. Table 5','4.2 PIRQOA / RQ Traceability']];
function block(key,prefix){const source=pack.split('## '+prefix+' — ')[1];if(!source)throw Error('Missing source '+prefix);
 const [title,...lines]=source.split('\n');const body=lines.join('\n').split(/^## /m)[0].trim();
 return (key.startsWith('TABLE')?'**'+prefix.replace(/^\d+\. /,'').replace(/Table (\d)/,'Table $1.')+' '+title+'**\n\n':'')+body.replaceAll('](paper_assets/','](../03_results/paper_assets/');}
const expectedHeadings=['Title','Abstract','Keywords','1. Evaluation Context','2. Conceptual Artefact Evaluation','2.1 Artefact Selection and Evaluation Criteria','2.2 GenAI Interview','2.3 Academic Literature Evaluation','2.4 Informed Argument','2.5 Scenario Evaluation','2.6 Triangulation, Refinement, and Conceptual Evaluation Summary','3. Design Artefact Evaluation','3.1 FURPS Functionality and Usability Criteria','3.2 Analytical Evaluation','3.2.1 Static Analysis','3.2.2 Dynamic Analysis','3.2.3 Optimisation / Bounds Analysis','3.3 Simulation','3.4 Black-Box and White-Box Testing','3.5 Informed Argument and Scenario','3.6 Academic Literature Evaluation','3.7 Design Evaluation Summary','4. Results and Interpretation','4.1 Consolidated Results','4.2 PIRQOA / RQ Traceability','4.3 What the Evaluation Does and Does Not Show','5. Conclusion','References'];
const mode=process.argv[2];
if(mode==='--intake-preview'){
 if(register.length!==67||fs.existsSync(path.resolve(root,inputPath)))throw Error('Expected uncaptured 67-entry intake');
 const productionHashes=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json')).productionHashes;
 const intake={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtIntake:execFileSync('git',['status','--short'],{encoding:'utf8'}),registerHash:sha(registerBytes),registerBytes,records:register,productionHashes,immutableHashes:Object.fromEntries([dir+'master_results.csv',dir+'pirqoa_traceability.csv',dir+'results_interpretation.md',packPath].map(p=>[p,hash(p)])),placement,expectedHeadings,scope:'Paper scaffold only; title abstract keywords and prose pending; Step 26 allocation not executed; no new evaluation or release clearance'};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(intake,null,2)+'\n',{flag:'wx'});
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 console.log((await wb.inspect({kind:'region',sheetId:'Evidence',range:'A67:F68',maxChars:1200,tableMaxCellChars:70})).ndjson);
 s.getRange('A67:A68').format.columnWidth=12;s.getRange('B67:B68').format.columnWidth=42;s.getRange('C67:C68').format.columnWidth=55;s.getRange('D67:D68').format.columnWidth=12;s.getRange('E67:F68').format.columnWidth=32;s.getRange('A67:F68').format.wrapText=true;s.getRange('A67:F68').format.rowHeight=60;
 const image=await wb.render({sheetName:'Evidence',range:'A67:F68',scale:1,format:'png'});fs.writeFileSync(path.join(previewDir,'register-before.png'),new Uint8Array(await image.arrayBuffer()));
 console.log(JSON.stringify({registeredEvidence:register.length,productionFiles:Object.keys(productionHashes).length}));
}else if(mode==='--scaffold-patch'){
 let output=doc;for(const [key,prefix] of placement)output=output.replace('<<'+key+'>>',block(key,prefix));
 output=output.replace('<<REFERENCES>>',pack.split('## 11. References used in captions and notes\n')[1].trim());
 if(/<<[A-Z0-9]+>>/.test(output))throw Error('Unexpanded placeholder');
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+replacePatch(docPath,doc,output)+'*** End Patch'}));
}else if(mode==='--manifest-patch'){
 const prior=JSON.parse(read(inputPath)),paths=[docPath,inputPath,helperPath,...prior.records.map(r=>r.path),...Object.keys(prior.productionHashes)];
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(manifestPath,[...new Set(paths)].map(p=>hash(p)+'  '+p).join('\n')+'\n')+'*** End Patch'}));
}else if(mode==='--append-patch'){
 const prior=JSON.parse(read(inputPath));if(registerBytes!==prior.registerBytes)throw Error('Append only once to prior index');
 const specs=[['E073',docPath,'paper_scaffold','Prescribed Step 25 headings evidence-linked drafting placeholders and seven unchanged qualified figure/table insertions; not completed prose'],['E074',manifestPath,'structure_integrity_manifest','Step 25 scaffold and input identities; 67 prior registered files and 66 unchanged B01 production hashes; no new evaluation']];
 const additions=specs.map(([id,p,a,d])=>[id,runId,'Mixed conceptual identities / B01 production / ROOTTESTS-02','EV-REG','Step 25 final assignment structure',a,d,p,'sha256:'+hash(p),'2026-10-03','Codex recorded-evidence structuring under user direction; no new human endorsement','Existing recorded evidence and presentation assets; Artifact Tool index and SHA-256/document checks; no application provider database test participant or literature execution','C1-C5|F1-F13|U1-U9 presentation only with retained limits','REQ-01|REQ-02|REQ-03','RQ1|RQ2|RQ3']);
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');s.getRange('A69:O70').values=additions;wb.recalculate();if(JSON.stringify(s.getRange('A69:O70').values)!==JSON.stringify(additions))throw Error('Engine altered additions');
 const inspection=await wb.inspect({kind:'region',sheetId:'Evidence',range:'A69:I70',maxChars:1500,tableMaxCellChars:80});
 const scan=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},maxChars:1000});
 s.getRange('F69:F70').format.columnWidth=35;s.getRange('G69:G70').format.columnWidth=95;s.getRange('F69:G70').format.wrapText=true;s.getRange('F69:G70').format.rowHeight=65;
 const image=await wb.render({sheetName:'Evidence',range:'F69:G70',scale:1,format:'png'});fs.writeFileSync(path.join(previewDir,'register-after.png'),new Uint8Array(await image.arrayBuffer()));
 console.log(JSON.stringify({inspection:inspection.ndjson,errorScan:scan.ndjson,patch:'*** Begin Patch\n*** Update File: '+path.resolve(root,registerPath)+'\n@@\n '+registerBytes.trimEnd().split('\n').at(-1)+'\n'+csv(s.getRange('A69:O70').values).trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch'}));
}else if(mode==='--verify'){
 const prior=JSON.parse(read(inputPath)),failures=[];const check=(ok,msg)=>{if(!ok)failures.push(msg);};
 const headings=[...doc.matchAll(/^#{2,4} (.+)$/gm)].map(m=>m[1]);check(JSON.stringify(headings)===JSON.stringify(expectedHeadings),'Prescribed headings/order mismatch');
 for(const [key,prefix,section] of placement){const start=doc.indexOf(' '+section+'\n'),end=doc.indexOf('\n##',start);const content=doc.slice(start,end===-1?undefined:end);check(content.includes(block(key,prefix)),'Source block or placement changed '+key);}
 check(!/<<[A-Z0-9]+>>/.test(doc),'Unexpanded source token');
 check(expectedHeadings.filter(h=>/^\d/.test(h)).every(h=>doc.split(' '+h+'\n')[1]?.split(/\n#{2,4} /)[0].includes('[Draft pending')),'Missing prose placeholder');
 for(const h of ['Title','Abstract','Keywords'])check(doc.split('## '+h+'\n')[1]?.split(/\n## /)[0].includes('[Pending'),'Premature frontmatter finalisation '+h);
 check(doc.includes(pack.split('## 11. References used in captions and notes\n')[1].trim()),'Caption reference block changed');
 check(registerBytes.startsWith(prior.registerBytes),'Prior 67 index bytes changed');check(register.length>=69,'Expected at least 69 records');
 for(const r of register)check(hash(r.path)===r.locator_or_hash.slice(7),'Registered hash changed '+r.evidence_id);
 for(const [p,h] of Object.entries(prior.immutableHashes))check(hash(p)===h,'Immutable input changed '+p);
 for(const [p,h] of Object.entries(prior.productionHashes))check(hash(p)===h,'B01 production changed '+p);
 const ids=(s,prefix)=>{const out=new Set();for(const m of s.matchAll(new RegExp('\\b'+prefix+'(\\d{3})(?:[–-](?:'+prefix+')?(\\d{3}))?','g'))){const a=+m[1],b=+(m[2]||m[1]);for(let n=a;n<=b;n++)out.add(prefix+String(n).padStart(3,'0'));}return [...out];};
 const byEvidence=new Set(register.map(r=>r.evidence_id)),byResult=new Set(objects(parseCSV(read(dir+'master_results.csv'))).map(r=>r.result_id));
 for(const id of ids(doc,'E'))check(byEvidence.has(id),'Unknown evidence '+id);for(const id of ids(doc,'R'))check(byResult.has(id),'Unknown result '+id);
 check(byResult.size===225,'Result count changed');check(parseCSV(read(dir+'pirqoa_traceability.csv')).length===25,'PIRQOA count changed');
 for(const line of read(manifestPath).trim().split('\n')){const m=line.match(/^([a-f0-9]{64})  (.+)$/);check(!!m,'Malformed manifest');if(m)check(hash(m[2])===m[1],'Manifest mismatch '+m[2]);}
 for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(m[1]))continue;const [local,anchor]=m[1].split('#'),target=path.resolve(root,path.dirname(p),local);
  const pendingVerification=process.argv.includes('--save')&&target===path.resolve(root,verificationPath);
  check(fs.existsSync(target)||pendingVerification,'Missing link '+p+' '+m[1]);
  if(p===docPath&&anchor&&fs.existsSync(target)&&local.endsWith('.md')){
   const anchors=[...fs.readFileSync(target,'utf8').matchAll(/^#{1,6} (.+)$/gm)].map(h=>h[1].toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu,'').replaceAll(' ','-'));
   check(anchors.includes(anchor),'Missing scaffold source anchor '+m[1]);
  }
 }
 const report={runId,capturedAt:new Date().toISOString(),status:'Scaffold only; prose/frontmatter/word allocation/typesetting pending',prescribedHeadings:headings.length,unchangedPlacementBlocks:placement.length,mainFigures:2,tables:5,prior67RegisterRowsBytePreserved:registerBytes.startsWith(prior.registerBytes),registeredEvidence:register.length,masterResults:225,pirqoaRows:24,citedResultIds:ids(doc,'R').length,citedEvidenceIds:ids(doc,'E').length,productionFiles:Object.keys(prior.productionHashes).length,immutableInputHashes:prior.immutableHashes,scaffoldHash:hash(docPath),manifestHash:hash(manifestPath),registerHash:hash(registerPath),failures};
 if(failures.length)process.exitCode=1;else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,verificationPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake-preview, --scaffold-patch, --manifest-patch, --append-patch or --verify [--save]');
