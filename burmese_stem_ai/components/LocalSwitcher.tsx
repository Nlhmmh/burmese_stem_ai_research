"use client";

import { LANGUAGE_CODES } from "@/lib/constants";
import { Locale, useLocale } from "next-intl";

type Props = {
  changeLocaleAction: (locale: Locale) => Promise<void>;
};

export default function LocaleSwitcher({ changeLocaleAction }: Props) {
  const locale = useLocale();
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {LANGUAGE_CODES.map((cur) => (
        <button
          key={cur}
          onClick={() => changeLocaleAction(cur as Locale)}
          style={{ fontWeight: locale === cur ? "bold" : "normal" }}
        >
          {cur.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
