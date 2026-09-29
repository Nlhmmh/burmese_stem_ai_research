import { beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  findSession: vi.fn(),
  recordSessionResponse: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  findSession: daoMocks.findSession,
  recordSessionResponse: daoMocks.recordSessionResponse
}));

import {
  respondToLearningSession,
  SessionNotFoundError,
  SessionResponseConflictError
} from "@/services/adaptation.service";

describe("adaptation service boundaries", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  it("persists the response without an LLM call after two adaptation rounds", async () => {
    const session = makeSessionRecord({
      understanding: "medium",
      adaptationRound: 2,
      status: "in_progress"
    });
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({
        understanding: "needs_support",
        adaptationRound: 2,
        status: "review_recommended"
      })
    );

    await expect(
      respondToLearningSession("learner-a", session.sessionId, "needs_support")
    ).resolves.toEqual({
      understanding: "needs_support",
      status: "review_recommended",
      adaptationRound: 2,
      route: "stage_5_scaffold",
      responseEvent: {
        overallSupportNeed: "needs_support",
        difficultyType: null,
        route: "stage_5_scaffold",
        roundBefore: 2,
        roundAfter: 2,
        createdAt: expect.any(Date)
      },
      adaptation: null
    });

    expect(daoMocks.findSession).toHaveBeenCalledWith("learner-a", session.sessionId);
    expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith({
      learnerId: "learner-a",
      sessionId: session.sessionId,
      expectedRound: 2,
      expectedResponseEventCount: 0,
      understanding: "needs_support",
      status: "review_recommended",
      adaptation: null,
      responseEvent: {
        overallSupportNeed: "needs_support",
        difficultyType: null,
        route: "stage_5_scaffold",
        roundBefore: 2,
        roundAfter: 2,
        createdAt: expect.any(Date)
      }
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("surfaces a conflict when a concurrent capped response wins first", async () => {
    const session = makeSessionRecord({ adaptationRound: 2, responseEvents: [] });
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(null);

    await expect(
      respondToLearningSession("learner-a", session.sessionId, "needs_support")
    ).rejects.toBeInstanceOf(SessionResponseConflictError);

    expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedRound: 2,
        expectedResponseEventCount: 0,
        adaptation: null
      })
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid stored round without a provider or persistence call", async () => {
    const session = makeSessionRecord({ adaptationRound: 3 });
    daoMocks.findSession.mockResolvedValue(session);

    await expect(
      respondToLearningSession("learner-a", session.sessionId, "needs_support")
    ).rejects.toBeInstanceOf(SessionResponseConflictError);

    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats a session outside the learner boundary as not found", async () => {
    daoMocks.findSession.mockResolvedValue(null);

    await expect(
      respondToLearningSession(
        "different-learner",
        "2fba6e7a-1225-4d1f-971f-5ae58704e3d5",
        "needs_support"
      )
    ).rejects.toBeInstanceOf(SessionNotFoundError);

    expect(daoMocks.findSession).toHaveBeenCalledWith(
      "different-learner",
      "2fba6e7a-1225-4d1f-971f-5ae58704e3d5"
    );
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
