// Step 23: recorded-evidence interpretation/index checks, never app/test/LLM/DB execution.
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
const dir='evaluation/03_results/',runId='INTERPRET-20261003-RESULTS-01';
const registerPath=dir+'evidence_register.csv',docPath=dir+'results_interpretation.md';
const inputPath=dir+'raw/INTERPRET-RUN-01-input.json',manifestPath=dir+'raw/INTERPRET-RUN-01-manifest.sha256';
const verificationPath=dir+'raw/INTERPRET-RUN-01-verification.json';
const helperPath=dir+'raw/check_results_interpretation.mjs';
const immutablePaths=[dir+'master_results.csv',dir+'pirqoa_traceability.csv'];
const previewDir=process.env.STEP23_PREVIEW_DIR;
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
const mode=process.argv[2];
if(mode==='--intake-preview'){
 if(register.length!==61||fs.existsSync(path.resolve(root,inputPath)))throw Error('Expected uncaptured 61-row intake');
 const productionHashes=JSON.parse(read('evaluation/02_design/scenario/raw/RUN-B01-20261003-SCENARIO-02/metadata.json')).productionHashes;
 const intake={runId,capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTreeAtIntake:execFileSync('git',['status','--short'],{encoding:'utf8'}),registerHash:sha(registerBytes),registerBytes,records:register,immutableHashes:Object.fromEntries(immutablePaths.map(p=>[p,hash(p)])),productionHashes};
 fs.writeFileSync(path.resolve(root,inputPath),JSON.stringify(intake,null,2)+'\n',{flag:'wx'});
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 console.log((await wb.inspect({kind:'region',sheetId:'Evidence',range:'A59:F62',maxChars:2000,tableMaxCellChars:70})).ndjson);
 // CSV has no saved formatting; this is a disposable view of existing index cells.
 s.getRange('A59:A62').format.columnWidth=12;s.getRange('B59:B62').format.columnWidth=36;
 s.getRange('C59:C62').format.columnWidth=55;s.getRange('D59:D62').format.columnWidth=13;
 s.getRange('E59:E62').format.columnWidth=32;s.getRange('F59:F62').format.columnWidth=38;
 s.getRange('A59:F62').format.wrapText=true;s.getRange('A59:F62').format.rowHeight=50;
 const blob=await wb.render({sheetName:'Evidence',range:'A59:F62',scale:1,format:'png'});
 if(!previewDir)throw Error('Set STEP23_PREVIEW_DIR');
 fs.writeFileSync(path.join(previewDir,'register-before.png'),new Uint8Array(await blob.arrayBuffer()));
 console.log(JSON.stringify({intakeRows:register.length,masterResults:results.length,productionFiles:Object.keys(productionHashes).length}));
}else if(mode==='--manifest-patch'){
 const prior=JSON.parse(read(inputPath));
 const paths=[docPath,inputPath,helperPath,...prior.records.map(r=>r.path),...Object.keys(prior.productionHashes)];
 console.log(JSON.stringify({patch:'*** Begin Patch\n'+addPatch(manifestPath,[...new Set(paths)].map(p=>hash(p)+'  '+p).join('\n')+'\n')+'*** End Patch'}));
}else if(mode==='--append-patch'){
 const prior=JSON.parse(read(inputPath));if(registerBytes!==prior.registerBytes)throw Error('Append only once to original index');
 const specs=[['E067',docPath,'results_interpretation','Four-category interpretation of 17 scoped claims; convergence failures native scales qualified RQ answers and reused scholarly warrants'],['E068',manifestPath,'interpretation_manifest','Step 23 inputs and output identities; 61 prior evidence files immutable results/PIRQOA and 66 unchanged B01 production hashes']];
 const additions=specs.map(([id,p,a,d])=>[id,runId,'Mixed conceptual identities / B01 production / ROOTTESTS-02','EV-REG','Step 23 interpretation',a,d,p,'sha256:'+hash(p),'2026-10-03','Codex recorded-evidence interpretation under user direction; no new human endorsement','Artifact Tool CSV and SHA-256 checks; no application provider database test participant or new literature execution','C1-C5|F1-F13|U1-U9 claim categories with retained limits','REQ-01|REQ-02|REQ-03','RQ1|RQ2|RQ3']);
 const wb=await Workbook.fromCSV(registerBytes,{sheetName:'Evidence'}),s=wb.worksheets.getItem('Evidence');
 s.getRange('A63:O64').values=additions;wb.recalculate();
 if(JSON.stringify(s.getRange('A63:O64').values)!==JSON.stringify(additions))throw Error('Engine altered additions');
 const inspection=await wb.inspect({kind:'region',sheetId:'Evidence',range:'A63:I64',maxChars:1800,tableMaxCellChars:90});
 const scan=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},maxChars:1200});
 s.getRange('A63:A64').format.columnWidth=12;s.getRange('B63:B64').format.columnWidth=39;
 s.getRange('F63:F64').format.columnWidth=32;s.getRange('G63:G64').format.columnWidth=85;
 s.getRange('A63:G64').format.wrapText=true;s.getRange('A63:G64').format.rowHeight=75;
 const blob=await wb.render({sheetName:'Evidence',range:'F63:G64',scale:1,format:'png'});
 fs.writeFileSync(path.join(previewDir,'register-after.png'),new Uint8Array(await blob.arrayBuffer()));
 // Serialize only engine-authored new rows; preserve every original byte/date literal.
 const last=registerBytes.trimEnd().split('\n').at(-1);
 console.log(JSON.stringify({inspection:inspection.ndjson,errorScan:scan.ndjson,patch:'*** Begin Patch\n*** Update File: '+path.resolve(root,registerPath)+'\n@@\n '+last+'\n'+csv(s.getRange('A63:O64').values).trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch'}));
}else if(mode==='--verify'){
 const prior=JSON.parse(read(inputPath)),doc=read(docPath),failures=[];
 const check=(ok,msg)=>{if(!ok)failures.push(msg);};
 check(registerBytes.startsWith(prior.registerBytes),'Original 61 register bytes changed');
 check(register.length>=63,'Expected at least 63 registered entries');
 check(results.length===225&&byResult.size===225,'Master result IDs/count changed');
 check(parseCSV(read(immutablePaths[1])).length===25,'Expected 24 PIRQOA data rows');
 for(const [p,h] of Object.entries(prior.immutableHashes))check(hash(p)===h,'Immutable input changed '+p);
 for(const r of register)check(hash(r.path)===r.locator_or_hash.slice(7),'Registered evidence changed '+r.evidence_id);
 for(const [p,h] of Object.entries(prior.productionHashes))check(hash(p)===h,'B01 production changed '+p);
 const sections=['2. Strong bounded mechanical evidence','3. Partial evidence','4. Conceptual support and scholarly warrant','5. Unsupported claims'];
 for(const title of sections)check(doc.includes('## '+title),'Missing category '+title);
 const claims=doc.split('\n').filter(l=>/^\| INT-\d{2}\b/.test(l));
 const claimIds=claims.map(l=>l.match(/^\| (INT-\d{2})/)[1]);
 check(claims.length===17&&new Set(claimIds).size===17,'Expected 17 unique linked claims');
 for(let i=1;i<=17;i++)check(claimIds.includes('INT-'+String(i).padStart(2,'0')),'Missing interpretation label '+i);
 for(const line of claims){const rids=[...new Set(line.match(/\bR\d{3}\b/g)||[])],eids=[...new Set(line.match(/\bE\d{3}\b/g)||[])];
  check(rids.length>0&&eids.length>0,'Claim lacks existing R/E provenance '+line.slice(0,25));
  const allowed=new Set(rids.flatMap(id=>byResult.get(id)?.evidence_ids.split('|')||[]));
  for(const id of eids)check(allowed.has(id),'Claim evidence not in its selected result provenance '+id+' '+line.slice(0,25));
 }
 const retired=new Set(['E028','E029','E030','E031','E032']);
 const citedResults=[...new Set(doc.match(/\bR\d{3}\b/g)||[])],citedEvidence=[...new Set(doc.match(/\bE\d{3}\b/g)||[])];
 for(const id of citedResults)check(byResult.has(id),'Unknown result '+id);
 for(const id of citedEvidence)check(byEvidence.has(id)||retired.has(id),'Unknown evidence '+id);
 for(const req of ['REQ-01','REQ-02','REQ-03'])check(doc.includes(req),'Missing '+req);
 for(const rq of ['RQ1','RQ2','RQ3'])check(doc.includes(rq),'Missing '+rq);
 for(const token of ['SIM04-B','SIM08-B','SIM05-C','SIM-CM-13/16','BB22','BB07/08','52.825','Not assessed','Skipped','Not applicable','provisional','self-report','Restricted'])check(doc.toLowerCase().includes(token.toLowerCase()),'Missing material qualification '+token);
 const nativeF=results.filter(r=>/^FURPS aggregate F\d+$/.test(r.artefact));
 check(nativeF.length===13&&nativeF.every(r=>r.outcome==='Partial'),'F aggregate changed');
 const nativeU=results.filter(r=>/^FURPS aggregate U\d+$/.test(r.artefact));
 check(nativeU.filter(r=>r.outcome==='Pass').length===6&&nativeU.filter(r=>r.outcome==='Partial').length===3,'U aggregate changed');
 for(const line of read(manifestPath).trim().split('\n')){const m=line.match(/^([a-f0-9]{64})  (.+)$/);check(!!m,'Malformed manifest');if(m)check(hash(m[2])===m[1],'Manifest mismatch '+m[2]);}
 for(const p of [docPath,'docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/00_protocol/evaluation_protocol.md'])for(const m of read(p).matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/.test(m[1]))continue;
  const target=path.resolve(root,path.dirname(p),m[1].split('#')[0]);
  check(fs.existsSync(target)||(process.argv.includes('--save')&&target===path.resolve(root,verificationPath)),'Missing local link '+p+' '+m[1]);
 }
 const categoryCounts={strong:6,partial:4,conceptual:3,unsupported:4};
 const report={runId,capturedAt:new Date().toISOString(),interpretationClaims:claims.length,categoryCounts,citedResults:citedResults.length,citedEvidence:citedEvidence.length,prior61RowsBytePreserved:registerBytes.startsWith(prior.registerBytes),registeredEvidence:register.length,masterResults:results.length,pirqoaRows:24,immutableInputHashes:prior.immutableHashes,productionFiles:Object.keys(prior.productionHashes).length,documentHash:hash(docPath),registerHash:hash(registerPath),manifestHash:hash(manifestPath),failures};
 if(failures.length)process.exitCode=1;
 else if(process.argv.includes('--save'))fs.writeFileSync(path.resolve(root,verificationPath),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --intake-preview, --manifest-patch, --append-patch or --verify [--save]');
