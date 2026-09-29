import { describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  completeSession: vi.fn(),
  findSession: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  completeSession: daoMocks.completeSession,
  findSession: daoMocks.findSession
}));

import {
  completeLearningSession,
  getLearningSession,
  SessionDetailNotFoundError,
  SessionLifecycleConflictError
} from "@/services/session-lifecycle.service";

describe("session lifecycle ownership", () => {
  it("looks up a session within the learner boundary", async () => {
    daoMocks.findSession.mockResolvedValue(null);

    await expect(
      getLearningSession("learner-b", "2fba6e7a-1225-4d1f-971f-5ae58704e3d5")
    ).rejects.toBeInstanceOf(SessionDetailNotFoundError);

    expect(daoMocks.findSession).toHaveBeenCalledWith(
      "learner-b",
      "2fba6e7a-1225-4d1f-971f-5ae58704e3d5"
    );
  });

  it("normalises a legacy session without response events", async () => {
    const legacySession = makeSessionRecord();
    delete legacySession.responseEvents;
    daoMocks.findSession.mockResolvedValue(legacySession);

    await expect(
      getLearningSession(legacySession.learnerId, legacySession.sessionId)
    ).resolves.toMatchObject({ responseEvents: [] });
  });

  it("normalises legacy collections and preserves a missing preference snapshot", async () => {
    const legacySession = makeSessionRecord();
    Object.assign(legacySession, {
      adaptations: undefined,
      responseEvents: undefined,
      followUps: undefined,
      preferencesSnapshot: undefined
    });
    daoMocks.findSession.mockResolvedValue(legacySession);

    await expect(
      getLearningSession(legacySession.learnerId, legacySession.sessionId)
    ).resolves.toMatchObject({
      adaptations: [],
      responseEvents: [],
      followUps: [],
      preferencesSnapshot: undefined
    });
  });

  it("keeps both ownership keys on completion", async () => {
    const existing = makeSessionRecord();
    const completed = makeSessionRecord({ status: "completed" });
    daoMocks.findSession.mockResolvedValue(existing);
    daoMocks.completeSession.mockResolvedValue(completed);

    await expect(
      completeLearningSession(existing.learnerId, existing.sessionId)
    ).resolves.toMatchObject({ status: "completed" });

    expect(daoMocks.completeSession).toHaveBeenCalledWith(
      existing.learnerId,
      existing.sessionId
    );
  });

  it("returns an already-completed session idempotently without another write", async () => {
    const completed = makeSessionRecord({ status: "completed" });
    daoMocks.findSession.mockResolvedValue(completed);

    await expect(
      completeLearningSession(completed.learnerId, completed.sessionId)
    ).resolves.toMatchObject({ status: "completed" });
    expect(daoMocks.completeSession).not.toHaveBeenCalled();
  });

  it("rejects missing, invalid-state, and concurrently changed completion targets", async () => {
    daoMocks.findSession.mockResolvedValueOnce(null);
    await expect(
      completeLearningSession("learner-a", makeSessionRecord().sessionId)
    ).rejects.toBeInstanceOf(SessionDetailNotFoundError);

    daoMocks.findSession.mockResolvedValueOnce(
      makeSessionRecord({ status: "invalid_state" as never })
    );
    await expect(
      completeLearningSession("learner-a", makeSessionRecord().sessionId)
    ).rejects.toBeInstanceOf(SessionLifecycleConflictError);

    daoMocks.findSession.mockResolvedValueOnce(makeSessionRecord());
    daoMocks.completeSession.mockResolvedValueOnce(null);
    await expect(
      completeLearningSession("learner-a", makeSessionRecord().sessionId)
    ).rejects.toThrow("The session changed while it was being updated");
  });
});
