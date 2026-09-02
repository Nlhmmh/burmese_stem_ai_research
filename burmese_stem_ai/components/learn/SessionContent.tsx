"use client";

import type { Preferences } from "@/data/schemas/profile.schema";
import type { Adaptation, BilingualText } from "./types";
import { useTranslations } from "next-intl";

export function ExplanationCard({
  title,
  icon,
  children
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-2">
        <span aria-hidden="true" className="text-base leading-none">{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function BilingualContent({
  content,
  locale,
  supportLanguage,
  compact = false,
  italic = false
}: {
  content: BilingualText;
  locale: string;
  supportLanguage: Preferences["supportLanguage"];
  compact?: boolean;
  italic?: boolean;
}) {
  const ordered: Array<keyof BilingualText> = locale === "my" ? ["my", "en"] : ["en", "my"];
  const languages = supportLanguage === "english"
    ? (["en"] as const)
    : supportLanguage === "burmese"
      ? (["my"] as const)
      : ordered;

  return (
    <div className="space-y-3">
      {languages.map((language, index) => (
        <p
          key={language}
          lang={language}
          className={`${compact ? "text-sm" : "text-base"} leading-relaxed ${italic ? "italic" : ""} ${
            index === 0
              ? "text-slate-700 dark:text-slate-300"
              : "border-t border-slate-100 pt-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400"
          }`}
        >
          {content[language]}
        </p>
      ))}
    </div>
  );
}

export function AdaptationCard({
  adaptation,
  locale,
  supportLanguage
}: {
  adaptation: Adaptation;
  locale: string;
  supportLanguage: Preferences["supportLanguage"];
}) {
  const t = useTranslations("session.support");
  const high = adaptation.supportType === "key_takeaway";
  const needsSupport = adaptation.supportType === "simpler_explanation";
  const boxStyle = high
    ? "border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20"
    : needsSupport
      ? "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/15"
      : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/15";
  const labelStyle = high
    ? "text-teal-700 dark:text-teal-400"
    : needsSupport
      ? "text-rose-700 dark:text-rose-400"
      : "text-amber-700 dark:text-amber-400";

  return (
    <div className={`rounded-xl border p-4 ${boxStyle}`}>
      <p className={`mb-2 text-xs font-bold uppercase tracking-wide ${labelStyle}`}>
        {t(adaptation.supportType)}
      </p>
      <BilingualContent
        content={adaptation.content}
        locale={locale}
        supportLanguage={supportLanguage}
        compact
      />
    </div>
  );
}
