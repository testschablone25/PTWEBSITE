"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { 
  BookingCalendar, 
  getAvailableSlotsForDate,
  type Appointment 
} from "./BookingCalendar";
import { TimeSlotModal } from "./TimeSlotModal";
import { BookingForm, type BookingFormData } from "./BookingForm";

type BookingStep = "calendar" | "form";

interface BookingSectionProps {
  className?: string;
  bleed?: boolean;
}

// ============================================
// MOCK DATA - 10 Appointments in January 2026
// ============================================

// Helper to create dates in January 2026
function januaryDate(day: number): Date {
  return new Date(2026, 0, day); // Month is 0-indexed, so 0 = January
}

// 10 Mock appointments spread across January
const MOCK_APPOINTMENTS: Appointment[] = [
  // January 21 - 2 appointments
  { date: januaryDate(21), time: "09:00", clientName: "Max Mustermann" },
  { date: januaryDate(21), time: "14:00", clientName: "Anna Schmidt" },
  
  // January 22 - FULLY BOOKED (all 8 slots)
  { date: januaryDate(22), time: "09:00", clientName: "Peter Weber" },
  { date: januaryDate(22), time: "10:00", clientName: "Lisa Müller" },
  { date: januaryDate(22), time: "11:00", clientName: "Thomas Braun" },
  { date: januaryDate(22), time: "12:00", clientName: "Sarah Koch" },
  { date: januaryDate(22), time: "14:00", clientName: "Michael Fischer" },
  { date: januaryDate(22), time: "15:00", clientName: "Julia Wagner" },
  { date: januaryDate(22), time: "16:00", clientName: "Stefan Bauer" },
  { date: januaryDate(22), time: "17:00", clientName: "Laura Hoffmann" },
  
  // January 23 - 1 appointment
  { date: januaryDate(23), time: "10:00", clientName: "Christian Schulz" },
  
  // January 24 - 3 appointments
  { date: januaryDate(24), time: "09:00", clientName: "Nina Becker" },
  { date: januaryDate(24), time: "11:00", clientName: "Daniel Meyer" },
  { date: januaryDate(24), time: "15:00", clientName: "Sandra Richter" },
  
  // January 27 - FULLY BOOKED (all 8 slots)
  { date: januaryDate(27), time: "09:00", clientName: "Frank Klein" },
  { date: januaryDate(27), time: "10:00", clientName: "Katharina Wolf" },
  { date: januaryDate(27), time: "11:00", clientName: "Andreas Neumann" },
  { date: januaryDate(27), time: "12:00", clientName: "Melanie Schwarz" },
  { date: januaryDate(27), time: "14:00", clientName: "Markus Zimmermann" },
  { date: januaryDate(27), time: "15:00", clientName: "Claudia Braun" },
  { date: januaryDate(27), time: "16:00", clientName: "Tobias Krüger" },
  { date: januaryDate(27), time: "17:00", clientName: "Sabine Hartmann" },
  
  // January 28 - 2 appointments
  { date: januaryDate(28), time: "12:00", clientName: "Oliver Lehmann" },
  { date: januaryDate(28), time: "16:00", clientName: "Monika Schmitt" },
  
  // January 30 - 2 appointments
  { date: januaryDate(30), time: "09:00", clientName: "Jürgen Werner" },
  { date: januaryDate(30), time: "17:00", clientName: "Birgit Lange" },
];

// Fully booked dates (January 22 and 27)
const FULLY_BOOKED_DATES: Date[] = [
  januaryDate(22),
  januaryDate(27),
];

const transition = {
  duration: 0.4,
  ease: [0.215, 0.61, 0.355, 1] as const,
};

/**
 * BookingSection - Complete appointment booking flow.
 * 
 * Flow:
 * 1. User sees calendar with available dates
 * 2. User clicks a date → TimeSlotModal opens
 * 3. User selects time slot → Modal closes, BookingForm fades in
 * 4. User fills form → Success message
 */
export function BookingSection({ className, bleed = false }: BookingSectionProps) {
  const [step, setStep] = useState<BookingStep>("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use mock data
  const appointments = useMemo(() => MOCK_APPOINTMENTS, []);
  const fullyBookedDates = useMemo(() => FULLY_BOOKED_DATES, []);

  // When user selects a date on the calendar
  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  }, []);

  // When user selects a time from the modal
  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setIsModalOpen(false);
    // Fade to form
    setStep("form");
  }, []);

  // When user wants to go back to calendar
  const handleBack = useCallback(() => {
    setStep("calendar");
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  }, []);

  // When form is submitted
  const handleFormSubmit = useCallback((data: BookingFormData) => {
    console.log("Booking submitted:", data);
    // In production, this would send to an API
  }, []);

  // Get available and booked slots for selected date
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableSlotsForDate(selectedDate, appointments, fullyBookedDates);
  }, [selectedDate, appointments, fullyBookedDates]);



  const innerContent = (
    <>
      <AnimatePresence mode="wait">
        {step === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transition}
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                Termin buchen
              </h3>
              <p className="text-color-foreground-muted">
                Wählen Sie einen verfügbaren Tag aus dem Kalender.
              </p>
            </div>

            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              appointments={appointments}
              fullyBookedDates={fullyBookedDates}
              className="w-full"
            />
          </motion.div>
        )}

        {step === "form" && selectedDate && selectedTime && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transition}
          >
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleFormSubmit}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Slot Modal */}
      <TimeSlotModal
        isOpen={isModalOpen}
        selectedDate={selectedDate ?? null}
        availableSlots={availableSlots}
        onSelectTime={handleTimeSelect}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );

  if (bleed) {
    return (
      <div className="max-w-none -mx-6 sm:-mx-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)]">
        <div className={cn("w-full mx-auto px-6 sm:px-8", className)}>
          {innerContent}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full mx-auto", className)}>
      {innerContent}
    </div>
  );
}
