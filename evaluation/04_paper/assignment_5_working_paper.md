# Evaluating Adaptive LLM Scaffolding for Burmese-Speaking STEM Learners

## Abstract

Burmese-speaking STEM learners may need help with English terminology and unfamiliar concepts. A Context-Aware Adaptive STEM Scaffolding Framework and a bilingual large language model application are evaluated in this study. Conceptual evaluation uses GenAI critique, literature analysis, informed argument and a historical scenario. Design evaluation uses functionality and usability criteria, code and runtime analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a live scenario. Tests support application-controlled routing, stored response history and persistence under the tested conditions. Content assessment rated 91 delivered outputs as 18 Pass, 71 Partial and two Fail. Usability inspection found six criteria Pass and three Partial. The study demonstrates an integration of terminology support, explanations and learner-responsive assistance within a two-adaptation limit. It does not establish improved learning or whether the level of support and adaptation limit are educationally appropriate.

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

A fresh Temporary Chat on 28 September 2026 used nine fixed questions and no browsing. The interface reported GPT-5.6 Sol with High reasoning. This identifies the displayed model setting, not an independently verified provider version. The original framework, requirements, theoretical framing and Photosynthesis scenario were supplied as text. The responses and their coded analysis were retained separately.

Responses were coded as support, concern, missing element, unsupported assumption, suggested improvement or out of scope, then related to the conceptual criteria. The critique recognised requirement coverage and support beyond translation. It also identified risks in self-report, interpretation, explanation quality and unclear adaptation decisions. Its distinction between core explanation and assistance helped clarify those responsibilities. Suggestions were assessed against literature, informed argument and scenario findings before acceptance. Table 2 retains the interview's original judgements. Model confidence was not treated as measured certainty. The model did not evaluate the later application routes or independently validate the refined framework. The interview provides a structured challenge to assumptions, not expert testimony or evidence of learner benefit.

Interview topics and coded findings are provided in Tables H1–H2.

### 2.3 Academic Literature Evaluation

Conceptual literature evaluation used an existing 17-study corpus rather than conducting a new search. Nineteen findings linked relevant research to the seven responsibilities and the concerns raised by the GenAI critique. Each comparison examined what the literature supported, where its findings might not transfer and what this meant for the framework. The purpose was to evaluate the proposed design, not to establish that no similar approach exists elsewhere.

Native-language technical assistance offers a relevant precedent in Sinhala programming education ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)), but its language and findings do not transfer directly to Burmese STEM learners. Scientific-paper translation provides a rationale for retaining selected English terms ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). Novice understanding of those terms cannot be established from the preferences reported in that study. Guided multilingual interaction in [Kuzu (2026)](https://doi.org/10.1007/s10758-026-09974-7) suggests a limitation of the application. Choosing assistance from a menu without a teacher is not equivalent to teacher-guided support.

These comparisons support responsibilities for context, language and assistance. They do not validate the exact stage structure, route table or two-round policy. Some comparisons relied on secondary summaries rather than direct access to the original studies. This limits the strength of those comparisons, which are not independent checks of the originals. The studies therefore provide reasons for including particular responsibilities, while differences in language, learners and setting limit the conclusions.

The nineteen recorded literature comparison findings are provided in Table H3.

### 2.4 Informed Argument

Informed argument uses scholarly sources to explain why a design mechanism may be useful, what would be lost if it were removed and what objections remain. This follows descriptive evaluation in information systems research ([Hevner et al., 2004](https://doi.org/10.2307/25148625), p. 86, Table 2). The argument assesses the refined framework. Sources added during this assessment are not presented as part of the earlier interview or literature corpus.

[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) support examining whether technology suits the tasks it is intended to assist. Applying this idea to STEM learning provides a design rationale, not a measured level of task–technology fit. Without term and context identification, the application could explain the wrong meaning. [Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1) support attention to domain terminology, but do not validate this application's term identification. Without language selection, retaining English terms could become arbitrary. Without an explicit core explanation, examples might not clearly communicate the concept. [Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4) provides an instructional rationale for considering cognitive demands, but this study did not measure cognitive load. [Ji et al. (2024)](https://arxiv.org/abs/2202.03629v7) also show why fluent generated text should not be assumed to be reliable.

[Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) identify support adjusted to learner need, gradual withdrawal of support and transfer of responsibility as central to scaffolding. These ideas support purposeful assistance and responsive adjustment. However, self-report alone cannot show whether assistance matches a learner's actual competence. Examples or hints may be available without meeting the learner's expressed need. Self-evaluation can also be inaccurate ([Dunlosky & Rawson, 2012](https://doi.org/10.1016/j.learninstruc.2011.08.003)), although this does not make every learner response unreliable. Removing response collection or adaptation would break the feedback process. Conversely, stopping generation after a high self-report does not show mastery. Target identification and core meaning were rated Conceptually justified. The other five responsibilities were Justified with qualification. Designs that combine stages or involve a teacher remain reasonable alternatives.

The seven responsibility-level informed arguments and their scholarly basis are provided in Table H4.

### 2.5 Scenario Evaluation

An earlier Photosynthesis interaction illustrates core explanation, structured support and a check–example–check sequence. It shows how the framework could work in an interaction, but does not record the exact response that triggered adaptation, a second adaptation, fade/cap behaviour, a follow-up answer or the complete session lifecycle. Execution date, model and code version were not recorded. The example therefore cannot establish why a support strategy was selected or whether the learner's reported understanding changed. Scenario applicability remains partial despite the earlier positive judgement. The fresh application walkthrough in Section 3.5 is separate evidence and cannot fill gaps in the earlier record. The historical scenario illustrates the responsibilities, not participant learning or complete coverage of state transitions.

The historical scenario's evidence and missing transitions are summarised in Table H7.

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

The application was evaluated through automated tests, browser observations and content assessment. The application uses one initial LLM call to generate a structured explanation and support. Stage 6A offers “I understand” (High), “I partially understand” (Medium) and “I need more explanation”. Learners selecting either of the latter two can optionally request a simpler explanation, another example, help with Burmese/English terms, conceptual clarification or correction of the intended concept. This optional choice forms Stage 6B. It can be skipped, while concept correction requires a short contextual clarification. Application logic, not the LLM, selects the route.

High records a fade event without generating more content or increasing the adaptation round. It does not complete the session. The application can store up to two adaptations. At the limit, further responses are recorded without creating a third adaptation. Explicit Finish completes the session. A separate concept-scoped follow-up allows two questions without using adaptation rounds. Stored content, responses and interpretation changes support History, Resume and Review. Production code was kept at one frozen baseline. Additional tests and configuration in the root application were tracked separately without changing that production baseline.

Without an optional help choice, Medium requests another example and Needs Support requests a simpler explanation. Explicit choices select the corresponding scaffold, bilingual language revision, core-meaning revision or bounded concept/context reinterpretation. Language help can override presentation for that adaptation without changing the saved learner profile. Persisted events record the selected route and round transition, including fade and capped responses.

Evaluation used the local application rather than a public deployment. The environment comprised macOS 26.6.2, Node.js 26.4.0, npm 11.17.0, Next.js 16.3.4, MongoDB 8.2.6 and Vitest/V8 4.1.11. Simulation used the OpenAI Responses API, configured as `gpt-5.4-mini`, with reported model `gpt-5.4-mini-2026-03-17`, strict structured output, no custom sampling or automatic retry, and a 20-second configured timeout. The following sections distinguish mocked-provider tests, live-provider tests, database checks and browser observations. Passing one type of check does not establish success in the others.

### 3.1 FURPS Functionality and Usability Criteria

FURPS denotes Functionality, Usability, Reliability, Performance and Supportability (Grady & Caswell, 1987, as cited in University of Auckland, 2026). This evaluation defined thirteen Functionality and nine Usability criteria (Table 3). It did not score all five FURPS dimensions separately. Expected response, lifecycle and storage behaviour was fixed before execution. Technical checks examine whether the application enables terminology, explanation and adaptation tasks, not whether these tasks improve learning. All composite Functionality outcomes remain Partial. Usability has six Pass and three Partial.

For technical cases, Pass means that the predefined assertions held. Fail means that a mandatory assertion was contradicted. Composite Partial means that support or coverage was incomplete, including cases with failed subchecks. Content was assessed separately for correctness, context, language, explanation and adaptation. Ratings distinguished adequate content, limited content or minor issues, material errors or absent content, and content that could not be assessed. A valid output structure alone could not earn a content Pass.

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

Analytical evaluation separates code structure, observed runtime behaviour and the limits on stored state. Static inspection identifies inconsistencies without generating text. Dynamic analysis observes application state and recovery during execution. Bounds analysis checks whether the adaptation limit holds at edge cases and when requests compete. None of these methods alone establishes that explanations are scientifically or linguistically adequate.

#### 3.2.1 Static Analysis

Fourteen formal checks examined separation between software layers, validation, ownership, persistence and error handling, alongside lint, TypeScript and production-build checks. Verification used `npm run lint`, `npx tsc --noEmit`, deterministic/integration tests and the production build. Inspection traced interface handlers through services to database-access code. The first integration attempt was blocked by the environment. A permitted retry with unchanged code passed under the recorded conditions. Earlier coverage was limited to services and database-access code. These checks establish structural consistency, not successful live generation or scientific accuracy.

#### 3.2.2 Dynamic Analysis

Thirteen runtime cases traced creation, responses, corrected context, follow-up, persistence and recovery. A manual twelve-screen pass added browser observations. Two cases retained Partial Pass because provider-call counts were observed only indirectly. An incorrect assertion about a response property was corrected, while the original attempt was retained. Fifteen successful initial requests across five fixed inquiries had a median latency of 3.331 seconds and a range of 2.593–4.640 seconds. These local sequential timings do not measure adaptation latency, performance under load or production service levels. Screenshots confirm presentation, not learning.

#### 3.2.3 Optimisation / Bounds Analysis

Seventeen cases using a deterministic provider and real MongoDB passed checks for stored rounds, fade/cap events, completion, invalid state and competing requests. High stores a fade response without generation or round increment. A support-needed response at round two stores an event without creating round three. Atomic database updates keep accepted response events and adaptations consistent. However, one contention case made two provider calls while accepting one write. The limit on stored adaptations therefore does not guarantee a limit on provider cost. Here, “Optimisation” means checking the bounded behaviour. It does not mean that two adaptations are the best instructional amount or that overall performance has been optimised. Finish remains separate from High.

Case-by-case analytical results, timings and manual browser observations are provided in Tables B1–B5.

### 3.3 Simulation

Simulation examined generated behaviour using fixed artificial inputs. It did not measure learner outcomes. Sixteen inquiries covered biology, physics, chemistry, computing, engineering and ambiguous terminology. Appendix A gives their exact wording. Each inquiry used three planned paths. The first selected High then Finish. The second selected Medium without a help choice, then High and Finish. The third requested a simpler explanation, conceptual clarification and a cap check. Fresh artificial identities used beginner, bilingual and guided-support preferences. Expected concepts, key facts and unacceptable misconceptions were specified before execution. Exact outputs and stored state were retained. The simulation invoked actual route handlers, services and database-access code, but not browser interaction or the public HTTP/proxy transport.

The simulation comprised 48 planned main attempts and seven language/context supplements, giving 55 attempts with a live provider and isolated database. Results were 44 technical Pass, eight controlled initial ambiguities without sessions, and three technical Fail. One attempt aborted at 52.825 seconds despite a configured 20-second timer. Two concept-correction attempts were rejected because the returned concept and domain were unchanged. The cause of the delayed abort was not established. Downstream steps that were not reached were not counted as delivered support.

Separately, 91 delivered outputs received 18 Pass, 71 Partial and two Fail ratings. These were support outputs, not 91 learners. All 91 delivered simulation outputs were assessed against the predefined content criteria. The assessment was informed by postgraduate STEM knowledge, native Burmese fluency and advanced English proficiency. Specialist competence in every domain was not independently established, and there was no second independent assessor. The gravity explanation used `အစုလိုက်အပြုံလိုက်` instead of `ဒြပ်ထု` for mass. The Burmese technical definition of an ion used `net charge မရှိတော့ဘဲ`, meaning that net charge was no longer present, but then stated that a positive or negative charge formed. The sentence was internally contradictory and disagreed with the corresponding English definition, which correctly described a nonzero net charge. Later adaptations did not correct the original stored text. Rejection of invalid responses and preservation of stored state show safeguards, not consistently successful or adequate assistance.

The supplementary inputs and paths are provided in Tables A2–A3. All technical attempts and delivered-output content ratings are provided separately in Tables C1–C4.

### 3.4 Black-Box and White-Box Testing

Black-box tests examined public HTTP and browser responses against expected outcomes. White-box tests exercised code branches with mocked LLM/database boundaries and separate real-database tests. Assertions checked response payloads, provider-call decisions, accepted writes and preserved state. Cases included malformed inputs, provider failures, ownership, legacy sessions and concurrent updates. The root application's `npm test`, `npm run test:coverage` and `npm run test:integration` commands distinguish deterministic, V8 coverage and isolated-MongoDB checks. These methods expose externally visible defects and gaps in internal code paths. They do not assess the educational quality of generated content.

Public HTTP/browser assessment recorded 24 black-box cases, with 21 Pass, two Partial and one Fail. Two route/rendering cases did not assess semantic novelty. The failed missing-identity case expected HTTP 400 rejection. Instead, the public proxy created an anonymous cookie and returned HTTP 200 with empty History. This difference between expected and actual behaviour remains a Fail. No foreign-session leak was observed. A supplemental zero-round ambiguity assertion also failed because accepted support for remaining ambiguity consumed a round. Original attempts and later corrections to the test driver were retained separately. These findings apply to the tested inputs and boundaries, not every possible response.

White-box evaluation used the root application, with 361 deterministic and twelve isolated MongoDB tests. This gives 373 unique tests, not a larger total from repeating commands. Six structural groups passed, including 39 route/round combinations and checks for persistence, legacy sessions, errors and lifecycle behaviour. V8 coverage across 42 files was 72.54% statements, 76.37% branches, 64% functions and 73.75% lines. Mocked boundaries support claims about exercised logic. Real database tests support persistence claims. Neither verifies live content, and some code remains untested. Browser/database observations were not added to V8 totals. Tests sharing inputs are not independent replications.

Black-box cases and retained subchecks are provided in Tables D1–D2. The complete automated-test inventory, route matrix and coverage results are provided in Tables E1–E4.

### 3.5 Informed Argument and Scenario

Eight design arguments connected scholarly sources, implemented features, observations and counterarguments. Two were Supported and six Partially supported. [Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) support assessing whether features suit terminology, explanation and responsive-assistance tasks. Feature availability alone does not establish learner fit. [Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) distinguish responsive assistance from support adjusted to assessed competence. Stored history allows continuity, but does not itself transfer responsibility to the learner. [Hevner et al. (2004)](https://doi.org/10.2307/25148625) support literature-grounded argument as a complementary evaluation method, not a substitute for behavioural checks. The observed failures limit these design arguments even where their theoretical rationale is reasonable.

A fresh Photosynthesis walkthrough recorded two adaptations, four response events, one stored follow-up and completion at round two (Figure 2). Fifteen technical checks passed. Cap, High-at-cap and post-completion response checks were application programming interface (API) requests, not learner clicks. Browser Resume/Review restored the same state. Content remains provisionally Partial because of bacterial/chloroplast scope wording, extensive retention of nontechnical English and limited novelty in the first example. This walkthrough was separate from the simulation content assessment, so its content judgements remain provisional. One successful workflow does not remove earlier failures or show that a participant learned.

![Photosynthesis walkthrough with browser actions and separately labelled API-only checks](assets/figure_2_photosynthesis_reader.svg)

**Figure 2. Recorded Photosynthesis walkthrough, 3 October 2026.** Solid boxes show the scripted browser workflow and support. Dashed boxes identify separately executed API-only boundary checks. At round two the interface offers no further response choices. Separate API requests add capped and fade events without generation. High does not complete the session. An unrelated gravity follow-up is rejected without an extra save or concept change. History, Resume, explicit Finish and Review preserve the session. This is a technical observation, not a learner study. Content remains provisional.

The design arguments are provided in Table H5. Scenario actions, technical checks and provisional content observations are provided in Tables G1–G3.

### 3.6 Academic Literature Evaluation

Design literature evaluation compared implemented capabilities with relevant research and previously reviewed systems. Each comparison considered the reported capability, corresponding application evidence, limits on transfer, contradictory evidence and source access. Thirteen design comparisons included five previously reviewed systems. Ratings were one Strong, nine Moderate, two Limited and one Contradictory/uncertain. These labels describe the strength of the literature rationale, not the quality of generated content. The Sinhala programming assistant provides a relevant precedent for technical-language support ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)). Comparisons based only on secondary summaries carry weaker evidence. No fresh execution of those systems was conducted, and a feature omitted from a source description was not treated as proof that the feature was absent.

The comparisons support combining contextual explanations with language assistance, while also identifying capabilities that this application does not provide. Research on selective term retention offers a rationale for the language strategy, but does not establish its suitability for Burmese-speaking novices ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). The Strong rating concerns the rationale for critically evaluating LLM support, not strong generated content. The adaptation-policy comparison does not validate the exact fade rule or two-round limit. Differences in setting and limited source access prevent claims that this application is better than the compared approaches.

All thirteen design literature comparisons are provided in Table H6.

### 3.7 Design Evaluation Summary

Structured usability inspection used Chrome 154.0.8037.97 with desktop 1440 × 900 and mobile-emulated 390 × 844 viewports, English/Burmese interfaces and light/dark themes. Home, preferences, initial content and Stage 6B were inspected in all eight combinations. Other states were distributed across configurations rather than claimed in every combination. A controlled provider with a 1,500 ms delay made pending states inspectable. It involved zero external provider calls and did not measure production latency. Native keyboard interaction, screenshots and read-only interface inspection were used without altering the interface to manufacture outcomes.

Table 4 shows stronger evidence for controlled state behaviour than for content quality or live delivery. Structured usability inspection found six criteria Pass and three Partial. The Partial criteria concern navigation consistency, error clarity and consistency across configurations. Modal focus problems and English-only errors in the Burmese interface have severity 2, meaning that they impede a task but allow a workaround. A generic correction badge when ambiguity remains has severity 1, meaning a cosmetic issue. Severity 3 would mean a blocked task or materially misleading behaviour. Usability Pass requires all planned checks to be completed without severity 2 or 3 issues. Partial reflects severity 2 issues or incomplete coverage. The preference-save infrastructure-fault interface was Not assessed. This inspection did not involve participants, physical phones or a full accessibility audit. Visual readability does not establish scientific accuracy, and completed evaluation does not mean that every criterion passed.

The full usability inspection matrix, criterion outcomes and issue register are provided in Tables F1–F3.

**Table 4. Design Evaluation Results**

| Method | Recorded result | Material qualification | Requirement contribution |
| --- | --- | --- | --- |
| Static analysis | Fourteen structural/verification checks recorded | Initial integration blocked by environment, unchanged retry passed. Earlier coverage limited to services/database access | RQ1–RQ3 — enabling validation, ownership and persistence contracts |
| Dynamic analysis | Thirteen runtime cases and twelve-screen manual pass, fifteen initial timings, median 3.331 s | Two indirect-call-count Partial Pass, driver assertion corrected without erasing first attempt. Not load evidence | RQ1–RQ3 — executed context, support, response and continuity paths |
| Bounds analysis | Seventeen deterministic-provider/real-database cases Pass | One race made two calls for one accepted write, state cap is not a cost ceiling | RQ3 — bounded adaptation and fade/cap persistence |
| Simulation | 55 attempts — 44 technical Pass, eight controlled initial ambiguities, three technical Fail | Delayed abort and two unchanged-correction rejections, dependent unreached steps not delivered | RQ1 — ambiguity/repair, RQ2 — generated support, RQ3 — live response paths |
| Delivered-content assessment | 91 outputs — 18 Pass, 71 Partial, two Fail | Single-assessor content evaluation, mass/weight and ion-charge errors remain | RQ1 — terminology/language, RQ2 — scientific explanation, RQ3 — adaptation appropriateness |
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

The synthesis contains 225 recorded findings, including criteria judgements and derived analyses. These are not 225 independent tests or participants. External observations, instrumented bounds tests and internal assertions agree that the application controls routing, stores responses and adaptations, and reconstructs session state. Fade and cap behaviour have direct instrumentation in addition to the earlier indirect observations. Follow-up uses the corrected concept without changing adaptation state. These findings concern behaviour under the tested conditions, not guarantees for every possible use.

An output can pass structural validation while containing a scientific or Burmese-language error. Plausible explanations can also repeat earlier support without adding much value. The two content Fail ratings remain despite better later outputs. Eight initial ambiguities without sessions and three live delivery Fail limit confidence in interpretation and adaptation. The fresh scenario supports the combined workflow, but its content ratings remain provisional and some boundary checks were API-only. Controlled error handling protects stored state. It does not mean that the learner received useful assistance.

All thirteen Functionality criteria therefore remain Partial, while Usability retains six Pass and three Partial. Successful technical checks do not make the broader criteria fully supported. Literature can explain why a mechanism is reasonable without showing that it benefits learners. Bounds tests, coverage, screenshots and content ratings measure different things, so they were not averaged into one success rate. Earlier attempts, differences from expected behaviour and derived analyses were kept distinct. Overall, the results support the application's tested controls while leaving important content, delivery and interaction problems unresolved.

### 4.2 Research Question Traceability

Research question traceability links the identified problems and issues to requirements, research questions, objectives and artefacts. A 24-chain evaluation analysis extended these links to criteria and findings. Tables 2–4 map method findings and criterion outcomes to the questions. Table 5 states the underlying problems, requirements and objectives so that the conclusions can be understood from the paper itself. Each research question remains Partially supported overall. A complete mapping does not mean that every requirement was met.

For RQ1, contextual interpretation and selective bilingual support provide a reasonable approach to STEM terminology. Concept correction and language-support routes implement this approach. However, rejected unchanged corrections and Burmese terminology errors limit dependable support for the intended meaning. The evaluation does not establish validated automatic term extraction or a measured reduction in language barriers.

For RQ2, core explanations, examples, reflection and hints provide support beyond word-for-word translation. Errors in definitions and repetition of the first example limit content quality. Conceptual understanding and retention were not measured. Structured output makes explanations available, but does not show that learners understood them.

For RQ3, self-reported need selects predefined routes, limits generation and preserves response history. Concurrency and lifecycle tests support these controls. They do not show that support matches assessed competence, that withdrawing support is educationally appropriate, that responsibility transfers to the learner or that two adaptations are optimal. Self-report, reaching the adaptation limit and choosing Finish are different actions. Session completion does not show mastery.

The complete 24-row requirement-to-finding mapping is provided in Table I1.

**Table 5. Research Questions, Artefact Mechanisms and Evaluation Conclusions**

| Problem / issue | Requirement, question and objective | Artefact mechanisms | Support and remaining gap |
| --- | --- | --- | --- |
| English STEM terminology, limited Burmese resources and misleading literal translation | RQ1 — contextual Burmese support for specialised English terms while retaining useful English terminology. Objective — multilingual STEM terminology support | Terminology/context interpretation, selective bilingual support and bounded intended-concept repair | Partially supported — routes and presentation implemented, Burmese errors and rejected unchanged corrections limit fidelity. No validated term extraction or measured barrier reduction |
| Translation alone insufficient, limited explanation beyond isolated words | RQ2 — clear concepts and examples beyond translation. Objective — conceptual STEM explanation | Core explanation, examples, technical detail, reflection, hints and concept-focused revision | Partially supported — structured assistance delivered, mixed correctness and limited novelty remain. No measured understanding or retention benefit |
| Static/unstructured assistance and insufficient adaptive scaffolding | RQ3 — structured, learner-responsive assistance. Objective — an adaptive scaffolding approach | Self-report, optional help choices, deterministic routing, two-adaptation bound, persisted history and scoped follow-up | Partially supported — tested state and continuity controls, live delivery, identity-boundary discrepancy and interface defects remain. No competence diagnosis, calibrated fading or optimal dose |

*Note.* The complete questions are stated in Section 1. Conceptual criteria (Table 1), design criteria and outcomes (Table 3), and method results (Tables 2 and 4) supply the basis for these conclusions. “Enabling” results validate an interaction or state prerequisite, not the educational requirement itself. Problems are the research motivation, not new prevalence estimates. Requirement coverage does not establish educational effectiveness.

### 4.3 What the Evaluation Does and Does Not Show

The contribution is an evaluated integration of support responsibilities and tested application controls. Content quality and intended-meaning correction remain only partially supported. [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish controlled evaluation from evaluation in real use. Usefulness during learners' everyday study cannot be established through artificial inquiries, controlled providers and structured inspection alone. Reusing outputs and test inputs, revising arguments or summarising findings does not create independent evidence. The deliberately selected cases, variable model outputs and limited configurations also restrict generalisation.

No participant learning or satisfaction study, independent expert review, assessment of the appropriate level or amount of support, or full accessibility audit was conducted. Preference-save fault behaviour and semantic novelty in two test fixtures remain unassessed. Some literature comparisons rely on abstracts, excerpts or secondary summaries rather than complete original texts. They do not validate Burmese equivalents. The two-round state limit does not cap concurrent provider work, and the configured timeout does not guarantee termination within twenty seconds. The evaluation therefore does not establish uniform correctness, superiority or educational effectiveness. Captures containing cookies require controlled retention and separately reviewed redacted copies before distribution. Having a traceable evidence record does not give permission to release it.

## 5. Conclusion

The framework and application combine contextual terminology support, explanation beyond translation and assistance based on learner responses. Literature-grounded reasoning supports these responsibilities. External observations and internal/database tests support routing, persistence and session continuity under the tested conditions. This demonstrates an implemented design, not consistently accurate or effective tutoring.

RQ1–RQ3 remain partially supported because terminology errors, scientific errors and unsuccessful concept corrections limit the broader requirements. Self-reported need guides assistance without diagnosing competence. High-to-fade, two stored adaptations and explicit completion are design rules, not evidence of mastery or the best amount of support. The mixed content and interface findings remain central to the conclusions.

Future work should address the Burmese/STEM errors, delivery failures and interaction defects. Changes should be recorded under a new baseline and the affected checks rerun. Studies with learners and independent content assessors would then be needed to examine benefit in practice. This evaluation does not establish improved learning or whether support is adjusted appropriately to learner competence.

## References

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. [https://doi.org/10.7763/IJCTE.2025.V17.1378](https://doi.org/10.7763/IJCTE.2025.V17.1378)

Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement: Inaccurate self evaluations undermine students' learning and retention. *Learning and Instruction, 22*(4), 271–280. [https://doi.org/10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003)

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

The recorded static, dynamic and bounds checks are listed separately. Earlier and later automated suites are not added together as independent tests. Technical case identifiers are row labels for the checks described here.

**Table B1. Static Analysis Checks**

| Case | Check | Expected result | Recorded finding | Outcome |
| --- | --- | --- | --- | --- |
| STA-01 | ESLint | Exit code 0. No blocking ESLint errors | Exit 0. ESLint produced no blocking diagnostics | Pass |
| STA-02 | Deterministic unit/component/API suite | Deterministic unit, component and API tests pass. Exact file/test counts are retained. | Exit 0. 23 files and 208 tests passed | Pass |
| STA-03 | V8 structural coverage | The configured services and DAO coverage reports are generated. | Exit 0. 23 files/208 tests passed. Statements 89.54%, branches 91.33%, functions 91.17%, lines 90.98% | Pass |
| STA-04 | Isolated MongoDB integration suite | Exit code 0. Temporary isolated MongoDB suite passes. Database version and warnings retained | Attempt 1 exit 1 because sandbox denied localhost bind (EPERM 127.0.0.1). Unchanged retry with bind permission exit 0, 1 file/5 tests passed. Mongoose deprecation warning retained | Pass with recorded environment qualification |
| STA-05 | Combined automated entry point | Exit code 0. Deterministic and isolated-database modes both complete | Exit 0. Combined command repeated 208 deterministic and 5 integration tests successfully | Pass |
| STA-06 | Production build | Exit code 0. Compilation, TypeScript build phase, static-page generation, and route manifest complete | Exit 0. Webpack compiled, TypeScript build phase completed, 8 static pages generated, expected application/API routes listed | Pass |
| STA-07 | Standalone TypeScript | Exit code 0 after Next.js generated types exist | Exit 0 after build-generated Next.js types. No TypeScript diagnostic | Pass |
| STA-08 | UI/provider separation | UI uses application/API boundaries. No component calls the provider directly | Interface components use application APIs. Provider requests are issued through services and a shared provider helper. No direct interface-to-provider call was found. | Pass |
| STA-09 | Application-owned routing and lifecycle | Application—not the LLM—controls allowed responses, routes, status, identity, persistence permission, and round count. Maximum generated round is 2 | The two-round cap, routing and lifecycle are controlled by application logic. Completed sessions and invalid states are rejected before generation. | Pass |
| STA-10 | Service/DAO responsibility separation | Services own business validation/generation decisions. DAOs own scoped atomic persistence. LLM code does not write directly to MongoDB | Services own validation and generation decisions. Scoped persistence is performed by DAOs. Provider and prompt code do not write directly to MongoDB. | Pass |
| STA-11 | Structured-output validation before persistence | Strict provider schema and domain validation precede persistence. Malformed content reaches no save call | Request and generated-output validation precede persistence for initial support, adaptations, follow-up and preferences. | Pass |
| STA-12 | Learner ownership and identifier validation | Routes require learner identity. UUIDs are validated. DAO queries include both learner and session identifiers | Learner identity and session UUIDs are guarded. Retrieval and updates are scoped by learner and session. History is learner-scoped. | Pass |
| STA-13 | Reconstructable persistence model | Refined sessions can be reconstructed. Absent refined arrays/snapshot on legacy documents are controlled | Correction, presentation overrides and response/adaptation/follow-up history are stored. Missing legacy arrays are normalised. A missing legacy preference snapshot remains possible. | Pass with legacy-snapshot qualification |
| STA-14 | Provider and API error boundaries | Stable codes/statuses and learner-safe messages. Raw provider/database detail is not returned to the UI. No implicit retry | Timeout and provider failures are mapped to stable safe API errors. There is no automatic retry. Raw provider/database detail remains server-side. Runtime interface recovery was not assessed in this check. | Pass for static contract. Runtime UI recovery not assessed here |

**Table B2. Dynamic Workflow Cases**

| Case | Check | Expected result | Observed result | Outcome |
| --- | --- | --- | --- | --- |
| DYN-01 | Application and dependency readiness | Application responds. Database connection succeeds on first stateful operation. Actual ports and configuration are recorded. No secret is captured in evidence. | API/DB readiness passed. Home rendered with inquiry, navigation and controls | Pass |
| DYN-02 | Initial live session creation | One initial provider request produces HTTP 201. Visible and stored session IDs match. Concept/domain and all Stage 4/5 fields are present. Status is in_progress, round is 0, understanding is null, and refined collections start empty. | HTTP 201/stored initial state passed. Structured Osmosis UI and hint agreed with state | Pass |
| DYN-03 | Default Medium adaptation | Route stage_5_scaffold, support type another_example, one provider request, one materially new adaptation, response event 0→1, stored round 1, status in_progress, and UI/state agreement. | Route/persisted 0→1 transition and first adaptation rendered as expected | Pass |
| DYN-04 | Conceptual clarification as second adaptation | Route concept_clarification, one provider request, distinct Stage 4 meaning plus one scaffold, event 1→2, stored round 2, two adaptations, status review_recommended, and UI/state agreement. | Concept-clarification 1→2 transition, second adaptation and review state rendered | Pass |
| DYN-05 | Capped response | Response event is appended with 2→2. No provider request, third adaptation, or round increment. Status remains review_recommended. Controlled limit feedback is visible. | Persisted 2→2 bound and visible limit/Finish passed. Direct zero-provider-call assertion remains indirect | Partial Pass |
| DYN-06 | High/fade on a fresh session | Route fade. Event 0→0. No provider request or adaptation. Status remains in_progress. Completion remains a separate action. | Fade 0→0, no adaptation card and separate Finish passed. Direct zero-provider-call assertion remains indirect | Partial Pass |
| DYN-07 | Language-support route | Route language_support, support type clarification, bilingual presentation override, one provider request, event 0→1, visible English and Burmese support without changing the stored learner profile. | Language route, unchanged profile and simultaneous English+Burmese rendering passed. Linguistic correctness not assessed | Pass |
| DYN-08 | Bounded concept reinterpretation | Route context_reinterpretation. One bounded provider request below cap. Outcome is explicitly corrected or ambiguous. Previous/current interpretation and clarification persist… | Corrected outcome and trace persisted | Pass |
| DYN-09 | Relevant follow-up | HTTP 200. Answer uses active concept/latest scaffold and persists exactly once. Follow-up does not alter route, round, response events, or adaptations. | Relevant follow-up persisted once with unchanged Stage 7 state | Pass |
| DYN-10 | Unrelated follow-up | HTTP 422 with FOLLOW_UP_OUT_OF_SCOPE and newSessionRecommended — true. No follow-up is persisted and Stage 7 state is unchanged. | HTTP 422 and unchanged state passed. Initial driver path defect retained | Pass after adjudication |
| DYN-11 | History, Review, and Resume | Owner A sees newest-first accurate history and reconstructed initial/adaptation/response/follow-up state. Limits and next action are preserved. Owner B does not retrieve owner A's session. | API history/reconstruction/ownership and hydrated History/Review/Resume observations passed | Pass |
| DYN-12 | Completion and post-completion response | First completion returns/stores completed. Repeated completion is idempotent. Post-completion response returns HTTP 409 SESSION_RESPONSE_CONFLICT with no mutation. | Completion idempotence and post-completion conflict passed | Pass |
| DYN-13 | Controlled provider failure | Stable HTTP 502 domain error. Learner-safe message. No raw provider detail, automatic retry, or invalid/partial save. Existing valid state is unchanged and UI offers a controlled recovery path. | Stable HTTP 502/safe error and same-question recovery to HTTP 201 were captured. Earlier blocked attempt remains retained | Pass |

**Table B3. Recorded Initial-Generation Timings**

| Timing case | Inquiry | Attempt | Elapsed milliseconds | Outcome |
| --- | --- | --- | --- | --- |
| TIM-PHOTO-01 | What is photosynthesis, and how do plants make food? | 1 | 3620.888 | success |
| TIM-PHOTO-02 | What is photosynthesis, and how do plants make food? | 2 | 3970.571 | success |
| TIM-PHOTO-03 | What is photosynthesis, and how do plants make food? | 3 | 3130.118 | success |
| TIM-GRAV-01 | What is gravity? | 1 | 3935.289 | success |
| TIM-GRAV-02 | What is gravity? | 2 | 3123.938 | success |
| TIM-GRAV-03 | What is gravity? | 3 | 3763.794 | success |
| TIM-CURRENT-01 | What is electric current? | 1 | 2907.745 | success |
| TIM-CURRENT-02 | What is electric current? | 2 | 2592.835 | success |
| TIM-CURRENT-03 | What is electric current? | 3 | 2615.113 | success |
| TIM-INHERIT-01 | What is inheritance in object-oriented programming? | 1 | 3311.446 | success |
| TIM-INHERIT-02 | What is inheritance in object-oriented programming? | 2 | 4640.164 | success |
| TIM-INHERIT-03 | What is inheritance in object-oriented programming? | 3 | 3757.689 | success |
| TIM-PH-01 | What is pH? | 1 | 2841.662 | success |
| TIM-PH-02 | What is pH? | 2 | 3330.576 | success |
| TIM-PH-03 | What is pH? | 3 | 3480.36 | success |

*Note.* These fifteen sequential local measurements have no predefined latency Pass threshold. They do not measure adaptation latency or performance under load.

**Table B4. Bounds Analysis Cases**

| Case | Check | Observed state and calls | Outcome |
| --- | --- | --- | --- |
| BND-01 | Initial state | round 0. 0 adaptations/events. In_progress. Null self-report. 0 provider calls | Pass |
| BND-02 | First generated adaptation | 0→1. 1 adaptation/event. In_progress. 1 provider call | Pass |
| BND-03 | Second generated adaptation | 1→2. 2 adaptations/events. Review_recommended. 1 provider call during action | Pass |
| BND-04 | Medium at cap | 2→2. Adaptations stay 2. Events 2→3. 0 provider calls | Pass |
| BND-05 | Needs Support at cap | 2→2. Adaptations stay 2. Events 2→3. 0 provider calls | Pass |
| BND-06 | Language route at cap | language_support. 2→2. Adaptations stay 2. Events 2→3. 0 provider calls | Pass |
| BND-07 | Concept route at cap | concept_clarification. 2→2. Adaptations stay 2. Events 2→3. 0 provider calls | Pass |
| BND-08 | Concept mismatch at cap | context_reinterpretation. Limit_reached. Unchanged concept. 2→2. 0 provider calls | Pass |
| BND-09 | High/fade at round 0 | fade 0→0. 0 adaptations. 1 event. In_progress. 0 provider calls | Pass |
| BND-10 | High/fade at round 1 | fade 1→1. 1 adaptation. Events 1→2. In_progress. 0 provider calls | Pass |
| BND-11 | High/fade at round 2 | fade 2→2. 2 adaptations. Events 2→3. In_progress. 0 provider calls | Pass |
| BND-12 | Complete an in-progress session | round-0 in_progress→completed. Content/history/round unchanged. 1 completion write | Pass |
| BND-13 | Complete a review-recommended session and repeat | round-2 review_recommended→completed. Repeat made no second write | Pass |
| BND-14 | Reject response after completion | HTTP 409 SESSION_RESPONSE_CONFLICT. No provider/write/mutation | Pass |
| BND-15 | Concurrent generated adaptation near cap | same round-1 snapshot. 1 success/1 conflict. Final round/adaptations/events = 2/2/2. 2 provider calls | Pass |
| BND-16 | Concurrent capped responses | same round-2 snapshot. 1 success/1 conflict. Final round/adaptations/events = 2/2/3. 0 provider calls | Pass |
| BND-17 | Invalid stored round guard | -1, 0.5 and 3 each rejected before provider or response-persistence invocation | Pass |

*Note.* BND-15 accepted one write after two provider calls. The stored-round limit is not a guarantee of maximum provider cost.

**Table B5. Manual Dynamic Browser Observations**

| Observation | Related cases | Expected display | Observed display | Outcome | Qualification |
| --- | --- | --- | --- | --- | --- |
| UI-01 Home | DYN-01 | Inquiry and navigation are ready without error | Home rendered without error with inquiry field, Ask action, example prompts, Preferences action, primary navigation, locale control, and theme control visible. | Pass | None observed |
| UI-02 Initial session | DYN-02 | Structured session and hint action render | The Osmosis session rendered its concept/domain, Simple Explanation, Real-World Example, Technical Explanation, Think About This, revealed hint, follow-up area, and Understanding Check. English and Burmese content were both visible. | Pass | None observed |
| UI-03 Stage 6B | DYN-03/DYN-04 | Five optional help choices plus skip/cancel render | After selecting partial understanding, “What would help you most?” displayed five bounded choices, Continue with this choice, Continue without a choice, and Back to understanding choices. | Pass | None observed |
| UI-04 First adaptation | DYN-03 | Round-1 support/history and next response render | Selecting Another example produced route stage_5_scaffold, an Additional Scaffold card, response event 0→1, bilingual adapted support, and the next understanding choices. | Pass | None observed |
| UI-05 Limit | DYN-04/DYN-05 | Round-2 history, limit message and separate Finish render | Concept clarification produced response event 1→2 and a second adaptation. Both stored adaptations were visible with “Maximum support provided” and a separate Finish for Now action. No third adaptation choice was offered. | Pass | Direct provider-call absence is not established by the screenshot. API/database evidence provides only indirect support for that assertion. |
| UI-06 Fade | DYN-06 | Fade history with no adaptation and separate Finish | The Gravity session showed High/no additional support with route fade, event 0→0, no generated adaptation card, and Finish Learning as a separate action. | Pass | Direct provider-call absence is not established by the screenshot. API/database evidence provides only indirect support for that assertion. |
| UI-07 Language route | DYN-07 | Route and English+Burmese adaptation render together | The Electric current session identified the language-support response and displayed English and Burmese adapted support together. | Pass | Rendering only. Linguistic correctness was not assessed. |
| UI-08 History | DYN-11 | Newest-first self-reported support/status/action rows | History loaded with Osmosis first, followed by pH entries in the visible list. Rows used Self-reported support and distinguished Review Recommended/Continue Learning from In Progress/Resume. | Pass | Ordering was visually checked only for the captured list. |
| UI-09 Review | DYN-11 | Completed state and stored interaction history reconstruct | The completed Photosynthesis session reconstructed its completion state, relevant follow-up, three response events including the capped 2→2 event, and two adaptations. | Pass | None observed |
| UI-10 Resume | DYN-11 | Reload preserves round, history, limit and next action | Reloading the unfinished Osmosis session reconstructed two response events, two adaptations, the maximum-support message, and Finish for Now as the next action. | Pass | None observed |
| UI-11 Provider error | DYN-13 | Safe error appears with HTTP 502 and retained question | With the controlled invalid provider key, the Home page retained “What is photosynthesis?” and displayed “Unable to prepare the explanation right now”. The corresponding HAR entry returned HTTP 502 with code SESSION_GENERATION_FAILED and no raw provider detail. | Pass | Controlled fault. Expected result |
| UI-12 Recovery | DYN-13 | Unchanged question succeeds after normal provider restart | After restoring the normal provider configuration, the same question created and rendered a Photosynthesis learning session successfully. The corresponding HAR entry returned HTTP 201. | Pass | Expected recovery |

## Appendix C. Simulation Results and Content Assessment

Technical execution and content quality were assessed separately. Table C1 accounts for 55 attempts. Table C2 accounts for 91 delivered outputs, including initial support and adaptations. Fade, cap and unreached steps do not add generated outputs.

**Table C1. Technical Simulation Results**

| Case | Inquiry | Technical outcome | Final round / status | Adaptations / response events | Failure or qualification |
| --- | --- | --- | --- | --- | --- |
| SIM01-A | What is photosynthesis, and how do plants make food? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM01-B | What is photosynthesis, and how do plants make food? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM01-C | What is photosynthesis, and how do plants make food? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM02-A | What is DNA? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM02-B | What is DNA? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM02-C | What is DNA? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM03-A | What is osmosis? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM03-B | What is osmosis? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM03-C | What is osmosis? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM04-A | What is gravity? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM04-B | What is gravity? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM04-C | What is gravity? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM05-A | What is electric current? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM05-B | What is electric current? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM05-C | What is electric current? | Fail | 1 / in_progress | 1 / 1 | Assertion failed — response HTTP 200 |
| SIM06-A | What is momentum? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM06-B | What is momentum? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM06-C | What is momentum? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM07-A | What is pH? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM07-B | What is pH? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM07-C | What is pH? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM08-A | What is an ion? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM08-B | What is an ion? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM08-C | What is an ion? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM09-A | What is a catalyst? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM09-B | What is a catalyst? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM09-C | What is a catalyst? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM10-A | What is inheritance in object-oriented programming? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM10-B | What is inheritance in object-oriented programming? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM10-C | What is inheritance in object-oriented programming? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM11-A | What is an algorithm? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM11-B | What is an algorithm? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM11-C | What is an algorithm? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM12-A | What is carbon fibre? | Pass | 0 / completed | 0 / 1 | No technical deviation recorded |
| SIM12-B | What is carbon fibre? | Pass | 1 / completed | 1 / 2 | No technical deviation recorded |
| SIM12-C | What is carbon fibre? | Pass | 2 / review_recommended | 2 / 3 | No technical deviation recorded |
| SIM13-A | What is a cell? | Pass | 0 / completed | 0 / 1 | Initial interpretation required separate content assessment. HTTP 201 alone was not a content Pass. Ratings are provided in Tables C2–C3. |
| SIM13-B | What is a cell? | Pass | 1 / completed | 1 / 2 | Initial interpretation required separate content assessment. HTTP 201 alone was not a content Pass. Ratings are provided in Tables C2–C3. |
| SIM13-C | What is a cell? | Pass | 2 / review_recommended | 2 / 3 | Initial interpretation required separate content assessment. HTTP 201 alone was not a content Pass. Ratings are provided in Tables C2–C3. |
| SIM14-A | What is current? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM14-B | What is current? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM14-C | What is current? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM15-A | What is a network? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM15-B | What is a network? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM15-C | What is a network? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM16-A | What is inheritance? | Pass | 0 / completed | 0 / 1 | Initial interpretation required separate content assessment. HTTP 201 alone was not a content Pass. Ratings are provided in Tables C2–C3. |
| SIM16-B | What is inheritance? | Pass | 1 / completed | 1 / 2 | Initial interpretation required separate content assessment. HTTP 201 alone was not a content Pass. Ratings are provided in Tables C2–C3. |
| SIM16-C | What is inheritance? | Pass | 2 / review_recommended | 2 / 3 | Initial interpretation required separate content assessment. HTTP 201 alone was not a content Pass. Ratings are provided in Tables C2–C3. |
| SIM-LANG-01 | What is electric current? | Pass | 1 / in_progress | 1 / 1 | Payload and override checked. Browser display and language quality require separate assessment. |
| SIM-LANG-02 | What is electric current? | Pass | 1 / in_progress | 1 / 1 | Payload and override checked. Browser display and language quality require separate assessment. |
| SIM-LANG-03 | What is electric current? | Pass | 1 / in_progress | 1 / 1 | Payload and override checked. Browser display and language quality require separate assessment. |
| SIM-CM-13 | What is a cell? | Fail | 0 / in_progress | 0 / 0 | Assertion failed — concept response HTTP 200 |
| SIM-CM-14 | What is current? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM-CM-15 | What is a network? | Controlled initial ambiguity | No session | 0 / 0 | AMBIGUOUS_STEM_CONTEXT |
| SIM-CM-16 | What is inheritance? | Fail | 0 / in_progress | 0 / 0 | Assertion failed — concept response HTTP 200 |

*Note.* Initial ambiguity without a session is a controlled outcome, not a delivered explanation or a content Pass. The delayed abort and two unchanged-correction rejections remain technical failures. Content status fields in the original technical register are not substituted for the completed content assessments below.

**Table C2. All Delivered-Output Content Ratings**

| Case | Output | Correctness | Context | Language | Explanation | Adaptation | Overall |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SIM01-A | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM01-B | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM01-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM01-C | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM01-C | Simpler explanation | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM01-C | Conceptual clarification | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM02-A | Initial support | 1 | 2 | 2 | 2 | NA | Partial |
| SIM02-B | Initial support | 1 | 2 | 2 | 2 | NA | Partial |
| SIM02-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM02-C | Initial support | 1 | 2 | 2 | 2 | NA | Partial |
| SIM02-C | Simpler explanation | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM02-C | Conceptual clarification | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM03-A | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM03-B | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM03-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM03-C | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM03-C | Simpler explanation | 1 | 2 | 1 | 2 | 1 | Partial |
| SIM03-C | Conceptual clarification | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM04-A | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM04-B | Initial support | 1 | 2 | 0 | 2 | NA | Fail |
| SIM04-B | Another example after Medium, optional choice skipped | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM04-C | Initial support | 1 | 2 | 2 | 2 | NA | Partial |
| SIM04-C | Simpler explanation | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM04-C | Conceptual clarification | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM05-A | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM05-B | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM05-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM05-C | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM05-C | Simpler explanation | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM06-A | Initial support | 1 | 2 | 2 | 2 | NA | Partial |
| SIM06-B | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM06-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM06-C | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM06-C | Simpler explanation | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM06-C | Conceptual clarification | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM07-A | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM07-B | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM07-B | Another example after Medium, optional choice skipped | 1 | 2 | 2 | 2 | 2 | Partial |
| SIM07-C | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM07-C | Simpler explanation | 1 | 2 | 2 | 2 | 1 | Partial |
| SIM07-C | Conceptual clarification | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM08-A | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM08-B | Initial support | 0 | 2 | 0 | 2 | NA | Fail |
| SIM08-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM08-C | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM08-C | Simpler explanation | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM08-C | Conceptual clarification | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM09-A | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM09-B | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM09-B | Another example after Medium, optional choice skipped | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM09-C | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM09-C | Simpler explanation | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM09-C | Conceptual clarification | 1 | 2 | 2 | 2 | 1 | Partial |
| SIM10-A | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM10-B | Initial support | 2 | 2 | 2 | 2 | NA | Pass |
| SIM10-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM10-C | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM10-C | Simpler explanation | 2 | 2 | 2 | 2 | 2 | Pass |
| SIM10-C | Conceptual clarification | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM11-A | Initial support | 2 | 2 | 2 | 1 | NA | Partial |
| SIM11-B | Initial support | 1 | 2 | 2 | 2 | NA | Partial |
| SIM11-B | Another example after Medium, optional choice skipped | 1 | 2 | 2 | 2 | 1 | Partial |
| SIM11-C | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM11-C | Simpler explanation | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM11-C | Conceptual clarification | 1 | 2 | 2 | 2 | 1 | Partial |
| SIM12-A | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM12-B | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM12-B | Another example after Medium, optional choice skipped | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM12-C | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM12-C | Simpler explanation | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM12-C | Conceptual clarification | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM13-A | Initial support | 2 | 1 | 2 | 2 | NA | Partial |
| SIM13-B | Initial support | 1 | 1 | 1 | 2 | NA | Partial |
| SIM13-B | Another example after Medium, optional choice skipped | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM13-C | Initial support | 1 | 1 | 2 | 2 | NA | Partial |
| SIM13-C | Simpler explanation | 1 | 2 | 1 | 2 | 1 | Partial |
| SIM13-C | Conceptual clarification | 1 | 2 | 1 | 2 | 2 | Partial |
| SIM16-A | Initial support | 2 | 1 | 2 | 2 | NA | Partial |
| SIM16-B | Initial support | 2 | 1 | 1 | 2 | NA | Partial |
| SIM16-B | Another example after Medium, optional choice skipped | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM16-C | Initial support | 2 | 1 | 2 | 2 | NA | Partial |
| SIM16-C | Simpler explanation | 2 | 2 | 1 | 2 | 1 | Partial |
| SIM16-C | Conceptual clarification | 2 | 2 | 2 | 2 | 1 | Partial |
| SIM-LANG-01 | Initial support | 1 | 2 | 1 | 2 | NA | Partial |
| SIM-LANG-01 | Language support | 2 | 2 | 1 | 2 | 2 | Partial |
| SIM-LANG-02 | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM-LANG-02 | Language support | 2 | 2 | 1 | 2 | 1 | Partial |
| SIM-LANG-03 | Initial support | 2 | 2 | 1 | 2 | NA | Partial |
| SIM-LANG-03 | Language support | 1 | 2 | 1 | 2 | 1 | Partial |
| SIM-CM-13 | Initial support | 1 | 1 | 2 | 2 | NA | Partial |
| SIM-CM-16 | Initial support | 2 | 1 | 2 | 2 | NA | Partial |

*Note.* Correctness means scientific/technical correctness. Context means relevance to the active concept. Language means English/Burmese adequacy. Explanation means support beyond term translation. Adaptation means an appropriate revision of earlier support. Scores are 2 for adequate, 1 for limited or minor issues, and 0 for material error or absence. NA means adaptation does not apply to an initial output. Pass requires 2 in every applicable dimension. Any 0 gives Fail. Otherwise, any 1 gives Partial. These are content judgements, not learner outcomes.

**Table C3. Reasons for Partial and Fail Content Ratings**

| Case | Output | Rating | Dimensions below adequate | Recorded reason, shortened |
| --- | --- | --- | --- | --- |
| SIM01-A | Initial support | Partial | Language adequacy (English and Burmese) | The prompt contains Korean 만들 in အစားအစာ 만들ဖို့. Suggested wording — အစားအစာထုတ်လုပ်ဖို့. The remaining explanation is understandable |
| SIM01-C | Conceptual clarification | Partial | Language adequacy (English and Burmese) | အလင်းကို တင်ယူထားတာမဟုတ်ဘဲ spacing is awkward. Suggest အလင်းကိုတင် ယူထားတာမဟုတ်ဘဲ. Technical terms remain interpretable. |
| SIM02-A | Initial support | Partial | Technical correctness | Genetic storage and genes are described correctly, but double-helix structure and complementary base pairing from the frozen scope are absent. |
| SIM02-B | Initial support | Partial | Technical correctness | The nucleotide polymer and two strands are identified. Complementary base pairing and helix shape are not explained. |
| SIM02-C | Initial support | Partial | Technical correctness | Nucleotides and sequence-based information are present. Helix/base-pairing detail remains missing within the reference scope. |
| SIM02-C | Simpler explanation | Partial | Adaptation appropriateness | Instruction sheet repeats the initial instruction-book metaphor. Shorter text gives only limited new support. |
| SIM02-C | Conceptual clarification | Partial | Adaptation appropriateness | Reference file still repeats the prior instruction-sheet perspective. No concrete read/copy example or guided step. |
| SIM03-A | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | The water-potential definition is sound, but more water and the root example can imply absolute water amount rather than concentration/potential. ရေပမာဏ ပိုများ in the soil example suggests volume. Prefer free-water concentration or water-potential wording, not absolute amount… |
| SIM03-B | Initial support | Partial | Language adequacy (English and Burmese) | ဆဲလ်တွေကို ... မတ်တပ်ရပ်နေအောင် anthropomorphises cells. Say turgor helps the plant remain upright. ရေများ needs concentration qualification. |
| SIM03-C | Initial support | Partial | Language adequacy (English and Burmese) | ပျဉ်သီးခြောက် is an unclear rendering of raisin. စပျစ်သီးခြောက် is a clearer proposed replacement. Retained membrane/solute terms need glosses. |
| SIM03-C | Simpler explanation | Partial | Technical correctness, Language adequacy (English and Burmese), Adaptation appropriateness | Less water available should mean water potential/free-water concentration, not absolute water volume. ရေပမာဏ နည်းလို့ repeats the volume ambiguity. Clarify ရေ၏ water potential ပိုနိမ့်သောကြောင့်. Mostly restates the original solute-direction rule rather than supplying a distinctly simpler concrete scaffold. |
| SIM03-C | Conceptual clarification | Partial | Technical correctness, Language adequacy (English and Burmese) | Net movement is an improvement, but balancing concentrations omits pressure effects at equilibrium. Free water is unglossed. Crowded is a metaphor. Chinese-style punctuation 。 is a minor editing issue, not a scientific mistranslation. |
| SIM04-A | Initial support | Partial | Language adequacy (English and Burmese) | mass ရှိတဲ့ အရာတွေ and ဆွဲဆောင်စေပါတယ် preserve the attraction meaning. No obvious core-word substitution. Real world examples has "အလွင့်မပျံဘဲ" which is a minor issue. Suggest "လွင့်ပျံမသွားပဲ" |
| SIM04-B | Initial support | Fail | Technical correctness, Language adequacy (English and Burmese) | The English explanation loosely treats gravity as acceleration. The Burmese also loses the crucial distinction between mass and weight. Mass becomes အစုလိုက်အပြုံလိုက် in the technical paragraph, meaning en masse rather than ဒြပ်ထု. The simple paragraph substitutes အလေးချိန်. These are material terminology errors. |
| SIM04-B | Another example after Medium, optional choice skipped | Partial | Language adequacy (English and Burmese) | ကမ္ဘာနီးပါး means approximately Earth rather than near Earth. Suggest ကမ္ဘာမြေမျက်နှာပြင်အနီး. |
| SIM04-C | Initial support | Partial | Technical correctness | Attraction is correctly described, but weight and downward acceleration are not the same quantity. The technical wording blurs this distinction. |
| SIM04-C | Simpler explanation | Partial | Adaptation appropriateness | A shorter falling-object restatement, but essentially the same initial perspective and example. |
| SIM04-C | Conceptual clarification | Partial | Technical correctness, Language adequacy (English and Burmese) | Mutual attraction is useful, but the wording suggests Earth has the larger force. Forces are equal, accelerations differ. Earth mass ပိုကြီးလို့ ... ပိုရှင်း ... Needs to distinguish acceleration from force explicitly, otherwise Burmese preserves the misleading implication. |
| SIM05-A | Initial support | Partial | Language adequacy (English and Burmese) | တစ်စက္ကန့်마다 contains Korean 마다. Replace with တစ်စက္ကန့်လျှင်. အမြန်နှုန်း can misleadingly suggest drift speed instead of charge-flow rate. |
| SIM05-C | Initial support | Partial | Language adequacy (English and Burmese) | လျှပ်စစ်အ charge is malformed wording and အမြန်နှုန်း risks speed/flow confusion. Prefer charge ပမာဏ တစ်စက္ကန့်လျှင် ဖြတ်သန်းသွားသည့်နှုန်း. |
| SIM05-C | Simpler explanation | Partial | Adaptation appropriateness | Nearly repeats the initial definition and reflective question. Simplification is modest, not a new conceptual scaffold. |
| SIM06-A | Initial support | Partial | Technical correctness | p = mv and direction are correct. The stopping-distance claim needs braking-force/friction assumptions, not momentum alone. |
| SIM06-B | Initial support | Partial | Language adequacy (English and Burmese) | The simple paragraph uses အလေးချိန် for mass. Prefer ဒြပ်ထု. The technical paragraph retains mass correctly, so this is a local inconsistency. |
| SIM06-C | Simpler explanation | Partial | Adaptation appropriateness | Fast car/slow bike largely repeats the truck/bicycle contrast. Limited new support. |
| SIM07-B | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | Activity is named but concentration notation is used without its dilute-solution approximation. Neutral pH 7 needs a 25 °C qualification. မကြားနေတဲ့ အခြေအနေ is not a clear neutral rendering. Suggest အက်စစ်ဓာတ်နှင့် ဘေ့စ်ဓာတ် ဘက်မလိုက်သော အခြေအနေ, proposed as editorial wording, not certified textbook terminology. |
| SIM07-B | Another example after Medium, optional choice skipped | Partial | Technical correctness | The vinegar comparison is appropriate, but neutral pure water pH 7 needs the 25 °C condition. |
| SIM07-C | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | The logarithmic idea is correct. Neutral pH 7 is stated without a temperature qualification. Solution is rendered အဖြေ and ဖြေရှင်းရည်, importing answer/problem-solving senses. Prefer ပျော်ရည်. Retain pH and hydrogen ion with explanations. |
| SIM07-C | Simpler explanation | Partial | Technical correctness, Adaptation appropriateness | Neutral pH 7 is qualified neither by temperature nor ordinary aqueous scope. Middle point can imply an absolute scale bound. Repeats the initial lower/higher/7 rule without a new mechanism or concrete aid. |
| SIM07-C | Conceptual clarification | Partial | Technical correctness, Language adequacy (English and Burmese) | Tenfold steps are useful. Strength of acidity is liable to confusion with intrinsic acid strength and concentration. ဖြေရှင်းရည် is a literal mistranslation of solution. ပြောရ면 contains Korean 면. Suggest ပျော်ရည် and ပြောရလျှင်. |
| SIM08-A | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | The definition is correct, but dissolving salt releases existing ions. The example misleadingly suggests neutral atoms become ions during dissolution. လျှပ်စစ်ကို ကူးစက်နိုင် implies transmission/infection rather than conduction. Suggest လျှပ်စစ်စီးကူးနိုင်. Chloride should be distinguished from chlorine. |
| SIM08-B | Initial support | Fail | Technical correctness, Language adequacy (English and Burmese) | The English proton/electron definition is sound, but the Burmese statement that net charge is no longer present contradicts the defining condition. Net charge မရှိတော့ဘဲ says without net charge, although an ion has nonzero net charge. Replace with neutral မဟုတ်တော့ဘဲ or net charge ရှိလာပြီး. This reverses the central definition. |
| SIM08-C | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | The charge definition is correct. The salt example again conflates ion formation with dissociation of an already ionic solid. အီလက်ထရွန်ကို လက်လျှော့လိုက်တာ is anthropomorphic surrender. Use ဆုံးရှုံးသွားတာ. လျှပ်စစ်အား can mean force rather than electric charge. Clarify the intended quantity. |
| SIM08-C | Simpler explanation | Partial | Adaptation appropriateness | Mainly repeats the initial definition. Clearer language helps but adds little conceptual scaffolding. |
| SIM08-C | Conceptual clarification | Partial | Language adequacy (English and Burmese) | ညီမျှမှု အပိုင်းအစ is awkward for balance pieces. Clarify equal positive/negative charge rather than literal physical pieces. 。 is a minor punctuation issue. |
| SIM09-A | Initial support | Partial | Language adequacy (English and Burmese) | အကုန်ကုန်သွားတာ and chemical အဖြစ် မပြောင်းလဲ are awkward. Prefer မကုန်ဆုံးဘဲ reaction အပြီးတွင် ပြန်လည်ရရှိသည်. No claim of a standard glossary. |
| SIM09-B | Initial support | Partial | Language adequacy (English and Burmese) | ပိုမဆိုးတဲ့ gases is vague for less harmful, and ပြန်ဖန်တီးနိုင် can imply optional regeneration. Prefer အန္တရာယ်နည်းသော and ပြန်လည်ရရှိသည်. |
| SIM09-B | Another example after Medium, optional choice skipped | Partial | Language adequacy (English and Burmese) | ကိုယ်တိုင်ဖြစ်တာထက် is ambiguous for without the enzyme. Suggest catalyst မပါဘဲ ဖြစ်ပေါ်သည့်အခြေအနေထက်. |
| SIM09-C | Initial support | Partial | Language adequacy (English and Burmese) | မသုံးหมดသွားပါဘူး mixes Thai หมด into Burmese. Suggested replacement — မကုန်ဆုံးသွားပါဘူး. ပိုမိုမဆိုးတဲ့ is also awkward. |
| SIM09-C | Conceptual clarification | Partial | Technical correctness, Adaptation appropriateness | For the same overall reaction, kinetics changes rather than equilibrium. Does not change what it can make is too universal about selectivity. Helper making the path easier repeats the preceding shortcut analogy. No distinct example or guided step. |
| SIM10-C | Initial support | Partial | Language adequacy (English and Burmese) | အသစ် 만든 class includes Korean 만든. Suggest အသစ်ဖန်တီးထားသော class. Other retained computing terms are interpretable. |
| SIM10-C | Conceptual clarification | Partial | Adaptation appropriateness | The second paragraph largely repeats the first. No worked parent/member/override scaffold follows the revised core meaning. |
| SIM11-A | Initial support | Partial | Explanation beyond translation | Recipe is named but no actual cake-making steps are shown. Explanatory scaffold is limited. |
| SIM11-B | Initial support | Partial | Technical correctness | The procedure definition is suitable, but the same-result claim implicitly assumes determinism. Not every algorithm is deterministic. |
| SIM11-B | Another example after Medium, optional choice skipped | Partial | Technical correctness, Adaptation appropriateness | Route finding is relevant, but fastest route is not guaranteed without a stated model and algorithm. Checking/comparing roads is broad, not an executable step sequence or worked route. Modest scaffold compared with the initial explicit tea recipe. |
| SIM11-C | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | Precise ordered steps are identified. Repeatability claims need a deterministic-input assumption. အဓိပ္ပာယ်မတူနိုင်အောင် မရှင်းမလင်းမဖြစ်ရ is awkward and can invert the intended unambiguity idea. Suggest အဓိပ္ပာယ်ရှင်းလင်း၍ လွဲမှားနားလည်စရာမရှိသော. |
| SIM11-C | Simpler explanation | Partial | Technical correctness, Language adequacy (English and Burmese) | Precise ordered instructions are appropriate. Same way every time needs a deterministic interpretation. စဉ်လိုက်နာရမယ့် is awkward. Suggest အစဉ်လိုက် လိုက်နာရမည့်. |
| SIM11-C | Conceptual clarification | Partial | Technical correctness, Adaptation appropriateness | Same input/same result is valid for deterministic algorithms, not an unrestricted definition of algorithms. Fixed instruction path repeats the preceding exact-directions analogy. No actual new procedure is demonstrated. |
| SIM12-A | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | Fibre/resin/composite roles are distinguished. The claim every carbon frame is lighter than a metal frame is too categorical. The Burmese frame example omits the English faster-riding claim and adds stronger support. That is a fidelity difference, not exact equivalence. ခိုင်အား should be checked for preferred register. |
| SIM12-B | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | Composite construction is identified. Fatigue performance is design-dependent rather than universally guaranteed. Technical wording contains Korean 만든. The simple phrase အလေးချိန်မတိုးစေဘဲ overstates without much added weight. Suggest အလေးချိန်အများကြီးမတိုးစေဘဲ. |
| SIM12-B | Another example after Medium, optional choice skipped | Partial | Language adequacy (English and Burmese) | stiff/strong/swing are everyday retained English words without Burmese glosses, weaker for beginner language support. |
| SIM12-C | Initial support | Partial | Language adequacy (English and Burmese) | တင်းမာမှု can suggest tension or conflict rather than stiffness. A proposed gloss is ပုံပျက်ခြင်းကို ခံနိုင်ရည် (stiffness), proposed as editorial wording, not a certified engineering glossary. |
| SIM12-C | Simpler explanation | Partial | Technical correctness, Language adequacy (English and Burmese) | Hard to bend conflates individual filaments with a designed stiff composite. Geometry and construction matter. ဆွဲရခက် can mean hard to pull, not resistant to stretching. Proposed wording — ဆန့်ထုတ်ရာတွင် ခံနိုင်ရည်မြင့်သော, proposed as introductory wording. Specialist engineering terminology is not certified. |
| SIM12-C | Conceptual clarification | Partial | Language adequacy (English and Burmese) | အလေးချိန်မတိုးစေဘဲ suggests zero added mass instead of little added mass. Revise to အလေးချိန်အများကြီးမတိုးစေဘဲ. |
| SIM13-A | Initial support | Partial | Contextual relevance | The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… |
| SIM13-B | Initial support | Partial | Technical correctness, Contextual relevance, Language adequacy (English and Burmese) | The basic definition is sound. Each skin cell repairs damage and copies itself is an overgeneralisation about specialised cells. The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… အသက်ရှိသက်ရှိစနစ် is redundant. Prefer သက်ရှိများ၏ အခြေခံ .... ကိုယ်ပွားဖန်တီးတာ needs careful specialised-cell qualification. |
| SIM13-B | Another example after Medium, optional choice skipped | Partial | Technical correctness, Language adequacy (English and Burmese) | The leaf example is relevant, but sunlight is energy, not food matter. Not all leaf cells photosynthesise. နေရောင်ခြည်ကို အစာအဖြစ် ပြောင်းလဲ wrongly equates light with food material. Say light energy enables food production from water/carbon dioxide. |
| SIM13-C | Initial support | Partial | Technical correctness, Contextual relevance | Basic cell organisation is correct, but all essential life processes/reproduction is overgeneralised across specialised cells. The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… |
| SIM13-C | Simpler explanation | Partial | Technical correctness, Language adequacy (English and Burmese), Adaptation appropriateness | Universal microscope requirement and cell cooperation omit visible-cell and unicellular exceptions. Tiny living room is confusing. The Burmese drops the English living-room analogy rather than translating it. This avoids one confusion but creates a fidelity difference. Shorter building-block wording does not revise the core concept much, and the English room analogy is unhelpful. |
| SIM13-C | Conceptual clarification | Partial | Technical correctness, Language adequacy (English and Burmese) | On its own and making more of itself overgeneralise specialised/dependent cells. Qualify these claims. ကိုယ်တိုင်ကို ပုံတူကူးတာ can imply copying rather than cell division. Suggested ပြန်လည်ကွဲပွားခြင်း where biologically appropriate. |
| SIM16-A | Initial support | Partial | Contextual relevance | The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… |
| SIM16-B | Initial support | Partial | Contextual relevance, Language adequacy (English and Burmese) | The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… တည်ဆောက်되는 contains Korean 되는. Suggest အခြေခံ၍ တည်ဆောက်ထားသော. The rest of the class explanation is intelligible. |
| SIM16-B | Another example after Medium, optional choice skipped | Partial | Adaptation appropriateness | Car/Vehicle was already the initial reflective prompt. New identifiers elaborate it, but another-example novelty is limited. |
| SIM16-C | Initial support | Partial | Contextual relevance | The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… |
| SIM16-C | Simpler explanation | Partial | Language adequacy (English and Burmese), Adaptation appropriateness | အစပိုင်ဆိုင်မှုတွေ implies possessions/ownership more than starting functionality. Suggest အခြေခံ data နှင့် methods. Mostly restates initial reuse/addition. The starting-set analogy is only a small change. |
| SIM16-C | Conceptual clarification | Partial | Adaptation appropriateness | The second paragraph restates the same generic common/specific description without a concrete guided scaffold. |
| SIM-LANG-01 | Initial support | Partial | Technical correctness, Language adequacy (English and Burmese) | The technical units are correct. The hint how fast charge is moving risks conflating drift speed with charge-flow rate. ဘယ်လောက်မြန်မြန် ရွေ့နေသလဲ repeats speed wording. Prefer a quantity of charge crossing a point per second, not particle velocity. |
| SIM-LANG-01 | Language support | Partial | Language adequacy (English and Burmese) | ဘယ်လောက်မြန်မြန် ရွေ့ wording still risks drift-speed confusion. The following charge-per-second example partially repairs it. Add explicit Burmese charge/rate glosses. |
| SIM-LANG-02 | Initial support | Partial | Language adequacy (English and Burmese) | လျှပ်စစ်အားသွင်းမှု denotes charging rather than electric charge. Prefer retaining electric charge with a quantity gloss. Textbook terminology is not independently c… |
| SIM-LANG-02 | Language support | Partial | Language adequacy (English and Burmese), Adaptation appropriateness | စီးဆင်းတဲ့ အရှိန် suggests acceleration/speed. Prefer စီးဆင်းနှုန်း with charge ပမာဏ per second. Ordinary key words remain English rather than being explained bilingually. The revision largely repeats the initial ampere definition. The wire-versus-rate contrast helps, but term-focused revision is limited. |
| SIM-LANG-03 | Initial support | Partial | Language adequacy (English and Burmese) | မီးလုံး روشن ဖြစ်လာတာ contains an unrelated Arabic-script word. Suggest မီးလုံး လင်းလာတာ. လျှပ်စစ်အားသွင်းမှု also confuses charging and charge. |
| SIM-LANG-03 | Language support | Partial | Technical correctness, Language adequacy (English and Burmese), Adaptation appropriateness | Rate of charge flow is the right concept, but how fast charge moves/passes can be mistaken for particle velocity. ဘယ်လောက်မြန်မြန် ... ဖြတ်သန်း ... Needs quantity-per-time wording. No clear Burmese gloss of electric charge or ampere is added. Bold text and the charge-versus-current distinction help. No worked bilingual vocabulary/example makes this a strong language-help revision. |
| SIM-CM-13 | Initial support | Partial | Technical correctness, Contextual relevance | The basic biological-cell meaning is correct. The claims every cell performs all processes and reproduces need specialised-cell qualification. The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… |
| SIM-CM-16 | Initial support | Partial | Contextual relevance | The technical paragraph names the selected domain, but the original question lacks context and other meanings are not offered or confirmed… |

**Table C4. Content Rating Totals**

| Rating | Delivered outputs | Meaning |
| --- | --- | --- |
| Pass | 18 | All applicable dimensions were adequate |
| Partial | 71 | At least one dimension had limitations or minor issues, with no material-error score |
| Fail | 2 | At least one dimension contained a material error |

*Note.* Rationales in Table C3 were shortened without changing scores. The ion adaptation Pass does not remove the Fail in its initial technical definition. The Burmese phrase net charge မရှိတော့ဘဲ denies net charge before the same sentence states that a positive or negative charge forms. Single-assessor and domain-competence limits described in Section 3.3 remain.

## Appendix D. Black-Box Testing Records

Public HTTP and browser checks are listed against their expected behaviour. First API outcomes and final assessed outcomes are both retained.

**Table D1. Black-Box Case Results**

| Case | Check | Expected behaviour | Observed result and qualification | First API outcome | Assessed outcome |
| --- | --- | --- | --- | --- | --- |
| BB01 | Valid STEM inquiry | HTTP 201. One retrievable session. Correct ID linkage. In_progress, round 0, understanding null. Concept/domain and structured support present. No adaptation/event/follow-up yet. | 201 creation, structured bilingual content, round-zero state and retrieval passed with controlled ready output. | Pass | Pass |
| BB02 | Empty, whitespace, malformed, and missing inquiry | HTTP 400 INVALID_SESSION_REQUEST. No provider call/session creation or database mutation. | All five invalid/malformed inquiry variants returned safe 400 without writes/provider-seam calls. | Pass | Pass |
| BB03 | Explicit technical context and ambiguous pair | HTTP 201. Electric-current concept and electrical domain, not generic “current”. Explicit qualified interpretation or HTTP 422 AMBIGUOUS_STEM_CONTEXT. No unmarked confident guess. If HTTP 422, no session is created. | Contextualised fixture accepted and ambiguous fixture returned controlled 422. Browser clarified without a session. This does not test live LLM interpretation. | Pass | Pass |
| BB04 | Language preference behaviour | Preference PATCH/GET returns HTTP 200. New session returns 201. Visible output follows presentation preference while stored bilingual fields remain valid. Useful English terminology is retained where appropriate. No observed material mistranslation by the qualified assessor. | All three preferences persist. Browser presentation and both single-language bilingual overrides observed. Exact initial SIM01-B fixture has existing content assessment. No new general language-quality claim. | Pass | Pass |
| BB05 | Required support structure | Simple explanation, real-world example/analogy, technical explanation, reflective prompt, and optional revealable hint are present, meaningful, and distinguishable. | All five stored support areas and hint reveal verified. Exact initial fixture previously assessed for content. First browser predicate wrongly required Hide Hint. Retained UI03b recheck corrects this non-oracle assumption. | Pass | Pass |
| BB06 | High/fade | HTTP 200. Route fade. Response event 0→0. Adaptation null. Round 0. In_progress. No provider call. Explicit Finish remains available. | High recorded fade 0→0 with no provider-seam call/adaptation. Finish remained available and worked. | Pass | Pass |
| BB07 | Default Stage 5 routes | One distinct generated/persisted adaptation and one round increment. | Both default route/type/round/persistence transitions passed. Meaningful novelty of fixture adaptations is Not assessed. Prefixes on reused paragraphs are not semantic novelty. | Pass | Partial |
| BB08 | Every explicit Stage 6B route and skip | Each of the five optional choices selects its specified route. Skip uses the default route. Concept mismatch requires clarification. Valid below-cap generated support is route-appropriate, non-repetitive and persisted. | All five explicit routes, skip, clarification requirement, bilingual overrides, corrected concept/trace and UI choices executed. First extra ambiguity assertion wrongly expected no round — generated clarification actually uses one round. Retained addendum confirms this. Fixture semantic appropriateness/non-repetition Not assessed. | Fail | Partial |
| BB09 | First adaptation persistence | HTTP 200. Round 1. One matching response event/adaptation. Fields survive retrieval. No duplicate write. | Round-one adaptation/event persisted exactly once and survived API/browser retrieval. | Pass | Pass |
| BB10 | Second adaptation persistence | HTTP 200. Round 2. Two matching adaptations/events. Non-High response produces review_recommended. Retrieval agrees. | Second adaptation persisted with round 2 and review_recommended. Browser limit feedback matched. | Pass | Pass |
| BB11 | Attempt beyond two adaptations | HTTP 200. Event 2→2. No provider call, third adaptation, or round 3. Review_recommended. UI communicates the limit. | At cap, extra response persisted 2→2 with no new adaptation/provider-seam call. Browser prevented a further adaptation and retained limit feedback after reload. | Pass | Pass |
| BB12 | Relevant follow-up | HTTP 200. Answer remains within active Photosynthesis context. Exact question/answer persists once. Stage 7 route/round/state does not change. | Relevant fixture answer persisted once without changing Stage7. Addendum provider-input capture used corrected active concept/latest scaffold/route. Answer quality there is not assessed. | Pass | Pass |
| BB13 | Unrelated follow-up | HTTP 422 FOLLOW_UP_OUT_OF_SCOPE with newSessionRecommended — true. No answer persists. Current session state is unchanged. | Unrelated fixture answer rejected with safe 422 and newSessionRecommended. No write. Browser preserved follow-up allowance. | Pass | Pass |
| BB14 | Learning History and ordering | HTTP 200. Only owner-A sessions, newest-first. Concept, self-reported support need, status, and timestamps are accurate. | API owner scoping/order/labels passed. Final browser History contained exactly its own ten sessions newest-first, independently checked against snapshot. | Pass | Pass |
| BB15 | Review | HTTP 200. Initial content, active concept, all adaptations, response events, follow-ups, preferences snapshot, round and status match stored state. Review causes no mutation. | API projections matched stored fields. Browser Review restored exact initial/adapted/follow-up text and all event entries after completion. Raw clarification and preference values are not separately displayed as history fields. | Pass | Pass |
| BB16 | Resume | HTTP 200. Correct content/history/round/status and next action. Existing limits still apply. No duplicate or reset. | Rounds 0/1/2 survived API/browser reload, retaining next actions and bound. Corrected concept/previous-current trace also survived reload. | Pass | Pass |
| BB17 | Preference persistence and snapshots | PATCH/GET 200. Valid settings persist. A retains its original snapshot. B uses updated preferences. Invalid/unknown preference fields are HTTP 400 INVALID_PREFERENCE_REQUEST without mutation. | Valid preference PATCH/GET and reload passed. Old/new snapshots remained independent. Invalid/unknown/type/empty updates were 400 with no write. | Pass | Pass |
| BB18 | Controlled provider/API failure | Injected timeout/non-2xx failures return HTTP 502 for initial, adaptation and follow-up generation. No invalid content is saved. Existing valid state is unchanged. Safe errors contain no raw provider detail or automatic retry. | Six controlled non-2xx/real-20s-timeout variants across three paths returned safe 502 and unchanged state. Exactly one seam call each. Browser initial/follow-up recovery demonstrated. No external provider latency claim. | Pass | Pass |
| BB19 | Malformed structured model output | Corresponding HTTP 502 generation error. Invalid content is not persisted. Existing valid state is unchanged. UI shows controlled recovery. | 24 malformed-output injections across initial/adaptation/follow-up/correction returned controlled 502 without writes. Browser malformed adaptation/follow-up errors and explicit recovery verified. | Pass | Pass |
| BB20 | Inquiry length boundary | A 1,000-character inquiry returns HTTP 201. A 1,001-character inquiry returns HTTP 400, with no provider call or session write. | 1000 accepted and 1001 rejected at the real HTTP boundary. Rejection made no provider-seam call/write. | Pass | Pass |
| BB21 | Follow-up length and count boundaries | A 500-character follow-up returns HTTP 200 and is saved. A 501-character follow-up returns HTTP 400. A third question returns HTTP 409 without provider work or another save. | 500 accepted, 501 rejected, third question 409. Exactly two stored answers and browser limit feedback. | Pass | Pass |
| BB22 | Anonymous learner isolation | Foreign session operations are HTTP 404 SESSION_NOT_FOUND and owner-B History excludes owner A. Absent identity is HTTP 400 LEARNER_IDENTITY_UNAVAILABLE. No foreign mutation. | Foreign detail/respond/follow-up/completion and forged-header attempts were 404 with no foreign mutation. Browser ownership rejection passed. Frozen absent-identity 400 expectation failed — public proxy issued anonymous cookie and 200 empty History. No-cookie/invalid-cookie addendum confirmed isolation. This is an oracle/boundary mismatch, not observed leakage. | Fail | Fail |
| BB23 | Invalid response and session identifiers | Invalid response combinations, invalid UUIDs and invalid completion bodies return HTTP 400. A valid missing UUID returns HTTP 404. Rejected requests make no provider call or state change. | Invalid/conflicting responses, malformed bodies, invalid/missing UUIDs and invalid completion payloads returned the expected safe codes without provider-seam calls/writes. | Pass | Pass |
| BB24 | Completion and post-completion response | First and repeated completion return HTTP 200 with completed. Repeat is idempotent. Response returns HTTP 409 SESSION_RESPONSE_CONFLICT. No post-completion event/adaptation/provider call. | Completion/repeat were idempotent. Post-completion response rejected 409 without event/adaptation/provider-seam call. Browser completion/Review matched. | Pass | Pass |

**Table D2. Retained Failed or Unassessed Black-Box Subchecks**

| Case | Subcheck | Observation scope | Assertion | Recorded outcome |
| --- | --- | --- | --- | --- |
| BB08 | BB08-API-026 | first frozen API execution | Remaining ambiguity recorded without adaptation or round | Fail |
| BB22 | BB22-API-021 | first frozen API execution | Frozen oracle absent identity HTTP400 | Fail |
| BB05 | UI03-hint-0 | browser observation (first attempts and rechecks retained) | Hint revealed | Fail |
| BB08 / BB04 | UI19-language-override-english-0 | browser observation (first attempts and rechecks retained) | Language-help override shows both fixture languages despite English preference | Fail |
| BB08 | UI25-concept-corrected-0 | browser observation (first attempts and rechecks retained) | Active concept and correction support change visibly | Fail |
| BB15 / BB16 | UI26-correction-resume-0 | browser observation (first attempts and rechecks retained) | Correction trace and active concept survive reload | Fail |
| BB07 | BB07-CONTENT-SCOPE | content adequacy | Meaningful semantic novelty/route-appropriate quality of synthetic adaptation fixtures is not live-model or qualified-human evidence. | Not assessed |
| BB08 | BB08-CONTENT-SCOPE | content adequacy | Meaningful semantic novelty/route-appropriate quality of synthetic adaptation fixtures is not live-model or qualified-human evidence. | Not assessed |

*Note.* Table D2 contains first-attempt browser predicates, a remaining-ambiguity round expectation and content checks that were not assessed. These are subchecks, not additional black-box cases. Driver corrections and rechecks did not erase the original observations. The missing-identity case expected HTTP 400 but returned HTTP 200 with a newly provisioned anonymous identity and empty History. No foreign-session leak was observed.

## Appendix E. White-Box Testing and Coverage

The 373 unique tests are listed in Table E2. Deterministic tests and isolated MongoDB tests were run against the root application. Repeated unit, coverage and combined commands are not counted as additional tests.

**Table E1. Requirement-Critical Structural Groups**

| Group | Exercised contracts | Outcome |
| --- | --- | --- |
| WB01 | All 39 overall-need/difficulty/round combinations. Provider/save counts. High fade. Cap events. Input rejection. Language/concept/correction output and trace | Pass |
| WB02 | Owned lookup. UUID and lifecycle guards. Both legal completions. Idempotent completion. Completed-response rejection. Legacy continuity | Pass |
| WB03 | Current corrected/legacy concept and latest support. Scope/length/count guards. Controlled failures. Real follow-up leaves Stage 7 state unchanged | Pass |
| WB04 | Initial/adaptation/correction/follow-up structured output acceptance and rejection. Transport/timeout/refusal/empty output/JSON faults fail before invalid save | Pass |
| WB05 | Real scoped persistence, newest-first history, legacy reads, atomic correction/event/adaptation projection, round 1→2 contention, capped-event and last-follow-up-slot contention | Pass |
| WB06 | Defaults, valid/invalid/partial preference updates, API write guards, unchanged old-session snapshots, fresh-session preferences, bilingual presentation override | Pass |

**Table E2. Complete Unique Automated-Test Inventory**

| Test | Test file | Named assertion contract | Mode | Outcome | Research question |
| --- | --- | --- | --- | --- | --- |
| WB-T-0001 | unit/api/preference-error-boundary.test.ts | preference API error boundary guards preference retrieval when learner identity is absent | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0002 | unit/api/preference-error-boundary.test.ts | preference API error boundary returns a stable envelope without database details when preference GET fails | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0003 | unit/api/preference-error-boundary.test.ts | preference API error boundary maps invalid PATCH JSON to the standard validation envelope | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0004 | unit/api/preference-error-boundary.test.ts | preference API error boundary does not expose database details when a preference update fails | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0005 | unit/api/preference-error-boundary.test.ts | preference API error boundary returns preferences normally through the guarded GET | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0006 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards guards GET missing identity before database access | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0007 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards guards PATCH missing identity before database access | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0008 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards rejects invalid {"unknown":"value"} without write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0009 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards rejects invalid {"supportLanguage":"spanish"} without write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0010 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards rejects invalid {"explanationLevel":42} without write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0011 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards rejects invalid {} without write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0012 | unit/api/preference-write-guards.test.ts | WB06 preference API write guards accepts supported partial update and passes only scoped validated fields to DAO | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0013 | unit/api/provider-route-boundary.test.ts | provider route error boundary returns a stable code without provider details or persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0014 | unit/api/provider-route-boundary.test.ts | provider route error boundary maps provider timeout to the same safe code without persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0015 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection lists only the sessions returned for the required learner identity | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0016 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection returns controlled collection errors for absent identity and database failure | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0017 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection creates a session and returns only the public initial-session projection | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0018 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection maps a creation failure to Error — Please clarify the domain | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0019 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection maps a creation failure to Error — Ask about STEM | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0020 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection maps a creation failure to Error — provider detail | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0021 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection maps a creation failure to Error — database detail | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0022 | unit/api/refined-route-contracts.test.ts | refined public API contracts session collection rejects malformed JSON and missing identity before session generation | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0023 | unit/api/refined-route-contracts.test.ts | refined public API contracts session detail and completion rejects missing identity and an invalid detail UUID before lookup | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0024 | unit/api/refined-route-contracts.test.ts | refined public API contracts session detail and completion maps detail lookup and unexpected retrieval failures | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0025 | unit/api/refined-route-contracts.test.ts | refined public API contracts session detail and completion completes a valid session and maps validation and conflict errors | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0026 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route requires learner identity before parsing a response | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0027 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route accepts the refined response shape and returns the selected route trace | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0028 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route maps a response failure to Error — Not found | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0029 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route maps a response failure to Error — Concurrent response | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0030 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route maps a response failure to Error — provider detail | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0031 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route maps a response failure to Error — database detail | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0032 | unit/api/refined-route-contracts.test.ts | refined public API contracts respond route rejects malformed JSON and invalid High-with-difficulty input | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0033 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route requires learner identity before parsing a follow-up | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0034 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route returns a persisted concept-scoped follow-up | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0035 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route maps a follow-up failure to Error — Not found | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0036 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route maps a follow-up failure to Error — Limit reached | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0037 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route maps a follow-up failure to Error — Start a new session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0038 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route maps a follow-up failure to Error — provider detail | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0039 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route maps a follow-up failure to Error — database detail | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0040 | unit/api/refined-route-contracts.test.ts | refined public API contracts follow-up route rejects malformed follow-up JSON before calling the service | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0041 | unit/api/session-action-error-boundary.test.ts | session action UUID boundaries rejects an invalid UUID before the respond action | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0042 | unit/api/session-action-error-boundary.test.ts | session action UUID boundaries rejects an invalid UUID before the follow-up action | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0043 | unit/api/session-detail-route.test.ts | session detail continuity API returns the current concept and complete persisted interaction history | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0044 | unit/api/session-detail-route.test.ts | session detail continuity API normalises a legacy detail response with no refined history or snapshot | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0045 | unit/components/session-content.test.tsx | language-support adaptation rendering shows both languages over an existing english-only preference | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0046 | unit/components/session-content.test.tsx | language-support adaptation rendering shows both languages over an existing burmese-only preference | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0047 | unit/components/session-content.test.tsx | language-support adaptation rendering continues to respect the saved preference when no override is stored | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0048 | unit/components/session-content.test.tsx | conceptual-clarification adaptation rendering renders the concept-specific label and revised support content | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0049 | unit/components/session-content.test.tsx | conceptual-clarification adaptation rendering renders the previous and corrected interpretation with downstream support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0050 | unit/components/session-continuity.test.tsx | session review and resume continuity renders every stored response route and adaptation during completed review | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0051 | unit/components/session-continuity.test.tsx | session review and resume continuity restores in_progress round 0 support null to action I understand | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0052 | unit/components/session-continuity.test.tsx | session review and resume continuity restores in_progress round 1 support medium to action I partially understand | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0053 | unit/components/session-continuity.test.tsx | session review and resume continuity restores in_progress round 2 support needs_support to action Finish for Now | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0054 | unit/components/session-continuity.test.tsx | session review and resume continuity restores review_recommended round 0 support needs_support to action Finish for Now | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0055 | unit/components/session-continuity.test.tsx | session review and resume continuity restores review_recommended round 2 support needs_support to action Finish for Now | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0056 | unit/components/session-continuity.test.tsx | session review and resume continuity restores in_progress round 0 support high to action Finish Learning ✓ | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0057 | unit/components/session-continuity.test.tsx | session review and resume continuity renders a normalised legacy session without a preference snapshot | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0058 | unit/components/session-continuity.test.tsx | session review and resume continuity labels history values as self-reported support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0059 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface submits High immediately through the fade route | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0060 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface opens optional Stage 6B after I partially understand | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0061 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface opens optional Stage 6B after I need more explanation | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0062 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface submits the bounded 'simpler_explanation' choice | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0063 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface submits the bounded 'another_example' choice | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0064 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface submits the bounded 'language_terms' choice | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0065 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface submits the bounded 'concept_unclear' choice | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0066 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface submits the bounded 'concept_mismatch' choice | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0067 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface supports a clear skip without forcing a difficulty choice | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0068 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface cancels Stage 6B without submitting and returns to Stage 6A | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0069 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface shows loading and adapting states | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0070 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface retries a failed adaptation with the same bounded request | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0071 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface retries a failed initial session load | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0072 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface shows the existing two-round limit state without Stage 6 controls | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0073 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface uses a one-column mobile-first choice grid | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0074 | unit/components/stage6b-interface.test.tsx | Stage 6B learner interface supports keyboard selection and exposes native radio state | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0075 | unit/data/session-dao.test.ts | session DAO persistence invariants scopes session retrieval by learner and session identifiers | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0076 | unit/data/session-dao.test.ts | session DAO persistence invariants lists only the learner's sessions newest first | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0077 | unit/data/session-dao.test.ts | session DAO persistence invariants atomically increments the round and appends an adaptation | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0078 | unit/data/session-dao.test.ts | session DAO persistence invariants atomically updates the active concept with its correction trace | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0079 | unit/data/session-dao.test.ts | session DAO persistence invariants updates only response state when no adaptation is produced | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0080 | unit/data/session-dao.test.ts | session DAO persistence invariants guards non-incrementing responses with the expected event count | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0081 | unit/data/session-dao.test.ts | session DAO persistence invariants allows only one concurrent response built from the same event snapshot | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0082 | unit/data/session-dao.test.ts | session DAO persistence invariants appends a follow-up without altering Stage 7 state | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0083 | unit/data/session-schema.test.ts | session response-event schema loads a legacy document with an empty response-event history | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0084 | unit/data/session-schema.test.ts | session response-event schema validates reconstructable fade, adapted, and capped events | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0085 | unit/data/session-schema.test.ts | session response-event schema validates only the route-specific adaptation metadata needed later | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0086 | unit/data/session-schema.test.ts | session response-event schema validates persisted concept-focused clarification support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0087 | unit/data/session-schema.test.ts | session response-event schema validates a reconstructable concept reinterpretation and correction | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0088 | unit/data/session-schema.test.ts | session response-event schema rejects an unbounded response route | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0089 | unit/data/session-schema.test.ts | session response-event schema rejects an oversized persisted concept clarification | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0090 | unit/data/session-schema.test.ts | session response-event schema rejects an unsupported presentation override | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0091 | unit/i18n/request.test.ts | locale cookie boundary resolves en to en | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0092 | unit/i18n/request.test.ts | locale cookie boundary resolves my to my | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0093 | unit/i18n/request.test.ts | locale cookie boundary resolves undefined to en | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0094 | unit/i18n/request.test.ts | locale cookie boundary resolves fr to en | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0095 | unit/i18n/request.test.ts | locale cookie boundary resolves ../secrets to en | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0096 | unit/i18n/request.test.ts | locale cookie boundary resolves to en | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0097 | unit/services/adaptation-boundary.test.ts | adaptation service boundaries persists the response without an LLM call after two adaptation rounds | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0098 | unit/services/adaptation-boundary.test.ts | adaptation service boundaries surfaces a conflict when a concurrent capped response wins first | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0099 | unit/services/adaptation-boundary.test.ts | adaptation service boundaries rejects an invalid stored round without a provider or persistence call | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0100 | unit/services/adaptation-boundary.test.ts | adaptation service boundaries treats a session outside the learner boundary as not found | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0101 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'high' / null / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0102 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / null / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0103 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'simpler_explanation' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0104 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'another_example' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0105 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'language_terms' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0106 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'concept_unclear' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0107 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'concept_mismatch' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0108 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / null / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0109 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'simpler_explanation' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0110 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'another_example' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0111 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'language_terms' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0112 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'concept_unclear' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0113 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'concept_mismatch' / round +0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0114 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'high' / null / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0115 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / null / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0116 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'simpler_explanation' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0117 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'another_example' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0118 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'language_terms' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0119 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'concept_unclear' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0120 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'concept_mismatch' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0121 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / null / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0122 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'simpler_explanation' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0123 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'another_example' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0124 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'language_terms' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0125 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'concept_unclear' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0126 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'concept_mismatch' / round 1 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0127 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'high' / null / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0128 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / null / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0129 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'simpler_explanation' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0130 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'another_example' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0131 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'language_terms' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0132 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'concept_unclear' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0133 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'medium' / 'concept_mismatch' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0134 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / null / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0135 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'simpler_explanation' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0136 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'another_example' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0137 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'language_terms' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0138 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'concept_unclear' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0139 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations 'needs_support' / 'concept_mismatch' / round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0140 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations rejects invalid stored round -1 without provider/save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0141 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations rejects invalid stored round 0.5 without provider/save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0142 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations rejects invalid stored round 3 without provider/save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0143 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations rejects invalid stored round NaN without provider/save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0144 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations rejects invalid stored round Infinity without provider/save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0145 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations WB02 rejects completed response before provider/save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0146 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations rejects direct mismatch call without clarification | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0147 | unit/services/adaptation-full-matrix.test.ts | WB01 complete 39 route/round combinations maps an optimistic generated-response save loser to conflict | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0148 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract uses the shared bounded schema for 'default Stage 5' | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0149 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract uses the shared bounded schema for 'explicit simpler explanation' | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0150 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract uses the shared bounded schema for 'language support' | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0151 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract uses the shared bounded schema for 'concept clarification' | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0152 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract rejects an extra lifecycle field before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0153 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract rejects an extra nested route field before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0154 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract rejects a missing Burmese field before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0155 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract rejects blank bilingual content before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0156 | unit/services/adaptation-generation-contract.test.ts | standard adaptation generation contract maps missing configuration, output, and provider JSON before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0157 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'high' at round +0 routes to 'fade' with +0 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0158 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'high' at round 1 routes to 'fade' with +0 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0159 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'high' at round 2 routes to 'fade' with +0 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0160 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'medium' at round +0 routes to 'stage_5_scaffold' with 1 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0161 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'medium' at round 1 routes to 'stage_5_scaffold' with 1 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0162 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'medium' at round 2 routes to 'stage_5_scaffold' with +0 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0163 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'needs_support' at round +0 routes to 'stage_5_scaffold' with 1 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0164 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'needs_support' at round 1 routes to 'stage_5_scaffold' with 1 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0165 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches 'needs_support' at round 2 routes to 'stage_5_scaffold' with +0 provider call(s) | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0166 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches routes medium with explicit simpler_explanation to support simpler_explanation from round 0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0167 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches routes needs_support with explicit another_example to support another_example from round 0 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0168 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches routes medium with explicit simpler_explanation to support null from round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0169 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches routes needs_support with explicit another_example to support null from round 2 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0170 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches generates concept-scoped bilingual language support without changing an english preference | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0171 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches generates concept-scoped bilingual language support without changing an burmese preference | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0172 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches records a capped language route without calling the provider | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0173 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches generates and persists a distinct Stage 4 to 5 conceptual clarification | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0174 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches rejects a conceptual clarification that exactly repeats prior support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0175 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches rejects malformed conceptual-clarification output before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0176 | unit/services/adaptation-routing-branches.test.ts | Stage 7 provider and round branches records a capped conceptual route without generating round three | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0177 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection fades a high self-report without selecting generated support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0178 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects the default Stage 5 support for medium | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0179 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects the default Stage 5 support for needs_support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0180 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection honours the explicit simpler-explanation choice for medium | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0181 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection honours the explicit simpler-explanation choice for needs_support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0182 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection honours the explicit another-example choice for medium | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0183 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection honours the explicit another-example choice for needs_support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0184 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection rejects a difficulty choice when the learner selected high | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0185 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects bilingual language support for medium | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0186 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects bilingual language support for needs_support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0187 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects concept clarification for a medium concept-unclear self-report | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0188 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects concept clarification for a needs_support concept-unclear self-report | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0189 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects bounded context reinterpretation for a medium concept mismatch | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0190 | unit/services/adaptation-routing.test.ts | deterministic Stage 7 route selection selects bounded context reinterpretation for a needs_support concept mismatch | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0191 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation corrects the 'cell' interpretation without replacing the session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0192 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation corrects the 'current' interpretation without replacing the session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0193 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation corrects the 'network' interpretation without replacing the session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0194 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation corrects the 'inheritance' interpretation without replacing the session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0195 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation returns and persists one controlled clarification when meaning remains ambiguous | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0196 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation rejects a corrected outcome that does not change the interpretation | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0197 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation rejects reinterpretation output containing application-controlled fields | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0198 | unit/services/concept-reinterpretation.test.ts | bounded concept reinterpretation records the correction request at the cap without a provider call or round three | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0199 | unit/services/followup-context.test.ts | concept-scoped follow-up accepts a supporting sub-concept and sends the bounded current context | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0200 | unit/services/followup-context.test.ts | concept-scoped follow-up rejects an unrelated primary concept without persisting it | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0201 | unit/services/followup-context.test.ts | concept-scoped follow-up uses the corrected active concept, latest scaffold and latest response route | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0202 | unit/services/followup-context.test.ts | concept-scoped follow-up enforces the two-question limit before calling the provider | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0203 | unit/services/followup-context.test.ts | concept-scoped follow-up does not persist when the provider fails | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0204 | unit/services/followup-context.test.ts | concept-scoped follow-up rejects a missing session and a concurrent follow-up limit without generation | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0205 | unit/services/followup-context.test.ts | concept-scoped follow-up maps missing configuration, output, and invalid JSON without persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0206 | unit/services/followup-context.test.ts | concept-scoped follow-up rejects model output that tries to assign a difficulty type | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0207 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'missing key' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0208 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'non-2xx' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0209 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'network' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0210 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'invalid envelope' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0211 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'missing output' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0212 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'invalid JSON' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0213 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'timer timeout' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0214 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'initial' / 'provider abort' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0215 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'missing key' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0216 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'non-2xx' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0217 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'network' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0218 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'invalid envelope' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0219 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'missing output' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0220 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'invalid JSON' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0221 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'timer timeout' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0222 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'standard adaptation' / 'provider abort' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0223 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'missing key' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0224 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'non-2xx' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0225 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'network' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0226 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'invalid envelope' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0227 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'missing output' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0228 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'invalid JSON' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0229 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'timer timeout' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0230 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'reinterpretation' / 'provider abort' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0231 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'missing key' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0232 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'non-2xx' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0233 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'network' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0234 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'invalid envelope' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0235 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'missing output' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0236 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'invalid JSON' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0237 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'timer timeout' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0238 | unit/services/generation-error-extensions.test.ts | WB01/WB03/WB04 provider failure propagation 'follow-up' / 'provider abort' -> domain error, no save/retry | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0239 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed initial/follow-up request null | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0240 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed initial/follow-up request undefined | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0241 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed initial/follow-up request "text" | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0242 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed initial/follow-up request {} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0243 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed initial/follow-up request {"question":123} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0244 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed initial/follow-up request {"question":" "} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0245 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries accepts exact 1000/500/200-character boundaries | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0246 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request null | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0247 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request undefined | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0248 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request "text" | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0249 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request {} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0250 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request {"overallSupportNeed":42} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0251 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request {"overallSupportNeed":"medium","difficultyType":42} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0252 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects malformed response request {"overallSupportNeed":"medium","difficultyType":"concept_mismatch","conceptClarification":42} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0253 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request null | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0254 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request undefined | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0255 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request "text" | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0256 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request {} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0257 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request {"theme":42} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0258 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request {"theme":"blue"} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0259 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects invalid preference request {"extra":"key"} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0260 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries accepts UUID-v4 but rejects non-v4, malformed and non-string identifiers | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0261 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects unsupported completion payload null | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0262 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects unsupported completion payload undefined | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0263 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects unsupported completion payload {} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0264 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects unsupported completion payload {"status":"in_progress"} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0265 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries rejects unsupported completion payload {"status":"completed","extra":true} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0266 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries completes legal in_progress state with scoped write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0267 | unit/services/generation-error-extensions.test.ts | WB02/WB03/WB06 missing validation boundaries completes legal review_recommended state with scoped write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0268 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects initial 'missing hint' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0269 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects initial 'wrong outcome type' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0270 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects initial 'wrong concept type' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0271 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects initial 'blank required Burmese' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0272 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects initial 'array instead of object' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0273 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects initial 'missing explanation' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0274 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure null without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0275 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure undefined without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0276 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0277 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":"yes","message":"","answer":{"en":"Answer","my":"အဖြေ"}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0278 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":true,"message":"","answer":{"en":42,"my":"အဖြေ"}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0279 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":true,"message":"","answer":{"en":" ","my":"အဖြေ"}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0280 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":true,"message":"not empty","answer":{"en":"Answer","my":"အဖြေ"}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0281 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":false,"message":"","answer":{"en":"","my":""}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0282 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":false,"message":"Unrelated","answer":{"en":"Answer","my":""}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0283 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects follow-up structure {"relatedToCurrentConcept":true,"message":"","answer":{"en":"Answer","my":"အဖြေ"},"route":"fade"} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0284 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'unknown outcome' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0285 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'invalid concept shape' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0286 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'blank concept' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0287 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'corrected with message' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0288 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'corrected with empty content' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0289 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'ambiguous changes concept' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0290 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'ambiguous includes support' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0291 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'ambiguous blank clarification' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0292 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects reinterpretation 'repeated corrected content' without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0293 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects standard adaptation structure null without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0294 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects standard adaptation structure undefined without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0295 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects standard adaptation structure {} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0296 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects standard adaptation structure {"content":{"en":42,"my":"အကူအညီ"}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0297 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects standard adaptation structure {"content":{"en":" ","my":"အကူအညီ"}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0298 | unit/services/generation-error-extensions.test.ts | WB04 malformed generated structures rejects standard adaptation structure {"content":{"en":"New","my":" "}} without save | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0299 | unit/services/generation-error-extensions.test.ts | WB04 provider output extraction paths uses configured model and skips non-text malformed blocks | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0300 | unit/services/generation-error-extensions.test.ts | WB04 provider output extraction paths rejects missing text envelope null | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0301 | unit/services/generation-error-extensions.test.ts | WB04 provider output extraction paths rejects missing text envelope undefined | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0302 | unit/services/generation-error-extensions.test.ts | WB04 provider output extraction paths rejects missing text envelope {} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0303 | unit/services/generation-error-extensions.test.ts | WB04 provider output extraction paths rejects missing text envelope {"output":1} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0304 | unit/services/generation-error-extensions.test.ts | WB04 provider output extraction paths rejects missing text envelope {"output":[null,{"content":"bad"}]} | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0305 | unit/services/generation-error-extensions.test.ts | WB03 legacy and previous follow-up provider context accepts legacy missing history collections and sends previous follow-ups for modern sessions | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0306 | unit/services/llm-provider.test.ts | shared LLM provider boundary rejects the non-secret placeholder API key "" before fetch | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0307 | unit/services/llm-provider.test.ts | shared LLM provider boundary rejects the non-secret placeholder API key "your-key-here" before fetch | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0308 | unit/services/llm-provider.test.ts | shared LLM provider boundary uses the central URL, model, timeout signal and strict output format once | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0309 | unit/services/llm-provider.test.ts | shared LLM provider boundary returns a stable non-2xx failure without retrying | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0310 | unit/services/llm-provider.test.ts | shared LLM provider boundary rejects a response with no output text | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0311 | unit/services/llm-provider.test.ts | shared LLM provider boundary rejects invalid structured-output JSON | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0312 | unit/services/llm-provider.test.ts | shared LLM provider boundary rejects an invalid provider response envelope | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0313 | unit/services/llm-provider.test.ts | shared LLM provider boundary aborts after the shared timeout without retrying | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0314 | unit/services/llm-provider.test.ts | shared LLM provider boundary does not expose network error details through its stable error | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0315 | unit/services/request-validation.test.ts | request validation guard rails trims a valid learning-session question | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0316 | unit/services/request-validation.test.ts | request validation guard rails rejects blank and oversized learning-session questions | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0317 | unit/services/request-validation.test.ts | request validation guard rails accepts the supported understanding value high | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0318 | unit/services/request-validation.test.ts | request validation guard rails accepts the supported understanding value medium | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0319 | unit/services/request-validation.test.ts | request validation guard rails accepts the supported understanding value needs_support | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0320 | unit/services/request-validation.test.ts | request validation guard rails rejects an unsupported understanding value | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0321 | unit/services/request-validation.test.ts | request validation guard rails accepts legacy and canonical support-need request shapes | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0322 | unit/services/request-validation.test.ts | request validation guard rails trims a bounded concept-mismatch clarification | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0323 | unit/services/request-validation.test.ts | request validation guard rails requires clarification only for concept mismatch and enforces its bound | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0324 | unit/services/request-validation.test.ts | request validation guard rails rejects conflicting, unknown, and high-with-difficulty response combinations | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0325 | unit/services/request-validation.test.ts | request validation guard rails trims a valid follow-up and rejects an oversized one | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0326 | unit/services/request-validation.test.ts | request validation guard rails accepts a supported partial preference update | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0327 | unit/services/request-validation.test.ts | request validation guard rails rejects unknown preference keys and invalid values | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0328 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract uses one strict call whose prompt and schema map explicitly to Stages 1 to 5 | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0329 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract accepts a controlled ambiguous structure but does not persist a session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0330 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract accepts a controlled out_of_scope structure but does not persist a session | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0331 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects unexpected top-level field before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0332 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects ready outcome with a message before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0333 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects ready outcome with blank Stage 1 terminology before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0334 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects malformed bilingual Stage 4 block before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0335 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects extra bilingual field before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0336 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects ambiguous outcome without a message before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0337 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects ambiguous outcome with partial learning content before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0338 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects out-of-scope outcome with a scaffold before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0339 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract rejects invalid JSON before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0340 | unit/services/session-generation-contract.test.ts | initial Stage 1 to 5 generation contract maps missing configuration and missing provider output before persistence | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0341 | unit/services/session-lifecycle-ownership.test.ts | session lifecycle ownership looks up a session within the learner boundary | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0342 | unit/services/session-lifecycle-ownership.test.ts | session lifecycle ownership normalises a legacy session without response events | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0343 | unit/services/session-lifecycle-ownership.test.ts | session lifecycle ownership normalises legacy collections and preserves a missing preference snapshot | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0344 | unit/services/session-lifecycle-ownership.test.ts | session lifecycle ownership keeps both ownership keys on completion | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0345 | unit/services/session-lifecycle-ownership.test.ts | session lifecycle ownership returns an already-completed session idempotently without another write | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0346 | unit/services/session-lifecycle-ownership.test.ts | session lifecycle ownership rejects missing, invalid-state, and concurrently changed completion targets | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0347 | unit/lib/session-domain.test.ts | session domain vocabulary preserves the legacy overall-support values | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0348 | unit/lib/session-domain.test.ts | session domain vocabulary defines the bounded Stage 6B and Stage 7 values | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0349 | unit/lib/session-domain.test.ts | session domain vocabulary keeps enum arrays and derived unions type-aligned | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0350 | unit/lib/session-domain.test.ts | session domain vocabulary rejects support output on the fade route at type level | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0351 | unit/lib/session-domain.test.ts | session domain vocabulary requires a bounded response event shape | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0352 | unit/lib/session-view.test.ts | persisted session next action returns in_progress round 0 support null as respond | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0353 | unit/lib/session-view.test.ts | persisted session next action returns in_progress round 1 support medium as respond | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0354 | unit/lib/session-view.test.ts | persisted session next action returns in_progress round 2 support needs_support as finish | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0355 | unit/lib/session-view.test.ts | persisted session next action returns in_progress round 0 support high as finish | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0356 | unit/lib/session-view.test.ts | persisted session next action returns review_recommended round 0 support medium as finish | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0357 | unit/lib/session-view.test.ts | persisted session next action returns review_recommended round 1 support needs_support as finish | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0358 | unit/lib/session-view.test.ts | persisted session next action returns review_recommended round 2 support needs_support as finish | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0359 | unit/lib/session-view.test.ts | persisted session next action returns completed round 0 support null as review | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0360 | unit/lib/session-view.test.ts | persisted session next action returns completed round 1 support medium as review | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-T-0361 | unit/lib/session-view.test.ts | persisted session next action returns completed round 2 support high as review | Deterministic mocks | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-001 | integration/session-persistence.test.ts | persists learner-scoped sessions newest first and keeps legacy reads compatible | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-002 | integration/session-persistence.test.ts | persists fade and capped events without incrementing or creating an adaptation | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-003 | integration/session-persistence.test.ts | allows only one concurrent generated adaptation from the same snapshot | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-004 | integration/session-persistence.test.ts | allows only one concurrent capped response from the same event snapshot | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-005 | integration/session-persistence.test.ts | enforces profile defaults, preference updates, and the two-follow-up limit | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-006 | integration/refined-state-invariants.test.ts | WB06 preserves existing snapshots after profile update and uses new preferences for new generation | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-007 | integration/refined-state-invariants.test.ts | WB05 atomically persists corrected concept, adaptation and event then reconstructs exact projection | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-008 | integration/refined-state-invariants.test.ts | WB03 successful scoped follow-up changes no Stage 7 fields | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-009 | integration/refined-state-invariants.test.ts | WB05 serialises two round-1 responses to one round-2 winner without round 3 | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-010 | integration/refined-state-invariants.test.ts | WB05 serialises two contenders for the last follow-up slot and excludes foreign writes | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-011 | integration/refined-state-invariants.test.ts | WB02 persists completion from in_progress and rejects subsequent response writes | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |
| WB-DB-012 | integration/refined-state-invariants.test.ts | WB02 persists completion from review_recommended and rejects subsequent response writes | Isolated real MongoDB | Pass | RQ1 / RQ2 / RQ3 |

*Note.* Test filenames identify groups within this inventory and are not external evidence references. Named assertions are reproduced as test labels. There were 361 deterministic and twelve real-database tests. Individual database timings were not captured. Passed file summaries and recorded test titles support the integration inventory. The route combinations below are already represented in these tests, not 39 additional unique tests.

**Table E3. Route and Round Combinations**

| Case | Overall need | Optional difficulty | Round before / after | Selected route | Provider / save calls | Expected status | Outcome |
| --- | --- | --- | --- | --- | --- | --- | --- |
| WB01-M01 | high | none | 0 / 0 | fade | 0 / 1 | in_progress | Pass |
| WB01-M02 | medium | none | 0 / 1 | stage_5_scaffold | 1 / 1 | in_progress | Pass |
| WB01-M03 | medium | simpler_explanation | 0 / 1 | stage_5_scaffold | 1 / 1 | in_progress | Pass |
| WB01-M04 | medium | another_example | 0 / 1 | stage_5_scaffold | 1 / 1 | in_progress | Pass |
| WB01-M05 | medium | language_terms | 0 / 1 | language_support | 1 / 1 | in_progress | Pass |
| WB01-M06 | medium | concept_unclear | 0 / 1 | concept_clarification | 1 / 1 | in_progress | Pass |
| WB01-M07 | medium | concept_mismatch | 0 / 1 | context_reinterpretation | 1 / 1 | in_progress | Pass |
| WB01-M08 | needs_support | none | 0 / 1 | stage_5_scaffold | 1 / 1 | in_progress | Pass |
| WB01-M09 | needs_support | simpler_explanation | 0 / 1 | stage_5_scaffold | 1 / 1 | in_progress | Pass |
| WB01-M10 | needs_support | another_example | 0 / 1 | stage_5_scaffold | 1 / 1 | in_progress | Pass |
| WB01-M11 | needs_support | language_terms | 0 / 1 | language_support | 1 / 1 | in_progress | Pass |
| WB01-M12 | needs_support | concept_unclear | 0 / 1 | concept_clarification | 1 / 1 | in_progress | Pass |
| WB01-M13 | needs_support | concept_mismatch | 0 / 1 | context_reinterpretation | 1 / 1 | in_progress | Pass |
| WB01-M14 | high | none | 1 / 1 | fade | 0 / 1 | in_progress | Pass |
| WB01-M15 | medium | none | 1 / 2 | stage_5_scaffold | 1 / 1 | review_recommended | Pass |
| WB01-M16 | medium | simpler_explanation | 1 / 2 | stage_5_scaffold | 1 / 1 | review_recommended | Pass |
| WB01-M17 | medium | another_example | 1 / 2 | stage_5_scaffold | 1 / 1 | review_recommended | Pass |
| WB01-M18 | medium | language_terms | 1 / 2 | language_support | 1 / 1 | review_recommended | Pass |
| WB01-M19 | medium | concept_unclear | 1 / 2 | concept_clarification | 1 / 1 | review_recommended | Pass |
| WB01-M20 | medium | concept_mismatch | 1 / 2 | context_reinterpretation | 1 / 1 | review_recommended | Pass |
| WB01-M21 | needs_support | none | 1 / 2 | stage_5_scaffold | 1 / 1 | review_recommended | Pass |
| WB01-M22 | needs_support | simpler_explanation | 1 / 2 | stage_5_scaffold | 1 / 1 | review_recommended | Pass |
| WB01-M23 | needs_support | another_example | 1 / 2 | stage_5_scaffold | 1 / 1 | review_recommended | Pass |
| WB01-M24 | needs_support | language_terms | 1 / 2 | language_support | 1 / 1 | review_recommended | Pass |
| WB01-M25 | needs_support | concept_unclear | 1 / 2 | concept_clarification | 1 / 1 | review_recommended | Pass |
| WB01-M26 | needs_support | concept_mismatch | 1 / 2 | context_reinterpretation | 1 / 1 | review_recommended | Pass |
| WB01-M27 | high | none | 2 / 2 | fade | 0 / 1 | in_progress | Pass |
| WB01-M28 | medium | none | 2 / 2 | stage_5_scaffold | 0 / 1 | review_recommended | Pass |
| WB01-M29 | medium | simpler_explanation | 2 / 2 | stage_5_scaffold | 0 / 1 | review_recommended | Pass |
| WB01-M30 | medium | another_example | 2 / 2 | stage_5_scaffold | 0 / 1 | review_recommended | Pass |
| WB01-M31 | medium | language_terms | 2 / 2 | language_support | 0 / 1 | review_recommended | Pass |
| WB01-M32 | medium | concept_unclear | 2 / 2 | concept_clarification | 0 / 1 | review_recommended | Pass |
| WB01-M33 | medium | concept_mismatch | 2 / 2 | context_reinterpretation | 0 / 1 | review_recommended | Pass |
| WB01-M34 | needs_support | none | 2 / 2 | stage_5_scaffold | 0 / 1 | review_recommended | Pass |
| WB01-M35 | needs_support | simpler_explanation | 2 / 2 | stage_5_scaffold | 0 / 1 | review_recommended | Pass |
| WB01-M36 | needs_support | another_example | 2 / 2 | stage_5_scaffold | 0 / 1 | review_recommended | Pass |
| WB01-M37 | needs_support | language_terms | 2 / 2 | language_support | 0 / 1 | review_recommended | Pass |
| WB01-M38 | needs_support | concept_unclear | 2 / 2 | concept_clarification | 0 / 1 | review_recommended | Pass |
| WB01-M39 | needs_support | concept_mismatch | 2 / 2 | context_reinterpretation | 0 / 1 | review_recommended | Pass |

**Table E4. Application-Wide V8 Coverage**

| Metric | Covered / total | Percentage |
| --- | --- | --- |
| Statements | 708 / 976 | 72.54% |
| Branches | 627 / 821 | 76.37% |
| Functions | 128 / 200 | 64.00% |
| Lines | 680 / 922 | 73.75% |

*Note.* Coverage contains 42 executable files. Real MongoDB and browser observations are not added to V8 coverage. A structural Pass does not mean that all application code was exercised or that generated content was adequate.

## Appendix F. Structured Usability Inspection

Technical interface inspection was performed across desktop/mobile-emulated widths, English/Burmese locales and light/dark themes. No participant usability study was conducted.

**Table F1. Screen and State Inspection Matrix**

| Flow / planned states | Configuration coverage | Result and qualification |
| --- | --- | --- |
| Home — normal, empty/whitespace-invalid, keyboard submission, loading, provider error/recovery | All eight for base Home. Other states in selected configurations | Empty/whitespace disables Ask. Enter submits. Pending feedback visible. Retained inquiry resubmits. Burmese error message remains English (USI-02). |
| Content — initial hierarchy, hint, bilingual, long content | All eight for initial content. Hint and long-content checks in selected configurations | Sections and revealable hint distinguishable. Glyph/wrapping observations and geometry checks show no material clipping in inspected content. |
| Stage 6A/6B — High, Medium, Needs Support, five options, skip/back, clarification, keyboard | All eight for base Stage 6B. Route and keyboard checks in selected configurations | All five routes and optional continuation executed. Space/ArrowDown selection and Burmese choices inspected. Clarification required only for mismatch choice. Back restores Stage 6A without generation or stored changes. |
| Outcomes — adapting, generated support, correction, ambiguity, fade, cap, retry/error | Selected desktop and mobile-emulated configurations | Route/round trace, corrected heading, ambiguity question, fade and explicit Finish distinguishable. Ambiguous scaffold badge inconsistent (USI-03). Burmese adaptation error English (USI-02). |
| History — empty/populated, newest-first, self-report/action labels, ownership | Selected desktop and mobile-emulated configurations | Final 29 owned links exactly match stored newest-first order. Foreign session excluded and direct access controlled. Recovery returns to owned History. |
| Review/Resume — initial/round-1/round-2, in-progress/review-recommended/completed, response history, legacy | Selected desktop and mobile-emulated configurations | Stored adaptations/events reconstruct. Round-2 feedback and completed Review visible. Legacy missing arrays/snapshot handled without observed crash. |
| Preferences — open/close, keyboard/focus, valid save, persistence, validation error | All eight for the modal. Focus and persistence checks in selected configurations | Valid save survives reload. Escape closes. Modal focus not placed, contained or restored (USI-01). Invalid-value validation is UI-unreachable through bounded options. Recorded NA, not forced. |
| Follow-up — loading, relevant/unrelated, two-question cap, error/recovery | Selected desktop and mobile-emulated configurations | Relevant answers retained. Unrelated response recommends new session. Two-question feedback replaces form. English-only Burmese error retained (USI-02). |
| Additional four configuration combinations | The remaining four combinations completed base Home, modal, initial content and Stage 6B coverage | Completes all eight Home/modal/initial/Stage-6B viewport×locale×theme combinations. |

**Table F2. Usability Criterion Outcomes**

| Criterion | Outcome | Highest severity | Recorded rationale |
| --- | --- | --- | --- |
| U1 Task clarity | Pass | 0 | Purpose, labelled inquiry, empty/whitespace prevention, keyboard submission and recoverable entry inspected on both widths/locales. |
| U2 Visual structure | Pass | 0 | Simple/example/technical/reflection/hint, adaptation history and follow-up answers remain distinguishable on both widths. |
| U3 Bounded choices | Pass | 0 | Three overall responses, five optional support choices, skip/back and bounded clarification exercised. Selected/focus states visible. Meaningful content novelty is not inferred. |
| U4 Feedback | Pass | 0 | Pending/adapting, route/round, fade, cap, completed state and controlled failure/retry feedback visible. Localisation defect scored under U8/U9. |
| U5 Navigation consistency | Partial | 2 | Home/History/Review/Resume and preference save/reload work, but modal keyboard focus starts outside, escapes and does not return to opener (USI-01). |
| U6 Bilingual readability | Pass | 0 | Inspected Burmese glyphs, mixed English terms and long bounded content wrap without material clipping in both themes/widths. Bilingual override visible despite English-only snapshot. Visual readability only — simulation language-quality findings remain mixed. |
| U7 State clarity | Pass | 1 | Self-report, route/round/limit, review recommendation, completed state and correction trace distinguishable. Ambiguity is explicit but generic Concept Correction badge persists (USI-03). No initial round-0 badge is claimed. |
| U8 Error recovery | Partial | 2 | Safe initial/adaptation/follow-up errors preserve resubmission. Foreign-session recovery works. English-only messages in Burmese UI impede Burmese-only recovery (USI-02). Preference-save infrastructure failure not injected. |
| U9 Consistency | Partial | 2 | Labels/layout patterns work across all eight configurations, but modal focus, untranslated errors and ambiguity badge are retained inconsistencies (USI-01–03). |

**Table F3. Observed Usability Issues**

| Issue | Criteria | Severity | Expected behaviour | Observed behaviour | Task effect |
| --- | --- | --- | --- | --- | --- |
| USI-01 | U5 / U9 | 2 | Focus enters and stays inside dialog. Dismissal restores opener focus | Initial focus remains on BODY. Tab reaches background example prompt. Focus eventually leaves modal. Escape closes without restoring opener | Keyboard task impeded by hidden/background focus and extra navigation. Modal controls eventually reachable |
| USI-02 | U8 / U9 | 2 | Safe error and recovery explanation are localised in Burmese | English-only explanation/additional-support/follow-up error text appears inside Burmese UI. Burmese retry controls and preserved query still work | Recovery meaning not available in selected locale. Impedes a Burmese-only learner by evaluator judgement |
| USI-03 | U7 / U9 | 1 | Badge distinguishes remaining ambiguity from confirmed concept correction | Generic Adapted — Concept Correction badge remains while trace/question explicitly says meaning remained ambiguous | Minor terminology inconsistency. Trace provides accurate qualification. No task obstruction observed |

*Note.* Severity 1 denotes a cosmetic issue, severity 2 a task impediment with a workaround, and severity 3 task blockage or materially misleading behaviour. Preference-save infrastructure-fault presentation was not assessed. The recorded six Pass and three Partial are technical inspection outcomes, not participant satisfaction or a full accessibility audit.

## Appendix G. Photosynthesis Scenario Records

The fresh design scenario is separate from the earlier conceptual illustration and the simulation corpus. Browser observations and API-only checks are distinguished. Content findings remain provisional.

**Table G1. Scenario Actions and Observed Results**

| Action | Expected result | Observed result | Assessment |
| --- | --- | --- | --- |
| A / SCN-A | Save Burmese support with useful English retention, beginner explanation and full preferences | Burmese + English Terms, Beginner, Guided inspected in . HTTP 2 PATCH 200. Session snapshot and final profile match exactly | Technical Pass |
| B / SCN-B | Submit unchanged inquiry. Identify concept/context with one generation | Exact input — What is photosynthesis, and how do plants make food?. HTTP 3 POST 201. Photosynthesis / plant biology. One live call. Fresh round 0 | Technical Pass. |
| C / SCN-C | Four initial sections plus revealable Hint, bilingual content | Simple, real-world, technical and reflection sections present. Show Hint revealed bilingual text in All five fields retained in HTTP 3 and storage | Structure Pass. Content Partial (§5) |
| D / SCN-D | Medium → optional Stage 6B skip → default another example. Persist 0 → 1 | shows five choices and skip. HTTP 5 body has overallSupportNeed=medium, no difficulty. Route stage_5_scaffold, support another_example, one call/event/adaptation, in_progress. | Technical Pass. Example novelty limited |
| E / SCN-E | Needs Support + concept_unclear → revised core meaning and scaffold, 1 → 2 | HTTP 6. Concept_clarification. One call, second event/adaptation, review_recommended. Solar-powered-factory analogy and explicit making-versus-taking-food contrast. | Technical Pass. Provisional content qualifications retained |
| Cap UI observation | Show limit feedback and prevent another generated round | shows Maximum support provided and Finish for Now. No Stage 6A response choices at round 2 | Pass for bounded UI. Extra response unavailable in UI |
| SCN-CAP-API-01 | Separately test further support request at cap — event only, no round 3 | separate API file — Needs Support, stage_5_scaffold, null adaptation, 2 → 2, third event, review_recommended, zero provider calls. Original two adaptations unchanged | API-only Pass. Not a UI action |
| F / SCN-F | Choose High at cap only if offered. Otherwise record limitation | High not offered by round-2 UI. No High learner click invented. API-only branch below was then performed. Reload reconstructs it | UI action Not applicable / unavailable |
| SCN-FADE-API-01 | High fades with no generation/increment. Explicit Finish still necessary | separate API file — fade, fourth event 2 → 2, null adaptation, understanding=high, status=in_progress, zero calls. Displays Finish Learning | API-only Pass. Not completion or objective mastery |
| G / SCN-G | Ask fixed relevant follow-up. Use current concept/latest support | Exact question — Why do plants need sunlight for photosynthesis?. Provider call 4. Answer returned 200 in both languages, one stored follow-up. Input contains active concept, round-2 scaffold, latest route fade, original snapshot. | Technical Pass. Single-question content observation only |
| H / SCN-H | Unrelated gravity question must not replace topic or become general chat | Exact question — How does gravity work?. HTTP 11 returns 422 FOLLOW_UP_OUT_OF_SCOPE, newSessionRecommended=true, one scope-classification call. Entire stored session unchanged. Follow-up count stays 1, not 2. | Controlled outcome Pass |
| I / SCN-I | History exposes concept/domain, self-reported support and status | HTTP 12 has one owned session. Shows photosynthesis / plant biology / No support needed / In Progress / Resume. After Finish, HTTP 15 and show Completed / Review | Technical Pass. One-session ordering/scoping observation only |
| J / SCN-J | Resume unchanged session, Finish explicitly, reopen completed Review | HTTP 13 retrieves exact persisted fields before Finish. HTTP 14 PATCH status=completed has zero calls. 18 and retain both adaptations, four events and relevant follow-up | Technical Pass |
| SCN-COMPLETED-API-01 | Reject a post-completion response without mutation/generation | HTTP 17 returns 409 SESSION_RESPONSE_CONFLICT. Full document unchanged and zero provider calls. UI has no response choices, so this is separately labelled API evidence | API-only Pass |

**Table G2. Scenario Technical Verification Checks**

| Check | Recorded assertion | Outcome |
| --- | --- | --- |
| SCN-V01 | All 18 public HTTP requests have ordered IDs and post-request state snapshots | Pass |
| SCN-V02 | Saved bilingual beginner guided profile and immutable preference snapshot match | Pass |
| SCN-V03 | Fixed inquiry, one initial call, identified concept/context and five bilingual content fields | Pass |
| SCN-V04 | Atomic response/adaptation at round 1 has the specified route and one provider call | Pass |
| SCN-V05 | Atomic response/adaptation at round 2 has the specified route and one provider call | Pass |
| SCN-V06 | Capped and High API checks each append one 2-to-2 event without provider work or another adaptation | Pass |
| SCN-V07 | Both separate cap/fade API checks and post-completion check are recorded as Pass | Pass |
| SCN-V08 | Relevant follow-up uses active concept, latest scaffold and latest response route without changing Stage 7 | Pass |
| SCN-V09 | Unrelated follow-up is rejected without persisting another follow-up or changing any session field | Pass |
| SCN-V10 | History and Resume preserve active content, event/adaptation/follow-up counts and session identity | Pass |
| SCN-V11 | Explicit Finish changes lifecycle only. Completed Review and rejected response retain exact recorded content | Pass |
| SCN-V12 | Five live provider requests, no retry/failure, strict schemas, store=false and recorded model version | Pass |
| SCN-V13 | 24 browser observations and 27 JPEGs cover all planned UI actions. High at cap is explicitly unavailable | Pass |
| SCN-V14 | One synthetic completed session, two adaptations, four events and one relevant follow-up. Exported identity pseudonymised | Pass |
| SCN-V15 | 66 root production identities, lock, protocol-at-execution and frozen reference remain verifiable | Pass |

**Table G3. Provisional Scenario Content Observations**

| Observation | Recorded content | Qualification |
| --- | --- | --- |
| SCN-CQ01 initial meaning | Both languages describe plants making food and converting light to stored chemical energy. Oxygen appears in the technical section. Root water uptake is separate from taking food from soil | Introductory glucose shorthand is acceptable only at this stated scope. The biochemical pathway is more complex |
| SCN-CQ02 technical scope | Initial English and Burmese technical paragraphs mention plants, algae and bacteria immediately before chloroplast-based reactions without restricting the latter to plants/algae | This wording can imply that photosynthetic bacteria also have chloroplasts. Bacteria are prokaryotes without membrane-bound organelles . This is a scope-clarity concern, not an assertion that the text explicitly states bacteria have chloroplasts. Content receives no unconditional Pass |
| SCN-CQ03 adaptation difference | Round 1 changes a green-leaf example to a houseplant at a sunny window, but largely repeats the same inputs/glucose/energy account. Round 2 adds the making-versus-taking-food contrast and a solar-powered-factory analogy | First-example novelty is limited despite different strings. The analogy distinguishes power source and raw materials, but is not a detailed explanation of biological mechanisms or proof of improved comprehension |
| SCN-CQ04 Burmese/English balance | Burmese sentence structure carries the main explanation. Useful technical terms include photosynthesis, carbon dioxide, glucose and chloroplast(s). Visible Unicode rendering is readable at this desktop size | Nontechnical English also remains — root, leaf, air, water, input, raw materials and power source. Chemical energy is central but not explicitly paired with a Burmese definition. Selectivity and beginner readability are only partially supported. Exact naturalness/fidelity requires qualified judgement |
| SCN-CQ05 relevant follow-up | Both languages answer sunlight's role as an energy source and connect it to sugar production. Saved answer remains concept-scoped | Natural sunlight is used in this scenario, not a claim that artificial light can never support photosynthesis. One answer cannot establish general scope-classification accuracy |

*Note.* The 15 verification checks in Table G2 are technical checks of the same workflow, not 15 new scenarios. High was not offered in the round-two interface. High-at-cap and post-completion checks were performed through the API.

## Appendix H. Supporting Conceptual and Design Evaluations

These records are literature comparisons, model critique and informed arguments. They are not additional software tests or independent learner studies. Scholarly foundations and source-access limits are discussed in Sections 2.3–2.4 and 3.5–3.6.

**Table H1. GenAI Interview Question Topics**

| Question | Evaluation topic |
| --- | --- |
| Q1 | PIRQOA Coverage |
| Q2 | Logical Coherence |
| Q3 | Theoretical Consistency |
| Q4 | Completeness and Redundancy |
| Q5 | Decision Points and Control |
| Q6 | Scenario Applicability |
| Q7 | Risks and Limitations |
| Q8 | Improvements Without Scope Expansion |
| Q9 | Final Structured Evaluation |

**Table H2. Coded GenAI Findings**

| Finding | Questions | Criterion | Type | Severity | Recorded finding |
| --- | --- | --- | --- | --- | --- |
| G01 | Q1, Q9 | C1 | Support | — | All three PIRQOA requirements and RQ1–RQ3 have identifiable corresponding framework stages. |
| G02 | Q1 | C1 | Support | — | RQ1 is represented through terminology identification, technical-context interpretation, language-support selection, and conceptual explanation. |
| G03 | Q1 | C1 | Support | — | RQ2 is represented through context interpretation, conceptual explanation, structured scaffolding, and later adaptation. |
| G04 | Q1 | C1 | Support | — | RQ3 is represented through structured scaffolding, learner-response collection, adaptation, and the feedback loop. |
| G05 | Q1, Q3, Q6, Q7, Q9 | C1, C3, C5 | Concern | High | Learner-reported understanding represents perceived understanding or need, not objective competence, mastery, or learning. |
| G06 | Q2, Q9 | C2 | Support | — | The overall progression from learner inquiry through interpretation, support, learner response, and adaptation is logically coherent. |
| G07 | Q2 | C2 | Concern | Low–Medium | Terminology identification and technical-context interpretation may sometimes be mutually informing rather than strictly one-directional. |
| G08 | Q2, Q4, Q6, Q8, Q9 | C2, C4 | Concern | Medium | Explain STEM Concept and Provide Scaffolding partially overlap because simple and technical explanations may belong to both stages. |
| G09 | Q2, Q6 | C2 | Concern | Medium | Language-support selection may need to be reconsidered after the initial explanation rather than occurring only once. |
| G10 | Q2, Q4, Q6, Q8, Q9 | C2, C4, C5 | Concern | Medium | The destination of the adaptation loop is ambiguous. Some difficulties may require revisiting language support or conceptual explanation rather than only updating scaffolding. |
| G11 | Q3, Q9 | C3 | Support | — | The three study-specific TTF dimensions have clear counterparts in the framework. |
| G12 | Q3, Q9 | C3 | Support | — | Structured assistance, contingency, and fading are visibly represented in the framework. |
| G13 | Q3, Q9 | C3 | Concern | Medium | Designing capabilities to fit learner tasks does not demonstrate that actual Task–Technology Fit has occurred. |
| G14 | Q3, Q7 | C3, C4 | Concern | High | The theoretical foundation and structured workflow do not guarantee that LLM-generated STEM explanations, examples, or analogies are technically accurate or pedagogically appropriate. |
| G15 | Q4, Q9 | C4 | Support | — | No major required conceptual function is clearly absent. The seven-stage framework is mostly complete for its intended scope. |
| G16 | Q4, Q5, Q8, Q9 | C4 | Concern | Medium | Learner-response evaluation is named as a decision point but is not clearly located between collecting the response and selecting an adaptive action. |
| G17 | Q4, Q5, Q6, Q7, Q8 | C4 | Concern | Medium | The conceptual criteria for choosing Burmese, English-term preservation, bilingual, or combined support are underspecified. |
| G18 | Q4, Q6, Q8 | C4 | Concern | Low–Medium | It is unclear whether simple explanation, analogy, technical explanation, reflective prompt, and hint are mandatory sequential components or selectable scaffolding forms. |
| G19 | Q5 | C2, C3, C4 | Support | — | The language-support decision point usefully bounds the LLM by tying language strategy to terminology and technical context. |
| G20 | Q5 | C2, C3, C4 | Support | — | Learner-response evaluation provides a conceptual mechanism for contingency and fading rather than leaving adaptation entirely unrestricted. |
| G21 | Q5, Q7, Q9 | C2, C4 | Concern | Medium | Both major decision points specify possible outcomes more clearly than the conceptual conditions governing those outcomes. |
| G22 | Q6, Q9 | C5 | Support | — | All seven framework stages could be meaningfully instantiated using the Photosynthesis scenario. |
| G23 | Q6 | C5 | Support | — | The Photosynthesis scenario demonstrates why terminology identification and technical-context interpretation are distinct but related. |
| G24 | Q6, Q7, Q9 | C5 | Concern | High | A broad response such as "I partially understand" indicates continued need but does not diagnose what the learner is struggling with. |
| G25 | Q6 | C5 | Concern | Medium | Several different adaptive actions can reasonably follow the same self-report, so the next support action is incompletely constrained. |
| G26 | Q6 | C5 | Support | — | The Photosynthesis scenario did not reveal a clearly necessary eighth stage. |
| G27 | Q7 | C2, C4 | Concern | High | Incorrect technical-context interpretation could propagate through language selection, explanation, and scaffolding while later stages still appear internally coherent. |
| G28 | Q7 | C4 | Concern | Medium | An inappropriate Burmese/English strategy could over-rely on unfamiliar English terminology or over-translate useful disciplinary terminology. |
| G29 | Q7 | C3, C4 | Concern | Medium | Adaptive actions and fading may be inconsistent because permitted actions are clearer than the conditions used to choose among them. |
| G30 | Q7 | C3 | Concern | High | Fading triggered by positive learner self-report could be misinterpreted as evidence that actual mastery has occurred. |
| G31 | Q8 | C2, C4 | Suggested Improvement | Medium | Clarify Stage 4 as establishing the core STEM meaning and Stage 5 as structuring access to that meaning through examples, prompts, hints, analogies, or changes in explanatory depth. |
| G32 | Q8 | C3, C4 | Suggested Improvement | Medium | Make learner-response evaluation explicit at the beginning of Stage 7 before an adaptive direction is selected. |
| G33 | Q8 | C3 | Suggested Improvement | High | Explicitly state that Stage 6 provides a learner-reported support signal, not verified understanding, and Stage 7 adapts according to that signal. |
| G34 | Q8 | C4 | Suggested Improvement | Medium | Clarify language-support selection using terminology, technical context, preservation of useful English terms, and expressed language-related need where available. |
| G35 | Q8 | C2, C4 | Suggested Improvement | Medium | Allow bounded adaptation to revisit the relevant earlier support decision when difficulty concerns language, explanation, or scaffold form. |
| G36 | Q8 | C2, C4 | Suggested Improvement | Medium | Permit the framework to recognize ambiguity or uncertainty in terminology/context interpretation and conceptually allow clarification before proceeding. |
| G37 | Q8 | C3, C4 | Suggested Improvement | Low | Clarify that scaffolding elements are selectable forms of support rather than necessarily cumulative or fixed. |
| G38 | Q8 | C4 | Suggested Improvement | Medium | State that generated explanations should remain consistent with interpreted STEM context and are not automatically evidence of correctness or effectiveness. |
| G39 | Q8 | C1–C5 | Support / Suggested Improvement | — | The GenAI recommended retaining the seven-stage structure and revising it moderately rather than redesigning it substantially. |
| G40 | Q9 | C1 | Support | — | Final GenAI judgment — C1 PIRQOA Coverage = Fully covered, high confidence. |
| G41 | Q9 | C2 | Support with Concern | Medium | Final GenAI judgment — C2 Logical Coherence = Acceptable with minor issues, high confidence. |
| G42 | Q9 | C3 | Support with Concern | Medium | Final GenAI judgment — C3 Theoretical Consistency = Acceptable with minor issues, high confidence. |
| G43 | Q9 | C4 | Support with Concern | Medium | Final GenAI judgment — C4 Completeness and Boundary Clarity = Mostly complete, high confidence. |
| G44 | Q9 | C5 | Support with Concern | Medium | Final GenAI judgment — C5 Scenario Applicability = Applicable with minor issues, high confidence. |
| G45 | Q9 | C1–C5 | Support | — | The three strongest aspects identified were PIRQOA traceability, progression beyond translation toward conceptual support, and explicit adaptive structure. |
| G46 | Q9 | C2–C5 | Concern | Medium–High | The three most important limitations were reliance on self-report, insufficiently constrained decision logic, and ambiguous Stage 4/5 boundaries and feedback routing. |
| G47 | Q9 | C1–C5 | Suggested Improvement | Medium | Final overall GenAI conclusion — Requires important revision, but does not require major redesign. |

**Table H3. Conceptual Literature Comparison Findings**

| Comparison | Evaluation focus | Recorded conclusion | RQ |
| --- | --- | --- | --- |
| CL01 | PIRQOA/RQ1–RQ3 coverage | Strongly supported | RQ1 / RQ2 / RQ3 |
| CL02 | Terminology identification | Strongly supported | RQ1 / RQ2 / RQ3 |
| CL03 | Technical-context interpretation | Strongly supported | RQ1 / RQ2 / RQ3 |
| CL04 | Terminology ↔ context iteration concern | Limited support / unresolved | RQ1 / RQ2 / RQ3 |
| CL05 | Selective Burmese/English support | Strongly supported in principle | RQ1 / RQ2 / RQ3 |
| CL06 | Language-selection criteria concern | Moderately supported | RQ1 / RQ2 / RQ3 |
| CL07 | Conceptual explanation beyond translation | Strongly supported | RQ1 / RQ2 / RQ3 |
| CL08 | Structured scaffolding | Strongly supported | RQ1 / RQ2 / RQ3 |
| CL09 | Stage 4/Stage 5 merge | Not supported | RQ1 / RQ2 / RQ3 |
| CL10 | Stage 4/Stage 5 clarification | Supported | RQ1 / RQ2 / RQ3 |
| CL11 | Learner interaction/response | Moderately supported | RQ1 / RQ2 / RQ3 |
| CL12 | Self-report as non-objective learning evidence | Not directly evaluated by the existing review corpus | RQ1 / RQ2 / RQ3 |
| CL13 | Adaptive support | Strongly supported in principle | RQ1 / RQ2 / RQ3 |
| CL14 | Exact adaptation decision logic | Moderately supported concern | RQ1 / RQ2 / RQ3 |
| CL15 | Feedback-loop re-entry to earlier stages | Limited-to-moderate support | RQ1 / RQ2 / RQ3 |
| CL16 | Context interpretation error risk | Moderate-to-strong support | RQ1 / RQ2 / RQ3 |
| CL17 | Generated-content reliability risk | Strongly supported | RQ1 / RQ2 / RQ3 |
| CL18 | Seven-stage major redesign | Not supported by literature | RQ1 / RQ2 / RQ3 |
| CL19 | Seven-stage clarification/refinement | Supported | RQ1 / RQ2 / RQ3 |

*Note.* These nineteen consolidated comparison findings are not nineteen newly executed studies. The existing review corpus and secondary-source limits remain. General literature support does not validate Burmese wording, exact stage topology, route permissions or the adaptation limit.

**Table H4. Conceptual Informed Arguments**

| Argument / responsibility | RQ | Scholarly basis | Bounded conclusion |
| --- | --- | --- | --- |
| IA-C01 / terminology | RQ1 | Tran et al. (2023) | Conceptually justified. Not validated ATE |
| IA-C02 / context | RQ1–2 | Tran et al. (2023). Goodhue & Thompson (1995) | Justified with qualification. Interpretation can be wrong |
| IA-C03 / language | RQ1 | Kleidermacher & Zou (2026) | Justified with qualification. Burmese-specific transfer unverified |
| IA-C04 / core meaning | RQ2 | Sweller (1988). Goodhue & Thompson (1995). Ji et al. (2024) | Conceptually justified. Correctness/learning unestablished |
| IA-C05 / scaffold selection | RQ2–3 | van de Pol et al. (2010). Sweller (1988) | Justified with qualification. Labels do not establish scaffolding |
| IA-C06 / response | RQ3 | van de Pol et al. (2010). Dunlosky & Rawson (2012) | Justified with qualification. Self-report only |
| IA-C07 / adaptation | RQ1–3, depending on route | van de Pol et al. (2010). Goodhue & Thompson (1995) | Justified with qualification. No calibrated fading or optimal cap claim |

**Table H5. Design Informed Arguments**

| Argument | RQ | Feature / mechanism | Scholarly basis | Conclusion |
| --- | --- | --- | --- | --- |
| IA-D01 | RQ1 / RQ2 | 1–2. Reinterpretation in 7. Terminology/context | Tran et al. (2023). Goodhue and Thompson (1995) | Partially supported |
| IA-D02 | RQ1 | 3. Language route in 7 | Kleidermacher & Zou (2026). Goodhue and Thompson (1995) | Partially supported |
| IA-D03 | RQ2, enabling RQ3 | 4–5. Explanation/scaffolding | Athukorala & De Silva (2025). Van de Pol et al. (2010) | Partially supported |
| IA-D04 | RQ3 | 6A/6B. Learner-response signal | van de Pol et al. (2010). Goodhue and Thompson (1995) | Supported — bounded stated-need collection only |
| IA-D05 | RQ3, with RQ1/RQ2 depending on route | 7 → 3/4/5. Contingency/fade proxy | van de Pol et al. (2010) | Partially supported. State bound supported |
| IA-D06 | RQ3 | Concept-scoped Stage 5 support. No Stage 7 mutation | Goodhue & Thompson (1995), applied inference | Supported — tested scoped mechanism only |
| IA-D07 | RQ3, enabling RQ1 | Task-aligned continuity across 3–7 | Goodhue & Thompson (1995), applied inference | Partially supported. Persistence supported |
| IA-D08 | RQ1–RQ3, enabling | System-control boundary, not extra stage | Hevner et al. (2004). Venable et al. (2016) | Partially supported |

**Table H6. Design Literature Comparisons**

| Comparison | Capability evaluated | Literature rationale | Observed design conclusion | Remaining limitation | RQ |
| --- | --- | --- | --- | --- | --- |
| DL01 | Native-language technical support | Moderate | Partially supported — native-language output and persistence observed. Language/content adequacy remains mixed | No participant learning comparison or validated Burmese glossary. New scenario review remains provisional | RQ1 / RQ2 |
| DL02 | Structured educational content | Moderate | Partially supported — structured sections and hint visible. Scientific/pedagogical adequacy not guaranteed | 91 simulation output ratings remain 18 Pass/71 Partial/2 Fail. No layout-effect comparison | RQ2 |
| DL03 | Multiple representations and scoped interaction | Moderate | Supported for bounded scoped follow-up in recorded cases. Not for equivalence to video affordances | No general scope-classification accuracy estimate. No audiovisual implementation or outcome comparison | RQ2 / RQ3 |
| DL04 | Contextual multilingual interaction | Moderate | Partially supported — bilingual interaction observed. Selective terminology and accessible learner language remain incomplete | Visual Burmese rendering Pass is not Burmese fidelity. English-only errors in Burmese UI remain USI-02 | RQ1 / RQ3 |
| DL05 | Personalised and adaptive assistance | Moderate | Partially supported — route/state transitions observed. Adapted-support novelty and educational responsiveness remain qualified | Most simulation content Partial. BB07/08 fixture novelty Partial. New example novelty limited. High does not measure mastery | RQ3 |
| DL06 | Selective retention of English technical terms | Moderate | Partially supported — selective-support mechanism exists. Reliable balance between retention and Burmese explanation is not established | Do not infer language quality from schema compliance or preference settings. No local retention optimum tested | RQ1 |
| DL07 | Specialised terminology identification | Limited | Partially supported as bounded interpretation/correction. ATE performance Not assessed | Eight initial simulation ambiguities have no created session. Two correction paths failed. No extraction precision/recall benchmark | RQ1 / RQ2 |
| DL08 | Context-aware explanation and concept repair | Moderate | Partially supported — correction can persist and reconstruct. Unchanged reinterpretations rejected rather than falsely accepted | Historical initial sections remain historical. Generic correction badge ambiguous. Concept-recovery reliability not established | RQ1 / RQ2 / RQ3 |
| DL09 | Structured multilingual prompting within an information system | Moderate | Supported for tested structural boundaries. Content assurance and strict timeout ceiling remain qualified | SIM05-C configured 20 s abort observed 52.825 s. No automatic retry. Provider error/quality failures remain | RQ1 / RQ2 / RQ3 |
| DL10 | Controlled learner-response workflow and state continuity | Limited | Supported within recorded state transitions. Broader pedagogical workflow fit Not assessed | BB22 remains an absent-identity oracle mismatch. No leakage observed. Modal focus and translated errors remain Partial | RQ3 |
| DL11 | Integration relative to the reviewed SLR/SSR corpus | Moderate | Partially supported integration demonstration within research scope. Not superiority or universal novelty | One fresh scenario plus artificial coverage does not establish general learner utility. Specialist term accuracy and adapted-content quality incomplete | RQ1 / RQ2 / RQ3 |
| DL12 | Critical evaluation of low-resource and specialised output | Strong | Supported need for critical evaluation. Observed quality remains mixed rather than certified | The completed content assessment covers earlier simulation outputs. The fresh scenario remains provisional and learner outcomes were not measured | RQ1 / RQ2 / RQ3 |
| DL13 | Exact two-round bound and High-to-fade semantics | Contradictory/uncertain | Supported server/state bound in tested cases. Pedagogical optimality and transfer of responsibility Not assessed | Round cap is not a global provider-cost bound. High unavailable in round-2 UI in new scenario and tested only via API there | RQ3 |

**Table H7. Historical Conceptual Scenario Evidence Boundaries**

| Responsibility / transition | Recorded evidence | Unresolved point |
| --- | --- | --- |
| Terminology and context | Photosynthesis inquiry with plant-focused explanation | Execution date, model and code version were not recorded |
| Language support | English and Burmese content in the illustration | Learner-specific term retention was not independently validated |
| Core explanation and scaffold | Simple explanation, real-world example, technical explanation, reflection and hint | Illustration is not participant comprehension evidence |
| Response and adaptation | A check–example–check sequence was shown | Exact triggering response and strategy-selection reason were not recorded |
| Later transitions | No complete trace was recorded | Second adaptation, fade, cap, follow-up answer and lifecycle remain incomplete |

## Appendix I. Research Question and Requirement Traceability

The recorded 24 relationships connect evaluation findings to the research questions stated in Section 1. Requirements concern terminology support (RQ1), conceptual explanation (RQ2) and structured responsive assistance (RQ3). These relationships are derived mappings, not additional evaluations.

**Table I1. Requirement-to-Finding Relationships**

| RQ | Issue / requirement focus | Relevant criteria | Supported claim | Unresolved claim or gap |
| --- | --- | --- | --- | --- |
| RQ1 | Insufficient terminology and contextual language support (overall assessment) | C1 / C2 / C3 / C4 / C5 / F1 / F2 / F3 / F12 / F13 / U1 / U6 / U8 | Partially supported overall. A literature-grounded framework and functioning PoC integrate concept/domain identification, bounded context repair and selective Burmese/English presentation in recorded cases. F1–F3 remain Partial. Readable display and working routes establish bounded implementation capability. | Reliable intended-meaning interpretation, accurate Burmese terminology and an optimal retention policy are not established. Live unchanged-correction failures, eight initial no-session ambiguities, material gravity/ion wording failures and English errors in Burmese UI remain. No validated ATE, participant barrier-reduction study, universal domain coverage, independent expert study or superiority claim. |
| RQ1 | A target specialised term must be established before relevant support can be selected | C1 / C2 / C4 | Conceptually justified responsibility — target identification and disciplinary context make later support accountable to the intended concept. The current argument provides cited warrants and removal/counterargument tests. | Learner-inquiry interpretation is not corpus-level automatic term extraction. No extraction precision/recall benchmark, authoritative Burmese glossary or proof that separate stages/calls are uniquely necessary. The 2023 preprint and A2 later journal source retain their recorded version/access limits. |
| RQ1 | The same term can denote different STEM concepts or domains | F2 / F6 / F9 | Tested contracts accept ready/corrected interpretations, expose controlled ambiguity and preserve previous/current concept trace. A recorded cell correction and controlled public-HTTP/browser fixtures reconstruct corrected context without replacing the session. | Mechanical correction does not guarantee the learner’s intended sense. SIM-CM-13/16 failed because purported corrections were unchanged and rejected. Initial ambiguous current/network attempts did not create sessions. No successful downstream correction is attributed to these unsuccessful attempts. |
| RQ1 | Learners may need Burmese and English terms despite a saved single-language preference | F3 / F6 / F12 / U6 | Recorded preference modes and language-help routes support bilingual per-adaptation display while keeping the saved profile and original session snapshot unchanged. Visual glyph/wrapping checks pass within the inspected viewports/locales/themes. | Bilingual visibility does not certify translation fidelity or beginner suitability. Some fixtures reuse paragraphs. No additional content assessment was performed. Viewport emulation and readable Unicode are not physical-device or WCAG conformance evidence. |
| RQ1 | Literal translation or excessive English retention can obscure technical meaning | C3 / C4 / F3 / F6 / U6 | Conceptual and design literature support selective retention of useful English technical terms with contextual explanation. The PoC can revise language support rather than automatically translating every term or altering the profile. | The exact Burmese/English balance remains partially supported. The recorded mass/weight and ion net-charge errors persist. Fresh Photosynthesis retains nontechnical English and lacks an explicit Burmese pairing for chemical energy. Its new content is provisional content analysis, not an independently reviewed conclusion. |
| RQ1 | A mistaken concept interpretation needs a bounded repair path without an unrestricted conversation | C2 / C4 / F2 / F6 / F7 / F9 / F13 | Context-reinterpretation uses a bounded clarification, application-selected route and persisted prior/current interpretation. Corrected, still-ambiguous and capped outcomes are distinguishable in the recorded contracts. Rejected corrections leave state unchanged. | Rejected unchanged corrections are delivery Fail, not successful repair. Generated remaining-ambiguity support consumes a bounded round. The original zero-round supplemental assertion remains Fail. A generic correction badge still appears on an ambiguous outcome (severity 1). No eighth stage or general chat is inferred. |
| RQ1 | Language support also requires usable inquiry and controlled input/error boundaries | F1 / F12 / F13 / U1 / U8 | Enabling technical evidence — tested inquiry limits, structured-output rejection and safe recovery prevent rejected/malformed initial support from being persisted. Labelled input and keyboard submission work in the recorded inspection. | These controls do not demonstrate reduced learner language barriers. U8 remains Partial because errors are English-only in Burmese UI. Preference-save infrastructure-fault UI was not assessed. Fifteen local timing attempts are descriptive, not an SLA or hard timeout guarantee. |
| RQ2 | Insufficient conceptual support beyond translation (overall assessment) | C1 / C2 / C3 / C4 / C5 / F4 / F6 / U2 / U6 | Partially supported overall. The framework separates core concept meaning from supporting scaffolds, and recorded PoC outputs provide layered explanations, examples, reflection and hints beyond isolated term translation. F4 remains Partial. Visible structure and bounded revised support are demonstrated. | Meaningful structure does not establish consistently correct science, natural Burmese, novel adaptation or improved understanding/retention. Delivered-output ratings are mixed, including two material initial content Fail cases. Fresh scenario content remains provisional. No learner experiment or independent expert validation. |
| RQ2 | Core meaning and pedagogical assistance need distinguishable responsibilities | C1 / C2 / C3 / C4 | Conceptually justified core meaning plus qualified scaffold selection — the cited current argument supports concept-focused explanation and purposeful assistance, with removal tests and counterarguments. Refinement clarifies Stage 4/5 responsibilities rather than merging them. | Explanation and scaffolding can overlap. Labels and five selected forms are local design choices, not a uniquely proven cognitive sequence. No measured cognitive-load reduction, competence-calibrated scaffolding or superiority over a glossary/tutor alternative. |
| RQ2 | Learners need explanatory structure rather than a translated isolated word | F4 / U2 / U6 | Recorded initial sessions contain Simple Explanation, Real-World Example, Technical Explanation, Reflective Prompt and revealable Hint. Schema/contract checks preserve all five areas, and browser observations distinguish them from adaptations and follow-up answers. | The presence of five fields and visible hierarchy is structural evidence, not proof that an analogy is appropriate, a hint is sufficient, reflection is used or an explanation teaches successfully. The fresh scenario technical-scope concern remains. |
| RQ2 | An additional example or revised explanation should offer meaningful concept-focused support | C2 / C3 / F4 / F6 | The concept-unclear route requests revised core meaning and a scaffold, while simpler/exemplar routes target the chosen support form. Recorded delivered revisions include causal explanations and different examples. The fresh second adaptation adds a making-versus-taking-food contrast and analogy. | This is not a misconception diagnosis or a guarantee of meaningful novelty. BB07/08 prefixed fixtures were not semantically assessed. Literal repetition rejection is not pedagogical non-repetition. The first fresh Photosynthesis example largely repeats prior content and receives no unconditional novelty Pass. |
| RQ2 | Incorrect definitions or technical language can defeat otherwise structured support | F3 / F4 / F6 | Qualified assessment is available for the recorded simulation outputs — 91 delivered-output ratings comprise 18 Pass, 71 Partial and two Fail. The review makes scientific and language defects visible instead of treating JSON/technical delivery as correctness. | SIM04-B initial has material mass/weight terminology errors. SIM08-B initial reverses the nonzero net-charge definition in Burmese. The later better adaptations do not repair those initial outputs. No independent second assessment was recorded. Failed/not-delivered steps are not delivered content. Fresh bacterial/chloroplast scope wording is a provisional concern. |
| RQ2 | Conceptual explanations and hints must be distinguishable and visually readable | U2 / U6 / F4 | Technical inspection supports visible section hierarchy, hint reveal and bilingual glyph/wrapping readability at the recorded desktop/mobile widths, locales and themes. These are bounded presentation properties enabling conceptual support. | Readable text does not establish semantic fidelity, satisfaction, comprehension, learnability or accessibility certification. Controlled fixture inspection and viewport emulation are not participant or physical-phone evidence. |
| RQ3 | Insufficient structured, learner-responsive assistance (overall assessment) | C1 / C2 / C3 / C4 / C5 / F5 / F6 / F7 / F8 / F9 / F10 / F11 / F12 / F13 / U3 / U4 / U5 / U7 / U8 / U9 | Partially supported overall. The framework is instantiated as an optional two-level self-report, deterministic route selection, bounded generation, scoped follow-up and durable state/history. Recorded external and internal checks corroborate tested mechanics. F5–F13 retain Partial aggregate outcomes. | Responsive system mechanics do not establish calibrated contingency, pedagogical fading, transfer of responsibility or improved learning. Live route failures, mixed support quality, duplicate provider work under contention, BB22 oracle failure and U5/U8/U9 Partials remain. The exact two-round dose is not validated as optimal. |
| RQ3 | Learners need a low-burden way to request support without a forced diagnosis | C1 / C3 / F5 / U3 | Supported bounded mechanism — High, Medium and Needs Support collect overall self-reported need. Medium/Needs Support may choose one of five help types, skip or cancel/back. Invalid/conflicting inputs are rejected. Response events retain the signal and selected route. | Legacy understanding is a storage/API name for self-report, not a competence measure. Difficulty selection is optional and does not diagnose misconceptions. No objective mastery/quiz or full proficiency profile was evaluated. |
| RQ3 | Support requests need deterministic routing rather than model-controlled lifecycle decisions | F2 / F3 / F5 / F6 / F7 / F9 / F13 | Application-owned routing selects fade, default/explicit Stage 5 scaffolds, language help, concept clarification or bounded reinterpretation. The recorded 39 response/difficulty/round combinations test route/provider/save decisions. Structured contracts fail before invalid persistence. | A selected route does not guarantee delivered support quality. Live abort and unchanged-correction failures remain Fail. Semantic novelty of controlled BB07/08 fixtures is Not assessed. Generated remaining-ambiguity support uses a round. Its original zero-round oracle failure is retained. |
| RQ3 | Assistance should respond to need, but the available signal is only self-reported | C2 / C3 / C4 / F5 / F6 | Conceptual support with qualification — the cited scaffolding benchmark warrants collecting a learner signal and revising assistance. The PoC implements response-to-route responsiveness, a limited structural proxy for contingency. | No competence diagnosis, measured TTF fit, performance-calibrated support, learner improvement or transfer of responsibility is established. Preference/state persistence is engineering continuity rather than evidence of adaptive pedagogy. |
| RQ3 | Low self-reported need should reduce generation without implying automatic completion | C3 / F5 / F6 / F7 / F11 | Bounded implementation evidence — High records a fade event with no adaptation/provider call or round increment in directly instrumented checks. Explicit Finish remains separate. High at round 2 can leave the stored session in_progress. | Withholding generation on High is not demonstrated educational fading or mastery. DYN-06 retains its indirect-count Partial Pass. The fresh scenario High-at-cap observation was API-only because the capped UI did not offer that response action. |
| RQ3 | Generated support needs a server-enforced stopping rule and atomic state transitions | F6 / F7 / F9 / F11 / F13 | Strong bounded mechanical support — generated, persisted adaptations alone increment the round, capped responses record events without round 3 or generation, and completion is separate/idempotent. Real isolated-DB contention admits one atomic state write and rejects the stale contender. | Two rounds is an engineering guard rail, not an optimal learning dose or global cost ceiling. BND-15 makes two provider calls for one accepted write. Failed SIM05-C did not reach its later cap step. That unreached step is not a Pass. DYN-05 retains indirect counts. Fresh cap response checks are API-only. |
| RQ3 | Supporting questions must stay concept-scoped and not silently change adaptation state | F8 / F9 / F13 | Supported tested mechanism — current active concept, latest relevant scaffold/route and preferences reach follow-up generation. Relevant answers persist independently. Unrelated topics are controlled, 500/501-character boundaries and the two-question cap are checked, and Stage 7 state stays unchanged. | Scope/answer fixtures and one fresh Photosynthesis answer do not establish universal live scope-classification accuracy or factual quality. Follow-up wording is not automatically converted into a difficulty type and does not consume adaptation rounds or create general chat. |
| RQ3 | History and reopening a session should preserve its visible support state | F9 / F10 / F11 / U5 / U7 | Enabling technical support — owned newest-first History, Review of stored adaptations/events/follow-ups and Resume across tested statuses/rounds preserve active/corrected concept trace. Legacy reads and atomic reconstruction are exercised without replacing session IDs. | Persistence is not adaptive teaching success. Not every possible legacy document was tested. Raw clarification/preferences are not individually rendered as history fields. U5 remains Partial for modal focus and the ambiguous-outcome badge remains a severity-1 inconsistency. |
| RQ3 | Support preferences need continuity without silently changing prior session context | F3 / F12 / U5 / U8 | Enabling technical support — valid preference updates persist, old session snapshots remain independent of later profile changes, and bilingual overrides do not rewrite the saved profile. Preferences remain a modal. Locale/theme inspection is within browser-presentation scope. | Preferences do not establish diagnosed learner proficiency or calibrated support fit. Invalid preference choices are UI-unreachable (Not applicable), not forced browser passes. Preference-save infrastructure-fault recovery was Not assessed. No claim of synchronised profile locale/theme is inferred. |
| RQ3 | Failures and ownership boundaries must protect state without concealing unsuccessful support | F7 / F9 / F10 / F13 / U8 | Enabling technical support — tested safe envelopes and validation reject invalid/malformed outputs before writes, and foreign-session attempts do not mutate foreign state. Live failed responses also leave stored state unchanged. Explicit recovery is observed in recorded paths. | Safe rejection does not turn intended-route delivery Fail into Pass. BB22’s absent-identity 400 oracle remains Fail because the public proxy provisions a scoped anonymous cookie. No leakage was observed, but authenticated-user security was not certified. A 20-second timer does not imply a hard wall-clock ceiling (SIM05-C — 52.825 s). Original restricted cookie-bearing evidence is not cleared for publication. |
| RQ3 | The complete adaptive workflow needs clear feedback and consistent keyboard/localised interaction | U3 / U4 / U5 / U7 / U8 / U9 | Technical inspection covers optional choices, skip/back, pending/adapting, routes, round limits, completion, recovery and state reconstruction. Usability remains six Pass/three Partial across the specified distributed desktop/mobile, locale/theme and keyboard inspection scope. | USI-01 modal focus and USI-02 English-only errors are severity 2. USI-03 remaining-ambiguity badge is severity 1. Fixtures and viewport emulation are not participant satisfaction/learnability, a physical-phone test or WCAG certification. No fixes or new content assessment are inferred. |
