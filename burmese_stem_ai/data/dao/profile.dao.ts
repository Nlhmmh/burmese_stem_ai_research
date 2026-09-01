import { connectMongoDB } from "../mongodb";
import { ProfileModel } from "../schema";
import { DEFAULT_PREFERENCES, PreferenceOptions, Profile } from "../schemas/profile.schema";

export async function getProfileById(learnerId: string) {
  await connectMongoDB();
  return await ProfileModel.findById(learnerId);
}

export async function getOrCreateProfile(learnerId: string): Promise<Profile> {
  await connectMongoDB();
  return ProfileModel.findOneAndUpdate(
    { learnerId },
    {
      $setOnInsert: {
        learnerId,
        preferences: DEFAULT_PREFERENCES,
        createdAt: new Date()
      }
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  );
}

type PreferenceUpdate = Partial<{
  [Key in PreferenceKey]: (typeof PreferenceOptions)[Key][number];
}>;

export async function updatePreferences(learnerId: string, preferences: PreferenceUpdate) {
  await connectMongoDB();
  const fieldsToUpdate = Object.fromEntries(
    Object.entries(preferences).map(([key, value]) => [`preferences.${key}`, value])
  );
  return ProfileModel.findOneAndUpdate(
    {
      learnerId
    },
    {
      $set: fieldsToUpdate,
      $setOnInsert: {
        learnerId
      }
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
  ).lean();
}

type PreferenceKey = keyof typeof PreferenceOptions;

export class PreferenceValidationError extends Error {}

export function validatePreferences(input: unknown): PreferenceUpdate {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new PreferenceValidationError("Request body must be a JSON object");
  }

  const entries = Object.entries(input);
  if (entries.length === 0) {
    throw new PreferenceValidationError("At least one preference must be provided");
  }

  const preferences: Record<string, string> = {};

  for (const [key, value] of entries) {
    if (!(key in PreferenceOptions)) {
      throw new PreferenceValidationError(`Unsupported preference: ${key}`);
    }

    if (typeof value !== "string") {
      throw new PreferenceValidationError(`${key} must be a string`);
    }

    const preferenceKey = key as PreferenceKey;
    const allowedValues = PreferenceOptions[preferenceKey] as readonly string[];
    if (!allowedValues.includes(value)) {
      throw new PreferenceValidationError(
        `Invalid value for ${key}. Allowed values: ${allowedValues.join(", ")}`
      );
    }

    preferences[key] = value;
  }

  return preferences as PreferenceUpdate;
}
