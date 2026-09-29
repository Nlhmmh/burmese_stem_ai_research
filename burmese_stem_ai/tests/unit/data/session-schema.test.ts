import mongoose from "mongoose";
import { afterAll, describe, expect, it } from "vitest";

import { sessionSchema } from "@/data/schemas/session.schema";
import { makeSessionRecord } from "../../fixtures/session";

const MODEL_NAME = "UnitTestLearningSession";
const SessionSchemaModel = mongoose.model(MODEL_NAME, sessionSchema.clone());

afterAll(() => {
  mongoose.deleteModel(MODEL_NAME);
});

describe("session response-event schema", () => {
  it("loads a legacy document with an empty response-event history", async () => {
    const legacySession = makeSessionRecord();
    delete legacySession.responseEvents;
    const document = new SessionSchemaModel(legacySession);

    await expect(document.validate()).resolves.toBeUndefined();
    expect(document.get("responseEvents")).toEqual([]);
  });

  it("validates reconstructable fade, adapted, and capped events", async () => {
    const session = makeSessionRecord({
      adaptationRound: 2,
      responseEvents: [
        {
          overallSupportNeed: "high",
          difficultyType: null,
          route: "fade",
          roundBefore: 0,
          roundAfter: 0,
          createdAt: new Date("2026-01-15T10:01:00.000Z")
        },
        {
          overallSupportNeed: "medium",
          difficultyType: "another_example",
          route: "stage_5_scaffold",
          roundBefore: 0,
          roundAfter: 1,
          createdAt: new Date("2026-01-15T10:02:00.000Z")
        },
        {
          overallSupportNeed: "needs_support",
          difficultyType: "concept_unclear",
          route: "concept_clarification",
          roundBefore: 2,
          roundAfter: 2,
          createdAt: new Date("2026-01-15T10:03:00.000Z")
        }
      ]
    });
    const document = new SessionSchemaModel(session);

    await expect(document.validate()).resolves.toBeUndefined();
    expect(document.get("responseEvents")).toHaveLength(3);
  });

  it("validates only the route-specific adaptation metadata needed later", async () => {
    const session = makeSessionRecord({
      adaptationRound: 1,
      adaptations: [
        {
          learnerResponse: "needs_support",
          supportType: "clarification",
          content: { en: "Revised support", my: "ပြန်လည် ရှင်းလင်းချက်" },
          presentationOverride: "bilingual",
          conceptCorrection: {
            previous: { name: "Cell", domain: "Biology" },
            corrected: { name: "Spreadsheet cell", domain: "Computing" }
          },
          round: 1,
          createdAt: new Date("2026-01-15T10:02:00.000Z")
        }
      ]
    });

    await expect(new SessionSchemaModel(session).validate()).resolves.toBeUndefined();
  });

  it("rejects an unbounded response route", async () => {
    const invalidSession = {
      ...makeSessionRecord(),
      responseEvents: [
        {
          overallSupportNeed: "medium",
          difficultyType: null,
          route: "unbounded_chat",
          roundBefore: 0,
          roundAfter: 1,
          createdAt: new Date()
        }
      ]
    };

    await expect(new SessionSchemaModel(invalidSession).validate()).rejects.toThrow();
  });

  it("rejects an unsupported presentation override", async () => {
    const invalidSession = {
      ...makeSessionRecord(),
      adaptations: [
        {
          learnerResponse: "medium",
          supportType: "clarification",
          content: { en: "Support", my: "အကူအညီ" },
          presentationOverride: "all_languages",
          round: 1,
          createdAt: new Date()
        }
      ]
    };

    await expect(new SessionSchemaModel(invalidSession).validate()).rejects.toThrow();
  });
});
