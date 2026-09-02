"use client";

import type { SessionStatus, UnderstandingLevel } from "@/lib/constants";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

type SessionSummary = {
  sessionId: string;
  concept: {
    name: string;
    domain: string;
  };
  understanding: UnderstandingLevel;
  status: SessionStatus;
  updatedAt: string;
};

type SessionsResponse = {
  sessions?: SessionSummary[];
  error?: string | { message?: string };
};

const understandingStyles: Record<Exclude<UnderstandingLevel, null> | "unrated", string> = {
  high: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  needs_support: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  unrated: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
};

const understandingDots: Record<Exclude<UnderstandingLevel, null> | "unrated", string> = {
  high: "bg-teal-500",
  medium: "bg-amber-500",
  needs_support: "bg-rose-500",
  unrated: "bg-slate-400"
};

const statusStyles: Record<SessionStatus, string> = {
  completed:
    "border border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-900/20 dark:text-teal-300",
  in_progress:
    "border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  review_recommended:
    "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
};

const actionStyles: Record<SessionStatus, string> = {
  completed:
    "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
  in_progress: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
  review_recommended: "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
};

export default function HistoryList() {
  const t = useTranslations("history");
  const locale = useLocale();
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    void fetchSessions(controller.signal, t("errors.load"))
      .then(setSessions)
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : t("errors.load"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [t]);

  function retry() {
    setIsLoading(true);
    setError("");
    void fetchSessions(undefined, t("errors.load"))
      .then(setSessions)
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : t("errors.load"));
      })
      .finally(() => setIsLoading(false));
  }

  if (isLoading) return <HistorySkeleton />;

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-white px-6 py-10 text-center shadow-sm dark:border-rose-900 dark:bg-slate-900">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300" aria-hidden="true">
          !
        </div>
        <p className="font-semibold text-slate-900 dark:text-white">{t("errors.title")}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-300" aria-hidden="true">
          ◇
        </div>
        <h2 className="font-bold text-slate-900 dark:text-white">{t("empty.title")}</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {t("empty.description")}
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {t("newInquiry")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const understanding = session.understanding ?? "unrated";

        return (
          <article
            key={session.sessionId}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold text-slate-900 dark:text-white">
                  {session.concept.name}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {session.concept.domain}
                  </span>
                  <time
                    dateTime={session.updatedAt}
                    className="text-xs text-slate-400 dark:text-slate-500"
                  >
                    {formatDate(session.updatedAt, locale)}
                  </time>
                </div>
              </div>

              <HistoryField label={t("understanding.label")}>
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${understandingDots[understanding]}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${understandingStyles[understanding]}`}
                  >
                    {t(`understanding.${understanding}`)}
                  </span>
                </span>
              </HistoryField>

              <HistoryField label={t("status.label")} wide>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[session.status]}`}
                >
                  {t(`status.${session.status}`)}
                </span>
              </HistoryField>

              <Link
                href={`/learn/${session.sessionId}`}
                className={`self-end rounded-xl px-4 py-2 text-sm font-semibold transition sm:self-auto ${actionStyles[session.status]}`}
              >
                {t(`actions.${session.status}`)}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function HistoryField({
  label,
  wide = false,
  children
}: {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1 ${wide ? "sm:min-w-36" : "sm:min-w-28"}`}>
      <span className="text-xs text-slate-400 dark:text-slate-500">{label}</span>
      {children}
    </div>
  );
}

function HistorySkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading learning history" aria-busy="true">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:h-24"
        />
      ))}
    </div>
  );
}

function formatDate(value: string, locale: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "my" ? "my-MM" : "en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function getErrorMessage(data: SessionsResponse, fallback: string): string {
  if (typeof data.error === "string") return data.error;
  return data.error?.message || fallback;
}

async function fetchSessions(signal: AbortSignal | undefined, fallback: string) {
  const response = await fetch("/api/sessions", { signal });
  const data = (await response.json()) as SessionsResponse;

  if (!response.ok || !Array.isArray(data.sessions)) {
    throw new Error(getErrorMessage(data, fallback));
  }

  return data.sessions;
}
