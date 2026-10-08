import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { AdaptationCard, AdaptationContent, BilingualContent } from "@/components/learn/SessionContent";
import type { Adaptation } from "@/components/learn/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => {
    if (key === "concept_clarification") return "Adapted — Concept Clarification";
    if (key === "concept_correction") return "Adapted — Concept Correction";
    if (key === "correctionTrace") {
      return `Corrected from ${values?.previous} to ${values?.current}`;
    }
    return key;
  }
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

describe("language order and legacy support presentation", () => {
  it.each(["en", "my"])("orders bilingual paragraphs for locale %s", (locale) => {
    const html = renderToStaticMarkup(<BilingualContent content={languageAdaptation.content} locale={locale} supportLanguage="bilingual" italic />);
    expect(html.indexOf('lang="my"') < html.indexOf('lang="en"')).toBe(locale === "my");
    expect(html).toContain("text-base");
    expect(html).toContain("italic");
  });
  it("shows only Burmese for a Burmese-only preference without an override", () => {
    const html = renderToStaticMarkup(<BilingualContent content={languageAdaptation.content} locale="en" supportLanguage="burmese" />);
    expect(html).toContain('lang="my"');
    expect(html).not.toContain('lang="en"');
  });
  it.each([["key_takeaway", "border-teal-200", "text-teal-700"], ["simpler_explanation", "border-rose-200", "text-rose-700"], ["another_example", "border-amber-200", "text-amber-700"]] as const)("renders stored %s support using its own style", (supportType, box, label) => {
    // key_takeaway is display compatibility only, not a requirement for new High responses.
    const html = renderToStaticMarkup(<AdaptationCard adaptation={{ ...languageAdaptation, supportType }} locale="en" supportLanguage="bilingual" />);
    expect(html).toContain(supportType);
    expect(html).toContain(box);
    expect(html).toContain(label);
  });
});

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

  it("renders the previous and corrected interpretation with downstream support", () => {
    const adaptation: Adaptation = {
      learnerResponse: "medium",
      supportType: "concept_correction",
      content: {
        en: "A spreadsheet cell stores data at a row-column intersection.",
        my: "Spreadsheet cell သည် row နှင့် column ဆုံရာတွင် data ကို သိမ်းသည်။"
      },
      conceptCorrection: {
        previous: { name: "Cell", domain: "Biology" },
        corrected: { name: "Spreadsheet cell", domain: "Computing" }
      },
      round: 1,
      createdAt: "2026-01-15T10:00:00.000Z"
    };

    const html = renderToStaticMarkup(
      <AdaptationCard adaptation={adaptation} locale="en" supportLanguage="english" />
    );

    expect(html).toContain("Adapted — Concept Correction");
    expect(html).toContain("Corrected from Cell (Biology) to Spreadsheet cell (Computing)");
    expect(html).toContain(adaptation.content.en);
  });
});
