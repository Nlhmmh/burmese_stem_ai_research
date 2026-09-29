# Pre-Refinement Artefact Versions

## Document Control

| Field | Recorded value |
| --- | --- |
| Baseline identifier | `B00-PRE-REFINEMENT` |
| Baseline role | Design-preparation snapshot before PoC refinement |
| Protocol | `A5-PROTOCOL-01`, version `1.0` |
| Captured | `2026-09-29T14:24:27+13:00` (`NZDT`) |
| Baseline preparer | Codex repository-inspection agent |
| Formal evaluator | Not assigned or recorded |
| Formal evaluation status | Not started |
| Final evaluation baseline | Not assigned; reserve `B01` for the reproducible post-refinement PoC |

`B00-PRE-REFINEMENT` records the application state inspected before implementing the refinement plan. It is not a FURPS result, test result, final Assignment 5 baseline, or claim that the PoC satisfies the refined artefacts.

## Source Snapshot

| Field | Recorded value |
| --- | --- |
| Repository branch | `feat/evaluation_update` |
| Upstream | `origin/feat/evaluation_update` |
| Commit | `9afc92757c1a85183063dc7ce5c15ce62d32a74d` |
| Short commit | `9afc927` |
| Commit date | `2026-09-29T12:34:55+13:00` |
| Commit subject | `feat: conceptual evalution finished` |
| Git tree | `2f9de796a0339eacbfb767e43d126115eda9bdcf` |
| Tracked modifications before Step 0 | None |
| Untracked inputs before Step 0 | `evaluation/burmese_stem_ai_refinement_review.md` |

The exact pre-Step-0 worktree status was:

```text
## feat/evaluation_update...origin/feat/evaluation_update
?? evaluation/burmese_stem_ai_refinement_review.md
```

A commit hash alone does not identify this baseline. The snapshot consists of the tracked tree at `9afc927` plus the untracked refinement review with the SHA-256 recorded below. The Step 0 records themselves were created after that snapshot was captured and describe it; they are not application changes.

## Artefact Hashes

Hashes use SHA-256.

| Artefact | SHA-256 | Role |
| --- | --- | --- |
| `README.md` | `195cbd349a8977314a228de5b604b8d4958ab51084a8ab3cd54bbddffb142897` | Research and system overview |
| `evaluation/complete_conceptual_artefacts_refined.md` | `351aa50848d8c92eb23996d4714567a9c13589161d6fdbeada9663f6a8ec6d76` | Refined conceptual artefacts |
| `evaluation/complete_system_artefacts_refined.md` | `4c8392dc3e409ec4980027b12107abffd7b65f468fbb428571a938ff64d7f7c7` | Authoritative refinement specification |
| `evaluation/00_protocol/evaluation_protocol.md` | `1a305427e5006009b70fe5fe7a55080afdc00c8f1c4e6f0d1afd4d7a12074585` | Protocol before this Step 0 documentation update |
| `evaluation/burmese_stem_ai_refinement_review.md` | `3690e6a2a65dbb201ccd2c62db9cdd6ed53f94bb328916c104483eac68a775ed` | Untracked refinement audit and plan at capture time |
| `burmese_stem_ai/README.md` | `2ed864a14fe1248c3de3cd46b1d371478201a5f1beca672f0769c35477afda86` | Current technical contract/documentation |
| `burmese_stem_ai/package.json` | `591cdb17e234984f8b9c62d99faffbfb4e8f8a161985bdafe6c8d1e20c8a0dee` | Application and command manifest |
| `burmese_stem_ai/package-lock.json` | `f12a31cfea44f854d71262abba621870bf56b5da78186f04a3fda77749882ac9` | Locked npm dependency graph |
| `burmese_stem_ai/lib/constants.ts` | `f2e1406e241ffe6ef56c294569b3bb44abc1c1e0a53a0beb0475334df3875cfc` | Bounds and current domain constants |
| `burmese_stem_ai/data/schemas/profile.schema.ts` | `c8b0ce4430312336d0685edd8c1ef766a13e92ad08d694e28122acbd503574b0` | Profile schema |
| `burmese_stem_ai/data/schemas/session.schema.ts` | `c5e36a85fbeff2c7ca9184e7fd3e6a33cbda3d7a3784c3e7c3cac7e60a413279` | Learning-session schema |
| `burmese_stem_ai/services/session.service.ts` | `ca01a417f22d0e3dd0aaf4989f0b137aeb086a84b17c9aec930c9ceb582bbb6f` | Initial-session prompt, schema, and workflow |
| `burmese_stem_ai/services/adaptation.service.ts` | `50e6fed19d6fc1d23b68d882d545bdd3ec131f6511612e97a95941fe53a15cf5` | Current adaptation prompt and control logic |
| `burmese_stem_ai/services/followup.service.ts` | `07df4ace702065db67a6380d1f1ccdb594fbcec63750ead33f0aa8819d72d1c8` | Follow-up prompt and scope behaviour |
| `burmese_stem_ai/services/session-lifecycle.service.ts` | `00797adf3e76be80b8a2404e82a835a796f0bdd1bcf2cf03ea984856edbb84b9` | Retrieval and completion lifecycle |

The protocol hash above intentionally identifies its pre-Step-0 content. After this record was created, the protocol received a documentation-only note that the baseline files now exist. That edit does not change an application contract or the recorded pre-refinement PoC.

## Application and Schema Version

| Item | Recorded value |
| --- | --- |
| npm package name | `burmese_stem_ai` |
| npm package version | `0.1.0` |
| Explicit database schema version | None implemented |
| Migration framework/version | None implemented |
| Session schema identity | File hash recorded above |
| Profile schema identity | File hash recorded above |
| Maximum adaptation rounds | `2` |
| Maximum follow-ups | `2` |
| Maximum follow-up length | `500` characters |
| Session statuses | `in_progress`, `review_recommended`, `completed` |
| Learner response values | `high`, `medium`, `needs_support`; initial value `null` |

Because the application has no explicit schema-version field or migration system, the schema file hashes are the baseline identifiers for the stored document shapes.

## Existing Application Commands

These are the commands declared in `burmese_stem_ai/package.json` at `B00-PRE-REFINEMENT`:

| npm command | Definition | Baseline status |
| --- | --- | --- |
| `npm run dev` | `next dev` | Present; not executed for Step 0 |
| `npm run build` | `next build` | Present; not executed for Step 0 |
| `npm run start` | `next start` | Present; not executed for Step 0 |
| `npm run lint` | `eslint` | Present; not executed as formal evaluation for Step 0 |
| `npm run init-db` | `tsx data/init-db.ts` | Present; not executed |
| `npm test` | Not defined | No automated test harness at this baseline |

The preceding refinement review recorded a successful read-only lint run with zero errors and two warnings, and a successful TypeScript `--noEmit --incremental false` check. Those observations are implementation-audit context, not formal `B01` evaluation results.

## Reproduction Rule

To identify this snapshot:

1. Check out commit `9afc92757c1a85183063dc7ce5c15ce62d32a74d`.
2. Confirm Git tree `2f9de796a0339eacbfb767e43d126115eda9bdcf`.
3. Restore `evaluation/burmese_stem_ai_refinement_review.md` and verify SHA-256 `3690e6a2a65dbb201ccd2c62db9cdd6ed53f94bb328916c104483eac68a775ed`.
4. Verify the contract and source hashes in this document.
5. Use `environment.md` to distinguish the observed local tools from Docker/deployment targets.

If any source, prompt, structured-output schema, dependency lockfile, or expected behaviour changes, it no longer represents `B00-PRE-REFINEMENT`.

## Scope Boundary

This step did not:

- edit application source, schemas, prompts, or deployment configuration;
- connect to or mutate MongoDB;
- call the LLM provider;
- run the development server or production build;
- execute formal static, dynamic, simulation, black-box, white-box, FURPS, or usability evaluation;
- create `B01`.

