import type { Metadata } from "next";
import { getAdminSummary } from "@/lib/invitations";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Panel · RSVP" };

const STATUS_LABEL: Record<string, string> = {
  attending: "Confirmado",
  declined: "No asiste",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_DASHBOARD_KEY;

  // Puerta de acceso simple por clave de entorno.
  if (!adminKey || key !== adminKey) {
    return (
      <main className="mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-6">
        <h1 className="font-title text-2xl text-foreground">Panel de invitaciones</h1>
        <p className="mt-3 text-sm text-muted">
          Acceso restringido. Abre este panel con tu clave privada:
          <br />
          <code className="text-gold">/admin?key=TU_CLAVE</code>
        </p>
        {!adminKey && (
          <p className="mt-4 text-xs text-rose-400">
            Falta definir <code>ADMIN_DASHBOARD_KEY</code> en las variables de entorno.
          </p>
        )}
      </main>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-6">
        <h1 className="font-title text-2xl text-foreground">Panel de invitaciones</h1>
        <p className="mt-3 text-sm text-rose-400">
          Supabase no está configurado. Define <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code>.
        </p>
      </main>
    );
  }

  const summary = await getAdminSummary();
  if (!summary) return null;
  const { rows, totals } = summary;

  const stats = [
    { label: "Invitaciones", value: totals.invitations },
    { label: "Personas potenciales", value: totals.potentialPeople },
    { label: "Grupos confirmados", value: totals.confirmedGroups },
    { label: "Personas confirmadas", value: totals.confirmedPeople },
    { label: "No asisten", value: totals.declinedGroups },
    { label: "Pendientes", value: totals.pendingGroups },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-title text-3xl text-foreground">Panel de invitaciones</h1>
      <p className="mt-2 text-sm text-muted">Michael &amp; Juliana · RSVP</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-surface p-4">
            <p className="text-2xl font-light text-foreground">{s.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-surface text-[10px] uppercase tracking-[0.15em] text-muted">
            <tr>
              <th className="p-3">Invitación</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Cupo</th>
              <th className="p-3">Asisten</th>
              <th className="p-3">Acompañante</th>
              <th className="p-3">Dieta</th>
              <th className="p-3">Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ group, rsvp }) => (
              <tr key={group.id} className="border-t border-[var(--border)] align-top">
                <td className="p-3 text-foreground">{group.display_name}</td>
                <td className="p-3">
                  {rsvp ? (
                    <span className={rsvp.attendance_status === "attending" ? "text-gold" : "text-rose-400"}>
                      {STATUS_LABEL[rsvp.attendance_status]}
                    </span>
                  ) : (
                    <span className="text-muted">Pendiente</span>
                  )}
                </td>
                <td className="p-3 text-muted">{group.max_attendees}</td>
                <td className="p-3 text-muted">{rsvp?.attendance_status === "attending" ? rsvp.attendee_count : "—"}</td>
                <td className="p-3 text-muted">{rsvp?.plus_one_name || "—"}</td>
                <td className="p-3 text-muted">{rsvp?.dietary_notes || "—"}</td>
                <td className="p-3 text-muted">{rsvp?.message || "—"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted">
                  Aún no hay invitaciones. Impórtalas con el script de CSV.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
