import { connectMongoDB } from "../mongodb";
import { SessionModel } from "../schema";

export async function findSessionsByLearner(learnerId: string) {
  await connectMongoDB();
  return SessionModel.find({ learnerId }).sort({ updatedAt: -1 }).lean();
}

export async function findSession(learnerId: string, sessionId: string) {
  await connectMongoDB();
  return SessionModel.findOne({
    _id: sessionId,
    learnerId
  }).lean();
}
