# Working paper

## Title

Evaluating Adaptive LLM Scaffolding for Burmese-Speaking STEM Learners

## Abstract

Burmese-speaking STEM learners need contextual explanations of English terminology and unfamiliar concepts. This study evaluates a Context-Aware Adaptive STEM Scaffolding Framework and a bilingual large language model proof of concept. Conceptual evaluation combines GenAI critique, literature analysis, informed argument and a historical scenario. Design evaluation uses functionality and usability criteria, static and dynamic analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a live scenario. Recorded evidence supports bounded routing, response traceability and persistence under tested conditions. Researcher-endorsed content review recorded 18 Pass, 71 Partial and two Fail judgements across 91 delivered outputs. Technical usability inspection found six criteria Pass and three Partial. The framework has a literature-grounded rationale, but terminology interpretation and content adequacy remain partial. The contribution is an evaluated integration of bounded, learner-responsive support; improved learning, calibrated scaffolding and an optimal adaptation dose remain unestablished.

## Keywords

- Adaptive STEM Scaffolding
- Burmese-Speaking Learners
- Large Language Models
- STEM Terminology Support
- Task–Technology Fit
- Design Science Evaluation

## 1. Introduction

Burmese-speaking STEM learners may need contextual explanations of specialised English terminology and unfamiliar concepts, rather than literal translation alone. This study evaluates an approach that combines terminology support, conceptual explanation and learner-responsive assistance. These needs constitute the research motivation; their prevalence and magnitude were not measured in this evaluation. Three research questions guide the assessment:

1. RQ1: How can specialised English STEM terminology be supported for Burmese-speaking learners?
2. RQ2: How can LLM-based support help learners understand STEM concepts beyond translation?
3. RQ3: How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?

Two artefacts are examined: the Context-Aware Adaptive STEM Scaffolding Framework, which specifies seven support responsibilities, and a bilingual large language model (LLM) proof-of-concept application implementing those responsibilities. Learners enter a STEM inquiry, receive structured support, report their support need and can request a bounded revision. The application preserves responses and support history for later review.

Conceptual evaluation combines GenAI critique, literature analysis, informed argument and a historical scenario. Implementation evaluation combines criteria-based inspection, static and dynamic analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a fresh scenario. Following [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36), these predominantly artificial evaluations support bounded claims rather than utility in authentic learner practice. No participant learning experiment or independent expert interview was conducted.

## 2. Conceptual Artefact Evaluation

Conceptual evaluation examines the framework's responsibilities and rationale, rather than treating diagram completeness as educational validation. Four complementary methods informed refinement; their sources and temporal relationships constrain the strength of convergence.

### 2.1 Artefact Selection and Evaluation Criteria

The framework coordinates seven responsibilities: identifying STEM terminology, interpreting technical context, selecting language support, explaining core meaning, providing scaffolding, collecting learner responses and adapting support. This coordination addresses all three research questions. Figure 1 shows the original framework, before evaluation-led clarification of its feedback decisions. The refined interpretation permits reconsideration of language, core meaning or intended context without adding an eighth stage. These are analytical responsibilities, not seven separate model calls.

Table 1 defines five conceptual criteria. Requirement coverage means that a responsibility is present, not that exactly seven stages are uniquely necessary. The original GenAI interview assessed boundary completeness under its fourth criterion; the final evaluation separately assesses literature consistency. Those two judgements are not interchangeable. The original interview also did not evaluate the subsequently refined framework.

![Original seven-stage Context-Aware Adaptive STEM Scaffolding Framework](../03_results/paper_assets/figure_1_framework.png)

**Figure 1. Context-Aware Adaptive STEM Scaffolding Framework before refinement.** The original diagram is reproduced unchanged. Its adaptation arrow returns to scaffolding; the refined interpretation additionally permits bounded reconsideration of language, core meaning or intended context. The two-level response interface, no-generation fade and two-adaptation maximum are implementation decisions, not labels in this diagram. Task–Technology Fit motivates task alignment, not measured learner fit (Goodhue & Thompson, 1995); scaffolding theory supplies a critical benchmark, not demonstrated learning (van de Pol et al., 2010).

**Table 1. Conceptual Evaluation Criteria and Methods**

| Criterion | Evaluation question | Methods |
| --- | --- | --- |
| C1 — Requirement coverage | Does the framework assign responsibilities for terminology, explanation and adaptive assistance? | GenAI critique, literature analysis, informed argument, historical scenario |
| C2 — Logical coherence | Are dependencies, feedback decisions and bounded re-entry defensible? | GenAI critique, informed argument, historical scenario |
| C3 — Theoretical consistency | Are task alignment, contingency, fading and the limits of self-report recognised? | Literature analysis, informed argument, GenAI critique |
| C4 — Literature consistency | Are relevant precedents, transfer limits and unsupported assumptions identified? | Literature analysis, informed argument; GenAI critique as supplementary challenge |
| C5 — Scenario applicability | Can inputs, decisions and support be traced through an illustrative interaction? | Historical scenario, informed argument |

*Note.* “Fully supported” denotes support for the specified criterion within its scope; “Partially supported” denotes support with material gaps. Neither means educational effectiveness. The interview's boundary-completeness judgement is not treated as a direct appraisal of literature consistency.

### 2.2 GenAI Interview

A fresh Temporary Chat on 28 September 2026 used nine fixed questions and no browsing. The interface reported GPT-5.6 Sol with High reasoning; this is recorded interface provenance, not independent provider-version verification. The original framework, requirements, theoretical framing and Photosynthesis scenario were supplied as text. Responses and coded analysis were retained separately.

The critique recognised requirement coverage and progression beyond translation, but identified self-report, unreliable interpretation, explanation quality and underspecified decisions as risks. Its distinction between core explanation and assistance prompted boundary clarification. Suggestions were not accepted automatically: literature, informed argument and scenario findings supplied supporting or limiting reasons. Table 2 preserves the method's original judgements rather than converting them into implementation passes. Reported model confidence is not measured certainty. The model neither evaluated the eventual application routes nor independently validated the refined framework. Its contribution is structured challenge to assumptions, not expert testimony, learner observation or empirical evidence of effectiveness.

### 2.3 Academic Literature Evaluation

The conceptual comparison reused an earlier 17-study review organised into four themes and twelve sub-themes ([Htet, 2026](../../docs/INFOSYS_720_Assignment_2.pdf)); it was not a new systematic search. Nineteen findings connected prior research to the seven responsibilities and the GenAI concerns. The corpus supports an integration opportunity within its boundary, not a universal research gap. A single database, English records and an open-access filter constrain coverage, while the review does not reconstruct every screening decision.

Native-language technical assistance offers a relevant precedent in Sinhala programming education ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)), but neither its language nor its outcomes transfer directly to Burmese STEM learners. Scientific-paper translation motivates selective English-term retention ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)); researchers' preferences do not validate novice comprehension. Guided multilingual interaction in [Kuzu (2026)](https://doi.org/10.1007/s10758-026-09974-7) raises a counterargument: independently selected menu assistance is not equivalent to teacher-mediated facilitation.

These relationships support context, language and assistance responsibilities, not the precise topology, route table or two-round policy. Comparisons consulted only through the earlier review retain secondary attribution rather than implying their originals were inspected. Its historical 2026 terminology-survey summary is not silently substituted with the separately consulted 2023 preprint. The studies supply bounded comparisons: their affordances suggest relevant responsibilities, while their settings and assessment modes limit what the framework can inherit.

### 2.4 Informed Argument

Informed argument connects scholarly warrants to mechanisms, removal tests and counterarguments, as descriptive information systems evaluation requires ([Hevner et al., 2004](https://doi.org/10.2307/25148625), p. 86, Table 2). The current argument evaluates the refined interpretation; its additional sources are not attributed retrospectively to the original interview or earlier literature corpus.

[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) motivate examining technology in relation to supported tasks. Applying that organisational warrant here is a design inference, not a validated educational fit scale. Removing target/context identification risks explaining the wrong sense; [Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1) motivate explicit domain terminology, not validated automatic term extraction. Removing language selection leaves retention incidental; its novice suitability still needs assessment. Removing core meaning could leave examples without an explicit concept. [Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4) supplies supplementary instructional rationale, not measured load reduction; [Ji et al. (2024)](https://arxiv.org/abs/2202.03629v7) support treating generated-content reliability separately from fluency.

[Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) distinguish contingency, fading and responsibility transfer. Their benchmark warrants purposeful assistance and responsive adjustment, but self-report cannot establish competence-sensitive contingency. Without purposeful scaffold selection, examples or hints may be present without responding to the learner's expressed need. Self-evaluation can be inaccurate ([Dunlosky & Rawson, 2012](https://doi.org/10.1016/j.learninstruc.2011.08.003)); that does not invalidate every response. Removing response collection or adaptation breaks the feedback mechanism, yet withholding generation after a high self-report does not demonstrate mastery. Target identification and core meaning were judged Conceptually justified; the other five responsibilities were Justified with qualification. Alternative combined stages or teacher-mediated designs remain plausible.

### 2.5 Scenario Evaluation

An earlier Photosynthesis interaction illustrates core explanation, structured support and a check–example–check sequence. It makes the framework understandable as an interaction, but does not record the exact response triggering adaptation, a second adaptation, fade/cap behaviour, a follow-up answer or the complete lifecycle. Execution date, model and code version are unrecorded. The example therefore cannot establish why one strategy was selected or whether perceived understanding changed. Scenario applicability remains partial despite its historical positive judgement. The fresh implementation walkthrough reported in Section 3.5 is separate evidence and cannot retrospectively fill those gaps. This method establishes plausible responsibility enactment, not concept acquisition by a participant or complete transition coverage.

### 2.6 Triangulation, Refinement, and Conceptual Evaluation Summary

Across methods, coordination beyond translation is defensible, while diagnosis and decision precision remain limiting. Refinement distinguished Stage 4 core meaning from Stage 5 assistance, defined Stage 6 as self-reported need, and permitted bounded Stage 7 reconsideration of language, meaning or intended context. Exact routes and limits remain design policies rather than validated instructional prescriptions.

Table 2 distinguishes original method judgements from the current synthesis: C1 is Fully supported for responsibility coverage; C2–C5 are Partially supported. Shared literature and scenarios are not independent replications, and the updated argument is not another learner study. Optional expert evaluation was intentionally skipped. The contribution is accountable conceptual integration with theoretical and empirical limits, not a uniquely necessary seven-stage topology.

**Table 2. Conceptual Evaluation Results**

| Method / object | Recorded finding | Qualification |
| --- | --- | --- |
| GenAI critique of original framework | Coverage Fully covered; coherence/theory Acceptable with minor issues; boundary completeness Mostly complete; scenario Applicable with minor issues | One no-browse model critique; underspecified decisions and self-report risks remain. Not expert or learner evidence |
| Earlier literature corpus | Nineteen findings relate terminology/context, bilingual explanation and adaptive assistance to prior research | Cross-language/domain transfer limits; exact topology, routes and cap not directly validated; no new systematic review |
| Current informed argument | Target identification and core meaning Conceptually justified; five other responsibilities Justified with qualification | Mechanism/removal/counterargument reasoning; local task fit and competence-sensitive adaptation unvalidated |
| Historical Photosynthesis interaction | Core explanation, support and check–example–check sequence illustrate the responsibilities | Missing trigger, later transitions and execution provenance; not a current-baseline run |
| Current synthesis | C1 Fully supported; C2–C5 Partially supported | Derived judgement, not a fifth independent method; no learning-effectiveness finding |

*Note.* Method-specific scales are retained, not averaged. Literature-grounded argument is warranted by Hevner et al. (2004); task alignment and the scaffolding benchmark draw on Goodhue and Thompson (1995) and van de Pol et al. (2010). These warrants do not establish diagnosed competence, calibrated fading or responsibility transfer.

## 3. Design Artefact Evaluation

The application uses one initial LLM call to generate structured explanation and support. Stage 6A offers “I understand” (High), “I partially understand” (Medium) and “I need more explanation”. The latter two can optionally select simpler explanation, another example, help with Burmese/English terms, conceptual clarification, or correction of the intended concept. Stage 6B allows skipping that choice; concept correction requires short contextual clarification. Application logic, not the LLM, selects the route.

High records a fade event without generation or round increment; it does not complete the session. Up to two adaptations can be stored. At the cap, responses are recorded without a third adaptation. Explicit Finish completes the session. A separate concept-scoped follow-up permits two questions without consuming adaptation rounds. Stored content, responses and interpretation changes support History, Resume and Review. Production code was held at one frozen baseline; additional root-application tests and configuration were tracked separately without changing that production baseline.

### 3.1 FURPS Functionality and Usability Criteria

FURPS denotes Functionality, Usability, Reliability, Performance and Supportability. This evaluation operationalised thirteen Functionality and nine Usability criteria (Table 3), not five independently scored dimensions. Expected response, lifecycle and persistence behaviour was fixed before execution. Mechanical checks enable the terminology, explanation and adaptation tasks without proving educational benefit. Composite Functionality outcomes all remain Partial; Usability has six Pass and three Partial.

For technical cases, Pass requires the predefined assertions to hold; Fail denotes contradiction of a mandatory assertion. Composite Partial indicates incomplete support or coverage while retaining failed subcases. Content was separately rated for correctness, context, language, explanation and adaptation: adequate, limited/minor issue, material error/absent, or not assessable. Structural validity alone cannot earn a content Pass.

**Table 3. Functionality and Usability Criteria**

| Criterion | Evaluation focus | Checks |
| --- | --- | --- |
| F1 — Inquiry handling | Valid initialisation and controlled input rejection | HTTP, initial-output contracts, runtime retrieval |
| F2 — Terminology/context | Intended STEM meaning and ambiguity repair | Interpretation/correction routes, simulation, content review |
| F3 — Bilingual support | Preferences, overrides and useful term retention | Rendering, preference invariants, terminology review |
| F4 — Structured support | Explanation, example, technical detail, reflection and revealable hint | Output contracts, browser inspection, content review |
| F5 — Learner response | Three self-reports, five optional help choices and valid input combinations | Route/input tests and persisted events |
| F6 — Adaptive support | Deterministic route, meaningful revision and High-to-fade | Route tests, simulation and content review |
| F7 — Adaptation bound | Stored rounds 0–2 and event/adaptation consistency | Boundary, completion and database concurrency tests |
| F8 — Scoped follow-up | Current concept, unrelated-topic rejection, 500-character and two-question limits | HTTP, service and persistence tests |
| F9 — Persistence | Durable support, events, interpretations and atomic updates | Retrieval and database tests |
| F10 — History | Learner ownership, newest-first ordering and accurate state | HTTP and interface inspection |
| F11 — Review/Resume | Reconstructed state, completion and bounds | Lifecycle tests and scenario |
| F12 — Preferences | Valid persistence and original session snapshots | Validation, save/reload and snapshot tests |
| F13 — Error handling | Controlled failures/recovery without invalid writes | Injected faults, malformed outputs and browser recovery |
| U1 — Task clarity | Inquiry purpose and entry evident | Home and keyboard inspection |
| U2 — Information structure | Explanation areas and hint distinguishable | Initial/adapted/follow-up hierarchy |
| U3 — Interaction clarity | Response choices, skip/back and consequences clear | Two-level response and keyboard inspection |
| U4 — Feedback visibility | Pending/adapting and revised support visible | Loading, routes, fade/cap and recovery |
| U5 — Navigation consistency | History, Review, Resume and preferences reachable | Navigation and modal focus |
| U6 — Bilingual readability | Legible glyphs/wrapping without clipping | Viewports, locales, themes and overrides |
| U7 — State visibility | Self-report, route, limits and completion distinct | Status, events and interpretation displays |
| U8 — Error clarity | Localised error and recovery action understandable | Failure, retry and ownership inspection |
| U9 — Consistency | Labels/interactions consistent across configurations | Locale, theme, width and keyboard matrix |

*Note.* Provider, reliability and timing observations inform these checks but do not create separate Reliability, Performance or Supportability grades. Bilingual readability is visual, not semantic validation. Self-report is not mastery; technical inspection is not a participant study or full accessibility audit.

### 3.2 Analytical Evaluation

Static structure, observed runtime and boundary instrumentation answer different questions and are assessed separately.

#### 3.2.1 Static Analysis

Fourteen formal checks examined layer separation, validation, ownership, persistence and controlled error contracts, alongside lint, TypeScript and production-build checks. The first integration attempt was environment-blocked; an unchanged permitted retry passed under the recorded conditions. Earlier coverage was limited to services and database-access code. Compilation and architecture inspection establish structural consistency, not successful live generation or scientific accuracy.

#### 3.2.2 Dynamic Analysis

Thirteen runtime cases traced creation, responses, corrected context, follow-up, persistence and recovery; a manual twelve-screen pass added technical browser observation. Two cases retained Partial Pass because provider-call counts were indirectly observed. An incorrect response-property assertion was adjudicated without erasing the original attempt. Fifteen successful initial requests across five fixed inquiries had median latency 3.331 seconds, range 2.593–4.640. These local sequential timings are descriptive, not adaptation-latency, load or production service-level evidence. Screenshots corroborate presentation, not learning.

#### 3.2.3 Optimisation / Bounds Analysis

Seventeen cases using a deterministic provider and real MongoDB passed for stored rounds, fade/cap events, completion, invalid state and contention. High persists fade without generation or increment; a support-needed response at round two persists an event without round three. Atomic updates preserve accepted event/adaptation consistency. However, one contention case made two provider calls while accepting one write. The stored bound is therefore not a global cost ceiling. “Optimisation” denotes bounded behavioural analysis, not an experimentally optimal instructional dose or unrestricted performance optimisation. Explicit Finish remains separate from High.

### 3.3 Simulation

A fixed multi-domain corpus comprised 48 planned main attempts and seven language/context supplements: 55 attempts with a live provider and isolated database. Results were 44 technical Pass, eight controlled initial ambiguities without sessions, and three technical Fail. One attempt aborted at 52.825 seconds despite a configured 20-second timer; two concept-correction attempts were rejected because the returned concept/domain were unchanged. The cause of the delayed abort was not established. Unreached downstream steps are not successful delivery.

Separately, 91 delivered outputs received 18 Pass, 71 Partial and two Fail ratings. These are generated support outputs, not 91 learners. The researcher reviewed and endorsed AI-assisted assessment worksheets; this is not independent expert assessment. Gravity's mass/weight wording used `အစုလိုက်အပြုံလိုက်` instead of `ဒြပ်ထု`; an ion definition's `မရှိတော့ဘဲ` reversed the nonzero-charge meaning. Later adaptations do not repair the initial text. Safe rejection and unchanged storage demonstrate control, not reliable intended-route delivery or uniformly adequate support.

### 3.4 Black-Box and White-Box Testing

Public HTTP/browser assessment recorded 24 black-box cases: 21 Pass, two Partial and one Fail. Two route/rendering cases did not assess semantic novelty. The failed missing-identity case expected HTTP 400 rejection, but the public proxy provisioned an anonymous cookie and returned HTTP 200 with empty History. This discrepancy between expected and actual boundary behaviour remains a Fail; no foreign-session leak was observed. A supplemental zero-round ambiguity assertion also failed: accepted generated support for remaining ambiguity consumes a round. Driver adjudications and first attempts remain separate, not erased by rechecks. External tests support behaviour within their fixtures and boundaries, not universal output adequacy.

White-box evaluation used the root application: 361 deterministic and twelve isolated MongoDB tests, giving 373 unique tests rather than additional tests for repeated commands. Six structural groups passed, including 39 route/round combinations and persistence, legacy-session, error and lifecycle assertions. V8 coverage across 42 files was 72.54% statements, 76.37% branches, 64% functions and 73.75% lines. Mocked boundaries establish exercised logic; real database tests support persistence. Neither certifies live content, and unexercised code remains. Browser/database observations are not merged into V8 totals, nor do shared fixtures create independent replications.

### 3.5 Informed Argument and Scenario

Eight design arguments connected cited warrants, implemented features, observations and counterarguments: two Supported and six Partially supported. [Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) motivate relevance to terminology, explanation and responsive-assistance tasks; feature availability alone cannot demonstrate learner fit. [Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) distinguish responsive support from diagnosed contingency. Persisted history enables continuity but does not itself transfer responsibility. [Hevner et al. (2004)](https://doi.org/10.2307/25148625) warrant knowledge-base-grounded argument as complementary evaluation, not developer assertion or replacement for behavioural checks. Failures constrain proposed mechanisms rather than being excused by theoretical rationale.

A fresh Photosynthesis walkthrough recorded two adaptations, four response events, one stored follow-up and completion at round two (Figure 2). Fifteen technical checks passed. Cap, High-at-cap and post-completion response checks were application programming interface (API) requests, not learner clicks. Browser Resume/Review reconstructed the same state. Content remains provisionally Partial: bacterial/chloroplast scope wording, extensive nontechnical English retention and limited first-example novelty remain concerns. Simulation endorsement does not cover this output. One coherent workflow cannot cancel earlier failures or measure participant learning.

![Photosynthesis walkthrough with browser actions and separately labelled API-only checks](assets/figure_2_photosynthesis_reader.svg)

**Figure 2. Recorded Photosynthesis walkthrough, 3 October 2026.** Solid boxes show the scripted browser workflow and support; dashed boxes identify separately executed API-only boundary checks. At round two the interface offers no further response choices. Separate API requests add capped and fade events without generation; High does not complete the session. An unrelated gravity follow-up is rejected without an extra save or concept change. History, Resume, explicit Finish and Review preserve the session. This is a technical observation, not a learner study; content remains provisional.

### 3.6 Academic Literature Evaluation

Thirteen design comparisons included five previously reviewed support systems: one Strong, nine Moderate, two Limited and one Contradictory/uncertain. These labels describe relevance and strength of the literature rationale, not application content scores. The Sinhala assistant offers a technical-language precedent ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)); the earlier review's dictionary, video, lyric and bilingual Telugu learning-platform accounts illustrate additional structured affordances ([Htet, 2026](../../docs/INFOSYS_720_Assignment_2.pdf)). These are reported comparisons, not fresh system executions or proof of absent features. Reported Telugu personalisation is retained, but language acquisition is not equated with STEM concept learning.

The application integrates contextual support but lacks comparator modalities. Selective retention has a research warrant, yet novice terminology quality remains partial ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). The Strong comparison concerns critical evaluation of LLM support, not strong generated content; the dose-policy comparison does not validate the exact fade or two-round limit. Corpus and source-access limits preclude superiority claims.

### 3.7 Design Evaluation Summary

Table 4 shows stronger bounded mechanics than content or live delivery. Structured usability inspection found six criteria Pass and three Partial: navigation consistency, error clarity and cross-configuration consistency. Modal focus and English-only errors in the Burmese interface have severity 2, meaning task impediment with a workaround; a generic correction badge on remaining ambiguity has severity 1, meaning a cosmetic issue. The preference-save infrastructure-fault interface was Not assessed. Distributed viewport, locale, theme and keyboard inspection is neither participant usability nor physical-phone/full accessibility evaluation. Visual readability does not validate scientific wording. Completed methods therefore do not imply an all-pass artefact.

**Table 4. Design Evaluation Results**

| Method | Recorded result | Material qualification |
| --- | --- | --- |
| Static analysis | Fourteen structural/verification checks recorded | Initial integration blocked by environment; unchanged retry passed. Earlier coverage limited to services/database access |
| Dynamic analysis | Thirteen runtime cases and twelve-screen manual pass; fifteen initial timings, median 3.331 s | Two indirect-call-count Partial Pass; driver assertion corrected without erasing first attempt. Not load evidence |
| Bounds analysis | Seventeen deterministic-provider/real-database cases Pass | One race made two calls for one accepted write; state cap is not a cost ceiling |
| Simulation | 55 attempts: 44 technical Pass, eight controlled initial ambiguities, three technical Fail | Delayed abort and two unchanged-correction rejections; dependent unreached steps not delivered |
| Delivered-content review | 91 outputs: 18 Pass, 71 Partial, two Fail | Researcher-endorsed AI-assisted review, not independent expert judgement; mass/weight and ion-charge errors remain |
| Black-box testing | 24 assessed cases: 21 Pass, two Partial, one Fail | Novelty unassessed in two fixtures; anonymous-identity boundary disagreed with expectation; supplemental ambiguity-round assertion also Fail |
| White-box testing | Six structural groups Pass; 373 unique tests; 42-file coverage | Mocks do not validate live content; unexercised paths remain; browser/database observations excluded from V8 totals |
| Usability inspection | Nine criteria: six Pass, three Partial; 133 captures | Modal focus/localisation severity 2; ambiguity badge severity 1; preference-save fault unassessed; no participants |
| Design informed argument | Eight arguments: two Supported, six Partially supported | Literature-grounded rationale, not learner outcomes or independent replication |
| Fresh Photosynthesis scenario | Fifteen technical checks Pass; two adaptations, four events, one stored follow-up | Cap/High/post-completion checks API-only; content provisional with scope, retention and novelty concerns |
| Design literature comparison | Thirteen comparisons: one Strong, nine Moderate, two Limited, one Contradictory/uncertain | Transfer/access limits; neither content superiority nor optimal dose established |

*Note.* Scales and denominators differ and are not pooled into a success rate. Later successful checks do not erase earlier failures. Expert interviews were skipped, not replaced by GenAI critique or researcher-endorsed worksheets. Controlled evaluation does not establish naturalistic learner utility (Venable et al., 2016).

## 4. Results and Interpretation

Interpretation distinguishes narrow mechanical support, partial delivery/content, conceptual rationale and unsupported educational effects.

### 4.1 Consolidated Results

The synthesis contains 225 recorded findings, including criteria judgements and derived analyses, not 225 independent tests or participants. External observations, instrumented bounds and internal assertions converge on application-controlled routing, response/adaptation persistence and lifecycle reconstruction. Fade and cap behaviour have direct instrumentation beyond earlier indirect observations. Corrected-context follow-up remains concept-scoped and leaves adaptation state unchanged. These are exercised implementation properties, not universal guarantees.

A structurally accepted output can contain a scientific or Burmese error; plausibility can coexist with weak novelty. The two endorsed content Fail remain despite later better support. Eight initial ambiguities without sessions and three live delivery Fail constrain dependable interpretation and adaptation. The fresh scenario corroborates integration but retains provisional content judgements and API-only boundaries. Safe errors support protection against corrupt state, not successful assistance.

Accordingly, all thirteen Functionality criteria remain Partial, while Usability retains six Pass and three Partial. Stronger mechanical subclaims do not promote composite judgements. Literature support warrants a mechanism, not an observed benefit. Bounds, coverage, screenshots and output ratings have different units; averaging them would obscure the distinction being evaluated. Historical attempts, expected-behaviour discrepancies and derived analyses remain separate rather than becoming extra confirmations. The convergence supports bounded implementation credibility with unresolved semantic, delivery and interaction limitations, not a general reliability rate.

### 4.2 Research Question Traceability

A 24-chain analysis connected problems, requirements, research questions, objectives, artefact responsibilities and evaluation criteria. Table 5 condenses the substantive relationships so that the contribution and remaining gaps can be understood without consulting that analysis. Each research question remains Partially supported overall; populated traceability is not complete requirement satisfaction.

For RQ1, contextual terminology and selective bilingual treatment provide a defensible approach. Corrected interpretations and language-support routes instantiate it, while unchanged-correction rejection and Burmese terminology errors limit dependable intended-meaning support. Neither validated automatic term extraction nor measured reduction in language barriers follows.

For RQ2, core explanations, examples, reflection and hints demonstrate assistance beyond word substitution. Mixed definitions and first-example repetition qualify usefulness; conceptual understanding and retention were not measured. Structured output is an enabling representation, not evidence that a learner acquired its meaning.

For RQ3, self-reported need drives deterministic routes, bounded generation and durable history. Concurrency and lifecycle tests support those mechanics, but not calibrated contingency, educational fading, responsibility transfer or optimal dose. Self-report, the cap and explicit Finish are different constructs; a completed session is not mastery.

**Table 5. Research Questions, Artefact Mechanisms and Evaluation Conclusions**

| Question / requirement | Artefact mechanisms | Support and remaining gap |
| --- | --- | --- |
| RQ1 — Contextual support for specialised English STEM terminology | Terminology/context interpretation, selective bilingual support and bounded intended-concept repair | Partially supported: routes and presentation implemented; Burmese errors and rejected unchanged corrections limit fidelity. No validated term extraction or measured barrier reduction |
| RQ2 — Conceptual support beyond translation | Core explanation, examples, technical detail, reflection, hints and concept-focused revision | Partially supported: structured assistance delivered; mixed correctness and limited novelty remain. No measured understanding or retention benefit |
| RQ3 — Structured, adaptive scaffolding | Self-report, optional help choices, deterministic routing, two-adaptation bound, persisted history and scoped follow-up | Partially supported: tested state and continuity controls; live delivery, identity-boundary discrepancy and interface defects remain. No competence diagnosis, calibrated fading or optimal dose |

*Note.* The questions are stated in Section 1. Conceptual criteria (Table 1), implementation criteria (Table 3) and results (Tables 2 and 4) supply the basis for these conclusions. Requirement coverage does not establish educational effectiveness.

### 4.3 What the Evaluation Does and Does Not Show

The contribution is an evaluated coordination of responsibilities and tested controls, with content and intended-meaning repair still partial. [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish artificial from naturalistic evaluation; synthetic inquiries, controlled providers and evaluator inspection cannot substitute for authentic learner practice. Reused outputs, shared fixtures, argument revisions and derived matrices are not independent replications. Purposive cases, stochastic generation and limited configurations constrain generalisation.

No participant learning/satisfaction study, independent expert review, calibrated fit/dose assessment or full accessibility audit was conducted. Preference-save fault behaviour and fixture semantic novelty remain unassessed. Some literature warrants are limited to abstracts/excerpts or secondary review accounts; those citations do not validate Burmese equivalents. The two-round state bound does not cap concurrent provider work, and the configured abort is not a hard twenty-second wall-clock guarantee. Uniform correctness, superiority and educational effectiveness therefore remain unestablished. Underlying cookie-bearing captures require controlled retention and separately reviewed redacted derivatives before distribution; traceability does not establish permission to release them.

## 5. Conclusion

The framework and application offer an evaluated integration of contextual terminology support, explanation beyond translation and bounded response-driven assistance. Literature-grounded reasoning supports the responsibilities, while external observations and internal/state tests corroborate routing, persistence and continuity controls. These results establish a defensible implementation demonstration, not uniformly adequate tutoring.

RQ1–RQ3 remain partially supported: terminology fidelity, scientific adequacy and dependable meaning repair limit the broader requirements. Self-reported need guides assistance without diagnosing competence; High-to-fade, two stored adaptations and explicit completion are policies, not mastery or an optimal instructional dose. Mixed content and interface findings remain part of the contribution rather than exceptions hidden by coverage.

Future work should address the Burmese/STEM errors, delivery failures and interaction defects under a newly identified baseline with affected reruns. Appropriate learner and independent content assessment would then be needed to examine benefit in practice. This evaluation establishes neither improved learning nor calibrated educational scaffolding.

## References

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. [https://doi.org/10.7763/IJCTE.2025.V17.1378](https://doi.org/10.7763/IJCTE.2025.V17.1378)

Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement: Inaccurate self evaluations undermine students' learning and retention. *Learning and Instruction, 22*(4), 271–280. [https://doi.org/10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003)

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

Htet, N. L. (2026). *Scaffolding low-resource STEM education with large language models* [Unpublished course assignment]. University of Auckland.

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y., Chen, D., Dai, W., Chan, H. S., Madotto, A., & Fung, P. (2024). *Survey of hallucination in natural language generation* (Version 7) [Preprint]. arXiv. [https://arxiv.org/abs/2202.03629v7](https://arxiv.org/abs/2202.03629v7)

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. [https://doi.org/10.18653/v1/2026.findings-eacl.204](https://doi.org/10.18653/v1/2026.findings-eacl.204)

Kuzu, T. E. (2026). AI-supported translanguaging processes in primary school: Empirical insights into ChatGPT's role in multilingual interactions. *Technology, Knowledge and Learning*. Advance online publication. [https://doi.org/10.1007/s10758-026-09974-7](https://doi.org/10.1007/s10758-026-09974-7)

Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257–285. [https://doi.org/10.1207/s15516709cog1202_4](https://doi.org/10.1207/s15516709cog1202_4)

Tran, H. T. H., Martinc, M., Caporusso, J., Doucet, A., & Pollak, S. (2023). *The recent advances in automatic term extraction: A survey* (Version 1) [Preprint]. arXiv. [https://arxiv.org/abs/2301.06767v1](https://arxiv.org/abs/2301.06767v1)

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)
