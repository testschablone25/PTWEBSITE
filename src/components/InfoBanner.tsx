"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";

export type BannerVariant = "info" | "warning" | "success" | "error";

interface InfoBannerProps {
  /** The message to display */
  message: string;
  /** Variant of the banner */
  variant?: BannerVariant;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** Unique ID for localStorage persistence */
  storageKey?: string;
  /** Custom class for the banner */
  className?: string;
}

const VARIANT_STYLES: Record<BannerVariant, string> = {
  info: "bg-color-accent-highlight border-color-accent text-color-foreground",
  warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
  success: "bg-green-50 border-green-300 text-green-800",
  error: "bg-red-50 border-red-300 text-red-800",
};

const VARIANT_ICONS: Record<BannerVariant, React.ReactNode> = {
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M12 9v4" />
      <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
      <path d="M12 17h.01" />
    </svg>
  ),
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  ),
  error: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  ),
};

export function InfoBanner({
  message,
  variant = "info",
  dismissible = true,
  onDismiss,
  storageKey,
  className = "",
}: InfoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Check localStorage for dismissed state
  useEffect(() => {
    if (storageKey) {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed === "true") {
        setIsVisible(false);
      }
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (storageKey) {
      localStorage.setItem(storageKey, "true");
    }
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={clsx(
        "border-b py-3 px-6",
        VARIANT_STYLES[variant],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">{VARIANT_ICONS[variant]}</div>
          <p className="text-sm font-medium">{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-color-foreground-muted hover:text-color-foreground outline-none transition-colors"
            aria-label="Dismiss banner"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}