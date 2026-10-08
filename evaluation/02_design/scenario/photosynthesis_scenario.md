# Photosynthesis design walkthrough

Detailed sections: [Case register](#case-register).

## Run and scope

RUN-B01-20261003-SCENARIO-02 used the root B01 production build, live provider, isolated synthetic MongoDB and Chrome 154.0.8037.97 at 1654 × 992, English/light. Preferences were beginner, guided and bilingual. All five provider responses reported gpt-5.4-mini-2026-03-17. This is separate from the conceptual scenario. Evidence E042–E044; [metadata](raw/RUN-B01-20261003-SCENARIO-02/metadata.json).

## Workflow and results

| Action | Recorded result | Observation boundary |
| --- | --- | --- |
| Inquiry and hint | Photosynthesis/plant biology, five bilingual support fields, hint revealed | Browser and storage |
| Medium, optional choice skipped | Another example stored at round one | Browser; novelty limited |
| Needs Support, concept unclear | Revised core meaning and factory analogy stored at round two | Browser; limit/Finish displayed |
| Further response at cap | Event only, no round three or provider call | Separate API check, not a learner click |
| High at cap | Fade event, no generation; no automatic completion | Separate API check because round-two UI did not offer High |
| Sunlight / gravity follow-up | Related answer stored; unrelated question rejected without state change | Concept-scoped follow-up |
| History, Resume, Finish, Review | Stored interaction restored and explicitly completed | Browser plus separate post-completion API rejection |

Fifteen technical checks passed in one session. Two adaptations, four response events, one stored follow-up and completion were recorded. These are not fifteen independent scenarios. Before/after production identities were unchanged.

## Content assessment

The author confirmed checking the scientific and English–Burmese observations against saved outputs and relevant sources. Content remains Partial, not an independent expert or learner-comprehension result.

| Observation | Qualification |
| --- | --- |
| Light energy, water/carbon dioxide and food production distinguished | Chloroplast wording may wrongly include photosynthetic bacteria |
| Factory analogy distinguishes making food from taking food from soil | First additional example largely repeats the earlier explanation |
| Useful STEM terms retained | Root, leaf and raw materials also remain English; chemical energy needs explicit Burmese explanation |
| Sunlight follow-up addresses energy for sugar production | One answer does not establish general scope-classification accuracy |

## Reference basis

Frozen R01 was OpenStax Biology 2e §8.1. Supplemental SCN-R02 was §4.2 on prokaryotic cells, recorded after generation rather than silently added to the frozen oracle. Exact locators and original analysis remain archived. Later review does not repair stored text or change the 91-output simulation scores.

## Evidence

[HTTP/provider/browser/state records](raw/RUN-B01-20261003-SCENARIO-02) preserve the executed flow, separately labelled API-only actions, snapshots, screenshots and first verification failures/rechecks. Aborted starts and run 01 remain separate. Timing is observation, not a performance target, and this walkthrough does not establish mobile usability, calibrated support or improved learning.

## Detailed execution, stage trace and content findings

## 2. Evidence guide

All formal run files are under
[raw/RUN-B01-20261003-SCENARIO-02](raw/RUN-B01-20261003-SCENARIO-02).

- [metadata.json](raw/RUN-B01-20261003-SCENARIO-02/metadata.json): environment, full production identities, protocol/reference hashes, worktree and times.
- [http.jsonl](raw/RUN-B01-20261003-SCENARIO-02/http.jsonl): 18 numbered public HTTP records with exact submitted bodies, responses, elapsed time and provider counts. No authentication/cookie headers exported.
- [provider.jsonl](raw/RUN-B01-20261003-SCENARIO-02/provider.jsonl): five exact non-secret generation contracts and provider responses, including returned text, model version and usage. Authorization is never logged.
- [state.jsonl](raw/RUN-B01-20261003-SCENARIO-02/state.jsonl): post-request storage snapshots keyed by HTTP request ID.
- [database_snapshot.json](raw/RUN-B01-20261003-SCENARIO-02/database_snapshot.json): final stored state.
- [browser_observations.jsonl](raw/RUN-B01-20261003-SCENARIO-02/browser_observations.jsonl): 24 timestamped observations with accessibility content and URLs, plus matching `SCN-*-accessibility.txt` files.
- [screenshots](raw/RUN-B01-20261003-SCENARIO-02/screenshots): 24 viewport JPEGs and three supplementary full-page JPEGs. They are views of the same scenario, not 27 independent evaluations.
- [verification.json](raw/RUN-B01-20261003-SCENARIO-02/verification.json): 15 recorded-evidence checks, 15 Pass / 0 Fail. This is reanalysis of the captured run, not a fresh Vitest/application execution.
- [manifest.sha256](raw/RUN-B01-20261003-SCENARIO-02/manifest.sha256): report, raw records, scripts, preserved preflights, selected reference inputs and actual root production identities.

### Preflights and recorder corrections

The sandbox-only [startup attempt](photosynthesis_scenario.md) failed to
allocate a local port (`EPERM`) before any server or provider execution.
The separately retained [preflight run 01](photosynthesis_scenario.md)
revealed that a recorder `data` listener consumed the Preferences request
before Next could read it. That evaluation defect was fixed in the recorder;
preflight had zero model calls and no session. It is excluded from application
pass/fail conclusions. The formal run began with an empty isolated database.

Early formal screenshots were initially saved to the preflight folder by a
helper's retained directory binding. They were moved by their observed formal
URL without changing their bytes. [capture_relocation.json](raw/RUN-B01-20261003-SCENARIO-02/capture_relocation.json)
records that repair and an incorrect action-label correction. The initial
preflight preference screenshot was overwritten, so only its original textual
observation survives; it is not claimed as complete screenshot evidence.

The [first verifier result](raw/RUN-B01-20261003-SCENARIO-02/verification_attempt_01.json)
had one incorrect expectation for a nonexistent `limitReached` API field.
The [correction](photosynthesis_scenario.md)
checks B01's actual cap contract. The original result is retained. No
application input, output, storage or production source was changed to pass.

## Case register

Each row contains the case contract and its recorded result. Shared run conditions above apply unless a row states otherwise. Outcomes and qualifications are retained from the evidence; this layout change is not a new test run.

| Case | Case details / action | Conditions / inputs | Expected result | Actual result | Outcome | Qualification | Observation notes / evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A / SCN-A | Save content-support preferences. | Fresh synthetic learner; configure Burmese with useful English term retention, beginner explanation and guided learning. | Save Burmese support with useful English retention, beginner explanation and full preferences | `Burmese + English Terms`, Beginner, Guided inspected in SCN-A01; HTTP 2 PATCH 200. Session snapshot and final profile match exactly | Technical Pass | Single live scenario, not every route/domain or participant effectiveness. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| B / SCN-B | Submit the fixed photosynthesis inquiry. | Preferences saved in SCN-A; no learning session yet. Exact input: `What is photosynthesis, and how do plants make food?`. | Submit unchanged inquiry; identify concept/context with one generation | Exact input: `What is photosynthesis, and how do plants make food?`; HTTP 3 POST 201; `photosynthesis` / `plant biology`; one live call; fresh round 0<br>State/call trace: 3 initial: round 0; events 0; adaptations 0; stored follow-ups 0; status in_progress; action provider calls 1. | Technical Pass; SCN-B01/B02/C01 | Single live scenario, not every route/domain or participant effectiveness. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| C / SCN-C | Inspect initial support and reveal Hint. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Four initial sections plus revealable Hint, bilingual content | Simple, real-world, technical and reflection sections present; Show Hint revealed bilingual text in SCN-C02. All five fields retained in HTTP 3 and storage | Structure Pass; content Partial (§5) | Single live scenario, not every route/domain or participant effectiveness.<br>SCN-CQ01: Introductory glucose shorthand is acceptable only at this stated scope; the biochemical pathway is more complex (R01)<br>SCN-CQ02: This wording can imply that photosynthetic bacteria also have chloroplasts. Bacteria are prokaryotes without membrane-bound organelles (SCN-R02). This is a **scope-clarity concern**, not an assertion that the text explicitly states bacteria have chloroplasts. Content receives no unconditional Pass<br>SCN-CQ04: Nontechnical English also remains: root, leaf, air, water, input, raw materials and power source. Chemical energy is central but not explicitly paired with a Burmese definition. Selectivity and beginner readability remain partially supported after author verification; no independent second assessor | E042–E044; source screenshot/HTTP locators retained in Actual result.<br>SCN-CQ01 initial meaning: Both languages describe plants making food and converting light to stored chemical energy; oxygen appears in the technical section. Root water uptake is separate from taking food from soil<br>SCN-CQ02 technical scope: Initial English and Burmese technical paragraphs mention plants, algae and bacteria immediately before chloroplast-based reactions without restricting the latter to plants/algae<br>SCN-CQ04 Burmese/English balance: Burmese sentence structure carries the main explanation; useful technical terms include photosynthesis, carbon dioxide, glucose and chloroplast(s). Visible Unicode rendering is readable at this desktop size |
| D / SCN-D | Select Medium and skip the optional help choice. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Medium → optional Stage 6B skip → default another example; persist 0 → 1 | SCN-D01 shows five choices and skip; HTTP 5 body has `overallSupportNeed=medium`, no difficulty; route `stage_5_scaffold`, support `another_example`, one call/event/adaptation, `in_progress`; SCN-D03<br>State/call trace: 5 Medium / skip: round 1; events 1; adaptations 1; stored follow-ups 0; status in_progress; action provider calls 1. | Technical Pass; example novelty limited | Single live scenario, not every route/domain or participant effectiveness.<br>SCN-CQ03: First-example novelty is limited despite different strings. The analogy distinguishes power source and raw materials, but is not a detailed explanation of biological mechanisms or proof of improved comprehension | E042–E044; source screenshot/HTTP locators retained in Actual result.<br>SCN-CQ03 adaptation difference: Round 1 changes a green-leaf example to a houseplant at a sunny window, but largely repeats the same inputs/glucose/energy account. Round 2 adds the making-versus-taking-food contrast and a solar-powered-factory analogy |
| E / SCN-E | Select Needs Support with concept_unclear. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Needs Support + concept_unclear → revised core meaning and scaffold, 1 → 2 | HTTP 6; `concept_clarification`; one call, second event/adaptation, `review_recommended`. Solar-powered-factory analogy and explicit making-versus-taking-food contrast; SCN-E01–E04<br>State/call trace: 6 Needs Support / concept_unclear: round 2; events 2; adaptations 2; stored follow-ups 0; status review_recommended; action provider calls 1. | Technical Pass; author-verified content qualifications retained | Single live scenario, not every route/domain or participant effectiveness.<br>SCN-CQ03: First-example novelty is limited despite different strings. The analogy distinguishes power source and raw materials, but is not a detailed explanation of biological mechanisms or proof of improved comprehension<br>SCN-CQ04: Nontechnical English also remains: root, leaf, air, water, input, raw materials and power source. Chemical energy is central but not explicitly paired with a Burmese definition. Selectivity and beginner readability remain partially supported after author verification; no independent second assessor | E042–E044; source screenshot/HTTP locators retained in Actual result.<br>SCN-CQ03 adaptation difference: Round 1 changes a green-leaf example to a houseplant at a sunny window, but largely repeats the same inputs/glucose/energy account. Round 2 adds the making-versus-taking-food contrast and a solar-powered-factory analogy<br>SCN-CQ04 Burmese/English balance: Burmese sentence structure carries the main explanation; useful technical terms include photosynthesis, carbon dioxide, glucose and chloroplast(s). Visible Unicode rendering is readable at this desktop size |
| Cap UI observation | Inspect the round-2 limit controls. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Show limit feedback and prevent another generated round | SCN-E04 shows `Maximum support provided` and `Finish for Now`; no Stage 6A response choices at round 2 | Pass for bounded UI; extra response unavailable in UI | Single live scenario, not every route/domain or participant effectiveness. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| SCN-CAP-API-01 | Send a support-needed response at round 2 through the API. | Owned round-2 session with two stored adaptations. | Separately test further support request at cap: event only, no round 3 | HTTP 7 / separate API file: Needs Support, `stage_5_scaffold`, null adaptation, 2 → 2, third event, `review_recommended`, zero provider calls; original two adaptations unchanged<br>State/call trace: 7 capped support, API only: round 2; events 3; adaptations 2; stored follow-ups 0; status review_recommended; action provider calls 0. | API-only Pass; not a UI action | API-only branch; not evidence of a learner browser click. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| F / SCN-F | Inspect whether High is offered at the cap; record it as unavailable. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Choose High at cap only if offered; otherwise record limitation | High **not offered** by round-2 UI. No High learner click invented. API-only branch below was then performed; reload SCN-F01 reconstructs it | UI action Not applicable / unavailable | High is unavailable in the round-2 UI; no learner click was invented. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| SCN-FADE-API-01 | Send High at round 2 through the API. | Owned round-2 session with two stored adaptations. | High fades with no generation/increment; explicit Finish still necessary | HTTP 8 / separate API file: `fade`, fourth event 2 → 2, null adaptation, `understanding=high`, `status=in_progress`, zero calls. SCN-F01 displays `Finish Learning`<br>State/call trace: 8 High / fade, API only: round 2; events 4; adaptations 2; stored follow-ups 0; status in_progress; action provider calls 0. | API-only Pass; not completion or objective mastery | API-only branch; not evidence of a learner browser click. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| G / SCN-G | Submit the fixed relevant follow-up. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Ask fixed relevant follow-up; use current concept/latest support | Exact question: `Why do plants need sunlight for photosynthesis?`; HTTP 10 / provider call 4; answer returned 200 in both languages, one stored follow-up. Input contains active concept, round-2 scaffold, latest route `fade`, original snapshot; SCN-G01/G02<br>State/call trace: 10 relevant follow-up: round 2; events 4; adaptations 2; stored follow-ups 1; status in_progress; action provider calls 1. | Technical Pass; single-question content observation only | Single live scenario, not every route/domain or participant effectiveness.<br>SCN-CQ05: Natural sunlight is used in this scenario, not a claim that artificial light can never support photosynthesis. One answer cannot establish general scope-classification accuracy | E042–E044; source screenshot/HTTP locators retained in Actual result.<br>SCN-CQ05 relevant follow-up: Both languages answer sunlight's role as an energy source and connect it to sugar production; saved answer remains concept-scoped |
| H / SCN-H | Submit the fixed unrelated gravity follow-up. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Unrelated gravity question must not replace topic or become general chat | Exact question: `How does gravity work?`; HTTP 11 returns 422 `FOLLOW_UP_OUT_OF_SCOPE`, `newSessionRecommended=true`, one scope-classification call. Entire stored session unchanged; follow-up count stays 1, not 2; SCN-H01/H02<br>State/call trace: 11 unrelated follow-up rejected: round 2; events 4; adaptations 2; stored follow-ups 1; status in_progress; action provider calls 1. | Controlled outcome Pass | Single live scenario, not every route/domain or participant effectiveness. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| I / SCN-I | Inspect owned History before and after Finish. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | History exposes concept/domain, self-reported support and status | HTTP 12 has one owned session; SCN-I01 shows photosynthesis / plant biology / No support needed / In Progress / Resume. After Finish, HTTP 15 and SCN-I02 show Completed / Review | Technical Pass; one-session ordering/scoping observation only | Single live scenario, not every route/domain or participant effectiveness. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| J / SCN-J | Reload and Resume, explicitly Finish, then reopen Review. | Same synthetic learner and photosynthesis session; previous action establishes the current state. Bilingual/beginner/guided snapshot. | Resume unchanged session, Finish explicitly, reopen completed Review | HTTP 13 retrieves exact persisted fields before Finish. HTTP 14 PATCH `status=completed` has zero calls. HTTP 16/18 and SCN-J01/J03/J04/J05 retain both adaptations, four events and relevant follow-up<br>State/call trace: 13 Resume: round 2; events 4; adaptations 2; stored follow-ups 1; status in_progress; action provider calls 0.<br>14 explicit Finish: round 2; events 4; adaptations 2; stored follow-ups 1; status completed; action provider calls 0.<br>16 Review: round 2; events 4; adaptations 2; stored follow-ups 1; status completed; action provider calls 0. | Technical Pass | Single live scenario, not every route/domain or participant effectiveness. | E042–E044; source screenshot/HTTP locators retained in Actual result. |
| SCN-COMPLETED-API-01 | Attempt a learner response after completion through the API. | The same owned session after explicit Finish. | Reject a post-completion response without mutation/generation | HTTP 17 returns 409 `SESSION_RESPONSE_CONFLICT`; full document unchanged and zero provider calls. UI has no response choices, so this is separately labelled API evidence<br>State/call trace: 17 completed response rejected: round 2; events 4; adaptations 2; stored follow-ups 1; status completed; action provider calls 0. | API-only Pass | API-only branch; not evidence of a learner browser click. | E042–E044; source screenshot/HTTP locators retained in Actual result. |


## 4. Seven-stage trace and conceptual comparison

| Framework stage | Observed implementation | Boundary |
| --- | --- | --- |
| 1 terminology | Initial output identifies photosynthesis | Not a deterministic ATE algorithm or an extraction-accuracy benchmark |
| 2 context | `plant biology`; inquiry and follow-ups retain plant-food context | One unambiguous inquiry; ambiguity/correction routes not exercised here |
| 3 language strategy | Both `en`/`my` generated and rendered, English STEM terms retained | Exact selection rationale not externally observable; over-retention remains possible |
| 4 concept meaning | Initial simple/technical meaning; concept clarification revises meaning | Structured acceptance is not scientific certification |
| 5 scaffolding | Real-world example, reflection and hint; another example; analogy | First adaptation changes setting but repeats much of the original mechanism |
| 6A / 6B learner response | Medium/Needs Support buttons followed by optional bounded help choices or skip | Scripted self-reports; no real learner understanding measured |
| 7 adaptation | Application-selected routes, persisted round/event transitions, capped/fade branches | High at round 2 unavailable in UI; server behaviour tested separately |

The [conceptual walkthrough](../../01_conceptual/scenario/photosynthesis_scenario.md)
remains a distinct historical CA-SCN artefact. It used supplied session
content and did not establish the exact feedback trigger. This fresh DA-SCN
run records the Medium/skip and Needs Support/concept_unclear requests and
provider counts directly. Its exact generated outputs are different evidence;
they do not replace the original walkthrough or retroactively resolve its
unobserved learner actions. Same topic/framework does not make these sources
statistically independent datasets.

The bounded follow-up, History and lifecycle screens support the seven-stage
interaction. They do not constitute an eighth stage or unrestricted chat.
The stage-responsibility and theory rationale remains in
[Step 16's literature-grounded argument](../informed_argument/traceability.md).

## 5. Content observations and human verification

Codex prepared the preliminary content analysis. The author has since confirmed
personally checking every scientific and English–Burmese assessment against
the original outputs and relevant references, including these observations.
See the [verification confirmation](../../00_protocol/evaluation_protocol.md).
The scope, English-retention and novelty concerns remain after that verification.
This is not an independent expert judgement, terminology certification or new
signature. The separate 91-output simulation scores are unchanged.

The [frozen content reference notes](../simulation/simulation_analysis.md),
SIM-REFERENCES-01 / SIM01 / R01, were hashed before generation. Their expected
plant-level inputs, carbohydrate production, energy conversion and oxygen
release remain unchanged. R01 was reopened on 3 October to check the saved
text. One **post-generation supplemental source**, SCN-R02, is explicitly
recorded below; it is not silently added to the frozen reference set.

The SCN-CQ01–05 content observations and qualifications are included in the corresponding case-register rows. Source locators and review scope are retained below.

Examples were inspected in the saved bilingual payloads and screenshots.
No translation, prompt or output was edited. No claim is made about learner
gain, optimality of two rounds, mastery after High, all STEM domains, mobile
behaviour, or participant usability.

### Source locators and additions

- **R01, frozen benchmark rechecked**: Clark, M. A., Douglas, M., & Choi, J. (2018). *Biology 2e*, §8.1, Main Structures and Summary of Photosynthesis / Basic Photosynthetic Structures / The Two Parts of Photosynthesis. [OpenStax original section](https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis). Reaccessed 3 October 2026. Supports plant inputs/products, energy conversion and the qualified introductory summary.
- **SCN-R02, supplemental after-generation check**: Clark, M. A., Douglas, M., & Choi, J. (2018). *Biology 2e*, §4.2, Components of Prokaryotic Cells. [OpenStax original section](https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells). Accessed 3 October 2026. Supports the bacteria/organelles distinction used to flag SCN-CQ02; not a new frozen marking rule or Burmese glossary.

The separate dated record `HUM-VERIFY-20261008-01` confirms the author's
scientific and bilingual checking. The rationale remains SCN-CQ01–05 above
and the preserved source locators. No new numerical score, source consultation
date or review clock time is supplied. The original captured report remains
identifiable through E042–E044 and its historical manifest.

## 6. U1–U9 and deviations

These are scenario-specific observations, not a replacement U1–U9 study.
The earlier [structured usability inspection](../usability/usability_inspection.md)
and its six Pass / three Partial outcomes remain unchanged.

| Criterion | This scenario observation / evidence | Limit |
| --- | --- | --- |
| U1 task clarity | Labelled STEM inquiry and fixed question visible on Home, SCN-B01 | One concept/identity, desktop only |
| U2 information structure | Simple/example/technical/reflection sections, revealed Hint and separately labelled adaptations, SCN-C01/C02/J05 | Structure is not content-quality certification |
| U3 response workflow | Medium → optional choices → skip; Needs Support → selected concept difficulty, SCN-D01/E02 | Not every Stage 6B route; High at cap unavailable |
| U4 feedback visibility | Preparing explanation/support/answer, returned adaptations, cap feedback and completion captured, SCN-B02/D02/E03/E04/G01/J03 | No provider-failure Retry path exercised |
| U5 navigation consistency | Preferences modal save, History, Resume and Review reached without a dead end, SCN-A01/I01/I02/J01/J04 | Modal focus, cross-device and full keyboard navigation not re-tested |
| U6 bilingual readability | Both language payloads visibly rendered with mixed English terms, SCN-C01/C02/J05 | Desktop glyph observation only; content judgement separate in SCN-CQ04; no mobile inspection |
| U7 state visibility | Both stored adaptations and four self-reported route/round events visible in Resume/Review, SCN-E04/F01/J01/J05 | Hint disclosure resets to Show Hint after reload; stored content intact. API-only capped event labels the selected route Additional scaffold despite no new adaptation; 2 → 2 records the bound |
| U8 error clarity | Safe out-of-scope message recommends a new session without mutation, SCN-H02 | Provider/DB failure recovery, Burmese UI errors and Retry not re-exercised. Rejected question remains in input until navigation, not stored as another follow-up |
| U9 consistency | Shared navigation, self-report labels and Resume-versus-Review lifecycle pattern observed in English/light UI, SCN-I01/I02/J04 | Other locales/themes, mobile, screen-reader and full keyboard matrix not re-tested; existing §18.1 qualifications retained |

The known preferences focus and Burmese-locale error issues were not fixed or
claimed retested here. Instrumentation/verification errors in §2 are retained
separately from application outcomes.

## 7. Answers to the nine scenario evaluation questions

1. **Important stages implemented?** All seven responsibilities can be traced in this executed example; language selection logic is partly unobservable and High-at-cap is not a browser action.
2. **Language strategy matched?** Bilingual presentation and retained technical terms are demonstrated; beginner-friendly selectivity remains Partial.
3. **Structured explanation?** Yes technically: four initial sections and a revealed Hint, plus two stored adaptations.
4. **Response changes support?** Yes: default example then concept clarification. This demonstrates routing/content change, not learner improvement; first adaptation novelty is limited.
5. **Bounded?** Yes in this run: 0 → 1 → 2, then two 2 → 2 events and no third generation. Cap/fade are separate API checks.
6. **Follow-up scoped?** Yes for these fixed two questions: one answer saved, unrelated gravity rejected without session mutation.
7. **State preserved?** Yes for persisted content/preferences/concept/routes/round/follow-up across reload, Resume, Finish and Review; transient hint disclosure/draft/error state is not asserted to persist.
8. **Framework elements missing?** No missing numbered stage identified in this case. UI High at cap is unavailable; qualified content adequacy and learner benefit are not established.
9. **Untraceable implemented features?** No new stage was needed. Preferences, History and bounded follow-up are supporting implementation features already justified in Step 16, not separate learning-efficacy evidence.

![Completed Review with both persisted adaptations](raw/RUN-B01-20261003-SCENARIO-02/screenshots/SCN-J05.jpg)

## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../archive/pre_consolidation_markdown_20261008.zip).
