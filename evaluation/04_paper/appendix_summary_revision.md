# Reader-facing appendix summary revision

Revision `APPENDIX-SUMMARY-01`, 5 October 2026, Pacific/Auckland.

The [working paper](assignment_5_working_paper.md) now summarises evaluation
activities and illustrative observations instead of reproducing the complete
case registers. The preceding paper remains recoverable from commit
`aaf8eca0129e1191eb43b2a8b0478baf43ad7183`. No source-copy tree or new evaluation
run was created.

## What changed

| Appendix | Reader-facing treatment |
| --- | --- |
| A | Fixed inquiries, supplementary inputs and three paths retained unchanged |
| B | Analytical scope, findings, timing summary and selected runtime/boundary observations |
| C | Technical totals, original content rubric/totals, examples across support paths and focused bilingual findings. Exact English/Burmese excerpts remain |
| D | Public-interface behaviour grouped by task, with Partial/Fail and retained subchecks distinguished |
| E | Six structural areas and four coverage metrics. Individual test filenames and the 373-row inventory omitted from the paper |
| F | Nine usability outcomes, observed examples and three material issues, with scope/unassessed checks retained |
| G | Integrated scenario actions, browser/API boundaries and provisional content limitations |
| H | Conceptual evaluation activities, literature-backed design arguments and literature-comparison summary |
| I | Removed from the paper. Main Table 5 and Tables 2–4 already supply research-question/requirement mapping |

Removing detailed paper rows did not delete underlying evidence. The original
69 indexed records, 225 master-result rows, 24 traceability relationships,
simulation scores and raw outputs remain unchanged. The complete test inventory
and detailed language-annotation ledger remain in their existing evaluation
records. The prior appendix generators and verification captures describe
their earlier assemblies, not the current shortened paper.

## Preserved assessment boundaries

- Simulation still has 55 attempts, with 44 technical Pass, eight controlled
  initial ambiguities and three technical Fail.
- Original content still has 91 outputs, with 18 Pass, 71 Partial and two Fail.
- Supplementary bilingual assessment still has 32 outputs, 104 paired passages,
  four Major and 27 Minor annotations, and ten shared-content advisories.
  It remains model-assisted and exploratory, not a newly verified human review.
- The pH passage-level Major annotation does not replace the original Partial
  output rating. Two gravity annotations are one previously failed output.
- Black-box results remain 21 Pass, two Partial and one Fail across 24 cases.
  Retained failed subchecks and unassessed fixture novelty are not erased.
- White-box testing retains 373 unique tests and 39 included route/round
  combinations. Coverage is not content-quality or learner-effectiveness evidence.
- Usability retains six Pass and three Partial, without becoming a participant
  study or full accessibility audit. Scenario content remains provisional.

## Verification and handoff

The [editorial helper](raw/build_appendix_summaries.mjs) derives the short
assembly from the committed preceding paper and saved bilingual annotations.
Its [verification](raw/APPENDIX-SUMMARY-01-verification.json) checks exact paired
excerpts against persisted text, table references/column counts, Appendix A,
main tables, abstract/keywords/references and original evidence/production
identities. This is document reconciliation, not a new application test or
independent semantic assessment.

The appendices contain 20 tables, plus five main tables. The approximate local
appendix count decreased from 29,478 to 3,361 words, including table text but
excluding headings. Appendices remain supplementary and separate from the
Design Evaluation prose count. Abstract remains 150 words, Design Evaluation
approximately 1,133 prose words and Results/Interpretation approximately 776.
Microsoft Word counting and layout may differ.

Copy the complete paper through the end of Appendix H. The bilingual-example
table may need landscape orientation or sensible column widths. Check Burmese
font fallback, repeated headers and embedded figures in the final DOCX. No
Word/PDF layout, submission or release clearance is claimed.
