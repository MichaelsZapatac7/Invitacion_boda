import "server-only";
import {
  getServiceClient,
  isSupabaseConfigured,
  type InvitationData,
  type InvitationGroup,
  type Guest,
  type Rsvp,
} from "./supabase";

/**
 * Lee una invitación por su token interno o por su slug público.
 * Los enlaces existentes con token siguen funcionando, mientras que URLs como
 * /i/anabeiba pueden resolver el mismo grupo mediante public_slug.
 */
export async function getInvitationByToken(
  identifier: string
): Promise<InvitationData | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const normalizedIdentifier = identifier.trim();

  // Mantener compatibilidad total con los enlaces largos ya generados.
  let { data: group, error } = await supabase
    .from("invitation_groups")
    .select("*")
    .eq("token", normalizedIdentifier)
    .maybeSingle();

  // Si no es un token, intentar el alias público legible.
  if (!group && !error) {
    const slugResult = await supabase
      .from("invitation_groups")
      .select("*")
      .eq("public_slug", normalizedIdentifier.toLowerCase())
      .maybeSingle();

    group = slugResult.data;
    error = slugResult.error;
  }

  if (error || !group) return null;

  const [{ data: guests }, { data: rsvp }] = await Promise.all([
    supabase
      .from("guests")
      .select("*")
      .eq("invitation_group_id", group.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("rsvps")
      .select("*")
      .eq("invitation_group_id", group.id)
      .maybeSingle(),
  ]);

  return {
    group: group as InvitationGroup,
    guests: (guests ?? []) as Guest[],
    rsvp: (rsvp ?? null) as Rsvp | null,
  };
}

export type AdminRow = {
  group: InvitationGroup;
  rsvp: Rsvp | null;
};

export type AdminSummary = {
  rows: AdminRow[];
  totals: {
    invitations: number;
    potentialPeople: number;
    confirmedGroups: number;
    declinedGroups: number;
    pendingGroups: number;
    confirmedPeople: number;
  };
};

/** Resumen para el panel de administración. Solo se usa desde el servidor. */
export async function getAdminSummary(): Promise<AdminSummary | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data: groups } = await supabase
    .from("invitation_groups")
    .select("*")
    .order("display_name", { ascending: true });
  const { data: rsvps } = await supabase.from("rsvps").select("*");

  const rsvpByGroup = new Map<string, Rsvp>();
  (rsvps ?? []).forEach((r) => rsvpByGroup.set((r as Rsvp).invitation_group_id, r as Rsvp));

  const rows: AdminRow[] = (groups ?? []).map((g) => ({
    group: g as InvitationGroup,
    rsvp: rsvpByGroup.get((g as InvitationGroup).id) ?? null,
  }));

  const totals = {
    invitations: rows.length,
    potentialPeople: rows.reduce((s, r) => s + r.group.max_attendees, 0),
    confirmedGroups: rows.filter((r) => r.rsvp?.attendance_status === "attending").length,
    declinedGroups: rows.filter((r) => r.rsvp?.attendance_status === "declined").length,
    pendingGroups: rows.filter((r) => !r.rsvp).length,
    confirmedPeople: rows.reduce(
      (s, r) => s + (r.rsvp?.attendance_status === "attending" ? r.rsvp.attendee_count : 0),
      0
    ),
  };

  return { rows, totals };
}

export type SaveRsvpInput = {
  token: string;
  attendanceStatus: "attending" | "declined";
  attendeeCount: number;
  selectedGuests: string[];
  plusOneName?: string | null;
  dietaryNotes?: string | null;
  message?: string | null;
};

export type SaveRsvpResult =
  | { ok: true; rsvp: Rsvp }
  | { ok: false; error: string };

/**
 * Guarda (o actualiza) el RSVP de un grupo aplicando TODAS las reglas en el
 * servidor. No confía en el frontend: aunque manipulen la petición, aquí se
 * recorta el número de asistentes al máximo permitido y se ignora el +1 si el
 * grupo no lo permite.
 */
export async function saveRsvp(input: SaveRsvpInput): Promise<SaveRsvpResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "backend_no_configurado" };
  }
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, error: "backend_no_configurado" };

  const { data: group } = await supabase
    .from("invitation_groups")
    .select("*")
    .eq("token", input.token)
    .maybeSingle();

  if (!group) return { ok: false, error: "invitacion_no_encontrada" };
  const g = group as InvitationGroup;

  let attendeeCount = 0;
  let selectedGuests: string[] = [];
  let plusOneName: string | null = null;
  let status: InvitationGroup["status"];

  if (input.attendanceStatus === "declined") {
    status = "declined";
  } else {
    status = "confirmed";
    // Cupo: entre 1 y el máximo del grupo. Nunca más.
    attendeeCount = Math.max(1, Math.min(input.attendeeCount || 1, g.max_attendees));

    // Invitados nominados: solo se aceptan nombres que pertenecen al grupo.
    if (Array.isArray(input.selectedGuests) && input.selectedGuests.length > 0) {
      const { data: guests } = await supabase
        .from("guests")
        .select("name")
        .eq("invitation_group_id", g.id);
      const validNames = new Set((guests ?? []).map((x) => (x as Guest).name));
      selectedGuests = input.selectedGuests.filter((n) => validNames.has(n)).slice(0, g.max_attendees);
    }

    // Plus one: solo si el grupo lo permite y confirma más de un cupo.
    if (g.allow_plus_one && attendeeCount > 1 && input.plusOneName) {
      plusOneName = input.plusOneName.trim().slice(0, 120) || null;
    }
  }

  const payload = {
    invitation_group_id: g.id,
    attendance_status: input.attendanceStatus,
    attendee_count: attendeeCount,
    selected_guests: selectedGuests,
    plus_one_name: plusOneName,
    dietary_notes: input.dietaryNotes?.toString().slice(0, 500) ?? null,
    message: input.message?.toString().slice(0, 1000) ?? null,
  };

  // Upsert por grupo: una invitación = un RSVP (se actualiza, no se duplica).
  const { data: saved, error } = await supabase
    .from("rsvps")
    .upsert(payload, { onConflict: "invitation_group_id" })
    .select("*")
    .single();

  if (error) return { ok: false, error: "no_se_pudo_guardar" };

  // Reflejar estado en el grupo.
  await supabase.from("invitation_groups").update({ status }).eq("id", g.id);

  return { ok: true, rsvp: saved as Rsvp };
}
