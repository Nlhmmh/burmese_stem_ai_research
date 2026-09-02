import { getOrCreateProfile } from "@/data/dao/profile.dao";
import type { Profile } from "@/data/schemas/profile.schema";
import { NextRequest } from "next/server";

export async function requireLearner(
  request: NextRequest
): Promise<{ learnerId: string; profile: Profile }> {
  const learnerId = requireLearnerId(request);
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
