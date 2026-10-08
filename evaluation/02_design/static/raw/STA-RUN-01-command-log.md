# Step 10 Static Analysis — Command Log

| Field | Value |
| --- | --- |
| Run ID | `RUN-B01-20260930-STATIC-01` |
| Baseline | `B01-A5-EVALUATION` |
| Executable source | `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Execution date/time | 30 September 2026, from 12:26:25 NZDT (UTC+13) |
| Working directory | `burmese_stem_ai/` |
| Node/npm | Node `v26.4.0`; npm `11.17.0` from B01 environment |
| Protocol used | `A5-PROTOCOL-01` 2.1, SHA-256 `72c561dd15b99d022e97b56ecf6bc881faaf0de129f20c060259d63944064f4f` |

The repository documentation/evaluation worktree was dirty, but
`git diff --exit-code 37faefa236829aa3d79e023faa1fb72a086b5c2a -- burmese_stem_ai`
returned exit 0. The executable application therefore matched the frozen B01
source. The package-lock SHA-256 was
`d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702`.

The command output below is transcribed from the execution record with line
wrapping normalised. The coverage table uses unambiguous full source names; the
machine-readable captured totals and per-file values are preserved separately
in `STA-03-coverage-summary.json`.

## STA-01 — `npm run lint`

Exit code: 0. Wall time: 3.30 seconds.

```text
pyenv: cannot rehash: /Users/nlh/.pyenv/shims isn't writable

> burmese_stem_ai@0.1.0 lint
> eslint
```

The pyenv message came from the shell environment and did not affect ESLint.

## STA-02 — `npm test`

Exit code: 0. Wall time: 3.65 seconds.

```text
pyenv: cannot rehash: /Users/nlh/.pyenv/shims isn't writable

> burmese_stem_ai@0.1.0 test
> vitest run

 RUN  v4.1.11 /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai

 Test Files  23 passed (23)
      Tests  208 passed (208)
   Start at  12:26:36
   Duration  3.21s (transform 1.62s, setup 541ms, import 6.00s, tests 1.99s, environment 2.82s)
```

## STA-03 — `npm run test:coverage`

Exit code: 0. Wall time: 4.31 seconds.

```text
pyenv: cannot rehash: /Users/nlh/.pyenv/shims isn't writable

> burmese_stem_ai@0.1.0 test:coverage
> vitest run --coverage

 RUN  v4.1.11 /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai
      Coverage enabled with v8

 Test Files  23 passed (23)
      Tests  208 passed (208)
   Start at  12:26:45
   Duration  3.81s (transform 1.83s, setup 781ms, import 6.58s, tests 3.28s, environment 2.46s)

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   89.54 |    91.33 |   91.17 |   90.98 |
 data/dao          |   43.47 |      100 |      40 |   43.47 |
  profile.dao.ts   |       0 |      100 |       0 |       0 | 9-41
  session.dao.ts   |   66.66 |      100 |   66.66 |   66.66 | 57-59,175-177
 services          |   92.57 |     91.2 |     100 |   94.27 |
  adaptation.service.ts | 91.24 | 92.61 | 100 | 93.79 | selected branches
  followup.service.ts   | 90.56 | 86.76 | 100 | 91.83 | 46,51,249,252
  llm-provider.ts       | 95.34 | 91.42 | 100 | 100 | 111-116
  profile.service.ts    | 82.35 | 76.92 | 100 | 82.35 | 10,15,26
  session-lifecycle.service.ts | 93.1 | 93.54 | 100 | 93.1 | 24,29
  session.service.ts    | 96 | 91.8 | 100 | 95.91 | 102,188
-------------------|---------|----------|---------|---------|-------------------

Statements   : 89.54% (334/373)
Branches     : 91.33% (369/404)
Functions    : 91.17% (62/68)
Lines        : 90.98% (323/355)
```

The configured scope is services and DAOs only. It excludes most UI/API code
and the separate MongoDB integration run.

## STA-04 — `npm run test:integration`

### Attempt 1 — restricted sandbox

Exit code: 1. This was an environment blockage, retained before retry.

```text
pyenv: cannot rehash: /Users/nlh/.pyenv/shims isn't writable

> burmese_stem_ai@0.1.0 test:integration
> bash scripts/run-integration-tests.sh

Error: listen EPERM: operation not permitted 127.0.0.1
    at Server.setupListenHandle [as _listen2] (node:net:2145:21)
    at listenInCluster (node:net:2224:12)
    at node:net:2448:7
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
{
  code: 'EPERM',
  errno: -1,
  syscall: 'listen',
  address: '127.0.0.1'
}

Node.js v26.4.0
```

### Attempt 2 — localhost bind permitted

No source or configuration change occurred. Exit code: 0. Wall time: 2.07
seconds.

```text
> burmese_stem_ai@0.1.0 test:integration
> bash scripts/run-integration-tests.sh

 RUN  v4.1.11 /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai

(node:47243) [MONGOOSE] Warning: mongoose: the `new` option for
`findOneAndUpdate()` and `findOneAndReplace()` is deprecated. Use
`returnDocument: 'after'` instead.

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  12:27:07
   Duration  571ms (transform 55ms, setup 135ms, import 55ms, tests 219ms, environment 0ms)
```

## STA-05 — `npm run test:all`

Executed with localhost bind permitted. Exit code: 0. Wall time: 7.28 seconds.

```text
> burmese_stem_ai@0.1.0 test:all
> npm test && npm run test:integration

> burmese_stem_ai@0.1.0 test
> vitest run

 RUN  v4.1.11 /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai

 Test Files  23 passed (23)
      Tests  208 passed (208)
   Start at  12:27:20
   Duration  4.57s (transform 2.95s, setup 1.05s, import 9.46s, tests 3.15s, environment 3.46s)

> burmese_stem_ai@0.1.0 test:integration
> bash scripts/run-integration-tests.sh

 RUN  v4.1.11 /Users/nlh/Downloads/uoa_lectures/INFOSYS720/burmese_stem_ai_research/burmese_stem_ai

(node:47457) [MONGOOSE] Warning: mongoose: the `new` option for
`findOneAndUpdate()` and `findOneAndReplace()` is deprecated. Use
`returnDocument: 'after'` instead.

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  12:27:26
   Duration  537ms (transform 60ms, setup 141ms, import 60ms, tests 209ms, environment 0ms)
```

## STA-06 — `npm run build -- --webpack`

Exit code: 0. Wall time: 13.56 seconds.

```text
pyenv: cannot rehash: /Users/nlh/.pyenv/shims isn't writable

> burmese_stem_ai@0.1.0 build
> next build --webpack

▲ Next.js 16.3.4 (webpack)
- Environments: .env.production, .env
✓ Running next.config.ts took 38ms

  Creating an optimized production build ...
✓ Compiled successfully in 1514ms
  Running TypeScript ...
  Finished TypeScript in 2.6s ...
  Collecting page data using 7 workers ...
✓ Generating static pages using 7 workers (8/8) in 197ms
  Finalizing page optimization ...
  Collecting build traces ...

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api
├ ƒ /api/preferences
├ ƒ /api/sessions
├ ƒ /api/sessions/[sessionId]
├ ƒ /api/sessions/[sessionId]/followup
├ ƒ /api/sessions/[sessionId]/respond
├ ƒ /history
└ ƒ /learn/[sessionId]

ƒ Proxy (Middleware)
ƒ (Dynamic) server-rendered on demand
```

## STA-07 — `npx tsc --noEmit`

Executed after production build generated Next.js types. Exit code: 0. Wall
time: 1.46 seconds.

```text
pyenv: cannot rehash: /Users/nlh/.pyenv/shims isn't writable
```

The command emitted no TypeScript diagnostic.
