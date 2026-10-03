import { beforeEach, describe, expect, it, vi } from "vitest";

import { MAX_FOLLOW_UPS } from "@/lib/constants";
import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  appendFollowUp: vi.fn(),
  findSession: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  appendFollowUp: daoMocks.appendFollowUp,
  findSession: daoMocks.findSession
}));

import {
  askSessionFollowUp,
  FollowUpGenerationError,
  FollowUpLimitError,
  FollowUpOutOfScopeError
} from "@/services/followup.service";

describe("concept-scoped follow-up", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    daoMocks.appendFollowUp.mockReset();
    daoMocks.findSession.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
  });

  it("accepts a supporting sub-concept and sends the bounded current context", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.appendFollowUp.mockResolvedValue(session);
    arrangeProviderOutput({
      relatedToCurrentConcept: true,
      message: "",
      answer: {
        en: "The slope shows the direction and size of the next update.",
        my: "လျှောစောက်သည် နောက်တစ်ကြိမ် ပြောင်းလဲမည့် ဦးတည်ချက်နှင့် ပမာဏကို ပြသည်။"
      }
    });

    const result = await askSessionFollowUp(
      session.learnerId,
      session.sessionId,
      "Why is the slope relevant?"
    );

    expect(result.answer.en).toContain("slope");
    expect(daoMocks.appendFollowUp).toHaveBeenCalledWith(
      session.learnerId,
      session.sessionId,
      expect.objectContaining({ question: "Why is the slope relevant?" })
    );

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const requestBody = JSON.parse(String(request.body)) as {
      store: boolean;
      instructions: string;
      input: string;
      text: { format: { name: string; strict: boolean } };
    };
    const promptInput = JSON.parse(requestBody.input) as Record<string, unknown>;
    expect(requestBody.store).toBe(false);
    expect(requestBody.instructions).toContain("The activeConcept is authoritative");
    expect(requestBody.instructions).toContain(
      "must not be converted into an overall support need or difficulty"
    );
    expect(requestBody.instructions).toContain(
      "Do not create or alter an adaptation, response event or round"
    );
    expect(requestBody.text.format).toMatchObject({
      name: "scoped_learning_follow_up",
      strict: true
    });
    expect(promptInput).toEqual({
      activeConcept: session.concept,
      initialExplanations: session.explanations,
      latestRelevantScaffold: null,
      latestResponseRoute: null,
      preferences: session.preferencesSnapshot,
      previousFollowUps: [],
      question: "Why is the slope relevant?"
    });
    expect(promptInput).not.toHaveProperty("difficultyType");
    expect(promptInput).not.toHaveProperty("latestUnderstanding");
  });

  it("rejects an unrelated primary concept without persisting it", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    arrangeProviderOutput({
      relatedToCurrentConcept: false,
      message: "Photosynthesis is a different primary concept. Start a new session.",
      answer: { en: "", my: "" }
    });

    await expect(
      askSessionFollowUp(
        session.learnerId,
        session.sessionId,
        "How does photosynthesis work?"
      )
    ).rejects.toBeInstanceOf(FollowUpOutOfScopeError);

    expect(daoMocks.appendFollowUp).not.toHaveBeenCalled();
  });

  it("uses the corrected active concept, latest scaffold and latest response route", async () => {
    const previousConcept = { name: "Biological cell", domain: "Biology" };
    const correctedConcept = { name: "Spreadsheet cell", domain: "Computing" };
    const previousAdaptation = {
      learnerResponse: "medium" as const,
      supportType: "another_example" as const,
      content: { en: "A biological cell example", my: "ဇီဝ cell ဥပမာ" },
      round: 1,
      createdAt: new Date("2026-01-15T10:05:00.000Z")
    };
    const correctionScaffold = {
      learnerResponse: "needs_support" as const,
      supportType: "concept_correction" as const,
      content: {
        en: "A spreadsheet cell stores a value at a row and column.",
        my: "Spreadsheet cell သည် row နှင့် column ဆုံရာတွင် value ကို သိမ်းသည်။"
      },
      conceptCorrection: { previous: previousConcept, corrected: correctedConcept },
      round: 2,
      createdAt: new Date("2026-01-15T10:10:00.000Z")
    };
    const session = makeSessionRecord({
      concept: correctedConcept,
      adaptationRound: 2,
      adaptations: [previousAdaptation, correctionScaffold],
      responseEvents: [
        {
          overallSupportNeed: "medium",
          difficultyType: "another_example",
          route: "stage_5_scaffold",
          roundBefore: 0,
          roundAfter: 1,
          createdAt: new Date("2026-01-15T10:05:00.000Z")
        },
        {
          overallSupportNeed: "needs_support",
          difficultyType: "concept_mismatch",
          route: "context_reinterpretation",
          roundBefore: 1,
          roundAfter: 2,
          conceptReinterpretation: {
            clarification: "I meant a spreadsheet cell.",
            outcome: "corrected",
            previous: previousConcept,
            current: correctedConcept
          },
          createdAt: new Date("2026-01-15T10:10:00.000Z")
        }
      ]
    });
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.appendFollowUp.mockResolvedValue(session);
    arrangeProviderOutput({
      relatedToCurrentConcept: true,
      message: "",
      answer: {
        en: "The column letter and row number form the cell reference.",
        my: "Column အက္ခရာနှင့် row နံပါတ်တို့က cell reference ကို ဖွဲ့စည်းသည်။"
      }
    });

    await askSessionFollowUp(
      session.learnerId,
      session.sessionId,
      "How is its reference formed?"
    );

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const requestBody = JSON.parse(String(request.body)) as { input: string };
    expect(JSON.parse(requestBody.input)).toMatchObject({
      activeConcept: correctedConcept,
      latestRelevantScaffold: {
        ...correctionScaffold,
        createdAt: correctionScaffold.createdAt.toISOString()
      },
      latestResponseRoute: "context_reinterpretation",
      preferences: session.preferencesSnapshot
    });
  });

  it("enforces the two-question limit before calling the provider", async () => {
    const session = makeSessionRecord({
      followUps: Array.from({ length: MAX_FOLLOW_UPS }, (_, index) => ({
        question: `Question ${index + 1}`,
        answer: { en: "Answer", my: "အဖြေ" },
        createdAt: new Date(`2026-01-15T10:0${index}:00.000Z`)
      }))
    });
    daoMocks.findSession.mockResolvedValue(session);

    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "One more question?")
    ).rejects.toBeInstanceOf(FollowUpLimitError);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(daoMocks.appendFollowUp).not.toHaveBeenCalled();
  });

  it("does not persist when the provider fails", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockResolvedValue({ ok: false, status: 503 });

    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "Why does it converge?")
    ).rejects.toBeInstanceOf(FollowUpGenerationError);

    expect(daoMocks.appendFollowUp).not.toHaveBeenCalled();
  });

  it("rejects a missing session and a concurrent follow-up limit without generation", async () => {
    daoMocks.findSession.mockResolvedValueOnce(null);
    await expect(
      askSessionFollowUp("learner-a", makeSessionRecord().sessionId, "Why?")
    ).rejects.toThrow("Learning session was not found");
    expect(fetchMock).not.toHaveBeenCalled();

    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValueOnce(session);
    daoMocks.appendFollowUp.mockResolvedValueOnce(null);
    arrangeProviderOutput({
      relatedToCurrentConcept: true,
      message: "",
      answer: { en: "Focused answer", my: "သက်ဆိုင်သော အဖြေ" }
    });
    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "Why?")
    ).rejects.toThrow("already has the maximum");
  });

  it("maps missing configuration, output, and invalid JSON without persistence", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);

    vi.stubEnv("OPENAI_API_KEY", "");
    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "Why?")
    ).rejects.toThrow("OpenAI API key is not configured");

    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ output: [{ content: [] }] })
    });
    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "Why?")
    ).rejects.toThrow("OpenAI returned no structured output");

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [{ content: [{ type: "output_text", text: "not-json" }] }]
      })
    });
    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "Why?")
    ).rejects.toThrow("OpenAI returned invalid JSON");
    expect(daoMocks.appendFollowUp).not.toHaveBeenCalled();
  });

  it("rejects model output that tries to assign a difficulty type", async () => {
    const session = makeSessionRecord();
    daoMocks.findSession.mockResolvedValue(session);
    arrangeProviderOutput({
      relatedToCurrentConcept: true,
      message: "",
      answer: { en: "A focused answer", my: "သက်ဆိုင်သော အဖြေ" },
      difficultyType: "concept_unclear"
    });

    await expect(
      askSessionFollowUp(session.learnerId, session.sessionId, "I am confused about the slope.")
    ).rejects.toBeInstanceOf(FollowUpGenerationError);

    expect(daoMocks.appendFollowUp).not.toHaveBeenCalled();
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
