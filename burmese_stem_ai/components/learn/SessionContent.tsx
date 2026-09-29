"use client";

import type { Preferences } from "@/data/schemas/profile.schema";
import { MAX_CONCEPT_CLARIFICATION_LENGTH } from "@/lib/constants";
import type {
  DifficultyType,
  LearnerResponseEvent,
  OverallSupportNeed
} from "@/lib/session-domain";
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
      {adaptation.conceptCorrection && (
        <p className="mb-3 text-xs text-slate-600 dark:text-slate-300">
          {t("correctionTrace", {
            previous: `${adaptation.conceptCorrection.previous.name} (${adaptation.conceptCorrection.previous.domain})`,
            current: `${adaptation.conceptCorrection.corrected.name} (${adaptation.conceptCorrection.corrected.domain})`
          })}
        </p>
      )}
      <AdaptationContent
        adaptation={adaptation}
        locale={locale}
        supportLanguage={supportLanguage}
      />
    </div>
  );
}

export function AdaptationContent({
  adaptation,
  locale,
  supportLanguage
}: {
  adaptation: Adaptation;
  locale: string;
  supportLanguage: Preferences["supportLanguage"];
}) {
  return (
    <BilingualContent
      content={adaptation.content}
      locale={locale}
      supportLanguage={adaptation.presentationOverride ?? supportLanguage}
      compact
    />
  );
}

export function SessionStateHistory({
  adaptations,
  responseEvents,
  locale,
  supportLanguage,
  showEmpty = false
}: {
  adaptations: Adaptation[];
  responseEvents: LearnerResponseEvent<string>[];
  locale: string;
  supportLanguage: Preferences["supportLanguage"];
  showEmpty?: boolean;
}) {
  const t = useTranslations("session");
  const hasHistory = adaptations.length > 0 || responseEvents.length > 0;
  if (!hasHistory && !showEmpty) return null;

  return (
    <div
      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40"
      aria-label={t("review.title")}
    >
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
        {t("review.title")}
      </h3>

      {!hasHistory && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t("review.noRecordedSupport")}
        </p>
      )}

      {responseEvents.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t("review.responses")}
          </h4>
          {responseEvents.map((event, index) => (
            <article
              key={`${event.createdAt}-${index}`}
              className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {t("review.responseNumber", { number: index + 1 })}
              </p>
              <dl className="mt-2 grid gap-1.5 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                <HistoryDetail
                  label={t("review.selfReportedSupport")}
                  value={t(`review.needs.${event.overallSupportNeed}`)}
                />
                <HistoryDetail
                  label={t("review.requestedHelp")}
                  value={
                    event.difficultyType
                      ? t(`understanding.stage6b.choices.${event.difficultyType}`)
                      : t("review.noSpecificHelp")
                  }
                />
                <HistoryDetail
                  label={t("review.route")}
                  value={t(`understanding.routes.${event.route}`)}
                />
                <HistoryDetail
                  label={t("review.round")}
                  value={`${event.roundBefore} → ${event.roundAfter}`}
                />
              </dl>
              {event.conceptReinterpretation && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {t("review.conceptTrace", {
                    previous: event.conceptReinterpretation.previous.name,
                    current: event.conceptReinterpretation.current.name,
                    outcome: t(
                      `review.correctionOutcomes.${event.conceptReinterpretation.outcome}`
                    )
                  })}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {responseEvents.length === 0 && adaptations.length > 0 && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {t("review.legacyHistory")}
        </p>
      )}

      {adaptations.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t("review.adaptations")}
          </h4>
          {adaptations.map((adaptation, index) => (
            <div key={`${adaptation.createdAt}-${index}`}>
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                {t("review.adaptationRound", { round: adaptation.round })}
              </p>
              <AdaptationCard
                adaptation={adaptation}
                locale={locale}
                supportLanguage={supportLanguage}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-400 dark:text-slate-500">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

const difficultyOptions: Array<{
  value: DifficultyType;
  icon: string;
}> = [
  { value: "simpler_explanation", icon: "◒" },
  { value: "another_example", icon: "▣" },
  { value: "language_terms", icon: "Aa" },
  { value: "concept_unclear", icon: "?" },
  { value: "concept_mismatch", icon: "↺" }
];

export function Stage6BPanel({
  overallSupportNeed,
  selectedDifficulty,
  conceptClarification,
  isSubmitting,
  onSelect,
  onClarificationChange,
  onSubmit,
  onSkip,
  onCancel
}: {
  overallSupportNeed: Exclude<OverallSupportNeed, "high">;
  selectedDifficulty: DifficultyType | null;
  conceptClarification: string;
  isSubmitting: boolean;
  onSelect: (difficulty: DifficultyType) => void;
  onClarificationChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations("session.understanding.stage6b");
  const clarificationRequired = selectedDifficulty === "concept_mismatch";
  const canSubmit =
    selectedDifficulty !== null &&
    (!clarificationRequired || conceptClarification.trim().length > 0);

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-800 dark:bg-blue-950/20">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
          {t("selectedNeed", { need: t(`needs.${overallSupportNeed}`) })}
        </p>
        <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
          {t("question")}
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {t("optional")}
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label={t("question")}
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        {difficultyOptions.map((option) => (
          <label
            key={option.value}
            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition focus-within:ring-2 focus-within:ring-blue-500 ${
              selectedDifficulty === option.value
                ? "border-blue-500 bg-white text-blue-800 shadow-sm dark:bg-slate-900 dark:text-blue-200"
                : "border-slate-200 bg-white/70 text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
            }`}
          >
            <input
              type="radio"
              name="difficultyType"
              value={option.value}
              checked={selectedDifficulty === option.value}
              onChange={() => onSelect(option.value)}
              disabled={isSubmitting}
              className="h-4 w-4 shrink-0 accent-blue-600"
            />
            <span aria-hidden="true" className="w-5 text-center font-bold text-blue-600">
              {option.icon}
            </span>
            <span className="font-medium">{t(`choices.${option.value}`)}</span>
          </label>
        ))}
      </div>

      {clarificationRequired && (
        <div className="mt-4">
          <label
            htmlFor="concept-clarification"
            className="text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            {t("clarificationLabel")}
          </label>
          <textarea
            id="concept-clarification"
            value={conceptClarification}
            onChange={(event) => onClarificationChange(event.target.value)}
            maxLength={MAX_CONCEPT_CLARIFICATION_LENGTH}
            rows={2}
            disabled={isSubmitting}
            placeholder={t("clarificationPlaceholder")}
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
            {t("characterCount", {
              count: conceptClarification.length,
              maximum: MAX_CONCEPT_CLARIFICATION_LENGTH
            })}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="min-h-11 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? t("submitting") : t("continue")}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {t("skip")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="min-h-11 rounded-lg px-4 text-sm font-semibold text-slate-500 transition hover:text-slate-800 disabled:opacity-50 dark:text-slate-400 dark:hover:text-white"
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}
