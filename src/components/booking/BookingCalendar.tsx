"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { de } from "date-fns/locale";
import { isBefore, startOfDay, isSameDay } from "date-fns";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

// Types for appointment data
export interface Appointment {
  date: Date;
  time: string;
  clientName: string;
}

export interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  appointments?: Appointment[];
  fullyBookedDates?: Date[];
  className?: string;
}

// All available time slots for a day
const ALL_TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
];

/**
 * BookingCalendar - Brutalist styled calendar using react-day-picker v9.
 * Shows availability, booked slots, and fully booked days.
 */
export function BookingCalendar({
  selectedDate,
  onSelectDate,
  appointments = [],
  fullyBookedDates = [],
  className,
}: BookingCalendarProps) {
  const today = startOfDay(new Date());
  
  // Disable dates in the past, Sundays, and fully booked days
  const disabledDays = [
    { before: today },
    { dayOfWeek: [0] }, // Sunday disabled
    ...fullyBookedDates.map(date => startOfDay(date)),
  ];

  // Check if a date has any available slots
  function hasAvailableSlots(date: Date): boolean {
    if (isBefore(date, today)) return false;
    if (date.getDay() === 0) return false; // Sunday
    if (fullyBookedDates.some(d => isSameDay(d, date))) return false;
    
    const bookedSlotsForDate = appointments
      .filter(apt => isSameDay(apt.date, date))
      .map(apt => apt.time);
    
    return bookedSlotsForDate.length < ALL_TIME_SLOTS.length;
  }

  // Check if date is fully booked
  function isFullyBooked(date: Date): boolean {
    return fullyBookedDates.some(d => isSameDay(d, date));
  }

  // Check if date has some appointments (partially booked)
  function hasAppointments(date: Date): boolean {
    return appointments.some(apt => isSameDay(apt.date, date));
  }

  // Get default class names and extend with brutalist styling
  const defaultClassNames = getDefaultClassNames();
  const classNames = {
    // Preserve default grid layout, only add spacing
    months: cn(defaultClassNames.months),
    month: cn("space-y-4", defaultClassNames.month),
    weekdays: cn(defaultClassNames.weekdays),
    weekday: cn("text-color-foreground-muted font-normal text-xs uppercase tracking-wider", defaultClassNames.weekday),
    week: cn(defaultClassNames.week),
    day: cn("p-0", defaultClassNames.day),
    day_button: cn(
      "w-full aspect-square flex items-center justify-center border-2 border-transparent bg-transparent text-color-foreground text-sm font-medium cursor-pointer hover:border-color-foreground hover:bg-color-accent-highlight transition-none rounded-none",
      defaultClassNames.day_button
    ),
    selected: cn(
      "bg-color-foreground text-color-background border-color-foreground",
      defaultClassNames.selected
    ),
    today: cn("font-bold", defaultClassNames.today),
    disabled: cn("text-color-foreground-muted opacity-30 cursor-not-allowed", defaultClassNames.disabled),
    outside: cn("text-color-foreground-muted opacity-30", defaultClassNames.outside),
  };

  // Inject CSS rule to force calendar months full width
  useEffect(() => {
    const styleId = 'booking-calendar-width-fix';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .rdp-root .rdp-months {
        width: 100% !important;
        max-width: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className={cn("booking-calendar w-full", className)}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        locale={de}
        disabled={disabledDays}
        modifiers={{
          available: (date) => hasAvailableSlots(date),
          fullyBooked: (date) => isFullyBooked(date),
          partiallyBooked: (date) => hasAppointments(date) && !isFullyBooked(date),
        }}
        modifiersClassNames={{
          available: "calendar-available",
          fullyBooked: "calendar-fully-booked",
          partiallyBooked: "calendar-partially-booked",
        }}
        classNames={classNames}
        showOutsideDays={false}
        fixedWeeks
      />

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-color-foreground-muted border-t border-color-border pt-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 border-2 border-color-border bg-color-accent-highlight" />
          <span>Verfügbar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 border-2 border-color-accent bg-color-accent-highlight relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-color-accent -translate-y-1/2" />
          </div>
          <span>Teilweise gebucht</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-color-foreground-muted/20 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-color-foreground rotate-[-45deg]" />
          </div>
          <span>Ausgebucht</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-color-foreground" />
          <span>Ausgewählt</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Get available slots for a specific date, excluding booked ones
 */
export function getAvailableSlotsForDate(
  date: Date,
  appointments: Appointment[],
  fullyBookedDates: Date[]
): string[] {
  // If fully booked, return empty
  if (fullyBookedDates.some(d => isSameDay(d, date))) {
    return [];
  }
  
  const bookedSlots = appointments
    .filter(apt => isSameDay(apt.date, date))
    .map(apt => apt.time);
  
  return ALL_TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));
}

/**
 * Get booked slots for a specific date
 */
export function getBookedSlotsForDate(
  date: Date,
  appointments: Appointment[]
): Appointment[] {
  return appointments.filter(apt => isSameDay(apt.date, date));
}
