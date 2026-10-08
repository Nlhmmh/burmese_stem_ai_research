# Optimization and bounds analysis

## Run and scope

RUN-B01-20261001-BOUNDS-01 used B01, a real isolated MongoDB 8.2.6 database and a deterministic provider seam. Same-snapshot barriers exposed two concurrent responses. All BND-01–BND-17 passed. Evidence E014–E017. This evaluates constraints, not educationally optimal support.

## Cases and results

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

## Interpretation

Stored adaptations stayed within rounds 0–2. Fade and cap appended events without generation or round increments. Finish remained explicit and idempotent; completed sessions rejected responses. Invalid stored-round fixtures failed before provider or write calls.

BND-15 made two provider calls but admitted one atomic write. The stored-round bound therefore protects persistence, not total provider spending or duplicate generation. BND-16 made no provider call at the cap and admitted one event write. These are tested concurrency conditions, not a guarantee for every deployment workload.

## Evidence and reproduction

[Raw runner, configuration and results](raw/) retain before/after counts and instrumentation. Run the archived command procedure with the evaluation-only Vitest config, root application and fresh synthetic MongoDB. Preserve new execution evidence separately. Sandbox port binding and initial config-resolution failures occurred before case assertions and remain recorded. Subsequent structural checks passed 208 deterministic and five integration tests, lint and TypeScript; these are historical counts, not the later expanded suite.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
