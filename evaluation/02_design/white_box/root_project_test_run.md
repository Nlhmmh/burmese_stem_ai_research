# Root-project testing workflow

Dated scope amendment **A5-TEST-SCOPE-20261002-01**, 2 October 2026.
Active run: **RUN-B01-20261002-ROOTTESTS-02** (E033–E035).
Production baseline B01 stays frozen; unit, API, component and integration
tests belong to and execute against the root `burmese_stem_ai` application.
Keep logs, generated reports and hashes—not a duplicate source tree.

From `burmese_stem_ai/`:

```bash
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run lint
npm exec -- tsc --noEmit --incremental false
open coverage/index.html
```

The recorded run passed 361 deterministic and 12 real MongoDB integration
tests. Application-wide V8 coverage is 72.54% statements, 76.37% branches,
64.00% functions and 73.75% lines across 42 file entries. Real database and
browser coverage are separate; coverage is not educational-quality evidence.

See [evaluation and limitations](white_box_evaluation.md),
[execution metadata](00_run_metadata.md), and
[project test instructions](../../../burmese_stem_ai/tests/README.md).
The optional `TEST_EVIDENCE_DIRECTORY` hook exports synthetic integration
snapshots; normal project runs do not write evaluation evidence.

To verify the retained run without executing tests or modifying its metadata:

```bash
node evaluation/02_design/white_box/raw/run_root_project_tests.mjs verify
```

The dated user-requested cleanup removed the superseded source-copy run and
duplicate helpers. The [post-cleanup manifest](raw/RUN-B01-20261002-ROOTTESTS-02/manifest_after_cleanup.sha256)
is the current index; original root captures are unchanged. Preserve previous
black-box/simulation findings. The next task is §18.1 U1–U9 usability inspection.
