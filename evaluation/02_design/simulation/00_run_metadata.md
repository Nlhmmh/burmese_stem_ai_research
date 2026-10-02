# Simulation run metadata

| Field | Recorded value |
| --- | --- |
| Complete execution ID | `RUN-B01-20261001-SIMULATION-02` |
| Specification / artifact prefix | `SIM-RUN-01` (filenames retain this prefix; JSON run IDs identify execution 02) |
| Baseline | B01-A5-EVALUATION |
| Application commit | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Workspace HEAD at execution | `b2cdf27a13ecaa0800e9e6056f1907544b46bd46` |
| Protocol | A5-PROTOCOL-01 v2.1; acceptance criteria unchanged |
| Start / end UTC | 2026-10-01 10:38:45.239 / 10:43:52.701 |
| Start / end NZDT | 2026-10-01 23:38:45.239 / 23:43:52.701 |
| Technical operator | Codex under user direction; not a qualified human content assessor |
| Worktree before execution | Only untracked evaluation black_box, simulation and white_box directories; application diff against B01 empty |
| Runtime | Node v26.4.0; npm 11.17.0; MongoDB 8.2.6; Vitest 4.1.11 |
| Lock SHA-256 | `d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702` |
| Frozen references SHA-256 | `bcd2a676243c183634fa7deef59d79a048f4fd8fae8f84bd44d8f07137b44457` |
| Configured / observed model | `gpt-5.4-mini` / `gpt-5.4-mini-2026-03-17` |
| Provider settings | Application defaults; strict JSON schema; store=false; no custom sampling or retry |
| Configured timeout | 20000 ms; one aborted request measured 52825 ms, so no hard latency ceiling is claimed |
| Execution boundary | Real Next route handlers/services/DAOs plus live provider and isolated MongoDB; synthetic x-learner-id; no browser/middleware/deployment HTTP transport |
| Preferences | beginner / bilingual / guided / en / light; separate language cases use english and burmese supportLanguage |
| Browser / UI locale | No browser executed; en is the profile snapshot, not an observed UI locale |
| Isolated database | `burmese_stem_simulation_test`, localhost port 59843 |
| Temporary data location | `/tmp/burmese-stem-simulation.8LHe2k`; server stopped, data retained; portable final snapshot saved in raw/ |
| Command | `bash evaluation/02_design/simulation/raw/run_simulation.sh` |
| Runner result | Exit 0; accounting assertion completed 55 cases; NOT 55 route/content passes |
| Technical results at execution capture | 44 Pass; 8 controlled ambiguity/no session; 3 Fail; content assessment was recorded separately after execution |
| Calls / persisted state | 102 provider attempts; 47 sessions; 44 adaptations; 85 response events; 55 artificial profiles |
| Prior attempts | Sandbox EPERM before generation; interrupted execution 01 with 11 completed initial records and one following in-flight attempt, retained separately |

## Qualified human judgement — completed and endorsed

Reviewer name: **Nathan** — confirmed review and acceptance of all draft files; authorised typed sign-offs recorded by Codex.

STEM qualifications / domain competence: **Postgraduate-level knowledge with a strong STEM background** (user-provided). Specialist competence in every individual domain has not been independently established.

Burmese / English language competence: **Native Burmese speaker with advanced English proficiency** (user-provided). Nathan endorsed the language assessments; proposed substitutions are not certified scientific terminology.

AI draft and human endorsement date: **2 October 2026 (Pacific/Auckland)**. Human review start time: **not recorded**.

Human review end time: **not recorded**; no human review times are fabricated.

Additional assistance / roles: **Codex drafted content ratings, source-backed rationales and Burmese wording checks.** No additional qualified human reviewer is recorded.

Limitations and conflicts: The endorsed text-level assessments do not certify textbook terminology or establish learner comprehension. No independent second reviewer is recorded; potential self-evaluation bias remains. Nathan's saved SIM01-A entries and appended recheck, and SIM04-A language score of 1/Partial, are preserved. Source checks performed by Codex are not attributed as direct source consultation by Nathan.

Overall content conclusion: **Review completed with mixed adequacy: 18 Pass, 71 Partial and two Fail across 91 delivered outputs.** The official human-score CSV records the endorsed scores. The earlier draft's 19/70/2 totals are superseded by Nathan's saved SIM04-A amendment. These are artificial-output judgements, not educational-effectiveness evidence. The three technical failures remain Fail.

Reviewer signature and review date: **Nathan — authorised typed sign-off recorded by Codex, 2 October 2026.** See [approval record](review_completion/approval_record.md) and [qualified_human_judgement.md](qualified_human_judgement.md). Step 13 is complete with findings and limitations; Step 14 black-box testing is next. Raw evidence is immutable; do not replace the three failed attempts with later successful outputs.
