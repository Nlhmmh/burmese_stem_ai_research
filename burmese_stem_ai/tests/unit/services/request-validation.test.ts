import { describe, expect, it } from "vitest";

import {
  ResponseValidationError,
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
import { MAX_FOLLOW_UP_QUESTION_LENGTH, MAX_QUESTION_LENGTH } from "@/lib/constants";
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
