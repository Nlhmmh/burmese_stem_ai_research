# Pre-Refinement Environment Record

## Record Status

| Field | Recorded value |
| --- | --- |
| Related baseline | `B00-PRE-REFINEMENT` |
| Captured | `2026-09-29T14:24:27+13:00` (`NZDT`) |
| Purpose | Record the environment visible during pre-refinement inspection |
| Formal evaluation environment | Not yet frozen |
| Secrets included | None |

This record distinguishes locally installed tools from the Docker and production targets declared by the repository. It does not claim that the application or database was running in this environment.

## Host Environment

| Item | Observed value |
| --- | --- |
| Operating system | macOS `26.6.2` |
| OS build | `25G83` |
| Architecture | `arm64` |
| Time zone at capture | `NZDT`, UTC+13 |
| Workspace | `/Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research` |
| Application directory | `/Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai` |

## Runtime and Tool Versions

| Tool | Observed local version | Repository/deployment target or note |
| --- | --- | --- |
| Node.js | `v26.4.0` | Dockerfile uses `node:22-alpine`; README states Node `20.9+` for local development |
| npm | `11.17.0` | Package manager is npm |
| Next.js | `16.3.4` | Locked/installed application dependency |
| React | `19.2.8` | Locked/installed application dependency |
| React DOM | `19.2.8` | Locked/installed application dependency |
| TypeScript | `5.9.3` | Installed dev dependency |
| Mongoose | `9.9.4` | Installed persistence dependency |
| next-intl | `4.14.1` | Installed localisation dependency |
| ESLint | `9.39.5` | Installed dev dependency |
| Tailwind CSS | `4.3.3` | Installed dev dependency |
| tsx | `4.23.13` | Installed dev dependency |
| Docker | `28.3.0`, build `38b7060` | Available locally; no container operation performed |
| Docker Compose | `v2.38.1-desktop.1` | Available locally; no Compose operation performed |
| Local `mongod` binary | `8.2.6` | Availability only; no database connection was made |
| `mongosh` | `2.8.1` | Availability only; not used to query data |
| Compose MongoDB image | `mongo:7` | Declared in local and production Compose files |

The local Node and MongoDB tool versions are not automatically the final evaluation runtime. `B01` must record the versions actually used for formal execution.

## Installed Top-Level npm Packages

The dependency tree was inspected with `npm ls --depth=0` and reported no missing top-level dependency:

```text
@tailwindcss/postcss@4.3.3
@types/node@20.19.43
@types/react-dom@19.2.5
@types/react@19.2.18
dotenv@17.4.2
eslint-config-next@16.3.4
eslint@9.39.5
mongoose@9.9.4
next-intl@4.14.1
next@16.3.4
react-dom@19.2.8
react@19.2.8
tailwindcss@4.3.3
tsx@4.23.13
typescript@5.9.3
```

The authoritative dependency identity is the `package-lock.json` SHA-256 recorded in `artefact_versions.md`.

## Data Environment

| Item | Recorded state |
| --- | --- |
| Database technology | MongoDB through Mongoose |
| Local Compose target | `mongo:7` |
| Production Compose target | `mongo:7` |
| Actual running MongoDB server/version | Not queried |
| Database name in Compose | `burmesestemai` |
| Schema version field | Not implemented |
| Migration tool | Not implemented |
| Evaluation database | Not created |
| Evaluation learner identities | Not created |
| Reset/cleanup procedure | Not executed; must be defined before `B01` integration/dynamic testing |

No database read, write, index synchronization, dump, restore, container start, or cleanup was performed during Step 0.

## LLM and Generation Configuration

| Item | Recorded state |
| --- | --- |
| Provider/API | OpenAI Responses API |
| Endpoint in source | `https://api.openai.com/v1/responses` |
| Configured `OPENAI_MODEL` in local/production environment files | `gpt-5.4-mini` |
| Production Compose default | `gpt-5.4-mini` |
| Initial-session source fallback | `gpt-5-mini` |
| Adaptation source fallback | `gpt-4o-mini` |
| Follow-up source fallback | `gpt-4o-mini` |
| Request timeout | `20,000 ms` in each generation service |
| Provider storage | `store: false` |
| Automatic retry | None implemented |
| Structured output | Strict JSON Schema plus application-level validation |
| Live provider call during Step 0 | None |
| Mock provider/test harness | None configured at this baseline |

Only the non-secret model identifier was inspected. API keys, database connection strings, email addresses, hosts, and other secret/runtime values are not reproduced in this record.

Prompt and schema identity is captured through the service-file hashes in `artefact_versions.md`. A later shared LLM boundary or prompt change requires a new hash and baseline record.

## Browser, Viewport, and Deployment

| Item | Recorded state |
| --- | --- |
| Browser/version for formal evaluation | Not selected |
| Evaluation viewport(s) | Not selected |
| Live browser session | Not opened |
| Development server | Not started |
| Deployed URL | Not recorded here |
| Deployed commit | Not verified |
| EC2/container status | Not queried |
| Production build | Not run during Step 0 |

These fields remain intentionally unresolved until the post-refinement `B01` environment is frozen. No current-deployment claim can be derived from this record.

## Available Commands and Test State

Declared npm scripts at this baseline:

```text
npm run dev
npm run build
npm run start
npm run lint
npm run init-db
```

There is no `test`, coverage, or integration-test script. Step 1 of the refinement plan is expected to introduce a test harness, but this record does not claim that work has happened.

Read-only inspection commands used for Step 0 included Git status/revision queries, SHA-256 hashing, version queries, source searches, and `npm ls --depth=0`. They did not execute application behaviour.

## Known Environment Qualification

- Local Node `26.4.0` differs from the Docker Node 22 runtime. Formal results must identify which runtime was used.
- The installed local MongoDB binary `8.2.6` differs from the declared MongoDB 7 container. Its presence is not evidence that the PoC used MongoDB 8.2.6.
- Browser, viewport, deployed commit, database instance, artificial learner identities, and cleanup procedure are not yet frozen.
- No secret value has been intentionally recorded.
- This is preparation evidence only; it does not establish buildability, runtime correctness, usability, content quality, or educational effectiveness.

