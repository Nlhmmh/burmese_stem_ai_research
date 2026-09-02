import { connectMongoDB } from "../mongodb";
import { SessionModel } from "../schema";
import { SessionStatus, UnderstandingLevel } from "../schemas/session.schema";

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
  }).lean();
}
