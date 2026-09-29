# B01 Assignment 5 Evaluation Baseline

## Document control

| Field | Frozen value |
| --- | --- |
| Baseline identifier | `B01-A5-EVALUATION` |
| Baseline role | Formal Assignment 5 implementation baseline |
| Protocol | `A5-PROTOCOL-01`, version `2.0` |
| Executable source commit | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Executable source tree | `cfe77d820bebc93f743e80c82c8b61809c7e08bd` |
| Source commit subject | `test: cover refined scaffolding workflow` |
| Source commit date | `2026-09-30T10:58:12+13:00` |
| Source branch | `feat/evaluation_update` |
| Source upstream at capture | `origin/feat/evaluation_update`, aligned with local source commit |
| Baseline tag | `a5-evaluation-b01` |
| Tag target | The documentation commit containing this manifest; resolve with `git rev-list -n 1 a5-evaluation-b01` |
| Captured | 30 September 2026, NZDT (UTC+13) |
| Formal evaluation status | Baseline frozen; FURPS and other formal evaluation execution not started by this record |

The executable application and tests evaluated as B01 are exactly the tree at
source commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`. The annotated tag also
contains the baseline records added after that source commit; those Markdown
records do not change the executable build. B00 remains a separate historical
pre-refinement snapshot.

## Dependency and protocol identity

All hashes below are SHA-256 values calculated from the executable source
commit.

| Artefact | SHA-256 | Baseline role |
| --- | --- | --- |
| `burmese_stem_ai/package-lock.json` | `d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702` | Locked dependency graph |
| `burmese_stem_ai/package.json` | `bbfeb2e496ced443055733fc614034a0c8c0cf3ae5b3d3774f136f4eb6139ae8` | Application version and commands |
| `evaluation/00_protocol/evaluation_protocol.md` | `d8c368c588858f871f42a33ffde3f93218da47ab54c32083b169666031f59849` | Protocol version 2.0 oracle |
| `evaluation/complete_conceptual_artefacts_refined.md` | `351aa50848d8c92eb23996d4714567a9c13589161d6fdbeada9663f6a8ec6d76` | Refined conceptual artefact |
| `evaluation/complete_system_artefacts_refined.md` | `4c8392dc3e409ec4980027b12107abffd7b65f468fbb428571a938ff64d7f7c7` | Refined system specification |

## Domain, schema, prompt, and structured-output identity

The project has no separately versioned prompt files or database migration
version. The complete service/schema file hashes therefore identify each prompt,
strict JSON Schema, validator, route decision, and stored-document shape as a
single reproducible unit.

| Artefact | SHA-256 | Identity covered |
| --- | --- | --- |
| `lib/constants.ts` | `9e7c786d5b1744002173d945eda3e4501a722586b3659a946270e2ea703c686d` | Limits, statuses and compatibility constants |
| `lib/session-domain.ts` | `157508e1aa246c70d48d387a69f08ac65fc2557b4e40f0d234efb4cc49f51dcc` | Stage 6A/6B and Stage 7 domain vocabulary |
| `data/schemas/session.schema.ts` | `37d21a4dfff547810a1e2b4fb2ac93589ecec39dc8634b8f4effadd448946b7e` | Session/document schema |
| `data/schemas/profile.schema.ts` | `e1795e50178cf56e1c38b7b449f5ec36bf25d63f52f2bb4e3f95982b22d336c7` | Profile/preferences schema |
| `services/llm-provider.ts` | `0b4f33774d69cddb8556e8af2cf3122c113105b7f38f5ab7fab8f1b38c06fb07` | Provider URL/model fallback/timeout/extraction boundary |
| `services/session.service.ts` | `0ae2da0676278075b268a6a9d4b215c6837c18ecc9985f2f48b30222668de472` | Initial Stages 1–5 prompt, schema and validation |
| `services/adaptation-routing.service.ts` | `e3af3e2bfa9a49cc65b3179483c136755230d562de00ddc8312554ea5bd29f1e` | Deterministic Stage 7 route table |
| `services/adaptation.service.ts` | `1d76b4edabf1c72d6a73306be9ff42ea9732c465d2d865e0dca8f2c8b134def7` | Route-specific prompts, schemas, validation and state workflow |
| `services/followup.service.ts` | `9827a0cbfae33b12bfd925e390dae9baef38fe9ae795214102d99eb82132e0cc` | Follow-up prompt, schema and scope contract |
| `vitest.config.mts` | `f37dd90ad06fc840c3eb0d968021162ff8dcd768b398070401660483e92e258f` | Deterministic suite and V8 scope |
| `vitest.integration.config.mts` | `43f36bd06bf6aec4aaa3832badd9f4c473b35440fe99ba110ef0c4f635bdbaad` | Isolated MongoDB suite configuration |

## Frozen application contract

| Item | B01 value |
| --- | --- |
| npm package/version | `burmese_stem_ai@0.1.0` |
| Explicit database schema version | None; schema hashes above are authoritative |
| Stage 6A values | `high`, `medium`, `needs_support` |
| Stage 6B values | `simpler_explanation`, `another_example`, `language_terms`, `concept_unclear`, `concept_mismatch`; optional for Medium/Needs Support |
| Stage 7 routes | `fade`, `stage_5_scaffold`, `language_support`, `concept_clarification`, `context_reinterpretation` |
| Generated-adaptation maximum | `2`; fade and capped response events do not increment it |
| Follow-up maximum | `2`; maximum question length `500` characters |
| Session statuses | `in_progress`, `review_recommended`, `completed` |
| Inquiry maximum | `1,000` characters |

## Reproduction sequence

From a clean clone with Node/npm and MongoDB matching
[`b01_environment.md`](b01_environment.md):

```sh
git checkout a5-evaluation-b01
test "$(git rev-parse 37faefa236829aa3d79e023faa1fb72a086b5c2a^{tree})" = "cfe77d820bebc93f743e80c82c8b61809c7e08bd"
git diff --exit-code 37faefa236829aa3d79e023faa1fb72a086b5c2a -- burmese_stem_ai
cd burmese_stem_ai
npm ci
npm test
npm run test:coverage
npm run lint
npm run build -- --webpack
npx tsc --noEmit
npm run test:integration
git status --porcelain=v1
```

The production build precedes the standalone TypeScript command because a
fresh clone does not contain Next.js's ignored generated type file. The build
also requires network access to retrieve the declared Google font assets.

## Change-control rule

Any source, prompt, schema, dependency, route oracle, test assertion, deployment
configuration, or evaluation criterion change after this freeze creates a new
baseline ID and tag. Record the reason, retain B01 evidence, and rerun every
affected check/case. Never edit B01 results to make a later build appear to be
the evaluated build.
