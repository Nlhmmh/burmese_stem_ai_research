import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const persistenceMocks = vi.hoisted(() => ({
  connectMongoDB: vi.fn(),
  find: vi.fn(),
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn()
}));

vi.mock("@/data/mongodb", () => ({
  connectMongoDB: persistenceMocks.connectMongoDB
}));

vi.mock("@/data/schema", () => ({
  SessionModel: {
    find: persistenceMocks.find,
    findOne: persistenceMocks.findOne,
    findOneAndUpdate: persistenceMocks.findOneAndUpdate
  }
}));

import {
  appendFollowUp,
  findSession,
  findSessionsByLearner,
  recordSessionResponse,
  type Adaptation
} from "@/data/dao/session.dao";
import type { LearnerResponseEvent } from "@/lib/session-domain";

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

  it("lists only the learner's sessions newest first", async () => {
    const sessions = [makeSessionRecord()];
    const lean = vi.fn().mockResolvedValue(sessions);
    const sort = vi.fn().mockReturnValue({ lean });
    const select = vi.fn().mockReturnValue({ sort });
    persistenceMocks.find.mockReturnValue({ select });

    await expect(findSessionsByLearner("learner-a")).resolves.toEqual(sessions);

    expect(persistenceMocks.find).toHaveBeenCalledWith({ learnerId: "learner-a" });
    expect(select).toHaveBeenCalledWith(
      "sessionId concept understanding status updatedAt -_id"
    );
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1 });
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
    const responseEvent: LearnerResponseEvent = {
      overallSupportNeed: "medium",
      difficultyType: "another_example",
      route: "stage_5_scaffold",
      roundBefore: 1,
      roundAfter: 2,
      createdAt: now
    };

    await recordSessionResponse({
      learnerId: session.learnerId,
      sessionId: session.sessionId,
      expectedRound: 1,
      expectedResponseEventCount: 0,
      understanding: "medium",
      status: "in_progress",
      adaptation,
      responseEvent
    });

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      {
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        adaptationRound: { $eq: 1, $lt: 2 },
        $expr: {
          $eq: [{ $size: { $ifNull: ["$responseEvents", []] } }, 0]
        },
        status: { $ne: "completed" }
      },
      {
        $set: {
          understanding: "medium",
          status: "in_progress",
          updatedAt: now
        },
        $inc: { adaptationRound: 1 },
        $push: {
          adaptations: adaptation,
          responseEvents: responseEvent
        }
      },
      { returnDocument: "after", runValidators: true }
    );
  });

  it("atomically updates the active concept with its correction trace", async () => {
    const previous = { name: "Cell", domain: "Biology" };
    const corrected = { name: "Spreadsheet cell", domain: "Computing" };
    const session = makeSessionRecord({ concept: previous });
    const adaptation: Adaptation = {
      learnerResponse: "medium",
      supportType: "concept_correction",
      content: { en: "Revised support", my: "ပြန်လည် ပြင်ဆင်ထားသော အကူအညီ" },
      conceptCorrection: { previous, corrected },
      round: 1,
      createdAt: now
    };
    const responseEvent: LearnerResponseEvent = {
      overallSupportNeed: "medium",
      difficultyType: "concept_mismatch",
      route: "context_reinterpretation",
      roundBefore: 0,
      roundAfter: 1,
      conceptReinterpretation: {
        clarification: "I meant a spreadsheet cell.",
        outcome: "corrected",
        previous,
        current: corrected
      },
      createdAt: now
    };
    persistenceMocks.findOneAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue({ ...session, concept: corrected })
    });

    await recordSessionResponse({
      learnerId: session.learnerId,
      sessionId: session.sessionId,
      expectedRound: 0,
      expectedResponseEventCount: 0,
      understanding: "medium",
      status: "in_progress",
      adaptation,
      responseEvent,
      activeConcept: corrected
    });

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        adaptationRound: { $eq: 0, $lt: 2 }
      }),
      expect.objectContaining({
        $set: expect.objectContaining({
          concept: corrected,
          understanding: "medium",
          status: "in_progress"
        }),
        $inc: { adaptationRound: 1 },
        $push: {
          adaptations: adaptation,
          responseEvents: responseEvent
        }
      }),
      { returnDocument: "after", runValidators: true }
    );
  });

  it("updates only response state when no adaptation is produced", async () => {
    const session = makeSessionRecord({ adaptationRound: 2 });
    const lean = vi.fn().mockResolvedValue(session);
    persistenceMocks.findOneAndUpdate.mockReturnValue({ lean });
    const responseEvent: LearnerResponseEvent = {
      overallSupportNeed: "needs_support",
      difficultyType: null,
      route: "stage_5_scaffold",
      roundBefore: 2,
      roundAfter: 2,
      createdAt: now
    };

    await recordSessionResponse({
      learnerId: session.learnerId,
      sessionId: session.sessionId,
      expectedRound: 2,
      expectedResponseEventCount: 1,
      understanding: "needs_support",
      status: "review_recommended",
      adaptation: null,
      responseEvent
    });

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      {
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        adaptationRound: 2,
        $expr: {
          $eq: [{ $size: { $ifNull: ["$responseEvents", []] } }, 1]
        },
        status: { $ne: "completed" }
      },
      {
        $set: {
          understanding: "needs_support",
          status: "review_recommended",
          updatedAt: now
        },
        $push: { responseEvents: responseEvent }
      },
      { returnDocument: "after", runValidators: true }
    );
  });

  it("guards non-incrementing responses with the expected event count", async () => {
    const session = makeSessionRecord({ adaptationRound: 2, responseEvents: [] });
    const responseEvent: LearnerResponseEvent = {
      overallSupportNeed: "high",
      difficultyType: null,
      route: "fade",
      roundBefore: 2,
      roundAfter: 2,
      createdAt: now
    };
    const lean = vi.fn().mockResolvedValue(null);
    persistenceMocks.findOneAndUpdate.mockReturnValue({ lean });

    await expect(
      recordSessionResponse({
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        expectedRound: 2,
        expectedResponseEventCount: 0,
        understanding: "high",
        status: "in_progress",
        adaptation: null,
        responseEvent
      })
    ).resolves.toBeNull();

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        adaptationRound: 2,
        $expr: {
          $eq: [{ $size: { $ifNull: ["$responseEvents", []] } }, 0]
        }
      }),
      expect.objectContaining({ $push: { responseEvents: responseEvent } }),
      expect.any(Object)
    );
  });

  it("allows only one concurrent response built from the same event snapshot", async () => {
    const session = makeSessionRecord({ adaptationRound: 2, responseEvents: [] });
    const responseEvent: LearnerResponseEvent = {
      overallSupportNeed: "needs_support",
      difficultyType: null,
      route: "stage_5_scaffold",
      roundBefore: 2,
      roundAfter: 2,
      createdAt: now
    };
    let persistedEventCount = 0;
    persistenceMocks.findOneAndUpdate.mockImplementation((filter: unknown) => {
      const expectedCount = (
        filter as { $expr: { $eq: [unknown, number] } }
      ).$expr.$eq[1];
      const matched = expectedCount === persistedEventCount;
      if (matched) persistedEventCount += 1;
      return {
        lean: vi.fn().mockResolvedValue(matched ? session : null)
      };
    });

    const input = {
      learnerId: session.learnerId,
      sessionId: session.sessionId,
      expectedRound: 2,
      expectedResponseEventCount: 0,
      understanding: "needs_support" as const,
      status: "review_recommended" as const,
      adaptation: null,
      responseEvent
    };
    const results = await Promise.all([
      recordSessionResponse(input),
      recordSessionResponse(input)
    ]);

    expect(results.filter((result) => result !== null)).toHaveLength(1);
    expect(persistedEventCount).toBe(1);
  });

  it("appends a follow-up without altering Stage 7 state", async () => {
    const session = makeSessionRecord({
      adaptationRound: 1,
      understanding: "medium",
      status: "in_progress"
    });
    const followUp = {
      question: "Why does the slope matter?",
      answer: {
        en: "It determines the update direction.",
        my: "၎င်းက ပြောင်းလဲမည့် ဦးတည်ချက်ကို သတ်မှတ်သည်။"
      },
      createdAt: now
    };
    persistenceMocks.findOneAndUpdate.mockReturnValue({
      lean: vi.fn().mockResolvedValue({ ...session, followUps: [followUp] })
    });

    await appendFollowUp(session.learnerId, session.sessionId, followUp);

    expect(persistenceMocks.findOneAndUpdate).toHaveBeenCalledWith(
      {
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        $expr: {
          $lt: [{ $size: { $ifNull: ["$followUps", []] } }, 2]
        }
      },
      {
        $push: { followUps: followUp },
        $set: { updatedAt: now }
      },
      { returnDocument: "after", runValidators: true }
    );

    const update = persistenceMocks.findOneAndUpdate.mock.calls[0]?.[1] as Record<
      string,
      unknown
    >;
    expect(update).not.toHaveProperty("$inc");
    expect(update).not.toHaveProperty("$unset");
    expect(update.$set).not.toHaveProperty("adaptationRound");
    expect(update.$set).not.toHaveProperty("understanding");
    expect(update.$set).not.toHaveProperty("status");
    expect(update.$set).not.toHaveProperty("concept");
    expect(update.$push).not.toHaveProperty("adaptations");
    expect(update.$push).not.toHaveProperty("responseEvents");
  });
});
