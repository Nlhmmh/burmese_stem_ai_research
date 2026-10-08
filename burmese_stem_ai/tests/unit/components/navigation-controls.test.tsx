// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LocaleSwitcher from "@/components/LocalSwitcher";
import AppHeader from "@/components/layout/AppHeader";
import messages from "@/i18n/locales/en.json";
const { pathname } = vi.hoisted(() => ({ pathname: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: pathname }));
vi.mock("next/link", () => ({ default: ({ children, href, ...props }: ComponentProps<"a">) => <a href={href} {...props}>{children}</a> }));
vi.mock("next/image", () => ({ default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} /> }));
function mount(children: ReactNode, locale = "en") {
  return render(<NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>);
}
const storage = new Map<string, string>();
beforeEach(() => {
  pathname.mockReturnValue("/"); storage.clear();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => { storage.set(key, value); }
  });
  document.documentElement.classList.remove("dark");
});
afterEach(() => { cleanup(); storage.clear(); document.documentElement.classList.remove("dark"); });
describe("browser locale and theme controls", () => {
  it.each([["en", "my", "မြန်မာဘာသာသို့ ပြောင်းရန်"], ["my", "en", "Switch to English"], ["fr", "en", "Switch to English"]])("switches locale %s to %s", (locale, expected, label) => {
    const change = vi.fn().mockResolvedValue(undefined);
    mount(<LocaleSwitcher changeLocaleAction={change} />, locale);
    fireEvent.click(screen.getByRole("button", { name: label }));
    expect(change).toHaveBeenCalledExactlyOnceWith(expected);
  });
  it.each([["/", "New Inquiry"], ["/history", "History"], ["/history/older", "History"], ["/learn/session", null]])("marks only the current navigation item for %s", (path, active) => {
    pathname.mockReturnValue(path);
    mount(<AppHeader changeLocaleAction={vi.fn()} />);
    for (const name of ["New Inquiry", "History"]) {
      expect(screen.getByRole("link", { name }).getAttribute("aria-current")).toBe(name === active ? "page" : null);
    }
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeTruthy();
  });
  it.each(["dark", "light", null])("restores theme %s and stores both toggle directions", (theme) => {
    if (theme) window.localStorage.setItem("theme", theme);
    mount(<AppHeader changeLocaleAction={vi.fn()} />);
    const initialDark = theme === "dark";
    expect(document.documentElement.classList.contains("dark")).toBe(initialDark);
    fireEvent.click(screen.getByRole("button", { name: "Toggle color theme" }));
    expect(document.documentElement.classList.contains("dark")).toBe(!initialDark);
    expect(window.localStorage.getItem("theme")).toBe(initialDark ? "light" : "dark");
    fireEvent.click(screen.getByRole("button", { name: "Toggle color theme" }));
    expect(document.documentElement.classList.contains("dark")).toBe(initialDark);
    expect(window.localStorage.getItem("theme")).toBe(initialDark ? "dark" : "light");
  });
});
