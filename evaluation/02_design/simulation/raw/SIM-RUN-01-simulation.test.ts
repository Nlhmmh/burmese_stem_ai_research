import { it, expect } from "vitest";
import { createRequire } from "node:module";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, appendFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { NextRequest } from "next/server";
import { POST as createSession } from "@/app/api/sessions/route";
import { POST as respond } from "@/app/api/sessions/[sessionId]/respond/route";
import { PATCH as complete, GET as retrieve } from "@/app/api/sessions/[sessionId]/route";
import { updatePreferences } from "@/data/dao/profile.dao";
import { connectMongoDB } from "@/data/mongodb";
import { ProfileModel, SessionModel } from "@/data/schema";

const rawDir = fileURLToPath(new URL("./", import.meta.url));
const applicationRoot = fileURLToPath(new URL("../../../../burmese_stem_ai/", import.meta.url));
const req = createRequire(`${applicationRoot}package.json`);
const databaseUrl = process.env.TEST_MONGODB_URI!;
req("@next/env").loadEnvConfig(applicationRoot, true);
process.env.DB_URL = databaseUrl; // Never connect to the application's configured database.
const runId = "RUN-B01-20261001-SIMULATION-02";
const referenceHash = createHash("sha256").update(readFileSync(`${rawDir}../content_reference_notes.md`)).digest("hex");
const questions = [
  "What is photosynthesis, and how do plants make food?", "What is DNA?", "What is osmosis?",
  "What is gravity?", "What is electric current?", "What is momentum?",
  "What is pH?", "What is an ion?", "What is a catalyst?",
  "What is inheritance in object-oriented programming?", "What is an algorithm?", "What is carbon fibre?",
  "What is a cell?", "What is current?", "What is a network?", "What is inheritance?"
];
const clarifications = ["I mean a biological cell", "I mean electric current", "I mean a computer network", "I mean inheritance in object-oriented programming"];
const preferences = { uiLanguage: "en", supportLanguage: "bilingual", explanationLevel: "beginner", learningStyle: "guided", theme: "light" };
const cases = questions.flatMap((question, i) => ["A", "B", "C"].map(path => ({
  id: `SIM${String(i + 1).padStart(2, "0")}-${path}`, base: `SIM${String(i + 1).padStart(2, "0")}`, path, question, language: "bilingual", clarification: null as string | null
}))).concat(["bilingual", "english", "burmese"].map((language, i) => ({
  id: `SIM-LANG-0${i + 1}`, base: "SIM05", path: "LANG", question: questions[4], language, clarification: null
})), clarifications.map((clarification, i) => ({
  id: `SIM-CM-${i + 13}`, base: `SIM${i + 13}`, path: "CM", question: questions[i + 12], language: "bilingual", clarification
})));

type RecordData = Record<string, any>;
const results: RecordData[] = [];
let currentCase = "", currentStep = "", providerCount = 0;
function save(name: string, value: unknown) { writeFileSync(`${rawDir}${name}`, JSON.stringify(value, null, 2) + "\n"); }
function same(a: unknown, b: unknown) { return isDeepStrictEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b))); }
function check(record: RecordData, name: string, condition: boolean, observed: unknown) {
  record.checks.push({ step: currentStep, name, pass: Boolean(condition), observed });
  if (!condition) throw new Error(`Assertion failed: ${name}`);
}
async function snapshot(owner: string) { return SessionModel.find({ learnerId: owner }).lean(); }
function request(owner: string, body: unknown, method = "POST") {
  return new NextRequest("http://simulation.local/api/sessions", {
    method, headers: { "x-learner-id": owner, "content-type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
}
async function invoke(record: RecordData, step: string, handler: any, body: unknown, sessionId?: string, method = "POST") {
  currentStep = step;
  const before = await snapshot(record.owner), callsBefore = providerCount, start = Date.now();
  const response = await handler(request(record.owner, body, method), { params: Promise.resolve({ sessionId }) });
  const payload = await response.json();
  const item = { step, request: body ?? null, httpStatus: response.status, response: payload,
    before, after: await snapshot(record.owner), providerCalls: providerCount - callsBefore, elapsedMs: Date.now() - start };
  record.steps.push(item);
  return item;
}
async function responseStep(record: RecordData, sessionId: string, step: string, need: string, difficulty: string | null,
  route: string, beforeRound: number, afterRound: number, supportType: string | null, clarification?: string) {
  const item = await invoke(record, step, respond, { overallSupportNeed: need, difficultyType: difficulty,
    ...(clarification ? { conceptClarification: clarification } : {}) }, sessionId);
  check(record, "response HTTP 200", item.httpStatus === 200, item.httpStatus);
  const body = item.response, stored = item.after[0] as any, old = item.before[0] as any;
  const trace = body.responseEvent;
  check(record, "application-selected route", body.route === route && trace?.route === route, body.route);
  check(record, "round before/after", trace?.roundBefore === beforeRound && trace?.roundAfter === afterRound && stored.adaptationRound === afterRound, trace);
  check(record, "one atomic response event", stored.responseEvents.length === old.responseEvents.length + 1 &&
    same(stored.responseEvents.at(-1), trace), stored.responseEvents);
  check(record, "provider-call bound", item.providerCalls === (supportType === null ? 0 : 1), item.providerCalls);
  check(record, "adaptation count bound", stored.adaptations.length === old.adaptations.length + (supportType === null ? 0 : 1) && stored.adaptations.length <= 2, stored.adaptations.length);
  check(record, "round never exceeds two", stored.adaptationRound <= 2, stored.adaptationRound);
  check(record, "status", body.status === (need !== "high" && afterRound === 2 ? "review_recommended" : "in_progress") && stored.status === body.status, body.status);
  check(record, "self-report stored without changing follow-up state", stored.understanding === need && stored.followUps.length === old.followUps.length, stored.understanding);
  if (supportType !== null) {
    check(record, "support type and route persisted", body.adaptation?.supportType === supportType && stored.adaptations.at(-1).supportType === supportType && stored.responseEvents.at(-1).route === route, body.adaptation);
    check(record, "both content fields nonempty", Boolean(body.adaptation.content.en?.trim() && body.adaptation.content.my?.trim()), true);
  } else check(record, "no adaptation returned", body.adaptation === null, body.adaptation);
  return item;
}

it("accounts for every fixed live simulation attempt; human content judgement remains pending", async () => {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your-key-here") throw new Error("Live provider credentials unavailable (not recorded)");
  if (existsSync(`${rawDir}SIM-RUN-01-results.jsonl`)) throw new Error("Refusing to overwrite evidence");
  await connectMongoDB();
  await Promise.all([SessionModel.init(), ProfileModel.init()]);
  expect(await SessionModel.countDocuments()).toBe(0);
  expect(await ProfileModel.countDocuments()).toBe(0);
  const metadata = { runId, startedAt: new Date().toISOString(), baseline: "B01-A5-EVALUATION",
    baselineCommit: "37faefa236829aa3d79e023faa1fb72a086b5c2a", referenceHash,
    configuredModel: process.env.OPENAI_MODEL || "gpt-5.4-mini", node: process.version,
    mongoVersion: (await SessionModel.db.db!.admin().serverInfo()).version, database: "burmese_stem_simulation_test",
    mode: "real Next route handlers and DAOs; isolated MongoDB; live provider; injected synthetic learner identity; no browser/middleware/network HTTP server",
    uiLocale: "en (profile snapshot only; no browser)", timeoutMs: 20000, automaticRetries: false,
    providerSettings: "store=false; strict json_schema; application default temperature/reasoning; no custom sampling settings",
    plannedCore: 48, plannedAdditional: 7, humanAssessor: "", competence: "", humanReviewDate: "" };
  save("SIM-RUN-01-metadata.json", metadata);
  const actualFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    if (String(url) !== "https://api.openai.com/v1/responses") return actualFetch(url, options);
    providerCount++;
    const capture: RecordData = { caseId: currentCase, step: currentStep, call: providerCount,
      startedAt: new Date().toISOString(), request: JSON.parse(String(options?.body)) };
    const started = Date.now();
    try {
      const response = await actualFetch(url, options);
      capture.httpStatus = response.status;
      const data = await response.clone().json();
      capture.response = response.ok ? data : { id: data.id ?? null, error: { type: data.error?.type, code: data.error?.code } };
      return response;
    } catch (error) { capture.transportError = error instanceof Error ? error.name : "UnknownError"; throw error; }
    finally { capture.elapsedMs = Date.now() - started; appendFileSync(`${rawDir}SIM-RUN-01-provider.jsonl`, JSON.stringify(capture) + "\n"); }
  };
  try {
    for (const spec of cases) {
      currentCase = spec.id; currentStep = "prepare";
      const record: RecordData = { ...spec, runId, attempt: 1, owner: randomUUID(), startedAt: new Date().toISOString(),
        preferences: { ...preferences, supportLanguage: spec.language }, steps: [], checks: [],
        executionStatus: "Executed", technicalOutcome: "", contentOutcome: "Not assessed", humanScores: {}, assessor: "", reference: "", limitations: [] };
      const callsBefore = providerCount;
      try {
        await updatePreferences(record.owner, record.preferences);
        record.profileBefore = await ProfileModel.findOne({ learnerId: record.owner }).lean();
        const initial = await invoke(record, "initial", createSession, { question: spec.question });
        check(record, "exactly one initial provider call", initial.providerCalls === 1, initial.providerCalls);
        if (initial.httpStatus === 422 && initial.response.error?.code === "AMBIGUOUS_STEM_CONTEXT") {
          check(record, "ambiguous output creates no session", initial.after.length === 0, initial.after.length);
          check(record, "ambiguity belongs to fixed ambiguous corpus", Number(spec.base.slice(3)) >= 13, spec.base);
          record.technicalOutcome = "Controlled ambiguity";
          record.pathOutcome = "Not applicable: no session";
          record.limitations.push("Initial clarification is returned without creating a session; no response/correction endpoint can operate on this attempt.");
        } else {
          check(record, "initial HTTP 201", initial.httpStatus === 201, initial.httpStatus);
          const session = initial.response.session, sessionId = session.sessionId;
          record.sessionId = sessionId;
          check(record, "fresh initial state persisted", initial.after.length === 1 && initial.after[0].adaptationRound === 0 && initial.after[0].responseEvents.length === 0 && initial.after[0].adaptations.length === 0, sessionId);
          check(record, "profile snapshot persisted", same(initial.after[0].preferencesSnapshot, record.profileBefore.preferences), initial.after[0].preferencesSnapshot);
          if (Number(spec.base.slice(3)) >= 13) record.limitations.push("Human must assess explicit qualification of the initial ambiguous-term interpretation; 201 is not an F2 content pass.");
          if (spec.path === "A") {
            await responseStep(record, sessionId, "high", "high", null, "fade", 0, 0, null);
          } else if (spec.path === "B") {
            await responseStep(record, sessionId, "medium_skip", "medium", null, "stage_5_scaffold", 0, 1, "another_example");
            await responseStep(record, sessionId, "high", "high", null, "fade", 1, 1, null);
          } else if (spec.path === "C") {
            await responseStep(record, sessionId, "simpler", "needs_support", "simpler_explanation", "stage_5_scaffold", 0, 1, "simpler_explanation");
            await responseStep(record, sessionId, "conceptual", "needs_support", "concept_unclear", "concept_clarification", 1, 2, "concept_clarification");
            await responseStep(record, sessionId, "cap", "needs_support", null, "stage_5_scaffold", 2, 2, null);
          } else if (spec.path === "LANG") {
            const item = await responseStep(record, sessionId, "language", "medium", "language_terms", "language_support", 0, 1, "clarification");
            check(record, "bilingual presentation override persisted", item.response.adaptation.presentationOverride === "bilingual" && item.after[0].adaptations[0].presentationOverride === "bilingual", item.response.adaptation.presentationOverride);
            record.limitations.push("Payload and override checked; browser display and language quality require separate assessment.");
          } else {
            // A fresh, unchanged ambiguous query is used. Never seed a fabricated initial interpretation.
            const item = await invoke(record, "concept_mismatch", respond, { overallSupportNeed: "medium", difficultyType: "concept_mismatch", conceptClarification: spec.clarification }, sessionId);
            check(record, "concept response HTTP 200", item.httpStatus === 200, item.httpStatus);
            const body = item.response, stored = item.after[0] as any, trace = stored.responseEvents.at(-1).conceptReinterpretation;
            check(record, "bounded correction outcome", ["corrected", "ambiguous"].includes(body.correctionOutcome), body.correctionOutcome);
            check(record, "correction route and call bound", body.route === "context_reinterpretation" && item.providerCalls === 1, body.route);
            check(record, "previous/current trace persisted", trace?.outcome === body.correctionOutcome && same(trace.previous, item.before[0].concept) && same(trace.current, stored.concept), trace);
            check(record, "one correction event", stored.responseEvents.length === 1, stored.responseEvents.length);
            check(record, "bounded correction/clarification consumes one generated adaptation", stored.adaptationRound === 1 && stored.adaptations.length === 1 && body.responseEvent.roundBefore === 0 && body.responseEvent.roundAfter === 1, stored.adaptationRound);
            if (body.correctionOutcome === "ambiguous") check(record, "ambiguous correction keeps concept", same(stored.concept, item.before[0].concept), stored.concept);
            else check(record, "corrected downstream content present", Boolean(body.adaptation?.content.en?.trim() && body.adaptation?.content.my?.trim()), body.adaptation);
          }
          if (["A", "B"].includes(spec.path)) {
            const finish = await invoke(record, "finish", complete, { status: "completed" }, sessionId, "PATCH");
            check(record, "explicit finish completed without generation", finish.httpStatus === 200 && finish.after[0].status === "completed" && finish.providerCalls === 0, finish.httpStatus);
          }
          const reload = await invoke(record, "retrieve", retrieve, undefined, sessionId, "GET");
          check(record, "retrieval reconstructs persisted route history", reload.httpStatus === 200 &&
            same(reload.response.session.responseEvents, reload.after[0].responseEvents) &&
            reload.response.session.adaptations.length === reload.after[0].adaptations.length && reload.providerCalls === 0, reload.httpStatus);
          record.technicalOutcome = "Pass";
          record.pathOutcome = "Pass";
        }
        record.profileAfter = await ProfileModel.findOne({ learnerId: record.owner }).lean();
        check(record, "saved profile unchanged", same(record.profileBefore.preferences, record.profileAfter.preferences), record.profileAfter.preferences);
      } catch (error) {
        record.technicalOutcome = "Fail"; record.pathOutcome = "Incomplete";
        record.failure = error instanceof Error ? error.message : "Unexpected evaluation failure";
        record.limitations.push("No automatic retry; subsequent dependent steps were not claimed passed.");
      }
      record.finalStoredState = await snapshot(record.owner);
      record.providerCalls = providerCount - callsBefore; record.finishedAt = new Date().toISOString();
      results.push(record);
      appendFileSync(`${rawDir}SIM-RUN-01-results.jsonl`, JSON.stringify(record) + "\n");
      console.log(`SIM_PROGRESS ${results.length}/55 ${spec.id} ${record.technicalOutcome} calls=${record.providerCalls}`);
    }
  } finally { globalThis.fetch = actualFetch; }
  metadata["finishedAt"] = new Date().toISOString();
  metadata["providerCalls"] = providerCount;
  metadata["summary"] = results.reduce((acc: any, row) => { acc[row.technicalOutcome] = (acc[row.technicalOutcome] ?? 0) + 1; return acc; }, {});
  save("SIM-RUN-01-metadata.json", metadata);
  save("SIM-RUN-01-database-snapshot.json", { profiles: await ProfileModel.find().lean(), sessions: await SessionModel.find().lean() });
  expect(results).toHaveLength(55);
  expect(new Set(results.map(row => row.id)).size).toBe(55);
  console.log(`SIM_SUMMARY ${JSON.stringify(metadata["summary"])}`);
  // Suite success means complete accounting, NOT every live case passed or content was adequate.
});
