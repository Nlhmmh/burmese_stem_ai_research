# Step 14 — Black-box execution and findings

Run: **RUN-B01-20261002-BLACKBOX-01**, 2 October 2026 (Pacific/Auckland). Baseline: **B01-A5-EVALUATION**, application commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`. Protocol acceptance criteria remain version 2.1; observed oracle discrepancies are recorded below, not silently removed from the pre-run specification.

Status: **Completed with qualifications. All BB01–BB24 and their listed API subcases are executed/accounted for.** This is not an all-assertion or all-content pass. Step 15 white-box testing is next; the wider structured-usability matrix remains separate.

## Results and accounting

| Evidence scope | Actual result |
| --- | --- |
| First main API execution | 24 cases: 22 Pass, 2 Fail; 370 assertions, 368 true and 2 false |
| Assessed case register | 21 Pass, 2 Partial (BB07/BB08 fixture-content limitations), 1 Fail (BB22 frozen absent-identity expectation) |
| Post-observation public-boundary addendum | 9 HTTP attempts; 11 assertions true; first failures retained |
| Browser observations | 44 observations; 46 predicates: 42 true and 4 false; all four have explicit corrected/re-scoped rechecks retained |
| Screenshots | 45 JPEG files, including final viewport view |
| Main-run HTTP capture | 164 actual requests, including setup; 9 addendum requests separately retained; browser requests are not included in these HTTP-log counts |
| Provider dependency seam | 112 fixture attempts across all phases; **0 external provider calls** |
| Final synthetic state | 42 sessions, 3 profiles, 25 adaptations, 28 response events, 7 follow-ups |
| Evidence integrity checks | Passed: all IDs accounted for; 29 successful detail projections match stored state; all stored bounds ≤2; browser History contains exactly its own 10 sessions, newest-first; completed Review contains exact stored initial/adapted/follow-up text |

The [case register](black_box_results.csv) preserves both first API and assessed outcomes. The [per-assertion register](black_box_assertions.csv) contains all 427 observed assertions/predicates plus two explicit Not assessed content-scope entries. Do not merge the 11 post-observation assertions into a claim that all expectations were independently frozen before execution. Case/output-level counts are not independent learner observations.

## Execution boundary

The locally installed production Next build (`IcyjNSC9EIpEI8VngSibk`) was started with real HTTP transport, the anonymous-identity proxy, application services/validators/DAOs, and a fresh MongoDB process/database. API owners A/B used separate valid UUID cookies, not trusted client headers. Chrome had a separate browser-minted identity on the dedicated `bb-b01.localhost` hostname; production learner data/cookies were not used. All database records are synthetic and remain in the saved final snapshot.

An **evaluation-only Node preload** intercepts only `https://api.openai.com/v1/responses`. It returns controlled Responses-format fixtures, malformed output, HTTP 503 or an abort-aware pending request. It does not mock route handlers, services, DAOs, database writes, round selection or ownership. No application file was modified. A dummy API key/model override prevented use of real credentials. This is provider-controlled HTTP/browser integration, not an unmodified live-provider deployment or live-model content evaluation.

The real application 20-second timers were exercised for initial/adaptation/follow-up: HTTP failures completed in **20,016 / 20,014 / 20,016 ms**. Each made one provider-seam call and no state mutation. These timings do not establish a real-network latency ceiling; the earlier simulation's 52.825-second abort remains a separate finding. No automatic retry was observed at the seam. Browser recovery used explicit user actions after clearing the injected fault.

Expected public/error contracts were inspected before execution and the specification copied/hash-recorded before the first application test. Actual results came from HTTP responses, public browser state and predefined persistence observations, not source inspection during execution. See [metadata](00_run_metadata.md) for commands, versions, times and reproduction scope.

## Oracle discrepancies and retained failures

### BB22 — Public anonymous identity versus handler-level missing identity

The frozen worksheet expects missing identity to produce HTTP 400 `LEARNER_IDENTITY_UNAVAILABLE`. At the actual public boundary, a cookie-less History request returned **HTTP 200, an empty scoped list, and a new secure/httpOnly/sameSite learner cookie**. The proxy provisions identity before the handler runs. The original expectation failed and remains Fail in the first execution and assessed case register; it is an **oracle/boundary mismatch**, not observed learner-data leakage.

Owner B foreign detail/respond/follow-up/completion operations returned 404 with no foreign writes/provider-seam calls. Forged `x-learner-id` did not override the cookie. The explicit addendum showed that no-cookie/invalid-cookie forged-header operations likewise got newly scoped identities and 404 on owner A's session. Chrome's separate learner could not load the API owner's session. A handler-only missing-identity error test would belong to white-box/unit scope, not this public black-box run. Do not change B01 or silently relabel the original failed assertion as Pass; clarify this oracle in a future dated protocol amendment.

### BB08 — Supplemental assumption about remaining ambiguity

All **planned** explicit route/type/persistence assertions passed. A supplemental runner assertion assumed remaining ambiguity returned no adaptation and stayed at round 0. Actual output retained the active concept, recorded an `ambiguous` trace and a bilingual clarification adaptation, and advanced **0→1**. The clarification is generated support, so this is consistent with B01's bounded generated-adaptation counting; the supplemental zero-round expectation was unsupported. Its first Fail is retained.

The separately labelled post-observation addendum used a fresh cell session: ambiguity stored one clarification at round 1, a subsequent resolved correction stored the new concept at round 2, and follow-up received that corrected active context without changing Stage 7 state. These 11 addendum checks passed. They verify observed bounded behaviour under fixtures, not successful live LLM reinterpretation; simulation SIM-CM-13/16 failures remain Fail.

### Four retained browser-predicate failures

| First observation | Problem in predicate / observed limitation | Retained recheck |
| --- | --- | --- |
| UI03-hint | Predicate required a `Hide Hint` control, although the oracle requires a revealable hint. Actual Hint text was shown. | UI03b-hint-verified: displayed hint text confirmed |
| UI19-language-override-english | Case-sensitive predicate looked for `Language support`; actual route label was `Bilingual language support`. Both fixture languages were present. | UI19b-language-override-english-verified: exact label, both languages and old English snapshot confirmed |
| UI25-concept-corrected | Predicate looked for `Concept correction`; actual trace label was `Concept or context correction` and support title `Concept Correction`. New heading/domain/support were visible. | UI25b-correction-verified: corrected concept/route/support confirmed |
| UI26-correction-resume | Predicate required the original short clarification to be displayed. UI shows previous/current concept trace, not the raw clarification field. Raw clarification persists in the API event. | UI26b-correction-trace-verified: previous/current interpretation and round confirmed after reload |

The last row is also a presentation limitation: do not claim every raw event field is displayed. Initial content remains historical after correction; the current heading/support and previous/current trace distinguish the accepted correction, but original sections should not be represented as newly regenerated corrected explanations. Original screenshots and false predicates remain unchanged.

## Content and method boundaries

- Exact initial Photosynthesis/electric-current text came from retained SIM01-B/SIM05-B and their already endorsed assessments. No additional live output or new human sign-off was invented.
- Adaptation fixtures reuse initial example/technical paragraphs with route/index prefixes to test structure, route, persistence, display and failure handling. A prefix or different string is **not meaningful semantic novelty**. That content-quality requirement is explicitly **Not assessed** in this controlled run; BB07/BB08 are Partial, not complete content passes.
- The cell setup fixture intentionally changes the concept/domain header without regenerating initial Photosynthesis text. It is a schema/state-control fixture, not a scientifically adequate cell explanation. Correction/clarification wording is test-authored. Corrected-context follow-up checks concern transmitted context and invariant state, not the fixture answer's scientific adequacy.
- A controlled correct concept/ambiguous flag is not proof the live model can interpret arbitrary terminology. Earlier endorsed simulation content results remain 18 Pass, 71 Partial and 2 Fail, with three technical failures.
- Chrome checks cover desktop **1654×992**, English UI/Light theme, all three support-language modes, Stage 6B routes/skip/back, History, Review/Resume and errors. They are technical observations, not participant research, comprehensive mobile/keyboard/localised usability inspection or learning evidence.
- No production database/deployment was changed, no code fix was made, and no simulation/raw evidence was rewritten. The sandboxed preflight EPERM attempt is separately retained. Mongoose deprecation warnings occurred but did not invalidate captured writes.

## Evidence and next action

E024 retains main HTTP/per-case capture and links provider fixture output/state. E025 retains browser observations and screenshot references. E026 is this analysis. E027 identifies the SHA-256 manifest of the exact execution scripts/specification/data and analysed records. The frozen pre-run spec and first API summary still show their capture-time status; the combined case register and this analysis provide current assessed status without overwriting those snapshots.

Step 14 completion criteria are satisfied by executing/accounting for all cases, retaining each assertion/limitation, preserving first failures, and updating F1–F13 and the evidence index. Next: **Step 15 — White-Box Testing**. A later source/oracle change requires a dated amendment/new affected evidence; it must not be used to erase this run's discrepancies.
