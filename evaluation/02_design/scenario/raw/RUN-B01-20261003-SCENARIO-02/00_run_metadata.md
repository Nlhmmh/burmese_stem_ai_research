# Step 17 run metadata

| Field | Value |
| --- | --- |
| Run / method | RUN-B01-20261003-SCENARIO-02 / DA-SCN |
| Date / timezone | 3 October 2026 / Pacific/Auckland, NZDT UTC+13 |
| Start | 11:43:50.702 NZDT (`2026-10-02T22:43:50.702Z`) |
| End / isolated server shutdown | 11:49:44.945 NZDT (`2026-10-02T22:49:44.945Z`) |
| Evaluator | Codex under user direction; technical artificial-scenario execution and provisional content analysis; not a participant or qualified human review |
| Source commit | B01 `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| HEAD at start | `54cc1881e00e41a6344a4aa6a533624cf4b86cc5` |
| Test/config profile | ROOTTESTS-02; no deterministic/integration suite rerun required or claimed for this scenario |
| Executed application | Existing production build of actual root `burmese_stem_ai`; build ID `IcyjNSC9EIpEI8VngSibk`; no copied source checkout |
| Source/lock/prompt/schema identity | 66 hashes in metadata.json, verified before/after; production unchanged |
| Runtime | Node v26.4.0, npm 11.17.0, MongoDB 8.2.6, Next.js 16.3.4 |
| Browser | Chrome 154.0.8037.97, 1654 × 992 actual viewport, no override |
| UI / support | English UI, light theme; bilingual Burmese + English Terms, beginner, guided |
| Provider | Live configured gpt-5.4-mini; returned gpt-5.4-mini-2026-03-17; five forwarded requests, no fixtures/retry/substitution |
| Provider contract | Responses API; strict JSON schema; store=false; configured 20-second timeout; no timeout observed |
| Local app / DB | `http://scenario-b01.localhost:57927`; isolated MongoDB URL in metadata.json; not user's configured DB |
| Identity | Artificial dedicated learner; exported as SCENARIO-LEARNER-01; real learner UUID/cookie excluded |
| Session | `a62cb72b-eb3f-4538-a74a-74ee467834d7` |
| Final state | completed, round 2, two adaptations, four response events, one relevant follow-up |
| Evidence totals | 18 public HTTP records, 18 post-request state snapshots, five live provider records, 24 browser observations, 27 JPEGs |
| Boundaries | Cap, High-at-cap, completed-response rejection are separately identified API-only checks, not UI actions |
| Technical verification | 15 Pass / 0 Fail in final verification.json; first verifier-oracle failure retained with correction note |
| Content conclusion | Provisional Partial; no new human scoring, signature, endorsement or learning-benefit inference |
| Cleanup | Browser tab closed; app/MongoDB stopped; synthetic DB retained at `/tmp/burmese-scenario-BNtdtI`; no database deletion |

## Commands and controls actually used

From the repository root:

```sh
node evaluation/02_design/scenario/raw/start_scenario.mjs
node evaluation/02_design/scenario/raw/check_api_boundaries.mjs cap-and-fade
node evaluation/02_design/scenario/raw/check_api_boundaries.mjs completed
node evaluation/02_design/scenario/raw/verify_scenario.mjs
```

The server command needed local-network permission after the sandbox rejected
port allocation. It started isolated `mongod` and root `next start` with an
evaluation-only preload observer, loading the configured provider key without
logging it. `DB_URL` was explicitly overridden for both processes. Browser
actions used the real visible controls, with unchanged fixed questions.
`finish.flag` caused final storage export and isolated-server shutdown.

Preflight run 01 and initial verifier output are retained separately. No
recorded application failure was repaired, hidden, or rerun here. Full raw
start/end times and request/provider durations are in JSON/JSONL records.
Source rechecks and documentation preparation are not represented as extra
application/model executions.

## Reproduction boundary

The scripts refuse to overwrite captured evidence. A future repeat needs a
new evaluation run ID/output directory, a fresh isolated database, the same
production baseline and recorded preferences/questions. Do not rerun these
hardcoded run-02 scripts against the existing evidence folder. Keep previous
scripts/manifest verifiable when making a versioned repeat harness.

Production inputs and code are reproducible; a live stochastic provider is
not guaranteed to return identical content or latency. Stored provider text,
schemas and state are the exact evidence for this attempt. No deployment,
user database, prompt or production source was modified.
