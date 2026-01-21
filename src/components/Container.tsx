import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export function Container({ children, size = "lg", className = "" }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
  };

  return (
    <div className={`mx-auto px-6 sm:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
