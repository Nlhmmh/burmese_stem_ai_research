import { getOrCreateProfile } from "@/data/dao/profile.dao";
import { NextRequest } from "next/server";

export async function requireLearner(
  request: NextRequest
): Promise<{ learnerId: string; profile: any }> {
  const learnerId = request.headers.get("x-learner-id");
  if (!learnerId) {
    throw new Error("Learner identity is unavailable");
  }
  const profile = await getOrCreateProfile(learnerId);
  return {
    learnerId,
    profile
  };
}

export class LearnerIdentityError extends Error {
  constructor() {
    super();
    this.name = "LearnerIdentityError";
    this.message = "Learner identity is unavailable";
  }
}

export function requireLearnerId(request: NextRequest): string {
  const learnerId = request.headers.get("x-learner-id");
  if (!learnerId) throw new LearnerIdentityError();
  return learnerId;
}
