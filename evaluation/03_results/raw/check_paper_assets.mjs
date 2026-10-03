// Step 24: presentation/provenance checks only. No app/test/provider/database execution.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const runtime='/Users/nlh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node';
const require=createRequire(runtime+'/package.json');
const {Workbook}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const sharp=require('sharp');
const root=execFileSync('git',['rev-parse','--show-toplevel'],{encoding:'utf8'}).trim();
const dir='evaluation/03_results/',runId='PRESENT-20261003-PAPER-01';
const registerPath=dir+'evidence_register.csv',docPath=dir+'paper_figures_and_tables.md';
const inputPath=dir+'raw/PAPER-RUN-01-input.json',manifestPath=dir+'raw/PAPER-RUN-01-manifest.sha256';
const verificationPath=dir+'raw/PAPER-RUN-01-verification.json',helperPath=dir+'raw/check_paper_assets.mjs';
const figure1=dir+'paper_assets/figure_1_framework.png',figure2=dir+'paper_assets/figure_2_photosynthesis_flow.svg';
const figure2PNG=dir+'paper_assets/figure_2_photosynthesis_flow.png';
const sourcePDF='docs/INFOSYS_720_Assignment_3.pdf';
const immutablePaths=[dir+'master_results.csv',dir+'pirqoa_traceability.csv',dir+'results_interpretation.md'];
const previewDir=process.env.STEP24_PREVIEW_DIR;
const read=p=>fs.readFileSync(path.resolve(root,p),'utf8');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const hash=p=>sha(fs.readFileSync(path.resolve(root,p)));
function parseCSV(s){const out=[];let row=[],v='',q=false;s=s.replace(/^\uFEFF/,'');
 for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(q&&s[i+1]==='"'){v+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(v);v='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&s[i+1]==='\n')i++;row.push(v);if(row.some(Boolean))out.push(row);row=[];v='';}else v+=c;}
 if(q)throw Error('Unclosed CSV quote');if(v||row.length){row.push(v);out.push(row);}return out;}
const objects=m=>m.slice(1).map(r=>Object.fromEntries(m[0].map((h,i)=>[h,r[i]])));
const csv=m=>m.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
const addPatch=(p,s)=>'*** Add File: '+path.resolve(root,p)+'\n'+s.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n';
const registerBytes=read(registerPath),register=objects(parseCSV(registerBytes));
const results=objects(parseCSV(read(immutablePaths[0]))),byResult=new Map(results.map(r=>[r.result_id,r]));
const byEvidence=new Map(register.map(r=>[r.evidence_id,r]));
function ids(s,prefix){const out=new Set();for(const m of s.matchAll(new RegExp('\\b'+prefix+'(\\d{3})(?:[–-](?:'+prefix+')?(\\d{3}))?','g'))){const a=Number(m[1]),b=Number(m[2]||m[1]);if(b<a||b-a>500)throw Error('Invalid range '+m[0]);for(let n=a;n<=b;n++)out.add(prefix+String(n).padStart(3,'0'));}return [...out];}
function tables(doc){return [1,2,3,4,5].map(n=>{
 const section=doc.split(new RegExp('^## \\d+\\. Table '+n+' — .*$', 'm'))[1]?.split(/^## /m)[0];if(!section)throw Error('Missing Table '+n);
 return section.split('\n').filter(l=>l.startsWith('|')).map(l=>l.slice(1,l.lastIndexOf('|')).split('|').map(v=>v.trim())).filter(r=>!r.every(v=>/^[-: ]+$/.test(v)));});}
const mode=process.argv[2];
if(mode==='--intake-preview'){
 if(register.length!==63||fs.existsSync(path.resolve(root,inputPath)))throw Error('Expected uncaptured 63-row intake');
 const productionHashes=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json')).productionHashes;
 const intake={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtIntake:execFileSync('git',['status','--short'],{encoding:'utf8'}),registerHash:sha(registerBytes),registerBytes,records:register,immutableHashes:Object.fromEntries(immutablePaths.map(p=>[p,hash(p)])),productionHashes,figure1:{source:sourcePDF,sourceHash:hash(sourcePDF),pdfPage:7,sourceFigure:'Figure 3 / Artefact 3',command:'pdftoppm -f 7 -l 7 -r 300 -singlefile -x 205 -y 1200 -W 1250 -H 870 -png docs/INFOSYS_720_Assignment_3.pdf evaluation/03_results/paper_assets/figure_1_framework',derivation:'PDF rendering/crop only; original diagram unchanged',dimensions:[1250,870],visualInspection:'Page 7 and final crop inspected; all seven nodes, arrows and relationship labels visible; initial narrow crop corrected before indexing'},figure2:{sourceRun:'RUN-B01-20261003-SCENARIO-02',sourceEvidence:['E042','E043','E044'],sourceResult:'R206',sourceStates:['HTTP 3','HTTP 5','HTTP 6','HTTP 7','HTTP 8','HTTP 10','HTTP 11','HTTP 12–16','HTTP 17','HTTP 18'],apiOnly:['HTTP 7 capped request','HTTP 8 High/fade','HTTP 17 completed rejection'],dimensions:[1280,990],visualInspection:'Final SVG-rendered PNG inspected; text and arrows visible; API-only checks distinguished; final HTTP 18 retrieval placed after HTTP 17'},tableRows:[5,5,22,10,3],optionalTimingFigure:'Omitted: descriptive local sample; original timings unchanged',publicationBoundary:'No clearance for restricted original captures; final paper typesetting not performed'};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(intake,null,2)+'\n',{flag:'wx'});
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 console.log((await wb.inspect({kind:'region',sheetId:'Evidence',range:'A63:F64',maxChars:1300,tableMaxCellChars:75})).ndjson);
 s.getRange('A63:A64').format.columnWidth=12;s.getRange('B63:B64').format.columnWidth=42;
 s.getRange('C63:C64').format.columnWidth=55;s.getRange('D63:D64').format.columnWidth=12;
 s.getRange('E63:F64').format.columnWidth=32;s.getRange('A63:F64').format.wrapText=true;s.getRange('A63:F64').format.rowHeight=60;
 const blob=await wb.render({sheetName:'Evidence',range:'A63:F64',scale:1,format:'png'});
 fs.writeFileSync(path.join(previewDir,'register-before.png'),new Uint8Array(await blob.arrayBuffer()));
 console.log(JSON.stringify({intakeRows:register.length,masterResults:results.length,productionFiles:Object.keys(productionHashes).length}));
}else if(mode==='--table-previews'){
 const data=tables(read(docPath));
 for(let i=0;i<data.length;i++){
  const wb=Workbook.create(),s=wb.worksheets.add('Table');const rows=data[i],cols=rows[0].length;
  const region=s.getRangeByIndexes(0,0,rows.length,cols);region.values=rows;
  region.format.font={name:'Arial',size:10};region.format.wrapText=true;region.format.verticalAlignment='top';
  for(let c=0;c<cols;c++)s.getRangeByIndexes(0,c,rows.length,1).format.columnWidth=[i===4?40:35,60,75,40,70,55][c]||55;
  region.format.autofitRows();s.getRangeByIndexes(0,0,1,cols).format.font={name:'Arial',size:10,bold:true};
  wb.recalculate();const image=await wb.render({sheetName:'Table',range:s.getUsedRange().address,scale:1,format:'png'});
  fs.writeFileSync(path.join(previewDir,'table-'+(i+1)+'.png'),new Uint8Array(await image.arrayBuffer()));
  console.log(JSON.stringify({table:i+1,dataRows:rows.length-1,columns:cols}));
 }
}else if(mode==='--manifest-patch'){
 const prior=JSON.parse(read(inputPath));const paths=[docPath,figure1,figure2,figure2PNG,sourcePDF,inputPath,helperPath,...prior.records.map(r=>r.path),...Object.keys(prior.productionHashes)];
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(manifestPath,[...new Set(paths)].map(p=>hash(p)+'  '+p).join('\n')+'\n')+'*** End Patch'}));
}else if(mode==='--append-patch'){
 const prior=JSON.parse(read(inputPath));if(registerBytes!==prior.registerBytes)throw Error('Append only once to original index');
 const specs=[['E069',docPath,'paper_figures_and_tables','Five paper tables and two figures with captions placement native outcomes scholarly warrants and traceable qualified RQ chains'],['E070',figure1,'framework_figure_extract','Unchanged Assignment 3 Artefact 3 Figure 3 diagram extracted from PDF page 7; refined A5 semantics explained separately in caption'],['E071',figure2,'scenario_flow_figure','Editable reconstruction of recorded Photosynthesis browser workflow and separately labelled cap fade and completed-response API checks'],['E072',manifestPath,'presentation_manifest','Step 24 figures tables source PDF and input/output identities; 63 prior evidence files and 66 unchanged B01 production hashes']];
 const additions=specs.map(([id,p,a,d])=>[id,runId,'Mixed conceptual identities / B01 production / ROOTTESTS-02','EV-REG','Step 24 paper figures and tables',a,d,p,'sha256:'+hash(p),'2026-10-03','Codex recorded-evidence presentation under user direction; no new human endorsement','Existing PDF figure extraction SVG rendering Artifact Tool index and SHA-256 checks; no app provider database test participant or fresh literature execution','C1-C5|F1-F13|U1-U9 presentation with retained limits','REQ-01|REQ-02|REQ-03','RQ1|RQ2|RQ3']);
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 s.getRange('A65:O68').values=additions;wb.recalculate();if(JSON.stringify(s.getRange('A65:O68').values)!==JSON.stringify(additions))throw Error('Engine altered additions');
 const inspection=await wb.inspect({kind:'region',sheetId:'Evidence',range:'A65:I68',maxChars:1800,tableMaxCellChars:90});
 const scan=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},maxChars:1200});
 s.getRange('F65:F68').format.columnWidth=35;s.getRange('G65:G68').format.columnWidth=95;s.getRange('F65:G68').format.wrapText=true;s.getRange('F65:G68').format.rowHeight=65;
 const image=await wb.render({sheetName:'Evidence',range:'F65:G68',scale:1,format:'png'});fs.writeFileSync(path.join(previewDir,'register-after.png'),new Uint8Array(await image.arrayBuffer()));
 const last=registerBytes.trimEnd().split('\n').at(-1);console.log(JSON.stringify({inspection:inspection.ndjson,errorScan:scan.ndjson,patch:'*** Begin Patch\n*** Update File: '+path.resolve(root,registerPath)+'\n@@\n '+last+'\n'+csv(s.getRange('A65:O68').values).trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch'}));
}else if(mode==='--verify'){
 const prior=JSON.parse(read(inputPath)),doc=read(docPath),svg=read(figure2),failures=[];const check=(ok,msg)=>{if(!ok)failures.push(msg);};
 check(registerBytes.startsWith(prior.registerBytes),'Original 63 register bytes changed');check(register.length>=67,'Expected at least 67 entries');
 check(results.length===225&&byResult.size===225,'Master IDs/count changed');check(parseCSV(read(immutablePaths[1])).length===25,'PIRQOA row count changed');
 for(const [p,h] of Object.entries(prior.immutableHashes))check(hash(p)===h,'Immutable input changed '+p);
 for(const r of register)check(hash(r.path)===r.locator_or_hash.slice(7),'Registered hash changed '+r.evidence_id);
 for(const [p,h] of Object.entries(prior.productionHashes))check(hash(p)===h,'B01 production changed '+p);
 check(hash(sourcePDF)===prior.figure1.sourceHash,'Original Assignment 3 PDF changed');
 const data=tables(doc),counts=data.map(t=>t.length-1);check(JSON.stringify(counts)===JSON.stringify(prior.tableRows),'Table data row counts changed');
 check(JSON.stringify(data[0][0])===JSON.stringify(['Criterion','Method','Evidence','RQ mapping']),'Table 1 schema');
 check(data[2].slice(1).map(r=>r[0].match(/^[FU]\d+/)?.[0]).join(',')===[...Array.from({length:13},(_,i)=>'F'+(i+1)),...Array.from({length:9},(_,i)=>'U'+(i+1))].join(','),'F/U criterion coverage');
 const retired=new Set(['E028','E029','E030','E031','E032']);
 const citedResults=ids(doc,'R'),citedEvidence=ids(doc,'E');
 for(const id of citedResults)check(byResult.has(id),'Unknown R ID '+id);
 for(const id of citedEvidence)check(byEvidence.has(id)||retired.has(id),'Unknown E ID '+id);
 for(const i of [1,3])for(const row of data[i].slice(1)){const text=row.join(' '),rids=ids(text,'R');const allowed=new Set(rids.flatMap(id=>byResult.get(id)?.evidence_ids.split('|')||[]));for(const id of ids(text,'E').filter(id=>id!=='E067'))check(allowed.has(id),'Table '+(i+1)+' source not linked to selected R IDs '+id);}
 const mapping=objects(parseCSV(read(immutablePaths[1])));
 for(const [i,row] of data[4].slice(1).entries()){
  const req='REQ-0'+(i+1),rq='RQ'+(i+1),text=row.join(' ');check(row[1].includes(req)&&row[1].includes(rq),'Table 5 identity mismatch');
  const permitted=new Set(mapping.filter(r=>r.requirement_id===req).flatMap(r=>r.result_ids.split('|')));
  for(const id of ids(text,'R'))check(permitted.has(id),'Table 5 result not in its REQ chain '+req+' '+id);
  check(row[4].startsWith('Partially supported overall:'),'RQ outcome promotion '+rq);
 }
 for(const token of ['SIM05-C','SIM-CM-13/16','BB22','BB07/08','52.825','Skipped','Not assessed','provisional','self-report','API-only','omitted'])check(doc.toLowerCase().includes(token.toLowerCase()),'Missing qualification '+token);
 check(!fs.existsSync(path.resolve(root,dir+'paper_assets/figure_3_timing.svg')),'Unexpected timing figure');
 check(svg.includes('API-only: cap then High/fade')&&svg.includes('API-only: completed response rejected'),'API boundary figure labels missing');
 check(svg.includes('round 2 → 2')&&svg.includes('not completed')&&svg.includes('HTTP 18'),'Scenario state/sequence limits missing');
 for(const [p,expected] of [[figure1,prior.figure1.dimensions],[figure2PNG,prior.figure2.dimensions]]){const m=await sharp(path.resolve(root,p)).metadata();check(JSON.stringify([m.width,m.height])===JSON.stringify(expected),'Figure dimension mismatch '+p);}
 const regenerated=await sharp(path.resolve(root,figure2)).png().toBuffer();check(sha(regenerated)===hash(figure2PNG),'SVG/PNG render mismatch');
 for(const line of read(manifestPath).trim().split('\n')){const m=line.match(/^([a-f0-9]{64})  (.+)$/);check(!!m,'Malformed manifest');if(m)check(hash(m[2])===m[1],'Manifest mismatch '+m[2]);}
 for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,verificationPath)),'Missing local link '+p+' '+m[1]);}
 const report={runId,capturedAt:new Date().toISOString(),tables:5,tableDataRows:counts,mainFigures:2,optionalTimingFigure:'Omitted with reason',originalFigureSourceUnchanged:true,scenarioSVGPNGMatch:sha(regenerated)===hash(figure2PNG),citedResults:citedResults.length,citedEvidence:citedEvidence.length,prior63RowsBytePreserved:registerBytes.startsWith(prior.registerBytes),registeredEvidence:register.length,masterResults:results.length,pirqoaRows:24,immutableInputHashes:prior.immutableHashes,productionFiles:Object.keys(prior.productionHashes).length,documentHash:hash(docPath),registerHash:hash(registerPath),manifestHash:hash(manifestPath),failures};
 if(failures.length)process.exitCode=1;else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,verificationPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake-preview, --table-previews, --manifest-patch, --append-patch or --verify [--save]');
