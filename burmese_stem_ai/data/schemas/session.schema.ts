import { MAX_ADAPTATION_ROUNDS } from "@/lib/constants";
import mongoose from "mongoose";
import { preferencesSchema } from "./profile.schema";

const Schema = mongoose.Schema;

const UNDERSTANDING_LEVELS = ["high", "medium", "needs_support", null];
const SESSION_STATUSES = ["completed", "in_progress", "review_recommended"];
const SUPPORT_TYPES = [
  "key_takeaway",
  "another_example",
  "clarification",
  "simpler_explanation",
  "analogy",
  "hint"
];

const bilingualTextSchema = new Schema(
  {
    en: { type: String, required: true },
    my: { type: String, required: true } // Burmese
  },
  { _id: false }
);

const adaptationSchema = new Schema(
  {
    understanding: { type: String, enum: UNDERSTANDING_LEVELS, required: true },
    supportType: { type: String, enum: SUPPORT_TYPES, required: true },
    content: { type: bilingualTextSchema, required: true },
    round: { type: Number, min: 1, max: MAX_ADAPTATION_ROUNDS, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  { _id: false }
);

const followUpSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: bilingualTextSchema, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  },
  { _id: false }
);

const sessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, trim: true },
    learnerId: { type: String, required: true, unique: true, trim: true },
    originalQuestion: { type: String, required: true, trim: true },
    concept: {
      name: { type: String, required: true, trim: true },
      domain: { type: String, required: true, trim: true }
    },
    explanations: {
      simple: { type: bilingualTextSchema, required: true, trim: true },
      realWorld: { type: bilingualTextSchema, required: true, trim: true },
      technical: { type: bilingualTextSchema, required: true, trim: true }
    },
    reflectivePrompt: { type: bilingualTextSchema, required: true, trim: true },
    hint: { type: bilingualTextSchema, required: true, trim: true },
    understanding: { type: String, enum: UNDERSTANDING_LEVELS, default: null },
    status: { type: String, enum: SESSION_STATUSES, default: "in_progress" },
    adaptationRound: { type: Number, default: 0, min: 0 },
    adaptations: { type: [adaptationSchema], default: [] },
    followUps: { type: [followUpSchema], default: [] },
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

sessionSchema.index({ learnerId: 1 });

const SessionModel = mongoose.models.Session || mongoose.model("Session", sessionSchema);

export { SessionModel, sessionSchema };
