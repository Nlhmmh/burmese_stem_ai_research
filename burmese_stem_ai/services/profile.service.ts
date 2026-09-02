import type { PreferenceUpdate } from "@/data/dao/profile.dao";
import { PreferenceOptions } from "@/data/schemas/profile.schema";

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
