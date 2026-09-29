import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_PREFERENCES } from "@/lib/constants";

const profileMocks = vi.hoisted(() => ({
  getOrCreateProfile: vi.fn(),
  updatePreferences: vi.fn()
}));

vi.mock("@/data/dao/profile.dao", () => ({
  getOrCreateProfile: profileMocks.getOrCreateProfile,
  updatePreferences: profileMocks.updatePreferences
}));

import { GET, PATCH } from "@/app/api/preferences/route";

describe("preference API error boundary", () => {
  beforeEach(() => vi.spyOn(console, "error").mockImplementation(() => undefined));

  it("guards preference retrieval when learner identity is absent", async () => {
    const response = await GET(new NextRequest("http://localhost/api/preferences"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "LEARNER_IDENTITY_UNAVAILABLE",
        message: "Learner identity is unavailable"
      }
    });
  });

  it("returns a stable envelope without database details when preference GET fails", async () => {
    profileMocks.getOrCreateProfile.mockRejectedValue(
      new Error("mongodb host and credential detail")
    );

    const response = await GET(request());

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "PREFERENCE_RETRIEVAL_FAILED",
        message: "Unable to load preferences"
      }
    });
  });

  it("maps invalid PATCH JSON to the standard validation envelope", async () => {
    const response = await PATCH(request("{"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "INVALID_PREFERENCE_REQUEST",
        message: "Request body must contain valid JSON"
      }
    });
    expect(profileMocks.updatePreferences).not.toHaveBeenCalled();
  });

  it("does not expose database details when a preference update fails", async () => {
    profileMocks.updatePreferences.mockRejectedValue(new Error("write topology detail"));

    const response = await PATCH(
      request(JSON.stringify({ supportLanguage: "bilingual" }))
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "PREFERENCE_UPDATE_FAILED",
        message: "Unable to update preferences"
      }
    });
  });

  it("returns preferences normally through the guarded GET", async () => {
    profileMocks.getOrCreateProfile.mockResolvedValue({
      learnerId: "learner-a",
      preferences: DEFAULT_PREFERENCES,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const response = await GET(request());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ preferences: DEFAULT_PREFERENCES });
  });
});

function request(body?: string): NextRequest {
  return new NextRequest("http://localhost/api/preferences", {
    method: body === undefined ? "GET" : "PATCH",
    headers: {
      "x-learner-id": "learner-a",
      ...(body === undefined ? {} : { "Content-Type": "application/json" })
    },
    ...(body === undefined ? {} : { body })
  });
}
