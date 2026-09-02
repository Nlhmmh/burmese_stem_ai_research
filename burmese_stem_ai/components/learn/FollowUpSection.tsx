"use client";

import type { Preferences } from "@/data/schemas/profile.schema";
import {
  MAX_FOLLOW_UP_QUESTION_LENGTH,
  MAX_FOLLOW_UPS
} from "@/lib/constants";
import { useTranslations } from "next-intl";
import { BilingualContent } from "./SessionContent";
import type { FollowUp } from "./types";

type FollowUpSectionProps = {
  concept: string;
  followUps: FollowUp[];
  question: string;
  error: string;
  isSending: boolean;
  locale: string;
  supportLanguage: Preferences["supportLanguage"];
  onQuestionChange: (value: string) => void;
  onSubmit: () => void;
};

export default function FollowUpSection({
  concept,
  followUps,
  question,
  error,
  isSending,
  locale,
  supportLanguage,
  onQuestionChange,
  onSubmit
}: FollowUpSectionProps) {
  const t = useTranslations("session.followUp");
  const limitReached = followUps.length >= MAX_FOLLOW_UPS;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {t("title", { concept })}
      </h2>

      {followUps.length > 0 && (
        <div className="mt-4 space-y-3">
          {followUps.map((followUp, index) => (
            <article
              key={`${followUp.question}-${index}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70"
            >
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {followUp.question}
              </p>
              <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
                <BilingualContent
                  content={followUp.answer}
                  locale={locale}
                  supportLanguage={supportLanguage}
                  compact
                />
              </div>
            </article>
          ))}
        </div>
      )}

      {!limitReached ? (
        <div className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={question}
              onChange={(event) => onQuestionChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && question.trim()) onSubmit();
              }}
              maxLength={MAX_FOLLOW_UP_QUESTION_LENGTH}
              disabled={isSending}
              placeholder={t("placeholder")}
              aria-label={t("inputLabel")}
              className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-wait dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={onSubmit}
              disabled={!question.trim() || isSending}
              className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSending ? t("sending") : t("ask")}
            </button>
          </div>
          <p className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">
            {t("remaining", { count: MAX_FOLLOW_UPS - followUps.length })}
          </p>
        </div>
      ) : (
        <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {t("limit")}
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
