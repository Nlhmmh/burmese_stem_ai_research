// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import HistoryList from "@/components/history/HistoryList";
import LearningSession from "@/components/learn/LearningSession";
import type { LearningSessionRecord } from "@/components/learn/types";
import messages from "@/i18n/locales/en.json";
import { makeSessionRecord } from "../../fixtures/session";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}));

describe("session review and resume continuity", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => cleanup());

  it("renders every stored response route and adaptation during completed review", async () => {
    const previous = { name: "Cell", domain: "Biology" };
    const current = { name: "Spreadsheet cell", domain: "Computing" };
    const session = clientSession({
      concept: current,
      status: "completed",
      understanding: "needs_support",
      adaptationRound: 2,
      responseEvents: [
        responseEvent("fade", "high", null, 0, 0, 1),
        responseEvent("stage_5_scaffold", "medium", "another_example", 0, 1, 2),
        responseEvent("language_support", "medium", "language_terms", 1, 2, 3),
        responseEvent("concept_clarification", "needs_support", "concept_unclear", 2, 2, 4),
        {
          ...responseEvent(
            "context_reinterpretation",
            "needs_support",
            "concept_mismatch",
            2,
            2,
            5
          ),
          conceptReinterpretation: {
            clarification: "I meant a spreadsheet cell.",
            outcome: "limit_reached",
            previous,
            current
          }
        }
      ],
      adaptations: [
        {
          learnerResponse: "medium",
          supportType: "another_example",
          content: { en: "Stored adaptation one", my: "သိမ်းထားသော ပံ့ပိုးမှု တစ်" },
          round: 1,
          createdAt: "2026-01-15T10:02:00.000Z"
        },
        {
          learnerResponse: "medium",
          supportType: "clarification",
          content: { en: "Stored adaptation two", my: "သိမ်းထားသော ပံ့ပိုးမှု နှစ်" },
          presentationOverride: "bilingual",
          round: 2,
          createdAt: "2026-01-15T10:03:00.000Z"
        }
      ]
    });
    fetchMock.mockResolvedValueOnce(jsonResponse({ session }));

    renderWithMessages(<LearningSession sessionId={session.sessionId} />);

    expect(await screen.findByText("Response 1")).toBeTruthy();
    expect(screen.getByText("Response 5")).toBeTruthy();
    for (const routeLabel of [
      "No additional support",
      "Additional scaffold",
      "Bilingual language support",
      "Concept clarification",
      "Concept or context correction"
    ]) {
      expect(screen.getByText(routeLabel)).toBeTruthy();
    }
    expect(screen.getByText("Stored adaptation one")).toBeTruthy();
    expect(screen.getByText("Stored adaptation two")).toBeTruthy();
    expect(screen.getByText(/Correction limit reached: Cell → Spreadsheet cell/)).toBeTruthy();
    expect(screen.getByText("Session Complete")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "I understand" })).toBeNull();
  });

  it.each([
    ["in_progress", 0, null, "I understand"],
    ["in_progress", 1, "medium", "I partially understand"],
    ["in_progress", 2, "needs_support", "Finish for Now"],
    ["review_recommended", 0, "needs_support", "Finish for Now"],
    ["review_recommended", 2, "needs_support", "Finish for Now"],
    ["in_progress", 0, "high", "Finish Learning ✓"]
  ] as const)(
    "restores %s round %s support %s to action %s",
    async (status, adaptationRound, understanding, action) => {
      const session = clientSession({ status, adaptationRound, understanding });
      fetchMock.mockResolvedValueOnce(jsonResponse({ session }));

      renderWithMessages(<LearningSession sessionId={session.sessionId} />);

      expect(await screen.findByRole("button", { name: action })).toBeTruthy();
    }
  );

  it("renders a normalised legacy session without a preference snapshot", async () => {
    const session = clientSession({
      status: "completed",
      adaptations: [],
      responseEvents: [],
      followUps: [],
      preferencesSnapshot: undefined
    });
    fetchMock.mockResolvedValueOnce(jsonResponse({ session }));

    renderWithMessages(<LearningSession sessionId={session.sessionId} />);

    expect(await screen.findByText("No refined support response was recorded for this session.")).toBeTruthy();
    expect(screen.getByText("Simple explanation")).toBeTruthy();
    expect(screen.getByText("ရိုးရှင်းသော ရှင်းလင်းချက်")).toBeTruthy();
  });

  it("labels history values as self-reported support", async () => {
    const session = clientSession({ understanding: "medium", status: "in_progress" });
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        sessions: [
          {
            sessionId: session.sessionId,
            concept: session.concept,
            understanding: session.understanding,
            status: session.status,
            updatedAt: "2026-01-15T10:00:00.000Z"
          }
        ]
      })
    );

    renderWithMessages(<HistoryList />);

    expect(await screen.findByText("Self-reported support")).toBeTruthy();
    expect(screen.getByText("Some support")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Resume" })).toBeTruthy();
  });
});

function responseEvent(
  route: LearningSessionRecord["responseEvents"][number]["route"],
  overallSupportNeed: LearningSessionRecord["responseEvents"][number]["overallSupportNeed"],
  difficultyType: LearningSessionRecord["responseEvents"][number]["difficultyType"],
  roundBefore: number,
  roundAfter: number,
  minute: number
): LearningSessionRecord["responseEvents"][number] {
  return {
    overallSupportNeed,
    difficultyType,
    route,
    roundBefore,
    roundAfter,
    createdAt: `2026-01-15T10:0${minute}:00.000Z`
  };
}

function clientSession(
  overrides: Partial<LearningSessionRecord> = {}
): LearningSessionRecord {
  const session = makeSessionRecord();
  return {
    sessionId: session.sessionId,
    originalQuestion: session.originalQuestion,
    concept: session.concept,
    explanations: session.explanations,
    reflectivePrompt: session.reflectivePrompt,
    hint: session.hint,
    understanding: session.understanding,
    status: session.status,
    adaptationRound: session.adaptationRound,
    adaptations: session.adaptations.map((adaptation) => ({
      ...adaptation,
      createdAt: adaptation.createdAt.toISOString()
    })),
    responseEvents: (session.responseEvents ?? []).map((event) => ({
      ...event,
      createdAt: event.createdAt.toISOString()
    })),
    followUps: session.followUps.map((followUp) => ({
      ...followUp,
      createdAt: followUp.createdAt.toISOString()
    })),
    preferencesSnapshot: session.preferencesSnapshot,
    ...overrides
  };
}

function renderWithMessages(children: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: vi.fn().mockResolvedValue(body) } as unknown as Response;
}
