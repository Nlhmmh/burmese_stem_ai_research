# Project test suite

Run tests from the root `burmese_stem_ai/` application directory:

```bash
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run lint
npm exec -- tsc --noEmit
```

`npm test` includes all project unit/API/component tests, including the full
39-combination adaptation matrix and additional generation/preference guards.
`npm run test:integration` runs the original and refined-state tests against
an isolated local MongoDB instance. Provider calls in tests are mocked; no live
model credential is needed. The integration script creates a synthetic temporary
database by default, stops it and removes only its validated temporary directory.
An explicit `TEST_MONGODB_URI` must use a database name ending in `_test`.

`npm run test:coverage` produces **application-wide deterministic coverage**
under `coverage/`. Open the report on macOS with:

```bash
open coverage/index.html
```

Scope includes application pages/routes, components, services, all data TypeScript/
JavaScript modules, utilities/domain definitions, locale handling and `proxy.ts`.
Untested runtime files appear as uncovered. Tests, dependencies, generated Next
output, build/test configuration, styles and static assets are not application
coverage targets. Type-only modules may have no executable counters.

Real MongoDB integration and browser execution are **not merged** into these
deterministic percentages. Coverage does not establish scientific/linguistic
quality, usability or learning effectiveness.

Formal evaluation runs should record the production-code commit/hash separately
from the test/configuration version. Execute against this root project; keep
logs, reports and hashes as evidence, without creating a duplicate source tree.
Preserve recorded execution logs; document later evidence-index changes separately.

The refined-state integration tests optionally export synthetic per-case state
when `TEST_EVIDENCE_DIRECTORY` is set. Normal project test runs do not write
those exports. Any evidence directory must be dedicated to that run.

## White-box coverage

The suite covers Home submission and preferences, locale/theme controls, session and
History recovery, follow-up presentation, server-rendered entry points, learner
identity spoofing, connection caching/recovery, model hot reload, profile
validation/DAO writes, mocked database initialization and transaction cleanup.
Legacy session IDs and stored support rendering remain compatible. New High
responses still fade without generation or a round increment.

The suite contains 518 deterministic tests in 39 files, plus 12 separate MongoDB
integration tests. Application-wide V8 coverage is 99.38% statements, 97.56%
branches, 100% functions and 99.89% lines. Coverage scope and executable counters
are unchanged. Global regression floors are 95% statements, 90% branches, 95%
functions and 95% lines, enforced by `npm run test:coverage`.

Results are recorded separately in the existing
[white-box report](../../evaluation/02_design/white_box/white_box_evaluation.md#supplementary-root-project-coverage).
Earlier execution evidence and paper results are not overwritten. All provider
calls and CLI index operations are mocked. Integration uses only an isolated
temporary MongoDB database. The current coverage run did not rerun integration;
the previous 12-test database run remains recorded separately.

`services/adaptation.service.ts` has 100% statement, branch, function and line
coverage. Tests assert controlled handling of unexpected helper failures,
rejection of malformed bilingual correction output without persistence and the
legacy missing-response-history fallback. These faults are injected through
mocks, not observed live-provider failures. Remaining uncovered paths elsewhere
include defensive state guards, unexpected follow-up generation errors and the
initialization CLI's missing-URL exit. These percentages do not establish
complete correctness, learning or translation quality.
