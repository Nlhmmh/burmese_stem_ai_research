# Conceptual evaluation protocol — iteration 2

**Protocol:** CA-V2-PROTOCOL-01

**Baseline:** CA-V2-20261023

**Date:** 23 October 2026, Pacific/Auckland

## Purpose and selection

The purpose is to assess whether the refined conceptual artefacts address the research requirements and the concerns recorded in iteration 1. All three are selected because they serve complementary roles: concepts define the support, the relationship model expresses its proposed rationale, and the seven-stage framework describes its operation. The framework remains the main behavioural evaluation target. Assessing the other two prevents contradictions between definitions, relationships and process.

Evaluation concerns the exact supplied files:
- `artefacts/conceptual/v2-concept-1.png`
- `artefacts/conceptual/v2-concept-2.png`
- `artefacts/conceptual/v2-concept-3.png`

[The register](../baseline/artefact_register.md) records their visible labels and arrows. [The manifest](../baseline/manifest.json) records SHA-256 identities, dimensions, file sizes, comparison images and supporting documents. Frozen copies preserve the evaluated versions. No image edits form part of this episode.

## Research contract

| Requirement | Research question | Objective |
| --- | --- | --- |
| REQ-01: Identify specialised STEM terminology and provide context-sensitive Burmese support, preserving English technical terms when appropriate | RQ1: How can specialized English STEM terminology be supported for Burmese-speaking learners? | Develop an approach for multilingual STEM terminology support |
| REQ-02: Provide clear explanations and examples beyond translation | RQ2: How can LLM-based support help learners understand STEM concepts beyond translation? | Develop an approach for conceptual STEM explanation |
| REQ-03: Provide structured and adaptive learner support | RQ3: How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners? | Develop an adaptive scaffolding approach |

The questions and objectives come from Assignment 2, Table 4. Assignment 3 establishes the adopted artefact names and Task–Technology Fit plus Scaffolding Theory. Earlier proposal names in PIRQOA do not require six separate conceptual diagrams. The three adopted artefacts jointly address the three requirements.

## Criteria

| Criterion | Evaluation question | Decision evidence |
| --- | --- | --- |
| C1 — Requirement coverage | Do the concepts, relationships and process assign responsibilities for all three requirements? | Explicit elements, PIRQOA mapping and omissions |
| C2 — Logical coherence | Are meanings, arrows, stage boundaries, feedback destinations and decision responsibilities coherent? | Diagram inspection, counterarguments and branch walkthroughs |
| C3 — Theoretical consistency | Is task alignment defensible, and are responsiveness, fading and transfer distinguished from self-report? | Theory warrants and limits |
| C4 — Literature consistency | Do relevant studies support the design rationale, with transfer limits and unsupported assumptions identified? | Existing review, targeted primary-source checks and literature matrix |
| C5 — Scenario applicability | Can the design represent a normal learning interaction and relevant difficult cases without adding undocumented capabilities? | Constructed photosynthesis and ambiguity cases |

These are the C1–C5 names in the existing protocol. The original interview and scenario used a different C4, concerning completeness/boundaries. Their historical ratings are not directly compared as if the definitions matched.

## Methods and procedure

1. Freeze the three v2 images and identify the v1 comparison files.
2. Transcribe visible elements. Separate image evidence, interpretation and proposed additions.
3. Apply nine critical interview questions covering the same broad topics as iteration 1, expanded to all three artefacts. Preserve the complete question-and-answer record. Do not manufacture an external conversation, participant quotations or a fresh independent session.
4. Reappraise the existing 17-study review and its 18-row conceptual literature matrix against the changed elements. Consult selected primary sources for key warrants and record successful access and failures. This is not a new systematic search, new screening exercise or new 17-paper full-text review.
5. Develop ten informed arguments with requirements, scholarly warrants, mechanisms, removal tests and counterarguments.
6. Walk through ten deliberately constructed cases. Record the supplied scenario condition, expected responsibility, visible route, additional assumptions and judgement.
7. Triangulate findings, compare earlier decisions and map conclusions to RQ1–RQ3.
8. Verify input hashes, record counts, internal evidence references and local document links.

This episode is formative and artificial: its purpose is to find remaining conceptual weaknesses before final reporting. The distinction follows Venable et al. (2016). It does not supply naturalistic learner-use evidence.

## Judgement rules

| Label | Meaning |
| --- | --- |
| Supported | An explicit element or reasoned mechanism meets the stated conceptual criterion within the defined scope |
| Supported with qualification | The design is defensible, but an assumption, transfer limit or unresolved condition remains |
| Partly supported | Relevant elements exist, but a material part of the criterion remains underspecified |
| Not resolved | The representation and available evidence cannot establish the requested capability or outcome |
| Not applicable | The claim is outside this conceptual evaluation |

Scenario judgements use **Representable**, **Partly specified** and **Not resolved**. They describe what the conceptual representation permits or leaves open; they are not technical Pass/Fail results.

Earlier decisions use **Addressed**, **Partly addressed**, **Scope retained** or **Boundary retained**. Addressed means the requested conceptual clarification is visible, not that the resulting educational mechanism has been validated.

No numerical score, average across methods, significance test or percentage improvement is calculated. Method agreement is examined claim by claim. Repeated use of one source or scenario is not counted as additional independent evidence.

## Evidence boundaries

- A visible label or arrow can establish explicit representation. It cannot establish implementation, linguistic quality or learner benefit.
- Interpretations needed to apply a diagram are stated. Recommended additions are not silently treated as already present.
- A selected help type gives a more specific request; it does not diagnose competence or a misconception.
- Reducing or pausing help in response to reported need is a design option, not demonstrated calibrated fading or transfer.
- Seven responsibilities do not imply seven provider calls or uniquely necessary stages.
- Exact route tables, database state, two-round limits and interface behaviour belong to system design/evaluation. They are not imported to fill gaps in these images.
- Earlier system evidence may motivate a concern but is not a new result about this v2 baseline.
- No human expert interview, participant study, independent language assessment or learning experiment is claimed.

## Assignment alignment

The supplied [Assignment 5 instructions](../../rubric/instructions.md), specifications and rubric require conceptual artefact selection, transparent criteria/results, an interview-based critique, academic literature, informed argument, a descriptive scenario and PIRQOA linkage. The four method records in this folder address those conceptual components. The interview-based critique is reported under a neutral method heading; it is not presented as human or independent testimony. The assignment's optional expert-interview bonus is not claimed.

Hevner et al. (2004) provides the general evaluation taxonomy. The course specifies the interview adaptation; it is not a separate method named in the original taxonomy. FURPS and executable testing apply to system artefacts and remain in the existing system evaluation.

The supporting reports are more detailed than the suggested paper section length. A concise synthesis can be used in the final paper, with these records retained as supporting evidence. Completing these records does not certify a grade.

## Reproduction and change control

Use the frozen snapshots and the exact transcriptions, apply the criteria and fixed questions, inspect the cited source locators, and follow each scenario condition through the arrows. Reproduction means the reasoning is inspectable; identical qualitative judgements are not guaranteed.

Run the document checks from the repository root:

```sh
python3 evaluation/05_conceptual_v2/raw/verify_evaluation.py
git diff --check
```

The checker verifies documentation structure and evidence identities. It does not validate scientific content or educational effectiveness. A changed image requires a new baseline or an explicitly documented amendment and affected-claim reappraisal.

References and access limits: [source record](../literature/source_access_and_references.md).

