"use client";

import { FormEvent, useState } from "react";

type RsvpFormProps = {
  endpoint: string;
  method: "POST";
  successMessage: string;
};

export function RsvpForm({ endpoint, method, successMessage }: RsvpFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [companionOption, setCompanionOption] = useState<"con" | "sin" | "">("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const formspreeMessage =
          errorData?.errors?.[0]?.message ?? "No fue posible procesar el formulario.";

        throw new Error(formspreeMessage);
      }

      form.reset();
      setCompanionOption("");
      setStatus("success");
      setMessage(successMessage);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No fue posible enviar el formulario en este momento."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value="Nueva confirmacion RSVP - Michael y Juliana" />
      <input type="hidden" name="_language" value="es" />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <label className="space-y-2 text-sm text-muted">
          <span>Nombre completo</span>
          <input
            name="name"
            required
            suppressHydrationWarning
            className="theme-surface-strong w-full rounded-2xl border px-4 py-3 text-foreground outline-none transition focus:border-gold"
            placeholder="Tu nombre"
          />
        </label>
        <label className="space-y-2 text-sm text-muted">
          <span>Contacto</span>
          <input
            name="contact"
            required
            suppressHydrationWarning
            className="theme-surface-strong w-full rounded-2xl border px-4 py-3 text-foreground outline-none transition focus:border-gold"
            placeholder="Telefono o correo"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <label className="space-y-2 text-sm text-muted">
          <span>Asistencia</span>
          <select
            name="attendance"
            required
            suppressHydrationWarning
            className="theme-surface-strong w-full rounded-2xl border px-4 py-3 text-foreground outline-none transition focus:border-gold"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option value="si">Si, estare presente</option>
            <option value="no">No podre asistir</option>
          </select>
        </label>
        <div className="space-y-2 text-sm text-muted">
          <span>Acompanante</span>
          <input type="hidden" name="guestOption" value={companionOption} />
          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            <button
              type="button"
              onClick={() => setCompanionOption("sin")}
              className={`rounded-2xl border px-3 py-3 text-xs transition sm:px-4 sm:text-sm ${
                companionOption === "sin"
                  ? "border-gold bg-gold/10 text-foreground"
                  : "theme-surface-strong text-muted hover:border-gold/50"
              }`}
            >
              Sin acompanante
            </button>
            <button
              type="button"
              onClick={() => setCompanionOption("con")}
              className={`rounded-2xl border px-3 py-3 text-xs transition sm:px-4 sm:text-sm ${
                companionOption === "con"
                  ? "border-gold bg-gold/10 text-foreground"
                  : "theme-surface-strong text-muted hover:border-gold/50"
              }`}
            >
              Con acompanante
            </button>
          </div>
          <p className="text-xs leading-6 text-muted">
            Esta seleccion permite marcar si la invitacion contempla un acompanante.
          </p>
        </div>
      </div>

      <label className="space-y-2 text-sm text-muted">
        <span>Restricciones o comentarios</span>
        <textarea
          name="restrictions"
          rows={4}
          suppressHydrationWarning
          className="theme-surface-strong w-full rounded-2xl border px-4 py-3 text-foreground outline-none transition focus:border-gold"
          placeholder="Alergias, restricciones alimentarias o un mensaje para nosotros"
        />
      </label>

      <p className="text-xs leading-6 text-muted">
        Nos encantara recibir tu respuesta. Confirmarla aqui nos ayuda a preparar cada detalle con el cuidado que este dia merece.
      </p>

      <button
        type="submit"
        disabled={status === "loading"}
        className="theme-button-primary w-full rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] transition hover:bg-gold hover:text-black disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? "Enviando..." : "Confirma tu asistencia"}
      </button>

      {message ? (
        <p className={`text-sm ${status === "success" ? "text-foreground" : "text-[#8c5c2b]"}`}>{message}</p>
      ) : null}
    </form>
  );
}
