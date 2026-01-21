"use client";

import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { InstagramFollowButton } from "./InstagramFollowButton";
import { AFFILIATIONS } from "@/lib/affiliations";

interface FooterProps {
  logo?: string;
}

export function Footer({ logo = "PT" }: FooterProps) {
  return (
    <footer className="border-t border-color-border bg-color-background">
      <Container size="xl">
        {/* Logo tiles section */}
        <div className="py-12 border-b border-color-border">
          <h3 className="text-lg font-medium text-color-foreground-muted text-center mb-8 uppercase tracking-wider">
            Affiliated Organizations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {AFFILIATIONS.map((affiliation) => (
              <a
                key={affiliation.id}
                href={affiliation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 border border-color-border hover:border-color-accent hover:bg-color-accent-highlight transition-colors group"
                aria-label={`Visit ${affiliation.name}`}
              >
                {/* Logo placeholder - using text for now */}
                <div className="w-16 h-16 flex items-center justify-center mb-3 bg-color-background-elevated border border-color-border group-hover:border-color-accent">
                  <span className="text-xs font-medium text-color-foreground-muted">
                    {affiliation.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <span className="text-xs text-color-foreground-muted text-center leading-tight">
                  {affiliation.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Social media section */}
        <div className="py-12 border-b border-color-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-lg font-medium text-color-foreground uppercase tracking-wider">
                Follow Us
              </h3>
              <SocialMediaLinks
                platforms={["instagram", "tiktok", "youtube", "facebook", "linkedin"]}
                size={24}
                showLabels={false}
                linkClassName="hover-lift"
              />
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <h3 className="text-lg font-medium text-color-foreground uppercase tracking-wider">
                Connect on Instagram
              </h3>
              <InstagramFollowButton
                showIcon={true}
                label="Follow @pttherapy"
                className="px-8 py-3"
              />
            </div>
          </div>
        </div>

        {/* Legal links and copyright */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-sm text-color-foreground-muted">
              © {new Date().getFullYear()} {logo}. All rights reserved.
            </span>
            <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
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
      </Container>
    </footer>
  );
}
