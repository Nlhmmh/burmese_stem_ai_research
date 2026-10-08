# Black-box testing

## Run and scope

RUN-B01-20261002-BLACKBOX-01 tested the root B01 production build through public HTTP, anonymous-identity proxy, browser, real services/DAOs and isolated MongoDB. Controlled provider fixtures intercepted only the external provider boundary. There were zero external model calls. Evidence E024–E027; [metadata](raw/RUN-B01-20261002-BLACKBOX-01/metadata.json).

## Cases and results

The assessed register is **21 Pass, two Partial and one Fail** across BB01–BB24. The first API execution was 22 Pass/two Fail across 370 assertions; assessed qualifications and the later addendum are not silently substituted for that first run.

| Case | Execution status | Outcome | Evidence IDs | Actual/deviation |
| --- | --- | --- | --- | --- |
| BB01 | Executed | Pass | E024–E027 | 201 creation, structured bilingual content, round-zero state and retrieval passed with controlled ready output. |
| BB02 | Executed | Pass | E024–E027 | All five invalid/malformed inquiry variants returned safe 400 without writes/provider-seam calls. |
| BB03 | Executed | Pass | E024–E027 | Contextualised fixture accepted and ambiguous fixture returned controlled 422; browser clarified without a session. This does not test live LLM interpretation. |
| BB04 | Executed | Pass | E024–E027 | All three preferences persist; browser presentation and both single-language bilingual overrides observed. Exact initial SIM01-B fixture has existing endorsed assessment; no new general language-quality claim. |
| BB05 | Executed | Pass | E024–E027 | All five stored support areas and hint reveal verified; exact initial fixture previously endorsed. First browser predicate wrongly required Hide Hint; retained UI03b recheck corrects this non-oracle assumption. |
| BB06 | Executed | Pass | E024–E027 | High recorded fade 0→0 with no provider-seam call/adaptation; Finish remained available and worked. |
| BB07 | Executed | Partial | E024–E027 | Both default route/type/round/persistence transitions passed. Meaningful novelty of fixture adaptations is Not assessed; prefixes on reused paragraphs are not semantic novelty. |
| BB08 | Executed | Partial | E024–E027 | All five explicit routes, skip, clarification requirement, bilingual overrides, corrected concept/trace and UI choices executed. First extra ambiguity assertion wrongly expected no round: generated clarification actually uses one round. Retained addendum confirms this. Fixture semantic appropriateness/non-repetition Not assessed. |
| BB09 | Executed | Pass | E024–E027 | Round-one adaptation/event persisted exactly once and survived API/browser retrieval. |
| BB10 | Executed | Pass | E024–E027 | Second adaptation persisted with round 2 and review_recommended; browser limit feedback matched. |
| BB11 | Executed | Pass | E024–E027 | At cap, extra response persisted 2→2 with no new adaptation/provider-seam call; browser prevented a further adaptation and retained limit feedback after reload. |
| BB12 | Executed | Pass | E024–E027 | Relevant fixture answer persisted once without changing Stage7. Addendum provider-input capture used corrected active concept/latest scaffold/route; answer quality there is not assessed. |
| BB13 | Executed | Pass | E024–E027 | Unrelated fixture answer rejected with safe 422 and newSessionRecommended; no write; browser preserved follow-up allowance. |
| BB14 | Executed | Pass | E024–E027 | API owner scoping/order/labels passed; final browser History contained exactly its own ten sessions newest-first, independently checked against snapshot. |
| BB15 | Executed | Pass | E024–E027 | API projections matched stored fields; browser Review restored exact initial/adapted/follow-up text and all event entries after completion. Raw clarification and preference values are not separately displayed as history fields. |
| BB16 | Executed | Pass | E024–E027 | Rounds 0/1/2 survived API/browser reload, retaining next actions and bound; corrected concept/previous-current trace also survived reload. |
| BB17 | Executed | Pass | E024–E027 | Valid preference PATCH/GET and reload passed; old/new snapshots remained independent; invalid/unknown/type/empty updates were 400 with no write. |
| BB18 | Executed | Pass | E024–E027 | Six controlled non-2xx/real-20s-timeout variants across three paths returned safe 502 and unchanged state; exactly one seam call each. Browser initial/follow-up recovery demonstrated. No external provider latency claim. |
| BB19 | Executed | Pass | E024–E027 | 24 malformed-output injections across initial/adaptation/follow-up/correction returned controlled 502 without writes. Browser malformed adaptation/follow-up errors and explicit recovery verified. |
| BB20 | Executed | Pass | E024–E027 | 1000 accepted and 1001 rejected at the real HTTP boundary; rejection made no provider-seam call/write. |
| BB21 | Executed | Pass | E024–E027 | 500 accepted, 501 rejected, third question 409; exactly two stored answers and browser limit feedback. |
| BB22 | Executed | Fail | E024–E027 | Foreign detail/respond/follow-up/completion and forged-header attempts were 404 with no foreign mutation; browser ownership rejection passed. Frozen absent-identity 400 expectation failed: public proxy issued anonymous cookie and 200 empty History. No-cookie/invalid-cookie addendum confirmed isolation. This is an oracle/boundary mismatch, not observed leakage. |
| BB23 | Executed | Pass | E024–E027 | Invalid/conflicting responses, malformed bodies, invalid/missing UUIDs and invalid completion payloads returned the expected safe codes without provider-seam calls/writes. |
| BB24 | Executed | Pass | E024–E027 | Completion/repeat were idempotent; post-completion response rejected 409 without event/adaptation/provider-seam call; browser completion/Review matched. |

## Retained qualifications and failures

BB07/08 remain Partial because fixture adaptations reused earlier paragraphs with prefixes. Semantic novelty was not assessed. This is not fixed by author verification of actual simulation text.

BB22 expected HTTP 400 for missing identity. Public middleware instead created an anonymous cookie and returned HTTP 200 with an empty scoped history. The original oracle mismatch remains Fail. Foreign-session operations returned 404 without foreign writes or provider-seam calls; no data leakage was observed.

A supplemental BB08 assertion expected remaining ambiguity to use no round. A generated bilingual clarification actually consumed round one. The first failure remains recorded. A separately labelled nine-request addendum passed eleven checks for bounded clarification/correction and active-context follow-up; it does not overwrite the original expectation or establish live-model interpretation accuracy.

Four first browser predicates were false because of assumed hint controls, exact label casing/wording or expected raw-clarification display. Re-scoped rechecks confirmed actual support/trace display. Raw clarification was stored but not separately shown as a history field.

## Evidence and limits

[Case CSV](black_box_results.csv), [assertion CSV](black_box_assertions.csv), [HTTP/provider/state/browser captures](raw/RUN-B01-20261002-BLACKBOX-01/) and 45 screenshots are retained. Forty-four browser observations yielded 42 true/four false predicates before the rechecks. Controlled timeouts were about 20 seconds; they do not erase the live simulation's delayed cancellation. Desktop English/light fixture testing is not live-content validation or the wider usability matrix. Full frozen criteria and metadata remain archived.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
