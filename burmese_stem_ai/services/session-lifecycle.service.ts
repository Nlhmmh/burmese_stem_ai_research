import {
  completeSession,
  findSession,
  type SessionRecord
} from "@/data/dao/session.dao";

const SESSION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class SessionIdValidationError extends Error {}
export class SessionUpdateValidationError extends Error {}
export class SessionDetailNotFoundError extends Error {}
export class SessionLifecycleConflictError extends Error {}

export function validateSessionId(sessionId: unknown): string {
  if (typeof sessionId !== "string" || !SESSION_ID_PATTERN.test(sessionId)) {
    throw new SessionIdValidationError("Session ID must be a valid UUID");
  }
  return sessionId;
}

export function validateSessionUpdate(input: unknown): "completed" {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new SessionUpdateValidationError("Request body must be a JSON object");
  }

  const entries = Object.entries(input);
  if (entries.length !== 1 || entries[0]?.[0] !== "status") {
    throw new SessionUpdateValidationError("Only the session status can be updated");
  }
  if (entries[0][1] !== "completed") {
    throw new SessionUpdateValidationError("Status can only be changed to completed");
  }

  return "completed";
}

export async function getLearningSession(learnerId: string, sessionId: string) {
  const session = await findSession(learnerId, sessionId);
  if (!session) {
    throw new SessionDetailNotFoundError("Learning session was not found");
  }
  return toPublicSession(session);
}

export async function completeLearningSession(learnerId: string, sessionId: string) {
  const existingSession = await findSession(learnerId, sessionId);
  if (!existingSession) {
    throw new SessionDetailNotFoundError("Learning session was not found");
  }
  if (existingSession.status === "completed") {
    return toPublicSession(existingSession);
  }
  if (!isSupportedStatus(existingSession.status)) {
    throw new SessionLifecycleConflictError("The session cannot be completed from its current state");
  }

  const updatedSession = await completeSession(learnerId, sessionId);
  if (!updatedSession) {
    throw new SessionLifecycleConflictError(
      "The session changed while it was being updated; please retry"
    );
  }
  return toPublicSession(updatedSession);
}

function isSupportedStatus(status: string): boolean {
  return ["in_progress", "review_recommended"].includes(status);
}

function toPublicSession(session: SessionRecord) {
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
    adaptations: session.adaptations ?? [],
    followUps: session.followUps ?? [],
    preferencesSnapshot: session.preferencesSnapshot,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt
  };
}
