# Evaluation guide

Start here. Each method has one main Markdown report. System test reports use one integrated case table with action, conditions/inputs, expected result, actual result, outcome, limitation and observation notes/evidence. Exact outputs, screenshots, scholarly warrants and raw records remain supporting evidence. The full GenAI interview and all 55 simulation case records are available inside their reports. Repetition is reduced without replacing substantive evidence with summaries. Exact historical documents also remain archived. Logs, screenshots, CSV/JSON scores, execution scripts, coverage reports and historical manifests remain separate evidence rather than additional reading requirements.

## Reading order

1. [Protocol, baseline, criteria and human verification](00_protocol/evaluation_protocol.md)
2. [Conceptual synthesis](01_conceptual/conceptual_triangulation.md)
3. [Consolidated results and research-question conclusions](03_results/results_interpretation.md)
4. [Working paper](04_paper/assignment_5_working_paper.md)

## One report per evaluation

| Evaluation | Main report |
| --- | --- |
| Conceptual GenAI interview | [GenAI evaluation](01_conceptual/genai/GENAI-01_analysis.md) |
| Conceptual literature | [Literature evaluation](01_conceptual/literature/literature_synthesis.md) |
| Conceptual informed argument | [Informed argument](01_conceptual/informed_argument/traceability.md) |
| Conceptual scenario | [Photosynthesis illustration](01_conceptual/scenario/photosynthesis_scenario.md) |
| Static analysis | [Cases and findings](02_design/static/static_analysis_test_cases.md) |
| Dynamic analysis | [Runtime and manual browser findings](02_design/dynamic/dynamic_analysis.md) |
| Optimization / bounds | [Bounded-state and concurrency findings](02_design/optimisation/bounds_analysis.md) |
| Simulation and content review | [Technical and human content findings](02_design/simulation/simulation_analysis.md) |
| Supplementary bilingual assessment | [Method, findings and interpretation](02_design/simulation/bilingual_assessment/results.md) |
| Black-box | [Public-boundary cases and findings](02_design/black_box/black_box_analysis.md) |
| White-box | [Structural tests and full-project coverage](02_design/white_box/white_box_evaluation.md) |
| Structured usability | [Criteria, observations and open issues](02_design/usability/usability_inspection.md) |
| Design informed argument | [Arguments and literature warrants](02_design/informed_argument/traceability.md) |
| Design literature | [Prior-system and capability comparison](02_design/literature/literature_synthesis.md) |
| Design scenario | [Executed photosynthesis walkthrough](02_design/scenario/photosynthesis_scenario.md) |

FURPS definitions and the baseline/environment are in the protocol, not separate plans. Framework decisions are in conceptual synthesis. Requirement traceability and cross-method interpretation are in consolidated results. Paper revision notes and outdated scaffolds are not current deliverables.

## Archive and recovery

[pre_consolidation_markdown_20261008.zip](archive/pre_consolidation_markdown_20261008.zip) preserves all 162 original Markdown files at their exact paths, including the original standalone GenAI transcript and 55 human-review worksheets (also restored within the main reports), frozen protocols, command logs, source/reference verification, baseline records, conceptual refinements and paper revision history. [consolidation_index.json](archive/consolidation_index.json) records original hashes and current destinations. Entries retain AI provenance and human-confirmation timing; scores/failures were not changed.

The active reading set is 21 Markdown files rather than 162. The reports restore substantive details from the verified originals. Repeated planning checklists, sign-off text and paper revision history remain archive-only. The pre-cleanup documentation commit is 3884b83bd08fad5e4fd4bc0ff3c205469955f037. CSV/JSON evidence and screenshots remain in place. The ZIP freezes the state immediately before cleanup. Older evidence-register hashes may identify earlier Git versions, not this ZIP or rewritten current reports. Use the index for relocated paths and Git history for those earlier captured versions.

Read one original without extracting everything, from the repository root:

```sh
unzip -p evaluation/archive/pre_consolidation_markdown_20261008.zip evaluation/02_design/simulation/human_review/SIM08-B.md
```

For historical validators that require the old directory layout, extract originals into a separate temporary directory and use their captured dependencies. Do not overwrite the consolidated reports. Validate the archive and current navigation with:

```sh
node evaluation/archive/verify_consolidation.mjs
```

This is evidence-preservation/navigation verification, not a new runtime evaluation. No application source copy or new test run was created. Keep restricted learner-cookie captures and other private evidence private; the archive does not grant public-release clearance.

## Submission material

The [working paper](04_paper/assignment_5_working_paper.md), [assignment instructions](rubric/instructions.md) and rubric/specification PDFs are retained. The paper and submission PDF were not rewritten by this consolidation. For new execution or rating changes, use a new run/amendment and retain the original outcome rather than editing historical evidence.
