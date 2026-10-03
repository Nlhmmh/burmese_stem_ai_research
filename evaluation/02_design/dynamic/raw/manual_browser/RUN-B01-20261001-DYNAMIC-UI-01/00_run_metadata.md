# Manual Browser Dynamic Analysis — Run Metadata

| Field | Value |
| --- | --- |
| Run ID | `RUN-B01-20261001-DYNAMIC-UI-01` |
| Baseline ID | `B01-A5-EVALUATION` |
| Executable B01 commit | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Repository HEAD before run | `7c245d886d0f0ad0cbe389e832f2410764348562` |
| Protocol | `A5-PROTOCOL-01`, version 2.1 |
| Protocol SHA-256 at template creation | `9e8472c4f0af77a92cf1ca761ad90791b3d25d1a141866fbb0954e41236b2b52` |
| Evaluator | Nathan |
| Start time | 1 October 2026 06:00 PM |
| End time | 1 October 2026 06:38 PM |
| Time zone | Pacific/Auckland (UTC+13) |
| Execution status | Executed |
| Overall outcome | Pass within the captured manual-browser scope |

## Purpose and claim boundary

This run captures the interactive browser observations that were unavailable
during `RUN-B01-20261001-DYNAMIC-01`. It is a technical evaluator inspection,
not a participant usability study. Screenshots and browser observations do not
establish Burmese linguistic quality, STEM-content correctness, learning gain,
retention, mastery, or educational effectiveness.

## Repository and baseline verification

Repository:

```text
/Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research
```

Application source verification command:

```sh
git diff --exit-code 37faefa236829aa3d79e023faa1fb72a086b5c2a -- burmese_stem_ai
```

| Check | Actual result |
| --- | --- |
| Application source matches B01 before/after the browser run | Pass |
| Command exit code | 0 |
| Unexpected application-source difference | None |
| Evaluation/documentation working tree | Dirty as recorded below; expected Assignment 5 evidence work only |

### Working tree before run

```text
M  docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md
M  evaluation/00_protocol/evaluation_protocol.md
A  evaluation/02_design/black_box/black_box_test_cases.md
A  evaluation/02_design/dynamic/dynamic_analysis.md
AM evaluation/02_design/dynamic/dynamic_analysis_test_cases.md
A  evaluation/02_design/dynamic/raw/DYN-RUN-01-adjudication.md
A  evaluation/02_design/dynamic/raw/DYN-RUN-01-api-database.jsonl
A  evaluation/02_design/dynamic/raw/DYN-RUN-01-command-log.md
A  evaluation/02_design/dynamic/raw/DYN-RUN-01-summary.json
A  evaluation/02_design/dynamic/raw/run_dynamic_api.mjs
A  evaluation/02_design/dynamic/timings.csv
A  evaluation/02_design/optimisation/bounds_analysis_test_cases.md
A  evaluation/02_design/simulation/simulation_test_cases.md
A  evaluation/02_design/white_box/white_box_test_cases.md
M  evaluation/03_results/evidence_register.csv
?? evaluation/02_design/dynamic/raw/manual_browser/
```

### Working tree immediately after capture

The following is the evaluator-provided post-run output. It is retained as a
historical record even though Step 15 subsequently moves the recovery image to
its planned location and updates the evaluation documents.

```text
M  ../docs/INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md
M  ../evaluation/00_protocol/evaluation_protocol.md
A  ../evaluation/02_design/black_box/black_box_test_cases.md
A  ../evaluation/02_design/dynamic/dynamic_analysis.md
A  ../evaluation/02_design/dynamic/dynamic_analysis_test_cases.md
A  ../evaluation/02_design/dynamic/raw/DYN-RUN-01-adjudication.md
A  ../evaluation/02_design/dynamic/raw/DYN-RUN-01-api-database.jsonl
A  ../evaluation/02_design/dynamic/raw/DYN-RUN-01-command-log.md
A  ../evaluation/02_design/dynamic/raw/DYN-RUN-01-summary.json
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/00_run_metadata.md
AM ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/network.har
AM ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/observations.md
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/01_home.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/02_initial_session.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/03_stage6b_options.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/04_adaptation_round1.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/05_limit_round2.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/06_fade.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/07_language_support.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/08_history.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/09_review_completed.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/10_resume_after_reload.png
A  ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/screenshots/11_provider_error.png
A  ../evaluation/02_design/dynamic/raw/run_dynamic_api.mjs
A  ../evaluation/02_design/dynamic/timings.csv
A  ../evaluation/02_design/optimisation/bounds_analysis_test_cases.md
A  ../evaluation/02_design/simulation/simulation_test_cases.md
A  ../evaluation/02_design/white_box/white_box_test_cases.md
M  ../evaluation/03_results/evidence_register.csv
?? ../evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/12_provider_recovery.png
```

## Runtime environment

| Field | Actual value |
| --- | --- |
| Operating system | macOS 26.6.2, build 25G83 |
| Browser | Google Chrome 154.0.8037.59 |
| Viewport | 1440 × 900 |
| UI locale | English |
| Theme | Light |
| Node.js | 26.4.0 |
| npm | 11.17.0 |
| Next.js | 16.3.4 |
| MongoDB | 8.2.6 |
| Application URL | `http://127.0.0.1:3100` |
| MongoDB host/port | `127.0.0.1:27018` |
| Database | `burmesestemai_evaluation_b01` |
| MongoDB data directory | `/private/tmp/burmese-stem-dynamic.dRsmRv` — retained after the run |
| Provider mode | Live configured provider except the explicitly controlled invalid-key fault |
| Non-secret model | `gpt-5.4-mini` |
| End-of-run process state | Application and MongoDB stopped; retained database directory preserved |

No API key or `.env` content is recorded.

## Artificial learner identity

| Alias | UUID cookie | Purpose |
| --- | --- | --- |
| `DYN-OWNER-A` | `00000000-0000-4000-8000-0000000000a1` | Retained isolated evaluation sessions and new artificial browser workflow |

| Identity check | Actual result |
| --- | --- |
| Cookie set through Chrome DevTools | Pass; artificial owner UUID used |
| Retained evaluation sessions visible | Pass; History/Review/Resume evidence includes retained artificial sessions |
| Real learner data used | No |

## Dependency modes

| Observation group | Dependency mode |
| --- | --- |
| UI-01–UI-10 | B01 application, retained isolated MongoDB, live configured provider where generation was required |
| UI-11 | B01 application, retained isolated MongoDB, intentionally invalid local provider key |
| UI-12 | B01 application, retained isolated MongoDB, normal live configured provider restored |

## Manual observation inventory

| Observation | Captured? | Actual filename |
| --- | --- | --- |
| UI-01 Home | Yes | `screenshots/01_home.png` |
| UI-02 Initial session | Yes | `screenshots/02_initial_session.png` |
| UI-03 Stage 6B | Yes | `screenshots/03_stage6b_options.png` |
| UI-04 First adaptation | Yes | `screenshots/04_adaptation_round1.png` |
| UI-05 Round-two limit | Yes | `screenshots/05_limit_round2.png` |
| UI-06 Fade | Yes | `screenshots/06_fade.png` |
| UI-07 Language support | Yes | `screenshots/07_language_support.png` |
| UI-08 History | Yes | `screenshots/08_history.png` |
| UI-09 Completed Review | Yes | `screenshots/09_review_completed.png` |
| UI-10 Resume after reload | Yes | `screenshots/10_resume_after_reload.png` |
| UI-11 Provider error | Yes | `screenshots/11_provider_error.png`; HTTP 502 in `network.har` |
| UI-12 Provider recovery | Yes | `screenshots/12_provider_recovery.png`; HTTP 201 in `network.har` |
| Browser network trace | Yes | `network.har` |
| Observation record | Yes | `observations.md` |

## Session identifiers

| Workflow | Session ID | Status at capture | Notes |
| --- | --- | --- | --- |
| Osmosis Stage 6B/round-two/Resume | `f7c88ece-ec4e-4a22-bd86-e1a42911f0c6` | `review_recommended` | Left unfinished through reload; limit and next action reconstructed |
| Retained Gravity fade | `2471dfd3-87af-433c-8f40-aee0121a15b6` | `in_progress` | Fade 0→0; no adaptation card; separate finish action |
| Retained Electric-current language support | `6b1c1947-7682-4203-ab89-f16b3c80fbfd` | `in_progress` | English and Burmese adapted support visible |
| Completed Photosynthesis Review | `9e5969ec-d6d8-4413-a4e7-d56b65698953` | `completed` | Follow-up, two adaptations, and three response events reconstructed |
| Provider-recovery Photosynthesis | `9c74c72e-825c-4b08-a486-e09e01303d2b` | `in_progress` | Created after controlled HTTP 502 attempt |

## Attempts and retries

| Attempt ID | Observation | Action/input | Actual result | Retry relationship | Evidence locator |
| --- | --- | --- | --- | --- | --- |
| `UI13-FAULT-01` | UI-11 | Submit `What is photosynthesis?` with intentionally invalid local provider key | HTTP 502; `SESSION_GENERATION_FAILED`; safe learner-facing error; question retained | Original controlled failure | `screenshots/11_provider_error.png`; `network.har` at `2026-10-01T05:31:09.698Z` |
| `UI13-RECOVERY-01` | UI-12 | Submit the unchanged question after restoring normal provider configuration | HTTP 201; Photosynthesis session created and rendered | Retry of `UI13-FAULT-01` | `screenshots/12_provider_recovery.png`; `network.har` at `2026-10-01T05:37:46.343Z` |

## Console, network and security review

| Check | Actual result |
| --- | --- |
| Unexpected browser-console errors | None reported during the pass; no separate console export was captured |
| HAR traffic scope | All 168 entries target `127.0.0.1:3100` |
| HAR learner data | Artificial evaluation workflows only; cookie values were not exported |
| HAR credentials | No `Authorization` header, API key, cookie value, or `Set-Cookie` value found |
| Screenshot privacy | No terminal secret, real learner data, or unrelated personal information visible |
| Learner-facing provider error | Safe domain message only; no raw provider detail visible |

## Deviations, issues and blocked observations

1. The recovery screenshot was initially saved at the run-directory root and
   was moved to `screenshots/12_provider_recovery.png` during Step 15. The image
   content was not modified.
2. The initially entered end time of 6:32 PM was corrected to 6:38 PM. File and
   HAR timestamps show that provider recovery and the final export continued
   through 6:38 PM.
3. No functional deviation was observed in UI-01–UI-12.
4. This run did not cover mobile, Burmese UI, Dark theme, systematic
   keyboard-only interaction, or the full preferences matrix.
5. Direct provider-call absence for capped and fade responses was not
   instrumented by this browser pass; those narrow DYN-05/DYN-06 assertions
   remain qualified.

## End-of-run evidence registration

| Field | Value |
| --- | --- |
| Observation record evidence ID | `E010` |
| Run metadata evidence ID | `E011` |
| Screenshot-manifest evidence ID | `E012` |
| HAR evidence ID | `E013` |
| Hash command completed | Yes; SHA-256 recorded in the evidence register and screenshot manifest |
| Evidence register updated | Yes |
| `dynamic_analysis.md` manual addendum updated | Yes |
| Relevant workflow/FURPS rows updated | Yes, within the directly observed scope |

## Evaluator sign-off

| Field | Value |
| --- | --- |
| Name | Nathan |
| Date | 1 October 2026 |
| Overall run outcome | Pass within the captured manual-browser scope |
| Signature or initials, if required | Nathan |
