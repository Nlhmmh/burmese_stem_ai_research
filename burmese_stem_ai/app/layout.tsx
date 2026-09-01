import LocaleSwitcher from "@/components/LocalSwitcher";
import type { Metadata } from "next";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { cookies } from "next/dist/server/request/cookies";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Burmese STEM AI",
  description: "Burmese STEM AI Research"
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  async function changeLocaleAction(locale: Locale) {
    "use server";
    const store = await cookies();
    store.set("locale", locale);
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          {children}
          <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
