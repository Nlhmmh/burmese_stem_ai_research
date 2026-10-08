import {
  askSessionFollowUp,
  FollowUpGenerationError,
  FollowUpLimitError,
  FollowUpOutOfScopeError,
  FollowUpSessionNotFoundError,
  FollowUpValidationError,
  validateFollowUpRequest
} from "@/services/followup.service";
import { apiError } from "@/lib/api-error";
import { LearnerIdentityError, requireLearnerId } from "@/services/learner.service";
import {
  SessionIdValidationError,
  validateSessionId
} from "@/services/session-lifecycle.service";
import { NextResponse, type NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const { sessionId: rawSessionId } = await context.params;
    const sessionId = validateSessionId(rawSessionId);
    const question = validateFollowUpRequest(await readJson(request));
    const followUp = await askSessionFollowUp(learnerId, sessionId, question);
    return NextResponse.json({ followUp });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return apiError("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    if (error instanceof SessionIdValidationError) {
      return apiError("INVALID_SESSION_ID", error.message, 400);
    }
    if (error instanceof FollowUpValidationError) {
      return apiError("INVALID_FOLLOW_UP_REQUEST", error.message, 400);
    }
    if (error instanceof FollowUpSessionNotFoundError) {
      return apiError("SESSION_NOT_FOUND", error.message, 404);
    }
    if (error instanceof FollowUpLimitError) {
      return apiError("FOLLOW_UP_LIMIT_REACHED", error.message, 409);
    }
    if (error instanceof FollowUpOutOfScopeError) {
      return apiError(
        "FOLLOW_UP_OUT_OF_SCOPE",
        error.message,
        422,
        { newSessionRecommended: true }
      );
    }
    if (error instanceof FollowUpGenerationError) {
      console.error("Unable to generate follow-up answer:", error.message);
      return apiError(
        "FOLLOW_UP_GENERATION_FAILED",
        "Unable to prepare a follow-up answer right now",
        502
      );
    }
    console.error("Unable to handle follow-up:", error);
    return apiError("FOLLOW_UP_FAILED", "Unable to handle the follow-up question", 500);
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new FollowUpValidationError("Request body must contain valid JSON");
  }
}
