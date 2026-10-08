import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const mocks = vi.hoisted(() => ({
  askSessionFollowUp: vi.fn(),
  completeLearningSession: vi.fn(),
  createLearningSession: vi.fn(),
  findSessionsByLearner: vi.fn(),
  getLearningSession: vi.fn(),
  getOrCreateProfile: vi.fn(),
  respondToLearningSession: vi.fn()
}));

vi.mock("@/data/dao/session.dao", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/data/dao/session.dao")>()),
  findSessionsByLearner: mocks.findSessionsByLearner
}));

vi.mock("@/data/dao/profile.dao", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/data/dao/profile.dao")>()),
  getOrCreateProfile: mocks.getOrCreateProfile
}));

vi.mock("@/services/session.service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/services/session.service")>()),
  createLearningSession: mocks.createLearningSession
}));

vi.mock("@/services/session-lifecycle.service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/services/session-lifecycle.service")>()),
  getLearningSession: mocks.getLearningSession,
  completeLearningSession: mocks.completeLearningSession
}));

vi.mock("@/services/adaptation.service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/services/adaptation.service")>()),
  respondToLearningSession: mocks.respondToLearningSession
}));

vi.mock("@/services/followup.service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/services/followup.service")>()),
  askSessionFollowUp: mocks.askSessionFollowUp
}));

import { GET as listSessions, POST as createSession } from "@/app/api/sessions/route";
import {
  GET as getSession,
  PATCH as completeSession
} from "@/app/api/sessions/[sessionId]/route";
import { POST as respond } from "@/app/api/sessions/[sessionId]/respond/route";
import { POST as followUp } from "@/app/api/sessions/[sessionId]/followup/route";
import {
  AdaptationGenerationError,
  SessionNotFoundError,
  SessionResponseConflictError
} from "@/services/adaptation.service";
import {
  FollowUpGenerationError,
  FollowUpLimitError,
  FollowUpOutOfScopeError,
  FollowUpSessionNotFoundError
} from "@/services/followup.service";
import {
  SessionDetailNotFoundError,
  SessionLifecycleConflictError
} from "@/services/session-lifecycle.service";
import {
  SessionGenerationError,
  SessionScopeError
} from "@/services/session.service";
import { InvalidAdaptationRouteInputError } from "@/services/adaptation-routing.service";

const sessionId = "2fba6e7a-1225-4d1f-971f-5ae58704e3d5";
const learnerId = "route-owner";

describe("refined public API contracts", () => {
  beforeEach(() => {
    Object.values(mocks).forEach((mock) => mock.mockReset());
    mocks.getOrCreateProfile.mockResolvedValue({
      learnerId,
      preferences: makeSessionRecord().preferencesSnapshot
    });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  describe("session collection", () => {
    it("lists only the sessions returned for the required learner identity", async () => {
      const sessions = [{ sessionId, status: "in_progress" }];
      mocks.findSessionsByLearner.mockResolvedValue(sessions);

      const response = await listSessions(request("/api/sessions"));

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({ sessions });
      expect(mocks.findSessionsByLearner).toHaveBeenCalledWith(learnerId);
    });

    it("returns controlled collection errors for absent identity and database failure", async () => {
      const missingIdentity = await listSessions(request("/api/sessions", { identity: false }));
      expect(missingIdentity.status).toBe(400);
      await expect(missingIdentity.json()).resolves.toMatchObject({
        error: { code: "LEARNER_IDENTITY_UNAVAILABLE" }
      });

      mocks.findSessionsByLearner.mockRejectedValue(new Error("database connection details"));
      const failed = await listSessions(request("/api/sessions"));
      expect(failed.status).toBe(500);
      const body = await failed.json();
      expect(body).toEqual({
        error: { code: "SESSION_LIST_FAILED", message: "Unable to load learning sessions" }
      });
      expect(JSON.stringify(body)).not.toContain("connection details");
    });

    it("creates a session and returns only the public initial-session projection", async () => {
      const session = makeSessionRecord({ learnerId });
      mocks.createLearningSession.mockResolvedValue(session);

      const response = await createSession(
        request("/api/sessions", { method: "POST", body: { question: "  What is pH?  " } })
      );
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(mocks.createLearningSession).toHaveBeenCalledWith(
        learnerId,
        "What is pH?",
        makeSessionRecord().preferencesSnapshot
      );
      expect(body.session).toMatchObject({
        sessionId: session.sessionId,
        concept: session.concept,
        adaptationRound: 0,
        status: "in_progress"
      });
      expect(body.session).not.toHaveProperty("learnerId");
      expect(body.session).not.toHaveProperty("preferencesSnapshot");
    });

    it.each([
      [new SessionScopeError("AMBIGUOUS_STEM_CONTEXT", "Please clarify the domain"), 422, "AMBIGUOUS_STEM_CONTEXT"],
      [new SessionScopeError("OUTSIDE_STEM_SCOPE", "Ask about STEM"), 422, "OUTSIDE_STEM_SCOPE"],
      [new SessionGenerationError("provider detail"), 502, "SESSION_GENERATION_FAILED"],
      [new Error("database detail"), 500, "SESSION_CREATION_FAILED"]
    ] as const)("maps a creation failure to %s", async (error, status, code) => {
      mocks.createLearningSession.mockRejectedValue(error);
      const response = await createSession(
        request("/api/sessions", { method: "POST", body: { question: "What is pH?" } })
      );
      expect(response.status).toBe(status);
      const body = await response.json();
      expect(body.error.code).toBe(code);
      expect(JSON.stringify(body)).not.toContain("provider detail");
      expect(JSON.stringify(body)).not.toContain("database detail");
    });

    it("rejects malformed JSON and missing identity before session generation", async () => {
      const malformed = await createSession(
        request("/api/sessions", { method: "POST", rawBody: "{" })
      );
      expect(malformed.status).toBe(400);
      await expect(malformed.json()).resolves.toMatchObject({
        error: { code: "INVALID_SESSION_REQUEST" }
      });

      const missingIdentity = await createSession(
        request("/api/sessions", {
          method: "POST",
          body: { question: "What is pH?" },
          identity: false
        })
      );
      expect(missingIdentity.status).toBe(400);
      await expect(missingIdentity.json()).resolves.toMatchObject({
        error: { code: "LEARNER_IDENTITY_UNAVAILABLE" }
      });
      expect(mocks.createLearningSession).not.toHaveBeenCalled();
    });
  });

  describe("session detail and completion", () => {
    it("returns a stable error for an unexpected completion write failure", async () => {
      mocks.completeLearningSession.mockRejectedValueOnce(new Error("private database diagnostic"));
      const result = await completeSession(request(`/api/sessions/${sessionId}`, { method: "PATCH", body: { status: "completed" } }), context());
      expect(result.status).toBe(500);
      expect(await result.json()).toEqual({ error: { code: "SESSION_UPDATE_FAILED", message: "Unable to update session" } });
    });
    it("rejects missing identity and an invalid detail UUID before lookup", async () => {
      const missingIdentity = await getSession(
        request(`/api/sessions/${sessionId}`, { identity: false }),
        context()
      );
      expect(missingIdentity.status).toBe(400);
      await expect(missingIdentity.json()).resolves.toMatchObject({
        error: { code: "LEARNER_IDENTITY_UNAVAILABLE" }
      });

      const invalidId = await getSession(
        request("/api/sessions/not-a-uuid"),
        context("not-a-uuid")
      );
      expect(invalidId.status).toBe(400);
      await expect(invalidId.json()).resolves.toMatchObject({
        error: { code: "INVALID_SESSION_ID" }
      });
      expect(mocks.getLearningSession).not.toHaveBeenCalled();
    });

    it("maps detail lookup and unexpected retrieval failures", async () => {
      mocks.getLearningSession.mockRejectedValueOnce(
        new SessionDetailNotFoundError("Learning session was not found")
      );
      const missing = await getSession(request(`/api/sessions/${sessionId}`), context());
      expect(missing.status).toBe(404);
      await expect(missing.json()).resolves.toMatchObject({
        error: { code: "SESSION_NOT_FOUND" }
      });

      mocks.getLearningSession.mockRejectedValueOnce(new Error("database detail"));
      const failed = await getSession(request(`/api/sessions/${sessionId}`), context());
      expect(failed.status).toBe(500);
      await expect(failed.json()).resolves.toEqual({
        error: { code: "SESSION_RETRIEVAL_FAILED", message: "Unable to load learning session" }
      });
    });

    it("completes a valid session and maps validation and conflict errors", async () => {
      const completed = makeSessionRecord({ learnerId, status: "completed" });
      mocks.completeLearningSession.mockResolvedValue(completed);
      const success = await completeSession(
        request(`/api/sessions/${sessionId}`, { method: "PATCH", body: { status: "completed" } }),
        context()
      );
      expect(success.status).toBe(200);
      await expect(success.json()).resolves.toMatchObject({ session: { status: "completed" } });

      const invalid = await completeSession(
        request(`/api/sessions/${sessionId}`, { method: "PATCH", body: { status: "adapted" } }),
        context()
      );
      expect(invalid.status).toBe(400);
      await expect(invalid.json()).resolves.toMatchObject({
        error: { code: "INVALID_SESSION_UPDATE" }
      });

      mocks.completeLearningSession.mockRejectedValueOnce(
        new SessionLifecycleConflictError("Concurrent update")
      );
      const conflict = await completeSession(
        request(`/api/sessions/${sessionId}`, { method: "PATCH", body: { status: "completed" } }),
        context()
      );
      expect(conflict.status).toBe(409);
      await expect(conflict.json()).resolves.toMatchObject({
        error: { code: "SESSION_LIFECYCLE_CONFLICT" }
      });

      const malformed = await completeSession(
        request(`/api/sessions/${sessionId}`, { method: "PATCH", rawBody: "{" }),
        context()
      );
      expect(malformed.status).toBe(400);
      await expect(malformed.json()).resolves.toMatchObject({
        error: { code: "INVALID_SESSION_UPDATE" }
      });
    });
  });

  describe("respond route", () => {
    it("maps a route-selector rejection into a controlled public envelope", async () => {
      mocks.respondToLearningSession.mockRejectedValueOnce(new InvalidAdaptationRouteInputError("A difficulty type cannot accompany a high support-need response"));
      const result = await respond(request(`/api/sessions/${sessionId}/respond`, { method: "POST", body: { overallSupportNeed: "high" } }), context());
      expect(result.status).toBe(400);
      expect(await result.json()).toEqual({ error: { code: "INVALID_ADAPTATION_ROUTE", message: "A difficulty type cannot accompany a high support-need response" } });
    });
    it("requires learner identity before parsing a response", async () => {
      const response = await respond(
        request(`/api/sessions/${sessionId}/respond`, {
          method: "POST",
          rawBody: "{",
          identity: false
        }),
        context()
      );
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "LEARNER_IDENTITY_UNAVAILABLE" }
      });
    });

    it("accepts the refined response shape and returns the selected route trace", async () => {
      mocks.respondToLearningSession.mockResolvedValue({
        understanding: "medium",
        status: "in_progress",
        adaptationRound: 1,
        route: "language_support",
        responseEvent: {
          overallSupportNeed: "medium",
          difficultyType: "language_terms",
          route: "language_support",
          roundBefore: 0,
          roundAfter: 1
        },
        adaptation: { supportType: "clarification" }
      });
      const response = await respond(
        request(`/api/sessions/${sessionId}/respond`, {
          method: "POST",
          body: { overallSupportNeed: "medium", difficultyType: "language_terms" }
        }),
        context()
      );

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toMatchObject({ route: "language_support" });
      expect(mocks.respondToLearningSession).toHaveBeenCalledWith(
        learnerId,
        sessionId,
        "medium",
        "language_terms",
        null
      );
    });

    it.each([
      [new SessionNotFoundError("Not found"), 404, "SESSION_NOT_FOUND"],
      [new SessionResponseConflictError("Concurrent response"), 409, "SESSION_RESPONSE_CONFLICT"],
      [new AdaptationGenerationError("provider detail"), 502, "ADAPTATION_GENERATION_FAILED"],
      [new Error("database detail"), 500, "SESSION_RESPONSE_FAILED"]
    ] as const)("maps a response failure to %s", async (error, status, code) => {
      mocks.respondToLearningSession.mockRejectedValue(error);
      const response = await respond(
        request(`/api/sessions/${sessionId}/respond`, {
          method: "POST",
          body: { overallSupportNeed: "medium" }
        }),
        context()
      );
      expect(response.status).toBe(status);
      const body = await response.json();
      expect(body.error.code).toBe(code);
      expect(JSON.stringify(body)).not.toContain("provider detail");
      expect(JSON.stringify(body)).not.toContain("database detail");
    });

    it("rejects malformed JSON and invalid High-with-difficulty input", async () => {
      const malformed = await respond(
        request(`/api/sessions/${sessionId}/respond`, { method: "POST", rawBody: "{" }),
        context()
      );
      expect(malformed.status).toBe(400);
      await expect(malformed.json()).resolves.toMatchObject({
        error: { code: "INVALID_UNDERSTANDING_RESPONSE" }
      });

      const invalid = await respond(
        request(`/api/sessions/${sessionId}/respond`, {
          method: "POST",
          body: { overallSupportNeed: "high", difficultyType: "another_example" }
        }),
        context()
      );
      expect(invalid.status).toBe(400);
      await expect(invalid.json()).resolves.toMatchObject({
        error: { code: "INVALID_UNDERSTANDING_RESPONSE" }
      });
      expect(mocks.respondToLearningSession).not.toHaveBeenCalled();
    });
  });

  describe("follow-up route", () => {
    it("requires learner identity before parsing a follow-up", async () => {
      const response = await followUp(
        request(`/api/sessions/${sessionId}/followup`, {
          method: "POST",
          rawBody: "{",
          identity: false
        }),
        context()
      );
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "LEARNER_IDENTITY_UNAVAILABLE" }
      });
    });

    it("returns a persisted concept-scoped follow-up", async () => {
      const result = {
        question: "Why does it matter?",
        answer: { en: "Because...", my: "အကြောင်းမှာ..." }
      };
      mocks.askSessionFollowUp.mockResolvedValue(result);
      const response = await followUp(
        request(`/api/sessions/${sessionId}/followup`, {
          method: "POST",
          body: { question: " Why does it matter? " }
        }),
        context()
      );
      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({ followUp: result });
      expect(mocks.askSessionFollowUp).toHaveBeenCalledWith(
        learnerId,
        sessionId,
        "Why does it matter?"
      );
    });

    it.each([
      [new FollowUpSessionNotFoundError("Not found"), 404, "SESSION_NOT_FOUND", false],
      [new FollowUpLimitError("Limit reached"), 409, "FOLLOW_UP_LIMIT_REACHED", false],
      [new FollowUpOutOfScopeError("Start a new session"), 422, "FOLLOW_UP_OUT_OF_SCOPE", true],
      [new FollowUpGenerationError("provider detail"), 502, "FOLLOW_UP_GENERATION_FAILED", false],
      [new Error("database detail"), 500, "FOLLOW_UP_FAILED", false]
    ] as const)("maps a follow-up failure to %s", async (error, status, code, recommendsNew) => {
      mocks.askSessionFollowUp.mockRejectedValue(error);
      const response = await followUp(
        request(`/api/sessions/${sessionId}/followup`, {
          method: "POST",
          body: { question: "Why?" }
        }),
        context()
      );
      expect(response.status).toBe(status);
      const body = await response.json();
      expect(body.error.code).toBe(code);
      if (recommendsNew) expect(body.newSessionRecommended).toBe(true);
      expect(JSON.stringify(body)).not.toContain("provider detail");
      expect(JSON.stringify(body)).not.toContain("database detail");
    });

    it("rejects malformed follow-up JSON before calling the service", async () => {
      const response = await followUp(
        request(`/api/sessions/${sessionId}/followup`, { method: "POST", rawBody: "{" }),
        context()
      );
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "INVALID_FOLLOW_UP_REQUEST" }
      });
      expect(mocks.askSessionFollowUp).not.toHaveBeenCalled();
    });
  });
});

function request(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    rawBody?: string;
    identity?: boolean;
  } = {}
): NextRequest {
  const headers = new Headers();
  if (options.identity !== false) headers.set("x-learner-id", learnerId);
  if (options.body !== undefined || options.rawBody !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  return new NextRequest(`http://localhost${path}`, {
    method: options.method ?? "GET",
    headers,
    ...(options.body !== undefined
      ? { body: JSON.stringify(options.body) }
      : options.rawBody !== undefined
        ? { body: options.rawBody }
        : {})
  });
}

function context(id = sessionId) {
  return { params: Promise.resolve({ sessionId: id }) };
}
