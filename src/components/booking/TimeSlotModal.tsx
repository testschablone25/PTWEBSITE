"use client";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

interface TimeSlotModalProps {
  isOpen: boolean;
  selectedDate: Date | null;
  availableSlots: string[];
  onSelectTime: (time: string) => void;
  onClose: () => void;
}

const backdropTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const,
};

const modalTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as const,
  delay: 0.1,
};

/**
 * TimeSlotModal - Modal showing available 1-hour time slots for selected date.
 */
export function TimeSlotModal({
  isOpen,
  selectedDate,
  availableSlots,
  onSelectTime,
  onClose,
}: TimeSlotModalProps) {
  if (!selectedDate) return null;

  const formattedDate = selectedDate.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
            className="fixed inset-0 bg-color-foreground/60 backdrop-blur-sm z-40"
          />

           {/* Modal */}
           <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
             transition={modalTransition}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
           >
             <div
               className="bg-color-background border-2 border-color-foreground w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col pointer-events-auto"
               onClick={(e) => e.stopPropagation()}
             >
              {/* Header */}
              <div className="border-b border-color-border p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">Uhrzeit wählen</h3>
                    <p className="text-color-foreground-muted mt-1">{formattedDate}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-color-accent-highlight transition-colors -mr-2 -mt-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Schließen"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Time slots */}
              <div className="p-6 overflow-y-auto flex-1">
                {availableSlots.length === 0 ? (
                  <p className="text-color-foreground-muted text-center py-8">
                    Keine verfügbaren Termine an diesem Tag.
                  </p>
                ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => onSelectTime(slot)}
                         className={cn(
                           "border-2 border-color-border px-4 py-4 text-center font-medium min-h-[52px]",
                           "hover:border-color-foreground hover:bg-color-accent-highlight",
                           "focus:border-color-foreground focus:bg-color-accent-highlight",
                           "transition-colors outline-none"
                         )}
                      >
                        <span className="text-lg">{slot}</span>
                        <span className="block text-xs text-color-foreground-muted mt-1">1 Stunde</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-color-border p-4 bg-color-accent-highlight">
                <p className="text-xs text-color-foreground-muted text-center">
                  Alle Termine sind 1 Stunde lang
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
