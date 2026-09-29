import {
  findSession,
  recordSessionResponse,
  type Adaptation,
  type SessionRecord
} from "@/data/dao/session.dao";
import { MAX_ADAPTATION_ROUNDS, type SessionStatus } from "@/lib/constants";
import {
  DIFFICULTY_TYPES,
  OVERALL_SUPPORT_NEEDS,
  type DifficultyType,
  type LearnerResponseEvent,
  type OverallSupportNeed
} from "@/lib/session-domain";
import {
  selectAdaptationRoute,
  type GeneratingAdaptationDecision
} from "@/services/adaptation-routing.service";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_TIMEOUT_MS = 20_000;
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

export type ValidatedLearnerResponse = {
  overallSupportNeed: OverallSupportNeed;
  difficultyType: DifficultyType | null;
};

export function validateLearnerResponseRequest(input: unknown): ValidatedLearnerResponse {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new ResponseValidationError("Request body must be a JSON object");
  }

  const body = input as Record<string, unknown>;
  const legacyUnderstanding = body.understanding;
  const canonicalOverallSupportNeed = body.overallSupportNeed;
  if (
    legacyUnderstanding !== undefined &&
    canonicalOverallSupportNeed !== undefined &&
    legacyUnderstanding !== canonicalOverallSupportNeed
  ) {
    throw new ResponseValidationError(
      "understanding and overallSupportNeed must match when both are provided"
    );
  }

  const overallSupportNeed = canonicalOverallSupportNeed ?? legacyUnderstanding;
  if (
    typeof overallSupportNeed !== "string" ||
    !OVERALL_SUPPORT_NEEDS.includes(overallSupportNeed as OverallSupportNeed)
  ) {
    throw new ResponseValidationError(
      `Overall support need must be one of: ${OVERALL_SUPPORT_NEEDS.join(", ")}`
    );
  }

  const suppliedDifficulty = body.difficultyType;
  const difficultyType = suppliedDifficulty === undefined ? null : suppliedDifficulty;
  if (
    difficultyType !== null &&
    (typeof difficultyType !== "string" ||
      !DIFFICULTY_TYPES.includes(difficultyType as DifficultyType))
  ) {
    throw new ResponseValidationError(
      `Difficulty type must be one of: ${DIFFICULTY_TYPES.join(", ")}`
    );
  }

  if (overallSupportNeed === "high" && difficultyType !== null) {
    throw new ResponseValidationError(
      "Difficulty type is only available when additional support is requested"
    );
  }

  return {
    overallSupportNeed: overallSupportNeed as OverallSupportNeed,
    difficultyType: difficultyType as DifficultyType | null
  };
}

/** Compatibility helper for callers that only need the legacy field value. */
export function validateUnderstandingResponse(input: unknown): OverallSupportNeed {
  return validateLearnerResponseRequest(input).overallSupportNeed;
}

export async function respondToLearningSession(
  learnerId: string,
  sessionId: string,
  overallSupportNeed: OverallSupportNeed,
  difficultyType: DifficultyType | null = null
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

  const decision = selectAdaptationRoute(overallSupportNeed, difficultyType);
  const canAdapt = decision.route !== "fade" && currentRound < MAX_ADAPTATION_ROUNDS;
  const nextRound = canAdapt ? currentRound + 1 : currentRound;
  const status = selectStatus(overallSupportNeed, nextRound);
  const adaptation = canAdapt
    ? await createAdaptation(session, overallSupportNeed, decision, nextRound)
    : null;
  const responseEvent: LearnerResponseEvent = {
    overallSupportNeed,
    difficultyType,
    route: decision.route,
    roundBefore: currentRound,
    roundAfter: adaptation ? nextRound : currentRound,
    createdAt: new Date()
  };

  const updatedSession = await recordSessionResponse({
    learnerId,
    sessionId,
    expectedRound: currentRound,
    expectedResponseEventCount: session.responseEvents?.length ?? 0,
    understanding: overallSupportNeed,
    status,
    adaptation,
    responseEvent
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
    route: decision.route,
    adaptation
  };
}

function selectStatus(overallSupportNeed: OverallSupportNeed, round: number): SessionStatus {
  if (overallSupportNeed !== "high" && round >= MAX_ADAPTATION_ROUNDS) {
    return "review_recommended";
  }
  return "in_progress";
}

async function createAdaptation(
  session: SessionRecord,
  learnerResponse: OverallSupportNeed,
  decision: GeneratingAdaptationDecision,
  round: number
): Promise<Adaptation> {
  const generated = await generateAdaptation(session, learnerResponse, decision);
  return {
    learnerResponse,
    supportType: decision.supportType,
    content: generated.content,
    ...(decision.route === "language_support"
      ? { presentationOverride: decision.presentationOverride }
      : {}),
    round,
    createdAt: new Date()
  };
}

async function generateAdaptation(
  session: SessionRecord,
  learnerResponse: OverallSupportNeed,
  decision: GeneratingAdaptationDecision
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
        instructions: buildAdaptationInstructions(learnerResponse, decision),
        input: JSON.stringify({
          adaptationRoute: decision.route,
          presentationOverride:
            decision.route === "language_support" ? decision.presentationOverride : null,
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
    if (repeatsExistingSupport(session, generated.content)) {
      throw new AdaptationGenerationError("OpenAI repeated existing support");
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
  learnerResponse: OverallSupportNeed,
  decision: GeneratingAdaptationDecision
): string {
  const strategy = decision.route === "language_support"
    ? `
- language_support (Stage 3 → Stage 4 → Stage 5):
  Reconsider how the active STEM terminology should be retained and
  explained across English and Burmese before revising the scaffold.
  Keep established English technical terms when they are clearer or commonly
  used, and explain their meaning naturally in Burmese.
  Do not translate every English technical term mechanically.
  Produce a clear English explanation and a natural Burmese explanation of
  the same active concept.`
    : decision.route === "concept_clarification"
      ? `
- concept_clarification (Stage 4 → Stage 5):
  Treat this only as the learner's self-reported request for conceptual help,
  not as evidence of an objectively diagnosed misconception.
  Reconsider the active concept's core meaning and provide a revised core
  explanation from a different perspective than the initial explanation and
  every previous adaptation.
  Follow the revised core explanation with one concise, appropriate scaffold,
  such as an analogy, concrete connection or short guided reasoning step.
  Keep both parts focused on the active concept. Do not respond with merely
  another example and do not repeat a prior explanation, example or analogy.`
    : decision.supportType === "another_example"
      ? `
- another_example:
  Provide one new, concrete example that was not used in the initial
  explanation or previous adaptations.
  Explain how the example connects to the concept.`
      : `
- simpler_explanation:
  Explain only the most important idea using shorter sentences,
  simpler language and lower technical complexity.
  Use a different analogy or perspective when helpful.`;

  return `
# Role

You are a bilingual STEM educator supporting a Burmese-speaking
university student.

# Goal

The learner reported "${learnerResponse}".
The application selected the "${decision.route}" route.
Generate exactly one "${decision.supportType}" support item that helps the
learner understand the existing STEM concept.

# Adaptation strategy

Follow the selected support type exactly:
${strategy}

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

1. The content follows "${decision.supportType}" and the "${decision.route}" route.
2. It materially differs from previous support.
3. It is concise and appropriate for the learner’s reported support need.
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

function repeatsExistingSupport(
  session: SessionRecord,
  generated: GeneratedAdaptation["content"]
): boolean {
  const existingContent = [
    session.explanations.simple,
    session.explanations.realWorldExample,
    session.explanations.technical,
    ...session.adaptations.map((adaptation) => adaptation.content)
  ];

  return existingContent.some(
    (content) =>
      normaliseForComparison(content.en) === normaliseForComparison(generated.en) &&
      normaliseForComparison(content.my) === normaliseForComparison(generated.my)
  );
}

function normaliseForComparison(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}
