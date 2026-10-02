# Step 14 — Black-Box Test Cases

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP14-BLACKBOX-CASES-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version `2.1` |
| Status | Planned; no black-box case executed by this file |
| Evaluator / run ID | `TO RECORD` |

## Method rule

Execute through public UI/API boundaries. Do not inspect source code to decide
the actual outcome during execution. Source inspection was used only to freeze
the expected B01 HTTP/error contract below.

Use dedicated artificial learners `BB-OWNER-A` and `BB-OWNER-B`. Preserve exact
request/action, response, visible UI, and stored state only where persistence is
a predefined assertion. A screenshot alone does not prove content quality or
persistence.

## Common public contract

| Operation | Endpoint |
| --- | --- |
| Create/list sessions | `POST/GET /api/sessions` |
| Retrieve/complete session | `GET/PATCH /api/sessions/{sessionId}` |
| Learner response | `POST /api/sessions/{sessionId}/respond` |
| Follow-up | `POST /api/sessions/{sessionId}/followup` |
| Preferences | `GET/PATCH /api/preferences` |

Success responses use HTTP 200 except session creation, which uses 201. Error
responses must use `{ "error": { "code": ..., "message": ... } }` and must
not expose provider, database, stack, token, or credential detail.

## Cases

### BB01 — Valid STEM inquiry

- **Precondition:** Owner A, bilingual/beginner/guided preferences; controlled
  ready provider output or recorded live provider.
- **Input:** `What is photosynthesis, and how do plants make food?`
- **Expected:** HTTP 201; one retrievable session; correct ID linkage;
  `in_progress`, round 0, understanding null; concept/domain and structured
  support present; no adaptation/event/follow-up yet.
- **Mapping:** F1–F4, F9; REQ-01–03/RQ1–RQ3.

### BB02 — Empty, whitespace, malformed, and missing inquiry

- **Inputs:** `{ "question": "" }`, whitespace, missing `question`, non-string,
  malformed JSON.
- **Expected:** HTTP 400 `INVALID_SESSION_REQUEST`; no provider call/session
  creation or database mutation.
- **Mapping:** F1, F13; U8.

### BB03 — Explicit technical context and ambiguous pair

- **Contextualised input:** `What does current mean in an electric circuit?`
- **Expected contextualised result:** HTTP 201; electric-current concept and
  electrical domain, not generic “current”.
- **Ambiguous input:** `What is current?`
- **Expected ambiguous result:** explicit qualified interpretation or HTTP 422
  `AMBIGUOUS_STEM_CONTEXT`; no unmarked confident guess. If HTTP 422, no
  session is created.
- **Mapping:** F2, F13; REQ-01/RQ1.

### BB04 — Language preference behaviour

Execute one fresh session under each support-language preference: bilingual,
Burmese, and English.

- **Expected:** preference PATCH/GET returns HTTP 200; new session returns 201;
  visible output follows presentation preference while stored bilingual fields
  remain valid; useful English terminology is retained where appropriate;
  no observed material mistranslation by the qualified assessor.
- **Mapping:** F3, F12; U6; REQ-01/RQ1.

### BB05 — Required support structure

- **Input:** valid ready STEM inquiry.
- **Expected:** simple explanation, real-world example/analogy, technical
  explanation, reflective prompt, and optional revealable hint are present,
  meaningful, and distinguishable.
- **Mapping:** F4; U2; REQ-02/RQ2.

### BB06 — High/fade

- **Payload:** `{ "overallSupportNeed": "high" }`.
- **Expected:** HTTP 200; route `fade`; response event 0→0; adaptation null;
  round 0; `in_progress`; no provider call; explicit Finish remains available.
- **Mapping:** F5–F7, F9; U4, U7; REQ-03/RQ3.

### BB07 — Default Stage 5 routes

Use two fresh sessions.

- **Medium payload:** `{ "overallSupportNeed": "medium" }` → HTTP 200,
  `stage_5_scaffold` + `another_example`, event 0→1.
- **Needs Support payload:** `{ "overallSupportNeed": "needs_support" }` →
  HTTP 200, `stage_5_scaffold` + `simpler_explanation`, event 0→1.
- **Expected for both:** one distinct generated/persisted adaptation and one
  round increment.
- **Mapping:** F5–F7, F9; REQ-03/RQ3.

### BB08 — Every explicit Stage 6B route and skip

Execute a fresh below-cap session for each choice:

| Choice | Expected route/support |
| --- | --- |
| `simpler_explanation` | `stage_5_scaffold` / `simpler_explanation` |
| `another_example` | `stage_5_scaffold` / `another_example` |
| `language_terms` | `language_support` / `clarification`, bilingual override |
| `concept_unclear` | `concept_clarification` / `concept_clarification` |
| `concept_mismatch` + clarification | `context_reinterpretation` / `concept_correction`, explicit outcome and trace |
| omitted choice | Default from BB07 |

Each valid request returns HTTP 200. Generated content must be route-appropriate
and non-repetitive; the event/adaptation persists. Concept mismatch without a
clarification is HTTP 400 `INVALID_UNDERSTANDING_RESPONSE` with no mutation.

**Mapping:** F2–F7, F9, F12; U3–U4, U6–U7; RQ1–RQ3.

### BB09 — First adaptation persistence

- **Action:** Execute one generation-capable response and reload/retrieve.
- **Expected:** HTTP 200; round 1; one matching response event/adaptation;
  fields survive retrieval; no duplicate write.
- **Mapping:** F6, F7, F9, F11; RQ3.

### BB10 — Second adaptation persistence

- **Action:** Execute a second generation-capable response at round 1.
- **Expected:** HTTP 200; round 2; two matching adaptations/events;
  non-High response produces `review_recommended`; retrieval agrees.
- **Mapping:** F6, F7, F9, F11; RQ3.

### BB11 — Attempt beyond two adaptations

- **Action:** At round 2, send a further Needs Support response.
- **Expected:** HTTP 200; event 2→2; no provider call, third adaptation, or
  round 3; `review_recommended`; UI communicates the limit.
- **Mapping:** F5–F7, F9; U4, U7; RQ3.

### BB12 — Relevant follow-up

- **Input:** `Why do plants need sunlight for photosynthesis?`
- **Expected:** HTTP 200; answer remains within active Photosynthesis context;
  exact question/answer persists once; Stage 7 route/round/state does not
  change.
- **Mapping:** F8, F9; REQ-02–03/RQ2–RQ3.

### BB13 — Unrelated follow-up

- **Input:** `How does gravity work?` in a Photosynthesis session.
- **Expected:** HTTP 422 `FOLLOW_UP_OUT_OF_SCOPE` with
  `newSessionRecommended: true`; no answer persists; current session state is
  unchanged.
- **Mapping:** F8, F13; U8; REQ-03/RQ3.

### BB14 — Learning History and ordering

- **Action:** Create at least two owner-A sessions with distinguishable update
  times plus one owner-B session; GET owner-A history.
- **Expected:** HTTP 200; only owner-A sessions, newest-first; concept,
  self-reported support need, status, and timestamps are accurate.
- **Mapping:** F9, F10; U5, U7; RQ3.

### BB15 — Review

- **Action:** Open a completed/reviewable session from History.
- **Expected:** HTTP 200; initial content, active concept, all adaptations,
  response events, follow-ups, preferences snapshot, round and status match
  stored state; review causes no mutation.
- **Mapping:** F9, F11; U5, U7; RQ3.

### BB16 — Resume

- **Action:** Reload/reopen unfinished sessions at rounds 0, 1, and 2.
- **Expected:** HTTP 200; correct content/history/round/status and next action;
  existing limits still apply; no duplicate or reset.
- **Mapping:** F7, F9, F11; U4, U5, U7; RQ3.

### BB17 — Preference persistence and snapshots

- **Action:** PATCH valid preferences, GET/reload them, create session A,
  change profile preferences, reopen A, and create session B.
- **Expected:** PATCH/GET 200; valid settings persist; A retains its original
  snapshot; B uses updated preferences; invalid/unknown preference fields are
  HTTP 400 `INVALID_PREFERENCE_REQUEST` without mutation.
- **Mapping:** F12, F13; U5, U9; RQ1/RQ3.

### BB18 — Controlled provider/API failure

Use fault injection; do not wait for random failure.

| Boundary | Expected |
| --- | --- |
| Initial provider timeout/non-2xx | HTTP 502 `SESSION_GENERATION_FAILED`; no session |
| Adaptation provider timeout/non-2xx | HTTP 502 `ADAPTATION_GENERATION_FAILED`; existing session unchanged |
| Follow-up provider timeout/non-2xx | HTTP 502 `FOLLOW_UP_GENERATION_FAILED`; no follow-up appended |

All messages are learner-safe; no raw provider detail or automatic retry.

**Mapping:** F13; U4, U8.

### BB19 — Malformed structured model output

Inject missing output, invalid JSON, wrong type/missing required field, and
domain-invalid structured output for initial/adaptation/follow-up paths.

**Expected:** corresponding HTTP 502 generation error; invalid content is not
persisted; existing valid state is unchanged; UI shows controlled recovery.

**Mapping:** F13; U8.

### BB20 — Inquiry length boundary

Use a controlled ready provider response so this isolates request validation.

- **1,000 characters:** request passes validation and returns HTTP 201.
- **1,001 characters:** HTTP 400 `INVALID_SESSION_REQUEST`, no provider call or
  session.
- **Mapping:** F1, F13.

### BB21 — Follow-up length and count boundaries

Use controlled related output.

- **500 characters:** HTTP 200 and one persisted follow-up.
- **501 characters:** HTTP 400 `INVALID_FOLLOW_UP_REQUEST`, no provider call/save.
- **Third follow-up:** HTTP 409 `FOLLOW_UP_LIMIT_REACHED`, no provider call or
  third save.
- **Mapping:** F8, F9, F13.

### BB22 — Anonymous learner isolation

- **Action:** Owner B attempts owner A detail, response, follow-up and History
  access; also test absent identity.
- **Expected:** foreign session operations are HTTP 404 `SESSION_NOT_FOUND` and
  owner-B History excludes owner A; absent identity is HTTP 400
  `LEARNER_IDENTITY_UNAVAILABLE`; no foreign mutation.
- **Mapping:** F9–F11, F13.

### BB23 — Invalid response and session identifiers

| Input | Expected |
| --- | --- |
| Unknown support value | HTTP 400 `INVALID_UNDERSTANDING_RESPONSE` |
| High plus difficulty | HTTP 400 `INVALID_UNDERSTANDING_RESPONSE` |
| Conflicting legacy/canonical response values | HTTP 400 `INVALID_UNDERSTANDING_RESPONSE` |
| Invalid UUID | HTTP 400 `INVALID_SESSION_ID` |
| Valid missing UUID | HTTP 404 `SESSION_NOT_FOUND` |
| Invalid completion body/status | HTTP 400 `INVALID_SESSION_UPDATE` |

No failing request mutates state or calls the provider when validation can
reject it first.

**Mapping:** F5, F13; U8.

### BB24 — Completion and post-completion response

- **Action:** PATCH `{ "status": "completed" }`, repeat it, then POST a valid
  learner response.
- **Expected:** first and repeated completion return HTTP 200 with `completed`;
  repeat is idempotent; response returns HTTP 409
  `SESSION_RESPONSE_CONFLICT`; no post-completion event/adaptation/provider
  call.
- **Mapping:** F7, F9, F11, F13; U7–U8.

## Execution register

| Case | Execution status | Outcome | Evidence IDs | Actual/deviation |
| --- | --- | --- | --- | --- |
| BB01 | Not run | Not assessed | — | — |
| BB02 | Not run | Not assessed | — | — |
| BB03 | Not run | Not assessed | — | — |
| BB04 | Not run | Not assessed | — | — |
| BB05 | Not run | Not assessed | — | — |
| BB06 | Not run | Not assessed | — | — |
| BB07 | Not run | Not assessed | — | — |
| BB08 | Not run | Not assessed | — | — |
| BB09 | Not run | Not assessed | — | — |
| BB10 | Not run | Not assessed | — | — |
| BB11 | Not run | Not assessed | — | — |
| BB12 | Not run | Not assessed | — | — |
| BB13 | Not run | Not assessed | — | — |
| BB14 | Not run | Not assessed | — | — |
| BB15 | Not run | Not assessed | — | — |
| BB16 | Not run | Not assessed | — | — |
| BB17 | Not run | Not assessed | — | — |
| BB18 | Not run | Not assessed | — | — |
| BB19 | Not run | Not assessed | — | — |
| BB20 | Not run | Not assessed | — | — |
| BB21 | Not run | Not assessed | — | — |
| BB22 | Not run | Not assessed | — | — |
| BB23 | Not run | Not assessed | — | — |
| BB24 | Not run | Not assessed | — | — |

## Per-attempt record

Record test/attempt ID, baseline/protocol/run, evaluator/time, preconditions,
learner alias, dependency mode, locale/viewport/preferences, exact input/steps,
expected assertions, actual HTTP/UI/state, execution status, per-assertion
outcome, evidence IDs, FURPS/REQ/RQ mapping, issue, retry, and limitation.

## Completion criteria

- BB01–BB24 and every listed subcase are executed or transparently accounted
  for.
- Each mandatory assertion has its own outcome.
- First failures, retries, screenshots, exact outputs, and required state
  evidence are retained.
- Content adequacy and structural validity remain separate.
- F1–F13 and the evidence register are updated from actual evidence only.

