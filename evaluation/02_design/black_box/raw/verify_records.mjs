import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const raw=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(raw,'../../../..'),design=path.dirname(raw),run=path.join(raw,'RUN-B01-20261002-BLACKBOX-01');
const csv=file=>fs.readFileSync(path.join(design,file),'utf8').trim().split('\n').map(line=>line.match(/"(?:[^"]|"")*"/g).map(s=>s.slice(1,-1).replaceAll('""','"')));
const cases=csv('black_box_results.csv'),assertions=csv('black_box_assertions.csv');
assert.equal(cases.length,25);assert.equal(assertions.length,430);
const totals={Pass:0,Partial:0,Fail:0};for(const row of cases.slice(1)){totals[row[4]]++;assert.equal(row[2],'Executed');}
assert.deepEqual(totals,{Pass:21,Partial:2,Fail:1});
assert.equal(assertions.slice(1).filter(r=>r[3]==='Fail').length,6);
assert.equal(assertions.slice(1).filter(r=>r[3]==='Not assessed').length,2);
const spec=fs.readFileSync(path.join(design,'black_box_test_cases.md'),'utf8');
assert.ok(!/\| BB\d\d \| Not run/.test(spec));
for(const row of cases.slice(1))assert.ok(spec.includes(`| ${row[0]} | Executed | ${row[4]} | E024–E027 |`));
let entries=0;
for(const line of fs.readFileSync(path.join(run,'manifest.sha256'),'utf8').trim().split('\n')){const [,expected,file]=line.match(/^([a-f0-9]{64})  (.+)$/);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),expected,file);entries++;}
console.log(JSON.stringify({verification:'Pass',caseRows:24,assessedOutcomes:totals,observedAssertions:427,retainedFalseAssertions:6,explicitContentScopeNotAssessed:2,manifestEntries:entries,executionRegister:'all 24 cases accounted for'}));
