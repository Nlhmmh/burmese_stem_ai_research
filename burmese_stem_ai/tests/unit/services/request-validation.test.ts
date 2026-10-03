import { describe, expect, it } from "vitest";

import {
  ResponseValidationError,
  validateLearnerResponseRequest,
  validateUnderstandingResponse
} from "@/services/adaptation.service";
import {
  FollowUpValidationError,
  validateFollowUpRequest
} from "@/services/followup.service";
import {
  PreferenceValidationError,
  validatePreferences
} from "@/services/profile.service";
import {
  SessionRequestValidationError,
  validateCreateSessionRequest
} from "@/services/session.service";
import {
  MAX_CONCEPT_CLARIFICATION_LENGTH,
  MAX_FOLLOW_UP_QUESTION_LENGTH,
  MAX_QUESTION_LENGTH
} from "@/lib/constants";
import { OVERALL_SUPPORT_NEEDS } from "@/lib/session-domain";

describe("request validation guard rails", () => {
  it("trims a valid learning-session question", () => {
    expect(validateCreateSessionRequest({ question: "  What is entropy?  " })).toBe(
      "What is entropy?"
    );
  });

  it("rejects blank and oversized learning-session questions", () => {
    expect(() => validateCreateSessionRequest({ question: "   " })).toThrow(
      SessionRequestValidationError
    );
    expect(() =>
      validateCreateSessionRequest({ question: "x".repeat(MAX_QUESTION_LENGTH + 1) })
    ).toThrow(SessionRequestValidationError);
  });

  it.each(OVERALL_SUPPORT_NEEDS)(
    "accepts the supported understanding value %s",
    (understanding) => {
      expect(validateUnderstandingResponse({ understanding })).toBe(understanding);
    }
  );

  it("rejects an unsupported understanding value", () => {
    expect(() => validateUnderstandingResponse({ understanding: "low" })).toThrow(
      ResponseValidationError
    );
  });

  it("accepts legacy and canonical support-need request shapes", () => {
    expect(
      validateLearnerResponseRequest({
        understanding: "medium",
        difficultyType: "another_example"
      })
    ).toEqual({
      overallSupportNeed: "medium",
      difficultyType: "another_example",
      conceptClarification: null
    });
    expect(validateLearnerResponseRequest({ overallSupportNeed: "needs_support" })).toEqual({
      overallSupportNeed: "needs_support",
      difficultyType: null,
      conceptClarification: null
    });
  });

  it("trims a bounded concept-mismatch clarification", () => {
    expect(
      validateLearnerResponseRequest({
        overallSupportNeed: "medium",
        difficultyType: "concept_mismatch",
        conceptClarification: "  I meant a spreadsheet cell.  "
      })
    ).toEqual({
      overallSupportNeed: "medium",
      difficultyType: "concept_mismatch",
      conceptClarification: "I meant a spreadsheet cell."
    });
  });

  it("requires clarification only for concept mismatch and enforces its bound", () => {
    expect(() =>
      validateLearnerResponseRequest({
        overallSupportNeed: "medium",
        difficultyType: "concept_mismatch"
      })
    ).toThrow(ResponseValidationError);
    expect(() =>
      validateLearnerResponseRequest({
        overallSupportNeed: "medium",
        difficultyType: "concept_mismatch",
        conceptClarification: "   "
      })
    ).toThrow(ResponseValidationError);
    expect(() =>
      validateLearnerResponseRequest({
        overallSupportNeed: "medium",
        difficultyType: "concept_mismatch",
        conceptClarification: "x".repeat(MAX_CONCEPT_CLARIFICATION_LENGTH + 1)
      })
    ).toThrow(ResponseValidationError);
    expect(() =>
      validateLearnerResponseRequest({
        overallSupportNeed: "medium",
        difficultyType: "another_example",
        conceptClarification: "This should not be silently ignored"
      })
    ).toThrow(ResponseValidationError);
  });

  it("rejects conflicting, unknown, and high-with-difficulty response combinations", () => {
    expect(() =>
      validateLearnerResponseRequest({
        understanding: "medium",
        overallSupportNeed: "needs_support"
      })
    ).toThrow(ResponseValidationError);
    expect(() =>
      validateLearnerResponseRequest({
        understanding: "medium",
        difficultyType: "free_text_help"
      })
    ).toThrow(ResponseValidationError);
    expect(() =>
      validateLearnerResponseRequest({
        understanding: "high",
        difficultyType: "another_example"
      })
    ).toThrow(ResponseValidationError);
  });

  it("trims a valid follow-up and rejects an oversized one", () => {
    expect(validateFollowUpRequest({ question: "  Why does that happen?  " })).toBe(
      "Why does that happen?"
    );
    expect(() =>
      validateFollowUpRequest({ question: "x".repeat(MAX_FOLLOW_UP_QUESTION_LENGTH + 1) })
    ).toThrow(FollowUpValidationError);
  });

  it("accepts a supported partial preference update", () => {
    expect(validatePreferences({ theme: "dark", learningStyle: "concise" })).toEqual({
      theme: "dark",
      learningStyle: "concise"
    });
  });

  it("rejects unknown preference keys and invalid values", () => {
    expect(() => validatePreferences({ fontSize: "large" })).toThrow(PreferenceValidationError);
    expect(() => validatePreferences({ theme: "blue" })).toThrow(PreferenceValidationError);
  });
});
