## 1. Evaluation Context

This project addresses three related requirements: contextual support for specialised English STEM terminology, conceptual explanation beyond translation, and structured learner-responsive assistance for Burmese-speaking learners. RQ1 concerns terminology support; RQ2 concerns explanation; RQ3 concerns adaptive scaffolding. These are the supplied research motivations, not newly measured estimates of language barriers or learner difficulties. Local REQ-01–03 labels connect them to evaluation criteria and recorded findings.

Two artefacts were selected: Assignment 3's Context-Aware Adaptive STEM Scaffolding Framework and Assignment 4's bilingual LLM proof of concept. Original conceptual inputs, the final interpretation in E056 §26, and executable B01 remain distinct. B01 production is commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`; ROOTTESTS-02 separately identifies the extended tests/configuration in the root project.

The evaluation asks whether the responsibilities are defensible and whether the implementation instantiates them within its bounds. Conceptual methods combine GenAI critique, literature evaluation, informed argument and a historical scenario. Design methods combine criteria-based inspection, static/dynamic and bounds analysis, simulation, external/internal testing, literature comparison and a fresh scenario. Following [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36), these predominantly artificial evaluations support bounded claims rather than utility in authentic learner practice. The evidence archive preserves exact recorded runs and qualifications; no participant learning experiment or independent expert interview was conducted.

## 2. Conceptual Artefact Evaluation

Conceptual evaluation examines the framework's responsibilities and rationale, rather than treating diagram completeness as educational validation. Four complementary methods informed refinement; their sources and identities constrain the strength of convergence.

### 2.1 Artefact Selection and Evaluation Criteria

The framework was selected because it coordinates terminology, context, language strategy, core explanation, scaffolding, learner response and adaptation across all three requirements. Figure 1 preserves the original diagram; the final interpretation adds bounded reconsideration without inventing an eighth stage. Table 1 operationalises C1–C5 as requirement coverage, coherence, theoretical consistency, literature consistency and scenario applicability. Coverage means that a responsibility is present, not that exactly seven stages are uniquely necessary. The original interview's C4 assessed boundary completeness, whereas protocol C4 assesses literature consistency; E057's crosswalk prevents conflation. The evaluated conceptual refinement and the original interview input are consequently not interchangeable artefacts (E049–E059; R001–R005). These distinctions govern subsequent synthesis.

<<FIGURE1>>

<<TABLE1>>

### 2.2 GenAI Interview

GENAI-01 used a fresh Temporary Chat on 28 September 2026, with nine fixed questions and no browsing. The interface reported GPT-5.6 Sol with High reasoning; that interface label is recorded provenance, not independent provider-version verification. The original framework, requirements, theoretical framing and Photosynthesis scenario were supplied as text. Responses and coded analysis were retained separately (E049–E050).

The critique recognised PIRQOA coverage and progression beyond translation, but identified self-report, unreliable interpretation, explanation quality and underspecified decisions as risks. Its distinction between core explanation and assistance prompted boundary clarification. Suggestions were not accepted automatically: literature, informed argument and scenario findings supplied supporting or limiting reasons. Table 2 retains the native judgements rather than converting them into implementation passes. Reported confidence is not measured certainty or transferable authority. The model neither evaluated the eventual B01 routes nor independently validated the refined framework. Its contribution is structured challenge to assumptions, not expert testimony, learner observation or empirical evidence of effectiveness (R013–R017).

### 2.3 Academic Literature Evaluation

The conceptual comparison reused Assignment 2's 17-study corpus, four themes and twelve sub-themes, rather than conducting a new systematic search ([Htet, 2026](../../docs/INFOSYS_720_Assignment_2.pdf)). Nineteen recorded findings linked prior research to the seven responsibilities and the GenAI concerns (E051–E052; R018–R036). The source set supports an integration opportunity within that review boundary; it cannot establish a universal gap. A single database, English records and an open-access filter constrain coverage, while the supplied PDF does not reconstruct every screening decision.

Native-language technical assistance offers a relevant precedent in Sinhala programming education ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)), but neither its language nor its outcomes transfer directly to Burmese STEM learners. Scientific-paper translation motivates selective English-term retention ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)); researchers' preferences do not validate novice comprehension. Guided multilingual interaction in [Kuzu (2026)](https://doi.org/10.1007/s10758-026-09974-7) raises a counterargument: independently selected menu assistance is not equivalent to teacher-mediated facilitation.

These relationships support explicit context, language and assistance responsibilities, not the precise topology, route table or two-round policy. Assignment-mediated comparisons retain secondary attribution rather than implying unread originals were inspected. The historic 2026 Tran summary is not silently substituted with the separately consulted 2023 preprint. Support levels therefore express warranted relationships and transfer limits, not application accuracy or learning-effect estimates (E047, E059). The reviewed studies therefore function as bounded comparisons: their affordances suggest relevant responsibilities, while their settings and assessment modes limit what the framework can legitimately inherit directly.

### 2.4 Informed Argument

Informed argument connects research warrants to mechanisms, removal tests and counterarguments, as descriptive IS evaluation requires ([Hevner et al., 2004](https://doi.org/10.2307/25148625), p. 86, Table 2). The current argument evaluates the final interpretation; its additional sources are not attributed retrospectively to the original interview or frozen SLR (E058–E060).

[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) motivate examining technology in relation to supported tasks. Applying that organisational warrant here is a design inference, not a validated educational fit scale. Removing target/context identification risks explaining the wrong sense; [Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1) motivate explicit domain terminology, not proof of deterministic ATE. Removing language selection leaves retention incidental; its novice suitability still needs assessment. Removing core meaning could leave examples without an explicit concept. [Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4) supplies supplementary instructional rationale, not measured load reduction; [Ji et al. (2024)](https://arxiv.org/abs/2202.03629v7) support treating generated-content reliability separately from fluency.

[Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) distinguish contingency, fading and responsibility transfer. Their benchmark warrants purposeful assistance and responsive adjustment, but self-report cannot establish competence-sensitive contingency. Without purposeful scaffold selection, examples or hints may be present without responding to the learner's expressed support need. Self-evaluation can be inaccurate ([Dunlosky & Rawson, 2012](https://doi.org/10.1016/j.learninstruc.2011.08.003)); that does not invalidate every response. Removing response collection or adaptation breaks the feedback mechanism, yet withholding generation after High does not demonstrate mastery. Target identification and core meaning are Conceptually justified; the other five responsibilities are Justified with qualification. Alternative combined stages or teacher-mediated designs remain plausible (R006–R012).

### 2.5 Scenario Evaluation

The historical Photosynthesis record illustrates core explanation, structured support and a check–example–check sequence (E054; R005). It makes the framework understandable as an interaction, but does not document the exact response triggering adaptation, second adaptation, fade/cap, follow-up answer or complete lifecycle. Original execution date, model and commit are unrecorded. The observed example cannot establish why one strategy was selected or whether perceived understanding changed. Consequently, scenario applicability remains partial despite the historical positive judgement. The fresh design walkthrough is separate evidence and cannot retrospectively fill these gaps. This method establishes plausible responsibility enactment, not a participant's concept acquisition or the completeness of every transition. Those gaps remain unresolved.

### 2.6 Triangulation, Refinement, and Conceptual Evaluation Summary

Across methods, coordination beyond translation is defensible, while diagnosis and decision precision remain limiting. Refinement clarified Stage 4 meaning versus Stage 5 assistance, Stage 6 self-reported need, and bounded Stage 7 reconsideration of language, meaning or intended context (E055–E056; R037–R079). These are analytical responsibilities, not seven mandatory provider calls. Exact implementation choices remain project policies.

Table 2 separates native method judgements from the current synthesis: C1 is Fully supported for responsibility coverage; C2–C5 are Partially supported. Shared literature and scenarios are not independent replications, and the updated argument does not constitute another learner study. Optional expert evaluation was intentionally skipped. The contribution is accountable conceptual integration, with theoretical and empirical limits still explicit. Refinement is not replication.

<<TABLE2>>

## 3. Design Artefact Evaluation

Design evaluation examines B01 behaviour through controlled, database-backed, live-provider and inspection evidence. Successful mechanics and delivered-content adequacy are assessed separately.

### 3.1 FURPS Functionality and Usability Criteria

FURPS was operationalised as thirteen Functionality and nine Usability criteria, not five independently scored dimensions (Table 3). Protocol 2.1 fixes recorded response, lifecycle and persistence oracles. Mechanical checks enable the substantive terminology/explanation/adaptation tasks without proving educational benefit. Composite Functionality outcomes all remain Partial; Usability has six Pass and three Partial. These judgements include coverage limits and counterevidence, rather than promoting criteria from isolated passing branches (R080–R101).

<<TABLE3>>

### 3.2 Analytical Evaluation

Static structure, observed runtime and boundary instrumentation answer different questions and should not be conflated.

#### 3.2.1 Static Analysis

The formal static run examined layer separation, validation, ownership, persistence and controlled error contracts, alongside lint, TypeScript and production-build checks (E001–E003; R102–R115). Its first integration attempt was environment-blocked; the unchanged permitted retry passed under recorded conditions. Earlier services/DAO coverage remains scoped accordingly. Compilation and architecture inspection establish structural consistency, not successful live generation or scientific accuracy (R215).

#### 3.2.2 Dynamic Analysis

Dynamic records trace creation, responses, corrected context, follow-up, persistence and recovery; a manual twelve-screen pass adds technical browser observation (E004–E013). DYN-05/06 retain indirect provider-count Partial Pass. DYN-10's incorrect response-property assertion and adjudication remain visible. Fifteen successful initial requests across five fixed inquiries had median 3.331 seconds, range 2.593–4.640. These local sequential timings are descriptive, not adaptation-latency, load or production-SLA evidence. Screenshots corroborate presentation, not observed learning (R116–R128, R225).

#### 3.2.3 Optimisation / Bounds Analysis

Seventeen deterministic-provider/real-MongoDB cases passed for stored rounds, fade/cap events, completion, invalid state and contention (E014–E017; R129–R145). High persists fade without generation or increment; a support-needed response at round two persists an event without round three. Atomic updates preserve accepted event/adaptation consistency. However, BND-15 made two provider calls while accepting one write. The stored bound is therefore not a global cost ceiling. “Optimisation” here denotes bounded behavioural analysis, not maximising learning, an experimentally optimal dose or unrestricted performance optimisation. Explicit Finish remains separate from self-reported High.

### 3.3 Simulation

The fixed multi-domain corpus comprised 48 planned main attempts and seven language/context supplements, giving 55 full-run attempts with a live provider and isolated database (E018–E021). Results were 44 technical Pass, eight controlled initial ambiguities without sessions, and three technical Fail. SIM05-C aborted at 52.825 seconds despite a configured 20-second timer; SIM-CM-13/16 rejected purported corrections leaving concept/domain unchanged. Unreached downstream steps are not successful delivery.

Separately, 91 delivered outputs received 18 Pass, 71 Partial and two Fail ratings (E022–E023). The researcher endorsed AI-assisted worksheets after review; this is not independent expert assessment or 91 learners. Gravity's mass/weight wording used `အစုလိုက်အပြုံလိုက်` instead of `ဒြပ်ထု`; an ion definition's `မရှိတော့ဘဲ` reversed the nonzero-charge meaning. Later adaptations do not repair the initial text. Safe rejection and non-mutation demonstrate control, not reliable intended-route delivery or uniformly adequate support (R198–R205).

### 3.4 Black-Box and White-Box Testing

Public HTTP/browser assessment recorded 24 black-box cases: 21 Pass, two Partial and one Fail (E024–E027). BB07/08 exercise route/rendering contracts but do not assess semantic novelty. BB22 expected missing-identity rejection, whereas the public proxy provisions an anonymous cookie and returns empty History; the frozen-oracle Fail remains, without an observed foreign-session leak. A supplemental zero-round ambiguity assertion also failed: accepted generated remaining-ambiguity support consumes a round. Counting therefore matters. Driver adjudications and first attempts remain separate, not erased by rechecks. External evidence consequently supports tested public behaviour within its fixture and boundary conditions, rather than universal output adequacy (R153–R176, R216–R217).

White-box evaluation used the root project, with 361 deterministic and twelve isolated MongoDB tests: 373 unique tests, not additional tests for repeated commands (E033–E035). WB01–WB06 passed structurally, including 39 route/round combinations and DAO, legacy, error and lifecycle assertions. V8 covered 42 files: 72.54% statements, 76.37% branches, 64% functions and 73.75% lines. Mocked boundaries establish exercised logic; real database tests support persistence. Neither certifies live content, and unexercised code remains. This complements public observations without turning shared fixtures into independent replications or combining browser/database observations into V8 totals (R146–R152).

### 3.5 Informed Argument and Scenario

Eight design arguments connect cited warrants, implemented features, observations and counterarguments: two Supported and six Partially supported (E039–E041). [Goodhue and Thompson (1995)](https://doi.org/10.2307/249689) motivate relevance to terminology, explanation and responsive assistance tasks; feature availability alone cannot demonstrate learner fit. [Van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6) provide the distinction between responsive support and diagnosed contingency. Persisted history enables accountable continuity, but does not itself transfer responsibility. [Hevner et al. (2004)](https://doi.org/10.2307/25148625) warrant knowledge-base-grounded argument as complementary evaluation, not developer assertion or replacement for behavioural checks. Failures constrain the proposed mechanisms rather than being excused by their theoretical rationale (R177–R184).

The fresh Photosynthesis walkthrough records two adaptations, four response events, one stored follow-up and completed round two (E042–E044; Figure 2). Fifteen technical checks passed. Cap, High-at-cap and post-completion response checks were API-only, not learner clicks. Browser Resume/Review reconstructed the same state. Content remains provisionally Partial: bacterial/chloroplast scope wording, extensive nontechnical English retention and limited first-example novelty remain concerns. The simulation endorsement does not cover this output. One coherent workflow cannot cancel earlier failures or measure participant learning (R206–R211).

<<FIGURE2>>

### 3.6 Academic Literature Evaluation

Thirteen design comparisons included all five Assignment 2 SSR systems: one Strong, nine Moderate, two Limited and one Contradictory/uncertain (E045–E048). The Sinhala assistant offers a technical-language precedent ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)); Assignment 2's dictionary, video, lyric and bilingual Telugu learning platform comparisons illustrate additional structured affordances ([Htet, 2026](../../docs/INFOSYS_720_Assignment_2.pdf)). These are reported comparisons, not fresh system executions or proof of absent features. The comparison also retains reported Telugu personalisation, but does not equate language acquisition with STEM concept learning. The PoC integrates contextual support but lacks comparator modalities. Selective retention has a research warrant, yet novice terminology quality remains partial ([Kleidermacher & Zou, 2026](https://doi.org/10.18653/v1/2026.findings-eacl.204)). DL12's Strong concerns critical evaluation, not strong content; DL13 does not validate the exact fade/dose policy. Corpus and access limits preclude superiority claims (R185–R197).

### 3.7 Design Evaluation Summary

Table 4 shows stronger bounded mechanics than content or live delivery. Structured usability inspection found six criteria Pass and U5/U8/U9 Partial (E036–E038). Modal focus and English-only errors in Burmese UI have severity 2; a generic correction badge on remaining ambiguity has severity 1. The preference-save infrastructure-fault UI was Not assessed. Distributed viewport/locale/theme and keyboard inspection is neither participant usability nor physical-phone/full-WCAG evaluation. Visual Burmese readability does not validate scientific wording. Overall, routes and reconstruction are implemented under tested conditions, while meaningful novelty, dependable correction and scientific explanation quality remain partial. Completion of evaluation methods therefore does not imply an all-pass artefact or educational effectiveness.

<<TABLE4>>

## 4. Results and Interpretation

Interpretation combines evidence while preserving native scales. Narrow mechanical support, partial delivery/content, conceptual rationale and unsupported effects remain distinct.

### 4.1 Consolidated Results

E061/E062 retain 225 results, rather than 225 independent tests or participants. External observations, instrumented bounds and internal assertions converge on application-controlled routing, event/adaptation persistence and lifecycle reconstruction. High/fade and cap behaviour have instrumentation beyond earlier indirect observations. Corrected-context follow-up remains concept-scoped and leaves adaptation state unchanged. These are exercised implementation properties, not universal guarantees (E015, E024–E026, E033–E035; E067 INT-01–06).

The evidence matters. A structurally accepted output can contain a scientific or Burmese error; plausibility can coexist with weak novelty. The two endorsed content Fail remain despite later better support. Eight no-session ambiguities and three live delivery Fail constrain dependable interpretation and adaptation. The fresh scenario corroborates integration but retains provisional content judgements and API-only boundaries. Safe errors support non-corruption without establishing successful assistance (E019–E023, E042; R198–R211).

Accordingly, all thirteen Functionality criteria remain Partial, while Usability retains six Pass/three Partial. Stronger mechanical subclaims do not promote these composite judgements. Literature support likewise warrants a mechanism, not an observed benefit. Bounds, coverage, screenshots and output ratings have different units; averaging them would hide the distinction being evaluated. Historical attempts, oracle discrepancies and derived analyses stay traceable to records rather than becoming extra confirmations. This convergence supports bounded implementation credibility with unresolved semantic, delivery and interaction limitations, not a general reliability rate (E062, E067).

### 4.2 PIRQOA / RQ Traceability

The recorded 24-chain PIRQOA matrix links problems, requirements, RQs, objectives, responsibilities, criteria and existing R/E records (E064–E066; Table 5). Each RQ remains Partially supported overall; populated traceability is not complete requirement satisfaction.

For RQ1, contextual terminology and selective bilingual treatment provide a defensible approach. Corrected interpretations and language routes instantiate it, while unchanged-correction rejection and Burmese terminology errors limit dependable intended-meaning support. Neither validated ATE nor measured reduction in language barriers follows (REQ-01; R008, R081–R082, R200–R205).

For RQ2, core explanations, examples, reflection and hints demonstrate assistance beyond word substitution. Mixed definitions and first-example repetition qualify usefulness; this evaluation did not measure conceptual understanding or retention. Structured output is an enabling representation, not evidence that the learner acquired its meaning (REQ-02; R083, R159–R160, R203–R210).

For RQ3, optional self-reported need drives deterministic routes, bounded generation and durable interaction history. Concurrency and lifecycle evidence support those mechanics, but not calibrated contingency, educational fading, transfer or optimal dose. Self-report, cap and explicit Finish are different constructs; a completed session is not mastery (REQ-03; R143–R151, R180–R181, R222).

<<TABLE5>>

### 4.3 What the Evaluation Does and Does Not Show

The contribution is an evaluated coordination of responsibilities and tested controls, with content and intended-meaning repair still partial. [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36) distinguish artificial from naturalistic evaluation; synthetic inquiries, controlled providers and evaluator inspection cannot substitute for authentic learner practice. Reused outputs, shared fixtures, argument versions and derived matrices do not create independent replications. Purposive cases, stochastic generation and limited configurations constrain generalisation.

No participant learning/satisfaction study, independent expert review, calibrated fit/dose assessment or full accessibility audit was conducted. The preference-save fault UI and fixture semantic novelty remain unassessed. Source warrants retain abstract/excerpt or assignment-mediated limits; citing them does not validate Burmese equivalents. The two-round state bound does not cap concurrent provider work, and the configured abort is not a hard twenty-second wall-clock guarantee. These limits preclude superiority, uniform correctness and educational-effectiveness claims (R217–R225; E067).

Evidence hashes establish identity, not truth or sharing consent. Restricted cookie-bearing originals require controlled retention and separately reviewed, labelled redacted derivatives before distribution; no release clearance follows from this paper's evidence traceability (E057). Such release review remains separate from substantive evaluation.

## 5. Conclusion

The framework and PoC offer an evaluated integration of contextual terminology support, explanation beyond translation and bounded response-driven assistance. Literature-grounded reasoning supports the responsibilities, while external observations and internal/state tests corroborate routing, persistence and continuity controls. These results establish a defensible implementation demonstration, not uniformly adequate tutoring.

RQ1–RQ3 remain partially supported: terminology fidelity, scientific adequacy and dependable meaning repair limit the broader requirements. Self-reported need guides assistance without diagnosing competence; High-to-fade, two stored adaptations and explicit completion are policies, not mastery or an optimal instructional dose. Mixed content and interface findings remain part of the contribution rather than exceptions hidden by coverage.

Future work should address the Burmese/STEM errors, delivery failures and interaction defects under a newly identified baseline with affected reruns. Appropriate learner and independent content assessment would then be needed to examine benefit in practice. This evaluation establishes neither improved learning nor calibrated educational scaffolding.
