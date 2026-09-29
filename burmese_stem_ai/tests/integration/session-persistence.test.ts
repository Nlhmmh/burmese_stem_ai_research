import { randomUUID } from "node:crypto";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import {
  appendFollowUp,
  createSession,
  findSession,
  findSessionsByLearner,
  recordSessionResponse,
  type Adaptation,
  type NewSession
} from "@/data/dao/session.dao";
import { getOrCreateProfile, updatePreferences } from "@/data/dao/profile.dao";
import { connectMongoDB } from "@/data/mongodb";
import { ProfileModel, SessionModel } from "@/data/schema";
import type { LearnerResponseEvent } from "@/lib/session-domain";
import { getLearningSession } from "@/services/session-lifecycle.service";

const timestamp = new Date("2026-09-30T10:00:00.000Z");

describe("isolated MongoDB persistence and concurrency", () => {
  beforeAll(async () => {
    await connectMongoDB();
    await Promise.all([ProfileModel.syncIndexes(), SessionModel.syncIndexes()]);
  });

  beforeEach(async () => {
    await Promise.all([ProfileModel.deleteMany({}), SessionModel.deleteMany({})]);
  });

  it("persists learner-scoped sessions newest first and keeps legacy reads compatible", async () => {
    const learnerId = "integration-owner";
    const older = await createSession(newSession(learnerId, "Older concept"));
    const newer = await createSession(newSession(learnerId, "Newer concept"));
    await createSession(newSession("integration-other", "Foreign concept"));
    await SessionModel.updateOne(
      { sessionId: older.sessionId },
      { $set: { updatedAt: new Date("2026-09-30T09:00:00.000Z") } }
    );
    await SessionModel.updateOne(
      { sessionId: newer.sessionId },
      { $set: { updatedAt: new Date("2026-09-30T11:00:00.000Z") } }
    );

    const listed = await findSessionsByLearner(learnerId);
    expect(listed.map((session) => session.sessionId)).toEqual([
      newer.sessionId,
      older.sessionId
    ]);
    await expect(findSession("integration-other", older.sessionId)).resolves.toBeNull();

    const legacy = newSession(learnerId, "Legacy concept");
    const legacyDocument: Partial<NewSession> = { ...legacy };
    delete legacyDocument.preferencesSnapshot;
    await SessionModel.collection.insertOne({
      ...legacyDocument,
      understanding: "medium",
      status: "in_progress",
      adaptationRound: 0,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    const rawLegacy = await SessionModel.collection.findOne({ sessionId: legacy.sessionId });
    expect(rawLegacy).not.toHaveProperty("responseEvents");
    expect(rawLegacy).not.toHaveProperty("preferencesSnapshot");

    const publicLegacy = await getLearningSession(learnerId, legacy.sessionId);
    expect(publicLegacy).toMatchObject({
      adaptations: [],
      responseEvents: [],
      followUps: []
    });
    expect(publicLegacy.preferencesSnapshot).toBeUndefined();
  });

  it("persists fade and capped events without incrementing or creating an adaptation", async () => {
    const base = await createSession(newSession("integration-fade", "Fade concept"));
    const fade = responseEvent("high", null, "fade", 0, 0);
    const faded = await recordSessionResponse({
      learnerId: base.learnerId,
      sessionId: base.sessionId,
      expectedRound: 0,
      expectedResponseEventCount: 0,
      understanding: "high",
      status: "in_progress",
      adaptation: null,
      responseEvent: fade
    });
    expect(faded).toMatchObject({ adaptationRound: 0, adaptations: [] });
    expect(faded?.responseEvents).toHaveLength(1);

    await SessionModel.updateOne(
      { sessionId: base.sessionId },
      {
        $set: { adaptationRound: 2, status: "review_recommended" },
        $push: {
          adaptations: {
            $each: [adaptation(1, "another_example"), adaptation(2, "simpler_explanation")]
          }
        }
      }
    );
    const capped = responseEvent(
      "needs_support",
      "concept_unclear",
      "concept_clarification",
      2,
      2
    );
    const cappedResult = await recordSessionResponse({
      learnerId: base.learnerId,
      sessionId: base.sessionId,
      expectedRound: 2,
      expectedResponseEventCount: 1,
      understanding: "needs_support",
      status: "review_recommended",
      adaptation: null,
      responseEvent: capped
    });
    expect(cappedResult).toMatchObject({ adaptationRound: 2, status: "review_recommended" });
    expect(cappedResult?.adaptations).toHaveLength(2);
    expect(cappedResult?.responseEvents).toHaveLength(2);
  });

  it("allows only one concurrent generated adaptation from the same snapshot", async () => {
    const base = await createSession(newSession("integration-race", "Race concept"));
    const input = (label: string) => ({
      learnerId: base.learnerId,
      sessionId: base.sessionId,
      expectedRound: 0,
      expectedResponseEventCount: 0,
      understanding: "medium" as const,
      status: "in_progress" as const,
      adaptation: {
        ...adaptation(1, "another_example"),
        content: { en: label, my: `မြန်မာ ${label}` }
      },
      responseEvent: responseEvent(
        "medium" as const,
        "another_example" as const,
        "stage_5_scaffold" as const,
        0,
        1
      )
    });

    const results = await Promise.all([
      recordSessionResponse(input("first")),
      recordSessionResponse(input("second"))
    ]);
    expect(results.filter(Boolean)).toHaveLength(1);

    const stored = await findSession(base.learnerId, base.sessionId);
    expect(stored).toMatchObject({ adaptationRound: 1 });
    expect(stored?.adaptations).toHaveLength(1);
    expect(stored?.responseEvents).toHaveLength(1);
  });

  it("allows only one concurrent capped response from the same event snapshot", async () => {
    const base = await createSession(newSession("integration-cap-race", "Capped race"));
    await SessionModel.updateOne(
      { sessionId: base.sessionId },
      {
        $set: { adaptationRound: 2, status: "review_recommended" },
        $push: {
          adaptations: {
            $each: [adaptation(1, "another_example"), adaptation(2, "simpler_explanation")]
          }
        }
      }
    );
    const event = responseEvent("needs_support", null, "stage_5_scaffold", 2, 2);
    const input = {
      learnerId: base.learnerId,
      sessionId: base.sessionId,
      expectedRound: 2,
      expectedResponseEventCount: 0,
      understanding: "needs_support" as const,
      status: "review_recommended" as const,
      adaptation: null,
      responseEvent: event
    };
    const results = await Promise.all([
      recordSessionResponse(input),
      recordSessionResponse(input)
    ]);
    expect(results.filter(Boolean)).toHaveLength(1);
    const stored = await findSession(base.learnerId, base.sessionId);
    expect(stored?.adaptationRound).toBe(2);
    expect(stored?.adaptations).toHaveLength(2);
    expect(stored?.responseEvents).toHaveLength(1);
  });

  it("enforces profile defaults, preference updates, and the two-follow-up limit", async () => {
    const learnerId = "integration-profile";
    const profile = await getOrCreateProfile(learnerId);
    expect(profile.preferences).toMatchObject({
      supportLanguage: "bilingual",
      explanationLevel: "beginner",
      learningStyle: "guided"
    });
    const updated = await updatePreferences(learnerId, {
      supportLanguage: "burmese",
      explanationLevel: "advanced"
    });
    expect(updated?.preferences).toMatchObject({
      supportLanguage: "burmese",
      explanationLevel: "advanced"
    });

    const session = await createSession(newSession(learnerId, "Follow-up concept"));
    const first = await appendFollowUp(learnerId, session.sessionId, followUp("first"));
    const second = await appendFollowUp(learnerId, session.sessionId, followUp("second"));
    const third = await appendFollowUp(learnerId, session.sessionId, followUp("third"));
    expect(first?.followUps).toHaveLength(1);
    expect(second?.followUps).toHaveLength(2);
    expect(third).toBeNull();
  });
});

function newSession(learnerId: string, conceptName: string): NewSession {
  return {
    sessionId: randomUUID(),
    learnerId,
    originalQuestion: `What is ${conceptName}?`,
    concept: { name: conceptName, domain: "Integration testing" },
    explanations: {
      simple: { en: "Simple", my: "ရိုးရှင်း" },
      realWorldExample: { en: "Example", my: "ဥပမာ" },
      technical: { en: "Technical", my: "နည်းပညာ" }
    },
    reflectivePrompt: { en: "Reflect", my: "စဉ်းစား" },
    hint: { en: "Hint", my: "အရိပ်အမြွက်" },
    preferencesSnapshot: {
      uiLanguage: "en",
      supportLanguage: "bilingual",
      explanationLevel: "beginner",
      learningStyle: "guided",
      theme: "light"
    }
  };
}

function adaptation(round: 1 | 2, supportType: Adaptation["supportType"]): Adaptation {
  return {
    learnerResponse: round === 1 ? "medium" : "needs_support",
    supportType,
    content: { en: `Support ${round}`, my: `အကူအညီ ${round}` },
    round,
    createdAt: new Date(timestamp.getTime() + round * 1000)
  };
}

function responseEvent(
  overallSupportNeed: LearnerResponseEvent["overallSupportNeed"],
  difficultyType: LearnerResponseEvent["difficultyType"],
  route: LearnerResponseEvent["route"],
  roundBefore: number,
  roundAfter: number
): LearnerResponseEvent {
  return {
    overallSupportNeed,
    difficultyType,
    route,
    roundBefore,
    roundAfter,
    createdAt: timestamp
  };
}

function followUp(label: string) {
  return {
    question: `${label} question`,
    answer: { en: `${label} answer`, my: `${label} အဖြေ` },
    createdAt: timestamp
  };
}
