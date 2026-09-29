import { UI_LANGUAGES, type UILanguage } from "@/lib/constants";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = resolveLocale(store.get("locale")?.value);
  const messages = (await import(`./locales/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});

export function resolveLocale(value: string | undefined): UILanguage {
  return UI_LANGUAGES.includes(value as UILanguage)
    ? (value as UILanguage)
    : UI_LANGUAGES[0];
}
