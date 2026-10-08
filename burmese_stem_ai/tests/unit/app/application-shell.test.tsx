// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { APP_NAME } from "@/lib/constants";
const mocks = vi.hoisted(() => ({ getLocale: vi.fn(), getTranslations: vi.fn(), cookies: vi.fn(), setCookie: vi.fn() }));
vi.mock("next/font/google", () => ({ Outfit: () => ({ variable: "outfit" }), Geist_Mono: () => ({ variable: "mono" }) }));
vi.mock("next-intl/server", () => ({ getLocale: mocks.getLocale, getTranslations: mocks.getTranslations }));
vi.mock("next/dist/server/request/cookies", () => ({ cookies: mocks.cookies }));
vi.mock("@/components/home/HomeInquiry", () => ({ default: () => <div>Home inquiry component</div> }));
vi.mock("@/components/history/HistoryList", () => ({ default: () => <div>History list component</div> }));
vi.mock("@/components/learn/LearningSession", () => ({ default: ({ sessionId }: { sessionId: string }) => <div>Session {sessionId}</div> }));
vi.mock("@/components/layout/AppHeader", () => ({ default: () => null }));
afterEach(cleanup);
describe("application entry points", () => {
  it("renders the home inquiry entry point", async () => {
    const Home = (await import("@/app/page")).default;
    render(<Home />);
    expect(screen.getByText("Home inquiry component")).toBeTruthy();
  });
  it("loads translated history headings and the history component", async () => {
    mocks.getTranslations.mockResolvedValue((key: string) => `history-${key}`);
    const History = (await import("@/app/history/page")).default;
    render(await History());
    expect(mocks.getTranslations).toHaveBeenCalledWith("history");
    expect(screen.getByRole("heading", { name: "history-title" })).toBeTruthy();
    expect(screen.getByText("history-subtitle")).toBeTruthy();
    expect(screen.getByText("History list component")).toBeTruthy();
  });
  it("awaits the route parameter before passing it to the session component", async () => {
    const Page = (await import("@/app/learn/[sessionId]/page")).default;
    render(await Page({ params: Promise.resolve({ sessionId: "owned-session" }) }));
    expect(screen.getByText("Session owned-session")).toBeTruthy();
  });
  it("returns a JSON response from the API health entry point", async () => {
    const { GET } = await import("@/app/api/route");
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(await response.json()).toEqual({ message: "Hello from Burmese STEM AI API!" });
  });
  it.each([undefined, "https://example.test"])("constructs metadata, locale and server cookie action with base URL %s", async (url) => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_APP_URL", url);
    mocks.getLocale.mockResolvedValue("my");
    mocks.cookies.mockResolvedValue({ set: mocks.setCookie });
    const { default: Layout, metadata } = await import("@/app/layout");
    expect(metadata.metadataBase?.toString()).toBe(`${url ?? "http://localhost:3000"}/`);
    expect(metadata.title).toBe(APP_NAME);
    const root = await Layout({ children: "content", params: Promise.resolve({}) }) as ReactElement<{ lang: string; className: string; children: ReactElement<{ children: ReactElement<{ children: ReactNode[] }> }> }>;
    expect(root.type).toBe("html");
    expect(root.props.lang).toBe("my");
    expect(root.props.className).toContain("outfit mono");
    const children = root.props.children.props.children.props.children;
    expect(children[1]).toBe("content");
    const header = children[0] as ReactElement<{ changeLocaleAction: (locale: string) => Promise<void> }>;
    await header.props.changeLocaleAction("en");
    expect(mocks.setCookie).toHaveBeenCalledExactlyOnceWith("locale", "en");
  });
});
