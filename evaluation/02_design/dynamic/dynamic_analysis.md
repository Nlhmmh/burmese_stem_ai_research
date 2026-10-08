# Dynamic analysis

Detailed sections: [Case register](#case-register).

## Run and scope

RUN-B01-20261001-DYNAMIC-01 used the real local B01 application, live provider and isolated MongoDB. Nathan completed manual browser pass RUN-B01-20261001-DYNAMIC-UI-01 in Chrome 154.0.8037.59 at 1440 × 900, English/light. Evidence E004–E013.

## Case register

Each row contains the case contract and its recorded result. Shared run conditions above apply unless a row states otherwise. Outcomes and limitations are retained from the evidence; this layout change is not a new test run.

| Case | Case details / action | Conditions / inputs | Expected result | Actual result | Outcome | Limitation | Observation notes / evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DYN-01 | Application and dependency readiness<br>Start the B01 application and dedicated database, open Home, and call the health/root API. | B01 source, isolated MongoDB and configured live provider; application readiness precedes session creation. | Application responds; database connection succeeds on first stateful operation; actual ports and configuration are recorded; no secret is captured in evidence. | API/DB readiness and rendered Home controls | Pass | Desktop Chrome, English, Light scope | enabling technical evidence; F13.<br>E004–E009; browser addendum E010–E013. |
| DYN-02 | Initial live session creation<br> | Precondition: `DYN-OWNER-A` has bilingual/beginner/guided preferences.<br>Input: `What is photosynthesis, and how do plants make food?` | One initial provider request produces HTTP 201; visible and stored session IDs match; concept/domain and all Stage 4/5 fields are present; status is `in_progress`, round is 0, understanding is null, and refined collections start empty. | Live HTTP 201, stored round-0 state and structured Osmosis UI | Pass | Initial support structure/state observed in one local workflow; content quality is assessed separately. | F1–F4, F9, F12; RQ1–RQ3.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: UI/state agreement observed |
| DYN-03 | Default Medium adaptation<br>On DYN-02, send Medium with no Stage 6B choice. | Owned DYN-02 session at round 0; Medium without a Stage 6B choice.<br>B01, isolated MongoDB and live provider, except labelled fault. | Route `stage_5_scaffold`, support type `another_example`, one provider request, one materially new adaptation, response event 0→1, stored round 1, status `in_progress`, and UI/state agreement. | Default Medium route, event 0→1 and rendered first adaptation | Pass | Route/state change observed; meaningful content quality is not established by this dynamic check. | F5–F7, F9; RQ3.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: UI/state agreement observed |
| DYN-04 | Conceptual clarification as second adaptation<br>Send Needs Support + `concept_unclear` on DYN-03. | Owned DYN-03 session at round 1; Needs Support with concept_unclear.<br>B01, isolated MongoDB and live provider, except labelled fault. | Route `concept_clarification`, one provider request, distinct Stage 4 meaning plus one scaffold, event 1→2, stored round 2, two adaptations, status `review_recommended`, and UI/state agreement. | Concept clarification, event 1→2, second adaptation and review state | Pass | Route/state change observed; conceptual and bilingual adequacy are assessed separately. | F5–F7, F9; RQ2–RQ3.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: UI/state agreement observed |
| DYN-05 | Capped response<br>Send Needs Support with no Stage 6B choice on DYN-04. | Owned DYN-04 session at round 2; Needs Support without a Stage 6B choice.<br>B01, isolated MongoDB and live provider, except labelled fault. | Response event is appended with 2→2; no provider request, third adaptation, or round increment; status remains `review_recommended`; controlled limit feedback is visible. | Capped event 2→2, no third adaptation/round, visible limit and Finish | Partial Pass | Zero provider calls remain indirectly supported rather than instrumented | F5–F7, F9; U4, U7; RQ3.<br>E004–E009; browser addendum E010–E013. |
| DYN-06 | High/fade on a fresh session<br>Create a fresh session and send High. | Fresh owned session at round 0; High response.<br>B01, isolated MongoDB and live provider, except labelled fault. | Route `fade`; event 0→0; no provider request or adaptation; status remains `in_progress`; completion remains a separate action. | High/fade event 0→0, no adaptation card and separate Finish | Partial Pass | Zero provider calls remain indirectly supported rather than instrumented | F5–F7, F9; RQ3.<br>E004–E009; browser addendum E010–E013. |
| DYN-07 | Language-support route<br>On a fresh session, send Medium + `language_terms`. | Fresh owned session at round 0; Medium with language_terms; preserve saved profile.<br>B01, isolated MongoDB and live provider, except labelled fault. | Route `language_support`, support type `clarification`, bilingual presentation override, one provider request, event 0→1, visible English and Burmese support without changing the stored learner profile. | Language route, unchanged profile and English+Burmese rendering | Pass | Rendering verified; linguistic correctness not assessed | F3, F5, F6, F9, F12; U6; RQ1.<br>E004–E009; browser addendum E010–E013. |
| DYN-08 | Bounded concept reinterpretation<br>If a session exists with the wrong/qualified interpretation, send Needs Support + `concept_mismatch` with `I mean a biological cell`. | Owned below-cap session requiring intended-context correction; bounded clarification supplied.<br>B01, isolated MongoDB and live provider, except labelled fault. | Route `context_reinterpretation`; one bounded provider request below cap; outcome is explicitly `corrected` or `ambiguous`; previous/current interpretation and clarification persist. A corrected outcome updates active concept and downstream support; an ambiguous outcome does not guess. | Bounded reinterpretation corrected `cell` to biology and persisted trace | Pass | One corrected cell interpretation observed, not universal intended-meaning recovery. | F2, F5, F6, F9, F11; RQ1–RQ3.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: Runtime API/database evidence complete |
| DYN-09 | Relevant follow-up<br> | Owned active concept matching the fixed relevant question; fewer than two saved follow-ups.<br>Input: `Why do plants need sunlight for photosynthesis?` | HTTP 200; answer uses active concept/latest scaffold and persists exactly once; follow-up does not alter route, round, response events, or adaptations. | Relevant follow-up persisted once without Stage 7 mutation | Pass | One concept-scoped answer observed, not a general answer-quality or learning result. | F8, F9; RQ2–RQ3.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: Runtime API/database evidence complete |
| DYN-10 | Unrelated follow-up<br> | Owned active concept and an unrelated fixed question; preserve session and follow-up allowance.<br>Input: `How does gravity work?` in the Photosynthesis session. | HTTP 422 with `FOLLOW_UP_OUT_OF_SCOPE` and `newSessionRecommended: true`; no follow-up is persisted and Stage 7 state is unchanged. | HTTP 422 out-of-scope result; no persistence or Stage 7 mutation | Pass | Initial driver-path false failure retained and adjudicated | F8, F9, F13; U8; RQ3.<br>E004–E009; browser addendum E010–E013. |
| DYN-11 | History, Review, and Resume<br>Load History as owner A, reopen the unfinished session, reload, and compare visible content to stored state. Attempt the same session as owner B. | Owned unfinished/completed sessions with history, plus separate synthetic owner for isolation.<br>B01, isolated MongoDB and live provider, except labelled fault. | Owner A sees newest-first accurate history and reconstructed initial/adaptation/response/follow-up state; limits and next action are preserved. Owner B does not retrieve owner A's session. | Newest-first history, detail reconstruction, ownership, Review and Resume | Pass | Hydrated desktop History/Review/Resume only; no participant or all-device claim. | F9–F11, F13; U5, U7, U9; RQ3.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: Hydrated History/Review/Resume observed in browser |
| DYN-12 | Completion and post-completion response<br>Complete an eligible session, repeat completion, then send another learner response. | Owned non-completed session; explicit Finish, repeated Finish, then a learner response.<br>B01, isolated MongoDB and live provider, except labelled fault. | First completion returns/stores `completed`; repeated completion is idempotent; post-completion response returns HTTP 409 `SESSION_RESPONSE_CONFLICT` with no mutation. | Completion, idempotent repeat, post-completion HTTP 409/no mutation | Pass | Completion is a lifecycle result, not demonstrated mastery. | F7, F9, F11, F13; U7–U8.<br>E004–E009; browser addendum E010–E013.<br>Recorded observation: Runtime API/database evidence complete |
| DYN-13 | Controlled provider failure<br>Use documented fault injection for a provider timeout/non-2xx on initial or adaptation generation. | Isolated database; deliberately controlled provider fault followed by restored provider configuration.<br>B01, isolated MongoDB and live provider, except labelled fault. | Stable HTTP 502 domain error; learner-safe message; no raw provider detail, automatic retry, or invalid/partial save; existing valid state is unchanged and UI offers a controlled recovery path. | Controlled HTTP 502/safe UI, no partial session, and same-question recovery | Pass | HTTP 502 and later HTTP 201 retained separately | F13; U4, U8.<br>E004–E009; browser addendum E010–E013. |
| TIM-PHOTO-01 | Submit one initial-generation request and measure end-to-end elapsed time. | What is photosynthesis, and how do plants make food?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 1 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3620.888 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:30.816Z; E005; timings.csv; retry_of=none. |
| TIM-PHOTO-02 | Submit one initial-generation request and measure end-to-end elapsed time. | What is photosynthesis, and how do plants make food?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 2 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3970.571 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:34.437Z; E005; timings.csv; retry_of=none. |
| TIM-PHOTO-03 | Submit one initial-generation request and measure end-to-end elapsed time. | What is photosynthesis, and how do plants make food?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 3 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3130.118 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:38.409Z; E005; timings.csv; retry_of=none. |
| TIM-GRAV-01 | Submit one initial-generation request and measure end-to-end elapsed time. | What is gravity?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 1 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3935.289 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:41.540Z; E005; timings.csv; retry_of=none. |
| TIM-GRAV-02 | Submit one initial-generation request and measure end-to-end elapsed time. | What is gravity?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 2 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3123.938 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:45.476Z; E005; timings.csv; retry_of=none. |
| TIM-GRAV-03 | Submit one initial-generation request and measure end-to-end elapsed time. | What is gravity?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 3 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3763.794 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:48.601Z; E005; timings.csv; retry_of=none. |
| TIM-CURRENT-01 | Submit one initial-generation request and measure end-to-end elapsed time. | What is electric current?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 1 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 2907.745 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:52.365Z; E005; timings.csv; retry_of=none. |
| TIM-CURRENT-02 | Submit one initial-generation request and measure end-to-end elapsed time. | What is electric current?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 2 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 2592.835 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:55.275Z; E005; timings.csv; retry_of=none. |
| TIM-CURRENT-03 | Submit one initial-generation request and measure end-to-end elapsed time. | What is electric current?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 3 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 2615.113 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:43:57.868Z; E005; timings.csv; retry_of=none. |
| TIM-INHERIT-01 | Submit one initial-generation request and measure end-to-end elapsed time. | What is inheritance in object-oriented programming?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 1 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3311.446 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:44:00.484Z; E005; timings.csv; retry_of=none. |
| TIM-INHERIT-02 | Submit one initial-generation request and measure end-to-end elapsed time. | What is inheritance in object-oriented programming?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 2 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 4640.164 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:44:03.796Z; E005; timings.csv; retry_of=none. |
| TIM-INHERIT-03 | Submit one initial-generation request and measure end-to-end elapsed time. | What is inheritance in object-oriented programming?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 3 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3757.689 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:44:08.438Z; E005; timings.csv; retry_of=none. |
| TIM-PH-01 | Submit one initial-generation request and measure end-to-end elapsed time. | What is pH?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 1 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 2841.662 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:44:12.197Z; E005; timings.csv; retry_of=none. |
| TIM-PH-02 | Submit one initial-generation request and measure end-to-end elapsed time. | What is pH?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 2 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3330.576 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:44:15.053Z; E005; timings.csv; retry_of=none. |
| TIM-PH-03 | Submit one initial-generation request and measure end-to-end elapsed time. | What is pH?<br>B01 local Next.js dev; isolated MongoDB; live configured provider<br>Sequential attempt 3 | Record HTTP outcome and elapsed time for the frozen input; no SLA or load threshold. | HTTP 201; 3480.36 ms; recorded outcome success. | Pass | Descriptive local timing, not a latency guarantee or stress test. | Started 2026-10-01T04:44:18.385Z; E005; timings.csv; retry_of=none. |
| UI-01 | Home — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-01 | Inquiry and navigation are ready without error | Home rendered without error with inquiry field, Ask action, example prompts, Preferences action, primary navigation, locale control, and theme control visible. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; None observed. E010–E013; screenshot/HAR: `screenshots/01_home.png`. |
| UI-02 | Initial session — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-02 | Structured session and hint action render | The Osmosis session rendered its concept/domain, Simple Explanation, Real-World Example, Technical Explanation, Think About This, revealed hint, follow-up area, and Understanding Check. English and Burmese content were both visible. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; None observed. E010–E013; screenshot/HAR: `screenshots/02_initial_session.png`. |
| UI-03 | Stage 6B — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-03/DYN-04 | Five optional help choices plus skip/cancel render | After selecting partial understanding, “What would help you most?” displayed five bounded choices, Continue with this choice, Continue without a choice, and Back to understanding choices. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; None observed. E010–E013; screenshot/HAR: `screenshots/03_stage6b_options.png`. |
| UI-04 | First adaptation — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-03 | Round-1 support/history and next response render | Selecting Another example produced route `stage_5_scaffold`, an Additional Scaffold card, response event 0→1, bilingual adapted support, and the next understanding choices. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; None observed. E010–E013; screenshot/HAR: `screenshots/04_adaptation_round1.png`. |
| UI-05 | Limit — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-04/DYN-05 | Round-2 history, limit message and separate Finish render | Concept clarification produced response event 1→2 and a second adaptation. Both stored adaptations were visible with “Maximum support provided” and a separate Finish for Now action; no third adaptation choice was offered. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; Direct provider-call absence is not established by the screenshot; API/database evidence provides only indirect support for that assertion.. E010–E013; screenshot/HAR: `screenshots/05_limit_round2.png`. |
| UI-06 | Fade — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-06 | Fade history with no adaptation and separate Finish | The Gravity session showed High/no additional support with route `fade`, event 0→0, no generated adaptation card, and Finish Learning as a separate action. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; Direct provider-call absence is not established by the screenshot; API/database evidence provides only indirect support for that assertion.. E010–E013; screenshot/HAR: `screenshots/06_fade.png`. |
| UI-07 | Language route — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-07 | Route and English+Burmese adaptation render together | The Electric current session identified the language-support response and displayed English and Burmese adapted support together. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; Rendering only; linguistic correctness was not assessed.. E010–E013; screenshot/HAR: `screenshots/07_language_support.png`. |
| UI-08 | History — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-11 | Newest-first self-reported support/status/action rows | History loaded with Osmosis first, followed by pH entries in the visible list. Rows used Self-reported support and distinguished Review Recommended/Continue Learning from In Progress/Resume. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; Ordering was visually checked only for the captured list.. E010–E013; screenshot/HAR: `screenshots/08_history.png`. |
| UI-09 | Review — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-11 | Completed state and stored interaction history reconstruct | The completed Photosynthesis session reconstructed its completion state, relevant follow-up, three response events including the capped 2→2 event, and two adaptations. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; None observed. E010–E013; screenshot/HAR: `screenshots/09_review_completed.png`. |
| UI-10 | Resume — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-11 | Reload preserves round, history, limit and next action | Reloading the unfinished Osmosis session reconstructed two response events, two adaptations, the maximum-support message, and Finish for Now as the next action. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; None observed. E010–E013; screenshot/HAR: `screenshots/10_resume_after_reload.png`. |
| UI-11 | Provider error — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-13 | Safe error appears with HTTP 502 and retained question | With the controlled invalid provider key, the Home page retained “What is photosynthesis?” and displayed “Unable to prepare the explanation right now”. The corresponding HAR entry returned HTTP 502 with code `SESSION_GENERATION_FAILED` and no raw provider detail. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; Controlled fault; expected result. E010–E013; screenshot/HAR: `screenshots/11_provider_error.png`; `network.har` request at `2026-10-01T05:31:09.698Z`. |
| UI-12 | Recovery — manual browser capture. | Retained synthetic DYN-OWNER-A sessions; Chrome 154.0.8037.59, 1440×900, English/light. Related workflow: DYN-13 | Unchanged question succeeds after normal provider restart | After restoring the normal provider configuration, the same question created and rendered a Photosynthesis learning session successfully. The corresponding HAR entry returned HTTP 201. | Pass | Technical desktop observation only; not participant usability or linguistic validation. | Execution: Executed; Expected recovery. E010–E013; screenshot/HAR: `screenshots/12_provider_recovery.png`; `network.har` request at `2026-10-01T05:37:46.343Z`. |

## Timing

Fifteen sequential initial-generation requests across photosynthesis, gravity, current, OOP inheritance and pH succeeded. Median was 3,330.576 ms, with range 2,592.835–4,640.164 ms. [All timing rows](timings.csv) are retained. These are local descriptive observations, not load testing, an SLA or a latency guarantee.

## Manual browser observations

All twelve planned captures passed within the stated desktop scope. Home, initial content, Stage 6B, both adaptations, limit/Finish, fade, bilingual override, History, completed Review, reload/Resume and error/recovery were observed. The planned provider fault returned safe HTTP 502, and the unchanged question later succeeded with HTTP 201 after provider restoration. The HAR had 168 localhost entries without exported authorization/cookie values. Original screenshots are retained in [the browser run](raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01).

## Qualifications

DYN-05/06 remain Partial Pass because zero provider calls were inferred, not directly counted in this run. Later bounds checks do not upgrade these historical cases. DYN-10's initial assertion checked the wrong response nesting; the first attempt and adjudication are preserved. Mobile/Burmese/dark/keyboard coverage belongs to the separate usability inspection. This technical browser pass is not a participant study or general linguistic validation.

## Evidence and repeat procedure

[Raw API/state records](raw) and timing CSV remain unchanged. The retained setup and 15-step screenshot procedure below explain reproduction; all case expectations and actual results are in the case register. For a new pass, verify B01, use an isolated synthetic learner/database, record viewport and preferences, repeat the twelve states above, and save screenshots plus start/end times in a new run folder rather than overwrite this evidence.

## Detailed workflow and timing contracts

The following preconditions and expectations belong to the recorded run. They specify what was checked, rather than implying a new execution.

## Preconditions

- [x] Verify B01 and record working-tree state.
- [x] Record browser availability, Node, MongoDB, model and provider. The manual
  addendum records Chrome 154.0.8037.59, 1440 × 900, English and Light theme.
- [x] Use database `burmesestemai_evaluation_b01` and document safe cleanup.
- [x] Create artificial aliases `DYN-OWNER-A` and `DYN-OWNER-B`.
- [x] Record whether each case uses live provider, controlled provider fault, or
  real database.
- [x] Capture request/response plus database state before and after operations.
- [x] Record first failures before retrying; never overwrite evidence.


## Step-by-step browser evidence procedure

This retained 15-step procedure explains how the browser evidence was captured. Its original temporary database and synthetic session IDs are historical dependencies and may no longer exist. Check them before any repeat; a new run must use a new folder and must not overwrite the recorded evidence. No procedure is being executed by this documentation restoration.

### Evidence location and filenames

Save everything under this repository path:

```text
evaluation/02_design/dynamic/raw/manual_browser/
└── RUN-B01-YYYYMMDD-DYNAMIC-UI-01/
    ├── 00_run_metadata.md
    ├── observations.md
    ├── network.har
    └── screenshots/
        ├── 01_home.png
        ├── 02_initial_session.png
        ├── 03_stage6b_options.png
        ├── 04_adaptation_round1.png
        ├── 05_limit_round2.png
        ├── 06_fade.png
        ├── 07_language_support.png
        ├── 08_history.png
        ├── 09_review_completed.png
        ├── 10_resume_after_reload.png
        ├── 11_provider_error.png
        └── 12_provider_recovery.png
```

Create the folders before opening the application, replacing the date token:

```sh
cd /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research
mkdir -p evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-YYYYMMDD-DYNAMIC-UI-01/screenshots
```

If an extra screenshot is needed, keep the sequence and use a descriptive
suffix, for example `07b_language_support_burmese_text.png`. Never replace a
failed/incorrect screenshot silently; retain it or record why it was excluded.

`00_run_metadata.md` must record:

- run ID, evaluator and start/end time with time zone;
- B01 executable commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`;
- `git status --short` before and after the pass;
- browser name/version, operating system and exact viewport;
- UI locale and theme;
- database name `burmesestemai_evaluation_b01`;
- artificial alias `DYN-OWNER-A` and its UUID below;
- dependency mode: retained isolated MongoDB and live provider, except the
  explicitly labelled controlled failure;
- non-secret model name; and
- any deviation, retry, missing screenshot or console error.

Do not record the OpenAI API key, `.env` contents, personal cookies, unrelated
browsing data or a screenshot of a terminal containing secrets.

### Step 1 — Confirm the retained database exists

From the repository root, run:

```sh
test -d /private/tmp/burmese-stem-dynamic.dRsmRv && echo "evaluation database present"
```

Expected: `evaluation database present`.

If the directory is missing, stop this procedure. The stored session IDs below
will not exist. Record the missing dependency and either restore the retained
database or execute a separately identified fresh-session browser pass; do not
claim that new sessions are the original DYN-06/DYN-07 evidence.

### Step 2 — Verify the application source still matches B01

Run:

```sh
git diff --exit-code 37faefa236829aa3d79e023faa1fb72a086b5c2a -- burmese_stem_ai
```

Expected: exit code 0 and no diff output. Record the command and result in
`00_run_metadata.md`. Do not start the pass against changed application source
without creating and documenting a new baseline.

### Step 3 — Start the retained MongoDB

In Terminal 1, run and leave it running:

```sh
mongod \
  --dbpath /private/tmp/burmese-stem-dynamic.dRsmRv \
  --port 27018 \
  --bind_ip 127.0.0.1 \
  --logpath /private/tmp/burmese-stem-dynamic.dRsmRv/manual-browser-mongod.log
```

Do not run `--repair`, delete the directory, drop the database, or initialise a
different database over it.

### Step 4 — Start the normal B01 application

In Terminal 2, run and leave it running:

```sh
cd /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai
DB_URL=mongodb://127.0.0.1:27018/burmesestemai_evaluation_b01 \
  npm run dev -- --hostname 127.0.0.1 --port 3100
```

Expected: Next.js reports `Ready` and the application is available at
`http://127.0.0.1:3100`.

### Step 5 — Configure Chrome and the artificial learner

1. Open `http://127.0.0.1:3100/api` once so the application creates its normal
   `learnerId` cookie.
2. Open Chrome DevTools → **Application** → **Cookies** →
   `http://127.0.0.1:3100`.
3. Change the `learnerId` cookie value to:

   ```text
   00000000-0000-4000-8000-0000000000a1
   ```

4. Keep Path `/`, SameSite `Lax`, and the existing future expiry. This UUID is
   the artificial `DYN-OWNER-A`; do not use a real identifier.
5. Open DevTools → **Network**, enable **Preserve log**, and clear the existing
   entries so the export contains only this local run.
6. Set a fixed desktop viewport, recommended `1440 × 900`, and record the exact
   value. Use English UI and light theme for this pass unless a deviation is
   recorded. Later usability evaluation covers other locales, themes and
   mobile viewports.
7. Open `http://127.0.0.1:3100/history`. Confirm that retained concepts such as
   gravity, electric current, cell and photosynthesis are visible. If they are
   absent, recheck the cookie before continuing.

### Step 6 — Capture Home

1. Navigate to `http://127.0.0.1:3100/`.
2. Confirm the inquiry field, Ask action, example prompts, Preferences action
   and primary navigation are visible without an error.
3. Capture the whole viewport as `screenshots/01_home.png`.
4. Record actual observations against DYN-01 in `observations.md`.

Expected: Home is usable and no raw configuration or provider information is
visible.

### Step 7 — Capture initial content, Stage 6B and the round-two limit

This is the only new normal workflow required for this pass.

1. On Home, submit the exact artificial inquiry:

   ```text
   What is osmosis?
   ```

2. Wait for navigation to `/learn/<session-id>`. Copy the session ID from the
   URL into `observations.md`.
3. Confirm the concept header, Simple Explanation, Real-World Example,
   Technical Explanation, Think About This, Show Hint and Understanding Check
   are present. Capture `screenshots/02_initial_session.png`.
4. Click **I partially understand**.
5. Do not submit Stage 6B yet. Confirm the panel shows:
   - “What would help you most?”;
   - five bounded choices;
   - Continue with this choice;
   - Continue without a choice; and
   - Back to understanding choices.
6. Capture `screenshots/03_stage6b_options.png`.
7. Select **Another example**, then click **Continue with this choice**.
8. Wait for the adapted support to appear. Confirm the route/support history
   indicates the first adaptation and the page again asks how the learner feels.
9. Capture `screenshots/04_adaptation_round1.png`.
10. Click **I need more explanation**, select
    **I do not understand the concept**, and click
    **Continue with this choice**.
11. Wait for the second adaptation. Confirm the screen now shows both stored
    adaptations/response history, the maximum-support message and
    **Finish for Now**. The response-choice buttons should no longer invite a
    third generated adaptation.
12. Capture `screenshots/05_limit_round2.png`.
13. Do **not** finish this session yet; it is used by the Resume check.

Expected: Stage 6B is optional and bounded; round 1 is reconstructable; after
round 2 the interface presents the limit and a separate finish action. If the
content or state differs, record the exact result instead of repeating until it
looks correct.

### Step 8 — Capture the retained High/fade session

Open:

```text
http://127.0.0.1:3100/learn/2471dfd3-87af-433c-8f40-aee0121a15b6
```

This is the retained DYN-06 gravity session. Confirm:

- the response history records High/no additional support;
- there is no generated adaptation card for the fade response;
- no adaptation round was consumed; and
- **Finish Learning** remains a separate action.

Capture `screenshots/06_fade.png`. Do not click Finish.

### Step 9 — Capture retained bilingual language support

Open:

```text
http://127.0.0.1:3100/learn/6b1c1947-7682-4203-ab89-f16b3c80fbfd
```

This is the retained DYN-07 electric-current session. Scroll to the support and
response history. Confirm the language-support route is identified and the
adaptation visibly contains both English and Burmese text. Capture
`screenshots/07_language_support.png` with both languages visible in the same
image. This is rendering evidence only, not a judgement that the Burmese is
linguistically correct.

### Step 10 — Capture History

1. Open `http://127.0.0.1:3100/history`.
2. Wait until the loading state disappears.
3. Confirm sessions are shown newest-first, each row uses
   **Self-reported support**, and status/action labels distinguish Completed,
   In Progress and Review Recommended.
4. Record the first three visible concepts/statuses in `observations.md` so the
   ordering claim is not based on the screenshot alone.
5. Capture `screenshots/08_history.png`.

### Step 11 — Capture completed Review

Open the retained completed Photosynthesis session:

```text
http://127.0.0.1:3100/learn/9e5969ec-d6d8-4413-a4e7-d56b65698953
```

Confirm the completed-state panel and stored response/adaptation history are
visible, including the capped event and relevant follow-up. Capture
`screenshots/09_review_completed.png`. If all required sections do not fit in
one image, retain additional sequentially named screenshots rather than hiding
content by zooming excessively.

### Step 12 — Capture Resume after reload

1. Return to History and open **Continue Learning** for the unfinished Osmosis
   session created in Step 7, or paste its recorded session URL.
2. Reload the page once.
3. Confirm both adaptations and response events remain visible, the
   maximum-support message remains, and **Finish for Now** is still the next
   action.
4. Capture `screenshots/10_resume_after_reload.png`.
5. Leave the session unfinished until the screenshot and observation record are
   complete. Finishing afterwards is optional and must be recorded.

### Step 13 — Capture controlled provider error and recovery

This step deliberately changes only the provider credential supplied to the
local process. It does not change source code or the database URL.

1. Stop the normal application in Terminal 2 with `Ctrl-C`. Keep MongoDB
   running.
2. Restart the application in Terminal 2 with an intentionally invalid key:

   ```sh
   cd /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai
   DB_URL=mongodb://127.0.0.1:27018/burmesestemai_evaluation_b01 \
   OPENAI_API_KEY=invalid-dynamic-evaluation-key \
     npm run dev -- --hostname 127.0.0.1 --port 3100
   ```

3. Keep DevTools Network recording. Open Home and submit:

   ```text
   What is photosynthesis?
   ```

4. Confirm the page remains on Home and displays the learner-safe message
   **Unable to prepare the explanation right now**. In Network, confirm the
   session request returned HTTP 502 and the visible response does not contain
   raw provider detail.
5. Capture `screenshots/11_provider_error.png` with the safe error visible.
6. Stop the invalid-key application with `Ctrl-C`.
7. Restart the normal application using the Step 4 command.
8. Without changing the question to force success, submit it again. Confirm a
   normal learning session is created and capture
   `screenshots/12_provider_recovery.png`.
9. Record both attempts separately. The successful retry must not replace the
   HTTP 502 observation.

### Step 14 — Export network and finish the observation record

1. In DevTools Network, export **Save all as HAR with content** to:

   ```text
   evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-YYYYMMDD-DYNAMIC-UI-01/network.har
   ```

2. Inspect the HAR before retaining it. It should contain only localhost
   traffic and the artificial learner cookie. Remove the HAR from evidence if
   it unexpectedly contains a real credential or unrelated browsing data;
   record that exclusion rather than editing the raw capture silently.
3. Complete `observations.md` using the table below.
4. Stop the application and MongoDB with `Ctrl-C` in their respective
   terminals. Do not delete the retained database directory yet.
5. Run `git status --short` and record it. Confirm the application source still
   matches B01 with the Step 2 command.

### Step 15 — Register the completed evidence

Completed for `RUN-B01-20261001-DYNAMIC-UI-01` after all files existed:

1. Calculate SHA-256 hashes, for example:

   ```sh
   find evaluation/02_design/dynamic/raw/manual_browser/RUN-B01-YYYYMMDD-DYNAMIC-UI-01 \
     -type f -exec shasum -a 256 {} +
   ```

2. Assign the next available evidence ID by checking
   `evaluation/03_results/evidence_register.csv`; do not assume the next ID.
3. Add one register row for the observation record and either one grouped row
   for the screenshot/HAR package or separate rows if individual files support
   materially different findings.
4. Update this workflow register only for the browser assertions actually
   observed. Retain E004–E009 and the earlier Partial Pass notes.
5. Add a **Manual browser addendum** to `dynamic_analysis.md` containing the run
   ID, UI-01–UI-12 outcomes, evidence IDs, deviations and remaining limits.
6. Update U1–U9 in `evaluation_protocol.md` only where this inspection provides
   direct evidence. Call it evaluator inspection, never participant feedback.


## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../archive/pre_consolidation_markdown_20261008.zip).
