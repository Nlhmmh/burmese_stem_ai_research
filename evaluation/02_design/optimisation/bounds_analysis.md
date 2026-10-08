# Step 12 — Bounds Analysis Results

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP12-BOUNDS-RESULT-01` |
| Run ID | `RUN-B01-20261001-BOUNDS-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version 2.1 |
| Evaluator | Codex technical execution under user direction |
| Execution status | Completed |
| Overall outcome | Pass: BND-01–BND-17 passed |

## Outcome

All 17 planned bounds cases passed against the frozen B01 application using a
real temporary MongoDB and deterministic provider instrumentation. The tested
state never exceeded adaptation round 2, no capped or fade response created an
adaptation, completion remained explicit, completed sessions rejected further
responses, and both same-snapshot concurrency races preserved stored
invariants.

This supports bounded interaction and application-controlled state under the
evaluated conditions. It does not establish that two adaptations are
educationally optimal, globally optimal, or suitable for every learner.

## Execution design

- Every case used the real session DAO and isolated MongoDB 8.2.6 database
  `burmese_stem_bounds_test`.
- Generated routes used a deterministic provider mock so provider-call counts
  were directly observed without a live API request.
- An evaluation-only barrier released the two BND-15/BND-16 service calls only
  after both had read the same stored snapshot.
- BND-14 exercised the public response route and verified HTTP 409
  `SESSION_RESPONSE_CONFLICT`.
- BND-17 inserted invalid round values only into the ephemeral test database;
  the service rejected them before provider or response-persistence calls.
- The runner and configuration live under `evaluation/`; application source
  was not modified and still matches executable B01.

## Case results

| Case | Action boundary | Before → after | Provider calls during action | Persistence attempts during action | Outcome |
| --- | --- | --- | ---: | --- | --- |
| BND-01 | Create session | round 0; 0 adaptations; 0 events; `in_progress`; null self-report | 0 | Creation only | Pass |
| BND-02 | Medium/default at round 0 | round 0→1; adaptations 0→1; events 0→1; `in_progress` | 1 | 1 response write, succeeded | Pass |
| BND-03 | Needs Support/concept unclear at round 1 | round 1→2; adaptations 1→2; events 1→2; `review_recommended` | 1 | 1 response write, succeeded | Pass |
| BND-04 | Medium/default at cap | round 2→2; adaptations remain 2; events 2→3 | 0 | 1 event write, succeeded | Pass |
| BND-05 | Needs Support/simpler at cap | round 2→2; adaptations remain 2; events 2→3 | 0 | 1 event write, succeeded | Pass |
| BND-06 | Language terms at cap | round 2→2; adaptations remain 2; events 2→3; route `language_support` | 0 | 1 event write, succeeded | Pass |
| BND-07 | Concept unclear at cap | round 2→2; adaptations remain 2; events 2→3; route `concept_clarification` | 0 | 1 event write, succeeded | Pass |
| BND-08 | Concept mismatch at cap | round 2→2; adaptations remain 2; events 2→3; unchanged concept; `limit_reached` trace | 0 | 1 event write, succeeded | Pass |
| BND-09 | High at round 0 | round 0→0; adaptations remain 0; events 0→1; `in_progress` | 0 | 1 event write, succeeded | Pass |
| BND-10 | High at round 1 | round 1→1; adaptations remain 1; events 1→2; `in_progress` | 0 | 1 event write, succeeded | Pass |
| BND-11 | High at round 2 | round 2→2; adaptations remain 2; events 2→3; status becomes `in_progress`, not completed | 0 | 1 event write, succeeded | Pass |
| BND-12 | Complete round-0 session | `in_progress`→`completed`; content/history/round unchanged | 0 | 1 completion write, succeeded | Pass |
| BND-13 | Complete round-2 session twice | `review_recommended`→`completed`; second request returned stored state without another write | 0 | 1 completion write across two calls | Pass |
| BND-14 | Respond after completion through API | HTTP 409; round/status/counts unchanged | 0 | 0 response writes | Pass |
| BND-15 | Two generated responses from same round-1 snapshot | exactly one success and one controlled conflict; final round 2; adaptations/events both total 2 | 2 | 2 attempts; 1 atomic write | Pass |
| BND-16 | Two capped responses from same round-2 snapshot | exactly one success and one controlled conflict; round/adaptations stay 2; events total 3 | 0 | 2 attempts; 1 atomic event write | Pass |
| BND-17 | Stored rounds -1, 0.5 and 3 | three controlled conflicts; invalid fixtures unchanged until test cleanup | 0 | 0 response writes | Pass |

## Invariant assessment

| Invariant | Result | Evidence |
| --- | --- | --- |
| Round remains an integer from 0 to 2 during valid workflows | Pass | BND-01–BND-16 |
| Generated adaptations alone increment the round | Pass | BND-02–BND-11 |
| Generated adaptations have matching events and round numbers | Pass | BND-02–BND-03, BND-15 |
| Capped responses append an event without generation or round increment | Pass | BND-04–BND-08, BND-16 |
| Fade appends an event without generation or round increment | Pass | BND-09–BND-11 |
| No response creates adaptation round 3 | Pass | BND-04–BND-08, BND-11, BND-15–BND-17 |
| High does not complete the session automatically | Pass | BND-09–BND-11 |
| Explicit completion works and is idempotent | Pass | BND-12–BND-13 |
| Completed sessions reject further responses without mutation | Pass | BND-14 |
| Concurrent stale writes do not duplicate events or adaptations | Pass | BND-15–BND-16 |
| Invalid stored rounds fail before generation/persistence | Pass | BND-17 |

## Findings and qualifications

1. The two-round bound held for every tested route, including language support,
   conceptual clarification and context reinterpretation at the cap.
2. BND-15 shows an important cost/concurrency distinction. Both generation-
   capable requests were valid against the same round-1 snapshot and therefore
   made a deterministic provider call, but MongoDB admitted only one atomic
   state write. The stored bound is protected; duplicate provider work is still
   possible during this race.
3. BND-16 made zero provider calls because both requests began at the cap. Two
   persistence attempts raced, but exactly one event append succeeded.
4. BND-11 confirms that High at round 2 restores `in_progress` rather than
   completing automatically. This matches the frozen contract that Finish is
   a separate lifecycle action.
5. BND-17 used raw invalid database fixtures only in a temporary isolated
   database. Normal schema validation prevents those values from being created
   through supported writes.
6. The existing Mongoose `new`-option deprecation warning appeared in the
   separate regression integration suite, not in a failed bounds assertion.

## Attempts and regression checks

Two pre-execution failures were retained: the sandbox initially blocked local
port binding, and the first external Vitest config could not resolve its
package. Neither reached a BND assertion. The first case-executing run and both
evidence-completeness repeats passed 17/17.

After the final bounds run:

- deterministic suite: 23 files and 208 tests passed;
- existing MongoDB integration suite: 1 file and 5 tests passed;
- lint: passed; and
- TypeScript `--noEmit`: passed.

## Evidence

- `E014`: command/environment/attempt/regression log.
- `E015`: machine-readable BND-01–BND-17 before/after results and counters.
- `E016`: this analysed bounds result.
- `E017`: SHA-256 manifest for the retained evaluation runner, configuration
  and raw evidence files.

## Conclusion

B01 enforces the implemented interaction bound under the tested sequential,
capped, lifecycle, invalid-state and same-snapshot concurrency conditions. The
result is technical evidence about deterministic state control and persistence;
it is not evidence that the chosen maximum improves learning or is optimal.
