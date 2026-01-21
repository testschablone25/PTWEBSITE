"use client";

import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "px-4 py-2 text-sm font-medium border border-color-border text-color-foreground",
        "hover:bg-color-accent-highlight hover:border-color-accent",
        "uppercase tracking-wider hover-lift inner-border outline-none",
        "transition-colors focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-color-foreground focus-visible:outline-offset-2",
        className
      )}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="flex items-center justify-center gap-2">
        {theme === "light" ? (
          <>
            <span className="text-lg">☀</span>
            {showLabel && <span className="text-xs">Light</span>}
          </>
        ) : (
          <>
            <span className="text-lg">☾</span>
            {showLabel && <span className="text-xs">Dark</span>}
          </>
        )}
      </span>
    </button>
  );
}