# Step 15 — White-box evaluation

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

Run: **RUN-B01-20261002-ROOTTESTS-02**, 2 October 2026, Pacific/Auckland.
WB01–WB06: **structural Pass**, with application-wide coverage gaps recorded.
Tests execute against the root `burmese_stem_ai` project, not a copied checkout.

## Recorded execution

| Check | Actual result |
| --- | --- |
| `npm test` | 361/361 deterministic tests, 26 files, none skipped |
| `npm run test:coverage` | Same 361 tests; V8 application-wide report |
| `npm run test:integration` | 12/12 tests, 2 files, real isolated MongoDB |
| `npm run test:all` | 361 deterministic + 12 integration tests passed |
| `npm run lint` | Exit 0 |
| `npm exec -- tsc --noEmit --incremental false` | Exit 0 |

[Commands and timestamps](raw/RUN-B01-20261002-ROOTTESTS-02/commands.jsonl) (E033) identify the six executions.
[Run metadata](00_run_metadata.md) identifies production and test versions.
Provider calls are mocked; database tests use temporary synthetic databases.
No live model call, deployment change or production-source change occurred.

## Requirement-critical assertions

| Group | Exercised contracts | Assessment |
| --- | --- | --- |
| WB01 | All 39 overall-need/difficulty/round combinations; provider/save counts; High fade; cap events; input rejection; language/concept/correction output and trace | Pass |
| WB02 | Owned lookup; UUID and lifecycle guards; both legal completions; idempotent completion; completed-response rejection; legacy continuity | Pass |
| WB03 | Current corrected/legacy concept and latest support; scope/length/count guards; controlled failures; real follow-up leaves Stage 7 state unchanged | Pass |
| WB04 | Initial/adaptation/correction/follow-up structured output acceptance and rejection; transport/timeout/refusal/empty output/JSON faults fail before invalid save | Pass |
| WB05 | Real scoped persistence, newest-first history, legacy reads, atomic correction/event/adaptation projection, round 1→2 contention, capped-event and last-follow-up-slot contention | Pass |
| WB06 | Defaults, valid/invalid/partial preference updates, API write guards, unchanged old-session snapshots, fresh-session preferences, bilingual presentation override | Pass |

The [373-test register](white_box_results.csv) maps named tests to source hashes
and execution evidence. The [39-case route matrix](white_box_route_matrix.csv)
is derived from passed named assertions in the root unit JSON. Database tests
are documented from the two all-pass file summaries plus current source titles;
individual database test timings were not captured. Seven supplementary
[per-case database exports](raw/RUN-B01-20261002-ROOTTESTS-02/05-integration/database-observations.jsonl)
corroborate persistence invariants; a second set is retained for the combined run.

## Application-wide coverage

[Captured HTML report](raw/RUN-B01-20261002-ROOTTESTS-02/coverage/index.html) and
[machine summary](raw/RUN-B01-20261002-ROOTTESTS-02/coverage/coverage-summary.json) (E034).
The regenerable local report is [coverage/index.html](../../../burmese_stem_ai/coverage/index.html).

| Metric | Hits / total | Percent |
| --- | --- | --- |
| Statements | 708 / 976 | 72.54% |
| Branches | 627 / 821 | 76.37% |
| Functions | 128 / 200 | 64.00% |
| Lines | 680 / 922 | 73.75% |

There are 42 executable file entries. Scope includes pages/API routes,
components, services, all TS/JS data modules, lib, i18n and proxy. Tests,
configuration, dependencies, generated Next output, styles and assets are
excluded; type-only modules may have no executable counters.
[Coverage gaps](white_box_uncovered.csv) records per-file counter totals from
the summary, not fabricated branch locations. Use the HTML drill-down for
line-level details. Untested UI pages/helpers contribute zero hits. Real
MongoDB and browser execution are separate and are not merged into V8 totals.
A structural group Pass does not mean exhaustive application coverage.

## Interpretation and limitations

Assertions establish bounded application mechanics, not Burmese/English
quality, scientific correctness, pedagogical suitability or learner benefit.
Myanmar-script constraints remain prompt-only where no runtime validator
exists. Repetition checks do not prove meaningful semantic novelty. Handler
identity tests do not override the public-proxy finding. Black-box BB07/BB08
partials, BB22's oracle failure and simulation findings remain unchanged.
Locale/theme structural checks do not complete full browser usability.

The next assignment task is the master plan's §18.1 U1–U9 usability inspection.

## Evidence cleanup and integrity

On 2 October 2026, under explicit user direction, the superseded white-box
source-copy run and its duplicate evaluation-only helpers were removed from
the workspace. Evidence IDs 28–32 were retired, without renumbering other IDs.
E033–E035 identify the retained root-project execution, coverage and current
[post-cleanup manifest](raw/RUN-B01-20261002-ROOTTESTS-02/manifest_after_cleanup.sha256).

The original root execution logs, metadata, verification and first manifest
are retained unchanged as capture-time records; historical worktree text may
mention files that no longer exist. The first manifest is not the current
working-tree index. [Post-cleanup verification](raw/RUN-B01-20261002-ROOTTESTS-02/verification_after_cleanup.json)
checks the 66 production files and executable test/config hashes. Only the test
README changed after execution; its documentation-only change is recorded.
No test result was invented or rerun as part of this cleanup.
