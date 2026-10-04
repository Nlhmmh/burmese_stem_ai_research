// Read-only extraction of the predeclared sample. No model or application execution.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source='evaluation/02_design/simulation/raw/SIM-RUN-01-results.jsonl';
const cases=fs.readFileSync(source,'utf8').trim().split('\n').map(JSON.parse);
const selection=[];
for(const n of [...Array.from({length:13},(_,i)=>i+1),16])selection.push([`SIM${String(n).padStart(2,'0')}-B`,'initial']);
for(const n of [1,2,3])for(const out of ['initial','language'])selection.push([`SIM-LANG-0${n}`,out]);
for(const n of [1,4,8,13,16])selection.push([`SIM${String(n).padStart(2,'0')}-C`,'conceptual']);
for(const n of [4,8,12])selection.push([`SIM${String(n).padStart(2,'0')}-C`,'simpler']);
for(const n of [4,8,13])selection.push([`SIM${String(n).padStart(2,'0')}-B`,'medium_skip']);
selection.push(['SIM01-A','initial']);
assert.equal(selection.length,32);
const outputs=selection.map(([id,out],i)=>{
 const c=cases.find(c=>c.id===id),s=c.steps.find(s=>s.step===out);
 assert.ok(s?.httpStatus===200||s?.httpStatus===201,`${id}/${out}`);
 const body=s.response.session??s.response.adaptation;
 assert.ok(body,`${id}/${out}`);
 const fields=out==='initial'?Object.entries(body.explanations).map(([k,v])=>['explanations.'+k,v]).concat([['reflectivePrompt',body.reflectivePrompt],['hint',body.hint]]):Object.entries(body).filter(([k,v])=>v&&typeof v==='object'&&('en' in v||'my' in v));
 assert.ok(fields.length,`${id}/${out}`);
 const saved=c.finalStoredState[0];assert.ok(saved,`${id} saved session`);
 const savedBody=out==='initial'?saved:saved.adaptations.find(a=>a.round===body.round);
 assert.ok(savedBody,`${id}/${out} saved adaptation`);
 const pairs=fields.map(([field,text])=>{
  assert.equal(typeof text.en,'string',`${id}/${out}/${field} English`);
  assert.equal(typeof text.my,'string',`${id}/${out}/${field} Burmese`);
  const stored=field.split('.').reduce((v,k)=>v[k],savedBody);
  assert.deepEqual(text,stored,`${id}/${out}/${field} persisted text`);
  return {field,...text};
 });
 return {id:`BIL-O${String(i+1).padStart(2,'0')}`,caseId:id,outputId:out,question:c.question,concept:c.steps.find(s=>s.step==='initial').response.session?.concept,pairs};
});
if(process.argv[1]?.endsWith('/read_outputs.mjs')){
 if(process.argv[2]==='--inventory')console.log(JSON.stringify({outputs:outputs.length,passages:outputs.reduce((a,o)=>a+o.pairs.length,0),items:outputs.map(o=>({id:o.id,caseId:o.caseId,outputId:o.outputId,fields:o.pairs.map(p=>p.field)}))},null,2));
 else{const start=Number(process.argv[2]??0),end=Number(process.argv[3]??outputs.length);for(const o of outputs.slice(start,end)){console.log(`\n${o.id} ${o.caseId}/${o.outputId} ${o.question}`);for(const p of o.pairs)console.log(p.field+'\nEN '+p.en+'\nMY '+p.my);}}
}
export {outputs,source};
