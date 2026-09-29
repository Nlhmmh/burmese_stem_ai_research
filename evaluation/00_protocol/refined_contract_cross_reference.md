# Refined PoC Contract Cross-Reference

## Record status

| Field | Value |
| --- | --- |
| Prepared | 30 September 2026 |
| Protocol | `A5-PROTOCOL-01` version 2.0 |
| Purpose | Step 13 documentation-to-implementation audit |
| Evidence boundary | Static cross-reference plus local verification commands; not formal `B01` evaluation evidence |

This record checks that the current documentation oracle is represented by the
application constants, persistence shape, service routes, UI labels, and named
tests. A test locator shows structural coverage exists; it is not a claim that
the test passed in a future frozen evaluation run.

## Canonical vocabulary and UI

| Contract | Implementation locator | UI locator | Test locator |
| --- | --- | --- | --- |
| Stage 6A values are `high`, `medium`, `needs_support` | `lib/session-domain.ts` — `OVERALL_SUPPORT_NEEDS` | `i18n/locales/en.json` and `my.json` — Stage 6A labels | `tests/unit/lib/session-domain.test.ts`; `tests/unit/services/request-validation.test.ts` — supported request shapes and invalid combinations |
| Values are self-reported support need, not measured mastery | `lib/session-domain.ts` and session schema comments; legacy field is `understanding` | `components/history/HistoryList.tsx`; history locale labels | `tests/unit/components/session-continuity.test.tsx` — “labels history values as self-reported support” |
| Stage 6B is optional for Medium/Needs Support | `DIFFICULTY_TYPES`; request validator | `SessionContent.tsx` — “What would help you most?” and “Continue without a choice” | `stage6b-interface.test.tsx` — skip, cancel, loading, retry, mobile and keyboard cases |
| Stage 6B choices are bounded to five values | `DIFFICULTY_TYPES` | English/Burmese locale choice labels | `session-domain.test.ts`; `request-validation.test.ts` |
| Concept mismatch requires a short clarification | `validateLearnerResponseRequest` | `SessionContent.tsx` clarification field | `request-validation.test.ts` — required/bounded clarification |

## Route, persistence, and bounds audit

| Contract | Source of truth | Test ID or named assertion |
| --- | --- | --- |
| High selects `fade` | `selectAdaptationRoute` | `adaptation-routing.test.ts` — “fades a high self-report without selecting generated support” |
| Fade makes no provider call, adaptation, or round increment | `respondToLearningSession`; DAO non-adaptation update | `adaptation-routing-branches.test.ts` High cases at rounds 0, 1 and 2 |
| No-choice defaults are Medium → `another_example`, Needs Support → `simpler_explanation` | `selectAdaptationRoute` | `adaptation-routing.test.ts`; parameterised branch cases |
| Simpler explanation and another example select Stage 5 support | `selectAdaptationRoute` | route selector and branch tests |
| Language terms selects `language_support` and a bilingual presentation override | route selector; adaptation schema | language-route cases in `adaptation-routing-branches.test.ts`; component display case in `session-content.test.tsx` |
| Concept unclear selects `concept_clarification` | route selector and route-specific generation contract | `adaptation-routing-branches.test.ts` — distinct, non-repeating, malformed and capped cases |
| Concept mismatch performs bounded reinterpretation | `createConceptReinterpretation` | `concept-reinterpretation.test.ts` — correction, controlled ambiguity, application-field rejection, and cap cases |
| Every accepted response appends a response event | `learnerResponseEventSchema`; `recordSessionResponse` | `session-schema.test.ts` — reconstructable fade/adapted/capped events; DAO atomic append cases |
| Round counts generated adaptations only, maximum two | schema `adaptationRound`; service `canAdapt`; atomic DAO predicate | `adaptation-boundary.test.ts` — persist at cap without LLM; invalid round and concurrent cap cases |
| Review/Resume reconstructs all routes and supports legacy documents | lifecycle projection and `SessionContent` | `session-continuity.test.tsx` — every stored route and normalised legacy session |

## Current verification entry points

Run from `burmese_stem_ai/`:

```sh
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

Record the command, timestamp, environment, exit code, complete log, commit,
worktree state, dependency lock hash, and dependency mode when these commands
are executed for formal `B01` evidence. Do not promote a Step 13 local pass into
a formal result automatically.

### Step 13 local documentation verification

The following commands were run locally on 30 September 2026 to confirm that
the commands documented above are valid after the documentation alignment.
These results are implementation-work verification only; complete formal logs,
baseline identity, evaluator, and database/provider modes were not captured as
`B01` evidence.

| Command | Local result |
| --- | --- |
| `npm test` | Exit 0; 22 test files and 174 tests passed |
| `npm run test:coverage` | Exit 0; V8 report generated (83.91% statements, 85.39% branches, 89.70% functions, 85.07% lines) |
| `npm run lint` | Exit 0 |
| `npx tsc --noEmit` | Exit 0 |
| `npm run build -- --webpack` | Exit 0; Next.js production build completed |

### Step 14 automated-refinement verification

The Step 14 implementation-work run is recorded in detail in
[`automated_refinement_coverage.md`](automated_refinement_coverage.md). The
deterministic suite increased to 208 tests across 23 files, and five separate
tests exercised real persistence and competing updates against an isolated
temporary MongoDB database.

## Claim boundary

The cross-reference can support a claim that the documented route and state
contracts have corresponding implementation and test locations. It cannot by
itself establish runtime behaviour against a real database/provider, Burmese
language quality, STEM accuracy, learner usability, learning gains, retention,
mastery, or pedagogical optimality of the two-generated-adaptation limit.
