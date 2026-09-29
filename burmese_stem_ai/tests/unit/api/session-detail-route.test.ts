import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { makeSessionRecord } from "../../fixtures/session";

const daoMocks = vi.hoisted(() => ({
  completeSession: vi.fn(),
  findSession: vi.fn()
}));

vi.mock("@/data/dao/session.dao", () => ({
  completeSession: daoMocks.completeSession,
  findSession: daoMocks.findSession
}));

import { GET } from "@/app/api/sessions/[sessionId]/route";

describe("session detail continuity API", () => {
  beforeEach(() => daoMocks.findSession.mockReset());

  it("returns the current concept and complete persisted interaction history", async () => {
    const previous = { name: "Cell", domain: "Biology" };
    const current = { name: "Spreadsheet cell", domain: "Computing" };
    const session = makeSessionRecord({
      concept: current,
      understanding: "needs_support",
      status: "completed",
      adaptationRound: 2,
      adaptations: [
        {
          learnerResponse: "medium",
          supportType: "concept_correction",
          content: { en: "Corrected support", my: "ပြင်ဆင်ထားသော ပံ့ပိုးမှု" },
          conceptCorrection: { previous, corrected: current },
          round: 1,
          createdAt: new Date("2026-01-15T10:01:00.000Z")
        }
      ],
      responseEvents: [
        {
          overallSupportNeed: "medium",
          difficultyType: "concept_mismatch",
          route: "context_reinterpretation",
          roundBefore: 0,
          roundAfter: 1,
          conceptReinterpretation: {
            clarification: "I meant a spreadsheet cell.",
            outcome: "corrected",
            previous,
            current
          },
          createdAt: new Date("2026-01-15T10:01:00.000Z")
        },
        {
          overallSupportNeed: "needs_support",
          difficultyType: "language_terms",
          route: "language_support",
          roundBefore: 1,
          roundAfter: 2,
          createdAt: new Date("2026-01-15T10:02:00.000Z")
        }
      ]
    });
    daoMocks.findSession.mockResolvedValue(session);

    const response = await GET(request(session.learnerId), routeContext(session.sessionId));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.session).toMatchObject({
      sessionId: session.sessionId,
      concept: current,
      status: "completed",
      adaptationRound: 2,
      adaptations: [expect.objectContaining({ supportType: "concept_correction" })],
      responseEvents: [
        expect.objectContaining({ route: "context_reinterpretation" }),
        expect.objectContaining({ route: "language_support" })
      ],
      preferencesSnapshot: session.preferencesSnapshot
    });
    expect(daoMocks.findSession).toHaveBeenCalledWith(
      session.learnerId,
      session.sessionId
    );
  });

  it("normalises a legacy detail response with no refined history or snapshot", async () => {
    const legacySession = makeSessionRecord();
    Object.assign(legacySession, {
      adaptations: undefined,
      responseEvents: undefined,
      followUps: undefined,
      preferencesSnapshot: undefined
    });
    daoMocks.findSession.mockResolvedValue(legacySession);

    const response = await GET(
      request(legacySession.learnerId),
      routeContext(legacySession.sessionId)
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.session).toMatchObject({
      adaptations: [],
      responseEvents: [],
      followUps: []
    });
    expect(body.session).not.toHaveProperty("preferencesSnapshot");
  });
});

function request(learnerId: string): NextRequest {
  return new NextRequest("http://localhost/api/sessions/session-id", {
    headers: { "x-learner-id": learnerId }
  });
}

function routeContext(sessionId: string) {
  return { params: Promise.resolve({ sessionId }) };
}
