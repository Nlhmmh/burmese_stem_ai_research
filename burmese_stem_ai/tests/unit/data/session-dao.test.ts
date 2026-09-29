import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const persistenceMocks = vi.hoisted(() => ({
  connectMongoDB: vi.fn(),
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn()
}));

vi.mock("@/data/mongodb", () => ({
  connectMongoDB: persistenceMocks.connectMongoDB
}));

vi.mock("@/data/schema", () => ({
  SessionModel: {
    findOne: persistenceMocks.findOne,
    findOneAndUpdate: persistenceMocks.findOneAndUpdate
  }
}));

import {
  findSession,
  recordSessionResponse,
  type Adaptation
} from "@/data/dao/session.dao";

describe("session DAO persistence invariants", () => {
  const now = new Date("2026-01-15T12:30:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("scopes session retrieval by learner and session identifiers", async () => {
    const session = makeSessionRecord();
    const lean = vi.fn().mockResolvedValue(session);
    persistenceMocks.findOne.mockReturnValue({ lean });

    await expect(findSession(session.learnerId, session.sessionId)).resolves.toEqual(session);

    expect(persistenceMocks.connectMongoDB).toHaveBeenCalledOnce();
    expect(persistenceMocks.findOne).toHaveBeenCalledWith({
      sessionId: session.sessionId,
      learnerId: session.learnerId
    });
  });

  it("atomically increments the round and appends an adaptation", async () => {
    const session = makeSessionRecord({ adaptationRound: 1 });
    const adaptation: Adaptation = {
      learnerResponse: "medium",
      supportType: "another_example",
      content: { en: "Another example", my: "နောက်ထပ် ဥပမာ" },
      round: 2,
      createdAt: now
    };
    const lean = vi.fn().mockResolvedValue(session);
    persistenceMocks.findOneAndUpdate.mockReturnValue({ lean });

    await recordSessionResponse({
      learnerId: session.learnerId,
      sessionId: session.sessionId,
      expectedRound: 1,
      understanding: "medium",
      status: "in_progress",
      adaptation
    });

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      {
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        adaptationRound: { $eq: 1, $lt: 2 },
        status: { $ne: "completed" }
      },
      {
        $set: {
          understanding: "medium",
          status: "in_progress",
          updatedAt: now
        },
        $inc: { adaptationRound: 1 },
        $push: { adaptations: adaptation }
      },
      { returnDocument: "after", runValidators: true }
    );
  });

  it("updates only response state when no adaptation is produced", async () => {
    const session = makeSessionRecord({ adaptationRound: 2 });
    const lean = vi.fn().mockResolvedValue(session);
    persistenceMocks.findOneAndUpdate.mockReturnValue({ lean });

    await recordSessionResponse({
      learnerId: session.learnerId,
      sessionId: session.sessionId,
      expectedRound: 2,
      understanding: "needs_support",
      status: "review_recommended",
      adaptation: null
    });

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      {
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        adaptationRound: 2,
        status: { $ne: "completed" }
      },
      {
        $set: {
          understanding: "needs_support",
          status: "review_recommended",
          updatedAt: now
        }
      },
      { returnDocument: "after", runValidators: true }
    );
  });
});
