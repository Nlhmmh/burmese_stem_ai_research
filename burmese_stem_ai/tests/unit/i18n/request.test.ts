import { describe, expect, it } from "vitest";

import { resolveLocale } from "@/i18n/request";

describe("locale cookie boundary", () => {
  it.each([
    ["en", "en"],
    ["my", "my"],
    [undefined, "en"],
    ["fr", "en"],
    ["../secrets", "en"],
    ["", "en"]
  ] as const)("resolves %s to %s", (value, expected) => {
    expect(resolveLocale(value)).toBe(expected);
  });
});
