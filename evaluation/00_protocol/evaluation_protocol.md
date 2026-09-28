# INFOSYS 720 Assignment 5 — Evaluation Protocol

| Document control | Value |
| --- | --- |
| Protocol ID | A5-PROTOCOL-01 |
| Version | 1.0 |
| Prepared | 28 September 2026 |
| Status | Prepared for execution; evaluation not run |
| Evaluator | To be recorded before execution |
| Primary conceptual artefact | Context-Aware Adaptive STEM Scaffolding Framework (Assignment 3, Artefact 3) |
| Primary design artefact | Burmese STEM AI proof-of-concept system (Assignment 4, Artefact 3) |
| Baseline | To be frozen and recorded before execution |

## 1. Purpose and evidence boundary

Evaluate whether the conceptual framework and implemented proof of concept provide a coherent, literature-grounded and demonstrable response to terminology support, conceptual explanation, and adaptive scaffolding requirements for Burmese-speaking STEM learners.

This protocol defines criteria, procedures, planned coverage, decision rules and recording templates **before evaluation execution**. It contains no evaluation results. Source/code inspection used to prepare the protocol is not a substitute for executing its tests. All proposed counts and thresholds below are protocol choices, not claims that the assignment mandates them.

The evaluation distinguishes:

- **Conceptual validity:** coherence, theoretical consistency, literature support and requirement coverage.
- **Functionality:** externally observable behaviour and internal implementation correctness.
- **Usability:** structured evaluator inspection of the interface and interaction flow.
- **Technical feasibility:** buildability, runtime behaviour, bounded state changes and persistence.
- **Educational effectiveness:** outside the present evaluation. Neither artificial interactions nor self-reported understanding establish learning gains, retention or objective competence.

No learner study, comparative experiment or production-readiness claim is planned. Optional expert feedback is supplementary and must not be reported unless collected.

## 2. Source basis and precedence

Paths below are relative to this document. These are supplied project sources, not independently verified primary research publications.

| Source | Use in this protocol |
| --- | --- |
| [Assignment 5 complete plan](../../docs/INFOSYS_720_Assignment_5_Complete_Plan.md), §§4–31, 37–41 | Evaluation methods, C1–C5, F1–F13, U1–U9, evidence discipline and reporting scope |
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
| Understanding values | `high`, `medium`, `needs_support`; initially `null` |
| Persisted statuses | `in_progress`, `review_recommended`, `completed`; `adapted` is not a persisted status |
| Support mapping | High → `key_takeaway`; Medium → `another_example`; Needs Support → `simpler_explanation` |
| Round counting | Any generated adaptation, including a High key takeaway, consumes a round; maximum two |
| High response | While below the cap, generates a key takeaway; status remains `in_progress`. Completion is a separate action |
| Medium/Needs Support | At the second adaptation, status becomes `review_recommended` |
| Response at round two | Records response without generating a third adaptation; High can return status to `in_progress`, while other responses retain `review_recommended` |
| Completion | Explicit completion accepts `in_progress` or `review_recommended`; repeat completion is idempotent; completed sessions reject new understanding responses |
| Follow-ups | Maximum two persisted follow-ups; question maximum 500 characters |
| Inquiry | Maximum 1,000 characters |
| Existing scripts | `lint` and `build` exist; no `test` script is currently declared |

These are test-oracle inputs from static inspection, **not runtime passes**. In particular, the plan's “High → completion/fading” shorthand must be tested as reduced support followed by explicit completion. Whether response-driven key takeaways adequately represent fading remains a separate conceptual judgement.

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

Before collecting results:

1. Record evaluator, date/time with timezone, protocol version, conceptual source file hashes and exact diagram/section locators. Preserve the Assignment 3 framework, definitions and PIRQOA together.
2. Record `git rev-parse HEAD`, `git status --short`, relevant uncommitted changes, and hashes/copies of untracked evaluation inputs. A commit hash alone does not identify a dirty working tree. Assign baseline ID `B01` only after the snapshot is reproducible.
3. Record application version, Node/npm versions, dependency lockfile hash, OS, browser/version, viewport, database version, local/deployed environment, and deployed commit if different. Record configuration names/values only when non-secret.
4. Record model identifier, provider, available generation settings, prompt/schema hashes and timeout/retry configuration. Distinguish live model calls from mocks and database-backed integration from mocked persistence.
5. Use dedicated artificial learner identities and evaluation sessions. Establish reset/cleanup procedures that affect only evaluation records. Retain identity continuity for persistence tests and separate identities for ownership tests.
6. Freeze test inputs, expected outcomes, scoring anchors, assessor qualifications and execution order. Choose a Burmese-fluent assessor for language judgement; otherwise mark linguistic adequacy Not assessed.
7. Save baseline/environment records in the planned `00_protocol/artefact_versions.md` and `00_protocol/environment.md`. These files are future outputs, not created by this protocol.

Use a unique run ID such as `RUN-B01-20260928-01`. Capture failures and first attempts, not only successful retries. Retry after recording the original failure and its reason; give every attempt its own identifier. Do not silently replace evidence. If code, prompts, criteria or inputs change, log the change and create a new baseline/protocol version as appropriate; retain pre-change results and run affected regression cases.

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
| F1 | Inquiry handling | Valid inquiry creates a retrievable session; empty/invalid inquiry is controlled and does not create a corrupt session | BB01–BB02; SIM; WB |
| F2 | Terminology/context | Primary term and domain match explicit context; materially ambiguous terms receive clarification or an explicit qualified interpretation, not an unmarked confident guess | BB03; SIM |
| F3 | Bilingual support | Output follows support-language preference and preserves useful English terminology; no observed material technical mistranslation | BB04; SIM; language review |
| F4 | Structured support | Simple explanation, example/analogy, technical explanation and reflective prompt are present and meaningful; hint is available as specified and may be optionally revealed | BB05; SIM; SCN |
| F5 | Learner response | All three allowed responses persist correctly; unknown values are rejected without mutation | BB06–BB08; WB |
| F6 | Adaptive support | Correct support type is selected and content changes meaningfully for the response; High reduces support without implying proven competence | BB06–BB10; WB; SIM |
| F7 | Adaptation bound | Round stays within 0–2; extra response creates no third adaptation; expected status and stored count agree | BB09–BB11; BND; WB |
| F8 | Scoped follow-up | Relevant query retains active context; unrelated query is restricted/redirected without becoming unrestricted chat; length and count caps hold | BB12–BB13; WB; boundary extensions |
| F9 | Persistence | Creation, response, adaptation and follow-up survive retrieval/reload with matching fields and no unintended duplicate writes | BB14–BB16; WB; DYN |
| F10 | Learning History | Correct learner's sessions appear in documented order with accurate state; unrelated learner records are absent | BB14; ownership extension |
| F11 | Review/Resume | Stored content and state reconstruct correctly; unfinished sessions resume within existing limits; completed sessions preserve completion | BB15–BB16; WB; SCN |
| F12 | Preferences | Valid settings persist and affect their intended UI/generation behaviour; invalid settings are rejected; distinguish existing snapshots from new sessions | BB17; WB; UI |
| F13 | Error handling | Invalid input, model failure and malformed output produce controlled errors, recoverable UI and no invalid persisted content | BB02, BB18–BB19; WB; UI |

F2 is a design-adequacy expectation, not a claim that clarification is already implemented. Record an implementation gap if the system cannot meet it.

For F2–F4/F6, assess content dimensions separately: technical correctness, contextual relevance, language adequacy, explanation beyond translation, and adaptation appropriateness. Score each **2 = adequate**, **1 = limited/minor issue**, **0 = material error or absent**, or **NA = not assessable**. Before execution, record an expected concept/domain, key facts, unacceptable misconceptions and reference basis for each artificial query. Structural validity alone cannot earn a content pass. A required dimension scoring 0 fails that case; 1 supports only Partial content adequacy; required NA prevents a full content judgement. Use qualified human judgement and source-backed reference notes, not the generating model as sole assessor.

### 5.4 FURPS Usability: structured inspection

| ID | Criterion | Inspection question |
| --- | --- | --- |
| U1 | Task clarity | Is the inquiry entry and its purpose evident on Home/Ask? |
| U2 | Information structure | Are simple, example, technical, reflection and hint sections distinguishable? |
| U3 | Interaction clarity | Are the three understanding choices and their consequences understandable? |
| U4 | Feedback visibility | Are loading, adaptation and updated support/state visibly communicated? |
| U5 | Navigation consistency | Can the evaluator find New Inquiry, History, Review/Resume and preferences without dead ends? |
| U6 | Bilingual readability | Do Burmese glyphs, line breaks and mixed English terms display legibly without clipping? Is language quality separately assessed? |
| U7 | State visibility | Are current understanding, completion and review recommendation distinguishable? |
| U8 | Error clarity | Are errors understandable, appropriately localised and accompanied by an available recovery action? |
| U9 | Consistency | Are labels, controls and interaction patterns consistent across screens/locales? |

Inspect desktop (1440 × 900) and mobile (390 × 844), English and Burmese UI, with bilingual support; inspect both themes for readability. Record actual browser/viewport and any variation. Include keyboard navigation, visible focus and preference-dialog use. Capture normal, loading, empty, error, adapted and completed/review states where reachable.

Record issue severity: **0 none observed**, **1 cosmetic**, **2 impedes a task but workaround exists**, **3 blocks completion or materially misleads**. U criterion Pass requires all planned checks executed and no severity 2/3 issue; Partial denotes severity 2 or incomplete coverage; Fail denotes severity 3. Preserve severity 1 issues even on a pass. Report evaluator judgement, not user satisfaction, measured learnability or accessibility certification.

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
./node_modules/.bin/tsc --noEmit
npm run build
```

Record missing dependencies as Blocked. If a build requires an alternative configuration, record the exact command and reason and retain the initial log. Do not use an assumed `npm test`: select/configure the test harness and record its command before white-box execution. No application tests or paid model calls are executed by preparing this document.

For modest timing analysis, use Photosynthesis, gravity, electric current, programming inheritance and pH, **three independent fresh-session attempts each** (15 initial-generation attempts). Measure start/end around the same operation boundary, preferably monotonic client request-to-response time. Record operation, elapsed milliseconds, success, timeout, retries and environment for every attempt. Report per-query and pooled successful-attempt median/min/max with sample sizes, plus failure/timeout counts separately. Log adaptation/follow-up timings descriptively without pooling unlike operations. No latency pass threshold is asserted because no service-level target is specified.

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
| A | Initial → High: key takeaway at round 1, `in_progress` → explicit Finish: `completed` |
| B | Initial → Medium: another example at round 1 → High: key takeaway at round 2, `in_progress` → explicit Finish |
| C | Initial → Needs Support: simpler explanation at round 1 → Needs Support: simpler explanation at round 2, `review_recommended` → extra Needs Support: no third adaptation |

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
| BB06 | High records response and yields key takeaway before cap; completion remains explicit |
| BB07 | Medium yields another example before cap |
| BB08 | Needs Support yields simpler explanation before cap |
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

- **WB01 adaptation:** all three support mappings, round 0/1/2, invalid rounds, status decisions and absence of model generation at cap.
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

### 10.1 Baseline/environment record

```yaml
baseline_id: TO_RECORD
protocol_version: '1.0'
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
run_id,baseline_id,case_id,path,attempt,query,preferences,session_alias,operation,understanding,round_before,round_after,status_before,status_after,output_evidence_ids,content_dimension_scores,execution_status,outcome,assessor,limitation
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

A bounded implementation claim is strongly supported only when relevant external behaviour and internal/state evidence agree and no material counterexample remains in the evaluated coverage. Literature-based plausibility remains conceptual support. Incomplete domain/language coverage yields partial evidence. An observed High response remains self-reported understanding. No outcome in this protocol establishes improved achievement or retention, universal optimality of two rounds, or superiority over a baseline system.

## 12. Completion and handover checklist

- [ ] Baseline, environment, evaluator competence and execution inputs frozen.
- [ ] C1–C5 evaluated using GenAI, literature, informed argument and conceptual scenario.
- [ ] F1–F13 and U1–U9 covered with explicit outcomes or transparent gaps.
- [ ] Static, dynamic, bounds, simulation, black-box, white-box, design argument, design scenario and design literature methods recorded.
- [ ] All 48 planned simulation sessions and 15 timing attempts accounted for, including blocked/failed cases and deviations.
- [ ] Raw evidence, logs, actual outputs, state records and all retries retained and indexed.
- [ ] Master results and PIRQOA matrix link claims to evidence and limitations.
- [ ] Design/code discrepancies and unresolved concerns remain visible; fixes have separate baseline/retest records.
- [ ] Optional expert work is labelled completed with evidence or not performed.
- [ ] Original Assignment 5 brief checked for method/rubric alignment; primary references checked before final scholarly attribution.
- [ ] Final paper written only after results exist, using the plan's presentation limits and APA 7 requirements.

Completion means the planned work is accounted for honestly, not that every test passes. Blocked or unassessed items remain coverage limitations. This protocol prepares the evaluation; it does not claim those checklist items have been completed.
