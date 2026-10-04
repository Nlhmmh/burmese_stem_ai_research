# Assignment 5 — rubric review and Word handoff

Prepared: **4 October 2026, Pacific/Auckland**. Revision: `RUBRIC-REV-01`.

The revised deliverable is [assignment_5_working_paper.md](assignment_5_working_paper.md).
This review and its administrative records are **not paper content**.
No Word document or new evaluation run was requested or created.

## 1. Sources and controlling instructions

Read the complete [instructions](../rubric/instructions.md), all four pages of
the [V3 specifications](../rubric/720_A5_Specifications_V3.pdf), and both pages
of the [marking rubric](../rubric/720_Assignment_5_Rubric.pdf). All six PDF pages
were also rendered and visually inspected to verify table structure, scope,
footnotes and formatting instructions. This was source inspection, not visual
verification of a final Word submission.

| Point | Applied interpretation |
| --- | --- |
| Keywords | Exactly **six**, following the author's explicit confirmation that six is official. V3 p. 3 still says at most five; that is a documented discrepancy, not a reason to remove the sixth keyword or ask again |
| Word counts | Suggested drafting guidance, **not strict limits**, as confirmed by the author. V3 labels its column “Suggested Word Count”. Do not discard substantive evidence to meet earlier artificial exact allocations |
| FURPS scope | Assess Functionality and Usability, as stated in V3 p. 3 and the rubric. Mention the full model but do not invent separate Reliability/Performance/Supportability grades |
| Conceptual methods | GenAI interview, retained academic literature/SLR, informed argument and scenario; independent human expert interview is bonus, not mandatory |
| Design methods | Static, dynamic and optimisation/bounds; simulation; black-box and white-box; informed argument, scenario and academic literature/SLR. Do not relabel bounds as proven educational optimality |
| Results weighting | Use the marking rubric's 30 points/3% description for this review. V3 p. 4 says 2%; the paper does not need to print either weight |
| Submission format | Final `.docx`; the author will create it by copying the Markdown. No DOCX/PDF authoring is part of this revision |
| Deadline wording | The supplied instructions contain AM/PM inconsistency. No on-time submission, extension or Canvas-status claim is made |

## 2. Criterion-by-criterion review

These are content-alignment observations, not a grade prediction or an assertion
that the assessed artefacts are all-pass.

| Rubric criterion | Revised paper locations / changes | Remaining qualification |
| --- | --- | --- |
| Title, Abstract, Keywords — 10 points | Paper now starts with its actual title, not an administrative draft heading. Abstract describes artefacts, methods, mixed findings and limits; motivation qualified as “may need”. Six keywords retained | Final Word counts/styles must be checked after copying; abstract is not a new estimate of learner need |
| Conceptual evaluation — 50 points | §§2.1–2.6 and Tables 1–2 justify the selected framework and each method; coding categories and retained review scope explained; scholarly warrants and counterarguments retained | GenAI is critique, not independent expertise. Historical scenario lacks complete provenance/transitions. Reuse of prior SLR is disclosed, not a new search; C2–C5 remain Partial |
| Design evaluation — 50 points | §§3.1–3.7 and Tables 3–4 cover F/U and all required methods. Added recorded environment/model, expected default routes, assertion types, commands, simulation paths and actual usability matrix. Appendix A gives exact main inquiries | Live/mocked/real-database/browser boundaries remain separate; the appendix is not a complete source/prompt package or a guarantee of identical stochastic outputs |
| Results and interpretation — 30 points | Tables 2 and 4 map each summarised method finding to RQs. Table 3 supplies every F/U outcome and RQ contribution; Table 5 restores problems, requirements, objectives and mechanisms in the PIRQOA chain | All RQs remain Partially supported. “Enabling” results do not establish educational requirement satisfaction; the 225 archive findings are not independent tests |
| Presentation and structure — 5 points | Reader-facing Introduction retained; acronyms introduced; six tables/two figures consistently numbered; archive codes kept outside the paper | Word layout, figure insertion, page breaks and table widths are the author's next checks; no visual-layout pass claimed |
| Referencing and integrity — 5 points | Existing twelve scholarly/coursework references retained; one actually consulted specification handout added. FURPS attribution uses APA secondary citation, not an implied reading of the original Grady/Caswell book. No unread comparator originals inserted | No new full-text appraisal of earlier literature or originality certification; the author should review the final wording and follow applicable course AI-use rules |

The handout reference is institutionally attributed to the University of Auckland
from the supplied document's identification. Its PDF metadata names a creator,
but the displayed handout does not present a personal author. Only the consulted
handout, not the unread original book, is included in References for the secondary
FURPS citation. This preserves the distinction between a course-defined model
scope and primary scholarly warrants for informed argument.

## 3. Word-copy instructions

1. Copy only the content of [the working paper](assignment_5_working_paper.md),
   from its title through the end of Appendix A, which follows References.
   Do not copy
   this handoff record, revision identifiers, evidence registers or verification
   output into the paper.
2. Prefer copying the rendered Markdown so headings, tables, italics and links
   transfer as formatted content. If copying source text instead, remove visible
   Markdown markers and recreate the tables/styles in Word.
3. Confirm that both figures are embedded. If they do not transfer, insert
   [Figure 1 PNG](../03_results/paper_assets/figure_1_framework.png) and
   [Figure 2 reader-facing SVG](assets/figure_2_photosynthesis_reader.svg)
   manually. Keep the captions/notes. Do not insert the older Figure 2 asset
   containing archive identifiers. SVG is the editable vector source; if Word
   cannot insert it, use a high-resolution rendered derivative of this version.
4. If no publication venue has been selected, apply the supplied default:
   Times New Roman; title 16 pt, headings 14 pt, body 12 pt, labels 11 pt,
   table/figure text 10 pt; line spacing 1.5. If a venue has been selected,
   use its official template and name the venue in the header/cover page.
5. Apply APA 7 reference formatting, including italics and hanging indents.
   Preserve exact preprint versions and DOI links. Keep the FURPS secondary
   attribution; do not add the unread original book as though consulted.
6. Inspect table widths, repeated header rows and page breaks; use landscape
   sections or split tables where necessary without losing outcomes/mappings.
   Confirm Burmese glyphs and both figures are legible. If Times New Roman
   lacks Burmese glyphs in your environment, ensure suitable font fallback and
   inspect the saved document rather than replacing the Burmese words.
7. Keep **six** keywords. Use counts as guidance, not a hard cap. Save the final
   file as `.docx` and review that actual file before submission.

## 4. Preservation, verification and status

The [previous reader-facing paper](raw/READER-REV-01-working-paper.md) is
retained with its captured hash. Earlier Phase E and reader-revision captures
are unchanged. The new [revision intake](raw/RUBRIC-REV-01-input.json) records
the three supplied rubric files, user clarifications and preservation hashes.
The [current verification](raw/RUBRIC-REV-01-verification-02.json) checks assembly,
title/abstract/keywords, references, result/mapping coverage, corpus identity,
links, counts and unchanged evidence/production identities. It does not assign
rubric scores or claim semantic equivalence from string checks alone.
The first verification remains a draft-stage capture; verification 02 covers
the final explicit observational-method wording and APA-order placement of
Appendix A after References.

Use `node evaluation/04_paper/raw/check_rubric_revision.mjs` for the current
paper. Prior verifiers describe earlier assemblies and must not be cited as
current-paper validation. The new paper body has its own
[assembly input](raw/RUBRIC-REV-01-body.md).

**Content review against the supplied rubric is recorded, with limits.** The
missing-brief gate is resolved; keywords and suggested counts are settled by
the author's confirmation. Final Word formatting, author approval, any required
AI-use declaration and submission/sharing checks remain. No new test,
provider/database execution, production fix, learning claim or endorsement
of the fresh scenario was created. All 69 registered artefacts, 225 results,
24 traceability chains and 66 production-file identities are preserved.
