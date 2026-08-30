"use client";

import { FormEvent, useMemo, useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { weddingConfig } from "@/config/weddingConfig";

export type PersonalizedRsvpProps = {
  token: string;
  displayName: string;
  maxAttendees: number;
  allowPlusOne: boolean;
  guestNames: string[];
  existing: {
    attendanceStatus: "attending" | "declined";
    attendeeCount: number;
    selectedGuests: string[];
    plusOneName: string | null;
    dietaryNotes: string | null;
    message: string | null;
  } | null;
};

export function PersonalizedRsvp({
  token,
  displayName,
  maxAttendees,
  allowPlusOne,
  guestNames,
  existing,
}: PersonalizedRsvpProps) {
  const hasNominated = guestNames.length > 0;

  const [attendance, setAttendance] = useState<"attending" | "declined" | "">(
    existing?.attendanceStatus ?? ""
  );
  const [selected, setSelected] = useState<string[]>(existing?.selectedGuests ?? []);
  const [count, setCount] = useState<number>(
    existing?.attendeeCount && existing.attendeeCount > 0 ? existing.attendeeCount : 1
  );
  const [plusOne, setPlusOne] = useState(existing?.plusOneName ?? "");
  const [dietary, setDietary] = useState(existing?.dietaryNotes ?? "");
  const [message, setMessage] = useState(existing?.message ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [editing, setEditing] = useState(existing === null);

  const reservedCopy =
    maxAttendees === 1
      ? "Hemos reservado un lugar especialmente para ti."
      : `Hemos reservado ${maxAttendees} lugares para ustedes.`;

  // Número de asistentes efectivo (para enviar y validar en cliente; el
  // servidor vuelve a validar de todas formas).
  const effectiveCount = useMemo(() => {
    if (attendance !== "attending") return 0;
    if (hasNominated) {
      const base = selected.length || 0;
      const withPlus = allowPlusOne && plusOne.trim() ? base + 1 : base;
      return Math.max(1, Math.min(withPlus || 1, maxAttendees));
    }
    return Math.max(1, Math.min(count, maxAttendees));
  }, [attendance, hasNominated, selected, plusOne, allowPlusOne, count, maxAttendees]);

  const toggleGuest = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      // No permitir marcar más invitados que el cupo.
      if (prev.length >= maxAttendees) return prev;
      return [...prev, name];
    });
  };

  const canShowPlusOne = allowPlusOne && attendance === "attending" && effectiveCount >= 1 &&
    (hasNominated ? selected.length < maxAttendees : count >= 2);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!attendance) {
      setFeedback("Por favor indícanos si podrás acompañarnos.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          attendanceStatus: attendance,
          attendeeCount: effectiveCount,
          selectedGuests: hasNominated ? selected : [],
          plusOneName: canShowPlusOne ? plusOne.trim() : null,
          dietaryNotes: dietary.trim() || null,
          message: message.trim() || null,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error === "invitacion_no_encontrada"
            ? "No pudimos validar esta invitación."
            : "No fue posible guardar tu respuesta. Intenta de nuevo."
        );
      }
      setStatus("success");
      setEditing(false);
      setFeedback(
        attendance === "attending"
          ? "¡Gracias! Tu confirmación fue registrada."
          : "Gracias por avisarnos. Te vamos a extrañar."
      );
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Ocurrió un error.");
    }
  };

  // Vista de respuesta ya registrada (resumen).
  if (!editing && (status === "success" || existing)) {
    const finalStatus = status === "success" ? attendance : existing?.attendanceStatus;
    return (
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] md:rounded-3xl">
        <div className="grid md:grid-cols-[0.8fr_1.2fr]">
          <RsvpInfoPanel displayName={displayName} reservedCopy={reservedCopy} />
          <div className="bg-surface/50 p-8 md:p-10">
            <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p className="font-title text-2xl text-foreground md:text-3xl">
                {finalStatus === "attending" ? "Tu asistencia está confirmada" : "Respuesta registrada"}
              </p>
              <p className="max-w-sm text-sm leading-7 text-muted">
                {feedback || "Tu respuesta ya fue registrada. Puedes actualizarla si lo necesitas."}
              </p>
              <button
                type="button"
                onClick={() => { setEditing(true); setStatus("idle"); }}
                className="rounded-full border border-[var(--border-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] text-gold transition hover:bg-gold/10"
              >
                Actualizar respuesta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] md:rounded-3xl">
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        <RsvpInfoPanel displayName={displayName} reservedCopy={reservedCopy} />

        <div className="bg-surface/50 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Asistencia */}
            <div className="rsvp-field">
              <span>¿Podrás acompañarnos?</span>
              <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setAttendance("attending")}
                  className={`rsvp-choice-btn ${attendance === "attending" ? "rsvp-choice-active" : ""}`}
                >
                  Sí, allí estaré
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("declined")}
                  className={`rsvp-choice-btn ${attendance === "declined" ? "rsvp-choice-active" : ""}`}
                >
                  Esta vez no podré
                </button>
              </div>
            </div>

            {attendance === "attending" && (
              <ScrollReveal direction="fade" className="space-y-5">
                {/* Invitados nominados */}
                {hasNominated ? (
                  <div className="rsvp-field">
                    <span>¿Quiénes nos acompañarán?</span>
                    <div className="grid gap-2 pt-1">
                      {guestNames.map((name) => {
                        const checked = selected.includes(name);
                        const disabled = !checked && selected.length >= maxAttendees;
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => toggleGuest(name)}
                            disabled={disabled}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                              checked
                                ? "border-gold bg-gold/10 text-foreground"
                                : "border-[var(--border)] text-muted hover:border-gold/40 disabled:opacity-40"
                            }`}
                          >
                            <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${checked ? "border-gold bg-gold text-[var(--bg)]" : "border-[var(--border-gold)]"}`}>
                              {checked && (
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                              )}
                            </span>
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : maxAttendees > 1 ? (
                  <div className="rsvp-field">
                    <span>¿Cuántas personas asistirán?</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {Array.from({ length: maxAttendees }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setCount(n)}
                          className={`h-11 w-11 rounded-xl border text-sm transition ${
                            count === n
                              ? "border-gold bg-gold/10 text-foreground"
                              : "border-[var(--border)] text-muted hover:border-gold/40"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <span className="pt-1 text-xs text-muted/70">Máximo {maxAttendees} personas para tu invitación.</span>
                  </div>
                ) : (
                  <p className="rounded-xl border border-[var(--border-gold)]/25 bg-gold/5 px-4 py-3 text-sm text-muted">
                    Tu invitación es para una persona.
                  </p>
                )}

                {/* Plus one */}
                {canShowPlusOne && (
                  <label className="rsvp-field">
                    <span>Nombre de tu acompañante (opcional)</span>
                    <input
                      value={plusOne}
                      onChange={(e) => setPlusOne(e.target.value)}
                      className="rsvp-input"
                      placeholder="Nombre y apellido"
                      suppressHydrationWarning
                    />
                  </label>
                )}

                {/* Dieta */}
                <label className="rsvp-field">
                  <span>Restricciones alimentarias (opcional)</span>
                  <input
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="rsvp-input"
                    placeholder="Alergias o preferencias"
                    suppressHydrationWarning
                  />
                </label>
              </ScrollReveal>
            )}

            {/* Mensaje (siempre disponible) */}
            {attendance && (
              <label className="rsvp-field">
                <span>Un mensaje para nosotros (opcional)</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="rsvp-input resize-none"
                  placeholder="Escríbenos unas palabras..."
                  suppressHydrationWarning
                />
              </label>
            )}

            <button type="submit" disabled={status === "loading"} className="rsvp-submit-btn w-full sm:w-auto">
              {status === "loading" ? "Enviando..." : existing ? "Guardar cambios" : "Enviar confirmación"}
            </button>

            {status === "error" && <p className="text-sm text-rose-400">{feedback}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

function RsvpInfoPanel({ displayName, reservedCopy }: { displayName: string; reservedCopy: string }) {
  return (
    <div className="border-b border-[var(--border)] bg-surface p-8 md:border-b-0 md:border-r md:p-10">
      <p className="section-kicker mb-4">Confirmación</p>
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gold/70">Con cariño, para</p>
      <h2 className="font-title text-3xl leading-tight text-foreground sm:text-4xl">{displayName}</h2>
      <p className="mt-5 text-sm leading-7 text-muted md:text-base md:leading-8">{reservedCopy}</p>
      <div className="mt-8 rounded-xl border border-[var(--border-gold)]/25 bg-gold/5 p-5">
        <p className="mb-1 text-xs uppercase tracking-[0.25em] text-gold/70">El gran día</p>
        <p className="font-title text-2xl text-foreground">{weddingConfig.event.displayDate}</p>
        <p className="mt-1 text-sm text-muted">{weddingConfig.event.time} · {weddingConfig.event.venue}</p>
      </div>
    </div>
  );
}
