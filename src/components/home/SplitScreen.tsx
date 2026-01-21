"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { BookingSection } from "@/components/booking";

type Selection = "none" | "physio" | "pt";

interface SplitOptionContent {
  title: string;
  tagline: string;
  paragraphs: string[];
}

interface SplitScreenProps {
  physioContent: SplitOptionContent;
  ptContent: SplitOptionContent;
  onSelect?: (selection: Selection) => void;
  className?: string;
}

const transition = {
  duration: 0.6,
  ease: [0.215, 0.61, 0.355, 1] as const,
};

export function SplitScreen({ physioContent, ptContent, onSelect, className }: SplitScreenProps) {
  const [selection, setSelection] = useState<Selection>("none");
  const [hoverSide, setHoverSide] = useState<Selection>("none");

  const handleSelect = (choice: Selection) => {
    setSelection(choice);
    onSelect?.(choice);
  };

  const handleMouseEnter = (side: Selection) => {
    if (selection === "none") {
      setHoverSide(side);
    }
  };

  const handleMouseLeave = () => {
    setHoverSide("none");
  };

  const handleTouchStart = (side: Selection) => {
    if (selection === "none") {
      setHoverSide(side);
    }
  };

  const handleTouchEnd = () => {
    setHoverSide("none");
  };

  const handleReset = () => {
    setSelection("none");
    onSelect?.("none");
  };

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-color-background", className)}>
      <AnimatePresence>
        {selection !== "none" && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={transition}
            onClick={handleReset}
            className="fixed left-4 top-20 z-50 flex items-center gap-2 border-2 border-color-foreground bg-color-background px-4 py-3 text-sm font-medium uppercase tracking-widest text-color-foreground hover:bg-color-foreground hover:text-color-background min-h-[44px] sm:left-8 sm:top-24 sm:px-4 sm:py-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück
          </motion.button>
        )}
      </AnimatePresence>

       <div className="flex h-full min-h-screen flex-col md:flex-row gap-4 md:gap-0">
         <SplitPane content={physioContent} side="left" isSelected={selection === "physio"} isOtherSelected={selection === "pt"} isHovered={hoverSide === "physio"} isOtherHovered={hoverSide === "pt"} onSelect={() => handleSelect("physio")} onMouseEnter={() => handleMouseEnter("physio")} onMouseLeave={handleMouseLeave} onTouchStart={() => handleTouchStart("physio")} onTouchEnd={handleTouchEnd} showBooking={true} />
        <AnimatePresence>
          {selection === "none" && (
            <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0 }} transition={transition} className="hidden md:block w-[2px] bg-color-foreground origin-center" />
          )}
        </AnimatePresence>
         <SplitPane content={ptContent} side="right" isSelected={selection === "pt"} isOtherSelected={selection === "physio"} isHovered={hoverSide === "pt"} isOtherHovered={hoverSide === "physio"} onSelect={() => handleSelect("pt")} onMouseEnter={() => handleMouseEnter("pt")} onMouseLeave={handleMouseLeave} onTouchStart={() => handleTouchStart("pt")} onTouchEnd={handleTouchEnd} showBooking={false} />
      </div>

      <AnimatePresence>
        {selection === "none" && (
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} exit={{ opacity: 0, scaleX: 0 }} transition={transition} className="absolute left-1/2 top-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-color-foreground md:hidden origin-center" />
        )}
      </AnimatePresence>
    </div>
  );
}

interface SplitPaneProps {
  content: SplitOptionContent;
  side: "left" | "right";
  isSelected: boolean;
  isOtherSelected: boolean;
  isHovered: boolean;
  isOtherHovered: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  showBooking: boolean;
}

function SplitPane({ content, side, isSelected, isOtherSelected, isHovered, isOtherHovered, onSelect, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd, showBooking }: SplitPaneProps) {
  const getWidth = () => { if (isSelected) return "100%"; if (isOtherSelected) return "0%"; return "50%"; };
  const getMobileHeight = () => { if (isSelected) return "100%"; if (isOtherSelected) return "0%"; return "auto"; };

  return (
    <motion.div
      layout
      initial={false}
      animate={{ width: getWidth(), height: getMobileHeight() }}
      transition={transition}
        className={cn("relative flex items-center justify-center transition-all duration-300 touch-manipulation", !isSelected && !isOtherSelected ? "min-h-0 md:min-h-screen" : "min-h-screen", side === "left" ? "bg-color-background" : "bg-color-accent-highlight", !isSelected && !isOtherSelected && "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2 active:brightness-95", isOtherSelected ? "overflow-hidden" : "overflow-visible", !isSelected && !isOtherSelected && isOtherHovered && "opacity-80", !isSelected && !isOtherSelected && isHovered && "brightness-105")}
       onClick={() => { if (!isSelected && !isOtherSelected) onSelect(); }}
       onMouseEnter={onMouseEnter}
       onMouseLeave={onMouseLeave}
       onTouchStart={onTouchStart}
       onTouchEnd={onTouchEnd}
       role={!isSelected && !isOtherSelected ? "button" : undefined}
       tabIndex={!isSelected && !isOtherSelected ? 0 : undefined}
       onKeyDown={(e) => { if (!isSelected && !isOtherSelected && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onSelect(); } }}
    >
       <AnimatePresence mode="wait">
        {!isOtherSelected && (
           <motion.div key={isSelected ? "expanded" : "collapsed"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={cn("w-full transition-shadow duration-300", !isSelected && !isOtherSelected ? "px-6 py-6 sm:px-8 md:py-12" : "px-6 py-12 sm:px-8", isSelected ? (showBooking ? "max-w-4xl mx-auto" : "max-w-3xl mx-auto") : "max-w-md", !isSelected && !isOtherSelected && isHovered && "[box-shadow:0_0_12px_2px_rgb(var(--color-accent-rgb)_/_0.3)]")}>
            <motion.h2 layout="position" className={cn("font-bold tracking-tight mb-4", isSelected ? "text-center" : "")}>{content.title}</motion.h2>
            <motion.p layout="position" className={cn("text-lg text-color-foreground-muted mb-8", isSelected ? "text-center" : "", !isSelected && "hidden md:block")}>{content.tagline}</motion.p>
            <div className={cn("space-y-6", isSelected && "mt-12", !isSelected && "hidden md:block")}>
              {content.paragraphs.map((paragraph, index) => (
                <motion.p key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: isSelected ? 0.2 + index * 0.1 : 0 }} className="text-color-foreground leading-relaxed">{paragraph}</motion.p>
              ))}
            </div>
            {!isSelected && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 hidden md:block">
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-color-foreground">
                  Mehr erfahren
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" strokeLinejoin="miter" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </motion.div>
            )}
            <AnimatePresence>
              {isSelected && (
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ ...transition, delay: 0.4 }} className="mt-16 border-t border-color-border pt-12">
                  <h3 className="mb-6">Weitere Informationen</h3>
                  <div className="grid gap-8 md:grid-cols-2 mb-12">
                    <div className="border border-color-border p-6"><h4 className="mb-3 font-medium">Leistungen</h4><p className="text-color-foreground-muted">Hier werden die spezifischen Leistungen für {content.title} aufgelistet.</p></div>
                    <div className="border border-color-border p-6"><h4 className="mb-3 font-medium">Ablauf</h4><p className="text-color-foreground-muted">Beschreibung des typischen Ablaufs und was Sie erwarten können.</p></div>
                  </div>
                  {showBooking ? (<div className="border-t border-color-border pt-12"><BookingSection bleed={true} /></div>) : (<div className="text-center"><a href="#kontakt" className="inline-block border-2 border-color-foreground bg-color-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest text-color-background hover:bg-transparent hover:text-color-foreground">Termin vereinbaren</a></div>)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
