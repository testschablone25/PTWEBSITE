"use client";

import { Link } from "@/i18n/navigation";

interface FooterProps {
  logo?: string;
}

export function Footer({ logo = "PT" }: FooterProps) {
  return (
    <footer className="border-t border-color-border bg-color-background">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <span className="text-sm text-color-foreground-muted">
            © {new Date().getFullYear()} {logo}
          </span>
          <nav className="flex gap-6" aria-label="Footer navigation">
            <Link
              href="/kontakt"
              locale="de"
              className="text-sm text-color-foreground-muted hover:text-color-foreground link-underline outline-none transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="/contact"
              locale="en"
              className="text-sm text-color-foreground-muted hover:text-color-foreground link-underline outline-none transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/datenschutz"
              locale="de"
              className="text-sm text-color-foreground-muted hover:text-color-foreground link-underline outline-none transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/privacy"
              locale="en"
              className="text-sm text-color-foreground-muted hover:text-color-foreground link-underline outline-none transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/impressum"
              locale="de"
              className="text-sm text-color-foreground-muted hover:text-color-foreground link-underline outline-none transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/terms"
              locale="en"
              className="text-sm text-color-foreground-muted hover:text-color-foreground link-underline outline-none transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
