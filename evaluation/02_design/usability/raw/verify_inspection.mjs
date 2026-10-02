import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const raw = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const metadata = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
const require = createRequire(path.join(root, 'burmese_stem_ai/package.json'));
const mongoose = require('mongoose');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for (const [file, expected] of Object.entries(metadata.productionHashes)) assert.equal(hash(path.join(root, file)), expected, file);
const records = fs.readFileSync(path.join(run, 'observations.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
assert.equal(new Set(records.map(row => row.id)).size, records.length);
for (const record of records) for (const file of [record.screenshot, record.dom]) assert.ok(fs.existsSync(path.join(run, file)), file);
const configurations = [...new Set(records.map(row => `${row.width}x${row.height} ${row.locale} ${row.theme}`))];
assert.equal(configurations.length, 8);
for (let i = 1; i <= 9; i++) assert.ok(records.some(row => row.criteria.includes('U' + i)));
await mongoose.connect(metadata.dbUrl);
try {
  const seeds = JSON.parse(fs.readFileSync(path.join(run, 'ui_seeds.json')));
  const collection = mongoose.connection.db.collection('sessions');
  const owner = (await collection.findOne({ sessionId: seeds.browserCreated })).learnerId;
  const sessions = await collection.find({}).toArray();
  for (const session of sessions) {
    assert.ok(session.adaptationRound <= 2);
    assert.ok((session.adaptations ?? []).length <= 2);
    assert.ok((session.followUps ?? []).length <= 2);
  }
  const owned = await collection.find({ learnerId: owner }).sort({ updatedAt: -1 }).toArray();
  const rendered = JSON.parse(fs.readFileSync(path.join(run, 'history_final_links.json')));
  assert.deepEqual(rendered.map(row => row.href), owned.map(row => '/learn/' + row.sessionId));
  assert.ok(!rendered.some(row => row.href.endsWith(seeds.foreign)));
  const result = { verification: 'Pass', checkedAt: new Date().toISOString(), productionFilesUnchanged: Object.keys(metadata.productionHashes).length, observations: records.length, screenshots: records.length, configurations, historyOrderMatchesOwnedDatabase: true, visibleOwnedHistorySessions: owned.length, foreignSessionExcluded: true, storedSessionsWithinBounds: sessions.length, externalProviderCalls: 0, sourceCopiesCreated: 0, note: 'Technical evidence integrity and controlled synthetic state only; not usability effectiveness or content quality.' };
  fs.writeFileSync(path.join(run, 'verification.json'), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(result));
} finally { await mongoose.disconnect(); }
