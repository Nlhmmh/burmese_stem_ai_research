import type { Preferences } from "@/data/schemas/profile.schema";
import { MAX_ADAPTATION_ROUNDS, MAX_FOLLOW_UPS } from "@/lib/constants";
import type { SessionStatus, SupportType, UnderstandingLevel } from "@/lib/constants";
import { connectMongoDB } from "../mongodb";
import { SessionModel } from "../schema";

export async function findSessionsByLearner(learnerId: string) {
  await connectMongoDB();
  return SessionModel.find({ learnerId })
    .select("sessionId concept understanding status updatedAt -_id")
    .sort({ updatedAt: -1 })
    .lean();
}

export type NewSession = {
  sessionId: string;
  learnerId: string;
  originalQuestion: string;
  concept: {
    name: string;
    domain: string;
  };
  explanations: {
    simple: BilingualText;
    realWorldExample: BilingualText;
    technical: BilingualText;
  };
  reflectivePrompt: BilingualText;
  hint: BilingualText;
  preferencesSnapshot: object;
};

export type CreatedSession = NewSession & {
  understanding: UnderstandingLevel;
  status: SessionStatus;
  adaptationRound: number;
  createdAt: Date;
  updatedAt: Date;
};

type BilingualText = {
  en: string;
  my: string;
};

export async function createSession(session: NewSession): Promise<CreatedSession> {
  await connectMongoDB();
  const createdSession = await SessionModel.create(session);
  return createdSession.toObject() as unknown as CreatedSession;
}

export async function findSession(learnerId: string, sessionId: string) {
  await connectMongoDB();
  return SessionModel.findOne({
    sessionId,
    learnerId
  }).lean() as unknown as Promise<SessionRecord | null>;
}

export type LearnerResponse = Exclude<UnderstandingLevel, null>;

export type Adaptation = {
  learnerResponse: LearnerResponse;
  supportType: SupportType;
  content: BilingualText;
  round: number;
  createdAt: Date;
};

export type FollowUp = {
  question: string;
  answer: BilingualText;
  createdAt: Date;
};

export type SessionRecord = CreatedSession & {
  adaptations: Adaptation[];
  followUps: FollowUp[];
  preferencesSnapshot: Preferences;
};

type RecordResponseInput = {
  learnerId: string;
  sessionId: string;
  expectedRound: number;
  understanding: LearnerResponse;
  status: SessionStatus;
  adaptation: Adaptation | null;
};

export async function recordSessionResponse(input: RecordResponseInput) {
  await connectMongoDB();

  const update = input.adaptation
    ? {
        $set: {
          understanding: input.understanding,
          status: input.status,
          updatedAt: new Date()
        },
        $inc: { adaptationRound: 1 },
        $push: { adaptations: input.adaptation }
      }
    : {
        $set: {
          understanding: input.understanding,
          status: input.status,
          updatedAt: new Date()
        }
      };

  return SessionModel.findOneAndUpdate(
    {
      learnerId: input.learnerId,
      sessionId: input.sessionId,
      adaptationRound: input.adaptation
        ? { $eq: input.expectedRound, $lt: MAX_ADAPTATION_ROUNDS }
        : input.expectedRound,
      status: { $ne: "completed" }
    },
    update,
    { returnDocument: "after", runValidators: true }
  ).lean() as unknown as Promise<SessionRecord | null>;
}

export async function appendFollowUp(
  learnerId: string,
  sessionId: string,
  followUp: FollowUp
) {
  await connectMongoDB();

  return SessionModel.findOneAndUpdate(
    {
      learnerId,
      sessionId,
      $expr: {
        $lt: [{ $size: { $ifNull: ["$followUps", []] } }, MAX_FOLLOW_UPS]
      }
    },
    {
      $push: { followUps: followUp },
      $set: { updatedAt: new Date() }
    },
    { returnDocument: "after", runValidators: true }
  ).lean() as unknown as Promise<SessionRecord | null>;
}

export async function completeSession(learnerId: string, sessionId: string) {
  await connectMongoDB();

  return SessionModel.findOneAndUpdate(
    {
      learnerId,
      sessionId,
      status: { $in: ["in_progress", "review_recommended"] }
    },
    {
      $set: {
        status: "completed",
        updatedAt: new Date()
      }
    },
    { returnDocument: "after", runValidators: true }
  ).lean() as unknown as Promise<SessionRecord | null>;
}
