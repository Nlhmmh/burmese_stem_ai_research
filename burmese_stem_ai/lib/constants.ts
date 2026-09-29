import { OVERALL_SUPPORT_NEEDS, type LegacyUnderstanding } from "./session-domain";

export const MAX_ADAPTATION_ROUNDS = 2;
export const MAX_FOLLOW_UPS = 2;
export const MAX_FOLLOW_UP_QUESTION_LENGTH = 500;

export const UI_LANGUAGES = ["en", "my"] as const;
export type UILanguage = (typeof UI_LANGUAGES)[number];

export const SUPPORT_LANGUAGES = ["bilingual", "burmese", "english"] as const;
export type SupportLanguage = (typeof SUPPORT_LANGUAGES)[number];

export const EXPLANATION_LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type ExplanationLevel = (typeof EXPLANATION_LEVELS)[number];

export const LEARNING_STYLES = ["guided", "concise", "more_examples"] as const;
export type LearningStyle = (typeof LEARNING_STYLES)[number];

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

/** @deprecated Use OverallSupportNeed; this includes null for legacy storage. */
export type UnderstandingLevel = LegacyUnderstanding;
export const UNDERSTANDING_LEVELS = [...OVERALL_SUPPORT_NEEDS, null] as const;

export const SESSION_STATUSES = ["completed", "in_progress", "review_recommended"] as const;
export type SessionStatus = (typeof SESSION_STATUSES)[number];

export {
  ADAPTATION_ROUTES,
  DIFFICULTY_TYPES,
  OVERALL_SUPPORT_NEEDS,
  SUPPORT_TYPES
} from "./session-domain";
export type {
  AdaptationRoute,
  DifficultyType,
  LearnerResponseEvent,
  OverallSupportNeed,
  RouteSpecificSupport,
  ScaffoldSupportType,
  SupportType
} from "./session-domain";

export const MAX_QUESTION_LENGTH = 1_000;

export const APP_NAME = "Burmese STEM AI";

export const EXAMPLE_PROMPTS = [
  "What is Gradient Descent?",
  "Explain Neural Networks.",
  "What does Polymorphism mean?"
] as const;

export const DEFAULT_PREFERENCES = {
  uiLanguage: UI_LANGUAGES[0],
  supportLanguage: SUPPORT_LANGUAGES[0],
  explanationLevel: EXPLANATION_LEVELS[0],
  learningStyle: LEARNING_STYLES[0],
  theme: THEMES[0]
};
