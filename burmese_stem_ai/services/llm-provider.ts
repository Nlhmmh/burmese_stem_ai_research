const RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-5.4-mini";
export const LLM_TIMEOUT_MS = 20_000;

export type LlmProviderFailureCode =
  | "NOT_CONFIGURED"
  | "TIMEOUT"
  | "REQUEST_FAILED"
  | "INVALID_RESPONSE"
  | "MISSING_OUTPUT"
  | "INVALID_JSON";

export class LlmProviderError extends Error {
  constructor(
    public readonly code: LlmProviderFailureCode,
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "LlmProviderError";
  }
}

type StructuredOutputRequest = {
  instructions: string;
  input: unknown;
  schemaName: string;
  schema: object;
};

/**
 * Execute one Responses API request and parse its first output_text value as
 * JSON. Prompts, schemas and runtime domain validation remain service-owned.
 * This helper deliberately has no retry policy.
 */
export async function requestStructuredOutput({
  instructions,
  input,
  schemaName,
  schema
}: StructuredOutputRequest): Promise<unknown> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-key-here") {
    throw new LlmProviderError("NOT_CONFIGURED", "LLM provider is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

  try {
    const response = await fetch(RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        store: false,
        instructions,
        input: JSON.stringify(input),
        text: {
          format: {
            type: "json_schema",
            name: schemaName,
            strict: true,
            schema
          }
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new LlmProviderError(
        "REQUEST_FAILED",
        `LLM provider request failed with status ${response.status}`,
        response.status
      );
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new LlmProviderError("INVALID_RESPONSE", "LLM provider returned an invalid response");
    }

    const outputText = extractOutputText(data);
    if (!outputText) {
      throw new LlmProviderError("MISSING_OUTPUT", "LLM provider returned no structured output");
    }

    try {
      return JSON.parse(outputText) as unknown;
    } catch {
      throw new LlmProviderError("INVALID_JSON", "LLM provider returned invalid JSON");
    }
  } catch (error) {
    if (error instanceof LlmProviderError) throw error;
    if (controller.signal.aborted || isAbortError(error)) {
      throw new LlmProviderError("TIMEOUT", "LLM provider request timed out");
    }
    throw new LlmProviderError("REQUEST_FAILED", "LLM provider request failed");
  } finally {
    clearTimeout(timeout);
  }
}

function extractOutputText(value: unknown): string | null {
  if (!isRecord(value) || !Array.isArray(value.output)) return null;

  for (const item of value.output) {
    if (!isRecord(item) || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (
        isRecord(content) &&
        content.type === "output_text" &&
        typeof content.text === "string" &&
        content.text.length > 0
      ) {
        return content.text;
      }
    }
  }
  return null;
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
