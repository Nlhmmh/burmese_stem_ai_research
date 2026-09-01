# Burmese STEM AI

Burmese STEM AI is an early-stage research prototype for exploring how bilingual,
LLM-assisted scaffolding can help Burmese-speaking learners understand English STEM
terminology and concepts.

The intended learning loop is:

```text
Ask a STEM question
  -> receive a bilingual explanation
  -> report understanding
  -> receive adapted support
  -> review the saved session
```

The repository currently provides the application foundation for that loop. Locale
switching, anonymous learner identification, MongoDB models, and learner preference
APIs are implemented. Session creation, explanations, adaptation, follow-ups, and the
full user interface are not implemented yet.

## Current status

| Area | Status | Details |
|---|---|---|
| Next.js application shell | Implemented | App Router, TypeScript, Tailwind CSS, and ESLint |
| English/Burmese UI locale | Implemented | Cookie-based `en`/`my` switching with `next-intl` |
| Anonymous learner identity | Implemented | An HTTP-only UUID cookie is mapped to an internal request header for API routes |
| Learner preferences | Implemented | MongoDB persistence plus `GET` and `PATCH` endpoints |
| MongoDB models | Implemented | Profile and learning-session schemas |
| Home, learning, and history UI | Placeholder | Pages currently render minimal placeholder text |
| Session APIs | Placeholder | Endpoints return `501 Not Implemented` |
| LLM integration | Not implemented | `OPENAI_API_KEY` is accepted by Docker Compose but is not used in application code |
| Automated tests | Not present | Use lint and production build as the current checks |

## Research scope

The planned system focuses on:

- identifying a STEM concept and its technical context;
- explaining it in Burmese while retaining useful English terminology;
- presenting simple, real-world, and technical explanations;
- collecting self-reported understanding as `high`, `medium`, or
  `needs_support`;
- adapting support for at most two rounds; and
- saving sessions for later review.

The prototype is not intended to be a general chatbot, learning management system,
grading tool, or evidence by itself of improved learning outcomes.

## Technology

- Next.js 16 and React 19
- TypeScript
- `next-intl` for interface localisation
- MongoDB 7 and Mongoose 9
- Tailwind CSS 4
- Docker and Docker Compose

Node.js 22 is used by the Docker image. Use Node.js 20.9 or newer when running the
project locally, as required by Next.js 16.

## Project structure

```text
app/
  api/
    preferences/route.ts          # implemented preference API
    sessions/                     # placeholder session APIs
  history/page.tsx                # placeholder history page
  learn/[sessionId]/page.tsx      # placeholder learning page
  layout.tsx                      # locale provider and application shell
  page.tsx                        # minimal localised home page
components/
  LocalSwitcher.tsx               # English/Burmese locale buttons
data/
  dao/                            # profile and session queries
  schemas/                        # Mongoose profile and session models
  init-db.ts                      # verifies the database connection
i18n/
  locales/en.json                 # English messages
  locales/my.json                 # Burmese messages
  request.ts                      # resolves locale from a cookie
services/
  learner.service.ts              # anonymous learner lookup
proxy.ts                          # learner cookie/header middleware
Dockerfile
docker-compose.yml
```

## Configuration

The application uses these server-side environment variables:

| Variable | Required | Purpose |
|---|---|---|
| `DB_URL` | Yes | MongoDB connection URI |
| `OPENAI_API_KEY` | No, currently unused | Reserved for the planned LLM integration |
| `PORT` | No | Application port; defaults to `3000` in Docker |
| `HOSTNAME` | No | Bind address; set to `0.0.0.0` in Docker |

`env.local` is a committed example file. Copy it to `.env.local` for Next.js local
development:

```bash
cp env.local .env.local
```

Replace the placeholder API key only when an AI provider integration is added. Never
commit real credentials, `.env` files, or private key files.

## Run locally

### Option 1: Next.js locally with MongoDB in Docker

```bash
npm install
cp env.local .env.local
docker compose up -d mongodb
npm run dev
```

Open <http://localhost:3000>.

The equivalent convenience command after configuration is:

```bash
make run
```

### Option 2: Run the complete stack in Docker

```bash
docker compose up --build -d
```

This starts MongoDB, checks the database connection through the one-shot `init-db`
service, and starts the production Next.js server at <http://localhost:3000>.

Stop the stack with:

```bash
docker compose down
```

Add `-v` only when you intentionally want to delete the MongoDB volume and its data.

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run init-db` | Connect to MongoDB and register the models |

The database initializer does not seed or clear data. A dormant `clearDatabase`
helper exists in `data/init-db.ts`, but it is not called.

## Implemented API

All `/api/*` requests pass through `proxy.ts`. It creates an anonymous `learnerId`
UUID in an HTTP-only cookie when necessary and injects it as `x-learner-id` for
server-side route handling. Client-supplied values for that header are discarded.

### Health/test endpoint

```http
GET /api
```

Returns:

```json
{"message":"Hello from Burmese STEM AI API!"}
```

### Get learner preferences

```http
GET /api/preferences
```

The learner profile is created with defaults if it does not exist.

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

### Update learner preferences

```http
PATCH /api/preferences
Content-Type: application/json
```

Send one or more supported fields:

```json
{
  "supportLanguage": "burmese",
  "explanationLevel": "intermediate"
}
```

Allowed values are:

| Field | Values |
|---|---|
| `uiLanguage` | `en`, `my` |
| `supportLanguage` | `bilingual`, `burmese`, `english` |
| `explanationLevel` | `beginner`, `intermediate`, `advanced` |
| `learningStyle` | `guided`, `concise`, `more_examples` |
| `theme` | `light`, `dark` |

Unknown fields, invalid values, empty objects, and non-object request bodies return
HTTP 400.

## Placeholder session API

These routes exist but currently return HTTP 501:

| Method | Route | Planned purpose |
|---|---|---|
| `GET` | `/api/sessions` | List the learner's sessions |
| `POST` | `/api/sessions` | Create a learning session |
| `GET` | `/api/sessions/:sessionId` | Retrieve a session |
| `PATCH` | `/api/sessions/:sessionId` | Update session state |
| `POST` | `/api/sessions/:sessionId/respond` | Record understanding and adapt support |
| `POST` | `/api/sessions/:sessionId/followup` | Answer a concept-scoped follow-up |

## Data model

### Profile

A profile is keyed by the anonymous learner UUID and stores:

- `learnerId`;
- the five preferences documented above; and
- creation and update timestamps.

No name, email, password, or other account data is required.

### Learning session

The session schema is prepared for:

- the learner and session identifiers;
- the original question;
- concept name and STEM domain;
- bilingual English/Burmese simple, real-world, and technical explanations;
- a bilingual reflective prompt and hint;
- understanding (`high`, `medium`, `needs_support`, or unset);
- lifecycle status (`in_progress`, `completed`, or `review_recommended`);
- up to two adaptation rounds;
- bilingual adaptations; and
- concept-scoped follow-up questions and answers.

Session persistence is not wired into the route handlers yet. The existing session
DAO currently supports listing sessions for a learner and finding one session.

## Localisation

The UI locale is stored in a `locale` cookie and defaults to English. The locale
switcher supports:

- `en` — English
- `my` — Burmese

Interface localisation and explanation language are separate concerns. The cookie
controls translated interface messages; the saved `supportLanguage` preference is
intended to guide future STEM explanations.

When adding messages, keep the keys in `i18n/locales/en.json` and
`i18n/locales/my.json` aligned.

## Development checks

```bash
npm run lint
npm run build
```

There is no automated test suite yet. New session and preference behavior should add
route-level tests, schema validation tests, and tests for the two-round adaptation
limit.

## Known gaps

- The three user-facing pages need their production UI.
- Session route handlers need validation, persistence, and service orchestration.
- No LLM provider client, prompts, or structured-output validation exist yet.
- Preference changes are persisted, but only the locale cookie currently affects the
  visible UI.
- Session lookup uses MongoDB `_id` while the schema also declares `sessionId`; this
  identifier contract should be made consistent before implementing the session API.
- The session schema currently marks `learnerId` as unique, which permits only one
  session per learner. Remove that uniqueness constraint if learning history should
  contain multiple sessions.
- The root layout resolves the active locale but currently renders `<html lang="en">`;
  it should use the resolved locale for correct accessibility metadata.
- API `GET /api/preferences` does not yet translate identity/database failures into a
  controlled JSON error response.

## Security notes

- Secrets must remain server-side and outside version control.
- Private `.pem` key files are ignored by Git and should not be stored in the project
  directory. If a real key has ever been committed or shared, rotate it.
- The anonymous learner cookie is HTTP-only, `SameSite=Lax`, and secure in production.
- Authentication and authorisation are outside the current proof-of-concept scope;
  anonymous cookie identity should not be treated as strong user authentication.
