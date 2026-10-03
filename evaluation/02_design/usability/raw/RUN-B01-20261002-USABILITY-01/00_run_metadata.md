# Structured usability inspection — run metadata

| Field | Recorded value |
| --- | --- |
| Run / specification | RUN-B01-20261002-USABILITY-01 / A5-USABILITY-01 |
| Protocol | A5-PROTOCOL-01 version 2.1, §5.4; acceptance rules unchanged |
| Date / timezone | 2 October 2026 / Pacific/Auckland (NZDT, UTC+13) |
| Environment start | 2026-10-02T09:58:18.961Z / 22:58:18.961 NZDT |
| First browser observation | 2026-10-02T09:59:06.485Z / 22:59:06.485 NZDT |
| Last browser observation | 2026-10-02T10:20:29.881Z / 23:20:29.881 NZDT |
| Final export / stop requested | 2026-10-02T10:26:57.597Z / 23:26:57.597 NZDT; runner exited 0 |
| Navigation recheck start / end | 2026-10-02T10:36:11.808Z–10:38:26.159Z / 23:36:11.808–23:38:26.159 NZDT; separate addendum metadata; runner exited 0 |
| Evaluator | Codex technical inspection under user direction; AI-assisted, not participant research |
| Language competence declaration | No human native-speaker credential or qualified independent language judgement claimed; visual/interaction observations only |
| Production source | Actual root burmese_stem_ai; B01 commit 37faefa236829aa3d79e023faa1fb72a086b5c2a; 66 production hashes verified unchanged |
| HEAD at capture | 46e307dc58597fa64401e2c4a67104fd227cf263; intentional master-plan/untracked usability evidence changes documented in metadata.json |
| Test/config profile | ROOTTESTS-02; no Vitest/coverage rerun claimed in this inspection |
| Production build ID | IcyjNSC9EIpEI8VngSibk; existing production build, not rebuilt or copied |
| Lock SHA-256 | d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702 |
| Node / npm / MongoDB | v26.4.0 / 11.17.0 / 8.2.6 |
| Browser | Chrome 154.0.8037.97; responsive viewport emulation, not physical phone |
| Viewports / configurations | 1440×900 and 390×844; English/Burmese UI × light/dark = eight combinations |
| Browser origins | http://ui-b01.localhost:55530; fresh identity origin http://ui-isolation.localhost:55530 |
| Isolated database | mongodb://127.0.0.1:55529/burmese_usability_inspection; no production records |
| Provider control | Evaluation preload seam; dummy credential; model name controlled-inspection; 1,500 ms artificial delay; 29 intercepted requests, zero external calls |
| Fixture provenance | Previously recorded SIM01-B/SIM05-B initial outputs; synthetic route/correction/legacy/round/long-content states; not new content-quality evidence |
| Captures | 131 main + two separate navigation-addendum observations = 133 unique IDs, 133 JPEG screenshots and 133 DOM snapshots; original main records and additive note corrections preserved |
| Navigation addendum verification | Back activated by Enter after Medium/Needs Support and selected choice, on desktop/mobile; Stage 6A restored; all 30 persisted sessions unchanged; zero provider requests added |
| Final state verification | 30 artificial sessions within two-round/two-follow-up bounds; 29 owned History links exactly match stored newest-first order; foreign owner excluded |
| Outcomes | U1/U2/U3/U4/U6/U7 Pass; U5/U8/U9 Partial; no Fail; two severity-2 issues and one severity-1 issue retained |
| Preference validation exception | Invalid enum/type cannot be selected through bounded UI; NA/unreachable; no DOM tampering; server evidence separate |
| Other exclusions | Preference-save DB/offline faults; full WCAG/screen-reader/contrast audit; other browsers; touch; participant research; live-model and new qualified content review |
| Privacy | Three text exports redacted: 59 identity-token occurrences replaced with synthetic aliases; redaction hashes/permissions recorded in redaction_record.json |
| Source copies | 0; production source/prompt/database/deployment untouched; only isolated synthetic DB changed |
| Cleanup | Isolated Next/MongoDB processes stopped; temporary synthetic DB retained at /tmp/burmese-usability-SyZHwX; originals stored there under restricted-export-originals (0700 directory, 0600 files) |

## Evidence integrity

`metadata.json` records the pre-execution protocol hash, source identities,
build/environment and starting worktree. Later protocol/master-plan edits only
record execution outcomes; they are not changes to the frozen acceptance rules.
The manifest covers final shareable captures, corrections, export scripts,
analysis/issues, fixture dependencies and real root production hashes. It
excludes itself and mutable protocol/master-plan/evidence-index documents to
avoid circular references. No prior evaluation capture was overwritten.

## Reproduction controls

Run the inspection server from the actual root checkout matching the recorded
66 production hashes, installed lockfile and production build. The evaluation
runner deliberately refuses an existing run directory: a new run needs a new
run ID and captures, not overwriting this evidence. Create a browser session
through the real UI before seeding the named artificial states; inspect through
UI controls with the matrix and keyboard steps in the report. Use a new origin
for empty History and separate synthetic ownership. Remove a controlled provider
fault before explicitly clicking Retry/resubmitting; do not add automatic retries.
Finish by exporting state, stopping the isolated servers and checking source
hashes/History order/bounds. UUIDs and ports may differ; fixture definitions and
acceptance rules must not be changed to force success.
