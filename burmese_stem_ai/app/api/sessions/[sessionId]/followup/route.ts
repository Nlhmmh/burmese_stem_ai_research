import {
  askSessionFollowUp,
  FollowUpGenerationError,
  FollowUpLimitError,
  FollowUpOutOfScopeError,
  FollowUpSessionNotFoundError,
  FollowUpValidationError,
  validateFollowUpRequest
} from "@/services/followup.service";
import { LearnerIdentityError, requireLearnerId } from "@/services/learner.service";
import { NextResponse, type NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const { sessionId } = await context.params;
    const question = validateFollowUpRequest(await readJson(request));
    const followUp = await askSessionFollowUp(learnerId, sessionId, question);
    return NextResponse.json({ followUp });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return errorResponse("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    if (error instanceof FollowUpValidationError) {
      return errorResponse("INVALID_FOLLOW_UP_REQUEST", error.message, 400);
    }
    if (error instanceof FollowUpSessionNotFoundError) {
      return errorResponse("SESSION_NOT_FOUND", error.message, 404);
    }
    if (error instanceof FollowUpLimitError) {
      return errorResponse("FOLLOW_UP_LIMIT_REACHED", error.message, 409);
    }
    if (error instanceof FollowUpOutOfScopeError) {
      return NextResponse.json(
        { newSessionRecommended: true, message: error.message },
        { status: 422 }
      );
    }
    if (error instanceof FollowUpGenerationError) {
      console.error("Unable to generate follow-up answer:", error.message);
      return errorResponse(
        "FOLLOW_UP_GENERATION_FAILED",
        "Unable to prepare a follow-up answer right now",
        502
      );
    }
    console.error("Unable to handle follow-up:", error);
    return errorResponse("FOLLOW_UP_FAILED", "Unable to handle the follow-up question", 500);
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new FollowUpValidationError("Request body must contain valid JSON");
  }
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status });
}
