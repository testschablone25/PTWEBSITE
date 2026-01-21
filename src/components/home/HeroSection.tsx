"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

/**
 * HeroSection - Sticky, full viewport hero that fades and scales on scroll.
 * Creates the "disappearing" effect as user scrolls down.
 */
export function HeroSection({ title, subtitle, className }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Fade out and scale down as user scrolls
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-screen", className)}
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 sm:px-8"
      >
        <div className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-bold tracking-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-6 text-lg text-color-foreground-muted leading-relaxed sm:text-xl"
          >
            {subtitle}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto h-12 w-6 border-2 border-color-foreground-muted flex items-start justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-1 bg-color-foreground-muted"
              />
            </motion.div>
            <p className="mt-4 text-sm text-color-foreground-muted uppercase tracking-widest">
              Scroll
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
