"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "pt-website-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Apply theme class to html element
  function applyTheme(theme: Theme) {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    
    // Check localStorage first
    const stored = localStorage.getItem(storageKey) as Theme | null;
    
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme: Theme = prefersDark ? "dark" : "light";
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }
  }, [storageKey]);

  // Update html class when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    applyTheme(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide context, but theme value might be default during SSR
  // The actual theme application happens in useEffect after mount
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}