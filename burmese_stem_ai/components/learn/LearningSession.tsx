"use client";

import { MAX_ADAPTATION_ROUNDS, MAX_FOLLOW_UPS, type SessionStatus } from "@/lib/constants";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import FollowUpSection from "./FollowUpSection";
import { AdaptationCard, BilingualContent, ExplanationCard } from "./SessionContent";
import type { Adaptation, ApiError, LearnerResponse, LearningSessionRecord } from "./types";

const understandingOptions: Array<{
  value: LearnerResponse;
  emoji: string;
  color: string;
}> = [
  {
    value: "high",
    emoji: "😊",
    color:
      "hover:border-teal-300 hover:bg-teal-50 dark:hover:border-teal-700 dark:hover:bg-teal-900/10"
  },
  {
    value: "medium",
    emoji: "😐",
    color:
      "hover:border-amber-300 hover:bg-amber-50 dark:hover:border-amber-700 dark:hover:bg-amber-900/10"
  },
  {
    value: "needs_support",
    emoji: "😕",
    color:
      "hover:border-rose-300 hover:bg-rose-50 dark:hover:border-rose-700 dark:hover:bg-rose-900/10"
  }
];

export default function LearningSession({ sessionId }: { sessionId: string }) {
  const t = useTranslations("session");
  const locale = useLocale();
  const [session, setSession] = useState<LearningSessionRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [isSendingFollowUp, setIsSendingFollowUp] = useState(false);
  const [followUpError, setFollowUpError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    void fetchSession(sessionId, controller.signal, t("errors.load"))
      .then(setSession)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(error instanceof Error ? error.message : t("errors.load"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [sessionId, t]);

  async function submitUnderstanding(understanding: LearnerResponse) {
    if (!session || isResponding) return;
    setIsResponding(true);
    setActionError("");

    try {
      const response = await fetch(`/api/sessions/${sessionId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ understanding })
      });
      const data = (await response.json()) as ApiError & {
        understanding?: LearnerResponse;
        status?: SessionStatus;
        adaptationRound?: number;
        adaptation?: Adaptation | null;
      };
      if (
        !response.ok ||
        !data.understanding ||
        !data.status ||
        typeof data.adaptationRound !== "number"
      ) {
        throw new Error(getErrorMessage(data, t("errors.respond")));
      }

      setSession((current) =>
        current
          ? {
              ...current,
              understanding: data.understanding ?? current.understanding,
              status: data.status ?? current.status,
              adaptationRound: data.adaptationRound ?? current.adaptationRound,
              adaptations: data.adaptation
                ? [...current.adaptations, data.adaptation]
                : current.adaptations
            }
          : current
      );
    } catch (error) {
      setActionError(error instanceof Error ? error.message : t("errors.respond"));
    } finally {
      setIsResponding(false);
    }
  }

  async function completeLearning() {
    if (!session || isCompleting) return;
    setIsCompleting(true);
    setActionError("");

    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" })
      });
      const data = (await response.json()) as ApiError & { session?: LearningSessionRecord };
      if (!response.ok || !data.session) {
        throw new Error(getErrorMessage(data, t("errors.complete")));
      }
      setSession(data.session);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : t("errors.complete"));
    } finally {
      setIsCompleting(false);
    }
  }

  async function submitFollowUp() {
    if (!session || isSendingFollowUp || session.followUps.length >= MAX_FOLLOW_UPS) return;
    const question = followUpQuestion.trim();
    if (!question) return;
    setIsSendingFollowUp(true);
    setFollowUpError("");

    try {
      const response = await fetch(`/api/sessions/${sessionId}/followup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = (await response.json()) as ApiError & {
        followUp?: { question: string; answer: { en: string; my: string } };
      };
      if (!response.ok || !data.followUp) {
        throw new Error(getErrorMessage(data, t("errors.followUp")));
      }

      setSession((current) =>
        current
          ? {
              ...current,
              followUps: [
                ...current.followUps,
                { ...data.followUp!, createdAt: new Date().toISOString() }
              ]
            }
          : current
      );
      setFollowUpQuestion("");
    } catch (error) {
      setFollowUpError(error instanceof Error ? error.message : t("errors.followUp"));
    } finally {
      setIsSendingFollowUp(false);
    }
  }

  if (isLoading) return <SessionSkeleton label={t("loading")} />;

  if (!session || loadError) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm dark:border-rose-900 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 font-bold text-rose-600 dark:bg-rose-900/30 dark:text-rose-300">
            !
          </div>
          <h1 className="font-bold text-slate-900 dark:text-white">{t("errors.title")}</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {loadError || t("errors.load")}
          </p>
          <Link
            href="/history"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t("backToHistory")}
          </Link>
        </div>
      </main>
    );
  }

  const latestAdaptation = session.adaptations.at(-1);
  const isCompleted = session.status === "completed";
  const canRespond =
    !isCompleted &&
    session.understanding !== "high" &&
    session.adaptationRound < MAX_ADAPTATION_ROUNDS;
  const canFinish =
    !isCompleted &&
    (session.understanding === "high" || session.adaptationRound >= MAX_ADAPTATION_ROUNDS);
  const language = session.preferencesSnapshot?.supportLanguage ?? "bilingual";

  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <header className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 p-6 text-white shadow-lg shadow-blue-500/20">
          <span className="inline-flex rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-100">
            {session.concept.domain}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {session.concept.name}
          </h1>
          <p className="mt-1 text-sm text-blue-100">{t("learningSession")}</p>
        </header>

        <ExplanationCard title={t("sections.simple")} icon="📖">
          <BilingualContent
            content={session.explanations.simple}
            locale={locale}
            supportLanguage={language}
          />
        </ExplanationCard>
        <ExplanationCard title={t("sections.realWorld")} icon="◉">
          <BilingualContent
            content={session.explanations.realWorldExample}
            locale={locale}
            supportLanguage={language}
          />
        </ExplanationCard>
        <ExplanationCard title={t("sections.technical")} icon="⚙">
          <BilingualContent
            content={session.explanations.technical}
            locale={locale}
            supportLanguage={language}
            compact
          />
        </ExplanationCard>
        <ExplanationCard title={t("sections.reflect")} icon="◇">
          <BilingualContent
            content={session.reflectivePrompt}
            locale={locale}
            supportLanguage={language}
            italic
          />
          {!showHint ? (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="mt-4 text-sm font-semibold text-violet-600 underline underline-offset-2 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              {t("showHint")}
            </button>
          ) : (
            <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-400">
                {t("hint")}
              </p>
              <BilingualContent
                content={session.hint}
                locale={locale}
                supportLanguage={language}
                compact
              />
            </div>
          )}
        </ExplanationCard>

        <FollowUpSection
          concept={session.concept.name}
          followUps={session.followUps}
          question={followUpQuestion}
          error={followUpError}
          isSending={isSendingFollowUp}
          locale={locale}
          supportLanguage={language}
          onQuestionChange={(value) => {
            setFollowUpQuestion(value);
            if (followUpError) setFollowUpError("");
          }}
          onSubmit={() => void submitFollowUp()}
        />

        {!isCompleted && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {t("understanding.title")}
            </h2>
            {latestAdaptation && (
              <AdaptationCard
                adaptation={latestAdaptation}
                locale={locale}
                supportLanguage={language}
              />
            )}
            {latestAdaptation && canRespond && (
              <p className="mb-3 mt-5 text-sm text-slate-500 dark:text-slate-400">
                {t("understanding.askAgain")}
              </p>
            )}
            {canRespond && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {understandingOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => void submitUnderstanding(option.value)}
                    disabled={isResponding}
                    className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-slate-200 p-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-wait disabled:opacity-50 dark:border-slate-700 ${option.color}`}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span className="text-center text-xs font-semibold leading-tight text-slate-700 dark:text-slate-300">
                      {t(`understanding.${option.value}`)}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {isResponding && (
              <p
                className="mt-3 text-center text-sm text-blue-600 dark:text-blue-400"
                aria-live="polite"
              >
                {t("understanding.adapting")}
              </p>
            )}
            {canFinish && (
              <div className={latestAdaptation ? "mt-4" : ""}>
                {session.adaptationRound >= MAX_ADAPTATION_ROUNDS &&
                  session.understanding !== "high" && (
                    <p className="mb-3 text-xs text-slate-400 dark:text-slate-500">
                      {t("understanding.maximumSupport")}
                    </p>
                  )}
                <button
                  type="button"
                  onClick={() => void completeLearning()}
                  disabled={isCompleting}
                  className="min-h-11 w-full rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60"
                >
                  {isCompleting
                    ? t("completing")
                    : session.understanding === "high"
                      ? t("finishLearning")
                      : t("finishForNow")}
                </button>
              </div>
            )}
            {actionError && (
              <p className="mt-3 text-sm text-rose-600 dark:text-rose-400" role="alert">
                {actionError}
              </p>
            )}
          </section>
        )}

        {isCompleted && (
          <section className="rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center dark:border-teal-800 dark:bg-teal-900/15">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-bold text-white">
              ✓
            </div>
            <h2 className="text-lg font-bold text-teal-700 dark:text-teal-300">
              {t("complete.title")}
            </h2>
            <p className="mt-1 text-sm text-teal-600 dark:text-teal-400">
              {t("complete.description", { concept: session.concept.name })}
            </p>
            <Link
              href="/history"
              className="mt-4 inline-flex text-sm font-semibold text-teal-700 underline underline-offset-2 transition hover:text-teal-800 dark:text-teal-300"
            >
              {t("complete.history")} →
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

function SessionSkeleton({ label }: { label: string }) {
  return (
    <main
      className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8"
      aria-label={label}
      aria-busy="true"
    >
      <div className="h-36 animate-pulse rounded-2xl bg-blue-200 dark:bg-blue-950" />
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        />
      ))}
    </main>
  );
}

async function fetchSession(sessionId: string, signal: AbortSignal, fallback: string) {
  const response = await fetch(`/api/sessions/${sessionId}`, { signal });
  const data = (await response.json()) as ApiError & { session?: LearningSessionRecord };
  if (!response.ok || !data.session) throw new Error(getErrorMessage(data, fallback));
  return data.session;
}

function getErrorMessage(data: ApiError, fallback: string): string {
  if (typeof data.error === "string") return data.error;
  return data.error?.message || data.message || fallback;
}
