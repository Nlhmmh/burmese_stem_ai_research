# Burmese STEM AI — Technical README

Technical documentation and implementation plan for the **Burmese STEM AI** proof-of-concept application.

This README focuses only on the software implementation: architecture, stack, project structure, database design, APIs, screens, LLM integration, development workflow, deployment, testing, and feature status.

> **Important:** The repository is still under development. This document describes both the **current implementation** and the **complete target plan**. Items marked **Planned** are design targets and should not be interpreted as already implemented.

---

## 1. Application Summary

Burmese STEM AI is a three-screen educational web application for Burmese-speaking learners who want help understanding English STEM terminology and concepts.

The implemented application flow is:

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

The current repository contains an end-to-end proof-of-concept learning flow. Automated tests and some production hardening remain outstanding.

| Area | Status | Current State |
|---|---|---|
| Next.js application shell | Implemented | App Router, TypeScript, Tailwind CSS, ESLint |
| English/Burmese UI locale | Implemented | `next-intl`, cookie-based `en` / `my` switching |
| Anonymous learner identity | Implemented | HTTP-only UUID cookie mapped to server-side learner ID |
| Learner preferences | Implemented | MongoDB persistence, `GET` and `PATCH` API |
| MongoDB profile schema | Implemented | Anonymous profile + preferences |
| MongoDB learning-session schema | Implemented | UUID session ID, bilingual content, adaptations, follow-ups, lifecycle state, and preference snapshot |
| Home screen | Implemented | Question input, example prompts, preferences dialog, loading/error states, and session navigation |
| Learning Session screen | Implemented | Bilingual explanations, hint, understanding responses, adapted support, follow-ups, and completion |
| Learning History screen | Implemented | Latest-first session list with status, understanding, and review/resume actions |
| Session API routes | Implemented | Create/list/get/complete/respond/follow-up handlers with controlled errors |
| LLM integration | Implemented | Server-side OpenAI Responses API calls with strict JSON Schema output and a 20-second timeout |
| Adaptation logic | Implemented | Deterministic support strategy and a server-enforced maximum of two rounds |
| Follow-up logic | Implemented | Concept-scoped bilingual answers with a maximum of two follow-ups per session |
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
- **OpenAI Responses API** for structured bilingual content generation
- **ESLint**

### Data

- **MongoDB 7**
- **Mongoose 9**

### Infrastructure

- **Docker**
- **Docker Compose**
- **Nginx** reverse proxy for production HTTP/HTTPS
- **Certbot** for Let's Encrypt certificate issue and renewal
- **Makefile** for convenience commands

### Package Management

- **npm**

### Runtime Requirements

- Docker image: **Node.js 22**
- Local development: **Node.js 20.9+**
- npm compatible with the selected Node version

---

## 4. Technical Architecture

The proof of concept is a small monolithic Next.js application.

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
| - Learner/Profile          - Profile DAO         |
| - Session Generation      - Session DAO         |
| - Session Lifecycle             |               |
| - Adaptation                    v               |
| - Follow-Up                 MongoDB             |
|       |                                          |
+-------+------------------------------------------+
        |
        | server-side API request
        v
+-----------------------------+
|       External LLM API      |
|  OpenAI Responses API       |
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
├── .env.example
├── .env.production.example
├── Dockerfile
├── EC2KeyPair.pem
├── Makefile
├── README.md
├── README.deploy.md
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
│   │   └── HistoryList.tsx
│   ├── home
│   │   ├── HomeInquiry.tsx
│   │   └── PreferencesDialog.tsx
│   ├── layout
│   │   └── AppHeader.tsx
│   └── learn
│       ├── FollowUpSection.tsx
│       ├── LearningSession.tsx
│       ├── SessionContent.tsx
│       └── types.ts
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
├── docker-compose.prod.yml
├── deploy.sh
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
│   ├── default.conf
│   ├── http.prod.conf.template
│   └── https.prod.conf.template
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── public
│   └── og.png
├── services
│   ├── adaptation.service.ts
│   ├── followup.service.ts
│   ├── learner.service.ts
│   ├── profile.service.ts
│   ├── session-lifecycle.service.ts
│   └── session.service.ts
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
| `docker-compose.prod.yml` | Production app, database, Nginx, and Certbot orchestration |
| `deploy.sh` / `README.deploy.md` | EC2 HTTPS deployment automation and instructions |

### Current Service Layer

The service layer is currently organised as:

```text
services/
├── adaptation.service.ts
├── followup.service.ts
├── learner.service.ts
├── profile.service.ts
├── session-lifecycle.service.ts
└── session.service.ts
```

Responsibilities:

```text
learner.service.ts
  -> resolve anonymous learner/profile

profile.service.ts
  -> validate preference updates

session.service.ts
  -> validate and classify STEM inquiries
  -> generate structured initial bilingual content
  -> create learning sessions

session-lifecycle.service.ts
  -> retrieve sessions and enforce completion updates

adaptation.service.ts
  -> map learner response to support strategy
  -> enforce maximum adaptation rounds
  -> update understanding/status

followup.service.ts
  -> validate, scope, generate, and persist follow-up answers
```

---

## 6. Environment Configuration

### Current Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DB_URL` | Yes | MongoDB connection URI |
| `OPENAI_API_KEY` | Yes for learning generation | Server-side OpenAI credential |
| `OPENAI_MODEL` | No | OpenAI model override; examples use `gpt-5.4-mini` |
| `NEXT_PUBLIC_APP_URL` | No | Absolute application URL used as the metadata base; defaults to `http://localhost:3000` |
| `PORT` | No | Application port, default `3000` |
| `HOSTNAME` | No | Bind address, typically `0.0.0.0` in Docker |

### Local Setup

The repository provides `.env.example` for local configuration.

```bash
cp .env.example .env.local
```

Set `OPENAI_API_KEY`; the example `DB_URL` connects to the local Docker MongoDB port.

### Environment File Convention

Committed templates:

```text
.env.example
.env.production.example
```

All real environment files remain ignored:

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
cp .env.example .env.local
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

The current stack starts:

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

The MongoDB design uses two primary collections:

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

### Current Shape

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

  hint: BilingualText

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

Current behavior:

| Learner State | Understanding | Status |
|---|---|---|
| First session created | `null` | `in_progress` |
| Learner understands | `high` | `in_progress` until Finish |
| Learner finishes after understanding | `high` | `completed` |
| Learner partially understands | `medium` | `in_progress` |
| Learner needs more explanation | `needs_support` | `in_progress` |
| Still needs support after round 2 | `needs_support` or latest value | `review_recommended` |

### Current Indexes

Profile:

```text
learnerId unique
```

Learning session:

```text
sessionId unique
learnerId + updatedAt descending
```

### Implemented Schema and Identifier Contract

- `learnerId` is not unique on learning sessions, so one learner can own many sessions.
- `sessionId` is a unique UUID and is the public identifier used by DAOs, APIs, and `/learn/[sessionId]` URLs.
- MongoDB `_id` remains an internal database identifier.
- `{ learnerId: 1, updatedAt: -1 }` supports latest-first history queries.

---

# 11. API Design

All APIs are under:

```text
/api
```

### Current API Summary

| Method | Route | Status | Purpose |
|---|---|---|---|
| `GET` | `/api` | Implemented | Health/test response |
| `GET` | `/api/preferences` | Implemented | Retrieve learner preferences |
| `PATCH` | `/api/preferences` | Implemented | Update learner preferences |
| `GET` | `/api/sessions` | Implemented | List learner sessions |
| `POST` | `/api/sessions` | Implemented | Create learning session |
| `GET` | `/api/sessions/:sessionId` | Implemented | Get/review/resume one session |
| `PATCH` | `/api/sessions/:sessionId` | Implemented | Mark a session completed |
| `POST` | `/api/sessions/:sessionId/respond` | Implemented | Record understanding + adapt |
| `POST` | `/api/sessions/:sessionId/followup` | Implemented | Ask a scoped follow-up |

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

### Request

```json
{
  "question": "What is gradient descent?"
}
```

The learner ID should come from the server-side anonymous learner context, not the request body.

### Server Flow

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

### Success — `201`

```json
{
  "session": {
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
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

### Error Cases

| Code | Meaning |
|---|---|
| `400` | Invalid or empty question |
| `422` | Query is ambiguous and needs clarification |
| `422` | Clearly outside prototype STEM scope |
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

### Response — `200`

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

Current sort:

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

Updates are restricted to:

```json
{
  "status": "completed"
}
```

Arbitrary database field patching is rejected. The route accepts transitions from `in_progress` or `review_recommended` to `completed`, and treats an already-completed session as an idempotent success.

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

### Current Logic

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
   |      -> key takeaway
   |
   +--> medium
   |      -> another example
   |
   +--> needs_support
          -> simpler explanation
   |
   v
While fewer than two adaptations exist:
  adaptationRound += 1
   |
   v
If the learner reports medium or needs_support at round 2:
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

### Current Behavior

The LLM receives:

- current main concept;
- STEM domain;
- current explanation;
- learner preferences;
- latest understanding;
- learner's follow-up question.

Requests are limited to 500 characters and two persisted follow-ups per session.

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

Preferences are implemented as a modal, not a fourth main screen.

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
```

The preferences dialog currently saves these three learning-content preferences. UI language is changed in the header and stored in the `locale` cookie. The light/dark theme toggle is also in the header and is stored in browser `localStorage`.

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

Follow-ups remain related to the current concept and are limited to two per session.

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

Controlled by the `locale` cookie:

```text
locale = en | my
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

Used by session generation and when rendering initial, adapted, and follow-up content.

This does **not** have to match the UI language.

Example:

```text
UI language: English
Support language: Bilingual
```

is valid.

### Locale Metadata

The root layout sets:

```html
<html lang="en">
```

or:

```html
<html lang="my">
```

from the resolved locale. The English and Burmese message files currently contain matching keys.

---

# 14. LLM Integration Strategy

The LLM integration uses the OpenAI Responses API from server-side services. Browser code never receives the API key.

---

## 14.1 Current LLM Service Boundaries

Provider calls currently live in:

```text
services/session.service.ts
services/adaptation.service.ts
services/followup.service.ts
```

Each service uses a strict JSON Schema response format, disables provider storage with `store: false`, validates the parsed response, and applies a 20-second abort timeout. A shared provider client is not yet extracted.

---

## 14.2 Current Call Strategy

Do not create a separate LLM request for every display section.

The initial learning session uses **one structured generation request**:

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

## 14.3 Current Structured Initial Output

Example contract:

```json
{
  "outcome": "ready",
  "message": "",
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

The request uses OpenAI strict JSON Schema output, followed by application-level shape and non-empty-content validation before persistence.

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
  -> another_example

needs_support
  -> simpler_explanation
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

Structured model output:

```json
{
  "relatedToCurrentConcept": true,
  "message": "",
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
  "message": "This appears to be a different STEM concept. Start a new learning session?",
  "answer": {
    "en": "",
    "my": ""
  }
}
```

The API maps the unrelated result to `422` with `newSessionRecommended: true`; the current UI displays the returned message.

---

## 14.7 Output Validation

Before content is persisted, the current services:

1. validate JSON/schema;
2. ensure required English/Burmese fields exist;
3. ensure generated session and related-answer strings are non-empty;
4. constrain model classifications through strict schemas;
5. reject malformed output;
6. enforce adaptation and follow-up limits in application/database logic.

Do not parse uncontrolled prose with fragile string operations.

---

## 14.8 LLM Failure Handling

Current behavior:

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
[Learner may submit again]
```

Do not expose raw provider exceptions to the learner.

- 20-second server-side timeout;
- no automatic provider retry;
- technical details logged server-side;
- controlled `502` API errors and generic user-facing messages.

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
       v
key_takeaway adaptation (while round < 2)
adaptationRound + 1
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
       +--> round < 2 -> in_progress
       |
       +--> round = 2 -> review_recommended
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

These transitions are enforced in service/API logic as well as reflected in the UI.

---

# 16. Component Structure

Current components:

```text
components/
├── LocalSwitcher.tsx
├── home/
│   ├── HomeInquiry.tsx
│   └── PreferencesDialog.tsx
│
├── learn/
│   ├── FollowUpSection.tsx
│   ├── LearningSession.tsx
│   ├── SessionContent.tsx
│   └── types.ts
│
├── history/
│   └── HistoryList.tsx
│
└── layout/
    └── AppHeader.tsx
```

`HomeInquiry`, `LearningSession`, and `HistoryList` own screen-level data fetching and interaction state. Smaller components render preferences, bilingual content, adaptations, follow-ups, navigation, locale controls, and theme controls.

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

Implemented:

```text
light
dark
```

Theme is toggled in the application header and persisted in browser `localStorage`. Although the profile schema also contains a `theme` preference, the current toggle does not synchronize it to MongoDB.

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

# 20. Docker / Deployment

The repository includes local and production Docker Compose configurations. Production uses Nginx, Certbot, Next.js, and MongoDB; detailed EC2 and HTTPS instructions are in `README.deploy.md`.

```text
                 +----------------+
Internet ------> | Nginx           |
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

For local development, `docker-compose.yml` exposes the application on port `3000` and MongoDB on `27017`; Nginx is not used. In production, only Nginx publishes ports `80` and `443`, while the application and MongoDB remain on the internal Docker network.

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
[~] Partially implemented
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
- [x] LearningSession schema
- [x] Allow multiple sessions per learner
- [x] UUID session identifier contract

## Preferences

- [x] `GET /api/preferences`
- [x] `PATCH /api/preferences`
- [x] UI language preference model
- [x] Support-language preference model
- [x] Explanation-level preference model
- [x] Learning-style preference model
- [x] Theme preference model
- [x] Learning-content preferences modal UI
- [x] Apply support language, explanation level, and learning style
- [~] Synchronize UI language and theme controls with profile preferences

## Screen 1 — Home

- [x] Route/page and responsive home layout
- [x] STEM question input
- [x] Send flow
- [x] Example prompts
- [x] Preferences modal
- [x] Locale switcher
- [x] History navigation
- [x] Loading/error states

## Session Creation

- [x] Route exists
- [x] Request validation
- [x] Load learner preferences
- [x] STEM scope interpretation
- [x] Concept identification
- [x] Domain/context interpretation
- [x] Initial LLM structured generation
- [x] LLM output validation
- [x] Persist LearningSession
- [x] Return created session

## Screen 2 — Learning Session

- [x] Dynamic route exists
- [x] Load session
- [x] Concept header
- [x] Simple explanation
- [x] Real-world example/analogy
- [x] Technical explanation
- [x] Reflective prompt
- [x] Optional hint
- [x] Understanding buttons
- [x] Adapted support rendering
- [x] Follow-up input
- [x] Finish learning action
- [x] Resume existing state
- [x] Burmese/English content rendering

## Adaptation

- [x] API route exists
- [x] Validate understanding
- [x] Use `high | medium | needs_support`
- [x] Adaptation strategy service
- [x] Structured adaptation LLM call
- [x] Persist adaptation
- [x] Increment round
- [x] Enforce maximum round = 2
- [x] `review_recommended` transition
- [x] Prompt for support that differs from previous adaptations

## Follow-Up

- [x] API route exists
- [x] Load current session context
- [x] Determine relation to current concept
- [x] Generate scoped answer
- [x] Persist follow-up
- [x] Enforce maximum of two follow-ups
- [~] Recommend a new session for a different primary concept; no dedicated UI action yet

## Screen 3 — History

- [x] Route/page exists
- [x] `GET /api/sessions`
- [x] Sort by latest update
- [x] History cards/list
- [x] Understanding display
- [x] Status display
- [x] Review action
- [x] Resume action
- [x] Continue Learning action

## Localisation

- [x] `en.json`
- [x] `my.json`
- [x] Locale cookie
- [x] Locale switcher
- [x] Locale keys aligned
- [x] Use active locale in `<html lang>`
- [x] Burmese UI copy for all current screens
- [~] Localize server-returned validation and scope messages

## LLM

- [x] Direct OpenAI Responses API integration
- [x] Server-only API key usage
- [x] Initial structured-output schema
- [x] Initial prompt
- [x] Adaptation prompt
- [x] Follow-up prompt
- [x] Response validation
- [x] Timeout handling
- [ ] Retry policy
- [x] Controlled provider errors
- [ ] No fabricated citation behavior

## Accessibility / UX

- [x] Responsive layouts
- [x] Light mode
- [x] Dark mode
- [~] Keyboard navigation and dialog focus management
- [x] Visible focus states
- [x] Screen-reader labels for primary controls
- [x] Non-colour-only status indicators
- [ ] Burmese typography review
- [~] Mobile/tablet layout review

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

The core learning flow is implemented. The remaining priorities are hardening, consistency, and verification.

### Priority 1 — Automated Tests

Add schema, DAO, route-handler, lifecycle/adaptation, LLM-contract, and UI tests. The project currently relies only on ESLint and a production build.

### Priority 2 — Shared OpenAI Boundary

Extract the duplicated Responses API request/parsing logic from the session, adaptation, and follow-up services. Centralize the model default, timeout, error mapping, and any future retry policy.

### Priority 3 — Preference Consistency

Synchronize the locale and theme controls with the stored `uiLanguage` and `theme` profile fields, or remove those database fields if cookie/localStorage-only behavior is intentional.

### Priority 4 — Locale and Error Hardening

Validate the locale cookie before dynamically loading a message file, and localize server-returned validation and scope errors rather than displaying English service messages in the Burmese UI.

### Priority 5 — Follow-Up New-Session UX

The API returns `newSessionRecommended: true` for an unrelated primary concept. Add a dedicated action that carries the question into a new inquiry instead of showing only an error message.

### Priority 6 — Accessibility and Burmese QA

Complete dialog focus trapping/restoration, keyboard and mobile review, and native-speaker review of Burmese typography and generated content.

### Priority 7 — Secret Hygiene

Remove `EC2KeyPair.pem` from the project directory and verify whether it has ever been committed.

---

# 23. Recommended Implementation Order

```text
Phase 1
Add automated coverage for current schemas,
services, APIs, and session state transitions
        |
        v
Phase 2
Extract a shared OpenAI client and
standardize model/timeout/error behavior
        |
        v
Phase 3
Synchronize or simplify locale/theme preferences
+ localize server errors
        |
        v
Phase 4
Add the new-session follow-up action
+ complete accessibility/Burmese QA
        |
        v
Phase 5
Deployment verification and production hardening
```

The adaptive learning loop already works end-to-end; remaining work should prioritize reliability and evaluation over expanding the feature scope.

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
