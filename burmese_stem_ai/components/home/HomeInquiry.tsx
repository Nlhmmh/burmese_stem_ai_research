"use client";

import { type Preferences } from "@/data/schemas/profile.schema";
import { DEFAULT_PREFERENCES, EXAMPLE_PROMPTS, MAX_QUESTION_LENGTH } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PreferencesDialog from "./PreferencesDialog";

type ApiError = {
  error?: string | { message?: string };
};

export default function HomeInquiry() {
  const t = useTranslations("home");
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  async function submitQuestion(selectedQuestion = question) {
    const trimmedQuestion = selectedQuestion.trim();
    if (!trimmedQuestion || isSubmitting) return;

    setQuestion(trimmedQuestion);
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion })
      });
      const data = (await response.json()) as ApiError & {
        session?: { sessionId?: string };
      };
      if (!response.ok || !data.session?.sessionId) {
        throw new Error(getErrorMessage(data, t("errors.create")));
      }
      router.push(`/learn/${data.session.sessionId}`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : t("errors.create"));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openPreferences() {
    setShowPreferences(true);
    setIsLoadingPreferences(true);
    setError("");
    try {
      const response = await fetch("/api/preferences");
      const data = (await response.json()) as ApiError & { preferences?: Preferences };
      if (!response.ok || !data.preferences) {
        throw new Error(getErrorMessage(data, t("errors.loadPreferences")));
      }
      setPreferences(data.preferences);
    } catch (preferenceError) {
      setError(
        preferenceError instanceof Error ? preferenceError.message : t("errors.loadPreferences")
      );
      setShowPreferences(false);
    } finally {
      setIsLoadingPreferences(false);
    }
  }

  async function savePreferences() {
    setIsSavingPreferences(true);
    setError("");
    try {
      const response = await fetch("/api/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supportLanguage: preferences.supportLanguage,
          explanationLevel: preferences.explanationLevel,
          learningStyle: preferences.learningStyle
        })
      });
      const data = (await response.json()) as ApiError;
      if (!response.ok) {
        throw new Error(getErrorMessage(data, t("errors.savePreferences")));
      }
      setShowPreferences(false);
    } catch (preferenceError) {
      setError(
        preferenceError instanceof Error ? preferenceError.message : t("errors.savePreferences")
      );
    } finally {
      setIsSavingPreferences(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-1 items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-2xl">
        <div className="mx-auto mb-9 max-w-xl text-center sm:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
            {t("eyebrow")}
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <section aria-labelledby="inquiry-label">
          <h2 id="inquiry-label" className="sr-only">
            {t("askLabel")}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_-22px_rgba(15,23,42,0.35)] transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900">
            <textarea
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
                if (error) setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void submitQuestion();
                }
              }}
              placeholder={t("placeholder")}
              maxLength={MAX_QUESTION_LENGTH}
              rows={3}
              disabled={isSubmitting}
              className="w-full resize-none bg-transparent px-5 pb-2 pt-5 text-base leading-relaxed text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-wait dark:text-white dark:placeholder:text-slate-500"
            />
            <div className="flex flex-col gap-3 px-4 pb-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => void openPreferences()}
                disabled={isLoadingPreferences || isSubmitting}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-wait disabled:opacity-60 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50 sm:justify-start"
              >
                <span aria-hidden="true">⚙</span>
                {isLoadingPreferences ? t("loading") : t("preferences.button")}
              </button>
              <button
                type="button"
                onClick={() => void submitQuestion()}
                disabled={!question.trim() || isSubmitting}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? t("submitting") : t("ask")}
                {!isSubmitting && <span aria-hidden="true">→</span>}
              </button>
            </div>
          </div>

          <div
            aria-live="polite"
            className="min-h-7 pt-2 text-center text-sm text-rose-600 dark:text-rose-400"
          >
            {error}
          </div>

          <p className="mb-3 mt-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            {t("examples")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_PROMPTS.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setQuestion(example)}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-700 dark:hover:text-blue-300"
              >
                {example}
              </button>
            ))}
          </div>
        </section>
      </div>

      {showPreferences && (
        <PreferencesDialog
          preferences={preferences}
          isSaving={isSavingPreferences}
          onChange={setPreferences}
          onClose={() => setShowPreferences(false)}
          onSave={() => void savePreferences()}
        />
      )}
    </main>
  );
}

function getErrorMessage(data: ApiError, fallback: string): string {
  if (typeof data.error === "string") return data.error;
  return data.error?.message || fallback;
}
