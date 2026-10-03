# INFOSYS 720 Assignment 5 — Evaluation Protocol

| Document control | Value |
| --- | --- |
| Protocol ID | A5-PROTOCOL-01 |
| Version | 2.1 |
| Prepared | 30 September 2026 |
| Status | B01 frozen; Steps 10–18 and §18.1 recorded; audit/current conceptual argument retained; Step 21 has 225 results; Step 22 has 24 qualified PIRQOA chains, E064–E066; Step 23 has 17 scoped interpretation claims, E067–E068; 63 current evidence entries; mixed findings/release limits retained; Step 24 figures/tables next |
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

### Dated test/configuration amendment — 2 October 2026

Per user instruction, production code remains B01 while tests/configuration may
be extended in the root `burmese_stem_ai` project. Active test version
`ROOTTESTS-02` adds the white-box supplements to the normal project suite and
expands V8 reporting to 42 application files. The recorded root run passed
361 deterministic and 12 isolated MongoDB tests; lint/TypeScript passed.
Application-wide coverage is 72.54% statements, 76.37% branches, 64% functions
and 73.75% lines. Integration/browser evidence is separate from these
deterministic coverage totals.

See [dated amendment and results](../02_design/white_box/root_project_test_run.md)
(E033–E035). Production/test hashes are recorded separately; 66 production files
still match B01. No source-copy tree is required. On 2 October 2026 the user
requested removal of the superseded white-box run and duplicate helpers.
Evidence IDs 28–32 are retired; E033–E035 index the retained root execution and
post-cleanup manifest. Original root captures remain unchanged. Acceptance
criteria and black-box/simulation findings are unchanged. Run the project
commands directly for future technical checks.

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
2 October 2026 (E022–E023). Step 14 public HTTP/browser black-box execution is
accounted for with qualifications (E024–E027). Step 15 WB01–WB06 is structurally
complete (E033–E035). §18.1 structured usability inspection is now executed
(E036–E038): six U criteria Pass and three Partial within technical evaluator
scope. Participant research was not conducted and is not implied. Functionality
rows retain their mixed evidence/remaining synthesis qualifications.

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

Black-box run `RUN-B01-20261002-BLACKBOX-01` executed all BB01–BB24 using real
production-build HTTP/proxy/services/DAOs, an isolated MongoDB database and
controlled provider fixtures. First API outcomes were 22 Pass/2 Fail across
370 assertions. The assessed register is 21 Pass/2 Partial/1 Fail: BB07/BB08
retain fixture-content quality limits, and BB22 retains the frozen missing-
identity oracle failure (the public proxy instead issues a scoped cookie).
A supplemental ambiguity expectation incorrectly assumed no generated
clarification/round increment; the first failure and post-observation addendum
are both retained. Nine supplementary HTTP attempts/11 checks passed.
Forty-four Chrome observations/45 screenshots cover desktop English/Light
UI, all support-language modes, routes/skip/back, History, Review/Resume and
recovery. Four false browser predicates and explicit rechecks are retained;
they do not establish app defects. No external provider call or new human
content endorsement occurred. See [black-box analysis](../02_design/black_box/black_box_analysis.md).

White-box run `RUN-B01-20261002-ROOTTESTS-02` completed WB01–WB06 against
root-project production files matching B01, with test/config profile ROOTTESTS-02.
All 361 deterministic tests across 26 files passed, including all 39 route/round
combinations. Two real isolated MongoDB files passed 12 tests covering legacy
reads, scoped persistence, correction reconstruction, immutable preferences,
follow-up state isolation, legal completion and round/follow-up contention.
Lint/TypeScript passed. Application-wide V8 coverage spans 42 executable files:
72.54% statements, 76.37% branches, 64.00% functions and 73.75% lines.
Real database/browser coverage is separate. E033–E035 identify root commands,
coverage and the post-cleanup manifest; [analysis](../02_design/white_box/white_box_evaluation.md)
maps assertions and gaps. Structural Pass does not establish semantic novelty,
Myanmar-script enforcement, live interpretation accuracy or learning benefit;
script constraints are prompt-only where no runtime validator exists.
BB07/BB08 partials, BB22’s public-boundary oracle failure and simulation findings
remain unchanged. Handler-level identity tests do not override the public proxy
observation. The subsequent structured usability checkpoint is recorded below;
it does not retrospectively turn white-box coverage into usability evidence.

Usability run `RUN-B01-20261002-USABILITY-01` inspected 133 states/captures (131 main plus two separate Back-navigation rechecks) in
Chrome across both required widths, both UI locales and both themes (eight
basic configurations). All five routes, optional responses, fade/cap, Review/
Resume, legacy reconstruction, History, controlled errors/recovery and keyboard
interaction were inspected on the root production build. All 66 production
files still match B01. Final 29 owned History links match newest-first stored
order; foreign owner is excluded; 30 synthetic sessions stay within bounds.
Controlled provider fixtures made zero external calls; synthetic adaptations
do not establish content novelty or language quality. USI-01 modal focus and
USI-02 Burmese error localisation are severity 2; USI-03 remaining-ambiguity
badge is severity 1. Invalid preference options are UI-unreachable (NA), not
forced; preference-save infrastructure faults and full WCAG/participant work
were not executed. See [inspection and accountability](../02_design/usability/usability_inspection.md)
and [issues](../02_design/usability/issues.csv). No production fixes were made.

| Functionality criterion | Execution status | Outcome | Evidence IDs | Deviation or note |
| --- | --- | --- | --- | --- |
| F1 | Executed | Partial | E004–E006, E008, E010–E013, E024–E027, E033–E035 | BB01/02/20 passed real HTTP creation, invalid/malformed inquiry and 1000/1001 boundaries without rejected-input writes/provider-seam calls; browser creation/recovery observed. Controlled provider is not live content validation; overall synthesis remains WB04 accepts/rejects initial structured contracts and provider faults before save. |
| F2 | Executed | Partial | E005–E006, E008, E018–E027, E033–E035 | BB03/08 passed controlled context/ambiguity and correction trace through HTTP/browser; addendum verified corrected active context. This does not erase simulation cell/inheritance qualification score 1, no-session limits or SIM-CM-13/16 live correction failures WB01/WB04 verifies corrected/ambiguous/unchanged output handling, not live interpretation correctness. |
| F3 | Executed | Partial | E005–E006, E008, E010–E013, E018–E027, E033–E035 | BB04 and language choices displayed all three preference modes and bilingual overrides, with original snapshots retained. Exact initial fixture assessment already endorsed; new fixture adaptations are not qualified language-quality evidence. Simulation's foreign-script/material wording defects remain WB01/WB06 verifies bilingual override and unchanged saved preferences; script constraints remain prompt-only. |
| F4 | Executed | Partial | E004–E006, E008, E010–E013, E018–E027, E033–E035 | BB05 browser support structure and revealable hint passed with previously endorsed initial fixture. Simulation's 91 ratings remain 18 Pass/71 Partial/2 Fail, including SIM04-B/SIM08-B initial failures. No learning effectiveness claim WB04 verifies complete initial shape and bounded fields, not pedagogical quality. |
| F5 | Executed | Partial | E005–E006, E008, E010–E017, E024–E027, E033–E035 | All five Stage6B options, default/skip/back, clarification requirement and BB23 invalid/conflicting-response public inputs executed; correct routes/state returned. Fixture semantic quality not inferred; wider localisation remains WB01 verifies all 39 route/round combinations and invalid response inputs. |
| F6 | Executed | Partial | E004–E006, E008, E014–E027, E033–E035 | BB06–11 bounded route/state/persistence and browser routes passed mechanically; BB07/08 Partial because prefixed fixture paragraphs do not prove meaningful novelty. Generated ambiguous clarification consumes a bounded round; unsupported zero-round assertion retained as Fail. Simulation timeout/correction failures remain WB01 verifies deterministic route/provider/save decisions and exact repetition rejection, not meaningful novelty. |
| F7 | Executed | Partial | E004–E006, E008, E010–E027, E033–E035 | BB06/09–11/21/24 corroborate fade/cap, two-adaptation/two-question limits and post-completion rejection with provider-seam counts, state and UI. All 42 black-box stored sessions stay within bounds. Formal WB corroboration is recorded; no pedagogical optimality claim WB01/WB05 verifies zero-generation fade/cap and real round-1→2 race invariants. |
| F8 | Executed | Partial | E005–E006, E008–E009, E024–E027, E033–E035 | BB12/13/21 passed scoped/unrelated fixture outcomes, 500/501 lengths and third-question limit. Corrected-context addendum passed provider-input/state checks; its fixture answer is not scientific-content evidence WB03 verifies previous/corrected/legacy context, safe failures and real Stage 7 invariance. |
| F9 | Executed | Partial | E004–E006, E008, E014–E027, E033–E035 | Black-box stored 42 sessions/25 adaptations/28 events/7 follow-ups; 29 detail projections match stored state. Failure injections made no writes; completed Review exact text verified. Prior bounds concurrency separate; legacy/formal WB coverage is recorded; overall synthesis remains WB05 records real legacy retrieval, correction projection and adaptation/follow-up contention. |
| F10 | Executed | Partial | E005–E006, E008, E010–E013, E024–E027, E033–E035 | BB14/22 API foreign access/forged header and browser rejection passed; browser History exactly its own ten sessions newest-first with self-report/status/action labels. Cookie-less 400 oracle failed because public proxy provisions identity, not because of observed leakage; mobile/localised inspection remains WB02/WB05 verifies owned lookup/write/order; handler tests do not supersede public BB22. |
| F11 | Executed | Partial | E005–E006, E008, E010–E017, E024–E027, E033–E035 | BB15/16/24 confirmed completed Review with all support/event entries, Resume rounds 0/1/2, corrected concept continuity, idempotent completion and post-completion 409. Raw clarification/preferences are not individually displayed as history fields; legacy/WB coverage is recorded; wider inspection remains WB02 verifies legal/idempotent completion, legacy normalisation and completed-response rejection. |
| F12 | Executed | Partial | E004–E006, E008, E024–E027, E033–E035 | BB04/17 valid/invalid/unknown/type preference updates, reload and independent old/new snapshots passed; modal preserved. Language overrides did not change the profile. Wider theme/locale inspection remains WB06 verifies defaults/partial updates/write guards and real old/new immutable snapshots. |
| F13 | Executed | Partial | E004–E006, E008–E027, E033–E035 | BB18 six failure injections and BB19 24 malformed outputs returned safe 502 with no state corruption/automatic seam retry; BB02/20–24 invalid-input boundaries executed; browser recovery passed. Fixture timers ~20s do not supersede slower live simulation abort; unresolved oracle discrepancies retained WB04 propagates eight provider faults through four operations with safe errors and no invalid save. |

| Usability criterion | Execution status | Outcome | Highest severity | Evidence IDs | Deviation or note |
| --- | --- | --- | --- | --- | --- |
| U1 | Executed | Pass | 0 | E010–E013, E025–E026, E036–E038 | Purpose, labelled inquiry, empty/whitespace prevention, keyboard submission, pending and recovery inspected in both viewports/locales |
| U2 | Executed | Pass | 0 | E010–E013, E025–E026, E036–E038 | Initial hierarchy, hint, adaptations and follow-up answers distinguishable in both viewports/themes/locales |
| U3 | Executed | Pass | 0 | E010–E013, E025–E026, E036–E038 | Three overall responses, five optional choices, skip/back, required bounded clarification and Space/ArrowDown selection inspected; no meaningful-novelty claim |
| U4 | Executed | Pass | 0 | E010–E013, E025–E026, E036–E038 | Actual pending/adapting feedback, routes/rounds, fade, cap, completion and controlled retry observed; localisation scored separately under U8/U9 |
| U5 | Executed | Partial | 2 | E010–E013, E025–E026, E036–E038 | Navigation, owned newest-first History, Review/Resume and preference save/reload work; USI-01 modal fails focus entry/containment/restoration in keyboard inspection |
| U6 | Executed | Pass | 0 | E010–E013, E022–E023, E025–E026, E036–E038 | Visual glyph/wrapping readability and bilingual override inspected in both widths/themes/locales; no material clipping observed. Visual-only Pass; simulation language quality remains mixed; not WCAG certification |
| U7 | Executed | Pass | 1 | E010–E013, E025–E026, E036–E038 | Self-report, route/round/limit, completed/review-recommended and correction trace distinguishable; USI-03 generic correction badge retained on still-ambiguous outcome |
| U8 | Executed | Partial | 2 | E010–E013, E025–E026, E036–E038 | Safe failure/resubmission and foreign-session recovery work; USI-02 English-only messages in Burmese UI. Invalid preference validation UI-unreachable NA; preference-save infrastructure fault not injected |
| U9 | Executed | Partial | 2 | E010–E013, E025–E026, E036–E038 | Eight basic configurations inspected; USI-01 modal focus, USI-02 error localisation and severity-1 USI-03 ambiguity terminology inconsistencies retained |

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

**Step 16 / DA-ARG — recorded, 3 October 2026.**
`ANALYSIS-B01-20261003-INFORMED-ARGUMENT-01` provides eight feature-level
[informed arguments](../02_design/informed_argument/traceability.md) grounded in
proper literature citations and existing E001–E027/E033–E038, not new executions.
Two explicitly bounded claims are Supported; six overall feature claims are
Partially supported. TTF/scaffolding remain the theoretical foundation;
Hevner's descriptive method and FEDS delimit interpretation rather than supply
new learner-effectiveness evidence. E039 identifies the analysis, E040 the
[reference verification/access/version record](../02_design/informed_argument/reference_verification.md),
and E041 the 116-entry input/output/source integrity manifest. No prior result,
oracle, score or content approval changed. F1–F13 retain existing mixed
qualifications; U1–U9 outcomes are unchanged. Empirical learner task fit,
mastery, gains and pedagogically optimal bounds remain Not assessed.
At that checkpoint Step 17 / DA-SCN was next; its subsequent execution is
recorded below. Step 18 / DA-LIT remains separate.

**Step 17 / DA-SCN — recorded, 3 October 2026.**
`RUN-B01-20261003-SCENARIO-02` executed §9 against the actual root B01
production build with live `gpt-5.4-mini` (reported version
`gpt-5.4-mini-2026-03-17`) and an empty isolated MongoDB database.
[Scenario analysis](../02_design/scenario/photosynthesis_scenario.md), E042–E044,
retains 18 public HTTP records/state snapshots, five provider calls, 24 browser
observations and 27 screenshots. Initial generation, Medium/skip, Needs
Support/concept_unclear, scoped follow-up, History, Resume, explicit Finish
and completed Review executed. Final state: two adaptations, four response
events, one stored relevant follow-up, round 2, completed. High-at-cap was
unavailable in UI; cap/fade/post-completion actions are separately labelled
API-only checks, not invented learner clicks. Fifteen final recorded-evidence
checks passed; preserved recorder/verifier corrections are not application
failures. Design/content conclusion remains provisional Partial because of
limited first-example novelty, extensive English retention and technical-scope
wording. No new qualified human endorsement, learner benefit or earlier FURPS
promotion is inferred. Production unchanged; servers stopped. At that
checkpoint Step 18 / DA-LIT was next; its analysis is recorded below.
Protocol criteria and the conceptual scenario remain unchanged.

**Step 18 / DA-LIT — recorded, 3 October 2026.**
`ANALYSIS-B01-20261003-DESIGN-LITERATURE-01` provides the separate
[design capability matrix](../02_design/literature/literature_matrix.csv) and
[synthesis](../02_design/literature/literature_synthesis.md), E045–E048.
Thirteen comparisons include all five A2 SSR systems, explicit Assignment 2
locators, literature/implementation separation, counterevidence and source
access/transfer limits. Rationale ratings: one Strong, nine Moderate, two
Limited, one Contradictory/uncertain; not FURPS or content scores. The
[source record](../02_design/literature/reference_verification.md) distinguishes
three named primary-locator inspections, one publisher-index abstract and
seven Assignment-mediated sources; no new corpus publication. Bounded
integration is partially supported; validated ATE, uniformly adequate Burmese/
STEM content, exact pedagogical bounds, superiority and learner outcomes are
not established. All 39 prior registered artefacts and 66 production identities
remain unchanged; 121-entry manifest retained. No new application/provider/
human run or earlier result promotion. Step 19 optional expert study remains
Skipped. The subsequent Step 20 audit, Step 21 consolidation and Step 22
traceability and Step 23 interpretation are recorded below. Step 24 figures/tables is now next.
Acceptance criteria, historical conceptual literature conclusions and B01
production remain unchanged.

**Step 20 / EV-REG — recorded, 3 October 2026.**
[E057 audit](../03_results/evidence_register_audit.md) preserves the 43 existing
design rows and retrospectively indexes eight conceptual files as E049–E056.
The register now has 52 entries; all registered paths/hashes, ten manifests /
1,174 entries and 66 production identities match. E028–E032 remain retired.
Unknown historical capture dates and conceptual version identities are explicit,
not assigned to B01. Historical DE-SIM/DE-BB/DE-WB are aliases for protocol
DA-SIM/DA-BB/DA-WB; CA-SYN/CA-REF are derived-document categories, not new
independent methods. Historical conceptual C4 is completeness/boundary clarity,
not this protocol's literature-consistency C4: use E051–E052 for the latter and
the audit crosswalk when consolidating. Original synthetic cookie-bearing
black-box captures are restricted and need labelled redacted derivatives before
public sharing. No release clearance, new human approval, outcome promotion,
application/provider/database execution or B01 source change is inferred.
Criteria remain version 2.1; this is an administrative index completion record,
not a retrospective oracle amendment. At this historical capture, Steps 21–22
were open; the current Step 21 completion is recorded below.

**User-requested CA-ARG scholarly revision — recorded, 3 October 2026.**
[E058 conceptual argument v2](../01_conceptual/informed_argument/traceability_v2.md)
adds seven explicitly literature-grounded arguments and nine references;
[E059 verification](../01_conceptual/informed_argument/reference_verification_v2.md)
records passage/access/version limits. E060 indexes its revision manifest.
It evaluates E056 §26's final conceptual version, while E053's original argument
and E055's historical triangulation remain unchanged. Task alignment is
plausible; self-report responsiveness does not establish calibrated contingency,
fading or transfer of responsibility. This is a dated analytic qualification,
not an empirical outcome change. The register now has 55 entries and the prior
52 rows/hashes are preserved. Use the revision for current CA-ARG synthesis,
without counting versions as independent methods. Acceptance criteria remain
2.1; no new application, provider, participant or expert evaluation occurred.

**Step 21 / recorded-results consolidation — complete, 3 October 2026.**
[E061 master results](../03_results/master_results.csv) supplies 225 immutable
IDs R001–R225 with the prescribed 14-column schema. [E062 notes](../03_results/consolidation_notes.md)
explain native scales, criterion synthesis, coverage, conflicts, omissions and
denominators; E063 indexes the consolidation manifest. All 55 intake evidence
rows/hashes and 66 B01 production identities are unchanged; the register now
contains 58 entries. All C1–C5/F1–F13/U1–U9 are accounted for. Current conceptual
C1 supports explicit responsibility coverage only; C2–C5 remain qualified.
Thirteen F Partials, six U Pass/three Partial, assessed BB 21 Pass/two Partial/
one Fail, live simulation failures and mixed delivered content remain intact.
No pooled success rate, new execution, human endorsement or public-release
clearance is implied. Criteria/oracles stay version 2.1. At Step 21 capture,
Step 22's matrix was still uncreated; its subsequent qualified completion is
recorded below.

**Step 22 / PIRQOA traceability — complete, 3 October 2026.**
[E064 matrix](../03_results/pirqoa_traceability.csv) records 24 complete chains:
seven REQ-01/RQ1, six REQ-02/RQ2 and eleven REQ-03/RQ3. It links 140 existing
immutable result IDs and 53 original evidence IDs to supported claims and
explicit gaps. [E065 notes](../03_results/pirqoa_traceability_notes.md) explain
the three qualified overall answers, native result scopes and direct versus
enabling evidence; E066 indexes the integrity manifest. All 58 intake evidence
rows/hashes, 225 master results and 66 B01 production identities are unchanged;
the register had 61 entries at this capture. RQ traceability is complete, not proof of full
empirical requirement satisfaction or learning effectiveness. Mixed F/U,
simulation/content/BB outcomes and restricted-original boundaries remain.
Acceptance criteria stay 2.1; no new application/test/provider/database run or
human endorsement. Step 23's subsequent completion is recorded below.

**Step 23 / interpretation — complete with qualifications, 3 October 2026.**
[E067 interpretation](../03_results/results_interpretation.md) applies §11 to
17 scoped claims across strong bounded mechanical evidence, partial evidence,
conceptual support and unsupported claims. It records convergence without
counting derived/shared sources as independent, unresolved failures/conflicts,
native denominators, scholarly warrants/access limits and the three qualified
RQ answers. No original case or F/U outcome is promoted. Educational
effectiveness, calibrated scaffolding, optimal dose and independent expert/
participant evidence remain unestablished. E068 indexes the integrity manifest;
all 61 intake register rows, 225 master results, 24 PIRQOA chains and 66 B01
production hashes are preserved. The register has 63 entries. No new
application/test/provider/database run, human endorsement, production fix or
restricted-original release clearance. Acceptance criteria remain 2.1.
**Next: Step 24 — figures/tables.**

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

Applied interpretation is recorded in [E067](../03_results/results_interpretation.md),
Step 23. Its INT labels are derived claim locators, not new test/result IDs or
an amendment to these rules. Strong narrow subclaims do not promote composite
FURPS Partials; all four claim categories retain source and coverage limits.

## 12. Completion and handover checklist

- [ ] Baseline, environment, evaluator competence and execution inputs frozen.
- [x] C1–C5 accounted for using recorded GenAI, literature, current informed argument and historical conceptual scenario (E061–E062; historical gaps and C4 crosswalk retained).
- [x] Every F1–F13 and U1–U9 row has an execution status, outcome, evidence and limitation (E061–E062); separate Blocked/Not applicable/Not assessed items have written reasons.
- [ ] Every planned black-box, white-box and usability-inspection case is executed or explicitly accounted for.
- [x] Generated-content judgements identify the assessor, competence boundary and reference basis (endorsed simulation E022–E023; black-box fixture semantic limits explicitly Not assessed).
- [x] Static, dynamic, bounds, simulation, black-box, white-box, design argument, design scenario and design literature methods recorded (mixed findings and source/access limits retained; E001–E027/E033–E048).
- [ ] All 48 planned simulation sessions and 15 timing attempts accounted for, including blocked/failed cases and deviations.
- [x] Retained raw evidence, logs, actual outputs, state records and recorded retries indexed (Step 20, E057; 52 entries; restricted originals not cleared for public release).
- [x] Master results link claims to evidence and limitations (Step 21, E061–E063).
- [x] PIRQOA matrix links all three REQ/RQs to existing result/evidence IDs, qualified supported claims and explicit gaps (Step 22, E064–E066; not educational-effectiveness proof).
- [x] Four claim categories, convergence/non-independence, conflicts and limitations applied to existing results (Step 23, E067–E068; no regrading or pooled success score).
- [ ] Design/code discrepancies and unresolved concerns remain visible; fixes have separate baseline/retest records.
- [x] Optional expert work is explicitly Skipped / Not assessed (R220; no independent expert study).
- [ ] Original Assignment 5 brief checked for method/rubric alignment; primary references checked before final scholarly attribution.
- [ ] Final paper written only after results exist, using the plan's presentation limits and APA 7 requirements.

Completion means the planned work is accounted for honestly, not that every test passes. Blocked or unassessed items remain coverage limitations. Checked items refer to the cited recorded scope; unchecked items remain for later handover and final-paper verification.
