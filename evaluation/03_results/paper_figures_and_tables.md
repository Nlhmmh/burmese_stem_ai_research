# Step 24 — Paper figures and tables

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

Run: `PRESENT-20261003-PAPER-01`, 3 October 2026, Pacific/Auckland.
Status: **Complete with evidence qualifications.**
Preparation: Codex recorded-evidence presentation under user direction. The author's current scientific and bilingual verification is recorded in the human-verification update below.

This pack supplies the five tables and two figures specified in master-plan
§33. It condenses [master results (E061)](master_results.csv),
[PIRQOA chains (E064)](pirqoa_traceability.csv) and
[interpretation (E067)](results_interpretation.md), without regrading them.
E069 indexes this pack, E070 the unchanged framework-figure extract, E071 the
editable scenario-flow SVG, and E072 the [presentation manifest](raw/PAPER-RUN-01-manifest.sha256).
The optional Figure 3 timing chart is deliberately omitted (§8).

The figures/tables are presentation derivatives, not new evaluation methods,
tests or independent replications. B01 production and ROOTTESTS-02 evidence
retain their recorded identities. Historical conceptual material remains
distinct from the fresh B01 design scenario. No app, provider, database,
test, participant or expert execution, new literature appraisal, production
fix or endorsement occurred in this step.

## 1. Placement and use

| Item | Suggested paper location | Purpose / source |
| --- | --- | --- |
| Figure 1 | §2.1 Artefact selection | Identify the original conceptual topology; caption identifies refined semantics |
| Table 1 | §2.1 Criteria and methods | Five protocol conceptual criteria with method/evidence/RQ mapping |
| Table 2 | §2.6 Conceptual evaluation summary | Four complementary methods and current qualified synthesis |
| Table 3 | §3.1 FURPS criteria | All 13 functionality and nine usability criteria |
| Table 4 | §3.7 Design evaluation summary | Six required methods plus completed supplementary methods and usability |
| Figure 2 | §3.5 Scenario | Recorded browser and API-only sequence, not an imagined learner path |
| Table 5 | §4.2 PIRQOA/RQ traceability | Three concise chains, with the full 24-row E064 matrix as the detailed supplement |

Keep the numbered caption, table notes and failures when transferring an item.
R IDs below resolve to immutable findings in E061; E IDs resolve to exact
paths/hashes in [the evidence register](evidence_register.csv). Ranges denote
existing IDs, not additional tests. Detailed logs/raw captures stay in the
evidence archive rather than being pasted into the paper. Restricted original
cookie-bearing captures are not approved for public sharing by this pack.

## 2. Figure 1 — Selected Context-Aware Adaptive STEM Scaffolding Framework

![Original Assignment 3 seven-stage framework, reproduced unchanged](paper_assets/figure_1_framework.png)

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

## 3. Table 1 — Conceptual Artefact Evaluation Criteria and Methods

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

## 4. Table 2 — Conceptual Artefact Evaluation Results

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

## 5. Table 3 — FURPS Functionality and Usability Criteria

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

## 6. Table 4 — Design Artefact Evaluation Results

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
| Fresh Photosynthesis scenario | One live walkthrough: 15 technical checks Pass; two adaptations, four response events, one stored follow-up, completed round 2 | Cap/High-at-cap/post-completion checks are API-only. Author-verified content remains Partial with scope, English-retention and novelty qualifications; no independent second assessor | R206–R211; E042–E044 |
| Design literature comparison | 13 comparisons: one Strong, nine Moderate, two Limited, one Contradictory/uncertain | Five SSR systems and selected corpus; source-access/transfer limits. DL12 Strong warrants critical evaluation, not strong PoC content; DL13 does not validate dose/fade. No superiority claim | R185–R197, R223; E045–E048 |

*Table 4 note.* The first six rows fulfil the required method summary; the
remaining four retain completed supplementary evaluation rather than omitting
its limits. Scales and denominators differ and are not pooled into a success
rate. Controls converge on narrow state/safety properties (E067 INT-01–06);
content and overall RQ support remain partial. Later successful runs do not
erase earlier failures. Expert interviews were Skipped (R220), not replaced
by GenAI critique or AI-assisted endorsed worksheets. Evaluation in controlled
settings does not establish naturalistic learner utility (Venable et al., 2016).

## 7. Figure 2 — Photosynthesis Scenario Evaluation Flow

![Recorded Photosynthesis flow with browser actions and separately labelled API-only checks](paper_assets/figure_2_photosynthesis_flow.svg)

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
Partial after author verification and the timing observations do not establish performance targets.
History, follow-up and lifecycle are enabling interactions, not an eighth stage.

Figure source: [recorded scenario, actions/state trail](../02_design/scenario/photosynthesis_scenario.md#3-expected-and-actual-scenario-actions).
The SVG contains editable text/shapes; the adjacent PNG is a rendered insertion
copy of the same SVG, not independent evidence. Their identities and visual
check are recorded in the Step 24 manifest/intake.

## 8. Optional Figure 3 — Dynamic timing result: omitted

R225/E007 contains 15 successful initial requests for five fixed inquiries,
each repeated three times, in a local sequential live-provider run. Table 4
reports range/median with that scope. A chart would add little to the focused
paper and could imply a controlled benchmark, load study, population latency
distribution or SLA that was not evaluated. It would not establish adaptation
latency or resolve SIM05-C's late abort. Therefore no Figure 3 is created;
the original timing CSV remains available as detailed evidence, unchanged.

## 9. Table 5 — PIRQOA Evaluation Traceability

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

## 10. Sources, integrity and handover

The pack reuses protocol 2.1 and the recorded scholarly warrants in E058/E059
and E039/E040. TTF's organisational/abstract-bounded warrant, scaffolding's
teacher–student origin, and all other source access/version limits remain.
Project-specific topology, route rules and two-round limit are design decisions.
No new citation is silently added to the frozen Assignment 2 corpus.

[Intake metadata](raw/PAPER-RUN-01-input.json),
[verification](raw/PAPER-RUN-01-verification.json) and
[manifest](raw/PAPER-RUN-01-manifest.sha256) record original 63-row register
preservation, unchanged 225 results/24 PIRQOA chains/Step 23 interpretation,
all 66 B01 production hashes, figure provenance and table/ID checks.
The register now has **67 entries**, E001–E027/E033–E072; E028–E032 remain retired.
Living master/protocol/register, the manifest itself and final verification
are excluded from its child list to avoid circular or obsolete index checks.
The rendered PNG copies are presentation derivatives, not new observations.

**Next: Step 25 — Recommended Final Assignment Structure (§34).** Assemble
the existing evidence into the prescribed paper structure, then apply the
word allocation, references and formatting checks in subsequent steps.
This pack is not the completed paper and does not clear restricted evidence
for publication. Check the original Assignment 5 brief before final submission.
Final Word/PDF pagination, table widths and caption placement are deferred to
the paper's typesetting check; the present tables remain editable Markdown.

## 11. References used in captions and notes

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)
