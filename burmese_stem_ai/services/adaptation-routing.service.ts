import type {
  DifficultyType,
  FadeSupport,
  LanguageSupport,
  OverallSupportNeed,
  ScaffoldSupportType
} from "@/lib/session-domain";

export type CoreStage5SupportType = Extract<
  ScaffoldSupportType,
  "another_example" | "simpler_explanation"
>;

export type CoreStage5Decision = {
  route: "stage_5_scaffold";
  supportType: CoreStage5SupportType;
};

export type GeneratingAdaptationDecision = CoreStage5Decision | LanguageSupport;
export type ImplementedAdaptationDecision = FadeSupport | GeneratingAdaptationDecision;

export class InvalidAdaptationRouteInputError extends Error {}
export class UnsupportedAdaptationRouteError extends Error {}

/** Pure Stage 7 selector for the routes implemented by the current PoC. */
export function selectAdaptationRoute(
  overallSupportNeed: OverallSupportNeed,
  difficultyType: DifficultyType | null
): ImplementedAdaptationDecision {
  if (overallSupportNeed === "high") {
    if (difficultyType !== null) {
      throw new InvalidAdaptationRouteInputError(
        "A difficulty type cannot accompany a high support-need response"
      );
    }
    return { route: "fade", supportType: null };
  }

  switch (difficultyType) {
    case null:
      return {
        route: "stage_5_scaffold",
        supportType:
          overallSupportNeed === "medium" ? "another_example" : "simpler_explanation"
      };
    case "simpler_explanation":
      return { route: "stage_5_scaffold", supportType: "simpler_explanation" };
    case "another_example":
      return { route: "stage_5_scaffold", supportType: "another_example" };
    case "language_terms":
      return {
        route: "language_support",
        supportType: "clarification",
        presentationOverride: "bilingual"
      };
    case "concept_unclear":
    case "concept_mismatch":
      throw new UnsupportedAdaptationRouteError(
        `The ${difficultyType} adaptation route is not implemented yet`
      );
  }
}
