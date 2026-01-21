"use client";

import { SOCIAL_URLS, SocialPlatform } from "@/lib/social";

interface SocialMediaLinksProps {
  /** Which platforms to show, defaults to all */
  platforms?: SocialPlatform[];
  /** Size of icons, defaults to 24px */
  size?: number;
  /** Whether to show labels next to icons */
  showLabels?: boolean;
  /** Custom class for the container */
  className?: string;
  /** Custom class for each link */
  linkClassName?: string;
}

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export function SocialMediaLinks({
  platforms = ["instagram", "tiktok", "youtube", "facebook", "linkedin"],
  size = 24,
  showLabels = false,
  className = "",
  linkClassName = "",
}: SocialMediaLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {platforms.map((platform) => (
        <a
          key={platform}
          href={SOCIAL_URLS[platform]}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 text-color-foreground-muted hover:text-color-foreground transition-colors ${linkClassName}`}
          aria-label={`Follow us on ${PLATFORM_LABELS[platform]}`}
        >
          {/* Icon */}
          <div className="flex items-center justify-center" style={{ width: size, height: size }}>
            <SocialIcon platform={platform} size={size} />
          </div>
          {/* Label */}
          {showLabels && (
            <span className="text-sm font-medium">{PLATFORM_LABELS[platform]}</span>
          )}
        </a>
      ))}
    </div>
  );
}

interface SocialIconProps {
  platform: SocialPlatform;
  size?: number;
}

function SocialIcon({ platform, size = 24 }: SocialIconProps) {
  const strokeWidth = Math.max(2, Math.floor(size / 12));
  
  switch (platform) {
    case "instagram":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="2" y="2" width="20" height="20" rx="0" ry="0" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="18" cy="6" r="1" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M16 6C15.2 6 14.5 5.4 14.2 4.6C14 4.1 14 3.5 14 3H10V15C10 16.7 8.7 18 7 18C5.3 18 4 16.7 4 15C4 13.3 5.3 12 7 12C7.3 12 7.6 12.1 7.9 12.2V8.2C7.6 8.1 7.3 8 7 8C4.8 8 3 9.8 3 12C3 14.2 4.8 16 7 16C8.9 16 10.4 14.8 10.9 13.2V3H15C15 5.8 17.2 8 20 8V12C17.8 12 15.6 11.2 14.2 9.8C14.5 11.1 15.6 12 17 12C19.2 12 21 10.2 21 8C21 5.8 19.2 4 17 4C16.6 4 16.2 4.1 15.8 4.2V8H14C14 7.4 14.4 6.8 15 6.8C15.6 6.8 16 7.2 16 7.8V6Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="2" y="6" width="20" height="12" rx="0" ry="0" />
          <path d="M10 9L15 12L10 15V9Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M18 2H15C13.3 2 12 3.3 12 5V8H9V12H12V22H16V12H19L20 8H16V5C16 4.4 16.4 4 17 4H20V2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="3" y="3" width="18" height="18" rx="0" ry="0" />
          <circle cx="8" cy="8" r="2" />
          <path d="M10 18V10H14V18H10Z" />
          <path d="M14 13V18H18V13C18 11.3 16.7 10 15 10C13.3 10 12 11.3 12 13V18" />
        </svg>
      );
    default:
      return null;
  }
}