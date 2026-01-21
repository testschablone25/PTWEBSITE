import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Section({ children, size = "lg", className = "" }: SectionProps) {
  const sizeClasses = {
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={`${sizeClasses[size]} ${className}`}>
      {children}
    </section>
  );
}
