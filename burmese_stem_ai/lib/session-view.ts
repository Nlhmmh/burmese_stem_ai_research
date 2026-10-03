import { MAX_ADAPTATION_ROUNDS, type SessionStatus } from "@/lib/constants";
import type { LegacyUnderstanding } from "@/lib/session-domain";

export type SessionNextAction = "respond" | "finish" | "review";

type SessionViewState = {
  status: SessionStatus;
  understanding: LegacyUnderstanding;
  adaptationRound: number;
};

/**
 * Reconstruct the next learner action from persisted state only. Route history
 * is deliberately not used here: routes explain what happened, while status,
 * self-reported support and the server-enforced round cap control what may
 * happen next.
 */
export function getSessionNextAction(session: SessionViewState): SessionNextAction {
  if (session.status === "completed") return "review";
  if (
    session.status === "review_recommended" ||
    session.understanding === "high" ||
    session.adaptationRound >= MAX_ADAPTATION_ROUNDS
  ) {
    return "finish";
  }
  return "respond";
}
