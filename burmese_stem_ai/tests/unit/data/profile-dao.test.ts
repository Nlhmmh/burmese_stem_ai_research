import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOrCreateProfile, getProfileById, updatePreferences } from "@/data/dao/profile.dao";
import { DEFAULT_PREFERENCES } from "@/lib/constants";
const mocks = vi.hoisted(() => ({ connect: vi.fn(), findById: vi.fn(), findOneAndUpdate: vi.fn(), lean: vi.fn() }));
vi.mock("@/data/mongodb", () => ({ connectMongoDB: mocks.connect }));
vi.mock("@/data/schema", () => ({ ProfileModel: { findById: mocks.findById, findOneAndUpdate: mocks.findOneAndUpdate } }));
beforeEach(() => { mocks.connect.mockResolvedValue(undefined); });
describe("profile persistence boundaries", () => {
  it("returns the legacy ID lookup after establishing a connection", async () => {
    mocks.findById.mockResolvedValue({ learnerId: "learner-a" });
    expect(await getProfileById("legacy-object-id")).toEqual({ learnerId: "learner-a" });
    expect(mocks.findById).toHaveBeenCalledExactlyOnceWith("legacy-object-id");
  });
  it("upserts a learner-scoped profile and applies defaults only on insert", async () => {
    const profile = { learnerId: "learner-a", preferences: DEFAULT_PREFERENCES };
    mocks.findOneAndUpdate.mockResolvedValue(profile);
    expect(await getOrCreateProfile("learner-a")).toBe(profile);
    expect(mocks.findOneAndUpdate).toHaveBeenCalledWith({ learnerId: "learner-a" }, {
      $setOnInsert: { learnerId: "learner-a", preferences: DEFAULT_PREFERENCES, createdAt: expect.any(Date) }
    }, { upsert: true, new: true, setDefaultsOnInsert: true });
  });
  it("uses dotted updates so untouched preference fields remain intact", async () => {
    mocks.findOneAndUpdate.mockReturnValue({ lean: mocks.lean });
    mocks.lean.mockResolvedValue({ learnerId: "learner-a" });
    expect(await updatePreferences("learner-a", { supportLanguage: "english", explanationLevel: "advanced" })).toEqual({ learnerId: "learner-a" });
    expect(mocks.findOneAndUpdate).toHaveBeenCalledWith({ learnerId: "learner-a" }, {
      $set: { "preferences.supportLanguage": "english", "preferences.explanationLevel": "advanced" }, $setOnInsert: { learnerId: "learner-a" }
    }, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    expect(mocks.lean).toHaveBeenCalledTimes(1);
  });
  it.each([getOrCreateProfile, getProfileById, (id: string) => updatePreferences(id, { learningStyle: "concise" })])("stops before accessing a collection if connecting fails %#", async (operation) => {
    const error = new Error("database unavailable");
    mocks.connect.mockRejectedValueOnce(error);
    await expect(operation("learner-a")).rejects.toBe(error);
    expect(mocks.findById).not.toHaveBeenCalled();
    expect(mocks.findOneAndUpdate).not.toHaveBeenCalled();
  });
  it("propagates a rejected write rather than returning a success", async () => {
    const error = new Error("write failed");
    mocks.findOneAndUpdate.mockReturnValue({ lean: mocks.lean });
    mocks.lean.mockRejectedValueOnce(error);
    await expect(updatePreferences("learner-a", { learningStyle: "concise" })).rejects.toBe(error);
  });
});
