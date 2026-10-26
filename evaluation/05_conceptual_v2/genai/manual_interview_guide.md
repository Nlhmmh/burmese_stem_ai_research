# Copy-paste guide: separate conceptual interview

**Record:** CV2-INT-03

**Baseline:** CA-V2-20261023

**Status:** Completed interview returned on 23 October 2026. This guide preserves the supplied procedure and prompts. See the [complete transcript](manual_transcript.md) and [analysis](interview_analysis.md). The context contains an original transcription error (“intended to supports”); the image was later confirmed to say “indented to supports”. The historical prompt below remains unchanged.

## Before starting

1. Open a new Temporary Chat in ChatGPT, where available.
2. Record the model label and reasoning setting exactly as displayed. If a model version is not displayed, record “not displayed”.
3. Upload these three frozen evaluation copies. They match the supplied v2 files:
   - [v2-concept-1.png](../baseline/artefacts/v2-concept-1.png)
   - [v2-concept-2.png](../baseline/artefacts/v2-concept-2.png)
   - [v2-concept-3.png](../baseline/artefacts/v2-concept-3.png)
4. Paste the context message below and wait for the acknowledgement. Confirm that the reply says all three images are readable before continuing.
5. Paste Q1, wait for the full answer, then repeat through Q9 in the same conversation. Keep the fixed wording. Supply only the images and this context, so earlier evaluation conclusions do not steer the interview.
6. Return the full acknowledgement and all nine answers, with the metadata listed at the end. Responses may be pasted here in several messages labelled by question number.

These are conceptual evaluation questions. They do not request an implementation test, literature search or learner experiment. If a question is not answered, retain the original reply and label any clarification separately.

## Message 1 — Context and acknowledgement

Copy the complete block below after attaching the images.

```text
You are taking part in a structured conceptual-artefact evaluation interview for Information Systems research. Critically evaluate the supplied representations. Do not act as a participant in a learner study or claim to be a human expert. Do not use browsing, external tools, or earlier conversation. Do not invent studies, references, implementation details or observed learning effects. Separate explicit representation, reasonable interpretation, missing detail and proposed improvement.

There will be nine questions asked one at a time. Please answer only the current question. Use clear academic English, normally 200–350 words per answer, identifying relevant artefacts, requirements and criteria. A table may be used where useful. Do not assume that a longer or more complex design is automatically better.

The research concerns LLM-based support for Burmese-speaking STEM learners. The problem is difficult specialised English STEM terminology, limited low-resource language support, and translation or unstructured interaction that may not provide enough conceptual or adaptive help.

Research contract:
REQ-01: Identify specialised STEM terminology and provide context-sensitive Burmese support, preserving English technical terms when appropriate.
RQ1: How can specialized English STEM terminology be supported for Burmese-speaking learners?
Objective 1: Develop an approach for multilingual STEM terminology support.
REQ-02: Provide clear explanations and examples beyond translation.
RQ2: How can LLM-based support help learners understand STEM concepts beyond translation?
Objective 2: Develop an approach for conceptual STEM explanation.
REQ-03: Provide structured and adaptive learner support.
RQ3: How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?
Objective 3: Develop an adaptive scaffolding approach.

The adopted foundations are Task–Technology Fit (alignment of technological capabilities with the learner task) and Scaffolding Theory (responsive temporary educational assistance, reduction of support and transfer of responsibility). No learner experiment, objective learning measure or expert interview is supplied as evidence.

The evaluation criteria are:
C1 Requirement coverage.
C2 Logical coherence.
C3 Theoretical consistency.
C4 Literature consistency, including limits of transfer and unsupported assumptions.
C5 Scenario applicability.
No literature full texts or prior evaluation conclusions are supplied in this interview. Do not pretend that C4 has been established by independent source checking.

Three v2 conceptual-artefact images are attached. The transcription below records their labels and arrows for accessibility. Compare the transcription with the images and report any unreadable or inconsistent part. Assess the represented conceptual content; distinguish it from image-layout observations. Line breaks in the transcription are normalised. No prior evaluation conclusions or proposed edits are supplied.

CA1: LLM-Based STEM Scaffolding Concepts.
Central concept: "LLM-Based STEM Scaffolding".
Five outward arrows from the centre, each labelled "includes":
1. "STEM Terminology Identification"
2. "Context Sensitive Language Support"
3. "Conceptual Explanation", subtitle "Core STEM meaning"
4. "Structured Scaffolding", subtitle "Selectable learning aids"
5. "Adaptive Support", subtitle "Responds to learner-reported need"
The arrows represent membership, not a sequence.

CA2: Task-Aligned LLM Scaffolding Model.
Four constructs:
"Low Resource Language Barrier"
"LLM-Based Scaffolding"
"STEM Understanding", subtitle "Proposed outcome"
"Learner Response", subtitle "Self-reported support need"
Directed relationships:
Low Resource Language Barrier -> STEM Understanding, labelled "hinders".
LLM-Based Scaffolding -> Low Resource Language Barrier, labelled "intended to reduce".
LLM-Based Scaffolding -> STEM Understanding, labelled exactly "intended to supports".
LLM-Based Scaffolding -> Learner Response, labelled "leads to".
Learner Response -> LLM-Based Scaffolding, labelled "guides".
The phrase "intended to supports" above is the exact supplied wording.

CA3: Context-Aware Adaptive STEM Scaffolding Framework.
Seven responsibilities, given reading numbers here although the diagram itself does not number them:
1. "Identify STEM Terminology", no subtitle.
2. "Interpret Technical Context", subtitle "Clarify ambiguity if needed".
3. "Select Language Support", subtitle "Retain useful terms".
4. "Explain STEM Concept", subtitle "Core scientific meaning".
5. "Provide Scaffolding", subtitle "Selectable examples, analogies, hints or reflection".
6. "Collect Learner Response", subtitle "Self-reported support need and optional help choice".
7. "Adapt Support", subtitle "Select, reduce or pause support".
Solid directed arrows:
1 -> 2 "determines"
2 -> 3 "guides"
3 -> 4 "shapes"
4 -> 5 "enables"
5 -> 6 "leads to"
6 -> 7 "guides"
7 -> 5 "updates"
Two dashed directed returns leave Stage 7, under the condition label "if needed":
7 -> 3 "revisit language"
7 -> 4 "revisit core meaning"
No additional arrow, exit state, numerical adaptation cap, software component, assessment score or route table is supplied.

For this first message only: acknowledge the context, list the three artefacts, confirm whether all three attached images are readable, and state the limits of your assessment. Do not answer the nine interview questions yet.
```

## Messages 2–10 — Fixed interview questions

### Q1

```text
Question 1 of 9 — Requirement coverage (C1).
Do the three conceptual artefacts jointly address REQ-01–REQ-03 and RQ1–RQ3? Identify the explicit mechanisms for each requirement, any missing coverage and any coverage that depends on interpretation rather than supplied text. Distinguish representing a design response from demonstrating that it solves the learner problem.
```

### Q2

```text
Question 2 of 9 — Logical coherence (C2).
Examine consistency between the concept definitions, relationship model and seven-responsibility process. Are the directed relationships, stage boundaries and feedback routes coherent? Identify strengths, contradictions, ambiguous dependencies or unreasonable assumptions, with reasons tied to the supplied representation.
```

### Q3

```text
Question 3 of 9 — Theoretical consistency (C3).
Evaluate the artefacts against the stated Task–Technology Fit and Scaffolding Theory foundations. Which mechanisms are consistent with each foundation, and which theoretical properties are absent or cannot be established? Distinguish task alignment from measured fit and learner responsiveness from evidence of educational effects.
```

### Q4

```text
Question 4 of 9 — Completeness and redundancy (C1, C2).
Are important conceptual responsibilities missing, duplicated or unnecessarily separated? Consider whether the three artefacts complement one another and whether their current decomposition is defensible. Explain any alternative or clarification you recommend without assuming that another stage, construct or feature is required.
```

### Q5

```text
Question 5 of 9 — Decisions and adaptive control (C2, C3).
Locate the decision responsibilities in language support and adaptation. What information is available, which choices are represented, and what conditions govern those choices? Consider both an optional help choice being provided and being skipped. Which decision details belong in a conceptual explanation, and which can reasonably remain in system design?
```

### Q6

```text
Question 6 of 9 — Scenario applicability (C5).
Use this constructed situation, not participant data: a Burmese-speaking learner asks about photosynthesis, requests Burmese explanation with useful English terms retained, then reports continued need. Consider alternative requests for another example, language help and core-meaning clarification, followed separately by a report of no further help needed. Trace what the supplied process can represent, state necessary assumptions, and identify limits. Also consider whether your conclusion changes if the intended technical meaning was ambiguous or later found to be wrong. Do not invent actual outputs, reactions or learning results.
```

### Q7

```text
Question 7 of 9 — Risks, limitations and claims (C1–C5).
What are the most consequential remaining risks or unsupported assumptions in these artefacts? Evaluate the wording of the proposed relationships and the use of self-reported need. Distinguish a presentation-level wording issue, a conceptual decision gap and an empirical limitation. Prioritise the concerns with reasons; do not invent probabilities or observed failures.
```

### Q8

```text
Question 8 of 9 — Focused improvements (C1–C5).
Recommend proportionate refinements supported by your assessment. State what should be retained, clarified, changed, rejected or deferred to later evaluation. Keep the stated research scope and distinguish conceptual refinements from implementation rules or future empirical studies. Do not assume any recommendation is already present in the supplied v2 representations.
```

### Q9

```text
Question 9 of 9 — Final structured judgement (C1–C5).
Provide a table with criterion, judgement, main evidence, main limitation and confidence described qualitatively. Use Supported, Supported with qualification, Partly supported, Not resolved or Not applicable as appropriate. C4 must reflect the absence of source texts or independent literature checking in this interview. Then state the overall conceptual conclusion, three main strengths, three main remaining concerns, and what further evidence would justify stronger claims. Do not present agreement within this conversation as independent validation.
```

## What to return

Paste the complete text, rather than a summary. Include:

- Interview date and approximate start/end time, with timezone.
- Model label and reasoning setting exactly as displayed, or “not displayed”.
- Whether Temporary Chat was used: yes, no or unknown.
- Whether all three images were uploaded and confirmed readable.
- Whether any browsing/tool use occurred; report what happened rather than assume it was disabled.
- The acknowledgement, Q1–Q9 answers, and any errors, retries or clarification messages.

[Optional return template](user_return_template.md). The fixed prompts are also available as [plain context text](raw/manual_context.txt) and [question JSON](raw/questions.json).

## Recording and analysis

The returned words will be preserved as the interview evidence before coding or summarising. The final findings will be compared with literature, informed argument and scenarios. Agreement within one interview is not independent validation. Exact model versions, timestamps or image inspection will not be inferred if they are missing.

The earlier browser attempt, CV2-INT-02, produced loading errors and no substantive answers. The initial desk critique remains supplementary analysis. Neither is a completed substitute for this interview.
