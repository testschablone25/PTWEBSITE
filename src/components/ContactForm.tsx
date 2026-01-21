"use client";

import { useMemo, useState } from "react";

type Locale = "de" | "en";

type Props = {
  locale: Locale;
};

const SLOT_OPTIONS = [
  "10:00–11:00",
  "11:00–12:00",
  "12:00–13:00",
  "13:00–14:00",
  "14:00–15:00",
  "15:00–16:00",
  "16:00–17:00",
  "17:00–18:00",
] as const;

export function ContactForm({ locale }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const labels = useMemo(() => {
    if (locale === "de") {
      return {
        title: "Anfrage senden",
        kind: "Bereich",
        physio: "Physiotherapie",
        pt: "Personal Training",
        name: "Name",
        email: "E‑Mail",
        message: "Nachricht",
        hasPrescription: "Verordnung vorhanden",
        preferredSlots: "Bevorzugte Zeiten (1h, 10–18)",
        submit: "Absenden",
        success: "Danke! Ich melde mich zeitnah.",
      };
    }

    return {
      title: "Send a request",
      kind: "Service",
      physio: "Physiotherapy",
      pt: "Personal Training",
      name: "Name",
      email: "Email",
      message: "Message",
      hasPrescription: "I have a prescription",
      preferredSlots: "Preferred time slots (1h, 10–18)",
      submit: "Send",
      success: "Thanks! I’ll get back to you shortly.",
    };
  }, [locale]);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError(null);

    const preferredSlots = SLOT_OPTIONS.filter((slot) => formData.getAll("preferredSlots").includes(slot));

    const payload = {
      kind: String(formData.get("kind")) as "physio" | "pt",
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      hasPrescription: formData.get("hasPrescription") === "on",
      preferredSlots,
      locale,
      website: String(formData.get("website") ?? ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(body?.error ?? "Request failed");
      return;
    }

    setStatus("success");
  }

  return (
    <form action={onSubmit} className="space-y-6 border border-color-border p-6 bg-color-background rounded-none">
      <h2 className="text-xl font-semibold tracking-tight">{labels.title}</h2>

      {/* Honeypot */}
      <div style={{ display: "none" }}>
        <label>
          Website
          <input name="website" type="text" autoComplete="off" tabIndex={-1} />
        </label>
      </div>

      <div className="grid gap-2">
        <label htmlFor="kind" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">{labels.kind}</label>
        <select
          name="kind"
          id="kind"
          required
           className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIgMkwwIDZMMiAxMCIgc3Ryb2tlPSIjNEU0QjQ1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_16px_center] bg-no-repeat pr-10 min-h-[44px]"
        >
          <option value="physio">{labels.physio}</option>
          <option value="pt">{labels.pt}</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">{labels.name}</label>
        <input
          name="name"
          id="name"
          type="text"
          required
          minLength={2}
          placeholder=""
          className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">{labels.email}</label>
        <input
          name="email"
          id="email"
          type="email"
          required
          placeholder=""
          className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">{labels.message}</label>
        <textarea
          name="message"
          id="message"
          required
          minLength={10}
          rows={5}
          placeholder=""
          className="w-full border border-color-border bg-color-background-elevated px-4 py-3 text-color-foreground placeholder:text-color-foreground-muted hover:border-color-accent focus:border-color-foreground outline-none transition-colors resize-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer hover:bg-color-accent-highlight transition-colors p-3 -m-3 outline-none focus:bg-color-accent-highlight rounded-none">
        <input name="hasPrescription" type="checkbox" className="h-5 w-5 accent-color-foreground cursor-pointer flex-shrink-0" />
        <span className="text-color-foreground">{labels.hasPrescription}</span>
      </label>

      <div className="grid gap-2">
        <span className="text-sm uppercase tracking-wider text-color-foreground-muted font-medium block">{labels.preferredSlots}</span>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SLOT_OPTIONS.map((slot) => (
            <label
              key={slot}
               className="flex items-center gap-3 border border-color-border px-4 py-3 cursor-pointer hover:border-color-accent hover:bg-color-accent-highlight transition-colors outline-none focus:border-color-accent focus:bg-color-accent-highlight rounded-none min-h-[44px]"
            >
              <input name="preferredSlots" type="checkbox" value={slot} className="h-5 w-5 accent-color-foreground flex-shrink-0" />
              <span className="text-sm text-color-foreground">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-color-foreground px-6 py-4 font-medium text-color-background hover:bg-color-accent active:bg-color-accent disabled:opacity-50 disabled:cursor-not-allowed outline-none transition-colors tracking-tight"
      >
        {labels.submit}
      </button>

      {status === "success" ? (
        <p className="text-sm text-color-foreground">{labels.success}</p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm text-color-foreground bg-color-accent-highlight p-3 border border-color-border">{error ?? "Error"}</p>
      ) : null}
    </form>
  );
}
