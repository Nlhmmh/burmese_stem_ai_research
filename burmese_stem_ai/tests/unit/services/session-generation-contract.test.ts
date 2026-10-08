import { beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  createSession: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  createSession: daoMocks.createSession
}));

import {
  createLearningSession,
  SessionGenerationError,
  SessionScopeError
} from "@/services/session.service";

describe("initial Stage 1 to 5 generation contract", () => {
  const fetchMock = vi.fn();
  const preferences = makeSessionRecord().preferencesSnapshot;

  beforeEach(() => {
    fetchMock.mockReset();
    daoMocks.createSession.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    daoMocks.createSession.mockImplementation(async (session) => session);
  });

  it("uses one strict call whose prompt and schema map explicitly to Stages 1 to 5", async () => {
    const generated = readyOutput();
    arrangeProviderOutput(generated);

    await createLearningSession("learner-a", "What is gradient descent?", preferences);

    expect(fetchMock).toHaveBeenCalledOnce();
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
            properties: Record<string, unknown>;
          };
        };
      };
    };
    expect(requestBody.store).toBe(false);
    expect(requestBody.instructions).toContain("Stage 1 — Identify STEM Terminology");
    expect(requestBody.instructions).toContain("Stage 2 — Interpret Technical Context");
    expect(requestBody.instructions).toContain("Stage 3 — Select Language Support");
    expect(requestBody.instructions).toContain("Stage 4 — Explain the Core STEM Meaning");
    expect(requestBody.instructions).toContain("Stage 5 — Provide Bounded Scaffolding");
    expect(requestBody.instructions).toContain(
      "Do not choose or output learner identity, persistence operations, lifecycle"
    );
    expect(JSON.parse(requestBody.input)).toEqual({
      learnerQuestion: "What is gradient descent?",
      preferences: {
        supportLanguage: preferences.supportLanguage,
        explanationLevel: preferences.explanationLevel,
        learningStyle: preferences.learningStyle
      }
    });
    expect(requestBody.text.format).toMatchObject({
      type: "json_schema",
      name: "initial_learning_session",
      strict: true,
      schema: {
        required: [
          "outcome",
          "message",
          "concept",
          "explanations",
          "reflectivePrompt",
          "hint"
        ]
      }
    });
    expect(Object.keys(requestBody.text.format.schema.properties)).toEqual([
      "outcome",
      "message",
      "concept",
      "explanations",
      "reflectivePrompt",
      "hint"
    ]);
    expect(daoMocks.createSession).toHaveBeenCalledWith(
      expect.objectContaining({
        learnerId: "learner-a",
        originalQuestion: "What is gradient descent?",
        concept: generated.concept,
        explanations: generated.explanations,
        reflectivePrompt: generated.reflectivePrompt,
        hint: generated.hint,
        preferencesSnapshot: preferences
      })
    );
  });

  it.each(["ambiguous", "out_of_scope"] as const)(
    "accepts a controlled %s structure but does not persist a session",
    async (outcome) => {
      arrangeProviderOutput(nonReadyOutput(outcome));

      await expect(
        createLearningSession("learner-a", "What is cell?", preferences)
      ).rejects.toBeInstanceOf(SessionScopeError);
      expect(daoMocks.createSession).not.toHaveBeenCalled();
    }
  );

  it.each([
    ["unexpected top-level field", () => ({ ...readyOutput(), lifecycle: "completed" })],
    ["ready outcome with a message", () => ({ ...readyOutput(), message: "Extra message" })],
    [
      "ready outcome with blank Stage 1 terminology",
      () => ({ ...readyOutput(), concept: { name: " ", domain: "Machine learning" } })
    ],
    [
      "malformed bilingual Stage 4 block",
      () => ({
        ...readyOutput(),
        explanations: {
          ...readyOutput().explanations,
          simple: { en: "English only" }
        }
      })
    ],
    [
      "extra bilingual field",
      () => ({
        ...readyOutput(),
        hint: { ...readyOutput().hint, route: "stage_5_scaffold" }
      })
    ],
    ["ambiguous outcome without a message", () => nonReadyOutput("ambiguous", "")],
    [
      "ambiguous outcome with partial learning content",
      () => ({
        ...nonReadyOutput("ambiguous"),
        concept: { name: "Cell", domain: "" }
      })
    ],
    [
      "out-of-scope outcome with a scaffold",
      () => ({
        ...nonReadyOutput("out_of_scope"),
        hint: { en: "A hint", my: "အရိပ်အမြွက်" }
      })
    ]
  ])("rejects %s before persistence", async (_label, buildOutput) => {
    arrangeProviderOutput(buildOutput());

    await expect(
      createLearningSession("learner-a", "What is cell?", preferences)
    ).rejects.toBeInstanceOf(SessionGenerationError);
    expect(daoMocks.createSession).not.toHaveBeenCalled();
  });

  it("rejects invalid JSON before persistence", async () => {
    arrangeProviderText("not-json");

    await expect(
      createLearningSession("learner-a", "What is entropy?", preferences)
    ).rejects.toThrow("OpenAI returned invalid JSON");
    expect(daoMocks.createSession).not.toHaveBeenCalled();
  });

  it("maps missing configuration and missing provider output before persistence", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    await expect(
      createLearningSession("learner-a", "What is entropy?", preferences)
    ).rejects.toThrow("OpenAI API key is not configured");
    expect(fetchMock).not.toHaveBeenCalled();

    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ output: [{ content: [] }] })
    });
    await expect(
      createLearningSession("learner-a", "What is entropy?", preferences)
    ).rejects.toThrow("OpenAI returned no structured output");
    expect(daoMocks.createSession).not.toHaveBeenCalled();
  });

  function arrangeProviderOutput(output: unknown) {
    arrangeProviderText(JSON.stringify(output));
  }

  function arrangeProviderText(text: string) {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        output: [{ content: [{ type: "output_text", text }] }]
      })
    });
  }
});

function readyOutput() {
  return {
    outcome: "ready" as const,
    message: "",
    concept: { name: "Gradient descent", domain: "Machine learning" },
    explanations: {
      simple: { en: "Simple meaning", my: "ရိုးရှင်းသော အဓိပ္ပာယ်" },
      realWorldExample: { en: "One concrete example", my: "လက်တွေ့ ဥပမာတစ်ခု" },
      technical: { en: "Precise meaning", my: "တိကျသော အဓိပ္ပာယ်" }
    },
    reflectivePrompt: { en: "What changes next?", my: "နောက်တစ်ဆင့် ဘာပြောင်းမလဲ။" },
    hint: { en: "Consider the slope.", my: "လျှောစောက်ကို စဉ်းစားပါ။" }
  };
}

function nonReadyOutput(outcome: "ambiguous" | "out_of_scope", message = "Please clarify.") {
  const empty = { en: "", my: "" };
  return {
    outcome,
    message,
    concept: { name: "", domain: "" },
    explanations: {
      simple: empty,
      realWorldExample: empty,
      technical: empty
    },
    reflectivePrompt: empty,
    hint: empty
  };
}
