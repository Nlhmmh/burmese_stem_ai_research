import type { Preferences } from "@/data/schemas/profile.schema";
import type { SessionStatus } from "@/lib/constants";
import type {
  AdaptationPresentationOverride,
  ConceptCorrection,
  ConceptReinterpretationOutcome,
  DifficultyType,
  LegacyUnderstanding,
  LearnerResponseEvent,
  OverallSupportNeed,
  SupportType
} from "@/lib/session-domain";

export type BilingualText = { en: string; my: string };

export type Adaptation = {
  learnerResponse: OverallSupportNeed;
  supportType: SupportType;
  content: BilingualText;
  presentationOverride?: AdaptationPresentationOverride;
  conceptCorrection?: ConceptCorrection;
  round: number;
  createdAt: string;
};

export type FollowUp = {
  question: string;
  answer: BilingualText;
  createdAt?: string;
};

export type LearningSessionRecord = {
  sessionId: string;
  originalQuestion: string;
  concept: { name: string; domain: string };
  explanations: {
    simple: BilingualText;
    realWorldExample: BilingualText;
    technical: BilingualText;
  };
  reflectivePrompt: BilingualText;
  hint: BilingualText;
  /** Legacy API field name; the value is a self-reported support need. */
  understanding: LegacyUnderstanding;
  status: SessionStatus;
  adaptationRound: number;
  adaptations: Adaptation[];
  responseEvents: LearnerResponseEvent<string>[];
  followUps: FollowUp[];
  preferencesSnapshot?: Preferences;
};

export type ApiError = {
  error?: string | { message?: string };
  message?: string;
};

export type LearnerResponseRequest = {
  overallSupportNeed: OverallSupportNeed;
  difficultyType?: DifficultyType;
  conceptClarification?: string;
};

export type LearnerResponseResult = {
  understanding: OverallSupportNeed;
  status: SessionStatus;
  adaptationRound: number;
  route: LearnerResponseEvent["route"];
  adaptation: Adaptation | null;
  concept?: LearningSessionRecord["concept"];
  correctionOutcome?: ConceptReinterpretationOutcome;
};
