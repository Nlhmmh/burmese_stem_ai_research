# Complete Conceptual Artefacts — Refined Version

## 1. Purpose

This document consolidates the **three conceptual artefacts** developed for the research on adaptive LLM-based STEM scaffolding for Burmese-speaking learners and incorporates the refinements justified through the Assignment 5 conceptual artefact evaluation.

The three artefacts retain their original progression:

> **definition → relationships → behaviour**

They are:

1. **LLM-Based STEM Scaffolding Concepts**
2. **Task-Aligned LLM Scaffolding Model**
3. **Context-Aware Adaptive STEM Scaffolding Framework**

The refinements do **not** replace the conceptual architecture. They clarify language-support selection, the distinction between conceptual explanation and scaffolding, the meaning of learner response, adaptation decision responsibility, bounded feedback routing, ambiguity handling, and claim boundaries.

The seven-stage process is retained.

## 1.1 Post-Evaluation Update — Learner Difficulty Clarification

A further refinement is incorporated into **Stage 6 — Collect Learner Response** after reviewing how the system can choose among the refined adaptation routes.

The original three learner responses:

- **I understand**
- **I partially understand**
- **I need more explanation**

indicate the **amount of support the learner reports needing**, but they do not reliably identify whether the difficulty is linguistic, conceptual, or caused by terminology/context misinterpretation.

Stage 6 is therefore refined to collect two levels of learner response:

1. **Overall support need**
   - I understand
   - I partially understand
   - I need more explanation
2. **Optional difficulty clarification**, when additional support is requested
   - Explain it more simply
   - Give me another example
   - Help with Burmese / English terms
   - I do not understand the concept
   - The concept or term is not what I meant

This clarification remains **inside Stage 6**. It does **not** create an eighth framework stage.

Stage 7 then interprets the overall support signal together with the optional difficulty clarification. If no difficulty type is supplied, the framework uses the normal Stage 5 adaptation route rather than guessing the cause of the learner's difficulty.

---

# 2. Research Context

## 2.1 Research Problem

Burmese-speaking STEM learners may face difficulties when specialized English STEM terminology is unfamiliar, Burmese technical resources are limited, direct translation does not preserve technical meaning, conceptual understanding requires more than lexical translation, and unstructured LLM interaction does not provide controlled educational support.

The intended contribution is an **adaptive LLM-based educational Information System** that combines:

- terminology-sensitive support;
- technical-context interpretation;
- context-sensitive Burmese/English support;
- conceptual explanation;
- structured scaffolding;
- learner-responsive adaptation.

---

# 3. Research Questions and Requirements

## RQ1 — Terminology and Language Support

> **How can specialized English STEM terminology be supported for Burmese-speaking learners?**

### Requirement

Identify specialized STEM terminology, interpret its technical context, and provide context-sensitive Burmese support while preserving useful English technical terms where appropriate.

## RQ2 — Conceptual Support

> **How can LLM-based support help learners understand STEM concepts beyond translation?**

### Requirement

Provide clear explanations and examples beyond direct translation so that the learner receives conceptual support.

## RQ3 — Structured and Adaptive Scaffolding

> **How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners?**

### Requirement

Provide structured learning support, collect learner response, and adapt subsequent support according to learner need.

---

# 4. Theoretical Foundation

## 4.1 Task–Technology Fit

Task–Technology Fit provides the primary Information Systems foundation.

The study operationalizes TTF through three study-specific dimensions:

1. **Language-support fit**
2. **Conceptual-support fit**
3. **Adaptive-interaction fit**

These dimensions are design alignments and should **not** be interpreted as empirical proof that actual Task–Technology Fit has been achieved.

## 4.2 Scaffolding Theory

Scaffolding Theory provides the complementary educational foundation.

The relevant characteristics are:

- structured assistance;
- learner-responsive support;
- contingency;
- fading.

### Contingency

Support changes according to learner-reported need.

### Fading

Support can be reduced or concluded when the learner reports less need.

Important:

> Learner-reported understanding is a self-report signal, not objective evidence of competence, mastery, or learning.

---

# 5. Relationship Between the Three Artefacts

```text
Artefact 1 — LLM-Based STEM Scaffolding Concepts
        ↓ defines WHAT the major concepts are

Artefact 2 — Task-Aligned LLM Scaffolding Model
        ↓ defines HOW the major constructs relate

Artefact 3 — Context-Aware Adaptive STEM Scaffolding Framework
        ↓ defines HOW the support should operate
```

Together:

> **Artefact 1 = definition**  
> **Artefact 2 = relationships**  
> **Artefact 3 = behaviour**

---

# 6. Conceptual Artefact 1 — LLM-Based STEM Scaffolding Concepts

## 6.1 Purpose

The first artefact defines the core concepts that constitute **LLM-Based STEM Scaffolding**.

### Refined definition

> **LLM-Based STEM Scaffolding is the structured use of LLM capabilities to identify specialized STEM terminology, interpret technical context, provide context-sensitive language support, explain underlying STEM concepts, and deliver bounded learner-responsive assistance aligned with learner tasks and reported support needs.**

It consists of five core concepts.

## 6.2 Core Concept 1 — STEM Terminology Identification

> **STEM Terminology Identification refers to recognizing the principal specialized STEM terminology or concept requiring language or conceptual support.**

It distinguishes specialized technical terminology from ordinary vocabulary and identifies the main concept requiring support.

The initial terminology interpretation may be refined when technical context reveals ambiguity.

Example:

```text
cell
→ biological cell
→ battery cell
→ spreadsheet cell
```

The normal conceptual sequence remains:

```text
Identify STEM Terminology
→ Interpret Technical Context
```

but Stage 2 may refine Stage 1 when necessary.

Primary contribution:

> **RQ1**

## 6.3 Core Concept 2 — Context-Sensitive Language Support

> **Context-Sensitive Language Support refers to selecting an appropriate Burmese/English support strategy according to the identified terminology, technical context, usefulness of established English disciplinary terminology, and learner-expressed language need where available.**

Possible support forms include:

- Burmese explanation;
- preservation of an English technical term;
- bilingual presentation;
- contextual combinations of Burmese and English.

### Refined selection principles

Language-support selection should consider:

1. identified STEM terminology;
2. interpreted technical context;
3. usefulness/familiarity of the English disciplinary term;
4. whether Burmese explanation improves accessibility;
5. learner-expressed language preference or difficulty where available.

This is a **conceptual decision rule**, not a deterministic language-selection algorithm.

Primary contribution:

> **RQ1**

## 6.4 Core Concept 3 — Conceptual Explanation

> **Conceptual Explanation refers to establishing and communicating the core STEM meaning that the learner needs to understand, moving beyond direct translation of terminology.**

It focuses on:

- what the STEM concept means;
- technically relevant relationships;
- core disciplinary meaning.

Conceptual Explanation answers:

> **What STEM meaning should be communicated?**

Primary contribution:

> **RQ2**

## 6.5 Core Concept 4 — Structured Scaffolding

> **Structured Scaffolding refers to organizing learner support around the explained STEM concept using bounded, selectable forms of assistance rather than unrestricted chatbot interaction.**

Possible scaffold forms include:

- simpler explanation;
- real-world example;
- analogy;
- technical detail;
- reflective prompt;
- hint;
- clarification;
- changes in explanatory depth.

The listed scaffold forms are **selectable support mechanisms**, not mandatory cumulative elements.

Structured Scaffolding answers:

> **How should learner support around that meaning be organized?**

Primary contribution:

> **RQ2 and RQ3**

## 6.6 Core Concept 5 — Adaptive Support

> **Adaptive Support refers to interpreting the learner's overall self-reported support need and, when available, an optional clarification of the difficulty type, then adjusting the level, form, language, or depth of subsequent assistance within a bounded STEM-learning interaction.**

The overall response indicates **how much support is requested**. An optional difficulty clarification can indicate **what kind of support may be most appropriate**.

Possible adaptive directions include:

- simplify;
- clarify;
- provide another example;
- provide another analogy;
- change explanatory depth;
- adjust Burmese/English presentation;
- provide a hint;
- reduce support;
- conclude support.

Adaptation is driven by **learner-reported support signals**, not objectively measured competence.

Where only the overall response is available, the framework should use a normal Stage 5 scaffold adaptation rather than infer a language, conceptual, or terminology/context problem without evidence.

Primary contribution:

> **RQ3**

---

# 7. Artefact 1 — Conceptual Structure

## 7.1 Text Diagram

```text
                                  ┌───────────────────────────────┐
                                  │  LLM-Based STEM Scaffolding   │
                                  └───────────────┬───────────────┘
                                                  │
                         ┌────────────────────────┼────────────────────────┐
                         │                        │                        │
                   "includes"              "includes"              "includes"
                         │                        │                        │
                         v                        v                        v
             ┌──────────────────────┐  ┌────────────────────────┐  ┌──────────────────────┐
             │ STEM Terminology     │  │ Context-Sensitive      │  │ Conceptual           │
             │ Identification       │  │ Language Support       │  │ Explanation          │
             └──────────────────────┘  └────────────────────────┘  └──────────────────────┘
                                                  │
                                                  │
                                  ┌───────────────┴───────────────┐
                                  │                               │
                             "includes"                    "includes"
                                  │                               │
                                  v                               v
                         ┌──────────────────────┐        ┌──────────────────────┐
                         │ Structured           │        │ Adaptive             │
                         │ Scaffolding          │        │ Support              │
                         └──────────────────────┘        └──────────────────────┘
```

### Diagram interpretation

All five arrows are labelled **includes**. The diagram is a **concept-composition structure**, not a causal workflow. LLM-Based STEM Scaffolding is the overarching concept and consists of:

- STEM Terminology Identification;
- Context-Sensitive Language Support;
- Conceptual Explanation;
- Structured Scaffolding;
- Adaptive Support.

There is no process loop in Artefact 1 because this artefact defines **what the concept consists of**, not how support progresses over time. The adaptive loop is represented in Artefacts 2 and 3.

---

# 8. Artefact 1 — PIRQOA Mapping

| Core Concept | Primary Function | RQ Mapping |
|---|---|---|
| STEM Terminology Identification | Recognize specialized STEM concepts/terms | RQ1 |
| Context-Sensitive Language Support | Select Burmese/English support appropriately | RQ1 |
| Conceptual Explanation | Explain STEM meaning beyond translation | RQ2 |
| Structured Scaffolding | Organize learner-facing assistance | RQ2, RQ3 |
| Adaptive Support | Adjust support according to learner-reported need | RQ3 |

---

# 9. Conceptual Artefact 2 — Task-Aligned LLM Scaffolding Model

## 9.1 Purpose

The second conceptual artefact models how four main constructs relate:

1. **Low-Resource Language Barrier**
2. **LLM-Based Scaffolding**
3. **STEM Understanding**
4. **Learner Response**

The model explains the conceptual relationships that justify an adaptive educational Information System.

## 9.2 Construct 1 — Low-Resource Language Barrier

> **Low-Resource Language Barrier refers to difficulties accessing STEM knowledge when English technical terminology, limited localized resources, and uneven multilingual support create additional obstacles for Burmese-speaking learners.**

The model uses **hinders** rather than **prevents**, because the barrier may make STEM understanding more difficult without making it impossible.

## 9.3 Construct 2 — LLM-Based Scaffolding

LLM-Based Scaffolding refers to the integrated set of support concepts defined in Artefact 1:

- terminology identification;
- context-sensitive language support;
- conceptual explanation;
- structured scaffolding;
- adaptive support.

It is intended to reduce language-access difficulty, provide conceptual support, structure learner interaction, and respond to learner-reported support need.

## 9.4 Construct 3 — STEM Understanding

> **STEM Understanding represents the conceptual understanding that the scaffolding is intended to support.**

Important claim boundary:

The conceptual model may state that scaffolding **supports STEM understanding**, but the Assignment 5 evaluation does not establish that actual learner understanding or learning improvement occurred.

Therefore, this construct represents the **intended learning target**, not a measured outcome in the current PoC evaluation.

## 9.5 Construct 4 — Learner Response

> **Learner Response refers to learner interaction that supplies a self-reported support signal about the amount and, where available, the type of additional assistance required.**

The construct can contain two levels of response.

### Level 1 — Overall Support Need

- I understand;
- I partially understand;
- I need more explanation.

### Level 2 — Optional Difficulty Clarification

When the learner requests additional support, the interaction may ask:

> **What would help you most?**

Possible responses include:

- Explain it more simply;
- Give me another example;
- Help with Burmese / English terms;
- I do not understand the concept;
- The concept or term is not what I meant.

A clarification request or concept-scoped follow-up can also provide additional evidence about the difficulty.

Important:

> Learner Response is not an objective measurement of competence. The optional clarification improves adaptation routing but still represents learner-reported need rather than a verified diagnosis.

---

# 10. Artefact 2 — Relationships

## Relationship 1

```text
Low-Resource Language Barrier
        ↓ hinders
STEM Understanding
```

## Relationship 2

```text
LLM-Based Scaffolding
        ↓ reduces
Low-Resource Language Barrier
```

The model uses **reduces** rather than **eliminates** because language barriers may remain.

## Relationship 3

```text
LLM-Based Scaffolding
        ↓ supports
STEM Understanding
```

Important:

> `supports` is a conceptual design relationship, not evidence of measured learning improvement.

## Relationship 4

```text
LLM-Based Scaffolding
        ↓ leads to
Learner Response
```

## Relationship 5

```text
Learner Response
        ↓ guides
Subsequent LLM-Based Scaffolding
```

Learner response guides the next support decision by providing a **learner-reported support signal**. The overall response indicates the amount of support requested, while an optional difficulty clarification can identify whether the learner is asking for a simpler scaffold, another example, language support, conceptual clarification, or correction of the interpreted concept/context.

If the optional difficulty type is not available, subsequent scaffolding should follow the normal Stage 5 adaptation route rather than infer a more specific difficulty.

---

# 11. Artefact 2 — Refined Model

## 11.1 Text Diagram

```text
          ┌──────────────────────────────────┐
          │ Low-Resource Language Barrier    │
          └───────────────┬──────────────────┘
                          │
                       "hinders"
                          │
                          v
          ┌──────────────────────────────────┐
          │ STEM Understanding               │
          └──────────────────────────────────┘
                          ^
                          │
                       "supports"
                          │
          ┌───────────────┴──────────────────┐
          │ LLM-Based Scaffolding            │
          └───────────────┬──────────────────┘
                          │\
           "reduces"     │ \ "leads to"
             /            │  \n            /             │   v
           v              │  ┌──────────────────────────────────┐
┌──────────────────────┐  │  │ Learner Response                 │
│ Low-Resource         │  │  │ (learner-reported support signal)│
│ Language Barrier     │  │  └───────────────┬──────────────────┘
└──────────────────────┘  │                  │
                          │               "guides"
                          │                  │
                          │                  v
                          │  ┌──────────────────────────────────┐
                          └──│ Subsequent / Updated             │
                             │ LLM-Based Scaffolding            │
                             └───────────────┬──────────────────┘
                                             │
                                  "continues support cycle"
                                             │
                                             └───────────────┐
                                                             │
                                                             v
                                                   Learner interaction
                                                             │
                                                             └─── back to
                                                                  Learner Response
```

### Relationship labels

```text
Low-Resource Language Barrier ──"hinders"──> STEM Understanding
LLM-Based Scaffolding ──────────"reduces"──> Low-Resource Language Barrier
LLM-Based Scaffolding ─────────"supports"──> STEM Understanding
LLM-Based Scaffolding ─────────"leads to"──> Learner Response
Learner Response ────────────────"guides"──> Subsequent LLM-Based Scaffolding
Subsequent LLM-Based Scaffolding ──"continues support cycle"──> Learner interaction / response
```

### Adaptive loop

```text
LLM-Based Scaffolding
        │
     "leads to"
        v
Learner Response
        │
      "guides"
        v
Updated LLM-Based Scaffolding
        │
"continues support cycle"
        └───────────────────────────────> Learner Response ...
```

The loop expresses the model's adaptive relationship: scaffolding produces learner interaction; the learner's overall support signal and any optional difficulty clarification guide the next support decision; and the updated scaffolding can lead to another learner response.

---

# 12. Artefact 2 — Refined Propositions

## P1

> **The low-resource language barrier hinders STEM understanding.**

## P2

> **LLM-based scaffolding reduces the low-resource language barrier.**

## P3

> **LLM-based scaffolding supports STEM understanding.**

This is a conceptual proposition, not a demonstrated learning-effect result.

## P4

> **LLM-based scaffolding leads to learner response.**

## P5

> **Learner response guides subsequent LLM-based scaffolding.**

Refined interpretation:

> Learner response is treated as a learner-reported support signal rather than objective evidence of mastery. It may contain both an overall support-need response and an optional clarification of the difficulty type.

---

# 13. Artefact 2 — Theoretical Mapping

## Task–Technology Fit

The model aligns:

- terminology tasks with terminology support;
- conceptual-learning tasks with conceptual explanation;
- learner-interaction tasks with adaptive support.

## Scaffolding Theory

The feedback relationship supports:

- learner-responsive assistance;
- contingency;
- fading.

Important:

> The model describes intended relationships and should not be interpreted as empirical proof that actual Task–Technology Fit or learning improvement has occurred.

---

# 14. Conceptual Artefact 3 — Context-Aware Adaptive STEM Scaffolding Framework

## 14.1 Purpose

The third artefact transforms the definitions and relationships from Artefacts 1 and 2 into a structured and adaptive process.

It specifies how an LLM-based educational Information System should transform a learner's natural-language STEM inquiry into:

- terminology-sensitive support;
- technical-context interpretation;
- context-sensitive Burmese/English assistance;
- conceptual explanation;
- structured scaffolding;
- learner-responsive adaptation.

The seven-stage structure is retained after evaluation.

## 14.2 Stage 1 — Identify STEM Terminology

> **Identify the principal specialized STEM concept or terminology requiring language or conceptual support.**

Responsibilities:

- identify the main technical concept;
- distinguish technical terminology from ordinary vocabulary;
- establish the initial target of subsequent support.

If later technical-context interpretation reveals ambiguity, the initial terminology interpretation may be refined.

RQ mapping:

> **RQ1**

## 14.3 Stage 2 — Interpret Technical Context

> **Determine the relevant STEM/domain meaning of the identified terminology and recognize ambiguity where it materially affects support.**

Responsibilities:

- identify disciplinary context;
- establish technical meaning;
- prevent isolated word-level interpretation;
- refine Stage 1 interpretation where necessary.

RQ mapping:

> **RQ1 and RQ2**

## 14.4 Stage 3 — Select Language Support

> **Select a context-sensitive Burmese/English support strategy based on the identified STEM terminology, technical context, usefulness of established English disciplinary terminology, and learner-expressed language need where available.**

Possible outcomes:

- Burmese explanation;
- retain useful English technical term;
- bilingual presentation;
- contextual combination.

Selection factors:

1. identified terminology;
2. technical context;
3. usefulness/familiarity of English disciplinary terminology;
4. Burmese explanation need;
5. learner-expressed language need or preference where available.

Important boundary:

> This is not a deterministic language-selection algorithm.

RQ mapping:

> **RQ1**

## 14.5 Stage 4 — Explain STEM Concept

> **Establish and communicate the core STEM meaning that the learner needs to understand, moving beyond direct translation.**

Responsibilities:

- communicate conceptual meaning;
- explain technically relevant relationships;
- establish the concept that scaffolding will support.

Stage 4 answers:

> **What STEM meaning needs to be communicated?**

RQ mapping:

> **RQ2**

## 14.6 Stage 5 — Provide Scaffolding

> **Structure learner support around the explained STEM concept using appropriate selectable scaffold forms.**

Possible scaffold forms:

- simpler explanation;
- real-world example;
- analogy;
- technical explanation/detail;
- reflective prompt;
- hint;
- clarification;
- alternative explanatory depth.

Not every scaffold form is mandatory in every interaction.

Stage 5 answers:

> **How should support around the STEM meaning be structured?**

RQ mapping:

> **RQ2 and RQ3**

## 14.7 Stage 6 — Collect Learner Response

> **Collect a learner-reported support signal indicating perceived understanding or need for additional assistance and, when additional support is requested, optionally collect a clarification about the type of difficulty.**

Stage 6 contains two response-collection sub-steps.

### 6A — Collect Overall Support Need

The learner first reports the amount of support they believe they need:

- **I understand**
- **I partially understand**
- **I need more explanation**

Interpretation:

```text
I understand
→ learner reports little or no additional support need

I partially understand
→ learner reports some additional support need

I need more explanation
→ learner reports stronger additional support need
```

These responses indicate **support intensity**, not the cause of the difficulty.

### 6B — Collect Optional Difficulty Clarification

When the learner selects **I partially understand** or **I need more explanation**, the system may ask:

> **What would help you most?**

Possible responses include:

- **Explain it more simply**
- **Give me another example**
- **Help with Burmese / English terms**
- **I do not understand the concept**
- **The concept or term is not what I meant**

This clarification remains part of Stage 6. It is **not a separate framework stage**.

It gives Stage 7 a better basis for choosing an adaptation route:

```text
Explain it more simply
→ normal Stage 5 adaptation

Give me another example
→ normal Stage 5 adaptation

Help with Burmese / English terms
→ language-related route

I do not understand the concept
→ conceptual-difficulty route

The concept or term is not what I meant
→ ambiguity / misinterpretation route
```

If no difficulty clarification is supplied, the framework should use the normal Stage 5 adaptation route rather than guessing whether the problem is linguistic, conceptual, or contextual.

### Important Claim Boundary

Stage 6 does **not** measure:

- objective competence;
- mastery;
- learning achievement;
- misconception with certainty.

The optional difficulty clarification improves routing but remains a learner-reported signal.

RQ mapping:

> **RQ3**

## 14.8 Stage 7 — Adapt Support

> **Interpret the learner-reported overall support signal and any optional difficulty clarification, then select a bounded adaptive response aligned with the active STEM concept.**

Internal conceptual responsibilities:

```text
1. Interpret overall learner-reported support need
2. If available, interpret optional difficulty clarification
3. Determine the permitted adaptation route
4. Select a bounded adaptive direction
5. Update subsequent support
```

### Route Selection

```text
I understand
→ fade / conclude additional support

I partially understand or I need more explanation
+ no difficulty clarification
→ normal Stage 5 adaptation

Explain it more simply
→ Stage 5

Give me another example
→ Stage 5

Help with Burmese / English terms
→ Stage 3 → Stage 4 → Stage 5

I do not understand the concept
→ Stage 4 → Stage 5

The concept or term is not what I meant
→ Stage 2 → refine Stage 1 if required → downstream support
```

Possible adaptive directions include:

- simplify;
- clarify;
- change example;
- provide another analogy;
- change explanatory depth;
- adjust language presentation;
- provide hint;
- reduce support;
- conclude support.

Important boundary:

The framework does not claim that the learner's self-report is an objective diagnosis, that one response always maps to one uniquely correct pedagogical action, or that the selected adaptation is pedagogically optimal.

RQ mapping:

> **RQ3**

---

# 15. Refined Framework Text Diagram

## 15.1 Complete Seven-Stage Process, Decisions, and Feedback 

### Main Seven-Stage Process

```text
┌─────────────────────────────────────┐
│ Learner STEM Inquiry                │
└──────────────────┬──────────────────┘
                   │ submits STEM question
                   ▼
┌─────────────────────────────────────┐
│ 1. Identify STEM Terminology        │
│    Identify principal technical     │
│    term or concept                  │
└──────────────────┬──────────────────┘
                   │ identified terminology guides
                   │ technical interpretation
                   ▼
┌─────────────────────────────────────┐
│ 2. Interpret Technical Context      │
│    Determine relevant STEM/domain   │
│    meaning                          │
└──────────────────┬──────────────────┘
                   │ technical context guides
                   │ language-support selection
                   ▼
┌─────────────────────────────────────┐
│ 3. Select Language Support          │
│    Burmese / English / bilingual    │
│    support strategy                 │
└──────────────────┬──────────────────┘
                   │ selected language strategy shapes
                   │ the conceptual explanation
                   ▼
┌─────────────────────────────────────┐
│ 4. Explain STEM Concept             │
│    Establish core STEM meaning      │
│    beyond direct translation        │
└──────────────────┬──────────────────┘
                   │ core conceptual meaning becomes
                   │ the basis for learner support
                   ▼
┌─────────────────────────────────────┐
│ 5. Provide Scaffolding              │
│                                     │
│    Selectable support may include:  │
│    • simpler explanation            │
│    • example / analogy              │
│    • technical detail               │
│    • reflective prompt              │
│    • hint / clarification           │
└──────────────────┬──────────────────┘
                   │ learner experiences support
                   │ and reports remaining need
                   ▼
┌─────────────────────────────────────┐
│ 6. Collect Learner Response         │
│                                     │
│ 6A. Overall support need            │
│    • I understand                   │
│    • I partially understand         │
│    • I need more explanation        │
│                                     │
│ 6B. Optional difficulty             │
│     clarification                   │
│                                     │
│ "What would help you most?"         │
│    • Explain it more simply         │
│    • Give me another example        │
│    • Help with Burmese / English    │
│      terms                          │
│    • I do not understand the        │
│      concept                        │
│    • The concept/term is not what   │
│      I meant                        │
└──────────────────┬──────────────────┘
                   │ learner-reported support signal
                   │ + optional difficulty type
                   ▼
┌─────────────────────────────────────┐
│ 7. Adapt Support                    │
│                                     │
│    • interpret support need         │
│    • interpret difficulty type      │
│      when available                 │
│    • choose bounded route           │
│    • update subsequent support      │
└─────────────────────────────────────┘
```

### Stage 6 → Stage 7 Adaptation Routing

```text
                  ┌──────────────────────────────┐
                  │ 6. Collect Learner Response │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                 ┌────────────────────────────────┐
                 │ Overall support need           │
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
└──────────────────┘        │ Optional clarification      │
                            │ "What would help you most?" │
                            └──────────────┬──────────────┘
                                           │
             ┌─────────────────────────────┼─────────────────────────────┐
             │                             │                             │
             ▼                             ▼                             ▼
┌─────────────────────┐      ┌──────────────────────┐      ┌─────────────────────┐
│ Explain it more     │      │ Give me another      │      │ Help with Burmese / │
│ simply              │      │ example              │      │ English terms       │
└──────────┬──────────┘      └──────────┬───────────┘      └──────────┬──────────┘
           │                            │                             │
           │ normal scaffold            │ normal scaffold             │ language difficulty
           │ adaptation                 │ adaptation                  │
           ▼                            ▼                             ▼
     ┌───────────┐                ┌───────────┐                 ┌───────────┐
     │ Stage 5   │                │ Stage 5   │                 │ Stage 3   │
     │ Provide   │                │ Provide   │                 │ Select    │
     │ Scaffold  │                │ Scaffold  │                 │ Language  │
     └───────────┘                └───────────┘                 └─────┬─────┘
                                                                     │ revised language
                                                                     ▼
                                                               ┌───────────┐
                                                               │ Stage 4   │
                                                               │ Explain   │
                                                               │ Concept   │
                                                               └─────┬─────┘
                                                                     │
                                                                     ▼
                                                               ┌───────────┐
                                                               │ Stage 5   │
                                                               │ Provide   │
                                                               │ Scaffold  │
                                                               └───────────┘


             ┌───────────────────────────────────────────────────────────┐
             │ Other optional clarification routes                       │
             └───────────────────────────────────────────────────────────┘

"I do not understand the concept"
        │ conceptual difficulty
        ▼
┌───────────────┐
│ Stage 4       │
│ Explain STEM  │
│ Concept       │
└───────┬───────┘
        │ revised concept explanation
        ▼
┌───────────────┐
│ Stage 5       │
│ Provide       │
│ Scaffolding   │
└───────────────┘


"The concept / term is not what I meant"
        │ ambiguity / misinterpretation
        ▼
┌───────────────┐
│ Stage 2       │
│ Interpret     │
│ Context       │
└───────┬───────┘
        │ if terminology itself was misidentified
        ▼
┌───────────────┐
│ Stage 1       │
│ Refine STEM   │
│ Terminology   │
└───────┬───────┘
        │ corrected interpretation
        ▼
     Continue through
     Stage 3 → Stage 4 → Stage 5
```

### Route-selection rule

The overall response determines **support intensity**. The optional difficulty clarification determines the **adaptation route** when available.

If the learner provides only `I partially understand` or `I need more explanation` without a difficulty clarification, the framework uses the **normal Stage 5 route** rather than inferring a language, conceptual, or ambiguity problem.

### Default Route When Difficulty Type Is Unknown

```text
I partially understand
OR
I need more explanation
        │
        │ no optional difficulty clarification
        ▼
┌─────────────────────┐
│ 7. Adapt Support    │
└──────────┬──────────┘
           │ do not guess the cause
           ▼
┌─────────────────────┐
│ 5. Provide          │
│    Scaffolding      │
│                     │
│ • simplify          │
│ • another example   │
│ • another analogy   │
│ • additional hint   │
│ • change depth      │
└─────────────────────┘
```

### Feedback Summary

```text
Normal support need
Stage 6 → Stage 7 → Stage 5

Language difficulty
Stage 6 → Stage 7 → Stage 3 → Stage 4 → Stage 5

Conceptual difficulty
Stage 6 → Stage 7 → Stage 4 → Stage 5

Ambiguity / misinterpretation
Stage 6 → Stage 7 → Stage 2
                      ↓
              Stage 1 if required
                      ↓
              Stage 3 → Stage 4 → Stage 5

Little/no additional support needed
Stage 6 → Stage 7 → Fade / Complete
```

## 15.2 Normal Forward Sequence

```text
Learner STEM Inquiry
  ──"identify technical target"──> Stage 1 Identify STEM Terminology
  ──"interpret domain meaning"──> Stage 2 Interpret Technical Context
  ──"choose Burmese/English strategy"──> Stage 3 Select Language Support
  ──"communicate core STEM meaning"──> Stage 4 Explain STEM Concept
  ──"organize learner-facing assistance"──> Stage 5 Provide Scaffolding
  ──"obtain overall support need + optional difficulty clarification"──> Stage 6 Collect Learner Response
  ──"interpret signals and choose bounded route/response"──> Stage 7 Adapt Support
```

The primary loop is Stage 7 → Stage 5. Stage 7 may instead revisit Stage 3 or Stage 4 when the optional difficulty clarification identifies a language-related or conceptual difficulty. Stages 1–2 are revisited only as an exception when the learner indicates that the interpreted concept or context is not what they meant. When no difficulty type is supplied, the framework uses the normal Stage 5 route.

---

# 16. Refined Feedback Routing

## 16.1 Fading / Completion

```text
Stage 6: I understand
→ Stage 7
→ Reduce / conclude additional support
```

This is based on learner-reported need, not verified mastery.

## 16.2 Normal Adaptation Path

```text
Stage 6: I partially understand / I need more explanation
+ no specific difficulty clarification
→ Stage 7
→ Stage 5
```

Use the normal path when the learner needs more support but has not identified a specific cause.

## 16.3 Explicit Scaffold Preference

```text
Explain it more simply
→ Stage 7 → Stage 5

Give me another example
→ Stage 7 → Stage 5
```

## 16.4 Language-Related Difficulty

```text
Help with Burmese / English terms
→ Stage 7
→ Stage 3
→ Stage 4
→ Stage 5
```

This route is used only when the learner supplies a language-related signal, rather than being inferred from `I partially understand` or `I need more explanation` alone.

## 16.5 Conceptual Difficulty

```text
I do not understand the concept
→ Stage 7
→ Stage 4
→ Stage 5
```

## 16.6 Ambiguity or Misinterpretation

Exceptional path:

```text
The concept or term is not what I meant
→ Stage 7
→ Stage 2
→ refine Stage 1 if required
→ downstream support
```

This is an exception rather than the normal feedback path.

---

---

# 17. Principal Decision Point 1 — Language-Support Selection

## Inputs

- identified STEM terminology;
- interpreted technical context;
- usefulness of English disciplinary terminology;
- need for Burmese explanation;
- learner-expressed language preference/need where available.

## Possible outcomes

- Burmese explanation;
- English-term preservation;
- bilingual presentation;
- contextual combination.

## Control principle

The decision remains bounded by the active STEM concept, technical context, and learner-support purpose.

---

# 18. Principal Decision Point 2 — Learner-Response Evaluation and Adaptation

## Inputs

- overall learner-reported support signal;
- optional difficulty clarification;
- current concept;
- previous scaffold;
- current language strategy;
- adaptation state.

## Possible outcomes

- continue;
- simplify;
- clarify;
- change support form;
- change language support;
- reduce support;
- conclude support.

## Control principle

Adaptation should remain:

- concept-scoped;
- bounded;
- traceable to learner-reported need;
- guided by the optional difficulty clarification when available;
- routed to Stage 5 by default when the difficulty type is unknown;
- controlled by the application/system workflow rather than unrestricted LLM behaviour.

---

# 19. Contingency and Fading

## Contingency

Conceptually represented through:

```text
Stage 6
→ Stage 7
→ Updated Support
```

Support changes in response to learner-reported need. The overall signal controls whether support should fade, continue, or increase, while an optional difficulty clarification can guide the type and route of the adaptation.

## Fading

Fading occurs when Stage 7 reduces support, makes assistance less directive, or concludes additional support.

Important:

> Fading is based on learner-reported need and should not be interpreted as objective proof of mastery.

---

# 20. Artefact 3 — PIRQOA Mapping

| Framework Element | Requirement | RQ |
|---|---|---|
| Identify STEM Terminology | Identify specialized STEM terminology | RQ1 |
| Interpret Technical Context | Understand technical/domain meaning | RQ1, RQ2 |
| Select Language Support | Context-sensitive Burmese/English support | RQ1 |
| Explain STEM Concept | Explanation beyond direct translation | RQ2 |
| Provide Scaffolding | Structured educational support | RQ2, RQ3 |
| Collect Learner Response | Obtain overall support signal and optional difficulty clarification | RQ3 |
| Adapt Support | Adjust subsequent assistance | RQ3 |
| Feedback loop | Maintain learner-responsive support | RQ3 |

---

# 21. Combined Conceptual Traceability

```text
Research Problem
↓
Burmese-speaking learners may face combined language and conceptual barriers
↓
PIRQOA Requirements
├── Terminology / language support
├── Conceptual support
└── Structured / adaptive support
↓
Artefact 1
Defines the required concepts
↓
Artefact 2
Defines the relationships among barriers, scaffolding, understanding, and learner response
↓
Artefact 3
Defines the operational seven-stage support process
↓
System Artefacts / PoC
Implement a bounded subset of the conceptual design
```

---

# 22. Scope Boundaries

The conceptual artefacts support:

- STEM terminology understanding;
- technical-context interpretation;
- contextual Burmese/English language support;
- conceptual explanation;
- structured scaffolding;
- learner-response-driven adaptation;
- bounded concept-scoped interaction.

They do **not** define:

- a full Learning Management System;
- teacher dashboards;
- formal quiz engines;
- social-learning features;
- unrestricted general-purpose chatbot interaction;
- a complete personalized-learning platform;
- objective mastery measurement.

---

# 23. Claim Boundaries

The refined conceptual artefacts support saying:

- the framework is traceable to RQ1–RQ3;
- terminology, context, language, explanation, scaffolding, learner response, and adaptation are integrated conceptually;
- TTF and Scaffolding Theory inform the design;
- learner response can guide subsequent scaffolding;
- selective bilingual terminology support is conceptually justified;
- adaptation can be bounded and concept scoped.

The artefacts do **not** establish that:

- learners learn better;
- self-report objectively measures understanding;
- generated explanations are always technically correct;
- every language-support choice is optimal;
- adaptation is pedagogically optimal;
- fading proves mastery;
- the approach generalizes equally across all STEM domains.

---

# 24. Refinements Applied

## Accepted

- [x] Clarified Stage 3 language-selection principles
- [x] Clarified Stage 4 vs Stage 5 responsibility
- [x] Defined Stage 6 as learner-reported support signal
- [x] Added optional difficulty clarification within Stage 6
- [x] Kept `What would help you most?` inside Stage 6 rather than adding an eighth stage
- [x] Made learner-response interpretation explicit within Stage 7
- [x] Defined Stage 7 route selection using overall support need plus optional difficulty type
- [x] Defined normal Stage 5 adaptation when the difficulty type is unknown
- [x] Added bounded feedback to Stages 3–5
- [x] Added ambiguity correction for Stages 1–2
- [x] Defined scaffold forms as selectable
- [x] Added explicit generated-content and self-report claim boundaries
- [x] Retained the seven-stage structure

## Rejected

- [x] Merge Stage 4 and Stage 5
- [x] Add an eighth stage
- [x] Add a deterministic language-selection algorithm
- [x] Add objective mastery/quiz functionality
- [x] Add a permanent Stage 2 → Stage 1 loop
- [x] Major structural redesign

---

# 25. Final Conceptual Artefact Set

## Artefact 1 — LLM-Based STEM Scaffolding Concepts

Defines:

1. STEM Terminology Identification
2. Context-Sensitive Language Support
3. Conceptual Explanation
4. Structured Scaffolding
5. Adaptive Support

Primary contribution:

> **definition**

## Artefact 2 — Task-Aligned LLM Scaffolding Model

Relates:

- Low-Resource Language Barrier
- LLM-Based Scaffolding
- STEM Understanding
- Learner Response

through five propositions and an adaptive feedback relationship.

Primary contribution:

> **relationships**

## Artefact 3 — Context-Aware Adaptive STEM Scaffolding Framework

Specifies:

1. Identify STEM Terminology
2. Interpret Technical Context
3. Select Language Support
4. Explain STEM Concept
5. Provide Scaffolding
6. Collect Learner Response
7. Adapt Support

with bounded feedback routing.

Primary contribution:

> **behaviour**

---

# 26. Frozen Refined Version

For Assignment 5 and subsequent system-artifact alignment, use this document as the **refined conceptual artefact specification**.

```text
Learner STEM Inquiry

1. Identify STEM Terminology
   Identify the principal specialized STEM concept or terminology requiring support.

2. Interpret Technical Context
   Determine the relevant STEM/domain meaning and recognize ambiguity where necessary.

3. Select Language Support
   Select a context-sensitive Burmese/English strategy using terminology, technical context,
   useful English disciplinary terms, and learner-expressed language need where available.

4. Explain STEM Concept
   Establish and communicate the core STEM meaning beyond direct translation.

5. Provide Scaffolding
   Structure learner support using selectable examples, analogies, reflective prompts, hints,
   clarifications, and appropriate explanatory depth.

6. Collect Learner Response
   First collect the learner's overall self-reported support need:
   I understand / I partially understand / I need more explanation.
   When additional support is requested, optionally ask "What would help you most?" to collect
   a difficulty clarification such as simpler explanation, another example, language support,
   conceptual clarification, or correction of the interpreted concept/term.
   This clarification remains part of Stage 6 and is not a new framework stage.

7. Adapt Support
   Interpret the overall support signal and any optional difficulty clarification, then select a
   bounded adaptive response. "I understand" may lead to fading/completion. If additional
   support is requested but no difficulty type is supplied, use the normal Stage 5 adaptation
   route. Language difficulty may revisit Stage 3, conceptual difficulty may revisit Stage 4,
   and concept/context misinterpretation may exceptionally revisit Stage 2 and refine Stage 1.
```

Important:

> **Learner-reported understanding and difficulty type remain self-reported signals, not objective evidence of learning or a verified diagnosis of the learner's difficulty.**

> **The optional difficulty clarification improves adaptation routing; it does not create a new framework stage.**

> **Generated STEM explanations remain subject to technical and pedagogical limitations.**

> **The refined conceptual artefacts justify targeted system alignment, not unnecessary expansion of the PoC.**
