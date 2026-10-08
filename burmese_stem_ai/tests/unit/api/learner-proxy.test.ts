import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { config, proxy } from "@/proxy";
const id = "2fba6e7a-1225-4d1f-971f-5ae58704e3d5";
const randomUUID = vi.fn(() => id);
beforeEach(() => vi.stubGlobal("crypto", { randomUUID }));
describe("server-assigned learner identity", () => {
  it.each([undefined, "", "bad-id", "2fba6e7a-1225-1d1f-971f-5ae58704e3d5"])("replaces missing or invalid cookie %s and strips forged headers", (cookie) => {
    const request = new NextRequest("https://example.test/api/sessions", { headers: {
      "x-learner-id": "attacker", "x-request-id": "request-1",
      ...(cookie === undefined ? {} : { cookie: `learnerId=${cookie}` })
    } });
    const response = proxy(request);
    expect(response.headers.get("x-middleware-request-x-learner-id")).toBe(id);
    expect(response.headers.get("x-middleware-request-x-request-id")).toBe("request-1");
    expect(randomUUID).toHaveBeenCalledTimes(1);
    expect(response.cookies.get("learnerId")).toMatchObject({ value: id, httpOnly: true, sameSite: "lax", path: "/", maxAge: 31536000 });
  });
  it.each([id, id.toUpperCase()])("preserves a valid v4 cookie %s without resetting it", (cookie) => {
    const response = proxy(new NextRequest("https://example.test/api/preferences", { headers: { cookie: `learnerId=${cookie}`, "x-learner-id": "attacker" } }));
    expect(response.headers.get("x-middleware-request-x-learner-id")).toBe(cookie);
    expect(response.cookies.get("learnerId")).toBeUndefined();
    expect(randomUUID).not.toHaveBeenCalled();
  });
  it.each(["production", "development"])("sets transport protection for %s", (environment) => {
    vi.stubEnv("NODE_ENV", environment);
    const response = proxy(new NextRequest("https://example.test/api/sessions"));
    expect(Boolean(response.cookies.get("learnerId")?.secure)).toBe(environment === "production");
    expect(config.matcher).toEqual(["/api/:path*"]);
  });
});
