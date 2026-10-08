// Reader-facing summaries and editorial checks only. No application/test/provider execution.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {outputs} from '../../02_design/simulation/bilingual_assessment/read_outputs.mjs';

const paper='evaluation/04_paper/assignment_5_working_paper.md';
const previousCommit='aaf8eca0129e1191eb43b2a8b0478baf43ad7183';
const before=execFileSync('git',['show',previousCommit+':'+paper],{encoding:'utf8',maxBuffer:2*1024*1024});
const read=p=>fs.readFileSync(p,'utf8');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const fileHash=p=>hash(fs.readFileSync(p));
const cell=s=>String(s).replace(/\|/g,' / ').replace(/\s+/g,' ').trim();
const table=(id,title,headers,rows)=>`**Table ${id}. ${title}**\n\n| ${headers.join(' | ')} |\n| ${headers.map(()=> '---').join(' | ')} |\n${rows.map(r=>'| '+r.map(cell).join(' | ')+' |').join('\n')}\n`;
const annotations=JSON.parse(read('evaluation/02_design/simulation/bilingual_assessment/annotations.json'));
const groups={};

groups.B=`## Appendix B. Analytical Evaluation Records

Analytical evaluation examined structure, runtime behaviour and bounded state. The summary distinguishes observed behaviour from content quality and performance guarantees.

`+table('B1','Analytical Evaluation Summary',['Method and scope','Principal result','Important qualification'],[
 ['Static analysis — 14 checks, supported by lint, TypeScript, build and suite verification','Layer separation, validation, learner-scoped persistence and safe error boundaries were supported','An environment-blocked integration attempt passed on unchanged retry. Earlier coverage covered services/database access only'],
 ['Dynamic analysis — 13 workflow cases and 12 browser observations','Creation, adaptation, corrected context, scoped follow-up, Review/Resume and recovery were observed','Two fade/cap cases retained Partial Pass because provider calls were observed indirectly'],
 ['Timing — 15 sequential initial requests across five inquiries','Median 3.331 s, range 2.593–4.640 s','Local initial-generation timing, not load performance or an established service-level target'],
 ['Bounds — 17 deterministic-provider/real-database cases','Stored adaptations remained within rounds 0–2, including competing requests','One race made two provider calls for one accepted write. The state cap is not a cost ceiling']
])+`\n`+table('B2','Illustrative Runtime and Boundary Observations',['Situation','Observed result','Interpretation'],[
 ['High self-report','Fade event, no adaptation or round increment, Finish remains separate','No additional generated support, not evidence of mastery'],
 ['Further support after round two','Response recorded without a third adaptation','The application enforces its stored-round bound'],
 ['Reload an unfinished session','Adaptations, responses and limit feedback restored','Continuity under the inspected conditions'],
 ['Controlled provider failure and recovery','Safe HTTP 502, question retained, successful resubmission after normal configuration restored','Recovery observed without invalid persistence'],
 ['Two competing adaptation requests','One accepted write and one conflict, but two provider calls','Atomic storage does not eliminate duplicated generation work']
]);

groups.C=`## Appendix C. Simulation Results and Content Assessment

The fixed inputs and paths are retained in Appendix A. Live-provider simulation used artificial identities and an isolated database. Technical execution, original content ratings and supplementary bilingual annotations are different assessments and are not pooled.

`+table('C1','Technical Simulation Outcomes',['Outcome','Attempts','Meaning and noticeable example'],[
 ['Technical Pass','44','Expected route/state assertions held. High faded without another output, and support routes persisted within the two-adaptation bound'],
 ['Controlled initial ambiguity','8','Unqualified current/network inquiries returned ambiguity without creating a session. This is not a delivered explanation or content Pass'],
 ['Technical Fail','3','An electric-current path aborted at 52.825 s despite a 20 s configured timer. Biological-cell and programming-inheritance correction attempts returned unchanged interpretations and were rejected']
])+`\nOnly delivered support was content-rated. Fade, cap and unreached steps did not add outputs. The original rubric assessed scientific correctness, contextual relevance, English/Burmese adequacy, explanation beyond translation and adaptation appropriateness. Each applicable dimension received 2 for adequate, 1 for limited/minor issues or 0 for material error/absence. Initial outputs had no adaptation score.

`+table('C2','Original Delivered-Output Content Ratings',['Rating','Outputs','Decision rule'],[
 ['Pass','18','Every applicable dimension scored 2'],
 ['Partial','71','At least one dimension scored 1, with no 0'],
 ['Fail','2','At least one dimension scored 0. The gravity and ion initial outputs contained material Burmese errors']
])+`\n`+table('C3','Selected Examples Across Simulation Paths',['Tested support or boundary','Recorded example','Content or technical judgement'],[
 ['Initial explanation','A photosynthesis output connected light energy, water/carbon dioxide and sugar production in both languages','Original content Pass'],
 ['Another example after Medium','A chloride-ion example used Cl⁻ and explained excess electrons and negative charge','Original content Pass. It did not overwrite the failed initial ion definition'],
 ['Simpler explanation','An ion revision clearly restated electron/proton imbalance','Original content Partial because the revision added little conceptual scaffolding'],
 ['Conceptual clarification','A photosynthesis revision added energy conversion and a factory analogy','Original content Partial. Chemical energy and explanatory vocabulary still needed Burmese support'],
 ['Language help, bilingual preference (SIM-LANG-01)','Electric current was described explicitly as charge per second, but charge/circuit/rate lacked useful Burmese pairing','Original content Partial'],
 ['Language help, English preference (SIM-LANG-02)','The bilingual override worked, but Burmese speed wording conflicted with a later correct charge-per-second statement','Original content Partial'],
 ['Language help, Burmese preference (SIM-LANG-03)','The revision distinguished current from charge, but both languages retained speed-like wording without a clear quantity-per-time explanation','Original content Partial'],
 ['Intended-meaning correction','Cell and inheritance clarifications failed when the returned interpretation did not change','Technical Fail. No delivered correction adaptation was content-rated'],
 ['Fade and cap','High added no generated support. Further support at the cap added an event without round three','Technical behaviour only, not additional content ratings']
])+`\n### C.1 Focused Bilingual Error Assessment

A retrospective, risk-informed sample of 32 saved outputs covered all delivered main concepts, all three language-help cases and selected adaptations. All 104 paired passages were examined using local categories informed by Freitag et al. (2021). The sample was not random or blind. English was a comparison text, not a scientific gold standard. Scientific expectations and persisted text were checked separately. There was no approved Burmese glossary or independent qualified verification of the model-assisted annotations.

`+table('C4','Supplementary Annotation Summary',['Category','Findings','What was assessed'],[
 ['Meaning / accuracy','9','Changed polarity, quantities, rates or qualifiers'],
 ['Terminology','6','Wrong or inconsistent technical equivalents'],
 ['Omission / addition','1','A useful term explanation lost between languages'],
 ['Fluency / script','8','Awkward wording and unintended third-language fragments'],
 ['Accessibility / retention','7','Unexplained English vocabulary in beginner/language-help support'],
 ['Shared content limitation','10','Scientific qualifications missing or unclear in both languages, not translation defects']
])+`\nThe 41 findings comprise four Major annotations in three outputs, 27 Minor annotations and ten shared-content advisories. Major/Minor findings affect 21 selected outputs. Six had no specific issue identified and five had only shared-content advisories. These are not new Pass ratings. The other 59 delivered outputs were outside this assessment.

`;
const notices=[
 ['Gravity, simple definition','BIL-F04','Major. Mass becomes weight','Use ဒြပ်ထု (mass), not weight'],
 ['Gravity, technical definition','BIL-F05','Major. Physical mass becomes a collective/group expression','Use ဒြပ်ထုရှိသော အရာဝတ္ထုများ'],
 ['Ion, technical definition','BIL-F10','Major. Burmese denies the defining nonzero net charge','State that net charge is nonzero, not absent'],
 ['pH, simple definition','BIL-F07','Major under the local passage rule. Chemical neutrality is unclear and conflicts with the correct hint','Use explicit neutral wording and specify the 25 °C condition'],
 ['Current, initial language-help case','BIL-F21','Minor. Charge quantity per second becomes movement speed','Explain charge amount crossing a point per second'],
 ['Current, English-preference language revision','BIL-F26','Minor. Speed terminology remains although a later sentence gives correct units','Use စီးဆင်းနှုန်း with an explicit quantity-per-time explanation'],
 ['Photosynthesis, conceptual revision','BIL-F31','Minor. Meaning survives but a central term lacks a Burmese explanation','Pair chemical energy with ဓာတုစွမ်းအင်'],
 ['Photosynthesis, initial explanation','BIL-F39','Minor omission. Chlorophyll is retained without the green-pigment description','Explain chlorophyll as an အစိမ်းရောင်ရောင်ခြယ်ပစ္စည်း'],
 ['Current, Burmese-preference initial example','BIL-F28','Minor. An Arabic-script fragment interrupts Burmese','Replace the fragment with မီးလုံး လင်းလာသည်။'],
 ['Current, Burmese-preference language revision','BIL-F29','Shared-content advisory. Both languages use speed-like wording','Revise both versions to charge quantity per unit time']
];
const positive=outputs.find(o=>o.id==='BIL-O01').pairs.find(p=>p.field==='explanations.simple');
const positiveEn='capture light energy and store it as sugar';
const positiveMy='အလင်းရဲ့ စွမ်းအင်ကို ဖမ်းယူပြီး သကြားအဖြစ် သိမ်းထားတတ်ပြီး';
assert.ok(positive.en.includes(positiveEn)&&positive.my.includes(positiveMy));
const exampleRows=[['Photosynthesis, initial explanation',positiveEn,positiveMy,'Meaning preserved under focused comparison. Original output Pass','Selected English STEM retention was not automatically treated as an error'],...notices.map(([label,id,finding,direction])=>{const f=annotations.findings.find(f=>f.id===id);assert.ok(f,id);const pair=outputs.find(o=>o.id===f.output)?.pairs.find(p=>p.field===f.field);assert.ok(pair&&pair.en.includes(f.en)&&pair.my.includes(f.my),'Exact persisted paired spans '+id);return [label,f.en,f.my,finding,direction];})];
groups.C+=table('C5','Illustrative English/Burmese Findings',['Example','English excerpt','Burmese excerpt','Assessment','Revision direction'],exampleRows)+`
*Note.* Excerpts are exact saved spans. Revision directions are editorial, not certified terminology or changes to stored outputs. The two gravity annotations belong to one failed output. The pH output remains Partial in the original rubric despite its new local Major annotation. The original 18 Pass, 71 Partial and two Fail totals are unchanged. Shared-source analysis, single-assessor/domain limits and purposeful selection prevent claims of corpus-wide translation accuracy or learner benefit.
`;

groups.D=`## Appendix D. Black-Box Testing Records

Public HTTP/browser checks assessed externally visible behaviour using controlled provider responses. There were 24 cases, with 21 Pass, two Partial and one Fail. The summaries below group observations rather than create additional case totals.

`+table('D1','External Behaviour and Material Qualifications',['Area tested','Illustrative observation','Outcome or limitation'],[
 ['Inquiry and structured support','Valid inquiry created retrievable support. Empty/malformed input was rejected. A 1,000-character inquiry was accepted and 1,001 rejected','Pass within tested inputs'],
 ['Response routes and bounds','High faded, all five optional help routes and skip executed, and requests at the cap added no third adaptation','Default/explicit adaptation cases remained Partial because fixture semantic novelty was unassessed'],
 ['Follow-up and continuity','Relevant answer persisted without changing adaptation state. Unrelated query was rejected. Two questions were allowed, a third rejected. Review/Resume restored stored history','Pass for tested external contracts'],
 ['Preference and error handling','New settings persisted without altering old snapshots. Injected provider/malformed-output failures returned safe errors without invalid writes','Pass, not live-model quality evidence'],
 ['Ownership and absent identity','Foreign sessions were inaccessible, but absent identity returned an anonymous cookie and HTTP 200 empty History rather than expected HTTP 400','One case remains Fail. No foreign-session leak was observed'],
 ['Retained subchecks','An assertion expected remaining-ambiguity support to use no round, but a generated clarification consumed one. Initial browser predicates were later corrected','The failed assertion and earlier observations remain recorded. Rechecks do not erase them']
]);

groups.E=`## Appendix E. White-Box Testing and Coverage

The root application was exercised through 361 deterministic tests and twelve isolated MongoDB tests, giving 373 unique tests. The 39 route/round combinations are included in that total. Repeated commands are not extra tests.

`+table('E1','Structural Areas Exercised',['Area','Representative assertion','Recorded result'],[
 ['Routing and two-adaptation bound','High caused no provider call or increment. Support at the cap created no round three. Optional routes and invalid inputs were checked','Structural group Pass'],
 ['Ownership and lifecycle','Foreign/missing sessions were guarded. Finish was idempotent. Completed sessions rejected further responses. Legacy sessions remained retrievable','Structural group Pass'],
 ['Concept-scoped follow-up','Corrected concept/latest support were used. Unrelated, excessive or overlength requests were controlled without altering adaptation state','Structural group Pass'],
 ['Provider and output contracts','Timeout, refusal, missing text, invalid JSON and invalid structured content failed before invalid persistence','Structural group Pass'],
 ['Persistence and concurrency','Corrections, responses and adaptations were stored consistently. Competing requests respected adaptation/follow-up limits and ownership','Structural group Pass, using real database checks'],
 ['Preferences and language override','Valid settings persisted, invalid writes were rejected, old snapshots remained unchanged and language help could display both languages','Structural group Pass']
])+`\n`+table('E2','Application-Wide V8 Coverage',['Metric','Covered / total','Coverage'],[
 ['Statements','708 / 976','72.54%'],['Branches','627 / 821','76.37%'],['Functions','128 / 200','64.00%'],['Lines','680 / 922','73.75%']
])+`\n*Note.* Coverage spans 42 executable files. Database/browser observations are not added to V8 totals. Passing assertions and coverage support exercised logic, not complete correctness, Burmese fidelity or educational effectiveness. Unexercised paths remain.
`;

groups.F=`## Appendix F. Structured Usability Inspection

Desktop 1440 × 900 and mobile-emulated 390 × 844 viewports, English/Burmese interfaces, light/dark themes and keyboard interaction were inspected. Home, preferences, initial support and Stage 6B covered all eight combinations. Other states were distributed across them. A delayed mock provider exposed pending states without external calls. This was technical inspection, not a participant study.

`+table('F1','Usability Outcomes and Observed Examples',['Criterion','Outcome','Illustrative observation'],[
 ['Task clarity','Pass','Labelled inquiry and keyboard submission made the starting action clear'],
 ['Information structure','Pass','Explanation, example, technical detail, reflection and hint were distinguishable'],
 ['Interaction clarity','Pass','Three self-reports, five optional help choices and skip/back were usable'],
 ['Feedback visibility','Pass','Pending/adapting, fade, cap and completion feedback were visible'],
 ['Navigation consistency','Partial','History/Review/Resume worked, but modal keyboard focus was not controlled'],
 ['Bilingual readability','Pass','Inspected Burmese glyphs and mixed-language content wrapped without material clipping. This was visual, not semantic adequacy'],
 ['State visibility','Pass','Routes, limits and history were distinguishable, with a minor ambiguity-badge inconsistency'],
 ['Error clarity','Partial','Recovery controls worked, but English-only error explanations remained in Burmese UI'],
 ['Consistency','Partial','Modal focus, untranslated errors and the ambiguity badge remained inconsistent']
])+`\n`+table('F2','Material Interface Issues',['Issue','Task effect','Severity'],[
 ['Preference modal did not contain or restore focus','Keyboard navigation reached background controls, requiring extra navigation','2'],
 ['English-only errors in Burmese interface','Recovery meaning was unavailable in the selected language although retry controls worked','2'],
 ['Generic Concept Correction badge during remaining ambiguity','Badge suggested correction, while the trace accurately reported unresolved meaning','1']
])+`\n*Note.* Six criteria were Pass and three Partial. Severity 1 means cosmetic, 2 an impediment with a workaround and 3 task blockage/materially misleading behaviour. Preference-save infrastructure-fault presentation was not assessed. No physical-phone, satisfaction or full accessibility claim follows.
`;

groups.G=`## Appendix G. Photosynthesis Scenario Records

A separate walkthrough examined an integrated session with beginner, guided, Burmese-with-English-term preferences. Fifteen technical checks passed for this one workflow, not fifteen independent scenarios. It ended with two adaptations, four response events, one stored follow-up and completion.

`+table('G1','Scenario Workflow and Observation Boundaries',['Action','Observed result','Boundary'],[
 ['Initial inquiry and hint','Photosynthesis/plant biology and five bilingual support fields were created. Hint was revealed','Browser observation with persisted-state checks'],
 ['Medium, optional help skipped','Another example persisted at round one','Browser action. Example novelty remained limited'],
 ['Needs Support, conceptual clarification','Core meaning and factory analogy revised at round two. Limit and Finish appeared','Browser action. No further response choice was offered'],
 ['Cap and High at cap','Each added a response event without another adaptation or provider call','Separate API checks, not learner clicks. High did not complete the session'],
 ['Relevant/unrelated follow-up','Sunlight question answered and stored. Gravity question rejected without changing the session','Concept-scoped support, not general chat'],
 ['History, Resume, Finish and Review','Stored interaction restored. Finish changed lifecycle. Post-completion response rejected','Browser continuity plus a separate post-completion API check']
])+`\n`+table('G2','Provisional Scenario Content Assessment',['Observation','Qualification'],[
 ['Light energy and material inputs distinguished','Main mechanism corresponded across languages, but bacteria/chloroplast wording could overgeneralise organelle scope'],
 ['Round-two factory analogy clarified making rather than taking food','The first additional example largely repeated earlier support. Analogy use did not establish comprehension'],
 ['Burmese support retained useful STEM terms','Nontechnical English such as root, leaf and raw materials also remained. Chemical energy needed an explicit Burmese explanation'],
 ['Sunlight follow-up explained energy for sugar production','One relevant answer does not establish general scope-classification accuracy']
])+`\nContent remains provisionally Partial. This walkthrough is separate from the original 91-output simulation assessment and does not erase its failures.
`;

groups.H=`## Appendix H. Supporting Conceptual and Design Evaluations

These summaries show how critique, literature, informed argument and scenarios evaluated the artefacts. They are not additional software tests or independent learner studies. Scholarly bases and source-access limits are explained in Sections 2 and 3.

`+table('H1','Conceptual Evaluation Activities',['Activity and scope','Principal finding','Boundary or refinement'],[
 ['GenAI interview — nine fixed questions and 47 coded findings','Requirement coverage and progression beyond translation were recognised. Self-report, decision logic and explanation/scaffold overlap were challenged','Model critique, not expert testimony. Responses informed clearer core-meaning/scaffold roles and bounded re-entry'],
 ['Literature comparison — existing 17-study corpus, 19 findings','Contextual terminology, selective language support and structured assistance were justified in principle','Cross-language/domain transfer and secondary-source limits remain. Exact topology and adaptation rules were not validated'],
 ['Informed argument — seven responsibilities','Terminology identification and core meaning were Conceptually justified. Five responsibilities were Justified with qualification','Tran et al. (2023), Goodhue and Thompson (1995), Sweller (1988), Ji et al. (2024), Kleidermacher and Zou (2026), van de Pol et al. (2010), and Dunlosky and Rawson (2012) support mechanisms and counterarguments, not learner outcomes'],
 ['Historical Photosynthesis illustration','Explanation, bilingual support and check–example–check interaction were illustrated','Trigger, strategy rationale, later transitions and execution provenance were incomplete. The fresh design scenario cannot fill these historical gaps']
])+`\n*Note.* Current conceptual synthesis retains C1 Fully supported for responsibility coverage and C2–C5 Partially supported. The original interview assessed boundary completeness under C4, not the final literature-consistency criterion. Later refinement is not attributed to the original critique.

`+table('H2','Design Informed-Argument Conclusions',['Mechanism examined','Scholarly warrant and counterargument','Conclusion'],[
 ['Terminology/context and intended-meaning repair','Tran et al. (2023) and Goodhue and Thompson (1995). Intended interpretation can remain wrong or uncorrected','Partially supported'],
 ['Selective bilingual language support','Kleidermacher and Zou (2026) and Goodhue and Thompson (1995). Term retention does not guarantee clear Burmese support','Partially supported'],
 ['Core meaning and scaffold forms','Athukorala and De Silva (2025) and van de Pol et al. (2010). Structured content can remain inaccurate or repetitive','Partially supported'],
 ['Optional stated-need collection','van de Pol et al. (2010) and Goodhue and Thompson (1995). A bounded response signal is available, but does not diagnose competence','Supported for stated-need collection only'],
 ['Bounded adaptation and fade','van de Pol et al. (2010). Route/state controls work, but calibrated support and optimal dose are unestablished','Partially supported'],
 ['Concept-scoped follow-up','Goodhue and Thompson (1995), applied to the supporting task. Tested scope is not universal classification accuracy','Supported for the tested scoped mechanism'],
 ['History and preference continuity','Goodhue and Thompson (1995), applied to task continuity. Persistence works, but interface/task-fit limits remain','Partially supported'],
 ['Application-controlled boundaries','Hevner et al. (2004) and Venable et al. (2016). Safe failure does not guarantee successful delivery or content','Partially supported']
])+`\n`+table('H3','Design Literature Comparison Summary',['Rationale rating','Comparisons','Interpretation'],[
 ['Strong','1','The need to critically evaluate specialised/low-resource output was well justified, not the observed quality certified'],
 ['Moderate','9','Native-language assistance, structured explanation, multilingual interaction and adaptive integration had relevant precedents with transfer limits'],
 ['Limited','2','Terminology-identification and workflow evidence did not establish extraction performance or learner fit'],
 ['Contradictory/uncertain','1','Exact High-to-fade and two-adaptation policy lacked pedagogical validation']
])+`\nThe thirteen comparisons included five previously reviewed systems. No comparator was newly executed. Literature rationale, implementation behaviour and educational usefulness remain different claims. Research-question conclusions and their limitations are mapped in Table 5, without a duplicate traceability appendix.
`;

const replacements=[
 ['Interview topics and coded findings are provided in Tables H1–H2.','Interview scope and principal findings are summarised in Table H1.'],
 ['The nineteen recorded literature comparison findings are provided in Table H3.','The conceptual literature comparison is summarised in Table H1.'],
 ['The seven responsibility-level informed arguments and their scholarly basis are provided in Table H4.','The informed-argument summary and scholarly basis are provided in Table H1.'],
 ["The historical scenario's evidence and missing transitions are summarised in Table H7.","The historical scenario's evidence boundaries are summarised in Table H1."],
 ['Tables B1–B5','Tables B1–B2'],['(Tables C1–C4)','(Tables C1–C3)'],['(Tables C5–C7)','(Tables C4–C5)'],['(Tables D1–D2)','(Table D1)'],['(Tables E1–E4)','(Tables E1–E2)'],['(Table H5)','(Table H2)'],['Figure 2, Tables G1–G3','Figure 2, Tables G1–G2'],['(Table H6)','(Table H3)'],['(Tables F1–F3)','(Tables F1–F2)'],
 ['The complete 24-row requirement-to-finding mapping is provided in Table I1.\n\n','']
];
const prefixEnd=before.indexOf('## Appendix B.');
let prefix=before.slice(0,prefixEnd);
for(const [from,to] of replacements){assert.ok(prefix.includes(from),from);prefix=prefix.replace(from,to);}
const target=prefix+Object.values(groups).map(t=>t.trimEnd()).join('\n\n')+'\n';
const mode=process.argv[2];
if(mode==='--patch'){
 const group=process.argv[3];const current=read(paper);
 let start,end,old,next;
 if(group==='body'){start=0;end=current.indexOf('## Appendix B.');old=current.slice(start,end).trimEnd();next=prefix.trimEnd();}
 else {assert.ok(group==='I'||groups[group],group);const heading='## Appendix '+group+'.';start=current.indexOf(heading);assert.ok(start>=0,heading);const following=current.indexOf('\n## Appendix ',start+heading.length);end=following<0?current.length:following;old=current.slice(start,end).trimEnd();next=groups[group]?.trimEnd()??'';}
 console.log('*** Begin Patch\n*** Update File: '+paper+'\n@@\n'+old.split('\n').map(l=>'-'+l).join('\n')+(next?'\n'+next.split('\n').map(l=>'+'+l).join('\n'):'')+'\n*** End Patch');
}else if(mode==='--verify'){
 const current=read(paper);assert.equal(current.trimEnd(),target.trimEnd(),'Exact editorial assembly');
 const count=s=>(s.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/https?:\/\/\S+/g,'').match(/[\p{L}\p{N}]+(?:[’'\-][\p{L}\p{N}]+)*/gu)||[]).length;
 const appendixA=s=>s.split('## Appendix A.')[1].split('## Appendix B.')[0];assert.equal(appendixA(current),appendixA(before),'Appendix A unchanged');
 const section=(s,h)=>s.split(h+'\n')[1].split(/^## /m)[0];for(const h of ['## Abstract','## Keywords','## References'])assert.equal(section(current,h),section(before,h),h);
 const mainTable=(s,id)=>s.split('**Table '+id+'.')[1].match(/\|[^\n]+\n(?:\|[^\n]+\n?)+/)[0];for(let i=1;i<=5;i++)assert.equal(mainTable(current,i),mainTable(before,i),'Main table '+i);
 const captions=[...current.matchAll(/^\*\*Table ([A-H]\d+)\./gm)].map(m=>m[1]);assert.equal(captions.length,20);assert.equal(new Set(captions).size,captions.length);
 const mentioned=[...current.matchAll(/\bTable ([A-I]\d+)\b|\bTables ([A-I])(\d+)–(?:[A-I])?(\d+)/g)].flatMap(m=>m[1]?[m[1]]:Array.from({length:Number(m[4])-Number(m[3])+1},(_,i)=>m[2]+(Number(m[3])+i)));
 for(const id of mentioned)assert.ok(captions.includes(id),'Missing table '+id);assert.ok(!current.includes('Appendix I.')&&!current.includes('Table I1'));
 assert.equal((current.match(/^!\[/gm)||[]).length,2);
 let width=null;for(const line of current.split('\n')){if(!line.startsWith('|')){width=null;continue;}const n=line.split(/(?<!\\)\|/).length;if(width===null)width=n;else assert.equal(n,width,line.slice(0,90));}
 const bilInput=JSON.parse(read('evaluation/02_design/simulation/bilingual_assessment/input.json'));
 for(const r of bilInput.originalEvidenceEntries)assert.equal(fileHash(r.path),r.hash,r.id);
 for(const [p,h] of Object.entries({...bilInput.productionHashes,...bilInput.sourceHashes}))assert.equal(fileHash(p),h,p);
 assert.equal(fileHash('evaluation/03_results/evidence_register.csv'),bilInput.originalRegisterHash);
 assert.equal(fileHash('evaluation/03_results/master_results.csv'),bilInput.masterResultsHash);
 assert.equal(fileHash('evaluation/03_results/pirqoa_traceability.csv'),bilInput.traceabilityHash);
 const prose=s=>s.split('\n').filter(l=>!/^#{2,4} |^\||^\*\*(Table|Figure) |^\*Note\.\*|^!\[/.test(l)).join('\n');
 const report={revisionId:'APPENDIX-SUMMARY-01',reviewDate:'5 October 2026, Pacific/Auckland',previousPaperCommit:previousCommit,previousPaperHash:hash(before),paperHash:fileHash(paper),previousAppendixWords:count(before.slice(before.indexOf('## Appendix A.')).replace(/^#{2,4} .+$/gm,'')),currentAppendixWords:count(current.slice(current.indexOf('## Appendix A.')).replace(/^#{2,4} .+$/gm,'')),abstractWords:count(section(current,'## Abstract')),designProseWords:count(prose(section(current,'## 3. Design Artefact Evaluation'))),resultsProseWords:count(prose(section(current,'## 4. Results and Interpretation'))),appendixTables:captions.length,totalTables:captions.length+5,appendixAUnchanged:true,mainTablesUnchanged:true,bilingualExamplesExact:true,exactSpanFindings:notices.map(r=>r[1]),originalEvidencePreserved:bilInput.originalEvidenceEntries.length,productionFilesPreserved:Object.keys(bilInput.productionHashes).length,originalResultRows:225,originalTraceabilityRows:24,simulationAttempts:55,originalContentRatings:{Pass:18,Partial:71,Fail:2},supplementaryAnnotations:{Major:4,Minor:27,Advisory:10},whiteBoxUniqueTests:373,blackBoxOutcomes:{Pass:21,Partial:2,Fail:1},usabilityOutcomes:{Pass:6,Partial:3},currentHashes:Object.fromEntries([paper,'evaluation/04_paper/appendix_summary_revision.md','evaluation/04_paper/rubric_review_and_word_handoff.md','evaluation/04_paper/raw/build_appendix_summaries.mjs','evaluation/00_protocol/evaluation_protocol.md','docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md','evaluation/02_design/simulation/bilingual_assessment/annotations.json'].map(p=>[p,fileHash(p)])),applicationTestsRerun:false,WordLayoutChecked:false,independentHumanAssessment:false,failures:[]};
 if(process.argv.includes('--save'))fs.writeFileSync('evaluation/04_paper/raw/APPENDIX-SUMMARY-01-verification.json',JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
}else throw Error('Use --patch body|B|C|D|E|F|G|H|I or --verify [--save]');
