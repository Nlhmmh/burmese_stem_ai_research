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

import {
  AdaptationGenerationError,
  respondToLearningSession
} from "@/services/adaptation.service";

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
        route: expectedRoute,
        responseEvent: {
          overallSupportNeed,
          difficultyType: null,
          route: expectedRoute,
          roundBefore,
          roundAfter,
          createdAt: expect.any(Date)
        }
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

  it.each(["english", "burmese"] as const)(
    "generates concept-scoped bilingual language support without changing an %s preference",
    async (supportLanguage) => {
      const session = makeSessionRecord({
        adaptationRound: 0,
        preferencesSnapshot: {
          ...makeSessionRecord().preferencesSnapshot,
          supportLanguage
        }
      });
      daoMocks.findSession.mockResolvedValue(session);
      daoMocks.recordSessionResponse.mockResolvedValue(
        makeSessionRecord({
          understanding: "medium",
          adaptationRound: 1,
          status: "in_progress"
        })
      );

      const result = await respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "medium",
        "language_terms"
      );

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(result).toMatchObject({
        route: "language_support",
        adaptation: {
          learnerResponse: "medium",
          supportType: "clarification",
          presentationOverride: "bilingual",
          content: generatedContent,
          round: 1
        }
      });
      expect(session.preferencesSnapshot.supportLanguage).toBe(supportLanguage);
      expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          adaptation: expect.objectContaining({
            supportType: "clarification",
            presentationOverride: "bilingual"
          }),
          responseEvent: expect.objectContaining({
            difficultyType: "language_terms",
            route: "language_support",
            roundBefore: 0,
            roundAfter: 1
          })
        })
      );

      const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
      const requestBody = JSON.parse(String(request.body)) as {
        instructions: string;
        input: string;
      };
      const promptInput = JSON.parse(requestBody.input) as {
        adaptationRoute: string;
        presentationOverride: string | null;
        concept: { name: string; domain: string };
        preferences: { supportLanguage: string };
      };
      expect(requestBody.instructions).toContain("Stage 3 → Stage 4 → Stage 5");
      expect(requestBody.instructions).toContain(
        "Do not translate every English technical term mechanically"
      );
      expect(promptInput).toMatchObject({
        adaptationRoute: "language_support",
        presentationOverride: "bilingual",
        concept: session.concept,
        preferences: { supportLanguage }
      });
    }
  );

  it("records a capped language route without calling the provider", async () => {
    const session = makeSessionRecord({ adaptationRound: 2 });
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({
        understanding: "needs_support",
        adaptationRound: 2,
        status: "review_recommended"
      })
    );

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "language_terms"
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      route: "language_support",
      adaptationRound: 2,
      adaptation: null
    });
    expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        adaptation: null,
        responseEvent: expect.objectContaining({
          difficultyType: "language_terms",
          route: "language_support",
          roundBefore: 2,
          roundAfter: 2
        })
      })
    );
  });

  it("generates and persists a distinct Stage 4 to 5 conceptual clarification", async () => {
    const previousAdaptation = {
      learnerResponse: "medium" as const,
      supportType: "another_example" as const,
      content: {
        en: "A ball rolling downhill is an earlier example.",
        my: "ကုန်းဆင်းတွင် ဘောလုံးလိမ့်ခြင်းသည် ယခင် ဥပမာဖြစ်သည်။"
      },
      round: 1,
      createdAt: new Date("2026-01-15T10:01:00.000Z")
    };
    const session = makeSessionRecord({
      adaptationRound: 1,
      adaptations: [previousAdaptation]
    });
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({
        understanding: "needs_support",
        adaptationRound: 2,
        status: "review_recommended"
      })
    );

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_unclear"
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(result).toMatchObject({
      route: "concept_clarification",
      adaptationRound: 2,
      adaptation: {
        learnerResponse: "needs_support",
        supportType: "concept_clarification",
        content: generatedContent,
        round: 2
      }
    });
    expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        adaptation: expect.objectContaining({
          supportType: "concept_clarification",
          content: generatedContent
        }),
        responseEvent: expect.objectContaining({
          difficultyType: "concept_unclear",
          route: "concept_clarification",
          roundBefore: 1,
          roundAfter: 2
        })
      })
    );

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const requestBody = JSON.parse(String(request.body)) as {
      instructions: string;
      input: string;
      text: {
        format: {
          type: string;
          strict: boolean;
          schema: {
            required: string[];
            properties: { content: { required: string[] } };
          };
        };
      };
    };
    const promptInput = JSON.parse(requestBody.input) as {
      adaptationRoute: string;
      concept: { name: string; domain: string };
      previousAdaptations: typeof session.adaptations;
    };
    expect(requestBody.instructions).toContain("Stage 4 → Stage 5");
    expect(requestBody.instructions).toContain("revised core");
    expect(requestBody.instructions).toContain("one concise, appropriate scaffold");
    expect(requestBody.instructions).toContain("not as evidence of an objectively diagnosed misconception");
    expect(requestBody.instructions).toContain("Do not respond with merely");
    expect(requestBody.text.format).toMatchObject({
      type: "json_schema",
      strict: true,
      schema: {
        required: ["content"],
        properties: { content: { required: ["en", "my"] } }
      }
    });
    expect(promptInput).toMatchObject({
      adaptationRoute: "concept_clarification",
      concept: session.concept,
      previousAdaptations: [
        expect.objectContaining({
          supportType: "another_example",
          content: previousAdaptation.content
        })
      ]
    });
  });

  it("rejects a conceptual clarification that exactly repeats prior support", async () => {
    const repeatedContent = {
      en: "Earlier clarification",
      my: "ယခင် ရှင်းလင်းချက်"
    };
    const session = makeSessionRecord({
      adaptationRound: 1,
      adaptations: [
        {
          learnerResponse: "medium",
          supportType: "concept_clarification",
          content: repeatedContent,
          round: 1,
          createdAt: new Date("2026-01-15T10:01:00.000Z")
        }
      ]
    });
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  content: {
                    en: "  EARLIER   CLARIFICATION ",
                    my: " ယခင်   ရှင်းလင်းချက် "
                  }
                })
              }
            ]
          }
        ]
      })
    });

    await expect(
      respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "medium",
        "concept_unclear"
      )
    ).rejects.toThrow(AdaptationGenerationError);
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });

  it("rejects malformed conceptual-clarification output before persistence", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({ content: { en: "English only is invalid" } })
              }
            ]
          }
        ]
      })
    });

    await expect(
      respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "needs_support",
        "concept_unclear"
      )
    ).rejects.toThrow("OpenAI returned invalid adaptation content");
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });

  it("records a capped conceptual route without generating round three", async () => {
    const session = makeSessionRecord({ adaptationRound: 2 });
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({
        understanding: "needs_support",
        adaptationRound: 2,
        status: "review_recommended"
      })
    );

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_unclear"
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      route: "concept_clarification",
      adaptationRound: 2,
      adaptation: null
    });
    expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        adaptation: null,
        responseEvent: expect.objectContaining({
          difficultyType: "concept_unclear",
          route: "concept_clarification",
          roundBefore: 2,
          roundAfter: 2
        })
      })
    );
  });
});
