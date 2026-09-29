import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  LLM_TIMEOUT_MS,
  requestStructuredOutput
} from "@/services/llm-provider";

describe("shared LLM provider boundary", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "test-api-key");
    vi.stubEnv("OPENAI_MODEL", "");
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.useRealTimers());

  it.each(["", "your-key-here"])(
    "rejects the non-secret placeholder API key %j before fetch",
    async (apiKey) => {
      vi.stubEnv("OPENAI_API_KEY", apiKey);

      await expect(request()).rejects.toMatchObject({ code: "NOT_CONFIGURED" });
      expect(fetchMock).not.toHaveBeenCalled();
    }
  );

  it("uses the central URL, model, timeout signal and strict output format once", async () => {
    fetchMock.mockResolvedValue(providerResponse(JSON.stringify({ value: "ok" })));

    await expect(request()).resolves.toEqual({ value: "ok" });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(url).toBe("https://api.openai.com/v1/responses");
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(body).toMatchObject({
      model: "gpt-5.4-mini",
      store: false,
      instructions: "Bounded instructions",
      input: JSON.stringify({ concept: "Gradient descent" }),
      text: {
        format: {
          type: "json_schema",
          name: "unit_contract",
          strict: true,
          schema: { type: "object" }
        }
      }
    });
  });

  it("returns a stable non-2xx failure without retrying", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 429 });

    await expect(request()).rejects.toMatchObject({
      code: "REQUEST_FAILED",
      status: 429
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("rejects a response with no output text", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ output: [{ content: [] }] })
    });

    await expect(request()).rejects.toMatchObject({ code: "MISSING_OUTPUT" });
  });

  it("rejects invalid structured-output JSON", async () => {
    fetchMock.mockResolvedValue(providerResponse("not-json"));

    await expect(request()).rejects.toMatchObject({ code: "INVALID_JSON" });
  });

  it("rejects an invalid provider response envelope", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockRejectedValue(new SyntaxError("raw provider body"))
    });

    await expect(request()).rejects.toMatchObject({
      code: "INVALID_RESPONSE",
      message: "LLM provider returned an invalid response"
    });
  });

  it("aborts after the shared timeout without retrying", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("provider-specific abort detail");
            error.name = "AbortError";
            reject(error);
          });
        })
    );

    const result = request();
    const expectation = expect(result).rejects.toEqual(
      expect.objectContaining({
        code: "TIMEOUT",
        message: "LLM provider request timed out"
      })
    );
    await vi.advanceTimersByTimeAsync(LLM_TIMEOUT_MS);
    await expectation;
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("does not expose network error details through its stable error", async () => {
    fetchMock.mockRejectedValue(new Error("socket and host details"));

    await expect(request()).rejects.toEqual(
      expect.objectContaining({
        code: "REQUEST_FAILED",
        message: "LLM provider request failed"
      })
    );
  });

  function request() {
    return requestStructuredOutput({
      instructions: "Bounded instructions",
      input: { concept: "Gradient descent" },
      schemaName: "unit_contract",
      schema: { type: "object" }
    });
  }
});

function providerResponse(text: string) {
  return {
    ok: true,
    json: vi.fn().mockResolvedValue({
      output: [{ content: [{ type: "output_text", text }] }]
    })
  };
}
