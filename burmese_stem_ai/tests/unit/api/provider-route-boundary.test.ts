import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LLM_TIMEOUT_MS } from "@/services/llm-provider";
import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  findSession: vi.fn(),
  recordSessionResponse: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  findSession: daoMocks.findSession,
  recordSessionResponse: daoMocks.recordSessionResponse
}));

import { POST } from "@/app/api/sessions/[sessionId]/respond/route";

describe("provider route error boundary", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => vi.useRealTimers());

  it("returns a stable code without provider details or persistence", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockResolvedValue({ ok: false, status: 503 });

    const response = await postResponse(session.learnerId, session.sessionId);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      error: {
        code: "ADAPTATION_GENERATION_FAILED",
        message: "Unable to prepare additional support right now"
      }
    });
    expect(JSON.stringify(body)).not.toContain("503");
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });

  it("maps provider timeout to the same safe code without persistence", async () => {
    vi.useFakeTimers();
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("provider timeout detail");
            error.name = "AbortError";
            reject(error);
          });
        })
    );

    const responsePromise = postResponse(session.learnerId, session.sessionId);
    await vi.advanceTimersByTimeAsync(LLM_TIMEOUT_MS);
    const response = await responsePromise;

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "ADAPTATION_GENERATION_FAILED",
        message: "Unable to prepare additional support right now"
      }
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });
});

function postResponse(learnerId: string, sessionId: string) {
  return POST(
    new NextRequest(`http://localhost/api/sessions/${sessionId}/respond`, {
      method: "POST",
      headers: {
        "x-learner-id": learnerId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ overallSupportNeed: "medium" })
    }),
    { params: Promise.resolve({ sessionId }) }
  );
}
