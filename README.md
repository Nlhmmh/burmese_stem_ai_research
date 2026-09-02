# Burmese STEM AI Research Prototype

## Scaffolding Low-Resource STEM Education with Large Language Models

This repository contains the research design and planned proof-of-concept implementation for an **LLM-Based Adaptive STEM Scaffolding System** intended to support Burmese-speaking learners who study STEM concepts that are commonly expressed using specialised English terminology.

The research does **not** treat the LLM itself as the artefact. The intended contribution is the way LLM capabilities are organised around:

- STEM terminology identification;
- technical-context interpretation;
- context-sensitive Burmese/English language support;
- conceptual explanation;
- structured scaffolding;
- learner self-reporting;
- bounded adaptive support; and
- persistent learning history.

The core learner journey is:

```text
Ask
  -> Learn
  -> Reflect
  -> Report Understanding
  -> Receive Adapted Support
  -> Ask a Scoped Follow-Up if Needed
  -> Finish, Review, or Resume
```

The prototype is intentionally narrow. It is designed to demonstrate the research artefacts and their traceability, not to become a complete Learning Management System (LMS), assessment platform, or general-purpose chatbot.

---

# 1. Research Summary

## 1.1 Research Problem

Burmese-speaking learners may face difficulty understanding specialised English STEM terminology and concepts because direct translation alone may not provide sufficient technical context or educational support.

A useful learning system therefore needs to do more than translate an isolated word. It should be able to:

1. identify the relevant STEM terminology;
2. determine the technical context in which the term is used;
3. decide whether the English term should be preserved, translated, presented bilingually, or further explained;
4. explain the underlying concept;
5. provide structured educational support;
6. collect learner feedback about understanding; and
7. adapt subsequent support according to that feedback.

The research focuses on integrating these capabilities into one coherent scaffolding approach.

## 1.2 Research Objective

The objective is to design and demonstrate an LLM-based adaptive STEM scaffolding system that aligns technological capabilities with learner tasks and provides structured, context-aware and learner-responsive support for Burmese-speaking STEM learners.

The proof of concept demonstrates whether the proposed design can be instantiated as a functioning Information System.

It does **not**, by itself, prove that the system improves STEM learning outcomes. Claims about improved understanding, reduced language barriers, or educational effectiveness require later empirical evaluation with learners.

---

# 2. Theoretical Foundation

The conceptual artefacts are grounded primarily in two theories.

## 2.1 Task–Technology Fit (TTF)

Task–Technology Fit provides the primary Information Systems foundation.

In this research:

- **learner task**: understand specialised English STEM terminology and concepts;
- **technology**: an LLM-based educational Information System;
- **required capabilities**: terminology identification, contextual language support, conceptual explanation, structured support and adaptation;
- **fit principle**: each capability should directly address an identifiable learner task or difficulty.

TTF therefore supports a central design rule:

> Do not add technological capabilities unless they contribute to the learner task or to necessary usability, accessibility, safety, or implementation requirements.

## 2.2 Scaffolding Theory

Scaffolding Theory provides the complementary educational foundation.

It informs how educational assistance should be:

- structured;
- understandable;
- responsive to learner needs;
- increased when more support is required; and
- reduced or progressed when the learner reports stronger understanding.

Within this prototype, scaffolding is represented through:

- layered explanations;
- examples and analogies;
- optional hints;
- reflective prompts;
- learner understanding responses; and
- adapted support.

## 2.3 Supporting Concepts and Processes

The research also draws on implementation-oriented knowledge related to:

- automatic term extraction;
- context-sensitive translation;
- multilingual interaction;
- bilingual explanation;
- structured prompting; and
- adaptive educational support.

These concepts inform implementation but are not treated as additional kernel theories.

---

# 3. Conceptual Artefacts

The research proposes three complementary conceptual artefacts.

They progress from:

```text
Definition
   ->
Relationships
   ->
Behaviour
```

Together, they provide the conceptual basis for the later system artefacts.

---

## 3.1 Conceptual Artefact 1 — LLM-Based STEM Scaffolding Concepts

### Definition

**LLM-Based STEM Scaffolding** is the structured use of LLM capabilities to identify specialised STEM terminology, provide context-sensitive language support, explain underlying concepts, and adjust educational assistance according to learner interaction and task requirements.

### Core Concepts

1. **STEM Terminology Identification**  
   Recognise specialised STEM terms or concepts that require language or conceptual support.

2. **Context-Sensitive Language Support**  
   Decide how language support should be provided according to technical and linguistic context. Support may include:
   - Burmese explanation;
   - preservation of the English technical term;
   - bilingual presentation; or
   - additional contextual explanation.

3. **Conceptual Explanation**  
   Explain what a STEM concept means rather than only translating its label.

4. **Structured Scaffolding**  
   Organise learning support through explanation, examples, analogies, reflection, hints and guidance rather than unrestricted chatbot interaction.

5. **Adaptive Support**  
   Adjust subsequent support according to learner interaction and self-reported understanding.

### Text Diagram

```text
                   LLM-Based STEM Scaffolding
                              |
          +-------------------+-------------------+
          |                   |                   |
       includes            includes            includes
          |                   |                   |
          v                   v                   v
 STEM Terminology     Context-Sensitive      Conceptual
 Identification        Language Support      Explanation
          |
          +-------------------+-------------------+
                              |
                           includes
                              |
                 +------------+------------+
                 |                         |
                 v                         v
        Structured Scaffolding       Adaptive Support
```

This artefact defines **what the proposed scaffolding system consists of**.

---

## 3.2 Conceptual Artefact 2 — Task-Aligned LLM Scaffolding Model

This artefact defines the relationships among four major constructs:

- Low Resource Language Barrier;
- LLM-Based Scaffolding;
- STEM Understanding;
- Learner Response.

### Relationships

```text
Low Resource Language Barrier
            |
          hinders
            v
     STEM Understanding

LLM-Based Scaffolding
       |          |
     reduces    supports
       |          |
       v          v
Language       STEM
Barrier        Understanding

LLM-Based Scaffolding
            |
         leads to
            v
     Learner Response
            |
          guides
            v
 Updated LLM-Based Scaffolding
```

### Interpretation

- The low resource language barrier can hinder STEM understanding.
- LLM-based scaffolding is intended to reduce that barrier rather than claim to eliminate it.
- LLM-based scaffolding is intended to support STEM understanding through explanation and structured assistance.
- Scaffolding produces learner interaction and self-reported understanding.
- Learner response guides subsequent scaffolding.

The prototype can instantiate these mechanisms, but later learner evaluation is required to determine whether the expected educational relationships are actually achieved.

---

## 3.3 Conceptual Artefact 3 — Context-Aware Adaptive STEM Scaffolding Framework

This artefact defines **how support should operate**.

### Process

```text
Identify STEM Terminology
          |
      determines
          v
Interpret Technical Context
          |
        guides
          v
Select Language Support
          |
        shapes
          v
Explain STEM Concept
          |
       enables
          v
Provide Scaffolding
          |
      leads to
          v
Collect Learner Response
          |
        guides
          v
Adapt Support
          |
        updates
          +--------------------------+
                                     |
                                     v
                           Provide Scaffolding
```

The process is both:

- **context-aware**, because the language and explanation strategy depend on the STEM term and technical context; and
- **adaptive**, because learner response changes later support.

---

# 4. From Conceptual Artefacts to System Artefacts

The artefact progression is:

```text
Theoretical Foundation
        |
        v
Conceptual Artefacts
Definition -> Relationships -> Behaviour
        |
        v
System Artefact 1
Adaptive STEM Scaffolding System Framework
        |
        v
System Artefact 2
Adaptive STEM Scaffolding Logical Architecture
        |
        v
System Artefact 3
Burmese STEM AI Proof of Concept
        |
        v
Later Empirical Evaluation
```

The distinctions are important:

- **Conceptual artefacts** describe theoretical design knowledge.
- **System framework** organises that knowledge into system functions.
- **System architecture** identifies the logical components needed to perform those functions.
- **Proof of concept** implements the minimum software needed to demonstrate the design.

---

# 5. System Artefact 1 — Adaptive STEM Scaffolding System Framework

## 5.1 Purpose

The system framework translates the conceptual process into an operational system flow.

It defines **what the system must do**, without committing to low-level implementation details such as a specific LLM provider, database library, or hosting platform.

## 5.2 Framework Inputs and Outputs

### Main Input

A learner provides a natural-language STEM inquiry such as:

```text
"What is gradient descent?"
"Explain neural networks."
"What does polymorphism mean?"
"I do not understand recursion."
```

### Main Output

A structured learning session containing:

- identified concept;
- STEM domain/context;
- bilingual or context-sensitive language support;
- conceptual explanation;
- structured scaffold;
- reflective prompt;
- optional hint;
- learner-understanding state;
- adapted support where required; and
- session status/history.

## 5.3 Functional Stages

| Stage | Input | System Activity | Output | Relationship |
|---|---|---|---|---|
| Identify STEM Terminology | Learner inquiry | Identify the specialised concept or terminology | Identified concept | determines context interpretation |
| Interpret Technical Context | Concept + inquiry | Determine relevant STEM meaning/domain | Technical context | guides language support |
| Select Language Support | Context + preferences | Choose Burmese, English preservation, bilingual support or explanation | Language strategy | shapes explanation |
| Explain STEM Concept | Concept + context + strategy | Generate understandable conceptual content | Concept explanation | enables scaffolding |
| Provide Scaffolding | Explanation + learner state | Structure support using examples, analogy, reflection and hints | Learning scaffold | leads to learner response |
| Collect Learner Response | Learning scaffold | Capture self-reported understanding | Understanding level | guides adaptation |
| Adapt Support | Understanding + current scaffold | Increase, simplify, clarify or progress support | Updated scaffold | updates scaffolding |

## 5.4 Full System Framework Diagram

```text
+--------------------------------------------------+
|                Learner STEM Inquiry              |
| "What is gradient descent?"                      |
+--------------------------+-----------------------+
                           |
                        provides
                           v
+--------------------------------------------------+
|           1. Identify STEM Terminology           |
| Identify the main specialised STEM concept       |
+--------------------------+-----------------------+
                           |
                       determines
                           v
+--------------------------------------------------+
|           2. Interpret Technical Context         |
| Determine relevant domain and technical meaning  |
+--------------------------+-----------------------+
                           |
                         guides
                           v
+--------------------------------------------------+
|            3. Select Language Support            |
| Burmese / English term / bilingual / explanation |
+--------------------------+-----------------------+
                           |
                         shapes
                           v
+--------------------------------------------------+
|              4. Explain STEM Concept             |
| Simple + contextual + technical explanation      |
+--------------------------+-----------------------+
                           |
                        enables
                           v
+--------------------------------------------------+
|              5. Provide Scaffolding              |
| Example + analogy + reflection + optional hint   |
+--------------------------+-----------------------+
                           |
                       leads to
                           v
+--------------------------------------------------+
|            6. Collect Learner Response           |
| High / Medium / Needs Support                    |
+--------------------------+-----------------------+
                           |
                         guides
                           v
+--------------------------------------------------+
|                 7. Adapt Support                 |
| Progress / clarify / simplify / new analogy      |
+--------------------------+-----------------------+
                           |
                         updates
                           |
                           +----------------------+
                                                  |
                                                  v
                                      Provide Scaffolding
```

## 5.5 Adaptive Feedback Loop

The most important system behaviour is:

```text
Provide Scaffolding
        |
        v
Learner Response
        |
        v
Adaptation Decision
        |
        v
Updated Support
        |
        +---------------------> next learner response
```

For the proof of concept, adaptation is deliberately bounded to **a maximum of two adaptation rounds per concept**. This is a prototype implementation constraint, not a theoretical claim that two rounds are universally optimal.

---

# 6. System Artefact 2 — Adaptive STEM Scaffolding Logical Architecture

## 6.1 Purpose

The logical architecture defines **which system components are responsible for implementing the system framework**.

The architecture must keep the LLM as one enabling service rather than treating it as the complete system.

## 6.2 Architecture Layers

The logical architecture contains four main responsibility layers plus controlled API boundaries.

### Layer 1 — User-Facing Layer

Responsible for:

- learner interaction;
- navigation;
- English/Burmese interface localisation;
- preferences;
- displaying learning content;
- collecting learner responses;
- displaying learning history.

Main UI areas:

- Ask/Home;
- STEM Learning Session;
- Learning History;
- Preferences modal/drawer.

### Layer 2 — Application / Scaffolding Layer

Contains the research-specific system logic.

Main responsibilities:

- STEM query interpretation;
- technical-context handling;
- language-support selection;
- scaffolding orchestration;
- learner-response processing;
- adaptation control;
- session lifecycle logic;
- follow-up scope control.

### Layer 3 — AI / LLM Layer

Provides bounded generative capabilities such as:

- terminology/context analysis;
- bilingual explanation;
- analogies/examples;
- technical explanation;
- hints;
- reflective prompts;
- adapted support;
- concept-specific follow-up responses.

The application layer controls what the LLM is asked to do and what state is stored.

### Layer 4 — Data Layer

Stores only the data needed for:

- anonymous learner preferences;
- learning-session persistence;
- adaptation state;
- history;
- review/resume.

No authentication data or unnecessary personal data is required.

## 6.3 Logical Components

### Student Interface

**Responsibility**
- expose the three screens;
- allow immediate STEM inquiry;
- present structured learning content;
- collect understanding;
- support review/resume.

**Input**
- learner actions.

**Output**
- requests to application APIs and rendered learning state.

### STEM Query Interpreter

**Responsibility**
- identify the main STEM concept;
- determine whether the input is plausibly within STEM scope;
- determine technical context/domain;
- detect material ambiguity.

**Input**
- learner inquiry.

**Output**
- concept;
- domain/context;
- clarification request when needed.

**Important Rule**
- materially ambiguous context should be clarified rather than silently guessed.

### Language Support Logic

**Responsibility**
- determine how Burmese and English should be combined.

Possible strategies:

- Burmese explanation + preserved English technical terms;
- bilingual explanation;
- Burmese-focused explanation;
- English-focused explanation.

**Input**
- concept;
- technical context;
- learner preferences.

**Output**
- language-support strategy used by the scaffolding system.

### Scaffolding Orchestrator

**Responsibility**
- coordinate the initial educational scaffold;
- decide which structured content is requested from the LLM;
- ensure the output follows the prototype structure.

Initial scaffold normally contains:

- simple explanation;
- real-world example or analogy;
- technical explanation;
- reflective prompt;
- optional hint.

### Learner Response Handler

**Responsibility**
- accept exactly one of three understanding signals:

```text
high
medium
needs_support
```

UI mapping:

```text
"I understand"              -> high
"I partially understand"    -> medium
"I need more explanation"   -> needs_support
```

These values represent **self-reported understanding**, not objective test scores.

### Adaptation Logic

**Responsibility**
- translate learner understanding into a new scaffolding strategy.

```text
high
  -> key takeaway
  -> optional deeper insight
  -> allow completion

medium
  -> clarification
  -> alternative example
  -> analogy or hint

needs_support
  -> simpler wording
  -> more Burmese support where appropriate
  -> different analogy
  -> prerequisite clarification
```

Adapted content should differ meaningfully from the previous content.

### Follow-Up Handler

**Responsibility**
- allow one free-text follow-up path within the current concept.

Example:

```text
Current concept: Gradient Descent
Follow-up: "Why is the learning rate important?"
```

A materially different concept should not silently replace the current session. The UI should instead offer to begin a new learning session.

### LLM Service

**Responsibility**
Provide a controlled abstraction for LLM operations.

Suggested conceptual interface:

```text
identifyConcept()
interpretContext()
generateInitialScaffolding()
generateAdaptedSupport()
answerScopedFollowUp()
```

The exact provider is an implementation decision and is not part of the conceptual contribution.

### Learning Session Repository

**Responsibility**
- create;
- retrieve;
- update;
- list learning sessions.

Supports:

- history;
- resume;
- review;
- adaptation state.

### Learner Preference Repository

**Responsibility**
Store anonymous preferences such as:

- UI language;
- support language;
- explanation level;
- learning style;
- theme;
- text size.

## 6.4 Logical Architecture Diagram

```text
+================================================================+
|                     USER-FACING LAYER                          |
|                                                                |
|   +--------------+   +----------------+   +----------------+   |
|   | Ask / Home   |   | Learning       |   | Learning       |   |
|   |              |   | Session        |   | History        |   |
|   +------+-------+   +-------+--------+   +--------+-------+   |
|          |                   |                     |            |
|          +-------------------+---------------------+            |
|                              |                                  |
|                     Preferences / Locale                       |
+==============================+=================================+
                               |
                         controlled API
                               v
+================================================================+
|               APPLICATION / SCAFFOLDING LAYER                  |
|                                                                |
| +--------------------+      +-----------------------+           |
| | STEM Query         |----->| Language Support      |           |
| | Interpreter        |      | Logic                 |           |
| +---------+----------+      +-----------+-----------+           |
|           |                             |                       |
|           +---------------+-------------+                       |
|                           v                                     |
|                 +----------------------+                        |
|                 | Scaffolding          |<-------------------+   |
|                 | Orchestrator         |                    |   |
|                 +----------+-----------+                    |   |
|                            |                                |   |
|                            v                                |   |
|                 +----------------------+                    |   |
|                 | Learner Response     |                    |   |
|                 | Handler              |                    |   |
|                 +----------+-----------+                    |   |
|                            |                                |   |
|                            v                                |   |
|                 +----------------------+                    |   |
|                 | Adaptation Logic     |--------------------+   |
|                 +----------------------+                        |
|                                                                |
|                 +----------------------+                        |
|                 | Scoped Follow-Up     |                        |
|                 | Handler              |                        |
|                 +----------------------+                        |
+===========================+===================+================+
                            |                   |
                            v                   v
+----------------------------------+   +-------------------------+
|          AI / LLM LAYER          |   |       DATA LAYER        |
|                                  |   |                         |
| +------------------------------+ |   | +---------------------+ |
| | LLM Service                  | |   | | LearnerProfile      | |
| | - concept/context            | |   | +---------------------+ |
| | - bilingual explanation      | |   |                         |
| | - examples / analogies       | |   | +---------------------+ |
| | - reflective prompt / hint   | |   | | LearningSession     | |
| | - adapted support            | |   | +---------------------+ |
| | - scoped follow-up           | |   |                         |
| +------------------------------+ |   | MongoDB                 |
+----------------------------------+   +-------------------------+
```

## 6.5 Key Architecture Principle

The architecture should be interpreted as:

```text
Application decides WHAT support is needed
                |
                v
LLM generates requested educational content
                |
                v
Application validates, stores and presents the result
```

not:

```text
Learner -> unrestricted LLM -> arbitrary response
```

---

# 7. System Artefact 3 — Burmese STEM AI Proof of Concept

## 7.1 Purpose

The proof of concept is the minimum working implementation needed to demonstrate:

- terminology/context interpretation;
- bilingual explanation;
- structured scaffolding;
- learner response;
- adaptive support;
- learning continuity.

It contains exactly **three primary screens**.

## 7.2 Screen 1 — Ask / Home

### Purpose

Allow the learner to start immediately with minimal friction.

### Required Features

- app title;
- short educational description;
- natural-language STEM input;
- Send action;
- example prompts;
- Learning Preferences;
- Learning History navigation;
- English/Burmese UI language switch;
- light/dark theme control.

### Example Inquiries

```text
"What is gradient descent?"
"Explain neural networks."
"What does polymorphism mean?"
"Explain photosynthesis."
"What is a derivative?"
```

### Default Preferences

```text
Language support:  Burmese + English STEM terms
Explanation level: Beginner
Learning style:     Guided
```

### Learning Style Meanings

- **Guided** — structured explanation with reflection and hints where appropriate.
- **Concise** — shorter, direct explanations with less supporting detail.
- **More Examples** — emphasises additional examples and analogies.

`Guided` is the default research-oriented mode.

### Screen 1 Flow

```text
+--------------------------------------------------+
| Burmese STEM AI                                  |
| Understand STEM concepts in Burmese and English  |
|                                                  |
| +----------------------------------------------+ |
| | Ask any STEM question...                     | |
| +----------------------------------------------+ |
|                                      [ Send ]    |
|                                                  |
| Example prompts                                  |
| [Gradient Descent] [Neural Networks] [...]       |
|                                                  |
| [Learning Preferences]   [Learning History]      |
| [EN | MY]                [Light | Dark]           |
+--------------------------+-----------------------+
                           |
                           v
                 POST create session
                           |
                           v
                 /learn/{sessionId}
```

The internal identification/context/language-selection stages are not exposed as mandatory learner steps.

## 7.3 Screen 2 — STEM Learning Session

This is the **main research screen**.

### Required Content

1. Concept name
2. Domain
3. Simple Explanation
4. Real-World Example / Analogy
5. Technical Explanation
6. Reflective Prompt
7. Optional Hint
8. Understanding Check
9. Adapted Support
10. Scoped Follow-Up
11. Finish / Continue controls

### Bilingual Content Requirement

STEM explanations should support Burmese while retaining useful English STEM terminology.

The application should not blindly translate technical terms where preserving the English term improves technical accuracy or familiarity.

Examples of terms that may remain visible in English include:

- Gradient Descent;
- Loss Function;
- Neural Network;
- Machine Learning;
- Parameter;
- Recursion;
- Polymorphism.

Burmese content must use valid Unicode text and should be reviewed during evaluation for linguistic clarity and technical accuracy.

### Explanation Structure

```text
Concept: Gradient Descent
Domain: Machine Learning

+----------------------------------+
| Simple Explanation               |
| Accessible bilingual explanation |
+----------------------------------+

+----------------------------------+
| Real-World Example / Analogy     |
| Concrete explanatory example     |
+----------------------------------+

+----------------------------------+
| Technical Explanation            |
| More precise STEM description    |
+----------------------------------+

+----------------------------------+
| Think About This                 |
| One reflective prompt            |
| [Show Hint]                      |
+----------------------------------+

How well do you understand this concept?

[ I understand ]
[ I partially understand ]
[ I need more explanation ]
```

### Reflective Prompt Rule

The reflective prompt supports learner thinking.

It is **not a quiz**.

Do not add:

- multiple-choice answers;
- right/wrong feedback;
- scores;
- mandatory submission;
- a sequence of assessment questions.

### Understanding Response

Use exactly:

```text
I understand              -> high
I partially understand    -> medium
I need more explanation   -> needs_support
```

### Adaptation Behaviour

#### `high`

```text
Understanding: high

System:
  -> show concise key takeaway
  -> optionally show one deeper insight
  -> allow learner to finish

If learner finishes:
  Status: completed
```

#### `medium`

```text
Understanding: medium
Status: in_progress

System:
  -> provide clarification
     OR alternative example
     OR analogy
     OR useful hint
  -> ask understanding again
```

#### `needs_support`

```text
Understanding: needs_support
Status: in_progress

System:
  -> simplify wording
  -> increase Burmese explanation where useful
  -> reduce unnecessary technical complexity
  -> use a different analogy
  -> explain a prerequisite term if needed
  -> ask understanding again
```

### Bounded Adaptation

Maximum adaptation rounds:

```text
0 = initial explanation
1 = first adapted support
2 = second/final adapted support
```

After round 2, if the learner still reports insufficient understanding:

```text
Status -> review_recommended
```

The learner can still:

- ask a scoped follow-up;
- save the session;
- revisit it later.

### Adaptation Flow Diagram

```text
Initial Scaffolding
        |
        v
Understanding Check
        |
   +----+---------------------+
   |            |             |
   v            v             v
 high         medium     needs_support
   |            |             |
   v            v             v
Key Takeaway   Clarify /      Simplify /
Optional       New Example    New Analogy
Insight        / Hint         / More Support
   |            |             |
   |            +------+------+ 
   |                   |
   |                   v
   |          Understanding Check Again
   |                   |
   |          maximum adaptation round = 2
   |                   |
   +-------------------+---------------------+
                       |
                       v
          Complete or Review Recommended
```

### Follow-Up Question

Screen 2 contains one free-text follow-up area:

```text
Still have a question about Gradient Descent?

[ Ask a follow-up about this concept... ]
```

Follow-ups remain scoped to the current concept.

A materially different concept should trigger an option to start a **new learning session** rather than silently replacing the current session.

## 7.4 Screen 3 — Learning History

### Purpose

Provide learning continuity without creating a dashboard or analytics system.

### Required Fields

Each history item shows:

- concept;
- domain;
- understanding;
- status;
- date;
- action.

### Example

```text
+--------------------------------------------------+
| Gradient Descent                                 |
| Machine Learning                                 |
| Understanding: High                              |
| Status: Completed                                |
| [Review]                                         |
+--------------------------------------------------+

+--------------------------------------------------+
| Neural Networks                                  |
| Deep Learning                                    |
| Understanding: Medium                            |
| Status: In Progress                              |
| [Resume]                                         |
+--------------------------------------------------+

+--------------------------------------------------+
| Calculus Fundamentals                            |
| Mathematics                                      |
| Understanding: Needs Support                     |
| Status: Review Recommended                       |
| [Continue Learning]                              |
+--------------------------------------------------+
```

### Important Distinction

**Understanding** and **Status** must remain separate.

Understanding values:

```text
high
medium
needs_support
```

Status values:

```text
in_progress
completed
review_recommended
```

Meaning:

- `high` describes perceived understanding.
- `completed` describes the session lifecycle.
- `medium` does not automatically mean completed.
- `review_recommended` means the learner should revisit the concept, normally because bounded adaptation has ended without sufficient reported understanding.

---

# 8. Prototype Scope

## 8.1 In Scope

- natural-language STEM inquiry;
- STEM terminology identification;
- technical-context interpretation;
- Burmese/English context-sensitive support;
- preservation of useful English technical terms;
- simple conceptual explanation;
- real-world examples and analogies;
- technical explanation;
- reflective prompt;
- optional hint;
- three understanding responses;
- adaptive support;
- maximum two adaptation rounds;
- concept-scoped free-text follow-up;
- anonymous learner state;
- learning preferences;
- learning history;
- review/resume/continue;
- English/Burmese UI localisation;
- light/dark themes;
- accessible and responsive UI;
- minimum persistence required by the research prototype.

## 8.2 Explicitly Out of Scope

Do not implement:

- login/signup;
- passwords;
- OAuth;
- identity management;
- teacher dashboard;
- administrator dashboard;
- course management;
- assignments;
- grades;
- examinations;
- MCQ quizzes;
- correctness scoring;
- question progression engines;
- gamification;
- badges;
- streaks;
- leaderboards;
- social/community features;
- payments;
- subscriptions;
- advertisements;
- file/document management;
- complex analytics;
- multiple AI agents;
- voice assistant;
- unrestricted general-purpose chat.

A feature should only be added if it directly supports:

- a conceptual artefact;
- a system artefact;
- evaluation;
- usability;
- accessibility;
- safety; or
- necessary technical operation.

---

# 9. Feature Requirements

| Feature | Priority | Research Purpose |
|---|---|---|
| Natural STEM question input | Required | Provides the learner task |
| STEM terminology identification | Required | Implements Conceptual Artefact 1 |
| Technical-context interpretation | Required | Supports context-aware assistance |
| Burmese + English support | Required | Addresses low resource language support |
| Simple explanation | Required | Conceptual explanation |
| Real-world example / analogy | Required | Structured scaffolding |
| Technical explanation | Required | Supports deeper conceptual understanding |
| Reflective prompt | Required | Lightweight structured reflection |
| Optional hint | Required | Additional scaffold without quiz complexity |
| Understanding response | Required | Learner Response construct |
| Adaptive support | Required | Adaptive Support construct |
| Learning history | Required | Continuity and resume |
| Scoped follow-up | Required | Learner-directed clarification |
| Preferences | Required | Supports task/language fit |
| English/Burmese UI | Required | Target-user usability |
| Authentication | Out of scope | Not needed for research contribution |
| Quiz engine | Out of scope | Adds unnecessary assessment scope |
| Teacher/admin tools | Out of scope | Outside research problem |

---

# 10. Functional Requirements

## FR-01 — Submit STEM Inquiry

The learner shall be able to submit a natural-language STEM question without mandatory configuration.

## FR-02 — Validate Inquiry Scope

The system shall reject empty input and provide a concise scope response for clearly non-STEM requests.

## FR-03 — Identify STEM Terminology

The system shall identify the primary STEM term or concept contained in or implied by the inquiry.

## FR-04 — Interpret Technical Context

The system shall determine the relevant STEM context or domain.

Material ambiguity shall trigger clarification instead of unsupported guessing.

## FR-05 — Apply Language Support

The system shall select language support according to:

- concept;
- context;
- support-language preference.

The default shall favour Burmese explanation with useful English technical terminology preserved.

## FR-06 — Create Learning Session

A valid inquiry shall create a persistent learning session with a stable session identifier.

## FR-07 — Present Structured Explanation

The learning screen shall present:

- simple explanation;
- real-world example/analogy;
- technical explanation;
- reflective prompt;
- optional hint.

## FR-08 — Collect Understanding

The system shall provide exactly three self-report choices:

```text
high
medium
needs_support
```

## FR-09 — Adapt Support

The system shall generate meaningfully different subsequent support according to learner response.

## FR-10 — Bound Adaptation

The system shall support no more than two adaptation rounds per concept.

## FR-11 — Support Scoped Follow-Up

The learner shall be able to ask a free-text follow-up related to the current concept.

A materially different concept shall initiate a new-session path.

## FR-12 — Manage Session Status

The system shall maintain:

```text
in_progress
completed
review_recommended
```

independently of understanding level.

## FR-13 — Save Learning History

The system shall store enough state to display genuine previous learning sessions.

## FR-14 — Resume Learning

The system shall restore relevant state when a learner selects Resume, Review, or Continue Learning.

## FR-15 — Manage Anonymous Preferences

The learner shall be able to configure:

- UI language;
- support language;
- explanation level;
- learning style;
- theme;
- text size.

## FR-16 — Support English/Burmese UI

The interface shall support both English and Burmese locale text.

---

# 11. Non-Functional Requirements

## 11.1 Usability

- Immediate inquiry from the home screen.
- No mandatory multi-step setup.
- One STEM concept per learning session.
- Clear distinction between initial and adapted support.
- Simple navigation across the three screens.
- Internal AI processing should remain mostly invisible to the learner.

## 11.2 Accessibility

- keyboard navigation;
- visible focus states;
- semantic HTML;
- accessible labels;
- adequate contrast;
- no status communicated through colour alone;
- readable touch targets;
- adjustable text size;
- predictable heading structure.

## 11.3 Burmese Language Support

- use Unicode Burmese text;
- ensure appropriate rendering and line height;
- avoid clipping;
- support responsive wrapping;
- keep English technical terminology visually readable within Burmese explanation.

## 11.4 Visual Design

The interface should be:

- calm;
- modern;
- educational;
- student-friendly;
- low-clutter.

Suggested visual direction:

- soft educational blue as primary;
- teal/green for positive progress;
- gentle purple accents;
- amber for partial/review states;
- muted red for needs-support states;
- neutral backgrounds.

Avoid:

- cyberpunk/futuristic AI design;
- excessive gradients;
- childish gamification;
- dense enterprise dashboards.

Support:

- light mode;
- dark mode;
- responsive desktop/tablet/mobile layouts.

## 11.5 Privacy and Data Minimisation

- no authentication required;
- do not collect unnecessary personally identifiable information;
- use an anonymous learner identifier where persistence is required;
- persist only research-relevant preferences and session state;
- keep API keys and secrets outside client-delivered code.

## 11.6 Reliability

- validate API input;
- handle missing sessions predictably;
- handle LLM/network failure gracefully;
- prevent adaptation rounds above the prototype limit;
- avoid duplicate or contradictory state transitions.

## 11.7 Maintainability

- separate UI, API, domain logic, AI integration and database access;
- centralise constants;
- share TypeScript types where possible;
- keep locale dictionaries aligned;
- keep schema definitions authoritative for persisted data.

---

# 12. Conceptual-to-System Traceability

| Conceptual Element | System Framework | Architecture Component | Prototype Evidence |
|---|---|---|---|
| STEM Terminology Identification | Identify STEM Terminology | STEM Query Interpreter | Detected concept/session title |
| Interpret Technical Context | Interpret Technical Context | STEM Query Interpreter | Domain-aware explanation |
| Context-Sensitive Language Support | Select Language Support | Language Support Logic | Burmese/English presentation |
| Conceptual Explanation | Explain STEM Concept | Scaffolding Orchestrator + LLM | Simple + technical explanations |
| Structured Scaffolding | Provide Scaffolding | Scaffolding Orchestrator | Example, analogy, reflection, hint |
| Learner Response | Collect Learner Response | Learner Response Handler | Three understanding choices |
| Adaptive Support | Adapt Support | Adaptation Logic | Meaningfully changed support |
| Feedback Loop | Update Scaffolding | Response + Adaptation components | Response -> adapted explanation |
| Learning Continuity | Persist Session | Data Layer | History + Resume |
| Task–Capability Alignment | All stages | Overall design | Only research-relevant features |
| Low Resource Language Barrier | Language-support stages | Language Support Logic | Burmese support + English term retention |
| STEM Understanding | Learning session | UI + learner state | Self-reported understanding, not objective score |

---

# 13. End-to-End System Flow

```text
+-----------------------+
| Learner opens Home    |
+-----------+-----------+
            |
            v
+-----------------------+
| Ask STEM question     |
+-----------+-----------+
            |
            v
+-----------------------+
| Create Learning       |
| Session               |
+-----------+-----------+
            |
            v
+-----------------------+
| Identify concept      |
+-----------+-----------+
            |
            v
+-----------------------+
| Interpret context     |
+-----------+-----------+
            |
            v
+-----------------------+
| Select language       |
| support               |
+-----------+-----------+
            |
            v
+-----------------------+
| Generate structured   |
| explanation           |
+-----------+-----------+
            |
            v
+-----------------------+
| Reflective prompt /   |
| optional hint         |
+-----------+-----------+
            |
            v
+-----------------------+
| Learner reports       |
| understanding         |
+-----------+-----------+
            |
       +----+---------------------+
       |            |             |
       v            v             v
     high         medium     needs_support
       |            |             |
       |            +------+------+
       |                   |
       v                   v
   Complete         Generate adapted
   or follow-up     support
                           |
                           v
                   Understanding again
                           |
                    max 2 adaptations
                           |
                           v
              Complete / Review Recommended
                           |
                           v
                   Save Learning History
```

---

# 14. Acceptance Criteria

The proof of concept satisfies the intended research workflow when:

- a learner can submit a natural-language STEM inquiry;
- a STEM concept and relevant context can be established;
- material ambiguity is clarified instead of silently guessed;
- English/Burmese language support is applied;
- useful English STEM terms can be preserved;
- a learning session shows simple, example/analogy and technical explanations;
- one reflective prompt is provided;
- an optional hint is available;
- exactly three learner-understanding choices are used;
- learner understanding changes session state correctly;
- adapted support is meaningfully different from the previous explanation;
- no more than two adaptation rounds occur;
- follow-ups remain scoped to the current concept;
- a different concept can start a new session;
- genuine session data can be saved and retrieved;
- Review, Resume and Continue Learning restore appropriate state;
- understanding and session status remain separate;
- English/Burmese UI localisation works;
- Burmese Unicode is rendered correctly;
- keyboard focus and accessible labels are available;
- light/dark mode is usable;
- excluded LMS, quiz, gamification, social and unrestricted-chat features are not introduced;
- mock/static AI behaviour, if used, is clearly documented; and
- the prototype does not claim untested educational effectiveness.

---

# 15. Research Limitations and Later Evaluation

The proof of concept demonstrates a proposed system design.

It does not establish the educational effect of that design.

Later empirical evaluation may investigate:

- accuracy of STEM terminology identification;
- appropriateness of technical-context interpretation;
- linguistic clarity of Burmese explanations;
- technical accuracy of generated STEM content;
- usefulness of preserving English STEM terms;
- usefulness of simple/example/technical explanation layers;
- usefulness of reflective prompts and hints;
- whether the three self-report choices are understandable;
- whether learner response is a useful adaptation signal;
- whether adapted explanations are perceived as more helpful;
- whether two adaptation rounds are sufficient for the prototype;
- usability of History / Review / Resume;
- accessibility and Burmese typography;
- perceived Task–Technology Fit;
- whether the scaffolding approach supports actual STEM understanding.

Objective learning improvement should be evaluated separately from self-reported understanding.

If future evaluation uses pre/post knowledge questions, those should be treated as **research evaluation instruments**, not automatically added as a permanent quiz feature in the core system.

---

# 16. Design Principles

> **Research traceability over feature quantity**

> **Adaptive scaffolding over generic chat**

> **Context-sensitive support over literal translation**

> **Working functionality over decorative features**

> **Clarity over complexity**

> **Data minimisation over unnecessary user accounts**

> **The LLM enables the system; it is not the whole system**

---

# 17. Current Prototype Boundary

The smallest credible proof of concept contains:

```text
3 Primary Screens
1 Structured Learning Flow
1 Adaptive Feedback Loop
0 Authentication System
0 Quiz Engine
0 LMS Modules
```

This boundary is deliberate.

The prototype should remain large enough to demonstrate the complete research mechanism:

```text
Identify
 -> Interpret
 -> Select Support
 -> Explain
 -> Scaffold
 -> Collect Response
 -> Adapt
 -> Persist Learning State
```

while remaining small enough to be implemented, understood and evaluated as a university Information Systems research artefact.
