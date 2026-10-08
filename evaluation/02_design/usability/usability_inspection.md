# §18.1 — Structured usability inspection

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

Specification: `A5-USABILITY-01`; protocol `A5-PROTOCOL-01` §5.4, version 2.1.
Run: `RUN-B01-20261002-USABILITY-01`, 2 October 2026, Pacific/Auckland.
Status: **Completed with findings — 6 Pass, 3 Partial, 0 Fail.**
Execution: 133 browser observations and screenshots (131 main + two navigation rechecks); E036–E038.

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
- [Run metadata](raw/RUN-B01-20261002-USABILITY-01/00_run_metadata.md),
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

## U1–U9 outcomes

| Criterion | Outcome | Highest severity | Rationale / evidence |
| --- | --- | --- | --- |
| U1 Task clarity | Pass | 0 | Purpose, labelled inquiry, empty/whitespace prevention, keyboard submission and recoverable entry inspected on both widths/locales. D01/D07–D09/M24–M27/C-H. |
| U2 Visual structure | Pass | 0 | Simple/example/technical/reflection/hint, adaptation history and follow-up answers remain distinguishable on both widths. D10–D11/D18/M03–M04/M17/F02–F04. |
| U3 Bounded choices | Pass | 0 | Three overall responses, five optional support choices, skip/back and bounded clarification exercised; selected/focus states visible. D12–D26/M05–M15/M28–M29-5. Meaningful content novelty is not inferred. |
| U4 Feedback | Pass | 0 | Pending/adapting, route/round, fade, cap, completed state and controlled failure/retry feedback visible. D09/D14–D30/M13–M17/M26-L/M30–M31. Localisation defect scored under U8/U9. |
| U5 Navigation consistency | Partial | 2 | Home/History/Review/Resume and preference save/reload work, but modal keyboard focus starts outside, escapes and does not return to opener (USI-01). |
| U6 Bilingual readability | Pass | 0 | Inspected Burmese glyphs, mixed English terms and long bounded content wrap without material clipping in both themes/widths; bilingual override visible despite English-only snapshot. D24/D35–D38/M09/M20–M23/C-I. Visual readability only: simulation language-quality findings remain mixed. |
| U7 State clarity | Pass | 1 | Self-report, route/round/limit, review recommendation, completed state and correction trace distinguishable. Ambiguity is explicit but generic Concept Correction badge persists (USI-03). No initial round-0 badge is claimed. |
| U8 Error recovery | Partial | 2 | Safe initial/adaptation/follow-up errors preserve resubmission; foreign-session recovery works. English-only messages in Burmese UI impede Burmese-only recovery (USI-02). Preference-save infrastructure failure not injected. |
| U9 Consistency | Partial | 2 | Labels/layout patterns work across all eight configurations, but modal focus, untranslated errors and ambiguity badge are retained inconsistencies (USI-01–03). |

**Overall:** six Pass, three Partial, no Fail; highest severity 2. No severity-3
task obstruction was observed. This is not an all-usability Pass.

## Issues and recommendations — not implemented

1. **USI-01, severity 2 — modal focus.** Opening preferences leaves focus on
   BODY; Tab reaches a background example prompt. The 16-step mobile trace
   eventually reaches modal controls, then escapes to BODY/navigation. Escape
   closes but does not return focus to the opener. Workaround: extra Tab
   navigation or pointing-device selection. Recommend initial dialog focus,
   containment and restoration; then rerun desktop/mobile keyboard cases.
2. **USI-02, severity 2 — Burmese error localisation.** Burmese Home displays
   “Unable to prepare the explanation right now”; adaptation and follow-up
   equivalents also remain English while surrounding controls are Burmese.
   Recovery succeeds after the controlled fault is removed. Workaround: English
   proficiency or locale switch; neither is assumed for the target learner.
   Recommend translating stable error codes at the UI boundary and retesting
   all three failure/recovery flows in Burmese.
3. **USI-03, severity 1 — remaining-ambiguity badge.** The clarification and
   trace explicitly say meaning remained ambiguous, but the generic scaffold
   badge says “Adapted — Concept Correction”. Recommend an ambiguity-specific
   badge, then compare corrected versus still-ambiguous displays.

These are technical evaluator judgements of observed task effects, not measured
participant difficulty or native-speaker endorsements. [issues.csv](issues.csv)
contains reproducible steps, expected/actual results, evidence and recommendations.

## Accountability, exclusions and claim boundaries

- A locator for New Inquiry matched two valid links; it was narrowed to the
  main link. An initially guessed adaptation-error phrase did not match the
  real safe message; the actual message/recovery were captured. Neither is an
  application defect.
- Final evidence review found no separately recorded Back activation, so a
  dated navigation addendum restarted only the same isolated synthetic setup.
  A01/A02 now record desktop/mobile selected-choice cancellation by Enter.
  All 30 stored sessions stayed byte-equivalent after JSON normalisation and
  provider requests stayed at 29. Main captures/metadata were not overwritten.
  A guessed Medium-labelled button did not exist (actual label: “I partially
  understand”); fresh accessibility state resolved the locator, not an app defect.
- I02 requested desktop but captured 390×844; its additive note corrects the
  interpretation. I03/I04 explicitly recheck settled desktop/mobile empty
  History. Actual capture dimensions govern the sheet.
- A layout check flagged an intentionally 1-pixel screen-reader-only heading
  in D39; this is not visible content clipping. No full WCAG contrast,
  screen-reader, alternative-browser, touch or assistive-technology audit ran.
- Invalid preference values cannot be selected in the bounded modal. UI
  validation-error state is NA/unreachable, not Pass. Existing BB17/server tests
  remain separate evidence. Preference-save database failures and general
  offline/browser failures were not injected; U8 is not an exhaustive failure
  certification. Valid-save pending timing was not a separate failure oracle.
- Fixtures for correction/ambiguity put a cell heading over reused initial
  photosynthesis text. That synthetic setup is not a production semantic
  mismatch finding or evidence of correct scientific explanation. Prefixed
  adaptation text does not prove genuinely revised pedagogy or bilingual quality.
- Long fixtures repeat bounded text up to 1,400 characters per language.
  Screenshots establish only inspected wrapping/visual structure, not arbitrary
  input lengths or semantic coherence. Full-page images include content below
  the fold; mobile pages require scrolling.
- No live LLM calls, participant research, independent qualified Burmese
  content review, learning measurement, optimal-round claim or accessibility
  certification. Nathan's prior simulation endorsement is not reused as
  approval of these new synthetic adaptations or evaluator judgements.
- Identity-cookie values in three shareable exports were replaced by synthetic
  learner aliases; original copies are separate in permission-restricted
  temporary storage, documented in the redaction record. Artificial session
  UUIDs remain for UI/state traceability. No production data or API secret was
  used. Temporary application/database servers are stopped.
- Prior black-box partials/oracle failure, white-box gaps and simulation
  content/technical failures are unchanged. This inspection does not erase them.

## Completion and next action

Every U criterion has an execution status/outcome; the planned states are
executed or explicitly accounted for above. The evidence manifest and source
hash checks make this a reproducible technical record, not a clean-worktree
baseline freeze. Production code was left unchanged; documentation/evidence
changes are intentional. Continue to **Step 16 — Design Informed Argument**
using these findings and the existing evaluation records. Fixing production
issues would require a separately authorised baseline change and affected reruns.
