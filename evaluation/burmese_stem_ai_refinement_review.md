# Burmese STEM AI Refinement Review

## 1. Executive Summary

The current PoC is a coherent, working three-screen Next.js application with anonymous learner persistence, structured bilingual generation, bounded adaptation, concept-scoped follow-up, history, and Review/Resume support. Its overall four-layer architecture already matches the refined design.

The main mismatches with the authoritative [`complete_system_artefacts_refined.md`](complete_system_artefacts_refined.md) are:

1. Stage 6B, **“What would help you most?”**, is entirely absent from the UI, API, types, persistence, and adaptation service.
2. **“I understand”** currently generates a `key_takeaway` and consumes an adaptation round. It should fade/conclude additional support without consuming a round.
3. Stage 7 currently selects support only from `high | medium | needs_support`; it cannot distinguish Stage 5, language, conceptual, or interpretation-correction routes.
4. The persistence model cannot record the optional difficulty signal or selected adaptation route.
5. The ambiguity-correction route cannot work after session creation because the current adaptation output cannot revise the active concept, domain, or scaffold.
6. Review does not reconstruct the full interaction: completed sessions hide adaptations, and active sessions show only the latest adaptation.
7. The README and evaluation protocol still describe the old High → `key_takeaway` behaviour and therefore contain stale test oracles.

The appropriate refinement is incremental. The three-screen scope, MongoDB embedding model, service/DAO separation, two-round bound, and concept-scoped follow-up should remain.

No files were modified during the review that produced this plan.

Current audit baseline:

- Branch: `feat/evaluation_update`
- Commit: `9afc92757c1a85183063dc7ce5c15ce62d32a74d`
- Working tree: clean at the time of the review
- `npm run lint`: passed with 0 errors and 2 existing warnings
- `./node_modules/.bin/tsc --noEmit --incremental false`: passed
- Production build: not run because it would write `.next`
- Automated tests: not run because no test harness currently exists
- Formal evaluation: not executed

## 2. Repository Architecture Summary

| Layer | Current implementation | Assessment |
|---|---|---|
| User-Facing | `app/page.tsx`, `app/learn/[sessionId]/page.tsx`, `app/history/page.tsx`, `components/` | Correct three-screen structure with preferences as a modal |
| API boundary | `app/api/preferences/`, `app/api/sessions/` | Mostly thin routes with controlled errors |
| Application / Scaffolding | `services/session.service.ts`, `adaptation.service.ts`, `followup.service.ts`, `session-lifecycle.service.ts`, `profile.service.ts` | Correct location for workflow logic, but refined Stage 6/7 routing is missing |
| AI / LLM | Provider calls embedded in the three generation services | Server-side and bounded, but duplicated and difficult to test consistently |
| Data / Persistence | `data/dao/`, `data/schemas/`, MongoDB/Mongoose | Clear DAO/schema boundary; schema lacks refined response and route fields |
| Identity | `proxy.ts`, `learner.service.ts` | Appropriate anonymous UUID cookie/header design for the PoC |
| Localisation | `next-intl`, `i18n/locales/en.json`, `my.json` | Current screens localised; new Stage 6B copy will be required |
| Deployment | Docker, Compose, Nginx, Certbot, EC2 scripts | Proportionate monolithic deployment; no architectural expansion required |

The code correctly keeps:

- LLM calls server-side;
- persistence inside DAOs;
- lifecycle and adaptation bounds in application logic;
- anonymous learner identity outside request bodies;
- initial generation, adaptation, and follow-up as separate bounded operations.

The most relevant current implementation points are:

- `burmese_stem_ai/services/session.service.ts`
- `burmese_stem_ai/services/adaptation.service.ts`
- `burmese_stem_ai/data/schemas/session.schema.ts`
- `burmese_stem_ai/data/dao/session.dao.ts`
- `burmese_stem_ai/components/learn/LearningSession.tsx`

## 3. Current Implementation Audit

| Area | Current Implementation | Relevant Files | Refined Requirement | Status | Notes |
|---|---|---|---|---|---|
| Terminology identification | The initial structured LLM output returns `concept.name`. | `services/session.service.ts`, `data/schemas/session.schema.ts` | Identify the principal STEM term and allow later correction. | Partial | Explicit initially, but there is no distinct term representation or post-creation correction route. |
| Context interpretation | The LLM returns `concept.domain`; it is persisted and sent to adaptation/follow-up. Ambiguous initial input can return `422`. | `session.service.ts`, `adaptation.service.ts`, `followup.service.ts` | Establish technical context and support exceptional reinterpretation. | Partial | Initial context and initial ambiguity handling exist. Later context correction does not. |
| Language support | Initial prompt uses support preference, explanation level, learning style, and useful English-term retention. Both languages are generated and the UI chooses what to display. | `session.service.ts`, `SessionContent.tsx`, profile schema | Use concept, context, preference, useful term retention, and expressed language difficulty. | Partial | Initial strategy is broadly aligned. There is no language-difficulty route, and no persisted strategy decision. |
| Concept explanation | Simple and technical explanations contain conceptual meaning. | `session.service.ts`, `LearningSession.tsx` | Distinguish core meaning from learner-facing scaffolding where practical. | Partial | Existing contract can support the distinction without a new service, but prompts/docs currently blur Stages 4 and 5. |
| Structured scaffolding | Initial sessions always contain simple, example, technical, reflection, and hint blocks. Adaptations return one support item. | `session.service.ts`, `adaptation.service.ts`, `SessionContent.tsx` | Initial fixed structure is allowed; later forms should be selectable. | Partial | Initial structure is aligned. Adaptation selection is too limited for the refined routes. |
| Stage 6A | Three UI choices map to `high`, `medium`, and `needs_support`; latest value is persisted. | `LearningSession.tsx`, `constants.ts`, session schema | Collect overall learner-reported support need. | Aligned, with naming changes | The values may remain, but “understanding” must consistently be described as self-report rather than measurement. |
| Stage 6B | No difficulty-clarification control, type, request property, or persistence field exists. | All response-related files | Optionally ask “What would help you most?” after Medium/Needs Support. | Missing | Confirmed absent from source. |
| Stage 7 routing | `high → key_takeaway`, `medium → another_example`, `needs_support → simpler_explanation`. | `adaptation.service.ts` | Use overall signal plus optional difficulty type to choose one of the bounded routes. | Missing | Current logic is support-type mapping, not refined route selection. |
| Adaptation bound | Constant, schema, service, DAO guard, and UI all enforce a maximum of two generated adaptations. | `constants.ts`, session schema, DAO, service, UI | Maximum two adaptations; no third generation. | Aligned | Strong implementation control, but automated verification is absent. |
| Follow-up | LLM determines concept relevance using current concept, explanations, latest adaptation, preferences, and prior follow-ups. Two-question cap. | `followup.service.ts`, `FollowUpSection.tsx` | Concept-scoped clarification without becoming general chat. | Mostly aligned | It should remain separate from Stage 6 rather than silently inferring difficulty. A corrected active concept must flow into it. |
| Preferences | Support language, explanation level, and learning style persist and affect generation. UI locale uses a cookie; theme uses `localStorage`. | profile schema/service/DAO, preferences UI, header | Persist and apply relevant preferences. | Partial | Core learning preferences work. Stored `uiLanguage` and `theme` are not connected to their actual controls. |
| Persistence | Stores concept/domain, scaffold, latest response, adaptations, follow-ups, status, round, and preference snapshot. | session schema and DAO | Also preserve optional difficulty, selected route, and reconstructable response history. | Partial | Missing refined response and route traceability. |
| History | Newest-first learner-scoped summaries show concept, domain, latest response, status, and action. | `HistoryList.tsx`, session DAO | Stored sessions and Review/Resume access. | Aligned, with naming changes | “Understanding progress” and High/Medium framing should become explicit self-report wording. |
| Review / Resume | GET reconstructs full stored session. Resume restores current controls. | lifecycle service, `LearningSession.tsx` | Restore session content and state. | Partial | Completed Review hides all adaptations; only the latest adaptation is shown while active. |
| Error handling | Main session/adaptation/follow-up routes have controlled 4xx/5xx responses and provider timeouts. | API routes and services | Controlled validation, provider, scope, and state errors. | Partial | Preference GET is not guarded, error shapes differ, response/follow-up routes do not validate UUIDs, and locale cookies are not validated. |
| Architecture boundaries | Core logic is in services and DAOs; the LLM does not control status, bounds, identity, or persistence. | routes, services, DAOs | Preserve four logical layers and application control. | Mostly aligned | Duplicated provider code and duplicated domain types reduce consistency/testability, but no major rewrite is justified. |

## 4. Alignment with Refined System Artefacts

### 4.1 System Artefact 1

The operational process is partially instantiated:

- Stages 1–5 occur inside one initial structured generation operation. A separate LLM call per stage is not required.
- The initial output provides a concept, domain, bilingual explanation, example, technical detail, reflection, and hint.
- Stage 6A is present.
- Stage 6B is absent.
- Stage 7 currently chooses a support type from the Stage 6A value alone.
- The High path conflicts with fading because it generates additional content and increments the adaptation count.
- Language, conceptual, and ambiguity feedback loops are not implemented.
- The maximum-two-adaptations boundary is strongly represented.

Overall status: **Partial alignment**.

### 4.2 System Artefact 2

The four logical layers are substantially aligned:

- The browser does not call the LLM or database directly.
- Application services control state, persistence coordination, scope, and round limits.
- The LLM returns bounded structured content.
- MongoDB stores session-owned adaptations and follow-ups.

Required refinement:

- Introduce an application-controlled, deterministic route-selection function.
- Keep route selection separate from generation.
- Persist learner-reported signals and selected routes.
- Let route-specific LLM calls generate content only after the application selects the route.
- Do not let the LLM decide whether another adaptation is permitted.

Overall status: **Mostly aligned architecture with missing refined orchestration**.

### 4.3 System Artefact 3

The executable PoC already has:

- Home / Ask;
- STEM Learning Session;
- Learning History;
- preferences modal;
- bilingual structured content;
- self-report choices;
- adaptations;
- scoped follow-up;
- persistence;
- Review/Resume;
- controlled two-round interaction.

It lacks the defining new PoC behaviour:

- inline Stage 6B interaction;
- distinct persistence of overall need and difficulty type;
- refined Stage 7 routes;
- correct fade behaviour;
- correction of an active concept/context;
- complete Review reconstruction.

Overall status: **Working PoC requiring targeted Stage 6/7 alignment before formal evaluation**.

## 5. Already Aligned

No meaningful code change is required for the following foundations:

- The PoC has exactly three principal screens. Preferences remain a modal.
- Anonymous learner identity is generated server-side and is not accepted from the request body.
- Session queries are learner-scoped and history is newest-first.
- Initial generation returns a strict JSON-schema response.
- The principal concept and technical domain are explicitly returned and persisted.
- Initial ambiguous or non-STEM inquiries receive controlled scope responses.
- Initial support is generated in English and Burmese.
- The prompt explicitly permits useful English STEM terminology inside Burmese explanations.
- Support language, explanation level, and learning style inform generation.
- An initial standard scaffold is acceptable under the refined specification.
- Adaptations and follow-ups are embedded in their owning session rather than unnecessarily split into collections.
- The two-adaptation limit is enforced by service logic, schema constraints, DAO conditions, and UI controls.
- Follow-up is concept-scoped and limited to two questions.
- The LLM cannot set session status, learner identity, persistence, or round limits.
- The deployment remains a proportionate monolithic Next.js/MongoDB system.
- Authentication, LMS features, scoring, dashboards, queues, and microservices remain correctly out of scope.

## 6. Documentation / Naming Changes Only

These changes do not require new behaviour by themselves:

1. Describe `high | medium | needs_support` as internal values for an **overall learner-reported support need**, not measured understanding.
2. Change History wording such as “understanding progress” and High/Medium badges to self-report language.
3. Document Stage 4 as the core meaning represented by the explanation content and Stage 5 as the scaffold structure around it. A separate Stage 4 service or database field is unnecessary.
4. Document the two-round limit only as an implementation control.
5. Clarify that schema-valid generated output is not automatically technically or linguistically correct.
6. Remove “authenticated learner” wording from route comments; the mechanism is anonymous continuity, not authentication.
7. Update the root `README.md` and `burmese_stem_ai/README.md` from the old High → `key_takeaway` flow.
8. Version or amend `evaluation/00_protocol/evaluation_protocol.md`. Its current expected behaviour still says High consumes an adaptation round.
9. Update FURPS and simulation cases to include Stage 6B and all refined routes.
10. Document that the initial fixed scaffold is a PoC choice, while scaffold forms are selectable in later adaptations.

## 7. Implementation Gaps

| Gap | Current behaviour | Target behaviour and reason | Likely files | Complexity | Risk |
|---|---|---|---|---|---|
| Central response domain model | Values and shapes are duplicated across constants, DAO, service, and UI. Several preference constant arrays are not `as const`, weakening TypeScript unions. | Define shared overall-need, difficulty, route, support-type, and response-event types. This prevents magic strings and route drift. | `lib/constants.ts`, new shared domain file, DAO, component types | Medium | Medium |
| Stage 6B request contract | `/respond` accepts only `{ understanding }`. | Accept overall support need plus an optional bounded difficulty type. Retain temporary legacy-body compatibility during rollout. | respond route, adaptation service | Small–Medium | Medium |
| Stage 6B UI | Stage 6A submits immediately for all choices. | For Medium/Needs Support, display an inline “What would help you most?” panel with five choices and a clear skip/continue option. | `LearningSession.tsx`, locale files | Medium | Medium |
| Fade route | High generates `key_takeaway` and increments the round. | Generate no adaptation and consume no round. Preserve the explicit Finish action unless auto-completion is selected later. | adaptation service, DAO, UI | Small | Medium |
| Default Stage 5 route | Medium always means another example; Needs Support always means simpler explanation. | With no difficulty type, continue using a normal Stage 5 adaptation without claiming a diagnosed cause. | adaptation service | Small | Low |
| Explicit Stage 5 choices | No way to request a simpler explanation or another example directly. | Route the two explicit choices to their matching Stage 5 support types. | adaptation service, UI | Small | Low |
| Language route | No route can reconsider bilingual support. | Select Stage 3 → 4 → 5, use a language-specific prompt, and display both languages when needed without changing the learner’s saved profile. | adaptation service, adaptation UI/types | Medium | High |
| Conceptual route | No route distinguishes conceptual difficulty. | Select Stage 4 → 5 and generate a revised core explanation plus scaffolded clarification. | adaptation service, schema/types | Medium | Medium |
| Ambiguity route | The active concept/domain cannot be revised after creation. | Reinterpret context, revise terminology if necessary, update the active concept/support, and retain correction traceability. | adaptation/session services, schema, DAO, UI | Large | High |
| Response traceability | Only the latest top-level response and generated adaptations are stored. Fade or capped responses have no complete event history. | Add embedded response events containing overall need, optional difficulty, route, round before/after, and timestamp. | session schema and DAO | Medium | High |
| Review reconstruction | Completed sessions hide adaptations; only the latest adaptation is displayed while active. | Display the stored adaptation/response sequence during Review and restore the correct current controls during Resume. | `LearningSession.tsx`, `SessionContent.tsx` | Medium | Medium |
| Follow-up integration | Uses the original/current stored concept and latest adaptation, with no refined-route awareness. | Use the current corrected concept/support while keeping follow-up independent from automatic Stage 7 routing. | follow-up service | Small | Low |
| Error consistency | Some route/error/locale cases are inconsistent. | Validate IDs consistently, guard preference retrieval, standardise error envelopes, and validate locale cookies. | routes, learner/profile services, i18n | Small–Medium | Low |
| LLM boundary duplication | Three services duplicate model selection, timeout, fetch, extraction, and error conversion. | Extract only the provider mechanics needed for consistent testing and failure handling; keep prompts in their domain services. | new LLM helper plus three services | Medium | Medium |
| Automated verification | No automated suite exists. | Add deterministic unit, route, schema, DAO, component, and integration tests before evaluation. | package config and test directories | Medium–Large | Low |
| Evaluation oracle drift | Protocol and READMEs describe old behaviour. | Amend them before evaluation so expected results match the refined frozen specification. | READMEs, evaluation protocol and plan | Medium | Low |

## 8. Conceptual Capabilities That Do Not Need Full PoC Implementation

The following should remain conceptual or bounded:

- A deterministic automatic term-extraction algorithm. The structured LLM contract can identify the principal concept.
- Objective diagnosis of why a learner is struggling.
- Mastery scoring, quizzes, or competence measurement.
- A separate microservice or LLM call for each of the seven framework stages.
- A general adaptive-policy optimiser.
- Automatically inferring a Stage 6 difficulty type from Medium, Needs Support, or a follow-up question.
- An unrestricted chatbot or multi-topic conversation history.
- RAG, citation generation, or a verified academic knowledge base.
- Long-term learner profiling beyond anonymous preferences and sessions.
- Authentication, teacher dashboards, LMS functions, social features, queues, or Kubernetes.
- A claim that the selected route, bilingual output, or two-round limit is pedagogically optimal.
- A claim of learner improvement based on structural, black-box, or white-box testing.

The language, conceptual, and ambiguity routes should not remain merely conceptual if the final PoC claims to implement the frozen System Artefact 3. If any is intentionally deferred, it must be marked explicitly as unimplemented in the evaluation baseline.

## 9. Risks and Dependencies

- **Legacy session compatibility:** Adding required schema properties without fallbacks could make existing sessions unreadable. New fields should initially be optional, with safe defaults for historical records.
- **Ambiguity evidence:** “That is not what I meant” supplies a correction signal but not the intended interpretation. A short Stage 6B clarification input is the safest solution.
- **Language display:** A learner requesting Burmese/English help may have an English-only preference. The adaptation needs a per-response presentation override rather than silently changing the stored profile.
- **Provider nondeterminism:** Route selection must be deterministic and tested independently of the LLM. Content-quality evaluation remains separate.
- **Concurrent responses:** The DAO currently prevents two responses from persisting against the same round, although both requests could invoke the LLM first. Tests should verify state integrity and document possible wasted calls.
- **Review semantics:** Whether completed sessions permit new follow-ups is currently undefined. The existing implementation permits them.
- **Protocol drift:** Formal evaluation must not use the current High → `key_takeaway` oracle after the refinement.
- **Burmese quality:** Automated tests can verify presence, structure, scripts, and display selection, but not naturalness or technical correctness.
- **Build environment:** The final build command and any Webpack fallback must be recorded exactly rather than silently substituted.
- **Security hygiene:** `EC2KeyPair.pem` exists in the project directory but is ignored and not tracked. It should remain outside any shared evaluation bundle, and its history should be checked before repository publication.
- **Scope control:** The ambiguity branch is the only part likely to expand significantly. It should remain one bounded correction interaction, not become a chat flow.

## 10. Step-by-Step Refinement Plan

### Step 0 — Record the Pre-Refinement Baseline

- **Goal:** Capture the exact starting code, environment, contracts, and known mismatches.
- **Why This Step Comes Here:** It prevents later evaluation evidence from being mixed with the old implementation.
- **Files Likely Affected:** Future `evaluation/00_protocol/artefact_versions.md`, `environment.md`, and a discrepancy record.
- **Changes:** Record commit/worktree, package-lock hash, Node/npm/MongoDB versions, non-secret model configuration, existing commands, schema version, and the audit above.
- **What Must Not Change:** No source, database, prompt, deployment, or formal test execution.
- **Verification:** Confirm the recorded commit reproduces the inspected files and that the working-tree state is documented.
- **Completion Criteria:** A reproducible pre-refinement baseline exists and is explicitly not the final evaluation baseline.
- **Recommended Commit:** `docs: record pre-refinement poc baseline`

### Step 1 — Add a Minimal Test Harness and Guard Rails

- **Goal:** Make subsequent behavioural changes safely testable.
- **Why This Step Comes Here:** Stage 6/7 changes affect state, persistence, and provider calls; tests should exist before modifying them.
- **Files Likely Affected:** `package.json`, `package-lock.json`, `vitest.config.ts`, `tests/setup.ts`, initial `tests/unit/` files.
- **Changes:** Add Vitest and V8 coverage; configure path aliases and deterministic mocks; add tests for validation, two-round enforcement, ownership, and existing persistence invariants.
- **What Must Not Change:** Do not encode the incorrect High → `key_takeaway` behaviour as a permanent requirement.
- **Verification:** `npm test`, lint, and TypeScript checks pass.
- **Completion Criteria:** Fast unit tests run locally and can mock LLM and DAO boundaries.
- **Recommended Commit:** `test: add poc refinement test harness`

### Step 2 — Align Shared Domain Types and State Terminology

- **Goal:** Establish one canonical vocabulary for Stage 6 and Stage 7.
- **Why This Step Comes Here:** API, schema, service, and UI changes should share the same enums.
- **Files Likely Affected:** `lib/constants.ts`, a new `lib/session-domain.ts` or equivalent, `components/learn/types.ts`, `data/dao/session.dao.ts`.
- **Changes:** Define `OverallSupportNeed`, `DifficultyType`, `AdaptationRoute`, `LearnerResponseEvent`, and route-specific support types. Make enum arrays literal `as const`. Keep `understanding` as a legacy storage/API name initially if required for compatibility, but document its self-report meaning.
- **What Must Not Change:** Stored values `high | medium | needs_support`, existing session IDs, statuses, and maximum round.
- **Verification:** Type-level tests or compilation confirm invalid values cannot be assigned.
- **Completion Criteria:** No duplicate handwritten unions or scattered difficulty strings remain.
- **Recommended Commit:** `refactor: centralize learner response domain types`

### Step 3 — Extend Persistence for Response and Route Traceability

- **Goal:** Store the refined interaction without losing legacy sessions.
- **Why This Step Comes Here:** Later service/UI work requires durable response and route fields.
- **Files Likely Affected:** `data/schemas/session.schema.ts`, `data/dao/session.dao.ts`, shared types, lifecycle projection.
- **Changes:** Add an embedded response-event collection containing overall need, optional difficulty, selected route, round before/after, and timestamp. Add only route-specific adaptation metadata actually needed, such as presentation override or corrected concept. Append the event atomically with any adaptation.
- **What Must Not Change:** Existing embedded adaptations/follow-ups, learner scoping, session UUIDs, or the round maximum.
- **Verification:** Schema tests, legacy-document retrieval, response-event persistence, and concurrent update tests.
- **Completion Criteria:** Fade, adapted, and capped responses can all be reconstructed from storage.
- **Recommended Commit:** `feat: persist refined learner response events`

### Step 4 — Implement Deterministic Stage 7 Routing and Core Routes

- **Goal:** Make route selection application-controlled.
- **Why This Step Comes Here:** Route selection must be correct before specialised generation is added.
- **Files Likely Affected:** `services/adaptation.service.ts`, possibly a new `services/adaptation-routing.service.ts`, respond route.
- **Changes:** Implement a pure route selector covering High, no-difficulty Medium/Needs Support, simpler explanation, and another example. Change High to fade with no generation or round increment. At the cap, record the response but never call the LLM or create round 3.
- **What Must Not Change:** Explicit Finish can remain the lifecycle action after High; the two-round bound remains server-enforced.
- **Verification:** Branch tests for all overall-need values at rounds 0, 1, and 2; assert provider-call counts.
- **Completion Criteria:** Default Stage 5, explicit Stage 5, fade, and cap behaviour match the refined route table.
- **Recommended Commit:** `feat: implement bounded stage 7 route selection`

### Step 5 — Implement the Language-Support Route

- **Goal:** Support “Help with Burmese / English terms”.
- **Why This Step Comes Here:** It builds on the deterministic router and persistence contract.
- **Files Likely Affected:** `adaptation.service.ts`, constants/types, schema, `SessionContent.tsx`.
- **Changes:** Add the Stage 3 → 4 → 5 route; instruct the model to reconsider term retention and bilingual explanation; store the route; allow a per-adaptation bilingual presentation override.
- **What Must Not Change:** Do not alter the learner’s saved profile automatically or translate every English technical term.
- **Verification:** Unit tests inspect the selected route and prompt input; component tests confirm both languages can be displayed despite an English-only/Burmese-only session preference.
- **Completion Criteria:** The explicit language-help choice produces visibly revised language support and remains concept-scoped.
- **Recommended Commit:** `feat: add language support adaptation route`

### Step 6 — Implement the Conceptual-Clarification Route

- **Goal:** Support “I do not understand the concept”.
- **Why This Step Comes Here:** It reuses the routing and structured adaptation foundation without concept correction complexity.
- **Files Likely Affected:** `adaptation.service.ts`, support-type constants, adaptation rendering/locales.
- **Changes:** Add the Stage 4 → 5 route; request a revised core explanation plus an appropriate scaffold, clearly different from prior support.
- **What Must Not Change:** Do not treat this self-report as an objective misconception diagnosis.
- **Verification:** Route, structured-output, non-repetition, persistence, and rendering tests.
- **Completion Criteria:** Conceptual difficulty produces a concept-focused revision rather than merely selecting another example.
- **Recommended Commit:** `feat: add conceptual clarification route`

### Step 7 — Implement the Ambiguity / Misinterpretation Route

- **Goal:** Allow correction when the concept or term was not what the learner meant.
- **Why This Step Comes Here:** It is the highest-risk route and depends on the earlier state, route, and generation contracts.
- **Files Likely Affected:** adaptation and session services, session schema/DAO, respond API, learning UI types.
- **Changes:** Collect a short intended-term/context clarification within Stage 6B; rerun bounded context/terminology interpretation; update the active concept/domain and downstream support; persist the route and previous/current interpretation. Return a controlled clarification outcome if the intended meaning is still ambiguous.
- **What Must Not Change:** Do not introduce deterministic ATE, an unrestricted conversation, or an eighth stage.
- **Verification:** Tests using `cell`, `current`, `network`, and `inheritance`; verify corrections, remaining ambiguity, ownership, persistence, and downstream support.
- **Completion Criteria:** A mistaken interpretation can be corrected without replacing the session or losing traceability.
- **Recommended Commit:** `feat: add bounded concept correction route`

### Step 8 — Add the Stage 6B Learner Interface

- **Goal:** Expose the refined response workflow simply inside the Learning Session screen.
- **Why This Step Comes Here:** All selectable options should have completed backend behaviour before they become visible.
- **Files Likely Affected:** `LearningSession.tsx`, `SessionContent.tsx`, component types, `en.json`, `my.json`.
- **Changes:** Keep the three Stage 6A choices. For Medium/Needs Support, show “What would help you most?” with five bounded choices plus a clear skip/continue-without-a-choice action. Show pending, adapting, route, limit, and error states.
- **What Must Not Change:** No fourth screen, free-form chat panel, or forced difficulty selection.
- **Verification:** Component tests for High, both support-needed choices, every Stage 6B choice, skip, cancellation, loading, retry, mobile layout, and keyboard interaction.
- **Completion Criteria:** A learner can complete every refined route from one clear two-level interaction.
- **Recommended Commit:** `feat: add optional stage 6b support choices`

### Step 9 — Align Initial and Adaptation LLM Contracts

- **Goal:** Make prompts and structured output explicitly match Stages 1–5.
- **Why This Step Comes Here:** Behavioural routes now establish what each generation request must produce.
- **Files Likely Affected:** `session.service.ts`, `adaptation.service.ts`, structured schemas and validators.
- **Changes:** Clarify terminology/context identification, language-strategy constraints, Stage 4 core meaning, and Stage 5 scaffold selection. Keep one initial generation call. Add route-specific schemas only where the returned shape materially differs.
- **What Must Not Change:** The LLM must not choose lifecycle, route permission, round count, learner identity, or persistence.
- **Verification:** Mock-output acceptance/rejection tests and prompt-contract inspection.
- **Completion Criteria:** Every route has a bounded structured contract and malformed outputs fail before persistence.
- **Recommended Commit:** `refactor: align llm contracts with refined stages`

### Step 10 — Reconcile Concept-Scoped Follow-Up

- **Goal:** Ensure follow-up remains compatible with the refined workflow.
- **Why This Step Comes Here:** It must receive any corrected active concept and revised support.
- **Files Likely Affected:** `followup.service.ts`, follow-up route and component.
- **Changes:** Send the current active concept, latest relevant scaffold, latest response route, and preferences. Do not automatically convert follow-up wording into a difficulty type. Retain the two-question limit and unrelated-topic response.
- **What Must Not Change:** Follow-up must not become Stage 6, consume adaptation rounds, or create a general chat system.
- **Verification:** Relevant supporting-subconcept, unrelated-concept, corrected-concept, limit, provider-failure, and persistence tests.
- **Completion Criteria:** Follow-up uses current session context and cannot silently alter Stage 7 state.
- **Recommended Commit:** `fix: align follow-up with active session context`

### Step 11 — Complete State Continuity, History, Review, and Preferences

- **Goal:** Make persisted state reconstructable and evaluation-ready.
- **Why This Step Comes Here:** The complete refined response history is now available.
- **Files Likely Affected:** `LearningSession.tsx`, `SessionContent.tsx`, `HistoryList.tsx`, lifecycle service, locale files, preference documentation.
- **Changes:** Render all stored adaptations and response events during Review; restore the correct next action during Resume; label history as self-reported support. Define whether UI locale/theme are browser preferences or synchronised profile fields.
- **What Must Not Change:** History stays learner-scoped and newest-first; preferences remain a modal.
- **Verification:** Review and Resume component/API tests for every status, round, route, legacy session, and missing preference snapshot.
- **Completion Criteria:** Reloading or reopening a session preserves the visible interaction state and route history.
- **Recommended Commit:** `feat: reconstruct refined sessions in review and resume`

### Step 12 — Harden Provider and Controlled Error Boundaries

- **Goal:** Make failures consistent and testable.
- **Why This Step Comes Here:** Functional behaviour should be stable before shared mechanics are extracted.
- **Files Likely Affected:** a small shared LLM helper, three LLM services, API routes, `i18n/request.ts`.
- **Changes:** Centralise provider URL/model/timeout/output-text extraction; preserve domain-specific prompts and validators. Validate response/follow-up session UUIDs, guard preference GET, standardise error envelopes, and validate the locale cookie.
- **What Must Not Change:** No automatic retry policy unless deliberately justified; no raw provider errors in the learner UI.
- **Verification:** Timeout, non-2xx, missing output, invalid JSON, invalid schema, database failure, invalid UUID, and invalid locale tests.
- **Completion Criteria:** Expected failures return stable codes without corrupting state.
- **Recommended Commit:** `refactor: standardize llm and api error boundaries`

### Step 13 — Align Terminology and Documentation

- **Goal:** Remove discrepancies between code, the refined artefacts, and evaluation oracles.
- **Why This Step Comes Here:** Documentation should describe implemented behaviour, not planned behaviour.
- **Files Likely Affected:** root `README.md`, `burmese_stem_ai/README.md`, `evaluation/00_protocol/evaluation_protocol.md`, Assignment 5 plan.
- **Changes:** Document Stage 6A/6B, route table, fade semantics, response-event persistence, two-round meaning, claim boundaries, and actual test commands. Version the protocol and retain a discrepancy record for the previous oracle.
- **What Must Not Change:** Do not rewrite completed conceptual evidence as though it had originally specified the new implementation.
- **Verification:** Cross-reference audit against constants, schema, service routes, UI labels, and test IDs.
- **Completion Criteria:** No document claims High consumes a round or that Stage 6B exists where code does not support it.
- **Recommended Commit:** `docs: align poc contracts with refined artefacts`

### Step 14 — Complete Automated Refinement Coverage

- **Goal:** Establish the structural evidence needed before formal evaluation.
- **Why This Step Comes Here:** Tests should now validate the final behaviour rather than an intermediate contract.
- **Files Likely Affected:** unit, service, API, component, and database integration test directories; package scripts.
- **Changes:** Add route-table coverage, schema/DAO tests, LLM-contract tests, API tests, UI tests, persistence/concurrency tests, and legacy-session tests.
- **What Must Not Change:** Coverage must not be reported as educational or content-quality evidence.
- **Verification:** Run the complete deterministic suite, V8 coverage, isolated MongoDB tests, lint, and TypeScript.
- **Completion Criteria:** Every refined route, boundary, error, and persistence transition has meaningful assertions.
- **Recommended Commit:** `test: cover refined scaffolding workflow`

### Step 15 — Freeze the Assignment 5 Evaluation Baseline

- **Goal:** Produce the exact build that formal evaluation will assess.
- **Why This Step Comes Here:** Evaluation must begin only after behaviour, documentation, and tests agree.
- **Files Likely Affected:** evaluation baseline/environment records and evidence index only.
- **Changes:** Record clean commit/tag, dependency lock hash, prompts/schema hashes, Node/npm/MongoDB/browser versions, model configuration, test commands, and deployment commit. Run lint, TypeScript, tests, integration tests, and production build.
- **What Must Not Change:** Do not silently fix failures after evidence capture; changes require a new baseline and affected-test rerun.
- **Verification:** Fresh-checkout reproduction and clean worktree after all checks.
- **Completion Criteria:** One reproducible baseline is designated for FURPS, static/dynamic analysis, simulation, black-box, white-box, and usability inspection.
- **Recommended Commit:** `docs: freeze assignment 5 evaluation baseline`

## 11. Testing Strategy for the Refinements

| Level | Main coverage |
|---|---|
| Pure unit tests | Input validation, route selection, support selection, status decisions, cap decisions, prompt construction |
| Service tests with mocks | Provider-call/no-call behaviour, structured output validation, errors, lifecycle coordination |
| Schema tests | Enums, optional Stage 6B field, response events, routes, rounds 0–2, legacy records |
| DAO integration tests | Atomic response/adaptation persistence, ownership, ordering, stale updates, concurrent requests |
| Route tests | Body validation, UUIDs, status codes, error envelopes, ownership, provider failures |
| Component tests | Stage 6A/6B interaction, optional skip, loading/errors, route feedback, adaptation history, Review/Resume |
| Black-box tests | Observable API/UI behaviour against the refined route table |
| Live simulation | Cross-domain terminology/context and generated-content behaviour, kept separate from deterministic tests |

Minimum route matrix:

| Overall support need | Difficulty | Expected route | Round effect |
|---|---|---|---|
| High | None | Fade / explicit completion | No increment |
| Medium | None | Normal Stage 5 | Increment if below cap |
| Needs Support | None | Stronger normal Stage 5 | Increment if below cap |
| Medium/Needs Support | Simpler | Stage 5 simpler explanation | Increment |
| Medium/Needs Support | Another example | Stage 5 example/analogy | Increment |
| Medium/Needs Support | Language terms | Stage 3 → 4 → 5 | Increment |
| Medium/Needs Support | Concept unclear | Stage 4 → 5 | Increment |
| Medium/Needs Support | Wrong concept/term | Stage 2 → Stage 1 if needed → 3 → 4 → 5 | Increment |
| Any support-requesting route at round 2 | Any | Record signal, no third generation | Remain 2 |

Ambiguity cases should include:

- `cell`: biological, battery, spreadsheet;
- `current`: electrical versus ordinary present-state meaning;
- `network`: computer, biological, or social;
- `inheritance`: programming versus genetics.

Deterministic tests should mock the provider. Real LLM simulation should separately assess:

- plausible concept/domain;
- technical correctness;
- contextual relevance;
- Burmese adequacy;
- useful English-term retention;
- meaningful difference between adaptations.

None of those tests alone establishes improved learning.

## 12. FURPS Readiness After Refinement

### Functionality

The plan prepares explicit, testable contracts for:

- valid and invalid inquiry handling;
- terminology and technical-context representation;
- bilingual support and useful English-term retention;
- structured initial scaffolding;
- Stage 6A overall support need;
- optional Stage 6B difficulty clarification;
- each Stage 7 route;
- fade behaviour;
- two-round enforcement;
- concept-scoped follow-up;
- session and preference persistence;
- history;
- full Review/Resume reconstruction;
- controlled validation, LLM, database, and lifecycle errors.

### Usability Inspection

The refined UI should allow structured inspection of:

- whether the three Stage 6A choices clearly communicate support need;
- whether “What would help you most?” is distinguishable from another understanding test;
- whether Stage 6B is visibly optional;
- whether a skip action is understandable;
- whether the learner can see that support has changed;
- whether the selected adaptation route is reflected in the support label;
- whether maximum-support and completion states are visible;
- whether Review and Resume lead to the expected state;
- whether Burmese and English remain readable across support preferences;
- whether navigation and interaction patterns remain consistent across the three screens.

This would establish inspection readiness only. It would not mean usability has been measured with learners.

## 13. Recommended Final Evaluation Baseline

Use the post-Step-14 commit—not the currently inspected commit—as the formal `B01` baseline.

The baseline record should contain:

- full Git commit and clean/dirty worktree record;
- tag or baseline identifier;
- source and lockfile hashes;
- prompt and JSON-schema hashes;
- Node, npm, Next.js, MongoDB, browser, OS, and viewport;
- model name and non-secret generation settings;
- database reset/isolation procedure;
- exact lint, type-check, test, coverage, integration, and build commands;
- deployed commit if it differs from the local baseline;
- known warnings and unresolved issues;
- evaluator identity/role and timestamp;
- explicit claim boundaries.

Recommended checks:

```bash
npm run lint
./node_modules/.bin/tsc --noEmit --incremental false
npm test
npm run test:coverage
npm run test:integration
npm run build
```

If the normal build fails for an environment-specific Turbopack or font/network reason, record that failure first and then run the documented Webpack fallback. Do not silently replace the original result.

Formal evaluation should begin only when:

- code and refined artefacts agree;
- protocol oracles match the implementation;
- all route decisions are observable and persistable;
- no round-three path exists;
- the final commit is frozen;
- deterministic structural tests are complete.

## 14. Questions / Uncertainties Requiring My Decision

Three decisions should be confirmed before their affected steps are implemented:

1. **Wrong concept/term clarification:** The recommendation is to ask for one short “What concept or context did you mean?” response inside Stage 6B. A mismatch flag alone does not provide enough information for reliable correction.

2. **High/fade completion:** The recommendation is to retain the current explicit Finish button, but High should generate no adaptation and consume no round. Automatic completion is also possible, but is a larger lifecycle change and is not required by the specification.

3. **Completed-session follow-ups:** The current system permits follow-ups during Review. Decide whether Review should be read-only. The recommendation is to allow review of stored follow-ups but prevent new follow-ups after `completed`, which produces a clearer lifecycle and more stable evaluation baseline.

Everything else can proceed using the recommendations above without expanding the PoC scope.
