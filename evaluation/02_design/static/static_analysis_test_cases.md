# Step 10 — Static Analysis Test Cases

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP10-STATIC-CASES-01` |
| Baseline | `B01-A5-EVALUATION` |
| Executable source | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Protocol | `A5-PROTOCOL-01`, version `2.1` |
| Status | Executed; Step 10 results recorded below |
| Evaluator | Codex technical execution under user direction |
| Run ID | `RUN-B01-20260930-STATIC-01` |
| Executed | 30 September 2026, from 12:26:25 NZDT (UTC+13) |

## Purpose and boundaries

These cases evaluate buildability, automated structural checks, validation,
architecture separation, and application-controlled state. The earlier B01
freeze results are reproducibility prerequisites, not Step 10 outcomes. Execute
the commands again for the formal run and preserve the first attempt.

Static analysis and structural coverage do not establish STEM correctness,
Burmese-language quality, usability, learning outcomes, or pedagogical
optimality.

## Preconditions

- [x] Verified `burmese_stem_ai/` has no diff from executable B01 commit
  `37faefa236829aa3d79e023faa1fb72a086b5c2a`.
- [x] Recorded HEAD `e738ba91148cc7feca3d89e9bd8615d4f179bbc3`
  and the dirty documentation/evaluation-only working-tree state.
- [x] Recorded evaluator, timestamp, run ID, Node/npm/OS, and dependency mode.
- [x] Verified the package-lock SHA-256 matches B01; existing locked
  dependencies were used, so `npm ci` was not repeated in this formal run.
- [x] Created `evaluation/02_design/static/raw/` and retained the consolidated
  command log.
- [x] Retained the sandbox-blocked integration attempt before its permitted
  retry.

## Command cases

Run from `burmese_stem_ai/` in the order below.

### STA-01 — ESLint

| Field | Specification |
| --- | --- |
| Command | `npm run lint` |
| Expected | Exit code 0; no blocking ESLint errors |
| Evidence | Complete stdout/stderr, command, start/end, exit code |
| Mapping | F13; enabling technical evidence |

### STA-02 — Deterministic unit/component/API suite

| Field | Specification |
| --- | --- |
| Command | `npm test` |
| Expected | Exit code 0; all discovered `tests/unit/**/*.test.{ts,tsx}` cases pass; exact file/test counts retained |
| Evidence | Complete Vitest log and test-source commit |
| Mapping | F1–F13 as asserted by individual tests; structural evidence only |

### STA-03 — V8 structural coverage

| Field | Specification |
| --- | --- |
| Command | `npm run test:coverage` |
| Expected | Exit code 0; text, JSON summary, and HTML reports generated for configured `services/**/*.ts` and `data/dao/**/*.ts` scope |
| Evidence | Full log, `coverage-summary.json`, HTML report locator, percentages and exclusions |
| Mapping | Enabling structural evidence; not content/usability evidence |

### STA-04 — Isolated MongoDB integration suite

| Field | Specification |
| --- | --- |
| Command | `npm run test:integration` |
| Expected | Exit code 0; temporary isolated MongoDB suite passes; database version and warnings retained |
| Evidence | Complete log, temporary-database mode, exact case counts |
| Mapping | F7, F9–F12 |

### STA-05 — Combined automated entry point

| Field | Specification |
| --- | --- |
| Command | `npm run test:all` |
| Expected | Exit code 0; deterministic and isolated-database modes both complete |
| Evidence | Complete combined log and exit code |
| Mapping | F1–F13 where asserted; reproducibility evidence |

### STA-06 — Production build

| Field | Specification |
| --- | --- |
| Command | `npm run build -- --webpack` |
| Expected | Exit code 0; compilation, TypeScript build phase, static-page generation, and route manifest complete |
| Evidence | Complete build log, network mode, warnings, generated route summary |
| Mapping | F13; technical feasibility |

If external font retrieval is blocked, retain the failed attempt as Blocked,
record the network cause, and retry only in a permitted environment without a
source/configuration change.

### STA-07 — Standalone TypeScript

| Field | Specification |
| --- | --- |
| Command | `npx tsc --noEmit` after STA-06 |
| Expected | Exit code 0 after Next.js generated types exist |
| Evidence | Complete compiler log and exit code |
| Mapping | F13; technical feasibility |

If a pre-build attempt is made and fails because generated Next.js types are
absent, preserve it as a separate attempt rather than replacing it.

## Architecture-inspection cases

### STA-08 — UI/provider separation

| Field | Specification |
| --- | --- |
| Inspect | Home/Learning components, API routes, `services/llm-provider.ts` |
| Procedure | Trace initial inquiry, response, and follow-up from UI to API/service/provider |
| Expected | UI uses application/API boundaries; no component calls the provider directly |
| Evidence | File/symbol locators and three call-path notes |
| Mapping | F1, F6, F8, F13; REQ-01–03 |

### STA-09 — Application-owned routing and lifecycle

| Field | Specification |
| --- | --- |
| Inspect | `adaptation-routing.service.ts`, `adaptation.service.ts`, `session-lifecycle.service.ts`, constants |
| Procedure | Locate response validation, route selection, status selection, completion, and maximum-round enforcement |
| Expected | Application—not the LLM—controls allowed responses, routes, status, identity, persistence permission, and round count; maximum generated round is 2 |
| Evidence | File/symbol locators and observed invariants |
| Mapping | F5–F7, F11, F13; RQ3 |

### STA-10 — Service/DAO responsibility separation

| Field | Specification |
| --- | --- |
| Inspect | `services/*.ts`, `data/dao/*.ts`, `data/schemas/*.ts` |
| Procedure | Trace validation/business decisions separately from database operations |
| Expected | Services own business validation/generation decisions; DAOs own scoped atomic persistence; LLM code does not write directly to MongoDB |
| Evidence | File/symbol locators and any exception |
| Mapping | F7, F9–F13 |

### STA-11 — Structured-output validation before persistence

| Field | Specification |
| --- | --- |
| Inspect | Initial, adaptation, reinterpretation, and follow-up schemas/validators plus save calls |
| Procedure | Trace valid, malformed, missing-output, and repeated-support paths |
| Expected | Strict provider schema and domain validation precede persistence; malformed content reaches no save call |
| Evidence | File/symbol locators for each generation path |
| Mapping | F2–F4, F6, F8, F13; REQ-01–03 |

### STA-12 — Learner ownership and identifier validation

| Field | Specification |
| --- | --- |
| Inspect | Session collection/detail/respond/follow-up routes, learner service, lifecycle service, DAOs |
| Procedure | Trace learner identity and UUID validation through retrieval/update queries |
| Expected | Routes require learner identity; UUIDs are validated; DAO queries include both learner and session identifiers |
| Evidence | File/symbol locators and error-code mapping |
| Mapping | F9–F11, F13 |

### STA-13 — Reconstructable persistence model

| Field | Specification |
| --- | --- |
| Inspect | Session schema, DAO projections, public session projection, legacy normalisation |
| Procedure | Account for initial content, response events, adaptations, interpretation trace, follow-ups, preferences snapshot, round, status, and timestamps |
| Expected | Refined sessions can be reconstructed; absent refined arrays/snapshot on legacy documents are controlled |
| Evidence | Field-to-projection matrix and locators |
| Mapping | F7, F9–F12 |

### STA-14 — Provider and API error boundaries

| Field | Specification |
| --- | --- |
| Inspect | Shared provider, API error helper, five API route families, UI error extraction |
| Procedure | Map timeout, non-2xx, missing output, invalid JSON/schema, database failure, invalid UUID, and validation failure |
| Expected | Stable codes/statuses and learner-safe messages; raw provider/database detail is not returned to the UI; no implicit retry |
| Evidence | Error matrix with file/symbol locators |
| Mapping | F13; U8 |

## Actual results — `RUN-B01-20260930-STATIC-01`

### Evidence locations

- **E001:** [`raw/STA-RUN-01-command-log.md`](raw/STA-RUN-01-command-log.md)
- **E002:** this executed specification and source-locator record
- **E003:** [`raw/STA-03-coverage-summary.json`](raw/STA-03-coverage-summary.json)
- Master index: [`../../03_results/evidence_register.csv`](../../03_results/evidence_register.csv)

### Execution identity and qualifications

- Application source matched the B01 executable commit; only documentation and
  evaluation files were dirty.
- Package-lock SHA-256 matched B01:
  `d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702`.
- Protocol 2.1 was uncommitted at execution, so its exact SHA-256 was retained:
  `72c561dd15b99d022e97b56ecf6bc881faaf0de129f20c060259d63944064f4f`.
- Environment matched the recorded local B01 host: macOS 26.6.2 arm64,
  Node 26.4.0, npm 11.17.0, Next.js 16.3.4, Vitest 4.1.11, and temporary
  MongoDB 8.2.6 for integration.
- Shell startup emitted `pyenv: cannot rehash ... isn't writable` for sandboxed
  commands. It did not change any command exit code.

### Command results

| Case | Actual result | Outcome | Evidence |
| --- | --- | --- | --- |
| STA-01 | Exit 0; ESLint produced no blocking diagnostics | Pass | E001 |
| STA-02 | Exit 0; 23 files and 208 tests passed | Pass | E001 |
| STA-03 | Exit 0; 23 files/208 tests passed; statements 89.54%, branches 91.33%, functions 91.17%, lines 90.98% | Pass | E001, E003 |
| STA-04 | Attempt 1 exit 1 because sandbox denied localhost bind (`EPERM 127.0.0.1`); unchanged retry with bind permission exit 0, 1 file/5 tests passed; Mongoose deprecation warning retained | Pass with recorded environment qualification | E001 |
| STA-05 | Exit 0; combined command repeated 208 deterministic and 5 integration tests successfully | Pass | E001 |
| STA-06 | Exit 0; webpack compiled, TypeScript build phase completed, 8 static pages generated, expected application/API routes listed | Pass | E001 |
| STA-07 | Exit 0 after build-generated Next.js types; no TypeScript diagnostic | Pass | E001 |

Coverage is not whole-application coverage: `vitest.config.mts` includes only
`services/**/*.ts` and `data/dao/**/*.ts`. The report excludes most UI/API
sources and the separate integration suite; `profile.dao.ts` had 0% in this
configured deterministic run. This limits coverage interpretation but does not
contradict STA-03's predefined assertion.

### Architecture inspection results

| Case | Actual finding and locators | Outcome | Evidence |
| --- | --- | --- | --- |
| STA-08 | Components call application APIs: `HomeInquiry.tsx:33,57,77`, `LearningSession.tsx:107,179,204,533`, and `HistoryList.tsx:240`. Provider requests occur only through `requestStructuredOutput` in `session.service.ts:160`, `adaptation.service.ts:365,402`, and `followup.service.ts:105`, with the network call centralised in `llm-provider.ts:51`. No direct UI/provider call was found. | Pass | E002 |
| STA-09 | `MAX_ADAPTATION_ROUNDS = 2` is fixed in `lib/constants.ts:3`; the pure selector is `adaptation-routing.service.ts:31`; `adaptation.service.ts:208–225` rejects completed/invalid state, selects the route, and gates generation; `adaptation.service.ts:297–302` selects status. Completion is controlled in `session-lifecycle.service.ts:46–68`. Model output does not select route, lifecycle, identity, or round. | Pass | E002 |
| STA-10 | Services call explicit DAO operations (`session.service.ts:152`, `adaptation.service.ts:204,263`, `followup.service.ts:65,87`, `session-lifecycle.service.ts:39,47,58`). Persistence is implemented in `session.dao.ts:16–184`; no prompt/provider module writes directly to MongoDB. | Pass | E002 |
| STA-11 | Request/domain validation precedes saves: initial request/output at `session.service.ts:100,173,310`; response and generated-output validation at `adaptation.service.ts:116,381,417,621,630,688`; follow-up request/output at `followup.service.ts:44,119,241`; preferences at `profile.service.ts:8`. Corresponding saves occur only later at `session.service.ts:152`, `adaptation.service.ts:263`, and `followup.service.ts:87`. | Pass | E002 |
| STA-12 | Learner identity is required in `learner.service.ts:24–27`; UUID validation is in `session-lifecycle.service.ts:15–20`; session routes apply both before services. DAO retrieval/update filters include learner and session identifiers at `session.dao.ts:62–67,131–134,158–161,177–180`; History uses learner scope at `session.dao.ts:16–21`. | Pass | E002 |
| STA-13 | Schema persists route-specific correction/override/history fields at `session.schema.ts:38–81,121–131`. DAO types and atomic writes cover adaptations/events/follow-ups/snapshots at `session.dao.ts:39,74–91,107–145,151–170`. Public reconstruction normalises missing legacy collections at `session-lifecycle.service.ts:71–86`; a legacy preference snapshot may remain undefined and must be handled by consumers. | Pass with legacy-snapshot qualification | E002 |
| STA-14 | Shared provider explicitly has no retry (`llm-provider.ts:34`), central timeout (`:48`), and stable non-2xx/invalid/missing/timeout/network errors (`:75–104`). `api-error.ts:10` supplies the common envelope. Session/preference/detail/respond/follow-up routes map validation, not-found, conflict, scope, generation, and database failures to stable 400/404/409/422/502/500 responses. Raw provider/database detail is logged server-side but safe messages are returned. Runtime recovery presentation remains for later dynamic/usability evidence. | Pass for static contract; runtime UI recovery not assessed here | E002 |

### Overall Step 10 judgement

All predefined static command and inspection assertions passed under the
recorded local environment. The overall Step 10 outcome is **Pass**, with these
retained qualifications:

1. the first integration attempt was Blocked by the sandbox, then passed
   unchanged when localhost binding was permitted;
2. Mongoose emitted a non-blocking deprecated-`new` option warning;
3. the V8 percentage covers the configured services/DAO scope only;
4. protocol 2.1 was identified by hash rather than a committed protocol
   revision; and
5. architecture inspection establishes structure, not runtime, content,
   language, usability, or educational-effectiveness outcomes.

## Execution register

| Case | Execution status | Outcome | Evidence IDs | Actual/notes |
| --- | --- | --- | --- | --- |
| STA-01 | Executed | Pass | E001 | Exit 0 |
| STA-02 | Executed | Pass | E001 | 23 files; 208 tests |
| STA-03 | Executed | Pass | E001, E003 | Scoped V8 report retained |
| STA-04 | Executed | Pass | E001 | First attempt Blocked; permitted retry passed 5/5 |
| STA-05 | Executed | Pass | E001 | Combined deterministic/integration entry point passed |
| STA-06 | Executed | Pass | E001 | Production webpack build passed |
| STA-07 | Executed | Pass | E001 | No TypeScript diagnostic |
| STA-08 | Executed | Pass | E002 | UI/provider separation found |
| STA-09 | Executed | Pass | E002 | Application-owned routing/lifecycle found |
| STA-10 | Executed | Pass | E002 | Service/DAO separation found |
| STA-11 | Executed | Pass | E002 | Validation precedes persistence |
| STA-12 | Executed | Pass | E002 | Identity/UUID/ownership controls found |
| STA-13 | Executed | Pass | E002 | Reconstructable with recorded legacy qualification |
| STA-14 | Executed | Pass | E002 | Static safe-boundary contract found; runtime pending |

## Completion criteria

- [x] Every case has an execution status, outcome, evidence ID, and limitation.
- [x] Command output and the first blocked attempt are retained in E001.
- [x] Coverage summary E003 identifies exact scope and exclusions.
- [x] Architecture conclusions cite source locators in E002.
- [x] Baseline-freeze outcomes were not copied in as formal results; commands
  were rerun.
- [x] The master evidence register was updated only for artefacts that exist.
