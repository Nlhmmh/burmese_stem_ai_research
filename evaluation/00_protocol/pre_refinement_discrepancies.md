# Pre-Refinement Discrepancy Register

## Purpose

This register records differences between the `B00-PRE-REFINEMENT` implementation and the authoritative refined specification in `evaluation/complete_system_artefacts_refined.md`.

These entries are design-preparation findings from repository inspection. They are not executed evaluation results, learner findings, or evidence that a later implementation has passed or failed formal FURPS testing.

## Status Vocabulary

| Status | Meaning |
| --- | --- |
| Open | Confirmed difference; refinement not implemented |
| Decision required | Implementation depends on a bounded design decision |
| Deferred | Intentionally left conceptual or outside the current PoC |
| Resolved in later baseline | May be used only after code and verification evidence exist |

## Discrepancies

| ID | Current `B00` implementation | Refined requirement | Primary evidence locator | Consequence | Planned refinement step | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `PRE-001` | No Stage 6B type, request property, UI control, or persistence field exists. | Medium/Needs Support may optionally ask “What would help you most?” using bounded choices. | `burmese_stem_ai/components/learn/LearningSession.tsx:64`; `services/adaptation.service.ts:52`; `data/schemas/session.schema.ts:63` | The PoC cannot collect or route an explicit learner-reported difficulty type. | Steps 2–4 and 8 | Open |
| `PRE-002` | `high` selects `key_takeaway`, calls the LLM, and consumes an adaptation round below the cap. | “I understand” should fade/conclude additional support without an unnecessary adaptation. | `burmese_stem_ai/services/adaptation.service.ts:88-147` | High does not currently implement the refined fading route and can use the bounded adaptation allowance. | Step 4 | Open |
| `PRE-003` | Route selection depends only on `high`, `medium`, or `needs_support`. | Stage 7 must combine overall support need with optional difficulty clarification. | `burmese_stem_ai/services/adaptation.service.ts:116-147` | Language, conceptual, and misinterpretation routes cannot be selected deterministically. | Steps 2 and 4–7 | Open |
| `PRE-004` | The session stores latest `understanding` and generated adaptations, but not a separate difficulty type or route event. | Preserve overall signal, optional difficulty type, selected route, round, and adapted response for traceability/reconstruction. | `burmese_stem_ai/data/schemas/session.schema.ts:22-77`; `data/dao/session.dao.ts:82-123` | Fade/capped responses and route decisions cannot be fully reconstructed. | Step 3 | Open |
| `PRE-005` | No post-creation operation can revise `concept.name`, `concept.domain`, or the initial scaffold. | “The concept or term is not what I meant” should reconsider Stage 2 and Stage 1 if required, then regenerate downstream support. | `burmese_stem_ai/services/adaptation.service.ts:123-215`; `data/dao/session.dao.ts:91-123` | The exceptional ambiguity/misinterpretation route is not executable. | Step 7 | Decision required |
| `PRE-006` | A mismatch signal contains no learner-provided intended term or context. | Correction needs sufficient evidence to avoid arbitrarily guessing a new interpretation. | Refined specification §13.6 and §43; no corresponding source field | A boolean mismatch alone is insufficient for reliable correction. | Step 7; recommended short Stage 6B clarification input | Decision required |
| `PRE-007` | Completed sessions hide the adaptation section; active sessions display only the latest adaptation. | Review/Resume should reconstruct stored support and interaction state. | `burmese_stem_ai/components/learn/LearningSession.tsx:196-204,287-360` | Review cannot show the full adapted-support sequence. | Step 11 | Open |
| `PRE-008` | History labels the signal as “Understanding” and describes “understanding progress”. | Treat High/Medium/Needs Support as learner-reported support signals, not measured learning. | `burmese_stem_ai/components/history/HistoryList.tsx:155-175`; `i18n/locales/en.json:54-68` | UI wording risks overstating what the self-report represents. | Steps 11 and 13 | Open |
| `PRE-009` | Stored `uiLanguage` and `theme` preferences are not connected to the actual cookie and `localStorage` controls. | Preference persistence claims should match actual state ownership. | `burmese_stem_ai/data/schemas/profile.schema.ts:39-65`; `components/layout/AppHeader.tsx:18-27`; `app/layout.tsx:47-54` | The profile contains values that do not govern their corresponding UI controls. | Step 11 | Decision required |
| `PRE-010` | Provider request/extraction logic and source fallback models are duplicated across three services. | Consistent bounded provider/error behaviour should be testable without moving domain decisions into the provider layer. | `burmese_stem_ai/services/session.service.ts:5-6,153-216`; `burmese_stem_ai/services/adaptation.service.ts:10-11,150-215`; `burmese_stem_ai/services/followup.service.ts:9-10,112-179` | Configuration/error behaviour may drift and mocking is less direct. | Step 12 | Open |
| `PRE-011` | Preference GET lacks controlled route handling; error shapes and session-ID validation are inconsistent; locale cookie is not validated before dynamic import. | Invalid inputs and failures should produce controlled, consistent behaviour. | `burmese_stem_ai/app/api/preferences/route.ts:8-13`; `burmese_stem_ai/app/api/sessions/[sessionId]/respond/route.ts:16-58`; `burmese_stem_ai/app/api/sessions/[sessionId]/followup/route.ts:17-66`; `burmese_stem_ai/i18n/request.ts:4-8` | Formal error-handling tests do not yet have one consistent contract. | Step 12 | Open |
| `PRE-012` | Root/technical READMEs and protocol still describe High → `key_takeaway` and the pre-refinement route set. | Documentation and test oracles must match the frozen refined design and implemented baseline. | `burmese_stem_ai/README.md:1907-1950`; `evaluation/00_protocol/evaluation_protocol.md:50-64` | Formal tests could validate obsolete behaviour. | Step 13 | Open |
| `PRE-013` | No automated test command or suite exists. | Refined routing, persistence, bounds, APIs, and UI require deterministic structural verification before formal evaluation. | `burmese_stem_ai/package.json:5-11` | Current behaviour is not protected by repeatable automated assertions. | Steps 1 and 14 | Open |
| `PRE-014` | Completed-session follow-ups remain writable because neither UI nor service rejects them. | The relationship between completed Review state and follow-up mutation is not specified. | `burmese_stem_ai/components/learn/FollowUpSection.tsx:24-108`; `burmese_stem_ai/services/followup.service.ts:75-110` | Review may mutate a completed record and change its recency. | Step 10; recommend read-only completed Review | Decision required |

## Deliberate Non-Gaps

The following are intentionally not recorded as implementation defects:

- one structured initial LLM call may operationalise Stages 1–5;
- the initial session may show a standard scaffold set;
- the PoC may retain the maximum of two generated adaptation rounds;
- preferences may remain a modal rather than a fourth screen;
- deterministic automatic term extraction, quizzes, mastery scoring, authentication, LMS functions, unrestricted chat, microservices, queues, and Kubernetes are not required;
- structural validity does not establish generated-content accuracy or educational effectiveness.

## Resolution Rule

An entry may be marked **Resolved in later baseline** only when:

1. the relevant implementation and documentation change exists;
2. its exact commit/baseline is recorded;
3. proportionate verification has been executed and retained;
4. no result is inferred beyond the verification evidence;
5. affected formal tests use the updated oracle.
