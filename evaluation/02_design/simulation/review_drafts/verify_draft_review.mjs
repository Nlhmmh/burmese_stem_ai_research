import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url)),design=path.dirname(dir);
const rows=fs.readFileSync(path.join(design,'raw/SIM-RUN-01-results.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
const totals={Pass:0,Partial:0,Fail:0};let outputs=0,exactTextFields=0;
for(const r of rows){
 const file=path.join(design,'human_review',r.id+'.md'),doc=fs.readFileSync(file,'utf8');
 assert.ok(doc.includes('AI-assisted draft prepared by Codex for Nathan on 2 October 2026'));
 assert.ok(doc.includes('endorsement')&&doc.includes('pending'));
 assert.ok(!doc.includes('____________________'),r.id+' unfilled field');
 const draft=r.id==='SIM01-A'?doc.slice(doc.indexOf('## AI-assisted recheck')):doc;
 for(const s of r.steps){
   if(s.response.session&&s.step==='initial'){
     for(const t of [...Object.values(s.response.session.explanations),s.response.session.reflectivePrompt,s.response.session.hint]){
       for(const value of [t.en,t.my]){assert.ok(doc.includes(value),r.id+' changed original text');exactTextFields++;}
     }
   }
   if(s.response.adaptation)for(const value of Object.values(s.response.adaptation.content)){assert.ok(doc.includes(value),r.id+' changed adaptation text');exactTextFields++;}
 }
 const sections=draft.split('### Qualified human judgement — ').slice(1);
 for(const section of sections){
   const end=section.indexOf('\n## '),text=end<0?section:section.slice(0,end);
   const table=text.split('\n').filter(l=>/^\| (Technical correctness|Contextual relevance|Language adequacy|Explanation beyond translation|Adaptation appropriateness)/.test(l));
   assert.equal(table.length,5,r.id+' missing dimension');
   const scores=table.map(l=>l.split('|')[2].trim());
   assert.ok(scores.every(s=>['0','1','2','NA'].includes(s)));
   const expected=scores.includes('0')?'Fail':scores.includes('1')?'Partial':'Pass';
   assert.ok(text.includes('**Provisional '+expected+' —'),r.id+' inconsistent score/conclusion');
   totals[expected]++;outputs++;
 }
}
assert.equal(rows.length,55);assert.equal(outputs,91);
const preserved=fs.readFileSync(path.join(design,'human_review/SIM01-A.md'),'utf8');
assert.ok(preserved.includes('| Language adequacy (English and Burmese) | 1 | Reflective prompt burmese version contains korean word'));
assert.ok(preserved.includes('Overall content conclusion (Pass / Partial / Fail / Not assessed): Pass'));
assert.ok(preserved.includes('Reviewer signature and review date: Nathan, 2 Oct 2026'));
for(const f of ['qualified_human_judgement.md','00_run_metadata.md'])assert.ok(!fs.readFileSync(path.join(design,f),'utf8').includes('____________________'));
const csv=fs.readFileSync(path.join(design,'human_content_scores.csv'),'utf8').trim().split('\n');
assert.equal(csv.length,92);assert.ok(csv.slice(1).every(l=>/^("[^"]*",){2}("",){9}""$/.test(l)),'Official human CSV must not be populated with AI endorsements');
const result={draftDate:'2026-10-02',timezone:'Pacific/Auckland',worksheets:55,provisionalOutputAssessments:91,totals,
 exactOriginalTextFieldsPreserved:exactTextFields,existingNathanSIM01AEntries:'preserved with separate draft recheck',
 humanEndorsement:'pending',officialHumanCSV:'91 rows still blank',checks:'Pass: draft completeness, score rule, provenance and original text preservation'};
fs.writeFileSync(path.join(dir,'draft_review_validation.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
