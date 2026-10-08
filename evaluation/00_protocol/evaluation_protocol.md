# Evaluation protocol and baseline

Protocol A5-PROTOCOL-01, acceptance-oracle version 2.1. This consolidated reading version does not change the original criteria or recorded outcomes. Full pre-execution versions, environment records and amendments are in the [original-document archive](../archive/pre_consolidation_markdown_20261008.zip).

## Purpose and requirements

The original Context-Aware Adaptive STEM Scaffolding Framework and the Burmese STEM AI application were evaluated. REQ-01/RQ1 concerns contextual terminology and Burmese/English support. REQ-02/RQ2 concerns conceptual explanation beyond translation. REQ-03/RQ3 concerns structured, learner-responsive assistance.

Conceptual evaluation comprises GenAI critique, existing literature, informed argument and a conceptual photosynthesis scenario. Design evaluation comprises FURPS Functionality/Usability, static and dynamic analysis, bounds analysis, simulation, black-box and white-box testing, informed argument, literature comparison and a separate executable scenario. Methods follow Hevner et al. (2004, p. 86, Table 2). Controlled evaluation is distinguished from real learner use following Venable et al. (2016). Participant studies and independent expert interviews were not conducted.

## Baseline

| Item | Recorded identity |
| --- | --- |
| Application baseline | B01-A5-EVALUATION, executable commit 37faefa236829aa3d79e023faa1fb72a086b5c2a |
| Source tree | cfe77d820bebc93f743e80c82c8b61809c7e08bd |
| Tag | a5-evaluation-b01; its documentation commit is distinct from the executable source commit |
| Dependency lock SHA-256 | d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702 |
| Local tools | macOS 26.6.2, Node 26.4.0, npm 11.17.0, Next.js 16.3.4, MongoDB 8.2.6, Vitest/V8 4.1.11 |
| Provider | OpenAI Responses API; configured gpt-5.4-mini, observed gpt-5.4-mini-2026-03-17 in live runs |
| Generation constraints | Strict JSON Schema and domain validation, store=false, configured 20-second timeout, no automatic retry |
| Browser | Chrome; exact version, viewport, language and theme are run-specific |
| Deployment | Local evidence only; deployed commit was not verified |
| Schema/prompt version | No separate version number. Service and schema file hashes identify the contracts |

Full schema, prompt, dependency, environment and pre-refinement B00 identities remain in archived baseline records. B00 is not the final evaluation baseline. Freeze checks are prerequisites, not formal static-analysis results. The formal static run was separately executed. White-box tests execute against the root application, not a copied source tree.

### Frozen prompt and schema identities

| Artefact | SHA-256 | Identity covered |
| --- | --- | --- |
| `lib/constants.ts` | `9e7c786d5b1744002173d945eda3e4501a722586b3659a946270e2ea703c686d` | Limits, statuses and compatibility constants |
| `lib/session-domain.ts` | `157508e1aa246c70d48d387a69f08ac65fc2557b4e40f0d234efb4cc49f51dcc` | Stage 6A/6B and Stage 7 domain vocabulary |
| `data/schemas/session.schema.ts` | `37d21a4dfff547810a1e2b4fb2ac93589ecec39dc8634b8f4effadd448946b7e` | Session/document schema |
| `data/schemas/profile.schema.ts` | `e1795e50178cf56e1c38b7b449f5ec36bf25d63f52f2bb4e3f95982b22d336c7` | Profile/preferences schema |
| `services/llm-provider.ts` | `0b4f33774d69cddb8556e8af2cf3122c113105b7f38f5ab7fab8f1b38c06fb07` | Provider URL/model fallback/timeout/extraction boundary |
| `services/session.service.ts` | `0ae2da0676278075b268a6a9d4b215c6837c18ecc9985f2f48b30222668de472` | Initial Stages 1–5 prompt, schema and validation |
| `services/adaptation-routing.service.ts` | `e3af3e2bfa9a49cc65b3179483c136755230d562de00ddc8312554ea5bd29f1e` | Deterministic Stage 7 route table |
| `services/adaptation.service.ts` | `1d76b4edabf1c72d6a73306be9ff42ea9732c465d2d865e0dca8f2c8b134def7` | Route-specific prompts, schemas, validation and state workflow |
| `services/followup.service.ts` | `9827a0cbfae33b12bfd925e390dae9baef38fe9ae795214102d99eb82132e0cc` | Follow-up prompt, schema and scope contract |
| `vitest.config.mts` | `f37dd90ad06fc840c3eb0d968021162ff8dcd768b398070401660483e92e258f` | Deterministic suite and V8 scope |
| `vitest.integration.config.mts` | `43f36bd06bf6aec4aaa3832badd9f4c473b35440fe99ba110ef0c4f635bdbaad` | Isolated MongoDB suite configuration |

## Human verification and AI assistance

Codex assisted with preparation, automated execution, preliminary analysis, source checks and drafting. The author confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references, including all 91 delivered simulation outputs, supplementary bilingual findings and the separate design-scenario observations. Final acceptance and decisions rest with the author.

HUM-VERIFY-20261008-01 records confirmation on 8 October 2026, not invented review start/end times or a claim that every check occurred during execution. Reported competence is postgraduate STEM knowledge, native Burmese fluency and advanced English proficiency. This is author verification, not an independent second assessor, professional MQM evaluation, certified glossary or participant study. Original sign-offs, scores and provenance are retained in the archive. The GenAI interview remains identified as a GenAI method.

## Refined workflow

Stages 1–5 identify terminology, interpret context, select language support, explain core meaning and provide scaffolding. Stage 6 collects self-reported support need. Stage 7 selects a bounded response. These are responsibilities, not seven separate provider calls.

Stage 6A offers High, Medium and Needs Support. Optional Stage 6B offers simpler explanation, another example, language help, conceptual clarification or intended-meaning correction, with skip/back. Correction requires a short clarification. The legacy property understanding stores self-report, not measured competence.

| Input | Application-selected route | Expected effect below the cap |
| --- | --- | --- |
| High | fade | Record event, no generation or round increment. Finish remains explicit |
| Medium, Stage 6B skipped | stage_5_scaffold | Another example |
| Needs Support, Stage 6B skipped | stage_5_scaffold | Simpler explanation |
| Simpler explanation / another example | stage_5_scaffold | Selected scaffold |
| Language terms | language_support | Reconsider Stages 3–5, bilingual override without changing saved preferences |
| Concept unclear | concept_clarification | Revise Stage 4 core meaning and Stage 5 support |
| Concept mismatch plus clarification | context_reinterpretation | Reconsider intended concept/domain and retain previous/current interpretation or remaining ambiguity |

The maximum is two generated, persisted adaptations. At round two, responses still record events without generation or a third adaptation. A generated remaining-ambiguity clarification consumed a round in the recorded black-box run. This observed outcome does not erase its failed supplemental zero-round expectation. Follow-up is concept-scoped, limited to two questions and 500 characters, and does not consume adaptation rounds. Initial inquiries are limited to 1,000 characters. Learner-scoped persistence and explicit completion remain separate from content generation.

## Criteria

### Conceptual criteria

| Criterion | Evaluation question | Methods |
| --- | --- | --- |
| C1 — Requirement coverage | Does the framework assign responsibilities for terminology, explanation and adaptive assistance? | GenAI critique, literature analysis, informed argument, conceptual scenario |
| C2 — Logical coherence | Are stage relationships, feedback decisions and limited revisiting of earlier stages reasonable? | GenAI critique, informed argument, conceptual scenario |
| C3 — Theoretical consistency | Are task needs, responsive support, gradual withdrawal and self-report limits recognized? | Literature analysis, informed argument, GenAI critique |
| C4 — Literature consistency | Are relevant studies, limits of applying their findings here and unsupported assumptions identified? | Literature analysis, informed argument, GenAI critique as supplementary challenge |
| C5 — Scenario applicability | Can the seven stages be applied meaningfully to a learning situation? | Conceptual scenario, informed argument |

The original interview's fourth criterion concerned completeness and boundaries rather than literature consistency. Its native rating is retained separately, not substituted for protocol C4.

### Functionality and usability

| Criterion | Evaluation focus | Checks | Outcome / RQ |
| --- | --- | --- | --- |
| F1 — Inquiry handling | Session creation and safe rejection of invalid input | HTTP requests, output validation, stored-session retrieval | partial, RQ1–RQ3, enabling |
| F2 — Terminology/context | Intended STEM meaning and correction of misunderstanding | Interpretation/correction routes, simulation, content review | partial, RQ1 |
| F3 — Bilingual support | Preferences, language-help display and useful English terms | Display checks, unchanged saved preferences, terminology review | partial, RQ1 |
| F4 — Structured support | Explanation, example, technical detail, reflection and revealable hint | Output contracts, browser inspection, content review | partial, RQ2 |
| F5 — Learner response | Three self-reports, five optional help choices and valid input combinations | Route/input tests and persisted events | partial, RQ3 |
| F6 — Adaptive support | Rule-based route, useful revision and no generation after High | Route tests, simulation and content review | partial, RQ1–RQ3, depends on route |
| F7 — Adaptation bound | Rounds 0–2 and consistent response/adaptation records | Limit, completion and simultaneous-request database tests | partial, RQ3 |
| F8 — Scoped follow-up | Current concept, unrelated-topic rejection, 500-character and two-question limits | HTTP, service and persistence tests | partial, RQ3 |
| F9 — Persistence | Stored support, responses, interpretations and safe updates | Retrieval and database tests | partial, RQ3, enabling |
| F10 — History | Learner ownership, newest-first ordering and accurate state | HTTP and interface inspection | partial, RQ3, enabling |
| F11 — Review/Resume | Restored session state, completion and limits | Session-transition tests and scenario | partial, RQ3, enabling |
| F12 — Preferences | Saved settings and unchanged preferences for earlier sessions | Validation, save/reload and saved-preference tests | partial, RQ1/RQ3, enabling |
| F13 — Error handling | Controlled failures/recovery without invalid writes | Injected faults, malformed outputs and browser recovery | partial, RQ1–RQ3, enabling |
| U1 — Task clarity | Inquiry purpose and entry evident | Home and keyboard inspection | pass, RQ1–RQ3, enabling |
| U2 — Information structure | Explanation areas and hint distinguishable | Organisation of initial, revised and follow-up support | pass, RQ2, enabling |
| U3 — Interaction clarity | Response choices, skip/back and consequences clear | Two-level response and keyboard inspection | pass, RQ3, enabling |
| U4 — Feedback visibility | Pending/adapting and revised support visible | Loading, routes, fade/cap and recovery | pass, RQ3, enabling |
| U5 — Navigation consistency | History, Review, Resume and preferences reachable | Navigation and modal focus | partial, RQ3, enabling |
| U6 — Bilingual readability | Readable characters and line wrapping without cut-off text | Screen sizes, interface languages, themes and bilingual display | pass, RQ1/RQ2, visual only |
| U7 — State visibility | Self-report, route, limits and completion distinct | Status, events and interpretation displays | pass, RQ3, enabling |
| U8 — Error clarity | Localized error and recovery action understandable | Failure, retry and ownership inspection | partial, RQ1/RQ3, enabling |
| U9 — Consistency | Labels/interactions consistent across configurations | Language, theme, screen width and keyboard checks | partial, RQ1–RQ3, enabling |

### Scoring

Technical Pass means a required assertion was met. Partial means evidence or coverage is incomplete. Fail means a required expectation was not met. Controlled ambiguity without a session is not a delivered-content Pass. Original failures remain visible alongside retries and adjudications.

Content dimensions are scientific correctness, context, language, explanation beyond translation and adaptation appropriateness. Scores are 2 adequate, 1 limited/minor issue, 0 serious error or absent required content, and NA not assessable. Required 0 means Fail, required 1 means Partial, and required NA prevents a full judgement. Initial outputs have no adaptation score. Fade, cap and unreached steps add no delivered content. Supplementary passage severity does not overwrite whole-output ratings.

## Reproduction and evidence

Run structural commands from the root burmese_stem_ai application. Match B01 production identities and isolated dependency modes before comparing results.

```sh
npm ci
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run lint
npm run build -- --webpack
npx tsc --noEmit
```

For a fresh checkout, generate Next types through the build before standalone TypeScript checking. Google font retrieval requires network access. Live runs require configured credentials, which are not recorded. Use dedicated synthetic databases, not production data. Historical test counts differ because the later root-project harness added coverage without changing B01 production code.

Detailed run commands, dependency modes and output records remain under each method's raw directory. Archived Markdown command logs and frozen worksheets can be extracted when reproducing historical evidence validators. Current consolidated reports are not their original hash targets. See the [archive guide](../README.md#archive-and-recovery).

## Archive and change control

The evidence CSV, master-result rows, score CSVs, JSON records, screenshots and historical manifests retain their identities. Older manifest paths to Markdown now resolve inside the archive through the consolidation index. Summaries have new hashes and are not retroactively substituted into old captures.

A source, prompt, schema, oracle or criterion change requires a new identified baseline and affected-case reruns. This consolidation changes navigation and presentation only. It does not rerun tests, change scores, certify content, demonstrate learner benefit or alter the submission PDF.

## Methodological references

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)
