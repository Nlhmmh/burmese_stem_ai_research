import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ConceptReference } from "@/lib/session-domain";
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

type CorrectionCase = {
  term: "cell" | "current" | "network" | "inheritance";
  originalQuestion: string;
  previous: ConceptReference;
  clarification: string;
  corrected: ConceptReference;
};

const correctionCases: CorrectionCase[] = [
  {
    term: "cell",
    originalQuestion: "What does cell mean?",
    previous: { name: "Biological cell", domain: "Biology" },
    clarification: "I meant a cell in a spreadsheet.",
    corrected: { name: "Spreadsheet cell", domain: "Spreadsheet computing" }
  },
  {
    term: "current",
    originalQuestion: "Explain current.",
    previous: { name: "Electric current", domain: "Physics" },
    clarification: "I meant an ocean current.",
    corrected: { name: "Ocean current", domain: "Oceanography" }
  },
  {
    term: "network",
    originalQuestion: "How does a network learn?",
    previous: { name: "Computer network", domain: "Computer networking" },
    clarification: "I meant a neural network in machine learning.",
    corrected: { name: "Neural network", domain: "Machine learning" }
  },
  {
    term: "inheritance",
    originalQuestion: "What is inheritance?",
    previous: { name: "Genetic inheritance", domain: "Biology" },
    clarification: "I meant class inheritance in object-oriented programming.",
    corrected: { name: "Class inheritance", domain: "Object-oriented programming" }
  }
];

describe("bounded concept reinterpretation", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    daoMocks.findSession.mockReset();
    daoMocks.recordSessionResponse.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
  });

  it.each(correctionCases)(
    "corrects the $term interpretation without replacing the session",
    async ({ term, originalQuestion, previous, clarification, corrected }) => {
      const session = makeSessionRecord({
        learnerId: "learner-owner",
        originalQuestion,
        concept: previous
      });
      const revisedContent = {
        en: `Revised explanation and scaffold for ${term}.`,
        my: `${term} အတွက် ပြန်လည် ရှင်းလင်းချက်နှင့် အထောက်အကူ။`
      };
      daoMocks.findSession.mockResolvedValue(session);
      daoMocks.recordSessionResponse.mockResolvedValue(
        makeSessionRecord({
          ...session,
          concept: corrected,
          understanding: "medium",
          adaptationRound: 1,
          status: "in_progress"
        })
      );
      fetchMock.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          output: [
            {
              content: [
                {
                  type: "output_text",
                  text: JSON.stringify({
                    outcome: "corrected",
                    message: { en: "", my: "" },
                    concept: corrected,
                    content: revisedContent
                  })
                }
              ]
            }
          ]
        })
      });

      const result = await respondToLearningSession(
        session.learnerId,
        session.sessionId,
        "medium",
        "concept_mismatch",
        clarification
      );

      expect(daoMocks.findSession).toHaveBeenCalledWith(
        "learner-owner",
        session.sessionId
      );
      expect(result).toMatchObject({
        route: "context_reinterpretation",
        correctionOutcome: "corrected",
        concept: corrected,
        adaptationRound: 1,
        adaptation: {
          learnerResponse: "medium",
          supportType: "concept_correction",
          content: revisedContent,
          conceptCorrection: { previous, corrected },
          round: 1
        }
      });
      expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          learnerId: "learner-owner",
          sessionId: session.sessionId,
          activeConcept: corrected,
          adaptation: expect.objectContaining({
            supportType: "concept_correction",
            conceptCorrection: { previous, corrected },
            content: revisedContent
          }),
          responseEvent: expect.objectContaining({
            difficultyType: "concept_mismatch",
            route: "context_reinterpretation",
            roundBefore: 0,
            roundAfter: 1,
            conceptReinterpretation: {
              clarification,
              outcome: "corrected",
              previous,
              current: corrected
            }
          })
        })
      );

      const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
      const requestBody = JSON.parse(String(request.body)) as {
        instructions: string;
        input: string;
        text: { format: { name: string; strict: boolean } };
      };
      const promptInput = JSON.parse(requestBody.input) as {
        adaptationRoute: string;
        supportType: string;
        originalQuestion: string;
        previousConcept: ConceptReference;
        intendedTermOrContext: string;
      };
      expect(requestBody.instructions).toContain(
        "Stage 6B → Stage 7 → Stage 2 → Stage 1 if required → Stage 4 → Stage 5"
      );
      expect(requestBody.instructions).toContain("one bounded correction");
      expect(requestBody.instructions).toContain("# Stages 1–5 contract");
      expect(requestBody.instructions).toContain("Do not start a");
      expect(requestBody.instructions).toContain(
        "The application already selected context_reinterpretation and concept_correction"
      );
      expect(requestBody.text.format).toMatchObject({
        name: "concept_reinterpretation",
        strict: true
      });
      expect(promptInput).toEqual({
        adaptationRoute: "context_reinterpretation",
        supportType: "concept_correction",
        originalQuestion,
        previousConcept: previous,
        intendedTermOrContext: clarification,
        initialExplanations: session.explanations,
        previousAdaptations: session.adaptations,
        preferences: session.preferencesSnapshot
      });
    }
  );

  it("returns and persists one controlled clarification when meaning remains ambiguous", async () => {
    const previous = { name: "Network", domain: "Computing" };
    const session = makeSessionRecord({ concept: previous });
    const clarification = "I meant the network one.";
    const message = {
      en: "Which kind of network do you mean, such as a computer or neural network?",
      my: "Computer network သို့မဟုတ် neural network ကဲ့သို့ မည်သည့် network ကို ဆိုလိုပါသလဲ။"
    };
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({
        ...session,
        understanding: "needs_support",
        adaptationRound: 1,
        status: "in_progress"
      })
    );
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  outcome: "ambiguous",
                  message,
                  concept: previous,
                  content: { en: "", my: "" }
                })
              }
            ]
          }
        ]
      })
    });

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_mismatch",
      clarification
    );

    expect(result).toMatchObject({
      correctionOutcome: "ambiguous",
      concept: previous,
      adaptationRound: 1,
      adaptation: {
        supportType: "concept_correction",
        content: message,
        round: 1
      }
    });
    expect(result.adaptation).not.toHaveProperty("conceptCorrection");
    const persistenceInput = daoMocks.recordSessionResponse.mock.calls[0]?.[0];
    expect(persistenceInput).not.toHaveProperty("activeConcept");
    expect(persistenceInput).toMatchObject({
      responseEvent: {
        route: "context_reinterpretation",
        roundBefore: 0,
        roundAfter: 1,
        conceptReinterpretation: {
          clarification,
          outcome: "ambiguous",
          previous,
          current: previous
        }
      }
    });
  });

  it("rejects a corrected outcome that does not change the interpretation", async () => {
    const previous = { name: "Cell", domain: "Biology" };
    const session = makeSessionRecord({ concept: previous });
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  outcome: "corrected",
                  message: { en: "", my: "" },
                  concept: { name: " cell ", domain: " biology " },
                  content: { en: "Support", my: "အကူအညီ" }
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
        "concept_mismatch",
        "I meant cell."
      )
    ).rejects.toBeInstanceOf(AdaptationGenerationError);
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });

  it("rejects reinterpretation output containing application-controlled fields", async () => {
    const previous = { name: "Cell", domain: "Biology" };
    const session = makeSessionRecord({ concept: previous });
    daoMocks.findSession.mockResolvedValue(session);
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  outcome: "corrected",
                  message: { en: "", my: "" },
                  concept: { name: "Spreadsheet cell", domain: "Computing" },
                  content: { en: "Support", my: "အကူအညီ" },
                  adaptationRound: 2
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
        "concept_mismatch",
        "I meant a spreadsheet cell."
      )
    ).rejects.toBeInstanceOf(AdaptationGenerationError);
    expect(daoMocks.recordSessionResponse).not.toHaveBeenCalled();
  });

  it("records the correction request at the cap without a provider call or round three", async () => {
    const session = makeSessionRecord({ adaptationRound: 2 });
    const clarification = "I meant class inheritance.";
    daoMocks.findSession.mockResolvedValue(session);
    daoMocks.recordSessionResponse.mockResolvedValue(
      makeSessionRecord({
        ...session,
        understanding: "needs_support",
        adaptationRound: 2,
        status: "review_recommended"
      })
    );

    const result = await respondToLearningSession(
      session.learnerId,
      session.sessionId,
      "needs_support",
      "concept_mismatch",
      clarification
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      route: "context_reinterpretation",
      correctionOutcome: "limit_reached",
      concept: session.concept,
      adaptationRound: 2,
      adaptation: null
    });
    expect(daoMocks.recordSessionResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        adaptation: null,
        responseEvent: expect.objectContaining({
          roundBefore: 2,
          roundAfter: 2,
          conceptReinterpretation: {
            clarification,
            outcome: "limit_reached",
            previous: session.concept,
            current: session.concept
          }
        })
      })
    );
  });
});
