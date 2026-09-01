# Burmese STEM AI Research

## Scaffolding Low-Resource STEM Education with Large Language Models

This repository contains the research design and proof-of-concept application for an
adaptive learning system that helps Burmese-speaking learners understand specialised
English STEM terminology and concepts.

The LLM is an enabling component, not the complete research artefact. The contribution
is the combination of context-sensitive language support, conceptual explanation,
structured scaffolding, learner self-reporting, bounded adaptation, and persistent
learning sessions.

For installation, environment configuration, implemented APIs, and current development
status, see [`burmese_stem_ai/README.md`](burmese_stem_ai/README.md).

## Research context

English is widely used for specialised terminology in science, technology,
engineering, and mathematics. Burmese-speaking learners may therefore need more than
a literal translation: they must understand a term's technical meaning, the context in
which it is used, and its relationship to the larger concept or process.

The proposed system uses Burmese to improve accessibility while retaining useful
English terminology that learners will encounter in textbooks, source code, diagrams,
lectures, and professional practice. It treats explanation as an adaptive learning
process rather than a one-off generated answer.

```text
Ask
  -> Learn
  -> Reflect
  -> Report Understanding
  -> Receive Adapted Support
  -> Review or Resume
```

## Research problem and objective

### Problem

General-purpose translation and chat interfaces may not reliably:

- recognise the relevant STEM term;
- distinguish technical meanings across domains;
- preserve important English terminology;
- organise explanations as educational scaffolding;
- respond appropriately to a learner's reported understanding; or
- retain a learning record that supports review and continuation.

### Objective

The objective is to design and demonstrate an LLM-based adaptive STEM scaffolding
system that:

1. identifies specialised STEM terminology;
2. interprets its technical context;
3. selects appropriate English/Burmese language support;
4. explains the concept at a suitable level;
5. provides structured educational scaffolding;
6. collects a learner-understanding response; and
7. adapts subsequent support within a bounded learning session.

The prototype demonstrates design feasibility and research traceability. It does not,
by itself, establish improved learning outcomes; that requires empirical evaluation
with learners.

## Conceptual artefacts

### Conceptual Artefact 1 — LLM-Based STEM Scaffolding Concepts

This artefact defines five concepts that the system must operationalise:

1. **STEM Terminology Identification** — locate the specialised concept in the
   learner's inquiry.
2. **Context-Sensitive Language Support** — decide when to explain in Burmese,
   preserve an English term, or combine both languages.
3. **Conceptual Explanation** — communicate what the concept means instead of merely
   translating its label.
4. **Structured Scaffolding** — organise support through simple explanations,
   examples, analogies, technical detail, reflection, and hints.
5. **Adaptive Support** — change subsequent support according to the learner's
   self-reported understanding.

### Conceptual Artefact 2 — Task-Aligned LLM Scaffolding Model

This artefact defines the central relationships:

```text
Low-resource language barrier --hinders--> STEM understanding

LLM-based scaffolding --reduces--> language barrier
LLM-based scaffolding --supports-> STEM understanding

LLM-based scaffolding --elicits--> learner response
Learner response --------guides--> updated scaffolding
```

The LLM is aligned to specific learning tasks. It supports interpretation and
explanation, while application logic controls workflow, session state, allowed
responses, adaptation rounds, and persistence.

### Conceptual Artefact 3 — Context-Aware Adaptive STEM Scaffolding Framework

This artefact defines the end-to-end learning process:

```text
Identify STEM Terminology
        |
Interpret Technical Context
        |
Select Language Support
        |
Explain STEM Concept
        |
Provide Scaffolding
        |
Collect Learner Response
        |
Adapt Support
        +--------------------> updated scaffolding
```

Adaptation remains bounded to the current concept and must not become unrestricted
general-purpose conversation.

## System artefacts

### System Artefact 1 — Adaptive STEM Scaffolding System Framework

The system framework turns the conceptual process into learner-visible and
system-controlled stages: inquiry submission, interpretation, explanation,
reflection, self-reporting, adaptation, completion, and later review.

### System Artefact 2 — Adaptive STEM Scaffolding Logical Architecture

The logical architecture assigns responsibilities to five layers:

- the **UI layer** presents inquiry, learning, history, preferences, and locale
  controls;
- the **application/scaffolding layer** coordinates interpretation and adaptation;
- the **AI service layer** performs bounded LLM-assisted analysis and generation;
- the **data layer** persists learner preferences and learning sessions; and
- the **API layer** exposes controlled operations over these capabilities.

The application represents these responsibilities through `app`, `components`,
`services`, `data`, `i18n`, and `lib`.

### System Artefact 3 — Burmese STEM AI Proof of Concept

The executable Next.js prototype is designed around three primary screens:

1. **Ask/Home** — submit a STEM inquiry and manage basic preferences.
2. **Learning Session** — receive bilingual structured scaffolding, reflect, report
   understanding, and receive adapted support.
3. **Learning History** — review or resume stored learning sessions.

The current implementation is an early scaffold. The application README distinguishes
implemented behavior from planned behavior.

## Conceptual-to-system traceability

| Conceptual element | System responsibility | Intended project location | Learner-visible evidence |
|---|---|---|---|
| Identify terminology | Interpret an inquiry and establish its main concept | Session API and AI service | Concept name |
| Interpret context | Determine the relevant STEM domain and meaning | AI/scaffolding service | Domain-appropriate explanation |
| Select language support | Apply explanation preferences | Preferences API, profile DAO, and i18n | Burmese, English, or bilingual support |
| Explain the concept | Produce accessible and technical representations | AI/scaffolding service | Simple, example, and technical sections |
| Provide scaffolding | Organise reflection, hints, analogies, and explanation | Learning UI and service layer | Structured learning content |
| Collect learner response | Accept one of three understanding levels | Respond API | Three self-report choices |
| Adapt support | Select new support based on response and round | Respond API and service layer | Visibly changed support |
| Maintain the loop | Persist session and adaptation state | Session schema and DAO | Resume without losing progress |
| Review learning | Retrieve stored sessions | Sessions API and history page | Review or resume action |

## System scope

### In scope

- natural-language STEM inquiries;
- STEM concept and technical-context interpretation;
- Burmese explanations with useful English terminology preserved;
- beginner-friendly, structured concept explanations;
- simple explanations, real-world examples or analogies, and technical explanations;
- a reflective prompt and optional hint;
- three self-reported understanding levels;
- response-guided adaptive support;
- no more than two adaptation rounds per concept;
- follow-up questions related to the current concept;
- anonymous learner preferences;
- learning-history persistence and session continuation;
- English/Burmese interface localisation; and
- responsive, readable, and accessible presentation.

### Out of scope

- login, signup, or identity management;
- teacher or administrator dashboards;
- courses, assignments, grading, examinations, or LMS functionality;
- multiple-choice quizzes, scores, and right/wrong judgements;
- gamification, badges, streaks, or rankings;
- social features and payments;
- file or document management;
- complex analytics;
- voice interaction;
- multiple AI agents;
- unrestricted general-purpose chat; and
- fabricated citations or unsupported factual references.

## Features and functional requirements

### FR-01 — Submit a STEM inquiry

The learner can submit a natural-language STEM question from the home screen without a
mandatory configuration step.

### FR-02 — Validate scope

The system distinguishes a usable STEM inquiry from empty, unsupported, or clearly
non-STEM input. Out-of-scope requests receive a concise scope message.

### FR-03 — Identify terminology and context

The system identifies the primary STEM concept and relevant domain. Material ambiguity
triggers clarification instead of an unsupported assumption.

### FR-04 — Apply language preferences

The system applies the learner's language-support preference. The default research
mode uses Burmese explanation while retaining useful English STEM terms.

### FR-05 — Create a learning session

A successful inquiry creates a session with a stable identifier and takes the learner
to `/learn/[sessionId]`.

### FR-06 — Present structured scaffolding

The learning screen presents the concept, domain, simple explanation, real-world
example or analogy, technical explanation, reflective prompt, and optional hint.

### FR-07 — Collect understanding

The interface provides exactly three self-report choices:

- **I understand** → `high`
- **I partially understand** → `medium`
- **I need more explanation** → `needs_support`

These values represent perceived understanding, not a grade or verified assessment.

### FR-08 — Adapt support

| Response | Expected adaptation |
|---|---|
| `high` | A key takeaway, optional deeper insight, and an opportunity to finish |
| `medium` | Clarification, another example, analogy, or hint |
| `needs_support` | Simpler wording, more Burmese support, a different analogy, or prerequisite explanation |

Adapted content must differ meaningfully from the previous explanation.

### FR-09 — Bound adaptation

The prototype permits no more than two adaptation rounds for one concept. If the
learner still needs support at the limit, the session can become
`review_recommended` rather than continuing indefinitely.

### FR-10 — Handle a scoped follow-up

The learner can ask a free-text follow-up about the current concept. A materially
different concept starts a new session rather than silently changing the current one.

### FR-11 — Separate understanding from lifecycle status

| Dimension | Values |
|---|---|
| Understanding | `high`, `medium`, `needs_support` |
| Status | `completed`, `in_progress`, `review_recommended` |

Understanding records perceived comprehension; status describes what should happen to
the session.

### FR-12 — Save and retrieve history

The system stores the minimum session state needed to show genuine learning history
and to review or resume an existing session.

### FR-13 — Manage anonymous preferences

The learner can retrieve and update supported preferences without creating an account.
Only values needed by the prototype are retained.

### FR-14 — Switch interface language

The learner can switch interface text between English and Burmese using the locale
layer and matched locale dictionaries.

## Non-functional requirements

### Accessibility

- Support keyboard navigation and visible focus states.
- Give interactive controls visible labels or accessible names.
- Do not communicate understanding or status using colour alone.
- Maintain readable contrast in supported themes.
- Render Burmese Unicode with a suitable font stack and line spacing.
- Use semantic headings and predictable reading order.
- Set the document language to the active interface locale.

### Usability

- Keep the learner flow focused on one concept at a time.
- Use plain labels and keep internal AI stages out of the setup flow.
- Preserve session state across refresh and resume.
- Present adapted support as a clear update rather than a near-duplicate.

### Privacy and data minimisation

- Do not require authentication for the proof of concept.
- Avoid collecting personally identifiable information.
- Store only preferences and session state required by the research workflow.
- Keep API keys and other secrets out of browser-delivered code and version control.

### Reliability and safety

- Validate request bodies and identifiers at API boundaries.
- Handle missing sessions and invalid responses predictably.
- Do not fabricate citations, learner history, or unsupported certainty.
- Clarify materially ambiguous STEM context.
- Clearly disclose mock or static AI behavior.
- Keep follow-ups bounded to the current learning concept.

### Maintainability

- Separate UI rendering, route handling, data access, and AI/scaffolding logic.
- Centralise shared constants and reusable utilities.
- Keep English and Burmese locale keys aligned.
- Treat schema declarations as the source of truth for persisted fields.
- Test validation, state transitions, and the adaptation-round limit.

## Acceptance criteria

The completed proof of concept satisfies the research workflow when:

- a learner can submit a STEM inquiry;
- the system identifies a concept and relevant technical context;
- ambiguous context is clarified rather than silently guessed;
- the learning screen presents simple, example, and technical explanations;
- Burmese support preserves useful English STEM terms;
- a reflective prompt and optional hint are available;
- exactly three understanding choices are used;
- each choice produces the intended state and support behavior;
- adapted support is meaningfully different;
- no more than two adaptation rounds occur for a concept;
- follow-ups remain scoped to the current concept;
- real session state can be stored, retrieved, reviewed, and resumed;
- understanding and lifecycle status remain distinct;
- English/Burmese UI switching works through the locale layer;
- Burmese Unicode, keyboard focus, labels, contrast, and non-colour cues are usable;
- excluded LMS, quiz, gamification, social, payment, and unrestricted-chat features are
  not introduced; and
- mock AI or static response behavior is clearly disclosed.

## Limitations and future evaluation

This prototype demonstrates a design rather than a completed empirical conclusion.
Evaluation should investigate:

- linguistic clarity and technical accuracy of Burmese explanations;
- whether retained English terms help learners transfer knowledge to English material;
- whether the three-part explanation structure reduces confusion;
- whether self-reported understanding is a useful adaptation signal;
- whether two adaptation rounds are sufficient;
- whether learners distinguish understanding from session status; and
- whether generated explanations remain accurate across STEM domains.

Future features should be justified by the research question, conceptual artefacts,
evaluation needs, accessibility, usability, or essential technical requirements.

> **Research traceability over feature quantity**
>
> **Adaptive scaffolding over generic chat**
