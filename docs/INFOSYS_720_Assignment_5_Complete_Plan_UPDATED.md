# INFOSYS 720 Assignment 5 — Complete Evaluation Plan

| Document control | Value |
| --- | --- |
| Implementation-oracle version | 2.1 |
| Aligned | 30 September 2026 |
| Protocol | `A5-PROTOCOL-01` version 2.1 |
| Formal evaluation status | Steps 10–18 and §18.1 recorded; Step 20 audit retained; conceptual argument v2 E058–E060 retained; Step 21 complete with 225 result rows, E061–E063; 58 current evidence entries (E001–E027/E033–E063); mixed findings/restricted originals and skipped optional expert study retained; Step 22 PIRQOA matrix NEXT |

## Refined PoC Contract Used by the Design Evaluation

Stage 6 is a two-level learner self-report, not a measurement of learning:

- **Stage 6A:** `high`, `medium`, or `needs_support` records overall support
  need. The legacy storage/API property remains named `understanding` for
  compatibility.
- **Stage 6B:** after Medium or Needs Support, the learner may optionally choose
  `simpler_explanation`, `another_example`, `language_terms`,
  `concept_unclear`, or `concept_mismatch`, or continue without a choice.
  `concept_mismatch` requires a short intended-term/context clarification.

Stage 7 route selection is application-controlled:

| Learner response | Route | Generation and state effect |
| --- | --- | --- |
| High | `fade` | Persist response event; no LLM call, adaptation, or round increment; Finish remains explicit |
| Medium/Needs Support without Stage 6B | `stage_5_scaffold` | Generate default `another_example`/`simpler_explanation` below the cap |
| Simpler explanation / another example | `stage_5_scaffold` | Generate the selected Stage 5 support below the cap |
| Language terms | `language_support` | Revisit Stages 3–5 and display this adaptation bilingually |
| Concept unclear | `concept_clarification` | Revise Stage 4 meaning and Stage 5 scaffold |
| Concept mismatch + clarification | `context_reinterpretation` | Bounded context/term correction, ambiguity response, or capped outcome |

Every accepted response appends a trace event containing overall need,
optional difficulty, route, round before/after, timestamp, and any
reinterpretation trace. `adaptationRound` counts only generated, persisted
adaptations, with a maximum of two. At round 2 the response event is still
stored, but the provider is not called and round 3 cannot be created.

Current structural verification commands, run from `burmese_stem_ai/`, are:

```sh
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

These commands can establish software structure and bounded behaviour only.
They do not establish Burmese linguistic quality, STEM-content correctness,
usability with learners, learning gains, retention, mastery, or that two
generated adaptations are educationally optimal.

## Purpose of This Plan

This document is a **working execution guide** for completing **INFOSYS 720 Assignment 5: Evaluate Information Systems Artefacts**.

It is **not** the final Assignment 5 paper. Its purpose is to guide the evaluation work step by step so that the final paper can later be written from **real, recorded evidence** rather than assumptions.

The plan is based on:

- the supplied plan's account of the Assignment 5 specification and marking
  rubric; the standalone brief must still be checked before submission;
- Assignment 2 SLR and SSR findings;
- Assignment 3 theoretical foundation and conceptual artefacts;
- Assignment 4 system artefacts and Burmese STEM AI proof of concept.

The central rule for the whole assignment is:

> **Define the evaluation criteria first, execute the evaluation, preserve the evidence, and only then write the findings.**

---

## Current Progress Snapshot — 2 October 2026

### Completed

The conceptual artefact evaluation has been completed through framework refinement.

- [x] Evaluation protocol created
- [x] Local B01 PoC baseline and environment frozen
- [x] FURPS F1–F13 and U1–U9 criteria and recording rules frozen
- [x] Step 10 static analysis executed and evidence E001–E003 retained
- [x] Step 11 dynamic API/database/provider analysis, all 15 timing attempts, and UI-01–UI-12 manual-browser observations executed
- [x] Step 12 optimisation/bounds analysis executed; BND-01–BND-17 passed with deterministic provider instrumentation and real MongoDB concurrency
- [x] Step 13 simulation executed and Nathan's review endorsed; mixed findings retained (E018–E023)
- [x] Step 14 black-box executed; 21 assessed Pass, 2 Partial, 1 Fail retained (E024–E027)
- [x] Step 15 white-box executed; WB01–WB06 structural Pass, 361 deterministic + 12 MongoDB tests, application-wide coverage and limitations retained (E033–E035)
- [x] Primary conceptual artefact selected
- [x] Conceptual criteria defined
- [x] GenAI interview completed and raw transcript preserved
- [x] GenAI findings coded and synthesized
- [x] Assignment 2 SLR used as academic-literature evaluation evidence
- [x] Literature synthesis and evidence matrix created
- [x] Informed-argument traceability completed
- [x] Independent Photosynthesis scenario evaluation completed
- [x] Four-method conceptual triangulation completed
- [x] Framework refinement decisions completed
- [x] Refined seven-stage framework frozen for Assignment 5
- [x] Human Expert Interview intentionally skipped because it is optional bonus evidence

### Current evaluation folder

```text
evaluation/
├── 00_protocol/
│   ├── evaluation_protocol.md
│   ├── b01_artefact_versions.md
│   ├── b01_environment.md
│   └── b01_evidence_index.md
├── 01_conceptual/
│   ├── conceptual_triangulation.md
│   ├── framework_refinements.md
│   ├── genai/
│   │   ├── GENAI-01_analysis.md
│   │   └── GENAI-01_interview.md
│   ├── informed_argument/
│   │   └── traceability.md
│   ├── literature/
│   │   ├── literature_matrix.csv
│   │   └── literature_synthesis.md
│   └── scenario/
│       └── photosynthesis_scenario.md
├── 02_design/
│   ├── static/
│   │   ├── static_analysis_test_cases.md
│   │   └── raw/
│   │       ├── STA-RUN-01-command-log.md
│   │       └── STA-03-coverage-summary.json
│   ├── dynamic/
│   │   ├── dynamic_analysis_test_cases.md
│   │   ├── dynamic_analysis.md
│   │   ├── timings.csv
│   │   └── raw/
│   ├── optimisation/
│   │   ├── bounds_analysis_test_cases.md
│   │   ├── bounds_analysis.md
│   │   └── raw/
│   ├── simulation/simulation_test_cases.md
│   ├── black_box/black_box_test_cases.md
│   └── white_box/white_box_test_cases.md
└── 03_results/
    └── evidence_register.csv
```

### Next major task

Technical test workflow amended on 2 October 2026: active tests now live in the
root `burmese_stem_ai/tests/`; normal npm commands run 361 deterministic and
12 isolated MongoDB tests. Production code remains B01, with a separately
versioned test/configuration tree. Full application coverage is available at
`burmese_stem_ai/coverage/index.html` (42 files; 72.54% statements / 76.37%
branches). See [root-project test run](../evaluation/02_design/white_box/root_project_test_run.md)
(E033–E035). No source-copy tree is required; root evidence is retained. The superseded white-box run and duplicate helpers were removed under user direction on 2 October 2026.

> **Continue to Step 22 PIRQOA traceability NEXT. Step 21 is complete in [master results](../evaluation/03_results/master_results.csv), E061, with 225 immutable IDs and [consolidation rules/coverage](../evaluation/03_results/consolidation_notes.md), E062. E063 records integrity; the evidence register now has 58 entries. Step 20's 52-entry checkpoint remains historical, not a constraint against append-only indexing. C4/method crosswalks, qualified literature/arguments, provisional scenario content, six U Pass/three Partial, thirteen F Partials, failures and restricted originals remain explicit. Step 19 is intentionally skipped. No B01 rerun, fix or public-release clearance.**

### Step 13 recorded execution and endorsed review

The run is `RUN-B01-20261001-SIMULATION-02`; metadata, exact text/state and failure analysis are under `evaluation/02_design/simulation/`. E018–E021 retain the historical execution evidence; E022–E023 identify the completed review and its manifest. Nathan's user-provided competence, 91 endorsed ratings, conclusions and authorised typed sign-offs are recorded in [qualified_human_judgement.md](../evaluation/02_design/simulation/qualified_human_judgement.md) and the [approval record](../evaluation/02_design/simulation/review_completion/approval_record.md). Review clock times were not supplied and are recorded as not recorded. Source checks/AI assistance are disclosed. Application source remains identical to B01. Do not include secrets or API keys.

## How to execute this plan

1. Start at the first heading marked **NEXT**; currently this is D3 / Step 22's PIRQOA matrix. Do not rerun or relabel completed evidence.
2. Read that step's Goal, Inputs/Outputs, Procedure, and Completion Criteria.
3. Create only the listed evidence folder/files; leave actual-result fields
   blank until execution.
4. Execute against B01 and retain the first attempt, including failures.
5. Add real artefacts to the evidence register; never pre-allocate evidence IDs
   for files that do not exist.
6. Update criteria/results only from retained evidence.
7. Mark the step complete only when every completion criterion is met, then
   move to the next item in the Phase C dashboard (§39).

When an environment dependency blocks execution, record Blocked plus the exact
reason and continue only where doing so does not invalidate later evidence.
Never convert a preparation check, source inspection, or planned case into a
formal Pass result.

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
5. **Optional Observational — Human Expert Interview** for bonus marks — **not conducted in this project due to time constraints**

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
   - Human expert interview for bonus marks — **will not be conducted**

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

Provide structured learning support, collect learner response, and adapt subsequent support according to learner need.

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

### Framework stages — refined and frozen after conceptual evaluation

The seven-stage structure was retained after GenAI, SLR, informed-argument, scenario, and triangulation evaluation.

Use the following refined interpretation for the Assignment 5 paper:

1. **Identify STEM Terminology**  
   Identify the principal specialized STEM concept or terminology requiring support.

2. **Interpret Technical Context**  
   Determine the relevant STEM/domain meaning and recognize ambiguity where necessary.

3. **Select Language Support**  
   Select a context-sensitive Burmese/English strategy using the identified terminology, technical context, useful English disciplinary terms, and learner-expressed language need where available.

4. **Explain STEM Concept**  
   Establish and communicate the core STEM meaning beyond direct translation.

5. **Provide Scaffolding**  
   Structure support using selectable examples, analogies, reflective prompts, hints, and appropriate explanatory depth.

6. **Collect Learner Response**  
   Collect a **learner-reported support signal** indicating perceived understanding or need for additional assistance. This is not objective evidence of learning or mastery.

7. **Adapt Support**  
   Interpret the learner-reported signal and select a bounded adaptive response. Normally update Stage 5; reconsider Stage 3 or Stage 4 when the difficulty concerns language or explanation. Revisit Stages 1–2 only when ambiguity or interpretation requires correction.

The framework retains the feedback relationship in which learner response guides subsequent support.

Important refinement result:

> **The seven-stage architecture is retained. Evaluation supported targeted clarification, not structural redesign.**

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
- self-reported learner support need;
- adaptive scaffolding;
- contingency/fading behaviour;
- maximum two generated, persisted adaptations;
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

The system's legacy `understanding` values are **self-reported support need**,
not measured learning performance, competence, or mastery.

---

# 7. Step 1 — Freeze the Evaluation Baseline

Before testing, define exactly what version is being evaluated.

## 7.1 Freeze the conceptual artefact — COMPLETED

The submitted Assignment 3 **Context-Aware Adaptive STEM Scaffolding Framework** was used as the baseline for evaluation.

The evaluation then documented all identified refinements transparently in:

```text
evaluation/01_conceptual/conceptual_triangulation.md
evaluation/01_conceptual/framework_refinements.md
```

The refined seven-stage interpretation is now frozen for Assignment 5 reporting.

The evaluation did **not** silently change the original artefact. Changes were recorded as evaluation findings and refinement decisions.

---

## 7.2 Freeze the PoC version — COMPLETED

The formal local baseline is `B01-A5-EVALUATION`. Its annotated tag is
`a5-evaluation-b01`; its executable source commit is
`37faefa236829aa3d79e023faa1fb72a086b5c2a`.

The commit, worktree, package lock, runtime, database, browser, non-secret model
configuration, prompt/schema hashes, commands, and local-only deployment
qualification are recorded in:

```text
evaluation/00_protocol/b01_artefact_versions.md
evaluation/00_protocol/b01_environment.md
evaluation/00_protocol/b01_evidence_index.md
```

B01 baseline-freeze checks are prerequisites, not formal FURPS or method
results. Do not copy their Pass outcomes into Steps 10–18.

---

## 7.3 Evaluation evidence folder — CURRENT STATUS

The actual folder structure currently is:

```text
evaluation/
├── 00_protocol/
│   ├── evaluation_protocol.md
│   ├── b01_artefact_versions.md
│   ├── b01_environment.md
│   └── b01_evidence_index.md
└── 01_conceptual/
    ├── conceptual_triangulation.md
    ├── framework_refinements.md
    ├── genai/
    │   ├── GENAI-01_analysis.md
    │   └── GENAI-01_interview.md
    ├── informed_argument/
    │   └── traceability.md
    ├── literature/
    │   ├── literature_matrix.csv
    │   └── literature_synthesis.md
    └── scenario/
        └── photosynthesis_scenario.md
```

### Create remaining folders only when their step starts

Create the design-evaluation folders only as they become necessary:

```text
evaluation/
├── 02_design/
│   ├── static/
│   ├── dynamic/
│   ├── optimisation/
│   ├── simulation/
│   ├── black_box/
│   ├── white_box/
│   ├── usability/
│   ├── informed_argument/
│   ├── scenario/
│   └── literature/
└── 03_results/
    ├── evidence_register.csv
    ├── master_results.csv
    └── pirqoa_traceability.csv
```

No `04_expert/` folder is required because the optional Human Expert Interview
will not be conducted. Do not create empty evidence files merely to make the
tree look complete.

---

# 8. Step 2 — Define Evaluation Criteria Before Testing — COMPLETED

Conceptual C1–C5 and design F1–F13/U1–U9 criteria were defined before formal
execution. The governing protocol is
`evaluation/00_protocol/evaluation_protocol.md`, version 2.1.

Do not change criteria after seeing results. If a genuine correction is
required, version the protocol, record the amendment, retain prior results, and
rerun affected cases.

---

# 9. Conceptual Artefact Evaluation Criteria — COMPLETED

The five criteria were defined before evaluation and then used across the conceptual methods.

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

## C4 — Completeness and Boundary Clarity — COMPLETED

Question:

> Does the framework contain the conceptual responsibilities required by RQ1–RQ3 without unnecessary overlap or scope expansion?

Evaluate whether:

- an important stage is missing;
- two stages duplicate the same responsibility;
- decision points are underspecified;
- feedback relationships are ambiguous;
- the framework expands beyond the intended scope.

The completed evaluation found:

- no missing eighth core stage;
- Stage 4 and Stage 5 should remain separate but require clearer definitions;
- Stage 3 language-selection principles should be clearer;
- Stage 6 should be explicitly framed as a learner-reported support signal;
- Stage 7 should explicitly interpret that signal before choosing adaptation;
- bounded re-entry to Stages 3–5 is appropriate;
- major structural redesign is not justified.

Academic-literature consistency was evaluated separately through the required **SLR / Academic Literature** method rather than being treated as the C4 criterion.

---

## C5 — Scenario Applicability

Question:

> Can the framework guide a realistic STEM-learning interaction from initial inquiry to adaptive support?

Use the Photosynthesis scenario.

Check whether every stage can be instantiated and whether the sequence remains coherent.

---

# 10. Step 3 — Conceptual Evaluation Method 1: GenAI Interview — COMPLETED

Evidence:

```text
evaluation/01_conceptual/genai/GENAI-01_interview.md
evaluation/01_conceptual/genai/GENAI-01_analysis.md
```

The raw interview was preserved separately from the coded analysis.

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

## 10.6 Analyse the GenAI response — COMPLETED

The coding and synthesis are preserved in:

```text
evaluation/01_conceptual/genai/GENAI-01_analysis.md
```

The analysis used the planned coding structure:

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

# 11. Step 4 — Conceptual Evaluation Method 2: SLR Academic Literature — COMPLETED

Evidence:

```text
evaluation/01_conceptual/literature/literature_matrix.csv
evaluation/01_conceptual/literature/literature_synthesis.md
```

Assignment 2 was used as the existing academic evidence base; the task evaluated the framework rather than repeating the literature review.

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

## 11.4 Literature evaluation outcome — COMPLETED

The completed literature evaluation is preserved in:

```text
evaluation/01_conceptual/literature/literature_matrix.csv
evaluation/01_conceptual/literature/literature_synthesis.md
```

The evaluation used the following support levels:

- Strong support
- Moderate support
- Limited support
- Contradictory/uncertain

Explain **why**.

The goal is evaluation, not another literature review.

---

# 12. Step 5 — Conceptual Evaluation Method 3: Informed Argument — COMPLETED

**Literature-grounded revision, 3 October 2026:** use
[traceability_v2.md](../evaluation/01_conceptual/informed_argument/traceability_v2.md),
E058, with [source verification](../evaluation/01_conceptual/informed_argument/reference_verification_v2.md),
E059, and E060's revision manifest. Nine scholarly references now supply explicit
warrants and counterarguments for all seven responsibilities. The revision
evaluates the final conceptual interpretation in E056 §26, qualifies the
scaffolding/TTF claims and distinguishes protocol C4 from historical C4.
The original `traceability.md`, E053, remains unchanged; it is historical
evidence, not the current literature-grounded version. E055/E056 and all
empirical outcomes are not retrospectively revised. This is additional dated
CA-ARG reasoning, not an independent replication, new expert review or B01 run.

Original evidence (retained):

```text
evaluation/01_conceptual/informed_argument/traceability.md
```

The argument tested the chain:

```text
Problem → Issue → Requirement → Theory/Literature → Framework Stage → RQ
```

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

## 12.4 Evaluation questions — COMPLETED

The current literature-grounded traceability and informed-argument results are in:

```text
evaluation/01_conceptual/informed_argument/traceability_v2.md
```

The original `traceability.md` remains E053 historical evidence. E058–E060
identify the dated revision, source checks and integrity manifest; its scholarly
strengthening does not retroactively regrade previous conceptual results.

For every stage the evaluation asked:

1. What problem does this stage address?
2. What requirement justifies it?
3. What literature/theory supports it?
4. What RQ does it contribute to?
5. Would removing this stage weaken the design?
6. Does the stage introduce unnecessary scope?

---

# 13. Step 6 — Conceptual Evaluation Method 4: Scenario — COMPLETED

Evidence:

```text
evaluation/01_conceptual/scenario/photosynthesis_scenario.md
```

The evaluation used the actual supplied Photosynthesis learning-session evidence and did not invent unobserved learner actions.

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

> Does Stage 6A provide a clear overall support signal, and can Stage 6B
> optionally identify the needed help without forcing a choice?

### Stage 7 — Adapt Support

Expected:

- deterministic fade for High without generation;
- default or explicitly selected Stage 5 support;
- route-specific language or conceptual clarification;
- bounded context reinterpretation for a mistaken concept/term;
- response-event persistence even when generation is skipped or capped.

Evaluation question:

> Does the feedback loop work coherently?

---

## 13.3 Conceptual scenario result snapshot — COMPLETED

The detailed evaluation is preserved in:

```text
evaluation/01_conceptual/scenario/photosynthesis_scenario.md
```

Summary:

| Stage | Scenario evidence | Result |
|---|---|---|
| Identify terminology | Photosynthesis recognized as active STEM concept | Demonstrated |
| Interpret context | Biology / plant-food-production context | Demonstrated |
| Select language support | Burmese explanation with retained English STEM terms | Demonstrated; selection criteria partly unobservable |
| Explain concept | Simple and technical explanation beyond translation | Strongly demonstrated |
| Provide scaffolding | Example, reflection and hint | Strongly demonstrated |
| Collect response | Understanding Check present | Demonstrated; self-report only |
| Adapt support | Additional rice-plant example after understanding check | Demonstrated; exact trigger/decision rule unresolved |

Scenario conclusion:

> All seven stages can be instantiated in the Photosynthesis case. No eighth stage was exposed as necessary.

---

# 14. Step 7 — Conceptual Artefact Triangulation — COMPLETED

Evidence:

```text
evaluation/01_conceptual/conceptual_triangulation.md
```

The four required conceptual methods were compared finding-by-finding:

- GenAI Interview;
- SLR / Academic Literature;
- Informed Argument;
- Scenario Evaluation.

The final researcher interpretation did not treat any single method as authoritative.

### Main triangulated conclusion

> **Retain the seven-stage framework. The evidence supports targeted clarification of stage responsibilities and adaptive decision boundaries, not major structural redesign.**

Key converging results:

- strong PIRQOA/RQ1–RQ3 coverage;
- terminology identification and technical context are justified;
- selective Burmese/English support is justified;
- conceptual explanation and structured scaffolding are both necessary;
- Stage 4 and Stage 5 should remain separate but be clarified;
- learner response is a self-report signal, not objective learning evidence;
- adaptive support is justified;
- Stage 7 decision responsibility and bounded feedback routing should be clearer;
- no eighth stage is required;
- generated-content correctness remains a limitation.

---

# 15. Step 8 — Framework Refinement Decisions — COMPLETED

Evidence:

```text
evaluation/01_conceptual/framework_refinements.md
```

### Accepted refinements

- clarify Stage 3 language-selection principles;
- clarify Stage 4 / Stage 5 responsibilities;
- define Stage 6 as a learner-reported support signal;
- make learner-response interpretation explicit within Stage 7;
- allow bounded feedback to Stages 3–5;
- allow ambiguity correction for Stages 1–2 as an exception;
- treat Stage 5 scaffold forms as selectable rather than always cumulative;
- explicitly state that generated content is not automatically correct or educationally effective;
- retain the seven-stage structure.

### Rejected refinements

- merging Stage 4 and Stage 5;
- adding an eighth stage;
- adding objective mastery/quiz functionality;
- adding a deterministic language-selection algorithm;
- adding a permanent Stage 2 → Stage 1 loop;
- major structural redesign.

### Human Expert Interview decision

The optional Human Expert Interview will **not** be conducted because of time constraints.

This does not leave a gap in the four required conceptual methods; it only means the optional bonus evidence is not pursued.

---

# 16. Step 9 — Define FURPS Evaluation Criteria — COMPLETED

## 16.1 Goal

Freeze the Functionality and Usability criteria, decision rules, planned cases,
and blank recording fields **before** formal design evaluation begins.

Assignment 5 emphasises the Functionality and Usability dimensions of FURPS.
Reliability, Performance and Supportability may provide enabling technical
observations, but they are not independently scored in this evaluation.

## 16.2 Authoritative output

The completed criteria and execution rules are in:

```text
evaluation/00_protocol/evaluation_protocol.md
```

Use `A5-PROTOCOL-01`, version `2.1`, with baseline
`B01-A5-EVALUATION`. Do not create a second FURPS plan: the protocol is the
single source of truth for F1–F13, U1–U9, case mappings, result scales,
inspection coverage, and evidence templates.

## 16.3 Actions completed for this step

- [x] Defined F1–F13 and their acceptance observations.
- [x] Mapped each Functionality criterion to BB, WB, simulation, bounds,
  dynamic, scenario, or UI evidence.
- [x] Defined U1–U9 as a structured evaluator inspection rather than a human
  usability study.
- [x] Fixed desktop/mobile, locale, theme, keyboard, state, and screen coverage.
- [x] Defined execution status separately from outcome.
- [x] Defined content-adequacy scoring for F2–F4/F6.
- [x] Defined usability issue severity 0–3.
- [x] Added blank F1–F13 and U1–U9 pre-execution registers.
- [x] Preserved the rule that no evidence means Not assessed, never Pass.

## 16.4 Decision rules to use in every later step

### Execution status

| Status | Use when |
|---|---|
| Not run | The case is planned but has no execution evidence |
| Executed | The procedure is complete and evidence is retained |
| Blocked | A dependency prevented execution; record the exact reason |
| Not applicable | The case is outside scope with a written justification; it is not a pass |

### Outcome

| Outcome | Use when |
|---|---|
| Pass | Every mandatory predefined assertion holds and evidence exists |
| Partial | A composite criterion has incomplete coverage or limited adequacy; list each gap |
| Fail | At least one mandatory assertion is contradicted |
| Not assessed | Evidence or qualified judgement is insufficient |

Binary code/API assertions use Pass or Fail. Never convert a failed mandatory
assertion to Partial. Do not calculate one combined FURPS score.

## 16.5 Completion check

Step 9 is complete because the criteria, case mappings, evidence boundaries,
inspection matrix, and blank registers are recorded in protocol 2.1. This is
preparation evidence only: **no FURPS criterion has yet been evaluated**.

FURPS is not one extra test run. Build F1–F13 outcomes from the evidence
collected in Steps 10–15 and the executable scenario. Execute U1–U9 once the
main routes and states are available, using the checkpoint in §18 below. Then
consolidate both registers; do not count the same screenshot or test several
times as independent evidence.

## 16.6 Next action

**Step 10 is complete.** Formal run `RUN-B01-20260930-STATIC-01` executed
STA-01–STA-14 on 30 September 2026. Its command results and architecture
inspections are recorded in
[static_analysis_test_cases.md](../evaluation/02_design/static/static_analysis_test_cases.md),
with the separate [formal command log](../evaluation/02_design/static/raw/STA-RUN-01-command-log.md)
and coverage summary indexed as E001–E003. These are not the baseline-freeze
verification results.

Evidence-integrity check on 2 October 2026 confirmed that all three registered
SHA-256 hashes match their artefacts and that the 66 current production files
still match B01. This check is not a new execution of STA-01–STA-14. Preserve
the original results, including the blocked integration attempt, permitted
retry, historical service/DAO coverage scope and recorded limitations.

Steps 11–18 and §18.1 also have recorded results. The usability checkpoint is
complete with findings (six Pass / three Partial, E036–E038); the literature-
grounded informed argument is recorded as E039–E041; the fresh live scenario is
recorded as E042–E044; the design literature comparison as E045–E048.
Step 20's audit is also complete (E049–E057), and Step 21's results are now recorded (E061–E063). Proceed to **Step 22's PIRQOA matrix**,
retaining all earlier qualifications and the three
usability issues; do not treat completion as an all-criteria Pass.

---

# 17. FURPS — Functionality Criteria Summary

The table below is a navigation summary. The complete acceptance observations
and mappings in `evaluation/00_protocol/evaluation_protocol.md` govern the run.

| ID | What must be evaluated | Main planned evidence |
|---|---|---|
| F1 | Valid inquiry creates a retrievable session; invalid and 1,001-character inquiry does not create corrupt state | BB01, BB02, BB20 |
| F2 | Explicit context is honoured; ambiguity is clarified or explicitly qualified | BB03, SIM13–SIM16 |
| F3 | Language preference is followed and useful English STEM terms are retained without observed material mistranslation | BB04, simulation, qualified language review |
| F4 | Simple, example, technical, reflection, and revealable hint support is present and meaningful | BB05, simulation, scenario |
| F5 | High, Medium, and Needs Support persist; invalid response/Stage 6B combinations are rejected without mutation | BB06–BB08, BB23, WB01 |
| F6 | Correct route is selected and support changes meaningfully; High records fade without implying mastery | BB06–BB10, WB01, simulation |
| F7 | Generated adaptation remains within rounds 0–2; capped/concurrent requests create no round 3 | BB09–BB11, BB24, bounds, WB05 |
| F8 | Relevant follow-up retains active context; unrelated, over-length, and third follow-up are controlled | BB12, BB13, BB21, WB03 |
| F9 | Creation, response events, adaptations, interpretation trace, and follow-ups survive retrieval without unintended duplicates | BB09–BB16, WB05, dynamic analysis |
| F10 | History is newest-first and learner-scoped with accurate state | BB14, BB22 |
| F11 | Review/Resume reconstructs stored state and completed sessions reject new responses | BB15, BB16, BB24, WB02 |
| F12 | Valid preferences persist and affect intended behaviour; invalid values and snapshot semantics are handled correctly | BB04, BB17, WB06 |
| F13 | Invalid input, missing/foreign/completed sessions, provider failures, and malformed output return controlled errors without invalid persistence | BB02, BB18–BB24, WB02–WB04 |

For F2–F4/F6, score technical correctness, contextual relevance, language
adequacy, explanation beyond translation, and adaptation appropriateness using
2 = adequate, 1 = limited, 0 = materially wrong/absent, and NA = not
assessable. A required 0 fails the case; a required NA prevents a full content
judgement.

---

# 18. FURPS — Usability Criteria Summary

This is a **structured usability inspection**, not participant testing.

| ID | Inspection question |
|---|---|
| U1 | Is inquiry entry and purpose evident on Home/Ask? |
| U2 | Are simple, example, technical, reflection, and hint sections distinguishable? |
| U3 | Are Stage 6A choices, optional Stage 6B choices, skip, and consequences understandable? |
| U4 | Are loading, adaptation, route/limit, error, and updated-state feedback visible? |
| U5 | Can the evaluator find New Inquiry, History, Review/Resume, and preferences without a dead end? |
| U6 | Are Burmese glyphs, line breaks, and mixed English terms legible without clipping? |
| U7 | Are self-reported support need, route, round/limit, completion, and review recommendation distinguishable? |
| U8 | Are errors localised, understandable, and accompanied by recovery where applicable? |
| U9 | Are labels, controls, positions, patterns, and terminology consistent across screens/locales? |

Inspect Chrome at 1440 × 900 and 390 × 844, English and Burmese UI,
bilingual support, light and dark themes, keyboard navigation, visible focus,
and normal/loading/empty/error/adapted/completed/review states.

Record severity as 0 = none, 1 = cosmetic, 2 = task impeded with a workaround,
or 3 = task blocked/materially misleading. Pass requires all planned checks and
no severity 2/3 issue; Partial means incomplete coverage or severity 2; Fail
means severity 3. Retain severity 1 issues even when the criterion passes.

## 18.1 Usability execution checkpoint — COMPLETED WITH FINDINGS

Executed on 2 October 2026 as `RUN-B01-20261002-USABILITY-01` (E036–E038).
[Inspection](../evaluation/02_design/usability/usability_inspection.md) records
133 observations/screenshots (131 main plus two Back-navigation rechecks) across eight desktop/mobile × locale × theme
configurations, routes/states and native keyboard checks. U1/U2/U3/U4/U6/U7
Pass; U5/U8/U9 Partial. USI-01 modal focus and USI-02 English-only errors in
Burmese UI are severity 2; USI-03 ambiguity badge is severity 1. UI-unreachable
invalid preference values and other exclusions are explicitly accounted for.
The 66 root production files match B01; no source copies, external provider
calls, production fixes, participant study or new qualified content review.
Step 16 was the next action at checkpoint completion and is now recorded in
§25 (E039–E041). The checkpoint procedure below is retained as the run plan.

Complete this checkpoint after Steps 14–15 have made the required states
repeatable and before Step 16 synthesis.

Create:

```text
evaluation/02_design/usability/usability_inspection.md
evaluation/02_design/usability/issues.csv
evaluation/02_design/usability/raw/
```

Use the screen/state matrix in protocol §5.4. For every observation, record
criterion, screen, state, locale, support language, theme, viewport, keyboard
steps, actual observation, severity, task effect, recovery/recommendation,
evidence ID, evaluator, and language competence.

This checkpoint is complete when U1–U9 each have an execution status and
outcome; every planned combination is executed or explicitly accounted for;
all severity 1–3 issues remain visible; and no evaluator observation is
described as participant feedback or accessibility certification.

---

# 19. Step 10 — Analytical Evaluation: Static Analysis — COMPLETED

## 19.1 Goal

Create the first formal B01 design-evaluation evidence by checking buildability,
automated structural checks, code organisation, validation boundaries, and
application-controlled state without relying on UI behaviour.

## 19.2 Inputs and outputs

Use:

- baseline `B01-A5-EVALUATION`;
- protocol `A5-PROTOCOL-01` version `2.1`; and
- the versions and constraints in `evaluation/00_protocol/b01_environment.md`.

Create:

```text
evaluation/02_design/static/static_analysis_test_cases.md
evaluation/02_design/static/raw/
```

The test-case file now serves as the combined specification and executed result
record. Command output and coverage data are retained in `raw/`.

## 19.3 Execute in this order

Run from `burmese_stem_ai/` in a clean B01 evaluation checkout:

```bash
npm run lint
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run build -- --webpack
npx tsc --noEmit
```

The production build precedes the final standalone TypeScript check because a
fresh checkout may not yet contain Next.js generated types. If an earlier
TypeScript attempt fails for that reason, retain the failed log and the later
result; do not erase the first attempt. Record missing dependencies or blocked
network access as Blocked rather than Fail when the application was not the
cause.

## 19.4 Inspect the source structure

Record file/symbol locators and answer each question:

- Does UI call application/API boundaries rather than the provider directly?
- Do services own validation, routing, lifecycle, and round decisions?
- Do DAOs own persistence rather than model prompts or UI components?
- Is provider output validated before persistence?
- Are learner ownership and session UUIDs validated at route/service/DAO
  boundaries?
- Is `MAX_ADAPTATION_ROUNDS` enforced by application and persistence logic?
- Are provider URL/model/timeout/output extraction centralised while prompts
  and validators remain domain-specific?
- Do schema fields reconstruct response events, adaptations, follow-ups,
  preferences, and interpretation history?

## 19.5 Record the results

| Check | Expected | Actual | Execution status | Outcome | Evidence ID |
|---|---|---|---|---|---|
| Lint | Exit 0 | Exit 0; no blocking diagnostic | Executed | Pass | E001 |
| Deterministic tests | Exit 0 with exact test counts retained | 23 files; 208 tests passed | Executed | Pass | E001 |
| V8 coverage | Report retained with tool scope/exclusions | 89.54% statements; 91.33% branches; 91.17% functions; 90.98% lines | Executed | Pass | E001, E003 |
| MongoDB integration | Isolated persistence/concurrency suite completes | First sandbox attempt Blocked; unchanged permitted retry passed 1 file/5 tests | Executed | Pass | E001 |
| Combined suite | Deterministic and database modes complete | 208 deterministic and 5 integration tests passed | Executed | Pass | E001 |
| Production build | Exit 0 using webpack path | Exit 0; compile, TypeScript, 8 pages and route manifest completed | Executed | Pass | E001 |
| TypeScript | Exit 0 after generated types exist | Exit 0; no diagnostic | Executed | Pass | E001 |
| Architecture inspection | Separation and controls recorded with locators | STA-08–STA-14 passed with source locators and legacy/runtime qualifications | Executed | Pass | E002 |

Coverage is structural evidence only. It cannot establish Burmese quality,
STEM correctness, usability, or educational effectiveness.

## 19.6 Completion criteria

Step 10 completed under run `RUN-B01-20260930-STATIC-01`. All STA-01–STA-14
assertions passed. The first integration attempt was retained as an environment
block before a successful unchanged retry. Coverage scope, Mongoose warning,
legacy-snapshot qualification, and static-only claim boundaries remain visible
in E001–E003. Proceed to Step 11.

---

# 20. Step 11 — Analytical Evaluation: Dynamic Analysis — COMPLETED WITH QUALIFICATION

## 20.1 Goal

Observe the real application, API, provider boundary, and database working
together. Preserve UI/API output and state before/after each operation.

## 20.2 Outputs

Create:

```text
evaluation/02_design/dynamic/dynamic_analysis_test_cases.md
evaluation/02_design/dynamic/dynamic_analysis.md
evaluation/02_design/dynamic/timings.csv
evaluation/02_design/dynamic/raw/
```

## 20.3 Preparation

1. Record the run ID and confirm B01/protocol 2.1.
2. Start the dedicated evaluation MongoDB and application.
3. Record non-secret provider/model configuration and whether each operation
   uses a mock, real database, or live provider.
4. Create artificial learner aliases and capture their initial database state.
5. Open browser developer tools or equivalent request logging.

## 20.4 Execute and record

For at least one controlled workflow, capture:

1. session creation and initial generation;
2. persisted initial state;
3. High/fade and generated adaptation transitions;
4. response event, round, status, route, and adaptation before/after state;
5. relevant and unrelated follow-up behaviour;
6. History retrieval;
7. Review/Resume reconstruction;
8. explicit completion and post-completion rejection; and
9. a controlled error with verification that valid state was preserved.

For each operation, retain the request/action, response, visible UI, stored
state, execution status, outcome, evidence ID, and any discrepancy. Do not use
source inspection to fill a missing runtime observation.

## 20.5 Timing procedure

Run three independent fresh-session initial-generation attempts for each fixed
question below: 15 attempts in total, excluding separately identified retries.

1. What is photosynthesis, and how do plants make food?
2. What is gravity?
3. What is electric current?
4. What is inheritance in object-oriented programming?
5. What is pH?

Measure the same client request-to-response boundary using a monotonic timer.
Record query, attempt, operation, start/end, elapsed milliseconds, success,
timeout, retry relationship, and environment. Report per-query and pooled
successful-attempt median/minimum/maximum with sample sizes. Report failures
and timeouts separately. Adaptation and follow-up timings may be descriptive
but must not be pooled with initial generation.

No latency pass threshold is specified, so timing is descriptive evidence—not
a claim of acceptable performance.

## 20.6 Completion criteria

Step 11 is complete when all listed behaviours are observed or transparently
Blocked/Not assessed, state and visible behaviour are linked, all 15 timing
attempts are accounted for, raw evidence is retained, and the evidence register
is updated.

### Actual completion record

Run `RUN-B01-20261001-DYNAMIC-01` executed the real application against an
isolated MongoDB database and the live configured provider. The completed
API/database assertions passed, including deterministic route transitions,
the round-two cap, fade, ownership, follow-up scope, completion idempotence,
post-completion rejection, concept reinterpretation, and a controlled provider
failure. All 15 initial-generation timing attempts returned HTTP 201; pooled
successful timing was 2592.835–4640.164 ms with a median of 3330.576 ms.

The first DYN-10 driver summary contained a false failure because it checked
the wrong response path; the original output and the evidence-based
adjudication are both retained. The first DYN-13 attempt was blocked by the
Next.js development lock before any request, followed by a successful
controlled-failure retry.

The initial automated run had no browser surface, so its visual assertions were
left Blocked/Not assessed rather than inferred. Nathan subsequently completed
manual-browser addendum `RUN-B01-20261001-DYNAMIC-UI-01`: UI-01–UI-12 all
passed in desktop Chrome 154.0.8037.59 at 1440 × 900, English UI and Light
theme. Evidence E010–E013 records the observations, metadata, screenshot
manifest and localhost HAR. Direct zero-provider-call assertions for DYN-05
and DYN-06 remain indirect; mobile, Burmese UI, Dark theme, keyboard and
participant usability remain later work. Evidence E004–E013 now supports the
Step 11 result. Step 12 was subsequently executed as recorded below.

---

# 21. Step 12 — Analytical Evaluation: Optimisation / Bounds — COMPLETED

## 21.1 Goal and claim boundary

Test the implemented interaction bounds and state invariants. Do **not** claim
global optimisation or that two adaptations are pedagogically optimal.

Create:

```text
evaluation/02_design/optimisation/bounds_analysis_test_cases.md
evaluation/02_design/optimisation/bounds_analysis.md
evaluation/02_design/optimisation/raw/
```

## 21.2 Execute the bounds matrix

Record round/status/event/adaptation counts before and after every action.

1. Start a fresh session at round 0.
2. Generate the first adaptation and verify round 1.
3. Generate the second adaptation and verify round 2 plus the documented
   status.
4. Send a further Medium/Needs Support response and verify that the response
   event persists but there is no provider call, third adaptation, or round 3.
5. Send High at rounds 0, 1, and 2 and verify `fade`, no generation, and no
   round increment.
6. At round 2, check High, Medium, and Needs Support separately.
7. Complete an `in_progress` session and a `review_recommended` session.
8. Repeat completion and verify idempotent behaviour.
9. Attempt a response after completion and verify controlled rejection.
10. Race two adaptation requests near the cap using the real evaluation
    database; verify stored invariants and record conflict handling.

For generation cases, record provider-call count as well as visible output and
stored state. A correct enum alone is insufficient.

## 21.3 Interpretation

If the cases pass, the evidence supports bounded interaction,
application-level control, prevention of unlimited generated adaptations, and
predictable state transitions under the tested conditions.

It does not show that two rounds maximise learning, suit every learner, or are
globally optimal.

## 21.4 Completion criteria

Step 12 is complete when all ten actions have recorded expected and actual
state, execution status, outcome, evidence ID, and limitations, including the
real-database concurrency case. Update F7 and relevant F5/F6/F9/F13 records.

### Actual completion record

Run `RUN-B01-20261001-BOUNDS-01` executed BND-01–BND-17 using a deterministic
provider spy and real isolated MongoDB 8.2.6 persistence. All 17 cases passed.
Generated adaptations advanced 0→1→2 with one provider call each; every capped
route and High/fade at rounds 0, 1 and 2 made zero provider calls and created
no extra adaptation. Explicit completion, idempotent repeat, HTTP 409 after
completion, and invalid rounds -1/0.5/3 behaved as specified.

Both concurrency cases began from the same stored snapshot. Near the cap,
exactly one response write succeeded and one returned a controlled conflict,
leaving round/adaptation/event counts 2/2/2. At the cap, exactly one event
append succeeded, leaving 2/2/3 with zero provider calls. The near-cap race did
perform two provider calls before the atomic write conflict, so stored state is
protected but duplicate provider work remains possible during that race.

Evidence E014–E017 retains the first environment/runner failures, exact runner,
machine results and analysed report. The unchanged application also passed 208
deterministic tests, 5 integration tests, lint and TypeScript. This establishes
the implemented bound under tested conditions; it does not show that two
adaptations are educationally or globally optimal. Proceed to Step 13.

---

# 22. Step 13 — Experimental Evaluation: Simulation — COMPLETED WITH FINDINGS

Execution `RUN-B01-20261001-SIMULATION-02` accounted for all 48 core attempts
and seven separate routes: 44 technical Pass, eight initial controlled
ambiguity outcomes with no session, three technical Fail. Exact generated
text, provider calls and before/after documents are retained. SIM05-C timed
out/aborted; SIM-CM-13/16 rejected unchanged concepts labelled corrected.
Failed response steps did not change stored state. No frozen source was fixed
or failed model call retried. The aborted runner-comparison attempt is retained
separately. See [technical analysis](../evaluation/02_design/simulation/simulation_analysis.md),
[failure analysis](../evaluation/02_design/simulation/failure_analysis.md), and
[qualified human worksheets](../evaluation/02_design/simulation/qualified_human_judgement.md).

**Review completed:** Nathan confirmed reviewing and accepting all 55
AI-assisted worksheets on 2 October 2026 and authorised Codex to record typed
sign-offs. The 91 delivered-output findings are 18 Pass, 71 Partial and two
Fail; Nathan's saved SIM04-A amendment is preserved. The eight ambiguity
messages and three technical failures retain their separate assessments and
NA limitations. F2–F4/F6 are updated in the protocol (E022–E023). This is
completed evaluation with mixed findings, not universal adequacy or learning
effectiveness. Review times were not supplied. See the dated
[approval record](../evaluation/02_design/simulation/review_completion/approval_record.md).

## 22.1 Goal

Execute a fixed multi-domain artificial corpus through repeatable response
paths. These are artificial cases, not learner data or independent learner
observations.

Create:

```text
evaluation/02_design/simulation/simulation_test_cases.md
evaluation/02_design/simulation/simulation_cases.csv
evaluation/02_design/simulation/content_reference_notes.md
evaluation/02_design/simulation/simulation_results.csv
evaluation/02_design/simulation/raw/
```

## 22.2 Freeze the 16 cases before execution

Use the exact inputs below; do not replace a difficult case after seeing its
output.

| ID | Domain | Exact input |
|---|---|---|
| SIM01 | Biology | What is photosynthesis, and how do plants make food? |
| SIM02 | Biology | What is DNA? |
| SIM03 | Biology | What is osmosis? |
| SIM04 | Physics | What is gravity? |
| SIM05 | Physics | What is electric current? |
| SIM06 | Physics | What is momentum? |
| SIM07 | Chemistry | What is pH? |
| SIM08 | Chemistry | What is an ion? |
| SIM09 | Chemistry | What is a catalyst? |
| SIM10 | Computing | What is inheritance in object-oriented programming? |
| SIM11 | Computing | What is an algorithm? |
| SIM12 | Engineering | What is carbon fibre? |
| SIM13 | Ambiguous | What is a cell? |
| SIM14 | Ambiguous | What is current? |
| SIM15 | Ambiguous | What is a network? |
| SIM16 | Ambiguous | What is inheritance? |

Before execution, write an expected concept/domain, key facts, unacceptable
misconceptions, and source/reference basis for each case. Use fixed
beginner/bilingual/guided preferences and record the UI locale.

For SIM13–SIM16, first preserve the system's ambiguity behaviour. Then use the
fixed clarifications below where the workflow permits:

- SIM13: `I mean a biological cell`;
- SIM14: `I mean electric current`;
- SIM15: `I mean a computer network`; and
- SIM16: `I mean inheritance in object-oriented programming`.

If no clarification flow is available, record the limitation. A new explicitly
contextualised inquiry is a separate continuation, not a retroactive pass.

## 22.3 Execute three paths per case

This produces **48 planned fresh sessions**, excluding retries.

### Path A — Fade

```text
Initial → High → persist fade at round 0 → no generation/increment
→ explicit Finish → completed
```

### Path B — Default Medium route

```text
Initial → Medium + skip → default another_example at round 1
→ High → persist fade at round 1 → explicit Finish
```

### Path C — Two adaptations and cap

```text
Initial → Needs Support + simpler_explanation → round 1
→ Needs Support + concept_unclear → round 2 + review_recommended
→ extra Needs Support + skip → persist event, no provider call/round 3
```

Exercise `language_terms` and `concept_mismatch` as separately labelled route
cases. For concept mismatch, record `corrected`, `ambiguous`, or
`limit_reached` without forcing a correction.

## 22.4 Record and assess

For every session, retain:

- exact input, preferences, session alias, path and attempt;
- initial and adapted generated content;
- overall support need, difficulty type, selected route;
- round/status before and after each response;
- provider-call observation and persisted state;
- F2–F4/F6 content-dimension scores and assessor;
- execution status, outcome, evidence IDs, retry and limitation.

A different string or correct route label does not prove meaningful adaptation.
Judge the actual content using the frozen reference notes.

## 22.5 Completion criteria

Step 13 is complete when all 48 sessions plus the separately labelled language
and concept-mismatch cases are accounted for; no missing case is silently
dropped; exact output/state evidence and content ratings are retained; and F2,
F3, F4, F6, F7, F9, and F13 are updated as applicable.

---

# 23. Step 14 — Black-Box Testing — COMPLETED WITH QUALIFICATIONS

Run `RUN-B01-20261002-BLACKBOX-01` executed all 24 cases using real production
HTTP/proxy/services/DAOs and isolated MongoDB, with an evaluation-only controlled
provider seam. First API outcomes: 22 Pass/2 Fail, 370 assertions. Assessed
cases: 21 Pass/2 Partial/1 Fail; fixture semantic novelty is Not assessed,
and the public missing-identity 400 oracle failed because the proxy provisions
an anonymous cookie. An unsupported supplemental zero-round ambiguity
expectation also failed; generated clarification consumed a bounded round.
First failures and post-observation addendum are retained.

Forty-four browser observations/45 screenshots covered all Stage6B choices,
skip/back, language modes/overrides, History, full Review, Resume at rounds
0/1/2 and error recovery. Four failed display predicates and their explicit
rechecks remain recorded. Final export retained 42 synthetic sessions,
25 adaptations, 28 response events and seven follow-ups. Source diff against
B01 is empty; isolated servers are stopped. No external provider call or new
human content approval was made. E024–E027 index the evidence. See
[black-box analysis](../evaluation/02_design/black_box/black_box_analysis.md),
[metadata](../evaluation/02_design/black_box/00_run_metadata.md), and
[case register](../evaluation/02_design/black_box/black_box_results.csv).

## 23.1 Goal and outputs

Test externally observable behaviour through public UI/API boundaries without
using source code to infer an outcome.

Create:

```text
evaluation/02_design/black_box/black_box_test_cases.md
evaluation/02_design/black_box/black_box_results.csv
evaluation/02_design/black_box/raw/
```

Before execution, copy BB01–BB24 from protocol 2.1 into the cases file. Record
preconditions, artificial learner alias, dependency mode, exact action/input,
expected HTTP/state/UI assertions, FURPS IDs, REQ/RQ mapping, and blank actual
fields. Fix expected HTTP codes from frozen B01 routes; do not guess them from
this plan.

For every attempt, capture public output plus stored state only when state is
part of the predefined assertion. Record the first failure before retrying.

## 23.2 Required core tests

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

### BB06 — High / fade

Expected:

- response event records `fade`;
- no provider call, generated adaptation, or round increment;
- Finish remains explicit.

### BB07 — Default Stage 5 route

Expected:

- Medium with no Stage 6B choice selects another example;
- Needs Support with no choice selects simpler explanation;
- adaptation round increment.

### BB08 — Explicit Stage 6B routes

Expected:

- every bounded choice selects its documented route;
- language support may override presentation to bilingual for that adaptation;
- concept mismatch requires clarification and preserves its interpretation trace;
- skip remains available.

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

### BB20 — Inquiry length boundary

Expected:

- 1,000 characters follows the documented valid path;
- 1,001 characters is rejected without session creation.

### BB21 — Follow-up boundaries

Expected:

- 500 characters follows the documented valid path;
- 501 characters is rejected;
- a third follow-up is rejected without an extra persisted answer.

### BB22 — Learner isolation

Expected:

- one artificial learner cannot retrieve another learner's session/history.

### BB23 — Invalid response/session

Expected:

- invalid overall-support value and invalid Stage 6A/6B combination are
  rejected without mutation;
- missing, invalid, and foreign session identifiers return controlled errors.

### BB24 — Completion boundary

Expected:

- legal completion succeeds;
- repeated completion is idempotent;
- post-completion learner response is rejected without mutation.

Use controlled dependency fault injection for BB18–BB19. Do not wait for a
random provider failure.

## 23.3 Test record format

| Test / attempt | Preconditions | Input / action | Expected assertions | Actual | Execution status | Outcome | Evidence IDs | FURPS / RQ |
|---|---|---|---|---|---|---|---|---|

## 23.4 Completion criteria

Step 14 is complete when BB01–BB24 are each Executed, Blocked, or explicitly
Not applicable; every mandatory assertion has an individual outcome; actual UI,
API, and state evidence is retained where required; and F1–F13 registers and
the master evidence register are updated. A screenshot alone is insufficient
for content or persistence judgement.

---

# 24. Step 15 — White-Box Testing — COMPLETED WITH SCOPE NOTES

Executed 2 October 2026: `RUN-B01-20261002-ROOTTESTS-02`, E033–E035.
WB01–WB06 structural Pass: 361 deterministic tests and 12 separate real
MongoDB tests; all 39 planned route/round combinations executed against the
root project. Application-wide V8 coverage spans 42 files: 72.54% statements,
76.37% branches, 64.00% functions and 73.75% lines. Lint/TypeScript passed.
Coverage gaps and evidence boundaries are disclosed in
[white_box_evaluation.md](../evaluation/02_design/white_box/white_box_evaluation.md).
Production files match B01; tests/configuration have profile ROOTTESTS-02.
The superseded source-copy run and duplicate helpers were removed under user
direction. These results do not establish content quality, resolve black-box/
simulation findings or complete browser usability.

## 24.1 Goal and outputs

Evaluate the requirement-critical internal paths that explain black-box and
bounds behaviour. Do not attempt exhaustive testing of every implementation
detail.

Create:

```text
evaluation/02_design/white_box/white_box_test_cases.md
evaluation/02_design/white_box/white_box_evaluation.md
evaluation/02_design/white_box/raw/
```

Retain the exact test-source version, command, output, coverage scope, database
mode, inspected symbols, branches exercised, uncovered branches, and evidence
IDs. Mock-based results establish logic only; persistence/concurrency claims
require the real evaluation database.

## 24.2 Execute the six required groups

### WB01 — Adaptation

Test Stage 6A/6B validation, every route at rounds 0/1/2, default routes,
`fade`, invalid combinations, status decisions, provider-call counts, and no
generation at the cap.

### WB02 — Lifecycle

Test legal completion from `in_progress` and `review_recommended`, repeated
completion, missing/foreign session, and completed-response rejection. The
persisted statuses are only `in_progress`, `review_recommended`, and
`completed`; do not invent an `adapted` status.

### WB03 — Follow-up

Test valid/invalid payloads, missing context, in-scope/out-of-scope output,
500/501-character boundary, and the two-question limit.

### WB04 — Model contracts

Test valid output, missing fields, wrong types, blank required text, malformed
JSON, refusal/empty response, transport failure, timeout, and non-2xx response.
Confirm that invalid content is not persisted.

### WB05 — Persistence

Test creation/retrieval, response-event/adaptation/follow-up append, concept
interpretation trace, preference snapshot, ordering, ownership, and legacy
documents. With the real evaluation database, race two requests near the cap
and verify stored invariants/conflict handling.

### WB06 — Preferences

Test valid/invalid values, creation/update/retrieval, propagation to generation
and display, and existing-session snapshot behaviour after profile changes.

## 24.3 Commands and decision rule

Use the relevant deterministic and integration commands from Step 10. Add or
run a narrower test file only when its path and command are retained. Each
assertion is Pass or Fail; a group may be Partial only for explicitly incomplete
coverage, not for a known failed assertion.

Coverage percentages must identify tool, selected files, exclusions, and
whether the database suite is included. High coverage is not proof of content
quality, usability, or educational effectiveness.

## 24.4 Completion criteria

Step 15 is complete when WB01–WB06 each have cases, actual results, evidence,
and uncovered-branch notes; real-database evidence supports persistence and
concurrency claims; provider-call counts are asserted for fade/cap paths; and
the relevant FURPS/results registers are updated.

---

# 25. Step 16 — Design Artefact Descriptive Evaluation: Informed Argument — COMPLETED WITH QUALIFICATIONS

Recorded on 3 October 2026 as `ANALYSIS-B01-20261003-INFORMED-ARGUMENT-01`.
[Traceability](../evaluation/02_design/informed_argument/traceability.md) covers
eight major feature groups with proper author–date citations, a reference list,
recorded case/evidence IDs, counterarguments and bounded conclusions: two
Supported (optional stated-need collection; scoped follow-up mechanism) and
six Partially supported. Learning benefit and calibrated learner fit remain
Not assessed. [Source verification](../evaluation/02_design/informed_argument/reference_verification.md)
records seven primary references, access limits and additional-source/version
differences; the 2023 Tran preprint is not misrepresented as the 2026 text.
E039–E041 preserve the argument, source record and 116-entry integrity manifest.
All 33 previously registered artefacts and 66 production files verified unchanged;
no new PoC run, model call, human approval or production fix in Step 16. At that
checkpoint Step 17 was next; its subsequent execution is recorded in §26.
Step 18's wider design literature evaluation is not completed by this source check.

## 25.1 Goal and output

Evaluate whether each implemented feature exists for a defensible requirement
and whether its observed behaviour matches that rationale.

Create:

```text
evaluation/02_design/informed_argument/traceability.md
```

Do this after Steps 10–15 so every implementation statement can cite actual
runtime or test evidence rather than source intent alone.

| System feature | Requirement | Conceptual basis | Literature/theory | Evaluation question |
|---|---|---|---|---|
| Terminology/context identification | RQ1 requirement | Artefact 3 | Tran; He | Is the feature justified and implemented? |
| Burmese/English support | RQ1 | Context-Sensitive Language Support | Kleidermacher & Zou | Does implementation match the rationale? |
| Structured explanation | RQ2 | Conceptual Explanation / Structured Scaffolding | Athukorala; Kuzu | Does the PoC go beyond translation? |
| Adaptation | RQ3 | Learner Response → Updated Scaffolding | van de Pol; Wood | Is support actually adjusted? |
| Scoped follow-up | RQ3 | Structured Scaffolding | system-control rationale | Is interaction bounded? |
| History/preferences | RQ3 | Adaptive/task-aligned support | TTF | Does persistence support continuity? |

## 25.2 Procedure

For every row:

1. state the problem/issue and requirement;
2. identify the conceptual stage and theory/literature warrant;
3. cite the frozen implementation feature and runtime evidence;
4. explain why the feature is necessary or what is lost if removed;
5. state a counterargument, mismatch, or scope limitation; and
6. conclude Supported, Partially supported, Not supported, or Not assessed.

Do not use literature-based plausibility as proof that generated content is
correct or that learning improves.

## 25.3 Completion criteria

Step 16 is complete when every major implemented capability is traced through
problem → requirement → RQ → conceptual basis → implementation → observed
evidence → limitation, with no evidence-free “implemented successfully” claim.

---

# 26. Step 17 — Design Artefact Scenario Evaluation — COMPLETED WITH QUALIFICATIONS

Executed on 3 October 2026 as `RUN-B01-20261003-SCENARIO-02` against the actual
root B01 production build, live model and isolated MongoDB, not copied sources
or fixtures. [Scenario report](../evaluation/02_design/scenario/photosynthesis_scenario.md)
retains the exact fixed inquiry, preferences, generated content, 18 public HTTP
records, 18 state snapshots, five provider calls and 24 browser observations /
27 screenshots (E042–E044). One session finished with two adaptations, four
response events and one relevant follow-up. All 15 final recorded-evidence
checks passed. Cap, High-at-cap and completed-response checks are explicitly
API-only; round-2 UI does not offer High. Recorded preflight/recorder/verifier
corrections are not attributed to production. Content judgement remains
provisional Partial (novelty, English retention, technical-scope wording).
No fresh human endorsement, learning gain, production fix or prior-result
promotion is claimed. Isolated servers stopped. At that checkpoint Step 18
was next; it is now recorded separately in §27.

Use the same **Photosynthesis** scenario for the PoC.

This is useful because the conceptual and system evaluations can be compared.

Create:

```text
evaluation/02_design/scenario/photosynthesis_scenario.md
evaluation/02_design/scenario/raw/
```

Use a dedicated artificial identity and record protocol, B01, run ID,
preferences, browser/viewport, provider mode, exact content, state, screenshots,
and evidence IDs. The conceptual walkthrough and executable PoC scenario must
retain separate evidence IDs and conclusions.

## 26.1 Step-by-step PoC scenario

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

- skip Stage 6B selects default `another_example`;
- adaptation round becomes 1;
- the response event and adaptation persist;
- support changes meaningfully.

### Step E — Second learner response

Choose:

> **I need more explanation / Needs Support**

Verify:

- choose `concept_unclear`;
- second adaptation occurs and differs from prior support;
- round becomes 2 and status becomes `review_recommended`;
- response, route, and adaptation persist.

### Step F — Stronger understanding

If the workflow allows:

> **I understand / High**

Verify:

- a `fade` response event is recorded;
- no provider call, generated adaptation, or round increment occurs;
- status at the cap matches the documented contract;
- explicit Finish is still required for completion.

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

Then finish explicitly, return through History, review the completed session,
and attempt a post-completion response to confirm controlled rejection.

## 26.2 Scenario evaluation questions

1. Does the PoC implement every important framework stage?
2. Does the output match the intended language-support strategy?
3. Is the explanation genuinely structured?
4. Does learner response change subsequent support?
5. Is adaptation bounded?
6. Is follow-up concept scoped?
7. Is session state preserved?
8. Are any framework elements missing in implementation?
9. Are any implemented features not traceable to the conceptual design?

## 26.3 Completion criteria

Step 17 is complete when every scenario action has expected and actual results,
the exact generated content and state trail are retained, unreachable actions
and failures remain visible, U1–U9 observations are linked where applicable,
and no input is changed mid-run to force a success narrative.

---

# 27. Step 18 — Design Artefact SLR Evaluation — COMPLETED WITH QUALIFICATIONS

Recorded on 3 October 2026 as
`ANALYSIS-B01-20261003-DESIGN-LITERATURE-01`, DA-LIT:

- E045: [13-row capability matrix](../evaluation/02_design/literature/literature_matrix.csv), including all five SSR systems.
- E046: [design synthesis](../evaluation/02_design/literature/literature_synthesis.md), with qualified integration/REQ/RQ conclusions.
- E047: [source verification and references](../evaluation/02_design/literature/reference_verification.md), including A2 locators and original-access/transfer/version limits.
- E048: 121-entry integrity manifest; 39 previous registered artefacts and 66 production identities unchanged. CSV/source/evidence/local-link checks Pass.

Literature-rationale ratings: one Strong, nine Moderate, two Limited, one
Contradictory/uncertain. These are not FURPS passes or content scores. The
PoC partially demonstrates the integration opportunity **within A2's reviewed
corpus**; ATE accuracy, consistent Burmese/STEM content quality, pedagogically
optimal two rounds, superiority and learning gains are not established. Three
primary named-locator inspections and one publisher-index abstract are
distinguished from seven Assignment-mediated sources. No new publication was
added to the corpus; no prior conceptual rating/empirical result changed; no
application run or new human approval occurred. Original execution guidance
is retained below. Next is Step 20; optional Step 19 remains skipped.

Use Assignment 2 and the SSR as benchmarks.

Create:

```text
evaluation/02_design/literature/literature_matrix.csv
evaluation/02_design/literature/literature_synthesis.md
```

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

For every row, record the Assignment 2 page/section and source identity,
evidence summary, whether support is direct or transferable, context limits or
counterevidence, observed PoC evidence ID, and a Strong/Moderate/Limited/
Contradictory-or-uncertain support rating. Check the original paper before
making a claim beyond the supplied Assignment 2 summary.

## 27.1 Completion criteria

Step 18 is complete when every evaluated capability has a literature locator,
fit/transfer limitation, implementation evidence, outcome, and limitation; gaps
and conflicting evidence are visible; and the synthesis does not claim PoC
superiority or educational effectiveness.

---

# 28. Step 19 — Optional Human Expert Evaluation of PoC — SKIPPED

The optional Human Expert Interview will not be conducted because of time constraints.

Do not imply that:

- expert feedback was collected;
- human usability testing was performed;
- learner outcomes were evaluated.

The Design Artefact Evaluation should instead focus on completing the required methods rigorously:

- FURPS Functionality and Usability;
- static analysis;
- dynamic analysis;
- optimisation/bounds;
- simulation;
- black-box testing;
- white-box testing;
- informed argument;
- scenario evaluation;
- academic literature.

---

# 29. Step 20 — Master Evidence Register — COMPLETE WITH QUALIFICATIONS

Recorded on 3 October 2026 as [E057 register audit](../evaluation/03_results/evidence_register_audit.md).
At Step 20 capture the [register](../evaluation/03_results/evidence_register.csv) had 52 entries:
43 design records unchanged, eight retrospective conceptual records (E049–E056)
and one administrative audit. All file hashes, ten manifests / 1,174 entries
and 66 B01 production identities match. E028–E032 remain retired. Unknown
historical dates, conceptual versus production baselines and derived-document
categories are explicit. Historical conceptual C4 (completeness/boundaries) is
not protocol C4 (literature consistency); use the audit crosswalk in Step 21.
Cookie-bearing synthetic black-box originals are restricted, not cleared for
sharing; redacted derivatives and a release-specific review are required before
public distribution. No historical outcomes, human approvals or B01 code were
changed, and no application/test/provider/database run was executed.

Subsequently, the user requested a literature-grounded conceptual informed
argument revision. E058–E060 extend the current register to 55 entries; all
52 captured records and their artefact hashes remain unchanged. Use the revised
CA-ARG conclusions at Step 21 without counting the two argument versions as
independent corroboration. The Step 20 manifest remains an as-captured record.

## 29.1 Goal and output

Create this register when Step 10 produces the first formal evidence, maintain
it after every later step, and audit/finalise it at Step 20:

```text
evaluation/03_results/evidence_register.csv
```

Use immutable sequential IDs `E001`, `E002`, and so on. Allocate an ID only
when the file/record exists. A case ID such as BB01 is not an evidence ID; one
case may have multiple evidence items and one evidence item may support several
criteria.

Use this schema:

```csv
evidence_id,run_id,baseline_id,method_id,case_id,artefact,description,path,locator_or_hash,captured_at,evaluator,dependency_mode,criteria,requirements,research_questions
```

## 29.2 Procedure

1. Register the existing conceptual evidence and verify every path/locator.
2. After each design step, append its raw logs, exact outputs, screenshots,
   state snapshots, inspection sheets, and synthesis files.
3. Reuse an existing evidence ID when the same artefact supports another
   criterion; do not duplicate it to inflate evidence counts.
4. Store no API keys, credentials, personal data, or anonymous identity tokens
   in shareable evidence.
5. Distinguish original and redacted evidence where redaction is necessary.

## 29.3 Completion criteria

Step 20 is complete when every cited evidence ID resolves to a retained
artefact with baseline/run/method/criteria/RQ metadata and no placeholder paths
remain.

---

# 30. Step 21 — Consolidated Results Table — COMPLETE WITH QUALIFICATIONS

Recorded 3 October 2026: [master_results.csv](../evaluation/03_results/master_results.csv),
E061, contains 225 immutable IDs R001–R225 with the exact schema below.
[Consolidation notes](../evaluation/03_results/consolidation_notes.md), E062,
index all substantive method findings, all C/F/U aggregates, conflicts and
unassessed/blocked/NA/skipped work. E063 hashes the retained inputs and derived
outputs; all 55 prior evidence rows and 66 B01 production identities are unchanged.
F1–F13 remain Partial; U1–U9 remain six Pass/three Partial; black-box remains
21 Pass/two Partial/one Fail. Conceptual rationale, structural mechanics and
delivered-content judgements are not pooled into a success rate. No app/test/
provider/database run, original-result edit, new human endorsement or release
clearance occurred. The register now has 58 entries. Step 22 is next.

Original execution instructions (fulfilled, retained):

After all evaluation methods are executed or accounted for, create:

```text
evaluation/03_results/master_results.csv
```

Use immutable result IDs `R001`, `R002`, and so on, with this schema:

```csv
result_id,baseline_id,artefact,method_ids,criteria,requirements,research_questions,execution_status,outcome,evidence_ids,interpretation,limitations,conflicting_evidence,follow_up
```

For each result, verify that evidence supports the wording, retain conflicts,
and distinguish Fail, Blocked, Not applicable, and Not assessed. If reporting a
rate, use `Pass / executed assessable cases` and disclose the denominator and
exclusions.

Do not write the final interpretation before this table is completed.

Step 21 is complete when every substantive conceptual and design result is
represented, evidence-linked, and bounded by a limitation.

---

# 31. Step 22 — Final PIRQOA Evaluation Matrix — NEXT

This is one of the most important final tables.

Create:

```text
evaluation/03_results/pirqoa_traceability.csv
```

Use this schema:

```csv
problem,issue,requirement_id,requirement,rq,objective,artefact,framework_stages,criteria,result_ids,evidence_ids,supported_claim,unsupported_claim_or_gap
```

## 31.1 RQ1

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

## 31.2 RQ2

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

## 31.3 RQ3

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

## 31.4 Completion criteria

Step 22 is complete when REQ-01/RQ1, REQ-02/RQ2, and REQ-03/RQ3 each trace
through artefact → criteria → result IDs → evidence IDs → supported claim and
remaining gap. No claim may rely on a path or result that does not exist.

---

# 32. Step 23 — Interpretation Rules

The final Results section should distinguish four types of conclusion.

## 32.1 Strong evidence

Example:

> After those tests have actually been executed and retained, an appropriately
> bounded result could state that black-box and white-box evidence confirmed the
> two-generated-adaptation limit under the evaluated paths.

## 32.2 Partial evidence

Example:

> The scenario demonstrated that the system can produce context-sensitive bilingual explanations for the evaluated Photosynthesis case, but the evaluation does not establish equivalent quality across all STEM domains.

## 32.3 Conceptual support

Example:

> The SLR and informed argument support the conceptual rationale for selective terminology preservation, but this does not establish educational effectiveness for Burmese learners.

## 32.4 Unsupported claim

Avoid:

> The system improves STEM learning.

Unless real learner-outcome evidence exists.

---

# 33. Step 24 — Recommended Figures and Tables

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

# 34. Step 25 — Recommended Final Assignment Structure

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
   2.6 Triangulation, Refinement, and Conceptual Evaluation Summary

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

# 35. Step 26 — Word Allocation

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
- triangulation/refinement summary: 100–150

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

# 36. Step 27 — Title, Abstract, and Keywords

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

# 37. Step 28 — Reference Strategy

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

# 38. Step 29 — Risks to an Excellent Mark

## Risk 1 — Describing instead of evaluating

Bad:

> The framework has seven stages.

Better:

> The framework was evaluated for completeness and sequence using literature, GenAI critique, informed argument, and a Photosynthesis scenario.

## Risk 2 — Missing one required method

### Conceptual — completed

- [x] GenAI
- [x] SLR
- [x] Informed argument
- [x] Scenario
- [x] Triangulation
- [x] Framework refinement decisions
- [x] Optional expert intentionally skipped

### Design — partially completed; remaining methods not yet complete

- [ ] FURPS Functionality
- [ ] FURPS Usability
- [x] Static analysis
- [x] Dynamic analysis (recorded qualifications retained)
- [x] Optimisation/bounds
- [x] Simulation (endorsed review; mixed findings retained)
- [x] Black-box (completed with oracle/content-scope qualifications)
- [x] White-box (WB01–WB06 structural Pass; scope notes retained)
- [x] Informed argument (Step 16; E039–E041; qualified literature-grounded conclusions)
- [x] Scenario (Step 17; E042–E044; technical Pass / provisional content Partial; UI/API boundaries retained)
- [ ] SLR
- [x] Optional expert intentionally skipped

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

> self-reported support signal indicating perceived need for more assistance.

## Risk 5 — Weak white-box evidence

A4 noted that automated tests were not yet complete. The refined B01 source now
contains deterministic and database-integration coverage, but Assignment 5
still requires formal execution records tied to the frozen baseline. Do not
report baseline-freeze checks as the final white-box evaluation.

Prioritize:

- adaptation;
- state transitions;
- scope validation;
- structured response validation;
- persistence.

## Risk 6 — Weak simulation design

Do not use only Photosynthesis.

Execute the fixed 16-case, 48-session protocol across multiple STEM domains and
ambiguous terminology; account for every case and deviation.

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

# 39. Step 30 — Practical Execution Order — UPDATED STATUS

Use this section as the progress dashboard. The numbered sections above contain
the full procedure and completion criteria. Complete one evidence-producing
step at a time and update this dashboard only after its artefacts exist.

## Phase A — Preparation — COMPLETE

### A1 — COMPLETED
Conceptual framework baseline evaluated and refinement history preserved.

### A2 — COMPLETED
The formal local baseline is `B01-A5-EVALUATION`, with annotated tag
`a5-evaluation-b01`. Baseline records are in:

```text
evaluation/00_protocol/b01_environment.md
evaluation/00_protocol/b01_artefact_versions.md
evaluation/00_protocol/b01_evidence_index.md
```

### A3 — COMPLETED
`evaluation/` folder created.

### A4 — COMPLETED
`evaluation/00_protocol/evaluation_protocol.md` version 2.1 contains the
current criteria and execution rules.

### A5 — PARTIAL
Conceptual evidence is organised. Create the master evidence register when
Step 10 produces its first formal artefact and maintain it continuously; do
not pre-allocate IDs to missing files.

---

## Phase B — Conceptual Artefact Evaluation — COMPLETE

### B1 — COMPLETED
Evaluation criteria C1–C5 defined.

### B2 — COMPLETED
GenAI interview executed.

### B3 — COMPLETED
Raw GenAI transcript preserved.

### B4 — COMPLETED
GenAI findings coded in `GENAI-01_analysis.md`.

### B5 — COMPLETED
Assignment 2 literature matrix and synthesis completed.

### B6 — COMPLETED
Informed-argument traceability completed.

### B7 — COMPLETED
Independent Photosynthesis scenario evaluation completed.

### B8 — COMPLETED
Four-method conceptual triangulation completed.

### B9 — COMPLETED
Framework refinement decisions completed and refined seven-stage interpretation frozen.

### B10 — SKIPPED
Human Expert Interview not conducted; optional bonus only.

---

## Phase C — Design Artefact Evaluation — METHODS RECORDED WITH QUALIFICATIONS

### C1 / Step 9 — COMPLETED PREPARATION
F1–F13, U1–U9, decision rules, case mappings, and blank registers are frozen
in protocol 2.1. No FURPS result is implied.

### C2 / Step 10 — COMPLETED
Run `RUN-B01-20260930-STATIC-01` executed STA-01–STA-14. All assertions passed;
E001–E003 retain command, coverage, and architecture evidence plus the initial
sandbox-blocked integration attempt and subsequent unchanged pass.

### C3 / Step 11 — COMPLETED WITH QUALIFICATION
Run `RUN-B01-20261001-DYNAMIC-01` completed the API/database/provider workflows
and all 15 timing attempts. Manual-browser addendum
`RUN-B01-20261001-DYNAMIC-UI-01` then passed UI-01–UI-12 in the recorded
desktop English/Light configuration. E004–E013 retain the evidence. Direct
provider-call absence for DYN-05/DYN-06 remains indirect.

### C4 / Step 12 — COMPLETED
Run `RUN-B01-20261001-BOUNDS-01` passed BND-01–BND-17. E014–E017 retain direct
provider-call counts, before/after state, lifecycle/invalid-round results, and
both real-database same-snapshot concurrency races.

### C5 / Step 13 — COMPLETED WITH FINDINGS
All 55 attempts are recorded in E018–E021 (44 technical Pass, eight controlled
ambiguity/no session, three Fail). Frozen references and exact text/state are
retained. Nathan endorsed the 55 worksheets/91 output-level ratings on
2 October 2026: 18 content Pass, 71 Partial and two Fail (E022–E023).
Authorised typed sign-offs and AI assistance are disclosed. Do not silently
rerun or replace failures; completion does not imply all criteria passed.

### C6 / Step 14 — COMPLETED WITH QUALIFICATIONS
All BB01–BB24 accounted for in `RUN-B01-20261002-BLACKBOX-01` (E024–E027):
first API 22 Pass/2 Fail; assessed 21 Pass/2 Partial/1 Fail, preserving oracle
discrepancies and fixture-content limits. Nine supplementary HTTP attempts and
44 Chrome observations are retained. F1–F13 updated; B01 source unchanged.

### C7 / Step 15 — COMPLETED WITH SCOPE NOTES
WB01–WB06 executed in `RUN-B01-20261002-ROOTTESTS-02` (E033–E035):
361 deterministic + 12 MongoDB tests passed; all 39 route/round combinations.
Application-wide V8 coverage 72.54% statements / 76.37% branches across 42 files; lint/TypeScript passed.
Coverage gaps and root captures retained; production B01 unchanged. Structural Pass is not a language/content/usability Pass.

### C8 / §18.1 usability execution checkpoint — COMPLETED WITH FINDINGS
`RUN-B01-20261002-USABILITY-01` executed U1–U9 with 133 browser captures across
eight configurations (E036–E038). Six Pass / three Partial; two severity-2 and
one severity-1 issue retained in `evaluation/02_design/usability/issues.csv`.
Inspection sheets, exclusions and protocol register are updated. Technical
evaluator evidence only; root production B01 unchanged; no participant claim.

### C9 / Step 16 — COMPLETED WITH QUALIFICATIONS
Eight literature-grounded feature arguments recorded on 3 October 2026
(E039–E041): two bounded Supported, six Partially supported; seven primary
references with explicit access/version/transfer limits. Uses recorded C2–C8
evidence; no new execution or learner-benefit claim. See §25 and traceability.md.

### C10 / Step 17 — COMPLETED WITH QUALIFICATIONS
Fresh live-provider Photosynthesis scenario recorded on 3 October (E042–E044):
15 technical checks Pass; exact content/state/screenshots retained; two-round
bound, one scoped follow-up, Resume/Review and explicit Finish observed.
High-at-cap unavailable in UI; three API-only boundaries separately labelled.
Content provisionally Partial; no human endorsement or learner-benefit claim.

### C11 / Step 18 — COMPLETED WITH QUALIFICATIONS
13 capability comparisons recorded on 3 October (E045–E048), including all
five SSR systems, source locators/access limits, transfer limits and observed
PoC evidence. Qualified integration rationale only; mixed content/technical
findings retained; no superiority or learning claim. See §27.

### C12 / Step 19 — SKIPPED
Human Expert Interview will not be conducted. Do not imply participant or
expert evidence.

---

## Phase D — Consolidation — CURRENT NEXT PHASE

### D1 / Step 20 — COMPLETE WITH QUALIFICATIONS
Register audited: 52 entries, E001–E027/E033–E057. All paths/hashes verified;
historical oracle mappings, unknown capture dates and restricted-original
release boundaries documented in E057. No result promotion or B01 rerun.

### D2 / Step 21 — COMPLETE WITH QUALIFICATIONS
225 immutable results recorded in E061; rules/coverage/conflicts in E062 and
integrity manifest E063. Prior 55 rows preserved; current register 58 entries.
Mixed outcomes and explicit unassessed/skipped/NA/Blocked work remain visible.

### D3 / Step 22 — NEXT
Create `evaluation/03_results/pirqoa_traceability.csv` and link REQ/RQ claims
to result and evidence IDs.

### D4
Identify converging evidence.

Example:

- literature supports adaptation;
- conceptual scenario shows the mechanism;
- black-box testing shows external behaviour;
- white-box testing confirms internal state/control logic.

### D5
Identify conflicting, failed, partial, or weak evidence.

### D6
Write explicit limitations and claim boundaries.

---

## Phase E — Drafting

Draft only after Phase D is complete. Do not write result sentences while
actual-result fields are blank.

Recommended order:

1. Section 2 — Conceptual Artefact Evaluation
2. Section 3 — Design Artefact Evaluation
3. Section 4 — Results and Interpretation
4. Section 1 — Evaluation Context
5. Conclusion
6. Title
7. Abstract
8. Keywords
9. References audit
10. Formatting audit

---

# 40. Step 31 — How to Continue From Here

The master plan, protocol, B01 baseline, Steps 10–18, §18.1 and Step 20 audit are ready. Do
not rerun them unless the baseline/protocol changes or a recorded regression
requires it. Structured usability now covers the planned desktop/mobile,
Burmese/English, light/dark and keyboard matrix with six Pass / three Partial;
retain its issue severity, fixture limitations and unexecuted checks.

## 40.1 Immediate request

Use this request next:

> Complete Step 22 — Final PIRQOA Evaluation Matrix. Use E061's 225 immutable
> result IDs, E062's synthesis rules and the 58-entry evidence register with
> E057's historical C4/method crosswalk. Create pirqoa_traceability.csv with
> the §31 schema. Map REQ-01/RQ1, REQ-02/RQ2 and REQ-03/RQ3 to supported claims
> and explicit gaps. Preserve Partial/Fail, literature-transfer limits,
> provisional scenario content, temporal supersession and skipped expert work.
> E058/E059 is the current conceptual argument; E053 is historical, not an
> independent second method. No B01 rerun/fix or invented results, participants,
> endorsements or public-release clearance. Do not write the final paper yet.

## 40.2 Requests after each completed step

Proceed one step at a time:

1. `Complete Step 22: map results and evidence to PIRQOA and research questions.`
2. `Complete the next interpretation step only after the PIRQOA matrix exists.`

At every stage, ask for execution—not a replacement plan—unless the frozen
protocol contains a real ambiguity. The agent should inspect current files,
perform the in-scope work, preserve raw evidence, and leave actual-result fields
blank when execution is blocked.

## 40.3 Drafting requests

Only after Steps 20–22 are complete:

> Write Section 2: Conceptual Artefact Evaluation in 800–1200 words using only
> recorded conceptual evidence and verified references.

> Write Section 3: Design Artefact Evaluation in 800–1200 words using only
> actual design-evaluation evidence.

> Write Section 4: Results and Interpretation in 500–750 words, triangulating
> conceptual and design results against PIRQOA and separating demonstrated,
> partial, failed, blocked, and unsupported claims.

---

# 41. Final Pre-Submission Checklist

## Assignment requirements

- [ ] Title ≤10 words
- [ ] Abstract ≤150 words
- [ ] Keywords ≤5
- [ ] Conceptual evaluation 800–1200 suggested
- [ ] Design evaluation 800–1200 suggested
- [ ] Results 500–750 suggested
- [ ] APA 7
- [ ] All tables/figures labeled consistently

## Conceptual evaluation — COMPLETE

- [x] Artefact choice justified
- [x] Evaluation criteria stated
- [x] GenAI interview completed
- [x] Full GenAI prompt/response preserved
- [x] GenAI findings coded separately from raw response
- [x] Assignment 2 SLR used as evaluation evidence
- [x] Literature matrix and synthesis completed
- [x] Informed argument completed
- [x] Scenario completed
- [x] Four-method triangulation completed
- [x] Framework refinement decisions completed
- [x] Results transparent
- [x] Limitations and claim boundaries stated
- [x] Optional expert interview intentionally skipped

## Design evaluation

- [x] FURPS F1–F13 and U1–U9 criteria, case mappings, and decision rules frozen
- [x] FURPS Functionality evaluated and consolidated (F1–F13 all Partial; R080–R092; E061–E062; not an all-pass judgement)
- [x] FURPS Usability inspected (§18.1: six Pass / three Partial; issues/exclusions retained; E036–E038)
- [x] Static analysis executed (`RUN-B01-20260930-STATIC-01`)
- [x] Dynamic analysis executed (qualifications retained)
- [x] Optimisation/bounds analysis executed
- [x] Simulation executed and reviewed (mixed findings retained)
- [x] Black-box tests executed (qualifications retained; E024–E027)
- [x] White-box tests executed (WB01–WB06 structural Pass; E033–E035)
- [x] Informed argument completed (Step 16; eight feature arguments; qualifications retained; E039–E041)
- [x] Scenario completed (Step 17; E042–E044; technical and provisional content conclusions separated)
- [x] Academic literature used (Step 18 DA-LIT; 13 comparisons, five SSR systems; source/transfer limits retained; E045–E048)
- [x] Optional expert interview intentionally skipped
- [ ] Procedures reproducible

## Results

- [x] Master results table created (Step 21, 225 immutable rows; E061–E063)
- [ ] Results mapped to PIRQOA
- [ ] RQ1 addressed
- [ ] RQ2 addressed
- [ ] RQ3 addressed
- [x] Failures reported honestly in Step 21 (including original oracle failures; no promotion)
- [x] Limitations reported for every Step 21 result
- [x] Step 21 makes no educational-effectiveness claim (final paper remains to be checked)
- [x] Self-reported support signal described correctly in Step 21 (not mastery or diagnosis)

## Evidence

- [x] Master evidence register audited (Step 20, E057; 52 retained entries; mapping/privacy qualifications explicit)
- [x] Screenshots preserved (E012/E027/E038/E044 bundle manifests; not automatic public-release clearance)
- [x] Step 10 test logs preserved
- [x] Step 10 build/lint outputs preserved
- [x] Step 10 deterministic/integration outputs preserved
- [x] Step 10 scoped coverage summary saved
- [x] Simulation inputs saved
- [x] Simulation outputs saved and review endorsed
- [x] Timing data saved (E007; fifteen descriptive live-provider measurements)
- [x] GenAI transcript saved
- [x] GenAI analysis saved
- [x] Literature matrix saved
- [x] Literature synthesis saved
- [x] Informed-argument traceability saved
- [x] Conceptual scenario saved
- [x] Conceptual triangulation saved
- [x] Framework refinement decisions saved
- [x] PoC artefact/environment versions recorded for local baseline B01

---

# 42. Core Principle for the Final Assignment

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
