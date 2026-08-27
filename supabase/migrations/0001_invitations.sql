-- ═══════════════════════════════════════════════════════════════
-- Invitaciones personalizadas — Michael & Juliana
-- Modelo: grupos de invitación con token, invitados nominados y RSVP.
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Grupos de invitación ──────────────────────────────────────
-- Cada enlace /i/{token} corresponde a un grupo (una persona o una familia).
create table if not exists public.invitation_groups (
  id             uuid primary key default gen_random_uuid(),
  token          text not null unique,
  display_name   text not null,                       -- "Familia Rodríguez", "Daniel Gómez"
  max_attendees  integer not null default 1 check (max_attendees between 1 and 20),
  invitation_type text not null default 'individual', -- 'individual' | 'pareja' | 'familia'
  allow_plus_one boolean not null default false,
  status         text not null default 'pending'      -- 'pending' | 'confirmed' | 'declined'
                   check (status in ('pending', 'confirmed', 'declined')),
  created_at     timestamptz not null default now()
);

-- ── Invitados nominados (opcional, para familias) ─────────────
create table if not exists public.guests (
  id                   uuid primary key default gen_random_uuid(),
  invitation_group_id  uuid not null references public.invitation_groups(id) on delete cascade,
  name                 text not null,
  created_at           timestamptz not null default now()
);

create index if not exists guests_group_idx on public.guests(invitation_group_id);

-- ── RSVP: una respuesta por grupo (se actualiza, no se duplica) ─
create table if not exists public.rsvps (
  id                   uuid primary key default gen_random_uuid(),
  invitation_group_id  uuid not null unique
                         references public.invitation_groups(id) on delete cascade,
  attendance_status    text not null check (attendance_status in ('attending', 'declined')),
  attendee_count       integer not null default 0 check (attendee_count >= 0),
  selected_guests      jsonb not null default '[]'::jsonb,  -- nombres de invitados nominados que asisten
  plus_one_name        text,
  dietary_notes        text,
  message              text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists rsvps_group_idx on public.rsvps(invitation_group_id);

-- Mantener updated_at al día.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists rsvps_set_updated_at on public.rsvps;
create trigger rsvps_set_updated_at
  before update on public.rsvps
  for each row execute function public.set_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- SEGURIDAD (RLS)
-- Nadie accede a estas tablas con la clave pública (anon).
-- Todo el acceso ocurre desde el servidor con la clave service_role,
-- que ignora RLS. Así la lista de invitados nunca llega al navegador.
-- ═══════════════════════════════════════════════════════════════
alter table public.invitation_groups enable row level security;
alter table public.guests            enable row level security;
alter table public.rsvps             enable row level security;

-- Sin políticas: el rol anónimo/autenticado no puede leer ni escribir.
-- (service_role omite RLS por diseño.)
