# Invitación de boda - Michael & Juliana

Landing page de una sola página hecha con Next.js, TypeScript y Tailwind CSS. El proyecto está preparado para editarse desde una configuración central y desplegarse fácilmente en Vercel.

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:3000`.

Para probar desde el móvil puedes exponer el puerto con un túnel temporal:

```bash
npx localtunnel --port 3000
```

Abre el enlace de la respuesta para probar en un dispositivo móvil.

## Cómo editar el contenido

Todo el contenido editable vive en [`src/config/weddingConfig.ts`](src/config/weddingConfig.ts).

Desde ese archivo puedes cambiar:

- nombres de los novios
- fecha, hora y lugar
- textos del hero, introducción, historia y cierre
- configuración de la galería
- música
- enlaces
- configuración del RSVP
- datos para Google Calendar y archivo `.ics`

La página evita escribir estos datos directamente dentro de los componentes.

### Fecha y hora oficial

- **Fecha:** 14 de noviembre de 2026
- **Hora que ve el invitado:** 3:30 p. m. (citación anticipada; la ceremonia inicia alrededor de las 4:00 p. m.)
- **Zona horaria:** America/Bogota (UTC-5). El `startDateTime` se guarda como `2026-11-14T15:30:00-05:00`, de modo que la cuenta regresiva y el calendario funcionan sin depender de la zona horaria del dispositivo.

## Fotos

Pon tus imágenes en `public/images/` usando estos nombres **exactos** (extensión en mayúscula, tal como están en el repositorio):

- `hero-main.JPG`
- `couple-1.JPG`
- `couple-2.JPG`
- `couple-3.JPG`
- `couple-4.JPG`

> ⚠️ **Importante (case sensitivity):** Linux y Vercel distinguen mayúsculas de minúsculas. Las rutas en `weddingConfig.ts` deben coincidir exactamente con el nombre real del archivo (`.JPG`, no `.jpg`). Si cambias la extensión, renombra también el archivo físico.

Si alguna imagen no existe, la interfaz no se rompe: se muestra un placeholder elegante.

## Música

Pon la canción en `public/audio/wedding-song.mp3`.

Si el archivo no existe o falla, el botón mostrará que la música no está disponible sin romper la página. La reproducción se habilita cuando el invitado toca "Abrir invitación" (requisito de autoplay en móviles).

## RSVP

Hay **dos** flujos de confirmación:

1. **General (Formspree):** el formulario de la página pública (`/`) envía a `weddingConfig.rsvp.endpoint` (hoy Formspree). Sirve como respaldo para quien llegue sin enlace personalizado.
2. **Personalizado por grupo (Supabase):** cada invitado recibe un enlace único `/i/{token}` con su nombre, sus cupos reservados y validación real de límites. Es el sistema principal.

### Invitaciones personalizadas (Supabase)

**Modelo de datos** (`supabase/migrations/0001_invitations.sql`):

- `invitation_groups`: un grupo por enlace — `token`, `display_name`, `max_attendees`, `allow_plus_one`, `invitation_type`, `status`.
- `guests`: invitados nominados de un grupo (para familias).
- `rsvps`: **una** respuesta por grupo (se actualiza, no se duplica) — asistencia, número de personas, invitados seleccionados, acompañante, dieta y mensaje.

RLS está activo y **sin políticas públicas**: solo el servidor (clave `service_role`) accede a los datos, así la lista de invitados nunca llega al navegador.

**Puesta en marcha:**

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ejecuta el SQL de `supabase/migrations/0001_invitations.sql` en el editor SQL de Supabase.
3. Copia `.env.example` a `.env.local` y completa:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings → API → `service_role`, **secreto**)
   - `NEXT_PUBLIC_SITE_URL` (tu dominio, para los enlaces)
   - `ADMIN_DASHBOARD_KEY` (clave privada del panel)
4. En Vercel, agrega esas mismas variables de entorno.

Sin estas variables, la app **sigue funcionando**: la página pública usa el formulario de Formspree y los enlaces `/i/{token}` muestran una pantalla elegante de “invitación no válida”.

### Cargar invitados (CSV)

Prepara un CSV como [`scripts/guests.example.csv`](scripts/guests.example.csv):

```csv
displayName,maxAttendees,allowPlusOne,invitationType,guests
Juan Pérez,1,false,individual,
Carlos y Andrea,2,false,pareja,
Familia Rodríguez,4,false,familia,Juan;Laura;Mateo;Sofía
Daniel Gómez,2,true,individual,
```

Impórtalo (genera token + URL de cada invitación; reejecutar es seguro, actualiza en vez de duplicar):

```bash
NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... NEXT_PUBLIC_SITE_URL=https://tu-dominio \
npm run import:guests scripts/guests.example.csv
```

El comando imprime cada enlace `/i/{token}` listo para enviar por WhatsApp.

### Reglas de cupos

- `maxAttendees` limita cuántas personas pueden confirmar. La validación ocurre en el **frontend y el backend**: aunque manipulen la petición, el servidor recorta al máximo permitido.
- `allowPlusOne = true` habilita un campo “Nombre de tu acompañante” cuando el grupo confirma más de un cupo. Si es `false`, no se puede agregar un nombre arbitrario.
- Para familias, `guests` permite marcar exactamente quién asistirá.
- Declinar no pide acompañantes; permite dejar un mensaje.

### Panel de administración

`/admin?key=TU_CLAVE` (usa `ADMIN_DASHBOARD_KEY`). Muestra totales (invitaciones, personas potenciales, confirmados, personas confirmadas, no asisten, pendientes) y la tabla de respuestas con acompañante, dieta y mensaje. Mantén el enlace privado.

### Editar una confirmación

Si el invitado vuelve a abrir su enlace, ve “Tu asistencia está confirmada” con el botón **Actualizar respuesta**. Una invitación = un RSVP.

## Calendario

La sección de calendario incluye:

- botón para Google Calendar
- descarga real de un archivo `.ics`

La configuración del evento está en `calendarEventConfig` dentro de [`src/config/weddingConfig.ts`](src/config/weddingConfig.ts).

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Vercel detectará automáticamente Next.js.
4. Ejecuta el deploy.

No necesitas configuración especial para el despliegue inicial.

## Estructura principal

```text
src/
  app/
    api/rsvp/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
  config/
    weddingConfig.ts
  lib/
    calendar.ts
public/
  audio/
  images/
```
