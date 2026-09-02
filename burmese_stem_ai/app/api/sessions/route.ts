import { findSessionsByLearner, type CreatedSession } from "@/data/dao/session.dao";
import { LearnerIdentityError, requireLearner, requireLearnerId } from "@/services/learner.service";
import {
  createLearningSession,
  SessionGenerationError,
  SessionRequestValidationError,
  SessionScopeError,
  validateCreateSessionRequest
} from "@/services/session.service";
import { NextResponse, type NextRequest } from "next/server";

// Route: /api/sessions
// GET: List all learning sessions for the authenticated learner
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const sessions = await findSessionsByLearner(learnerId);
    return NextResponse.json({ sessions });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return errorResponse("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    console.error("Unable to list learning sessions:", error);
    return errorResponse("SESSION_LIST_FAILED", "Unable to load learning sessions", 500);
  }
}

// Route: /api/sessions
// POST: Create a new learning session for the authenticated learner
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const question = validateCreateSessionRequest(await readJson(request));
    const { learnerId, profile } = await requireLearner(request);
    const session = await createLearningSession(learnerId, question, profile.preferences);
    return NextResponse.json({ session: toSessionResponse(session) }, { status: 201 });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return errorResponse("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    if (error instanceof SessionRequestValidationError) {
      return errorResponse("INVALID_SESSION_REQUEST", error.message, 400);
    }
    if (error instanceof SessionScopeError) {
      return errorResponse(error.code, error.message, 422);
    }
    if (error instanceof SessionGenerationError) {
      console.error("Unable to generate learning session:", error.message);
      return errorResponse(
        "SESSION_GENERATION_FAILED",
        "Unable to prepare the explanation right now",
        502
      );
    }
    console.error("Unable to create learning session:", error);
    return errorResponse("SESSION_CREATION_FAILED", "Unable to create learning session", 500);
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new SessionRequestValidationError("Request body must contain valid JSON");
  }
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status });
}

function toSessionResponse(session: CreatedSession) {
  return {
    sessionId: session.sessionId,
    originalQuestion: session.originalQuestion,
    concept: session.concept,
    explanations: session.explanations,
    reflectivePrompt: session.reflectivePrompt,
    hint: session.hint,
    understanding: session.understanding,
    status: session.status,
    adaptationRound: session.adaptationRound,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt
  };
}
