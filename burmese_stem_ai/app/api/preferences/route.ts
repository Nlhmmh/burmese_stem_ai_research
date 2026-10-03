import { updatePreferences } from "@/data/dao/profile.dao";
import { apiError } from "@/lib/api-error";
import { LearnerIdentityError, requireLearner, requireLearnerId } from "@/services/learner.service";
import { PreferenceValidationError, validatePreferences } from "@/services/profile.service";
import { NextResponse, type NextRequest } from "next/server";

// Route: /api/preferences
// This route handles the retrieval and updating of learner preferences.
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { profile } = await requireLearner(request);
    return NextResponse.json({
      preferences: profile.preferences
    });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return apiError("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    console.error("Unable to retrieve preferences:", error);
    return apiError(
      "PREFERENCE_RETRIEVAL_FAILED",
      "Unable to load preferences",
      500
    );
  }
}

// PATCH /api/preferences
// This route handles the updating of learner preferences.
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const body = await readJson(request);
    const preferences = validatePreferences(body);
    const profile = await updatePreferences(learnerId, preferences);
    if (!profile) {
      return apiError("PREFERENCE_UPDATE_FAILED", "Unable to update preferences", 500);
    }
    return NextResponse.json({
      learnerId: profile.learnerId,
      preferences: profile.preferences
    });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return apiError("LEARNER_IDENTITY_UNAVAILABLE", error.message, 400);
    }
    if (error instanceof PreferenceValidationError) {
      return apiError("INVALID_PREFERENCE_REQUEST", error.message, 400);
    }
    console.error("Error updating preferences:", error);
    return apiError("PREFERENCE_UPDATE_FAILED", "Unable to update preferences", 500);
  }
}

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new PreferenceValidationError("Request body must contain valid JSON");
  }
}
