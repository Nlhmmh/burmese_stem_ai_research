# Evaluating Adaptive LLM Scaffolding for Burmese-Speaking STEM Learners

## Abstract

Burmese-speaking STEM learners may need help with English terminology and unfamiliar concepts. This study evaluates a Context-Aware Adaptive STEM Scaffolding Framework and a bilingual large language model application. Conceptual evaluation uses GenAI critique, literature analysis, informed argument and a historical scenario. Design evaluation uses functionality and usability criteria, code and runtime analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a live scenario. Tests support application-controlled routing, stored response history and persistence under the tested conditions. Content assessment rated 91 delivered outputs as 18 Pass, 71 Partial and two Fail. Usability inspection found six criteria Pass and three Partial. The study demonstrates an integration of terminology support, explanations and learner-responsive assistance within a two-adaptation limit. It does not establish improved learning or whether the level of support and adaptation limit are educationally appropriate.

## Keywords

- Adaptive STEM Scaffolding
- STEM Terminology Support
- Burmese-Speaking Learners
- Large Language Models
- Bilingual Learning
- Educational Information Systems

## 1. Introduction

Burmese-speaking STEM learners may need contextual explanations of specialised English terminology and unfamiliar concepts, rather than literal translation alone. This study evaluates an approach that combines terminology support, conceptual explanation and assistance based on learner responses. It evaluates the proposed support, not how many learners experience these difficulties or how severe the difficulties are. Three research questions guide the assessment.

1. RQ1 — How can specialised English STEM terminology be supported for Burmese-speaking learners?
2. RQ2 — How can LLM-based support help learners understand STEM concepts beyond translation?
3. RQ3 — How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?

The study examines two artefacts. The Context-Aware Adaptive STEM Scaffolding Framework defines seven support responsibilities. A bilingual large language model (LLM) proof-of-concept application implements these responsibilities. Learners enter a STEM inquiry, receive structured support, report their support need and can request a revision within a fixed limit. The application stores responses and support history for later review.

Conceptual evaluation combines GenAI critique, literature analysis, informed argument and a historical scenario. Design evaluation combines criteria-based inspection, static and dynamic analysis, bounds analysis, simulation, black-box and white-box testing, literature comparison and a fresh scenario. Method selection follows the analytical, experimental, testing and descriptive categories of Hevner et al. (2004). [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish evaluation in controlled settings from evaluation in real use. Most methods in this study used controlled tests, scripted inquiries or researcher inspection. They show how the artefacts behave under those conditions, but not how useful they are to learners in everyday study. No participant learning experiment or independent expert interview was conducted.

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

### 2.3 Academic Literature Evaluation

Conceptual literature evaluation used an existing 17-study corpus rather than conducting a new search. Nineteen findings linked relevant research to the seven responsibilities and the concerns raised by the GenAI critique. Each comparison examined what the literature supported, where its findings might not transfer and what this meant for the framework. The purpose was to evaluate the proposed design, not to establish that no similar approach exists elsewhere.

Native-language technical assistance offers a relevant precedent in Sinhala programming education ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)), but its language and findings do not transfer directly to Burmese STEM learners. Scientific-paper translation provides a rationale for retaining selected English terms ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). Researchers' preferences do not show whether novices understand those terms. Guided multilingual interaction in [Kuzu (2026)](https://doi.org/10.1007/s10758-026-09974-7) suggests a limitation of the application. Choosing assistance from a menu without a teacher is not equivalent to teacher-guided support.

These comparisons support responsibilities for context, language and assistance. They do not validate the exact stage structure, route table or two-round policy. Some comparisons relied on secondary summaries rather than direct access to the original studies. This limits the strength of those comparisons, which are not independent checks of the originals. The studies therefore provide reasons for including particular responsibilities, while differences in language, learners and setting limit the conclusions.

### 2.4 Informed Argument

Informed argument uses scholarly sources to explain why a design mechanism may be useful, what would be lost if it were removed and what objections remain. This follows descriptive evaluation in information systems research ([Hevner et al., 2004](https://doi.org/10.2307/25148625), p. 86, Table 2). The argument assesses the refined framework. Sources added during this assessment are not presented as part of the earlier interview or literature corpus.

[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) support examining whether technology suits the tasks it is intended to assist. Applying this idea to STEM learning provides a design rationale, not a measured level of task–technology fit. Without term and context identification, the application could explain the wrong meaning. [Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1) support attention to domain terminology, but do not validate this application's term identification. Without language selection, retaining English terms could become arbitrary. Without an explicit core explanation, examples might not clearly communicate the concept. [Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4) provides an instructional rationale for considering cognitive demands, but this study did not measure cognitive load. [Ji et al. (2024)](https://arxiv.org/abs/2202.03629v7) also show why fluent generated text should not be assumed to be reliable.

[Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) identify support adjusted to learner need, gradual withdrawal of support and transfer of responsibility as central to scaffolding. These ideas support purposeful assistance and responsive adjustment. However, self-report alone cannot show whether assistance matches a learner's actual competence. Examples or hints may be available without meeting the learner's expressed need. Self-evaluation can also be inaccurate ([Dunlosky & Rawson, 2012](https://doi.org/10.1016/j.learninstruc.2011.08.003)), although this does not make every learner response unreliable. Removing response collection or adaptation would break the feedback process. Conversely, stopping generation after a high self-report does not show mastery. Target identification and core meaning were rated Conceptually justified. The other five responsibilities were Justified with qualification. Designs that combine stages or involve a teacher remain reasonable alternatives.

### 2.5 Scenario Evaluation

An earlier Photosynthesis interaction illustrates core explanation, structured support and a check–example–check sequence. It shows how the framework could work in an interaction, but does not record the exact response that triggered adaptation, a second adaptation, fade/cap behaviour, a follow-up answer or the complete session lifecycle. Execution date, model and code version were not recorded. The example therefore cannot establish why a support strategy was selected or whether the learner's reported understanding changed. Scenario applicability remains partial despite the earlier positive judgement. The fresh application walkthrough in Section 3.5 is separate evidence and cannot fill gaps in the earlier record. The historical scenario illustrates the responsibilities, not participant learning or complete coverage of state transitions.

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

The researcher directed the evaluation, combining automated tests, browser observations and content assessment to examine the application. The application uses one initial LLM call to generate a structured explanation and support. Stage 6A offers “I understand” (High), “I partially understand” (Medium) and “I need more explanation”. Learners selecting either of the latter two can optionally request a simpler explanation, another example, help with Burmese/English terms, conceptual clarification or correction of the intended concept. This optional choice forms Stage 6B. It can be skipped, while concept correction requires a short contextual clarification. Application logic, not the LLM, selects the route.

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

### 3.3 Simulation

Simulation examined generated behaviour using fixed artificial inputs. It did not measure learner outcomes. Sixteen inquiries covered biology, physics, chemistry, computing, engineering and ambiguous terminology. Appendix A gives their exact wording. Each inquiry used three planned paths. The first selected High then Finish. The second selected Medium without a help choice, then High and Finish. The third requested a simpler explanation, conceptual clarification and a cap check. Fresh artificial identities used beginner, bilingual and guided-support preferences. Expected concepts, key facts and unacceptable misconceptions were specified before execution. Exact outputs and stored state were retained. The simulation invoked actual route handlers, services and database-access code, but not browser interaction or the public HTTP/proxy transport.

The simulation comprised 48 planned main attempts and seven language/context supplements, giving 55 attempts with a live provider and isolated database. Results were 44 technical Pass, eight controlled initial ambiguities without sessions, and three technical Fail. One attempt aborted at 52.825 seconds despite a configured 20-second timer. Two concept-correction attempts were rejected because the returned concept and domain were unchanged. The cause of the delayed abort was not established. Downstream steps that were not reached were not counted as delivered support.

Separately, 91 delivered outputs received 18 Pass, 71 Partial and two Fail ratings. These were support outputs, not 91 learners. The researcher assessed all 91 delivered simulation outputs against the predefined content criteria, drawing on postgraduate STEM knowledge, native Burmese and advanced English proficiency. Specialist competence in every domain was not independently established, and there was no second independent assessor. The gravity explanation used `အစုလိုက်အပြုံလိုက်` instead of `ဒြပ်ထု` for mass. The Burmese technical definition of an ion used `net charge မရှိတော့ဘဲ`, meaning that net charge was no longer present, but then stated that a positive or negative charge formed. The sentence was internally contradictory and disagreed with the corresponding English definition, which correctly described a nonzero net charge. Later adaptations did not correct the original stored text. Rejection of invalid responses and preservation of stored state show safeguards, not consistently successful or adequate assistance.

### 3.4 Black-Box and White-Box Testing

Black-box tests examined public HTTP and browser responses against expected outcomes. White-box tests exercised code branches with mocked LLM/database boundaries and separate real-database tests. Assertions checked response payloads, provider-call decisions, accepted writes and preserved state. Cases included malformed inputs, provider failures, ownership, legacy sessions and concurrent updates. The root application's `npm test`, `npm run test:coverage` and `npm run test:integration` commands distinguish deterministic, V8 coverage and isolated-MongoDB checks. These methods expose externally visible defects and gaps in internal code paths. They do not assess the educational quality of generated content.

Public HTTP/browser assessment recorded 24 black-box cases, with 21 Pass, two Partial and one Fail. Two route/rendering cases did not assess semantic novelty. The failed missing-identity case expected HTTP 400 rejection. Instead, the public proxy created an anonymous cookie and returned HTTP 200 with empty History. This difference between expected and actual behaviour remains a Fail. No foreign-session leak was observed. A supplemental zero-round ambiguity assertion also failed because accepted support for remaining ambiguity consumed a round. Original attempts and later corrections to the test driver were retained separately. These findings apply to the tested inputs and boundaries, not every possible response.

White-box evaluation used the root application, with 361 deterministic and twelve isolated MongoDB tests. This gives 373 unique tests, not a larger total from repeating commands. Six structural groups passed, including 39 route/round combinations and checks for persistence, legacy sessions, errors and lifecycle behaviour. V8 coverage across 42 files was 72.54% statements, 76.37% branches, 64% functions and 73.75% lines. Mocked boundaries support claims about exercised logic. Real database tests support persistence claims. Neither verifies live content, and some code remains untested. Browser/database observations were not added to V8 totals. Tests sharing inputs are not independent replications.

### 3.5 Informed Argument and Scenario

Eight design arguments connected scholarly sources, implemented features, observations and counterarguments. Two were Supported and six Partially supported. [Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) support assessing whether features suit terminology, explanation and responsive-assistance tasks. Feature availability alone does not establish learner fit. [Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) distinguish responsive assistance from support adjusted to assessed competence. Stored history allows continuity, but does not itself transfer responsibility to the learner. [Hevner et al. (2004)](https://doi.org/10.2307/25148625) support literature-grounded argument as a complementary evaluation method, not a substitute for behavioural checks. The observed failures limit these design arguments even where their theoretical rationale is reasonable.

A fresh Photosynthesis walkthrough recorded two adaptations, four response events, one stored follow-up and completion at round two (Figure 2). Fifteen technical checks passed. Cap, High-at-cap and post-completion response checks were application programming interface (API) requests, not learner clicks. Browser Resume/Review restored the same state. Content remains provisionally Partial because of bacterial/chloroplast scope wording, extensive retention of nontechnical English and limited novelty in the first example. This walkthrough was separate from the simulation content assessment, so its content judgements remain provisional. One successful workflow does not remove earlier failures or show that a participant learned.

![Photosynthesis walkthrough with browser actions and separately labelled API-only checks](assets/figure_2_photosynthesis_reader.svg)

**Figure 2. Recorded Photosynthesis walkthrough, 3 October 2026.** Solid boxes show the scripted browser workflow and support. Dashed boxes identify separately executed API-only boundary checks. At round two the interface offers no further response choices. Separate API requests add capped and fade events without generation. High does not complete the session. An unrelated gravity follow-up is rejected without an extra save or concept change. History, Resume, explicit Finish and Review preserve the session. This is a technical observation, not a learner study. Content remains provisional.

### 3.6 Academic Literature Evaluation

Design literature evaluation compared implemented capabilities with relevant research and previously reviewed systems. Each comparison considered the reported capability, corresponding application evidence, limits on transfer, contradictory evidence and source access. Thirteen design comparisons included five previously reviewed systems. Ratings were one Strong, nine Moderate, two Limited and one Contradictory/uncertain. These labels describe the strength of the literature rationale, not the quality of generated content. The Sinhala programming assistant provides a relevant precedent for technical-language support ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)). Comparisons based only on secondary summaries carry weaker evidence. No fresh execution of those systems was conducted, and a feature omitted from a source description was not treated as proof that the feature was absent.

The comparisons support combining contextual explanations with language assistance, while also identifying capabilities that this application does not provide. Research on selective term retention offers a rationale for the language strategy, but does not establish its suitability for Burmese-speaking novices ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). The Strong rating concerns the rationale for critically evaluating LLM support, not strong generated content. The adaptation-policy comparison does not validate the exact fade rule or two-round limit. Differences in setting and limited source access prevent claims that this application is better than the compared approaches.

### 3.7 Design Evaluation Summary

Structured usability inspection used Chrome 154.0.8037.97 with desktop 1440 × 900 and mobile-emulated 390 × 844 viewports, English/Burmese interfaces and light/dark themes. Home, preferences, initial content and Stage 6B were inspected in all eight combinations. Other states were distributed across configurations rather than claimed in every combination. A controlled provider with a 1,500 ms delay made pending states inspectable. It involved zero external provider calls and did not measure production latency. Native keyboard interaction, screenshots and read-only interface inspection were used without altering the interface to manufacture outcomes.

Table 4 shows stronger evidence for controlled state behaviour than for content quality or live delivery. Structured usability inspection found six criteria Pass and three Partial. The Partial criteria concern navigation consistency, error clarity and consistency across configurations. Modal focus problems and English-only errors in the Burmese interface have severity 2, meaning that they impede a task but allow a workaround. A generic correction badge when ambiguity remains has severity 1, meaning a cosmetic issue. Severity 3 would mean a blocked task or materially misleading behaviour. Usability Pass requires all planned checks to be completed without severity 2 or 3 issues. Partial reflects severity 2 issues or incomplete coverage. The preference-save infrastructure-fault interface was Not assessed. This inspection did not involve participants, physical phones or a full accessibility audit. Visual readability does not establish scientific accuracy, and completed evaluation does not mean that every criterion passed.

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

**Table 5. Research Questions, Artefact Mechanisms and Evaluation Conclusions**

| Problem / issue | Requirement, question and objective | Artefact mechanisms | Support and remaining gap |
| --- | --- | --- | --- |
| English STEM terminology, limited Burmese resources and misleading literal translation | RQ1 — contextual Burmese support for specialised English terms while retaining useful English terminology. Objective — multilingual STEM terminology support | Terminology/context interpretation, selective bilingual support and bounded intended-concept repair | Partially supported — routes and presentation implemented, Burmese errors and rejected unchanged corrections limit fidelity. No validated term extraction or measured barrier reduction |
| Translation alone insufficient, limited explanation beyond isolated words | RQ2 — clear concepts and examples beyond translation. Objective — conceptual STEM explanation | Core explanation, examples, technical detail, reflection, hints and concept-focused revision | Partially supported — structured assistance delivered, mixed correctness and limited novelty remain. No measured understanding or retention benefit |
| Static/unstructured assistance and insufficient adaptive scaffolding | RQ3 — structured, learner-responsive assistance. Objective — an adaptive scaffolding approach | Self-report, optional help choices, deterministic routing, two-adaptation bound, persisted history and scoped follow-up | Partially supported — tested state and continuity controls, live delivery, identity-boundary discrepancy and interface defects remain. No competence diagnosis, calibrated fading or optimal dose |

*Note.* The complete questions are stated in Section 1. Conceptual criteria (Table 1), design criteria and outcomes (Table 3), and method results (Tables 2 and 4) supply the basis for these conclusions. “Enabling” results validate an interaction or state prerequisite, not the educational requirement itself. Problems are the research motivation, not new prevalence estimates. Requirement coverage does not establish educational effectiveness.

### 4.3 What the Evaluation Does and Does Not Show

The contribution is an evaluated integration of support responsibilities and tested application controls. Content quality and intended-meaning correction remain only partially supported. [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish controlled evaluation from evaluation in real use. Artificial inquiries, controlled providers and researcher inspection cannot establish usefulness during learners' everyday study. Reusing outputs and test inputs, revising arguments or summarising findings does not create independent evidence. The deliberately selected cases, variable model outputs and limited configurations also restrict generalisation.

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

**Table 6. Main Simulation Input Corpus**

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
