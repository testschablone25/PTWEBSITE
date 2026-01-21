"use client";

import { SOCIAL_URLS } from "@/lib/social";

interface InstagramFollowButtonProps {
  /** Custom class for the button */
  className?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Size of icon if shown */
  iconSize?: number;
  /** Button text, defaults to "Follow" */
  label?: string;
}

export function InstagramFollowButton({
  className = "",
  showIcon = true,
  iconSize = 20,
  label = "Follow",
}: InstagramFollowButtonProps) {
  return (
    <a
      href={SOCIAL_URLS.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 border border-color-border bg-color-background text-color-foreground font-medium hover:bg-color-accent-highlight hover:border-color-accent uppercase tracking-wider hover-lift inner-border outline-none transition-colors ${className}`}
      aria-label="Follow us on Instagram"
    >
      {showIcon && (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="2" y="2" width="20" height="20" rx="0" ry="0" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="18" cy="6" r="1" />
        </svg>
      )}
      <span>{label}</span>
    </a>
  );
}