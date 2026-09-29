import { createSession, type NewSession } from "@/data/dao/session.dao";
import type { Preferences } from "@/data/schemas/profile.schema";
import { MAX_QUESTION_LENGTH, UI_LANGUAGES } from "@/lib/constants";
import { LlmProviderError, requestStructuredOutput } from "@/services/llm-provider";

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
      description: "Stages 1 and 2: identified STEM term and interpreted technical context",
      type: "object",
      properties: {
        name: { type: "string", description: "Stage 1 primary STEM term" },
        domain: { type: "string", description: "Stage 2 technical domain or context" }
      },
      required: ["name", "domain"],
      additionalProperties: false
    },
    explanations: {
      type: "object",
      properties: {
        simple: {
          ...bilingualTextSchema,
          description: "Stage 4 accessible explanation of the core meaning"
        },
        realWorldExample: {
          ...bilingualTextSchema,
          description: "Stage 5 concrete scaffold linked to the core meaning"
        },
        technical: {
          ...bilingualTextSchema,
          description: "Stage 4 precise explanation of the same core meaning"
        }
      },
      required: ["simple", "realWorldExample", "technical"],
      additionalProperties: false
    },
    reflectivePrompt: {
      ...bilingualTextSchema,
      description: "Stage 5 single reflective scaffold"
    },
    hint: {
      ...bilingualTextSchema,
      description: "Stage 5 single concise optional hint"
    }
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
  try {
    const generated = await requestStructuredOutput({
      instructions: buildInstructions(preferences),
      input: {
        learnerQuestion: question,
        preferences: {
          supportLanguage: preferences.supportLanguage,
          explanationLevel: preferences.explanationLevel,
          learningStyle: preferences.learningStyle
        }
      },
      schemaName: "initial_learning_session",
      schema: generatedSessionSchema
    });
    validateGeneratedOutput(generated);
    return generated;
  } catch (error) {
    if (error instanceof SessionGenerationError) throw error;
    if (error instanceof LlmProviderError) {
      if (error.code === "NOT_CONFIGURED") {
        throw new SessionGenerationError("OpenAI API key is not configured");
      }
      if (error.code === "MISSING_OUTPUT") {
        throw new SessionGenerationError("OpenAI returned no structured output");
      }
      if (error.code === "INVALID_JSON") {
        throw new SessionGenerationError("OpenAI returned invalid JSON");
      }
    }
    throw new SessionGenerationError("Unable to generate the learning session");
  }
}

function buildInstructions(preferences: Preferences): string {
  return `
# Role

You are a bilingual STEM educator for Burmese-speaking university students.

# Goal

Use one generation call to classify the supplied learnerQuestion as ready,
ambiguous, or out_of_scope. For ready input, follow Stages 1–5 in order and
return the complete bounded learning-session structure.

# Stages 1–5 contract

## Stage 1 — Identify STEM Terminology

- Identify exactly one primary STEM term or concept in concept.name.
- Do not return a list of candidate terms.

## Stage 2 — Interpret Technical Context

- Put the specific technical domain or context in concept.domain.
- If the term has multiple plausible STEM meanings and the supplied question
  does not resolve them, return outcome="ambiguous" instead of guessing.
- If the question is not about STEM, return outcome="out_of_scope".

## Stage 3 — Select Language Support

- Apply the supplied supportLanguage, explanationLevel and learningStyle only
  as presentation constraints.
- Always populate both stored language fields; supportLanguage does not permit
  an empty language field and does not change the learner profile.
- Retain established English STEM terminology when it is clearer or commonly
  used, while explaining its meaning naturally in Burmese.

## Stage 4 — Explain the Core STEM Meaning

- explanations.simple and explanations.technical must explain the same core
  concept at different depths.
- Explain meaning rather than merely translating the term.
- Keep Stage 4 concept meaning distinct from Stage 5 scaffold presentation.

## Stage 5 — Provide Bounded Scaffolding

- explanations.realWorldExample must contain one concrete example connected
  explicitly to the Stage 4 meaning.
- reflectivePrompt must contain exactly one reflective prompt.
- hint must contain exactly one concise optional hint.
- Do not add a quiz, multi-turn dialogue, grade, score or extra scaffold fields.

# Outcome contract

For outcome="ready", leave message empty and populate every Stage 1–5 field.
For outcome="ambiguous" or outcome="out_of_scope", provide one concise
learner-facing message and return empty strings in concept and every learning
content field. Do not produce partial learning content for these outcomes.

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

# Application-control boundary

Do not choose or output learner identity, persistence operations, lifecycle
status, route permission, adaptation round, follow-up allowance or completion.
Those decisions belong to the application.

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

Always include both language fields because the structured contract is
bilingual; populate them for ready outcomes and leave them empty for the two
controlled non-ready outcomes.
`;
}

function validateGeneratedOutput(value: unknown): asserts value is GeneratedSession {
  if (!isExactRecord(value, [
    "outcome",
    "message",
    "concept",
    "explanations",
    "reflectivePrompt",
    "hint"
  ])) {
    throw new SessionGenerationError("Generated session must be an object");
  }

  if (
    !["ready", "ambiguous", "out_of_scope"].includes(String(value.outcome)) ||
    typeof value.message !== "string" ||
    !isExactRecord(value.concept, ["name", "domain"]) ||
    typeof value.concept.name !== "string" ||
    typeof value.concept.domain !== "string" ||
    !isExactRecord(value.explanations, ["simple", "realWorldExample", "technical"]) ||
    !isBilingualText(value.explanations.simple) ||
    !isBilingualText(value.explanations.realWorldExample) ||
    !isBilingualText(value.explanations.technical) ||
    !isBilingualText(value.reflectivePrompt) ||
    !isBilingualText(value.hint)
  ) {
    throw new SessionGenerationError("Generated session did not match the required structure");
  }

  const learningFields = [
    value.concept.name,
    value.concept.domain,
    value.explanations.simple.en,
    value.explanations.simple.my,
    value.explanations.realWorldExample.en,
    value.explanations.realWorldExample.my,
    value.explanations.technical.en,
    value.explanations.technical.my,
    value.reflectivePrompt.en,
    value.reflectivePrompt.my,
    value.hint.en,
    value.hint.my
  ];
  const isReady = value.outcome === "ready";
  const hasValidOutcomeContent = isReady
    ? value.message.trim().length === 0 &&
      learningFields.every((field) => field.trim().length > 0)
    : value.message.trim().length > 0 &&
      learningFields.every((field) => field.trim().length === 0);

  if (!hasValidOutcomeContent) {
    throw new SessionGenerationError(
      "Generated session content did not match the declared outcome"
    );
  }
}

function isBilingualText(value: unknown): value is BilingualText {
  return (
    isExactRecord(value, ["en", "my"]) &&
    typeof value.en === "string" &&
    typeof value.my === "string"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isExactRecord(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => key in value)
  );
}
