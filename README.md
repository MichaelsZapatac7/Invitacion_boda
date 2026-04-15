# Invitacion de boda - Michael & Juliana

Landing page de una sola pagina hecha con Next.js, TypeScript y Tailwind CSS. El proyecto esta preparado para editarse desde una configuracion central y desplegarse facilmente en Vercel.

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Como editar el contenido

Todo el contenido editable vive en [src/config/weddingConfig.ts](/Users/michaelzapata/Repositories/Invitacion_boda_m_j/src/config/weddingConfig.ts).

Desde ese archivo puedes cambiar:

- nombres de los novios
- fecha, hora y lugar
- textos del hero, introduccion, historia y cierre
- configuracion de la galeria
- musica
- enlaces
- configuracion del RSVP
- datos para Google Calendar y archivo `.ics`

La pagina evita hardcodear estos datos dentro de los componentes.

## Fotos

Pon tus imagenes en `public/images/` usando estos nombres:

- `hero-main.jpg`
- `couple-1.jpg`
- `couple-2.jpg`
- `couple-3.jpg`
- `couple-4.jpg`

Si alguna imagen no existe, la UI no se rompe: se muestra un placeholder elegante.

## Musica

Pon la cancion en `public/audio/wedding-song.mp3`.

Si el archivo no existe o falla, el boton mostrara que la musica no esta disponible sin romper la pagina.

## RSVP

El formulario actual apunta a `POST /api/rsvp`.

Archivo relacionado:

- [src/app/api/rsvp/route.ts](/Users/michaelzapata/Repositories/Invitacion_boda_m_j/src/app/api/rsvp/route.ts)

Ese endpoint es un placeholder funcional para empezar. Puedes adaptarlo para:

- guardar respuestas en una base de datos
- enviar correos
- reenviar datos a un CRM
- integrarlo con Zapier, Make o cualquier backend

Si prefieres Formspree, cambia `weddingConfig.rsvp.endpoint` por tu URL de Formspree y conserva la misma interfaz.

## Calendario

La seccion de calendario incluye:

- boton para Google Calendar
- descarga real de un archivo `.ics`

La configuracion del evento esta en `calendarEventConfig` dentro de `src/config/weddingConfig.ts`.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Vercel detectara automaticamente Next.js.
4. Ejecuta el deploy.

No necesitas configuracion especial para el despliegue inicial.

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
