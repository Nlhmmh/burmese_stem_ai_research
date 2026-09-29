# B01 Freeze Verification and Evidence Index

## Scope

This index records the baseline-freeze checks performed against a detached,
fresh Git worktree of executable commit
`37faefa236829aa3d79e023faa1fb72a086b5c2a`. These are prerequisite build and
structural-verification records, not the later FURPS, dynamic, simulation,
black-box, white-box, usability, content-quality, or learner results.

No source/configuration change was made between a failed attempt and its rerun.
Failures remain visible below.

## Verification records

| ID | Command/check | Environment | Actual result | Outcome |
| --- | --- | --- | --- | --- |
| `B01-FR-001` | `git worktree add --detach … 37faefa…` | Separate `/tmp/burmese-stem-b01-source` checkout | Detached checkout created at exact source commit | Pass |
| `B01-FR-002` | `npm ci` | Fresh application directory | Exit 0; 501 packages installed from lockfile; deprecation/allow-scripts warnings retained | Pass with warnings |
| `B01-FR-003` | `npm test` | Deterministic mocks/jsdom | Exit 0; 23 files, 208 tests passed | Pass |
| `B01-FR-004` | `npm run test:coverage` | V8, configured service/DAO scope | Exit 0; statements 89.54%, branches 91.33%, functions 91.17%, lines 90.98% | Pass |
| `B01-FR-005` | `npm run lint` | Fresh checkout | Exit 0 | Pass |
| `B01-FR-006` | `npx tsc --noEmit` before Next type generation | Fresh checkout | Exit 2: `app/layout.tsx(47,56): Cannot find name 'LayoutProps'` | Fail; retained environment/order finding |
| `B01-FR-007` | `npm run build -- --webpack` in restricted sandbox | Fresh checkout | Exit 1: DNS lookup for `fonts.googleapis.com` failed for Outfit/Geist Mono | Blocked by restricted network; retained |
| `B01-FR-008` | Same production build with network permitted | Same source and dependencies | Exit 0; compiled, TypeScript completed, 8 static pages generated, route manifest completed | Pass |
| `B01-FR-009` | `npx tsc --noEmit` after production build generated Next types | Same fresh checkout | Exit 0 | Pass |
| `B01-FR-010` | `npm run test:integration` | Temporary isolated MongoDB 8.2.6 | Exit 0; 1 file, 5 tests passed; Mongoose deprecation warnings retained | Pass with warnings |
| `B01-FR-011` | `git status --porcelain=v1` | Fresh checkout after all checks | Empty output; generated/build/coverage artefacts are ignored | Pass |
| `B01-FR-012` | Commit/tree/lock verification | Fresh checkout | Commit `37faefa…`, tree `cfe77d…`, lock SHA-256 `d27ebe…` matched manifest | Pass |
| `B01-FR-013` | Read-only EC2 deployment commit query with strict SSH host-key checking | Documented host | Refused because no trusted ED25519 host key was known | Not assessed; deployment excluded from B01 |

## Coverage interpretation

The V8 percentages cover the files selected by `vitest.config.mts`; they do not
include every API/component source file and do not incorporate the separate
real-MongoDB run. Test pass counts and structural coverage are not measures of
generated-content correctness, Burmese quality, learner experience, learning
gain, retention, mastery, or pedagogical optimality.

## Formal evaluation designation

Subject to the local-only deployment qualification in
[`b01_environment.md`](b01_environment.md), baseline `B01-A5-EVALUATION` is the
single designated source/environment combination for:

- FURPS Functionality and Usability inspection;
- static and dynamic analysis;
- bounds analysis;
- artificial simulation;
- black-box and white-box testing;
- the executable Photosynthesis scenario; and
- structured Chrome desktop/mobile usability inspection.

Every later result must record baseline `B01-A5-EVALUATION`, protocol `2.0`, a
run ID, dependency mode (mock/database/live provider), and evidence locator.
If any frozen input changes, stop, create a new baseline, and rerun affected
cases rather than editing B01 evidence.
