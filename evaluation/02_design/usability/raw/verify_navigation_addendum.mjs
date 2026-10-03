import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const metadata = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
const prior = JSON.parse(fs.readFileSync(path.join(run, 'database_snapshot.json')));
const seeds = JSON.parse(fs.readFileSync(path.join(run, 'ui_seeds.json')));
const require = createRequire(path.join(root, 'burmese_stem_ai/package.json'));
const mongoose = require('mongoose');
await mongoose.connect(metadata.dbUrl);
try {
  const current = JSON.parse(JSON.stringify(await mongoose.connection.db.collection('sessions').find({}).toArray()));
  const owner = current.find(row => row.sessionId === seeds.browserCreated).learnerId;
  for (const row of current) row.learnerId = row.learnerId === owner ? 'SYNTHETIC-LEARNER-PRIMARY' : 'SYNTHETIC-LEARNER-FOREIGN';
  assert.deepEqual(current, prior.sessions, 'Back must not persist any session change');
  const count = fs.readFileSync(path.join(run, 'provider.jsonl'), 'utf8').trim().split('\n').length;
  assert.equal(count, 29, 'Back must not generate provider request');
  const records = fs.readFileSync(path.join(run, 'navigation_addendum.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
  assert.deepEqual(records.map(row => row.width), [1440, 390]);
  for (const row of records) {
    const dom = fs.readFileSync(path.join(run, row.dom), 'utf8');
    assert.ok(dom.includes('I understand') && dom.includes('I partially understand') && dom.includes('I need more explanation'));
    assert.ok(!dom.includes('Back to understanding choices'));
  }
  const result = { verification: 'Pass', checkedAt: new Date().toISOString(), observations: 2, restoredStage6A: true, persistedSessionsUnchanged: 30, providerRequestsAdded: 0, limitation: 'No model/content-quality inference' };
  fs.writeFileSync(path.join(run, 'navigation_addendum_verification.json'), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(result));
} finally { await mongoose.disconnect(); }
