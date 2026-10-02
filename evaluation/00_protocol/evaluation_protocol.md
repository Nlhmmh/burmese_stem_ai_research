# INFOSYS 720 Assignment 5 — Evaluation Protocol

| Document control | Value |
| --- | --- |
| Protocol ID | A5-PROTOCOL-01 |
| Version | 2.1 |
| Prepared | 30 September 2026 |
| Status | B01 frozen; Steps 10–12 recorded; Step 13 execution and Nathan's content review completed with mixed findings (2 October 2026); Step 14 black-box testing next; remaining evaluations not yet complete |
| Evaluator | To be recorded before execution |
| Primary conceptual artefact | Context-Aware Adaptive STEM Scaffolding Framework (Assignment 3, Artefact 3) |
| Primary design artefact | Burmese STEM AI proof-of-concept system (Assignment 4, Artefact 3) |
| Baseline | `B01-A5-EVALUATION`; `B00-PRE-REFINEMENT` is historical only |

### Version history

| Version | Date | Role |
| --- | --- | --- |
| 1.0 | 28 September 2026 | Pre-refinement protocol. Its High → `key_takeaway` oracle and three-value-only route model are superseded and retained in the discrepancy register for provenance. |
| 2.0 | 30 September 2026 | Current refined oracle aligned with implemented Stage 6A/6B routing, fade semantics, response-event persistence, and automated test entry points. This version change does not constitute evaluation execution or a pass result. |
| 2.1 | 30 September 2026 | Consolidates the Step 9 FURPS execution details into this governing protocol after B01 was frozen. Criteria and acceptance semantics are unchanged from 2.0; no formal case was executed. Runs using this revision must cite protocol 2.1 and the exact protocol commit because the B01 freeze record preserves the earlier 2.0 file hash. |

## 1. Purpose and evidence boundary

Evaluate whether the conceptual framework and implemented proof of concept provide a coherent, literature-grounded and demonstrable response to terminology support, conceptual explanation, and adaptive scaffolding requirements for Burmese-speaking STEM learners.

This protocol defined criteria, procedures, planned coverage, decision rules and recording templates **before evaluation execution**. Its execution registers are subsequently updated only from retained evidence; the original acceptance rules are unchanged. Source/code inspection used to prepare the protocol is not a substitute for executing its tests. All proposed counts and thresholds below are protocol choices, not claims that the assignment mandates them.

The evaluation distinguishes:

- **Conceptual validity:** coherence, theoretical consistency, literature support and requirement coverage.
- **Functionality:** externally observable behaviour and internal implementation correctness.
- **Usability:** structured evaluator inspection of the interface and interaction flow.
- **Technical feasibility:** buildability, runtime behaviour, bounded state changes and persistence.
- **Educational effectiveness:** outside the present evaluation. Neither artificial interactions nor a self-reported support signal establishes learning gains, retention or objective competence.

No learner study, comparative experiment or production-readiness claim is planned. Optional expert feedback is supplementary and must not be reported unless collected.

The supplied Assignment 5 plan formally emphasises the **Functionality** and
**Usability** dimensions of FURPS. F1–F13 and U1–U9 therefore receive
criterion-level judgements. Reliability, Performance and Supportability are
not independently scored. Relevant failure-control, timing, reproducibility
and maintainability observations may be retained as enabling technical
evidence, but they must not be presented as complete evaluations of those
three dimensions.

## 2. Source basis and precedence

Paths below are relative to this document. These are supplied project sources, not independently verified primary research publications.

| Source | Use in this protocol |
| --- | --- |
| [Implementation-aligned Assignment 5 plan](../../docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md) | Evaluation methods, C1–C5, F1–F13, U1–U9, current response routes, evidence discipline and reporting scope |
| [Original Assignment 5 plan](../../docs/INFOSYS_720_Assignment_5_Complete_Plan.md) | Historical planning source only; it does not override this protocol's current implementation oracle |
| [Assignment 1](../../docs/INFOSYS_720_Assignment_1.pdf), research background and problems | Historical motivation; its earlier glossary-focused scope does not add current requirements |
| [Assignment 2](../../docs/INFOSYS_720_Assignment_2.pdf), SLR, SSR and Table 4 | Literature corpus, research gap and PIRQOA requirements/RQs |
| [Assignment 3](../../docs/INFOSYS_720_Assignment_3.pdf), §§1, 2.1–2.4 and Figure 3 | Current TTF + Scaffolding Theory foundation and conceptual framework |
| [Assignment 4](../../docs/INFOSYS_720_Assignment_4.pdf), system artefacts and implementation limitations | System design, PoC scope, traceability and acknowledged testing/UX gaps |
| [Research README](../../README.md) | Research-to-system mapping and intended behaviour |
| [Technical README](../../burmese_stem_ai/README.md) and frozen source code | Implementation contracts, configuration and test entry points |

The standalone Assignment 5 specification and marking rubric are not present among the reviewed files. Method coverage follows the supplied plan's account of them; check the original brief before submission, especially whether bounded behavioural analysis satisfies its optimisation requirement.

Use Assignment 3/4's **Task–Technology Fit (TTF) and Scaffolding Theory** as the current foundation. Assignment 2's earlier CTML framing is historical, not an additional current kernel theory. Supporting conceptual artefacts 1 and 2 provide definitions and relationships; they do not require separate full evaluations.

If sources disagree, preserve both statements in a discrepancy record. Submitted artefacts define the evaluated design; frozen code defines observed implementation, not automatic correctness. Do not weaken a design requirement just because code does something else. Mark implementation conformity and research/design adequacy separately where needed.

### 2.1 Implementation details that affect test oracles

Preparation-time inspection of `services/adaptation.service.ts`, `services/session-lifecycle.service.ts`, `lib/constants.ts` and `package.json` identifies these contracts to recheck against the frozen baseline:

| Detail | Expected implementation behaviour to test |
| --- | --- |
| Stage 6A overall support need | `high`, `medium`, `needs_support`; initially `null`. These are self-reports, not measured understanding. `understanding` remains the legacy storage/API field name. |
| Stage 6B difficulty type | Optional for Medium/Needs Support: `simpler_explanation`, `another_example`, `language_terms`, `concept_unclear`, or `concept_mismatch`; skip is valid. High cannot include a difficulty type. |
| Persisted statuses | `in_progress`, `review_recommended`, `completed`; `adapted` is not a persisted status |
| High/fade route | Persist a `fade` response event, make no provider call, create no adaptation, and do not increment the round. Status remains `in_progress`; completion is a separate action. |
| Default scaffold route | Medium with no Stage 6B choice → `another_example`; Needs Support with no choice → `simpler_explanation` |
| Explicit scaffold routes | `simpler_explanation` and `another_example` select the corresponding Stage 5 scaffold |
| Language route | `language_terms` → `language_support` with `clarification` support and a per-adaptation bilingual presentation override |
| Conceptual route | `concept_unclear` → `concept_clarification` with revised Stage 4 meaning and Stage 5 support |
| Reinterpretation route | `concept_mismatch` requires a short clarification and selects bounded `context_reinterpretation`; the outcome is `corrected`, `ambiguous`, or `limit_reached` |
| Round counting | `adaptationRound` counts generated, persisted adaptations only; maximum two. Response events, fade, and capped responses do not consume a round. |
| Response at round two | Persist the response event without a provider call or third adaptation. High remains `in_progress`; Medium/Needs Support is `review_recommended`. |
| Completion | Explicit completion accepts `in_progress` or `review_recommended`; repeat completion is idempotent; completed sessions reject new learner responses |
| Follow-ups | Maximum two persisted follow-ups; question maximum 500 characters |
| Inquiry | Maximum 1,000 characters |
| Existing scripts | `test`, `test:coverage`, `lint`, and `build` are declared; TypeScript is checked with `npx tsc --noEmit` |

These are test-oracle inputs from static inspection, **not formal evaluation passes**. The pre-refinement oracle is preserved in `pre_refinement_discrepancies.md`; it must not be used for `B01` cases. The LLM chooses content within a selected route but does not choose route permission, lifecycle, identity, or round count.

The Step 13 source/UI/test audit is recorded in
[`refined_contract_cross_reference.md`](refined_contract_cross_reference.md).

## 3. PIRQOA and artefact traceability

Assign local requirement IDs REQ-01–REQ-03 for evidence tracking; these are protocol identifiers, not original assignment labels.

| Requirement / RQ | Problem and issue | Requirement and objective | Framework stages | Main criteria |
| --- | --- | --- | --- | --- |
| REQ-01 / RQ1 | English technical terminology, limited Burmese resources and misleading literal translation; insufficient terminology/language support | Identify specialised terms and provide context-sensitive Burmese support, preserving useful English terms; develop multilingual STEM terminology support | Identify STEM Terminology; Interpret Technical Context; Select Language Support | C1–C5; F1–F3, F12–F13; U1, U6, U8 |
| REQ-02 / RQ2 | Translation alone is insufficient; limited conceptual support | Provide clear explanations and examples beyond translation; develop conceptual STEM explanation | Explain STEM Concept; Provide Scaffolding | C1–C5; F4; U2, U6 |
| REQ-03 / RQ3 | Static/unstructured assistance; insufficient adaptive scaffolding | Provide structured, learner-responsive assistance; develop an adaptive scaffolding approach | Provide Scaffolding; Collect Learner Response; Adapt Support, feeding back to scaffolding | C1–C5; F5–F13; U3–U5, U7–U9 |

Research questions retained from the plan and Assignment 2:

1. **RQ1:** How can specialized English STEM terminology be supported for Burmese-speaking learners?
2. **RQ2:** How can LLM-based support help learners understand STEM concepts beyond translation?
3. **RQ3:** How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?

F9–F12 support interaction continuity and task fit; persistence alone does not demonstrate adaptive pedagogy. F13 and general interface checks may support multiple RQs indirectly; label such evidence “enabling technical evidence”.

## 4. Baseline, environment and execution controls

The executable baseline is `B01-A5-EVALUATION`, represented by annotated tag
`a5-evaluation-b01`. The evaluated application source is commit
`37faefa236829aa3d79e023faa1fb72a086b5c2a`; the tag also contains the later
baseline documentation commit. Verify the exact source tree, dependency,
prompt/schema and environment identities in
[`b01_artefact_versions.md`](b01_artefact_versions.md) and
[`b01_environment.md`](b01_environment.md) before collecting results. B00 is a
historical pre-refinement snapshot and must not be used for formal cases.

Complete and record these controls before the first formal case:

1. Verify the B01 tag, executable source tree and working-tree state. Record
   relevant uncommitted changes and hashes/copies of all untracked evaluation
   inputs; a commit hash alone does not identify a dirty worktree.
2. Record evaluator, role, date/time with the `Pacific/Auckland` timezone,
   protocol version, conceptual source hashes and exact diagram/section
   locators. Preserve the Assignment 3 framework, definitions and PIRQOA
   together.
3. Assign a unique run ID, such as `RUN-B01-20260930-01`.
4. Record application version, Node/npm versions, lockfile hash, OS,
   browser/version, viewport, database version and local/deployed environment.
   Record configuration names/values only when non-secret.
5. Record model identifier, provider, available generation settings,
   prompt/schema hashes and timeout/retry configuration. Mark every case as
   deterministic mock, real database or live provider.
6. Use dedicated artificial learner identities and a dedicated evaluation
   database. Establish a cleanup procedure that targets only evaluation
   records. Retain identity continuity for persistence tests and separate
   identities for ownership tests.
7. Freeze exact inputs, preference settings, expected outcomes, scoring
   anchors, unacceptable misconceptions, reference basis, assessor
   qualifications and execution order. Use a Burmese-fluent assessor for
   language judgement; otherwise mark linguistic adequacy Not assessed.
8. For UI inspection, use Chrome at 1440 × 900 and 390 × 844 unless a
   deviation is recorded. Cover English and Burmese UI, bilingual support, and
   light and dark themes.
9. Allocate evidence IDs only when an artefact has actually been captured.

B01 is a local-only baseline because the documented EC2 deployment could not
be verified without a trusted SSH host key. Deployment behaviour is outside
this run unless a separately controlled and recorded baseline is created.

Capture failures and first attempts, not only successful retries. Retry only
after recording the original failure and its reason; give every attempt its
own identifier. Do not silently replace evidence. If code, prompts, criteria
or fixed inputs change, log the change and create a new baseline/protocol
version as appropriate; retain pre-change results and rerun affected cases.

## 5. Criteria and decision rules

### 5.1 Common execution and result scales

Track **execution status separately from outcome**:

| Execution status | Meaning |
| --- | --- |
| Not run | Planned, no execution evidence |
| Executed | Procedure completed and evidence recorded |
| Blocked | Could not execute; record dependency and reason |
| Not applicable | Scope exclusion with written justification; never count as a pass |

| Outcome | Rule |
| --- | --- |
| Pass | All predefined assertions for that case hold and evidence is available |
| Partial | Some assertions hold but others are incomplete; enumerate each. Do not use for a known failed mandatory assertion |
| Fail | At least one mandatory assertion is contradicted |
| Not assessed | Evidence or qualified judgement is insufficient; never infer success |

Binary code/API assertions use Pass/Fail. Composite criteria can be Partial when coverage is incomplete, but retain each failed subcase. No single average across conceptual, functional and usability results is planned.

### 5.2 Conceptual criteria

| ID | Criterion | Required checks | Primary methods |
| --- | --- | --- | --- |
| C1 | PIRQOA coverage | Each REQ/RQ maps to explicit framework stages; all seven stages have a justified role; no requirement is silently omitted | CA-GAI, CA-LIT, CA-ARG, CA-SCN |
| C2 | Logical coherence | Inspect stage inputs/outputs, sequence and dependencies; response precedes adaptation; adaptation updates support; identify ambiguity, missing decisions and unjustified loops | CA-GAI, CA-ARG, CA-SCN |
| C3 | Theoretical consistency | Map capabilities to language-support, conceptual-support and adaptive-interaction fit; assess structured assistance, contingency and fading; distinguish self-report from competence | CA-LIT, CA-ARG, CA-GAI |
| C4 | Literature consistency | Map all seven stages to Assignment 2 evidence; distinguish direct support, transferable support, context mismatch, counterevidence and unsupported assumptions | CA-LIT, triangulated with CA-GAI |
| C5 | Scenario applicability | Walk Photosynthesis through every stage and feedback loop; identify required information, decisions, outputs and unresolved transitions | CA-SCN, CA-ARG |

Use the plan's conceptual scale: **Fully supported** (all required checks supported within stated scope), **Partially supported** (some support with material gaps), **Not supported** (evidence contradicts or fails to substantiate the criterion), or **Concern identified** (a material unresolved contradiction prevents a settled judgement). Missing evaluation evidence is **Not assessed**, not Not supported. Record a separate concern description even when a support judgement is possible. “Fully supported” is bounded conceptual support, not proof of effectiveness.

### 5.3 FURPS Functionality

Each row requires both specified behaviour and preserved evidence; use exact generated content rather than screenshots alone for content judgement.

| ID | Criterion | Acceptance observations | Planned cases / methods |
| --- | --- | --- | --- |
| F1 | Inquiry handling | Valid inquiry creates a correctly initialised, retrievable session; empty, whitespace, over-length or otherwise invalid inquiry is controlled and creates no corrupt session | BB01–BB02, BB20; public UI/API; retrieval |
| F2 | Terminology/context | Primary term and domain match explicit context; materially ambiguous terms receive clarification or an explicit qualified interpretation, not an unmarked confident guess | BB03; SIM13–SIM16; exact-output review |
| F3 | Bilingual support | Output follows support-language preference and preserves useful English terminology; no observed material technical mistranslation | BB04; SIM; language review |
| F4 | Structured support | Simple explanation, example/analogy, technical explanation and reflective prompt are present and meaningful; hint is available as specified and may be optionally revealed | BB05; SIM; SCN |
| F5 | Learner response | All three allowed responses persist correctly; unknown values and invalid Stage 6A/6B combinations are rejected without mutation | BB06–BB08, BB23; WB01; persistence inspection |
| F6 | Adaptive support | Deterministic route is correct for the response and optional Stage 6B choice; generated support changes meaningfully. High selects `fade` without implying proven competence | BB06–BB10; WB01; SIM; provider-call count and content review |
| F7 | Adaptation bound | Round stays within 0–2; extra response creates no third adaptation; expected response event, status and stored count agree | BB09–BB11, BB24; BND; WB01/WB05; real-database concurrency |
| F8 | Scoped follow-up | Relevant query retains current active concept and support context; unrelated query is restricted/redirected without becoming unrestricted chat; the 500-character and two-question caps hold | BB12–BB13, BB21; WB03; persisted follow-up inspection |
| F9 | Persistence | Creation, response events, adaptations, interpretation trace and follow-ups survive retrieval/reload with matching fields and no unintended duplicate writes | BB09–BB16; WB05; DYN; real-database/concurrency evidence |
| F10 | Learning History | Correct learner's sessions appear newest-first with accurate state; unrelated learner records are absent | BB14, BB22; UI/API ownership inspection |
| F11 | Review/Resume | Stored content and interaction history reconstruct correctly; unfinished sessions resume within existing limits; completed sessions preserve completion and reject further responses | BB15–BB16, BB24; WB02; SCN |
| F12 | Preferences | Valid settings persist and affect their intended UI/generation behaviour; invalid settings are rejected; existing-session snapshots remain distinguishable from changed profile settings for new sessions | BB04, BB17; WB06; UI/reload comparison |
| F13 | Error handling | Invalid input, missing/foreign/completed sessions, model/API failure and malformed structured output produce stable controlled errors, recoverable UI where applicable and no invalid persisted content | BB02, BB18–BB24; WB02–WB04; UI; controlled fault injection |

F2 is a design-adequacy expectation, not a claim that clarification is already implemented. Record an implementation gap if the system cannot meet it.

For F2–F4/F6, assess content dimensions separately: technical correctness, contextual relevance, language adequacy, explanation beyond translation, and adaptation appropriateness. Score each **2 = adequate**, **1 = limited/minor issue**, **0 = material error or absent**, or **NA = not assessable**. Before execution, record an expected concept/domain, key facts, unacceptable misconceptions and reference basis for each artificial query. Structural validity alone cannot earn a content pass. A required dimension scoring 0 fails that case; 1 supports only Partial content adequacy; required NA prevents a full content judgement. Use qualified human judgement and source-backed reference notes, not the generating model as sole assessor.

### 5.4 FURPS Usability: structured inspection

| ID | Criterion | Inspection question |
| --- | --- | --- |
| U1 | Task clarity | Is the inquiry entry and its purpose evident on Home/Ask? |
| U2 | Information structure | Are simple, example, technical, reflection and hint sections distinguishable? |
| U3 | Interaction clarity | Are the three Stage 6A choices, optional Stage 6B choices, skip action, and consequences understandable? |
| U4 | Feedback visibility | Are loading, adaptation and updated support/state visibly communicated? |
| U5 | Navigation consistency | Can the evaluator find New Inquiry, History, Review/Resume and preferences without dead ends? |
| U6 | Bilingual readability | Do Burmese glyphs, line breaks and mixed English terms display legibly without clipping? Is language quality separately assessed? |
| U7 | State visibility | Are self-reported support need, selected route, completion and review recommendation distinguishable? |
| U8 | Error clarity | Are errors understandable, appropriately localised and accompanied by an available recovery action? |
| U9 | Consistency | Are labels, controls and interaction patterns consistent across screens/locales? |

Inspect desktop (1440 × 900) and mobile (390 × 844), English and Burmese UI, with bilingual support; inspect both themes for readability. Record actual browser/viewport and any variation. Include keyboard navigation, visible focus and preference-dialog use. Capture normal, loading, empty, error, adapted and completed/review states where reachable.

Record issue severity: **0 none observed**, **1 cosmetic**, **2 impedes a task but workaround exists**, **3 blocks completion or materially misleads**. U criterion Pass requires all planned checks executed and no severity 2/3 issue; Partial denotes severity 2 or incomplete coverage; Fail denotes severity 3. Preserve severity 1 issues even on a pass. Report evaluator judgement, not user satisfaction, measured learnability or accessibility certification.

Use this minimum inspection matrix. Exercise each reachable state in both
viewports and distribute both UI locales, both themes and bilingual content
across the matrix rather than treating one screenshot as complete coverage.

| Screen or flow | Required states/checks | Main criteria |
| --- | --- | --- |
| Home / Ask | Normal, empty/invalid input, loading, provider error, keyboard submission | U1, U4, U8, U9 |
| Learning Session content | Initial support, section hierarchy, hint reveal, bilingual wrapping, long content | U2, U6, U9 |
| Stage 6A / 6B | High, Medium, Needs Support, every optional choice, skip, clarification input, keyboard focus/order | U3, U4, U7, U9 |
| Adaptation outcomes | Adapting, fade, generated support, corrected/ambiguous concept, round limit, retry/error | U3, U4, U7, U8 |
| History | Empty and populated, newest-first order, state labels, learner isolation | U5, U7, U9 |
| Review / Resume | In-progress, review-recommended, completed, round 0/1/2, response history, legacy session | U4, U5, U7, U9 |
| Preferences modal | Open/close, keyboard use, focus visibility, valid update, validation error, persistence | U5, U8, U9 |

For keyboard inspection, record tab order, visible focus, activation with the
expected keys, dialog focus behaviour, and whether any interactive control is
unreachable. This is a bounded inspection, not a full WCAG conformance audit.

### 5.5 FURPS execution registers

The registers began as pre-execution records. Step 11 runtime/browser evidence,
Step 12 bounds evidence, and Step 13 live artificial simulation now provide partial technical support for F1–F13
and U1–U9. Nathan's simulation content review is completed and endorsed on
2 October 2026 (E022–E023). The required black-box, white-box, full
locale/theme/viewport matrix, keyboard inspection and participant evidence are
not complete. The rows therefore remain Partial rather than being promoted to
final Pass outcomes.

Simulation execution `RUN-B01-20261001-SIMULATION-02` accounted for all 55
planned attempts (48 core plus seven separate routes): 44 technical Pass,
eight controlled initial ambiguity outcomes without sessions, and three
technical Fail. SIM05-C aborted generation (20-second configured timer,
52.825-second measured fetch); SIM-CM-13/16 rejected unchanged interpretations
labelled corrected. Failed response steps left stored state unchanged. The
aborted evaluation-runner attempt is retained separately. E018–E021 link exact
text, provider calls, stored documents and references as captured at execution.
See [simulation analysis](../02_design/simulation/simulation_analysis.md) and
[qualified human review](../02_design/simulation/qualified_human_judgement.md).
This is route-handler/service/database evidence, not a browser or deployed
HTTP/middleware run. Nathan subsequently confirmed reviewing and accepting
all 55 AI-assisted worksheets and authorised typed sign-offs on 2 October
2026. The 91 delivered-output assessments are 18 Pass, 71 Partial and two Fail;
his saved SIM04-A amendment is preserved. The eight ambiguity assessments and
three technical failures retain their limitations. E022–E023 identify the
[dated approval](../02_design/simulation/review_completion/approval_record.md)
and endorsed review manifest. Step 13 is complete with findings, not an
all-content pass. Review clock times are not recorded; AI source consultation
is not attributed to Nathan. No learner-benefit or independent-review claim
is made. E018–E021 retain their historical capture state unchanged.

| Functionality criterion | Execution status | Outcome | Evidence IDs | Deviation or note |
| --- | --- | --- | --- | --- |
| F1 | Executed | Partial | E004–E006, E008, E010–E013 | Valid live inquiry and visible Home/session creation passed; invalid/boundary BB cases remain pending |
| F2 | Executed | Partial | E005–E006, E008, E018–E023 | Nathan endorsed appropriate contextual clarification for current/network, with English-only/no-session limitations. Initial cell/inheritance outputs name a domain but do not clearly invite confirmation or contrast other senses: contextual score 1/Partial. SIM-CM-13/16 unchanged corrections remain rejected (502); other separate corrections lacked sessions. No simulation correction-path Pass claimed |
| F3 | Executed | Partial | E005–E006, E008, E010–E013, E018–E023 | Three language-help profile modes passed payload/override and unchanged-profile assertions. Nathan's endorsed review records eight unrelated-script outputs, material mass/net-charge wording defects, charge/rate terminology limitations and limited term-focused revision. Language adequacy is mixed, not universally adequate; earlier browser evidence remains separate |
| F4 | Executed | Partial | E004–E006, E008, E010–E013, E018–E023 | 47 initial sessions and 44 persisted adaptations retained as exact text; all 91 outputs assessed and endorsed by Nathan: 18 Pass, 71 Partial, 2 Fail. SIM04-B initial and SIM08-B initial remain material content failures; NA/missing outputs are not counted as delivered content. Earlier rendering evidence is separate; no learning effectiveness claim |
| F5 | Executed | Partial | E005–E006, E008, E010–E017 | High, default, simpler, language, conceptual and mismatch bound inputs persisted correctly in tested cases, and five Stage 6B options/skip/back rendered; the complete invalid-combination public-boundary matrix remains pending |
| F6 | Executed | Partial | E004–E006, E008, E014–E023 | Nathan endorsed new settings/perspectives where present, but several simpler/conceptual/language revisions repeat earlier support or leave terminology unresolved. Fade/cap generate no content. One conceptual timeout and two same-interpretation correction failures remain Fail; full BB matrix not yet executed |
| F7 | Executed | Partial | E004–E006, E008, E010–E021 | BND-01–BND-17 plus simulation stored rounds ≤2; 41 observed fade/cap steps made zero provider calls. SIM05-C cap was not reached after timeout. BB/WB corroboration remains |
| F8 | Executed | Partial | E005–E006, E008–E009 | Relevant/unrelated follow-ups behaved and persisted as expected; length/count boundaries pending |
| F9 | Executed | Partial | E004–E006, E008, E014–E021 | Simulation retained 47 sessions, 44 adaptations and 85 response events with reconstructable chronology; three failed response steps left documents unchanged. Concurrency remains supported by separate bounds run; legacy/broader reconstruction pending |
| F10 | Executed | Partial | E005–E006, E008, E010–E013 | History API was owner-scoped/newest-first and the captured History UI used self-reported-support/status/action labels; broader state/ownership UI coverage pending |
| F11 | Executed | Partial | E005–E006, E008, E010–E017 | Visible Review/Resume plus explicit completion from rounds 0/2, idempotent repeat and post-completion rejection passed; remaining status/legacy variants pending |
| F12 | Executed | Partial | E004–E006, E008 | Valid preferences and unchanged language-route profile passed; invalid values, reload and snapshot comparisons pending |
| F13 | Executed | Partial | E004–E006, E008–E021 | Prior controlled failures/recovery plus simulation timeout/invalid unchanged corrections returned safe 502 and preserved state; measured abort elapsed time exceeded configured budget. Intended-route failures remain Fail; broader invalid-input matrix pending |

| Usability criterion | Execution status | Outcome | Highest severity | Evidence IDs | Deviation or note |
| --- | --- | --- | --- | --- | --- |
| U1 | Executed | Partial | 0 | E010–E013 | Inquiry entry and purpose were evident in captured desktop Home; invalid/loading and keyboard paths remain pending |
| U2 | Executed | Partial | 0 | E010–E013 | Structured explanation, example, technical, reflection and hint areas were distinguishable in English/Light desktop; other themes/locales/mobile pending |
| U3 | Executed | Partial | 0 | E010–E013 | Stage 6A, five Stage 6B choices, continue, skip and back were visible; every choice, consequence wording and keyboard interaction remain pending |
| U4 | Executed | Partial | 0 | E010–E013 | Adapted content, route/history, limit, error and recovered state were visible; transient loading/adapting feedback was not captured |
| U5 | Executed | Partial | 0 | E010–E013 | Home, History, Review/Resume and primary navigation were observed without a dead end; preferences-dialog and full matrix inspection remain pending |
| U6 | Executed | Partial | 0 | E010–E013 | English+Burmese support rendered together without visible clipping in the captured desktop view; Burmese UI, mobile, Dark theme and linguistic quality remain pending |
| U7 | Executed | Partial | 0 | E010–E013 | Self-reported support, route/history, limit, completion and review recommendation were distinguishable in captured states; broader matrix pending |
| U8 | Executed | Partial | 0 | E010–E013 | Controlled provider error was learner-safe and recoverable with the same question; localisation and other error classes remain pending |
| U9 | Executed | Partial | 0 | E010–E013 | Labels and interaction patterns were consistent across captured English desktop screens; other locales, themes, mobile and keyboard remain pending |

## 6. Evaluation methods and procedures

| Method ID | Procedure and minimum planned coverage | Evidence and limits |
| --- | --- | --- |
| CA-GAI | One clean GenAI conversation containing frozen framework, supporting artefact definitions, PIRQOA, current theories and C1–C5. Ask for support, omissions, counterarguments, unsupported assumptions and improvements against each criterion. Preserve all follow-ups | Full prompt/response, model/date/settings, coded analysis. Code Support, Concern, Missing element, Unsupported assumption, Suggested improvement, Out of scope. Critique is not independent empirical validation |
| CA-LIT | Review Assignment 2 SLR/SSR evidence against all seven stages; record assignment page/section and source identity, evidence, fit and transfer limitations. Check negative evidence and gaps | Literature matrix and synthesis. Label assignment-mediated claims; consult original papers before attributing findings beyond supplied summaries. Do not invent or silently add references |
| CA-ARG | For every stage construct problem → issue → requirement → theory/literature → stage → RQ; ask whether removing it weakens the design and whether it adds unjustified scope | Seven traceability arguments, counterargument and bounded conclusion for each |
| CA-SCN | Walk “What is photosynthesis, and how do plants make food?” through seven stages, with Medium and Needs Support feedback plus a High branch | Stage/input/decision/output/criterion records. This is conceptual instantiation, not an application run |
| DA-STA | Inspect UI/application/AI/data separation, validation, ownership and application-controlled state. Run existing lint, TypeScript check and production build against baseline | Commands, exit codes and complete logs; architecture notes with code locators. Compilation does not verify runtime functionality |
| DA-DYN | Observe create, respond, follow-up, history, resume and error handling using live runtime; capture request, response, persisted state and UI | Operation logs and before/after state; separate environment failures from application failures |
| DA-BND | Exercise rounds 0 → 1 → 2 and a further response; check all three responses at round two, completed-session rejection and concurrent writes near cap | State/count/LLM-call assertions. Evaluates bounded behaviour, not global optimisation or pedagogical optimality |
| DA-SIM | Execute the fixed artificial corpus and response paths in §7 with live generation | Every input, output, preference snapshot, state and content rating. Artificial cases are not learner data |
| DA-BB | Execute BB01–BB19 and extensions in §8 through public UI/API, without relying on source code to infer outcomes | Reproducible steps, assertions, actual outcomes, screenshots/API/state evidence |
| DA-WB | Add and execute targeted internal tests for adaptation, lifecycle, scope, output validation, persistence and preferences; §8 defines priorities | Test source/version, commands, pass/fail logs and optional coverage. Mocks establish logic only; real database tests establish persistence behaviour |
| DA-UI | Execute U1–U9 inspection across defined screens/states/locales/viewports | Inspection sheets, issue severity and screenshots; declare evaluator role and language competence |
| DA-ARG | Map implemented features to REQ-01–03 and conceptual stages; contrast intended rationale with observed operation | Feature → requirement → conceptual basis → runtime evidence → limitation |
| DA-SCN | Execute the Photosynthesis workflow in §9 using the PoC | Ordered screenshot/API/state trail; do not count screenshots as separate independent methods |
| DA-LIT | Use Assignment 2 evidence to evaluate rationale for terminology preservation, explanation, adaptation and interaction structure | Feature/literature matrix. Literature supports design rationale, not correctness of generated Burmese content |
| EX-C / EX-D | Optional expert review of framework/PoC using the same criteria and recorded interview prompts | Expertise, consent, date, notes/transcript and disagreements. If absent, record Not run/optional; do not imply participation |

Literature support labels: **Strong** = directly relevant and convergent support with no unresolved material contradiction; **Moderate** = relevant but indirect/limited transfer; **Limited** = weak or narrowly applicable support; **Contradictory/uncertain** = conflicting findings or unclear applicability. Record missing evidence explicitly. Several summaries of the same paper do not create independent corroboration.

Static command plan, run from `burmese_stem_ai/` only during execution:

```sh
npm run lint
npx tsc --noEmit
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run build -- --webpack
```

Record missing dependencies as Blocked. The webpack build command is the documented verification path for this repository; retain any failed alternative build log and its reason. `npm test` uses deterministic Vitest mocks; `npm run test:integration` uses an isolated temporary MongoDB or an explicitly supplied database ending in `_test`; `npm run test:all` executes both modes. Structural coverage and database tests do not establish Burmese quality, STEM accuracy, usability, or educational effectiveness. Protocol preparation and refinement verification are not formal `B01` execution and make no paid model calls.

For modest timing analysis, use Photosynthesis, gravity, electric current, programming inheritance and pH, **three independent fresh-session attempts each** (15 initial-generation attempts). Measure start/end around the same operation boundary, preferably monotonic client request-to-response time. Record operation, elapsed milliseconds, success, timeout, retries and environment for every attempt. Report per-query and pooled successful-attempt median/min/max with sample sizes, plus failure/timeout counts separately. Log adaptation/follow-up timings descriptively without pooling unlike operations. No latency pass threshold is asserted because no service-level target is specified.

### 6.1 FURPS execution sequence

**Phase 1 — Prepare the run**

1. Verify B01 identity and complete the controls in §4.
2. Create the run folder and evidence register without treating baseline-freeze
   checks as formal FURPS outcomes.
3. Freeze case inputs, preference snapshots and content-reference notes.
4. Start the application and dedicated database; record commands, versions,
   ports and non-secret configuration.
5. Capture the initial database state for the artificial learner identities.

**Phase 2 — Execute Functionality cases**

1. Run BB01–BB24 through public UI/API boundaries.
2. Execute the fixed artificial simulation and executable Photosynthesis
   scenario where they provide content evidence for F2–F6.
3. Use controlled dependency fault injection for BB18–BB19 rather than waiting
   for random provider failures.
4. Execute WB01–WB06, including the real-database race near the adaptation cap.
5. Preserve expected, actual, execution status, outcome and evidence for every
   attempt. Record the first failure before any retry.
6. Consolidate case evidence into F1–F13 without turning structural test passes
   into content-quality passes.

**Phase 3 — Conduct structured Usability inspection**

1. Reset to the documented starting state without deleting prior evidence.
2. Inspect the matrix in §5.4 at desktop and mobile viewports.
3. Cover English/Burmese UI, bilingual support and both themes.
4. Record keyboard interaction, visible focus and preference-dialog behaviour.
5. Log every issue with severity, reproduction steps and evidence.
6. Apply U1–U9 decision rules without reporting evaluator inspection as
   participant feedback.

**Phase 4 — Reconcile and report**

1. Cross-check each result against its exact B01 UI/API state and stored record
   where applicable.
2. Record discrepancies between expected and observed behaviour.
3. Distinguish application defects, content limitations, environment failures,
   blocked checks and design limitations.
4. Summarise Functionality and Usability separately; do not calculate one
   FURPS percentage.
5. Map supported findings to REQ-01/RQ1, REQ-02/RQ2 and REQ-03/RQ3 while
   separating direct from enabling evidence.
6. State residual limitations and every Not assessed criterion.

## 7. Artificial simulation design

Use 16 cases, each once for every response path below: **48 planned fresh sessions**, excluding retries. Use fixed beginner/bilingual/guided preferences and record UI language. Prepare expected-fact/reference notes before execution. Do not regard paths from the same query as independent learner observations.

| Case | Domain | Exact input |
| --- | --- | --- |
| SIM01 | Biology | What is photosynthesis, and how do plants make food? |
| SIM02 | Biology | What is DNA? |
| SIM03 | Biology | What is osmosis? |
| SIM04 | Physics | What is gravity? |
| SIM05 | Physics | What is electric current? |
| SIM06 | Physics | What is momentum? |
| SIM07 | Chemistry | What is pH? |
| SIM08 | Chemistry | What is an ion? |
| SIM09 | Chemistry | What is a catalyst? |
| SIM10 | Computing | What is inheritance in object-oriented programming? |
| SIM11 | Computing | What is an algorithm? |
| SIM12 | Engineering | What is carbon fibre? |
| SIM13 | Ambiguous | What is a cell? |
| SIM14 | Ambiguous | What is current? |
| SIM15 | Ambiguous | What is a network? |
| SIM16 | Ambiguous | What is inheritance? |

For SIM13–SIM16, record clarification or qualification behaviour before providing a fixed disambiguating input: respectively “I mean a biological cell”, “I mean electric current”, “I mean a computer network”, and “I mean inheritance in object-oriented programming”. If no clarification flow exists, record that limitation; a new explicitly contextualised inquiry may be a separately labelled continuation, not a retroactive pass for the ambiguous case.

| Path | Script and implementation expectations |
| --- | --- |
| A | Initial → High: persist `fade` event at round 0, no generation or increment, `in_progress` → explicit Finish: `completed` |
| B | Initial → Medium + skip: default `another_example` at round 1 → High: persist `fade` event, remain at round 1 → explicit Finish |
| C | Initial → Needs Support + `simpler_explanation`: round 1 → Needs Support + `concept_unclear`: round 2 and `review_recommended` → extra Needs Support + skip: persist event, no provider call or third adaptation |

Exercise `language_terms` and `concept_mismatch` as separately identified route cases. For the latter, use the fixed clarification strings for SIM13–SIM16 and record corrected, ambiguous, or capped outcomes without forcing a correction.

Record actual content change as well as support-type labels. A different string or correct enum alone does not establish meaningful adaptation. Use separate BB04/BB17 cases for Burmese-only and English-only preferences; the core simulation does not claim exhaustive preference coverage.

## 8. Black-box and white-box coverage

Retain the plan's black-box IDs so later evidence remains traceable.

| Case | Minimum assertion |
| --- | --- |
| BB01 | Valid STEM inquiry creates retrievable, correctly initialised session |
| BB02 | Empty/whitespace inquiry is rejected without creation |
| BB03 | Explicit technical context is honoured; include ambiguous/contextualised pair |
| BB04 | Bilingual, Burmese and English support preferences affect relevant output/display |
| BB05 | Required structured support and revealable hint are meaningful and accessible |
| BB06 | High records a `fade` event without provider call, adaptation, or round increment; completion remains explicit |
| BB07 | Medium/Needs Support with no Stage 6B choice selects the correct default Stage 5 scaffold before cap |
| BB08 | Each explicit Stage 6B choice selects its documented route; skip remains optional and concept mismatch requires clarification |
| BB09 | First adaptation persists round 1 and matching content |
| BB10 | Second adaptation persists round 2 and appropriate status |
| BB11 | Attempt beyond round 2 creates no third adaptation |
| BB12 | Relevant follow-up uses active concept and persists answer |
| BB13 | Unrelated follow-up is restricted/redirected as documented |
| BB14 | History lists correct learner's sessions and state |
| BB15 | Review reconstructs stored content without unintended mutation |
| BB16 | Resume retains prior round, responses and limits |
| BB17 | Preferences persist across reload and affect a fresh session; inspect snapshot behaviour |
| BB18 | Controlled model/API failure gives understandable error and preserves valid state |
| BB19 | Malformed structured model response is rejected without invalid persistence |

Add explicitly labelled extensions `BB20` inquiry length 1,000/1,001; `BB21` follow-up length 500/501 and third follow-up; `BB22` anonymous learner isolation; `BB23` invalid understanding and missing/invalid session; `BB24` completion and post-completion response. Fix expected HTTP codes from the frozen route contract before execution; do not invent codes from the plan. For BB18–BB19 use controlled dependency fault injection in the evaluation environment and label it; do not wait for random provider failures.

White-box groups:

- **WB01 adaptation:** Stage 6A/6B validation, every route at rounds 0/1/2, default routes, fade, invalid combinations, status decisions, provider-call counts and absence of generation at cap.
- **WB02 lifecycle:** legal completion, repeated completion, missing/foreign session, completed-response rejection; do not invent an `adapted` state.
- **WB03 follow-up:** valid/invalid payloads, missing context, in-scope/out-of-scope structured outputs, length/count boundaries.
- **WB04 model contracts:** valid output, missing fields, wrong types, blank required text, malformed JSON, refusal/empty response and transport failure; confirm no invalid save.
- **WB05 persistence:** create/retrieve, append adaptation/follow-up, preference snapshot, ordering and ownership. Use real evaluation database integration checks; race two requests near a cap and verify stored invariants/conflict handling.
- **WB06 preferences:** allowed/invalid values, creation/update/retrieval and propagation to generation/display; compare existing-session snapshot with changed profile.

Record service/DAO/route symbols inspected, cases exercised and uncovered branches. Coverage percentages, if collected, must identify tool, scope and exclusions; they are not a substitute for assertions or an educational measure.

## 9. End-to-end Photosynthesis scenario

1. Start with a dedicated identity; set Burmese support and beginner explanation. Record full preferences.
2. Ask “What is photosynthesis, and how do plants make food?” Capture concept/context, exact structured output and initial stored state.
3. Inspect simple/example/technical/reflection sections and reveal hint. Judge content against prepared reference notes.
4. Choose Medium; capture first adaptation, response and state.
5. Choose Needs Support; capture second adaptation and review recommendation.
6. If offered, choose High at the cap; verify no third generation and record actual state. If UI prevents it, record that UI limitation and use a separately identified API boundary test, not an invented scenario step.
7. Before finishing, ask “Why do plants need sunlight for photosynthesis?” and then “How does gravity work?” Record relevant-answer and scope-control outcomes, including persisted follow-up count.
8. Open History and resume the unfinished session; confirm unchanged content and round. Finish explicitly, then return through History to review the completed session.
9. Record deviations, unreachable actions, failures, recovery and U1–U9 observations. Do not force a success narrative by changing the input mid-run.

The conceptual Photosynthesis walkthrough and executable scenario must have separate evidence IDs and conclusions.

## 10. Evidence management and recording templates

Planned locations follow the Assignment 5 plan: `01_conceptual/` (GenAI, literature, argument, scenario), `02_design/` (static, dynamic, optimisation, simulation, black_box, white_box, usability, scenario), `03_results/`, and optional `04_expert/`. Design literature/argument records may be stored under `02_design/literature/` and `02_design/informed_argument/`. Paths in this section are planned destinations, not claims that files already exist.

Use immutable, sequential evidence IDs **E001, E002, …**, result IDs **R001, R002, …**, and concern IDs **ISS001, ISS002, …**. Case IDs describe procedures; evidence IDs identify actual files/records. Allocate evidence IDs when evidence is captured, not as fabricated completed records. A result may cite several evidence IDs; reused evidence keeps its original ID. Each evidence entry includes run, baseline, criteria and RQ mapping.

Keep case attempts stable and distinct from evidence identifiers, for example
`FURPS-B01-BB01-A01`, `FURPS-B01-WB01-A01`, or
`FURPS-B01-U03-MY-MOBILE`. Each attempt must record baseline, protocol, run,
evaluator, timestamp, dependency mode, artificial learner alias, exact
input/action, frozen expected assertions, full actual output where content is
judged, relevant HTTP/state/storage observations, outcome, evidence locators,
issue IDs and retry/deviation details.

### 10.1 Baseline/environment record

```yaml
baseline_id: TO_RECORD
protocol_version: '2.1'
evaluator_and_role: TO_RECORD
captured_at_with_timezone: TO_RECORD
conceptual_sources_and_hashes: TO_RECORD
commit_and_worktree_snapshot: TO_RECORD
application_version_and_lockfile_hash: TO_RECORD
runtime_browser_viewport_database: TO_RECORD
environment_and_deployed_commit: TO_RECORD
model_settings_prompt_schema_hashes: TO_RECORD
live_or_mock_dependencies: TO_RECORD
test_harness_and_commands: TO_RECORD
artificial_identity_and_reset_procedure: TO_RECORD
```

### 10.2 Test/run record

| Field | Value to complete during execution |
| --- | --- |
| Run / baseline / protocol / case / attempt | TO_RECORD |
| Method / criterion / REQ / RQ | TO_RECORD |
| Evaluator / timestamp / dependency mode | TO_RECORD |
| Preconditions / preferences / initial state | TO_RECORD |
| Exact input and numbered steps | TO_RECORD before execution |
| Expected assertions and reference basis | TO_RECORD before execution |
| Actual output / HTTP code / final stored state | TO_RECORD |
| Execution status | Not run |
| Outcome and per-assertion judgement | Not assessed |
| Evidence IDs and paths | None collected |
| Concern / severity / limitation / retry reason | TO_RECORD |

### 10.3 Master evidence register

```csv
evidence_id,run_id,baseline_id,method_id,case_id,artefact,description,path,locator_or_hash,captured_at,evaluator,dependency_mode,criteria,requirements,research_questions
```

### 10.4 Conceptual/literature assessment

```csv
record_id,method_id,stage_or_feature,criterion,requirement,rq,source,source_locator,evidence_summary,direct_or_transferable_support,context_limit_or_counterevidence,support_rating,concern,evidence_ids,assessor
```

For GenAI coding, add transcript turn/paragraph locator and code. For informed argument, add claim, warrant and counterargument. For conceptual scenario, add input, decision, output and next-stage dependency.

### 10.5 Simulation and timing records

```csv
run_id,baseline_id,case_id,path,attempt,query,preferences,session_alias,operation,overall_support_need,difficulty_type,selected_route,round_before,round_after,status_before,status_after,output_evidence_ids,content_dimension_scores,execution_status,outcome,assessor,limitation
```

```csv
run_id,case_id,attempt,operation,start_time,end_time,elapsed_ms,success,timeout,retry_of,environment,evidence_ids
```

### 10.6 Usability issue record

```csv
issue_id,run_id,criterion,screen,state,locale,support_language,theme,viewport,steps,observation,severity,task_effect,recovery_or_recommendation,evidence_ids,evaluator,language_competence
```

### 10.7 Consolidated results and PIRQOA matrix

```csv
result_id,baseline_id,artefact,method_ids,criteria,requirements,research_questions,execution_status,outcome,evidence_ids,interpretation,limitations,conflicting_evidence,follow_up
```

```csv
problem,issue,requirement_id,requirement,rq,objective,artefact,framework_stages,criteria,result_ids,evidence_ids,supported_claim,unsupported_claim_or_gap
```

### 10.8 Amendment/discrepancy record

```csv
change_id,date,old_protocol_or_baseline,new_protocol_or_baseline,source_conflict_or_change,reason,affected_cases,old_result_ids,retest_run_ids,resolution_or_open_issue
```

Quote CSV fields containing commas/newlines. Retain raw generated text, logs and state snapshots alongside summaries. Store no API keys, credentials or anonymous identity tokens in shareable evidence; use session/learner aliases. Keep original and redacted copies distinguishable in appropriately restricted storage. Optional interviews require consent for recording/quotation and compliance with applicable course/university procedures; do not assume learner-research approval.

## 11. Analysis and interpretation

1. Validate every result against evidence and the frozen oracle. Separate missing evidence from failure, environment blockage and scope exclusion.
2. Summarise functional counts by criterion and method: Pass, Partial, Fail, Not assessed, Not run, Blocked and Not applicable. If reporting a pass rate, use `Pass / executed assessable cases` and disclose the denominator and excluded categories; do not average repeated retries into extra successful cases.
3. Report simulation results by domain, ambiguity and response path, with exact counts. Explain the small purposive corpus and stochastic model behaviour; do not generalise to all Burmese STEM learning.
4. Summarise conceptual support criterion by criterion, including counterevidence. Summarise usability by criterion and highest observed severity, retaining unresolved issues.
5. Triangulate independent evidence types: literature/argument justify a mechanism; scenario/black-box observe it; white-box explains internal control. Shared screenshots or the same model's critique are not independent confirmation.
6. Resolve or explicitly retain contradictions. If source code enforces a cap but a runtime case exceeds it, report the runtime failure and investigate; do not vote across methods or hide it in an average.
7. Map each substantive claim through problem → issue → requirement → RQ → artefact → criterion → method → evidence → result → limitation.

A bounded implementation claim is strongly supported only when relevant external behaviour and internal/state evidence agree and no material counterexample remains in the evaluated coverage. Literature-based plausibility remains conceptual support. Incomplete domain/language coverage yields partial evidence. A High response remains a self-reported low need for additional support, not a mastery judgement. No outcome in this protocol establishes improved achievement or retention, universal optimality of two generated adaptations, or superiority over a baseline system.

## 12. Completion and handover checklist

- [ ] Baseline, environment, evaluator competence and execution inputs frozen.
- [ ] C1–C5 evaluated using GenAI, literature, informed argument and conceptual scenario.
- [ ] Every F1–F13 and U1–U9 row has an execution status and outcome; every Pass/Partial/Fail links to retained evidence, and every Blocked/Not applicable/Not assessed item has a written reason.
- [ ] Every planned black-box, white-box and usability-inspection case is executed or explicitly accounted for.
- [ ] Generated-content judgements identify the assessor, competence boundary and reference basis.
- [ ] Static, dynamic, bounds, simulation, black-box, white-box, design argument, design scenario and design literature methods recorded.
- [ ] All 48 planned simulation sessions and 15 timing attempts accounted for, including blocked/failed cases and deviations.
- [ ] Raw evidence, logs, actual outputs, state records and all retries retained and indexed.
- [ ] Master results and PIRQOA matrix link claims to evidence and limitations.
- [ ] Design/code discrepancies and unresolved concerns remain visible; fixes have separate baseline/retest records.
- [ ] Optional expert work is labelled completed with evidence or not performed.
- [ ] Original Assignment 5 brief checked for method/rubric alignment; primary references checked before final scholarly attribution.
- [ ] Final paper written only after results exist, using the plan's presentation limits and APA 7 requirements.

Completion means the planned work is accounted for honestly, not that every test passes. Blocked or unassessed items remain coverage limitations. This protocol prepares the evaluation; it does not claim those checklist items have been completed.
