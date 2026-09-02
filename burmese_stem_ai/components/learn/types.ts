import type { Preferences } from "@/data/schemas/profile.schema";
import type {
  SessionStatus,
  SupportType,
  UnderstandingLevel
} from "@/lib/constants";

export type BilingualText = { en: string; my: string };
export type LearnerResponse = Exclude<UnderstandingLevel, null>;

export type Adaptation = {
  learnerResponse: LearnerResponse;
  supportType: SupportType;
  content: BilingualText;
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
  understanding: UnderstandingLevel;
  status: SessionStatus;
  adaptationRound: number;
  adaptations: Adaptation[];
  followUps: FollowUp[];
  preferencesSnapshot?: Preferences;
};

export type ApiError = {
  error?: string | { message?: string };
  message?: string;
};
