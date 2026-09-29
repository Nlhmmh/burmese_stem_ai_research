import { beforeEach, describe, expect, it, vi } from "vitest";

import type {
  AdaptationRoute,
  DifficultyType,
  OverallSupportNeed,
  ScaffoldSupportType
} from "@/lib/session-domain";
import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  findSession: vi.fn(),
  recordSessionResponse: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  findSession: daoMocks.findSession,
  recordSessionResponse: daoMocks.recordSessionResponse
}));

import { respondToLearningSession } from "@/services/adaptation.service";

type BranchCase = {
  overallSupportNeed: OverallSupportNeed;
  roundBefore: 0 | 1 | 2;
  roundAfter: 0 | 1 | 2;
  expectedRoute: AdaptationRoute;
  expectedSupportType: ScaffoldSupportType | null;
  expectedStatus: "in_progress" | "review_recommended";
  expectedProviderCalls: 0 | 1;
};

const branchCases: BranchCase[] = [
  {
    overallSupportNeed: "high",
    roundBefore: 0,
    roundAfter: 0,
    expectedRoute: "fade",
    expectedSupportType: null,
    expectedStatus: "in_progress",
    expectedProviderCalls: 0
  },
  {
    overallSupportNeed: "high",
    roundBefore: 1,
    roundAfter: 1,
    expectedRoute: "fade",
    expectedSupportType: null,
    expectedStatus: "in_progress",
    expectedProviderCalls: 0
  },
  {
    overallSupportNeed: "high",
    roundBefore: 2,
    roundAfter: 2,
    expectedRoute: "fade",
    expectedSupportType: null,
    expectedStatus: "in_progress",
    expectedProviderCalls: 0
  },
  {
    overallSupportNeed: "medium",
    roundBefore: 0,
    roundAfter: 1,
    expectedRoute: "stage_5_scaffold",
    expectedSupportType: "another_example",
    expectedStatus: "in_progress",
    expectedProviderCalls: 1
  },
  {
    overallSupportNeed: "medium",
    roundBefore: 1,
    roundAfter: 2,
    expectedRoute: "stage_5_scaffold",
    expectedSupportType: "another_example",
    expectedStatus: "review_recommended",
    expectedProviderCalls: 1
  },
  {
    overallSupportNeed: "medium",
    roundBefore: 2,
    roundAfter: 2,
    expectedRoute: "stage_5_scaffold",
    expectedSupportType: null,
    expectedStatus: "review_recommended",
    expectedProviderCalls: 0
  },
  {
    overallSupportNeed: "needs_support",
    roundBefore: 0,
    roundAfter: 1,
    expectedRoute: "stage_5_scaffold",
    expectedSupportType: "simpler_explanation",
    expectedStatus: "in_progress",
    expectedProviderCalls: 1
  },
  {
    overallSupportNeed: "needs_support",
    roundBefore: 1,
    roundAfter: 2,
    expectedRoute: "stage_5_scaffold",
    expectedSupportType: "simpler_explanation",
    expectedStatus: "review_recommended",
    expectedProviderCalls: 1
  },
  {
    overallSupportNeed: "needs_support",
    roundBefore: 2,
    roundAfter: 2,
    expectedRoute: "stage_5_scaffold",
    expectedSupportType: null,
    expectedStatus: "review_recommended",
    expectedProviderCalls: 0
  }
];

describe("Stage 7 provider and round branches", () => {
  const fetchMock = vi.fn();
  const generatedContent = {
    en: "Generated support",
    my: "ထုတ်လုပ်ထားသော အကူအညီ"
  };

  beforeEach(() => {
    fetchMock.mockReset();
    daoMocks.findSession.mockReset();
    daoMocks.recordSessionResponse.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({ content: generatedContent })
              }
            ]
          }
        ]
      })
    });
  });

  it.each(branchCases)(
    "$overallSupportNeed at round $roundBefore routes to $expectedRoute with $expectedProviderCalls provider call(s)",
    async ({
      overallSupportNeed,
      roundBefore,
      roundAfter,
      expectedRoute,
      expectedSupportType,
      expectedStatus,
      expectedProviderCalls
    }) => {
      const session = makeSessionRecord({ adaptationRound: roundBefore });
      daoMocks.findSession.mockResolvedValue(session);
      daoMocks.recordSessionResponse.mockResolvedValue(
        makeSessionRecord({
          understanding: overallSupportNeed,
          adaptationRound: roundAfter,
          status: expectedStatus
        })
      );

      const result = await respondToLearningSession(
        session.learnerId,
        session.sessionId,
        overallSupportNeed
      );

      expect(fetchMock).toHaveBeenCalledTimes(expectedProviderCalls);
      expect(result).toMatchObject({
        understanding: overallSupportNeed,
        status: expectedStatus,
        adaptationRound: roundAfter,
        route: expectedRoute
      });

      const expectedAdaptation = expectedSupportType
        ? expect.objectContaining({
            learnerResponse: overallSupportNeed,
            supportType: expectedSupportType,
            content: generatedContent,
            round: roundAfter,
            createdAt: expect.any(Date)
          })
        : null;
      expect(result.adaptation).toEqual(expectedAdaptation);
      expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          expectedRound: roundBefore,
          understanding: overallSupportNeed,
          status: expectedStatus,
          adaptation: expectedAdaptation,
          responseEvent: expect.objectContaining({
            overallSupportNeed,
            difficultyType: null,
            route: expectedRoute,
            roundBefore,
            roundAfter
          })
        })
      );
    }
  );

  it.each([
    ["medium", "simpler_explanation", "simpler_explanation", 0, 1],
    ["needs_support", "another_example", "another_example", 0, 1],
    ["medium", "simpler_explanation", null, 2, 2],
    ["needs_support", "another_example", null, 2, 2]
  ] as const)(
    "routes %s with explicit %s to support %s from round %s",
    async (overallSupportNeed, difficultyType, expectedSupportType, roundBefore, roundAfter) => {
      const session = makeSessionRecord({ adaptationRound: roundBefore });
      daoMocks.findSession.mockResolvedValue(session);
      daoMocks.recordSessionResponse.mockResolvedValue(
        makeSessionRecord({
          understanding: overallSupportNeed,
          adaptationRound: roundAfter,
          status: roundAfter === 2 ? "review_recommended" : "in_progress"
        })
      );

      const result = await respondToLearningSession(
        session.learnerId,
        session.sessionId,
        overallSupportNeed,
        difficultyType as DifficultyType
      );

      expect(fetchMock).toHaveBeenCalledTimes(expectedSupportType === null ? 0 : 1);
      expect(result.adaptation?.supportType ?? null).toBe(expectedSupportType);
      expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          responseEvent: expect.objectContaining({
            difficultyType,
            route: "stage_5_scaffold",
            roundBefore,
            roundAfter
          })
        })
      );
    }
  );
});
