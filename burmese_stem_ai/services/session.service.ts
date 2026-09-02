import { createSession, type NewSession } from "@/data/dao/session.dao";
import type { Preferences } from "@/data/schemas/profile.schema";
import { MAX_QUESTION_LENGTH, UI_LANGUAGES } from "@/lib/constants";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_TIMEOUT_MS = 20_000;

const bilingualTextSchema = {
  type: "object",
  properties: {
    en: { type: "string" },
    my: { type: "string" }
  },
  required: UI_LANGUAGES,
  additionalProperties: false
} as const;

const generatedSessionSchema = {
  type: "object",
  properties: {
    outcome: {
      type: "string",
      enum: ["ready", "ambiguous", "out_of_scope"]
    },
    message: { type: "string" },
    concept: {
      type: "object",
      properties: {
        name: { type: "string" },
        domain: { type: "string" }
      },
      required: ["name", "domain"],
      additionalProperties: false
    },
    explanations: {
      type: "object",
      properties: {
        simple: bilingualTextSchema,
        realWorldExample: bilingualTextSchema,
        technical: bilingualTextSchema
      },
      required: ["simple", "realWorldExample", "technical"],
      additionalProperties: false
    },
    reflectivePrompt: bilingualTextSchema,
    hint: bilingualTextSchema
  },
  required: ["outcome", "message", "concept", "explanations", "reflectivePrompt", "hint"],
  additionalProperties: false
} as const;

type BilingualText = {
  en: string;
  my: string;
};

type GeneratedSession = {
  outcome: "ready" | "ambiguous" | "out_of_scope";
  message: string;
  concept: {
    name: string;
    domain: string;
  };
  explanations: {
    simple: BilingualText;
    realWorldExample: BilingualText;
    technical: BilingualText;
  };
  reflectivePrompt: BilingualText;
  hint: BilingualText;
};

type OpenAIResponse = {
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

export class SessionRequestValidationError extends Error {}

export class SessionScopeError extends Error {
  constructor(
    public readonly code: "AMBIGUOUS_STEM_CONTEXT" | "OUTSIDE_STEM_SCOPE",
    message: string
  ) {
    super(message);
  }
}

export class SessionGenerationError extends Error {}

export function validateCreateSessionRequest(input: unknown): string {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new SessionRequestValidationError("Request body must be a JSON object");
  }

  const question = (input as Record<string, unknown>).question;
  if (typeof question !== "string" || question.trim().length === 0) {
    throw new SessionRequestValidationError("Question must be a non-empty string");
  }

  const trimmedQuestion = question.trim();
  if (trimmedQuestion.length > MAX_QUESTION_LENGTH) {
    throw new SessionRequestValidationError(
      `Question must be ${MAX_QUESTION_LENGTH} characters or fewer`
    );
  }

  return trimmedQuestion;
}

export async function createLearningSession(
  learnerId: string,
  question: string,
  preferences: Preferences
) {
  const generated = await generateSession(question, preferences);

  if (generated.outcome === "ambiguous") {
    throw new SessionScopeError(
      "AMBIGUOUS_STEM_CONTEXT",
      generated.message.trim() || "Please provide more context about the STEM subject."
    );
  }

  if (generated.outcome === "out_of_scope") {
    throw new SessionScopeError(
      "OUTSIDE_STEM_SCOPE",
      generated.message.trim() || "Please ask a question about a STEM concept."
    );
  }

  validateGeneratedSession(generated);

  const session: NewSession = {
    sessionId: crypto.randomUUID(),
    learnerId,
    originalQuestion: question,
    concept: generated.concept,
    explanations: generated.explanations,
    reflectivePrompt: generated.reflectivePrompt,
    hint: generated.hint,
    preferencesSnapshot: preferences
  };

  return createSession(session);
}

async function generateSession(
  question: string,
  preferences: Preferences
): Promise<GeneratedSession> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-key-here") {
    throw new SessionGenerationError("OpenAI API key is not configured");
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
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        store: false,
        instructions: buildInstructions(preferences),
        input: question,
        text: {
          format: {
            type: "json_schema",
            name: "initial_learning_session",
            strict: true,
            schema: generatedSessionSchema
          }
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new SessionGenerationError(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as OpenAIResponse;
    const outputText = data.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;

    if (!outputText) {
      throw new SessionGenerationError("OpenAI returned no structured output");
    }

    try {
      const generated: unknown = JSON.parse(outputText);
      validateGeneratedOutput(generated);
      return generated;
    } catch {
      throw new SessionGenerationError("OpenAI returned invalid JSON");
    }
  } catch (error) {
    console.log("Error generating learning session:", error);
    if (error instanceof SessionGenerationError) throw error;
    throw new SessionGenerationError("Unable to generate the learning session");
  } finally {
    clearTimeout(timeout);
  }
}

// function buildInstructions(preferences: Preferences): string {
//   return `You support Burmese-speaking learners with STEM concepts only.
// Classify the learner's question as ready, ambiguous, or out_of_scope. For ambiguous or out-of-scope questions, put a concise learner-facing explanation in message and return empty strings in all content fields. For ready questions, leave message empty and:
// - identify one main STEM concept and its technical domain;
// - explain the concept rather than merely translating it;
// - provide useful, accurate English and natural Burmese text in every bilingual field;
// - retain useful English STEM terminology in the Burmese explanations;
// - provide exactly one reflective prompt and one short optional hint;
// - do not create a quiz, score the learner, or control session state.
// Learner preferences: support language=${preferences.supportLanguage}, explanation level=${preferences.explanationLevel}, learning style=${preferences.learningStyle}. Always fill both language fields because the session is stored bilingually.`;
// }

function buildInstructions(preferences: Preferences): string {
  return `
# Role

You are a bilingual STEM educator for Burmese-speaking university students.

# Goal

Classify the question as ready, ambiguous, or out_of_scope.
For a ready question, produce an accurate English and Burmese STEM
learning session.

# Strict language contract

Each language field has a strict purpose:

- "en" fields must contain English only.
- "my" fields must contain natural Burmese written in Myanmar Unicode.
- English STEM terminology may appear inside "my" fields using Latin
  characters when it is clearer than translating the term.

Allowed writing systems:

- Myanmar script
- Basic Latin script for English STEM terms
- Numbers, whitespace and ordinary punctuation

Do not output characters, words or phrases from any other writing
system or language. This includes Chinese Han characters, Japanese,
Korean, Thai, Arabic, Devanagari and other non-Myanmar/non-Latin
scripts.

Write the Burmese explanation directly from the underlying concept.
Do not produce the Burmese text by translating the English sentences
word by word.

The Burmese text must:

- sound naturally written by an educated native Burmese speaker;
- preserve the complete technical meaning;
- use clear and contemporary Burmese;
- use short and readable sentences;
- retain commonly used English STEM terms when appropriate;
- avoid invented, overly literary or unnatural Burmese terminology.

# Content requirements

For a ready question:

- identify one primary STEM concept and its domain;
- provide a beginner-friendly simple explanation;
- provide one concrete real-world example;
- provide a more precise technical explanation;
- provide exactly one reflective prompt;
- provide one short optional hint;
- leave "message" empty.

For ambiguous or out-of-scope questions:

- provide a concise explanation in "message";
- return empty strings in all learning-content fields.

Do not create quizzes, grades, scores or session-state decisions.

# Final internal check

Before returning the JSON:

1. Check that every "en" field is English.
2. Check that every "my" field is natural Burmese.
3. Check that Burmese and English communicate the same meaning.
4. Check every character in every "my" field.
5. If any writing system other than Myanmar or Latin is present,
   rewrite the affected field before returning the response.

Learner preferences:
- Support language: ${preferences.supportLanguage}
- Explanation level: ${preferences.explanationLevel}
- Learning style: ${preferences.learningStyle}

Always populate both language fields because sessions are stored
bilingually.
`;
}

function validateGeneratedSession(session: GeneratedSession): void {
  const strings = [
    session.concept?.name,
    session.concept?.domain,
    session.explanations?.simple?.en,
    session.explanations?.simple?.my,
    session.explanations?.realWorldExample?.en,
    session.explanations?.realWorldExample?.my,
    session.explanations?.technical?.en,
    session.explanations?.technical?.my,
    session.reflectivePrompt?.en,
    session.reflectivePrompt?.my,
    session.hint?.en,
    session.hint?.my
  ];

  if (strings.some((value) => typeof value !== "string" || value.trim().length === 0)) {
    throw new SessionGenerationError("Generated session did not match the required structure");
  }
}

function validateGeneratedOutput(value: unknown): asserts value is GeneratedSession {
  if (!isRecord(value)) {
    throw new SessionGenerationError("Generated session must be an object");
  }

  if (
    !["ready", "ambiguous", "out_of_scope"].includes(String(value.outcome)) ||
    typeof value.message !== "string" ||
    !isRecord(value.concept) ||
    typeof value.concept.name !== "string" ||
    typeof value.concept.domain !== "string" ||
    !isRecord(value.explanations) ||
    !isBilingualText(value.explanations.simple) ||
    !isBilingualText(value.explanations.realWorldExample) ||
    !isBilingualText(value.explanations.technical) ||
    !isBilingualText(value.reflectivePrompt) ||
    !isBilingualText(value.hint)
  ) {
    throw new SessionGenerationError("Generated session did not match the required structure");
  }
}

function isBilingualText(value: unknown): value is BilingualText {
  return isRecord(value) && typeof value.en === "string" && typeof value.my === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
