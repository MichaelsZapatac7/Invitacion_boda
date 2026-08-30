import { NextResponse } from "next/server";
import { saveRsvp, type SaveRsvpInput } from "@/lib/invitations";

export async function POST(request: Request) {
  let body: Partial<SaveRsvpInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "cuerpo_invalido" }, { status: 400 });
  }

  if (!body.token || typeof body.token !== "string") {
    return NextResponse.json({ ok: false, error: "token_requerido" }, { status: 400 });
  }
  if (body.attendanceStatus !== "attending" && body.attendanceStatus !== "declined") {
    return NextResponse.json({ ok: false, error: "estado_invalido" }, { status: 400 });
  }

  const result = await saveRsvp({
    token: body.token,
    attendanceStatus: body.attendanceStatus,
    attendeeCount: Number(body.attendeeCount) || 0,
    selectedGuests: Array.isArray(body.selectedGuests) ? body.selectedGuests : [],
    plusOneName: body.plusOneName ?? null,
    dietaryNotes: body.dietaryNotes ?? null,
    message: body.message ?? null,
  });

  if (!result.ok) {
    const status = result.error === "invitacion_no_encontrada" ? 404 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
