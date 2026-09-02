import {
  findSession,
  recordSessionResponse,
  type Adaptation,
  type LearnerResponse,
  type SessionRecord
} from "@/data/dao/session.dao";
import { MAX_ADAPTATION_ROUNDS, type SessionStatus, type SupportType } from "@/lib/constants";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_TIMEOUT_MS = 20_000;
const ALLOWED_RESPONSES = ["high", "medium", "needs_support"] as const;

const adaptationOutputSchema = {
  type: "object",
  properties: {
    content: {
      type: "object",
      properties: {
        en: { type: "string" },
        my: { type: "string" }
      },
      required: ["en", "my"],
      additionalProperties: false
    }
  },
  required: ["content"],
  additionalProperties: false
} as const;

type GeneratedAdaptation = {
  content: {
    en: string;
    my: string;
  };
};

type OpenAIResponse = {
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

export class ResponseValidationError extends Error {}
export class SessionNotFoundError extends Error {}
export class SessionResponseConflictError extends Error {}
export class AdaptationGenerationError extends Error {}

export function validateUnderstandingResponse(input: unknown): LearnerResponse {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new ResponseValidationError("Request body must be a JSON object");
  }

  const understanding = (input as Record<string, unknown>).understanding;
  if (
    typeof understanding !== "string" ||
    !ALLOWED_RESPONSES.includes(understanding as LearnerResponse)
  ) {
    throw new ResponseValidationError(
      `Understanding must be one of: ${ALLOWED_RESPONSES.join(", ")}`
    );
  }

  return understanding as LearnerResponse;
}

export async function respondToLearningSession(
  learnerId: string,
  sessionId: string,
  understanding: LearnerResponse
) {
  const session = await findSession(learnerId, sessionId);
  if (!session) {
    throw new SessionNotFoundError("Learning session was not found");
  }
  if (session.status === "completed") {
    throw new SessionResponseConflictError("Completed sessions cannot receive new responses");
  }

  const currentRound = session.adaptationRound;
  if (!Number.isInteger(currentRound) || currentRound < 0 || currentRound > MAX_ADAPTATION_ROUNDS) {
    throw new SessionResponseConflictError("Session adaptation state is invalid");
  }

  const canAdapt = currentRound < MAX_ADAPTATION_ROUNDS;
  const nextRound = canAdapt ? currentRound + 1 : currentRound;
  const status = selectStatus(understanding, nextRound);
  const adaptation = canAdapt ? await createAdaptation(session, understanding, nextRound) : null;

  const updatedSession = await recordSessionResponse({
    learnerId,
    sessionId,
    expectedRound: currentRound,
    understanding,
    status,
    adaptation
  });

  if (!updatedSession) {
    throw new SessionResponseConflictError(
      "The session changed while this response was being processed; please retry"
    );
  }

  return {
    understanding: updatedSession.understanding,
    status: updatedSession.status,
    adaptationRound: updatedSession.adaptationRound,
    adaptation
  };
}

function selectStatus(understanding: LearnerResponse, round: number): SessionStatus {
  if (understanding !== "high" && round >= MAX_ADAPTATION_ROUNDS) {
    return "review_recommended";
  }
  return "in_progress";
}

async function createAdaptation(
  session: SessionRecord,
  learnerResponse: LearnerResponse,
  round: number
): Promise<Adaptation> {
  const supportType = selectSupportType(learnerResponse);
  const generated = await generateAdaptation(session, learnerResponse, supportType);
  return {
    learnerResponse,
    supportType,
    content: generated.content,
    round,
    createdAt: new Date()
  };
}

function selectSupportType(understanding: LearnerResponse): SupportType {
  switch (understanding) {
    case "high":
      return "key_takeaway";
    case "medium":
      return "another_example";
    case "needs_support":
      return "simpler_explanation";
  }
}

async function generateAdaptation(
  session: SessionRecord,
  learnerResponse: LearnerResponse,
  supportType: SupportType
): Promise<GeneratedAdaptation> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-key-here") {
    throw new AdaptationGenerationError("OpenAI API key is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        store: false,
        instructions: buildAdaptationInstructions(learnerResponse, supportType),
        input: JSON.stringify({
          concept: session.concept,
          initialExplanations: session.explanations,
          previousAdaptations: session.adaptations,
          preferences: session.preferencesSnapshot
        }),
        text: {
          format: {
            type: "json_schema",
            name: "learning_adaptation",
            strict: true,
            schema: adaptationOutputSchema
          }
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new AdaptationGenerationError(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as OpenAIResponse;
    const outputText = data.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;
    if (!outputText) {
      throw new AdaptationGenerationError("OpenAI returned no structured output");
    }

    const generated: unknown = JSON.parse(outputText);
    if (!isGeneratedAdaptation(generated)) {
      throw new AdaptationGenerationError("OpenAI returned invalid adaptation content");
    }
    return generated;
  } catch (error) {
    if (error instanceof AdaptationGenerationError) throw error;
    throw new AdaptationGenerationError("Unable to generate adapted support");
  } finally {
    clearTimeout(timeout);
  }
}

function buildAdaptationInstructions(
  learnerResponse: LearnerResponse,
  supportType: SupportType
): string {
  return `
# Role

You are a bilingual STEM educator supporting a Burmese-speaking
university student.

# Goal

The learner reported "${learnerResponse}".
Generate exactly one "${supportType}" support item that helps the
learner understand the existing STEM concept.

# Adaptation strategy

Follow the selected support type exactly:

- key_takeaway:
  Summarise the central idea in 1–2 short sentences.
  Reinforce what the learner should remember without introducing
  another concept.

- another_example:
  Provide one new, concrete example that was not used in the initial
  explanation or previous adaptations.
  Explain how the example connects to the concept.

- simpler_explanation:
  Explain only the most important idea using shorter sentences,
  simpler language and lower technical complexity.
  Use a different analogy or perspective when helpful.

# Context constraints

- Stay focused on the supplied concept.
- Do not introduce an unrelated concept.
- Do not contradict the initial explanation.
- Examine previousAdaptations and avoid repeating their explanation,
  wording, example or analogy.
- Respect the supplied explanation level and learning style.
- Do not repeat the complete initial explanation.
- Do not create a quiz, question sequence, grade or score.
- Do not make decisions about understanding, status or adaptation round.
- Do not claim that the learner now understands the concept.

# Language contract

- The "en" field must contain clear, natural English.
- The "my" field must contain natural Burmese written in Myanmar Unicode.
- English STEM terminology may remain in Latin characters when clearer.
- Do not translate English word by word.
- Write the Burmese content directly from the underlying meaning.
- The English and Burmese fields must communicate the same information.
- Do not output Chinese, Japanese, Korean, Thai, Arabic, Devanagari or
  characters from any other unrelated writing system.
- Burmese fields may contain only Myanmar script, Latin characters for
  English STEM terms, numbers, whitespace and ordinary punctuation.

# Success criteria

Before returning the result, verify that:

1. The content follows "${supportType}".
2. It materially differs from previous support.
3. It is concise and appropriate for the learner’s reported understanding.
4. English and Burmese communicate the same technical meaning.
5. Burmese sounds natural rather than machine-translated.
6. No unsupported writing system appears.
`;
}

function isGeneratedAdaptation(value: unknown): value is GeneratedAdaptation {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const content = (value as Record<string, unknown>).content;
  if (typeof content !== "object" || content === null || Array.isArray(content)) return false;
  const bilingual = content as Record<string, unknown>;
  return (
    typeof bilingual.en === "string" &&
    bilingual.en.trim().length > 0 &&
    typeof bilingual.my === "string" &&
    bilingual.my.trim().length > 0
  );
}
