import {
  appendFollowUp,
  findSession,
  type FollowUp,
  type SessionRecord
} from "@/data/dao/session.dao";
import { MAX_FOLLOW_UP_QUESTION_LENGTH, MAX_FOLLOW_UPS } from "@/lib/constants";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_TIMEOUT_MS = 20_000;

const followUpOutputSchema = {
  type: "object",
  properties: {
    relatedToCurrentConcept: { type: "boolean" },
    message: { type: "string" },
    answer: {
      type: "object",
      properties: {
        en: { type: "string" },
        my: { type: "string" }
      },
      required: ["en", "my"],
      additionalProperties: false
    }
  },
  required: ["relatedToCurrentConcept", "message", "answer"],
  additionalProperties: false
} as const;

type GeneratedFollowUp = {
  relatedToCurrentConcept: boolean;
  message: string;
  answer: {
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

export class FollowUpValidationError extends Error {}
export class FollowUpSessionNotFoundError extends Error {}
export class FollowUpLimitError extends Error {}
export class FollowUpOutOfScopeError extends Error {}
export class FollowUpGenerationError extends Error {}

export function validateFollowUpRequest(input: unknown): string {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new FollowUpValidationError("Request body must be a JSON object");
  }

  const question = (input as Record<string, unknown>).question;
  if (typeof question !== "string" || question.trim().length === 0) {
    throw new FollowUpValidationError("Question must be a non-empty string");
  }

  const trimmedQuestion = question.trim();
  if (trimmedQuestion.length > MAX_FOLLOW_UP_QUESTION_LENGTH) {
    throw new FollowUpValidationError(
      `Question must be ${MAX_FOLLOW_UP_QUESTION_LENGTH} characters or fewer`
    );
  }

  return trimmedQuestion;
}

export async function askSessionFollowUp(learnerId: string, sessionId: string, question: string) {
  const session = await findSession(learnerId, sessionId);
  if (!session) {
    throw new FollowUpSessionNotFoundError("Learning session was not found");
  }
  const existingFollowUps = session.followUps ?? [];
  if (existingFollowUps.length >= MAX_FOLLOW_UPS) {
    throw new FollowUpLimitError(`A session can have at most ${MAX_FOLLOW_UPS} follow-ups`);
  }

  const generated = await generateFollowUp(session, question);
  if (!generated.relatedToCurrentConcept) {
    throw new FollowUpOutOfScopeError(
      generated.message.trim() ||
        "This appears to be a different STEM concept. Start a new learning session?"
    );
  }
  validateRelatedAnswer(generated);

  const followUp: FollowUp = {
    question,
    answer: generated.answer,
    createdAt: new Date()
  };
  const updatedSession = await appendFollowUp(learnerId, sessionId, followUp);
  if (!updatedSession) {
    throw new FollowUpLimitError(
      `The session already has the maximum of ${MAX_FOLLOW_UPS} follow-ups`
    );
  }

  return {
    question: followUp.question,
    answer: followUp.answer
  };
}

async function generateFollowUp(
  session: SessionRecord,
  question: string
): Promise<GeneratedFollowUp> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-key-here") {
    throw new FollowUpGenerationError("OpenAI API key is not configured");
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
        instructions: buildFollowUpInstructions(),
        input: JSON.stringify({
          currentConcept: session.concept,
          explanations: session.explanations,
          latestUnderstanding: session.understanding,
          latestAdaptation: session.adaptations.at(-1) ?? null,
          preferences: session.preferencesSnapshot,
          previousFollowUps: session.followUps ?? [],
          question
        }),
        text: {
          format: {
            type: "json_schema",
            name: "scoped_learning_follow_up",
            strict: true,
            schema: followUpOutputSchema
          }
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new FollowUpGenerationError(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as OpenAIResponse;
    const outputText = data.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;
    if (!outputText) {
      throw new FollowUpGenerationError("OpenAI returned no structured output");
    }

    const generated: unknown = JSON.parse(outputText);
    if (!isGeneratedFollowUp(generated)) {
      throw new FollowUpGenerationError("OpenAI returned invalid follow-up content");
    }
    return generated;
  } catch (error) {
    if (error instanceof FollowUpGenerationError) throw error;
    throw new FollowUpGenerationError("Unable to generate a follow-up answer");
  } finally {
    clearTimeout(timeout);
  }
}

function buildFollowUpInstructions(): string {
  return `
# Role

You are a bilingual STEM educator answering one follow-up question
about an existing learning session.

# Goal

Decide whether the learner’s question helps them understand the supplied
currentConcept. If related, provide one short, focused bilingual answer.

# Scope decision

A question is related when it asks about:

- the current concept itself;
- a component, term or mechanism needed to understand it;
- an example, application or consequence of the concept;
- clarification of the initial explanation or latest adaptation.

Do not reject a question merely because it names a supporting
sub-concept.

For example, "Why is the learning rate important?" is related to
Gradient Descent.

A question is unrelated when it introduces a different primary topic
that is not needed to understand the current concept.

# Related question

When related:

- set relatedToCurrentConcept to true;
- leave message empty;
- answer only the specific follow-up;
- provide approximately 2–4 short sentences in each language;
- use the initial explanations and latest adaptation as context;
- respect the learner’s explanation level and learning style;
- use previousFollowUps to avoid unnecessarily repeating an earlier answer;
- gently correct an incorrect assumption when necessary.

# Unrelated question

When unrelated:

- set relatedToCurrentConcept to false;
- provide a concise learner-facing explanation in message;
- return empty strings for both answer fields;
- encourage the learner to start a new learning session.

# Language contract

- The "en" field must contain clear, natural English.
- The "my" field must contain natural Myanmar Unicode Burmese.
- English STEM terminology may remain in Latin characters when clearer.
- Do not translate English word by word.
- English and Burmese must communicate the same technical meaning.
- Do not output Chinese, Japanese, Korean, Thai, Arabic, Devanagari
  or characters from any other unrelated writing system.
- Burmese may contain only Myanmar script, Latin characters for English
  STEM terms, numbers, whitespace and ordinary punctuation.

# Content boundaries

Never generate:

- another complete simple or technical explanation;
- a reflective prompt or hint;
- an understanding check;
- a quiz, score or grade;
- a new learning session;
- a session status or adaptation-round decision.

# Final check

Before returning the result, verify that:

1. The scope classification is correct.
2. The answer directly addresses the follow-up.
3. Each language contains only 2–4 short sentences.
4. English and Burmese have equivalent meaning.
5. Burmese sounds natural and contains no unsupported script.
`;
}

function validateRelatedAnswer(generated: GeneratedFollowUp): void {
  if (!generated.answer.en.trim() || !generated.answer.my.trim()) {
    throw new FollowUpGenerationError("Generated follow-up answer was empty");
  }
}

function isGeneratedFollowUp(value: unknown): value is GeneratedFollowUp {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const output = value as Record<string, unknown>;
  if (
    typeof output.relatedToCurrentConcept !== "boolean" ||
    typeof output.message !== "string" ||
    typeof output.answer !== "object" ||
    output.answer === null ||
    Array.isArray(output.answer)
  ) {
    return false;
  }
  const answer = output.answer as Record<string, unknown>;
  return typeof answer.en === "string" && typeof answer.my === "string";
}
