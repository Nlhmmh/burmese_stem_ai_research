export const MAX_ADAPTATION_ROUNDS = 2;
export const MAX_FOLLOW_UPS = 2;
export const MAX_FOLLOW_UP_QUESTION_LENGTH = 500;

export const UI_LANGUAGES = ["en", "my"] as const;
export type UILanguage = (typeof UI_LANGUAGES)[number];

export const SUPPORT_LANGUAGES = ["bilingual", "burmese", "english"];
export type SupportLanguage = (typeof SUPPORT_LANGUAGES)[number];

export const EXPLANATION_LEVELS = ["beginner", "intermediate", "advanced"];
export type ExplanationLevel = (typeof EXPLANATION_LEVELS)[number];

export const LEARNING_STYLES = ["guided", "concise", "more_examples"];
export type LearningStyle = (typeof LEARNING_STYLES)[number];

export const THEMES = ["light", "dark"];
export type Theme = (typeof THEMES)[number];

export type UnderstandingLevel = "high" | "medium" | "needs_support" | null;
export const UNDERSTANDING_LEVELS = ["high", "medium", "needs_support", null];

export type SessionStatus = "completed" | "in_progress" | "review_recommended";
export const SESSION_STATUSES = ["completed", "in_progress", "review_recommended"];

export type SupportType =
  | "key_takeaway"
  | "another_example"
  | "clarification"
  | "simpler_explanation"
  | "analogy"
  | "hint";
export const SUPPORT_TYPES = [
  "key_takeaway",
  "another_example",
  "clarification",
  "simpler_explanation",
  "analogy",
  "hint"
];

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
