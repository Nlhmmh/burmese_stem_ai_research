// Explicit synthetic UI fixtures in this run's isolated database, not learner records.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';
const raw = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const metadata = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
if (!metadata.dbUrl.endsWith('/burmese_usability_inspection')) throw new Error('Wrong database');
const require = createRequire(path.join(root, 'burmese_stem_ai/package.json'));
const mongoose = require('mongoose');
await mongoose.connect(metadata.dbUrl);
try {
  const collection = mongoose.connection.db.collection('sessions');
  const base = await collection.findOne({ sessionId: process.argv[2] });
  if (!base) throw new Error('Create a browser-owned session first');
  const seeds = {};
  const event = (round, need = 'medium', route = 'stage_5_scaffold', difficulty = null) => ({ overallSupportNeed: need, difficultyType: difficulty, route, roundBefore: round - 1, roundAfter: round, createdAt: new Date() });
  const adaptation = round => ({ learnerResponse: 'medium', supportType: 'another_example', content: { en: `Stored inspection scaffold ${round}: ${base.explanations.realWorldExample.en}`, my: `သိမ်းဆည်းထားသော အထောက်အကူ ${round}: ${base.explanations.realWorldExample.my}` }, round, createdAt: new Date() });
  for (const name of ['initial', 'round1', 'round2', 'completed', 'legacy', 'long', 'english', 'burmese', 'foreign']) {
    const doc = structuredClone(base); delete doc._id;
    doc.sessionId = randomUUID(); doc.adaptations = []; doc.responseEvents = []; doc.followUps = [];
    doc.adaptationRound = 0; doc.understanding = null; doc.status = 'in_progress';
    doc.createdAt = new Date(); doc.updatedAt = new Date(Date.now() + Object.keys(seeds).length * 1000);
    if (['round1', 'round2', 'completed'].includes(name)) {
      const count = name === 'round1' ? 1 : 2;
      doc.adaptationRound = count; doc.understanding = 'medium';
      doc.adaptations = Array.from({ length: count }, (_, i) => adaptation(i + 1));
      doc.responseEvents = Array.from({ length: count }, (_, i) => event(i + 1));
      doc.status = name === 'completed' ? 'completed' : count === 2 ? 'review_recommended' : 'in_progress';
    }
    if (name === 'legacy') { delete doc.adaptations; delete doc.responseEvents; delete doc.followUps; delete doc.preferencesSnapshot; }
    if (name === 'long') for (const pair of Object.values(doc.explanations)) for (const language of ['en', 'my']) pair[language] = (pair[language] + ' ').repeat(4).slice(0, 1400);
    if (['english', 'burmese'].includes(name)) doc.preferencesSnapshot.supportLanguage = name;
    if (name === 'foreign') doc.learnerId = randomUUID();
    await collection.insertOne(doc); seeds[name] = doc.sessionId;
  }
  fs.writeFileSync(path.join(run, 'ui_seeds.json'), JSON.stringify({ browserCreated: base.sessionId, ...seeds }, null, 2) + '\n', { flag: 'wx' });
  fs.writeFileSync(path.join(run, 'seeded_documents.json'), JSON.stringify(await collection.find({}).toArray(), null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(seeds));
} finally { await mongoose.disconnect(); }
