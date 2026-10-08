// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HistoryList from "@/components/history/HistoryList";
import LearningSession from "@/components/learn/LearningSession";
import FollowUpSection from "@/components/learn/FollowUpSection";
import type { LearningSessionRecord } from "@/components/learn/types";
import messages from "@/i18n/locales/en.json";
import { MAX_FOLLOW_UP_QUESTION_LENGTH } from "@/lib/constants";
import { makeSessionRecord } from "../../fixtures/session";
vi.mock("next/link", () => ({ default: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a> }));
const fetchMock = vi.fn();
const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status });
function mount(children: ReactNode, locale = "en") {
  return render(<NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>);
}
function session(overrides: Partial<LearningSessionRecord> = {}): LearningSessionRecord {
  return { ...makeSessionRecord(), adaptations: [], followUps: [], responseEvents: [], ...overrides };
}
beforeEach(() => vi.stubGlobal("fetch", fetchMock));
afterEach(cleanup);
describe("history recovery and date rendering", () => {
  it.each([
    [json({ error: "Unavailable" }, 503), "Unavailable"],
    [json({ error: { message: "Please retry" } }, 500), "Please retry"],
    [json({}), messages.history.errors.load],
    [json({ sessions: null }), messages.history.errors.load]
  ])("recovers from an invalid or failed history response %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(response).mockResolvedValueOnce(json({ sessions: [] }));
    mount(<HistoryList />);
    expect(await screen.findByText(message)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: messages.history.retry }));
    expect(await screen.findByText(messages.history.empty.title)).toBeTruthy();
    expect(screen.getByRole("link", { name: "New Inquiry" }).getAttribute("href")).toBe("/");
    expect(fetchMock).toHaveBeenLastCalledWith("/api/sessions", { signal: undefined });
  });
  it.each([new Error("Offline"), null])("handles initial and repeated retry rejections %#", async (error) => {
    fetchMock.mockRejectedValueOnce(error).mockRejectedValueOnce(error).mockResolvedValueOnce(json({ sessions: [] }));
    mount(<HistoryList />);
    const message = error instanceof Error ? error.message : messages.history.errors.load;
    expect(await screen.findByText(message)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: messages.history.retry }));
    expect(await screen.findByText(message)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: messages.history.retry }));
    expect(await screen.findByText(messages.history.empty.title)).toBeTruthy();
  });
  it.each(["en", "my"])("renders valid and invalid history dates for %s", async (locale) => {
    fetchMock.mockResolvedValueOnce(json({ sessions: [
      { ...session({ sessionId: "valid", understanding: null }), updatedAt: "2026-01-15T10:00:00Z" },
      { ...session({ sessionId: "invalid", understanding: "high", status: "completed" }), updatedAt: "not-a-date" }
    ] }));
    const view = mount(<HistoryList />, locale);
    await screen.findByRole("link", { name: messages.history.actions.completed });
    const times = view.container.querySelectorAll("time");
    expect(times[0].textContent).toBe(new Intl.DateTimeFormat(locale === "my" ? "my-MM" : "en-NZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date("2026-01-15T10:00:00Z")));
    expect(times[1].textContent).toBe("");
  });
  it("aborts an in-flight history request when unmounted without treating it as a failure", async () => {
    let signal!: AbortSignal;
    fetchMock.mockImplementation((_url: string, options: { signal: AbortSignal }) => new Promise((_resolve, reject) => {
      signal = options.signal;
      signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    }));
    const view = mount(<HistoryList />);
    expect(view.container.querySelector('[aria-busy="true"]')).toBeTruthy();
    view.unmount();
    expect(signal.aborted).toBe(true);
    await Promise.resolve();
  });
});

describe("session load and finish recovery", () => {
  it.each([
    [json({ error: "Session unavailable" }, 503), "Session unavailable"],
    [json({ error: { message: "Access denied" } }, 404), "Access denied"],
    [json({}), messages.session.errors.load]
  ])("recovers from load failure %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(response).mockResolvedValueOnce(json({ session: session() }));
    mount(<LearningSession sessionId="session-1" />);
    expect(await screen.findByText(message)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: messages.session.errors.retry }));
    expect(await screen.findByRole("heading", { name: "Gradient descent" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: messages.session.showHint }));
    expect(screen.getByText("Think about the slope.")).toBeTruthy();
  });
  it.each([new Error("Offline"), null])("shows an appropriate load rejection %#", async (error) => {
    fetchMock.mockRejectedValueOnce(error);
    mount(<LearningSession sessionId="session-1" />);
    expect(await screen.findByText(error instanceof Error ? error.message : messages.session.errors.load)).toBeTruthy();
  });
  it("aborts an in-flight session load on unmount", async () => {
    let signal!: AbortSignal;
    fetchMock.mockImplementation((_url: string, options: { signal: AbortSignal }) => new Promise((_resolve, reject) => {
      signal = options.signal;
      signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    }));
    const view = mount(<LearningSession sessionId="session-1" />);
    view.unmount();
    expect(signal.aborted).toBe(true);
    await Promise.resolve();
  });
  it("persists Finish separately from fade and displays the completed session", async () => {
    const current = session({ understanding: "high" });
    fetchMock.mockResolvedValueOnce(json({ session: current })).mockResolvedValueOnce(json({ session: { ...current, status: "completed" } }));
    mount(<LearningSession sessionId={current.sessionId} />);
    fireEvent.click(await screen.findByRole("button", { name: messages.session.finishLearning }));
    expect(await screen.findByText(messages.session.complete.title)).toBeTruthy();
    expect(fetchMock).toHaveBeenLastCalledWith(`/api/sessions/${current.sessionId}`, expect.objectContaining({ method: "PATCH", body: JSON.stringify({ status: "completed" }) }));
  });
  it.each([
    [json({ error: "Cannot finish" }, 500), "Cannot finish"],
    [json({}), messages.session.errors.complete]
  ])("retains a finish action after a controlled or malformed failure %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(json({ session: session({ understanding: "high" }) })).mockResolvedValueOnce(response);
    mount(<LearningSession sessionId="session-1" />);
    fireEvent.click(await screen.findByRole("button", { name: messages.session.finishLearning }));
    expect(await screen.findByText(message)).toBeTruthy();
    expect((screen.getByRole("button", { name: messages.session.finishLearning }) as HTMLButtonElement).disabled).toBe(false);
    expect(screen.queryByText(messages.session.complete.title)).toBeNull();
  });
  it.each([new Error("Offline"), null])("retains finish after request rejection %#", async (error) => {
    fetchMock.mockResolvedValueOnce(json({ session: session({ understanding: "high" }) })).mockRejectedValueOnce(error);
    mount(<LearningSession sessionId="session-1" />);
    fireEvent.click(await screen.findByRole("button", { name: messages.session.finishLearning }));
    expect(await screen.findByText(error instanceof Error ? error.message : messages.session.errors.complete)).toBeTruthy();
  });
});

describe("learner response output boundary", () => {
  const valid = { understanding: "high", status: "in_progress", adaptationRound: 0, route: "fade", adaptation: null };
  it.each([
    { ...valid, understanding: undefined },
    { ...valid, status: undefined },
    { ...valid, route: undefined },
    { ...valid, adaptationRound: "0" }
  ])("retains Stage 6 when a successful HTTP response has an incomplete contract %#", async (body) => {
    fetchMock.mockResolvedValueOnce(json({ session: session() })).mockResolvedValueOnce(json(body));
    mount(<LearningSession sessionId="session-1" />);
    fireEvent.click(await screen.findByRole("button", { name: messages.session.understanding.high }));
    expect(await screen.findByText(messages.session.errors.respond)).toBeTruthy();
    expect(screen.getByRole("button", { name: messages.session.understanding.high })).toBeTruthy();
    expect(screen.queryByRole("button", { name: messages.session.finishLearning })).toBeNull();
  });
  it("shows a fallback for a non-Error rejection and allows retry", async () => {
    fetchMock.mockResolvedValueOnce(json({ session: session() })).mockRejectedValueOnce(null).mockResolvedValueOnce(json(valid));
    mount(<LearningSession sessionId="session-1" />);
    fireEvent.click(await screen.findByRole("button", { name: messages.session.understanding.high }));
    expect(await screen.findByText(messages.session.errors.respond)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: messages.session.errors.retry }));
    expect(await screen.findByRole("button", { name: messages.session.finishLearning })).toBeTruthy();
  });
  it("reads the legacy message envelope and clears a response error on a different Stage 6B choice", async () => {
    fetchMock.mockResolvedValueOnce(json({ session: session() })).mockResolvedValueOnce(json({ message: "Try another support choice" }, 503));
    mount(<LearningSession sessionId="session-1" />);
    fireEvent.click(await screen.findByRole("button", { name: messages.session.understanding.medium }));
    fireEvent.click(screen.getByRole("button", { name: "Continue without a choice" }));
    expect(await screen.findByText("Try another support choice")).toBeTruthy();
    fireEvent.click(screen.getByRole("radio", { name: "A simpler explanation" }));
    expect(screen.queryByText("Try another support choice")).toBeNull();
  });
});

describe("concept-scoped follow-up UI", () => {
  it("submits a trimmed question, renders its answer and clears input without changing Stage 7", async () => {
    const current = session();
    fetchMock.mockResolvedValueOnce(json({ session: current })).mockResolvedValueOnce(json({ followUp: { question: "Why the slope?", answer: { en: "It controls the update direction.", my: "စမ်းသပ် အဖြေ" } } }));
    mount(<LearningSession sessionId={current.sessionId} />);
    const input = await screen.findByRole("textbox", { name: messages.session.followUp.inputLabel });
    fireEvent.change(input, { target: { value: "  Why the slope?  " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(await screen.findByText("It controls the update direction.")).toBeTruthy();
    expect((input as HTMLInputElement).value).toBe("");
    expect(fetchMock).toHaveBeenLastCalledWith(`/api/sessions/${current.sessionId}/followup`, expect.objectContaining({ method: "POST", body: JSON.stringify({ question: "Why the slope?" }) }));
    expect(screen.getByRole("button", { name: messages.session.understanding.high })).toBeTruthy();
  });
  it.each([
    [json({ error: "Cannot answer" }, 503), "Cannot answer"],
    [json({}), messages.session.errors.followUp]
  ])("retains the question after response failure and clears the error on editing %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(json({ session: session() })).mockResolvedValueOnce(response);
    mount(<LearningSession sessionId="session-1" />);
    const input = await screen.findByRole("textbox", { name: messages.session.followUp.inputLabel });
    fireEvent.change(input, { target: { value: "Why?" } });
    fireEvent.click(screen.getByRole("button", { name: messages.session.followUp.ask }));
    expect(await screen.findByText(message)).toBeTruthy();
    expect((input as HTMLInputElement).value).toBe("Why?");
    fireEvent.change(input, { target: { value: "Why this slope?" } });
    expect(screen.queryByText(message)).toBeNull();
  });
  it.each([new Error("Offline"), null])("recovers the follow-up input after rejection %#", async (error) => {
    fetchMock.mockResolvedValueOnce(json({ session: session() })).mockRejectedValueOnce(error);
    mount(<LearningSession sessionId="session-1" />);
    const input = await screen.findByRole("textbox", { name: messages.session.followUp.inputLabel });
    fireEvent.change(input, { target: { value: "Why?" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(await screen.findByText(error instanceof Error ? error.message : messages.session.errors.followUp)).toBeTruthy();
    expect((input as HTMLInputElement).disabled).toBe(false);
  });
  it("prevents a duplicate pending follow-up and enforces the displayed two-question limit", async () => {
    let resolve!: (value: Response) => void;
    const first = { question: "First question", answer: { en: "First answer", my: "ပထမ" }, createdAt: "2026-01-15T10:00:00Z" };
    fetchMock.mockResolvedValueOnce(json({ session: session({ followUps: [first] }) })).mockReturnValueOnce(new Promise<Response>((done) => { resolve = done; }));
    mount(<LearningSession sessionId="session-1" />);
    const input = await screen.findByRole("textbox", { name: messages.session.followUp.inputLabel });
    fireEvent.change(input, { target: { value: "Second question" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect((input as HTMLInputElement).disabled).toBe(true);
    resolve(json({ followUp: { question: "Second question", answer: { en: "Second answer", my: "ဒုတိယ" } } }));
    expect(await screen.findByText("Second answer")).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: messages.session.followUp.inputLabel })).toBeNull();
    expect(screen.getByText(messages.session.followUp.limit)).toBeTruthy();
  });
  it("guards blank keyboard submission, exposes the input bound and reports sending/error state", () => {
    const submit = vi.fn();
    const change = vi.fn();
    const props: ComponentProps<typeof FollowUpSection> = { concept: "Slope", followUps: [], question: " ", error: "Controlled error", isSending: false, locale: "en", supportLanguage: "english", onQuestionChange: change, onSubmit: submit };
    const view = mount(<FollowUpSection {...props} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.maxLength).toBe(MAX_FOLLOW_UP_QUESTION_LENGTH);
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "a" });
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toBe("Controlled error");
    fireEvent.change(input, { target: { value: "Why?" } });
    expect(change).toHaveBeenCalledWith("Why?");
    view.rerender(<NextIntlClientProvider locale="en" messages={messages}><FollowUpSection {...props} question="Why?" isSending /></NextIntlClientProvider>);
    expect((screen.getByRole("button", { name: messages.session.followUp.sending }) as HTMLButtonElement).disabled).toBe(true);
  });
});
