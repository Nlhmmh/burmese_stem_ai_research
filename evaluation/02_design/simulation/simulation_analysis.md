# Simulation and content assessment

## Run and scope

RUN-B01-20261001-SIMULATION-02 evaluated B01 route handlers, services, live provider and isolated MongoDB on 1 October 2026. UTC execution was 10:38:45.239–10:43:52.701. It was not public HTTP/proxy/browser testing. Sixteen fixed inquiries followed A/B/C response paths, plus seven language/context cases. Start/end, model configuration, exact inputs and provider captures remain in [run metadata](raw/SIM-RUN-01-metadata.json) and [case definitions](simulation_cases.csv).

Path A was initial support, High and Finish. B was initial support, Medium with optional help skipped, High and Finish. C was initial support, simpler explanation, conceptual clarification and a cap check. Three language-help cases used bilingual/English/Burmese preferences. Four context cases clarified cell, current, network and inheritance.

## Technical results

| Scope | Attempts | Technical Pass | Controlled ambiguity | Technical Fail |
| --- | --- | --- | --- | --- |
| Core | 48 | 41 | 6 | 1 |
| Separate routes | 7 | 3 | 2 | 2 |
| Total | 55 | 44 | 8 | 3 |

There were 102 provider attempts, 47 sessions, 44 stored adaptations and 85 response events. Eight initial ambiguities created no session, so downstream steps were not applicable and not successful corrections. [All case outcomes](simulation_results.csv) retain their original denominators.

| Failed case | Observation | Boundary |
| --- | --- | --- |
| SIM05-C | Generation returned HTTP 502 after cancellation measured at 52.825 s despite a 20-second timer | Later steps unreached; earlier stored content retained |
| SIM-CM-13 | Biological-cell correction returned unchanged interpretation labelled corrected and was rejected | No corrected adaptation persisted |
| SIM-CM-16 | Programming-inheritance correction returned unchanged interpretation labelled corrected and was rejected | No corrected adaptation persisted |

An earlier runner comparison defect and interrupted attempt remain in raw/aborted_attempt_01 and do not enter the 55-attempt total. Safe rejection/unchanged state does not make failed delivery a Pass.

## Content assessment

All 91 delivered support outputs were assessed for scientific correctness, contextual relevance, English/Burmese language adequacy, explanation beyond translation and adaptation appropriateness. Dimension scores and the unchanged rule are in the shared protocol. Outcomes were **18 Pass, 71 Partial and two Fail**. These are outputs, not learners or independent observations.

[human_content_scores.csv](human_content_scores.csv) retains all scores and rationales. Original 55 worksheets and 2 October authorised sign-offs are archived, not deleted irrecoverably. The author's confirmed personal scientific and bilingual checking is recorded in the protocol. No independent second assessor or certified terminology glossary is claimed. SIM04-A's saved language-score amendment and SIM01-A comments remain in the original evidence.

| Noticeable finding | Meaning and consequence |
| --- | --- |
| Gravity, SIM04-B initial | Mass was confused with weight and translated using wording meaning “in a large group”. One initial output remains Fail |
| Ion, SIM08-B initial | Burmese net-charge negation contradicts the English definition and later charge statement. Initial output remains Fail |
| Electric current, language support | Some support describes speed rather than charge quantity per second. Valid bilingual payload does not establish successful remediation |
| Foreign-script fragments | Eight reviewed outputs contained unrelated script. Display/schema acceptance did not establish language correctness |
| Repeated support | Some simpler/conceptual revisions restated earlier wording. Different strings alone did not establish useful adaptation |

Better later ion/gravity support did not repair the earlier stored text. Missing/rejected outputs were not scored as delivered content. The eight clarification messages were assessed separately, with Burmese marked NA where absent.

## Reference basis

SIM-REFERENCES-01 expectations were fixed before generation. Biology sources covered photosynthesis, DNA, osmosis and cells; physics covered gravity, current and momentum; chemistry covered pH, ions and catalysts. Computing and engineering sources covered inheritance, algorithms and carbon fibre. Exact concepts, misconceptions, locators and additions remain in the archived content_reference_notes.md and additional_reference_notes.md. No frozen expectation or source-access date was changed during consolidation.

## Evidence

E018–E023 identify execution, provider text, database state, original analysis/reference manifest and reviewed output scores. [Case JSONL](raw/SIM-RUN-01-results.jsonl), [provider JSONL](raw/SIM-RUN-01-provider.jsonl) and [database snapshot](raw/SIM-RUN-01-database-snapshot.json) remain unchanged. The [supplementary bilingual assessment](bilingual_assessment/results.md) is deeper inspection of selected saved outputs, not another simulation run or a regrade of the corpus.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
