import { createRequire } from "node:module";
import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

const root = process.cwd();
const appDirectory = path.join(root, "burmese_stem_ai");
const outputDirectory = path.join(root, "evaluation/02_design/dynamic/raw");
const rawPath = path.join(outputDirectory, "DYN-RUN-01-api-database.jsonl");
const summaryPath = path.join(outputDirectory, "DYN-RUN-01-summary.json");
const timingsPath = path.join(root, "evaluation/02_design/dynamic/timings.csv");
const baseUrl = process.env.DYNAMIC_BASE_URL ?? "http://127.0.0.1:3100";
const databaseUrl =
  process.env.DYNAMIC_DB_URL ??
  "mongodb://127.0.0.1:27018/burmesestemai_evaluation_b01";
const ownerA = "00000000-0000-4000-8000-0000000000a1";
const ownerB = "00000000-0000-4000-8000-0000000000b2";
const existingSessionId = process.env.DYNAMIC_EXISTING_SESSION_ID;

if (!existingSessionId) {
  throw new Error("DYNAMIC_EXISTING_SESSION_ID is required");
}

await mkdir(outputDirectory, { recursive: true });
await writeFile(rawPath, "", "utf8");

const appRequire = createRequire(path.join(appDirectory, "package.json"));
const mongoose = appRequire("mongoose");
await mongoose.connect(databaseUrl);
const database = mongoose.connection.db;

const caseResults = [];
const timingRows = [];

function cookie(owner) {
  return `learnerId=${owner}`;
}

async function logRecord(record) {
  await appendFile(rawPath, `${JSON.stringify(record)}\n`, "utf8");
}

async function api(caseId, operation, route, options = {}) {
  const startedAt = new Date().toISOString();
  const started = performance.now();
  let response;
  let responseText = "";
  let error = null;
  try {
    response = await fetch(`${baseUrl}${route}`, {
      method: options.method ?? "GET",
      headers: {
        ...(options.body === undefined ? {} : { "content-type": "application/json" }),
        ...(options.owner ? { cookie: cookie(options.owner) } : {})
      },
      ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) })
    });
    responseText = await response.text();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }
  const elapsedMs = Number((performance.now() - started).toFixed(3));
  let responseBody = responseText;
  try {
    responseBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    // Preserve non-JSON output verbatim.
  }
  const record = {
    recordType: "api",
    caseId,
    operation,
    startedAt,
    elapsedMs,
    request: {
      method: options.method ?? "GET",
      route,
      ownerAlias: options.owner === ownerA ? "DYN-OWNER-A" : options.owner === ownerB ? "DYN-OWNER-B" : null,
      body: options.body ?? null
    },
    response: {
      status: response?.status ?? null,
      body: responseBody,
      error
    }
  };
  await logRecord(record);
  return record;
}

async function snapshot(caseId, label, sessionId) {
  const document = await database.collection("sessions").findOne(
    { sessionId },
    { projection: { _id: 0 } }
  );
  const record = {
    recordType: "database_snapshot",
    caseId,
    label,
    capturedAt: new Date().toISOString(),
    document
  };
  await logRecord(record);
  return document;
}

function body(record) {
  return record.response.body;
}

function addResult(caseId, checks, notes = []) {
  const failed = checks.filter((check) => !check.pass);
  caseResults.push({
    caseId,
    outcome: failed.length === 0 ? "Pass" : "Fail",
    checks,
    notes
  });
}

const initialStored = await snapshot("DYN-02", "after_initial_creation", existingSessionId);
const initialDetail = await api(
  "DYN-02",
  "retrieve initial session",
  `/api/sessions/${existingSessionId}`,
  { owner: ownerA }
);
addResult("DYN-02", [
  { name: "detail_status_200", pass: initialDetail.response.status === 200 },
  { name: "stored_round_zero", pass: initialStored?.adaptationRound === 0 },
  { name: "stored_in_progress", pass: initialStored?.status === "in_progress" },
  { name: "stored_understanding_null", pass: initialStored?.understanding === null },
  { name: "stored_adaptations_empty", pass: initialStored?.adaptations?.length === 0 },
  { name: "stored_response_events_empty", pass: initialStored?.responseEvents?.length === 0 },
  { name: "stored_follow_ups_empty", pass: initialStored?.followUps?.length === 0 }
], ["Initial POST HTTP 201 and 5088.923 ms were captured in the command log before this driver."]);

const beforeD03 = await snapshot("DYN-03", "before", existingSessionId);
const d03 = await api("DYN-03", "default medium response", `/api/sessions/${existingSessionId}/respond`, {
  method: "POST",
  owner: ownerA,
  body: { overallSupportNeed: "medium", difficultyType: null }
});
const afterD03 = await snapshot("DYN-03", "after", existingSessionId);
addResult("DYN-03", [
  { name: "status_200", pass: d03.response.status === 200 },
  { name: "route_stage_5", pass: body(d03)?.route === "stage_5_scaffold" },
  { name: "support_another_example", pass: body(d03)?.adaptation?.supportType === "another_example" },
  { name: "round_zero_to_one", pass: beforeD03?.adaptationRound === 0 && afterD03?.adaptationRound === 1 },
  { name: "one_adaptation", pass: afterD03?.adaptations?.length === 1 },
  { name: "one_response_event", pass: afterD03?.responseEvents?.length === 1 },
  { name: "event_zero_to_one", pass: afterD03?.responseEvents?.[0]?.roundBefore === 0 && afterD03?.responseEvents?.[0]?.roundAfter === 1 }
]);

const beforeD04 = await snapshot("DYN-04", "before", existingSessionId);
const d04 = await api("DYN-04", "concept clarification response", `/api/sessions/${existingSessionId}/respond`, {
  method: "POST",
  owner: ownerA,
  body: { overallSupportNeed: "needs_support", difficultyType: "concept_unclear" }
});
const afterD04 = await snapshot("DYN-04", "after", existingSessionId);
addResult("DYN-04", [
  { name: "status_200", pass: d04.response.status === 200 },
  { name: "route_concept_clarification", pass: body(d04)?.route === "concept_clarification" },
  { name: "support_concept_clarification", pass: body(d04)?.adaptation?.supportType === "concept_clarification" },
  { name: "round_one_to_two", pass: beforeD04?.adaptationRound === 1 && afterD04?.adaptationRound === 2 },
  { name: "two_adaptations", pass: afterD04?.adaptations?.length === 2 },
  { name: "two_response_events", pass: afterD04?.responseEvents?.length === 2 },
  { name: "review_recommended", pass: afterD04?.status === "review_recommended" }
]);

const beforeD05 = await snapshot("DYN-05", "before", existingSessionId);
const d05 = await api("DYN-05", "capped response", `/api/sessions/${existingSessionId}/respond`, {
  method: "POST",
  owner: ownerA,
  body: { overallSupportNeed: "needs_support", difficultyType: null }
});
const afterD05 = await snapshot("DYN-05", "after", existingSessionId);
addResult("DYN-05", [
  { name: "status_200", pass: d05.response.status === 200 },
  { name: "round_remains_two", pass: beforeD05?.adaptationRound === 2 && afterD05?.adaptationRound === 2 },
  { name: "no_third_adaptation", pass: beforeD05?.adaptations?.length === 2 && afterD05?.adaptations?.length === 2 },
  { name: "response_event_appended", pass: beforeD05?.responseEvents?.length === 2 && afterD05?.responseEvents?.length === 3 },
  { name: "event_two_to_two", pass: afterD05?.responseEvents?.[2]?.roundBefore === 2 && afterD05?.responseEvents?.[2]?.roundAfter === 2 },
  { name: "adaptation_null", pass: body(d05)?.adaptation === null }
], ["No-provider-call assertion is not directly instrumented; null adaptation, unchanged round/adaptation count, and elapsed time are runtime observations."]);

const d09Before = await snapshot("DYN-09", "before", existingSessionId);
const d09 = await api("DYN-09", "relevant follow-up", `/api/sessions/${existingSessionId}/followup`, {
  method: "POST",
  owner: ownerA,
  body: { question: "Why do plants need sunlight for photosynthesis?" }
});
const d09After = await snapshot("DYN-09", "after", existingSessionId);
addResult("DYN-09", [
  { name: "status_200", pass: d09.response.status === 200 },
  { name: "follow_up_persisted_once", pass: d09Before?.followUps?.length === 0 && d09After?.followUps?.length === 1 },
  { name: "round_unchanged", pass: d09Before?.adaptationRound === d09After?.adaptationRound },
  { name: "response_events_unchanged", pass: d09Before?.responseEvents?.length === d09After?.responseEvents?.length },
  { name: "adaptations_unchanged", pass: d09Before?.adaptations?.length === d09After?.adaptations?.length }
]);

const d10Before = await snapshot("DYN-10", "before", existingSessionId);
const d10 = await api("DYN-10", "unrelated follow-up", `/api/sessions/${existingSessionId}/followup`, {
  method: "POST",
  owner: ownerA,
  body: { question: "How does gravity work?" }
});
const d10After = await snapshot("DYN-10", "after", existingSessionId);
addResult("DYN-10", [
  { name: "status_422", pass: d10.response.status === 422 },
  { name: "out_of_scope_code", pass: body(d10)?.error?.code === "FOLLOW_UP_OUT_OF_SCOPE" },
  { name: "new_session_recommended", pass: body(d10)?.newSessionRecommended === true },
  { name: "follow_up_not_persisted", pass: d10Before?.followUps?.length === d10After?.followUps?.length },
  { name: "stage_state_unchanged", pass: d10Before?.adaptationRound === d10After?.adaptationRound && d10Before?.responseEvents?.length === d10After?.responseEvents?.length }
]);

const listA = await api("DYN-11", "owner A history", "/api/sessions", { owner: ownerA });
const detailA = await api("DYN-11", "owner A detail", `/api/sessions/${existingSessionId}`, { owner: ownerA });
const detailB = await api("DYN-11", "owner B ownership check", `/api/sessions/${existingSessionId}`, { owner: ownerB });
const sessionsA = body(listA)?.sessions ?? [];
const newestFirst = sessionsA.every((item, index) => index === 0 || new Date(sessionsA[index - 1].updatedAt) >= new Date(item.updatedAt));
addResult("DYN-11", [
  { name: "history_status_200", pass: listA.response.status === 200 },
  { name: "history_contains_session", pass: sessionsA.some((session) => session.sessionId === existingSessionId) },
  { name: "history_newest_first", pass: newestFirst },
  { name: "owner_detail_status_200", pass: detailA.response.status === 200 },
  { name: "owner_B_cannot_retrieve", pass: detailB.response.status === 404 }
], ["Browser reconstruction is recorded separately from this API/database driver."]);

const beforeD12 = await snapshot("DYN-12", "before", existingSessionId);
const completeOnce = await api("DYN-12", "first completion", `/api/sessions/${existingSessionId}`, {
  method: "PATCH",
  owner: ownerA,
  body: { status: "completed" }
});
const completeTwice = await api("DYN-12", "repeated completion", `/api/sessions/${existingSessionId}`, {
  method: "PATCH",
  owner: ownerA,
  body: { status: "completed" }
});
const afterCompletion = await snapshot("DYN-12", "after_repeated_completion", existingSessionId);
const afterCompletedResponse = await api("DYN-12", "post-completion response", `/api/sessions/${existingSessionId}/respond`, {
  method: "POST",
  owner: ownerA,
  body: { overallSupportNeed: "medium", difficultyType: null }
});
const afterConflict = await snapshot("DYN-12", "after_post_completion_conflict", existingSessionId);
addResult("DYN-12", [
  { name: "first_completion_200", pass: completeOnce.response.status === 200 && body(completeOnce)?.session?.status === "completed" },
  { name: "second_completion_200", pass: completeTwice.response.status === 200 && body(completeTwice)?.session?.status === "completed" },
  { name: "post_completion_409", pass: afterCompletedResponse.response.status === 409 },
  { name: "conflict_code", pass: body(afterCompletedResponse)?.error?.code === "SESSION_RESPONSE_CONFLICT" },
  { name: "no_conflict_mutation", pass: JSON.stringify(afterCompletion) === JSON.stringify(afterConflict) },
  { name: "completed_persisted", pass: beforeD12?.status !== "completed" && afterCompletion?.status === "completed" }
]);

const d06Create = await api("DYN-06", "create fresh fade session", "/api/sessions", {
  method: "POST",
  owner: ownerA,
  body: { question: "What is gravity?" }
});
const d06Id = body(d06Create)?.session?.sessionId;
const d06Before = d06Id ? await snapshot("DYN-06", "before", d06Id) : null;
const d06 = d06Id ? await api("DYN-06", "high fade response", `/api/sessions/${d06Id}/respond`, {
  method: "POST",
  owner: ownerA,
  body: { overallSupportNeed: "high", difficultyType: null }
}) : null;
const d06After = d06Id ? await snapshot("DYN-06", "after", d06Id) : null;
addResult("DYN-06", [
  { name: "initial_creation_201", pass: d06Create.response.status === 201 },
  { name: "response_200", pass: d06?.response.status === 200 },
  { name: "route_fade", pass: body(d06)?.route === "fade" },
  { name: "event_zero_to_zero", pass: d06After?.responseEvents?.[0]?.roundBefore === 0 && d06After?.responseEvents?.[0]?.roundAfter === 0 },
  { name: "round_unchanged", pass: d06Before?.adaptationRound === 0 && d06After?.adaptationRound === 0 },
  { name: "no_adaptation", pass: d06After?.adaptations?.length === 0 && body(d06)?.adaptation === null },
  { name: "in_progress", pass: d06After?.status === "in_progress" }
], ["No-provider-call assertion is not directly instrumented; null adaptation, unchanged state, and elapsed time are runtime observations."]);

const d07Create = await api("DYN-07", "create language-support session", "/api/sessions", {
  method: "POST",
  owner: ownerA,
  body: { question: "What is electric current?" }
});
const d07Id = body(d07Create)?.session?.sessionId;
const profileBeforeLanguage = await database.collection("profiles").findOne({ learnerId: ownerA }, { projection: { _id: 0 } });
await logRecord({ recordType: "database_snapshot", caseId: "DYN-07", label: "profile_before", capturedAt: new Date().toISOString(), document: profileBeforeLanguage });
const d07 = d07Id ? await api("DYN-07", "language support response", `/api/sessions/${d07Id}/respond`, {
  method: "POST",
  owner: ownerA,
  body: { overallSupportNeed: "medium", difficultyType: "language_terms" }
}) : null;
const d07After = d07Id ? await snapshot("DYN-07", "session_after", d07Id) : null;
const profileAfterLanguage = await database.collection("profiles").findOne({ learnerId: ownerA }, { projection: { _id: 0 } });
await logRecord({ recordType: "database_snapshot", caseId: "DYN-07", label: "profile_after", capturedAt: new Date().toISOString(), document: profileAfterLanguage });
addResult("DYN-07", [
  { name: "initial_creation_201", pass: d07Create.response.status === 201 },
  { name: "response_200", pass: d07?.response.status === 200 },
  { name: "route_language_support", pass: body(d07)?.route === "language_support" },
  { name: "support_clarification", pass: body(d07)?.adaptation?.supportType === "clarification" },
  { name: "bilingual_override", pass: body(d07)?.adaptation?.presentationOverride === "bilingual" },
  { name: "bilingual_content", pass: Boolean(body(d07)?.adaptation?.content?.en) && Boolean(body(d07)?.adaptation?.content?.my) },
  { name: "event_zero_to_one", pass: d07After?.responseEvents?.[0]?.roundBefore === 0 && d07After?.responseEvents?.[0]?.roundAfter === 1 },
  { name: "profile_unchanged", pass: JSON.stringify(profileBeforeLanguage?.preferences) === JSON.stringify(profileAfterLanguage?.preferences) }
]);

const d08Create = await api("DYN-08", "create ambiguous term session", "/api/sessions", {
  method: "POST",
  owner: ownerA,
  body: { question: "What is a cell?" }
});
const d08Id = body(d08Create)?.session?.sessionId;
const d08Before = d08Id ? await snapshot("DYN-08", "before", d08Id) : null;
const d08 = d08Id ? await api("DYN-08", "bounded reinterpretation", `/api/sessions/${d08Id}/respond`, {
  method: "POST",
  owner: ownerA,
  body: {
    overallSupportNeed: "needs_support",
    difficultyType: "concept_mismatch",
    conceptClarification: "I mean a biological cell"
  }
}) : null;
const d08After = d08Id ? await snapshot("DYN-08", "after", d08Id) : null;
const d08Outcome = body(d08)?.correctionOutcome;
addResult("DYN-08", [
  { name: "initial_creation_201", pass: d08Create.response.status === 201 },
  { name: "response_200", pass: d08?.response.status === 200 },
  { name: "route_context_reinterpretation", pass: body(d08)?.route === "context_reinterpretation" },
  { name: "controlled_outcome", pass: ["corrected", "ambiguous"].includes(d08Outcome) },
  { name: "trace_persisted", pass: Boolean(d08After?.responseEvents?.[0]?.conceptReinterpretation) },
  { name: "clarification_persisted", pass: d08After?.responseEvents?.[0]?.conceptReinterpretation?.clarification === "I mean a biological cell" },
  { name: "event_zero_to_one", pass: d08Before?.adaptationRound === 0 && d08After?.adaptationRound === 1 }
]);

const timingQuestions = [
  ["PHOTO", "What is photosynthesis, and how do plants make food?"],
  ["GRAV", "What is gravity?"],
  ["CURRENT", "What is electric current?"],
  ["INHERIT", "What is inheritance in object-oriented programming?"],
  ["PH", "What is pH?"]
];

for (const [code, question] of timingQuestions) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const caseId = `TIM-${code}-${String(attempt).padStart(2, "0")}`;
    const record = await api(caseId, "fresh initial generation timing", "/api/sessions", {
      method: "POST",
      owner: ownerA,
      body: { question }
    });
    timingRows.push({
      caseId,
      question,
      attempt,
      startedAt: record.startedAt,
      elapsedMs: record.elapsedMs,
      status: record.response.status,
      outcome: record.response.status === 201 ? "success" : record.response.error ? "transport_error" : "http_failure",
      retryOf: "",
      environment: "B01 local Next.js dev; isolated MongoDB; live configured provider"
    });
  }
}

const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const timingHeader = ["case_id", "question", "attempt", "started_at", "elapsed_ms", "http_status", "outcome", "retry_of", "environment"];
const timingLines = [timingHeader.map(csvCell).join(",")];
for (const row of timingRows) {
  timingLines.push([
    row.caseId,
    row.question,
    row.attempt,
    row.startedAt,
    row.elapsedMs,
    row.status,
    row.outcome,
    row.retryOf,
    row.environment
  ].map(csvCell).join(","));
}
await writeFile(timingsPath, `${timingLines.join("\n")}\n`, "utf8");

const summary = {
  runId: "RUN-B01-20261001-DYNAMIC-01",
  baseline: "B01-A5-EVALUATION",
  executableCommit: "37faefa236829aa3d79e023faa1fb72a086b5c2a",
  protocolVersion: "2.1",
  dependencyMode: "local Next.js dev, isolated real MongoDB, live configured provider",
  generatedAt: new Date().toISOString(),
  ownerAliases: {
    "DYN-OWNER-A": ownerA,
    "DYN-OWNER-B": ownerB
  },
  cases: caseResults,
  timings: timingRows
};
await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
await mongoose.disconnect();

console.log(JSON.stringify({
  runId: summary.runId,
  caseOutcomes: Object.fromEntries(caseResults.map((result) => [result.caseId, result.outcome])),
  timingAttempts: timingRows.length,
  timingSuccesses: timingRows.filter((row) => row.outcome === "success").length,
  rawPath,
  summaryPath,
  timingsPath
}, null, 2));
