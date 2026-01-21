import { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
  variant?: "solid" | "outline" | "subtle";
  className?: string;
}

export function Highlight({ children, variant = "subtle", className = "" }: HighlightProps) {
  const variantClasses = {
    solid: "bg-color-accent text-color-background px-1",
    outline: "border-b-2 border-color-accent",
    subtle: "bg-color-accent-highlight text-color-foreground px-1",
  };

  return (
    <span className={`${variantClasses[variant]} transition-colors ${className}`}>
      {children}
    </span>
  );
}
