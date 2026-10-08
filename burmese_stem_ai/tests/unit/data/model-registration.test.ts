import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  models: {} as Record<string, { schema: object }>, model: vi.fn(), deleteModel: vi.fn(),
  profileSchema: {}, sessionSchema: {}
}));
vi.mock("mongoose", () => ({ default: { models: mocks.models, model: mocks.model, deleteModel: mocks.deleteModel } }));
vi.mock("@/data/schemas/profile.schema", () => ({ profileSchema: mocks.profileSchema }));
vi.mock("@/data/schemas/session.schema", () => ({ sessionSchema: mocks.sessionSchema }));
beforeEach(() => {
  vi.resetModules();
  for (const key of Object.keys(mocks.models)) delete mocks.models[key];
  mocks.model.mockImplementation((name: string, schema: object) => (mocks.models[name] = { schema }));
  mocks.deleteModel.mockImplementation((name: string) => { delete mocks.models[name]; });
});
describe("Mongoose model registration and development hot reload", () => {
  it("registers missing models with the correct schemas", async () => {
    const { ProfileModel, SessionModel } = await import("@/data/schema");
    expect(ProfileModel.schema).toBe(mocks.profileSchema);
    expect(SessionModel.schema).toBe(mocks.sessionSchema);
    expect(mocks.model).toHaveBeenCalledTimes(2);
    expect(mocks.deleteModel).not.toHaveBeenCalled();
  });
  it("reuses matching models during development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const profile = mocks.models.Profile = { schema: mocks.profileSchema };
    const session = mocks.models.Session = { schema: mocks.sessionSchema };
    const loaded = await import("@/data/schema");
    expect(loaded.ProfileModel).toBe(profile);
    expect(loaded.SessionModel).toBe(session);
    expect(mocks.model).not.toHaveBeenCalled();
    expect(mocks.deleteModel).not.toHaveBeenCalled();
  });
  it("recompiles changed schemas only during development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    mocks.models.Profile = { schema: {} };
    mocks.models.Session = { schema: {} };
    const loaded = await import("@/data/schema");
    expect(mocks.deleteModel.mock.calls).toEqual([["Profile"], ["Session"]]);
    expect(loaded.ProfileModel.schema).toBe(mocks.profileSchema);
    expect(loaded.SessionModel.schema).toBe(mocks.sessionSchema);
  });
  it("preserves registered models in production even when schema objects differ", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const profile = mocks.models.Profile = { schema: {} };
    const session = mocks.models.Session = { schema: {} };
    const loaded = await import("@/data/schema");
    expect(loaded.ProfileModel).toBe(profile);
    expect(loaded.SessionModel).toBe(session);
    expect(mocks.model).not.toHaveBeenCalled();
    expect(mocks.deleteModel).not.toHaveBeenCalled();
  });
});
