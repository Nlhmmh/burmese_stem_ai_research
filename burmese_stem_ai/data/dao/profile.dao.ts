import { connectMongoDB } from "@/data/mongodb";
import { ProfileModel } from "@/data/schema";
import { PreferenceOptions, Profile } from "@/data/schemas/profile.schema";
import { DEFAULT_PREFERENCES } from "@/lib/constants";

type PreferenceKey = keyof typeof PreferenceOptions;

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

export type PreferenceUpdate = Partial<{
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
