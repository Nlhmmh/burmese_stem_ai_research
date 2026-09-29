# INFOSYS 720 Assignment 5 — Complete Evaluation Plan

> **Historical planning version:** Retained unchanged as a provenance source for
> the original evaluation design. Its terminology predates the refined Stage
> 6A/6B implementation and must not be used as the current software test oracle.
> Use
> [`INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md`](INFOSYS_720_Assignment_5_Complete_Plan_UPDATED.md)
> with evaluation protocol `A5-PROTOCOL-01` version 2.0. In particular, High now
> persists a fade response event without generation or a round increment.

## Purpose of This Plan

This document is a **working execution guide** for completing **INFOSYS 720 Assignment 5: Evaluate Information Systems Artefacts**.

It is **not** the final Assignment 5 paper. Its purpose is to guide the evaluation work step by step so that the final paper can later be written from **real, recorded evidence** rather than assumptions.

The plan is based on:

- Assignment 5 specifications;
- Assignment 5 marking rubric;
- Assignment 2 SLR and SSR findings;
- Assignment 3 theoretical foundation and conceptual artefacts;
- Assignment 4 system artefacts and Burmese STEM AI proof of concept.

The central rule for the whole assignment is:

> **Define the evaluation criteria first, execute the evaluation, preserve the evidence, and only then write the findings.**

---

# 1. Assignment 5 Goal

Assignment 5 covers the **Evaluation phase** of the Information Systems Research process.

The assignment must evaluate whether the selected conceptual artefact(s) and the executable proof-of-concept system address the research problems and requirements established through the PIRQOA.

The evaluation should be:

- systematic;
- transparent;
- traceable to PIRQOA;
- reproducible where applicable;
- honest about limitations;
- based on recorded evidence;
- careful not to overclaim educational effectiveness.

The Assignment 5 specification requires evaluation methods based on **Hevner et al. (2004)** and system-quality evaluation using **FURPS**, with the marking scheme focusing on **Functionality** and **Usability**.

---

# 2. Marking Structure and Target

## 2.1 Title, Abstract, and Keywords — 10 marks

Requirements:

- Title: **maximum 10 words**
- Abstract: **maximum 150 words**
- Keywords: **maximum 5**
- These must be revised to reflect:
  - the evaluation performed;
  - the main findings;
  - the evaluated artefacts.

### Execution note

Do **not** finalize the abstract before the evaluation is complete.

The abstract should be one of the final parts written because it must summarize actual findings rather than planned evaluation.

---

## 2.2 Conceptual Artefact Evaluation — 50 marks

Suggested length: **800–1200 words**

The Excellent-band rubric requires:

1. **Observational — GenAI Interview**
2. **SLR — Academic Literature**
3. **Descriptive — Informed Argument**
4. **Descriptive — Scenario**
5. **Optional Observational — Human Expert Interview** for bonus marks

The evaluation should make the following transparent:

- why the conceptual artefact was selected;
- what evaluation criteria were used;
- how each method was executed;
- what evidence was collected;
- what the results were;
- how the results relate to PIRQOA and RQ1–RQ3.

---

## 2.3 Design Artefact Evaluation — 50 marks

Suggested length: **800–1200 words**

The executable proof-of-concept system must be evaluated using:

### FURPS

Focus on:

- **Functionality**
- **Usability**

### Required Hevner et al. evaluation methods

1. **Analytical**
   - Static analysis
   - Dynamic analysis
   - Optimisation / bounds analysis
2. **Experimental**
   - Simulation
3. **Testing**
   - Black-box testing
   - White-box testing
4. **Descriptive**
   - Informed argument
   - Scenarios
5. **SLR**
   - Academic literature
6. **Optional Observational**
   - Human expert interview for bonus marks

The Excellent-band rubric also emphasizes that the evaluation process, criteria, and results should be **transparent and replicable**.

---

## 2.4 Results and Interpretation — 30 marks

Suggested length: **500–750 words**

This section must:

- present results clearly;
- use tables and figures where useful;
- explain what the evidence supports;
- explain what the evidence does **not** support;
- avoid overclaiming;
- map each important result to:
  - research problem;
  - issue;
  - requirement;
  - RQ;
  - evaluated artefact;
- determine whether the artefacts address the stated research problem.

---

## 2.5 Presentation and Referencing — 10 marks

The final submission should have:

- clear section hierarchy;
- consistent terminology;
- clear figure and table labels;
- strong flow;
- professional visual layout;
- APA 7 referencing;
- academic tone;
- no unsupported claims;
- no fabricated references;
- original analysis.

---

# 3. Current Research Context

## 3.1 Research problem

The research addresses difficulties faced by **Burmese-speaking STEM learners** when specialized English STEM terminology, limited localized language resources, and unfamiliar technical concepts occur together.

The intended solution is not a generic translator or unrestricted chatbot.

It is an **adaptive LLM-based educational Information System** that provides:

- terminology-sensitive support;
- technical-context interpretation;
- context-sensitive Burmese/English support;
- conceptual explanation;
- structured scaffolding;
- learner-response-driven adaptation;
- controlled follow-up;
- persistent learning sessions.

---

## 3.2 Current theoretical foundation

Use the **current Assignment 3 / Assignment 4 theoretical foundation**.

### Primary Information Systems theory

**Task–Technology Fit (TTF)**

TTF is used to examine whether technology capabilities fit the learner tasks and research requirements.

Current study-specific fit dimensions:

- **language-support fit**;
- **conceptual-support fit**;
- **adaptive-interaction fit**.

### Complementary educational theory

**Scaffolding Theory**

Important characteristics:

- structured support;
- learner-responsive assistance;
- contingency;
- fading.

Use **van de Pol et al. (2010)** when discussing contingency and fading.

### Important note about Assignment 2

Assignment 2 used Scaffolding Theory and CTML at that stage of the research. Later assignments refined the theoretical foundation to **TTF + Scaffolding Theory**.

For Assignment 5:

- use Assignment 2 mainly as the **SLR/SSR evidence base**;
- use Assignment 3 and Assignment 4 as the authoritative current theoretical/design foundation;
- do not reintroduce CTML as a central theory unless there is a deliberate reason.

---

# 4. PIRQOA Traceability to Preserve

## 4.1 RQ1 — Terminology and Language Support

### Problem / issue

Insufficient terminology and language support.

### Requirement

Identify specialized STEM terminology and provide context-sensitive Burmese support while preserving useful English technical terms when appropriate.

### Research question

**How can specialized English STEM terminology be supported for Burmese-speaking learners?**

### Objective

Develop multilingual STEM terminology support.

---

## 4.2 RQ2 — Conceptual Support

### Problem / issue

Translation alone may not provide sufficient conceptual support.

### Requirement

Provide clear explanations and examples beyond direct translation.

### Research question

**How can LLM-based support help learners understand STEM concepts beyond translation?**

### Objective

Develop an approach for conceptual STEM explanation.

---

## 4.3 RQ3 — Structured and Adaptive Scaffolding

### Problem / issue

Insufficient structured and adaptive scaffolding.

### Requirement

Provide structured and adaptive learner support.

### Research question

**How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?**

### Objective

Develop an adaptive scaffolding approach.

---

# 5. Artefacts to Evaluate

## 5.1 Primary conceptual artefact

Use:

## Context-Aware Adaptive STEM Scaffolding Framework

This should be the main conceptual artefact evaluated in Assignment 5.

### Why this artefact is the best choice

Assignment 3 created three complementary conceptual artefacts:

1. LLM-Based STEM Scaffolding Concepts
2. Task-Aligned LLM Scaffolding Model
3. Context-Aware Adaptive STEM Scaffolding Framework

Their progression is:

> **definition → relationships → behaviour**

Artefact 3 is the strongest primary evaluation target because it brings the earlier concepts and relationships together into an operational process.

It also spans all three research questions.

### Framework stages

The framework should be evaluated as a sequence:

1. **Identify STEM Terminology**
2. **Interpret Technical Context**
3. **Select Language Support**
4. **Explain STEM Concept**
5. **Provide Scaffolding**
6. **Collect Learner Response**
7. **Adapt Support**

The framework includes a feedback relationship in which learner response guides subsequent scaffolding.

### Supporting conceptual artefacts

Artefacts 1 and 2 should still be referenced where relevant.

- Artefact 1 helps evaluate whether the framework includes all required concepts.
- Artefact 2 helps evaluate the learner-response/adaptation relationship.
- Artefact 3 remains the main evaluated conceptual artefact.

Do not attempt three separate full conceptual evaluations unless there is a specific reason. That would dilute the limited word count.

---

## 5.2 Primary design artefact

Use:

## Burmese STEM AI Proof-of-Concept System

This is the executable system artefact that should be evaluated using FURPS and the required Hevner et al. methods.

Important implemented functionality includes:

- natural-language STEM questions;
- terminology/context identification;
- Burmese/English explanation;
- simple explanation;
- real-world example or analogy;
- technical explanation;
- reflective prompt;
- hint;
- self-reported learner understanding;
- adaptive scaffolding;
- contingency/fading behaviour;
- maximum two adaptation rounds;
- concept-scoped follow-up;
- learner preferences;
- session persistence;
- Learning History;
- Review/Resume;
- anonymous learner persistence;
- application-controlled state and workflow.

---

# 6. Evaluation Philosophy

Before executing tests, distinguish between the kinds of claims being evaluated.

## 6.1 Conceptual validity

Question:

> Is the conceptual framework coherent, theoretically grounded, supported by literature, traceable to PIRQOA, and usable as a design guide?

Evidence can come from:

- literature;
- GenAI critique;
- informed argument;
- scenario walkthrough;
- optional expert feedback.

---

## 6.2 Functional correctness

Question:

> Does the implemented PoC actually perform the specified behaviours?

Evidence can come from:

- black-box tests;
- white-box tests;
- simulation;
- state-transition inspection;
- screenshots;
- logs.

---

## 6.3 Usability

Question:

> Is the interaction structure understandable and usable at the PoC level?

Without human usability testing, this should be framed as:

- structured usability inspection;
- scenario-based usability assessment;
- interface consistency evaluation.

Do not claim measured user usability without real human participants.

---

## 6.4 Technical feasibility

Question:

> Is the system technically implementable and internally consistent?

Evidence can include:

- static analysis;
- production build;
- runtime execution;
- persistence;
- deployment;
- state logic;
- structured LLM contract;
- timing results.

---

## 6.5 Educational effectiveness

This is **not established** by the current PoC evaluation unless actual learner learning outcomes are evaluated appropriately.

Do not claim:

- improved learning outcomes;
- increased STEM achievement;
- better retention;
- objective understanding.

The system's understanding choices are **self-reported understanding**, not measured learning performance.

---

# 7. Step 1 — Freeze the Evaluation Baseline

Before testing, define exactly what version is being evaluated.

## 7.1 Freeze the conceptual artefact

Use the final submitted Assignment 3 version of:

**Context-Aware Adaptive STEM Scaffolding Framework**

Save:

- diagram;
- stage definitions;
- related PIRQOA mapping;
- current theoretical basis.

Do not silently change the framework during evaluation.

If the evaluation identifies an improvement, document it as an evaluation finding rather than editing the artefact first and pretending the issue never existed.

---

## 7.2 Freeze the PoC version

Create a fixed Git commit/tag or record the current commit hash.

Suggested commands:

```bash
git status
git rev-parse HEAD
```

Record:

- commit hash;
- date/time;
- application version if used;
- Node version;
- relevant environment;
- deployed URL;
- model/API configuration at a high level;
- database version;
- test configuration.

Do not store secrets or API keys in the evidence.

---

## 7.3 Create an evaluation evidence folder

Recommended structure:

```text
evaluation/
├── 00_protocol/
│   ├── evaluation_protocol.md
│   ├── environment.md
│   └── artefact_versions.md
│
├── 01_conceptual/
│   ├── genai/
│   │   ├── prompt.md
│   │   ├── full_response.md
│   │   └── analysis.md
│   ├── literature/
│   │   ├── literature_matrix.csv
│   │   └── synthesis.md
│   ├── informed_argument/
│   │   └── traceability.md
│   └── scenario/
│       └── photosynthesis_scenario.md
│
├── 02_design/
│   ├── static/
│   ├── dynamic/
│   ├── optimisation/
│   ├── simulation/
│   ├── black_box/
│   ├── white_box/
│   ├── usability/
│   └── scenario/
│
├── 03_results/
│   ├── master_results.csv
│   └── pirqoa_traceability.csv
│
└── 04_expert/
    └── interview_notes.md
```

---

# 8. Step 2 — Define Evaluation Criteria Before Testing

Do not create criteria after seeing results.

Create a protocol first.

---

# 9. Conceptual Artefact Evaluation Criteria

Use five main criteria.

## C1 — PIRQOA Coverage

Question:

> Does the framework address the requirements underlying RQ1, RQ2, and RQ3?

Check whether it contains functions for:

- terminology identification;
- context interpretation;
- language-support selection;
- conceptual explanation;
- structured scaffolding;
- learner response;
- adaptation.

### Outcome scale

- Fully supported
- Partially supported
- Not supported
- Concern identified

---

## C2 — Logical Coherence

Question:

> Is the sequence of stages logically coherent?

Evaluate relationships such as:

- terminology identification before technical interpretation;
- context before language-support selection;
- language support before/with explanation;
- explanation before learner-facing scaffolding;
- learner response before adaptation;
- adaptation feeding back into subsequent support.

Check for:

- missing dependencies;
- unnecessary stages;
- circular logic;
- ambiguous decision points.

---

## C3 — Theoretical Consistency

Question:

> Is the framework consistent with TTF and Scaffolding Theory?

### TTF

Do system-support concepts correspond to actual learner tasks?

- language-support fit;
- conceptual-support fit;
- adaptive-interaction fit.

### Scaffolding

Does the adaptation logic represent:

- learner-responsive support;
- contingency;
- fading?

Important:

Do not interpret self-reported High understanding as proven competence.

---

## C4 — Literature Consistency

Question:

> Are the major framework stages supported by the SLR/SSR evidence?

Use Assignment 2 literature as the main evidence base.

Evaluation should distinguish:

- direct supporting evidence;
- indirect/transferable support;
- limitation/context mismatch;
- unsupported assumptions.

---

## C5 — Scenario Applicability

Question:

> Can the framework guide a realistic STEM-learning interaction from initial inquiry to adaptive support?

Use the Photosynthesis scenario.

Check whether every stage can be instantiated and whether the sequence remains coherent.

---

# 10. Step 3 — Conceptual Evaluation Method 1: GenAI Interview

## 10.1 Purpose

Use GenAI as an **observational critique source**, not as proof that the conceptual framework is correct.

The goal is to obtain an independent structured critique against fixed criteria.

---

## 10.2 Use a clean conversation

Start a new conversation with the chosen GenAI model.

Do not rely on a conversation that already knows the project.

Record:

- model name;
- date;
- platform;
- exact prompt;
- exact artefact description;
- complete response.

---

## 10.3 Information to give the GenAI

Provide only what is necessary:

1. research problem;
2. RQ1–RQ3;
3. PIRQOA requirements;
4. current theories:
   - TTF;
   - Scaffolding Theory;
5. framework stages;
6. relationship/feedback loop;
7. evaluation criteria C1–C5.

---

## 10.4 Recommended interview questions

Ask fixed questions such as:

1. Does the framework cover the three research requirements? Identify missing or weak coverage.
2. Is the sequence of stages logically coherent? Explain dependencies.
3. Are any stages redundant or underspecified?
4. Is the learner-response → adaptation loop consistent with contingency and fading?
5. Does the framework maintain a clear distinction between language support and conceptual support?
6. Are the framework's decision points sufficiently clear?
7. Can the framework support a realistic STEM-learning scenario?
8. What are the three most important conceptual risks or limitations?
9. What changes, if any, would strengthen the framework without expanding its intended scope?
10. Give an overall evaluation against C1–C5, but do not treat your own judgment as empirical proof.

---

## 10.5 Preserve evidence

Save:

```text
genai_prompt.md
genai_full_response.md
```

Do not edit the raw response.

Create a separate analysis file.

---

## 10.6 Analyse the GenAI response

Create a coding table:

| Finding ID | Criterion | GenAI observation | Classification | Researcher interpretation |
|---|---|---|---|---|
| G01 | C1 | ... | Support / Concern | ... |
| G02 | C2 | ... | Support / Concern | ... |

Use categories:

- **Support**
- **Concern**
- **Suggested improvement**
- **Out of scope**

Do not simply quote the AI response in the final paper.

Synthesize it.

---

## 10.7 Limitation statement

The final paper should explicitly recognize that a GenAI interview:

- provides structured critique;
- is not independent empirical validation;
- may reproduce patterns from training data;
- should be triangulated with literature, informed argument, scenario evidence, and optionally expert feedback.

---

# 11. Step 4 — Conceptual Evaluation Method 2: SLR Academic Literature

## 11.1 Main evidence source

Use Assignment 2 as the main literature base.

Assignment 2 contains:

- **17 SLR studies**;
- **4 main themes**;
- **12 sub-themes**;
- a coverage heatmap;
- an SSR of **5 implemented systems**;
- the original research gap and PIRQOA.

The four SLR themes are:

1. low-resource and multilingual language barriers;
2. LLM-based translation and terminology support;
3. educational scaffolding and personalized learning;
4. system design and prompt engineering.

---

## 11.2 Literature-to-framework evaluation matrix

Create a table like:

| Framework stage | Key source(s) | Evidence from A2 | What it supports | Limitation |
|---|---|---|---|---|
| Identify STEM Terminology | Tran et al. (2026) | ATE distinguishes specialized domain terms | Need to identify terminology before targeted support | ATE literature does not itself define pedagogy |
| Interpret Technical Context | He et al. (2025) | Meaning depends on instructional/cross-cultural context | Context-sensitive interpretation | Different target setting |
| Select Language Support | Kleidermacher & Zou (2026) | Some technical terms may be better retained in English | Selective English-term preservation | Scientific translation context |
| Explain STEM Concept | Athukorala & De Silva (2025); Kuzu (2026) | Native-language/structured support can facilitate conceptual learning | Explanation beyond translation | Different languages/domains |
| Provide Scaffolding | Kuzu (2026); Wood et al. (1976) | Structured interaction and tutoring support | Structured assistance | Does not directly validate Burmese PoC |
| Collect Learner Response | Kuzu (2026); Nair et al. (2026) | Interactive/personalized learning | Learner-responsive interaction | Learner response type differs |
| Adapt Support | Nair et al. (2026); van de Pol et al. (2010) | Personalized feedback; contingency/fading | Adaptive assistance | Does not prove current adaptation policy is optimal |

---

## 11.3 Important Assignment 2 findings to reuse

### Low-resource language support

Assignment 2 found:

- low-resource languages can have weaker representation;
- model performance can vary by language, task, and domain;
- high-resource results should not automatically be assumed to transfer to Burmese.

Use this to justify caution.

### Technical terminology

Assignment 2 found:

- translation alone is insufficient;
- technical terminology sometimes needs preservation in English;
- terminology should be identified before it can be appropriately translated or explained.

This is directly relevant to RQ1.

### Conceptual scaffolding

Assignment 2 found:

- educational AI systems increasingly move beyond translation;
- explanation, feedback, structured interaction, personalization, and multilingual support are important;
- unrestricted LLM interaction is not the only or necessarily best educational structure.

This is directly relevant to RQ2 and RQ3.

### Fragmentation

The heatmap found no reviewed study strongly covered all twelve sub-themes.

Use this carefully.

Do not claim:

> "No system in the world does this."

Instead state:

> "Within the reviewed SLR/SSR corpus, capabilities were fragmented across separate research streams."

---

## 11.4 Literature evaluation outcome

For each framework stage assign:

- Strong support
- Moderate support
- Limited support
- Contradictory/uncertain

Explain **why**.

The goal is evaluation, not another literature review.

---

# 12. Step 5 — Conceptual Evaluation Method 3: Informed Argument

## 12.1 Purpose

Use the research knowledge base to evaluate whether each framework stage has a defensible reason to exist.

The central question:

> Is every major framework component traceable to a problem, requirement, theory, conceptual relationship, or SLR/SSR finding?

---

## 12.2 Traceability structure

Use:

```text
Problem
↓
Issue
↓
Requirement
↓
Theory / Literature
↓
Conceptual Stage
↓
Research Question
```

---

## 12.3 Example

### RQ1 path

```text
English STEM terminology difficulty
↓
Insufficient terminology/language support
↓
Identify terminology + context-sensitive Burmese/English support
↓
ATE + contextual translation evidence
↓
Identify STEM Terminology
Interpret Technical Context
Select Language Support
↓
RQ1
```

### RQ2 path

```text
Translation alone is insufficient
↓
Insufficient conceptual support
↓
Explanation and examples beyond translation
↓
Scaffolding + multilingual educational support literature
↓
Explain STEM Concept
Provide Scaffolding
↓
RQ2
```

### RQ3 path

```text
Unstructured/static support
↓
Insufficient structured/adaptive scaffolding
↓
Collect learner response and adjust assistance
↓
TTF + Scaffolding Theory + contingency/fading
↓
Collect Learner Response
Adapt Support
↓
RQ3
```

---

## 12.4 Evaluation questions

For every stage ask:

1. What problem does this stage address?
2. What requirement justifies it?
3. What literature/theory supports it?
4. What RQ does it contribute to?
5. Would removing this stage weaken the design?
6. Does the stage introduce unnecessary scope?

---

# 13. Step 6 — Conceptual Evaluation Method 4: Scenario

## 13.1 Main scenario

Use:

> **What is photosynthesis, and how do plants make food?**

This is a good scenario because it is familiar but contains technical concepts suitable for terminology and conceptual scaffolding.

---

## 13.2 Conceptual scenario walkthrough

### Stage 1 — Identify STEM Terminology

Expected:

- Photosynthesis

Possible related terminology:

- chlorophyll;
- carbon dioxide;
- glucose.

Evaluation question:

> Does the framework clearly indicate what terminology should be recognized?

### Stage 2 — Interpret Technical Context

Expected:

- Biology
- plant energy/food production

Evaluation question:

> Does the framework prevent treating "photosynthesis" as isolated vocabulary?

### Stage 3 — Select Language Support

Expected strategy:

- explain in Burmese;
- preserve useful English terms such as photosynthesis/chlorophyll/glucose when appropriate;
- use bilingual presentation.

Evaluation question:

> Does the framework allow flexible support instead of mandatory translation?

### Stage 4 — Explain STEM Concept

Expected:

- explain how plants use light, water, and carbon dioxide to make glucose;
- distinguish "food" in everyday language from glucose/chemical energy.

Evaluation question:

> Does the framework move beyond lexical translation?

### Stage 5 — Provide Scaffolding

Expected:

- simple explanation;
- analogy;
- technical explanation;
- reflective prompt;
- hint.

Evaluation question:

> Is the support structured rather than a single unrestricted response?

### Stage 6 — Collect Learner Response

Example:

> I partially understand.

Evaluation question:

> Does the framework provide a usable signal for the next stage?

### Stage 7 — Adapt Support

Expected:

- simpler or alternative explanation;
- step-by-step explanation;
- additional Burmese support;
- support fades if learner reports stronger understanding.

Evaluation question:

> Does the feedback loop work coherently?

---

## 13.3 Conceptual scenario result table

| Stage | Scenario evidence | Criterion tested | Result |
|---|---|---|---|
| Identify terminology | Photosynthesis recognized | C1/C5 | Fill after evaluation |
| Interpret context | Biology context | C2/C5 | |
| Select language support | Burmese + retained English terms | C1/C3 | |
| Explain concept | Explanation beyond translation | C1/C4 | |
| Provide scaffolding | Multi-part learning support | C3/C5 | |
| Collect response | Partial understanding | C2/C3 | |
| Adapt support | Alternative explanation | C2/C3/C5 | |

---

# 14. Step 7 — Optional Human Expert Interview for Conceptual Artefact

## 14.1 Is it worthwhile?

Yes, if it can be done ethically and without delaying the assignment.

The specification lists human expert interview as bonus evidence.

Before conducting it:

- confirm course expectations;
- confirm whether formal ethics approval is required;
- confirm whether the expert can be quoted/anonymized.

---

## 14.2 Ideal expert

Best option:

- Burmese-speaking STEM educator;
- bilingual STEM teacher;
- educational technology researcher with multilingual experience;
- language-education specialist familiar with technical terminology.

---

## 14.3 Suggested questions

1. Does the framework represent the main support needs of Burmese-speaking STEM learners?
2. Is the sequence from terminology identification to adaptation reasonable?
3. Is selective preservation of English STEM terms appropriate?
4. Are the proposed scaffolding forms useful?
5. Is learner-response-driven adaptation conceptually reasonable?
6. What is missing?
7. What should remain outside scope?

---

## 14.4 Important distinction

Expert feedback is not equivalent to:

- learner outcome evidence;
- learner usability testing;
- experimental educational validation.

---

# 15. Step 8 — Define FURPS Evaluation Criteria

Assignment 5 emphasizes **Functionality** and **Usability**.

---

# 16. FURPS — Functionality Criteria

## F1 — Inquiry Handling

System should accept a valid natural-language STEM question and create a learning session.

## F2 — Terminology and Context

System should return a plausible primary STEM concept and domain/context.

## F3 — Bilingual Support

System should produce Burmese/English support according to configured preferences and preserve useful English STEM terminology where appropriate.

## F4 — Structured Learning Support

System should generate the required learning components:

- simple explanation;
- example/analogy;
- technical explanation;
- reflective prompt;
- optional hint.

## F5 — Learner Response

System should accept:

- High;
- Medium;
- Needs Support.

## F6 — Adaptive Support

System should change assistance based on learner response.

## F7 — Adaptation Bound

System should prevent adaptation from exceeding the implementation maximum of two rounds.

This evaluates implementation control.

It does **not** claim that two rounds are pedagogically optimal.

## F8 — Concept-Scoped Follow-Up

System should:

- accept relevant follow-up;
- maintain active concept context;
- restrict unrelated interaction appropriately.

## F9 — Persistence

System should store learning-session state.

## F10 — Learning History

Stored sessions should appear in Learning History.

## F11 — Review/Resume

Previous sessions should be reconstructable and accessible.

## F12 — Preferences

Learner preferences should affect relevant output/interaction and persist appropriately.

## F13 — Error Handling

Invalid inputs or service failures should not cause uncontrolled behaviour.

---

# 17. FURPS — Usability Criteria

Without a human study, frame this as a **structured usability inspection**.

## U1 — Task Clarity

Can a learner immediately identify where to ask a question?

## U2 — Information Structure

Are the learning-support sections visually distinguishable?

## U3 — Interaction Clarity

Are understanding choices understandable?

## U4 — Feedback Visibility

Can the learner see that the system has adapted or updated state?

## U5 — Navigation Consistency

Are New Inquiry, History, Review, Resume, and preferences understandable?

## U6 — Bilingual Readability

Are English and Burmese content presented clearly together?

## U7 — State Visibility

Can the learner tell whether the session is:

- in progress;
- completed;
- requires more support;
- review recommended?

## U8 — Error Clarity

Are invalid/error states understandable?

## U9 — Consistency

Are labels, button positions, interaction patterns, and terminology consistent across screens?

---

# 18. Step 9 — Analytical Evaluation: Static Analysis

## 18.1 Purpose

Examine structural/static qualities without relying only on interactive execution.

## 18.2 Evidence to collect

Possible evidence:

- ESLint output;
- production build result;
- TypeScript checking if configured;
- schema validation;
- source structure;
- separation of application responsibilities;
- database schema review;
- API contract review.

## 18.3 Commands

Use the actual project commands.

Possible examples:

```bash
npm run lint
npm run build
```

If TypeScript check exists:

```bash
npx tsc --noEmit
```

Do not claim a test was executed unless it was actually run.

## 18.4 Record

| Check | Command | Expected | Actual | Result |
|---|---|---|---|---|
| Lint | `npm run lint` | No blocking errors | Fill later | |
| Build | `npm run build` | Successful production build | Fill later | |

## 18.5 Architecture inspection

Confirm the design separation described in A4:

- UI;
- Application/Scaffolding;
- AI/LLM;
- Data/Persistence.

Inspect whether:

- UI directly calls LLM or not;
- LLM writes directly to database or not;
- application controls state;
- structured generation is validated;
- adaptation bound exists in application logic.

---

# 19. Step 10 — Analytical Evaluation: Dynamic Analysis

## 19.1 Purpose

Evaluate behaviour during real execution.

## 19.2 Dynamic behaviours to observe

- session creation;
- LLM generation;
- database persistence;
- state transitions;
- adaptation transitions;
- follow-up handling;
- history retrieval;
- error behaviour;
- response timing.

## 19.3 Timing measurement

Keep performance testing modest because Performance is not the main FURPS focus.

Use a fixed set of representative questions.

Example:

1. What is photosynthesis, and how do plants make food?
2. What is gravity?
3. What is electric current?
4. What is inheritance in programming?
5. What is pH?

Run each multiple times if practical.

Record:

- start time;
- end time;
- elapsed time;
- success/failure;
- operation type.

Use:

- median;
- minimum;
- maximum.

Avoid presenting one response time as representative.

---

# 20. Step 11 — Analytical Evaluation: Optimisation / Bounds

## 20.1 Important interpretation

Do **not** attempt to prove the system is globally optimal.

Use **bounded behavioural analysis**.

## 20.2 Main bound

The strongest existing bound is:

> adaptation rounds are limited to a maximum of two.

Evaluate:

- starting round;
- first adaptation;
- second adaptation;
- attempted extra adaptation;
- final/review status.

## 20.3 What this shows

If enforced correctly, it supports:

- bounded interaction;
- application-level control;
- prevention of unlimited adaptation loops;
- predictable state transitions.

## 20.4 What this does not show

It does not show:

- two rounds are educationally optimal;
- two rounds maximize learning;
- two rounds are suitable for all learners.

---

# 21. Step 12 — Experimental Evaluation: Simulation

## 21.1 Purpose

Execute the artefact using **artificial test data**.

Do not call artificial input "learner data."

## 21.2 Recommended simulation set

Use around **12–20 artificial STEM questions** across domains.

### Biology

- What is photosynthesis?
- What is a cell?
- What is DNA?
- What is osmosis?

### Physics

- What is gravity?
- What is electric current?
- What is force?
- What is momentum?

### Chemistry

- What is pH?
- What is an ion?
- What is oxidation?
- What is a catalyst?

### Computing / Engineering

- What is a network?
- What is inheritance in object-oriented programming?
- What is an algorithm?
- What is carbon fibre?

## 21.3 Include ambiguous terminology

Useful examples:

### Cell

Could mean:

- biological cell;
- battery cell;
- spreadsheet cell.

### Current

Could mean:

- electric current;
- current time/state.

### Network

Could mean:

- computer network;
- biological/social network.

### Inheritance

Could mean:

- object-oriented programming;
- genetic inheritance.

These help evaluate technical-context interpretation.

## 21.4 Learner-response simulation

### Path A

```text
Initial explanation
→ High
→ completion / fading
```

### Path B

```text
Initial explanation
→ Medium
→ Adaptation 1
→ High
```

### Path C

```text
Initial explanation
→ Needs Support
→ Adaptation 1
→ Needs Support
→ Adaptation 2
→ review/recommended state
```

## 21.5 Simulation output table

| ID | Domain | Query | Response Path | Expected behaviour | Actual behaviour | Result |
|---|---|---|---|---|---|---|

---

# 22. Step 13 — Black-Box Testing

## 22.1 Purpose

Test externally observable behaviour without depending on internal implementation.

## 22.2 Recommended core tests

### BB01 — Valid STEM inquiry

Input:

> What is photosynthesis, and how do plants make food?

Expected:

- session created;
- concept identified;
- structured explanation shown.

### BB02 — Empty inquiry

Expected:

- validation;
- no invalid session created.

### BB03 — Context-sensitive concept

Input:

> What does current mean in an electric circuit?

Expected:

- electrical context;
- not generic "current."

### BB04 — Bilingual support

Expected:

- Burmese explanation;
- useful English technical terms retained where appropriate.

### BB05 — Required support structure

Expected sections:

- simple;
- real-world example/analogy;
- technical;
- reflection;
- hint.

### BB06 — High understanding

Expected:

- no unnecessary extra adaptation;
- support can progress/fade.

### BB07 — Medium understanding

Expected:

- additional support;
- adaptation round increment.

### BB08 — Needs Support

Expected:

- simpler/additional/alternative support.

### BB09 — First adaptation

Expected:

- round = 1;
- state persisted.

### BB10 — Second adaptation

Expected:

- round = 2;
- bound still valid.

### BB11 — Attempt extra adaptation

Expected:

- maximum bound enforced;
- appropriate state/message.

### BB12 — Relevant follow-up

Example:

> Why do plants need sunlight for photosynthesis?

Expected:

- accepted;
- answer remains in active concept.

### BB13 — Unrelated follow-up

Example:

> How does gravity work?

Expected:

- scope control;
- prompt to begin a new inquiry or other implemented restriction.

### BB14 — Learning History

Expected:

- created session appears.

### BB15 — Review

Expected:

- stored completed/reviewable session reconstructed.

### BB16 — Resume

Expected:

- unfinished session restores correct state.

### BB17 — Preference persistence

Expected:

- selected language/explanation preference retained.

### BB18 — LLM/API error

Expected:

- controlled error;
- no corrupted state.

### BB19 — Malformed structured LLM output

Expected:

- validation/recovery/error handling.

## 22.3 Test record format

| Test ID | Precondition | Input / Action | Expected | Actual | Pass/Fail | Evidence |
|---|---|---|---|---|---|---|

---

# 23. Step 14 — White-Box Testing

## 23.1 Purpose

Evaluate internal execution logic and important code paths.

Do not try to test the entire application if time is limited.

Prioritize logic directly connected to research requirements.

## 23.2 Priority modules

### Adaptation strategy

Test:

- High;
- Medium;
- Needs Support.

### Adaptation bound

Test:

- round 0;
- round 1;
- round 2;
- attempt beyond round 2.

### Session lifecycle

Test transitions such as:

```text
in_progress
→ adapted
→ completed
```

and where implemented:

```text
in_progress
→ repeated difficulty
→ review_recommended
```

### Follow-up scope

Test:

- relevant question;
- unrelated question;
- missing active concept;
- invalid payload.

### Structured LLM response validation

Test:

- valid schema;
- missing field;
- wrong data type;
- malformed JSON;
- unexpected output.

### Persistence mapping

Test:

- create session;
- update understanding;
- append adaptation;
- append follow-up;
- retrieve history;
- reconstruct session.

### Preferences

Test:

- create preferences;
- update preferences;
- retrieve;
- use in generation request.

## 23.3 Coverage evidence

If code coverage tooling is practical, record it.

However:

> high code coverage is not proof of educational effectiveness.

Use coverage only to demonstrate structural testing completeness.

---

# 24. Step 15 — Design Artefact Descriptive Evaluation: Informed Argument

Evaluate whether each implemented feature exists for a defensible requirement.

| System feature | Requirement | Conceptual basis | Literature/theory | Evaluation question |
|---|---|---|---|---|
| Terminology/context identification | RQ1 requirement | Artefact 3 | Tran; He | Is the feature justified and implemented? |
| Burmese/English support | RQ1 | Context-Sensitive Language Support | Kleidermacher & Zou | Does implementation match the rationale? |
| Structured explanation | RQ2 | Conceptual Explanation / Structured Scaffolding | Athukorala; Kuzu | Does the PoC go beyond translation? |
| Adaptation | RQ3 | Learner Response → Updated Scaffolding | van de Pol; Wood | Is support actually adjusted? |
| Scoped follow-up | RQ3 | Structured Scaffolding | system-control rationale | Is interaction bounded? |
| History/preferences | RQ3 | Adaptive/task-aligned support | TTF | Does persistence support continuity? |

---

# 25. Step 16 — Design Artefact Scenario Evaluation

Use the same **Photosynthesis** scenario for the PoC.

This is useful because the conceptual and system evaluations can be compared.

## 25.1 Step-by-step PoC scenario

### Step A — Preferences

Set:

- Burmese support;
- useful English terminology retention;
- beginner/simple explanation if available.

Record screenshot.

### Step B — Initial inquiry

Input:

> **What is photosynthesis, and how do plants make food?**

Record:

- concept;
- domain;
- generated support;
- timestamp/session ID if appropriate.

### Step C — Structured support

Verify:

- Simple Explanation;
- Real-World Example / Analogy;
- Technical Explanation;
- Reflective Prompt;
- Hint.

### Step D — First learner response

Choose:

> **I partially understand / Medium**

Verify:

- adaptation occurs;
- state updates;
- support changes form.

### Step E — Second learner response

Choose:

> **I need more explanation / Needs Support**

Verify:

- second adaptation occurs;
- adaptation-bound state updates.

### Step F — Stronger understanding

If the workflow allows:

> **I understand / High**

Verify:

- no unnecessary support;
- session can progress toward completion/fading.

### Step G — Relevant follow-up

Ask:

> **Why do plants need sunlight for photosynthesis?**

Verify:

- active concept maintained;
- relevant answer returned.

### Step H — Unrelated follow-up

Ask:

> **How does gravity work?**

Verify scope control.

Record the actual implemented behaviour.

### Step I — Learning History

Open History.

Verify:

- Photosynthesis session appears;
- domain/understanding/status visible.

### Step J — Review / Resume

Verify the session can be reconstructed.

## 25.2 Scenario evaluation questions

1. Does the PoC implement every important framework stage?
2. Does the output match the intended language-support strategy?
3. Is the explanation genuinely structured?
4. Does learner response change subsequent support?
5. Is adaptation bounded?
6. Is follow-up concept scoped?
7. Is session state preserved?
8. Are any framework elements missing in implementation?
9. Are any implemented features not traceable to the conceptual design?

---

# 26. Step 17 — Design Artefact SLR Evaluation

Use Assignment 2 and the SSR as benchmarks.

The five SSR systems include:

1. Java Programming Assistance Tool for Sinhala Native Speakers
2. Children's Educational Dictionary for Kazakh
3. Interactive Video Learning Framework
4. SingLing
5. Vidyālaya

Compare the PoC against capabilities demonstrated in prior systems.

Do not use the comparison to claim superiority without evidence.

Use it to ask:

- Does the PoC instantiate literature-supported capabilities?
- Does it integrate functions that were fragmented in the reviewed corpus?
- Does it stay within the stated research scope?

Suggested table:

| Capability | A2 literature / SSR evidence | PoC implementation | Evaluation outcome |
|---|---|---|---|
| Native-language technical support | Sinhala Java assistant | Burmese support | |
| Structured educational content | Kazakh dictionary / video framework | Multi-part explanation | |
| Multilingual interaction | SingLing / Vidyālaya | Burmese/English interaction | |
| Personalized/adaptive support | Vidyālaya | learner-response adaptation | |
| Specialized terminology | ATE literature | terminology/context stage | |
| Controlled learning workflow | literature gap/design rationale | application-controlled flow | |

---

# 27. Step 18 — Optional Human Expert Evaluation of PoC

If permitted and practical, one expert session could cover both:

- conceptual framework;
- PoC.

However, because the rubric lists an optional expert interview under both conceptual and design artefact evaluation, confirm with the lecturer whether one interview can support both bonus components.

Suggested PoC questions:

1. Is the initial interaction clear?
2. Is the Burmese/English balance appropriate?
3. Are explanations sufficiently structured?
4. Is learner-response-driven adaptation understandable?
5. Is the follow-up scope appropriate?
6. Is Learning History useful?
7. What usability concern is most important?
8. What technical or educational limitation should be addressed next?

---

# 28. Step 19 — Master Evidence Register

Maintain one evidence register.

| Evidence ID | Method | Artefact | Description | File/path | Related RQ |
|---|---|---|---|---|---|
| E01 | GenAI | Conceptual | Full critique | ... | RQ1–RQ3 |
| E02 | SLR | Conceptual | Literature matrix | ... | RQ1–RQ3 |
| E03 | Scenario | Conceptual | Photosynthesis walkthrough | ... | RQ1–RQ3 |
| E04 | Static | PoC | Build output | ... | technical |
| E05 | Black-box | PoC | BB01 valid inquiry | ... | RQ1/RQ2 |
| E06 | White-box | PoC | Adaptation unit test | ... | RQ3 |
| E07 | Simulation | PoC | 12-query test set | ... | RQ1–RQ3 |
| E08 | Scenario | PoC | Photosynthesis screenshots | ... | RQ1–RQ3 |

This makes final traceability much easier.

---

# 29. Step 20 — Consolidated Results Table

After all evaluation is complete, create a master results table.

| Result ID | Evaluation method | Criterion | Evidence | Result | Limitation | PIRQOA mapping |
|---|---|---|---|---|---|---|

Do not write the final interpretation before this table is completed.

---

# 30. Step 21 — Final PIRQOA Evaluation Matrix

This is one of the most important final tables.

Use:

| Problem / Issue | Requirement | RQ | Artefact | Evaluation evidence | Result | Interpretation |
|---|---|---|---|---|---|---|

## 30.1 RQ1

Evaluate:

- terminology identification;
- technical context;
- Burmese/English support;
- English-term preservation where appropriate.

Evidence:

- literature;
- scenario;
- simulation;
- black-box;
- GenAI/informed argument.

## 30.2 RQ2

Evaluate:

- simple explanation;
- analogy/example;
- technical explanation;
- reflective prompt;
- hint;
- explanation beyond translation.

Evidence:

- literature;
- scenario;
- black-box;
- simulation;
- usability inspection.

## 30.3 RQ3

Evaluate:

- learner response;
- adaptation;
- contingency;
- fading;
- maximum adaptation bound;
- scoped follow-up;
- history;
- preferences;
- Review/Resume.

Evidence:

- scenario;
- black-box;
- white-box;
- bounds analysis;
- state inspection;
- literature.

---

# 31. Step 22 — Interpretation Rules

The final Results section should distinguish four types of conclusion.

## 31.1 Strong evidence

Example:

> Black-box and white-box tests confirmed that the application enforces the two-round adaptation limit under the evaluated paths.

## 31.2 Partial evidence

Example:

> The scenario demonstrated that the system can produce context-sensitive bilingual explanations for the evaluated Photosynthesis case, but the evaluation does not establish equivalent quality across all STEM domains.

## 31.3 Conceptual support

Example:

> The SLR and informed argument support the conceptual rationale for selective terminology preservation, but this does not establish educational effectiveness for Burmese learners.

## 31.4 Unsupported claim

Avoid:

> The system improves STEM learning.

Unless real learner-outcome evidence exists.

---

# 32. Step 23 — Recommended Figures and Tables

Keep the final paper focused.

## Figure 1

**Selected Context-Aware Adaptive STEM Scaffolding Framework**

Use the existing conceptual figure.

## Table 1

**Conceptual Artefact Evaluation Criteria and Methods**

Columns:

- criterion;
- method;
- evidence;
- RQ mapping.

## Table 2

**Conceptual Artefact Evaluation Results**

Combine:

- GenAI;
- literature;
- informed argument;
- scenario.

## Table 3

**FURPS Functionality and Usability Criteria**

## Table 4

**Design Artefact Evaluation Results**

Include summary of:

- static;
- dynamic;
- bounds;
- simulation;
- black-box;
- white-box.

## Figure 2

**Photosynthesis Scenario Evaluation Flow**

Possible flow:

```text
Inquiry
→ Terminology/Context
→ Bilingual Explanation
→ Structured Scaffolding
→ Learner Response
→ Adaptation
→ Scoped Follow-Up
→ History
```

## Figure 3

Optional:

**Dynamic timing result**

Only include if timing data is sufficiently meaningful.

## Table 5

**PIRQOA Evaluation Traceability**

This should be one of the strongest tables in the paper.

---

# 33. Step 24 — Recommended Final Assignment Structure

```text
Title
Abstract
Keywords

1. Evaluation Context
   - Research problem
   - PIRQOA summary
   - Selected artefacts
   - Evaluation objective
   - Brief methods overview

2. Conceptual Artefact Evaluation
   2.1 Artefact Selection and Evaluation Criteria
   2.2 GenAI Interview
   2.3 Academic Literature Evaluation
   2.4 Informed Argument
   2.5 Scenario Evaluation
   2.6 Conceptual Evaluation Summary

3. Design Artefact Evaluation
   3.1 FURPS Functionality and Usability Criteria
   3.2 Analytical Evaluation
       3.2.1 Static Analysis
       3.2.2 Dynamic Analysis
       3.2.3 Optimisation / Bounds Analysis
   3.3 Simulation
   3.4 Black-Box and White-Box Testing
   3.5 Informed Argument and Scenario
   3.6 Academic Literature Evaluation
   3.7 Design Evaluation Summary

4. Results and Interpretation
   4.1 Consolidated Results
   4.2 PIRQOA / RQ Traceability
   4.3 What the Evaluation Does and Does Not Show

5. Conclusion

References
```

---

# 34. Step 25 — Word Allocation

## Abstract

**130–150 words**

## 1. Evaluation Context

Approximately **150–250 words**

Keep this short because A5 is evaluation-focused.

## 2. Conceptual Artefact Evaluation

**800–1200 words**

Suggested internal allocation:

- selection + criteria: 120–180
- GenAI: 150–220
- literature: 200–300
- informed argument: 150–220
- scenario: 150–220
- summary: 80–120

## 3. Design Artefact Evaluation

**800–1200 words**

Suggested internal allocation:

- FURPS criteria: 100–150
- analytical: 180–260
- simulation: 100–150
- black/white-box: 200–300
- informed argument/scenario: 150–220
- literature: 100–150
- summary: 70–100

## 4. Results and Interpretation

**500–750 words**

Do not repeat every test.

Summarize:

- main supported findings;
- limitations;
- RQ mapping;
- problem-resolution assessment.

---

# 35. Step 26 — Title, Abstract, and Keywords

Do these last.

## Possible working title

> **Evaluating Adaptive LLM Scaffolding for Burmese-Speaking STEM Learners**

Count words before finalizing.

## Abstract structure

Use approximately:

1. problem/context — 1–2 sentences;
2. conceptual/system artefacts — 1 sentence;
3. evaluation methods — 2 sentences;
4. key results — 2–3 sentences;
5. limitation/contribution — 1 sentence.

Do not invent the key-results sentences now.

## Keywords

A5 allows **maximum 5**.

Possible final set:

- Adaptive STEM Scaffolding
- Burmese-Speaking Learners
- Large Language Models
- STEM Terminology Support
- Educational Information Systems

Only finalize later.

---

# 36. Step 27 — Reference Strategy

## Core evaluation-method sources

- Hevner et al. (2004)
- Grady & Caswell (1987)

## Core theory sources

- Goodhue & Thompson (1995)
- Wood et al. (1976)
- van de Pol et al. (2010)

## Main SLR/SSR sources from Assignment 2

High-value sources include:

- Athukorala & De Silva (2025)
- Candé & Martinho (2026)
- He et al. (2025)
- Kleidermacher & Zou (2026)
- Kuzu (2026)
- Nair et al. (2026)
- Rakhimova et al. (2024)
- Sakunkoo et al. (2025)
- Tran et al. (2026)
- Vatsal et al. (2026)
- Zhang & Pang (2025)
- Bal & Mandal (2026)
- Khoboko et al. (2025)

Use only sources that actually support the claim being made.

---

# 37. Step 28 — Risks to an Excellent Mark

## Risk 1 — Describing instead of evaluating

Bad:

> The framework has seven stages.

Better:

> The framework was evaluated for completeness and sequence using literature, GenAI critique, informed argument, and a Photosynthesis scenario.

## Risk 2 — Missing one required method

### Conceptual

- [ ] GenAI
- [ ] SLR
- [ ] Informed argument
- [ ] Scenario
- [ ] Optional expert

### Design

- [ ] FURPS Functionality
- [ ] FURPS Usability
- [ ] Static analysis
- [ ] Dynamic analysis
- [ ] Optimisation/bounds
- [ ] Simulation
- [ ] Black-box
- [ ] White-box
- [ ] Informed argument
- [ ] Scenario
- [ ] SLR
- [ ] Optional expert

## Risk 3 — Inventing usability evidence

Without participants, call it:

> structured usability inspection

Do not call it:

> user usability study.

## Risk 4 — Overclaiming learning outcomes

Do not equate:

> "I understand"

with actual learning.

Use:

> self-reported understanding.

## Risk 5 — Weak white-box evidence

A4 noted that automated tests were not yet complete.

A5 is the opportunity to add meaningful automated tests.

Prioritize:

- adaptation;
- state transitions;
- scope validation;
- structured response validation;
- persistence.

## Risk 6 — Weak simulation design

Do not use only Photosynthesis.

Use multiple STEM domains and ambiguous terminology.

## Risk 7 — No clear PIRQOA mapping

Every main result should have an RQ/requirement mapping.

## Risk 8 — Treating GenAI critique as validation

Use it only as one evidence source.

Triangulate.

## Risk 9 — Literature repetition

Do not rewrite the whole Assignment 2 SLR.

Use literature **as evaluation evidence**.

## Risk 10 — Changing artefacts during evaluation without recording it

Freeze the baseline first.

If improvements arise, document them.

---

# 38. Step 29 — Practical Execution Order

## Phase A — Preparation

### A1
Freeze conceptual framework.

### A2
Freeze PoC commit/version.

### A3
Create `evaluation/` folder.

### A4
Create evaluation protocol.

### A5
Create evidence IDs.

---

## Phase B — Conceptual Artefact Evaluation

### B1
Finalize criteria C1–C5.

### B2
Run GenAI interview.

### B3
Save full transcript.

### B4
Code GenAI findings.

### B5
Create Assignment 2 literature matrix.

### B6
Perform informed-argument traceability.

### B7
Run conceptual Photosynthesis scenario.

### B8
Optional expert interview.

### B9
Create conceptual results table.

---

## Phase C — Design Artefact Evaluation

### C1
Finalize FURPS F/U criteria.

### C2
Prepare black-box cases.

### C3
Implement targeted white-box tests.

### C4
Run static analysis.

### C5
Run black-box tests.

### C6
Run white-box tests.

### C7
Run dynamic/timing analysis.

### C8
Run adaptation bounds analysis.

### C9
Create artificial simulation dataset.

### C10
Execute simulation.

### C11
Perform structured usability inspection.

### C12
Run complete Photosynthesis PoC scenario.

### C13
Optional expert PoC evaluation.

### C14
Create design results table.

---

## Phase D — Consolidation

### D1
Create master results table.

### D2
Create PIRQOA traceability table.

### D3
Identify converging evidence.

Example:

- literature supports adaptation;
- scenario shows it conceptually;
- black-box shows it externally;
- white-box confirms internal logic.

### D4
Identify conflicting/weak evidence.

### D5
Write limitations.

---

## Phase E — Drafting

Draft in this order:

1. Section 2 — Conceptual evaluation
2. Section 3 — Design evaluation
3. Section 4 — Results and interpretation
4. Section 1 — Evaluation context
5. Conclusion
6. Title
7. Abstract
8. Keywords
9. References audit
10. Formatting audit

---

# 39. Step 30 — What to Ask ChatGPT For Next

## Next Request 1

> Create the exact evaluation protocol for Assignment 5, including C1–C5, FURPS Functionality and Usability criteria, evidence IDs, result scales, and data-recording templates. Do not invent results.

## Next Request 2

> Create the exact GenAI interview prompt for evaluating the Context-Aware Adaptive STEM Scaffolding Framework. Include the research problem, PIRQOA, theories, framework stages, and fixed evaluation criteria. Make the output structured for later analysis.

## Next Request 3

> Using Assignment 2 only, create the literature-evaluation matrix for each stage of the Context-Aware Adaptive STEM Scaffolding Framework. Separate evidence, relevance, limitations, and evaluation implications. Do not add unverified sources.

## Next Request 4

> Create the detailed conceptual Photosynthesis scenario evaluation protocol and results template. Do not invent results.

## Next Request 5

> Create the full black-box test specification for Burmese STEM AI with IDs, preconditions, steps, expected results, actual-result fields, evidence fields, and PIRQOA mapping.

## Next Request 6

> Review my repository/code and create the targeted white-box testing plan for adaptation, session lifecycle, follow-up scope, structured LLM output validation, persistence, and preferences.

## Next Request 7

> Create the artificial STEM simulation dataset and execution protocol. Include multiple domains and ambiguous terminology. Do not invent results.

## Next Request 8

After running evaluations:

> Here are my real evaluation results. Analyze them without changing the data. Identify supported findings, failures, limitations, and PIRQOA implications.

## Next Request 9

Only after results exist:

> Write Section 2: Conceptual Artefact Evaluation in 800–1200 words using only my recorded evaluation evidence and verified references.

Then continue one section at a time.

---

# 40. Final Pre-Submission Checklist

## Assignment requirements

- [ ] Title ≤10 words
- [ ] Abstract ≤150 words
- [ ] Keywords ≤5
- [ ] Conceptual evaluation 800–1200 suggested
- [ ] Design evaluation 800–1200 suggested
- [ ] Results 500–750 suggested
- [ ] APA 7
- [ ] All tables/figures labeled consistently

## Conceptual evaluation

- [ ] Artefact choice justified
- [ ] Evaluation criteria stated
- [ ] GenAI interview completed
- [ ] Full GenAI prompt/response preserved
- [ ] Assignment 2 SLR used as evaluation evidence
- [ ] Informed argument completed
- [ ] Scenario completed
- [ ] Results transparent
- [ ] Limitations stated
- [ ] Optional expert interview if feasible

## Design evaluation

- [ ] FURPS Functionality evaluated
- [ ] FURPS Usability evaluated
- [ ] Static analysis executed
- [ ] Dynamic analysis executed
- [ ] Optimisation/bounds analysis executed
- [ ] Simulation executed
- [ ] Black-box tests executed
- [ ] White-box tests executed
- [ ] Informed argument completed
- [ ] Scenario completed
- [ ] Academic literature used
- [ ] Optional expert interview if feasible
- [ ] Procedures reproducible

## Results

- [ ] Master results table created
- [ ] Results mapped to PIRQOA
- [ ] RQ1 addressed
- [ ] RQ2 addressed
- [ ] RQ3 addressed
- [ ] Failures reported honestly
- [ ] Limitations reported
- [ ] No educational-effectiveness overclaim
- [ ] Self-reported understanding described correctly

## Evidence

- [ ] Screenshots preserved
- [ ] Test logs preserved
- [ ] Build/lint outputs preserved
- [ ] Test outputs preserved
- [ ] Coverage saved if used
- [ ] Simulation inputs saved
- [ ] Simulation outputs saved
- [ ] Timing data saved
- [ ] GenAI transcript saved
- [ ] Literature matrix saved
- [ ] Artefact versions recorded

---

# 41. Core Principle for the Final Assignment

The strongest Assignment 5 paper will not be the one with the most tests.

It will be the one where every important claim follows a clear chain:

```text
Research Problem
→ Issue
→ Requirement
→ Research Question
→ Artefact
→ Evaluation Criterion
→ Evaluation Method
→ Recorded Evidence
→ Result
→ Interpretation
→ Limitation
```

That chain should guide every major section of the assignment.

The evaluation should ultimately answer:

> **Do the conceptual framework and the Burmese STEM AI proof of concept provide a coherent, literature-grounded, technically implemented, and functionally demonstrable response to the PIRQOA requirements for terminology support, conceptual explanation, and adaptive scaffolding for Burmese-speaking STEM learners?**

The answer should be based only on the evidence actually collected during Assignment 5.
