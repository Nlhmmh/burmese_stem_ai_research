import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(raw,'../../../..');
const design = path.dirname(raw);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(raw).filter(f=>!f.endsWith('.sha256')).concat([
  'content_reference_notes.md','simulation_cases.csv','simulation_results.csv','simulation_analysis.md','failure_analysis.md','simulation_test_cases.md'
].map(f=>path.join(design,f)),[
  'package-lock.json','services/session.service.ts','services/adaptation.service.ts','services/followup.service.ts',
  'services/llm-provider.ts','lib/session-domain.ts','lib/constants.ts','data/schemas/session.schema.ts'
].map(f=>path.join(repo,'burmese_stem_ai',f)));
fs.writeFileSync(path.join(raw,'SIM-RUN-01-manifest.sha256'),files.sort().map(f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')+'  '+path.relative(repo,f)).join('\n')+'\n');
console.log(`Manifest contains ${files.length} immutable evidence/source files; editable human review is excluded.`);
