import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { POST as respond } from "@/app/api/sessions/[sessionId]/respond/route";
import { POST as followUp } from "@/app/api/sessions/[sessionId]/followup/route";

describe("session action UUID boundaries", () => {
  it.each([
    ["respond", respond],
    ["follow-up", followUp]
  ] as const)("rejects an invalid UUID before the %s action", async (_name, handler) => {
    const response = await handler(request(), {
      params: Promise.resolve({ sessionId: "not-a-session-uuid" })
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "INVALID_SESSION_ID",
        message: "Session ID must be a valid UUID"
      }
    });
  });
});

function request(): NextRequest {
  return new NextRequest("http://localhost/api/sessions/not-a-session-uuid/action", {
    method: "POST",
    headers: {
      "x-learner-id": "learner-a",
      "Content-Type": "application/json"
    },
    // Invalid JSON proves UUID validation occurs before request-body parsing.
    body: "{"
  });
}
