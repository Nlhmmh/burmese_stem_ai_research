import { describe, expect, it } from "vitest";

import {
  InvalidAdaptationRouteInputError,
  selectAdaptationRoute,
  UnsupportedAdaptationRouteError
} from "@/services/adaptation-routing.service";

describe("deterministic Stage 7 route selection", () => {
  it("fades a high self-report without selecting generated support", () => {
    expect(selectAdaptationRoute("high", null)).toEqual({
      route: "fade",
      supportType: null
    });
  });

  it.each([
    ["medium", "another_example"],
    ["needs_support", "simpler_explanation"]
  ] as const)("selects the default Stage 5 support for %s", (overallSupportNeed, supportType) => {
    expect(selectAdaptationRoute(overallSupportNeed, null)).toEqual({
      route: "stage_5_scaffold",
      supportType
    });
  });

  it.each(["medium", "needs_support"] as const)(
    "honours the explicit simpler-explanation choice for %s",
    (overallSupportNeed) => {
      expect(selectAdaptationRoute(overallSupportNeed, "simpler_explanation")).toEqual({
        route: "stage_5_scaffold",
        supportType: "simpler_explanation"
      });
    }
  );

  it.each(["medium", "needs_support"] as const)(
    "honours the explicit another-example choice for %s",
    (overallSupportNeed) => {
      expect(selectAdaptationRoute(overallSupportNeed, "another_example")).toEqual({
        route: "stage_5_scaffold",
        supportType: "another_example"
      });
    }
  );

  it("rejects a difficulty choice when the learner selected high", () => {
    expect(() => selectAdaptationRoute("high", "another_example")).toThrow(
      InvalidAdaptationRouteInputError
    );
  });

  it.each(["medium", "needs_support"] as const)(
    "selects bilingual language support for %s",
    (overallSupportNeed) => {
      expect(selectAdaptationRoute(overallSupportNeed, "language_terms")).toEqual({
        route: "language_support",
        supportType: "clarification",
        presentationOverride: "bilingual"
      });
    }
  );

  it.each(["concept_unclear", "concept_mismatch"] as const)(
    "keeps the specialised %s route unavailable until its implementation step",
    (difficultyType) => {
      expect(() => selectAdaptationRoute("medium", difficultyType)).toThrow(
        UnsupportedAdaptationRouteError
      );
    }
  );
});
