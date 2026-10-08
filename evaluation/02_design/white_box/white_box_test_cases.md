# Step 15 — White-Box Test Cases

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP15-WHITEBOX-CASES-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version `2.1` |
| Status | Completed on 2 October 2026; WB01–WB06 structural Pass with uncovered-path notes; not a content/usability pass |
| Evaluator / run ID | Codex under user direction / `RUN-B01-20261002-ROOTTESTS-02` |

## Purpose and boundaries

Evaluate internal, requirement-critical paths that explain external behaviour.
Existing tests make cases executable, but their existence and earlier B01
freeze run are not formal Step 15 outcomes. Execute against the recorded
baseline and retain exact test source, command, output, database mode, coverage
scope, inspected symbols, and uncovered branches.

Mocks establish logic isolation only. Persistence and concurrency conclusions
require the real isolated MongoDB suite. Coverage is structural evidence, not
proof of content quality, usability, or educational effectiveness.

## Preconditions

- [x] Verify B01/protocol and record the worktree/test-source state.
- [x] Record evaluator, timestamp, run ID, Node/npm, Vitest and database mode.
- [x] Map existing test files to WB01–WB06; the final register maps all root-project tests and integration cases.
- [x] Store complete logs under `evaluation/02_design/white_box/raw/`.
- [x] Retain original root command logs, JSON and generated coverage; index changes are documented separately.

## WB01 — Adaptation routing, generation, and cap

### Symbols

- `validateLearnerResponseRequest`
- `selectAdaptationRoute`
- `respondToLearningSession`
- adaptation and reinterpretation output validators
- `recordSessionResponse`

### Required matrix

For both `medium` and `needs_support`, execute each Stage 6B value at rounds 0,
1, and 2: null, `simpler_explanation`, `another_example`, `language_terms`,
`concept_unclear`, and `concept_mismatch` with clarification. Also execute High
at rounds 0/1/2. This is 39 valid route/round combinations before validation
and failure extensions.

| Input | Expected decision |
| --- | --- |
| High + null | `fade`, no support type |
| Medium + null | `stage_5_scaffold` / `another_example` |
| Needs Support + null | `stage_5_scaffold` / `simpler_explanation` |
| Either support-needed value + `simpler_explanation` | `stage_5_scaffold` / `simpler_explanation` |
| Either support-needed value + `another_example` | `stage_5_scaffold` / `another_example` |
| Either + `language_terms` | `language_support` / `clarification` / bilingual override |
| Either + `concept_unclear` | `concept_clarification` / `concept_clarification` |
| Either + `concept_mismatch` | `context_reinterpretation` / `concept_correction` |

At rounds 0/1, generation-capable routes call the provider once and persist one
event plus one adaptation/increment. At round 2, every route still records its
event but makes no provider call/adaptation/increment. High never generates or
increments at any round.

### Validation/failure extensions

- unknown support need or difficulty;
- High with a difficulty;
- missing, blank, or >200-character mismatch clarification;
- clarification supplied for a non-mismatch route;
- conflicting `understanding` and `overallSupportNeed`;
- completed, missing/foreign, or invalid-round session;
- repeated adaptation output and malformed route-specific output;
- provider missing configuration, missing output, invalid JSON, timeout, and
  transport/non-2xx failure;
- optimistic concurrency conflict; and
- corrected, ambiguous, unchanged, application-controlled-field, and capped
  concept reinterpretation outcomes.

### Expected evidence

Decision, prompt/schema input where generation occurs, provider-call count,
save-call count/payload, round/status/event/adaptation, error type, and absence
of persistence on invalid output.

### Existing test sources to execute

```text
tests/unit/services/adaptation-routing.test.ts
tests/unit/services/adaptation-routing-branches.test.ts
tests/unit/services/adaptation-boundary.test.ts
tests/unit/services/adaptation-generation-contract.test.ts
tests/unit/services/concept-reinterpretation.test.ts
tests/unit/services/request-validation.test.ts
tests/unit/data/session-dao.test.ts
```

## WB02 — Session lifecycle and ownership

### Required cases

1. Validate a correct UUID and reject malformed/non-v4 UUID.
2. Retrieve only with matching learner + session identifiers.
3. Normalise legacy missing response/adaptation/follow-up arrays and missing
   preference snapshot.
4. Complete `in_progress` → `completed`.
5. Complete `review_recommended` → `completed`.
6. Repeat completion idempotently without another write.
7. Reject unsupported stored status and concurrent completion change.
8. Treat foreign/missing session as not found.
9. Reject new learner response after completion without provider/save.
10. Reject completion payloads with extra fields or non-`completed` status.

### Expected evidence

Lookup/write arguments include learner/session ownership; public projection
contains reconstructable state; legal/illegal transitions and stable domain
errors match expectations. Do not invent an `adapted` persisted status.

### Existing test sources to execute

```text
tests/unit/services/session-lifecycle-ownership.test.ts
tests/unit/api/session-action-error-boundary.test.ts
tests/unit/api/session-detail-route.test.ts
tests/unit/api/refined-route-contracts.test.ts
```

## WB03 — Concept-scoped follow-up

### Required cases

1. Trim/accept valid question; reject blank/non-object/malformed request.
2. Accept 500 characters and reject 501 before provider invocation.
3. Use active corrected concept, latest relevant scaffold, latest response route,
   preferences, and previous follow-ups in provider input.
4. Accept supporting sub-concept and persist once.
5. Reject unrelated primary concept without persistence.
6. Enforce two-question limit before provider; reject a concurrent third save.
7. Treat missing/foreign session as not found without generation.
8. Map provider configuration/output/JSON/transport failures without save.
9. Reject output that tries to assign a difficulty or alter Stage 7 state.
10. Verify successful follow-up append leaves round, response events,
    adaptations, status, and active concept unchanged.

### Existing test sources to execute

```text
tests/unit/services/followup-context.test.ts
tests/unit/services/request-validation.test.ts
tests/unit/api/refined-route-contracts.test.ts
tests/unit/data/session-dao.test.ts
```

## WB04 — Provider, prompt, schema, and API error contracts

### Required cases

1. Shared provider uses central endpoint/model/20-second timeout, strict output
   format and `store: false` once per request.
2. No automatic retry on non-2xx, timeout, or network error.
3. Stable errors for non-2xx, missing output text, invalid response envelope,
   and invalid JSON; network/provider detail is not exposed.
4. Initial Stage 1–5 prompt/schema accepts a valid complete result and rejects
   missing field, wrong type, extra application-controlled field, blank required
   text, invalid JSON, ambiguous/out-of-scope contract violations, and unrelated
   writing system where validator covers it.
5. Standard adaptation, language support, concept clarification, and concept
   reinterpretation accept only their bounded shapes and reject repetition.
6. Follow-up accepts only related/unrelated bounded output and rejects route or
   difficulty assignment.
7. API routes map validation to 400, not found to 404, conflict/limit to 409,
   scope to 422, provider generation failure to 502, and unexpected database
   failure to 500 with the standard envelope.
8. No invalid generated content reaches a DAO save call.

### Existing test sources to execute

```text
tests/unit/services/llm-provider.test.ts
tests/unit/services/session-generation-contract.test.ts
tests/unit/services/adaptation-generation-contract.test.ts
tests/unit/services/adaptation-routing-branches.test.ts
tests/unit/services/concept-reinterpretation.test.ts
tests/unit/services/followup-context.test.ts
tests/unit/api/provider-route-boundary.test.ts
tests/unit/api/preference-error-boundary.test.ts
tests/unit/api/refined-route-contracts.test.ts
```

## WB05 — Persistence, reconstruction, ownership, and concurrency

### Mocked DAO assertions

- learner/session scoped retrieval;
- learner-only newest-first History query;
- atomic response state + event + adaptation append with one round increment;
- atomic non-adapting event append with no increment;
- active-concept update plus reinterpretation trace;
- expected event count guards every response write;
- follow-up append does not alter Stage 7 state; and
- route-specific schema metadata/legacy documents validate correctly.

### Required real-MongoDB cases

1. Learner-scoped newest-first sessions and foreign exclusion.
2. Legacy document read with missing refined history/snapshot.
3. Fade and capped events persist without adaptation/increment.
4. Two concurrent generated responses from one snapshot: one write succeeds.
5. Two concurrent capped responses from one event snapshot: one append succeeds.
6. Profile defaults/update and two-follow-up persistence cap.

### Expected invariants

No duplicate adaptation/event, round never exceeds 2, ownership never leaks,
stored projection reconstructs the interaction, and concurrency losers produce
a controlled null/conflict path.

### Existing test sources to execute

```text
tests/unit/data/session-schema.test.ts
tests/unit/data/session-dao.test.ts
tests/unit/services/session-lifecycle-ownership.test.ts
tests/integration/session-persistence.test.ts
```

## WB06 — Preferences

### Required cases

1. Create/retrieve default bilingual/beginner/guided profile.
2. Accept supported partial update and retain unspecified fields.
3. Reject unknown keys and invalid values without write.
4. Guard GET/PATCH learner identity.
5. Map database failure to safe stable envelope.
6. Propagate snapshot to initial/adaptation/follow-up generation inputs.
7. Confirm per-adaptation language override does not mutate profile.
8. Existing session retains snapshot after profile change; fresh session uses
   new profile.
9. UI locale/theme handling remains distinct from content support language as
   documented.

### Existing test sources to execute

```text
tests/unit/services/request-validation.test.ts
tests/unit/api/preference-error-boundary.test.ts
tests/unit/services/session-generation-contract.test.ts
tests/unit/services/adaptation-routing-branches.test.ts
tests/unit/services/followup-context.test.ts
tests/integration/session-persistence.test.ts
```

## Execution commands

Run group-specific files first where useful, then the full commands:

```bash
npm test
npm run test:coverage
npm run test:integration
npm run test:all
```

Record each narrower `npx vitest run <paths...>` invocation if used. The final
formal evidence must identify exact test files and source commit; a prior log
from a different test tree is not interchangeable.

## Group execution register

| Group | Required mode | Execution status | Outcome | Evidence IDs | Uncovered branches/notes |
| --- | --- | --- | --- | --- | --- |
| WB01 | Deterministic mocks + persistence assertions | Executed | Pass | E033–E035 | All 39 route/round combinations; validator/provider/save assertions; defensive/legacy gaps recorded |
| WB02 | Deterministic service/API | Executed | Pass | E033–E035 | Both legal completions, repeated/foreign/completed boundaries, UUIDs and legacy continuity |
| WB03 | Deterministic provider/DAO + real state invariants | Executed | Pass | E033–E035 | Corrected/legacy/previous context, length/count caps, related/unrelated shapes; real Stage 7 invariance |
| WB04 | Deterministic provider/API | Executed | Pass | E033–E035 | Strict shapes and safe failures; writing-system check Not applicable where no runtime validator exists; not semantic quality evidence |
| WB05 | Mocked DAO + real isolated MongoDB | Executed | Pass | E033–E035 | Required six real-database cases plus round-1→2 and follow-up races; separate from deterministic coverage |
| WB06 | Deterministic + real isolated MongoDB | Executed | Pass | E033–E035 | Defaults/guards/partial updates/snapshots/override; locale/theme structural inspection is not full browser usability |

## Recorded execution and limitations

See [white-box evaluation](white_box_evaluation.md), [run metadata](00_run_metadata.md),
[373-test register](white_box_results.csv), [39-case matrix](white_box_route_matrix.csv)
and [per-file coverage gaps](white_box_uncovered.csv).
The root-project deterministic suite passed 361/361 tests across 26 files;
the isolated MongoDB suite passed 12/12 across two files, with no skipped tests.
Application-wide V8 coverage spans 42 files: 72.54% statements, 76.37% branches,
64.00% functions and 73.75% lines. Integration/browser execution is separate.
Production matches B01; test/config profile ROOTTESTS-02 is recorded separately.
The cleanup removed the superseded source-copy run and duplicate helpers;
original root captures remain unchanged. Step 15 does not erase BB07/BB08
partials, BB22’s public oracle failure, simulation findings or remaining usability.

## Per-case result rule

Binary assertions are Pass or Fail. A group may be Partial only when planned
coverage is incomplete and every missing/failed subcase is listed. A known
failed mandatory assertion cannot be relabelled Partial. Record test/group,
source locator, command, initial fixture, mocks/database mode, expected and
actual assertion, execution status, outcome, log/coverage evidence IDs, issue,
and limitation.

## Completion criteria

- WB01–WB06 and all required subcases are executed or explicitly accounted for.
- Provider/save call counts are asserted for fade, cap, invalid-output, and
  limit paths.
- Real MongoDB evidence supports persistence and concurrency conclusions.
- Exact test source, command, output, coverage scope and uncovered branches are
  retained.
- Failures and retries remain visible.
- FURPS and master evidence/results records are updated from actual evidence.
