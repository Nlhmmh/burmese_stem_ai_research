# Draft review — reader-facing revision

Date: 3 October 2026, Pacific/Auckland. Revision: `READER-REV-01`.

The [working paper](assignment_5_working_paper.md) has been revised in response
to the author's three editorial points. This record is supporting administration,
not part of the paper and not a new evaluation result.

## 1. Decisions

1. **Use Introduction.** “Evaluation Context” described the section's function
   but read like an internal evaluation report. The introduction now states the
   research motivation, all three questions, the two artefacts, the application
   workflow and the evaluation scope. This is an author-requested heading
   change, not independently verified compliance with an official brief.
2. **Name the object being discussed.** “This project” and coursework/repository
   shorthand have been replaced by “this study”, “the framework”, “the application”
   or “the evaluation”, according to the actual referent. The top-level draft
   label also omits the coursework number. “This project” is not
   universally prohibited in academic writing; it was unsuitable here because
   the paper did not define what the reader should understand by it.
3. **Make findings self-contained.** Evidence/result/run identifiers have been
   removed from the reader-facing prose, tables and scenario figure. Methods,
   observations, denominators, counterexamples and limitations are described
   directly. Criteria C1–C5, F1–F13 and U1–U9 remain because the paper defines
   every label in its own tables. Research questions are stated in the
   introduction; Section 4.2 is now “Research Question Traceability”.

Tables and captions are labelled paper-only presentation derivatives, not
replacements for the captured figure/table pack or scaffold. Figure 1 remains
the original unchanged framework. The [scenario figure derivative](assets/figure_2_photosynthesis_reader.svg)
retains the original geometry, sequence, numbers and browser/API boundaries,
while replacing archive locators and internal field names with ordinary labels.
It was structurally checked; no rendered Word/PDF inspection is claimed.

## 2. Traceability remains outside the paper

The exact [original Phase E paper](raw/PHASE-E-01-working-paper.md) is retained
with its captured hash. Together with the unchanged results register and
evaluation records, it preserves the original section/claim-to-evidence map.
The [revision body](raw/READER-REV-01-body.md) is the assembly input for the
current paper, not a replacement for the original Phase E narrative.

| Current reader-facing location | Existing archive basis retained |
| --- | --- |
| §1, §2 and Tables 1–2 | Conceptual interview/literature/scenario/refinement E049–E057; current informed argument E058–E060; results R001–R079 |
| §3.1 and Table 3 | Protocol 2.1 criteria; composite F/U judgements R080–R101 |
| §3.2 | Static E001–E003, dynamic E004–E013, bounds E014–E017; R102–R145/R215/R225 |
| §3.3 and delivered-content row of Table 4 | Simulation E018–E023; R198–R205; original researcher endorsement applies only to the previously reviewed outputs |
| §3.4 | Black-box E024–E027/R153–R176/R216–R217; white-box E033–E035/R146–R152 |
| §3.5 and Figure 2 | Design argument E039–E041/R177–R184; fresh scenario E042–E044/R206–R211 |
| §3.6 | Design literature E045–E048/R185–R197/R223 |
| §3.7 and Table 4 usability row | Inspection E036–E038/R093–R101/R212–R214/R218–R221 |
| §4, Table 5 and conclusion | Consolidated results E061–E063; traceability E064–E066; scoped interpretation E067–E068 |

No scholarly reference has been removed or added. The twelve reference entries,
title, abstract and six keywords remain unchanged. Secondary accounts continue
to be attributed to Htet's earlier unpublished review, not unread originals.
The paper summarises their relevance and limits; reading that review is not
required to understand the paper's argument. Full bibliographic verification
and source-access limits remain in the earlier citation strategy/drafting record.

## 3. Preservation and verification

The [revision intake](raw/READER-REV-01-input.json) preserves the original paper
hash, source/evidence hashes, earlier drafting captures and figure identities.
The [current verification](raw/READER-REV-01-verification-02.json) checks current assembly,
the two authorised heading changes, defined criteria, six keywords, citation
correspondence, recorded figures/counts/failures, links and preserved identities.
The original Phase E verifier describes the original assembly; its saved
verification must not be cited as validation of this revision. Use
`node evaluation/04_paper/raw/check_reader_revision.mjs` for the current paper.
The first revision verification is retained as a draft-stage capture; a final
source-label check corrected the quoted third response to “I need more
explanation”. Verification 02 covers that correction and checks all three
quoted labels against the implementation's English locale.

Counts are recomputed for the revised paper in the verification record. They
are local token counts, not Word measurements or official compliance. Unlike
the original 3,050-token narrative figure, the revision's reported body count
includes its condensed table cells and captions/notes, excluding headings.
Do not compare those totals as though they used the same inclusion rule.

Manual editorial review retained: all thirteen Functionality Partial outcomes;
six Usability Pass/three Partial; 55 simulation attempts and 91 output ratings;
the two Burmese/STEM content failures; 24 black-box outcomes and the supplemental
failed ambiguity-round assertion; 373 unique white-box tests and original V8
percentages; indirect counts, contention cost, delayed abort, missing historical
provenance, provisional fresh-scenario content, skipped experts and unassessed
checks. The contention and delayed-abort causes are not newly diagnosed.

All 69 registered evidence artefacts and 66 production-file identities remain
unchanged. No test/provider/database execution, production fix, new human
endorsement or independent source reappraisal occurred. The official brief,
Word/PDF formatting and sharing-package checks remain open.
