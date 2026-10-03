# Complete System Artefacts — Refined Version

## 1. Purpose

This document consolidates and refines the three system artefacts developed for the adaptive LLM-based STEM scaffolding Information System for Burmese-speaking learners.

The system artefacts are updated to align with the refined conceptual artefacts in `complete_conceptual_artefacts_refined.md`.

The three system artefacts are:

1. **Adaptive STEM Scaffolding System Framework**
2. **Adaptive STEM Scaffolding Logical Architecture**
3. **Burmese STEM AI Proof-of-Concept System**

Their relationship is:

> **system process → logical responsibilities → executable proof of concept**

The refinements do not introduce a major architectural redesign. They clarify:

- language-support decision responsibility;
- the separation between conceptual explanation and scaffolding;
- learner response as a self-reported support signal;
- two-level response collection within Stage 6;
- optional difficulty clarification through **“What would help you most?”**;
- adaptation-route selection in Stage 7;
- default Stage 5 adaptation when the difficulty type is unknown;
- bounded feedback routing;
- ambiguity correction;
- application-controlled workflow;
- claim boundaries around learning, diagnosis, and generated-content correctness.

---

## 1.1 Latest System-Design Refinement — Two-Level Learner Response

The refined conceptual framework now distinguishes between **how much support the learner reports needing** and **what kind of help the learner reports wanting**.

Stage 6 therefore remains one framework stage but contains two sub-steps:

1. **Stage 6A — Overall support need**
   - I understand
   - I partially understand
   - I need more explanation
2. **Stage 6B — Optional difficulty clarification**, asked only when additional support is requested:
   - Explain it more simply
   - Give me another example
   - Help with Burmese / English terms
   - I do not understand the concept
   - The concept or term is not what I meant

The optional prompt **“What would help you most?”** is therefore part of Stage 6, not a new eighth stage. Stage 7 uses the overall support signal and any optional difficulty clarification to select the adaptation route.

A key control rule is:

> If the learner requests more support but does not provide a difficulty type, the system should use the normal Stage 5 scaffolding route rather than guessing that the difficulty is linguistic, conceptual, or caused by misinterpretation.

---

# 2. Relationship to the Refined Conceptual Artefacts

The system artefacts operationalize the three conceptual artefacts.

```text
Conceptual Artefact 1
LLM-Based STEM Scaffolding Concepts
        ↓ defines required capabilities

Conceptual Artefact 2
Task-Aligned LLM Scaffolding Model
        ↓ defines relationships and feedback

Conceptual Artefact 3
Context-Aware Adaptive STEM Scaffolding Framework
        ↓ defines the seven-stage conceptual process

========================================================

System Artefact 1
Adaptive STEM Scaffolding System Framework
        ↓ converts conceptual stages into system behaviour

System Artefact 2
Adaptive STEM Scaffolding Logical Architecture
        ↓ assigns behaviour to logical responsibilities

System Artefact 3
Burmese STEM AI Proof-of-Concept System
        ↓ instantiates the design as executable software
```

The system artefacts remain traceable to:

- **RQ1** — terminology and language support;
- **RQ2** — conceptual explanation beyond translation;
- **RQ3** — structured and adaptive scaffolding.

---

# 3. Design Principles Carried Forward

## 3.1 Task–Technology Fit

The system should align its capabilities with identifiable learner tasks.

Study-specific dimensions remain:

- **language-support fit**;
- **conceptual-support fit**;
- **adaptive-interaction fit**.

This is a design alignment.

It does not prove that actual Task–Technology Fit has been empirically achieved.

---

## 3.2 Scaffolding Theory

The system should support:

- structured assistance;
- learner-responsive interaction;
- contingency;
- fading.

Important:

> The system responds to learner-reported support need. It does not objectively diagnose mastery.

---

## 3.3 Application-Controlled Workflow

The LLM is an enabling component.

The application remains responsible for:

- session state;
- allowed learner actions;
- adaptation limits;
- follow-up scope;
- lifecycle decisions;
- persistence;
- routing between support functions.

The LLM should not independently control the learning workflow.

---

# 4. System Artefact 1 — Adaptive STEM Scaffolding System Framework

## 4.1 Purpose

The **Adaptive STEM Scaffolding System Framework** translates the refined Context-Aware Adaptive STEM Scaffolding Framework into an operational system process.

It specifies how a learner's natural-language STEM inquiry is transformed into:

- terminology-sensitive support;
- technical-context interpretation;
- context-sensitive Burmese/English support;
- conceptual explanation;
- structured learner-facing scaffolding;
- learner-response collection;
- bounded adaptive support.

---

# 5. System Framework — Main Operational Flow

```text
┌─────────────────────────────────────┐
│ Learner STEM Inquiry                │
└──────────────────┬──────────────────┘
                   │ submits STEM question
                   ▼
┌─────────────────────────────────────┐
│ 1. Identify STEM Terminology        │
└──────────────────┬──────────────────┘
                   │ identified terminology
                   ▼
┌─────────────────────────────────────┐
│ 2. Interpret Technical Context      │
└──────────────────┬──────────────────┘
                   │ technical/domain meaning
                   ▼
┌─────────────────────────────────────┐
│ 3. Select Language Support          │
└──────────────────┬──────────────────┘
                   │ Burmese / English / bilingual strategy
                   ▼
┌─────────────────────────────────────┐
│ 4. Explain STEM Concept             │
└──────────────────┬──────────────────┘
                   │ core STEM meaning
                   ▼
┌─────────────────────────────────────┐
│ 5. Provide Scaffolding              │
└──────────────────┬──────────────────┘
                   │ learner-facing structured support
                   ▼
┌─────────────────────────────────────┐
│ 6. Collect Learner Response         │
│                                     │
│ 6A. Overall support need            │
│ 6B. Optional difficulty             │
│     clarification                   │
└──────────────────┬──────────────────┘
                   │ overall support signal
                   │ + optional difficulty type
                   ▼
┌─────────────────────────────────────┐
│ 7. Adapt Support                    │
│    Interpret signal(s), choose      │
│    bounded route, update support    │
└─────────────────────────────────────┘
```

The main sequence remains seven stages. Stage 6A and Stage 6B are sub-steps within **Collect Learner Response** and do not create an additional framework stage.

---

# 6. Operational Stage 1 — Identify STEM Terminology

## System responsibility

The system should identify the principal specialized STEM concept or terminology within the learner inquiry.

The learner is not required to manually identify:

- the technical term;
- the STEM discipline;
- the terminology category.

## Example

```text
Learner inquiry:
"What does current mean in an electric circuit?"

System interpretation:
Primary terminology = current
```

## Refinement

The system should allow the interpretation to be corrected if later technical context reveals ambiguity.

## RQ mapping

> **RQ1**

---

# 7. Operational Stage 2 — Interpret Technical Context

## System responsibility

The system should determine the relevant technical/domain meaning of the identified concept.

Example:

```text
Term:
current

Context:
Physics / electric circuit

Interpretation:
electric current
```

## Ambiguity correction

The normal path is:

```text
Identify Terminology
→ Interpret Context
```

If context reveals ambiguity:

```text
Interpret Context
→ refine terminology interpretation
```

This should be treated as an exception rather than a permanent circular loop.

## RQ mapping

> **RQ1 and RQ2**

---

# 8. Operational Stage 3 — Select Language Support

## System responsibility

The system should determine an appropriate Burmese/English support strategy.

The decision should consider:

1. identified STEM terminology;
2. interpreted technical context;
3. usefulness of retaining the English disciplinary term;
4. need for Burmese explanation;
5. learner language preference or expressed difficulty where available.

## Possible output strategies

```text
Burmese explanation only
English technical term retained
Bilingual Burmese + English
Contextual combination
```

## Refinement

The system should not assume:

```text
Every English STEM term
→ must be translated
```

Nor should it require a deterministic language-scoring algorithm.

The application or bounded generation request should communicate the decision constraints to the LLM.

## RQ mapping

> **RQ1**

---

# 9. Operational Stage 4 — Explain STEM Concept

## System responsibility

The system should generate or obtain the **core conceptual explanation** of the STEM concept.

This stage answers:

> **What STEM meaning should be communicated?**

It should establish:

- the main concept;
- technically relevant relationships;
- the meaning needed before learner-facing scaffolding is structured.

## Refinement

Stage 4 is distinct from Stage 5.

It should not be defined merely as:

> produce all learner-facing support blocks.

Its responsibility is the underlying concept meaning.

## RQ mapping

> **RQ2**

---

# 10. Operational Stage 5 — Provide Scaffolding

## System responsibility

The system should organize learner-facing support around the explained STEM concept.

Possible scaffold forms include:

- Simple Explanation;
- Real-World Example or Analogy;
- Technical Explanation / Detail;
- Reflective Prompt;
- Hint;
- clarification;
- alternative explanatory depth.

## Refined rule

These are **selectable scaffold forms** conceptually.

They are not theoretically required to appear cumulatively in every future interaction.

The current PoC may still choose to present a standard set during an initial learning session.

## Distinction from Stage 4

```text
Stage 4:
Core STEM meaning

Stage 5:
Learner-facing structure around that meaning
```

## RQ mapping

> **RQ2 and RQ3**

---

# 11. Operational Stage 6 — Collect Learner Response

## System responsibility

The system should collect a **learner-reported support signal** and, where useful, an **optional difficulty clarification**.

Stage 6 therefore contains two sub-steps.

### Stage 6A — Overall Support Need

The learner first reports how much additional support they believe they need:

- **High / I understand**
- **Medium / I partially understand**
- **Needs Support / I need more explanation**

These responses indicate **support intensity**. They do not identify the cause of the learner's difficulty.

```text
I understand
→ little or no additional support requested

I partially understand
→ some additional support requested

I need more explanation
→ stronger additional support requested
```

### Stage 6B — Optional Difficulty Clarification

When the learner selects **I partially understand** or **I need more explanation**, the system may ask:

> **What would help you most?**

Possible responses include:

- **Explain it more simply**
- **Give me another example**
- **Help with Burmese / English terms**
- **I do not understand the concept**
- **The concept or term is not what I meant**

This second question remains part of **Stage 6**. It is not a new eighth stage.

The purpose of Stage 6B is to provide Stage 7 with a more specific learner-reported signal so that the system does not have to guess the source of difficulty.

## Claim boundary

The Stage 6 responses represent learner-reported need. They do not represent:

- verified competence;
- mastery;
- measured learning;
- an objective diagnosis of misconception;
- a guaranteed explanation of the true cause of difficulty.

The response data should be stored as learner interaction data and supplied to Stage 7.

## RQ mapping

> **RQ3**

---

# 12. Operational Stage 7 — Adapt Support

## System responsibility

The system should interpret the learner's overall support signal and any optional difficulty clarification, then select a bounded adaptation route.

```text
1. Interpret overall learner-reported support need
2. If available, interpret the optional difficulty clarification
3. Select the permitted adaptation route
4. Select a bounded adaptive action
5. Update subsequent support
```

## Route-selection logic

```text
I understand
→ Fade / conclude additional support

I partially understand OR I need more explanation
+ no difficulty clarification
→ Normal Stage 5 adaptation

Explain it more simply
→ Stage 5

Give me another example
→ Stage 5

Help with Burmese / English terms
→ Stage 3 → Stage 4 → Stage 5

I do not understand the concept
→ Stage 4 → Stage 5

The concept or term is not what I meant
→ Stage 2 → refine Stage 1 if required → Stage 3 → Stage 4 → Stage 5
```

Possible adaptive actions include:

- simplify;
- clarify;
- provide another example;
- provide another analogy;
- change explanatory depth;
- adjust Burmese/English presentation;
- provide a hint;
- reduce support;
- conclude support.

## Important control rule

The system should **not infer a specific difficulty type from Medium or Needs Support alone**.

If the learner requests more support but gives no difficulty clarification, Stage 7 should use the normal Stage 5 route rather than assume a language, conceptual, or terminology/context problem.

## Claim boundary

The selected route is a bounded design response to learner-reported need. It is not an objective diagnosis and is not claimed to be pedagogically optimal.

## RQ mapping

> **RQ3**

---

# 13. Refined System Feedback Routing

## 13.1 Fade / Complete Route

```text
Stage 6A
I understand
        │ learner reports little/no further support need
        ▼
Stage 7
        │ fade / conclude
        ▼
Reduced Support / Session Progresses Toward Completion
```

Important:

> This is based on learner-reported need, not verified mastery.

---

## 13.2 Normal Adaptation Route

```text
Stage 6A
I partially understand
OR
I need more explanation
        │
        │ no Stage 6B difficulty clarification
        ▼
Stage 7 — Adapt Support
        │ do not guess the cause
        ▼
Stage 5 — Provide Scaffolding
```

Possible Stage 5 changes include:

- simpler explanation;
- another example;
- another analogy;
- additional hint;
- changed explanatory depth.

---

## 13.3 Explicit Scaffold Preference

```text
Explain it more simply
→ Stage 7 → Stage 5

Give me another example
→ Stage 7 → Stage 5
```

These selections identify the desired scaffold form without requiring a return to earlier conceptual stages.

---

## 13.4 Language-Related Difficulty

```text
Stage 6B
Help with Burmese / English terms
        │ language-related support requested
        ▼
Stage 7 — Adapt Support
        │ reconsider language strategy
        ▼
Stage 3 — Select Language Support
        │ revised Burmese/English strategy
        ▼
Stage 4 — Explain STEM Concept
        │ revised concept explanation
        ▼
Stage 5 — Provide Scaffolding
```

---

## 13.5 Conceptual Difficulty

```text
Stage 6B
I do not understand the concept
        │ conceptual clarification requested
        ▼
Stage 7 — Adapt Support
        │ reconsider core explanation
        ▼
Stage 4 — Explain STEM Concept
        │ revised meaning/explanation
        ▼
Stage 5 — Provide Scaffolding
```

---

## 13.6 Ambiguity / Misinterpretation Route

Exceptional path:

```text
Stage 6B
The concept or term is not what I meant
        │ correction signal
        ▼
Stage 7 — Adapt Support
        │ reinterpret concept/context
        ▼
Stage 2 — Interpret Technical Context
        │
        ├── terminology still correct
        │       ↓
        │     Stage 3 → Stage 4 → Stage 5
        │
        └── terminology itself was misidentified
                ↓
              Stage 1 — Refine STEM Terminology
                ↓
              Stage 2 → Stage 3 → Stage 4 → Stage 5
```

This is an exception rather than the normal feedback path.

---

# 14. Adaptation Bounds

The PoC implementation may retain:

> **maximum two adaptation rounds**

This remains an implementation boundary.

It is intended to support:

- bounded interaction;
- predictable workflow;
- prevention of unlimited adaptation loops.

It does **not** establish that two rounds are pedagogically optimal.

---

# 15. Contingency and Fading in the System Framework

## Contingency

System behaviour:

```text
learner-reported need
→ adaptation decision
→ changed support
```

## Fading

System behaviour may include:

- reduced support;
- no unnecessary extra scaffold;
- completion of the learning session.

Important:

> Fading is triggered by learner-reported need, not verified mastery.

---

# 16. System Artefact 1 — Text Diagram

## 16.1 Main Seven-Stage System Process

```text
┌─────────────────────────────────────┐
│ Learner STEM Inquiry                │
└──────────────────┬──────────────────┘
                   │ submits STEM question
                   ▼
┌─────────────────────────────────────┐
│ 1. Identify STEM Terminology        │
└──────────────────┬──────────────────┘
                   │ identified term/concept
                   ▼
┌─────────────────────────────────────┐
│ 2. Interpret Technical Context      │
└──────────────────┬──────────────────┘
                   │ technical/domain meaning
                   ▼
┌─────────────────────────────────────┐
│ 3. Select Language Support          │
└──────────────────┬──────────────────┘
                   │ Burmese / English / bilingual strategy
                   ▼
┌─────────────────────────────────────┐
│ 4. Explain STEM Concept             │
└──────────────────┬──────────────────┘
                   │ core STEM meaning
                   ▼
┌─────────────────────────────────────┐
│ 5. Provide Scaffolding              │
└──────────────────┬──────────────────┘
                   │ learner experiences support
                   ▼
┌─────────────────────────────────────┐
│ 6. Collect Learner Response         │
│                                     │
│ 6A. Overall support need            │
│ 6B. Optional difficulty             │
│     clarification                   │
└──────────────────┬──────────────────┘
                   │ overall signal + optional difficulty type
                   ▼
┌─────────────────────────────────────┐
│ 7. Adapt Support                    │
│    Choose bounded route/action      │
└─────────────────────────────────────┘
```

## 16.2 Stage 6 → Stage 7 Routing Diagram

```text
                  ┌──────────────────────────────┐
                  │ 6. Collect Learner Response │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                 ┌────────────────────────────────┐
                 │ 6A. Overall support need       │
                 └───────────────┬────────────────┘
                                 │
          ┌──────────────────────┼────────────────────────┐
          │                      │                        │
          ▼                      ▼                        ▼
┌──────────────────┐   ┌───────────────────┐   ┌────────────────────┐
│ I understand     │   │ I partially       │   │ I need more       │
│                  │   │ understand        │   │ explanation       │
└────────┬─────────┘   └─────────┬─────────┘   └─────────┬──────────┘
         │                       │                       │
         │ little/no additional │ additional support    │ stronger support
         │ support requested    │ requested             │ requested
         ▼                       └──────────┬────────────┘
┌──────────────────┐                      │
│ 7. Adapt Support │                      ▼
│ Fade / conclude  │        ┌─────────────────────────────┐
└──────────────────┘        │ 6B. Optional clarification │
                            │ “What would help you most?” │
                            └──────────────┬──────────────┘
                                           │
               ┌───────────────────────────┼────────────────────────────┐
               │                           │                            │
               ▼                           ▼                            ▼
     Simpler / another example       Language support             Concept unclear
               │                           │                            │
               ▼                           ▼                            ▼
            Stage 5                      Stage 3                      Stage 4
                                           │                            │
                                           ▼                            ▼
                                         Stage 4                      Stage 5
                                           │
                                           ▼
                                         Stage 5

The concept/term is not what I meant
               │
               ▼
             Stage 2
               │
               └── if terminology was misidentified ──► Stage 1
               │
               ▼
        Stage 3 → Stage 4 → Stage 5
```

## 16.3 Default Route When Difficulty Type Is Unknown

```text
I partially understand
OR
I need more explanation
        │
        │ no optional difficulty clarification
        ▼
Stage 7 — Adapt Support
        │ do not infer the cause
        ▼
Stage 5 — Provide Scaffolding
        │
        ├── simplify
        ├── another example
        ├── another analogy
        ├── additional hint
        └── change explanatory depth
```

---

# 17. System Artefact 1 — PIRQOA Mapping

| System Responsibility | Conceptual Basis | RQ |
|---|---|---|
| Terminology identification | STEM Terminology Identification | RQ1 |
| Technical-context interpretation | Context-Aware Framework | RQ1, RQ2 |
| Burmese/English support selection | Context-Sensitive Language Support | RQ1 |
| Core conceptual explanation | Conceptual Explanation | RQ2 |
| Structured learner-facing support | Structured Scaffolding | RQ2, RQ3 |
| Overall support signal + optional difficulty clarification | Learner Response | RQ3 |
| Route selection + bounded adaptive support | Adaptive Support | RQ3 |
| Feedback routing | Learner Response → Updated Scaffolding | RQ3 |

---

# 18. System Artefact 2 — Adaptive STEM Scaffolding Logical Architecture

## 18.1 Purpose

The **Adaptive STEM Scaffolding Logical Architecture** assigns the refined system responsibilities to four logical layers:

1. **User-Facing Layer**
2. **Application / Scaffolding Layer**
3. **AI / LLM Layer**
4. **Data / Persistence Layer**

The architecture preserves one central principle:

> **All learner, LLM, and persistence interactions are mediated by the Application / Scaffolding Layer.**

There should be:

- no direct learner-to-LLM control path;
- no direct learner-to-database path;
- no independent LLM control of session lifecycle.

---

# 19. User-Facing Layer

## Responsibilities

The User-Facing Layer supports:

- STEM inquiry entry;
- learner preferences;
- display of bilingual learning support;
- structured scaffold presentation;
- learner-reported overall support choices;
- optional difficulty-clarification choices;
- concept-scoped follow-up;
- Learning History;
- Review / Resume;
- visible session state.

## Inputs sent to application layer

```text
STEM inquiry
Learner preference changes
Overall learner-reported support signal
Optional difficulty clarification
Follow-up question
History request
Review/Resume action
```

## Outputs received

```text
Structured STEM learning session
Adapted support
Follow-up response
Session status
History records
Stored session state
Controlled errors
```

---

# 20. Application / Scaffolding Layer

## Role

The Application / Scaffolding Layer is the central coordinator.

It should control:

- inquiry validation;
- operation selection;
- terminology/context workflow;
- language-support decision constraints;
- structured generation requests;
- learner-response interpretation;
- optional difficulty-clarification handling;
- adaptation routing;
- default Stage 5 fallback when difficulty type is unknown;
- adaptation limits;
- follow-up scope;
- session lifecycle;
- persistence coordination;
- output validation.

## Refined responsibilities

### Language-support orchestration

The application should supply the LLM with constraints based on:

- terminology;
- context;
- preferences;
- useful English-term retention.

### Stage 4 / Stage 5 separation

The application contract should distinguish concept content from scaffold presentation where practical.

### Learner-response handling

The application should store two distinct kinds of learner-reported information when available:

1. **overall support need** — I understand / I partially understand / I need more explanation;
2. **optional difficulty clarification** — simpler explanation / another example / language support / conceptual clarification / concept-context correction.

Both remain learner-reported signals rather than measured mastery or an objective diagnosis.

### Adaptation routing

The application should determine the permitted adaptation path from the available learner-reported signals:

```text
I understand
→ fade / complete

More support + no difficulty type
→ normal Stage 5 scaffold update

Simpler explanation / another example
→ Stage 5

Language-related difficulty
→ Stage 3 → Stage 4 → Stage 5

Conceptual difficulty
→ Stage 4 → Stage 5

Concept/context correction
→ Stage 2 → Stage 1 if required → downstream support
```

The application must not infer a specific difficulty type from Medium or Needs Support alone.

### Bounds

The application enforces:

- maximum adaptation rounds;
- concept-scoped follow-up;
- lifecycle state.

---

# 21. AI / LLM Layer

## Role

The LLM provides bounded generated content.

It may generate:

- terminology interpretation;
- technical-context interpretation;
- bilingual explanation;
- core conceptual explanation;
- scaffold components;
- examples;
- analogies;
- hints;
- adapted support;
- concept-scoped follow-up responses.

## Important boundary

The LLM should **not** independently determine:

- session lifecycle;
- adaptation count;
- follow-up allowance;
- persistence;
- user identity;
- whether the interaction becomes unrestricted chat.

## Generated-content limitation

A valid structured response is not automatically:

- factually correct;
- pedagogically optimal;
- educationally effective.

The application may validate structure and workflow, but Assignment 5 design evaluation should separately test content behaviour where relevant.

---

# 22. Data / Persistence Layer

## Responsibilities

Store and retrieve:

- anonymous learner preferences;
- learning sessions;
- identified concept/context where stored;
- generated scaffold content;
- learner-reported support signal;
- adaptation state;
- adaptation round;
- follow-up history;
- session status;
- timestamps;
- review/resume state where implemented.

## Important boundary

Persistence supports:

- continuity;
- Review / Resume;
- Learning History;
- adaptive session state.

It does not create an objective learner model of mastery unless such functionality is separately implemented.

---

# 23. System Artefact 2 — Logical Architecture Diagram

```text
┌───────────────────────────────────────────────────────────┐
│                    USER-FACING LAYER                      │
│                                                           │
│ Home/Ask | STEM Learning Session | Learning History       │
│ Preferences | Understanding Check | Follow-Up | Review    │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ learner actions / UI requests
                            ▼
┌───────────────────────────────────────────────────────────┐
│              APPLICATION / SCAFFOLDING LAYER             │
│                                                           │
│ Inquiry Validation                                        │
│ Terminology/Context Workflow                              │
│ Language-Support Decision Constraints                     │
│ Concept/Scaffold Request Construction                     │
│ Learner-Response Interpretation                           │
│ Adaptation Routing                                        │
│ Adaptation Bound                                          │
│ Follow-Up Scope Control                                   │
│ Session Lifecycle                                         │
│ Structured Response Validation                            │
│ Persistence Coordination                                  │
└───────────────┬───────────────────────┬───────────────────┘
                │                       │
                │ bounded generation    │ store/retrieve
                ▼                       ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│       AI / LLM LAYER      │   │ DATA / PERSISTENCE LAYER │
│                           │   │                           │
│ Terminology Interpretation│   │ Preferences               │
│ Context Interpretation    │   │ Learning Sessions         │
│ Bilingual Explanation     │   │ Learner Response Data     │
│ Core Concept Explanation  │   │ Adaptation State/Round    │
│ Scaffold Components       │   │ Follow-Ups                │
│ Adapted Support           │   │ Session Status            │
│ Scoped Follow-Up Response │   │ Review/Resume Data        │
└───────────────┬───────────┘   └───────────────┬───────────┘
                │                               │
                │ structured generated content │ persisted state
                └──────────────┬────────────────┘
                               │
                               ▼
                 APPLICATION / SCAFFOLDING
                               │
                               │ validated result
                               ▼
                         USER-FACING LAYER
```

Control rule:

```text
User
  ✗ no direct workflow control of LLM

LLM
  ✗ no direct database writes
  ✗ no independent session/adaptation control

Application Layer
  ✓ mediates all interactions
```

---

# 24. Refined Adaptation Architecture

```text
Learner Response Data
        │
        ├── Overall support need
        │     • I understand
        │     • I partially understand
        │     • I need more explanation
        │
        └── Optional difficulty clarification
              • simpler explanation
              • another example
              • Burmese / English help
              • concept unclear
              • concept/term not what learner meant
        │
        ▼
Application / Scaffolding Layer
        │ interprets available learner-reported signals
        │ + current session state
        │
        ├──► I understand
        │       └──► fade / complete
        │
        ├──► More support, difficulty type unknown
        │       └──► normal Stage 5 adaptation
        │
        ├──► Simpler explanation / another example
        │       └──► Stage 5 adaptation
        │
        ├──► Language-related difficulty
        │       └──► Stage 3 → Stage 4 → Stage 5
        │
        ├──► Conceptual difficulty
        │       └──► Stage 4 → Stage 5
        │
        └──► Ambiguity / misinterpretation
                └──► Stage 2 → Stage 1 if required
                      → Stage 3 → Stage 4 → Stage 5
```

The application remains responsible for deciding which paths are permitted and for enforcing the adaptation-round bound. The LLM may generate content for the selected route but does not independently choose the overall workflow.

---

# 25. System Artefact 3 — Burmese STEM AI Proof-of-Concept System

## 25.1 Purpose

The **Burmese STEM AI** proof of concept is the executable instantiation of:

- the Adaptive STEM Scaffolding System Framework;
- the Adaptive STEM Scaffolding Logical Architecture.

Its role is to demonstrate technical feasibility and observable system behaviour.

It does not by itself establish educational effectiveness.

---

# 26. Primary Screens

The PoC contains three principal screens.

## 26.1 Home / Ask

Purpose:

- begin a new STEM inquiry;
- provide natural-language input;
- apply learner preferences;
- enter the learning workflow.

## 26.2 STEM Learning Session

Purpose:

- display concept/domain information where implemented;
- display bilingual structured support;
- collect learner response;
- present adapted support;
- accept concept-scoped follow-up;
- show current session progress.

## 26.3 Learning History

Purpose:

- display stored learning sessions;
- allow Review / Resume where supported;
- maintain continuity without requiring conventional user authentication.

A preferences modal does not constitute a fourth principal screen.

---

# 27. PoC Learner Journey

```text
┌──────────────────────┐
│ Home / Ask           │
│ Learner submits STEM │
│ inquiry              │
└──────────┬───────────┘
           │ create learning session
           ▼
┌──────────────────────┐
│ Application identifies│
│ terminology/context   │
└──────────┬───────────┘
           │ bounded LLM request
           ▼
┌──────────────────────────┐
│ STEM Learning Session    │
│                          │
│ Bilingual support        │
│ Concept explanation      │
│ Structured scaffolds     │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Stage 6A                 │
│ Overall support need     │
│                          │
│ I understand             │
│ I partially understand   │
│ I need more explanation  │
└──────────┬───────────────┘
           │
           ├── I understand ───────────────► Fade / Complete
           │
           └── more support requested
                    │
                    ▼
        ┌───────────────────────────┐
        │ Stage 6B — Optional      │
        │ “What would help you     │
        │ most?”                   │
        └───────────┬──────────────┘
                    │ overall + optional difficulty signal
                    ▼
        ┌───────────────────────────┐
        │ Stage 7 Adaptation       │
        │ Decision                 │
        └───────────┬──────────────┘
                    │ bounded route
                    ▼
        ┌───────────────────────────┐
        │ Updated Learning Session │
        └───────┬─────────┬─────────┘
                │         │
                │         └────────► Concept-scoped Follow-Up
                │
                └──────────────────► Completion / Review
                                          │
                                          ▼
                                   Learning History
```

If Stage 6B is skipped or no specific difficulty type is supplied, Stage 7 should use the normal Stage 5 adaptation path instead of guessing the cause of difficulty.

---

# 28. Initial Learning Session

The initial session may present:

- Simple Explanation;
- Real-World Example / Analogy;
- Technical Explanation;
- Reflective Prompt;
- optional Hint.

## Refined interpretation

These UI sections operationalize Stage 5 structured scaffolding.

The underlying generated concept meaning corresponds to Stage 4.

Therefore:

```text
Stage 4
core concept content
        ↓
Stage 5
presentation through structured support blocks
```

---

# 29. Learner Response in the PoC

## 29.1 Stage 6A — Overall Support Need

The current response options may remain:

- **I understand**
- **I partially understand**
- **I need more explanation**

or their internal equivalents:

- High;
- Medium;
- Needs Support.

These values should be described as:

> **learner-reported support signals**

rather than measured levels of understanding.

## 29.2 Stage 6B — Optional Difficulty Clarification

When the learner selects **I partially understand** or **I need more explanation**, the PoC may ask:

> **What would help you most?**

Suggested bounded options are:

- **Explain it more simply**
- **Give me another example**
- **Help with Burmese / English terms**
- **I do not understand the concept**
- **The concept or term is not what I meant**

This is a refinement of Stage 6, not a fourth screen and not an eighth conceptual stage. It can be implemented within the STEM Learning Session as an inline prompt, modal, or bounded choice panel.

## 29.3 Data Interpretation

The system should distinguish:

```text
overallSupportNeed
= how much additional support is requested

difficultyType (optional)
= what kind of help the learner reports wanting
```

The optional difficulty type improves route selection but remains learner-reported and is not an objective diagnosis.

---

# 30. Adapted Support in the PoC

Adaptation should be bounded and concept scoped.

## 30.1 Route Mapping

| Learner signal | PoC adaptation route | Typical system behaviour |
|---|---|---|
| I understand | Fade / complete | Reduce or conclude additional support |
| I partially understand + no difficulty type | Normal Stage 5 | Simpler/different scaffold |
| I need more explanation + no difficulty type | Normal Stage 5 | Stronger additional scaffold |
| Explain it more simply | Stage 5 | Simpler explanation |
| Give me another example | Stage 5 | Alternative example/analogy |
| Help with Burmese / English terms | Stage 3 → 4 → 5 | Reconsider language presentation, regenerate explanation/scaffold |
| I do not understand the concept | Stage 4 → 5 | Revise core conceptual explanation, then scaffold |
| The concept/term is not what I meant | Stage 2 → Stage 1 if needed → 3 → 4 → 5 | Correct context/terminology then regenerate downstream support |

## 30.2 Possible Adapted Support

Possible adapted support includes:

- additional example;
- simpler explanation;
- alternative explanation;
- additional Burmese support;
- alternative analogy;
- further technical clarification;
- reduced support;
- completion.

## 30.3 Current Implementation Boundary

A maximum of two adaptation rounds may remain.

This is:

> **an implementation bound**

not:

> **a claim of pedagogical optimality**.

---

# 31. Concept-Scoped Follow-Up

The PoC should allow clarification within the active STEM concept.

Example:

```text
Active concept:
Photosynthesis

Relevant follow-up:
"Why do plants need sunlight?"
```

The system should avoid becoming an unrestricted chatbot.

An unrelated request should be handled according to the implemented scope-control behaviour.

---

# 32. Preferences

Learner preferences may include:

- language preference;
- explanation level or related support preference where implemented.

Preferences should:

- inform generation where relevant;
- persist anonymously;
- remain controlled by application logic.

The refined conceptual design does not require formal proficiency testing.

---

# 33. Learning History and Review / Resume

Learning History supports:

- session continuity;
- reviewing prior scaffolded content;
- resuming an unfinished session where implemented;
- access to saved concept/session state.

This supports RQ3 through continuity and task-aligned interaction.

It should not be interpreted as a full Learning Management System.

---

# 34. Proof-of-Concept Functional Diagram

```text
┌──────────────────────────────────────────────────────────────┐
│                        Burmese STEM AI                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────┐          submit inquiry                   │
│  │ HOME / ASK    │──────────────────────────────┐             │
│  └───────────────┘                              │             │
│                                                 ▼             │
│                                       ┌──────────────────┐   │
│                                       │ Application      │   │
│                                       │ Workflow         │   │
│                                       └────────┬─────────┘   │
│                                                │             │
│                               bounded generation request     │
│                                                ▼             │
│                                       ┌──────────────────┐   │
│                                       │ LLM Generation   │   │
│                                       └────────┬─────────┘   │
│                                                │             │
│                                     structured content       │
│                                                ▼             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ STEM LEARNING SESSION                                 │  │
│  │                                                        │  │
│  │ Core concept explanation                              │  │
│  │ ↓                                                      │  │
│  │ Structured scaffold blocks                            │  │
│  │ ↓                                                      │  │
│  │ Stage 6A: overall support need                        │  │
│  │ ↓                                                      │  │
│  │ Stage 6B: optional “What would help you most?”        │  │
│  │ ↓                                                      │  │
│  │ Stage 7: bounded route selection + adapted support    │  │
│  │ ↓                                                      │  │
│  │ Concept-scoped follow-up                              │  │
│  └───────────────────────┬────────────────────────────────┘  │
│                          │ persist session                    │
│                          ▼                                    │
│                  ┌──────────────────┐                         │
│                  │ LEARNING HISTORY │                         │
│                  │ Review / Resume  │                         │
│                  └──────────────────┘                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Stage 6B is an interaction inside the STEM Learning Session, not a separate principal screen.

---

# 35. Current Technical Implementation

The existing PoC is implemented as a small monolithic web application.

Current technology baseline includes:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- next-intl;
- MongoDB;
- Mongoose;
- OpenAI Responses API;
- Docker / Docker Compose;
- Nginx;
- Certbot;
- AWS EC2 deployment.

## Technical design principle

The implementation separates:

```text
Application-controlled workflow
from
LLM-generated content
```

The application:

1. validates the learner inquiry;
2. determines the requested system operation;
3. sends bounded structured requests to the LLM;
4. validates returned structured content;
5. updates/persists session state;
6. exposes validated state to the UI.

---

# 36. Deployment Architecture Diagram

```text
┌──────────────────────┐
│ Learner Browser      │
│ React / Next.js UI   │
└──────────┬───────────┘
           │ HTTPS
           ▼
┌──────────────────────┐
│ Nginx Reverse Proxy  │
│ + TLS / Certbot      │
└──────────┬───────────┘
           │ application request
           ▼
┌──────────────────────────────────────┐
│ Next.js Application Server          │
│                                      │
│ Application / Scaffolding Services   │
│ Session Lifecycle                    │
│ Adaptation Control                   │
│ Follow-Up Scope                      │
│ Preferences                          │
│ Structured Response Validation       │
└──────────┬───────────────┬───────────┘
           │               │
       persistence     bounded API request
           │               │
           ▼               ▼
┌──────────────────┐  ┌────────────────────┐
│ MongoDB          │  │ External LLM API   │
│ Session/Prefs    │  │ Structured Content │
└──────────────────┘  └────────────────────┘
```

---

# 37. Refined System Artefact Traceability

| Research Issue / Requirement | Conceptual Artefact Basis | Refined System Responsibility | PoC Feature |
|---|---|---|---|
| Identify specialized terminology | STEM Terminology Identification | Detect principal STEM concept | Inquiry processing |
| Interpret domain meaning | Context-Aware Framework | Establish technical context | Concept/domain interpretation |
| Context-sensitive Burmese/English support | Context-Sensitive Language Support | Select bounded bilingual strategy | Burmese/English generated support |
| Explanation beyond translation | Conceptual Explanation | Generate core STEM meaning | Concept explanation |
| Structured educational support | Structured Scaffolding | Present selectable scaffold forms | Simple, Example, Technical, Reflection, Hint |
| Collect learner response | Learner Response | Store overall support signal + optional difficulty clarification | Understanding Check + optional “What would help you most?” |
| Adjust subsequent assistance | Adaptive Support | Interpret overall signal + optional difficulty type and select bounded route/action | Adapted support |
| Prevent unbounded adaptation | Bounded system design | Enforce adaptation limit | Max two rounds |
| Clarification within active concept | Structured Scaffolding | Restrict follow-up context | Concept-scoped follow-up |
| Maintain continuity | TTF / Adaptive Support | Persist session/preferences | History, Review/Resume, Preferences |

---

# 38. Refinements That Affect System Design

The following conceptual refinements should be reflected in the system artefacts.

## Required conceptual/system alignment

- [x] Stage 3 language-support selection criteria explicitly defined
- [x] Stage 4 and Stage 5 responsibilities separated
- [x] Stage 6 defined as learner-reported support signal
- [x] Stage 6A collects overall support need
- [x] Stage 6B optionally asks **“What would help you most?”**
- [x] Stage 6B remains inside Stage 6; no eighth stage is added
- [x] Stage 7 includes response interpretation and route selection
- [x] Medium / Needs Support alone do not determine difficulty type
- [x] unknown difficulty type defaults to normal Stage 5 adaptation
- [x] normal feedback to Stage 5 clarified
- [x] bounded reconsideration of Stages 3–4 defined
- [x] ambiguity correction for Stages 1–2 defined as exceptional
- [x] scaffold forms treated as selectable conceptually
- [x] generated-content correctness retained as a limitation

---

# 39. PoC Alignment Items to Verify Before Formal FURPS Testing

This section distinguishes the **refined target system artefact** from what must be verified in the actual PoC.

| Alignment Item | What to Verify in Current PoC | Possible Action |
|---|---|---|
| Stage 3 language support | Prompt/service uses context, preferences, and useful English-term retention | Already aligned / update prompt |
| Stage 4 vs Stage 5 | Core meaning and scaffold blocks are distinguishable in request/response design | Documentation only or contract refinement |
| Stage 6A overall signal | UI/data model treats High/Medium/Needs Support as self-report, not measured learning | Documentation/label check |
| Stage 6B optional clarification | `Medium` or `Needs Support` can optionally ask **“What would help you most?”** with bounded choices | Small UI/state/data-model change if not present |
| Stage 6 persistence | Store overall support need and optional difficulty type distinctly | Inspect/update schema/state |
| Stage 7 default route | Medium/Needs Support without a difficulty type uses normal Stage 5 adaptation | Implement/test |
| Stage 7 scaffold preference | Simpler explanation / another example route to Stage 5 | Implement/test |
| Stage 7 language route | Language-support choice routes to Stage 3 → 4 → 5 | Implement/test or document conceptual-only |
| Stage 7 conceptual route | Conceptual-difficulty choice routes to Stage 4 → 5 | Implement/test or document conceptual-only |
| Stage 7 ambiguity route | Wrong concept/term routes to Stage 2 and Stage 1 if required | Implement/test or document conceptual-only |
| Fading | `I understand` produces the implemented fade/completion behaviour | Test |
| Adaptation bound | Maximum two rounds remains enforced regardless of route | Test |
| Selectable scaffold forms | Adaptation can vary support form where claimed | Inspect/test |
| Generated output reliability | Do not assume correctness from schema validity | Evaluate separately |

Important:

> If a refined conceptual capability is not implemented in the PoC, record it as a conceptual capability or future system refinement rather than claiming that the executable system already performs it.

> Formal FURPS testing should be performed against the frozen PoC version after any necessary Stage 6/7 alignment changes have been completed.

---

# 40. System Scope Boundaries

The refined system artefacts include:

- natural-language STEM inquiry;
- terminology/context interpretation;
- contextual Burmese/English support;
- conceptual explanation;
- structured scaffolding;
- learner-reported overall support response;
- optional difficulty clarification within Stage 6;
- bounded route selection and adaptation;
- concept-scoped follow-up;
- anonymous preferences;
- session persistence;
- Learning History;
- Review / Resume.

They exclude:

- full LMS functionality;
- teacher dashboards;
- formal quiz engine;
- objective mastery measurement;
- social-learning system;
- unrestricted chatbot interaction;
- complex learner profiling;
- authentication unless later required outside the current research scope.

---

# 41. Claim Boundaries

The system artefacts may support claims that:

- the conceptual design can be instantiated as executable behaviour;
- the system can provide bilingual structured STEM support;
- the system can collect learner-reported overall support signals and optional difficulty clarifications;
- the system can select among bounded adaptation routes when the required learner signal is available;
- application logic can constrain LLM interaction;
- session state and continuity can be technically implemented.

The system artefacts do **not** by themselves establish that:

- learners achieve better educational outcomes;
- self-reported understanding equals actual understanding;
- the optional difficulty clarification objectively diagnoses the true cause of learner difficulty;
- generated explanations are always correct;
- the language strategy is optimal;
- adaptation is pedagogically optimal;
- two adaptation rounds are educationally optimal;
- fading proves mastery.

---

# 42. Final Refined System Artefact Set

## System Artefact 1 — Adaptive STEM Scaffolding System Framework

Primary contribution:

> **Operational system process**

Defines how a learner inquiry is transformed into terminology-sensitive, context-aware, bilingual, conceptual, structured, and adaptive support.

---

## System Artefact 2 — Adaptive STEM Scaffolding Logical Architecture

Primary contribution:

> **Logical responsibility allocation**

Defines how User-Facing, Application/Scaffolding, AI/LLM, and Data/Persistence responsibilities interact while keeping workflow control outside the LLM.

---

## System Artefact 3 — Burmese STEM AI Proof-of-Concept System

Primary contribution:

> **Executable technical instantiation**

Demonstrates the system through:

- Home / Ask;
- STEM Learning Session;
- Learning History;
- Preferences;
- learner-response collection;
- optional **“What would help you most?”** difficulty clarification;
- bounded route selection and adaptation;
- concept-scoped follow-up;
- persistence;
- Review / Resume.

---

# 43. Frozen Refined System Specification

For Assignment 5 design artefact alignment and testing, use the following as the refined system specification:

```text
Learner submits a natural-language STEM inquiry.

The application:
1. identifies the principal STEM terminology;
2. interprets its technical context;
3. constrains the Burmese/English support strategy;
4. requests a core conceptual explanation;
5. requests/presents structured scaffold forms;
6. collects learner response in Stage 6:
   6A. overall support need:
       - I understand
       - I partially understand
       - I need more explanation
   6B. when additional support is requested, optionally asks:
       “What would help you most?”
       - Explain it more simply
       - Give me another example
       - Help with Burmese / English terms
       - I do not understand the concept
       - The concept or term is not what I meant
7. interprets the available learner-reported signals and selects a bounded adaptive route.

Route rules:
- I understand
  → fade / complete
- More support requested + no difficulty type
  → normal Stage 5 adaptation
- Simpler explanation / another example
  → Stage 5
- Language-related difficulty
  → Stage 3 → Stage 4 → Stage 5
- Conceptual difficulty
  → Stage 4 → Stage 5
- Concept/context misinterpretation
  → Stage 2 → Stage 1 if required → Stage 3 → Stage 4 → Stage 5

The system must not infer a specific difficulty type from Medium or Needs Support alone.

The application controls:
- state;
- adaptation count;
- route selection;
- follow-up scope;
- persistence;
- lifecycle.

The LLM generates bounded content but does not control the learning workflow.

The overall learner response and optional difficulty type are self-reported signals.
They are not objective measurements of learning, mastery, or the true cause of difficulty.

The system may demonstrate technical feasibility and functional behaviour,
but it does not by itself demonstrate educational effectiveness.
```

---

# 44. Next Step Before FURPS Evaluation

Before formal FURPS and Hevner-based design evaluation:

1. compare the actual PoC implementation against Section 39;
2. record which refined responsibilities are:
   - already implemented;
   - documentation-only;
   - require a small code/prompt change;
   - conceptual-only and not implemented;
3. implement any necessary Stage 6/7 alignment changes, especially optional difficulty clarification and route selection;
4. freeze the evaluated Git commit;
5. record the environment;
6. begin formal Functionality and Usability evaluation.

Do not silently claim that every refined conceptual pathway is implemented unless the code and observed behaviour support that claim.
