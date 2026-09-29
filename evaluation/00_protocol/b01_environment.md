# B01 Evaluation Environment

## Record status

| Field | Frozen value |
| --- | --- |
| Related baseline | `B01-A5-EVALUATION` |
| Executable source | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Baseline tag | `a5-evaluation-b01` |
| Captured | 30 September 2026, NZDT (UTC+13) |
| Evaluation mode | Local macOS baseline; public deployment excluded |
| Secrets recorded | None |

## Host and toolchain

| Item | Frozen value |
| --- | --- |
| Operating system | macOS `26.6.2`, build `25G83` |
| Architecture | Apple Silicon `arm64` (Apple M3) |
| Git | `2.50.1 (Apple Git-155)` |
| Node.js | `v26.4.0` |
| npm | `11.17.0` |
| Docker | `28.3.0`, build `38b7060` |
| Docker Compose | `v2.38.1-desktop.1` |
| Local MongoDB server used for integration | `8.2.6`, temporary isolated instance |
| mongosh available | `2.8.1` |
| Declared container runtime | Node `22-alpine`; not the runtime used for the recorded local checks |
| Declared Compose database | `mongo:7`; not the server used for the recorded isolated integration run |

## Locked top-level application dependencies

`npm ci` installed the graph identified by the B01 lockfile. Important resolved
versions include:

| Package | Version |
| --- | --- |
| Next.js | `16.3.4` |
| React / React DOM | `19.2.8` |
| TypeScript | `5.9.3` |
| Mongoose | `9.9.4` |
| next-intl | `4.14.1` |
| Vitest / V8 coverage | `4.1.11` |
| Testing Library React | `16.3.3` |
| jsdom | `30.1.1` |
| ESLint | `9.39.5` |
| Tailwind CSS | `4.3.3` |

The complete dependency identity is the lockfile hash in
[`b01_artefact_versions.md`](b01_artefact_versions.md), not this abbreviated
table.

## Browser and usability-inspection settings

| Item | B01 setting |
| --- | --- |
| Browser | Google Chrome `154.0.8037.58` |
| Desktop viewport | `1440 × 900` CSS pixels |
| Mobile viewport | `390 × 844` CSS pixels |
| UI locales | English (`en`) and Burmese (`my`) |
| Support-language mode | Bilingual, with route-specific override checks |
| Themes | Light and dark |
| Required states | Normal, loading, empty, error, adapted, capped, completed/review |

Safari `26.6.2` is installed but is not the designated B01 inspection browser.
Any cross-browser inspection must be recorded as an additional environment, not
silently combined with the Chrome result.

## Model and provider configuration

| Item | Non-secret B01 value |
| --- | --- |
| Provider/API | OpenAI Responses API |
| Endpoint | `https://api.openai.com/v1/responses` |
| Model configuration | `OPENAI_MODEL=gpt-5.4-mini` |
| Source fallback model | `gpt-5.4-mini` |
| Request timeout | `20,000 ms` |
| Provider-side storage request | `store: false` |
| Automatic retry | None |
| Output mode | Strict JSON Schema plus domain validation before persistence |
| API key | Required for live runs; secret intentionally not recorded |
| Live provider calls during freeze | None |

Formal live-generation evidence must record the model identifier returned or
used at execution time and must not be mixed with mocked structural tests.

## Database and evaluation-data isolation

The freeze verification used `npm run test:integration`, which creates a
temporary MongoDB directory under `/tmp/burmese-stem-test.*`, binds an ephemeral
localhost port, and removes that directory after the run. It does not use the
normal development or production database.

For later local dynamic/simulation/black-box execution, use a dedicated database
named `burmesestemai_evaluation_b01` and artificial learner aliases. Record any
creation/reset command before use and remove only those evaluation records. The
dedicated formal database was not created during this freeze.

## Deployment qualification

| Item | B01 value |
| --- | --- |
| Deployment used by B01 | None; local evaluation baseline only |
| Documented public URL | Present in deployment documentation but excluded from B01 evidence |
| Deployed commit | Not verified; therefore not claimed |
| Verification attempt | Read-only SSH attempted with strict host-key checking; refused because the current host key was not already trusted |

No host-key check was bypassed. Before using the public deployment in formal
evaluation, independently verify its SSH host-key fingerprint, record the
deployed Git commit/worktree, confirm the container image/build, and either
create a separately identified deployment environment for B01 or freeze a new
baseline if its executable source differs.

## Environment qualifications

- Fresh `npm ci` completed, but npm warned that ESLint `9.39.5` is deprecated
  and listed five dependency install scripts not covered by npm's allow-scripts
  policy. The subsequent tests and production build succeeded.
- The first sandboxed production-build attempt could not resolve
  `fonts.googleapis.com`; the same source succeeded when network access was
  permitted. This is an external build-time dependency, not a silent code fix.
- Mongoose emitted a non-blocking deprecation warning for the existing profile
  DAO `new: true` option during integration testing.
- Structural and runtime checks do not establish Burmese linguistic quality,
  STEM-content accuracy, usability outcomes, or educational effectiveness.
