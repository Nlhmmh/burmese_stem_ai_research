import {
  EXPLANATION_LEVELS,
  ExplanationLevel,
  LEARNING_STYLES,
  LearningStyle,
  SUPPORT_LANGUAGES,
  SupportLanguage,
  Theme,
  THEMES,
  UI_LANGUAGES,
  UILanguage
} from "@/lib/constants";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
export const DEFAULT_PREFERENCES = {
  uiLanguage: UI_LANGUAGES[0],
  supportLanguage: SUPPORT_LANGUAGES[0],
  explanationLevel: EXPLANATION_LEVELS[0],
  learningStyle: LEARNING_STYLES[0],
  theme: THEMES[0]
};

export type Profile = {
  learnerId: string;
  preferences: Preferences;
  createdAt: Date;
  updatedAt: Date;
};
const preferencesSchema = new Schema(
  {
    uiLanguage: { type: String, enum: UI_LANGUAGES, default: UI_LANGUAGES[0] }, // Default to "en"
    supportLanguage: {
      type: String,
      enum: SUPPORT_LANGUAGES,
      default: SUPPORT_LANGUAGES[0] // Default to "bilingual"
    },
    explanationLevel: {
      type: String,
      enum: EXPLANATION_LEVELS,
      default: EXPLANATION_LEVELS[0] // Default to "beginner"
    },
    learningStyle: {
      type: String,
      enum: LEARNING_STYLES,
      default: LEARNING_STYLES[0] // Default to "guided"
    },
    theme: { type: String, enum: THEMES, default: THEMES[0] } // Default to "light"
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

const createFreshProfile = (learnerId: string) => ({
  learnerId,
  preferences: { ...DEFAULT_PREFERENCES },
  createdAt: new Date(),
  updatedAt: new Date()
});

export { createFreshProfile, preferencesSchema, profileSchema };
