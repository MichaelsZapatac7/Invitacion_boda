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

El formulario actual envía la confirmación al endpoint definido en `weddingConfig.rsvp.endpoint` (hoy una URL de Formspree). También existe un endpoint local de ejemplo en [`src/app/api/rsvp/route.ts`](src/app/api/rsvp/route.ts).

Ese endpoint local es un placeholder funcional para empezar. Puedes adaptarlo para:

- guardar respuestas en una base de datos
- enviar correos
- reenviar datos a un CRM
- integrarlo con Zapier, Make o cualquier backend

Si prefieres Formspree, cambia `weddingConfig.rsvp.endpoint` por tu URL de Formspree y conserva la misma interfaz.

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
