// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomeInquiry from "@/components/home/HomeInquiry";
import PreferencesDialog from "@/components/home/PreferencesDialog";
import messages from "@/i18n/locales/en.json";
import { DEFAULT_PREFERENCES, EXAMPLE_PROMPTS, MAX_QUESTION_LENGTH } from "@/lib/constants";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
const fetchMock = vi.fn();
const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status });
function home() {
  return render(<NextIntlClientProvider locale="en" messages={messages}><HomeInquiry /></NextIntlClientProvider>);
}
const input = () => screen.getByRole("textbox") as HTMLTextAreaElement;
const ask = () => screen.getByRole("button", { name: /^Ask/ }) as HTMLButtonElement;
beforeEach(() => vi.stubGlobal("fetch", fetchMock));
afterEach(cleanup);

describe("home inquiry boundaries and recovery", () => {
  it("blocks blank input and Shift+Enter, and examples only populate the question", () => {
    home();
    expect(ask().disabled).toBe(true);
    expect(input().maxLength).toBe(MAX_QUESTION_LENGTH);
    fireEvent.keyDown(input(), { key: "Enter" });
    fireEvent.change(input(), { target: { value: "   " } });
    fireEvent.keyDown(input(), { key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: EXAMPLE_PROMPTS[0] }));
    expect(input().value).toBe(EXAMPLE_PROMPTS[0]);
    fireEvent.keyDown(input(), { key: "Enter", shiftKey: true });
    fireEvent.keyDown(input(), { key: "a" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("trims input, prevents duplicate requests while pending, and navigates on success", async () => {
    let resolve!: (value: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise<Response>((done) => { resolve = done; }));
    home();
    fireEvent.change(input(), { target: { value: "  What is mass?  " } });
    fireEvent.keyDown(input(), { key: "Enter" });
    expect(input().disabled).toBe(true);
    expect((screen.getByRole("button", { name: /Preparing/ }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.keyDown(input(), { key: "Enter" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/sessions", expect.objectContaining({
      method: "POST", body: JSON.stringify({ question: "What is mass?" })
    }));
    resolve(json({ session: { sessionId: "session-1" } }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/learn/session-1"));
  });

  it.each([
    [json({ error: "Controlled failure" }, 503), "Controlled failure"],
    [json({ error: { message: "Try again" } }, 400), "Try again"],
    [json({}), messages.home.errors.create],
    [json({ error: {} }, 500), messages.home.errors.create],
    [json({ session: {} }), messages.home.errors.create]
  ])("shows controlled or fallback errors and clears them when input changes %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(response);
    home();
    fireEvent.change(input(), { target: { value: "cell" } });
    fireEvent.click(ask());
    expect(await screen.findByText(message)).toBeTruthy();
    expect(push).not.toHaveBeenCalled();
    expect(input().disabled).toBe(false);
    fireEvent.change(input(), { target: { value: "current" } });
    expect(screen.queryByText(message)).toBeNull();
  });

  it.each([new Error("Offline"), "unexpected rejection"])("recovers from a rejected provider request %#", async (error) => {
    fetchMock.mockRejectedValueOnce(error).mockResolvedValueOnce(json({ session: { sessionId: "retry" } }));
    home();
    fireEvent.change(input(), { target: { value: "mass" } });
    fireEvent.click(ask());
    expect(await screen.findByText(error instanceof Error ? error.message : messages.home.errors.create)).toBeTruthy();
    fireEvent.click(ask());
    await waitFor(() => expect(push).toHaveBeenCalledWith("/learn/retry"));
  });

  it("handles invalid JSON without navigating", async () => {
    fetchMock.mockResolvedValueOnce(new Response("not JSON"));
    const view = home();
    fireEvent.change(input(), { target: { value: "ion" } });
    fireEvent.click(ask());
    await waitFor(() => expect(view.container.querySelector('[aria-live="polite"]')?.textContent).not.toBe(""));
    expect(push).not.toHaveBeenCalled();
    expect(input().disabled).toBe(false);
  });
});

describe("learning preferences load, save and cancellation", () => {
  it("loads preferences, changes all three learning fields, and saves no browser preferences", async () => {
    fetchMock.mockResolvedValueOnce(json({ preferences: DEFAULT_PREFERENCES })).mockResolvedValueOnce(json({}));
    home();
    fireEvent.click(screen.getByRole("button", { name: /Learning Preferences/ }));
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    fireEvent.click(screen.getByRole("button", { name: "Advanced" }));
    fireEvent.click(screen.getByRole("button", { name: "More Examples" }));
    fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(fetchMock).toHaveBeenLastCalledWith("/api/preferences", expect.objectContaining({
      method: "PATCH", body: JSON.stringify({ supportLanguage: "english", explanationLevel: "advanced", learningStyle: "more_examples" })
    }));
  });

  it.each([
    [json({ error: "Cannot load" }, 500), "Cannot load"],
    [json({ error: { message: "Unavailable" } }, 503), "Unavailable"],
    [json({}), messages.home.errors.loadPreferences]
  ])("closes the dialog after a failed load %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(response);
    home();
    fireEvent.click(screen.getByRole("button", { name: /Learning Preferences/ }));
    expect(await screen.findByText(message)).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it.each([new Error("Offline"), null])("handles preference load rejection %#", async (error) => {
    fetchMock.mockRejectedValueOnce(error);
    home();
    fireEvent.click(screen.getByRole("button", { name: /Learning Preferences/ }));
    expect(await screen.findByText(error instanceof Error ? error.message : messages.home.errors.loadPreferences)).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it.each([
    [json({ error: "Save failed" }, 500), "Save failed"],
    [json({ error: {} }, 500), messages.home.errors.savePreferences]
  ])("retains the dialog and permits retry after save failure %#", async (response, message) => {
    fetchMock.mockResolvedValueOnce(json({ preferences: DEFAULT_PREFERENCES })).mockResolvedValueOnce(response).mockResolvedValueOnce(json({}));
    home();
    fireEvent.click(screen.getByRole("button", { name: /Learning Preferences/ }));
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
    expect(await screen.findByText(message)).toBeTruthy();
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it.each([new Error("Offline"), null])("handles preference save rejection without losing the form %#", async (error) => {
    fetchMock.mockResolvedValueOnce(json({ preferences: DEFAULT_PREFERENCES })).mockRejectedValueOnce(error);
    home();
    fireEvent.click(screen.getByRole("button", { name: /Learning Preferences/ }));
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
    expect(await screen.findByText(error instanceof Error ? error.message : messages.home.errors.savePreferences)).toBeTruthy();
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("closes preferences without making a save request", async () => {
    fetchMock.mockResolvedValueOnce(json({ preferences: DEFAULT_PREFERENCES }));
    home();
    fireEvent.click(screen.getByRole("button", { name: /Learning Preferences/ }));
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Close preferences" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("dismisses only on Escape or the backdrop and removes its key listener on unmount", () => {
    const close = vi.fn();
    const save = vi.fn();
    const view = render(<NextIntlClientProvider locale="en" messages={messages}><PreferencesDialog preferences={DEFAULT_PREFERENCES} isSaving onChange={vi.fn()} onClose={close} onSave={save} /></NextIntlClientProvider>);
    expect((screen.getByRole("button", { name: "Saving..." }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.mouseDown(screen.getByRole("dialog"));
    fireEvent.keyDown(window, { key: "Enter" });
    expect(close).not.toHaveBeenCalled();
    fireEvent.mouseDown(screen.getByRole("dialog").parentElement!);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(close).toHaveBeenCalledTimes(2);
    expect(save).not.toHaveBeenCalled();
    view.unmount();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(close).toHaveBeenCalledTimes(2);
  });
});
