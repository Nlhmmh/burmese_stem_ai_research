import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { AdaptationCard, AdaptationContent } from "@/components/learn/SessionContent";
import type { Adaptation } from "@/components/learn/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) =>
    key === "concept_clarification" ? "Adapted — Concept Clarification" : key
}));

const languageAdaptation: Adaptation = {
  learnerResponse: "medium",
  supportType: "clarification",
  content: {
    en: "Gradient describes the direction and rate of change.",
    my: "Gradient သည် ပြောင်းလဲမှု၏ ဦးတည်ချက်နှင့် နှုန်းကို ဖော်ပြသည်။"
  },
  presentationOverride: "bilingual",
  round: 1,
  createdAt: "2026-01-15T10:00:00.000Z"
};

describe("language-support adaptation rendering", () => {
  it.each(["english", "burmese"] as const)(
    "shows both languages over an existing %s-only preference",
    (supportLanguage) => {
      const html = renderToStaticMarkup(
        <AdaptationContent
          adaptation={languageAdaptation}
          locale="en"
          supportLanguage={supportLanguage}
        />
      );

      expect(html).toContain('lang="en"');
      expect(html).toContain('lang="my"');
      expect(html).toContain(languageAdaptation.content.en);
      expect(html).toContain(languageAdaptation.content.my);
    }
  );

  it("continues to respect the saved preference when no override is stored", () => {
    const adaptationWithoutOverride: Adaptation = {
      ...languageAdaptation,
      presentationOverride: undefined
    };
    const html = renderToStaticMarkup(
      <AdaptationContent
        adaptation={adaptationWithoutOverride}
        locale="en"
        supportLanguage="english"
      />
    );

    expect(html).toContain('lang="en"');
    expect(html).not.toContain('lang="my"');
  });
});

describe("conceptual-clarification adaptation rendering", () => {
  it("renders the concept-specific label and revised support content", () => {
    const adaptation: Adaptation = {
      learnerResponse: "needs_support",
      supportType: "concept_clarification",
      content: {
        en: "A revised core explanation followed by a short analogy.",
        my: "ပြန်လည် ရှင်းလင်းထားသော အဓိက အဓိပ္ပာယ်နှင့် နှိုင်းယှဉ်ချက်တို။"
      },
      round: 1,
      createdAt: "2026-01-15T10:00:00.000Z"
    };

    const html = renderToStaticMarkup(
      <AdaptationCard adaptation={adaptation} locale="en" supportLanguage="english" />
    );

    expect(html).toContain("Adapted — Concept Clarification");
    expect(html).toContain(adaptation.content.en);
    expect(html).not.toContain(adaptation.content.my);
  });
});
