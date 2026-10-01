# Step 11 — Dynamic Analysis Test Cases

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP11-DYNAMIC-CASES-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version `2.1` |
| Status | Completed with qualification; API/database/provider/timing and planned browser observations complete; direct provider-call absence remains indirect for DYN-05/DYN-06 |
| Evaluator / run ID | Codex technical execution under user direction / `RUN-B01-20261001-DYNAMIC-01`; Nathan / `RUN-B01-20261001-DYNAMIC-UI-01` |
| Required data | Artificial learner aliases only |
| Manual browser addendum | Completed: UI-01–UI-12 passed within desktop Chrome, English, Light scope |

## Purpose and boundaries

Observe the running UI, public API, provider boundary, and dedicated MongoDB
working together. Dynamic observations may support Functionality and technical
feasibility. They do not demonstrate educational effectiveness or acceptable
performance against an SLA.

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

## Workflow cases

### DYN-01 — Application and dependency readiness

**Action:** Start the B01 application and dedicated database, open Home, and
call the health/root API.

**Expected:** Application responds; database connection succeeds on first
stateful operation; actual ports and configuration are recorded; no secret is
captured in evidence.

**Mapping:** enabling technical evidence; F13.

### DYN-02 — Initial live session creation

**Precondition:** `DYN-OWNER-A` has bilingual/beginner/guided preferences.

**Input:** `What is photosynthesis, and how do plants make food?`

**Expected:** One initial provider request produces HTTP 201; visible and stored
session IDs match; concept/domain and all Stage 4/5 fields are present; status
is `in_progress`, round is 0, understanding is null, and refined collections
start empty.

**Mapping:** F1–F4, F9, F12; RQ1–RQ3.

### DYN-03 — Default Medium adaptation

**Action:** On DYN-02, send Medium with no Stage 6B choice.

**Expected:** Route `stage_5_scaffold`, support type `another_example`, one
provider request, one materially new adaptation, response event 0→1, stored
round 1, status `in_progress`, and UI/state agreement.

**Mapping:** F5–F7, F9; RQ3.

### DYN-04 — Conceptual clarification as second adaptation

**Action:** Send Needs Support + `concept_unclear` on DYN-03.

**Expected:** Route `concept_clarification`, one provider request, distinct
Stage 4 meaning plus one scaffold, event 1→2, stored round 2, two adaptations,
status `review_recommended`, and UI/state agreement.

**Mapping:** F5–F7, F9; RQ2–RQ3.

### DYN-05 — Capped response

**Action:** Send Needs Support with no Stage 6B choice on DYN-04.

**Expected:** Response event is appended with 2→2; no provider request, third
adaptation, or round increment; status remains `review_recommended`; controlled
limit feedback is visible.

**Mapping:** F5–F7, F9; U4, U7; RQ3.

### DYN-06 — High/fade on a fresh session

**Action:** Create a fresh session and send High.

**Expected:** Route `fade`; event 0→0; no provider request or adaptation;
status remains `in_progress`; completion remains a separate action.

**Mapping:** F5–F7, F9; RQ3.

### DYN-07 — Language-support route

**Action:** On a fresh session, send Medium + `language_terms`.

**Expected:** Route `language_support`, support type `clarification`, bilingual
presentation override, one provider request, event 0→1, visible English and
Burmese support without changing the stored learner profile.

**Mapping:** F3, F5, F6, F9, F12; U6; RQ1.

### DYN-08 — Bounded concept reinterpretation

**Initial input:** `What is a cell?`

**Action:** If a session exists with the wrong/qualified interpretation, send
Needs Support + `concept_mismatch` with `I mean a biological cell`.

**Expected:** Route `context_reinterpretation`; one bounded provider request
below cap; outcome is explicitly `corrected` or `ambiguous`; previous/current
interpretation and clarification persist. A corrected outcome updates active
concept and downstream support; an ambiguous outcome does not guess.

**Mapping:** F2, F5, F6, F9, F11; RQ1–RQ3.

### DYN-09 — Relevant follow-up

**Input:** `Why do plants need sunlight for photosynthesis?`

**Expected:** HTTP 200; answer uses active concept/latest scaffold and persists
exactly once; follow-up does not alter route, round, response events, or
adaptations.

**Mapping:** F8, F9; RQ2–RQ3.

### DYN-10 — Unrelated follow-up

**Input:** `How does gravity work?` in the Photosynthesis session.

**Expected:** HTTP 422 with `FOLLOW_UP_OUT_OF_SCOPE` and
`newSessionRecommended: true`; no follow-up is persisted and Stage 7 state is
unchanged.

**Mapping:** F8, F9, F13; U8; RQ3.

### DYN-11 — History, Review, and Resume

**Action:** Load History as owner A, reopen the unfinished session, reload, and
compare visible content to stored state. Attempt the same session as owner B.

**Expected:** Owner A sees newest-first accurate history and reconstructed
initial/adaptation/response/follow-up state; limits and next action are
preserved. Owner B does not retrieve owner A's session.

**Mapping:** F9–F11, F13; U5, U7, U9; RQ3.

### DYN-12 — Completion and post-completion response

**Action:** Complete an eligible session, repeat completion, then send another
learner response.

**Expected:** First completion returns/stores `completed`; repeated completion
is idempotent; post-completion response returns HTTP 409
`SESSION_RESPONSE_CONFLICT` with no mutation.

**Mapping:** F7, F9, F11, F13; U7–U8.

### DYN-13 — Controlled provider failure

**Action:** Use documented fault injection for a provider timeout/non-2xx on
initial or adaptation generation.

**Expected:** Stable HTTP 502 domain error; learner-safe message; no raw
provider detail, automatic retry, or invalid/partial save; existing valid state
is unchanged and UI offers a controlled recovery path.

**Mapping:** F13; U4, U8.

## Timing cases

Use a monotonic client request-to-response timer. Each row is an independent
fresh-session initial-generation attempt with the same operation boundary.
Retries receive new attempt IDs and do not replace these rows.

| Case | Exact question | Attempt | Actual ms | Success/timeout | Evidence ID |
| --- | --- | ---: | --- | --- | --- |
| TIM-PHOTO-01 | What is photosynthesis, and how do plants make food? | 1 | 3620.888 | Success | E007 |
| TIM-PHOTO-02 | What is photosynthesis, and how do plants make food? | 2 | 3970.571 | Success | E007 |
| TIM-PHOTO-03 | What is photosynthesis, and how do plants make food? | 3 | 3130.118 | Success | E007 |
| TIM-GRAV-01 | What is gravity? | 1 | 3935.289 | Success | E007 |
| TIM-GRAV-02 | What is gravity? | 2 | 3123.938 | Success | E007 |
| TIM-GRAV-03 | What is gravity? | 3 | 3763.794 | Success | E007 |
| TIM-CURRENT-01 | What is electric current? | 1 | 2907.745 | Success | E007 |
| TIM-CURRENT-02 | What is electric current? | 2 | 2592.835 | Success | E007 |
| TIM-CURRENT-03 | What is electric current? | 3 | 2615.113 | Success | E007 |
| TIM-INHERIT-01 | What is inheritance in object-oriented programming? | 1 | 3311.446 | Success | E007 |
| TIM-INHERIT-02 | What is inheritance in object-oriented programming? | 2 | 4640.164 | Success | E007 |
| TIM-INHERIT-03 | What is inheritance in object-oriented programming? | 3 | 3757.689 | Success | E007 |
| TIM-PH-01 | What is pH? | 1 | 2841.662 | Success | E007 |
| TIM-PH-02 | What is pH? | 2 | 3330.576 | Success | E007 |
| TIM-PH-03 | What is pH? | 3 | 3480.360 | Success | E007 |

Report median/minimum/maximum and successful sample size per question and
pooled. Report failures/timeouts separately. Do not set or infer a latency pass
threshold. Do not pool adaptation/follow-up timings with initial generation.

## Workflow execution register

| Case | Dependency mode | Execution status | Outcome | Evidence IDs | Actual/notes |
| --- | --- | --- | --- | --- | --- |
| DYN-01 | Real app/database/browser | Executed | Pass | E004, E010–E013 | API/DB readiness passed; Home rendered with inquiry, navigation and controls |
| DYN-02 | Live provider/database/browser | Executed | Pass | E004–E006, E010–E013 | HTTP 201/stored initial state passed; structured Osmosis UI and hint agreed with state |
| DYN-03 | Live provider/database/browser | Executed | Pass | E005–E006, E010–E013 | Route/persisted 0→1 transition and first adaptation rendered as expected |
| DYN-04 | Live provider/database/browser | Executed | Pass | E005–E006, E010–E013 | Concept-clarification 1→2 transition, second adaptation and review state rendered |
| DYN-05 | Real app/database/browser | Executed | Partial Pass | E004–E006, E010–E013 | Persisted 2→2 bound and visible limit/Finish passed; direct zero-provider-call assertion remains indirect |
| DYN-06 | Real app/database/browser | Executed | Partial Pass | E004–E006, E010–E013 | Fade 0→0, no adaptation card and separate Finish passed; direct zero-provider-call assertion remains indirect |
| DYN-07 | Live provider/database/browser | Executed | Pass | E005–E006, E010–E013 | Language route, unchanged profile and simultaneous English+Burmese rendering passed; linguistic correctness not assessed |
| DYN-08 | Live provider/database | Executed | Pass | E005–E006 | Corrected outcome and trace persisted |
| DYN-09 | Live provider/database | Executed | Pass | E005–E006 | Relevant follow-up persisted once with unchanged Stage 7 state |
| DYN-10 | Live provider/database | Executed | Pass after adjudication | E004–E006 | HTTP 422 and unchanged state passed; initial driver path defect retained |
| DYN-11 | Real app/database/browser | Executed | Pass | E004–E006, E010–E013 | API history/reconstruction/ownership and hydrated History/Review/Resume observations passed |
| DYN-12 | Real app/database | Executed | Pass | E005–E006 | Completion idempotence and post-completion conflict passed |
| DYN-13 | Controlled fault/real database/browser | Executed | Pass | E004, E010–E013 | Stable HTTP 502/safe error and same-question recovery to HTTP 201 were captured; earlier blocked attempt remains retained |

## Manual browser evidence pass

### Scope and result boundary

Use this pass only to replace the browser-observation qualifications recorded
above. Do **not** rerun the 15 timings or treat screenshots as learner usability
evidence. This is a technical inspection by the evaluator, not a participant
study and not proof that Burmese or STEM content is educationally effective.

Create a separate run ID using the actual execution date:

```text
RUN-B01-YYYYMMDD-DYNAMIC-UI-01
```

Do not reuse `RUN-B01-20261001-DYNAMIC-01`, overwrite E004–E009, or allocate a
new evidence ID until a real file has been captured.

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

### Manual observation table

Copy this table into `observations.md` and fill it from what was actually seen:

| Observation | Related cases | Expected visible result | Actual result | Execution status | Outcome | Screenshot/HAR locator | Deviation or issue |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UI-01 Home | DYN-01 | Inquiry and navigation are ready without error | TO RECORD | Not run | Not assessed | `screenshots/01_home.png` | — |
| UI-02 Initial session | DYN-02 | Structured session and hint action render | TO RECORD | Not run | Not assessed | `screenshots/02_initial_session.png` | — |
| UI-03 Stage 6B | DYN-03/DYN-04 | Five optional help choices plus skip/cancel render | TO RECORD | Not run | Not assessed | `screenshots/03_stage6b_options.png` | — |
| UI-04 First adaptation | DYN-03 | Round-1 support/history and next response render | TO RECORD | Not run | Not assessed | `screenshots/04_adaptation_round1.png` | — |
| UI-05 Limit | DYN-04/DYN-05 | Round-2 history, limit message and separate Finish render | TO RECORD | Not run | Not assessed | `screenshots/05_limit_round2.png` | — |
| UI-06 Fade | DYN-06 | Fade history with no adaptation and separate Finish | TO RECORD | Not run | Not assessed | `screenshots/06_fade.png` | — |
| UI-07 Language route | DYN-07 | Route and English+Burmese adaptation render together | TO RECORD | Not run | Not assessed | `screenshots/07_language_support.png` | — |
| UI-08 History | DYN-11 | Newest-first self-reported support/status/action rows | TO RECORD | Not run | Not assessed | `screenshots/08_history.png` | — |
| UI-09 Review | DYN-11 | Completed state and stored interaction history reconstruct | TO RECORD | Not run | Not assessed | `screenshots/09_review_completed.png` | — |
| UI-10 Resume | DYN-11 | Reload preserves round, history, limit and next action | TO RECORD | Not run | Not assessed | `screenshots/10_resume_after_reload.png` | — |
| UI-11 Provider error | DYN-13 | Safe error appears with HTTP 502 and retained question | TO RECORD | Not run | Not assessed | `screenshots/11_provider_error.png`; HAR request | — |
| UI-12 Recovery | DYN-13 | Unchanged question succeeds after normal provider restart | TO RECORD | Not run | Not assessed | `screenshots/12_provider_recovery.png`; HAR request | — |

Use `Pass` only when every listed assertion for that observation is visible.
Use `Partial` when some observations are missing but no mandatory assertion is
contradicted, `Fail` when a mandatory assertion is contradicted, and `Blocked`
when the action could not be executed. Describe every non-Pass result.

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

## Per-case evidence record

Record case/attempt, baseline/protocol/run, evaluator/timestamp, learner alias,
dependency mode, locale/theme/viewport, preferences, exact input/action,
expected assertions, actual UI/API output, state before/after, provider-call
observation, execution status, outcome, evidence IDs, issue/deviation, and
retry relationship.

## Completion criteria

- DYN-01–DYN-13 are executed or transparently Blocked/Not assessed.
- UI/API observations and stored state are linked for each stateful case.
- All 15 timing attempts are accounted for.
- First failures and every retry remain visible.
- Timing is reported descriptively, without an unsupported SLA claim.
- Relevant FURPS rows and the master evidence register are updated.

**Completion record:** Step 11 is complete under runtime run
`RUN-B01-20261001-DYNAMIC-01` and manual-browser addendum
`RUN-B01-20261001-DYNAMIC-UI-01`. All 15 timing rows succeeded and UI-01–UI-12
passed within the recorded desktop Chrome, English, Light scope. DYN-05 and
DYN-06 remain Partial Pass only because zero provider calls were not directly
instrumented. Mobile, Burmese UI, Dark theme, systematic keyboard interaction,
linguistic/content quality and participant usability remain outside this pass.
