"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSubmit?: (data: BookingFormData) => void;
  onBack?: () => void;
  className?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
  hasReferral: boolean;
  selectedDate: Date;
  selectedTime: string;
}

export function BookingForm({ selectedDate, selectedTime, onSubmit, onBack, className }: BookingFormProps) {
  const [hasReferral, setHasReferral] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const formattedDate = selectedDate.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data: BookingFormData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      comment: String(formData.get("comment") ?? ""),
      hasReferral,
      selectedDate,
      selectedTime,
    };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit?.(data);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn("border border-color-border p-8 bg-color-background text-center", className)}>
        <div className="mb-4"><svg className="mx-auto h-12 w-12 text-color-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" /></svg></div>
        <h3 className="text-xl font-semibold mb-2">Termin angefragt</h3>
        <p className="text-color-foreground-muted mb-4">Vielen Dank! Ihre Terminanfrage für den {formattedDate} um {selectedTime} Uhr wurde gesendet. Ich melde mich zeitnah bei Ihnen.</p>
         <button type="button" onClick={onBack} className="border-2 border-color-foreground px-6 py-3 font-medium uppercase tracking-widest text-sm hover:bg-color-foreground hover:text-color-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2 transition-colors">Neuen Termin buchen</button>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }} onSubmit={handleSubmit} className={cn("border border-color-border p-6 bg-color-background space-y-6", className)}>
      <div className="border-b border-color-border pb-4 mb-6">
        <p className="text-sm uppercase tracking-wider text-color-foreground-muted mb-1">Ihr Termin</p>
        <p className="font-semibold">{formattedDate}</p>
        <p className="text-color-foreground-muted">{selectedTime} Uhr (1 Stunde)</p>
         <button type="button" onClick={onBack} className="mt-2 text-sm underline text-color-foreground-muted hover:text-color-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2">Anderen Termin wählen</button>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">Ihre Kontaktdaten</h3>
      <div style={{ display: "none" }}><label>Website<input name="website" type="text" autoComplete="off" tabIndex={-1} /></label></div>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">Name *</label>
        <input name="name" id="name" type="text" required minLength={2} className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">E-Mail *</label>
        <input name="email" id="email" type="email" required className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">Telefon *</label>
        <input name="phone" id="phone" type="tel" required className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors" />
      </div>
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-color-accent-highlight transition-colors p-3 -mx-3">
          <input type="checkbox" checked={hasReferral} onChange={(e) => setHasReferral(e.target.checked)} className="h-5 w-5 accent-color-foreground cursor-pointer flex-shrink-0" />
          <span className="text-color-foreground">Ich habe eine ärztliche Verordnung (Rezept)</span>
        </label>
        {!hasReferral && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-l-4 border-color-accent bg-color-accent-highlight p-4">
            <p className="text-sm text-color-foreground"><strong>Hinweis:</strong> Für Physiotherapie-Behandlungen ist in der Regel eine ärztliche Verordnung (Rezept) erforderlich. Bitte bringen Sie diese zum ersten Termin mit. Falls Sie noch keine Verordnung haben, können Sie trotzdem einen Termin buchen – wir klären die Details dann persönlich.</p>
          </motion.div>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="comment" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">Zusätzliche Informationen / Anmerkungen</label>
        <textarea name="comment" id="comment" rows={4} placeholder="z.B. Beschwerden, besondere Wünsche, etc." className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors resize-none" />
      </div>
      <button type="submit" disabled={status === "loading"} className="w-full bg-color-foreground px-6 py-4 font-medium text-color-background hover:bg-color-accent active:bg-color-accent disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-foreground focus-visible:outline-offset-2 transition-colors tracking-tight text-sm uppercase">{status === "loading" ? "Wird gesendet..." : "Termin anfragen"}</button>
    </motion.form>
  );
}
