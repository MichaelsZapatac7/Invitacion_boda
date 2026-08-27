import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para uso EXCLUSIVO en el servidor.
 * Usa la clave service_role (omite RLS), por lo que nunca debe importarse
 * desde componentes de cliente. La lista de invitados jamás llega al navegador.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && serviceRoleKey);

let cached: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (cached) return cached;
  cached = createClient(url as string, serviceRoleKey as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

// ── Tipos del modelo ──────────────────────────────────────────
export type InvitationGroup = {
  id: string;
  token: string;
  display_name: string;
  max_attendees: number;
  invitation_type: string;
  allow_plus_one: boolean;
  status: "pending" | "confirmed" | "declined";
  created_at: string;
};

export type Guest = {
  id: string;
  invitation_group_id: string;
  name: string;
};

export type Rsvp = {
  id: string;
  invitation_group_id: string;
  attendance_status: "attending" | "declined";
  attendee_count: number;
  selected_guests: string[];
  plus_one_name: string | null;
  dietary_notes: string | null;
  message: string | null;
  updated_at: string;
};

export type InvitationData = {
  group: InvitationGroup;
  guests: Guest[];
  rsvp: Rsvp | null;
};
