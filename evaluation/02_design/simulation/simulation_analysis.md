# Simulation analysis — technical execution

Run: **RUN-B01-20261001-SIMULATION-02**. Baseline: **B01-A5-EVALUATION**; application commit `37faefa236829aa3d79e023faa1fb72a086b5c2a`. Protocol: 2.1. Start: 2026-10-01T10:38:45.239Z; end: 2026-10-01T10:43:52.701Z (UTC).

Status: **All 55 planned attempts accounted for; qualified human content judgement pending.** This does not complete the content-rating requirement of Step 13.

## Actual results

| Scope | Attempts | Technical Pass | Controlled ambiguity | Technical Fail |
| --- | --- | --- | --- | --- |
| Core | 48 | 41 | 6 | 1 |
| Separate routes | 7 | 3 | 2 | 2 |
| Total | 55 | 44 | 8 | 3 |

A controlled ambiguity is an executed initial HTTP 422 outcome with no session. Its fade/adaptation/correction path is Not applicable, not a path Pass. For any 201 interpretation of an ambiguous term, qualification/context accuracy still needs human judgement.

Actual created sessions: 47; adaptations stored: 44; response events stored: 85. Live provider attempts: 102. Successful provider response model identifiers: gpt-5.4-mini-2026-03-17. Observed usage: {"input_tokens":119700,"output_tokens":36676,"total_tokens":156376}; not a billed-cost estimate.

The observation wrapper retained safe request bodies (prompts, inputs and JSON schemas), successful raw provider responses, statuses/timing and redacted failure metadata. No credential headers were captured. There are no model retries in this full execution.

## Per-case outcomes

| Case | Initial HTTP | Technical outcome | Path outcome | Calls | Final round/status | Failure/limitation |
| --- | --- | --- | --- | --- | --- | --- |
| SIM01-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM01-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM01-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM02-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM02-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM02-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM03-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM03-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM03-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM04-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM04-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM04-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM05-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM05-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM05-C | 201 | Fail | Incomplete | 3 | 1 / in_progress | Assertion failed: response HTTP 200 |
| SIM06-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM06-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM06-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM07-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM07-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM07-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM08-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM08-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM08-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM09-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM09-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM09-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM10-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM10-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM10-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM11-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM11-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM11-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM12-A | 201 | Pass | Pass | 1 | 0 / completed |  |
| SIM12-B | 201 | Pass | Pass | 2 | 1 / completed |  |
| SIM12-C | 201 | Pass | Pass | 3 | 2 / review_recommended |  |
| SIM13-A | 201 | Pass | Pass | 1 | 0 / completed | Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass. |
| SIM13-B | 201 | Pass | Pass | 2 | 1 / completed | Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass. |
| SIM13-C | 201 | Pass | Pass | 3 | 2 / review_recommended | Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass. |
| SIM14-A | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM14-B | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM14-C | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM15-A | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM15-B | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM15-C | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM16-A | 201 | Pass | Pass | 1 | 0 / completed | Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass. |
| SIM16-B | 201 | Pass | Pass | 2 | 1 / completed | Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass. |
| SIM16-C | 201 | Pass | Pass | 3 | 2 / review_recommended | Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass. |
| SIM-LANG-01 | 201 | Pass | Pass | 2 | 1 / in_progress | Payload and override checked; browser display and language quality require separate assessment. |
| SIM-LANG-02 | 201 | Pass | Pass | 2 | 1 / in_progress | Payload and override checked; browser display and language quality require separate assessment. |
| SIM-LANG-03 | 201 | Pass | Pass | 2 | 1 / in_progress | Payload and override checked; browser display and language quality require separate assessment. |
| SIM-CM-13 | 201 | Fail | Incomplete | 2 | 0 / in_progress | Assertion failed: concept response HTTP 200 |
| SIM-CM-14 | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM-CM-15 | 422 | Controlled ambiguity | Not applicable: no session | 1 | No session | Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt. |
| SIM-CM-16 | 201 | Fail | Incomplete | 2 | 0 / in_progress | Assertion failed: concept response HTTP 200 |

## Failures and accounting

- SIM05-C: Assertion failed: response HTTP 200. Last observed HTTP: 502. Dependent later steps were not executed or claimed passed.
- SIM-CM-13: Assertion failed: concept response HTTP 200. Last observed HTTP: 502. Dependent later steps were not executed or claimed passed.
- SIM-CM-16: Assertion failed: concept response HTTP 200. Last observed HTTP: 502. Dependent later steps were not executed or claimed passed.

Before this full run, one sandbox preflight failed before generation. A first runner execution was stopped after 11 recorded initial attempts because an order-sensitive JSON comparison misreported matching preferences. That run and its console/provider captures remain under `raw/aborted_attempt_01/`; a following in-flight call was interrupted. Its records are not included in the 55 full-run denominator. The replacement used semantic equality and fresh isolated state; no application behaviour, prompt, schema or reference oracle was modified. See [command log](raw/SIM-RUN-01-command-log.md).

## Technical evidence boundaries

Real B01 Next route handlers, service validators, provider helper, DAOs and isolated MongoDB were executed. Requests used synthetic `x-learner-id` identities rather than the browser/middleware; HTTP statuses are handler response statuses, not measurements of transport through a deployed server. This run is not black-box authentication or browser rendering evidence. Profiles remained unchanged for successful checks. Bilingual payload and presentation overrides do not prove Burmese quality or visible rendering.

Exact initial text, adapted text and before/after documents are retained in [raw case JSONL](raw/SIM-RUN-01-results.jsonl); all final documents are in [database snapshot](raw/SIM-RUN-01-database-snapshot.json). Outputs from failed initial/response generation, where received, are retained in [provider JSONL](raw/SIM-RUN-01-provider.jsonl). The temporary server was stopped after capture; only synthetic temporary databases were created. No production/application database was altered.

## Qualified human review — intentionally unfinished

Open [qualified_human_judgement.md](qualified_human_judgement.md). There are 55 case worksheets and 91 blank generated-output score rows. Assessor, competence, dates, scores, rationale and content conclusions remain blank. Technical passes are not content-quality passes; meaningful adaptation and qualified initial ambiguity interpretations are unresolved. No learning gain, mastery, participant usability or pedagogical optimality claim is supported.

## Evidence and next action

E018: console/metadata/command record. E019: full generated text and state/provider captures. E020: this technical analysis/results and blank human review pack. E021: frozen reference/corpus/runner manifest. Complete qualified review before declaring Step 13 fully complete; Step 14 black-box technical preparation can proceed with the content review explicitly outstanding.

Detailed evidence-backed causes and unchanged-state checks: [failure_analysis.md](failure_analysis.md).
