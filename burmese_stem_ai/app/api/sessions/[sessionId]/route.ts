import { LearnerIdentityError, requireLearnerId } from "@/services/learner.service";
import {
  completeLearningSession,
  getLearningSession,
  SessionDetailNotFoundError,
  SessionIdValidationError,
  SessionLifecycleConflictError,
  SessionUpdateValidationError,
  validateSessionId,
  validateSessionUpdate
} from "@/services/session-lifecycle.service";
import { NextResponse, type NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

// Route: GET /api/sessions/[sessionId]
// Get the details of a learning session for the authenticated learner.
export async function GET(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const { sessionId: rawSessionId } = await context.params;
    const sessionId = validateSessionId(rawSessionId);
    const session = await getLearningSession(learnerId, sessionId);

    return NextResponse.json({ session });
  } catch (error) {
    return handleRouteError(error, "retrieve");
  }
}

// Route: PATCH /api/sessions/[sessionId]
// Update the details of a learning session for the authenticated learner.
export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const { sessionId: rawSessionId } = await context.params;
    const sessionId = validateSessionId(rawSessionId);
    validateSessionUpdate(await readJson(request));
    const session = await completeLearningSession(learnerId, sessionId);
    return NextResponse.json({ session });
  } catch (error) {
    return handleRouteError(error, "update");
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new SessionUpdateValidationError("Request body must contain valid JSON");
  }
}

function handleRouteError(error: unknown, operation: "retrieve" | "update"): NextResponse {
  if (error instanceof LearnerIdentityError) {
    return errorResponse("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
  }
  if (error instanceof SessionIdValidationError) {
    return errorResponse("INVALID_SESSION_ID", error.message, 400);
  }
  if (error instanceof SessionUpdateValidationError) {
    return errorResponse("INVALID_SESSION_UPDATE", error.message, 400);
  }
  if (error instanceof SessionDetailNotFoundError) {
    return errorResponse("SESSION_NOT_FOUND", error.message, 404);
  }
  if (error instanceof SessionLifecycleConflictError) {
    return errorResponse("SESSION_LIFECYCLE_CONFLICT", error.message, 409);
  }

  console.error(`Unable to ${operation} learning session:`, error);
  return errorResponse(
    operation === "retrieve" ? "SESSION_RETRIEVAL_FAILED" : "SESSION_UPDATE_FAILED",
    operation === "retrieve" ? "Unable to load learning session" : "Unable to update session",
    500
  );
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status });
}
