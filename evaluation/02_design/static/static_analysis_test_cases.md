# Static analysis

## Run and scope

RUN-B01-20260930-STATIC-01, 30 September 2026. Fourteen cases examined buildability, structural checks, layer separation, validation, ownership, persistence and controlled errors against B01. Commands were rerun for this formal evaluation rather than reusing baseline-freeze outcomes. Evidence E001–E003.

## Cases and recorded results

| Case | Check / expected boundary | Recorded result |
| --- | --- | --- |
| STA-01 | Lint has no blocking diagnostic | Pass, exit 0 |
| STA-02 | Deterministic tests pass | Pass, 208 tests in 23 files |
| STA-03 | V8 coverage generated with declared scope | Pass, service/DAO scope only |
| STA-04 | Isolated MongoDB tests pass | Initial environment block retained; unchanged retry passed 5/5 |
| STA-05 | Combined deterministic/integration entry point works | Pass |
| STA-06 | Production webpack build completes | Pass |
| STA-07 | TypeScript completes after Next type generation | Pass, no diagnostic |
| STA-08 | UI calls application APIs rather than provider directly | Pass |
| STA-09 | Routing, rounds and lifecycle are application-controlled | Pass |
| STA-10 | Services validate behavior and DAOs persist | Pass |
| STA-11 | Input/model validation precedes persistence | Pass |
| STA-12 | Identity, UUID and learner ownership guarded | Pass |
| STA-13 | Stored interaction can be reconstructed | Pass with missing legacy-preference-snapshot qualification |
| STA-14 | Stable safe error boundary, no automatic retry | Pass for static contract; runtime recovery belongs to later methods |

## Interpretation

The inspected architecture and contracts support bounded application mechanics. The first integration block is an environment finding, not erased by its passing retry. Earlier service/DAO coverage is not application-wide coverage or content-quality evidence. Later [white-box results](../white_box/white_box_evaluation.md) report the expanded root-project suite separately.

## Evidence

Complete commands, source locators, timestamps and exit codes are retained in the archived STA-RUN-01-command-log.md and original test-case report. [Raw structural evidence](raw/) and [coverage summary](raw/STA-03-coverage-summary.json) remain available. Commands are listed in the shared protocol. No test was rerun during consolidation.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
