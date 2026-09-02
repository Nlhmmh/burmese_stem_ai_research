import HistoryList from "@/components/history/HistoryList";
import { getTranslations } from "next-intl/server";

export default async function History() {
  const t = await getTranslations("history");

  return (
    <main className="flex-1 px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
          </div>
        </div>

        <HistoryList />
      </div>
    </main>
  );
}
