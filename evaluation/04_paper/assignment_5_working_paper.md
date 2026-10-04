# Evaluating Adaptive LLM Scaffolding for Burmese-Speaking STEM Learners

## Abstract

Burmese-speaking STEM learners may need help with English terminology and unfamiliar concepts. A Context-Aware Adaptive STEM Scaffolding Framework and a bilingual large language model application are evaluated in this study. Conceptual evaluation uses GenAI critique, literature analysis, informed argument and a historical scenario. Design evaluation uses functionality and usability criteria, code and runtime analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a live scenario. Tests support application-controlled routing, stored response history and persistence under the tested conditions. Content assessment rated 91 delivered outputs as 18 Pass, 71 Partial and two Fail. Supplementary analysis of 32 saved outputs identifies bilingual errors without replacing those ratings. Usability inspection found six criteria Pass and three Partial. The study demonstrates an integration of terminology support, explanations and learner-responsive assistance within a two-adaptation limit. It does not establish improved learning or whether the level of support and adaptation limit are educationally appropriate.

## Keywords

- Adaptive STEM Scaffolding
- STEM Terminology Support
- Burmese-Speaking Learners
- Large Language Models
- Bilingual Learning
- Educational Information Systems

## 1. Introduction

Burmese-speaking STEM learners may need contextual explanations of specialised English terminology and unfamiliar concepts, rather than literal translation alone. An approach combining terminology support, conceptual explanation and assistance based on learner responses is evaluated. The proposed support is assessed, but the frequency and severity of learner difficulties are not measured. Three research questions guide the assessment.

1. RQ1 — How can specialised English STEM terminology be supported for Burmese-speaking learners?
2. RQ2 — How can LLM-based support help learners understand STEM concepts beyond translation?
3. RQ3 — How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?

The study examines two artefacts. The Context-Aware Adaptive STEM Scaffolding Framework defines seven support responsibilities. A bilingual large language model (LLM) proof-of-concept application implements these responsibilities. Learners enter a STEM inquiry, receive structured support, report their support need and can request a revision within a fixed limit. The application stores responses and support history for later review.

Conceptual evaluation combines GenAI critique, literature analysis, informed argument and a historical scenario. Design evaluation combines criteria-based inspection, static and dynamic analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a fresh scenario. Method selection follows the analytical, experimental, testing and descriptive categories of Hevner et al. (2004). [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish evaluation in controlled settings from evaluation in real use. Most evaluation activities were conducted using controlled tests, scripted inquiries or structured inspection. Behaviour under these conditions was assessed, but usefulness during learners' everyday study was not established. No participant learning experiment or independent expert interview was conducted.

## 2. Conceptual Artefact Evaluation

Conceptual evaluation examines the framework's responsibilities and rationale. A complete diagram alone does not show educational value. Four methods address different questions. The GenAI interview challenges assumptions. Literature comparison examines relevant precedents and their limits. Informed argument examines why the proposed mechanisms might work and considers objections. The historical scenario illustrates the interaction and reveals missing decisions. The GenAI exchange is a model critique, not an observation of learner behaviour. Some methods use the same literature or scenario, so agreement between them is not fully independent evidence. Later refinements also cannot be treated as findings of the earlier evaluation.

### 2.1 Artefact Selection and Evaluation Criteria

The framework coordinates seven responsibilities. These are identifying STEM terminology, interpreting technical context, selecting language support, explaining core meaning, providing scaffolding, collecting learner responses and adapting support. Together they address the three research questions. Figure 1 shows the original framework before its feedback decisions were clarified in response to evaluation findings. The refined interpretation allows language, core meaning or intended context to be reconsidered without adding an eighth stage. These are responsibilities of the design, not seven separate model calls.

Table 1 defines five conceptual criteria. Requirement coverage means that a responsibility is present, not that exactly seven stages are uniquely necessary. The original GenAI interview assessed boundary completeness under its fourth criterion. The final evaluation separately assesses literature consistency. Those two judgements are not interchangeable. The original interview also did not evaluate the subsequently refined framework.

![Original seven-stage Context-Aware Adaptive STEM Scaffolding Framework](../03_results/paper_assets/figure_1_framework.png)

**Figure 1. Context-Aware Adaptive STEM Scaffolding Framework before refinement.** The original diagram is reproduced unchanged. Its adaptation arrow returns to scaffolding. The refined interpretation additionally permits bounded reconsideration of language, core meaning or intended context. The two-level response interface, no-generation fade and two-adaptation maximum are design decisions, not labels in this diagram. Task–Technology Fit motivates task alignment, not measured learner fit (Goodhue & Thompson, 1995). Scaffolding theory supplies a critical benchmark, not demonstrated learning (van de Pol et al., 2010).

**Table 1. Conceptual Evaluation Criteria and Methods**

| Criterion | Evaluation question | Methods |
| --- | --- | --- |
| C1 — Requirement coverage | Does the framework assign responsibilities for terminology, explanation and adaptive assistance? | GenAI critique, literature analysis, informed argument, historical scenario |
| C2 — Logical coherence | Are dependencies, feedback decisions and bounded re-entry defensible? | GenAI critique, informed argument, historical scenario |
| C3 — Theoretical consistency | Are task alignment, contingency, fading and the limits of self-report recognised? | Literature analysis, informed argument, GenAI critique |
| C4 — Literature consistency | Are relevant precedents, transfer limits and unsupported assumptions identified? | Literature analysis, informed argument, GenAI critique as supplementary challenge |
| C5 — Scenario applicability | Can inputs, decisions and support be traced through an illustrative interaction? | Historical scenario, informed argument |

*Note.* All five criteria assess the responsibilities needed for RQ1–RQ3. “Fully supported” denotes support for the specified criterion within its scope. “Partially supported” denotes support with material gaps. Neither means educational effectiveness. The interview's boundary-completeness judgement is not treated as a direct appraisal of literature consistency.

### 2.2 GenAI Interview

A fresh Temporary Chat used nine fixed questions and no browsing. The interface reported GPT-5.6 Sol with High reasoning. This identifies the displayed model setting, not an independently verified provider version. The original framework, requirements, theoretical framing and Photosynthesis scenario were supplied as text. The responses and their coded analysis were retained separately.

Responses were coded as support, concern, missing element, unsupported assumption, suggested improvement or out of scope, then related to the conceptual criteria. The critique recognised requirement coverage and support beyond translation. It also identified risks in self-report, interpretation, explanation quality and unclear adaptation decisions. Its distinction between core explanation and assistance helped clarify those responsibilities. Suggestions were assessed against literature, informed argument and scenario findings before acceptance. Table 2 retains the interview's original judgements. Model confidence was not treated as measured certainty. The model did not evaluate the later application routes or independently validate the refined framework. The interview provides a structured challenge to assumptions, not expert testimony or evidence of learner benefit.

Interview scope and principal findings are summarised in Table H1.

### 2.3 Academic Literature Evaluation

Conceptual literature evaluation used an existing 17-study corpus rather than conducting a new search. Nineteen findings linked relevant research to the seven responsibilities and the concerns raised by the GenAI critique. Each comparison examined what the literature supported, where its findings might not transfer and what this meant for the framework. The purpose was to evaluate the proposed design, not to establish that no similar approach exists elsewhere.

Native-language technical assistance offers a relevant precedent in Sinhala programming education ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)), but its language and findings do not transfer directly to Burmese STEM learners. Scientific-paper translation provides a rationale for retaining selected English terms ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). Novice understanding of those terms cannot be established from the preferences reported in that study. Guided multilingual interaction in [Kuzu (2026)](https://doi.org/10.1007/s10758-026-09974-7) suggests a limitation of the application. Choosing assistance from a menu without a teacher is not equivalent to teacher-guided support.

These comparisons support responsibilities for context, language and assistance. They do not validate the exact stage structure, route table or two-round policy. Some comparisons relied on secondary summaries rather than direct access to the original studies. This limits the strength of those comparisons, which are not independent checks of the originals. The studies therefore provide reasons for including particular responsibilities, while differences in language, learners and setting limit the conclusions.

The conceptual literature comparison is summarised in Table H1.

### 2.4 Informed Argument

Informed argument uses scholarly sources to explain why a design mechanism may be useful, what would be lost if it were removed and what objections remain. This follows descriptive evaluation in information systems research ([Hevner et al., 2004](https://doi.org/10.2307/25148625), p. 86, Table 2). The argument assesses the refined framework. Sources added during this assessment are not presented as part of the earlier interview or literature corpus.

[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) support examining whether technology suits the tasks it is intended to assist. Applying this idea to STEM learning provides a design rationale, not a measured level of task–technology fit. Without term and context identification, the application could explain the wrong meaning. [Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1) support attention to domain terminology, but do not validate this application's term identification. Without language selection, retaining English terms could become arbitrary. Without an explicit core explanation, examples might not clearly communicate the concept. [Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4) provides an instructional rationale for considering cognitive demands, but this study did not measure cognitive load. [Ji et al. (2024)](https://arxiv.org/abs/2202.03629v7) also show why fluent generated text should not be assumed to be reliable.

[Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) identify support adjusted to learner need, gradual withdrawal of support and transfer of responsibility as central to scaffolding. These ideas support purposeful assistance and responsive adjustment. However, self-report alone cannot show whether assistance matches a learner's actual competence. Examples or hints may be available without meeting the learner's expressed need. Self-evaluation can also be inaccurate ([Dunlosky & Rawson, 2012](https://doi.org/10.1016/j.learninstruc.2011.08.003)), although this does not make every learner response unreliable. Removing response collection or adaptation would break the feedback process. Conversely, stopping generation after a high self-report does not show mastery. Target identification and core meaning were rated Conceptually justified. The other five responsibilities were Justified with qualification. Designs that combine stages or involve a teacher remain reasonable alternatives.

The informed-argument summary and scholarly basis are provided in Table H1.

### 2.5 Scenario Evaluation

An earlier Photosynthesis interaction illustrates core explanation, structured support and a check–example–check sequence. It shows how the framework could work in an interaction, but does not record the exact response that triggered adaptation, a second adaptation, fade/cap behaviour, a follow-up answer or the complete session lifecycle. Execution date, model and code version were not recorded. The example therefore cannot establish why a support strategy was selected or whether the learner's reported understanding changed. Scenario applicability remains partial despite the earlier positive judgement. The fresh application walkthrough in Section 3.5 is separate evidence and cannot fill gaps in the earlier record. The historical scenario illustrates the responsibilities, not participant learning or complete coverage of state transitions.

The historical scenario's evidence boundaries are summarised in Table H1.

### 2.6 Triangulation, Refinement, and Conceptual Evaluation Summary

Together, the methods support combining terminology, explanation and responsive assistance beyond translation. They do not establish accurate diagnosis of learner need or the best adaptation decisions. The refinement separated Stage 4 core meaning from Stage 5 assistance, defined Stage 6 as self-reported need, and allowed Stage 7 to reconsider language, meaning or intended context within a fixed limit. The exact routes and limits are design rules, not validated instructional recommendations.

Table 2 separates the original method judgements from the current synthesis. C1 is Fully supported for responsibility coverage. C2–C5 are Partially supported. Methods that reuse literature or scenarios do not count as independent repetitions, and the updated argument is not a learner study. Optional expert evaluation was not conducted. The conceptual contribution is a reasoned integration of support responsibilities, not proof that exactly seven stages are necessary.

**Table 2. Conceptual Evaluation Results**

| Method / object | Recorded finding | Qualification | Requirement contribution |
| --- | --- | --- | --- |
| GenAI critique of original framework | Coverage Fully covered, coherence/theory Acceptable with minor issues, boundary completeness Mostly complete, scenario Applicable with minor issues | One no-browse model critique, underspecified decisions and self-report risks remain. Not expert or learner evidence | RQ1–RQ3 — challenges the proposed terminology, explanation and response/adaptation responsibilities |
| Earlier literature corpus | Nineteen findings relate terminology/context, bilingual explanation and adaptive assistance to prior research | Cross-language/domain transfer limits, exact topology, routes and cap not directly validated, no new systematic review | RQ1–RQ3 — literature relationships for each support requirement, not observed effectiveness |
| Current informed argument | Target identification and core meaning Conceptually justified, five other responsibilities Justified with qualification | Mechanism/removal/counterargument reasoning, local task fit and competence-sensitive adaptation unvalidated | RQ1 — term/context/language, RQ2 — core meaning/support, RQ3 — response/adaptation |
| Historical Photosynthesis interaction | Core explanation, support and check–example–check sequence illustrate the responsibilities | Missing trigger, later transitions and execution provenance, not a current-baseline run | RQ1–RQ3 — plausible enactment, with incomplete adaptation/lifecycle trace |
| Current synthesis | C1 Fully supported, C2–C5 Partially supported | Derived judgement, not a fifth independent method, no learning-effectiveness finding | RQ1–RQ3 — responsibility coverage supported, coherence, theory, literature and scenario support qualified |

*Note.* Method-specific scales are retained, not averaged. Literature-grounded argument is warranted by Hevner et al. (2004). Task alignment and the scaffolding benchmark draw on Goodhue and Thompson (1995) and van de Pol et al. (2010). These warrants do not establish diagnosed competence, calibrated fading or responsibility transfer.

## 3. Design Artefact Evaluation

The application was evaluated using automated tests, browser inspection and content assessment. Stage 6A collects three self-reported support levels. Medium and Needs Support allow five optional Stage 6B choices for explanation, example, language, concept or intended-meaning revision. Application logic selects the route. Without a choice, Medium receives another example and Needs Support a simpler explanation. High records fade without generation or round increment. Up to two adaptations are stored, while capped responses remain recorded. Finish completes the session. Two concept-scoped follow-ups are allowed separately. Language help can override presentation without changing saved preferences. History, Resume and Review reconstruct stored interactions.

Production code remained frozen. Local evaluation used macOS 26.6.2, Node.js 26.4.0, npm 11.17.0, Next.js 16.3.4, MongoDB 8.2.6 and Vitest/V8 4.1.11. Live generation used the OpenAI Responses API, configured as `gpt-5.4-mini`, reporting `gpt-5.4-mini-2026-03-17`, with strict output, a 20-second timeout and no custom sampling or automatic retry. Live, mocked-provider, database and browser evidence were distinguished.

### 3.1 FURPS Functionality and Usability Criteria

FURPS covers Functionality, Usability, Reliability, Performance and Supportability (Grady & Caswell, 1987, as cited in University of Auckland, 2026). Thirteen Functionality and nine Usability criteria were assessed (Table 3), without separate grades for the other dimensions. Expectations were fixed before execution. Technical Pass means assertions held, Fail means a mandatory assertion was contradicted, and Partial indicates incomplete support or coverage. Content correctness, context, language, explanation and adaptation were assessed separately. Valid structure alone did not establish adequate content.

**Table 3. Functionality and Usability Criteria**

| Criterion | Evaluation focus | Checks | Outcome / RQ |
| --- | --- | --- | --- |
| F1 — Inquiry handling | Valid initialisation and controlled input rejection | HTTP, initial-output contracts, runtime retrieval | Partial, RQ1–RQ3, enabling |
| F2 — Terminology/context | Intended STEM meaning and ambiguity repair | Interpretation/correction routes, simulation, content review | Partial, RQ1 |
| F3 — Bilingual support | Preferences, overrides and useful term retention | Rendering, preference invariants, terminology review | Partial, RQ1 |
| F4 — Structured support | Explanation, example, technical detail, reflection and revealable hint | Output contracts, browser inspection, content review | Partial, RQ2 |
| F5 — Learner response | Three self-reports, five optional help choices and valid input combinations | Route/input tests and persisted events | Partial, RQ3 |
| F6 — Adaptive support | Deterministic route, meaningful revision and High-to-fade | Route tests, simulation and content review | Partial, RQ1–RQ3, route-dependent |
| F7 — Adaptation bound | Stored rounds 0–2 and event/adaptation consistency | Boundary, completion and database concurrency tests | Partial, RQ3 |
| F8 — Scoped follow-up | Current concept, unrelated-topic rejection, 500-character and two-question limits | HTTP, service and persistence tests | Partial, RQ3 |
| F9 — Persistence | Durable support, events, interpretations and atomic updates | Retrieval and database tests | Partial, RQ3, enabling |
| F10 — History | Learner ownership, newest-first ordering and accurate state | HTTP and interface inspection | Partial, RQ3, enabling |
| F11 — Review/Resume | Reconstructed state, completion and bounds | Lifecycle tests and scenario | Partial, RQ3, enabling |
| F12 — Preferences | Valid persistence and original session snapshots | Validation, save/reload and snapshot tests | Partial, RQ1/RQ3, enabling |
| F13 — Error handling | Controlled failures/recovery without invalid writes | Injected faults, malformed outputs and browser recovery | Partial, RQ1–RQ3, enabling |
| U1 — Task clarity | Inquiry purpose and entry evident | Home and keyboard inspection | Pass, RQ1–RQ3, enabling |
| U2 — Information structure | Explanation areas and hint distinguishable | Initial/adapted/follow-up hierarchy | Pass, RQ2, enabling |
| U3 — Interaction clarity | Response choices, skip/back and consequences clear | Two-level response and keyboard inspection | Pass, RQ3, enabling |
| U4 — Feedback visibility | Pending/adapting and revised support visible | Loading, routes, fade/cap and recovery | Pass, RQ3, enabling |
| U5 — Navigation consistency | History, Review, Resume and preferences reachable | Navigation and modal focus | Partial, RQ3, enabling |
| U6 — Bilingual readability | Legible glyphs/wrapping without clipping | Viewports, locales, themes and overrides | Pass, RQ1/RQ2, visual only |
| U7 — State visibility | Self-report, route, limits and completion distinct | Status, events and interpretation displays | Pass, RQ3, enabling |
| U8 — Error clarity | Localised error and recovery action understandable | Failure, retry and ownership inspection | Partial, RQ1/RQ3, enabling |
| U9 — Consistency | Labels/interactions consistent across configurations | Locale, theme, width and keyboard matrix | Partial, RQ1–RQ3, enabling |

*Note.* Provider, reliability and timing observations inform these checks but do not create separate Reliability, Performance or Supportability grades. Bilingual readability is visual, not semantic validation. Self-report is not mastery. Technical inspection is not a participant study or full accessibility audit.

### 3.2 Analytical Evaluation

Static, dynamic and bounds analysis examined code structure, runtime behaviour and state limits respectively.

#### 3.2.1 Static Analysis

Fourteen checks traced layer separation, validation, ownership, persistence and error boundaries. Lint, TypeScript, tests and production-build verification accompanied inspection. An environment-blocked integration attempt passed on retry without code changes. Earlier coverage was limited to services and database-access code.

#### 3.2.2 Dynamic Analysis

Thirteen runtime cases and twelve browser captures examined session state and recovery. Two cases retained Partial Pass because provider calls were observed indirectly. A driver assertion was corrected without erasing the first attempt. Fifteen initial requests had a median latency of 3.331 seconds, ranging from 2.593–4.640 seconds. These sequential local timings do not establish load performance.

#### 3.2.3 Optimisation / Bounds Analysis

Seventeen deterministic-provider/real-MongoDB cases passed checks for fade, cap, completion and competing requests. Atomic updates prevented a third stored adaptation. However, one race made two provider calls for one accepted write. The state bound is therefore not a cost ceiling. Bounds analysis does not establish an optimal instructional dose.

Case-by-case analytical results, timings and manual browser observations are provided in Tables B1–B2.

### 3.3 Simulation

Sixteen fixed STEM inquiries used three response paths, with seven language/context supplements (Appendix A). Scientific expectations were specified before execution. Actual handlers, services and persistence were exercised with a live provider and isolated database, excluding browser/public-proxy transport. Of 55 attempts, 44 were technical Pass, eight returned controlled initial ambiguity without sessions, and three were Fail. These failures comprised a delayed abort at 52.825 seconds and two rejected unchanged concept corrections. Unreached steps were not delivered outputs.

Separately, 91 delivered outputs received 18 Pass, 71 Partial and two Fail ratings (Tables C1–C3). Assessment used postgraduate STEM knowledge, native Burmese fluency and advanced English proficiency, without a second independent assessor or verified specialist competence in every domain. The gravity output mistranslated mass as `အစုလိုက်အပြုံလိုက်` rather than `ဒြပ်ထု`. The ion definition's `net charge မရှိတော့ဘဲ` denied net charge, contradicting its English definition and subsequent charge statement. Later adaptations did not repair the original stored text.

#### 3.3.1 Supplementary Bilingual Error Assessment

Following [Freitag et al. (2021)](https://doi.org/10.1162/tacl_a_00437), local error categories were adapted from Multidimensional Quality Metrics. All 104 paired passages from 32 purposefully selected outputs were examined, including every delivered main concept and all three language-help cases. English/Burmese meaning, terminology and fluency were compared against scientific references and stored text. Exploratory model-assisted annotations received no independent qualified bilingual verification. No standard MQM score or validated Burmese glossary was claimed.

Four Major annotations affected three outputs, alongside 27 Minor annotations and ten shared-content advisories (Tables C4–C5). Gravity and ion findings explain existing failures. Unclear pH wording received a passage-level Major label without replacing its original Partial output rating. Shared scientific limitations were not translation errors. Original content totals remain unchanged. Neither corpus-wide prevalence nor independent confirmation follows from re-examining these selected texts.

### 3.4 Black-Box and White-Box Testing

Black-box assessment tested public HTTP/browser behaviour. Of 24 cases, 21 were Pass, two Partial and one Fail (Table D1). Semantic novelty was unassessed in two cases. Missing identity returned an anonymous cookie and HTTP 200 rather than expected HTTP 400, without an observed foreign-session leak. A supplemental assertion also failed because remaining-ambiguity support consumed a round.

White-box assessment exercised routing, ownership, errors, legacy sessions and concurrency through mocks and isolated MongoDB. The root application's `npm test`, `npm run test:coverage` and `npm run test:integration` produced 373 unique tests, including 39 route/round combinations. V8 coverage across 42 files was 72.54% statements, 76.37% branches, 64% functions and 73.75% lines (Tables E1–E2). Coverage establishes exercised logic, not live-content adequacy. Database/browser observations were excluded from V8 totals.

### 3.5 Informed Argument and Scenario

Eight literature-grounded arguments retained two Supported and six Partially supported conclusions (Table H2). Following [Hevner et al. (2004)](https://doi.org/10.2307/25148625), mechanisms were examined against observations and counterarguments. Task–Technology Fit supports task alignment, not demonstrated learner fit ([Goodhue & Thompson, 1995](https://doi.org/10.2307/249689)). Scaffolding requires support responsive to competence, which self-report and stored history do not establish ([van de Pol et al., 2010](https://doi.org/10.1007/s10648-010-9127-6)). Bilingual errors further qualify these arguments.

A Photosynthesis walkthrough recorded two adaptations, four events, one follow-up and completion, with fifteen technical checks Pass (Figure 2, Tables G1–G2). Cap and post-completion checks used application programming interface (API) requests rather than learner clicks. Resume/Review restored state. Content remains provisionally Partial because of organism-scope wording, nontechnical English retention and limited example novelty.

![Photosynthesis walkthrough with browser actions and separately labelled API-only checks](assets/figure_2_photosynthesis_reader.svg)

**Figure 2. Recorded Photosynthesis walkthrough.** Solid boxes show the scripted browser workflow and support. Dashed boxes identify separately executed API-only boundary checks. At round two the interface offers no further response choices. Separate API requests add capped and fade events without generation. High does not complete the session. An unrelated gravity follow-up is rejected without an extra save or concept change. History, Resume, explicit Finish and Review preserve the session. This is a technical observation, not a learner study. Content remains provisional.

### 3.6 Academic Literature Evaluation

Thirteen comparisons linked capabilities, application evidence, counterevidence and transfer limits (Table H3). Sinhala programming support provides a native-language precedent ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)). Selective term retention has a rationale in scientific translation, but not demonstrated suitability for Burmese novices ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). Ratings describe literature support, not content quality. Secondary summaries limit some comparisons. Neither superiority nor the exact fade/cap policy was validated.

### 3.7 Design Evaluation Summary

Chrome inspection covered desktop/mobile-emulated viewports, English/Burmese interfaces, light/dark themes and keyboard interaction (Tables F1–F2). Home, preferences, initial support and Stage 6B covered all eight combinations, with other states distributed across them. A delayed mock provider exposed pending states without external calls.

Six usability criteria were Pass and three Partial. Modal focus and English-only errors in the Burmese interface impeded tasks but allowed workarounds. A generic correction badge was a cosmetic issue. Preference-save infrastructure-fault behaviour remained unassessed. Table 4 therefore supports tested state controls more strongly than content quality. Inspection was not a participant study or full accessibility audit.

**Table 4. Design Evaluation Results**

| Method | Recorded result | Material qualification | Requirement contribution |
| --- | --- | --- | --- |
| Static analysis | Fourteen structural/verification checks recorded | Initial integration blocked by environment, unchanged retry passed. Earlier coverage limited to services/database access | RQ1–RQ3 — enabling validation, ownership and persistence contracts |
| Dynamic analysis | Thirteen runtime cases and twelve-screen manual pass, fifteen initial timings, median 3.331 s | Two indirect-call-count Partial Pass, driver assertion corrected without erasing first attempt. Not load evidence | RQ1–RQ3 — executed context, support, response and continuity paths |
| Bounds analysis | Seventeen deterministic-provider/real-database cases Pass | One race made two calls for one accepted write, state cap is not a cost ceiling | RQ3 — bounded adaptation and fade/cap persistence |
| Simulation | 55 attempts — 44 technical Pass, eight controlled initial ambiguities, three technical Fail | Delayed abort and two unchanged-correction rejections, dependent unreached steps not delivered | RQ1 — ambiguity/repair, RQ2 — generated support, RQ3 — live response paths |
| Delivered-content assessment | 91 outputs — 18 Pass, 71 Partial, two Fail | Single-assessor content evaluation, mass/weight and ion-charge errors remain | RQ1 — terminology/language, RQ2 — scientific explanation, RQ3 — adaptation appropriateness |
| Supplementary bilingual assessment | 32 saved outputs, 104 paired passages, four Major and 27 Minor annotations, ten shared-content advisories | Purposeful sample and exploratory model-assisted annotation, no independent qualified review. Original content ratings unchanged | RQ1 — terminology/fidelity, RQ2 — scientific meaning, RQ3 — limits of language revision |
| Black-box testing | 24 assessed cases — 21 Pass, two Partial, one Fail | Novelty unassessed in two fixtures, anonymous-identity boundary disagreed with expectation, supplemental ambiguity-round assertion also Fail | RQ1–RQ3 — observable contracts, including failed identity/ambiguity expectations |
| White-box testing | Six structural groups Pass, 373 unique tests, 42-file coverage | Mocks do not validate live content, unexercised paths remain, browser/database observations excluded from V8 totals | RQ1–RQ3 — internal contract/route coverage, RQ3 persistence/continuity |
| Usability inspection | Nine criteria — six Pass, three Partial, 133 captures | Modal focus/localisation severity 2, ambiguity badge severity 1, preference-save fault unassessed, no participants | RQ1/RQ2 — readable support, RQ3 — understandable response/state interaction |
| Design informed argument | Eight arguments — two Supported, six Partially supported | Literature-grounded rationale, not learner outcomes or independent replication | RQ1–RQ3 — warranted feature mechanisms and counterarguments |
| Fresh Photosynthesis scenario | Fifteen technical checks Pass, two adaptations, four events, one stored follow-up | Cap/High/post-completion checks API-only, content provisional with scope, retention and novelty concerns | RQ1–RQ3 — one integrated workflow, with terminology/explanation qualifications |
| Design literature comparison | Thirteen comparisons — one Strong, nine Moderate, two Limited, one Contradictory/uncertain | Transfer/access limits, neither content superiority nor optimal dose established | RQ1–RQ3 — capability precedents and unsupported instructional-policy assumptions |

*Note.* Scales and denominators differ and are not pooled into a success rate. Later successful checks do not erase earlier failures. Independent expert interviews were not conducted. Model critique and content assessment are separate methods. Controlled evaluation does not establish usefulness during learners' everyday study (Venable et al., 2016).

## 4. Results and Interpretation

Interpretation separates technical behaviour, delivery and content quality, conceptual rationale and educational effects that were not measured.

### 4.1 Consolidated Results

The original synthesis contains 225 findings, including criteria judgements and derived analyses, not 225 independent tests or participants. External observations, bounds tests and internal assertions agree that routing, response/adaptation storage and session reconstruction follow tested controls. Fade and cap behaviour have direct instrumentation beyond earlier indirect observations. Follow-up uses the corrected concept without changing adaptation state. These findings apply under the tested conditions, not every possible use.

The supplementary bilingual assessment is recorded separately. It locates existing gravity and ion errors, unclear pH wording and further language limitations. Ten advisories concern scientific qualifications shared by both languages, rather than translation errors. This analysis clarifies content limitations without establishing learning outcomes. Its 41 annotations and 104 examined passages are not additional independent simulation runs.

Structurally valid outputs can contain scientific or Burmese-language errors or repeat earlier support without adding value. The two content Fail ratings remain despite better later outputs. Eight initial ambiguities without sessions and three live delivery Fail limit confidence in interpretation and adaptation. The fresh scenario supports the combined workflow, but its content ratings remain provisional and some checks were API-only. Controlled error handling protects stored state without guaranteeing useful assistance.

All thirteen Functionality criteria remain Partial, while Usability retains six Pass and three Partial. Technical checks do not establish broader requirement satisfaction. Literature can justify mechanisms without demonstrating learner benefit. Bounds tests, coverage, screenshots and content ratings were not averaged because they measure different things. Earlier attempts, expected/actual differences and derived analyses remain distinct. Tested controls are supported, while content, delivery and interaction problems remain unresolved.

### 4.2 Research Question Traceability

A 24-chain traceability analysis links problems, requirements, questions, objectives and artefacts to evaluation criteria and findings. Tables 2–4 map methods and outcomes to the questions. Table 5 states the problems, requirements and objectives behind each conclusion. All three questions remain Partially supported. A complete mapping does not mean every requirement was met.

For RQ1, contextual interpretation and selective bilingual support provide a reasonable approach to STEM terminology. Concept correction and language-support routes implement this approach. However, rejected unchanged corrections and Burmese terminology errors limit dependable support for the intended meaning. The evaluation does not establish validated automatic term extraction or a measured reduction in language barriers.

For RQ2, core explanations, examples, reflection and hints provide support beyond word-for-word translation. Errors in definitions and repetition of the first example limit content quality. Conceptual understanding and retention were not measured. Structured output makes explanations available, but does not show that learners understood them.

For RQ3, self-reported need selects predefined routes, limits generation and preserves response history. Concurrency and lifecycle tests support these controls. They do not show that support matches assessed competence, that withdrawing support is educationally appropriate, that responsibility transfers to the learner or that two adaptations are optimal. Self-report, reaching the adaptation limit and choosing Finish are different actions. Session completion does not show mastery.

Supplementary term and meaning differences qualify RQ1 and RQ2. Revised language-help presentation still contains wording and shared-content concerns, limiting adaptation-quality claims under RQ3. The three Partially supported conclusions remain unchanged. Re-examining the same saved outputs does not independently confirm earlier ratings.

**Table 5. Research Questions, Artefact Mechanisms and Evaluation Conclusions**

| Problem / issue | Requirement, question and objective | Artefact mechanisms | Support and remaining gap |
| --- | --- | --- | --- |
| English STEM terminology, limited Burmese resources and misleading literal translation | RQ1 — contextual Burmese support for specialised English terms while retaining useful English terminology. Objective — multilingual STEM terminology support | Terminology/context interpretation, selective bilingual support and bounded intended-concept repair | Partially supported — routes and presentation implemented, Burmese errors and rejected unchanged corrections limit fidelity. No validated term extraction or measured barrier reduction |
| Translation alone insufficient, limited explanation beyond isolated words | RQ2 — clear concepts and examples beyond translation. Objective — conceptual STEM explanation | Core explanation, examples, technical detail, reflection, hints and concept-focused revision | Partially supported — structured assistance delivered, mixed correctness and limited novelty remain. No measured understanding or retention benefit |
| Static/unstructured assistance and insufficient adaptive scaffolding | RQ3 — structured, learner-responsive assistance. Objective — an adaptive scaffolding approach | Self-report, optional help choices, deterministic routing, two-adaptation bound, persisted history and scoped follow-up | Partially supported — tested state and continuity controls, live delivery, identity-boundary discrepancy and interface defects remain. No competence diagnosis, calibrated fading or optimal dose |

*Note.* The complete questions are stated in Section 1. Conceptual criteria (Table 1), design criteria and outcomes (Table 3), and method results (Tables 2 and 4) supply the basis for these conclusions. “Enabling” results validate an interaction or state prerequisite, not the educational requirement itself. Problems are the research motivation, not new prevalence estimates. Requirement coverage does not establish educational effectiveness.

### 4.3 What the Evaluation Does and Does Not Show

The contribution is an evaluated integration of support responsibilities and application controls. Content quality and intended-meaning correction remain partially supported. [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish controlled evaluation from real use. Artificial inquiries, controlled providers and structured inspection cannot establish usefulness during everyday study. Reused outputs, revised arguments and summaries do not create independent evidence. Purposefully selected cases, variable model outputs and limited configurations restrict generalisation.

No participant learning or satisfaction study, independent expert review, assessment of the appropriate level or amount of support, or full accessibility audit was conducted. Preference-save fault behaviour and semantic novelty in two test fixtures remain unassessed. Some literature comparisons rely on abstracts, excerpts or secondary summaries rather than complete original texts. They do not validate Burmese equivalents. The two-round state limit does not cap concurrent provider work, and the configured timeout does not guarantee termination within twenty seconds. The evaluation therefore does not establish uniform correctness, superiority or educational effectiveness. Captures containing cookies require controlled retention and separately reviewed redacted copies before distribution. Having a traceable evidence record does not give permission to release it.

The supplementary bilingual sample was selected with prior knowledge of content risks. Its findings cannot be generalised to the unexamined outputs. Model-assisted annotations and proposed Burmese revisions require independent qualified checking before they can be treated as validated linguistic judgements. The local Major label describes a passage-level concern. It is not a replacement for the original simulation outcome or content rating.

## 5. Conclusion

The framework and application combine contextual terminology support, explanation beyond translation and assistance based on learner responses. Literature-grounded reasoning supports these responsibilities. External observations and internal/database tests support routing, persistence and session continuity under the tested conditions. This demonstrates an implemented design, not consistently accurate or effective tutoring.

RQ1–RQ3 remain partially supported because terminology errors, scientific errors and unsuccessful concept corrections limit the broader requirements. Self-reported need guides assistance without diagnosing competence. High-to-fade, two stored adaptations and explicit completion are design rules, not evidence of mastery or the best amount of support. The mixed content and interface findings remain central to the conclusions.

Supplementary bilingual analysis makes several language and meaning problems more precise without changing the original ratings or establishing general translation quality.

Future work should address the Burmese/STEM errors, delivery failures and interaction defects. Changes should be recorded under a new baseline and the affected checks rerun. Studies with learners and independent content assessors would then be needed to examine benefit in practice. This evaluation does not establish improved learning or whether support is adjusted appropriately to learner competence.

## References

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. [https://doi.org/10.7763/IJCTE.2025.V17.1378](https://doi.org/10.7763/IJCTE.2025.V17.1378)

Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement: Inaccurate self evaluations undermine students' learning and retention. *Learning and Instruction, 22*(4), 271–280. [https://doi.org/10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003)

Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., & Macherey, W. (2021). Experts, errors, and context: A large-scale study of human evaluation for machine translation. *Transactions of the Association for Computational Linguistics, 9*, 1460–1474. [https://doi.org/10.1162/tacl_a_00437](https://doi.org/10.1162/tacl_a_00437)

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y., Chen, D., Dai, W., Chan, H. S., Madotto, A., & Fung, P. (2024). *Survey of hallucination in natural language generation* (Version 7) [Preprint]. arXiv. [https://arxiv.org/abs/2202.03629v7](https://arxiv.org/abs/2202.03629v7)

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. [https://doi.org/10.18653/v1/2026.findings-eacl.204](https://doi.org/10.18653/v1/2026.findings-eacl.204)

Kuzu, T. E. (2026). AI-supported translanguaging processes in primary school: Empirical insights into ChatGPT's role in multilingual interactions. *Technology, Knowledge and Learning*. Advance online publication. [https://doi.org/10.1007/s10758-026-09974-7](https://doi.org/10.1007/s10758-026-09974-7)

Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257–285. [https://doi.org/10.1207/s15516709cog1202_4](https://doi.org/10.1207/s15516709cog1202_4)

Tran, H. T. H., Martinc, M., Caporusso, J., Doucet, A., & Pollak, S. (2023). *The recent advances in automatic term extraction: A survey* (Version 1) [Preprint]. arXiv. [https://arxiv.org/abs/2301.06767v1](https://arxiv.org/abs/2301.06767v1)

University of Auckland. (2026). *INFOSYS 720: Evaluate information systems artefacts* (Assignment 5 specifications, Version 3) [Course handout].

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)

## Appendix A. Fixed Simulation Inquiries

**Table A1. Main Simulation Input Corpus**

| Domain | Exact inquiry |
| --- | --- |
| Biology | What is photosynthesis, and how do plants make food? |
| Biology | What is DNA? |
| Biology | What is osmosis? |
| Physics | What is gravity? |
| Physics | What is electric current? |
| Physics | What is momentum? |
| Chemistry | What is pH? |
| Chemistry | What is an ion? |
| Chemistry | What is a catalyst? |
| Computing | What is inheritance in object-oriented programming? |
| Computing | What is an algorithm? |
| Engineering | What is carbon fibre? |
| Ambiguous | What is a cell? |
| Ambiguous | What is current? |
| Ambiguous | What is a network? |
| Ambiguous | What is inheritance? |

*Note.* Each inquiry was attempted once on each of the three paths described in Section 3.3, giving 48 main attempts. Seven additional attempts exercised language help and intended-concept correction. A controlled ambiguous initial result created no session, so dependent steps were not executed or counted as successful. These inquiries were selected for the evaluation, not sampled to represent all STEM inquiries or learners. Variable model outputs may differ from the retained text on another run.

### A.1 Supplementary inputs and response paths

The main inquiries are listed in Table A1. Case identifiers link inputs, technical outcomes and content ratings across the following tables. Each A, B or C suffix identifies a separate run, not a learner.

**Table A2. Supplementary Language and Context Inputs**

| Case | Exact inquiry | Clarification | Language |
| --- | --- | --- | --- |
| SIM-LANG-01 | What is electric current? | Not supplied | bilingual |
| SIM-LANG-02 | What is electric current? | Not supplied | english |
| SIM-LANG-03 | What is electric current? | Not supplied | burmese |
| SIM-CM-13 | What is a cell? | I mean a biological cell | bilingual |
| SIM-CM-14 | What is current? | I mean electric current | bilingual |
| SIM-CM-15 | What is a network? | I mean a computer network | bilingual |
| SIM-CM-16 | What is inheritance? | I mean inheritance in object-oriented programming | bilingual |

**Table A3. Planned Main Simulation Paths**

| Path | Recorded sequence | Purpose |
| --- | --- | --- |
| A | Initial support, High, Finish | Fade without another generated output |
| B | Initial support, Medium with optional help skipped, High, Finish | Default another-example adaptation |
| C | Initial support, simpler explanation, conceptual clarification, cap check | Two adaptations and the stored-round limit |

## Appendix B. Analytical Evaluation Records

Analytical evaluation examined structure, runtime behaviour and bounded state. The summary distinguishes observed behaviour from content quality and performance guarantees.

**Table B1. Analytical Evaluation Summary**

| Method and scope | Principal result | Important qualification |
| --- | --- | --- |
| Static analysis — 14 checks, supported by lint, TypeScript, build and suite verification | Layer separation, validation, learner-scoped persistence and safe error boundaries were supported | An environment-blocked integration attempt passed on unchanged retry. Earlier coverage covered services/database access only |
| Dynamic analysis — 13 workflow cases and 12 browser observations | Creation, adaptation, corrected context, scoped follow-up, Review/Resume and recovery were observed | Two fade/cap cases retained Partial Pass because provider calls were observed indirectly |
| Timing — 15 sequential initial requests across five inquiries | Median 3.331 s, range 2.593–4.640 s | Local initial-generation timing, not load performance or an established service-level target |
| Bounds — 17 deterministic-provider/real-database cases | Stored adaptations remained within rounds 0–2, including competing requests | One race made two provider calls for one accepted write. The state cap is not a cost ceiling |

**Table B2. Illustrative Runtime and Boundary Observations**

| Situation | Observed result | Interpretation |
| --- | --- | --- |
| High self-report | Fade event, no adaptation or round increment, Finish remains separate | No additional generated support, not evidence of mastery |
| Further support after round two | Response recorded without a third adaptation | The application enforces its stored-round bound |
| Reload an unfinished session | Adaptations, responses and limit feedback restored | Continuity under the inspected conditions |
| Controlled provider failure and recovery | Safe HTTP 502, question retained, successful resubmission after normal configuration restored | Recovery observed without invalid persistence |
| Two competing adaptation requests | One accepted write and one conflict, but two provider calls | Atomic storage does not eliminate duplicated generation work |

## Appendix C. Simulation Results and Content Assessment

The fixed inputs and paths are retained in Appendix A. Live-provider simulation used artificial identities and an isolated database. Technical execution, original content ratings and supplementary bilingual annotations are different assessments and are not pooled.

**Table C1. Technical Simulation Outcomes**

| Outcome | Attempts | Meaning and noticeable example |
| --- | --- | --- |
| Technical Pass | 44 | Expected route/state assertions held. High faded without another output, and support routes persisted within the two-adaptation bound |
| Controlled initial ambiguity | 8 | Unqualified current/network inquiries returned ambiguity without creating a session. This is not a delivered explanation or content Pass |
| Technical Fail | 3 | An electric-current path aborted at 52.825 s despite a 20 s configured timer. Biological-cell and programming-inheritance correction attempts returned unchanged interpretations and were rejected |

Only delivered support was content-rated. Fade, cap and unreached steps did not add outputs. The original rubric assessed scientific correctness, contextual relevance, English/Burmese adequacy, explanation beyond translation and adaptation appropriateness. Each applicable dimension received 2 for adequate, 1 for limited/minor issues or 0 for material error/absence. Initial outputs had no adaptation score.

**Table C2. Original Delivered-Output Content Ratings**

| Rating | Outputs | Decision rule |
| --- | --- | --- |
| Pass | 18 | Every applicable dimension scored 2 |
| Partial | 71 | At least one dimension scored 1, with no 0 |
| Fail | 2 | At least one dimension scored 0. The gravity and ion initial outputs contained material Burmese errors |

**Table C3. Selected Examples Across Simulation Paths**

| Tested support or boundary | Recorded example | Content or technical judgement |
| --- | --- | --- |
| Initial explanation | A photosynthesis output connected light energy, water/carbon dioxide and sugar production in both languages | Original content Pass |
| Another example after Medium | A chloride-ion example used Cl⁻ and explained excess electrons and negative charge | Original content Pass. It did not overwrite the failed initial ion definition |
| Simpler explanation | An ion revision clearly restated electron/proton imbalance | Original content Partial because the revision added little conceptual scaffolding |
| Conceptual clarification | A photosynthesis revision added energy conversion and a factory analogy | Original content Partial. Chemical energy and explanatory vocabulary still needed Burmese support |
| Language help, bilingual preference (SIM-LANG-01) | Electric current was described explicitly as charge per second, but charge/circuit/rate lacked useful Burmese pairing | Original content Partial |
| Language help, English preference (SIM-LANG-02) | The bilingual override worked, but Burmese speed wording conflicted with a later correct charge-per-second statement | Original content Partial |
| Language help, Burmese preference (SIM-LANG-03) | The revision distinguished current from charge, but both languages retained speed-like wording without a clear quantity-per-time explanation | Original content Partial |
| Intended-meaning correction | Cell and inheritance clarifications failed when the returned interpretation did not change | Technical Fail. No delivered correction adaptation was content-rated |
| Fade and cap | High added no generated support. Further support at the cap added an event without round three | Technical behaviour only, not additional content ratings |

### C.1 Focused Bilingual Error Assessment

A retrospective, risk-informed sample of 32 saved outputs covered all delivered main concepts, all three language-help cases and selected adaptations. All 104 paired passages were examined using local categories informed by Freitag et al. (2021). The sample was not random or blind. English was a comparison text, not a scientific gold standard. Scientific expectations and persisted text were checked separately. There was no approved Burmese glossary or independent qualified verification of the model-assisted annotations.

**Table C4. Supplementary Annotation Summary**

| Category | Findings | What was assessed |
| --- | --- | --- |
| Meaning / accuracy | 9 | Changed polarity, quantities, rates or qualifiers |
| Terminology | 6 | Wrong or inconsistent technical equivalents |
| Omission / addition | 1 | A useful term explanation lost between languages |
| Fluency / script | 8 | Awkward wording and unintended third-language fragments |
| Accessibility / retention | 7 | Unexplained English vocabulary in beginner/language-help support |
| Shared content limitation | 10 | Scientific qualifications missing or unclear in both languages, not translation defects |

The 41 findings comprise four Major annotations in three outputs, 27 Minor annotations and ten shared-content advisories. Major/Minor findings affect 21 selected outputs. Six had no specific issue identified and five had only shared-content advisories. These are not new Pass ratings. The other 59 delivered outputs were outside this assessment.

**Table C5. Illustrative English/Burmese Findings**

| Example | English excerpt | Burmese excerpt | Assessment | Revision direction |
| --- | --- | --- | --- | --- |
| Photosynthesis, initial explanation | capture light energy and store it as sugar | အလင်းရဲ့ စွမ်းအင်ကို ဖမ်းယူပြီး သကြားအဖြစ် သိမ်းထားတတ်ပြီး | Meaning preserved under focused comparison. Original output Pass | Selected English STEM retention was not automatically treated as an error |
| Gravity, simple definition | objects with mass | အလေးချိန်ရှိတဲ့ အရာဝတ္ထုတွေ | Major. Mass becomes weight | Use ဒြပ်ထု (mass), not weight |
| Gravity, technical definition | interaction between masses | အစုလိုက်အပြုံလိုက်ရှိတဲ့ အရာဝတ္ထုတွေ | Major. Physical mass becomes a collective/group expression | Use ဒြပ်ထုရှိသော အရာဝတ္ထုများ |
| Ion, technical definition | acquires a nonzero net charge | net charge မရှိတော့ဘဲ | Major. Burmese denies the defining nonzero net charge | State that net charge is nonzero, not absent |
| pH, simple definition | pH 7 is neutral | pH 7 ဆိုရင် မကြားနေတဲ့ အခြေအနေပါ။ | Major under the local passage rule. Chemical neutrality is unclear and conflicts with the correct hint | Use explicit neutral wording and specify the 25 °C condition |
| Current, initial language-help case | how much charge is moving each second | charge ဘယ်လောက်မြန်မြန် ရွေ့နေသလဲ | Minor. Charge quantity per second becomes movement speed | Explain charge amount crossing a point per second |
| Current, English-preference language revision | flow of electric charge | electric charge စီးဆင်းတဲ့ အရှိန် | Minor. Speed terminology remains although a later sentence gives correct units | Use စီးဆင်းနှုန်း with an explicit quantity-per-time explanation |
| Photosynthesis, conceptual revision | stored chemical energy | သိမ်းဆည်းထားနိုင်တဲ့ chemical energy | Minor. Meaning survives but a central term lacks a Burmese explanation | Pair chemical energy with ဓာတုစွမ်းအင် |
| Photosynthesis, initial explanation | a green pigment called chlorophyll | အရွက်ထဲက chlorophyll က အလင်းစွမ်းအင်ကို ဖမ်းယူပြီး | Minor omission. Chlorophyll is retained without the green-pigment description | Explain chlorophyll as an အစိမ်းရောင်ရောင်ခြယ်ပစ္စည်း |
| Current, Burmese-preference initial example | bulb lights up | မီးလုံး روشن ဖြစ်လာတာပါ။ | Minor. An Arabic-script fragment interrupts Burmese | Replace the fragment with မီးလုံး လင်းလာသည်။ |
| Current, Burmese-preference language revision | how fast charge is passing a point | charge ဘယ်လောက်မြန်မြန် ဖြတ်သန်းနေသလဲ | Shared-content advisory. Both languages use speed-like wording | Revise both versions to charge quantity per unit time |

*Note.* Excerpts are exact saved spans. Revision directions are editorial, not certified terminology or changes to stored outputs. The two gravity annotations belong to one failed output. The pH output remains Partial in the original rubric despite its new local Major annotation. The original 18 Pass, 71 Partial and two Fail totals are unchanged. Shared-source analysis, single-assessor/domain limits and purposeful selection prevent claims of corpus-wide translation accuracy or learner benefit.

## Appendix D. Black-Box Testing Records

Public HTTP/browser checks assessed externally visible behaviour using controlled provider responses. There were 24 cases, with 21 Pass, two Partial and one Fail. The summaries below group observations rather than create additional case totals.

**Table D1. External Behaviour and Material Qualifications**

| Area tested | Illustrative observation | Outcome or limitation |
| --- | --- | --- |
| Inquiry and structured support | Valid inquiry created retrievable support. Empty/malformed input was rejected. A 1,000-character inquiry was accepted and 1,001 rejected | Pass within tested inputs |
| Response routes and bounds | High faded, all five optional help routes and skip executed, and requests at the cap added no third adaptation | Default/explicit adaptation cases remained Partial because fixture semantic novelty was unassessed |
| Follow-up and continuity | Relevant answer persisted without changing adaptation state. Unrelated query was rejected. Two questions were allowed, a third rejected. Review/Resume restored stored history | Pass for tested external contracts |
| Preference and error handling | New settings persisted without altering old snapshots. Injected provider/malformed-output failures returned safe errors without invalid writes | Pass, not live-model quality evidence |
| Ownership and absent identity | Foreign sessions were inaccessible, but absent identity returned an anonymous cookie and HTTP 200 empty History rather than expected HTTP 400 | One case remains Fail. No foreign-session leak was observed |
| Retained subchecks | An assertion expected remaining-ambiguity support to use no round, but a generated clarification consumed one. Initial browser predicates were later corrected | The failed assertion and earlier observations remain recorded. Rechecks do not erase them |

## Appendix E. White-Box Testing and Coverage

The root application was exercised through 361 deterministic tests and twelve isolated MongoDB tests, giving 373 unique tests. The 39 route/round combinations are included in that total. Repeated commands are not extra tests.

**Table E1. Structural Areas Exercised**

| Area | Representative assertion | Recorded result |
| --- | --- | --- |
| Routing and two-adaptation bound | High caused no provider call or increment. Support at the cap created no round three. Optional routes and invalid inputs were checked | Structural group Pass |
| Ownership and lifecycle | Foreign/missing sessions were guarded. Finish was idempotent. Completed sessions rejected further responses. Legacy sessions remained retrievable | Structural group Pass |
| Concept-scoped follow-up | Corrected concept/latest support were used. Unrelated, excessive or overlength requests were controlled without altering adaptation state | Structural group Pass |
| Provider and output contracts | Timeout, refusal, missing text, invalid JSON and invalid structured content failed before invalid persistence | Structural group Pass |
| Persistence and concurrency | Corrections, responses and adaptations were stored consistently. Competing requests respected adaptation/follow-up limits and ownership | Structural group Pass, using real database checks |
| Preferences and language override | Valid settings persisted, invalid writes were rejected, old snapshots remained unchanged and language help could display both languages | Structural group Pass |

**Table E2. Application-Wide V8 Coverage**

| Metric | Covered / total | Coverage |
| --- | --- | --- |
| Statements | 708 / 976 | 72.54% |
| Branches | 627 / 821 | 76.37% |
| Functions | 128 / 200 | 64.00% |
| Lines | 680 / 922 | 73.75% |

*Note.* Coverage spans 42 executable files. Database/browser observations are not added to V8 totals. Passing assertions and coverage support exercised logic, not complete correctness, Burmese fidelity or educational effectiveness. Unexercised paths remain.

## Appendix F. Structured Usability Inspection

Desktop 1440 × 900 and mobile-emulated 390 × 844 viewports, English/Burmese interfaces, light/dark themes and keyboard interaction were inspected. Home, preferences, initial support and Stage 6B covered all eight combinations. Other states were distributed across them. A delayed mock provider exposed pending states without external calls. This was technical inspection, not a participant study.

**Table F1. Usability Outcomes and Observed Examples**

| Criterion | Outcome | Illustrative observation |
| --- | --- | --- |
| Task clarity | Pass | Labelled inquiry and keyboard submission made the starting action clear |
| Information structure | Pass | Explanation, example, technical detail, reflection and hint were distinguishable |
| Interaction clarity | Pass | Three self-reports, five optional help choices and skip/back were usable |
| Feedback visibility | Pass | Pending/adapting, fade, cap and completion feedback were visible |
| Navigation consistency | Partial | History/Review/Resume worked, but modal keyboard focus was not controlled |
| Bilingual readability | Pass | Inspected Burmese glyphs and mixed-language content wrapped without material clipping. This was visual, not semantic adequacy |
| State visibility | Pass | Routes, limits and history were distinguishable, with a minor ambiguity-badge inconsistency |
| Error clarity | Partial | Recovery controls worked, but English-only error explanations remained in Burmese UI |
| Consistency | Partial | Modal focus, untranslated errors and the ambiguity badge remained inconsistent |

**Table F2. Material Interface Issues**

| Issue | Task effect | Severity |
| --- | --- | --- |
| Preference modal did not contain or restore focus | Keyboard navigation reached background controls, requiring extra navigation | 2 |
| English-only errors in Burmese interface | Recovery meaning was unavailable in the selected language although retry controls worked | 2 |
| Generic Concept Correction badge during remaining ambiguity | Badge suggested correction, while the trace accurately reported unresolved meaning | 1 |

*Note.* Six criteria were Pass and three Partial. Severity 1 means cosmetic, 2 an impediment with a workaround and 3 task blockage/materially misleading behaviour. Preference-save infrastructure-fault presentation was not assessed. No physical-phone, satisfaction or full accessibility claim follows.

## Appendix G. Photosynthesis Scenario Records

A separate walkthrough examined an integrated session with beginner, guided, Burmese-with-English-term preferences. Fifteen technical checks passed for this one workflow, not fifteen independent scenarios. It ended with two adaptations, four response events, one stored follow-up and completion.

**Table G1. Scenario Workflow and Observation Boundaries**

| Action | Observed result | Boundary |
| --- | --- | --- |
| Initial inquiry and hint | Photosynthesis/plant biology and five bilingual support fields were created. Hint was revealed | Browser observation with persisted-state checks |
| Medium, optional help skipped | Another example persisted at round one | Browser action. Example novelty remained limited |
| Needs Support, conceptual clarification | Core meaning and factory analogy revised at round two. Limit and Finish appeared | Browser action. No further response choice was offered |
| Cap and High at cap | Each added a response event without another adaptation or provider call | Separate API checks, not learner clicks. High did not complete the session |
| Relevant/unrelated follow-up | Sunlight question answered and stored. Gravity question rejected without changing the session | Concept-scoped support, not general chat |
| History, Resume, Finish and Review | Stored interaction restored. Finish changed lifecycle. Post-completion response rejected | Browser continuity plus a separate post-completion API check |

**Table G2. Provisional Scenario Content Assessment**

| Observation | Qualification |
| --- | --- |
| Light energy and material inputs distinguished | Main mechanism corresponded across languages, but bacteria/chloroplast wording could overgeneralise organelle scope |
| Round-two factory analogy clarified making rather than taking food | The first additional example largely repeated earlier support. Analogy use did not establish comprehension |
| Burmese support retained useful STEM terms | Nontechnical English such as root, leaf and raw materials also remained. Chemical energy needed an explicit Burmese explanation |
| Sunlight follow-up explained energy for sugar production | One relevant answer does not establish general scope-classification accuracy |

Content remains provisionally Partial. This walkthrough is separate from the original 91-output simulation assessment and does not erase its failures.

## Appendix H. Supporting Conceptual and Design Evaluations

These summaries show how critique, literature, informed argument and scenarios evaluated the artefacts. They are not additional software tests or independent learner studies. Scholarly bases and source-access limits are explained in Sections 2 and 3.

**Table H1. Conceptual Evaluation Activities**

| Activity and scope | Principal finding | Boundary or refinement |
| --- | --- | --- |
| GenAI interview — nine fixed questions and 47 coded findings | Requirement coverage and progression beyond translation were recognised. Self-report, decision logic and explanation/scaffold overlap were challenged | Model critique, not expert testimony. Responses informed clearer core-meaning/scaffold roles and bounded re-entry |
| Literature comparison — existing 17-study corpus, 19 findings | Contextual terminology, selective language support and structured assistance were justified in principle | Cross-language/domain transfer and secondary-source limits remain. Exact topology and adaptation rules were not validated |
| Informed argument — seven responsibilities | Terminology identification and core meaning were Conceptually justified. Five responsibilities were Justified with qualification | Tran et al. (2023), Goodhue and Thompson (1995), Sweller (1988), Ji et al. (2024), Kleidermacher and Zou (2026), van de Pol et al. (2010), and Dunlosky and Rawson (2012) support mechanisms and counterarguments, not learner outcomes |
| Historical Photosynthesis illustration | Explanation, bilingual support and check–example–check interaction were illustrated | Trigger, strategy rationale, later transitions and execution provenance were incomplete. The fresh design scenario cannot fill these historical gaps |

*Note.* Current conceptual synthesis retains C1 Fully supported for responsibility coverage and C2–C5 Partially supported. The original interview assessed boundary completeness under C4, not the final literature-consistency criterion. Later refinement is not attributed to the original critique.

**Table H2. Design Informed-Argument Conclusions**

| Mechanism examined | Scholarly warrant and counterargument | Conclusion |
| --- | --- | --- |
| Terminology/context and intended-meaning repair | Tran et al. (2023) and Goodhue and Thompson (1995). Intended interpretation can remain wrong or uncorrected | Partially supported |
| Selective bilingual language support | Kleidermacher and Zou (2026) and Goodhue and Thompson (1995). Term retention does not guarantee clear Burmese support | Partially supported |
| Core meaning and scaffold forms | Athukorala and De Silva (2025) and van de Pol et al. (2010). Structured content can remain inaccurate or repetitive | Partially supported |
| Optional stated-need collection | van de Pol et al. (2010) and Goodhue and Thompson (1995). A bounded response signal is available, but does not diagnose competence | Supported for stated-need collection only |
| Bounded adaptation and fade | van de Pol et al. (2010). Route/state controls work, but calibrated support and optimal dose are unestablished | Partially supported |
| Concept-scoped follow-up | Goodhue and Thompson (1995), applied to the supporting task. Tested scope is not universal classification accuracy | Supported for the tested scoped mechanism |
| History and preference continuity | Goodhue and Thompson (1995), applied to task continuity. Persistence works, but interface/task-fit limits remain | Partially supported |
| Application-controlled boundaries | Hevner et al. (2004) and Venable et al. (2016). Safe failure does not guarantee successful delivery or content | Partially supported |

**Table H3. Design Literature Comparison Summary**

| Rationale rating | Comparisons | Interpretation |
| --- | --- | --- |
| Strong | 1 | The need to critically evaluate specialised/low-resource output was well justified, not the observed quality certified |
| Moderate | 9 | Native-language assistance, structured explanation, multilingual interaction and adaptive integration had relevant precedents with transfer limits |
| Limited | 2 | Terminology-identification and workflow evidence did not establish extraction performance or learner fit |
| Contradictory/uncertain | 1 | Exact High-to-fade and two-adaptation policy lacked pedagogical validation |

The thirteen comparisons included five previously reviewed systems. No comparator was newly executed. Literature rationale, implementation behaviour and educational usefulness remain different claims. Research-question conclusions and their limitations are mapped in Table 5, without a duplicate traceability appendix.
