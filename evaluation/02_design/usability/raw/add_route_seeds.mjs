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
  const seeds = JSON.parse(fs.readFileSync(path.join(run, 'ui_seeds.json')));
  const base = await collection.findOne({ sessionId: seeds.initial });
  const additional = {};
  for (const viewport of ['desktop', 'mobile']) for (const route of ['simpler', 'example', 'language', 'concept', 'correction', 'ambiguous', 'skip', 'fade', 'error']) {
    const doc = structuredClone(base); delete doc._id;
    doc.sessionId = randomUUID(); doc.createdAt = new Date(); doc.updatedAt = new Date();
    if (route === 'language') doc.preferencesSnapshot.supportLanguage = 'english';
    if (['correction', 'ambiguous'].includes(route)) { doc.concept = { name: 'cell', domain: 'biology' }; doc.originalQuestion = 'What is a cell?'; }
    await collection.insertOne(doc); additional[viewport + '_' + route] = doc.sessionId;
  }
  fs.writeFileSync(path.join(run, 'route_seeds.json'), JSON.stringify(additional, null, 2) + '\n', { flag: 'wx' });
  fs.writeFileSync(path.join(run, 'route_seed_documents.json'), JSON.stringify(await collection.find({ sessionId: { $in: Object.values(additional) } }).toArray(), null, 2) + '\n', { flag: 'wx' });
  console.log('Created 18 owned synthetic route-entry sessions.');
} finally { await mongoose.disconnect(); }
