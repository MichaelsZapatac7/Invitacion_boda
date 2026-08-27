import type { Metadata } from "next";
import Link from "next/link";
import { WeddingExperience } from "@/components/wedding-experience";
import { PersonalizedRsvp } from "@/components/personalized-rsvp";
import { getInvitationByToken } from "@/lib/invitations";

// Datos personalizados por invitado: nunca cachear entre peticiones.
export const dynamic = "force-dynamic";

// Las invitaciones son privadas: no indexar en buscadores.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invitation = await getInvitationByToken(token);

  if (!invitation) {
    return <InvalidToken />;
  }

  const { group, guests, rsvp } = invitation;

  return (
    <WeddingExperience
      rsvpSlot={
        <PersonalizedRsvp
          token={group.token}
          displayName={group.display_name}
          maxAttendees={group.max_attendees}
          allowPlusOne={group.allow_plus_one}
          guestNames={guests.map((g) => g.name)}
          existing={
            rsvp
              ? {
                  attendanceStatus: rsvp.attendance_status,
                  attendeeCount: rsvp.attendee_count,
                  selectedGuests: rsvp.selected_guests ?? [],
                  plusOneName: rsvp.plus_one_name,
                  dietaryNotes: rsvp.dietary_notes,
                  message: rsvp.message,
                }
              : null
          }
        />
      }
    />
  );
}

function InvalidToken() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div className="grain-overlay" aria-hidden="true" />
      <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-gold/70">Michael &amp; Juliana</p>
      <h1 className="font-title text-3xl text-foreground sm:text-4xl md:text-5xl">
        No pudimos validar esta invitación
      </h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-8 text-muted sm:text-base">
        Es posible que el enlace esté incompleto o haya cambiado. Si crees que se trata
        de un error, escríbenos y con gusto te compartimos tu invitación de nuevo.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-[var(--border-gold)] px-8 py-3.5 text-[11px] uppercase tracking-[0.28em] text-gold transition hover:bg-gold/10"
      >
        Ver la invitación
      </Link>
    </main>
  );
}
