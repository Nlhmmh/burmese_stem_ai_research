import fs from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
const raw=fileURLToPath(new URL('./',import.meta.url));
const read=name=>JSON.parse(fs.readFileSync(raw+name,'utf8'));
const jsonl=name=>fs.readFileSync(raw+name,'utf8').trim().split('\n').map(JSON.parse);
const rows=jsonl('SIM-RUN-01-results.jsonl'), providers=jsonl('SIM-RUN-01-provider.jsonl');
const snapshot=read('SIM-RUN-01-database-snapshot.json'), meta=read('SIM-RUN-01-metadata.json');
assert.equal(rows.length,55); assert.equal(new Set(rows.map(r=>r.id)).size,55);
assert.equal(rows.filter(r=>['A','B','C'].includes(r.path)).length,48);
assert.equal(providers.length,meta.providerCalls);
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(raw+'../content_reference_notes.md')).digest('hex'),meta.referenceHash);
let noGenerationSteps=0, failedSteps=0;
for(const r of rows){
  assert.equal(r.contentOutcome,'Not assessed'); assert.equal(r.assessor,'');
  assert.equal(providers.filter(p=>p.caseId===r.id).length,r.providerCalls);
  assert.deepEqual(snapshot.sessions.filter(s=>s.learnerId===r.owner),r.finalStoredState);
  assert.deepEqual(snapshot.profiles.find(p=>p.learnerId===r.owner).preferences,r.preferences);
  for(const step of r.steps){
    assert.equal(providers.filter(p=>p.caseId===r.id&&p.step===step.step).length,step.providerCalls);
    if(step.response.route==='fade'||step.step==='cap'){
      assert.equal(step.providerCalls,0); assert.equal(step.response.adaptation,null);
      assert.equal(step.before[0].adaptationRound,step.after[0].adaptationRound); noGenerationSteps++;
    }
    if(step.httpStatus>=500){assert.deepEqual(step.before,step.after);failedSteps++;}
  }
  if(r.technicalOutcome==='Pass')assert.ok(r.checks.every(c=>c.pass));
  if(r.technicalOutcome==='Controlled ambiguity'){assert.equal(r.finalStoredState.length,0);assert.equal(r.steps[0].httpStatus,422);}
  for(const s of r.finalStoredState){
    assert.ok(s.adaptationRound>=0&&s.adaptationRound<=2);assert.equal(s.adaptations.length,s.adaptationRound);
    let round=0;
    for(const event of s.responseEvents){assert.equal(event.roundBefore,round);assert.ok(event.roundAfter>=round&&event.roundAfter<=2);round=event.roundAfter;}
    assert.equal(round,s.adaptationRound);
  }
}
const report={status:'Pass: evidence accounting/state consistency only',verifiedAt:new Date().toISOString(),cases:55,
  providerCalls:providers.length,sessions:snapshot.sessions.length,profiles:snapshot.profiles.length,
  noGenerationSteps,failedStepsWithUnchangedState:failedSteps,humanJudgement:'Not assessed',referenceHash:meta.referenceHash};
fs.writeFileSync(raw+'SIM-RUN-01-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
