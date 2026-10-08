import { describe, expect, it, vi } from "vitest";
import en from "@/i18n/locales/en.json";
import my from "@/i18n/locales/my.json";
const { cookies } = vi.hoisted(() => ({ cookies: vi.fn() }));
vi.mock("next/headers", () => ({ cookies }));
vi.mock("next-intl/server", () => ({ getRequestConfig: (callback: unknown) => callback }));
import requestConfig from "@/i18n/request";
describe("request locale configuration", () => {
  it.each([["en", "en"], ["my", "my"], [undefined, "en"], ["../../private", "en"], ["fr", "en"]])("loads only allowed locale messages for %s", async (value, expected) => {
    const get = vi.fn().mockReturnValue(value === undefined ? undefined : { value });
    cookies.mockResolvedValue({ get });
    const result = await requestConfig({ requestLocale: Promise.resolve(undefined) });
    expect(get).toHaveBeenCalledWith("locale");
    expect(result.locale).toBe(expected);
    expect(result.messages).toEqual(expected === "my" ? my : en);
  });
  it("propagates a cookie-store failure without importing an arbitrary locale", async () => {
    const error = new Error("request context unavailable");
    cookies.mockRejectedValueOnce(error);
    await expect(requestConfig({ requestLocale: Promise.resolve(undefined) })).rejects.toBe(error);
  });
});
