# White-box root-project run metadata

| Field | Recorded value |
| --- | --- |
| Run | `RUN-B01-20261002-ROOTTESTS-02` |
| Evaluator | Codex, technical execution under user direction |
| Date / timezone | 2 October 2026 / Pacific/Auckland |
| Commands began / ended | 21:58:53–21:59:40 NZDT (08:58:53–08:59:40 UTC) |
| Production baseline | B01 / `37faefa236829aa3d79e023faa1fb72a086b5c2a` |
| Test/config profile | ROOTTESTS-02; separately hashed in metadata |
| HEAD at execution | `834b72eda45fb101998f5838e5a1f0795a5cde2a` |
| Execution directory | Root `burmese_stem_ai/` |
| Node / npm | v26.4.0 / 11.17.0 |
| Vitest / V8 coverage | 4.1.11 |
| Local MongoDB | 8.2.6; temporary isolated synthetic databases |
| Provider configuration | Controlled mocks; zero external provider calls |
| Source copies created | 0 |
| Browser | Not used for this root-project test run |

Exact timestamps, command arguments and exit codes are in
[commands.jsonl](raw/RUN-B01-20261002-ROOTTESTS-02/commands.jsonl). Source, lockfile, test/config hashes
and capture-time worktree are in [metadata.json](raw/RUN-B01-20261002-ROOTTESTS-02/metadata.json).
Production files match B01; the test configuration intentionally expands
coverage to the application, rather than claiming an unchanged whole worktree.

## Evidence locators

- [Unit result JSON](raw/RUN-B01-20261002-ROOTTESTS-02/01-unit.json): 361 named tests passed.
- [Coverage execution JSON](raw/RUN-B01-20261002-ROOTTESTS-02/02-project-coverage.json): 361 passed.
- [Application coverage HTML](raw/RUN-B01-20261002-ROOTTESTS-02/coverage/index.html): 42 file entries.
- [Integration log](raw/RUN-B01-20261002-ROOTTESTS-02/05-integration.log): 12 passed in 2 files.
- [Integration snapshots](raw/RUN-B01-20261002-ROOTTESTS-02/05-integration/database-observations.jsonl): 7 supplementary cases.
- [Combined log](raw/RUN-B01-20261002-ROOTTESTS-02/06-all.log): 361 deterministic + 12 integration passed.
- [Lint log](raw/RUN-B01-20261002-ROOTTESTS-02/03-lint.log) and [TypeScript log](raw/RUN-B01-20261002-ROOTTESTS-02/04-typescript.log): exit 0.
- [Post-cleanup verification](raw/RUN-B01-20261002-ROOTTESTS-02/verification_after_cleanup.json).
- [Current evidence manifest](raw/RUN-B01-20261002-ROOTTESTS-02/manifest_after_cleanup.sha256) (E035).

Original capture files remain unchanged. The dated cleanup and post-execution
README-only change are explained in [white_box_evaluation.md](white_box_evaluation.md).
