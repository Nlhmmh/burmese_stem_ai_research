/**
 * Stage 6A values. These are learner-reported support signals, not measured
 * understanding, competence, or mastery.
 */
export const OVERALL_SUPPORT_NEEDS = ["high", "medium", "needs_support"] as const;
export type OverallSupportNeed = (typeof OVERALL_SUPPORT_NEEDS)[number];

/**
 * Compatibility type for the existing `understanding` storage and API field.
 * A non-null value still means self-reported support need.
 */
export type LegacyUnderstanding = OverallSupportNeed | null;

/** Stage 6B choices. Supplying one remains optional. */
export const DIFFICULTY_TYPES = [
  "simpler_explanation",
  "another_example",
  "language_terms",
  "concept_unclear",
  "concept_mismatch"
] as const;
export type DifficultyType = (typeof DIFFICULTY_TYPES)[number];

export const PRESENTATION_OVERRIDES = ["bilingual"] as const;
export type AdaptationPresentationOverride = (typeof PRESENTATION_OVERRIDES)[number];

export type ConceptReference = {
  name: string;
  domain: string;
};

export type ConceptCorrection = {
  previous: ConceptReference;
  corrected: ConceptReference;
};

/** Bounded Stage 7 route families. */
export const ADAPTATION_ROUTES = [
  "fade",
  "stage_5_scaffold",
  "language_support",
  "concept_clarification",
  "context_reinterpretation"
] as const;
export type AdaptationRoute = (typeof ADAPTATION_ROUTES)[number];

/**
 * Existing persisted support values. `key_takeaway` remains readable for
 * legacy adaptations, but it is not part of the refined fade route.
 */
export const SUPPORT_TYPES = [
  "key_takeaway",
  "another_example",
  "clarification",
  "concept_clarification",
  "simpler_explanation",
  "analogy",
  "hint"
] as const;
export type SupportType = (typeof SUPPORT_TYPES)[number];
export type LegacyKeyTakeawaySupportType = Extract<SupportType, "key_takeaway">;
export type ScaffoldSupportType = Exclude<SupportType, LegacyKeyTakeawaySupportType>;

export type FadeSupport = {
  route: "fade";
  supportType: null;
};

export type Stage5Support = {
  route: "stage_5_scaffold";
  supportType: ScaffoldSupportType;
};

export type LanguageSupport = {
  route: "language_support";
  supportType: ScaffoldSupportType;
  presentationOverride: AdaptationPresentationOverride;
};

export type ConceptClarificationSupport = {
  route: "concept_clarification";
  supportType: Extract<ScaffoldSupportType, "concept_clarification">;
};

export type ContextReinterpretationSupport = {
  route: "context_reinterpretation";
  supportType: ScaffoldSupportType;
  conceptCorrection: ConceptCorrection;
};

/** A route and support-type pairing that is valid for the refined workflow. */
export type RouteSpecificSupport =
  | FadeSupport
  | Stage5Support
  | LanguageSupport
  | ConceptClarificationSupport
  | ContextReinterpretationSupport;

/**
 * Canonical persisted trace event for one Stage 6 response and its Stage 7
 * decision.
 */
export type LearnerResponseEvent<Timestamp = Date> = {
  overallSupportNeed: OverallSupportNeed;
  difficultyType: DifficultyType | null;
  route: AdaptationRoute;
  roundBefore: number;
  roundAfter: number;
  createdAt: Timestamp;
};
