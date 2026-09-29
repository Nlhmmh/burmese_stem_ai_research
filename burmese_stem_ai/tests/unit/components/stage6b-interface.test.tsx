// @vitest-environment jsdom

import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { useState, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import LearningSession from "@/components/learn/LearningSession";
import { Stage6BPanel } from "@/components/learn/SessionContent";
import type { LearningSessionRecord } from "@/components/learn/types";
import type { DifficultyType } from "@/lib/session-domain";
import messages from "@/i18n/locales/en.json";
import { makeSessionRecord } from "../../fixtures/session";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}));

const difficultyCases = [
  {
    label: "A simpler explanation",
    difficultyType: "simpler_explanation",
    route: "stage_5_scaffold"
  },
  {
    label: "Another example",
    difficultyType: "another_example",
    route: "stage_5_scaffold"
  },
  {
    label: "Help with Burmese / English terms",
    difficultyType: "language_terms",
    route: "language_support"
  },
  {
    label: "I do not understand the concept",
    difficultyType: "concept_unclear",
    route: "concept_clarification"
  },
  {
    label: "The concept or term is not what I meant",
    difficultyType: "concept_mismatch",
    route: "context_reinterpretation"
  }
] as const;

describe("Stage 6B learner interface", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
  });

  it("submits High immediately through the fade route", async () => {
    arrangeSessionFetch();
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        understanding: "high",
        status: "in_progress",
        adaptationRound: 0,
        route: "fade",
        adaptation: null
      })
    );
    const user = userEvent.setup();
    renderLearningSession();

    await user.click(await screen.findByRole("button", { name: "I understand" }));

    await waitFor(() => expect(postedRequest()).toEqual({ overallSupportNeed: "high" }));
    expect(await screen.findByText("Support route: No additional support")).toBeTruthy();
  });

  it.each([
    ["I partially understand", "I partially understand"],
    ["I need more explanation", "I need more explanation"]
  ] as const)("opens optional Stage 6B after %s", async (buttonName, selectedNeed) => {
    arrangeSessionFetch();
    const user = userEvent.setup();
    renderLearningSession();

    await user.click(await screen.findByRole("button", { name: buttonName }));

    expect(screen.getByRole("radiogroup", { name: "What would help you most?" })).toBeTruthy();
    expect(screen.getByText(`Selected response: ${selectedNeed}`)).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it.each(difficultyCases)(
    "submits the bounded $difficultyType choice",
    async ({ label, difficultyType, route }) => {
      arrangeSessionFetch();
      fetchMock.mockResolvedValueOnce(
        jsonResponse({
          understanding: "medium",
          status: "in_progress",
          adaptationRound: 1,
          route,
          adaptation: {
            learnerResponse: "medium",
            supportType:
              difficultyType === "concept_mismatch" ? "concept_correction" : "clarification",
            content: { en: "Adapted support", my: "ပြင်ဆင်ထားသော အကူအညီ" },
            round: 1,
            createdAt: "2026-01-15T10:02:00.000Z"
          }
        })
      );
      const user = userEvent.setup();
      renderLearningSession();
      await user.click(await screen.findByRole("button", { name: "I partially understand" }));
      await user.click(screen.getByRole("radio", { name: label }));

      if (difficultyType === "concept_mismatch") {
        const continueButton = screen.getByRole("button", { name: "Continue with this choice" });
        expect((continueButton as HTMLButtonElement).disabled).toBe(true);
        await user.type(
          screen.getByRole("textbox", { name: "What term or context did you mean?" }),
          "I meant a spreadsheet cell."
        );
      }
      await user.click(screen.getByRole("button", { name: "Continue with this choice" }));

      await waitFor(() => {
        expect(postedRequest()).toEqual({
          overallSupportNeed: "medium",
          difficultyType,
          ...(difficultyType === "concept_mismatch"
            ? { conceptClarification: "I meant a spreadsheet cell." }
            : {})
        });
      });
      expect(await screen.findByText(/Support route:/)).toBeTruthy();
    }
  );

  it("supports a clear skip without forcing a difficulty choice", async () => {
    arrangeSessionFetch();
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        understanding: "needs_support",
        status: "in_progress",
        adaptationRound: 1,
        route: "stage_5_scaffold",
        adaptation: null
      })
    );
    const user = userEvent.setup();
    renderLearningSession();
    await user.click(await screen.findByRole("button", { name: "I need more explanation" }));
    await user.click(screen.getByRole("button", { name: "Continue without a choice" }));

    await waitFor(() =>
      expect(postedRequest()).toEqual({ overallSupportNeed: "needs_support" })
    );
  });

  it("cancels Stage 6B without submitting and returns to Stage 6A", async () => {
    arrangeSessionFetch();
    const user = userEvent.setup();
    renderLearningSession();
    await user.click(await screen.findByRole("button", { name: "I partially understand" }));
    await user.click(screen.getByRole("radio", { name: "Another example" }));
    await user.click(screen.getByRole("button", { name: "Back to understanding choices" }));

    expect(screen.getByRole("button", { name: "I partially understand" })).toBeTruthy();
    expect(screen.queryByRole("radiogroup", { name: "What would help you most?" })).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows loading and adapting states", async () => {
    const load = deferred<Response>();
    const adaptation = deferred<Response>();
    fetchMock.mockReturnValueOnce(load.promise).mockReturnValueOnce(adaptation.promise);
    const user = userEvent.setup();
    renderLearningSession();

    expect(screen.getByLabelText("Loading learning session").getAttribute("aria-busy")).toBe(
      "true"
    );
    load.resolve(jsonResponse({ session: clientSession() }));
    await user.click(await screen.findByRole("button", { name: "I partially understand" }));
    await user.click(screen.getByRole("button", { name: "Continue without a choice" }));
    expect(screen.getByText("Preparing additional support...")).toBeTruthy();

    adaptation.resolve(
      jsonResponse({
        understanding: "medium",
        status: "in_progress",
        adaptationRound: 1,
        route: "stage_5_scaffold",
        adaptation: null
      })
    );
    expect(await screen.findByText("Support route: Additional scaffold")).toBeTruthy();
  });

  it("retries a failed adaptation with the same bounded request", async () => {
    arrangeSessionFetch();
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({ error: { message: "Temporary adaptation failure" } }, false)
      )
      .mockResolvedValueOnce(
        jsonResponse({
          understanding: "medium",
          status: "in_progress",
          adaptationRound: 1,
          route: "stage_5_scaffold",
          adaptation: null
        })
      );
    const user = userEvent.setup();
    renderLearningSession();
    await user.click(await screen.findByRole("button", { name: "I partially understand" }));
    await user.click(screen.getByRole("button", { name: "Continue without a choice" }));

    expect((await screen.findByRole("alert")).textContent).toContain(
      "Temporary adaptation failure"
    );
    await user.click(within(screen.getByRole("alert")).getByRole("button", { name: "Try again" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    expect(postedRequests()).toEqual([
      { overallSupportNeed: "medium" },
      { overallSupportNeed: "medium" }
    ]);
  });

  it("retries a failed initial session load", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ error: { message: "Load failed" } }, false))
      .mockResolvedValueOnce(jsonResponse({ session: clientSession() }));
    const user = userEvent.setup();
    renderLearningSession();

    expect(await screen.findByText("Load failed")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Gradient descent")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("shows the existing two-round limit state without Stage 6 controls", async () => {
    arrangeSessionFetch(
      clientSession({
        understanding: "needs_support",
        adaptationRound: 2,
        status: "review_recommended"
      })
    );
    renderLearningSession();

    expect(
      await screen.findByText(
        "Maximum support provided. You can revisit this concept in your history."
      )
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: "I partially understand" })).toBeNull();
  });

  it("uses a one-column mobile-first choice grid", () => {
    renderStage6BPanel();

    const group = screen.getByRole("radiogroup", { name: "What would help you most?" });
    expect(group.className).toContain("grid-cols-1");
    expect(group.className).toContain("sm:grid-cols-2");
  });

  it("supports keyboard selection and exposes native radio state", async () => {
    const user = userEvent.setup();
    renderStage6BPanel();
    const option = screen.getByRole("radio", { name: "A simpler explanation" });

    option.focus();
    await user.keyboard(" ");

    expect((option as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("button", { name: "Continue with this choice" })).not.toHaveProperty(
      "disabled",
      true
    );
  });
});

function Stage6BHarness() {
  const [selected, setSelected] = useState<DifficultyType | null>(null);
  const [clarification, setClarification] = useState("");
  return (
    <Stage6BPanel
      overallSupportNeed="medium"
      selectedDifficulty={selected}
      conceptClarification={clarification}
      isSubmitting={false}
      onSelect={setSelected}
      onClarificationChange={setClarification}
      onSubmit={() => undefined}
      onSkip={() => undefined}
      onCancel={() => undefined}
    />
  );
}

function renderLearningSession() {
  return renderWithMessages(<LearningSession sessionId="session-a" />);
}

function renderStage6BPanel() {
  return renderWithMessages(<Stage6BHarness />);
}

function renderWithMessages(children: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

function arrangeSessionFetch(session = clientSession()) {
  fetchMocked().mockResolvedValueOnce(jsonResponse({ session }));
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

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: vi.fn().mockResolvedValue(body) } as unknown as Response;
}

function postedRequests(): unknown[] {
  return fetchMocked().mock.calls
    .filter((call) => String(call[0]).endsWith("/respond"))
    .map((call) => JSON.parse(String((call[1] as RequestInit).body)));
}

function postedRequest(): unknown {
  return postedRequests().at(-1);
}

function fetchMocked() {
  return fetch as unknown as ReturnType<typeof vi.fn>;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}
