// Separately labelled public-HTTP checks for actions unavailable in this UI.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261003-SCENARIO-02');
const meta = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
const require = createRequire(path.join(root, 'burmese_stem_ai/package.json')), mongoose = require('mongoose');
const phase = process.argv[2];
assert.ok(['cap-and-fade', 'completed'].includes(phase));
const output = path.join(run, `api-boundary-${phase}.json`);
assert.ok(!fs.existsSync(output), 'Refusing to overwrite boundary evidence');
const providerCount = () => fs.existsSync(path.join(run, 'provider.jsonl')) ? fs.readFileSync(path.join(run, 'provider.jsonl'), 'utf8').trim().split('\n').filter(Boolean).length : 0;
const clean = value => JSON.parse(JSON.stringify(value, (key, item) => key === 'learnerId' ? 'SCENARIO-LEARNER-01' : item));
const results = [];
try {
  await mongoose.connect(meta.dbUrl);
  const sessions = mongoose.connection.db.collection('sessions');
  assert.equal(await sessions.countDocuments(), 1);
  const initial = await sessions.findOne({});
  for (const spec of phase === 'cap-and-fade'
    ? [{ id: 'SCN-CAP-API-01', need: 'needs_support' }, { id: 'SCN-FADE-API-01', need: 'high' }]
    : [{ id: 'SCN-COMPLETED-API-01', need: 'medium' }]) {
    const before = await sessions.findOne({ sessionId: initial.sessionId }), callsBefore = providerCount();
    assert.equal(before.adaptationRound, 2);
    assert.equal(before.adaptations.length, 2);
    const startedAt = new Date().toISOString();
    const response = await fetch(`${meta.browserUrl}/api/sessions/${initial.sessionId}/respond`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: `learnerId=${initial.learnerId}` },
      body: JSON.stringify({ overallSupportNeed: spec.need })
    });
    const body = await response.json(), after = await sessions.findOne({ sessionId: initial.sessionId });
    const record = clean({ ...spec, startedAt, finishedAt: new Date().toISOString(), boundaryMode: 'Public HTTP/proxy using dedicated synthetic identity; NOT a learner UI click',
      request: { overallSupportNeed: spec.need }, httpStatus: response.status, response: body, before, after, providerCalls: providerCount() - callsBefore });
    results.push(record);
    assert.equal(record.providerCalls, 0);
    assert.equal(after.adaptationRound, 2);
    assert.deepEqual(after.adaptations, before.adaptations);
    assert.deepEqual(after.followUps, before.followUps);
    if (phase === 'completed') {
      assert.equal(before.status, 'completed');
      assert.equal(response.status, 409);
      assert.equal(body.error.code, 'SESSION_RESPONSE_CONFLICT');
      assert.deepEqual(after, before);
    } else {
      assert.equal(response.status, 200);
      assert.equal(body.adaptation, null);
      assert.equal(after.responseEvents.length, before.responseEvents.length + 1);
      assert.equal(body.responseEvent.roundBefore, 2);
      assert.equal(body.responseEvent.roundAfter, 2);
      assert.equal(body.route, spec.need === 'high' ? 'fade' : 'stage_5_scaffold');
      assert.equal(after.status, spec.need === 'high' ? 'in_progress' : 'review_recommended');
    }
    record.result = 'Pass';
  }
} catch (error) {
  results.push({ result: 'Fail', message: error.message });
  process.exitCode = 1;
} finally {
  fs.writeFileSync(output, JSON.stringify(results, null, 2) + '\n', { flag: 'wx' });
  await mongoose.disconnect();
}
console.log(JSON.stringify(results.map(x => ({ id: x.id, result: x.result, httpStatus: x.httpStatus, providerCalls: x.providerCalls }))));
