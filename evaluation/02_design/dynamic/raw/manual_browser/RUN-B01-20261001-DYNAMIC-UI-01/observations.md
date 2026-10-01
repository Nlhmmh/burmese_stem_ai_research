# Manual Browser Dynamic Analysis — Observations

| Document control | Value |
| --- | --- |
| Run ID | `RUN-B01-20261001-DYNAMIC-UI-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version 2.1 |
| Evaluator | Nathan |
| Execution date | 1 October 2026 |
| Browser configuration | Chrome 154.0.8037.59; 1440 × 900; English; Light |
| Overall outcome | Pass within the captured manual-browser scope |

## Scope and evidence boundary

This was an evaluator-led technical browser inspection using artificial learner
data. It verifies the visible states listed below and their agreement with the
captured localhost network trace. It is not a participant usability study and
does not establish Burmese linguistic quality, STEM-content correctness,
learning gain, retention, mastery, or educational effectiveness.

## Observation results

| Observation | Related cases | Expected visible result | Actual result | Execution status | Outcome | Screenshot/HAR locator | Deviation or issue |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UI-01 Home | DYN-01 | Inquiry and navigation are ready without error | Home rendered without error with inquiry field, Ask action, example prompts, Preferences action, primary navigation, locale control, and theme control visible. | Executed | Pass | `screenshots/01_home.png` | None observed |
| UI-02 Initial session | DYN-02 | Structured session and hint action render | The Osmosis session rendered its concept/domain, Simple Explanation, Real-World Example, Technical Explanation, Think About This, revealed hint, follow-up area, and Understanding Check. English and Burmese content were both visible. | Executed | Pass | `screenshots/02_initial_session.png` | None observed |
| UI-03 Stage 6B | DYN-03/DYN-04 | Five optional help choices plus skip/cancel render | After selecting partial understanding, “What would help you most?” displayed five bounded choices, Continue with this choice, Continue without a choice, and Back to understanding choices. | Executed | Pass | `screenshots/03_stage6b_options.png` | None observed |
| UI-04 First adaptation | DYN-03 | Round-1 support/history and next response render | Selecting Another example produced route `stage_5_scaffold`, an Additional Scaffold card, response event 0→1, bilingual adapted support, and the next understanding choices. | Executed | Pass | `screenshots/04_adaptation_round1.png` | None observed |
| UI-05 Limit | DYN-04/DYN-05 | Round-2 history, limit message and separate Finish render | Concept clarification produced response event 1→2 and a second adaptation. Both stored adaptations were visible with “Maximum support provided” and a separate Finish for Now action; no third adaptation choice was offered. | Executed | Pass | `screenshots/05_limit_round2.png` | Direct provider-call absence is not established by the screenshot; API/database evidence provides only indirect support for that assertion. |
| UI-06 Fade | DYN-06 | Fade history with no adaptation and separate Finish | The Gravity session showed High/no additional support with route `fade`, event 0→0, no generated adaptation card, and Finish Learning as a separate action. | Executed | Pass | `screenshots/06_fade.png` | Direct provider-call absence is not established by the screenshot; API/database evidence provides only indirect support for that assertion. |
| UI-07 Language route | DYN-07 | Route and English+Burmese adaptation render together | The Electric current session identified the language-support response and displayed English and Burmese adapted support together. | Executed | Pass | `screenshots/07_language_support.png` | Rendering only; linguistic correctness was not assessed. |
| UI-08 History | DYN-11 | Newest-first self-reported support/status/action rows | History loaded with Osmosis first, followed by pH entries in the visible list. Rows used Self-reported support and distinguished Review Recommended/Continue Learning from In Progress/Resume. | Executed | Pass | `screenshots/08_history.png` | Ordering was visually checked only for the captured list. |
| UI-09 Review | DYN-11 | Completed state and stored interaction history reconstruct | The completed Photosynthesis session reconstructed its completion state, relevant follow-up, three response events including the capped 2→2 event, and two adaptations. | Executed | Pass | `screenshots/09_review_completed.png` | None observed |
| UI-10 Resume | DYN-11 | Reload preserves round, history, limit and next action | Reloading the unfinished Osmosis session reconstructed two response events, two adaptations, the maximum-support message, and Finish for Now as the next action. | Executed | Pass | `screenshots/10_resume_after_reload.png` | None observed |
| UI-11 Provider error | DYN-13 | Safe error appears with HTTP 502 and retained question | With the controlled invalid provider key, the Home page retained “What is photosynthesis?” and displayed “Unable to prepare the explanation right now”. The corresponding HAR entry returned HTTP 502 with code `SESSION_GENERATION_FAILED` and no raw provider detail. | Executed | Pass | `screenshots/11_provider_error.png`; `network.har` request at `2026-10-01T05:31:09.698Z` | Controlled fault; expected result |
| UI-12 Recovery | DYN-13 | Unchanged question succeeds after normal provider restart | After restoring the normal provider configuration, the same question created and rendered a Photosynthesis learning session successfully. The corresponding HAR entry returned HTTP 201. | Executed | Pass | `screenshots/12_provider_recovery.png`; `network.har` request at `2026-10-01T05:37:46.343Z` | Expected recovery |

## Session and route traceability

| Workflow | Session ID | Visible result |
| --- | --- | --- |
| Osmosis Stage 6B, two adaptations, limit and Resume | `f7c88ece-ec4e-4a22-bd86-e1a42911f0c6` | Round 0→1 `stage_5_scaffold`, round 1→2 `concept_clarification`, then reconstructable review-recommended state |
| Retained Gravity fade | `2471dfd3-87af-433c-8f40-aee0121a15b6` | `fade`, round 0→0, no adaptation card, separate finish action |
| Retained Electric-current language support | `6b1c1947-7682-4203-ab89-f16b3c80fbfd` | Language-support route with English and Burmese adapted content |
| Retained completed Photosynthesis review | `9e5969ec-d6d8-4413-a4e7-d56b65698953` | Completed state, follow-up, two adaptations, three response events |
| Provider-recovery Photosynthesis | `9c74c72e-825c-4b08-a486-e09e01303d2b` | Successful HTTP 201 recovery and rendered session |

## Controlled failure and retry

| Attempt | Input | Actual result | Retry relationship | Evidence |
| --- | --- | --- | --- | --- |
| `UI13-FAULT-01` | `What is photosynthesis?` with intentionally invalid local provider key | HTTP 502, `SESSION_GENERATION_FAILED`, learner-safe message, no learning-session navigation | Original controlled failure | `screenshots/11_provider_error.png`; `network.har` at `2026-10-01T05:31:09.698Z` |
| `UI13-RECOVERY-01` | Same unchanged question after restoring normal provider configuration | HTTP 201; new learning session rendered | Retry of `UI13-FAULT-01` | `screenshots/12_provider_recovery.png`; `network.har` at `2026-10-01T05:37:46.343Z` |

## HAR and security review

- The HAR uses version 1.2 and contains 168 entries across five page records.
- All captured requests target `127.0.0.1:3100`; no unrelated host traffic is
  present.
- No `Authorization` header, API key, cookie value, or `Set-Cookie` value is
  present in the retained HAR.
- The only HTTP status at or above 400 is the planned HTTP 502 provider fault.
- Status-zero entries are provisional browser/navigation duplicates followed by
  successful responses; they are not treated as application failures.
- No terminal secret, real learner data, or unrelated personal information is
  visible in the screenshots.

## Deviations and remaining limits

1. The recovery screenshot was initially saved at the run-directory root and
   was moved to the planned `screenshots/12_provider_recovery.png` location.
   Its image content was not altered.
2. The draft end time of 6:32 PM was corrected to 6:38 PM because the recovery
   screenshot and HAR timestamps show the run continued through 6:38 PM.
3. This pass covered desktop Chrome at 1440 × 900 with English UI and Light
   theme. Mobile layouts, Burmese UI, Dark theme, systematic keyboard-only
   interaction, and the full preferences matrix remain for the usability
   inspection.
4. DYN-05 and DYN-06 visually confirm no extra adaptation and no round
   increment, but screenshots/HAR do not directly instrument provider-call
   counts. That narrow assertion remains qualified pending white-box or direct
   provider-spy evidence.

## Conclusion

All twelve planned manual-browser observations were executed and passed within
the captured scope. The run closes the earlier visual-observation gap for Home,
initial content, Stage 6B, first and second adaptations, limit feedback, fade,
bilingual rendering, History, Review, Resume, safe provider failure, and
recovery. The limitations above remain explicit and are not converted into
usability or educational-effectiveness claims.
