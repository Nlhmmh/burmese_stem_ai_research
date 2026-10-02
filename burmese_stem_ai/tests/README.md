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
