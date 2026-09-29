import {
  AdaptationGenerationError,
  respondToLearningSession,
  ResponseValidationError,
  SessionNotFoundError,
  SessionResponseConflictError,
  validateLearnerResponseRequest
} from "@/services/adaptation.service";
import { InvalidAdaptationRouteInputError } from "@/services/adaptation-routing.service";
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
    const { overallSupportNeed, difficultyType, conceptClarification } =
      validateLearnerResponseRequest(await readJson(request));
    const result = await respondToLearningSession(
      learnerId,
      sessionId,
      overallSupportNeed,
      difficultyType,
      conceptClarification
    );
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return apiError("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    if (error instanceof SessionIdValidationError) {
      return apiError("INVALID_SESSION_ID", error.message, 400);
    }
    if (error instanceof ResponseValidationError) {
      return apiError("INVALID_UNDERSTANDING_RESPONSE", error.message, 400);
    }
    if (error instanceof InvalidAdaptationRouteInputError) {
      return apiError("INVALID_ADAPTATION_ROUTE", error.message, 400);
    }
    if (error instanceof SessionNotFoundError) {
      return apiError("SESSION_NOT_FOUND", error.message, 404);
    }
    if (error instanceof SessionResponseConflictError) {
      return apiError("SESSION_RESPONSE_CONFLICT", error.message, 409);
    }
    if (error instanceof AdaptationGenerationError) {
      console.error("Unable to generate adapted support:", error.message);
      return apiError(
        "ADAPTATION_GENERATION_FAILED",
        "Unable to prepare additional support right now",
        502
      );
    }
    console.error("Unable to record learner response:", error);
    return apiError("SESSION_RESPONSE_FAILED", "Unable to record learner response", 500);
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ResponseValidationError("Request body must contain valid JSON");
  }
}
