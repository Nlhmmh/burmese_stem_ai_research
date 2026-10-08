# Structured usability inspection

Detailed sections: [Case register](#case-register).

## Run and scope

RUN-B01-20261002-USABILITY-01, 2 October 2026. Root B01 production application, isolated MongoDB and controlled provider fixtures; no live model calls. There were 133 captures (131 main plus two navigation rechecks). Evidence E036–E038. This is structured technical inspection, not participant feedback or a full accessibility audit.

Desktop 1440 × 900 and simulated mobile 390 × 844, English/Burmese UI and light/dark themes formed eight configurations. Home, preferences, initial support and Stage 6B covered all eight. Later states covered selected combinations rather than every possible state/configuration pair. Keyboard, delayed loading, recovery, bounded choices and bilingual override were inspected.

## Case register

Each row contains the case contract and its recorded result. Shared run conditions above apply unless a row states otherwise. Outcomes and limitations are retained from the evidence; this layout change is not a new test run.

| Case | Case details / action | Conditions / inputs | Expected result | Actual result | Outcome | Limitation | Observation notes / evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| U1 | Task clarity — Home and keyboard inspection | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Inquiry purpose and entry evident | Purpose, labelled inquiry, empty/whitespace prevention, keyboard submission and recoverable entry inspected on both widths/locales. D01/D07–D09/M24–M27/C-H. | Pass | Highest severity 0. Structured evaluator inspection, not participant feedback. | No case-specific issue recorded. E036–E038; observation and screenshot locators are included in Actual result. |
| U2 | Visual structure — Organisation of initial, revised and follow-up support | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Explanation areas and hint distinguishable | Simple/example/technical/reflection/hint, adaptation history and follow-up answers remain distinguishable on both widths. D10–D11/D18/M03–M04/M17/F02–F04. | Pass | Highest severity 0. Structured evaluator inspection, not participant feedback. | No case-specific issue recorded. E036–E038; observation and screenshot locators are included in Actual result. |
| U3 | Bounded choices — Two-level response and keyboard inspection | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Response choices, skip/back and consequences clear | Three overall responses, five optional support choices, skip/back and bounded clarification exercised; selected/focus states visible. D12–D26/M05–M15/M28–M29-5. Meaningful content novelty is not inferred. | Pass | Highest severity 0. Structured evaluator inspection, not participant feedback. | No case-specific issue recorded. E036–E038; observation and screenshot locators are included in Actual result. |
| U4 | Feedback — Loading, routes, fade/cap and recovery | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Pending/adapting and revised support visible | Pending/adapting, route/round, fade, cap, completed state and controlled failure/retry feedback visible. D09/D14–D30/M13–M17/M26-L/M30–M31. Localisation defect scored under U8/U9. | Pass | Highest severity 0. Structured evaluator inspection, not participant feedback. | No case-specific issue recorded. E036–E038; observation and screenshot locators are included in Actual result. |
| U5 | Navigation consistency — Navigation and modal focus<br>USI-01 reproduction: Open Learning Preferences; press native Tab; continue through modal controls; press Escape and inspect focus | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | History, Review, Resume and preferences reachable<br>USI-01 expected: Focus enters and stays inside dialog; dismissal restores opener focus | Home/History/Review/Resume and preference save/reload work, but modal keyboard focus starts outside, escapes and does not return to opener (USI-01).<br>USI-01 actual: Initial focus remains on BODY; Tab reaches background example prompt; focus eventually leaves modal; Escape closes without restoring opener | Partial | Highest severity 2. Structured evaluator inspection, not participant feedback. | USI-01: Keyboard task impeded by hidden/background focus and extra navigation; modal controls eventually reachable; workaround: Extra Tab navigation or pointing-device selection; recommendation (not implemented): Set initial focus; contain modal Tab sequence; restore opener on dismissal; rerun both viewports. Evidence: US-D03\|US-D04\|US-D05\|US-D41\|US-D42\|US-M32\|US-M33\|US-M35; raw/RUN-B01-20261002-USABILITY-01/keyboard_modal_trace.json; raw/RUN-B01-20261002-USABILITY-01/screenshots/US-M35.jpg. |
| U6 | Bilingual readability — Screen sizes, interface languages, themes and bilingual display | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Readable characters and line wrapping without cut-off text | Inspected Burmese glyphs, mixed English terms and long bounded content wrap without material clipping in both themes/widths; bilingual override visible despite English-only snapshot. D24/D35–D38/M09/M20–M23/C-I. Visual readability only: simulation language-quality findings remain mixed. | Pass | Highest severity 0. Glyph/wrapping inspection only, not bilingual semantic quality. | No case-specific issue recorded. E036–E038; observation and screenshot locators are included in Actual result. |
| U7 | State clarity — Status, events and interpretation displays<br>USI-03 reproduction: Select mismatch option; provide bounded clarification; use remaining-ambiguity fixture; compare badge with response history | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Self-report, route, limits and completion distinct<br>USI-03 expected: Badge distinguishes remaining ambiguity from confirmed concept correction | Self-report, route/round/limit, review recommendation, completed state and correction trace distinguishable. Ambiguity is explicit but generic Concept Correction badge persists (USI-03). No initial round-0 badge is claimed.<br>USI-03 actual: Generic Adapted — Concept Correction badge remains while trace/question explicitly says meaning remained ambiguous | Pass | Highest severity 1. Structured evaluator inspection, not participant feedback. | USI-03: Minor terminology inconsistency; trace provides accurate qualification; no task obstruction observed; workaround: Read explicit ambiguity trace/question; recommendation (not implemented): Use ambiguity-specific scaffold badge; compare corrected and still-ambiguous displays. Evidence: US-D26\|US-M12; raw/RUN-B01-20261002-USABILITY-01/screenshots/US-D26.jpg; raw/RUN-B01-20261002-USABILITY-01/US-M12.dom.txt. |
| U8 | Error recovery — Failure, retry and ownership inspection<br>USI-02 reproduction: Select Burmese UI; configure controlled provider non-2xx; submit inquiry/support response/follow-up; inspect message; remove fault and resubmit/retry | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Localized error and recovery action understandable<br>USI-02 expected: Safe error and recovery explanation are localised in Burmese | Safe initial/adaptation/follow-up errors preserve resubmission; foreign-session recovery works. English-only messages in Burmese UI impede Burmese-only recovery (USI-02). Preference-save infrastructure failure not injected.<br>USI-02 actual: English-only explanation/additional-support/follow-up error text appears inside Burmese UI; Burmese retry controls and preserved query still work | Partial | Highest severity 2. Preference-save infrastructure failure was not injected. | USI-02: Recovery meaning not available in selected locale; impedes a Burmese-only learner by evaluator judgement; workaround: English proficiency or switch locale; retry after failure is resolved; recommendation (not implemented): Translate stable error codes in learner UI; keep safe messages; rerun all three Burmese failure/recovery flows. Evidence: US-D40\|US-M26\|US-M27\|US-M30\|US-M31\|US-F05\|US-F06; raw/RUN-B01-20261002-USABILITY-01/screenshots/US-M26.jpg; raw/RUN-B01-20261002-USABILITY-01/US-M30.dom.txt; raw/RUN-B01-20261002-USABILITY-01/US-F05.dom.txt. |
| U9 | Consistency — Language, theme, screen width and keyboard checks<br>USI-01 reproduction: Open Learning Preferences; press native Tab; continue through modal controls; press Escape and inspect focus<br>USI-02 reproduction: Select Burmese UI; configure controlled provider non-2xx; submit inquiry/support response/follow-up; inspect message; remove fault and resubmit/retry<br>USI-03 reproduction: Select mismatch option; provide bounded clarification; use remaining-ambiguity fixture; compare badge with response history | B01 root build; fixture provider; desktop/mobile, English/Burmese, light/dark. Later states use selected configurations; shared capture matrix gives actual reach. | Labels/interactions consistent across configurations<br>USI-01 expected: Focus enters and stays inside dialog; dismissal restores opener focus<br>USI-02 expected: Safe error and recovery explanation are localised in Burmese<br>USI-03 expected: Badge distinguishes remaining ambiguity from confirmed concept correction | Labels/layout patterns work across all eight configurations, but modal focus, untranslated errors and ambiguity badge are retained inconsistencies (USI-01–03).<br>USI-01 actual: Initial focus remains on BODY; Tab reaches background example prompt; focus eventually leaves modal; Escape closes without restoring opener<br>USI-02 actual: English-only explanation/additional-support/follow-up error text appears inside Burmese UI; Burmese retry controls and preserved query still work<br>USI-03 actual: Generic Adapted — Concept Correction badge remains while trace/question explicitly says meaning remained ambiguous | Partial | Highest severity 2. Inspection covers recorded configurations, not all devices or assistive technologies. | USI-01: Keyboard task impeded by hidden/background focus and extra navigation; modal controls eventually reachable; workaround: Extra Tab navigation or pointing-device selection; recommendation (not implemented): Set initial focus; contain modal Tab sequence; restore opener on dismissal; rerun both viewports. Evidence: US-D03\|US-D04\|US-D05\|US-D41\|US-D42\|US-M32\|US-M33\|US-M35; raw/RUN-B01-20261002-USABILITY-01/keyboard_modal_trace.json; raw/RUN-B01-20261002-USABILITY-01/screenshots/US-M35.jpg.<br>USI-02: Recovery meaning not available in selected locale; impedes a Burmese-only learner by evaluator judgement; workaround: English proficiency or switch locale; retry after failure is resolved; recommendation (not implemented): Translate stable error codes in learner UI; keep safe messages; rerun all three Burmese failure/recovery flows. Evidence: US-D40\|US-M26\|US-M27\|US-M30\|US-M31\|US-F05\|US-F06; raw/RUN-B01-20261002-USABILITY-01/screenshots/US-M26.jpg; raw/RUN-B01-20261002-USABILITY-01/US-M30.dom.txt; raw/RUN-B01-20261002-USABILITY-01/US-F05.dom.txt.<br>USI-03: Minor terminology inconsistency; trace provides accurate qualification; no task obstruction observed; workaround: Read explicit ambiguity trace/question; recommendation (not implemented): Use ambiguity-specific scaffold badge; compare corrected and still-ambiguous displays. Evidence: US-D26\|US-M12; raw/RUN-B01-20261002-USABILITY-01/screenshots/US-D26.jpg; raw/RUN-B01-20261002-USABILITY-01/US-M12.dom.txt. |

Overall: six Pass, three Partial and no Fail. Highest severity 2.

Retained issue reproduction steps and recommendations are in the affected case rows and [issues.csv](issues.csv). No fix was implemented. Physical devices, other browsers, screen readers and contrast certification were not assessed.

## Evidence

[Raw observations and screenshots](raw/RUN-B01-20261002-USABILITY-01) retain configuration IDs, DOM snapshots, keyboard traces and navigation rechecks. Original metadata and the frozen protocol are inside the archive; do not count a later review as a new browser execution.

## Inspected flows and capture procedure

## Pre-execution scope

Root production application matching B01; temporary isolated MongoDB and
controlled provider fixtures, with no real model calls or source-copy checkout.
This is an AI-assisted technical evaluator inspection, not participant feedback,
accessibility certification or a new qualified Burmese/content review.

Inspect 1440 × 900 and 390 × 844 viewports. Distribute English/Burmese UI,
light/dark themes and bilingual content across all required flows; inspect
each reachable state in both viewports. Record actual dimensions and exceptions.

| Flow | Planned observations | Criteria |
| --- | --- | --- |
| Home | Normal, empty/invalid, loading, provider error, keyboard submission | U1 U4 U8 U9 |
| Content | Initial sections, hint reveal, bilingual/long wrapping | U2 U6 U9 |
| Stage 6 | High/Medium/Needs Support; five choices; skip/back; clarification and keyboard order | U3 U4 U7 U9 |
| Outcomes | Adapting, fade, generated, corrected, ambiguous, cap, failure/retry | U3 U4 U7 U8 |
| History | Empty/populated, order, labels, isolation | U5 U7 U9 |
| Review/Resume | Statuses, rounds 0/1/2, response/adaptation history, legacy | U4 U5 U7 U9 |
| Preferences | Open/close, keyboard/focus, valid save, failure, persistence | U5 U8 U9 |

Keyboard checks record tab order, visible focus, Enter/Space activation, dialog
focus/escape/return and unreachable controls. Do not modify the DOM to force
invalid options; record UI-unreachable states separately from server tests.

Severity: 0 none observed; 1 cosmetic; 2 task impeded with workaround;
3 task blocked/materially misleading. Pass requires complete planned coverage
and no severity 2/3 issue. Partial means incomplete coverage or severity 2;
Fail means severity 3. Keep all issues visible; do not fix production during
evidence capture. Screenshots/DOM observations are stored in the run's raw
folder; the final register will map U1–U9 and list unexecuted checks explicitly.

## Executed method and evidence

Inspected the existing root `burmese_stem_ai` production build in Chrome
154.0.8037.97. The 66 production files match B01 commit
`37faefa236829aa3d79e023faa1fb72a086b5c2a`; no source copies or application
fixes were made. The root test/config profile remains ROOTTESTS-02.

The local HTTP/proxy/service/DAO path used a temporary real MongoDB database.
A controlled provider seam supplied previously captured initial outputs and
synthetic adaptations/corrections, with a 1,500 ms delay to make pending states
inspectable. Twenty-nine provider-seam requests and **zero external provider
calls** were recorded. Delay is a test control, not measured production latency.
Browser operations used actual UI controls, native keyboard actions, screenshots
and read-only DOM inspection; the DOM was not modified to manufacture states.
Explicit database fixtures made legacy, round-1/2, completed, long-content and
foreign-owner states reachable without changing production code.

Eight actual configurations were observed: desktop 1440×900 and mobile
390×844, each in English/Burmese UI and light/dark theme. Home, preferences,
initial bilingual content and Stage 6B were inspected in all eight. Routes,
errors and remaining states were distributed across configurations and inspected
in both viewports, as required by protocol §5.4; this is not every state in
every Cartesian combination. Chrome viewport emulation is not a physical-phone
or touch-device test.

Evidence:

- E036: [original observations](raw/RUN-B01-20261002-USABILITY-01/observations.jsonl),
  [additive corrections](raw/RUN-B01-20261002-USABILITY-01/observation_corrections.jsonl)
  and [derived observation sheet](raw/RUN-B01-20261002-USABILITY-01/observations.csv).
  [Navigation addendum](raw/RUN-B01-20261002-USABILITY-01/navigation_addendum.jsonl)
  and [addendum sheet](raw/RUN-B01-20261002-USABILITY-01/navigation_addendum.csv)
  retain two subsequent desktop/mobile Back activations. Each row maps criteria, screen/state, locale/support language, theme, actual
  viewport, keyboard checks, observation, severity, task effect, recovery,
  evaluator/competence and screenshot/DOM paths.
- E037: this analysis and [three retained issues](issues.csv).
- E038: [SHA-256 evidence manifest](raw/RUN-B01-20261002-USABILITY-01/manifest.sha256).
- Original run metadata is archived as `evaluation/02_design/usability/raw/RUN-B01-20261002-USABILITY-01/00_run_metadata.md`; configuration and execution details are reproduced above. Retained machine evidence includes
  [verification](raw/RUN-B01-20261002-USABILITY-01/verification.json),
  [final stored state](raw/RUN-B01-20261002-USABILITY-01/database_snapshot.json),
  [keyboard modal trace](raw/RUN-B01-20261002-USABILITY-01/keyboard_modal_trace.json).

Original observation notes remain intact. The derived sheet applies explicit
corrections, including actual modal control names, the incorrect first focus
description, missing initial round-0 badge, ambiguity terminology and error
localisation. None of these corrections erases a screenshot or first attempt.

## Executed screen/state matrix

IDs below identify actual screenshots and DOM files in the run folder; the
observation sheets contain all 131 main and two addendum records, not just these examples.

| Flow / planned states | Desktop observations | Mobile observations | Result / qualification |
| --- | --- | --- | --- |
| Home: normal, empty/whitespace-invalid, keyboard submission, loading, provider error/recovery | D01, D07–D09, D29–D30, D39–D40 | M24–M27, M26-L | Empty/whitespace disables Ask; Enter submits; pending feedback visible; retained inquiry resubmits. Burmese error message remains English (USI-02). |
| Content: initial hierarchy, hint, bilingual, long content | D10–D11, D31, D35–D38 | M03–M04, M20–M23 | Sections and revealable hint distinguishable; glyph/wrapping observations and geometry checks show no material clipping in inspected content. |
| Stage 6A/6B: High, Medium, Needs Support, five options, skip/back, clarification, keyboard | D12–D16, D19, D22–D26, A01 | M05–M15, M28–M29-5, A02 | All five routes and optional continuation executed. Space/ArrowDown selection and Burmese choices inspected. Clarification required only for mismatch choice. Back restores Stage 6A without generation or stored changes. |
| Outcomes: adapting, generated support, correction, ambiguity, fade, cap, retry/error | D14–D28 and route `-L` captures | M07–M17 and route `-L` captures, M30–M31 | Route/round trace, corrected heading, ambiguity question, fade and explicit Finish distinguishable. Ambiguous scaffold badge inconsistent (USI-03). Burmese adaptation error English (USI-02). |
| History: empty/populated, newest-first, self-report/action labels, ownership | D02, D43–D46, I03, H02 | M01–M02, M36–M37, I01, I04, H01 | Final 29 owned links exactly match stored newest-first order. Foreign session excluded and direct access controlled; recovery returns to owned History. |
| Review/Resume: initial/round-1/round-2, in-progress/review-recommended/completed, response history, legacy | D18, D31–D34, H03 | M02, M16–M19 | Stored adaptations/events reconstruct; round-2 feedback and completed Review visible. Legacy missing arrays/snapshot handled without observed crash. |
| Preferences: open/close, keyboard/focus, valid save, persistence, validation error | D03–D06, D41–D42 | M32–M35 | Valid save survives reload; Escape closes. Modal focus not placed, contained or restored (USI-01). Invalid-value validation is UI-unreachable through bounded options; recorded NA, not forced. |
| Follow-up: loading, relevant/unrelated, two-question cap, error/recovery | F01-L, F01–F03 | F04–F06, F05-L | Relevant answers retained; unrelated response recommends new session; two-question feedback replaces form. English-only Burmese error retained (USI-02). |
| Additional four configuration combinations | C01/C02-H/P/I/B | C03/C04-H/P/I/B | Completes all eight Home/modal/initial/Stage-6B viewport×locale×theme combinations. |

Prefixes in the table omit `US-`. Some transient captures may be later than the
pending state; loading conclusions use the captures that actually contain
pending feedback, rather than treating every `-L` filename as proof.


## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../archive/pre_consolidation_markdown_20261008.zip).
