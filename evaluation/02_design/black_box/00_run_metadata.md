# Black-box run metadata

| Field | Recorded value |
| --- | --- |
| Run | `RUN-B01-20261002-BLACKBOX-01` |
| Baseline / app commit | B01-A5-EVALUATION / `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Workspace HEAD at start | `6eeed1f0afe0402b927410399bea656ed2599cb9` |
| Protocol | A5-PROTOCOL-01 v2.1 acceptance rules; discrepancies retained, no silent amendment |
| Start UTC / NZDT | 2026-10-02 05:58:48.132 / 2026-10-02 18:58:48.132 |
| End UTC / NZDT | 2026-10-02 06:16:10.350 / 2026-10-02 19:16:10.350 |
| Technical evaluator | Codex under user direction; no participant or independent human reviewer in this run |
| Node / npm / MongoDB | v26.4.0 / 11.17.0 / 8.2.6 |
| Next.js | 16.3.4 (installed production build) |
| Production build ID | `IcyjNSC9EIpEI8VngSibk`; existing build used, no rebuild/source modification |
| Lock SHA-256 | `d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702` |
| Pre-run specification SHA-256 | `61f2e58ee8024efa0dab3c7bd35c2b48ffb2267216b1950d01e769573803da13` |
| API / browser URL | `http://127.0.0.1:53196` / `http://bb-b01.localhost:53196` (isolated servers now stopped) |
| Browser / viewport | Google Chrome 154.0.8037.97 / 1654×992, no viewport override |
| Browser version basis | Installed Chrome.app Info.plist; DOM-backed viewport recorded in `browser_environment.json` |
| UI locale / theme | English / Light; support-language modes bilingual, English and Burmese exercised |
| Database | `burmese_stem_blackbox_test` on isolated localhost mongod port 53195 |
| Temporary data | `/tmp/burmese-stem-blackbox.C4Vra2`; server stopped, synthetic data retained and exported |
| API owner A / B | Dedicated UUID aliases recorded in raw metadata; valid learner cookies used; client identity headers not trusted |
| Browser learner | Separately minted cookie on dedicated test hostname; final History contained ten owner-scoped sessions |
| Provider mode | Evaluation-only preload at the external fetch seam; dummy credential/model `bb-controlled-fixture`; 112 fixture attempts, no external provider calls |
| Main API result | 24 cases; first outcomes 22 Pass/2 Fail; 370 assertions (368 true/2 false) |
| Assessed cases | 21 Pass, 2 Partial, 1 Fail; see analysis for semantic-scope limits and oracle mismatches |
| Browser/addendum | 44 browser observations/46 predicates; four retained false predicates with rechecks; 9 supplementary HTTP attempts/11 assertions true |
| Saved state | 42 sessions, 3 profiles, 25 adaptations, 28 response events, 7 follow-ups |
| Integrity verification | 29 successful API detail projections match stored fields; browser order/ownership and exact completed Review text checked; app diff against B01 empty |
| Cleanup | Main runner exited 0 after saving final snapshot and stopping its two isolated servers; exit 0 is completion/accounting, not an all-case pass |

## Commands and dependency controls

```sh
node --check evaluation/02_design/black_box/raw/run_black_box.mjs
node --check evaluation/02_design/black_box/raw/provider-hook.cjs
node evaluation/02_design/black_box/raw/run_black_box.mjs
node evaluation/02_design/black_box/raw/public_boundary_addendum.mjs
node evaluation/02_design/black_box/raw/verify_black_box.mjs
git diff --exit-code 37faefa236829aa3d79e023faa1fb72a086b5c2a -- burmese_stem_ai
```

The sandbox loopback preflight returned EPERM before any app test. The main/addendum commands ran through the approved execution path allowing loopback servers; no production resource was used. Chrome actions used the provided browser surface. A `finish.flag` was created only after browser and supplementary checks; the main runner then exported state and stopped its processes.

The runner starts `mongod` on an ephemeral port and the existing Next production build via Node with the copied evaluation-only provider preload. It overrides `DB_URL`, `OPENAI_API_KEY` and `OPENAI_MODEL`; no secret value is captured. Only the dedicated provider URL is intercepted. All other HTTP/app/database behaviour remains real. The test timer is unchanged at 20,000 ms. Non-2xx, timeout and malformed-output injections are controlled external-dependency fixtures, not spontaneous failures.

Main raw records are under [raw/RUN-B01-20261002-BLACKBOX-01](raw/RUN-B01-20261002-BLACKBOX-01). `http.jsonl` contains exact requests/responses and predefined before/after persistence observations; `results.jsonl` preserves first assertions; `provider.jsonl` captures the safe fixture request boundary; `fixture_outputs.jsonl` retains test output; browser JSON snapshots and JPEGs preserve UI evidence. Supplementary requests are in their own JSONL. App console logs retain actual warnings/errors. The case/per-assertion CSVs and [analysis](black_box_analysis.md) consolidate those records.

## Reproduction and amendment

The script refuses to overwrite this run directory. Reproduction requires the recorded B01 source/dependency identity, a corresponding production build, local mongod, and a **new run ID** with its own folder. Reuse the frozen specification/provider fixtures, not edited successful outputs. Repeat browser actions against the new dedicated test host, following the observation sequence, and retain first failures/rechecks separately. Do not replace current raw records, clear production collections, or present fixture content as new live model results. Build ID/hash and runtime differences must be recorded in the new run.

Human review of new live output is not claimed: this run generated no live-model output. Earlier simulation sign-offs remain scoped to their original texts. Fixture-only semantic adequacy and the wider usability matrix remain explicit scope limitations, not blank invented approvals.
