import {
  MAX_ADAPTATION_ROUNDS,
  MAX_FOLLOW_UP_QUESTION_LENGTH,
  MAX_FOLLOW_UPS,
  OVERALL_SUPPORT_NEEDS,
  SESSION_STATUSES,
  SUPPORT_TYPES,
  UNDERSTANDING_LEVELS
} from "@/lib/constants";
import {
  ADAPTATION_ROUTES,
  DIFFICULTY_TYPES,
  PRESENTATION_OVERRIDES
} from "@/lib/session-domain";
import mongoose from "mongoose";
import { preferencesSchema } from "./profile.schema";

const Schema = mongoose.Schema;

const bilingualTextSchema = new Schema(
  {
    en: { type: String, required: true },
    my: { type: String, required: true } // Burmese
  },
  { _id: false }
);

const conceptReferenceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const conceptCorrectionSchema = new Schema(
  {
    previous: { type: conceptReferenceSchema, required: true },
    corrected: { type: conceptReferenceSchema, required: true }
  },
  { _id: false }
);

const adaptationSchema = new Schema(
  {
    learnerResponse: { type: String, enum: OVERALL_SUPPORT_NEEDS, required: true },
    supportType: { type: String, enum: SUPPORT_TYPES, required: true },
    content: { type: bilingualTextSchema, required: true },
    presentationOverride: { type: String, enum: PRESENTATION_OVERRIDES },
    conceptCorrection: { type: conceptCorrectionSchema },
    round: { type: Number, min: 1, max: MAX_ADAPTATION_ROUNDS, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  { _id: false }
);

const learnerResponseEventSchema = new Schema(
  {
    overallSupportNeed: { type: String, enum: OVERALL_SUPPORT_NEEDS, required: true },
    difficultyType: { type: String, enum: DIFFICULTY_TYPES, default: null },
    route: { type: String, enum: ADAPTATION_ROUTES, required: true },
    roundBefore: { type: Number, min: 0, max: MAX_ADAPTATION_ROUNDS, required: true },
    roundAfter: { type: Number, min: 0, max: MAX_ADAPTATION_ROUNDS, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  { _id: false }
);

const followUpSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_FOLLOW_UP_QUESTION_LENGTH
    },
    answer: { type: bilingualTextSchema, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  { _id: false }
);

const sessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, trim: true },
    learnerId: { type: String, required: true, trim: true },
    originalQuestion: { type: String, required: true, trim: true },
    concept: {
      name: { type: String, required: true, trim: true },
      domain: { type: String, required: true, trim: true }
    },
    explanations: {
      simple: { type: bilingualTextSchema, required: true, trim: true },
      realWorldExample: { type: bilingualTextSchema, required: true, trim: true },
      technical: { type: bilingualTextSchema, required: true, trim: true }
    },
    reflectivePrompt: { type: bilingualTextSchema, required: true, trim: true },
    hint: { type: bilingualTextSchema, required: true, trim: true },
    // Legacy field name: values represent learner-reported support need, not measured mastery.
    understanding: { type: String, enum: UNDERSTANDING_LEVELS, default: null },
    status: { type: String, enum: SESSION_STATUSES, default: SESSION_STATUSES[1] }, // Default to "in_progress"
    adaptationRound: { type: Number, default: 0, min: 0, max: MAX_ADAPTATION_ROUNDS },
    adaptations: { type: [adaptationSchema], default: [] },
    responseEvents: { type: [learnerResponseEventSchema], default: [] },
    followUps: {
      type: [followUpSchema],
      default: [],
      validate: {
        validator: (followUps: unknown[]) => followUps.length <= MAX_FOLLOW_UPS,
        message: `A session can have at most ${MAX_FOLLOW_UPS} follow-ups`
      }
    },
    preferencesSnapshot: { type: preferencesSchema },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true }
  },
  { versionKey: false }
);

sessionSchema.pre("validate", function ensureSessionId() {
  if (!this.sessionId && this._id) {
    this.sessionId = this._id.toString();
  }
});

sessionSchema.index({ learnerId: 1, updatedAt: -1 }); // Index to quickly find the most recent session for a learner

export { sessionSchema };
