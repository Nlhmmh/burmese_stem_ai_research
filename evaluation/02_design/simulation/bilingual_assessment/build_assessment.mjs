// Local evidence derivation/checking only. No application, LLM or database execution.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {outputs,source} from './read_outputs.mjs';
const base='evaluation/02_design/simulation/bilingual_assessment/';
const paper='evaluation/04_paper/assignment_5_working_paper.md';
const read=p=>fs.readFileSync(p,'utf8');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const csv=p=>JSON.parse(execFileSync('python3',['-c','import csv,json,sys; print(json.dumps(list(csv.DictReader(open(sys.argv[1],newline="",encoding="utf-8-sig"))),ensure_ascii=False))',p],{encoding:'utf8',maxBuffer:8*1024*1024}));
const inputFile=base+'input.json';
if(process.argv[2]==='--capture'){
 const register=csv('evaluation/03_results/evidence_register.csv');
 const identities=JSON.parse(read('evaluation/04_paper/raw/LANGUAGE-REV-01-input.json'));
 const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 const priorPaper=execFileSync('git',['show',commit+':'+paper],{maxBuffer:2*1024*1024});
 assert.equal(crypto.createHash('sha256').update(priorPaper).digest('hex'),hash(paper),'Prior paper must match committed revision');
 for(const r of register)assert.equal(hash(r.path),r.locator_or_hash.replace('sha256:',''),r.evidence_id);
 const record={assessmentId:'BIL-20261005-01',clientDate:'5 October 2026, Pacific/Auckland',previousPaperCommit:commit,previousPaperHash:hash(paper),originalEvidenceEntries:register.map(r=>({id:r.evidence_id,path:r.path,hash:hash(r.path)})),originalRegisterHash:hash('evaluation/03_results/evidence_register.csv'),masterResultsHash:hash('evaluation/03_results/master_results.csv'),traceabilityHash:hash('evaluation/03_results/pirqoa_traceability.csv'),productionHashes:identities.productionHashes,sourceHashes:Object.fromEntries([source,'evaluation/02_design/simulation/raw/SIM-RUN-01-database-snapshot.json','evaluation/02_design/simulation/raw/SIM-RUN-01-provider.jsonl','evaluation/02_design/simulation/raw/SIM-RUN-01-manifest.sha256','evaluation/02_design/simulation/simulation_results.csv','evaluation/02_design/simulation/human_content_scores.csv','evaluation/02_design/simulation/content_reference_notes.md',base+'method.md'].map(p=>[p,hash(p)]))};
 fs.writeFileSync(inputFile,JSON.stringify(record,null,2)+'\n',{flag:'wx'});console.log('Captured immutable inputs and committed prior-paper identity.');process.exit(0);
}
const notes=JSON.parse(read(base+'annotations.json'));
const findings=notes.findings;
const plain=s=>String(s??'').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
const cell=s=>plain(s).replace(/\|/g,' / ').replace(/;/g,'.');
const table=(id,title,headers,rows)=>`**Table ${id}. ${title}**\n\n| ${headers.join(' | ')} |\n| ${headers.map(()=> '---').join(' | ')} |\n${rows.map(r=>'| '+r.map(cell).join(' | ')+' |').join('\n')}\n`;
const byOutput=o=>findings.filter(f=>f.output===o.id);
const tiers=o=>{const f=byOutput(o);return f.some(f=>f.severity==='Major')?'Major findings':f.some(f=>f.severity==='Minor')?'Minor findings only':f.length?'Shared-content advisories only':'No specific issue identified';};
const scores=csv('evaluation/02_design/simulation/human_content_scores.csv');
const original=o=>{const r=scores.find(r=>r.case_id===o.caseId&&r.output_id===o.outputId);assert.ok(r,`${o.caseId}/${o.outputId} original score`);return r.content_outcome;};
assert.equal(new Set(findings.map(f=>f.id)).size,findings.length);
const normal=s=>plain(s).replace(/[’‘]/g,"'");
for(const f of findings){
 const o=outputs.find(o=>o.id===f.output);assert.ok(o,f.id);
 const p=o.pairs.find(p=>p.field===f.field);assert.ok(p,f.id+' field');
 assert.ok(normal(p.en).includes(normal(f.en)),f.id+' English span');
 assert.ok(normal(p.my).includes(normal(f.my)),f.id+' Burmese span');
 assert.ok(['Major','Minor','Advisory'].includes(f.severity),f.id);
 assert.equal(f.category==='Shared content limitation',f.severity==='Advisory',f.id+' shared distinction');
}
for(const o of outputs){assert.ok(notes.outputNotes[o.id],o.id);original(o);}
const counts=arr=>arr.reduce((a,s)=>(a[s]=(a[s]||0)+1,a),{});
const confirmed=findings.filter(f=>f.severity!=='Advisory');
const summary={sampleOutputs:outputs.length,pairedPassages:outputs.reduce((n,o)=>n+o.pairs.length,0),findings:findings.length,severityCounts:counts(findings.map(f=>f.severity)),categoryCounts:counts(findings.map(f=>f.category)),outputStatusCounts:counts(outputs.map(tiers)),majorAffectedOutputs:outputs.filter(o=>byOutput(o).some(f=>f.severity==='Major')).map(o=>o.caseId+'/'+o.outputId),outputsWithMajorOrMinor:new Set(confirmed.map(f=>f.output)).size,passagesWithMajorOrMinor:new Set(confirmed.map(f=>f.output+'/'+f.field)).size,originalSampleRatings:counts(outputs.map(original)),wholeCorpusRatings:counts(scores.map(r=>r.content_outcome))};
assert.equal(summary.sampleOutputs,32);assert.equal(summary.pairedPassages,104);assert.equal(scores.length,91);
assert.deepEqual(summary.wholeCorpusRatings,{Partial:71,Pass:18,Fail:2});
const coverageRows=outputs.map(o=>[o.id,o.caseId+'/'+o.outputId,o.pairs.length,original(o),tiers(o),notes.outputNotes[o.id]]);
const findingRows=findings.map(f=>{const o=outputs.find(o=>o.id===f.output);return [f.id,o.caseId+'/'+o.outputId+'/'+f.field,f.category,f.severity,f.en,f.my,f.reason+' Proposed revision — '+f.proposal];});
const appendix=`### C.1 Supplementary Focused Bilingual Error Assessment\n\nThe 32 purposefully selected outputs below contain 104 paired passages. The assessment was performed after the original content ratings. Local passage-level severity and original output ratings are different measures. Four Major findings concern three outputs, including a pH output originally rated Partial. Neither that original rating nor the original two Fail outcomes was overwritten. Twenty-seven Minor annotations and ten shared-content advisories were also recorded. These are exploratory annotations without independent qualified bilingual verification. No corpus-wide error rate, weighted MQM score or learning effect is inferred.\n\n`+
table('C5','Supplementary Bilingual Assessment Coverage',['Output','Case / output','Paired passages','Original content rating','Supplementary status','Assessment note'],coverageRows)+'\n'+
table('C6','Supplementary Bilingual Findings and Proposed Revisions',['Finding','Case / output / field','Category','Local severity','English span','Burmese span','Rationale and proposed revision'],findingRows)+'\n'+
table('C7','Supplementary Annotation Totals',['Measure','Count','Scope'],[['Major annotations',4,'Four passages in three selected outputs'],['Minor annotations',27,'Local language/meaning/accessibility concerns'],['Shared-content advisories',10,'Not counted as bilingual translation errors'],['Outputs with Major or Minor annotations',summary.outputsWithMajorOrMinor,'Selected outputs only'],['Paired passages with Major or Minor annotations',summary.passagesWithMajorOrMinor,'Selected passages only'],['Outputs outside this assessment',59,'Not newly assessed or treated as Pass']])+`\n*Note.* Exact saved spans are retained. Proposed wording is editorial, not certified terminology, and was not inserted into application content. Scientific references, local criteria and provenance are recorded with the supplementary assessment. Existing technical cases and ratings in Tables C1–C4 remain unchanged.\n`;
const analysis=`# Supplementary bilingual assessment results\n\nBIL-20261005-01, 5 October 2026, Pacific/Auckland.\n\n## Recorded outcome\n\nThe declared sample of 32 delivered outputs was examined across all 104 paired passages. There are 41 annotations comprising four Major, 27 Minor and ten shared-content Advisory findings. Major/Minor annotations affect ${summary.outputsWithMajorOrMinor} selected outputs and ${summary.passagesWithMajorOrMinor} paired passages. No specific issue was identified in six outputs. Five outputs have shared-content advisories only. These are not new Pass ratings. No missing English/Burmese partner was found in the selected fields. Extracted text was checked against each final stored session.\n\nThe four Major annotations concern gravity mass/weight and mass/group terminology in two passages of SIM04-B initial, the neutral-pH statement in SIM07-B initial and the net-charge negation in SIM08-B initial. The gravity and ion material errors were already recorded. The earlier pH review flagged the phrase as unclear and rated the output Partial. The new local Major severity highlights its potential polarity error and internal conflict with the correct neutral hint. It does not silently regrade that original output.\n\nThe original whole-corpus ratings remain 18 Pass, 71 Partial and two Fail. The selected sample's original ratings are ${JSON.stringify(summary.originalSampleRatings)}. Purposeful selection included prior risk and cannot estimate whole-corpus error prevalence. Major finding counts are not numbers of failed simulations or failed outputs.\n\n## Interpretation\n\nAll three language-help outputs were examined. SIM-LANG-01 and SIM-LANG-02 retain correct quantity-per-second statements, but still use unclear terminology or provide limited explicit Burmese term support. SIM-LANG-03 language help remains speed-like in both languages. Therefore a successful route and bilingual payload do not establish successful terminology remediation. Shared English/Burmese scientific imprecision is separated from target-language distortion.\n\nFour selected outputs contain unexplained third-language word fragments in Burmese passages. English STEM identifiers themselves were not automatically treated as errors. Dense unglossed vocabulary was annotated only where it limits the purpose of the beginner or explicit language-help support. No learner comprehension was measured.\n\nAccurate later ion explanation does not repair the earlier stored ion definition. The sample covers no delivered concept-correction adaptation because the attempted correction outputs were rejected or never reached. No failed provider output was treated as delivered/persisted learner content.\n\n## Method, evidence and limits\n\nSee [method](method.md), [reference consultations](references.md), [complete annotation ledger](annotations.json), [verification](verification.json) and the declared sample extractor. This is model-assisted exploratory annotation, not an independent human assessor study, professional MQM evaluation or certified Burmese glossary. No automatic translation score was calculated. Prior author review applies to the earlier ratings, not this supplementary assessment.\n\nThe original simulation, all earlier content scores, registered evidence and production identities remain preserved. Original technical reports and historical conceptual triangulation are not rewritten. Results feed the dated design-argument and synthesis addenda rather than altering immutable earlier result IDs.\n\n## Output and passage coverage\n\n`+table('BIL1','Coverage register',['Output','Case / output','Paired passages','Original rating','Supplementary status','Assessment note'],coverageRows)+`\n## Annotated findings\n\n`+table('BIL2','Findings',['Finding','Case / output / field','Category','Severity','English span','Burmese span','Rationale and proposed revision'],findingRows);
const mode=process.argv[2];
if(mode==='--analysis-patch')console.log('*** Begin Patch\n*** Add File: '+base+'results.md\n'+analysis.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch');
else if(mode==='--paper-patch')console.log('*** Begin Patch\n*** Update File: '+paper+'\n@@\n-## Appendix D. Black-Box Testing Records\n'+appendix.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n+\n+## Appendix D. Black-Box Testing Records\n*** End Patch');
else if(mode==='--summary')console.log(JSON.stringify(summary,null,2));
else if(mode==='--verify'){
 const input=JSON.parse(read(inputFile));
 for(const r of input.originalEvidenceEntries)assert.equal(hash(r.path),r.hash,r.id);
 for(const [p,h] of Object.entries({...input.sourceHashes,...input.productionHashes}))assert.equal(hash(p),h,p);
 assert.equal(hash('evaluation/03_results/evidence_register.csv'),input.originalRegisterHash);
 assert.equal(hash('evaluation/03_results/master_results.csv'),input.masterResultsHash);
 assert.equal(hash('evaluation/03_results/pirqoa_traceability.csv'),input.traceabilityHash);
 const doc=read(paper);assert.ok(doc.includes(appendix.trim()),'Complete paper appendix');assert.equal(read(base+'results.md'),analysis);
 const old=execFileSync('git',['show',input.previousPaperCommit+':'+paper],{encoding:'utf8',maxBuffer:2*1024*1024});
 const rows=(text,id)=>{const m=text.slice(text.indexOf('**Table '+id+'.')).match(/(?:^|\n)(\|[^\n]+\n(?:\|[^\n]+\n?)+)/);assert.ok(m,id);return m[1].trim();};
 for(const id of [...old.matchAll(/^\*\*Table ([A-I]\d+)\./gm)].map(m=>m[1]))assert.equal(rows(doc,id),rows(old,id),'Old appendix '+id);
 for(const id of [1,2,3,5])assert.equal(rows(doc,id),rows(old,id),'Main table '+id);
 const keywords=s=>s.split('## Keywords\n')[1].split(/^## /m)[0].trim();assert.equal(keywords(doc),keywords(old));assert.equal(keywords(doc).split('\n').filter(l=>l.startsWith('- ')).length,6);
 assert.equal([...doc.matchAll(/^\*\*Table /gm)].length,40);
 const bibliography=doc.split('## References\n')[1].split('## Appendix A.')[0].trim().split(/\n\s*\n/);
 assert.equal(bibliography.length,13,'Bibliography entries');
 assert.equal([...doc.matchAll(/^!\[/gm)].length,2,'Figure references');
 let width=null;for(const l of doc.split('\n')){if(!l.startsWith('|')){width=null;continue;}const n=l.split(/(?<!\\)\|/).length;if(width===null)width=n;else assert.equal(n,width,l.slice(0,80));}
 for(const p of ['evaluation/02_design/informed_argument/traceability_bilingual_addendum.md','evaluation/03_results/bilingual_synthesis_addendum.md','evaluation/03_results/pirqoa_bilingual_addendum.md'])assert.ok(read(p).includes('BIL-20261005-01'),p);
 assert.ok(doc.includes('Freitag et al. (2021)'));assert.ok(doc.includes('independent qualified bilingual'));assert.ok(!/Htet,|researcher-endorsed|Codex|author endorsement/i.test(doc));
 const report={assessmentId:notes.assessmentId,clientDate:notes.date,summary,originalRegisteredEvidencePreserved:input.originalEvidenceEntries.length,productionFilesPreserved:Object.keys(input.productionHashes).length,originalResultsPreserved:225,originalTraceabilityChainsPreserved:24,allSelectedSpansLocated:true,selectedTextMatchesPersistedState:true,selectedPassages:outputs.flatMap(o=>o.pairs.map(p=>({output:o.id,caseId:o.caseId,outputId:o.outputId,field:p.field,annotationIds:findings.filter(f=>f.output===o.id&&f.field===p.field).map(f=>f.id),reviewStatus:'Examined',enHash:crypto.createHash('sha256').update(p.en).digest('hex'),myHash:crypto.createHash('sha256').update(p.my).digest('hex')}))),sourceIdentity:input.sourceHashes,paperHash:hash(paper),currentHashes:Object.fromEntries([base+'method.md',base+'annotations.json',base+'results.md',base+'references.md',base+'read_outputs.mjs',base+'build_assessment.mjs','evaluation/02_design/informed_argument/traceability_bilingual_addendum.md','evaluation/03_results/bilingual_synthesis_addendum.md','evaluation/03_results/pirqoa_bilingual_addendum.md','evaluation/03_results/supplementary_evidence_register.md','evaluation/04_paper/bilingual_assessment_revision.md','evaluation/00_protocol/evaluation_protocol.md','docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md',paper].map(p=>[p,hash(p)])),paperTables:40,appendixTables:35,mainTables:5,keywords:6,bibliographyEntries:13,figures:2,independentHumanReview:false,WordLayoutChecked:false,applicationTestsRerun:false,failures:[]};
 if(process.argv.includes('--save'))fs.writeFileSync(base+'verification.json',JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({...report,selectedPassages:report.selectedPassages.length},null,2));
}else throw Error('Use --capture, --summary, --analysis-patch, --paper-patch or --verify.');
