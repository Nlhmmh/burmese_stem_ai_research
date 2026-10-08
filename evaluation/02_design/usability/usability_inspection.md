# Structured usability inspection

## Run and scope

RUN-B01-20261002-USABILITY-01, 2 October 2026. Root B01 production application, isolated MongoDB and controlled provider fixtures; no live model calls. There were 133 captures (131 main plus two navigation rechecks). Evidence E036–E038. This is structured technical inspection, not participant feedback or a full accessibility audit.

Desktop 1440 × 900 and simulated mobile 390 × 844, English/Burmese UI and light/dark themes formed eight configurations. Home, preferences, initial support and Stage 6B covered all eight. Later states covered selected combinations rather than every possible state/configuration pair. Keyboard, delayed loading, recovery, bounded choices and bilingual override were inspected.

## Criteria and results

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

Overall was six Pass, three Partial and no Fail. A Pass is scoped to inspected behavior, not an all-usability or language-quality certification.

## Open issues

| Issue | Severity | Observation | Recommended change, not implemented |
| --- | --- | --- | --- |
| USI-01, modal focus | 2 | Initial focus outside dialog, Tab reaches background, dismissal does not restore opener | Set/contain focus and restore it on close; retest both viewports |
| USI-02, Burmese errors | 2 | Initial/adaptation/follow-up errors remain English within Burmese UI | Localize stable error messages and repeat recovery checks |
| USI-03, ambiguity badge | 1 | Generic Concept Correction badge appears despite remaining-ambiguity trace | Use an ambiguity-specific badge and compare outcomes |

[issues.csv](issues.csv) retains steps, expected/actual behavior and evidence. Preference-save infrastructure failures, physical touch devices, other browsers, screen readers, contrast certification and participant outcomes were not assessed. Severity reflects inspection judgement, not measured participant difficulty.

## Evidence

[Raw observations and screenshots](raw/RUN-B01-20261002-USABILITY-01/) retain configuration IDs, DOM snapshots, keyboard traces and navigation rechecks. Original metadata and the frozen protocol are inside the archive; do not count a later review as a new browser execution.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
