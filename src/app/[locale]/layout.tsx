import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Oswald, DM_Sans } from "next/font/google";

import { Footer, Header } from "@/components";
import { ThemeProvider } from "@/providers/theme-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "react-day-picker/style.css";

const displayFont = Oswald({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = DM_Sans({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jakob Pinger PT",
    template: "%s | Jakob Pinger PT",
  },
  description: "Physiotherapie und Personal Training",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col bg-color-background">
              <Header logo="JP" showLocaleSwitch={true} />
              <main className="flex-1">{children}</main>
              <Footer logo="JP" />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
