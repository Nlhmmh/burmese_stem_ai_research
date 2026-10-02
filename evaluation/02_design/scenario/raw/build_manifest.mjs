import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const raw=path.dirname(fileURLToPath(import.meta.url)), root=path.resolve(raw,'../../../..');
const scenario=path.dirname(raw), run=path.join(raw,'RUN-B01-20261003-SCENARIO-02');
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const metadata=JSON.parse(fs.readFileSync(path.join(run,'metadata.json')));
const register=fs.readFileSync(path.join(root,'evaluation/03_results/evidence_register.csv'),'utf8');
const snapshot={capturedAt:new Date().toISOString(),sha256:hash(register),originalCsv:register,
  purpose:'Preserve all existing evidence-register bytes before appending only E042-E044; not a new source checkout'};
fs.writeFileSync(path.join(run,'evidence_register_before_append.json'),JSON.stringify(snapshot,null,2)+'\n',{flag:'wx'});
function csv(text){const rows=[];let row=[],field='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(field);field='';}else if(c==='\n'&&!quoted){row.push(field);rows.push(row);row=[];field='';}else if(c!=='\r'||quoted)field+=c;}if(field||row.length){row.push(field);rows.push(row);}assert.ok(!quoted);return rows;}
const parsed=csv(register),header=parsed.shift(),old=parsed.filter(x=>x.length>1);
assert.equal(old.length,36);
for(const row of old){assert.equal(row.length,header.length);const item=Object.fromEntries(header.map((key,i)=>[key,row[i]]));assert.equal(hash(fs.readFileSync(path.join(root,item.path))),item.locator_or_hash.slice(7),item.evidence_id);}
assert.equal(JSON.parse(fs.readFileSync(path.join(run,'verification.json'))).failed,0);
const files=[];
function walk(directory){for(const name of fs.readdirSync(directory)){const file=path.join(directory,name);if(fs.statSync(file).isDirectory())walk(file);else if(!['manifest.sha256','manifest_verification.json'].includes(name))files.push(path.relative(root,file));}}
walk(scenario);
files.push('evaluation/01_conceptual/scenario/photosynthesis_scenario.md','evaluation/02_design/simulation/content_reference_notes.md','evaluation/02_design/informed_argument/traceability.md','evaluation/02_design/informed_argument/reference_verification.md');
for(const [file,expected] of Object.entries(metadata.productionHashes)){assert.equal(hash(fs.readFileSync(path.join(root,file))),expected,file);files.push(file);}
const unique=[...new Set(files)].sort();
fs.writeFileSync(path.join(run,'manifest.sha256'),unique.map(file=>`${hash(fs.readFileSync(path.join(root,file)))}  ${file}`).join('\n')+'\n',{flag:'wx'});
console.log(JSON.stringify({manifestEntries:unique.length,oldRegisteredArtefactsUnchanged:old.length,productionUnchanged:Object.keys(metadata.productionHashes).length,manifestHash:hash(fs.readFileSync(path.join(run,'manifest.sha256')))}));
