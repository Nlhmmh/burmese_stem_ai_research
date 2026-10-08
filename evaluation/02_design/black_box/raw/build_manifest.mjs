// Emit a separate run manifest; never rewrite other evaluation manifests.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const raw=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(raw,'../../../..'),design=path.dirname(raw),run=path.join(raw,'RUN-B01-20261002-BLACKBOX-01');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=[];
function walk(dir){for(const name of fs.readdirSync(dir)){const file=path.join(dir,name);if(fs.statSync(file).isDirectory())walk(file);else if(name!=='manifest.sha256')files.push(file);}}
walk(run);
for(const name of fs.readdirSync(raw))if(/\.(mjs|cjs|md)$/.test(name))files.push(path.join(raw,name));
for(const name of ['black_box_analysis.md','00_run_metadata.md','black_box_test_cases.md','black_box_results.csv','black_box_assertions.csv'])files.push(path.join(design,name));
for(const name of ['package.json','package-lock.json','proxy.ts','services/llm-provider.ts','services/session.service.ts','services/adaptation.service.ts','services/followup.service.ts','services/session-lifecycle.service.ts','data/dao/session.dao.ts','data/schemas/session.schema.ts','lib/constants.ts','lib/session-domain.ts','components/learn/LearningSession.tsx','components/learn/SessionContent.tsx','components/history/HistoryList.tsx','components/home/PreferencesDialog.tsx'])files.push(path.join(root,'burmese_stem_ai',name));
for(const name of ['raw/SIM-RUN-01-results.jsonl','human_review/SIM01-B.md','human_review/SIM05-B.md'])files.push(path.join(design,'../simulation',name));
const manifest=[...new Set(files)].sort().map(file=>hash(file)+'  '+path.relative(root,file)).join('\n')+'\n';
const file=path.join(run,'manifest.sha256');
if(fs.existsSync(file))throw new Error('Refusing to overwrite existing run manifest');
process.stdout.write('*** Begin Patch\n*** Add File: '+file+'\n'+manifest.trimEnd().split('\n').map(l=>'+'+l).join('\n')+'\n*** End Patch');
