import AppHeader from "@/components/layout/AppHeader";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { cookies } from "next/dist/server/request/cookies";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: APP_NAME,
  description: "Understand STEM concepts in Burmese and English",
  openGraph: {
    title: APP_NAME,
    description: "Understand STEM concepts in Burmese and English",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: APP_NAME
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: "Understand STEM concepts in Burmese and English",
    images: ["/og.png"]
  }
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  async function changeLocaleAction(locale: Locale) {
    "use server";
    const store = await cookies();
    store.set("locale", locale);
  }

  return (
    <html lang={locale} className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <AppHeader changeLocaleAction={changeLocaleAction} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
