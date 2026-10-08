# White-box testing and coverage

## Run and scope

RUN-B01-20261002-ROOTTESTS-02 executed against the root burmese_stem_ai application, not a source copy. WB01–WB06 passed structurally. Provider/DAO mocks supported deterministic tests; real isolated MongoDB supported persistence/concurrency. No live model call or production-code fix occurred. Evidence E033–E035.

## Recorded commands

| Check | Actual result |
| --- | --- |
| `npm test` | 361/361 deterministic tests, 26 files, none skipped |
| `npm run test:coverage` | Same 361 tests; V8 application-wide report |
| `npm run test:integration` | 12/12 tests, 2 files, real isolated MongoDB |
| `npm run test:all` | 361 deterministic + 12 integration tests passed |
| `npm run lint` | Exit 0 |
| `npm exec -- tsc --noEmit --incremental false` | Exit 0 |

These executions contain 373 unique tests, not additional tests each time a command repeated them. Commands and timestamps remain in [commands.jsonl](raw/RUN-B01-20261002-ROOTTESTS-02/commands.jsonl). Reproduction commands are in the shared protocol and application test README.

## Test groups

| Group | Exercised contracts | Assessment |
| --- | --- | --- |
| WB01 | All 39 overall-need/difficulty/round combinations; provider/save counts; High fade; cap events; input rejection; language/concept/correction output and trace | Pass |
| WB02 | Owned lookup; UUID and lifecycle guards; both legal completions; idempotent completion; completed-response rejection; legacy continuity | Pass |
| WB03 | Current corrected/legacy concept and latest support; scope/length/count guards; controlled failures; real follow-up leaves Stage 7 state unchanged | Pass |
| WB04 | Initial/adaptation/correction/follow-up structured output acceptance and rejection; transport/timeout/refusal/empty output/JSON faults fail before invalid save | Pass |
| WB05 | Real scoped persistence, newest-first history, legacy reads, atomic correction/event/adaptation projection, round 1→2 contention, capped-event and last-follow-up-slot contention | Pass |
| WB06 | Defaults, valid/invalid/partial preference updates, API write guards, unchanged old-session snapshots, fresh-session preferences, bilingual presentation override | Pass |

[All 373 named assertions](white_box_results.csv), [39 route combinations](white_box_route_matrix.csv) and [per-case database observations](raw/RUN-B01-20261002-ROOTTESTS-02/05-integration/database-observations.jsonl) preserve detail without requiring a separate test-case document. Individual MongoDB test timings were not captured.

## Application-wide coverage

| Metric | Hits / total | Percent |
| --- | --- | --- |
| Statements | 708 / 976 | 72.54% |
| Branches | 627 / 821 | 76.37% |
| Functions | 128 / 200 | 64.00% |
| Lines | 680 / 922 | 73.75% |

Coverage includes 42 executable files across pages/API routes, components, services, data, lib, i18n and proxy. Tests, config, dependencies, generated output, styles and assets are excluded. Type-only modules may have no executable counters. Untested code contributes zero hits; structural group Pass does not mean exhaustive coverage.

Open the [captured HTML report](raw/RUN-B01-20261002-ROOTTESTS-02/coverage/index.html) or regenerate burmese_stem_ai/coverage/index.html with npm run test:coverage. [Coverage gaps](white_box_uncovered.csv) and [machine summary](raw/RUN-B01-20261002-ROOTTESTS-02/coverage/coverage-summary.json) remain available. MongoDB/browser execution is separate, not merged into V8 totals.

## Limitations and evidence continuity

Assertions do not certify scientific/Burmese quality, semantic novelty, pedagogical suitability or learner benefit. BB07/08 Partials, BB22's public-boundary mismatch and live simulation failures remain unchanged. The earlier source-copy run was removed under user direction; E028–E032 remain retired. The retained root run's [post-cleanup manifest](raw/RUN-B01-20261002-ROOTTESTS-02/manifest_after_cleanup.sha256) is historical; archived Markdown paths are resolved through the consolidation index.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
