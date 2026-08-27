"use client";

import { FormEvent, useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

type RsvpFormProps = { endpoint: string; method: "POST"; successMessage: string };
type Step = 1 | 2 | 3;

export function RsvpForm({ endpoint, method, successMessage }: RsvpFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", contact: "", attendance: "", companion: "", restrictions: "" });

  const update = (k: keyof typeof formData, v: string) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep((s) => (s + 1) as Step); return; }
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, _subject: "Nueva confirmación RSVP - Michael y Juliana", _language: "es" }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        throw new Error(d?.errors?.[0]?.message ?? "Error al procesar el formulario.");
      }
      setStatus("success");
      setMessage(successMessage);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "No fue posible enviar el formulario.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-title text-2xl text-foreground md:text-3xl">Confirmación recibida</p>
        <p className="max-w-sm text-sm leading-7 text-muted">{message}</p>
      </div>
    );
  }

  const steps = ["Tus datos", "Asistencia", "Mensaje"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs transition-all duration-300 ${i + 1 === step ? "border-gold bg-gold/15 text-gold" : i + 1 < step ? "border-gold/40 bg-gold/10 text-gold/60" : "border-[var(--border)] text-muted/50"}`}>
              {i + 1 < step ? (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (i + 1)}
            </div>
            <span className={`hidden text-[10px] uppercase tracking-[0.2em] sm:block ${i + 1 === step ? "text-gold" : "text-muted/50"}`}>{label}</span>
            {i < steps.length - 1 && <div className={`h-px w-8 transition-all duration-300 ${i + 1 < step ? "bg-gold/40" : "bg-[var(--border)]"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Personal info */}
      {step === 1 && (
        <ScrollReveal direction="fade" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="rsvp-field">
              <span>Nombre completo</span>
              <input required value={formData.name} onChange={(e) => update("name", e.target.value)} className="rsvp-input" placeholder="Tu nombre completo" suppressHydrationWarning />
            </label>
            <label className="rsvp-field">
              <span>Contacto</span>
              <input required value={formData.contact} onChange={(e) => update("contact", e.target.value)} className="rsvp-input" placeholder="Teléfono o correo" suppressHydrationWarning />
            </label>
          </div>
        </ScrollReveal>
      )}

      {/* Step 2: Attendance */}
      {step === 2 && (
        <ScrollReveal direction="fade" className="space-y-4">
          <label className="rsvp-field">
            <span>¿Asistirás?</span>
            <select required value={formData.attendance} onChange={(e) => update("attendance", e.target.value)} className="rsvp-input" suppressHydrationWarning defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              <option value="si">Sí, estaré presente</option>
              <option value="no">No podré asistir</option>
            </select>
          </label>
          <div className="rsvp-field">
            <span className="text-sm text-muted">¿Vienes con acompañante?</span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {["Sin acompañante", "Con acompañante"].map((opt) => {
                const val = opt.startsWith("Sin") ? "sin" : "con";
                return (
                  <button key={opt} type="button" onClick={() => update("companion", val)}
                    className={`rsvp-choice-btn ${formData.companion === val ? "rsvp-choice-active" : ""}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Step 3: Message */}
      {step === 3 && (
        <ScrollReveal direction="fade" className="space-y-4">
          <label className="rsvp-field">
            <span>Restricciones o mensaje para nosotros</span>
            <textarea value={formData.restrictions} onChange={(e) => update("restrictions", e.target.value)} rows={5} className="rsvp-input resize-none" placeholder="Alergias, restricciones alimentarias o un mensaje especial..." suppressHydrationWarning />
          </label>
        </ScrollReveal>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {step > 1 && (
          <button type="button" onClick={() => setStep((s) => (s - 1) as Step)}
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-muted transition hover:border-gold/40 hover:text-foreground">
            Atrás
          </button>
        )}
        <button type="submit" disabled={status === "loading"}
          className="rsvp-submit-btn flex-1 md:flex-none">
          {status === "loading" ? "Enviando..." : step < 3 ? "Continuar" : "Confirmar asistencia"}
        </button>
      </div>

      {status === "error" && <p className="text-sm text-rose-400">{message}</p>}
    </form>
  );
}
