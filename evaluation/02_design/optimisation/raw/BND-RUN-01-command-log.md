# Bounds Analysis Command Log

| Field | Value |
| --- | --- |
| Run ID | `RUN-B01-20261001-BOUNDS-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version 2.1 |
| Evaluator | Codex technical execution under user direction |
| Execution date | 1 October 2026 |
| First case-executing run start | 19:18:52 Pacific/Auckland |
| Final evidence run start | 19:20:57 Pacific/Auckland |
| Evidence consolidation end | 19:27 Pacific/Auckland |
| Application commit at execution | `52f38d4c865c5d0dc2e18b5dfece99f01cb7f805` |
| Frozen executable B01 commit | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Application-source comparison | Pass: no difference under `burmese_stem_ai/` |
| Package-lock SHA-256 | `d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702` |

## Environment and dependency modes

| Field | Actual value |
| --- | --- |
| Node.js | 26.4.0 |
| npm | 11.17.0 |
| Vitest | 4.1.11 |
| MongoDB | 8.2.6 |
| Formal database | `burmese_stem_bounds_test` on `127.0.0.1:58504` |
| Temporary data directory | `/tmp/burmese-stem-bounds.EwFD8E` |
| Cleanup | MongoDB stopped and temporary directory removed by the runner's EXIT trap |
| Provider | Deterministic instrumented mock; no live-provider request or API key |
| Persistence | Real isolated MongoDB for every case |
| Concurrency | Two service requests released from the same stored snapshot through an evaluation-only barrier |
| Data | Artificial identifiers and content only |

## Retained runner

The exact runner consists of:

- `BND-RUN-01-bounds.test.ts` — BND-01–BND-17 assertions and structured result output;
- `vitest.bounds.config.mts` — alias, setup and serial-execution configuration; and
- `run_bounds_tests.sh` — temporary MongoDB lifecycle and Vitest invocation.

The runner exists under `evaluation/`; no application file was changed.

Formal command:

```sh
bash evaluation/02_design/optimisation/raw/run_bounds_tests.sh
```

## Attempts and first-failure retention

| Attempt | Result | Exact retained finding | Disposition |
| --- | --- | --- | --- |
| 1 | Environment blocked before MongoDB/test execution | `Error: listen EPERM: operation not permitted 127.0.0.1` while allocating a local port in the sandbox | Reran unchanged runner with permission to bind the isolated localhost database |
| 2 | Runner startup failure before any case | External config could not resolve `vitest/config` because the config was outside the application package-resolution tree | Evaluation config changed to use a plain exported object and the frozen application as Vitest root |
| 3 | Pass | 1 file passed; 17/17 cases passed; first case-executing run | Retained; prompted addition of explicit non-secret database metadata |
| 4 | Pass | 1 file passed; 17/17 cases passed; exact temporary database metadata printed | Retained; counter label reviewed before evidence freeze |
| 5 | Pass — formal final evidence run | 1 file passed; 17/17 cases passed in 637 ms; separate response-persistence and completion counters recorded | Source for `BND-RUN-01-results.jsonl` and analysed result |

No failed application assertion was replaced by a retry. Attempts 1–2 were
runner/environment failures before case execution. Attempts 3–5 all passed the
same application assertions; attempts 4–5 improved evidence metadata only.

## Final bounds execution summary

```text
BND_RUN_META database=burmese_stem_bounds_test host=127.0.0.1 port=58504 db_dir=/tmp/burmese-stem-bounds.EwFD8E cleanup=trap
BND_RUN_META node=v26.4.0 npm=11.17.0 mongod=db version v8.2.6

Test Files  1 passed (1)
Tests       17 passed (17)
Start at    19:20:57
Duration    637ms (transform 73ms, setup 163ms, import 106ms, tests 280ms, environment 0ms)
```

Machine-readable before/after state and call counters for every case are
retained in `BND-RUN-01-results.jsonl`.

## Regression checks

### Deterministic suite

Command:

```sh
cd burmese_stem_ai
npm test
```

Result:

```text
Test Files  23 passed (23)
Tests       208 passed (208)
Duration    2.21s
```

The shell also emitted the environment-only warning that the pyenv shims
directory was not writable. It did not affect the tests.

### Existing MongoDB integration suite

Command:

```sh
cd burmese_stem_ai
npm run test:integration
```

Result:

```text
Test Files  1 passed (1)
Tests       5 passed (5)
Duration    472ms
```

The existing Mongoose deprecation warning for the `new` option was emitted
twice. It is unrelated to a failed assertion and remains a recorded technical
warning.

### Lint and TypeScript

Commands:

```sh
cd burmese_stem_ai
npm run lint
npx tsc --noEmit
```

Result: both exited 0 with no lint or TypeScript diagnostic. The pyenv warning
described above was emitted by the shell before lint.

## End state

- Formal temporary MongoDB process stopped.
- Formal temporary MongoDB directory removed by the guarded cleanup trap.
- No live provider or real learner data used.
- Application source still matches the frozen B01 commit.
- Evaluation files remain uncommitted pending user review.
