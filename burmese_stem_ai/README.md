# Burmese STEM AI — Technical README

Technical documentation and implementation plan for the **Burmese STEM AI** proof-of-concept application.

This README focuses only on the software implementation: architecture, stack, project structure, database design, APIs, screens, LLM integration, development workflow, deployment, testing, and feature status.

> **Important:** The repository is still under development. This document describes both the **current implementation** and the **complete target plan**. Items marked **Planned** are design targets and should not be interpreted as already implemented.

---

## 1. Application Summary

Burmese STEM AI is a three-screen educational web application for Burmese-speaking learners who want help understanding English STEM terminology and concepts.

The target application flow is:

```text
Home / Ask
   |
   v
Create Learning Session
   |
   v
Identify STEM Concept + Technical Context
   |
   v
Generate Bilingual Structured Explanation
   |
   v
Learning Session
   |
   +--> Simple Explanation
   +--> Real-World Example / Analogy
   +--> Technical Explanation
   +--> Reflective Prompt
   +--> Optional Hint
   |
   v
Learner Understanding Response
   |
   +--> high
   +--> medium
   +--> needs_support
   |
   v
Adapt Support (maximum 2 rounds)
   |
   v
Finish / Review / Resume
   |
   v
Learning History
```

The prototype intentionally does **not** include authentication, quizzes, scoring, LMS/course management, teacher/admin dashboards, social features, or unrestricted general-purpose chat.

---

## 2. Current Implementation Status

The current repository already contains the main application skeleton and data foundations.

| Area | Status | Current State |
|---|---|---|
| Next.js application shell | Implemented | App Router, TypeScript, Tailwind CSS, ESLint |
| English/Burmese UI locale | Implemented | `next-intl`, cookie-based `en` / `my` switching |
| Anonymous learner identity | Implemented | HTTP-only UUID cookie mapped to server-side learner ID |
| Learner preferences | Implemented | MongoDB persistence, `GET` and `PATCH` API |
| MongoDB profile schema | Implemented | Anonymous profile + preferences |
| MongoDB learning-session schema | Implemented / needs correction | Schema exists but session routes are not wired |
| Home screen | Placeholder / partial | Page exists; final UI is not complete |
| Learning Session screen | Placeholder | Dynamic page exists |
| Learning History screen | Placeholder | Page exists |
| Session API routes | Placeholder | Routes exist and currently return `501` |
| LLM integration | Not implemented | `OPENAI_API_KEY` is reserved but not used |
| Adaptation logic | Not implemented | Planned maximum of two rounds |
| Follow-up logic | Not implemented | Route exists, service behavior not implemented |
| Automated tests | Not implemented | Current checks are lint + production build |

---

## 3. Technology Stack

### Application

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Next.js App Router**
- **Node.js runtime**
- **Tailwind CSS 4**
- **next-intl** for interface localisation
- **ESLint**

### Data

- **MongoDB 7**
- **Mongoose 9**

### Infrastructure

- **Docker**
- **Docker Compose**
- **Nginx configuration** is present in the repository for reverse-proxy/deployment use
- **Makefile** for convenience commands

### Package Management

- **npm**

### Runtime Requirements

- Docker image: **Node.js 22**
- Local development: **Node.js 20.9+**
- npm compatible with the selected Node version

---

## 4. Target Technical Architecture

The proof of concept should remain a small monolithic Next.js application.

```text
+-----------------------------+
|          Browser            |
|                             |
| Home                        |
| Learning Session            |
| Learning History            |
| Preferences / Locale        |
+--------------+--------------+
               |
               | HTTPS / HTTP
               v
+--------------------------------------------------+
|              Next.js Application                |
|                                                  |
|  UI / Server Components / Client Components     |
|                    |                             |
|                    v                             |
|              Route Handlers                     |
|                    |                             |
|       +------------+------------+                |
|       |                         |                |
|       v                         v                |
| Application Services       Data Access Layer     |
| - Learner Service          - Profile DAO         |
| - STEM Interpreter         - Session DAO         |
| - Scaffolding Service            |               |
| - Adaptation Service             v               |
| - LLM Service                MongoDB             |
|       |                                          |
+-------+------------------------------------------+
        |
        | server-side API request
        v
+-----------------------------+
|       External LLM API      |
|  e.g. OpenAI provider       |
+-----------------------------+
```

### Architecture Principles

1. **Route handlers should stay thin.**
   - Validate request.
   - Resolve anonymous learner.
   - Call application service.
   - Return controlled JSON response.

2. **Research/application logic belongs in services.**
   - Do not place LLM prompts, adaptation rules, or MongoDB logic directly in UI files.

3. **Database access belongs in DAO/repository functions.**

4. **LLM integration must remain server-side.**
   - API keys must never be exposed to browser code.

5. **The LLM should generate content, not control the entire workflow.**
   - Session states, allowed understanding values, maximum adaptation rounds, and lifecycle transitions are application rules.

---

## 5. Project Structure

### Current Repository Structure

```text
.
├── Dockerfile
├── EC2KeyPair.pem
├── Makefile
├── README.md
├── app
│   ├── api
│   │   ├── preferences
│   │   │   └── route.ts
│   │   ├── route.ts
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
│   ├── LocalSwitcher.tsx
│   ├── history
│   ├── home
│   ├── layout
│   └── learning
├── data
│   ├── dao
│   │   ├── profile.dao.ts
│   │   └── session.dao.ts
│   ├── init-db.ts
│   ├── mongodb.ts
│   ├── schema.ts
│   ├── schemas
│   │   ├── profile.schema.ts
│   │   └── session.schema.ts
│   └── tx
│       └── index.js
├── docker-compose.yml
├── env.local
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
├── nginx
│   └── default.conf
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── public
├── services
│   └── learner.service.ts
└── tsconfig.json
```

### Folder Responsibilities

| Path | Responsibility |
|---|---|
| `app/` | Next.js routes, layouts, screens, and API handlers |
| `app/api/` | Server-side HTTP API |
| `app/page.tsx` | Screen 1: Home / Ask |
| `app/learn/[sessionId]/page.tsx` | Screen 2: Learning Session |
| `app/history/page.tsx` | Screen 3: Learning History |
| `components/` | Reusable UI components grouped by screen/domain |
| `data/` | MongoDB connection, schemas, DAOs, database initialisation |
| `i18n/` | English/Burmese interface translations |
| `lib/` | Shared constants and generic utilities |
| `services/` | Application/domain services |
| `proxy.ts` | Anonymous learner and request middleware |
| `nginx/` | Reverse-proxy configuration |
| `Dockerfile` | Application container image |
| `docker-compose.yml` | Local/container orchestration |

### Planned Service Additions

The target service layer should evolve toward:

```text
services/
├── learner.service.ts
├── llm.service.ts
├── stem-interpreter.service.ts
├── scaffolding.service.ts
└── adaptation.service.ts
```

Suggested responsibilities:

```text
learner.service.ts
  -> resolve anonymous learner/profile

stem-interpreter.service.ts
  -> validate STEM scope
  -> identify concept
  -> interpret technical context
  -> detect ambiguity

scaffolding.service.ts
  -> apply language preferences
  -> build initial structured learning response
  -> build follow-up context

adaptation.service.ts
  -> map learner response to support strategy
  -> enforce maximum adaptation rounds
  -> update understanding/status

llm.service.ts
  -> provider-specific LLM calls
  -> structured response validation
```

---

## 6. Environment Configuration

### Current Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DB_URL` | Yes | MongoDB connection URI |
| `OPENAI_API_KEY` | Required once LLM is enabled | Server-side LLM provider credential |
| `PORT` | No | Application port, default `3000` |
| `HOSTNAME` | No | Bind address, typically `0.0.0.0` in Docker |

### Local Setup

The current repository uses `env.local` as an example configuration file.

```bash
cp env.local .env.local
```

Replace only local values in `.env.local`.

### Recommended Future Convention

Rename the committed example file to:

```text
.env.example
```

and keep all real environment files ignored:

```text
.env
.env.local
.env.production
```

Never commit real API keys or database credentials.

---

## 7. Running the Project

### Option A — Next.js Locally + MongoDB in Docker

```bash
npm install
cp env.local .env.local
docker compose up -d mongodb
npm run dev
```

Open:

```text
http://localhost:3000
```

Convenience command, if configured in the Makefile:

```bash
make run
```

### Option B — Full Docker Stack

```bash
docker compose up --build -d
```

The current stack is intended to start:

1. MongoDB;
2. database connection initialisation;
3. the production Next.js application.

Open:

```text
http://localhost:3000
```

Stop:

```bash
docker compose down
```

Delete containers and MongoDB data intentionally:

```bash
docker compose down -v
```

Do not use `-v` unless the stored development data should be deleted.

---

## 8. npm Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build production application |
| `npm run start` | Start production build |
| `npm run lint` | Run ESLint |
| `npm run init-db` | Verify MongoDB connection / register models |

Recommended checks before committing:

```bash
npm run lint
npm run build
```

---

# 9. Anonymous Learner Identity

The proof of concept intentionally has no login system.

The application uses an anonymous learner identifier.

### Current Flow

```text
Browser Request
      |
      v
proxy.ts
      |
      +-- learner cookie exists?
      |        |
      |        +-- yes -> reuse UUID
      |        |
      |        +-- no  -> generate UUID
      |
      v
HTTP-only learner cookie
      |
      v
x-learner-id request header
      |
      v
API Route
      |
      v
Learner Service / DAO
```

Current behavior:

- learner ID is stored in an **HTTP-only cookie**;
- `SameSite=Lax`;
- secure in production;
- client-supplied `x-learner-id` is discarded and replaced server-side.

This is anonymous persistence, **not authentication or authorisation**.

---

# 10. Database Design

The target MongoDB design needs only two primary collections:

```text
MongoDB
├── profiles
└── learning_sessions
```

Do not create separate collections for:

- explanations;
- adaptations;
- follow-ups;
- learning history.

These are naturally owned by one learning session and should remain embedded.

---

## 10.1 Profile Schema

### Purpose

Stores anonymous learner preferences.

### Conceptual Shape

```ts
Profile {
  _id: ObjectId

  learnerId: string

  preferences: {
    uiLanguage:
      "en" | "my"

    supportLanguage:
      "bilingual" | "burmese" | "english"

    explanationLevel:
      "beginner" | "intermediate" | "advanced"

    learningStyle:
      "guided" | "concise" | "more_examples"

    theme:
      "light" | "dark"
  }

  createdAt: Date
  updatedAt: Date
}
```

### Default Preferences

```json
{
  "uiLanguage": "en",
  "supportLanguage": "bilingual",
  "explanationLevel": "beginner",
  "learningStyle": "guided",
  "theme": "light"
}
```

### Recommended Index

```text
learnerId -> UNIQUE
```

Each anonymous learner should have one profile.

### Data Not Required

Do not store:

- name;
- email;
- password;
- phone;
- OAuth data;
- personal profile information.

---

## 10.2 LearningSession Schema

### Purpose

Represents one learner's learning interaction with one main STEM concept.

A learner may have **many** learning sessions.

### Target Shape

```ts
LearningSession {
  _id: ObjectId

  sessionId: string

  learnerId: string

  originalQuestion: string

  concept: {
    name: string
    domain: string
  }

  explanations: {
    simple: BilingualText
    realWorldExample: BilingualText
    technical: BilingualText
  }

  reflectivePrompt: BilingualText

  hint?: BilingualText

  understanding:
    "high" |
    "medium" |
    "needs_support" |
    null

  status:
    "in_progress" |
    "completed" |
    "review_recommended"

  adaptationRound:
    0 | 1 | 2

  adaptations: Adaptation[]

  followUps: FollowUp[]

  preferencesSnapshot: {
    supportLanguage:
      "bilingual" | "burmese" | "english"

    explanationLevel:
      "beginner" | "intermediate" | "advanced"

    learningStyle:
      "guided" | "concise" | "more_examples"
  }

  createdAt: Date
  updatedAt: Date
}
```

### BilingualText

```ts
BilingualText {
  en: string
  my: string
}
```

Burmese is stored as normal Unicode text.

### Adaptation

```ts
Adaptation {
  learnerResponse:
    "high" |
    "medium" |
    "needs_support"

  supportType:
    "key_takeaway" |
    "another_example" |
    "clarification" |
    "simpler_explanation" |
    "analogy" |
    "hint"

  content: BilingualText

  round: 1 | 2

  createdAt: Date
}
```

`learnerResponse` uses the same values as `understanding`.

UI mapping:

```text
"I understand"
    -> high

"I partially understand"
    -> medium

"I need more explanation"
    -> needs_support
```

### FollowUp

```ts
FollowUp {
  question: string

  answer: BilingualText

  createdAt: Date
}
```

### Status Semantics

Understanding and status are different concepts.

```text
Understanding
-------------
high
medium
needs_support
```

describes the learner's latest **self-reported understanding**.

```text
Status
------
in_progress
completed
review_recommended
```

describes the **learning-session lifecycle**.

Recommended behavior:

| Learner State | Understanding | Status |
|---|---|---|
| First session created | `null` | `in_progress` |
| Learner understands | `high` | `in_progress` until Finish |
| Learner finishes after understanding | `high` | `completed` |
| Learner partially understands | `medium` | `in_progress` |
| Learner needs more explanation | `needs_support` | `in_progress` |
| Still needs support after round 2 | `needs_support` or latest value | `review_recommended` |

### Recommended Indexes

Profile:

```text
learnerId unique
```

Learning session:

```text
sessionId unique
learnerId + updatedAt descending
```

### Important Existing Schema Corrections

Before implementing the session APIs:

1. **Remove `unique` from `LearningSession.learnerId`.**
   - One learner must be able to create multiple learning sessions.

2. **Choose one public session identifier contract.**
   - The current code mixes MongoDB `_id` lookup with a declared `sessionId`.
   - Recommended: expose `sessionId` in routes and make it unique.
   - Alternatively, remove `sessionId` and consistently use `_id`.
   - Do not keep both unless their roles are explicit.

---

# 11. API Design

All APIs are under:

```text
/api
```

### Target API Summary

| Method | Route | Status | Purpose |
|---|---|---|---|
| `GET` | `/api` | Implemented | Health/test response |
| `GET` | `/api/preferences` | Implemented | Retrieve learner preferences |
| `PATCH` | `/api/preferences` | Implemented | Update learner preferences |
| `GET` | `/api/sessions` | Planned | List learner sessions |
| `POST` | `/api/sessions` | Planned | Create learning session |
| `GET` | `/api/sessions/:sessionId` | Planned | Get/review/resume one session |
| `PATCH` | `/api/sessions/:sessionId` | Planned | Update controlled session lifecycle |
| `POST` | `/api/sessions/:sessionId/respond` | Planned | Record understanding + adapt |
| `POST` | `/api/sessions/:sessionId/followup` | Planned | Ask a scoped follow-up |

---

## 11.1 Health Endpoint

```http
GET /api
```

Current response:

```json
{
  "message": "Hello from Burmese STEM AI API!"
}
```

---

## 11.2 Get Preferences

```http
GET /api/preferences
```

If no profile exists, create one using defaults.

### Success — `200`

```json
{
  "preferences": {
    "uiLanguage": "en",
    "supportLanguage": "bilingual",
    "explanationLevel": "beginner",
    "learningStyle": "guided",
    "theme": "light"
  }
}
```

---

## 11.3 Update Preferences

```http
PATCH /api/preferences
Content-Type: application/json
```

### Request

Any supported subset:

```json
{
  "supportLanguage": "burmese",
  "explanationLevel": "intermediate"
}
```

### Allowed Values

| Field | Values |
|---|---|
| `uiLanguage` | `en`, `my` |
| `supportLanguage` | `bilingual`, `burmese`, `english` |
| `explanationLevel` | `beginner`, `intermediate`, `advanced` |
| `learningStyle` | `guided`, `concise`, `more_examples` |
| `theme` | `light`, `dark` |

### Validation

Return `400` for:

- invalid field;
- invalid enum value;
- empty body;
- non-object body.

---

## 11.4 Create Learning Session

```http
POST /api/sessions
Content-Type: application/json
```

### Target Request

```json
{
  "question": "What is gradient descent?"
}
```

The learner ID should come from the server-side anonymous learner context, not the request body.

### Target Server Flow

```text
Validate request
      |
      v
Load learner preferences
      |
      v
Interpret STEM inquiry
      |
      +--> non-STEM -> controlled scope response
      |
      +--> ambiguous -> clarification response
      |
      v
Identify concept + domain
      |
      v
Generate initial scaffolding
      |
      v
Validate structured LLM output
      |
      v
Create LearningSession
      |
      v
Return session
```

### Target Success — `201`

```json
{
  "session": {
    "sessionId": "uuid-or-selected-id",
    "originalQuestion": "What is gradient descent?",
    "concept": {
      "name": "Gradient Descent",
      "domain": "Machine Learning"
    },
    "explanations": {
      "simple": {
        "en": "...",
        "my": "..."
      },
      "realWorldExample": {
        "en": "...",
        "my": "..."
      },
      "technical": {
        "en": "...",
        "my": "..."
      }
    },
    "reflectivePrompt": {
      "en": "...",
      "my": "..."
    },
    "hint": {
      "en": "...",
      "my": "..."
    },
    "understanding": null,
    "status": "in_progress",
    "adaptationRound": 0
  }
}
```

### Target Error Cases

| Code | Meaning |
|---|---|
| `400` | Invalid or empty question |
| `422` | Query is ambiguous and needs clarification |
| `422` or controlled `400` | Clearly outside prototype STEM scope |
| `500` | Internal persistence/service error |
| `502` | Upstream LLM failure |

Use one consistent error format:

```json
{
  "error": {
    "code": "AMBIGUOUS_STEM_CONTEXT",
    "message": "Please provide more context about the STEM subject."
  }
}
```

---

## 11.5 List Learning Sessions

```http
GET /api/sessions
```

Return only sessions owned by the current anonymous learner.

### Target Response — `200`

```json
{
  "sessions": [
    {
      "sessionId": "...",
      "concept": {
        "name": "Gradient Descent",
        "domain": "Machine Learning"
      },
      "understanding": "high",
      "status": "completed",
      "updatedAt": "2026-09-02T00:00:00.000Z"
    }
  ]
}
```

Recommended sort:

```text
updatedAt descending
```

This endpoint powers the Learning History screen.

---

## 11.6 Get / Resume One Session

```http
GET /api/sessions/:sessionId
```

### Behavior

- find by `sessionId` and current `learnerId`;
- never return another learner's anonymous session;
- return full session state required for Review / Resume / Continue Learning.

### Errors

```text
400 invalid ID
404 session not found
500 server error
```

---

## 11.7 Update Session Lifecycle

```http
PATCH /api/sessions/:sessionId
Content-Type: application/json
```

Keep updates controlled.

Recommended initial use:

```json
{
  "status": "completed"
}
```

Do not allow arbitrary database field patching.

The route should enforce valid lifecycle transitions.

---

## 11.8 Submit Learner Understanding

```http
POST /api/sessions/:sessionId/respond
Content-Type: application/json
```

### Request

```json
{
  "understanding": "medium"
}
```

Allowed:

```text
high
medium
needs_support
```

### Target Logic

```text
Load session
   |
   v
Validate session ownership
   |
   v
Validate current adaptation round
   |
   v
Record understanding
   |
   +--> high
   |      -> key takeaway / optional deeper insight
   |
   +--> medium
   |      -> clarification / another example / hint
   |
   +--> needs_support
          -> simpler explanation / different analogy /
             more Burmese support / prerequisite clarification
   |
   v
If adaptation required:
  adaptationRound += 1
   |
   v
If learner still needs support at round 2:
  status = review_recommended
   |
   v
Persist session
```

### Example Response

```json
{
  "understanding": "medium",
  "status": "in_progress",
  "adaptationRound": 1,
  "adaptation": {
    "learnerResponse": "medium",
    "supportType": "another_example",
    "content": {
      "en": "...",
      "my": "..."
    },
    "round": 1
  }
}
```

### Important Rule

The API must **never create adaptation round 3**.

This limit must be enforced server-side, not only in the UI.

---

## 11.9 Scoped Follow-Up

```http
POST /api/sessions/:sessionId/followup
Content-Type: application/json
```

### Request

```json
{
  "question": "Why is the learning rate important?"
}
```

### Target Behavior

The LLM receives:

- current main concept;
- STEM domain;
- current explanation;
- learner preferences;
- latest understanding;
- learner's follow-up question.

If the question is related to the current concept:

```json
{
  "followUp": {
    "question": "Why is the learning rate important?",
    "answer": {
      "en": "...",
      "my": "..."
    }
  }
}
```

If it clearly introduces a different primary concept, return a controlled response such as:

```json
{
  "newSessionRecommended": true,
  "message": "This appears to be a different STEM concept. Start a new learning session?"
}
```

Do not silently replace the current session concept.

---

# 12. Screen Documentation

The application has exactly **three primary screens**.

Preferences should be implemented as a modal/drawer/popover, not a fourth main screen.

---

## 12.1 Screen 1 — Home / Ask

Route:

```text
/
```

### Purpose

Allow immediate submission of a STEM inquiry.

### Required UI

```text
+-------------------------------------------------------+
| Burmese STEM AI                              EN | MY  |
|                                                       |
| Understand STEM concepts in Burmese and English       |
|                                                       |
| +---------------------------------------------------+ |
| | Ask any STEM question...                          | |
| +---------------------------------------------------+ |
|                                             [Send]    |
|                                                       |
| Example prompts                                       |
| [Gradient Descent] [Neural Networks] [Polymorphism]  |
|                                                       |
| [Learning Preferences]       [Learning History]       |
+-------------------------------------------------------+
```

### Features

- natural-language STEM input;
- submit button;
- sample prompt buttons;
- English/Burmese UI switch;
- preferences modal;
- navigation to history;
- responsive student-friendly layout.

### Submission Flow

```text
question
   |
   v
POST /api/sessions
   |
   v
success
   |
   v
router.push("/learn/{sessionId}")
```

### Preferences Modal

Fields:

```text
Language Support
  bilingual (default)
  burmese
  english

Explanation Level
  beginner (default)
  intermediate
  advanced

Learning Style
  guided (default)
  concise
  more_examples

Theme
  light
  dark
```

Learning-style semantics:

- `guided`: structured explanation + reflection/hints;
- `concise`: shorter, more direct explanation;
- `more_examples`: stronger emphasis on examples/analogies.

---

## 12.2 Screen 2 — STEM Learning Session

Route:

```text
/learn/[sessionId]
```

### Purpose

Display the main structured scaffolding experience.

### Required Layout

```text
Concept: Gradient Descent
Domain: Machine Learning

+---------------------------------------------+
| Simple Explanation                          |
| Burmese + appropriate English STEM terms    |
+---------------------------------------------+

+---------------------------------------------+
| Real-World Example / Analogy                |
+---------------------------------------------+

+---------------------------------------------+
| Technical Explanation                       |
+---------------------------------------------+

+---------------------------------------------+
| Think About This                            |
| Reflective prompt                           |
| [Show Hint]                                 |
+---------------------------------------------+

How well do you understand this concept?

[ I understand ]
[ I partially understand ]
[ I need more explanation ]

+---------------------------------------------+
| Adapted Support                             |
| Visible only after learner response         |
+---------------------------------------------+

Still have a question about this concept?

[ Follow-up input __________________ ] [Send]

[Finish Learning]
```

### Explanation Requirements

Initial support should contain:

1. `simple`
2. `realWorldExample`
3. `technical`
4. `reflectivePrompt`
5. optional `hint`

### Burmese Content

For bilingual mode:

- use real Unicode Burmese text;
- preserve English STEM terminology where technically useful;
- do not transliterate everything unnecessarily;
- allow both English and Burmese values to exist in stored output.

### Reflective Prompt

The reflective prompt is not an assessment.

Do not implement:

- answer choices;
- scoring;
- right/wrong feedback;
- question sequences.

### Understanding Buttons

```text
I understand
  -> high

I partially understand
  -> medium

I need more explanation
  -> needs_support
```

### Adaptation Rules

#### high

- store `high`;
- show concise key takeaway;
- optionally provide one deeper insight;
- allow Finish;
- mark `completed` when the learner finishes.

#### medium

- store `medium`;
- keep `in_progress`;
- generate another example, clarification, analogy, or hint;
- increment adaptation round;
- ask for understanding again.

#### needs_support

- store `needs_support`;
- keep `in_progress`;
- simplify wording;
- provide different analogy;
- increase Burmese support where useful;
- explain prerequisite concept if necessary;
- increment adaptation round;
- ask for understanding again.

### Maximum Adaptation

```text
adaptationRound = 0
  -> initial explanation

adaptationRound = 1
  -> first adapted support

adaptationRound = 2
  -> second/final adapted support
```

No third round.

If the learner still needs support:

```text
status = review_recommended
```

### Follow-Up

Follow-ups remain related to the current concept.

This should not become a normal infinite chat transcript.

---

## 12.3 Screen 3 — Learning History

Route:

```text
/history
```

### Purpose

Show previous learning sessions and support continuation.

### Required UI

```text
Learning History

+------------------------------------------------+
| Gradient Descent                               |
| Machine Learning                               |
| Understanding: High                            |
| Status: Completed                              |
| Last updated: ...                              |
| [Review]                                       |
+------------------------------------------------+

+------------------------------------------------+
| Neural Networks                                |
| Deep Learning                                  |
| Understanding: Medium                          |
| Status: In Progress                            |
| [Resume]                                       |
+------------------------------------------------+

+------------------------------------------------+
| Calculus Fundamentals                          |
| Mathematics                                    |
| Understanding: Needs Support                   |
| Status: Review Recommended                     |
| [Continue Learning]                            |
+------------------------------------------------+
```

### Actions

```text
completed
  -> Review

in_progress
  -> Resume

review_recommended
  -> Continue Learning
```

All actions navigate to:

```text
/learn/{sessionId}
```

The session endpoint restores existing state instead of generating a new session.

---

# 13. Localisation Strategy

There are two different language concepts.

## 13.1 UI Language

Controlled by:

```text
uiLanguage = en | my
```

Used for:

- buttons;
- headings;
- labels;
- messages;
- navigation;
- validation text.

Translations live in:

```text
i18n/locales/en.json
i18n/locales/my.json
```

Both files should always contain matching keys.

## 13.2 STEM Support Language

Controlled by:

```text
supportLanguage =
  bilingual |
  burmese |
  english
```

Used by the LLM/scaffolding service.

This does **not** have to match the UI language.

Example:

```text
UI language: English
Support language: Bilingual
```

is valid.

### Accessibility Fix Required

The root layout should set:

```html
<html lang="en">
```

or:

```html
<html lang="my">
```

based on the resolved locale instead of always using English.

---

# 14. LLM Integration Strategy

The LLM integration is planned but not currently implemented.

The first implementation may use OpenAI because `OPENAI_API_KEY` is already reserved, but provider-specific code should remain isolated.

---

## 14.1 LLM Service Boundary

Target:

```text
services/llm.service.ts
```

Conceptual interface:

```ts
interface LLMService {
  interpretStemInquiry(...)
  generateInitialScaffolding(...)
  generateAdaptedSupport(...)
  answerScopedFollowUp(...)
}
```

All calls must happen server-side.

---

## 14.2 Recommended Call Strategy

Do not create a separate LLM request for every display section.

For the initial learning session, prefer **one structured generation request**:

```text
Learner Question
      +
Preferences
      |
      v
LLM
      |
      v
Structured Result
├── isStem
├── needsClarification
├── clarificationQuestion
├── concept
├── domain
├── simpleExplanation
├── realWorldExample
├── technicalExplanation
├── reflectivePrompt
└── hint
```

This reduces:

- latency;
- API calls;
- inconsistent explanations;
- cost;
- duplicated context.

Adaptation and follow-up should use separate calls because they depend on later learner interaction.

---

## 14.3 Target Structured Initial Output

Example contract:

```json
{
  "isStem": true,
  "needsClarification": false,
  "clarificationQuestion": null,
  "concept": {
    "name": "Gradient Descent",
    "domain": "Machine Learning"
  },
  "explanations": {
    "simple": {
      "en": "...",
      "my": "..."
    },
    "realWorldExample": {
      "en": "...",
      "my": "..."
    },
    "technical": {
      "en": "...",
      "my": "..."
    }
  },
  "reflectivePrompt": {
    "en": "...",
    "my": "..."
  },
  "hint": {
    "en": "...",
    "my": "..."
  }
}
```

The server must validate this structure before storing or rendering it.

A schema-validation library such as Zod is recommended if not already present.

---

## 14.4 Initial Prompt Strategy

The system instruction should tell the model to:

- support STEM learning only;
- identify the main concept and technical domain;
- explain rather than merely translate;
- produce Burmese and English fields;
- preserve useful English STEM terminology inside Burmese explanation;
- adapt wording to the learner's explanation level;
- follow the selected learning style;
- provide exactly one reflective prompt;
- provide at most one initial hint;
- avoid quiz/scoring behavior;
- return only the required structured output.

The prompt should not ask the model to control:

- session status;
- adaptation-round limits;
- database identifiers;
- persistence;
- navigation.

Those remain application responsibilities.

---

## 14.5 Adaptation Strategy

Input to adaptation generation:

```text
concept
domain
initial explanation
previous adaptations
latest learner response
adaptation round
support language
explanation level
learning style
```

The application first selects the adaptation goal.

Example:

```ts
high
  -> key_takeaway

medium
  -> another_example | clarification | analogy | hint

needs_support
  -> simpler_explanation | analogy | clarification
```

Then the LLM generates content for that goal.

This is preferable to:

```text
"User said medium. Do whatever you think is best."
```

because adaptation behavior remains controlled by the application.

---

## 14.6 Follow-Up Strategy

Follow-up generation must receive the current learning context.

```text
Current Concept
+
Domain
+
Current Explanations
+
Latest Adaptation
+
Learner Preferences
+
Follow-Up Question
```

Target output:

```json
{
  "relatedToCurrentConcept": true,
  "answer": {
    "en": "...",
    "my": "..."
  }
}
```

If false:

```json
{
  "relatedToCurrentConcept": false,
  "suggestedConcept": "...",
  "answer": null
}
```

The application can then offer to create a new session.

---

## 14.7 Output Validation

Before content is persisted:

1. validate JSON/schema;
2. ensure required English/Burmese fields exist;
3. ensure strings are non-empty;
4. ensure enum values are valid;
5. reject malformed output;
6. never increment adaptation above round 2.

Do not parse uncontrolled prose with fragile string operations.

---

## 14.8 LLM Failure Handling

Recommended behavior:

```text
Timeout / provider error
   |
   v
return controlled API error
   |
   v
UI shows:
"Unable to prepare the explanation right now."
   |
   v
[Retry]
```

Do not expose raw provider exceptions to the learner.

Recommended initial approach:

- short server-side timeout;
- one controlled retry at most for transient failure;
- log technical details server-side;
- return generic user-facing error.

---

## 14.9 Content Reliability Rules

The current prototype has no retrieval-augmented generation or verified academic-source pipeline.

Therefore:

- do not generate or display academic citations as if verified;
- do not fabricate DOIs, papers, books, or source links;
- ambiguous STEM concepts should request context instead of silently choosing a domain;
- explanations should not claim to be authoritative or empirically validated;
- generated Burmese content should be treated as model-generated learning support and evaluated separately for language and technical accuracy.

---

# 15. Application State Transitions

## New Session

```text
No Session
   |
   | POST /api/sessions
   v
in_progress
understanding = null
adaptationRound = 0
```

## Response: High

```text
in_progress
understanding = high
       |
       | learner finishes
       v
completed
```

## Response: Medium

```text
in_progress
understanding = medium
       |
       v
adaptationRound + 1
       |
       v
in_progress
```

## Response: Needs Support

```text
in_progress
understanding = needs_support
       |
       v
adaptationRound + 1
       |
       +--> round < 2 -> in_progress
       |
       +--> round = 2 and still needs help
                  -> review_recommended
```

These transitions should be enforced in service/API logic, not only visually.

---

# 16. Component Plan

Suggested target components:

```text
components/
├── home/
│   ├── QuestionInput.tsx
│   ├── ExamplePrompts.tsx
│   └── PreferencesDialog.tsx
│
├── learning/
│   ├── ConceptHeader.tsx
│   ├── SimpleExplanation.tsx
│   ├── RealWorldExample.tsx
│   ├── TechnicalExplanation.tsx
│   ├── ReflectivePrompt.tsx
│   ├── Hint.tsx
│   ├── UnderstandingResponse.tsx
│   ├── AdaptedSupport.tsx
│   └── FollowUpInput.tsx
│
├── history/
│   ├── HistoryList.tsx
│   └── HistoryCard.tsx
│
└── layout/
    ├── Header.tsx
    ├── Navigation.tsx
    └── ThemeControl.tsx
```

Component files should remain presentation-focused. Network calls and domain logic should not be spread across small UI components.

---

# 17. UI / Accessibility Requirements

### Visual Direction

- modern educational UI;
- calm student-friendly palette;
- soft blue primary color;
- teal/green for completed/high state;
- amber for medium/review;
- muted red for needs-support state;
- neutral backgrounds;
- minimal visual clutter;
- responsive layout.

### Required Accessibility

- keyboard navigation;
- visible focus indicators;
- semantic headings;
- accessible names for controls;
- sufficient contrast;
- do not communicate status using colour only;
- Burmese Unicode rendering;
- suitable Burmese line height;
- responsive text wrapping;
- correct `<html lang>` for `en` / `my`.

### Themes

Support:

```text
light
dark
```

Theme is a learner preference, not a separate screen.

---

# 18. Testing Plan

There is currently no automated test suite.

The target implementation should add tests in stages.

## Priority 1 — Schema / Domain Tests

Test:

- valid/invalid preference enums;
- understanding enum;
- status enum;
- adaptation round `0..2`;
- learner can have multiple sessions;
- session identifier uniqueness.

## Priority 2 — API Tests

Test:

```text
GET/PATCH preferences
POST sessions
GET sessions
GET session
PATCH session
POST respond
POST followup
```

Important cases:

- missing learner;
- invalid body;
- invalid session ID;
- session not owned by learner;
- unknown understanding;
- adaptation round 2 limit;
- missing session;
- provider failure.

## Priority 3 — Service Tests

Test adaptation mapping:

```text
high -> takeaway/progress
medium -> clarification/example
needs_support -> simplify/support
```

Test:

- no round 3;
- review recommendation transition;
- new-concept follow-up detection contract.

## Priority 4 — UI Tests

Test:

- home submission;
- locale switching;
- understanding buttons;
- adapted support rendering;
- history list;
- resume navigation;
- loading/error states.

### Minimum Current Checks

Until automated tests are added:

```bash
npm run lint
npm run build
```

---

# 19. Security and Repository Hygiene

## Secrets

Never commit:

- `.env.local`;
- real OpenAI keys;
- production MongoDB credentials;
- cloud credentials;
- private SSH keys.

### Important Current Repository Item

The project tree currently contains:

```text
EC2KeyPair.pem
```

A private `.pem` key should **not remain inside the project/repository directory**.

Recommended action:

1. remove it from the project directory;
2. ensure `*.pem` is in `.gitignore`;
3. if it was ever committed, shared, or pushed, rotate/revoke the key and remove it from Git history as appropriate.

Do not rely only on deleting the working-tree file if the key has already entered Git history.

## Anonymous Learner Cookie

The current anonymous identity cookie is suitable only for prototype persistence.

It is not strong authentication.

Do not use it to protect sensitive personal information.

---

# 20. Docker / Deployment Plan

The target proof-of-concept deployment can remain simple:

```text
                 +----------------+
Internet ------> | Nginx (optional)|
                 +-------+--------+
                         |
                         v
                +-----------------+
                | Next.js App     |
                | Node.js         |
                +--------+--------+
                         |
                         v
                +-----------------+
                | MongoDB         |
                +-----------------+

Next.js server
      |
      +------> External LLM API
```

For local development, Nginx is optional.

Do not introduce unnecessary infrastructure such as:

- Redis;
- Kafka;
- message queues;
- Kubernetes;
- microservices;
- API gateways.

The prototype does not require them.

---

# 21. Feature Checklist

Legend:

```text
[x] Implemented
[~] Partially implemented / placeholder
[ ] Planned
```

## Foundation

- [x] Next.js App Router
- [x] React + TypeScript
- [x] Tailwind CSS
- [x] MongoDB/Mongoose connection
- [x] Docker setup
- [x] English/Burmese locale foundation
- [x] Anonymous learner UUID
- [x] Profile schema
- [~] LearningSession schema
- [ ] Fix LearningSession learner-ID uniqueness
- [ ] Standardise session identifier contract

## Preferences

- [x] `GET /api/preferences`
- [x] `PATCH /api/preferences`
- [x] UI language preference model
- [x] Support-language preference model
- [x] Explanation-level preference model
- [x] Learning-style preference model
- [x] Theme preference model
- [ ] Final preferences modal UI
- [ ] Apply all saved preferences to visible learning behavior

## Screen 1 — Home

- [~] Route/page exists
- [ ] Final home layout
- [ ] STEM question input
- [ ] Send flow
- [ ] Example prompts
- [ ] Preferences modal
- [x] Locale switch foundation
- [ ] History navigation
- [ ] Loading/error states

## Session Creation

- [~] Route exists
- [ ] Request validation
- [ ] Load learner preferences
- [ ] STEM scope interpretation
- [ ] Concept identification
- [ ] Domain/context interpretation
- [ ] Initial LLM structured generation
- [ ] LLM output validation
- [ ] Persist LearningSession
- [ ] Return created session

## Screen 2 — Learning Session

- [~] Dynamic route exists
- [ ] Load session
- [ ] Concept header
- [ ] Simple explanation
- [ ] Real-world example/analogy
- [ ] Technical explanation
- [ ] Reflective prompt
- [ ] Optional hint
- [ ] Understanding buttons
- [ ] Adapted support rendering
- [ ] Follow-up input
- [ ] Finish learning action
- [ ] Resume existing state
- [ ] Burmese/English content rendering

## Adaptation

- [~] API route exists
- [ ] Validate understanding
- [ ] Use `high | medium | needs_support`
- [ ] Adaptation strategy service
- [ ] Structured adaptation LLM call
- [ ] Persist adaptation
- [ ] Increment round
- [ ] Enforce maximum round = 2
- [ ] `review_recommended` transition
- [ ] Meaningfully different adapted support

## Follow-Up

- [~] API route exists
- [ ] Load current session context
- [ ] Determine relation to current concept
- [ ] Generate scoped answer
- [ ] Persist follow-up
- [ ] Offer new session for new primary concept

## Screen 3 — History

- [~] Route/page exists
- [ ] `GET /api/sessions`
- [ ] Sort by latest update
- [ ] History cards/list
- [ ] Understanding display
- [ ] Status display
- [ ] Review action
- [ ] Resume action
- [ ] Continue Learning action

## Localisation

- [x] `en.json`
- [x] `my.json`
- [x] Locale cookie
- [x] Locale switcher
- [ ] Keep locale keys fully aligned
- [ ] Use active locale in `<html lang>`
- [ ] Complete Burmese UI copy for all screens/errors

## LLM

- [ ] Provider client
- [ ] Server-only API key usage
- [ ] Initial structured-output schema
- [ ] Initial prompt
- [ ] Adaptation prompt
- [ ] Follow-up prompt
- [ ] Response validation
- [ ] Timeout handling
- [ ] Retry policy
- [ ] Controlled provider errors
- [ ] No fabricated citation behavior

## Accessibility / UX

- [ ] Final responsive layouts
- [ ] Light mode
- [ ] Dark mode
- [ ] Keyboard navigation
- [ ] Visible focus states
- [ ] Screen-reader labels
- [ ] Non-colour-only status indicators
- [ ] Burmese typography review
- [ ] Mobile/tablet layout review

## Testing

- [x] ESLint command
- [x] Production build command
- [ ] Schema tests
- [ ] DAO tests
- [ ] API tests
- [ ] Adaptation state tests
- [ ] LLM structured-output tests
- [ ] UI tests

---

# 22. Known Technical Debt / Immediate Priorities

The current repository has several issues that should be resolved before building the full learning flow.

### Priority 1 — Session Schema

Fix:

```text
LearningSession.learnerId must NOT be unique
```

A learner needs many historical sessions.

### Priority 2 — Session Identifier

Choose and consistently use:

```text
sessionId
```

or:

```text
MongoDB _id
```

across:

- schema;
- DAO;
- API;
- URLs.

### Priority 3 — Root Locale Metadata

Use the resolved locale in:

```html
<html lang="...">
```

### Priority 4 — Session DAO

Extend the DAO beyond current list/find behavior to support:

- create;
- controlled update;
- append adaptation;
- append follow-up;
- lifecycle updates.

### Priority 5 — Service Layer

Implement:

```text
stem-interpreter.service
scaffolding.service
adaptation.service
llm.service
```

before placing LLM logic inside route files.

### Priority 6 — LLM Structured Contract

Define and validate the output contract before building UI against generated responses.

### Priority 7 — Secret Hygiene

Remove `EC2KeyPair.pem` from the project directory and verify whether it has ever been committed.

---

# 23. Recommended Implementation Order

```text
Phase 1
Fix session schema + identifier contract
        |
        v
Phase 2
Complete DAO + service boundaries
        |
        v
Phase 3
Implement POST /api/sessions
+ LLM initial structured generation
        |
        v
Phase 4
Build final Home + Learning Session UI
        |
        v
Phase 5
Implement learner response + adaptation
        |
        v
Phase 6
Implement follow-up
        |
        v
Phase 7
Implement history + resume
        |
        v
Phase 8
Complete preferences integration,
English/Burmese UI, themes, accessibility
        |
        v
Phase 9
Automated tests + deployment polish
```

The adaptive learning loop should work end-to-end before optional visual polish is prioritised.

---

# 24. Definition of Done

The technical prototype is complete when:

- a learner can open the Home screen;
- the application resolves an anonymous learner;
- the learner can configure supported preferences;
- a natural-language STEM question creates a learning session;
- the system identifies the concept and technical context;
- structured bilingual English/Burmese STEM content is generated;
- the Learning Session displays simple, example, and technical explanations;
- a reflective prompt and optional hint are shown;
- exactly three understanding responses are supported;
- `high`, `medium`, and `needs_support` update the session correctly;
- adapted support is generated and stored;
- adaptation is limited to two rounds server-side;
- unresolved difficulty can become `review_recommended`;
- a learner can ask a concept-scoped follow-up;
- a clearly different concept can start a new session instead of replacing the existing one;
- session history is persisted;
- Review, Resume, and Continue Learning restore existing sessions;
- English/Burmese UI localisation is complete;
- Burmese Unicode renders correctly;
- light/dark themes and core accessibility behavior work;
- invalid API requests return controlled errors;
- LLM failures return controlled errors;
- secrets remain server-side;
- lint and production build pass;
- critical session/adaptation behavior has automated tests.

---

## 25. Prototype Boundaries

The technical design should remain intentionally small:

```text
3 Primary Screens
2 Main MongoDB Collections
~8 HTTP Operations
1 Controlled LLM Provider Abstraction
1 Next.js Application
1 MongoDB Service
0 Authentication Systems
0 Quiz Engines
0 LMS Modules
```

The main implementation priority is the complete learning loop:

```text
Ask
 -> Interpret
 -> Generate Structured Support
 -> Report Understanding
 -> Adapt
 -> Persist
 -> Review / Resume
```

Do not expand the project into a production LMS or generic chatbot unless the research scope changes.

---

## 26. mongoDB dump

```bash
mongodump --uri="mongodb://localhost:27017/burmesestemai" --out="./db_dumps/burmesestemai_dump_$(date +%Y%m%d_%H%M%S)"
```

## 26. Access to EC2

```bash
ssh -i ./EC2KeyPair.pem ec2-user@ec2-18-208-163-135.compute-1.amazonaws.com
```