import { beforeEach, describe, expect, it, vi } from "vitest";

import type { DifficultyType, OverallSupportNeed } from "@/lib/session-domain";
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

const routeCases: Array<{
  name: string;
  overallSupportNeed: OverallSupportNeed;
  difficultyType: DifficultyType | null;
  route: string;
  supportType: string;
  stagePath: string;
}> = [
  {
    name: "default Stage 5",
    overallSupportNeed: "medium",
    difficultyType: null,
    route: "stage_5_scaffold",
    supportType: "another_example",
    stagePath: "Stage 5 scaffold form"
  },
  {
    name: "explicit simpler explanation",
    overallSupportNeed: "needs_support",
    difficultyType: "simpler_explanation",
    route: "stage_5_scaffold",
    supportType: "simpler_explanation",
    stagePath: "Stage 5 scaffold form"
  },
  {
    name: "language support",
    overallSupportNeed: "medium",
    difficultyType: "language_terms",
    route: "language_support",
    supportType: "clarification",
    stagePath: "Stage 3 → Stage 4 → Stage 5"
  },
  {
    name: "concept clarification",
    overallSupportNeed: "needs_support",
    difficultyType: "concept_unclear",
    route: "concept_clarification",
    supportType: "concept_clarification",
    stagePath: "Stage 4 → Stage 5"
  }
];

describe("standard adaptation generation contract", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    daoMocks.findSession.mockReset();
    daoMocks.recordSessionResponse.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
  });

  it.each(routeCases)(
    "uses the shared bounded schema for $name",
    async ({ overallSupportNeed, difficultyType, route, supportType, stagePath }) => {
      const session = makeSessionRecord();
      daoMocks.findSession.mockResolvedValue(session);
      daoMocks.recordSessionResponse.mockResolvedValue(
        makeSessionRecord({
          understanding: overallSupportNeed,
          adaptationRound: 1,
          status: "in_progress"
        })
      );
      arrangeProviderOutput({
        content: { en: "Bounded adapted support", my: "ကန့်သတ်ထားသော အကူအညီ" }
      });

      await respondToLearningSession(
        session.learnerId,
        session.sessionId,
        overallSupportNeed,
        difficultyType
      );

      const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
      const requestBody = JSON.parse(String(request.body)) as {
        store: boolean;
        instructions: string;
        input: string;
        text: {
          format: {
            type: string;
            name: string;
            strict: boolean;
            schema: {
              required: string[];
              additionalProperties: boolean;
              properties: { content: { required: string[]; additionalProperties: boolean } };
            };
          };
        };
      };
      const promptInput = JSON.parse(requestBody.input) as Record<string, unknown>;
      expect(requestBody.store).toBe(false);
      expect(requestBody.instructions).toContain("# Stages 3–5 contract");
      expect(requestBody.instructions).toContain(stagePath);
      expect(requestBody.instructions).toContain(
        "The application, not the model, selected both route and support type"
      );
      expect(requestBody.instructions).toContain(
        "Do not choose learner identity, persistence, route permission, lifecycle"
      );
      expect(promptInput).toMatchObject({
        learnerResponse: overallSupportNeed,
        adaptationRoute: route,
        supportType,
        concept: session.concept,
        initialExplanations: session.explanations,
        previousAdaptations: session.adaptations,
        preferences: session.preferencesSnapshot
      });
      expect(requestBody.text.format).toMatchObject({
        type: "json_schema",
        name: "learning_adaptation",
        strict: true,
        schema: {
          required: ["content"],
          additionalProperties: false,
          properties: {
            content: {
              required: ["en", "my"],
              additionalProperties: false
            }
          }
        }
      });
      expect(daoMocks.recordSessionResponse).toHaveBeenCalledOnce();
    }
  );

  it.each([
    [
      "an extra lifecycle field",
      { content: { en: "Support", my: "အကူအညီ" }, lifecycle: "completed" }
    ],
    [
      "an extra nested route field",
      {
        content: {
          en: "Support",
          my: "အကူအညီ",
          route: "stage_5_scaffold"
        }
      }
    ],
    ["a missing Burmese field", { content: { en: "Support" } }],
    ["blank bilingual content", { content: { en: " ", my: " " } }]
  ])("rejects %s before persistence", async (_label, providerOutput) => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    arrangeProviderOutput(providerOutput);

    await expect(
      respondToLearningSession(session.learnerId, session.sessionId, "medium")
    ).rejects.toBeInstanceOf(AdaptationGenerationError);
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });

  function arrangeProviderOutput(output: unknown) {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [{ type: "output_text", text: JSON.stringify(output) }]
          }
        ]
      })
    });
  }
});
