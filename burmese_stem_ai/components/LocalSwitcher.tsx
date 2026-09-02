"use client";

import { UI_LANGUAGES } from "@/lib/constants";
import { Locale, useLocale } from "next-intl";
import { useTransition } from "react";

type Props = {
  changeLocaleAction: (locale: Locale) => Promise<void>;
};

export default function LocaleSwitcher({ changeLocaleAction }: Props) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const nextLocale = UI_LANGUAGES.find((language) => language !== locale) ?? UI_LANGUAGES[0];

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => void changeLocaleAction(nextLocale as Locale));
      }}
      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
      aria-label={locale === "en" ? "မြန်မာဘာသာသို့ ပြောင်းရန်" : "Switch to English"}
    >
      {nextLocale === "my" ? "မြန်မာ" : "EN"}
    </button>
  );
}
