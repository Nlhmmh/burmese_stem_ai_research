import { describe, expect, it } from "vitest";

import { getSessionNextAction } from "@/lib/session-view";

describe("persisted session next action", () => {
  it.each([
    ["in_progress", 0, null, "respond"],
    ["in_progress", 1, "medium", "respond"],
    ["in_progress", 2, "needs_support", "finish"],
    ["in_progress", 0, "high", "finish"],
    ["review_recommended", 0, "medium", "finish"],
    ["review_recommended", 1, "needs_support", "finish"],
    ["review_recommended", 2, "needs_support", "finish"],
    ["completed", 0, null, "review"],
    ["completed", 1, "medium", "review"],
    ["completed", 2, "high", "review"]
  ] as const)(
    "returns %s round %s support %s as %s",
    (status, adaptationRound, understanding, expected) => {
      expect(getSessionNextAction({ status, adaptationRound, understanding })).toBe(expected);
    }
  );
});
