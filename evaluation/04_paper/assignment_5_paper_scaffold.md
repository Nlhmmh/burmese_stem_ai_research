# Assignment 5 paper scaffold

Prepared: 3 October 2026. Step 25 / `STRUCTURE-20261003-PAPER-01`.
Status: **Structure and evidence placement complete; prose not drafted.**

This editable scaffold follows master-plan §34. E073 indexes this file and
E074 its [integrity manifest](../03_results/raw/STRUCTURE-RUN-01-manifest.sha256).
The two figures and five tables reuse [E069's presentation pack](../03_results/paper_figures_and_tables.md)
with its captions, notes, native outcomes and qualifications intact. Figure
assets are linked in place, not copied. No new evaluation, endorsement,
literature appraisal, outcome grading or production change occurs here.

**How to use:** Apply Step 26's word allocation before replacing the bracketed
prose placeholders. Quoted drafting notes below are instructions, not paper
prose; remove them and this document-control preface from the submission.
Keep captions/notes and cite the underlying scholarly sources in the prose.
R IDs resolve to [225 immutable results (E061)](../03_results/master_results.csv);
E IDs resolve to the [evidence register](../03_results/evidence_register.csv).
Use [E067's claim boundaries](../03_results/results_interpretation.md) throughout.
The original Assignment 5 brief still requires a final requirements check.
Word/PDF layout, final word count and complete APA 7 audit are not verified.

Do not paste restricted cookie-bearing captures into the paper or clear them
for publication. This file is a local drafting aid, not a submission-ready paper.
The preface, source guidance and administrative records are not research findings.

## Title

[Pending — finalise in Step 27 after the body; maximum ten words.]

## Abstract

[Pending — finalise in Step 27 after the body; maximum 150 words.]

## Keywords

[Pending — finalise in Step 27; maximum five keywords.]

## 1. Evaluation Context

[Draft pending — research problem, PIRQOA summary, selected conceptual/design
artefacts, evaluation objective, and brief methods overview.]

> Drafting note: Use protocol §3 and E064 for the three problem/requirement/RQ
> chains. Identify the Assignment 3 conceptual framework and Assignment 4 PoC.
> Distinguish original conceptual inputs, E056 §26 refinement, frozen B01
> production commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`, and ROOTTESTS-02's
> separate root-project test profile. State the evaluation scope, not a new
> prevalence estimate. Controlled technical evidence is not naturalistic learner
> effectiveness (Venable et al., 2016).

Sources: [protocol §3](../00_protocol/evaluation_protocol.md#3-pirqoa-and-artefact-traceability),
[B01 identity](../00_protocol/b01_artefact_versions.md),
[PIRQOA notes E065](../03_results/pirqoa_traceability_notes.md).

## 2. Conceptual Artefact Evaluation

[Draft pending — short introduction to the conceptual evaluation.]

### 2.1 Artefact Selection and Evaluation Criteria

[Draft pending — justify the artefact choice and introduce the five criteria
and four complementary methods; refer to Figure 1 and Table 1.]

> Drafting note: Separate the original diagram from subsequent refinement.
> C1 concerns responsibility coverage, not unique necessity of exactly seven
> stages. Do not describe the old diagram as already containing 6A/6B, fade,
> current routes or the implementation's stored-round policy.

![Original Assignment 3 seven-stage framework, reproduced unchanged](../03_results/paper_assets/figure_1_framework.png)

**Figure 1. Selected Context-Aware Adaptive STEM Scaffolding Framework.**
Reproduced unchanged from the supplied Assignment 3, Artefact 3, Figure 3,
PDF page 7. Seven responsibilities connect terminology, context, language,
concept explanation, scaffolding, learner response and support adaptation.

*Note.* This is the original topology, not a retrospectively redrawn Assignment
3 artefact. Assignment 5's final interpretation is E056 §26: Stage 6 is
self-reported support need; Stage 7 may revisit language/core meaning or
terminology/context where required, beyond the original drawn Stage 7 → 5
arrow. The PoC's 6A/6B subdivisions, deterministic routes, High-to-fade,
two-round maximum and explicit Finish are implementation refinements explained
in the paper, not labels present in the original image. There is no eighth
stage or implication of one LLM call per stage. TTF motivates task alignment,
not measured learner fit (Goodhue & Thompson, 1995); scaffolding provides a
critical benchmark, not a claim of demonstrated learning (van de Pol et al., 2010).

Source: [original Assignment 3](../../docs/INFOSYS_720_Assignment_3.pdf),
[refined framework E056 §26](../01_conceptual/framework_refinements.md#26-frozen-refined-framework-for-assignment-5),
[current argument E058/E059](../01_conceptual/informed_argument/traceability_v2.md).
The retained crop contains only the original diagram; its source hash, page,
render/crop command and visual inspection are recorded in the intake metadata.

**Table 1. Conceptual Artefact Evaluation Criteria and Methods**

| Criterion | Method | Evidence | RQ mapping |
| --- | --- | --- | --- |
| C1 — PIRQOA coverage: explicit responsibility for each requirement | CA-GAI, CA-LIT, CA-ARG, CA-SCN | E049–E056, E058–E059; R001 | RQ1, RQ2, RQ3 |
| C2 — Logical coherence: dependencies, feedback decisions and justified re-entry | CA-GAI, CA-ARG, CA-SCN | E049–E050, E054–E056, E058–E059; R002 | RQ1, RQ2, RQ3 |
| C3 — Theoretical consistency: task alignment, contingency/fading and self-report boundary | CA-LIT, CA-ARG, CA-GAI | E049–E052, E055–E056, E058–E059; R003 | RQ1, RQ2, RQ3 |
| C4 — Literature consistency: direct/transferable support, mismatch and unsupported assumptions | CA-LIT, triangulated with CA-GAI | E049–E052, E057–E059; R004 | RQ1, RQ2, RQ3 |
| C5 — Scenario applicability: stage inputs, decisions, support and unresolved transitions | CA-SCN, CA-ARG | E054–E056, E058; R005 | RQ1, RQ2, RQ3 |

*Table 1 note.* Criteria/methods are condensed from protocol §5.2, not new
acceptance rules. Evidence includes performed source methods and later
refinement/current argument; their temporal identities remain distinct.
Original GENAI-01 C4 means completeness/boundary clarity, **not** protocol
literature consistency. E057's crosswalk applies; its original response is not
treated as a direct C4 literature appraisal. The GenAI model did not browse.
CA-ARG v2 strengthens scholarly reasoning but does not retroactively expose
the refined framework to the original interview. All RQs are coverage
contributions, not declarations of empirical success.

### 2.2 GenAI Interview

[Draft pending — input, fixed questions, model/settings as recorded, key critique,
coding method, and limitations.]

> Drafting note: R013–R017/E049–E050 are the original nine-question no-browse
> interview, not an independent expert review of the refined implementation.
> Preserve the UI-reported model/version limits and E057's historical C4
> crosswalk. Self-reported confidence is not established certainty.

Sources: [raw interview E049](../01_conceptual/genai/GENAI-01_interview.md),
[coded analysis E050](../01_conceptual/genai/GENAI-01_analysis.md),
[audit/crosswalk E057](../03_results/evidence_register_audit.md).

### 2.3 Academic Literature Evaluation

[Draft pending — retained Assignment 2 corpus, criterion mapping, supporting
and conflicting findings, and transfer/source-access limits.]

> Drafting note: R018–R036/E051–E052 retain nineteen native findings. This is
> use of the supplied corpus, not a new systematic search. Cite studies for
> the precise mechanism or limitation, not as proof of Burmese effectiveness
> or the exact route/cap design.

Sources: [conceptual literature matrix E051](../01_conceptual/literature/literature_matrix.csv),
[synthesis E052](../01_conceptual/literature/literature_synthesis.md).

### 2.4 Informed Argument

[Draft pending — cited warrant → design mechanism → removal test →
counterargument → qualified conclusion for the selected responsibilities.]

> Drafting note: Use the current v2 argument (R006–R012/E058–E059), retaining
> E053's historical identity. Two responsibilities are Conceptually justified;
> five are Justified with qualification. Hevner et al. (2004, p. 86, Table 2)
> supply the evaluation-method warrant. Goodhue and Thompson (1995) motivate
> task alignment, not a validated local fit scale. Van de Pol et al. (2010)
> provide a critical scaffolding benchmark, not proof that self-report equals
> diagnosed competence. Each substantive IS argument needs its literature
> reference and transfer/access limitation.

Sources: [current conceptual argument E058](../01_conceptual/informed_argument/traceability_v2.md),
[verified references/limits E059](../01_conceptual/informed_argument/reference_verification_v2.md).

### 2.5 Scenario Evaluation

[Draft pending — historical supplied Photosynthesis interaction, responsibilities
it illustrates, and transitions not demonstrated by that record.]

> Drafting note: E054 is the historical conceptual scenario, not the fresh
> B01 scenario in §3.5. Retain its missing exact response trigger, second
> adaptation, cap/fade, follow-up answer and lifecycle/commit/model/date
> evidence. Do not fill those gaps from E042 as if originally observed.

Source: [historical conceptual scenario E054](../01_conceptual/scenario/photosynthesis_scenario.md).

### 2.6 Triangulation, Refinement, and Conceptual Evaluation Summary

[Draft pending — compare convergent/divergent findings, explain accepted,
qualified, rejected and deferred refinements, and state the bounded conclusion.]

> Drafting note: Use R001–R005's current conceptual synthesis, R037–R061's
> historical triangulation and R062–R079's refinement decisions without
> pooling scales or treating derived/shared sources as independent methods.
> C1 is Fully supported for responsibility coverage; C2–C5 remain Partially
> supported. The optional expert interview was Skipped.

Sources: [triangulation E055](../01_conceptual/conceptual_triangulation.md),
[refinement decisions E056](../01_conceptual/framework_refinements.md),
[interpretation E067](../03_results/results_interpretation.md).

**Table 2. Conceptual Artefact Evaluation Results**

| Method / object | Recorded finding | Qualification / counterevidence | Result and evidence |
| --- | --- | --- | --- |
| CA-GAI — original nine-question interview | C1 Fully covered; C2/C3 Acceptable with minor issues; historical C4 Mostly complete; C5 Applicable with minor issues | One no-browse model critique of the supplied original framing. Self-reported confidence is not certainty, expert validation or learner evidence; stage/decision underspecification remains | R013–R017; E049–E050, E057 |
| CA-LIT — retained Assignment 2 corpus | Terminology/context, bilingual explanation and structured/adaptive support have literature relationships; nineteen findings retain their native support labels | Transfer across languages/domains; exact routes, topology and cap not directly validated. No fresh SLR and no Burmese-specific effectiveness rate | R018–R036; E051–E052 |
| CA-ARG — current literature-grounded v2 | Target identification and core meaning Conceptually justified; other five responsibilities Justified with qualification | Cited warrant → mechanism → removal test → counterargument. Local TTF fit, self-report contingency and exact language/route choices remain design inferences | R006–R012; E056, E058–E060 |
| CA-SCN — historical supplied Photosynthesis interaction | Core explanation, structured support and check–example–check sequence instantiate the responsibilities | Exact selected response/trigger, second adaptation, fade/cap, follow-up answer and lifecycle evidence are missing; not a B01 execution or learner experiment | R005; E054–E057 |
| Current conceptual synthesis — derived, not a fifth independent method | C1 Fully supported for responsibility coverage; C2–C5 Partially supported | A defensible refined framework, not a uniquely necessary seven-stage topology, validated fit scale or educational-effectiveness finding. Shared sources are not independent replications | R001–R005; E056–E059; interpretation E067 |

*Table 2 note.* Native method judgements are retained rather than averaged.
Historical triangulation (R037–R061) and refinement decisions (R062–R079) are
derived analyses, not extra independent methods. Hevner et al. (2004, p. 86,
Table 2) warrant literature-grounded informed argument; the implemented
mechanisms are project inferences. Goodhue and Thompson (1995) and van de Pol
et al. (2010) motivate task alignment and a demanding scaffolding benchmark.
No competence diagnosis, calibrated fading or responsibility transfer was
measured. E059/E040 retain abstract/excerpt/full-text access and version limits.

## 3. Design Artefact Evaluation

[Draft pending — introduce B01 and the distinction between structural,
live-provider, content-review and technical-inspection evidence.]

### 3.1 FURPS Functionality and Usability Criteria

[Draft pending — operationalisation and criteria, referring to Table 3.]

> Drafting note: This evaluation scores Functionality and Usability, not all
> five FURPS dimensions. Protocol 2.1 remains the oracle. All thirteen F
> criteria are Partial; U criteria have six Pass and three Partial. A narrow
> mechanical claim can be strongly supported without promoting its composite
> criterion to Pass.

Source: [protocol §5](../00_protocol/evaluation_protocol.md).

**Table 3. FURPS Functionality and Usability Criteria**

| Criterion | Evaluation focus | Recorded checks | RQ contribution |
| --- | --- | --- | --- |
| F1 — Inquiry handling | Valid initialisation; controlled rejected input | BB01/02/20, WB04, dynamic retrieval | RQ1–3, enabling |
| F2 — Terminology/context | Intended STEM meaning; explicit ambiguity/repair | BB03/08, SIM13–16, exact-output review | RQ1 |
| F3 — Bilingual support | Preference/override and useful term retention without material mistranslation | BB04/08, simulation content review, WB06 | RQ1 |
| F4 — Structured support | Meaningful explanation/example/technical/reflection and revealable hint | BB05, simulation/scenario, WB04 | RQ2 |
| F5 — Learner response | Three self-reports; optional five help choices; valid event/input combinations | BB06–08/23, WB01, persisted events | RQ3 |
| F6 — Adaptive support | Deterministic route and meaningful change; High fades | BB06–10, WB01, simulation/content review | RQ1–3, route-dependent |
| F7 — Adaptation bound | Stored rounds 0–2; no third adaptation; event/state consistency | BB09–11/24, bounds, WB01/05, real DB concurrency | RQ3 |
| F8 — Scoped follow-up | Current context, unrelated-topic boundary, 500 characters and two questions | BB12/13/21, WB03, stored follow-ups | RQ3 |
| F9 — Persistence | Durable content/events/interpretation/follow-ups and atomic updates | BB09–16, WB05, dynamic/bounds retrieval | RQ3, enabling |
| F10 — Learning History | Owned sessions, newest-first, accurate state | BB14/22, UI/API ownership | RQ3, enabling |
| F11 — Review/Resume | Reconstruct stored state; preserve completion and bounds | BB15/16/24, WB02, scenario | RQ3, enabling |
| F12 — Preferences | Valid persistence, rejected inputs, original session snapshots | BB04/17, WB06, UI/reload | RQ1/RQ3, enabling |
| F13 — Error handling | Stable controlled faults/recovery and no invalid content writes | BB02/18–24, WB02–04, injected faults/UI | RQ1–3, enabling |
| U1 — Task clarity | Inquiry purpose and entry evident | Structured inspection, Home and keyboard | RQ1–3, enabling |
| U2 — Information structure | Explanation areas and hint distinguishable | Initial/adapted/follow-up hierarchy | RQ2, enabling |
| U3 — Interaction clarity | Stage 6A/6B, skip/back and consequences clear | Three responses, all choices, keyboard | RQ3, enabling |
| U4 — Feedback visibility | Pending/adapting and updated support visible | Loading, routes, fade/cap and recovery | RQ3, enabling |
| U5 — Navigation consistency | Inquiry/History/Review/Resume/preferences reachable | Navigation and modal focus | RQ3, enabling |
| U6 — Bilingual readability | Legible glyphs/wrapping without clipping | Viewports/locales/themes and overrides; semantics separate | RQ1/RQ2, enabling |
| U7 — State visibility | Self-report, route, limits and completion distinguishable | Status/round/event/interpretation displays | RQ3, enabling |
| U8 — Error clarity | Understandable localised error and recovery action | Failure/retry/scope/ownership inspection | RQ1/RQ3, enabling |
| U9 — Consistency | Labels and interaction patterns across configurations | Locale/theme/width and keyboard matrix | RQ1–3, enabling |

*Table 3 note.* Condensed protocol §5.3–5.4 criteria; the full protocol remains
the oracle. FURPS is operationalised here as **Functionality and Usability**,
not all five dimensions independently scored. Provider, reliability and timing
observations inform the specified checks but do not create new P/R/S grades.
Results remain F1–F13 all Partial (R080–R092); U1–U9 six Pass/three Partial
(R093–R101). U6 is visual-only; self-report is not mastery. Technical inspection
is not a participant study or full WCAG conformance audit.

### 3.2 Analytical Evaluation

[Draft pending — briefly distinguish static inspection, runtime observation,
and deterministic bounds analysis.]

#### 3.2.1 Static Analysis

[Draft pending — scope, commands/inspection method, key structural findings,
blocked first attempt and unchanged permitted retry.]

> Drafting note: R102–R115/R215 and E001–E003. Do not reuse freeze checks as
> the formal run, erase STA-04's first Blocked attempt or call the earlier
> service/DAO coverage a full-project report.

Source: [formal static cases/results](../02_design/static/static_analysis_test_cases.md).

#### 3.2.2 Dynamic Analysis

[Draft pending — observed state/persistence/recovery workflow and scoped timings.]

> Drafting note: R116–R128/R225 and E004–E013. DYN-05/06 retain indirect-count
> Partial Pass. Explain DYN-10's retained driver-error adjudication. Fifteen
> successful local sequential initial timings (median 3.331 s) are descriptive,
> not an SLA/load benchmark. The manual 12-screen pass is technical observation.

Source: [dynamic cases/results and manual pass](../02_design/dynamic/dynamic_analysis_test_cases.md).

#### 3.2.3 Optimisation / Bounds Analysis

[Draft pending — boundary/concurrency tests, High-to-fade and cap findings,
and the limited meaning of optimisation.]

> Drafting note: R129–R145/E014–E017: 17 deterministic-provider/real-DB cases
> Pass. BND-15 has two provider calls but one accepted write. This verifies
> a stored-state bound, not a cost ceiling or an optimal pedagogical dose.

Source: [bounds analysis](../02_design/optimisation/bounds_analysis.md).

### 3.3 Simulation

[Draft pending — fixed scenarios, provider/dependency mode, technical delivery
findings and separately endorsed content judgements.]

> Drafting note: R198–R205/E018–E023: 55 attempts, with 44 technical Pass,
> eight controlled no-session ambiguities and three technical Fail. Separately,
> 91 delivered-output ratings have 18 Pass, 71 Partial and two Fail. Retain
> SIM05-C's 52.825 s abort, SIM-CM-13/16 unchanged-correction rejection,
> gravity mass/weight and ion net-charge errors. AI-assisted worksheets
> endorsed by the researcher are not independent expert or participant data.

Sources: [simulation analysis](../02_design/simulation/simulation_analysis.md),
[content-review qualification](../02_design/simulation/qualified_human_judgement.md),
[researcher endorsement record](../02_design/simulation/review_completion/approval_record.md).

### 3.4 Black-Box and White-Box Testing

[Draft pending — contrast public behaviour and internal control/state evidence;
report counts, coverage scope and unresolved assertions separately.]

> Drafting note: R153–R176/R216–R217, E024–E027: 24 assessed black-box cases,
> 21 Pass/two Partial/one Fail. BB07/08 fixture novelty is Not assessed; BB22
> fails the missing-identity oracle (proxy provisions identity), not an observed
> foreign-session leak. Supplemental zero-round ambiguity assertion remains
> Fail. R146–R152/E033–E035: WB01–06 structural Pass, 373 unique tests
> (361 deterministic + 12 real MongoDB), with root-project 42-file V8 coverage.
> Repeated commands are not additional unique tests; coverage is not content
> quality or learning evidence. Do not reference retired snapshot runs.

Sources: [black-box cases/results](../02_design/black_box/black_box_test_cases.md),
[white-box evaluation](../02_design/white_box/white_box_evaluation.md),
[root-project test run](../02_design/white_box/root_project_test_run.md).

### 3.5 Informed Argument and Scenario

[Draft pending — literature-grounded design argument and the distinct fresh
Photosynthesis walkthrough, referring to Figure 2.]

> Drafting note: R177–R184/E039–E041 have two Supported/six Partially supported
> feature arguments. Cite the mechanism warrant and counterargument rather
> than defend the design by assertion. R206–R211/E042–E044 describe one fresh
> live B01 scenario: technical checks Pass, content provisional Partial with
> scope/retention/novelty concerns. Distinguish browser actions from API-only
> cap/High-at-cap/completed-response checks. No new human endorsement.

Sources: [design informed argument E039](../02_design/informed_argument/traceability.md),
[source verification E040](../02_design/informed_argument/reference_verification.md),
[fresh scenario E042](../02_design/scenario/photosynthesis_scenario.md).

![Recorded Photosynthesis flow with browser actions and separately labelled API-only checks](../03_results/paper_assets/figure_2_photosynthesis_flow.svg)

**Figure 2. Photosynthesis Scenario Evaluation Flow.** Reconstruction of
`RUN-B01-20261003-SCENARIO-02` from retained HTTP, provider, state and browser
records (E042–E044; R206). Solid arrows follow the recorded sequence. Dashed
boundaries identify separately executed API-only checks, not learner clicks.
Stages 1–5 are responsibilities within one initial generation, not five calls.

*Note.* The learner actions are scripted technical observations. At round 2
the UI does not offer another response or High; API-only requests add the
third capped and fourth fade events before reload and follow-up. High does
not complete the session. The unrelated gravity question is rejected without
saving a second follow-up or changing the active concept. Resume, explicit
Finish and Review reconstruct the same session. Its content remains
provisional and the timing observations do not establish performance targets.
History, follow-up and lifecycle are enabling interactions, not an eighth stage.

Figure source: [recorded scenario, actions/state trail](../02_design/scenario/photosynthesis_scenario.md#3-expected-and-actual-scenario-actions).
The SVG contains editable text/shapes; the adjacent PNG is a rendered insertion
copy of the same SVG, not independent evidence. Their identities and visual
check are recorded in the Step 24 manifest/intake.

### 3.6 Academic Literature Evaluation

[Draft pending — capability comparison with the retained SLR/SSR sources,
support levels, contradictory evidence and transfer limitations.]

> Drafting note: R185–R197/E045–E048: thirteen comparisons, one Strong,
> nine Moderate, two Limited and one Contradictory/uncertain. DL12's Strong
> warrants critical evaluation, not strong PoC content. DL13 does not validate
> the exact dose/fade policy. This selected five-system SSR comparison is
> not a fresh systematic review, universal novelty or superiority finding.

Sources: [design literature matrix E045](../02_design/literature/literature_matrix.csv),
[synthesis E046](../02_design/literature/literature_synthesis.md),
[source-access/version limits E047](../02_design/literature/reference_verification.md).

### 3.7 Design Evaluation Summary

[Draft pending — synthesise tested mechanics, partial content/delivery and
technical usability, preserving the method-specific outcomes in Table 4.]

> Drafting note: Integrate §18.1's structured usability inspection here:
> R093–R101/R212–R214/R218–R221, E036–E038. U5/U8/U9 are Partial. Preserve
> modal-focus and English-error severity 2, generic correction-badge severity 1,
> and the unassessed preference-save fault UI. Distributed desktop/mobile
> viewport/locale/theme/keyboard checks are not participant, physical-phone
> or full WCAG evaluation. Do not pool unlike method denominators.

Source: [structured usability inspection](../02_design/usability/usability_inspection.md).

**Table 4. Design Artefact Evaluation Results**

| Method | Recorded result | Material qualification / failure | Result and evidence |
| --- | --- | --- | --- |
| Static analysis | Formal STA-01–14 inspections/checks recorded; dependency and layer/validation contracts traced | First STA-04 integration attempt Blocked by environment; unchanged permitted retry passed. Original coverage was services/DAO, not full-project coverage. Inspection is not runtime content validation | R102–R115, R215; E001–E003 |
| Dynamic analysis | DYN-01–13 workflow/persistence/recovery observations and manual 12-screen pass recorded. Fifteen initial timings: 2.593–4.640 s; median 3.331 s | DYN-05/06 retain indirect-count Partial Pass; DYN-10 driver property-path error adjudicated without erasing original. Local sequential timings are descriptive, not SLA/load evidence | R116–R128, R225; E004–E013 |
| Bounds analysis | All 17 deterministic-provider/real-DB cases Pass; fade/cap/lifecycle and stored atomic bounds exercised | BND-15: two provider calls, one accepted write. Stored bound is not a provider-cost ceiling or pedagogically optimal dose | R129–R145; E014–E017 |
| Simulation | 55 attempts: 44 technical Pass, eight controlled initial ambiguities, three technical Fail. Separate 91 delivered-output ratings: 18 Pass, 71 Partial, two Fail | SIM05-C abort observed at 52.825 s; SIM-CM-13/16 unchanged corrections rejected. Endorsed gravity mass/weight and ion net-charge errors remain. No-session/dependent unreached steps are not successful delivery; no learner effect | R198–R205; E018–E023 |
| Black-box | 24 assessed cases: 21 Pass, two Partial, one Fail; public HTTP/browser/state evidence retained | BB07/08 fixture novelty Not assessed. BB22 missing-identity 400 oracle contradicts actual proxy 200/provisioned identity; Fail retained, not an observed foreign leak. Supplemental zero-round ambiguity assertion also Fail | R153–R176, R216–R217; E024–E027 |
| White-box | WB01–06 structural Pass; 361 deterministic + 12 real-MongoDB tests. 42-file V8: statements 72.54%, branches 76.37%, functions 64%, lines 73.75% | 373 unique tests, not extra tests per repeated command. ROOTTESTS-02 production remains B01. Coverage excludes unexercised paths; browser/database observations not merged into V8; mocks do not certify live quality | R146–R152; E033–E035 |
| Structured usability inspection | Nine criteria: six Pass, three Partial; 133 retained captures across distributed configurations | U5/U8/U9 Partial. USI-01 modal focus and USI-02 English errors in Burmese UI severity 2; USI-03 ambiguity badge severity 1. Preference-save fault UI Not assessed; no participants/physical-phone/full WCAG study | R093–R101, R212–R214, R218–R221; E036–E038 |
| Design informed argument | Eight feature arguments: two Supported, six Partially supported | Literature-grounded mechanism rationale, not learner outcomes. Shared technical/literature inputs are not independent replications; self-report responsiveness is not calibrated scaffolding | R177–R184; E039–E041 |
| Fresh Photosynthesis scenario | One live walkthrough: 15 technical checks Pass; two adaptations, four response events, one stored follow-up, completed round 2 | Cap/High-at-cap/post-completion checks are API-only. Content provisional with scope, English-retention and novelty qualifications; no new human endorsement | R206–R211; E042–E044 |
| Design literature comparison | 13 comparisons: one Strong, nine Moderate, two Limited, one Contradictory/uncertain | Five SSR systems and selected corpus; source-access/transfer limits. DL12 Strong warrants critical evaluation, not strong PoC content; DL13 does not validate dose/fade. No superiority claim | R185–R197, R223; E045–E048 |

*Table 4 note.* The first six rows fulfil the required method summary; the
remaining four retain completed supplementary evaluation rather than omitting
its limits. Scales and denominators differ and are not pooled into a success
rate. Controls converge on narrow state/safety properties (E067 INT-01–06);
content and overall RQ support remain partial. Later successful runs do not
erase earlier failures. Expert interviews were Skipped (R220), not replaced
by GenAI critique or AI-assisted endorsed worksheets. Evaluation in controlled
settings does not establish naturalistic learner utility (Venable et al., 2016).

## 4. Results and Interpretation

[Draft pending — short introduction to cross-artefact interpretation.]

### 4.1 Consolidated Results

[Draft pending — strongest bounded mechanical findings, partial content and
delivery findings, and defensible conceptual support.]

> Drafting note: E061–E063 preserve 225 results. Organise around E067 INT-01–17,
> not a catalogue of repeated tests. Cite converging methods without counting
> shared sources/derivatives as independent replications. Preserve failures,
> historical attempts and native scales. Hash verification establishes identity,
> not correctness or permission to publish.

Sources: [master results E061](../03_results/master_results.csv),
[consolidation rules E062](../03_results/consolidation_notes.md),
[interpretation E067](../03_results/results_interpretation.md).

### 4.2 PIRQOA / RQ Traceability

[Draft pending — answer each RQ through its problem, requirement, artefact,
criteria, evidence and remaining gap, referring to Table 5.]

> Drafting note: All three RQs are Partially supported overall. E064 retains
> the full 24-row traceability matrix. REQ IDs are local tracking labels;
> criterion coverage does not establish complete requirement satisfaction.

**Table 5. PIRQOA Evaluation Traceability**

| Problem / issue | Requirement, RQ and objective | Artefact / responsibilities | Criteria | Recorded support and remaining gap | Trace |
| --- | --- | --- | --- | --- | --- |
| English STEM terminology, limited Burmese resources and misleading literal translation; insufficient contextual language support | REQ-01 / RQ1: identify specialised terms and provide contextual Burmese support while retaining useful English terms. Objective: multilingual STEM terminology support | Refined conceptual framework and B01 PoC; Stages 1–3, bounded Stage 7 repair | C1–C5; F1–F3/F12–F13; U1/U6/U8 | Partially supported overall: target/context interpretation and selective bilingual presentation are instantiated. Intended-sense repair, reliable Burmese terminology and novice suitability remain incomplete; gravity/ion errors and rejected unchanged corrections persist. No validated ATE or measured barrier reduction | E064 rows 1–7; key R001–R008, R080–R082, R200–R205, R210; E019/E021–E023/E042/E056/E058–E059; E067 INT-07/08/11/12 |
| Translation alone insufficient for conceptual support; limited explanation beyond isolated words | REQ-02 / RQ2: provide clear concepts and examples beyond translation. Objective: conceptual STEM explanation | Refined conceptual framework and B01 PoC; Stages 2, 4–5 and bounded Stage 7 revision | C1–C5; F4/F6; U2/U6 | Partially supported overall: explanations, examples, reflection and hints supply structured assistance. Mixed adequacy, material definitions/terminology and limited novelty prevent consistently-correct-support or improved-understanding/retention claims | E064 rows 8–13; key R009–R010, R083, R094, R159–R160, R203–R210, R217; E022–E026/E042/E056/E058–E059; E067 INT-08/11/14 |
| Static/unstructured assistance; insufficient adaptive scaffolding | REQ-03 / RQ3: structured, learner-responsive bounded assistance. Objective: adaptive scaffolding approach | Refined framework and B01 PoC; Stages 5, 6A/6B, 7; scoped follow-up and state continuity enable these responsibilities | C1–C5; F5–F13; U3–U5/U7–U9 | Partially supported overall: stated need drives deterministic routes, stored bounds and continuity in tested paths. Narrow mechanics strongly supported; live failures, BB22 and interface defects remain. No objective mastery, calibrated fading/transfer, optimal dose or learner effectiveness | E064 rows 14–24; key R011–R012, R084–R092, R143–R151, R174, R180–R181, R199–R201, R212–R214, R222; E015/E021/E024–E026/E033–E040/E058–E059; E067 INT-01–06/09/10/13/15–17 |

*Table 5 note.* This is a three-row presentation condensation of E064, not a
replacement for its full 24-row, 13-column matrix or a new assessment. “Rows”
refer to data rows, excluding the CSV header. The trace cell selects key
existing findings; full result/evidence unions remain in E064. Requirements
and objectives are condensed from protocol §3; the three RQs are:

1. RQ1: How can specialized English STEM terminology be supported for Burmese-speaking learners?
2. RQ2: How can LLM-based support help learners understand STEM concepts beyond translation?
3. RQ3: How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?

Local REQ IDs are evaluation-tracking labels, not original assignment labels.
Problem statements are the supplied motivation, not a new prevalence estimate.
Criterion coverage and complete traceability do not establish full requirement
satisfaction. Hashes establish identity, not content correctness or public release.

### 4.3 What the Evaluation Does and Does Not Show

[Draft pending — limitations, unresolved contradictions, assessment modes,
source/transfer limits, and unsupported claims.]

> Drafting note: E067 §§5–9 distinguish strong bounded mechanics, partial
> findings, conceptual warrants and unsupported effects. Retain R220–R224:
> expert work Skipped; participant learning/usability and full accessibility
> not run; mastery, calibrated fading/transfer, optimal dose and validated fit
> not measured; superiority/universal novelty not assessed. Self-reported
> support need is not objective understanding. One successful scenario does
> not erase simulation failures. FURPS, GenAI critique and coverage cannot
> establish learning gains or uniformly correct Burmese/STEM content.

Source: [claim categories, conflicts and limits E067](../03_results/results_interpretation.md).

## 5. Conclusion

[Draft pending — bounded contribution, qualified answers to the three RQs,
remaining content/reliability/interface work, and appropriate future evaluation.]

> Drafting note: Introduce no new evidence. A defensible contribution is the
> evaluated integration and traceability of bounded learner-responsive support,
> with partial content adequacy and literature-grounded rationale. Future fixes
> require a new baseline/affected rerun; learner-effect claims require suitable
> participant assessment. Do not call the PoC educationally effective or optimal.

## References

The following references are already used by the inserted captions/notes.
They reuse E059/E040's verified identities and access limits; no fresh source
appraisal occurred in Step 25. Add the actual studies cited when drafting
§§2.3/3.6 and complete Step 28's citation–reference audit. This is not yet the
paper's complete bibliography.

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)
