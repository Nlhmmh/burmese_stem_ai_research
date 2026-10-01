# RUN-B01-20261001-DYNAMIC-01 command log

## Run identity

- Baseline: `B01-A5-EVALUATION`
- Executable commit: `37faefa236829aa3d79e023faa1fb72a086b5c2a`
- Working HEAD: `e738ba91148cc7feca3d89e9bd8615d4f179bbc3`
- Protocol: `A5-PROTOCOL-01` version 2.1
- Protocol SHA-256 at execution: `72c561dd15b99d022e97b56ecf6bc881faaf0de129f20c060259d63944064f4f`
- Lockfile SHA-256: `d27ebe08630989019ad6254e4de77c9c2e5d21419acf2347d8d0adadc6557702`
- Application source diff from executable commit before execution: clean
- Evaluator: Codex technical execution under user direction
- Date/time zone: 1 October 2026, Pacific/Auckland

## Environment

- Node.js: 26.4.0
- npm: 11.17.0
- Next.js: 16.3.4, development server on `127.0.0.1:3100`
- MongoDB: 8.2.6, isolated local instance on `127.0.0.1:27018`
- Database: `burmesestemai_evaluation_b01`
- Provider mode: live configured OpenAI provider
- Model: `gpt-5.4-mini`
- Artificial owners:
  - `DYN-OWNER-A` → `00000000-0000-4000-8000-0000000000a1`
  - `DYN-OWNER-B` → `00000000-0000-4000-8000-0000000000b2`
- No key, credential, or secret was copied into evidence.

The database used a fresh temporary data directory:
`/private/tmp/burmese-stem-dynamic.dRsmRv`. The normal development and
production databases were not used. The temporary directory was retained at
the end of the run because the browser observation remained blocked; removal
must target this exact directory only after the evidence is no longer needed.

## Readiness and initial generation

- `GET /api` returned HTTP 200 with the application API greeting.
- `db.runCommand({ping: 1})` returned `{ok: 1}`.
- `PATCH /api/preferences` for owner A returned HTTP 200 and stored
  bilingual/beginner/guided preferences.
- `POST /api/sessions` for the fixed photosynthesis question returned HTTP 201.
- Session ID: `9e5969ec-d6d8-4413-a4e7-d56b65698953`.
- Client request-to-response time: 5088.923 ms.
- The raw initial content and subsequent before/after database states are in
  `DYN-RUN-01-api-database.jsonl`.

## Automated workflow

`run_dynamic_api.mjs` executed the API/database portions of DYN-02–DYN-12 and
all 15 timing attempts. Its first summary reported all cases as Pass except
DYN-10. Inspection showed that DYN-10 had actually returned:

```json
{
  "newSessionRecommended": true,
  "error": {
    "code": "FOLLOW_UP_OUT_OF_SCOPE",
    "message": "This question is about gravity, which is a different topic from photosynthesis. If you want, start a new learning session on gravity and I can help from there."
  }
}
```

The driver had checked `error.newSessionRecommended` instead of the response
root. The original failed assertion is retained, the driver was corrected,
and `DYN-RUN-01-adjudication.md` records why DYN-10 is a Pass.

The development-server log independently showed the expected response timing
pattern:

- generated default adaptation: about 3.3 s;
- generated conceptual clarification: about 2.6 s;
- capped response: 12 ms;
- High/fade response: 17 ms;
- generated language support: about 1.4 s;
- generated reinterpretation: about 1.3 s.

These timings support, but do not independently prove, the no-provider-call
expectation for capped and fade routes. Provider-call counts were not directly
instrumented in this live run.

## DYN-13 controlled failure

### First attempt — Blocked before request

A second `next dev` process was started with an intentionally invalid provider
key. Next.js rejected it because the project development lock was held by the
main server. The later `curl` therefore could not connect to port 3101. No
application request occurred and owner B retained zero profiles and sessions.

### Retry — Executed

After stopping the main server, the fault-injection server started on port
3101. Owner B had zero profiles and sessions before the request. The artificial
question `What is photosynthesis?` produced:

```text
HTTP/1.1 502 Bad Gateway
DYN13_RETRY_ELAPSED=1.255217
```

```json
{
  "error": {
    "code": "SESSION_GENERATION_FAILED",
    "message": "Unable to prepare the explanation right now"
  }
}
```

After the request, owner B had one default profile and zero sessions. The
server logged only the domain-level message `Unable to generate the learning
session`; no provider response detail or credential appeared in the client
response. This verifies controlled failure and absence of partial session
persistence. The UI recovery presentation was not observed.

## Page and browser observations

Read-only page requests returned:

```text
HOME status=200 bytes=26673 elapsed=0.356957
HISTORY status=200 bytes=25444 elapsed=0.036896
LEARN status=200 bytes=25222 elapsed=0.267740
```

The server-rendered History and Learn HTML contained their headings and
loading states. Their learner data are loaded after hydration, so these checks
do not establish visual reconstruction.

The computer-use inventory reported no available browser and a native-pipe
startup failure. Consequently, interactive and visual UI substeps were marked
Blocked rather than inferred from API output or component tests.

## Non-blocking runtime warning

Mongoose repeatedly emitted its existing deprecation warning that the `new`
option should be replaced by `returnDocument: 'after'`. No tested request
failed because of this warning.
