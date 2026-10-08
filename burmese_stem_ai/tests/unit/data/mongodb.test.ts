import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { connect } = vi.hoisted(() => ({ connect: vi.fn() }));
vi.mock("mongoose", () => ({ default: { connect } }));
const cacheGlobal = globalThis as typeof globalThis & { mongooseCache?: unknown };
const originalCache = cacheGlobal.mongooseCache;
beforeEach(() => { vi.resetModules(); delete cacheGlobal.mongooseCache; vi.stubEnv("DB_URL", "mongodb://isolated.invalid/unit_test"); });
afterEach(() => { delete cacheGlobal.mongooseCache; if (originalCache !== undefined) cacheGlobal.mongooseCache = originalCache; });
describe("Mongo connection cache", () => {
  it("shares one pending connection between concurrent requests and later reuses it", async () => {
    let resolve!: (value: object) => void;
    connect.mockReturnValueOnce(new Promise<object>((done) => { resolve = done; }));
    const { connectMongoDB } = await import("@/data/mongodb");
    const first = connectMongoDB();
    const second = connectMongoDB();
    expect(connect).toHaveBeenCalledTimes(1);
    expect(connect).toHaveBeenCalledWith("mongodb://isolated.invalid/unit_test", { serverSelectionTimeoutMS: 5000, maxPoolSize: 10 });
    const connection = { ready: true };
    resolve(connection);
    expect(await first).toBe(connection);
    expect(await second).toBe(connection);
    expect(await connectMongoDB()).toBe(connection);
    vi.resetModules();
    expect(await (await import("@/data/mongodb")).connectMongoDB()).toBe(connection);
    expect(connect).toHaveBeenCalledTimes(1);
  });
  it("rejects a missing database URL before trying to connect", async () => {
    vi.stubEnv("DB_URL", undefined);
    const { connectMongoDB } = await import("@/data/mongodb");
    await expect(connectMongoDB()).rejects.toThrow("DB_URL environment variable is required");
    expect(connect).not.toHaveBeenCalled();
  });
  it("clears a rejected promise and permits a later request to recover", async () => {
    const error = new Error("connection unavailable");
    const connection = { ready: true };
    connect.mockRejectedValueOnce(error).mockResolvedValueOnce(connection);
    const { connectMongoDB } = await import("@/data/mongodb");
    await expect(connectMongoDB()).rejects.toBe(error);
    expect(cacheGlobal.mongooseCache).toMatchObject({ connection: null, promise: null });
    expect(await connectMongoDB()).toBe(connection);
    expect(connect).toHaveBeenCalledTimes(2);
  });
});
