import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UI_LANGUAGES = ["en", "my"] as const;
export type UILanguage = (typeof UI_LANGUAGES)[number];
const SUPPORT_LANGUAGES = ["bilingual", "burmese", "english"];
export type SupportLanguage = (typeof SUPPORT_LANGUAGES)[number];
const EXPLANATION_LEVELS = ["beginner", "intermediate", "advanced"];
export type ExplanationLevel = (typeof EXPLANATION_LEVELS)[number];
const LEARNING_STYLES = ["guided", "concise", "more_examples"];
export type LearningStyle = (typeof LEARNING_STYLES)[number];
const THEMES = ["light", "dark"];
export type Theme = (typeof THEMES)[number];

export type Preferences = {
  uiLanguage: UILanguage;
  supportLanguage: SupportLanguage;
  explanationLevel: ExplanationLevel;
  learningStyle: LearningStyle;
  theme: Theme;
};
export const PreferenceOptions = {
  uiLanguage: UI_LANGUAGES,
  supportLanguage: SUPPORT_LANGUAGES,
  explanationLevel: EXPLANATION_LEVELS,
  learningStyle: LEARNING_STYLES,
  theme: THEMES
} as const;
const DEFAULT_PREFERENCES = {
  uiLanguage: "en",
  supportLanguage: "bilingual",
  explanationLevel: "beginner",
  learningStyle: "guided",
  theme: "light"
};

export type Profile = {
  learnerId: string;
  preferences: Preferences;
  createdAt: Date;
  updatedAt: Date;
};
const preferencesSchema = new Schema(
  {
    uiLanguage: { type: String, enum: UI_LANGUAGES, default: "en" },
    supportLanguage: {
      type: String,
      enum: SUPPORT_LANGUAGES,
      default: "bilingual"
    },
    explanationLevel: {
      type: String,
      enum: EXPLANATION_LEVELS,
      default: "beginner"
    },
    learningStyle: {
      type: String,
      enum: LEARNING_STYLES,
      default: "guided"
    },
    theme: { type: String, enum: THEMES, default: "light" }
  },
  { _id: false }
);

const profileSchema = new Schema(
  {
    learnerId: { type: String, required: true, unique: true, trim: true },
    preferences: { type: preferencesSchema, default: { ...DEFAULT_PREFERENCES } },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true }
  },
  { versionKey: false }
);

profileSchema.pre("validate", function ensureLearnerId() {
  if (!this.learnerId && this._id) {
    this.learnerId = this._id.toString();
  }
});

const ProfileModel = mongoose.models.Profile || mongoose.model("Profile", profileSchema);

const createFreshProfile = (learnerId: string) => ({
  learnerId,
  preferences: { ...DEFAULT_PREFERENCES },
  createdAt: new Date(),
  updatedAt: new Date()
});

export {
  createFreshProfile,
  DEFAULT_PREFERENCES,
  EXPLANATION_LEVELS,
  LEARNING_STYLES,
  preferencesSchema,
  ProfileModel,
  profileSchema,
  SUPPORT_LANGUAGES,
  THEMES,
  UI_LANGUAGES
};
