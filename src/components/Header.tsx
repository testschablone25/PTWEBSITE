"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

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

// Navigation items configuration
const NAV_ITEMS = [
  { key: "home", path: "/" },
  { key: "physio", path: "/physio" },
  { key: "pt", path: "/personal-training" },
  { key: "about", path: "/about" },
  { key: "prices", path: "/prices" },
  { key: "faq", path: "/faq" },
  { key: "contact", path: "/contact" },
  { key: "blog", path: "/blog" },
  { key: "reviews", path: "/reviews" },
  { key: "therapyPath", path: "/therapy-path" },
];

export function Header({ logo = "PT", showLocaleSwitch = true }: HeaderProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common.nav");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const targetLocale = locale === "de" ? "en" : "de";

  const targetPathname = useMemo(() => {
    if (targetLocale === "en") {
      return DE_TO_EN_PATHS[pathname] ?? pathname;
    }

    return EN_TO_DE_PATHS[pathname] ?? pathname;
  }, [pathname, targetLocale]);

  // Close mobile menu when route changes
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-color-border bg-color-background backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-color-foreground hover:text-color-accent link-underline hover-lift outline-none"
            aria-label="Go to home page"
            onClick={closeMobileMenu}
          >
            {logo}
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                locale={locale}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-color-foreground hover:text-color-accent hover:bg-color-accent-highlight link-underline outline-none transition-colors",
                  pathname === item.path && "text-color-accent font-semibold"
                )}
                aria-label={t(item.key)}
                onClick={closeMobileMenu}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right side - Desktop: Theme Toggle and Locale Switch */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {showLocaleSwitch && (
              <Link
                href={targetPathname}
                locale={targetLocale}
                className="px-4 py-2 text-sm font-medium border border-color-border text-color-foreground hover:bg-color-accent-highlight hover:border-color-accent uppercase tracking-wider hover-lift inner-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Switch to ${targetLocale === "de" ? "German" : "English"}`}
              >
                {targetLocale === "de" ? "DE" : "EN"}
              </Link>
            )}
          </div>

          {/* Mobile menu button and controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            {showLocaleSwitch && (
              <Link
                href={targetPathname}
                locale={targetLocale}
                className="px-3 py-2 text-sm font-medium border border-color-border text-color-foreground hover:bg-color-accent-highlight hover:border-color-accent uppercase tracking-wider hover-lift inner-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Switch to ${targetLocale === "de" ? "German" : "English"}`}
              >
                {targetLocale === "de" ? "DE" : "EN"}
              </Link>
            )}
            <button
              type="button"
              className="p-2 text-color-foreground hover:text-color-accent hover:bg-color-accent-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "rotate-45 top-3" : "top-1"
                  )}
                />
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out top-3",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t border-color-border bg-color-background overflow-hidden"
          >
            <nav className="px-4 py-3 space-y-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.path}
                  locale={locale}
                  className={cn(
                    "block px-4 py-4 text-base font-medium text-color-foreground hover:text-color-accent hover:bg-color-accent-highlight border-l-2 border-transparent hover:border-color-accent outline-none transition-colors min-h-[48px] flex items-center",
                    pathname === item.path && "text-color-accent font-semibold border-color-accent"
                  )}
                  aria-label={t(item.key)}
                  onClick={closeMobileMenu}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
