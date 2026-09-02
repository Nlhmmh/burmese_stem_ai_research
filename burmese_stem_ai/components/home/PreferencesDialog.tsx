"use client";

import type { Preferences } from "@/data/schemas/profile.schema";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type PreferencesDialogProps = {
  preferences: Preferences;
  isSaving: boolean;
  onChange: (preferences: Preferences) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function PreferencesDialog({
  preferences,
  isSaving,
  onChange,
  onClose,
  onSave
}: PreferencesDialogProps) {
  const t = useTranslations("home.preferences");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-title"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 id="preferences-title" className="font-bold text-slate-900 dark:text-white">
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-2xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            ×
          </button>
        </header>
        <div className="space-y-5 px-6 py-5">
          <PreferenceGroup
            label={t("language.label")}
            value={preferences.supportLanguage}
            options={[
              ["bilingual", t("language.bilingual")],
              ["burmese", t("language.burmese")],
              ["english", t("language.english")]
            ]}
            onChange={(supportLanguage) => onChange({ ...preferences, supportLanguage })}
          />
          <PreferenceGroup
            label={t("level.label")}
            value={preferences.explanationLevel}
            options={[
              ["beginner", t("level.beginner")],
              ["intermediate", t("level.intermediate")],
              ["advanced", t("level.advanced")]
            ]}
            onChange={(explanationLevel) => onChange({ ...preferences, explanationLevel })}
          />
          <PreferenceGroup
            label={t("style.label")}
            value={preferences.learningStyle}
            options={[
              ["guided", t("style.guided")],
              ["concise", t("style.concise")],
              ["more_examples", t("style.examples")]
            ]}
            onChange={(learningStyle) => onChange({ ...preferences, learningStyle })}
          />
        </div>
        <div className="p-3" />
        <div className="px-6 pb-5">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="min-h-11 w-full rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
          >
            {isSaving ? t("saving") : t("save")}
          </button>
        </div>
      </section>
    </div>
  );
}

type PreferenceGroupProps<T extends string> = {
  label: string;
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (value: T) => void;
};

function PreferenceGroup<T extends string>({
  label,
  value,
  options,
  onChange
}: PreferenceGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([optionValue, optionLabel]) => {
          const selected = optionValue === value;
          return (
            <button
              key={optionValue}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(optionValue)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                selected
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-blue-700"
              }`}
            >
              {selected && <span className="mr-1 text-xs">✓</span>}
              {optionLabel}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
