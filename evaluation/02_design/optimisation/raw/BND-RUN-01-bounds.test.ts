import { randomUUID } from "node:crypto";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const instrumentation = vi.hoisted(() => ({
  providerCalls: 0,
  responsePersistenceAttempts: 0,
  completionAttempts: 0,
  generatedSequence: 0,
  barrierActive: false,
  barrierArrivals: 0,
  barrierPromise: null as Promise<void> | null,
  releaseBarrier: null as (() => void) | null
}));

vi.mock("@/services/llm-provider", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/services/llm-provider")>();
  return {
    ...actual,
    requestStructuredOutput: vi.fn(async (input: { schemaName: string }) => {
      instrumentation.providerCalls += 1;
      instrumentation.generatedSequence += 1;
      const sequence = instrumentation.generatedSequence;
      if (input.schemaName === "concept_reinterpretation") {
        return {
          outcome: "corrected",
          message: { en: `Clarify ${sequence}`, my: `ရှင်းလင်း ${sequence}` },
          concept: { name: `Corrected concept ${sequence}`, domain: "Evaluation" },
          content: { en: `Corrected support ${sequence}`, my: `ပြင်ဆင် အကူအညီ ${sequence}` }
        };
      }
      return {
        content: {
          en: `Deterministic support ${sequence}`,
          my: `သတ်မှတ်ထားသော အကူအညီ ${sequence}`
        }
      };
    })
  };
});

vi.mock("@/data/dao/session.dao", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/data/dao/session.dao")>();
  return {
    ...actual,
    findSession: async (...args: Parameters<typeof actual.findSession>) => {
      const session = await actual.findSession(...args);
      if (instrumentation.barrierActive) {
        instrumentation.barrierArrivals += 1;
        if (instrumentation.barrierArrivals === 2) {
          instrumentation.releaseBarrier?.();
        }
        await instrumentation.barrierPromise;
      }
      return session;
    },
    recordSessionResponse: async (
      ...args: Parameters<typeof actual.recordSessionResponse>
    ) => {
      instrumentation.responsePersistenceAttempts += 1;
      return actual.recordSessionResponse(...args);
    },
    completeSession: async (...args: Parameters<typeof actual.completeSession>) => {
      instrumentation.completionAttempts += 1;
      return actual.completeSession(...args);
    }
  };
});

import { POST as respondRoute } from "@/app/api/sessions/[sessionId]/respond/route";
import {
  createSession,
  type NewSession
} from "@/data/dao/session.dao";
import { connectMongoDB } from "@/data/mongodb";
import { ProfileModel, SessionModel } from "@/data/schema";
import {
  respondToLearningSession,
  SessionResponseConflictError
} from "@/services/adaptation.service";
import {
  completeLearningSession,
  getLearningSession
} from "@/services/session-lifecycle.service";
import { NextRequest } from "next/server";

type StoredState = {
  round: number;
  status: string;
  understanding: string | null;
  adaptations: number;
  responseEvents: number;
  latestRoute: string | null;
  latestTransition: string | null;
  concept: { name: string; domain: string };
};

describe("RUN-B01-20261001-BOUNDS-01", () => {
  beforeAll(async () => {
    await connectMongoDB();
    await Promise.all([ProfileModel.syncIndexes(), SessionModel.syncIndexes()]);
  });

  beforeEach(async () => {
    instrumentation.providerCalls = 0;
    instrumentation.responsePersistenceAttempts = 0;
    instrumentation.completionAttempts = 0;
    instrumentation.generatedSequence = 0;
    disableBarrier();
    await Promise.all([ProfileModel.deleteMany({}), SessionModel.deleteMany({})]);
  });

  it("BND-01 creates the bounded initial state", async () => {
    const session = await createFixture("BND-01");
    const after = await storedState(session.learnerId, session.sessionId);

    expect(after).toMatchObject({
      round: 0,
      status: "in_progress",
      understanding: null,
      adaptations: 0,
      responseEvents: 0,
      latestRoute: null
    });
    expect(instrumentation.providerCalls).toBe(0);
    record("BND-01", null, after, 0, 0, 0, "initial persisted state");
  });

  it("BND-02 generates and persists the first adaptation", async () => {
    const session = await createFixture("BND-02");
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "medium"
    );
    const after = await storedState(session.learnerId, session.sessionId);

    expect(result).toMatchObject({
      route: "stage_5_scaffold",
      adaptationRound: 1,
      status: "in_progress",
      adaptation: { supportType: "another_example", round: 1 }
    });
    expect(after).toMatchObject({
      round: 1,
      status: "in_progress",
      understanding: "medium",
      adaptations: 1,
      responseEvents: 1,
      latestRoute: "stage_5_scaffold",
      latestTransition: "0→1"
    });
    recordFromCounters("BND-02", before, after, counters);
  });

  it("BND-03 generates and persists the second adaptation", async () => {
    const session = await createAtRound("BND-03", 1);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_unclear"
    );
    const after = await storedState(session.learnerId, session.sessionId);

    expect(result).toMatchObject({
      route: "concept_clarification",
      adaptationRound: 2,
      status: "review_recommended",
      adaptation: { supportType: "concept_clarification", round: 2 }
    });
    expect(after).toMatchObject({
      round: 2,
      status: "review_recommended",
      understanding: "needs_support",
      adaptations: 2,
      responseEvents: 2,
      latestRoute: "concept_clarification",
      latestTransition: "1→2"
    });
    recordFromCounters("BND-03", before, after, counters);
  });

  it.each([
    ["BND-04", "medium", null, "stage_5_scaffold"],
    ["BND-05", "needs_support", "simpler_explanation", "stage_5_scaffold"],
    ["BND-06", "medium", "language_terms", "language_support"],
    ["BND-07", "needs_support", "concept_unclear", "concept_clarification"]
  ] as const)("%s records a capped response without generation", async (
    caseId,
    supportNeed,
    difficultyType,
    expectedRoute
  ) => {
    const session = await createAtRound(caseId, 2);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      supportNeed,
      difficultyType
    );
    const after = await storedState(session.learnerId, session.sessionId);

    expect(result).toMatchObject({
      route: expectedRoute,
      adaptationRound: 2,
      status: "review_recommended",
      adaptation: null,
      responseEvent: { roundBefore: 2, roundAfter: 2 }
    });
    expect(after).toMatchObject({
      round: 2,
      status: "review_recommended",
      adaptations: 2,
      responseEvents: 3,
      latestRoute: expectedRoute,
      latestTransition: "2→2"
    });
    recordFromCounters(caseId, before, after, counters);
  });

  it("BND-08 records a capped concept mismatch without changing the concept", async () => {
    const session = await createAtRound("BND-08", 2);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_mismatch",
      "I mean a biological cell"
    );
    const after = await storedState(session.learnerId, session.sessionId);

    expect(result).toMatchObject({
      route: "context_reinterpretation",
      correctionOutcome: "limit_reached",
      adaptationRound: 2,
      adaptation: null,
      concept: before.concept,
      responseEvent: {
        roundBefore: 2,
        roundAfter: 2,
        conceptReinterpretation: {
          clarification: "I mean a biological cell",
          outcome: "limit_reached",
          previous: before.concept,
          current: before.concept
        }
      }
    });
    expect(after).toMatchObject({
      round: 2,
      status: "review_recommended",
      adaptations: 2,
      responseEvents: 3,
      latestRoute: "context_reinterpretation",
      latestTransition: "2→2",
      concept: before.concept
    });
    recordFromCounters("BND-08", before, after, counters);
  });

  it("BND-09 fades at round 0 without generation", async () => {
    const session = await createFixture("BND-09");
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "high"
    );
    const after = await storedState(session.learnerId, session.sessionId);

    expect(result).toMatchObject({ route: "fade", adaptationRound: 0, adaptation: null });
    expect(after).toMatchObject({
      round: 0,
      status: "in_progress",
      adaptations: 0,
      responseEvents: 1,
      latestRoute: "fade",
      latestTransition: "0→0"
    });
    recordFromCounters("BND-09", before, after, counters);
  });

  it.each([
    ["BND-10", 1, 1, 1, 2],
    ["BND-11", 2, 2, 2, 3]
  ] as const)("%s fades without generation at round %s", async (
    caseId,
    round,
    adaptationCount,
    expectedRound,
    expectedEvents
  ) => {
    const session = await createAtRound(caseId, round);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "high"
    );
    const after = await storedState(session.learnerId, session.sessionId);

    expect(result).toMatchObject({
      route: "fade",
      adaptationRound: expectedRound,
      status: "in_progress",
      adaptation: null
    });
    expect(after).toMatchObject({
      round: expectedRound,
      status: "in_progress",
      adaptations: adaptationCount,
      responseEvents: expectedEvents,
      latestRoute: "fade",
      latestTransition: `${round}→${round}`
    });
    recordFromCounters(caseId, before, after, counters);
  });

  it("BND-12 completes an in-progress round-0 session without altering content", async () => {
    const session = await createFixture("BND-12");
    const before = await storedState(session.learnerId, session.sessionId);
    const publicBefore = await getLearningSession(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const completed = await completeLearningSession(session.learnerId, session.sessionId);
    const after = await storedState(session.learnerId, session.sessionId);

    expect(completed.status).toBe("completed");
    expect(after).toMatchObject({ ...before, status: "completed" });
    expect(completed.explanations).toEqual(publicBefore.explanations);
    expect(completed.reflectivePrompt).toEqual(publicBefore.reflectivePrompt);
    expect(completed.hint).toEqual(publicBefore.hint);
    recordFromCounters("BND-12", before, after, counters);
  });

  it("BND-13 completes a review-recommended session idempotently", async () => {
    const session = await createAtRound("BND-13", 2);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const first = await completeLearningSession(session.learnerId, session.sessionId);
    const firstStored = await SessionModel.findOne({ sessionId: session.sessionId }).lean();
    const second = await completeLearningSession(session.learnerId, session.sessionId);
    const secondStored = await SessionModel.findOne({ sessionId: session.sessionId }).lean();
    const after = await storedState(session.learnerId, session.sessionId);

    expect(first.status).toBe("completed");
    expect(second.status).toBe("completed");
    expect(secondStored?.updatedAt).toEqual(firstStored?.updatedAt);
    expect(after).toMatchObject({
      ...before,
      status: "completed",
      round: 2,
      adaptations: 2,
      responseEvents: 2
    });
    recordFromCounters("BND-13", before, after, counters, "second completion made no write");
  });

  it("BND-14 returns HTTP 409 and preserves a completed session", async () => {
    const session = await createFixture("BND-14");
    await completeLearningSession(session.learnerId, session.sessionId);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();

    const response = await respondRoute(
      new NextRequest(`http://127.0.0.1/api/sessions/${session.sessionId}/respond`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-learner-id": session.learnerId
        },
        body: JSON.stringify({ overallSupportNeed: "medium" })
      }),
      { params: Promise.resolve({ sessionId: session.sessionId }) }
    );
    const body = await response.json();
    const after = await storedState(session.learnerId, session.sessionId);

    expect(response.status).toBe(409);
    expect(body).toMatchObject({ error: { code: "SESSION_RESPONSE_CONFLICT" } });
    expect(after).toEqual(before);
    recordFromCounters("BND-14", before, after, counters, "HTTP 409 SESSION_RESPONSE_CONFLICT");
  });

  it("BND-15 permits only one concurrent generated adaptation from the same round-1 snapshot", async () => {
    const session = await createAtRound("BND-15", 1);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();
    enableBarrier();

    const outcomes = await Promise.allSettled([
      respondToLearningSession(session.learnerId, session.sessionId, "medium"),
      respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "needs_support",
        "simpler_explanation"
      )
    ]);
    disableBarrier();
    const after = await storedState(session.learnerId, session.sessionId);

    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
    const rejected = outcomes.filter((outcome) => outcome.status === "rejected");
    expect(rejected).toHaveLength(1);
    expect((rejected[0] as PromiseRejectedResult).reason).toBeInstanceOf(
      SessionResponseConflictError
    );
    expect(after).toMatchObject({
      round: 2,
      status: "review_recommended",
      adaptations: 2,
      responseEvents: 2
    });
    recordFromCounters(
      "BND-15",
      before,
      after,
      counters,
      "one success; one controlled conflict; both permitted requests reached deterministic generation"
    );
  });

  it("BND-16 permits only one concurrent capped event from the same round-2 snapshot", async () => {
    const session = await createAtRound("BND-16", 2);
    const before = await storedState(session.learnerId, session.sessionId);
    const counters = counterSnapshot();
    enableBarrier();

    const outcomes = await Promise.allSettled([
      respondToLearningSession(session.learnerId, session.sessionId, "medium"),
      respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "needs_support",
        "concept_unclear"
      )
    ]);
    disableBarrier();
    const after = await storedState(session.learnerId, session.sessionId);

    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
    const rejected = outcomes.filter((outcome) => outcome.status === "rejected");
    expect(rejected).toHaveLength(1);
    expect((rejected[0] as PromiseRejectedResult).reason).toBeInstanceOf(
      SessionResponseConflictError
    );
    expect(after).toMatchObject({
      round: 2,
      status: "review_recommended",
      adaptations: 2,
      responseEvents: 3
    });
    recordFromCounters(
      "BND-16",
      before,
      after,
      counters,
      "one capped event persisted; one controlled conflict"
    );
  });

  it("BND-17 rejects -1, non-integer and greater-than-two stored rounds before generation or persistence", async () => {
    for (const invalidRound of [-1, 0.5, 3]) {
      const session = await createFixture(`BND-17-${invalidRound}`);
      await SessionModel.collection.updateOne(
        { sessionId: session.sessionId },
        { $set: { adaptationRound: invalidRound } }
      );
      const providerBefore = instrumentation.providerCalls;
      const persistenceBefore = instrumentation.responsePersistenceAttempts;
      const completionBefore = instrumentation.completionAttempts;

      await expect(
        respondToLearningSession(session.learnerId, session.sessionId, "needs_support")
      ).rejects.toBeInstanceOf(SessionResponseConflictError);

      const raw = await SessionModel.collection.findOne({ sessionId: session.sessionId });
      expect(raw?.adaptationRound).toBe(invalidRound);
      expect(raw?.adaptations).toHaveLength(0);
      expect(raw?.responseEvents).toHaveLength(0);
      expect(instrumentation.providerCalls - providerBefore).toBe(0);
      expect(instrumentation.responsePersistenceAttempts - persistenceBefore).toBe(0);
      expect(instrumentation.completionAttempts - completionBefore).toBe(0);
    }

    record(
      "BND-17",
      { invalidRounds: [-1, 0.5, 3] },
      { controlledConflicts: 3, database: "ephemeral isolated test database" },
      0,
      0,
      0,
      "no provider or persistence invocation"
    );
  });
});

async function createFixture(label: string) {
  const learnerId = `bounds-${label.toLowerCase()}-${randomUUID()}`;
  const session: NewSession = {
    sessionId: randomUUID(),
    learnerId,
    originalQuestion: `What is the bounded concept for ${label}?`,
    concept: { name: `Bounded concept ${label}`, domain: "Evaluation" },
    explanations: {
      simple: { en: "Initial simple explanation", my: "အစ ရိုးရှင်းသော ရှင်းလင်းချက်" },
      realWorldExample: { en: "Initial example", my: "အစ ဥပမာ" },
      technical: { en: "Initial technical explanation", my: "အစ နည်းပညာ ရှင်းလင်းချက်" }
    },
    reflectivePrompt: { en: "What changes?", my: "ဘာပြောင်းလဲသလဲ။" },
    hint: { en: "Inspect the bounded state.", my: "ကန့်သတ်အခြေအနေကို စစ်ဆေးပါ။" },
    preferencesSnapshot: {
      uiLanguage: "en",
      supportLanguage: "bilingual",
      explanationLevel: "beginner",
      learningStyle: "guided",
      theme: "light"
    }
  };
  return createSession(session);
}

async function createAtRound(label: string, round: 0 | 1 | 2) {
  const session = await createFixture(label);
  if (round >= 1) {
    await respondToLearningSession(session.learnerId, session.sessionId, "medium");
  }
  if (round >= 2) {
    await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_unclear"
    );
  }
  return session;
}

async function storedState(learnerId: string, sessionId: string): Promise<StoredState> {
  const stored = await SessionModel.findOne({ learnerId, sessionId }).lean();
  if (!stored) throw new Error(`Missing evaluation fixture ${sessionId}`);
  const events = stored.responseEvents ?? [];
  const latest = events.at(-1);
  return {
    round: stored.adaptationRound,
    status: stored.status,
    understanding: stored.understanding,
    adaptations: stored.adaptations?.length ?? 0,
    responseEvents: events.length,
    latestRoute: latest?.route ?? null,
    latestTransition: latest ? `${latest.roundBefore}→${latest.roundAfter}` : null,
    concept: stored.concept
  };
}

function counterSnapshot() {
  return {
    providerCalls: instrumentation.providerCalls,
    responsePersistenceAttempts: instrumentation.responsePersistenceAttempts,
    completionAttempts: instrumentation.completionAttempts
  };
}

function recordFromCounters(
  caseId: string,
  before: unknown,
  after: unknown,
  counters: ReturnType<typeof counterSnapshot>,
  note = ""
) {
  record(
    caseId,
    before,
    after,
    instrumentation.providerCalls - counters.providerCalls,
    instrumentation.responsePersistenceAttempts - counters.responsePersistenceAttempts,
    instrumentation.completionAttempts - counters.completionAttempts,
    note
  );
}

function record(
  caseId: string,
  before: unknown,
  after: unknown,
  providerCallDelta: number,
  responsePersistenceAttemptDelta: number,
  completionAttemptDelta: number,
  note: string
) {
  console.log(
    `BND_RESULT ${JSON.stringify({
      caseId,
      executionStatus: "Executed",
      outcome: "Pass",
      before,
      after,
      providerCallDelta,
      responsePersistenceAttemptDelta,
      completionAttemptDelta,
      note
    })}`
  );
}

function enableBarrier() {
  instrumentation.barrierActive = true;
  instrumentation.barrierArrivals = 0;
  instrumentation.barrierPromise = new Promise<void>((resolve) => {
    instrumentation.releaseBarrier = resolve;
  });
}

function disableBarrier() {
  instrumentation.releaseBarrier?.();
  instrumentation.barrierActive = false;
  instrumentation.barrierArrivals = 0;
  instrumentation.barrierPromise = null;
  instrumentation.releaseBarrier = null;
}
