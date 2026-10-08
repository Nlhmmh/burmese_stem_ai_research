import { beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const mocks = vi.hoisted(() => ({
  findSession: vi.fn(),
  recordSessionResponse: vi.fn(),
  requestStructuredOutput: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  findSession: mocks.findSession,
  recordSessionResponse: mocks.recordSessionResponse
}));

vi.mock("@/services/llm-provider", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/services/llm-provider")>()),
  requestStructuredOutput: mocks.requestStructuredOutput
}));

import {
  AdaptationGenerationError,
  respondToLearningSession
} from "@/services/adaptation.service";

describe("adaptation defensive boundaries", () => {
  beforeEach(() => {
    mocks.findSession.mockResolvedValue(makeSessionRecord());
  });

  // The provider helper normally wraps failures in LlmProviderError. Inject an
  // unexpected helper failure here to test the service's last-resort boundary.
  it.each([
    {
      route: "standard adaptation",
      difficulty: null,
      clarification: null,
      message: "Unable to generate adapted support",
      schemaName: "learning_adaptation"
    },
    {
      route: "concept correction",
      difficulty: "concept_mismatch" as const,
      clarification: "I meant a spreadsheet cell.",
      message: "Unable to reinterpret the concept",
      schemaName: "concept_reinterpretation"
    }
  ])(
    "turns an unexpected $route helper error into a safe domain error without saving or retrying",
    async ({ difficulty, clarification, message, schemaName }) => {
      const session = makeSessionRecord();
      const before = structuredClone(session);
      mocks.findSession.mockResolvedValue(session);
      mocks.requestStructuredOutput.mockRejectedValue(
        new Error("private internal diagnostic")
      );

      const pending = respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "medium",
        difficulty,
        clarification
      );

      await expect(pending).rejects.toBeInstanceOf(AdaptationGenerationError);
      await expect(pending).rejects.toMatchObject({ message });
      expect(mocks.requestStructuredOutput).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ schemaName })
      );
      expect(mocks.recordSessionResponse).not.toHaveBeenCalled();
      expect(session).toEqual(before);
    }
  );

  it.each([
    { field: "message", defect: "missing Burmese", value: { en: "" } },
    { field: "message", defect: "non-string Burmese", value: { en: "", my: 42 } },
    { field: "content", defect: "missing Burmese", value: { en: "New support" } },
    {
      field: "content",
      defect: "non-string English",
      value: { en: 42, my: "အသစ်သော အကူအညီ" }
    }
  ])(
    "rejects concept-correction $field with $defect before saving any state",
    async ({ field, value }) => {
      const session = makeSessionRecord();
      const before = structuredClone(session);
      mocks.findSession.mockResolvedValue(session);
      mocks.requestStructuredOutput.mockResolvedValue({
        outcome: "corrected",
        message: { en: "", my: "" },
        concept: { name: "Spreadsheet cell", domain: "Computing" },
        content: { en: "New support", my: "အသစ်သော အကူအညီ" },
        [field]: value
      });

      const pending = respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "medium",
        "concept_mismatch",
        "I meant a spreadsheet cell."
      );

      await expect(pending).rejects.toBeInstanceOf(AdaptationGenerationError);
      await expect(pending).rejects.toMatchObject({
        message: "OpenAI returned invalid concept reinterpretation"
      });
      expect(mocks.requestStructuredOutput).toHaveBeenCalledOnce();
      expect(mocks.recordSessionResponse).not.toHaveBeenCalled();
      expect(session).toEqual(before);
    }
  );

  it("records High for a legacy session without responseEvents using a zero event-count guard", async () => {
    const session = makeSessionRecord();
    Reflect.deleteProperty(session, "responseEvents");
    const before = structuredClone(session);
    mocks.findSession.mockResolvedValue(session);
    mocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({ understanding: "high" })
    );

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "high"
    );

    expect(result).toMatchObject({
      route: "fade",
      adaptation: null,
      adaptationRound: 0,
      status: "in_progress",
      responseEvent: { route: "fade", roundBefore: 0, roundAfter: 0 }
    });
    expect(mocks.recordSessionResponse).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        learnerId: session.learnerId,
        sessionId: session.sessionId,
        expectedRound: 0,
        expectedResponseEventCount: 0,
        adaptation: null,
        responseEvent: expect.objectContaining({
          overallSupportNeed: "high",
          route: "fade",
          roundBefore: 0,
          roundAfter: 0
        })
      })
    );
    expect(mocks.requestStructuredOutput).not.toHaveBeenCalled();
    expect(session).toEqual(before);
  });
});
