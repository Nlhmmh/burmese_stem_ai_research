import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ connect: vi.fn(), disconnect: vi.fn(), profileIndexes: vi.fn(), sessionIndexes: vi.fn() }));
// Import the CLI only behind mocks. No dotenv loading, live database or index operation is allowed.
vi.mock("dotenv/config", () => ({}));
vi.mock("mongoose", () => ({ default: { connect: mocks.connect, disconnect: mocks.disconnect } }));
vi.mock("@/data/schema", () => ({ ProfileModel: { syncIndexes: mocks.profileIndexes }, SessionModel: { syncIndexes: mocks.sessionIndexes } }));
let originalExitCode: typeof process.exitCode;
beforeEach(() => {
  vi.resetModules(); originalExitCode = process.exitCode; process.exitCode = undefined;
  vi.stubEnv("DB_URL", "mongodb://isolated.invalid/unit_test");
  mocks.connect.mockResolvedValue(undefined); mocks.disconnect.mockResolvedValue(undefined);
  mocks.profileIndexes.mockResolvedValue(["old-profile-index"]); mocks.sessionIndexes.mockResolvedValue([]);
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { process.exitCode = originalExitCode; });
describe("mocked database initialization CLI", () => {
  it("connects, synchronizes both collections and disconnects", async () => {
    await import("@/data/init-db");
    await vi.waitFor(() => expect(mocks.disconnect).toHaveBeenCalledTimes(1));
    expect(mocks.connect).toHaveBeenCalledWith("mongodb://isolated.invalid/unit_test");
    expect(mocks.profileIndexes).toHaveBeenCalledTimes(1);
    expect(mocks.sessionIndexes).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Removed obsolete profile indexes:", ["old-profile-index"]);
    expect(console.log).toHaveBeenCalledWith("Removed obsolete session indexes:", []);
    expect(process.exitCode).toBeUndefined();
  });
  it.each(["connect", "profileIndexes", "sessionIndexes"] as const)("reports %s failure and still disconnects", async (boundary) => {
    const error = new Error(`${boundary} failed`);
    mocks[boundary].mockRejectedValueOnce(error);
    await import("@/data/init-db");
    await vi.waitFor(() => expect(mocks.disconnect).toHaveBeenCalledTimes(1));
    expect(console.error).toHaveBeenCalledWith("Database initialization failed:", error);
    expect(process.exitCode).toBe(1);
    if (boundary === "connect") expect(mocks.profileIndexes).not.toHaveBeenCalled();
    if (boundary !== "sessionIndexes") expect(mocks.sessionIndexes).not.toHaveBeenCalled();
  });
});
