// Read-only verification of the recorded scenario, not another application run.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261003-SCENARIO-02');
const json = name => JSON.parse(fs.readFileSync(path.join(run, name), 'utf8'));
const lines = name => fs.readFileSync(path.join(run, name), 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const http = lines('http.jsonl'), states = lines('state.jsonl'), providers = lines('provider.jsonl'), browser = lines('browser_observations.jsonl');
const checks = [], record = (id, detail, operation) => { try { operation(); checks.push({ id, detail, result: 'Pass' }); } catch (error) { checks.push({ id, detail, result: 'Fail', error: error.message }); } };
const req = id => http.find(item => item.id === id), state = id => states.find(item => item.requestId === id), session = id => state(id).sessions[0];
const both = value => Boolean(value?.en?.trim() && value?.my?.trim());
record('SCN-V01', 'All 18 public HTTP requests have ordered IDs and post-request state snapshots', () => {
  assert.equal(http.length, 18); assert.equal(states.length, 18);
  assert.deepEqual(http.map(x => x.id), Array.from({length:18}, (_,i)=>i+1));
  assert.deepEqual(states.map(x => x.requestId), http.map(x=>x.id));
  assert.ok(!fs.existsSync(path.join(run, 'capture_errors.jsonl')));
});
record('SCN-V02', 'Saved bilingual beginner guided profile and immutable preference snapshot match', () => {
  assert.equal(req(2).httpStatus, 200); assert.deepEqual(state(2).profiles[0].preferences, session(3).preferencesSnapshot);
  assert.deepEqual(session(3).preferencesSnapshot, {uiLanguage:'en', supportLanguage:'bilingual', explanationLevel:'beginner', learningStyle:'guided', theme:'light'});
  assert.deepEqual(state(18).profiles[0].preferences, state(2).profiles[0].preferences);
});
record('SCN-V03', 'Fixed inquiry, one initial call, identified concept/context and five bilingual content fields', () => {
  assert.equal(req(3).request.question, 'What is photosynthesis, and how do plants make food?'); assert.equal(req(3).httpStatus, 201); assert.equal(req(3).providerCalls, 1);
  assert.deepEqual(session(3).concept, {name:'photosynthesis',domain:'plant biology'});
  assert.equal(session(3).adaptationRound, 0); assert.equal(session(3).responseEvents.length, 0);
  for (const value of [...Object.values(session(3).explanations), session(3).reflectivePrompt, session(3).hint]) assert.ok(both(value));
});
for (const [id, need, difficulty, route, support, round, status] of [[5,'medium',undefined,'stage_5_scaffold','another_example',1,'in_progress'],[6,'needs_support','concept_unclear','concept_clarification','concept_clarification',2,'review_recommended']]) {
  record(id===5?'SCN-V04':'SCN-V05', `Atomic response/adaptation at round ${round} has the specified route and one provider call`, () => {
    assert.equal(req(id).httpStatus, 200); assert.equal(req(id).request.overallSupportNeed, need); assert.equal(req(id).request.difficultyType, difficulty);
    assert.equal(req(id).response.route, route); assert.equal(req(id).providerCalls, 1);
    assert.equal(session(id).adaptationRound, round); assert.equal(session(id).adaptations.length, round); assert.equal(session(id).responseEvents.length, round);
    assert.equal(session(id).status, status); assert.equal(session(id).adaptations.at(-1).supportType, support);
    assert.deepEqual(session(id).responseEvents.at(-1), req(id).response.responseEvent); assert.ok(both(session(id).adaptations.at(-1).content));
  });
}
record('SCN-V06', 'Capped and High API checks each append one 2-to-2 event without provider work or another adaptation', () => {
  for (const id of [7,8]) {
    assert.equal(req(id).httpStatus, 200); assert.equal(req(id).providerCalls, 0); assert.equal(req(id).response.adaptation, null);
    assert.equal(session(id).adaptationRound, 2); assert.deepEqual(session(id).adaptations, session(6).adaptations);
    assert.equal(session(id).responseEvents.length, id-4); assert.equal(req(id).response.responseEvent.roundBefore, 2); assert.equal(req(id).response.responseEvent.roundAfter, 2);
  }
  assert.equal(req(7).response.route, 'stage_5_scaffold'); assert.equal(req(8).response.route, 'fade');
  assert.equal(session(7).status, 'review_recommended'); assert.equal(session(8).status, 'in_progress');
});
record('SCN-V07', 'Both separate cap/fade API checks and post-completion check are recorded as Pass', () => {
  const boundaries = [...json('api-boundary-cap-and-fade.json'), ...json('api-boundary-completed.json')];
  assert.equal(boundaries.length, 3); assert.ok(boundaries.every(x=>x.result==='Pass' && x.providerCalls===0));
});
record('SCN-V08', 'Relevant follow-up uses active concept, latest scaffold and latest response route without changing Stage 7', () => {
  assert.equal(req(10).request.question, 'Why do plants need sunlight for photosynthesis?'); assert.equal(req(10).httpStatus, 200); assert.equal(req(10).providerCalls, 1);
  assert.equal(session(10).followUps.length, 1); assert.ok(both(session(10).followUps[0].answer));
  assert.deepEqual(session(10).adaptations, session(9).adaptations); assert.deepEqual(session(10).responseEvents, session(9).responseEvents); assert.equal(session(10).adaptationRound, 2);
  const input = JSON.parse(providers[3].request.input); assert.deepEqual(input.activeConcept, session(9).concept);
  assert.equal(input.latestRelevantScaffold.supportType, 'concept_clarification'); assert.equal(input.latestResponseRoute, 'fade'); assert.deepEqual(input.preferences, session(9).preferencesSnapshot);
});
record('SCN-V09', 'Unrelated follow-up is rejected without persisting another follow-up or changing any session field', () => {
  assert.equal(req(11).request.question, 'How does gravity work?'); assert.equal(req(11).httpStatus, 422); assert.equal(req(11).response.error.code, 'FOLLOW_UP_OUT_OF_SCOPE'); assert.equal(req(11).response.newSessionRecommended, true); assert.equal(req(11).providerCalls, 1);
  assert.deepEqual(session(11), session(10));
});
record('SCN-V10', 'History and Resume preserve active content, event/adaptation/follow-up counts and session identity', () => {
  assert.equal(req(12).response.sessions.length, 1); assert.equal(req(12).response.sessions[0].sessionId, session(11).sessionId);
  assert.equal(req(12).response.sessions[0].understanding, 'high'); assert.equal(req(12).response.sessions[0].status, 'in_progress');
  const detail=req(13).response.session;
  for (const field of ['explanations','hint','reflectivePrompt','adaptations','responseEvents','followUps','preferencesSnapshot','concept','adaptationRound','status','understanding']) assert.deepEqual(detail[field],session(11)[field],field);
  assert.deepEqual(session(13),session(11));
});
record('SCN-V11', 'Explicit Finish changes lifecycle only; completed Review and rejected response retain exact recorded content', () => {
  assert.deepEqual(req(14).request,{status:'completed'}); assert.equal(req(14).httpStatus,200); assert.equal(req(14).providerCalls,0); assert.equal(session(14).status,'completed');
  for (const field of ['explanations','hint','reflectivePrompt','adaptations','responseEvents','followUps','preferencesSnapshot','concept','adaptationRound','understanding']) assert.deepEqual(session(14)[field],session(13)[field],field);
  assert.equal(req(15).response.sessions[0].status,'completed');
  for (const id of [16,18]) for (const field of ['explanations','adaptations','responseEvents','followUps','adaptationRound','status']) assert.deepEqual(req(id).response.session[field],session(14)[field],field);
  assert.equal(req(17).httpStatus,409); assert.equal(req(17).response.error.code,'SESSION_RESPONSE_CONFLICT'); assert.equal(req(17).providerCalls,0); assert.deepEqual(session(17),session(16));
});
record('SCN-V12', 'Five live provider requests, no retry/failure, strict schemas, store=false and recorded model version', () => {
  assert.equal(providers.length,5); assert.equal(http.reduce((sum,x)=>sum+x.providerCalls,0),5);
  assert.deepEqual(providers.map(x=>x.request.text.format.name),['initial_learning_session','learning_adaptation','learning_adaptation','scoped_learning_follow_up','scoped_learning_follow_up']);
  for(const item of providers){assert.equal(item.httpStatus,200); assert.equal(item.request.store,false); assert.equal(item.request.text.format.strict,true); assert.equal(item.response.model,'gpt-5.4-mini-2026-03-17'); assert.ok(!item.transportError);}
});
record('SCN-V13', '24 browser observations and 27 JPEGs cover all planned UI actions; High at cap is explicitly unavailable', () => {
  assert.equal(browser.length,24); assert.equal(fs.readdirSync(path.join(run,'screenshots')).filter(x=>x.endsWith('.jpg')).length,27);
  assert.equal(new Set(browser.map(x=>x.id)).size,24);
  for (const item of browser) { assert.ok(fs.existsSync(path.join(run,'screenshots',item.id+'.jpg'))); assert.equal(fs.readFileSync(path.join(run,item.id+'-accessibility.txt'),'utf8'), item.state); }
  const byId=id=>browser.find(x=>x.id===id).state;
  assert.match(byId('SCN-C02'),/HINT Focus/); assert.match(byId('SCN-D01'),/Continue without a choice/);
  assert.match(byId('SCN-E02'),/I do not understand the concept, Value: 1/);
  assert.match(byId('SCN-E04'),/Maximum support provided/); assert.ok(!/button I understand/.test(byId('SCN-E04')));
  assert.match(byId('SCN-G02'),/1 follow-up remaining/); assert.match(byId('SCN-H02'),/different topic from photosynthesis/);
  assert.match(byId('SCN-I01'),/Description: Resume/); assert.match(byId('SCN-I02'),/Description: Review/);
  assert.match(byId('SCN-J05'),/Session Complete/); assert.match(byId('SCN-J05'),/Response 4/); assert.match(byId('SCN-J05'),/Adaptation round 2/);
});
record('SCN-V14', 'One synthetic completed session, two adaptations, four events and one relevant follow-up; exported identity pseudonymised', () => {
  const final=json('database_snapshot.json'); assert.equal(final.sessions.length,1); assert.equal(final.profiles.length,1);
  assert.deepEqual(final.sessions[0],session(18)); assert.equal(final.sessions[0].status,'completed'); assert.equal(final.sessions[0].adaptations.length,2); assert.equal(final.sessions[0].responseEvents.length,4); assert.equal(final.sessions[0].followUps.length,1);
  const combined=JSON.stringify([states,http,final]); const identities=[...combined.matchAll(/"learnerId":"([^"]+)"/g)]; assert.ok(identities.length>0); assert.ok(identities.every(x=>x[1]==='SCENARIO-LEARNER-01'));
});
record('SCN-V15', '66 root production identities, lock, protocol-at-execution and frozen reference remain verifiable', () => {
  const meta=json('metadata.json'); assert.ok(meta.productionUnchangedAfterRun); assert.equal(Object.keys(meta.productionHashes).length,66);
  for(const [file,expected] of Object.entries(meta.productionHashes)) assert.equal(hash(fs.readFileSync(path.join(root,file))),expected,file);
  assert.equal(hash(fs.readFileSync(path.join(run,'protocol_at_execution.md'))),meta.protocolHash);
  assert.equal(hash(fs.readFileSync(path.join(root,'evaluation/02_design/simulation/content_reference_notes.md'))),meta.referenceHash);
});
const result={runId:path.basename(run),verifiedAt:new Date().toISOString(),mode:'Read-only analysis of stored execution; no new app/provider/database/test invocation',checks,
  passed:checks.filter(x=>x.result==='Pass').length,failed:checks.filter(x=>x.result==='Fail').length,
  finalState:{sessions:1,adaptations:2,responseEvents:4,followUps:1,round:2,status:'completed'}, providerCalls:providers.length,
  httpRequests:http.length,browserObservations:browser.length,screenshots:27,
  contentQuality:'Not established by these structural checks; provisional report observations only'};
fs.writeFileSync(path.join(run,'verification.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({passed:result.passed,failed:result.failed,failures:checks.filter(x=>x.result==='Fail')}));
if(result.failed) process.exitCode=1;
