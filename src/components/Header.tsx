"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  logo?: string;
  showLocaleSwitch?: boolean;
}

const DE_TO_EN_PATHS: Record<string, string> = {
  "/preise": "/prices",
  "/kontakt": "/contact",
  "/therapie-pfad": "/therapy-path",
  "/impressum": "/privacy",
  "/datenschutz": "/terms",
};

const EN_TO_DE_PATHS: Record<string, string> = Object.fromEntries(
  Object.entries(DE_TO_EN_PATHS).map(([dePath, enPath]) => [enPath, dePath])
);

export function Header({ logo = "PT", showLocaleSwitch = true }: HeaderProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const targetLocale = locale === "de" ? "en" : "de";

  const targetPathname = useMemo(() => {
    if (targetLocale === "en") {
      return DE_TO_EN_PATHS[pathname] ?? pathname;
    }

    return EN_TO_DE_PATHS[pathname] ?? pathname;
  }, [pathname, targetLocale]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-color-border bg-color-background backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-color-foreground hover:text-color-accent link-underline hover-lift outline-none"
            aria-label="Go to home page"
          >
            {logo}
          </Link>

          {/* Right side - Theme Toggle and Locale Switch */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {showLocaleSwitch && (
              <Link
                href={targetPathname}
                locale={targetLocale}
                className="px-4 py-2 text-sm font-medium border border-color-border text-color-foreground hover:bg-color-accent-highlight hover:border-color-accent uppercase tracking-wider hover-lift inner-border outline-none transition-colors"
                aria-label={`Switch to ${targetLocale === "de" ? "German" : "English"}`}
              >
                {targetLocale === "de" ? "DE" : "EN"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
