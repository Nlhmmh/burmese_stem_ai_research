# Automated Refinement Coverage Record

## Record status

| Field | Value |
| --- | --- |
| Prepared | 30 September 2026 |
| Refinement step | Step 14 — Complete Automated Refinement Coverage |
| Protocol | `A5-PROTOCOL-01` version 2.0 |
| Evidence role | Implementation-work structural verification before formal evaluation |
| Formal `B01` status | Not frozen or executed by this record |

This record distinguishes deterministic mocked tests, real isolated-database
tests, and V8 structural coverage. It is not learner evidence, a Burmese
language review, a STEM-content accuracy assessment, or proof of educational
effectiveness.

## Coverage map

| Area | Meaningful assertions |
| --- | --- |
| Domain and route table | Literal Stage 6A/6B enums; valid route/support pairings; High/fade; defaults; every explicit Stage 6B route; invalid High-with-difficulty combinations |
| Adaptation services | Rounds 0/1/2; provider-call counts; no round 3; status selection; distinct content; concept correction/ambiguity/cap; optimistic conflicts |
| LLM contracts | One-call initial Stages 1–5 contract; route-specific inputs and strict schemas; missing configuration/output, invalid JSON/schema, timeout, non-2xx and network failure; no invalid persistence |
| API routes | Session list/create/detail/complete/respond/follow-up success projections; identity and UUID checks; invalid JSON/payloads; 400/404/409/422/500/502 error envelopes; provider/database details withheld |
| Components | High, Medium and Needs Support; all five Stage 6B choices; skip/cancel; clarification input; loading/retry/limit; keyboard/mobile; route-specific rendering; Review/Resume/history |
| Schema and mocked DAO | Legacy fields; route/event validation; atomic adaptation + event append; fade/capped writes; active-concept correction; learner scope/order; follow-up isolation |
| Real MongoDB | Learner scope and newest-first ordering; raw legacy retrieval; fade/cap persistence; concurrent generated and capped writes; profile defaults/update; two-follow-up limit |

## Verification performed

Commands ran from `burmese_stem_ai/` on 30 September 2026.

| Command | Dependency mode | Result |
| --- | --- | --- |
| `npm test` | Deterministic provider/DAO mocks; jsdom components | Exit 0; 23 files and 208 tests passed |
| `npm run test:coverage` | Same deterministic suite with V8 | Exit 0; 89.54% statements, 91.33% branches, 91.17% functions, 90.98% lines in configured service/DAO scope |
| `npm run test:integration` | Temporary isolated local MongoDB; no provider call | Exit 0; 1 file and 5 tests passed |
| `npm run test:all` | Deterministic suite followed by isolated MongoDB suite | Exit 0; both modes completed in one command |
| `npm run lint` | Static | Exit 0 |
| `npx tsc --noEmit` | Static | Exit 0 |

The coverage report is scoped by `vitest.config.mts` to services and DAO files.
The real MongoDB suite is deliberately separate and therefore must not be
presented as part of the mocked V8 percentages. API and component assertions
are executed by Vitest even where their source files are outside that configured
coverage-report scope.

## Isolation and cleanup

`scripts/run-integration-tests.sh` either:

1. uses `TEST_MONGODB_URI` only when the database name ends in `_test`; or
2. launches `mongod` on a temporary localhost port with a database directory
   created under `/tmp/burmese-stem-test.*`.

The runner stops the temporary process and deletes only the validated temporary
directory on exit. Normal application and production database URLs are not
used by the default integration command.

## Observations and boundaries

- The first isolated-database attempt exposed an incorrect test fixture that
  still contained a preference snapshot; the fixture was corrected so the
  legacy case now inserts a genuinely missing field and verifies it remains
  readable.
- Mongoose reports a non-blocking deprecation warning for the profile DAO's
  existing `new: true` option during the integration run. The tests pass; this
  warning is not hidden or treated as a failure.
- Passing structural tests show that the asserted code paths behaved as
  expected in these controlled modes. They do not establish that generated
  Burmese is natural, generated STEM explanations are accurate, learners find
  the workflow usable, or learning outcomes improve.
