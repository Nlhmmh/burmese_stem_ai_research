import { updatePreferences } from "@/data/dao/profile.dao";
import { LearnerIdentityError, requireLearner, requireLearnerId } from "@/services/learner.service";
import { PreferenceValidationError, validatePreferences } from "@/services/profile.service";
import { NextResponse, type NextRequest } from "next/server";

// Route: /api/preferences
// This route handles the retrieval and updating of learner preferences.
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { profile } = await requireLearner(request);
  return NextResponse.json({
    preferences: profile.preferences
  });
}

// PATCH /api/preferences
// This route handles the updating of learner preferences.
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const learnerId = requireLearnerId(request);
    const body = await request.json();
    const preferences = validatePreferences(body);
    const profile = await updatePreferences(learnerId, preferences);
    if (!profile) {
      return NextResponse.json({ error: "Unable to update learner profile" }, { status: 500 });
    }
    return NextResponse.json({
      learnerId: profile.learnerId,
      preferences: profile.preferences
    });
  } catch (error) {
    if (error instanceof LearnerIdentityError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof PreferenceValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error updating preferences:", error);
    return NextResponse.json({ error: "Unable to update preferences" }, { status: 500 });
  }
}
