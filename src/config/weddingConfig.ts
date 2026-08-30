export type WeddingImage = {
  src: string;
  alt: string;
};

export const weddingConfig = {
  seo: {
    title: "Michael & Juliana | Invitación de boda",
    description:
      "Una invitación de boda elegante, minimalista y lista para compartir con quienes hacen parte de nuestra historia."
  },
  couple: {
    partnerOne: "Michael",
    partnerTwo: "Juliana",
    signature: "Michael & Juliana"
  },
  event: {
    date: "2026-11-14",
    displayDate: "14 de noviembre de 2026",
    // Hora pública de citación que ve el invitado. La ceremonia inicia
    // aproximadamente a las 4:00 p. m., pero pedimos llegar desde las 3:30 p. m.
    time: "3:30 p. m.",
    // Inicio del evento en zona horaria de Colombia (America/Bogota, UTC-5 fijo).
    startDateTime: "2026-11-14T15:30:00-05:00",
    endDateTime: "2026-11-15T01:00:00-05:00",
    venue: "Centro de eventos campestre Inti Raimi (Hacienda Sawa Eventos)",
    address: "kilómetro 1, vía Cali - Puerto Tejada, Cali, Valle del Cauca",
    city: "Cali, Valle del Cauca",
    dressCode: "Todos de negro",
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Centro+de+eventos+campestre+Inti+Raimi+Hacienda+Sawa+Eventos+kilometro+1+via+Cali+Puerto+Tejada+Cali+Valle+del+Cauca&travelmode=driving"
  },
  hero: {
    badge: "14 . 11 . 2026",
    headline: "Hay promesas que no necesitan ruido, solo una fecha para volverse hogar.",
    subheadline:
      "Después de caminos recorridos, de silencios compartidos y de decisiones que se eligieron una y otra vez, encontramos en el otro un lugar donde permanecer. Hoy queremos abrir ese lugar y hacerlo más grande, rodeados de las personas que han sido parte de nuestra historia, de quienes han estado cerca en los momentos simples y en los más significativos. Porque este no es solo un día en el calendario, es el inicio de una etapa que queremos construir con la misma calma, intención y amor con la que hemos llegado hasta aquí."
  },
  introduction: {
    title: "Una invitación nacida del amor tranquilo",
    body:
      "Creemos en los vínculos que se sostienen con ternura, presencia y verdad. Nuestro matrimonio no será un gesto fugaz, sino la confirmación de una historia construida con paciencia, belleza y una profunda gratitud por el camino compartido. Nos emocionaría que nos acompañaras en este día."
  },
  story: {
    title: "Nuestra historia",
    chapters: [
      {
        title: "El inicio",
        text: "Todo comenzó con una conversación sencilla que, sin buscarlo, abrió un espacio de confianza. Desde entonces, descubrimos que había una calma especial en coincidir."
      },
      {
        title: "La elección diaria",
        text: "Con el tiempo entendimos que el amor también se escribe en lo cotidiano: en la paciencia, en la escucha, en los pequeños cuidados y en la alegría de seguir eligiéndonos."
      },
      {
        title: "El nuevo capítulo",
        text: "Ahora damos un paso que honra lo vivido y abraza lo que viene. Queremos celebrar este comienzo rodeados de las personas que han sido luz en nuestra historia."
      }
    ]
  },
  gallery: {
    title: "Fragmentos de nosotros",
    description:
      "Si aún no agregas tus fotos, la galería mostrará composiciones limpias y elegantes sin romper el diseño.",
    images: [
      { src: "/images/hero-main.JPG", alt: "Michael y Juliana en un retrato principal" },
      { src: "/images/couple-1.JPG", alt: "Michael y Juliana compartiendo una mirada" },
      { src: "/images/couple-2.JPG", alt: "Michael y Juliana caminando juntos" },
      { src: "/images/couple-3.JPG", alt: "Michael y Juliana en un momento especial" },
      { src: "/images/couple-4.JPG", alt: "Michael y Juliana celebrando su historia" }
    ] satisfies WeddingImage[]
  },
  music: {
    title: "Nuestra canción",
    trackUrl: "/audio/wedding-song.mp3",
    enabled: true
  },
  details: {
    title: "Detalles del día",
    notes:
      "Hemos imaginado una celebración sobria, luminosa y profundamente íntima. Tu presencia hará parte de ese equilibrio perfecto. Te esperamos desde las 3:30 p. m."
  },
  rsvp: {
    title: "Confirma tu asistencia",
    description:
      "Nos encantaría contar contigo en este día tan especial. Tu presencia es parte esencial de este momento que estamos construyendo juntos.",
    endpoint: "https://formspree.io/f/xpqkwbzw",
    method: "POST" as const,
    successMessage:
      "Gracias por responder. Tu confirmación fue recibida y podremos organizar cada detalle con mayor cuidado."
  },
  calendar: {
    title: "Guarda la fecha",
    description:
      "Reserva este momento en tu calendario y acompáñanos en una celebración pensada para recordar."
  },
  closing: {
    quote:
      "El amor que perdura no se impone; se queda, sostiene y transforma silenciosamente todo lo que toca.",
    farewell:
      "Nos haría muy felices compartir este día contigo y celebrar juntos el comienzo de nuestra vida en matrimonio."
  },
  footer: {
    text: "Con amor, gratitud y la alegría de lo que está por comenzar."
  }
} as const;

export const calendarEventConfig = {
  title: "Boda de Michael y Juliana",
  description:
    "Acompáñanos a celebrar nuestra boda en el Centro de eventos campestre Inti Raimi (Hacienda Sawa Eventos). Nos encantaría compartir contigo este momento.",
  startDateTime: weddingConfig.event.startDateTime,
  endDateTime: weddingConfig.event.endDateTime,
  location:
    "Centro de eventos campestre Inti Raimi (Hacienda Sawa Eventos), kilómetro 1, vía Cali - Puerto Tejada, Cali, Valle del Cauca"
} as const;
