// Explicit post-observation addendum. Does not replace the first frozen results.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { isDeepStrictEqual } from 'node:util';
const raw = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261002-BLACKBOX-01');
const meta = JSON.parse(fs.readFileSync(path.join(run,'metadata.json'),'utf8'));
const req = createRequire(path.join(root,'burmese_stem_ai/package.json'));
const mongoose = req('mongoose');
const output = path.join(run,'public_boundary_addendum.jsonl');
if(fs.existsSync(output)) throw new Error('Refusing to replace addendum');
const records=[];
const norm = value=>JSON.parse(JSON.stringify(value));
const snap = async()=>norm(await mongoose.connection.db.collection('sessions').find({}).sort({sessionId:1}).toArray());
const calls = ()=>fs.readFileSync(path.join(run,'provider.jsonl'),'utf8').trim().split('\n').length;
async function invoke(id,owner,endpoint,method='GET',body,extra={}){
 const before=await snap(),count=calls();const response=await fetch(meta.url+endpoint,{method,headers:{...(owner?{cookie:'learnerId='+owner}:{}),...(body?{'content-type':'application/json'}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});
 const data=await response.json();const r={id,at:new Date().toISOString(),endpoint,method,owner:owner??null,request:body??null,extraHeaders:extra,status:response.status,response:data,responseHeaders:Object.fromEntries(response.headers),before,after:await snap(),providerCalls:calls()-count,checks:[]};records.push(r);return r;
}
function check(r,name,pass){r.checks.push({name,pass:!!pass});}
try{
 await mongoose.connect(meta.dbUrl);
 const seeds=JSON.parse(fs.readFileSync(path.join(run,'ui_seeds.json'),'utf8'));
 for(const [suffix,method,body] of [['','GET',null],['/respond','POST',{overallSupportNeed:'medium'}],['/followup','POST',{question:'Why sunlight?'}],['','PATCH',{status:'completed'}]]){
  const r=await invoke('BB22-public-no-cookie-'+method+suffix,null,`/api/sessions/${seeds.initial}${suffix}`,method,body,{'x-learner-id':meta.owners.A});
  check(r,'No-cookie forged identity cannot read or mutate owner A',r.status===404&&r.response.error?.code==='SESSION_NOT_FOUND'&&isDeepStrictEqual(r.before,r.after)&&r.providerCalls===0&&/learnerId=/.test(r.responseHeaders['set-cookie']??''));
 }
 const bad=await invoke('BB22-invalid-cookie',null,`/api/sessions/${seeds.initial}`,'GET',null,{cookie:'learnerId=invalid','x-learner-id':meta.owners.A});
 check(bad,'Invalid cookie is replaced; forged header not trusted',bad.status===404&&/learnerId=/.test(bad.responseHeaders['set-cookie']??'')&&isDeepStrictEqual(bad.before,bad.after));
 fs.writeFileSync(path.join(run,'control.json'),JSON.stringify({mode:'ready',label:'BB08-addendum'},null,2)+'\n');
 const initial=await invoke('BB08-addendum-create',meta.owners.A,'/api/sessions','POST',{question:'What is a cell?'});
 check(initial,'Isolated correction setup ready',initial.status===201);
 const id=initial.response.session.sessionId;
 fs.writeFileSync(path.join(run,'control.json'),JSON.stringify({mode:'ambiguous_correction',label:'BB08-addendum-ambiguity'},null,2)+'\n');
 const ambiguous=await invoke('BB08-addendum-ambiguity',meta.owners.A,`/api/sessions/${id}/respond`,'POST',{overallSupportNeed:'medium',difficultyType:'concept_mismatch',conceptClarification:'I mean some cell'});
 check(ambiguous,'Observed bounded clarification persists as one adaptation',ambiguous.status===200&&ambiguous.response.correctionOutcome==='ambiguous'&&ambiguous.response.adaptationRound===1&&ambiguous.response.adaptation?.supportType==='concept_correction'&&ambiguous.response.responseEvent.roundAfter===1&&ambiguous.providerCalls===1);
 check(ambiguous,'Ambiguity leaves active interpretation unchanged',ambiguous.response.responseEvent.conceptReinterpretation.previous.name==='cell'&&ambiguous.response.concept.name==='cell');
 fs.writeFileSync(path.join(run,'control.json'),JSON.stringify({mode:'ready',label:'BB08-addendum-correction'},null,2)+'\n');
 const corrected=await invoke('BB08-addendum-corrected',meta.owners.A,`/api/sessions/${id}/respond`,'POST',{overallSupportNeed:'medium',difficultyType:'concept_mismatch',conceptClarification:'I mean a battery cell'});
 check(corrected,'Subsequent correction consumes final round within same session',corrected.status===200&&corrected.response.correctionOutcome==='corrected'&&corrected.response.adaptationRound===2&&corrected.response.concept.name==='electrochemical cell');
 const follow=await invoke('BB12-corrected-context',meta.owners.A,`/api/sessions/${id}/followup`,'POST',{question:'How does this battery cell provide electrical energy?'});
 const provider=fs.readFileSync(path.join(run,'provider.jsonl'),'utf8').trim().split('\n').map(JSON.parse).at(-1);
 check(follow,'Provider receives corrected active context and latest correction scaffold/route',follow.status===200&&provider.schema==='scoped_learning_follow_up'&&provider.input.activeConcept.name==='electrochemical cell'&&provider.input.latestRelevantScaffold.supportType==='concept_correction'&&provider.input.latestResponseRoute==='context_reinterpretation');
 check(follow,'Follow-up does not change Stage7 event/adaptation counts or rounds',follow.after.find(s=>s.sessionId===id).adaptationRound===2&&follow.after.find(s=>s.sessionId===id).responseEvents.length===2&&follow.after.find(s=>s.sessionId===id).adaptations.length===2);
 // The follow-up answer fixture is deliberately not scientifically assessed.
 for(const r of records)fs.appendFileSync(output,JSON.stringify(r)+'\n');
 console.log(JSON.stringify({attempts:records.length,assertions:records.flatMap(r=>r.checks).length,failed:records.flatMap(r=>r.checks.filter(c=>!c.pass).map(c=>({id:r.id,...c}))),note:'Post-observation assertions; frozen first-run failures retained. Corrected-context assertion checks provider input/state, not answer quality.'}));
}finally{await mongoose.disconnect();}
