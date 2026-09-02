"use client";

import LocaleSwitcher from "@/components/LocalSwitcher";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
  changeLocaleAction: (locale: Locale) => Promise<void>;
};

export default function AppHeader({ changeLocaleAction }: Props) {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const shouldUseDark =
      savedTheme === "dark" ||
      (savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("theme", nextDark ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 shadow-xs">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-slate-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-black text-white shadow-sm shadow-blue-600/30">
            B
          </span>
          <span className="hidden text-lg sm:inline">Burmese STEM AI</span>
        </Link>

        <nav aria-label={t("label")} className="flex items-center gap-0.5">
          <HeaderLink href="/" active={pathname === "/"}>
            {t("newInquiry")}
          </HeaderLink>
          <HeaderLink href="/history" active={pathname.startsWith("/history")}>
            {t("history")}
          </HeaderLink>
          <span className="mx-1.5 h-4 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
          <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-0.5 rounded-lg p-2 text-lg leading-none text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label={t("themeMode")}
          >
            ◑
          </button>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({
  href,
  active,
  children
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-lg px-2 py-3 text-base font-medium transition-colors sm:px-3 sm:text-sm ${
        active
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
      }`}
    >
      {children}
    </Link>
  );
}
