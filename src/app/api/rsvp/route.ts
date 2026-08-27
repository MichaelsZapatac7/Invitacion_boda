import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Placeholder listo para producción inicial:
  // aquí luego puedes guardar en una base de datos,
  // reenviar a un correo o integrar un servicio externo.
  return NextResponse.json({
    ok: true,
    received: body
  });
}
