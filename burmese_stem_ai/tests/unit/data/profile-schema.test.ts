import mongoose from "mongoose";
import { afterAll, describe, expect, it } from "vitest";
import { createFreshProfile, PreferenceOptions, profileSchema } from "@/data/schemas/profile.schema";
import { DEFAULT_PREFERENCES } from "@/lib/constants";
const Model = mongoose.models.UnitCoverageProfile ?? mongoose.model("UnitCoverageProfile", profileSchema);
afterAll(() => mongoose.deleteModel("UnitCoverageProfile"));
describe("profile schema validation and legacy compatibility", () => {
  it("trims explicit learner IDs and creates independent defaults without nested IDs", async () => {
    const first = new Model({ learnerId: "  learner-a  " });
    const second = new Model({ learnerId: "learner-b" });
    await first.validate();
    expect(first.learnerId).toBe("learner-a");
    expect(first.preferences?.toObject()).toEqual(DEFAULT_PREFERENCES);
    first.set("preferences.supportLanguage", "english");
    expect(second.get("preferences.supportLanguage")).toBe(DEFAULT_PREFERENCES.supportLanguage);
    expect(first.get("preferences._id")).toBeUndefined();
    expect(profileSchema.options.versionKey).toBe(false);
    expect(profileSchema.path("learnerId").options.unique).toBe(true);
  });
  it("fills a missing legacy learner ID from its existing Mongo ID", async () => {
    const id = new mongoose.Types.ObjectId();
    const profile = new Model({ _id: id });
    await profile.validate();
    expect(profile.learnerId).toBe(id.toString());
  });
  it("rejects a document with neither learner ID nor Mongo ID", async () => {
    const profile = new Model({ _id: null });
    await expect(profile.validate()).rejects.toThrow("learnerId");
  });
  for (const [key, values] of Object.entries(PreferenceOptions)) {
    it.each(values)(`accepts ${key}=%s`, async (value) => {
      const profile = new Model({ learnerId: "learner-a", preferences: { ...DEFAULT_PREFERENCES, [key]: value } });
      await expect(profile.validate()).resolves.toBeUndefined();
    });
    it(`rejects an invalid ${key}`, async () => {
      const profile = new Model({ learnerId: "learner-a", preferences: { ...DEFAULT_PREFERENCES, [key]: "unsupported" } });
      await expect(profile.validate()).rejects.toThrow(key);
    });
  }
  it("returns independent fresh preferences and timestamp fields", () => {
    const first = createFreshProfile("learner-a");
    const second = createFreshProfile("learner-b");
    Object.assign(first.preferences, { supportLanguage: "english" });
    expect(second.preferences).toEqual(DEFAULT_PREFERENCES);
    expect(first.learnerId).toBe("learner-a");
    expect(first.createdAt).toBeInstanceOf(Date);
    expect(first.updatedAt).toBeInstanceOf(Date);
    expect(first.preferences).not.toBe(second.preferences);
  });
});
