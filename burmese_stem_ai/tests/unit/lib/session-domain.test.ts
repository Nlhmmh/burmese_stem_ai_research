import { describe, expect, expectTypeOf, it } from "vitest";

import {
  ADAPTATION_ROUTES,
  DIFFICULTY_TYPES,
  OVERALL_SUPPORT_NEEDS,
  SUPPORT_TYPES,
  type AdaptationRoute,
  type DifficultyType,
  type LearnerResponseEvent,
  type OverallSupportNeed,
  type RouteSpecificSupport
} from "@/lib/session-domain";

describe("session domain vocabulary", () => {
  it("preserves the legacy overall-support values", () => {
    expect(OVERALL_SUPPORT_NEEDS).toEqual(["high", "medium", "needs_support"]);
    expect(SUPPORT_TYPES).toContain("key_takeaway");
    expect(SUPPORT_TYPES).toContain("concept_clarification");
  });

  it("defines the bounded Stage 6B and Stage 7 values", () => {
    expect(DIFFICULTY_TYPES).toEqual([
      "simpler_explanation",
      "another_example",
      "language_terms",
      "concept_unclear",
      "concept_mismatch"
    ]);
    expect(ADAPTATION_ROUTES).toEqual([
      "fade",
      "stage_5_scaffold",
      "language_support",
      "concept_clarification",
      "context_reinterpretation"
    ]);
  });

  it("keeps enum arrays and derived unions type-aligned", () => {
    expectTypeOf(OVERALL_SUPPORT_NEEDS).toEqualTypeOf<
      readonly ["high", "medium", "needs_support"]
    >();
    expectTypeOf<"low">().not.toMatchTypeOf<OverallSupportNeed>();
    expectTypeOf<"free_text_difficulty">().not.toMatchTypeOf<DifficultyType>();
    expectTypeOf<"unbounded_chat">().not.toMatchTypeOf<AdaptationRoute>();
  });

  it("rejects support output on the fade route at type level", () => {
    expectTypeOf<{ route: "fade"; supportType: null }>().toMatchTypeOf<RouteSpecificSupport>();
    expectTypeOf<{
      route: "fade";
      supportType: "key_takeaway";
    }>().not.toMatchTypeOf<RouteSpecificSupport>();
    expectTypeOf<{
      route: "stage_5_scaffold";
      supportType: "another_example";
    }>().toMatchTypeOf<RouteSpecificSupport>();
    expectTypeOf<{
      route: "concept_clarification";
      supportType: "concept_clarification";
    }>().toMatchTypeOf<RouteSpecificSupport>();
  });

  it("requires a bounded response event shape", () => {
    expectTypeOf<{
      overallSupportNeed: "medium";
      difficultyType: "another_example";
      route: "stage_5_scaffold";
      roundBefore: number;
      roundAfter: number;
      createdAt: Date;
    }>().toMatchTypeOf<LearnerResponseEvent>();
    expectTypeOf<{
      overallSupportNeed: "low";
      difficultyType: null;
      route: "stage_5_scaffold";
      roundBefore: number;
      roundAfter: number;
      createdAt: Date;
    }>().not.toMatchTypeOf<LearnerResponseEvent>();
  });
});
