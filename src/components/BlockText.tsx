import { ReactNode } from "react";

interface BlockTextProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BlockText({ children, size = "md", className = "" }: BlockTextProps) {
  const sizeClasses = {
    sm: "text-base leading-relaxed tracking-wide",
    md: "text-lg leading-relaxed tracking-wide",
    lg: "text-xl leading-relaxed tracking-wide",
  };

  return (
    <p className={`text-color-foreground ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
}
