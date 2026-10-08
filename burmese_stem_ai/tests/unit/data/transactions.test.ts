import { beforeEach, describe, expect, it, vi } from "vitest";
import { runWithTx, sessionWithTx } from "@/data/tx/index.js";
const { startSession } = vi.hoisted(() => ({ startSession: vi.fn() }));
vi.mock("mongoose", () => ({ default: { startSession } }));
const session = { withTransaction: vi.fn(), endSession: vi.fn() };
beforeEach(() => {
  startSession.mockResolvedValue(session);
  session.withTransaction.mockImplementation(async (callback: () => Promise<void>) => { await callback(); });
  session.endSession.mockResolvedValue(undefined);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
describe("transaction success, fallback and cleanup", () => {
  it("returns the callback result and closes the session after success", async () => {
    const result = { stored: true };
    const callback = vi.fn().mockResolvedValue(result);
    expect(await runWithTx(callback)).toBe(result);
    expect(callback).toHaveBeenCalledExactlyOnceWith(session);
    expect(session.endSession).toHaveBeenCalledTimes(1);
    expect(console.error).not.toHaveBeenCalled();
  });
  it.each([
    new Error("Transaction numbers are only allowed on a replica set member or mongos"),
    new Error("Transaction support is not available"),
    { codeName: "IllegalOperation" }
  ])("uses the standalone fallback only for an unsupported transaction %#", async (error) => {
    session.withTransaction.mockRejectedValueOnce(error);
    const callback = vi.fn().mockResolvedValue("fallback result");
    expect(await runWithTx(callback)).toBe("fallback result");
    expect(callback).toHaveBeenCalledExactlyOnceWith(null);
    expect(console.error).not.toHaveBeenCalled();
    expect(session.endSession).toHaveBeenCalledTimes(1);
  });
  it.each([new Error("write failed"), null, "unexpected rejection"])("does not rerun the callback on an ordinary error %#", async (error) => {
    const callback = vi.fn().mockRejectedValue(error);
    await expect(runWithTx(callback)).rejects.toBe(error);
    expect(callback).toHaveBeenCalledExactlyOnceWith(session);
    expect(console.error).toHaveBeenCalledWith("Transaction aborted due to an error:", error);
    expect(session.endSession).toHaveBeenCalledTimes(1);
  });
  it("closes the session when the fallback callback also fails", async () => {
    session.withTransaction.mockRejectedValueOnce({ codeName: "IllegalOperation" });
    const error = new Error("fallback failed");
    await expect(runWithTx(vi.fn().mockRejectedValue(error))).rejects.toBe(error);
    expect(session.endSession).toHaveBeenCalledTimes(1);
  });
  it("does not call a callback or close a nonexistent session if starting fails", async () => {
    const error = new Error("cannot start session");
    startSession.mockRejectedValueOnce(error);
    const callback = vi.fn();
    await expect(runWithTx(callback)).rejects.toBe(error);
    expect(callback).not.toHaveBeenCalled();
    expect(session.endSession).not.toHaveBeenCalled();
  });
  it("does not hide a cleanup failure", async () => {
    const error = new Error("cleanup failed");
    session.endSession.mockRejectedValueOnce(error);
    await expect(runWithTx(vi.fn().mockResolvedValue("success"))).rejects.toBe(error);
  });
  it("does not close a caller-owned session in the lower-level helper", async () => {
    expect(await sessionWithTx(session, vi.fn().mockResolvedValue(42))).toBe(42);
    expect(session.endSession).not.toHaveBeenCalled();
  });
});
