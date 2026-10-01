# Step 11 — Dynamic Analysis Results

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP11-DYNAMIC-RESULT-01` |
| Run IDs | `RUN-B01-20261001-DYNAMIC-01`; manual-browser addendum `RUN-B01-20261001-DYNAMIC-UI-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version 2.1 |
| Execution status | Completed with qualification — runtime and planned browser observations complete; direct provider-call absence remains indirect for DYN-05/DYN-06 |
| Evaluator | Codex technical execution under user direction; manual browser pass by Nathan |
| Data | Artificial learner aliases and artificial STEM questions only |

## Outcome

The executable B01 application passed the completed runtime API, persistence,
ownership, routing, bound, follow-up, lifecycle, and controlled-provider-error
checks. All 15 live-provider initial-generation timing attempts succeeded. The
subsequent manual-browser addendum executed UI-01–UI-12 and all twelve passed
within the recorded desktop Chrome, English, Light scope.

Step 11 is closed with a narrow qualification: DYN-05 and DYN-06 visually and
persistently showed no extra adaptation or round increment, but zero provider
calls were not directly instrumented. The browser pass is evaluator technical
inspection, not participant usability evidence.

## Dependency modes

- Application: local B01 Next.js development server.
- Persistence: fresh isolated MongoDB 8.2.6 database.
- Generation: live configured OpenAI provider using `gpt-5.4-mini`.
- Fault injection: same application with an intentionally invalid provider
  key; the invalid value is not preserved.
- Browser addendum: Chrome 154.0.8037.59 at 1440 × 900, English UI, Light
  theme, using the retained isolated database and artificial learner UUID.

## Workflow results

| Case | Completed observation | Outcome | Qualification |
| --- | --- | --- | --- |
| DYN-01 | API/DB readiness and rendered Home controls | Pass | Desktop Chrome, English, Light scope |
| DYN-02 | Live HTTP 201, stored round-0 state and structured Osmosis UI | Pass | UI/state agreement observed |
| DYN-03 | Default Medium route, event 0→1 and rendered first adaptation | Pass | UI/state agreement observed |
| DYN-04 | Concept clarification, event 1→2, second adaptation and review state | Pass | UI/state agreement observed |
| DYN-05 | Capped event 2→2, no third adaptation/round, visible limit and Finish | Partial Pass | Zero provider calls remain indirectly supported rather than instrumented |
| DYN-06 | High/fade event 0→0, no adaptation card and separate Finish | Partial Pass | Zero provider calls remain indirectly supported rather than instrumented |
| DYN-07 | Language route, unchanged profile and English+Burmese rendering | Pass | Rendering verified; linguistic correctness not assessed |
| DYN-08 | Bounded reinterpretation corrected `cell` to biology and persisted trace | Pass | Runtime API/database evidence complete |
| DYN-09 | Relevant follow-up persisted once without Stage 7 mutation | Pass | Runtime API/database evidence complete |
| DYN-10 | HTTP 422 out-of-scope result; no persistence or Stage 7 mutation | Pass | Initial driver-path false failure retained and adjudicated |
| DYN-11 | Newest-first history, detail reconstruction, ownership, Review and Resume | Pass | Hydrated History/Review/Resume observed in browser |
| DYN-12 | Completion, idempotent repeat, post-completion HTTP 409/no mutation | Pass | Runtime API/database evidence complete |
| DYN-13 | Controlled HTTP 502/safe UI, no partial session, and same-question recovery | Pass | HTTP 502 and later HTTP 201 retained separately |

No application failure was found in the completed runtime or planned browser
assertions. Partial Pass for DYN-05/DYN-06 means all observed state/UI
assertions passed while the required provider-call count was not directly
instrumented; it is not a full case Pass.

## Timing results

The boundary was a monotonic client timer around `POST /api/sessions`. Every
row used a fresh session, the same owner preferences, the isolated database,
and the live provider. No retries replaced a timing row.

| Question | Successful n | Minimum ms | Median ms | Maximum ms |
| --- | ---: | ---: | ---: | ---: |
| Photosynthesis | 3 | 3130.118 | 3620.888 | 3970.571 |
| Gravity | 3 | 3123.938 | 3763.794 | 3935.289 |
| Electric current | 3 | 2592.835 | 2615.113 | 2907.745 |
| OOP inheritance | 3 | 3311.446 | 3757.689 | 4640.164 |
| pH | 3 | 2841.662 | 3330.576 | 3480.360 |
| **Pooled** | **15** | **2592.835** | **3330.576** | **4640.164** |

There were zero HTTP failures and zero timeouts among the 15 fixed timing
attempts. These are descriptive measurements only: the protocol defines no
latency threshold, and this run does not establish acceptable performance or
an SLA.

## Important runtime findings

1. The real middleware rejected a supplied learner header and derived identity
   from a valid UUID cookie. The run therefore mapped artificial aliases to
   fixed test cookies and exercised the intended ownership boundary.
2. DYN-05 and DYN-06 returned in milliseconds while generated adaptations took
   seconds, and neither route added an adaptation or incremented its round.
   This supports the bounded routing contract, but provider-call counts were
   not directly instrumented.
3. DYN-08 returned `correctionOutcome: corrected`, retained the learner's
   clarification, and stored the active concept as `cell` in `biology`.
4. DYN-10 exposed `newSessionRecommended` at the response root. The first
   driver assertion checked the wrong nesting; the raw pass evidence and the
   original failed assertion are both retained.
5. DYN-13 created the normal default learner profile before generation failed,
   but created no learning session. The stable learner-facing error contained
   no raw provider detail.
6. The existing Mongoose `new`-option deprecation warning remains observable.

## Manual browser addendum

Nathan executed `RUN-B01-20261001-DYNAMIC-UI-01` on 1 October 2026 using
Chrome 154.0.8037.59, a 1440 × 900 viewport, English UI and Light theme. All
twelve planned observations passed:

- Home and structured initial content rendered without error.
- Medium opened all five optional Stage 6B choices plus skip/back actions.
- The first and second adaptations, response history, two-round limit and
  separate finish action rendered as expected.
- High/fade rendered event 0→0 with no adaptation card and separate finish.
- Language support displayed English and Burmese together.
- History, completed Review and reload/Resume reconstructed persisted state.
- The controlled invalid-key request produced HTTP 502 with a safe message;
  the unchanged question succeeded with HTTP 201 after provider restoration.

The HAR contains 168 localhost-only entries, no exported authorization/cookie
values, and no status at or above 400 other than the planned HTTP 502. The
recovery screenshot was moved from the run root into its planned screenshots
directory without altering the image. The draft end time was corrected from
6:32 PM to 6:38 PM using the recovery screenshot and HAR timestamps.

Remaining limits are mobile layout, Burmese UI, Dark theme, systematic
keyboard-only use, the full preferences matrix, participant usability, content
accuracy, linguistic quality, and direct provider-call instrumentation for
DYN-05/DYN-06.

## Evidence

- `E004`: command/environment/failure/browser-attempt log.
- `E005`: raw API responses and database before/after snapshots.
- `E006`: machine-readable case summary with the original DYN-10 assertion.
- `E007`: all 15 timing rows.
- `E008`: this analysed result.
- `E009`: retained DYN-10 assertion-path adjudication.
- `E010`: completed manual-browser observation record.
- `E011`: manual-browser run metadata and sign-off.
- `E012`: SHA-256 manifest for the 12 screenshots.
- `E013`: localhost browser HAR containing the controlled failure and recovery.

The run establishes technical runtime behaviour only. It does not establish
educational effectiveness, content accuracy across the evaluation corpus,
learner satisfaction, or usability outcomes.
