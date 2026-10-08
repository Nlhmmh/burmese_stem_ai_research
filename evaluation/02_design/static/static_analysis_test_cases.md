# Static analysis — test cases and recorded findings

Detailed sections: [Execution and evidence capture](#how-codex-ran-the-tests-and-recorded-evidence), [Human review guide](#how-to-review-the-evidence-step-by-step), [Case register](#case-register).

Formal run `RUN-B01-20260930-STATIC-01` evaluated B01. These are the executed case contracts and recorded results, not a fresh run. Source line locators describe the inspected B01 files. Repeated baseline and completion checklists are removed.

## Purpose and boundaries

These cases evaluate buildability, automated structural checks, validation,
architecture separation, and application-controlled state. The earlier B01
freeze results are reproducibility prerequisites, not Step 10 outcomes. The formal run executed the commands separately from baseline freezing and preserved the first attempt.

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

## How Codex ran the tests and recorded evidence

Codex ran the listed commands in the root application's `burmese_stem_ai/` directory and inspected the source. Two kinds of evidence were collected. STA-01–STA-07 are automated verification commands. STA-08–STA-14 are source inspections, not browser or live-model tests.

- **Check the inspected version.** The application diff and lock hash were compared with B01. Existing locked dependencies were used; `npm ci` was not repeated. The identity check is recorded at the start of the [command log](raw/STA-RUN-01-command-log.md).
- **Run the verification commands.** ESLint, deterministic tests, V8 coverage, isolated MongoDB tests, the combined suite, production build and standalone TypeScript were run separately from baseline freezing. Command outputs, exit codes, counts and warnings were recorded in the command log. The saved log is a transcription with line wrapping normalised, not a raw terminal capture.
- **Keep the first blocked attempt.** MongoDB integration initially failed because the sandbox denied localhost binding. The same code passed after binding was permitted. Both attempts remain in STA-04's log section.
- **Inspect the code paths.** Codex followed UI → API → service → DAO/provider paths, checked guards and save order, and recorded file/symbol locators in STA-08–STA-14 below. These are review findings, not machine-generated assertions.
- **Save the coverage evidence.** The [coverage JSON](raw/STA-03-coverage-summary.json) retains totals and per-file values. Its services/DAO-only scope and historical 208-test count must not be replaced by later white-box coverage.
- **Format readable evidence.** The [converter](../convert_readable_evidence.mjs) puts each recorded command section into a case JSON file; STA-03 also includes coverage data. STA-08–STA-14 contain the reported inspection finding and source links, not invented terminal logs. The full command log remains in [the shared index](raw/readable/index.json).

The command log is restored unchanged from the [consolidation archive](../../archive/pre_consolidation_markdown_20261008.zip). Source links below open current files. To check historical line locators, inspect the corresponding file at B01 commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`, for example with `git show <commit>:burmese_stem_ai/services/adaptation.service.ts`.

## How to review the evidence step by step

- **Choose a case.** Read its command or source-inspection task and expected result. Open its Readable logs link. `caseRegister` contains the reported finding and limitation.
- **For STA-01–STA-07, read `records.commandOutput`.** Its `record.lines` contains the saved command section. Compare command, exit code, diagnostics and test count. Read both STA-04 attempts. The original Command result link remains available.
- **Check what the command covers.** Inspect [package.json](../../../burmese_stem_ai/package.json), the B01 test/configuration files and named checks. Passing a command only supports what it actually checks. Current scripts/tests may include later additions.
- **For STA-03, read `records.coverage`.** Compare `record.total` and individual file values with the original coverage JSON. This historical run covers services and DAOs only, not the whole application.
- **For STA-08–STA-14, follow the Source links.** Compare the functions and guards with the recorded locators and expected result. Use the B01 version if current line numbers or test files differ.
- **For save-order checks, read the whole path.** Follow validation, generation and DAO calls. A function name or isolated line is not enough to prove that invalid content cannot be saved.
- **Read the limitation.** Source inspection and passing commands do not establish live content quality, interface usability or learning outcomes.

## Case register

Each row keeps the case conditions, expected result, actual result, outcome, limitation and direct evidence links together. This is a documentation update, not a new test run. The review layout follows the [black-box report](../black_box/black_box_analysis.md).

Readable logs distinguish command output from source-inspection findings. No missing machine evidence is invented. To reproduce the copies, run `node evaluation/02_design/convert_readable_evidence.mjs --evaluation static` from the repository root. Different existing output is not overwritten.

| Case | Case details / action | Conditions / inputs | Expected result | Actual result | Outcome | Limitation | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| STA-01 | ESLint<br>`npm run lint`<br>Criteria: F13; enabling technical evidence | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0; no blocking ESLint errors | Exit 0; ESLint produced no blocking diagnostics | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-01.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L24) |
| STA-02 | Deterministic unit/component/API suite<br>`npm test`<br>Criteria: F1–F13 as asserted by individual tests; structural evidence only | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0; all discovered `tests/unit/**/*.test.{ts,tsx}` cases pass; exact file/test counts retained | Exit 0; 23 files and 208 tests passed | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-02.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L37) |
| STA-03 | V8 structural coverage<br>`npm run test:coverage`<br>Criteria: Enabling structural evidence; not content/usability evidence | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0; text, JSON summary, and HTML reports generated for configured `services/**/*.ts` and `data/dao/**/*.ts` scope | Exit 0; 23 files/208 tests passed; statements 89.54%, branches 91.33%, functions 91.17%, lines 90.98% | Pass | Coverage is services/DAO-only, not whole application; profile.dao.ts has zero hits. | [Readable logs](raw/readable/STA-03.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L55)<br>[Coverage totals / files](raw/STA-03-coverage-summary.json) |
| STA-04 | Isolated MongoDB integration suite<br>`npm run test:integration`<br>Criteria: F7, F9–F12 | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0; temporary isolated MongoDB suite passes; database version and warnings retained | Attempt 1 exit 1 because sandbox denied localhost bind (`EPERM 127.0.0.1`); unchanged retry with bind permission exit 0, 1 file/5 tests passed; Mongoose deprecation warning retained | Pass with recorded environment qualification | First attempt was environment-blocked (localhost bind denied); unchanged permitted retry passed. Mongoose warning retained. | [Readable logs](raw/readable/STA-04.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L99)<br>[First blocked attempt](raw/STA-RUN-01-command-log.md#L101)<br>[Unchanged retry](raw/STA-RUN-01-command-log.md#L126) |
| STA-05 | Combined automated entry point<br>`npm run test:all`<br>Criteria: F1–F13 where asserted; reproducibility evidence | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0; deterministic and isolated-database modes both complete | Exit 0; combined command repeated 208 deterministic and 5 integration tests successfully | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-05.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L147) |
| STA-06 | Production build<br>`npm run build -- --webpack`<br>Criteria: F13; technical feasibility | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0; compilation, TypeScript build phase, static-page generation, and route manifest complete | Exit 0; webpack compiled, TypeScript build phase completed, 8 static pages generated, expected application/API routes listed | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-06.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L180) |
| STA-07 | Standalone TypeScript<br>`npx tsc --noEmit` after STA-06<br>Criteria: F13; technical feasibility | B01 source and locked dependencies.<br>Working directory: `burmese_stem_ai/` | Exit code 0 after Next.js generated types exist | Exit 0 after build-generated Next.js types; no TypeScript diagnostic | Pass | Executed after build-generated Next.js types existed. | [Readable logs](raw/readable/STA-07.json)<br>[Command result](raw/STA-RUN-01-command-log.md#L219) |
| STA-08 | UI/provider separation<br>Trace initial inquiry, response, and follow-up from UI to API/service/provider<br>Criteria: F1, F6, F8, F13; REQ-01–03 | B01 source and locked dependencies.<br>Inspect: Home/Learning components, API routes, `services/llm-provider.ts` | UI uses application/API boundaries; no component calls the provider directly | Components call application APIs: `HomeInquiry.tsx:33,57,77`, `LearningSession.tsx:107,179,204,533`, and `HistoryList.tsx:240`. Provider requests occur only through `requestStructuredOutput` in `session.service.ts:160`, `adaptation.service.ts:365,402`, and `followup.service.ts:105`, with the network call centralised in `llm-provider.ts:51`. No direct UI/provider call was found. | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-08.json)<br>[UI request](../../../burmese_stem_ai/components/learn/LearningSession.tsx)<br>[Provider boundary](../../../burmese_stem_ai/services/llm-provider.ts) |
| STA-09 | Application-owned routing and lifecycle<br>Locate response validation, route selection, status selection, completion, and maximum-round enforcement<br>Criteria: F5–F7, F11, F13; RQ3 | B01 source and locked dependencies.<br>Inspect: `adaptation-routing.service.ts`, `adaptation.service.ts`, `session-lifecycle.service.ts`, constants | Application—not the LLM—controls allowed responses, routes, status, identity, persistence permission, and round count; maximum generated round is 2 | `MAX_ADAPTATION_ROUNDS = 2` is fixed in `lib/constants.ts:3`; the pure selector is `adaptation-routing.service.ts:31`; `adaptation.service.ts:208–225` rejects completed/invalid state, selects the route, and gates generation; `adaptation.service.ts:297–302` selects status. Completion is controlled in `session-lifecycle.service.ts:46–68`. Model output does not select route, lifecycle, identity, or round. | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-09.json)<br>[Route selector](../../../burmese_stem_ai/services/adaptation-routing.service.ts)<br>[State guards](../../../burmese_stem_ai/services/adaptation.service.ts)<br>[Lifecycle](../../../burmese_stem_ai/services/session-lifecycle.service.ts)<br>[Round constant](../../../burmese_stem_ai/lib/constants.ts) |
| STA-10 | Service/DAO responsibility separation<br>Trace validation/business decisions separately from database operations<br>Criteria: F7, F9–F13 | B01 source and locked dependencies.<br>Inspect: `services/*.ts`, `data/dao/*.ts`, `data/schemas/*.ts` | Services own business validation/generation decisions; DAOs own scoped atomic persistence; LLM code does not write directly to MongoDB | Services call explicit DAO operations (`session.service.ts:152`, `adaptation.service.ts:204,263`, `followup.service.ts:65,87`, `session-lifecycle.service.ts:39,47,58`). Persistence is implemented in `session.dao.ts:16–184`; no prompt/provider module writes directly to MongoDB. | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-10.json)<br>[Session service](../../../burmese_stem_ai/services/session.service.ts)<br>[Adaptation service](../../../burmese_stem_ai/services/adaptation.service.ts)<br>[DAO operations](../../../burmese_stem_ai/data/dao/session.dao.ts) |
| STA-11 | Structured-output validation before persistence<br>Trace valid, malformed, missing-output, and repeated-support paths<br>Criteria: F2–F4, F6, F8, F13; REQ-01–03 | B01 source and locked dependencies.<br>Inspect: Initial, adaptation, reinterpretation, and follow-up schemas/validators plus save calls | Strict provider schema and domain validation precede persistence; malformed content reaches no save call | Request/domain validation precedes saves: initial request/output at `session.service.ts:100,173,310`; response and generated-output validation at `adaptation.service.ts:116,381,417,621,630,688`; follow-up request/output at `followup.service.ts:44,119,241`; preferences at `profile.service.ts:8`. Corresponding saves occur only later at `session.service.ts:152`, `adaptation.service.ts:263`, and `followup.service.ts:87`. | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-11.json)<br>[Initial validator](../../../burmese_stem_ai/services/session.service.ts)<br>[Adaptation validator](../../../burmese_stem_ai/services/adaptation.service.ts)<br>[Follow-up validator](../../../burmese_stem_ai/services/followup.service.ts) |
| STA-12 | Learner ownership and identifier validation<br>Trace learner identity and UUID validation through retrieval/update queries<br>Criteria: F9–F11, F13 | B01 source and locked dependencies.<br>Inspect: Session collection/detail/respond/follow-up routes, learner service, lifecycle service, DAOs | Routes require learner identity; UUIDs are validated; DAO queries include both learner and session identifiers | Learner identity is required in `learner.service.ts:24–27`; UUID validation is in `session-lifecycle.service.ts:15–20`; session routes apply both before services. DAO retrieval/update filters include learner and session identifiers at `session.dao.ts:62–67,131–134,158–161,177–180`; History uses learner scope at `session.dao.ts:16–21`. | Pass | Scoped to the stated structural assertion. | [Readable logs](raw/readable/STA-12.json)<br>[Identity guard](../../../burmese_stem_ai/services/learner.service.ts)<br>[UUID guard](../../../burmese_stem_ai/services/session-lifecycle.service.ts)<br>[Scoped DAO queries](../../../burmese_stem_ai/data/dao/session.dao.ts) |
| STA-13 | Reconstructable persistence model<br>Account for initial content, response events, adaptations, interpretation trace, follow-ups, preferences snapshot, round, status, and timestamps<br>Criteria: F7, F9–F12 | B01 source and locked dependencies.<br>Inspect: Session schema, DAO projections, public session projection, legacy normalisation | Refined sessions can be reconstructed; absent refined arrays/snapshot on legacy documents are controlled | Schema persists route-specific correction/override/history fields at `session.schema.ts:38–81,121–131`. DAO types and atomic writes cover adaptations/events/follow-ups/snapshots at `session.dao.ts:39,74–91,107–145,151–170`. Public reconstruction normalises missing legacy collections at `session-lifecycle.service.ts:71–86`; a legacy preference snapshot may remain undefined and must be handled by consumers. | Pass with legacy-snapshot qualification | Legacy preference snapshot may remain undefined and must be handled by consumers. | [Readable logs](raw/readable/STA-13.json)<br>[Stored schema](../../../burmese_stem_ai/data/schemas/session.schema.ts)<br>[DAO fields / writes](../../../burmese_stem_ai/data/dao/session.dao.ts)<br>[Legacy projection](../../../burmese_stem_ai/services/session-lifecycle.service.ts) |
| STA-14 | Provider and API error boundaries<br>Map timeout, non-2xx, missing output, invalid JSON/schema, database failure, invalid UUID, and validation failure<br>Criteria: F13; U8 | B01 source and locked dependencies.<br>Inspect: Shared provider, API error helper, five API route families, UI error extraction | Stable codes/statuses and learner-safe messages; raw provider/database detail is not returned to the UI; no implicit retry | Shared provider explicitly has no retry (`llm-provider.ts:34`), central timeout (`:48`), and stable non-2xx/invalid/missing/timeout/network errors (`:75–104`). `api-error.ts:10` supplies the common envelope. Session/preference/detail/respond/follow-up routes map validation, not-found, conflict, scope, generation, and database failures to stable 400/404/409/422/502/500 responses. Raw provider/database detail is logged server-side but safe messages are returned. Runtime recovery presentation remains for later dynamic/usability evidence. | Pass for static contract; runtime UI recovery not assessed here | Static error contract only; runtime UI recovery is not assessed by this case. | [Readable logs](raw/readable/STA-14.json)<br>[Provider errors](../../../burmese_stem_ai/services/llm-provider.ts)<br>[API envelope](../../../burmese_stem_ai/lib/api-error.ts)<br>[Response route](../../../burmese_stem_ai/app/api/sessions/[sessionId]/respond/route.ts) |

## Actual results — `RUN-B01-20260930-STATIC-01`

### Evidence locations

- **E001:** [command log](raw/STA-RUN-01-command-log.md), restored unchanged from the consolidation archive. It records commands, results and both integration attempts.
- **E002:** this executed specification and source-locator record
- **E003:** [`raw/STA-03-coverage-summary.json`](raw/STA-03-coverage-summary.json)
- Master index: [`../../03_results/evidence_register.csv`](../../03_results/evidence_register.csv)

### Execution identity and limitations

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


### Overall Step 10 judgement

All predefined static command and inspection assertions passed under the
recorded local environment. The overall Step 10 outcome is **Pass**, with these
retained limitations:

1. the first integration attempt was Blocked by the sandbox, then passed
   unchanged when localhost binding was permitted;
2. Mongoose emitted a non-blocking deprecated-`new` option warning;
3. the V8 percentage covers the configured services/DAO scope only;
4. protocol 2.1 was identified by hash rather than a committed protocol
   revision; and
5. architecture inspection establishes structure, not runtime, content,
   language, usability, or educational-effectiveness outcomes.
