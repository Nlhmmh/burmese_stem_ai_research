# Step 12 — Bounds Analysis Test Cases

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP12-BOUNDS-CASES-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version `2.1` |
| Status | Completed; BND-01–BND-17 passed |
| Evaluator / run ID | Codex technical execution under user direction / `RUN-B01-20261001-BOUNDS-01` |

## Purpose and claim boundary

Test the implemented maximum of two generated adaptations and related state
invariants. Passing these cases supports bounded interaction under evaluated
conditions. It does not show that two rounds are educationally optimal,
globally optimal, or suitable for every learner.

## Invariants checked in every case

- `adaptationRound` is an integer from 0 to 2.
- It counts generated, persisted adaptations only.
- Each generated adaptation has a matching round and response event.
- Fade and capped responses append an event but do not increment the round.
- No response creates adaptation round 3.
- High remains `in_progress`; non-High at round 2 is
  `review_recommended`; explicit Finish is required for `completed`.
- Provider-call count agrees with whether generation is permitted.
- Concurrent stale writes do not create duplicate events/adaptations.

## Preconditions

- [x] Verify B01/protocol and record the formal run.
- [x] Use dedicated artificial aliases and database.
- [x] Use deterministic provider instrumentation for call-count assertions.
- [x] Use a real isolated evaluation database for BND-14/BND-15/BND-16.
- [x] Capture state before/after: round, status, understanding, adaptation
  count, response-event count, latest route, and provider-call count.

## Cases

### BND-01 — Initial state

Create a valid session.

**Expected:** round 0; zero adaptations/events; `in_progress`; understanding
null.

### BND-02 — First generated adaptation

At round 0, send Medium with no Stage 6B choice.

**Expected:** route `stage_5_scaffold`/`another_example`; one provider call;
event 0→1; one adaptation at round 1; stored round 1; `in_progress`.

### BND-03 — Second generated adaptation

At round 1, send Needs Support + `concept_unclear`.

**Expected:** route `concept_clarification`; one provider call; event 1→2;
second adaptation at round 2; stored round 2; `review_recommended`.

### BND-04 — Medium at cap

At round 2, send Medium with no Stage 6B choice.

**Expected:** route `stage_5_scaffold`; event 2→2; no provider call or third
adaptation; round remains 2; status `review_recommended`.

### BND-05 — Needs Support at cap

At round 2, send Needs Support + `simpler_explanation`.

**Expected:** route `stage_5_scaffold`; event 2→2; no provider call or third
adaptation; round 2; `review_recommended`.

### BND-06 — Language route at cap

At round 2, send Medium + `language_terms`.

**Expected:** route `language_support`; event 2→2; no provider call,
presentation-generated adaptation, or round 3; `review_recommended`.

### BND-07 — Concept route at cap

At round 2, send Needs Support + `concept_unclear`.

**Expected:** route `concept_clarification`; event 2→2; no provider call or
third adaptation; `review_recommended`.

### BND-08 — Concept mismatch at cap

At round 2, send Needs Support + `concept_mismatch` with a valid clarification.

**Expected:** route `context_reinterpretation`; outcome `limit_reached`; trace
preserves previous/current concept unchanged; event 2→2; no provider call,
concept update, adaptation, or round 3.

### BND-09 — High/fade at round 0

Send High on a fresh session.

**Expected:** route `fade`; event 0→0; no provider call/adaptation/increment;
status `in_progress`.

### BND-10 — High/fade at round 1

After one generated adaptation, send High.

**Expected:** route `fade`; event 1→1; no provider call/new adaptation;
round 1; status `in_progress`.

### BND-11 — High/fade at round 2

After two generated adaptations, send High.

**Expected:** route `fade`; event 2→2; no provider call/new adaptation;
round 2; status `in_progress` rather than automatic completion.

### BND-12 — Complete an in-progress session

Complete a round-0 or faded `in_progress` session.

**Expected:** status becomes `completed`; content/history/round remain intact.

### BND-13 — Complete a review-recommended session and repeat

Complete a round-2 `review_recommended` session, then repeat the request.

**Expected:** first request stores `completed`; second is idempotent with no
additional mutation.

### BND-14 — Reject response after completion

Send any allowed learner response to BND-12/BND-13 after completion.

**Expected:** HTTP 409 `SESSION_RESPONSE_CONFLICT`; no response event,
adaptation, provider call, round change, or status change.

### BND-15 — Concurrent generated adaptation near cap

Against the same real-database round-1 snapshot, issue two generation-capable
responses concurrently.

**Expected:** at most one atomic write succeeds; final round is 2; exactly two
total adaptations and one new response event exist; the losing operation is a
controlled conflict, not a duplicate round-2 save.

### BND-16 — Concurrent capped responses

Against the same real-database round-2/event-count snapshot, issue two capped
responses concurrently.

**Expected:** at most one event append succeeds; no provider call/adaptation;
round remains 2; losing operation is controlled conflict.

### BND-17 — Invalid stored round guard

Using a controlled internal fixture only, present round -1, non-integer, or >2
to the adaptation service.

**Expected:** controlled conflict before provider or persistence invocation.
Do not corrupt the formal database to create this case.

## Execution register

| Case | Required mode | Execution status | Outcome | Evidence IDs | Actual counts/state |
| --- | --- | --- | --- | --- | --- |
| BND-01 | Real DB | Executed | Pass | E014–E017 | round 0; 0 adaptations/events; `in_progress`; null self-report; 0 provider calls |
| BND-02 | Instrumented provider + DB | Executed | Pass | E014–E017 | 0→1; 1 adaptation/event; `in_progress`; 1 provider call |
| BND-03 | Instrumented provider + DB | Executed | Pass | E014–E017 | 1→2; 2 adaptations/events; `review_recommended`; 1 provider call during action |
| BND-04 | Instrumented provider + DB | Executed | Pass | E014–E017 | 2→2; adaptations stay 2; events 2→3; 0 provider calls |
| BND-05 | Instrumented provider + DB | Executed | Pass | E014–E017 | 2→2; adaptations stay 2; events 2→3; 0 provider calls |
| BND-06 | Instrumented provider + DB | Executed | Pass | E014–E017 | `language_support`; 2→2; adaptations stay 2; events 2→3; 0 provider calls |
| BND-07 | Instrumented provider + DB | Executed | Pass | E014–E017 | `concept_clarification`; 2→2; adaptations stay 2; events 2→3; 0 provider calls |
| BND-08 | Instrumented provider + DB | Executed | Pass | E014–E017 | `context_reinterpretation`; `limit_reached`; unchanged concept; 2→2; 0 provider calls |
| BND-09 | Instrumented provider + DB | Executed | Pass | E014–E017 | fade 0→0; 0 adaptations; 1 event; `in_progress`; 0 provider calls |
| BND-10 | Instrumented provider + DB | Executed | Pass | E014–E017 | fade 1→1; 1 adaptation; events 1→2; `in_progress`; 0 provider calls |
| BND-11 | Instrumented provider + DB | Executed | Pass | E014–E017 | fade 2→2; 2 adaptations; events 2→3; `in_progress`; 0 provider calls |
| BND-12 | Real DB | Executed | Pass | E014–E017 | round-0 `in_progress`→`completed`; content/history/round unchanged; 1 completion write |
| BND-13 | Real DB | Executed | Pass | E014–E017 | round-2 `review_recommended`→`completed`; repeat made no second write |
| BND-14 | Public API + real DB | Executed | Pass | E014–E017 | HTTP 409 `SESSION_RESPONSE_CONFLICT`; no provider/write/mutation |
| BND-15 | Real DB concurrency | Executed | Pass | E014–E017 | same round-1 snapshot; 1 success/1 conflict; final round/adaptations/events = 2/2/2; 2 provider calls |
| BND-16 | Real DB concurrency | Executed | Pass | E014–E017 | same round-2 snapshot; 1 success/1 conflict; final round/adaptations/events = 2/2/3; 0 provider calls |
| BND-17 | Deterministic internal + isolated DB | Executed | Pass | E014–E017 | -1, 0.5 and 3 each rejected before provider or response-persistence invocation |

## Per-case record

Record case/attempt, initial fixture, action, expected assertions, actual HTTP/
service result, provider-call count, state before/after, execution status,
outcome, evidence IDs, conflict details, and limitations.

## Completion criteria

- BND-01–BND-17 are executed or transparently accounted for.
- All three responses are checked at round 2.
- Fade is checked at rounds 0, 1, and 2.
- Completion, idempotence, and post-completion rejection are checked.
- Both real-database concurrency cases preserve stored invariants.
- F5–F7/F9/F11/F13 and the evidence register are updated.

## Completion record

Step 12 completed under `RUN-B01-20261001-BOUNDS-01`. BND-01–BND-17 all
passed using deterministic provider instrumentation and real isolated MongoDB
persistence. Both concurrency cases began from the same snapshot and preserved
the stored bound. Evidence E014–E017 retains the attempts, exact runner,
machine results and analysed conclusion. The result does not claim that two
adaptations are pedagogically or globally optimal.
