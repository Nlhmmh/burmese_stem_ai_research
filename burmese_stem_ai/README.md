# Burmese STEM AI

`burmese_stem_ai` is a Next.js proof of concept for the Information Systems research project:

> **Scaffolding Low-Resource STEM Education with Large Language Models**

The project investigates how an LLM-enabled system can help Burmese-speaking learners understand specialised English STEM terminology and concepts. It combines context-aware bilingual explanation, structured educational scaffolding, learner self-reporting, and bounded adaptation in a focused learning experience.

The LLM is an enabling component, not the complete system. The research contribution lies in the way language support, explanation, scaffolding, learner feedback, adaptation, interface design, and persistence are combined into a traceable system artefact.

> **Documentation status:** This README describes the research design and the intended responsibilities represented by the supplied project structure. Where a filename alone does not establish an exact request body, response body, database field, package, or implementation detail, the relevant section is labelled as a proposed contract or a responsibility to verify against the source. This avoids claiming unsupported functionality.

---

## Table of Contents

1. [Research Context](#research-context)
2. [Research Problem and Objective](#research-problem-and-objective)
3. [Conceptual Artefacts](#conceptual-artefacts)
4. [System Artefacts](#system-artefacts)
5. [Traceability: Conceptual to System Artefacts](#traceability-conceptual-to-system-artefacts)
6. [System Scope](#system-scope)
7. [Features and Functional Requirements](#features-and-functional-requirements)
8. [Non-Functional Requirements](#non-functional-requirements)
9. [Screens](#screens)
10. [API Documentation](#api-documentation)
11. [Schema Documentation](#schema-documentation)
12. [Application Architecture](#application-architecture)
13. [Project Structure](#project-structure)
14. [Learning and Adaptation Flow](#learning-and-adaptation-flow)
15. [Setup and Development](#setup-and-development)
16. [Acceptance Criteria](#acceptance-criteria)
17. [Limitations and Future Evaluation](#limitations-and-future-evaluation)

---

## Research Context

English is widely used for specialised terminology in science, technology, engineering, and mathematics. For learners working primarily in Burmese, the challenge is not simply translating a word. A learner may need to understand the term's technical meaning, the discipline in which it is used, the relationship between the English term and a Burmese explanation, and the concept's role in a larger process.

Literal translation can be insufficient or misleading. Some English terms should be preserved because learners will encounter them in textbooks, source code, diagrams, lectures, or professional practice. The project therefore uses **context-sensitive language support**: Burmese is used to improve accessibility while useful English STEM terminology remains visible.

The prototype also treats explanation as an adaptive learning process rather than a one-off generated answer. A session can move from an initial explanation to an analogy, a technical explanation, a reflective prompt, a learner understanding response, and adapted support.

The intended learner journey is:

```text
Ask
  → Learn
  → Reflect
  → Report Understanding
  → Receive Adapted Support
  → Review or Resume
```

## Research Problem and Objective

### Problem

Burmese-speaking learners may face a low-resource language barrier when engaging with English-dominant STEM content. General-purpose translation or chat interfaces may not reliably:

- recognise the relevant STEM term;
- distinguish technical meanings across domains;
- preserve important English terminology;
- organise explanations as educational scaffolding;
- respond to the learner's reported understanding; or
- retain a simple record that supports review and continuation.

### Objective

The objective is to design and demonstrate an **LLM-based adaptive STEM scaffolding system** that:

1. identifies specialised STEM terminology;
2. interprets the relevant technical context;
3. selects suitable English/Burmese language support;
4. explains the concept at an appropriate level;
5. provides structured scaffolding;
6. collects a learner understanding response; and
7. adapts subsequent support within a bounded learning session.

The prototype is intended to demonstrate design feasibility and research traceability. It is not evidence by itself that the system improves learning outcomes; that claim requires evaluation with learners and appropriate research methods.

---

## Conceptual Artefacts

The research is represented through three related conceptual artefacts.

### Conceptual Artefact 1 — LLM-Based STEM Scaffolding Concepts

This artefact identifies five concepts that the system must operationalise:

1. **STEM Terminology Identification** — locate the specialised concept in the learner's inquiry.
2. **Context-Sensitive Language Support** — decide when to explain in Burmese, preserve an English term, or combine both.
3. **Conceptual Explanation** — communicate what the concept means rather than only translating its label.
4. **Structured Scaffolding** — organise support through simple explanations, examples, analogies, technical detail, reflection, and hints.
5. **Adaptive Support** — change the next support according to the learner's self-reported understanding.

### Conceptual Artefact 2 — Task-Aligned LLM Scaffolding Model

This artefact explains the core relationships:

```text
Low-resource language barrier ──hinders──▶ STEM understanding

LLM-based scaffolding ──reduces──▶ language barrier
LLM-based scaffolding ──supports─▶ STEM understanding

LLM-based scaffolding ──elicits──▶ learner response
Learner response ───────guides───▶ updated scaffolding
```

The important design claim is that the LLM is aligned to specific learning tasks. It is used for interpretation and scaffolding, while application logic controls workflow, session state, response categories, adaptation rounds, and persistence.

### Conceptual Artefact 3 — Context-Aware Adaptive STEM Scaffolding Framework

This artefact defines the end-to-end process:

```text
Identify STEM Terminology
        ↓
Interpret Technical Context
        ↓
Select Language Support
        ↓
Explain STEM Concept
        ↓
Provide Scaffolding
        ↓
Collect Learner Response
        ↓
Adapt Support
        └───────────────↺ updated scaffolding
```

The process is deliberately bounded. Adaptation supports learning about the current concept and must not become an unrestricted chatbot conversation.

---

## System Artefacts

### System Artefact 1 — Adaptive STEM Scaffolding System Framework

This system artefact turns the conceptual process into learner-visible and system-controlled stages. It specifies what happens from inquiry submission through interpretation, explanation, reflection, self-reporting, adaptation, completion, and later review.

### System Artefact 2 — Adaptive STEM Scaffolding Logical Architecture

This system artefact maps the research process to software responsibilities:

- the **UI layer** presents inquiry, learning, history, preferences, and locale controls;
- the **application/scaffolding layer** coordinates interpretation and adaptation;
- the **AI service layer** performs bounded LLM-assisted generation or analysis;
- the **data layer** persists learner preferences and learning sessions; and
- the **API layer** provides controlled operations over those capabilities.

The current repository expresses these responsibilities through `app`, `components`, `services`, `data`, `i18n`, and `lib`.

### System Artefact 3 — Burmese STEM AI Proof of Concept

The Next.js application is the executable research prototype. Its three primary screens demonstrate:

- asking a STEM question;
- receiving bilingual, structured scaffolding;
- reporting understanding and receiving adapted support; and
- reviewing or resuming a saved learning session.

---

## Traceability: Conceptual to System Artefacts

| Conceptual element | System responsibility | Project location | Learner-visible evidence |
|---|---|---|---|
| Identify STEM terminology | Interpret a submitted inquiry and establish its main concept | `app/api/sessions/route.ts`, `services/` | Concept name on the learning screen |
| Interpret technical context | Determine the relevant STEM domain and meaning | `services/`, session API | Domain and context-appropriate explanation |
| Select language support | Apply UI and explanation preferences | `app/api/preferences/route.ts`, `data/dao/profile.dao.ts`, `i18n/` | Burmese/English UI and bilingual explanation |
| Explain STEM concept | Produce accessible and technical representations | `services/`, session API | Simple, example, and technical sections |
| Provide scaffolding | Organise reflection, hint, analogy, and explanation | `components/learning/`, `services/` | Structured learning-session content |
| Collect learner response | Accept one of three self-reported understanding levels | `app/api/sessions/[sessionId]/respond/route.ts` | Three understanding choices |
| Adapt support | Generate or select support based on response and current round | `respond/route.ts`, `services/` | Visibly updated support |
| Maintain the adaptive loop | Persist current round and session state | `data/schemas/session.schema.ts` | Continued learning without losing state |
| Review learning | Retrieve stored sessions | `app/api/sessions/route.ts`, `app/history/page.tsx` | Learning history and resume/review action |

This table documents intended responsibility allocation. Exact service modules cannot be named because the supplied `services` directory contains no listed files.

---

## System Scope

### In scope

- natural-language STEM inquiries;
- STEM concept and technical-context interpretation;
- Burmese explanation with useful English terminology preserved;
- beginner-friendly, structured concept explanation;
- simple explanation, real-world example or analogy, and technical explanation;
- one reflective prompt and optional hint;
- three learner understanding responses;
- response-guided adaptive support;
- a maximum of two adaptation rounds per concept;
- follow-up questions related to the current concept;
- anonymous preferences;
- learning-history persistence and session continuation;
- English/Burmese interface localisation;
- responsive and accessible presentation.

### Explicitly out of scope

- login, signup, or identity management;
- teacher and administrator dashboards;
- courses, assignments, grading, examinations, or an LMS;
- multiple-choice quizzes, scores, or right/wrong judgements;
- gamification, badges, streaks, or rankings;
- social features;
- payments;
- file or document management;
- complex analytics;
- voice interaction;
- multiple AI agents;
- unrestricted general-purpose chat;
- fabricated academic citations or unsupported factual references.

---

## Features and Functional Requirements

### FR-01 — Submit a STEM inquiry

The learner can enter a natural-language STEM question from the home screen. No mandatory configuration step should prevent the first inquiry.

### FR-02 — Validate scope

The system should distinguish a usable STEM inquiry from empty, unsupported, or clearly non-STEM input. A clearly out-of-scope request should receive a concise scope message rather than generic assistant behavior.

### FR-03 — Identify terminology and context

The system should identify the primary STEM concept and relevant domain. If the term is materially ambiguous, the system should seek clarification instead of silently choosing a meaning.

### FR-04 — Apply language preferences

The system should use the learner's language-support preference when constructing an explanation. The default research mode is Burmese explanation with useful English STEM terms preserved.

### FR-05 — Create a learning session

A successful inquiry should create a session with a stable identifier and navigate the learner to `/learn/[sessionId]`.

### FR-06 — Present structured scaffolding

The learning screen should present the current concept, domain, simple explanation, real-world example or analogy, technical explanation, reflective prompt, and optional hint.

### FR-07 — Collect understanding

The interface should expose exactly three self-report choices:

- **I understand** → `high`
- **I partially understand** → `medium`
- **I need more explanation** → `needs_support`

These responses describe perceived understanding; they are not grades or verified assessments.

### FR-08 — Adapt support

The response should guide the next support:

| Response | Expected adaptation |
|---|---|
| High | Short takeaway, optional deeper insight, and ability to finish |
| Medium | Clarification, another example, analogy, or hint |
| Needs support | Simpler wording, greater Burmese support, reduced complexity, different analogy, or prerequisite explanation |

Adapted content should be meaningfully different from the previous explanation rather than a superficial paraphrase.

### FR-09 — Bound adaptation

The prototype should allow no more than two adaptation rounds for one concept. If support is still required at the limit, the session may be marked for recommended review instead of continuing indefinitely.

### FR-10 — Handle a scoped follow-up

The learner can ask a free-text follow-up about the current concept. A materially different concept should begin a new session rather than silently changing the scope of the current one.

### FR-11 — Maintain separate understanding and status

The system should store and display understanding independently from lifecycle status.

| Dimension | Values used by the research design |
|---|---|
| Understanding | `high`, `medium`, `needs_support` |
| Status | `completed`, `in_progress`, `review_recommended` |

For example, `needs_support` describes comprehension while `review_recommended` describes what should happen to the session.

### FR-12 — Save and retrieve history

The system should retain the minimum session state needed to display history and review or resume an existing session. It must not invent history entries.

### FR-13 — Manage anonymous preferences

The learner should be able to retrieve and update supported preferences without an account. Only preference values needed by the prototype should be retained.

### FR-14 — Switch interface language

The learner should be able to switch between English and Burmese UI text using the locale switcher and locale dictionaries.

---

## Non-Functional Requirements

### Accessibility

- Support keyboard navigation and visible focus states.
- Provide text labels or accessible names for interactive controls.
- Do not communicate understanding or status using colour alone.
- Maintain readable contrast in supported visual themes.
- Allow Burmese Unicode to render with a suitable font stack and line spacing.
- Use semantic headings and predictable reading order.

### Usability

- Keep the learner flow focused on one concept at a time.
- Use plain labels and avoid exposing internal AI stages as configuration steps.
- Preserve current session state across refresh or resume where persistence supports it.
- Present adapted support as a clear update, not as an indistinguishable duplicate.

### Privacy and data minimisation

- Do not require authentication for the proof of concept.
- Avoid collecting personally identifiable information.
- Store only preferences and learning-session state required by the research workflow.
- Do not place secrets or API keys in browser-delivered code or commit them to source control.

### Reliability and safety

- Validate request bodies and identifiers at API boundaries.
- Handle missing sessions and invalid responses predictably.
- Do not fabricate citations, learner history, or unsupported certainty.
- Clarify materially ambiguous STEM context.
- Make mock or static AI behavior visible in documentation if it is used.

### Maintainability

- Keep screen rendering, route handling, data access, and AI/scaffolding logic separated.
- Centralise shared constants and reusable utilities.
- Keep locale strings in the supplied locale files rather than duplicating UI text.

---

## Screens

The prototype contains exactly three primary screens. Preferences may appear as a modal, drawer, or embedded control rather than a fourth primary screen.

### Screen 1 — Ask / Home

**Route:** `/`  
**File:** `app/page.tsx`

Purpose:

- introduce the focused STEM-learning experience;
- accept a learner's natural-language question;
- provide a small set of example prompts;
- expose learning preferences and learning history;
- allow English/Burmese UI switching; and
- start a new learning session.

Expected flow:

```text
Question submitted
  → scope and input validation
  → terminology/context interpretation
  → language-support selection
  → session creation
  → navigate to /learn/[sessionId]
```

The terminology-identification and language-selection stages occur behind the scenes. They should not become a long setup wizard.

### Screen 2 — STEM Learning Session

**Route:** `/learn/[sessionId]`  
**File:** `app/learn/[sessionId]/page.tsx`

Purpose:

- display the current concept and STEM domain;
- present initial or adapted scaffolding;
- encourage reflection without grading;
- collect the learner's self-reported understanding;
- show how support changes in response; and
- accept a follow-up constrained to the current concept.

Expected content:

1. concept and domain;
2. simple explanation;
3. real-world example or analogy;
4. technical explanation;
5. one reflective prompt;
6. optional hint;
7. three understanding choices;
8. adapted-support area when applicable; and
9. current-concept follow-up input.

This is the central research screen because it makes the feedback loop observable. It must not present reflection as a scored quiz.

### Screen 3 — Learning History

**Route:** `/history`  
**File:** `app/history/page.tsx`

Purpose:

- list saved learning sessions;
- show concept, domain, understanding, status, and date;
- keep understanding and status visually distinct; and
- allow an appropriate review, resume, or continue action.

Suggested action semantics:

| Session state | Action label |
|---|---|
| Completed | Review |
| In progress | Resume |
| Review recommended | Continue Learning |

The history screen does not require charts, streaks, scores, or analytics.

---

## API Documentation

The supplied structure contains the following API files. The HTTP methods and payloads below are **recommended contracts inferred from the route responsibilities and research flow**. The actual exported handlers in each file remain the source of truth.

### API summary

| Path | File | Intended responsibility |
|---|---|---|
| `/api/sessions` | `app/api/sessions/route.ts` | Create a session and retrieve learning history |
| `/api/sessions/[sessionId]` | `app/api/sessions/[sessionId]/route.ts` | Retrieve or update one session |
| `/api/sessions/[sessionId]/respond` | `app/api/sessions/[sessionId]/respond/route.ts` | Record understanding and produce adapted support |
| `/api/sessions/[sessionId]/followup` | `app/api/sessions/[sessionId]/followup/route.ts` | Answer a follow-up within the current concept |
| `/api/preferences` | `app/api/preferences/route.ts` | Retrieve or update anonymous learner preferences |
| Not guaranteed as an App Router endpoint | `app/api/hello.ts` | Existing standalone file; verify its use in the current Next.js configuration |

### `POST /api/sessions`

Creates a learning session from a STEM inquiry.

Proposed request:

```json
{
  "question": "What is gradient descent?"
}
```

The handler may also resolve anonymous learner preferences server-side. If preferences are accepted in the body, their exact shape should match `profile.schema.ts` rather than a second definition.

Proposed successful response:

```json
{
  "sessionId": "<session identifier>",
  "session": {
    "concept": "Gradient Descent",
    "domain": "Machine Learning",
    "status": "in_progress"
  }
}
```

Expected error classes include invalid input, ambiguous context requiring clarification, out-of-scope input, and generation or persistence failure. Exact status codes and error envelopes should be verified in the handler.

### `GET /api/sessions`

Retrieves stored sessions for the anonymous learner and supports the history screen.

The response should contain only persisted sessions; the API must not manufacture demonstration history. Ordering and pagination are implementation choices unless defined in the route.

Proposed response shape:

```json
{
  "sessions": [
    {
      "sessionId": "<session identifier>",
      "concept": "Gradient Descent",
      "domain": "Machine Learning",
      "understanding": "high",
      "status": "completed",
      "updatedAt": "<timestamp>"
    }
  ]
}
```

### `GET /api/sessions/[sessionId]`

Retrieves one session for rendering, review, or resume.

Path parameter:

| Parameter | Meaning |
|---|---|
| `sessionId` | Identifier of the requested learning session |

The response should contain the session's current concept, domain, scaffolding content, understanding, lifecycle status, adaptation state, and timestamps to the extent those fields exist in `session.schema.ts`.

Expected errors include an invalid identifier or a session that does not exist.

### Update operation for `/api/sessions/[sessionId]`

The presence of `route.ts` permits multiple App Router handlers, but the exact update method is not established by the folder tree. If implemented, `PATCH` is the recommended method for lifecycle changes such as completing a session. Accepted fields must be allow-listed to prevent arbitrary document updates.

### `POST /api/sessions/[sessionId]/respond`

Records a learner understanding response and requests the next adaptation when needed.

Proposed request:

```json
{
  "understanding": "medium"
}
```

Allowed understanding values:

```text
high | medium | needs_support
```

Proposed response:

```json
{
  "sessionId": "<session identifier>",
  "understanding": "medium",
  "status": "in_progress",
  "adaptationRound": 1,
  "adaptedSupport": {
    "type": "additional_example",
    "content": "<adapted explanation>"
  }
}
```

The handler should enforce the maximum of two adaptation rounds, persist the latest state, and avoid repeating the same content with only superficial wording changes. The precise nested content structure must match `session.schema.ts`.

### `POST /api/sessions/[sessionId]/followup`

Processes a follow-up about the session's current STEM concept.

Proposed request:

```json
{
  "question": "Why is the learning rate important?"
}
```

Proposed response:

```json
{
  "sessionId": "<session identifier>",
  "answer": "<context-aware answer>",
  "relatedToCurrentConcept": true
}
```

The route should reject empty input and prevent an unrelated question from silently changing the current session's concept. Whether follow-ups are persisted is determined by the actual session schema.

### `GET /api/preferences`

Retrieves the supported preferences associated with the anonymous learner profile.

### `PATCH /api/preferences`

Updates supported preference fields. The route should validate values and reject unknown fields.

A conceptual response may include UI language, language-support mode, explanation level, learning style, theme, or text size, but only fields actually declared by `profile.schema.ts` are supported.

### `app/api/hello.ts`

This file is preserved because it exists in the supplied structure. In a conventional Next.js App Router project, an endpoint is normally defined by a `route.ts` file inside a route segment. Therefore, `app/api/hello.ts` should not be documented as a guaranteed public endpoint without checking `next.config.ts` or its imports. It may be a development helper, legacy file, or unused module.

### Common API principles

- Use JSON request and response bodies unless a route explicitly defines otherwise.
- Validate all body values and dynamic identifiers.
- Return stable, non-sensitive error messages to the client.
- Keep provider credentials server-side.
- Avoid returning internal prompts, secrets, stack traces, or raw provider errors.
- Treat session and profile schemas as the source of truth for persisted fields.

---

## Schema Documentation

The data layer contains two schema files and one profile DAO. The exact field declarations are not supplied in the folder listing, so this section distinguishes research-required information from illustrative structure.

### Schema ownership

| File | Responsibility |
|---|---|
| `data/schema.ts` | Shared schema exports, connection-level schema setup, or schema composition; verify in source |
| `data/schemas/profile.schema.ts` | Anonymous learner profile and preferences |
| `data/schemas/session.schema.ts` | Learning-session content, progress, and adaptation state |
| `data/dao/profile.dao.ts` | Profile persistence operations and data-access boundary |
| `data/init-db.ts` | Database initialisation |
| `data/tx/index.js` | Transaction helper or transaction boundary; verify in source |

The database technology cannot be proven from filenames alone. This README therefore does not claim a specific database library. Inspect `package.json`, schema imports, and initialisation code for the authoritative implementation.

### Learner profile schema

Research responsibility:

- identify an anonymous learner state without requiring an account;
- retain only supported preferences;
- supply those preferences to UI localisation and scaffolding decisions; and
- avoid unnecessary personal information.

Illustrative logical shape only:

```ts
type LearnerProfile = {
  anonymousId: string;
  preferences: {
    uiLanguage?: "en" | "my";
    supportLanguage?: string;
    explanationLevel?: string;
    learningStyle?: string;
    theme?: string;
    textSize?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
```

This is not a declaration that every optional field exists. `data/schemas/profile.schema.ts` defines the real field names, defaults, validation, and persistence types.

Recommended invariants:

- `anonymousId` is unique if it is used as the profile key;
- enumerated preference values are validated;
- updates are field-limited;
- no email, name, password, grade, or other identity data is required by the research scope.

### Learning session schema

Research responsibility:

- associate a session with anonymous learner state where applicable;
- store the original inquiry, identified concept, and domain;
- retain the scaffolding needed to render or resume the session;
- keep understanding separate from lifecycle status;
- track bounded adaptation state; and
- preserve timestamps for history.

Illustrative logical shape only:

```ts
type LearningSession = {
  id: string;
  learnerId?: string;
  question: string;
  concept: string;
  domain: string;
  scaffolding: {
    simpleExplanation?: string;
    realWorldExample?: string;
    technicalExplanation?: string;
    reflectivePrompt?: string;
    hint?: string;
  };
  understanding?: "high" | "medium" | "needs_support";
  status: "completed" | "in_progress" | "review_recommended";
  adaptationRound: number;
  adaptedSupport?: unknown;
  createdAt?: Date;
  updatedAt?: Date;
};
```

This type documents the research concepts, not the exact stored object. In particular, the structure of generated content, follow-ups, and adapted support must be taken from `data/schemas/session.schema.ts`.

Recommended invariants:

- `adaptationRound` is never negative and never exceeds `2`;
- understanding accepts only the three supported values;
- status accepts only the three supported values;
- concept and domain are not silently replaced by a follow-up;
- a history item is derived from a real stored session;
- timestamps use one consistent representation.

### Understanding and status transition guidance

The research design supports the following conceptual transitions:

```text
New session
  └─▶ status: in_progress

Response: high
  └─▶ understanding: high
      └─▶ completion action may set status: completed

Response: medium
  └─▶ understanding: medium
      └─▶ status: in_progress + adapted support

Response: needs_support
  └─▶ understanding: needs_support
      ├─▶ rounds available: status in_progress + adapted support
      └─▶ limit reached: status may become review_recommended
```

The exact moment a session becomes `completed` should be consistent between the UI, route handler, and schema logic.

---

## Application Architecture

```text
┌─────────────────────────────────────────────────────────┐
│ UI                                                      │
│ Home · Learning Session · History · Locale/Preferences  │
│ app/ + components/                                      │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / server calls
┌──────────────────────────▼──────────────────────────────┐
│ API and application coordination                        │
│ sessions · respond · followup · preferences             │
│ app/api/ + services/                                    │
└──────────────────────┬──────────────────┬───────────────┘
                       │                  │
            ┌──────────▼─────────┐  ┌────▼────────────────┐
            │ AI/scaffolding      │  │ Data access         │
            │ services/           │  │ data/               │
            └─────────────────────┘  └─────────────────────┘
```

### UI layer

`app` supplies routes, layouts, global styling, and server/client composition. `components` groups reusable UI by screen or shared layout responsibility.

### API/application layer

The route handlers translate HTTP input into controlled use cases. They should validate input, call the appropriate service and data operations, and return stable response shapes.

### Services layer

The supplied `services` directory is the intended boundary for interpretation, scaffolding, adaptation, or provider integration. Because no service filenames were supplied, this README does not invent them. Provider-specific calls and prompts should remain behind this boundary rather than inside UI components.

### Data layer

`data` owns schema definitions, database initialisation, profile access, and transaction support. API handlers should use this layer instead of spreading persistence details through pages and components.

### Internationalisation layer

`i18n/request.ts` and the English/Burmese locale files support interface localisation. UI translation and bilingual STEM explanation are related but different:

- **UI localisation** changes labels, navigation, buttons, and help text.
- **Language support** changes how a STEM concept is explained while preserving useful English terminology.

---

## Project Structure

The following is the exact structure supplied for `burmese_stem_ai`; no unsupported files have been added to the tree.

```text
burmese_stem_ai/
├── README.md
├── app
│   ├── LocalSwitcher.tsx
│   ├── api
│   │   ├── hello.ts
│   │   ├── preferences
│   │   │   └── route.ts
│   │   └── sessions
│   │       ├── [sessionId]
│   │       │   ├── followup
│   │       │   │   └── route.ts
│   │       │   ├── respond
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── history
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── learn
│   │   └── [sessionId]
│   │       └── page.tsx
│   └── page.tsx
├── components
│   ├── history
│   ├── home
│   ├── layout
│   └── learning
├── data
│   ├── dao
│   │   └── profile.dao.ts
│   ├── init-db.ts
│   ├── schema.ts
│   ├── schemas
│   │   ├── profile.schema.ts
│   │   └── session.schema.ts
│   └── tx
│       └── index.js
├── eslint.config.mjs
├── i18n
│   ├── locales
│   │   ├── en.json
│   │   └── my.json
│   └── request.ts
├── lib
│   ├── constants.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
├── services
└── tsconfig.json
```

### Root files and directories

| Path | Responsibility |
|---|---|
| `README.md` | Research, architecture, API, schema, screen, and development documentation |
| `app/` | Next.js App Router pages, layouts, styling, and route handlers |
| `components/` | Reusable UI grouped by application area |
| `data/` | Persistence schemas, initialisation, DAO, and transaction support |
| `i18n/` | Locale resolution and English/Burmese interface messages |
| `lib/` | Shared constants and general utilities |
| `public/` | Static assets; no specific assets are claimed because none are listed |
| `services/` | Application, scaffolding, adaptation, or external-service boundary; exact modules are not listed |
| `eslint.config.mjs` | ESLint configuration |
| `next-env.d.ts` | Next.js-generated TypeScript declarations |
| `next.config.ts` | Next.js configuration |
| `package.json` | Package metadata, dependencies, and scripts |
| `package-lock.json` | Locked npm dependency graph |
| `postcss.config.mjs` | PostCSS configuration |
| `tsconfig.json` | TypeScript compiler configuration |

### `app/`

| Path | Responsibility |
|---|---|
| `app/layout.tsx` | Root document layout and shared application shell |
| `app/page.tsx` | Ask/Home screen at `/` |
| `app/history/page.tsx` | Learning History screen at `/history` |
| `app/learn/[sessionId]/page.tsx` | Dynamic learning-session screen |
| `app/LocalSwitcher.tsx` | Existing locale-switching component; filename spelling is preserved exactly |
| `app/globals.css` | Global styling, typography, colours, and shared accessibility states |
| `app/favicon.ico` | Browser icon |
| `app/api/` | Server-side API modules and route handlers |

### `components/`

| Directory | Responsibility |
|---|---|
| `components/home/` | Reusable inquiry, examples, or preference UI used by the home screen |
| `components/learning/` | Explanation, reflection, response, adaptation, and follow-up UI |
| `components/history/` | History list, row, card, status, or action UI |
| `components/layout/` | Shared navigation, header, and layout presentation |

No component filenames are listed, so none are asserted here.

### `data/`

| Path | Responsibility |
|---|---|
| `data/init-db.ts` | Initialises the configured persistence layer |
| `data/schema.ts` | Shared schema coordination or exports; verify exact role in source |
| `data/schemas/profile.schema.ts` | Learner profile/preferences schema |
| `data/schemas/session.schema.ts` | Learning-session schema |
| `data/dao/profile.dao.ts` | Profile data-access operations |
| `data/tx/index.js` | Transaction-related helper; verify exact API in source |

Only a profile DAO is listed. This README does not claim a separate session DAO exists.

### `i18n/`

| Path | Responsibility |
|---|---|
| `i18n/request.ts` | Resolves locale/message configuration for a request |
| `i18n/locales/en.json` | English interface messages |
| `i18n/locales/my.json` | Burmese interface messages |

Locale files should maintain matching message keys so either UI language can render the same controls.

### `lib/`

| Path | Responsibility |
|---|---|
| `lib/constants.ts` | Shared fixed values such as supported enum values or limits |
| `lib/utils.ts` | Reusable, domain-neutral helper functions |

The two-round adaptation limit and supported understanding/status values are good candidates for central constants if the implementation follows that pattern.

---

## Learning and Adaptation Flow

```text
Home: submit question
        │
        ▼
Create session: identify concept + context + language support
        │
        ▼
Learning screen: initial structured scaffolding
        │
        ▼
Learner reports understanding
        │
        ├── high ─────────────▶ takeaway / finish
        │
        ├── medium ───────────▶ clarification or new example
        │
        └── needs_support ────▶ simplify / more Burmese / new analogy
                                  │
                                  ▼
                         increment adaptation round
                                  │
                         round < 2? ── yes ─▶ ask again
                                  │
                                  no
                                  ▼
                         recommend review as appropriate
```

Follow-up questions branch from the learning screen but remain tied to the current concept. History reads saved state and returns the learner to the same session identifier.

---

## Setup and Development

### Prerequisites

- a Node.js version compatible with the `next` version declared in `package.json`;
- npm, because `package-lock.json` is present; and
- any data-store or external AI credentials actually referenced by the source code.

Do not infer environment-variable names from this README. Inspect server-side imports and deployment configuration for the required variables, and keep secret values out of source control.

### Install dependencies

```bash
npm install
```

### Run the development server

Use the development script declared in `package.json`. In a standard Next.js project this is commonly:

```bash
npm run dev
```

Then open the local URL printed by Next.js.

### Quality checks

Run only scripts that are present in `package.json`. Common script names are:

```bash
npm run lint
npm run build
```

These names are conventional, not guaranteed by the supplied folder tree.

### Configuration checklist

Before running the complete flow, verify:

1. the database or storage mechanism used by `data/init-db.ts` is available;
2. server-side AI/provider credentials required by `services/` are configured;
3. `next.config.ts` includes the expected internationalisation integration;
4. English and Burmese locale JSON files contain matching keys;
5. the route handlers use the same field values as the schemas; and
6. no secret is imported into client components.

---

## Acceptance Criteria

The proof of concept satisfies the documented research workflow when:

- a learner can submit a STEM inquiry;
- the system identifies a concept and relevant technical context;
- ambiguous context is clarified rather than silently guessed;
- the learning screen presents simple, example, and technical explanations;
- Burmese support can preserve useful English STEM terms;
- one reflective prompt and an optional hint are available;
- exactly three understanding choices are used;
- each choice produces the intended state and support behavior;
- adapted support is visibly and meaningfully different;
- no more than two adaptation rounds occur for one concept;
- a follow-up remains scoped to the current concept;
- real session state can be stored, retrieved, reviewed, and resumed;
- understanding and lifecycle status remain distinct;
- English/Burmese UI switching works through the supplied locale layer;
- Burmese Unicode is readable across supported screen sizes;
- keyboard focus, labels, contrast, and non-colour status cues are usable;
- no excluded LMS, quiz, gamification, social, payment, or unrestricted-chat feature is introduced; and
- any mock AI or static response behavior is clearly disclosed.

---

## Limitations and Future Evaluation

This prototype demonstrates a design, not a completed empirical conclusion. Important evaluation questions include:

- whether Burmese explanations are linguistically clear and technically accurate;
- whether preserved English terms help learners transfer knowledge to English STEM material;
- whether the three-part explanation structure reduces confusion;
- whether self-reported understanding is a useful adaptation signal;
- whether two adaptation rounds are sufficient for the proof-of-concept task;
- whether learners can distinguish understanding from session status; and
- whether generated explanations remain accurate across different STEM domains.

Potential future work should be justified by the research question. Features should be added only when they directly support a conceptual artefact, evaluation need, accessibility requirement, usability requirement, or necessary technical function.

---

## Design Priorities

> **Research traceability over feature quantity**  
> **Adaptive scaffolding over generic chat**  
> **Working functionality over decoration**  
> **Clarity over complexity**

