import {
  AdaptationGenerationError,
  respondToLearningSession,
  ResponseValidationError,
  SessionNotFoundError,
  SessionResponseConflictError,
  validateUnderstandingResponse
} from "@/services/adaptation.service";
import { LearnerIdentityError, requireLearnerId } from "@/services/learner.service";
import { NextResponse, type NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const { sessionId } = await context.params;
    const understanding = validateUnderstandingResponse(await readJson(request));
    const result = await respondToLearningSession(learnerId, sessionId, understanding);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return errorResponse("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    if (error instanceof ResponseValidationError) {
      return errorResponse("INVALID_UNDERSTANDING_RESPONSE", error.message, 400);
    }
    if (error instanceof SessionNotFoundError) {
      return errorResponse("SESSION_NOT_FOUND", error.message, 404);
    }
    if (error instanceof SessionResponseConflictError) {
      return errorResponse("SESSION_RESPONSE_CONFLICT", error.message, 409);
    }
    if (error instanceof AdaptationGenerationError) {
      console.error("Unable to generate adapted support:", error.message);
      return errorResponse(
        "ADAPTATION_GENERATION_FAILED",
        "Unable to prepare additional support right now",
        502
      );
    }
    console.error("Unable to record learner response:", error);
    return errorResponse("SESSION_RESPONSE_FAILED", "Unable to record learner response", 500);
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ResponseValidationError("Request body must contain valid JSON");
  }
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status });
}
