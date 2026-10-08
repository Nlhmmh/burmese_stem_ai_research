# Dynamic analysis

## Run and scope

RUN-B01-20261001-DYNAMIC-01 used the real local B01 application, live provider and isolated MongoDB. Nathan completed manual browser pass RUN-B01-20261001-DYNAMIC-UI-01 in Chrome 154.0.8037.59 at 1440 × 900, English/light. Evidence E004–E013.

## Cases and results

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

## Timing

Fifteen sequential initial-generation requests across photosynthesis, gravity, current, OOP inheritance and pH succeeded. Median was 3,330.576 ms, with range 2,592.835–4,640.164 ms. [All timing rows](timings.csv) are retained. These are local descriptive observations, not load testing, an SLA or a latency guarantee.

## Manual browser observations

All twelve planned captures passed within the stated desktop scope. Home, initial content, Stage 6B, both adaptations, limit/Finish, fade, bilingual override, History, completed Review, reload/Resume and error/recovery were observed. The planned provider fault returned safe HTTP 502, and the unchanged question later succeeded with HTTP 201 after provider restoration. The HAR had 168 localhost entries without exported authorization/cookie values. Original screenshots are retained in [the browser run](raw/manual_browser/RUN-B01-20261001-DYNAMIC-UI-01/).

## Qualifications

DYN-05/06 remain Partial Pass because zero provider calls were inferred, not directly counted in this run. Later bounds checks do not upgrade these historical cases. DYN-10's initial assertion checked the wrong response nesting; the first attempt and adjudication are preserved. Mobile/Burmese/dark/keyboard coverage belongs to the separate usability inspection. This technical browser pass is not a participant study or general linguistic validation.

## Evidence and repeat procedure

[Raw API/state records](raw/) and timing CSV remain unchanged. Archived manual metadata, observation notes and the original test-case document contain the complete setup and 15-step screenshot procedure. For a new pass, verify B01, use an isolated synthetic learner/database, record viewport and preferences, repeat the twelve states above, and save screenshots plus start/end times in a new run folder rather than overwrite this evidence.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
