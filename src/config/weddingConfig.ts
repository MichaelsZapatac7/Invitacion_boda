export type WeddingImage = {
  src: string;
  alt: string;
};

export const weddingConfig = {
  seo: {
    title: "Michael & Juliana | Invitacion de boda",
    description:
      "Una invitacion de boda elegante, minimalista y lista para compartir con quienes hacen parte de nuestra historia."
  },
  couple: {
    partnerOne: "Michael",
    partnerTwo: "Juliana",
    signature: "Michael & Juliana"
  },
  event: {
    date: "2026-11-14",
    displayDate: "14 de noviembre de 2026",
    time: "5:00 p. m.",
    startDateTime: "2026-11-14T17:00:00-05:00",
    endDateTime: "2026-11-14T23:59:00-05:00",
    venue: "Sawa Eventos",
    address: "kilometro 1, via Cali - Puerto Tejada, Cali, Valle del Cauca",
    city: "Cali, Valle del Cauca",
    dressCode: "Todos de negro",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sawa+Eventos+kilometro+1+via+Cali+Puerto+Tejada+Cali+Valle+del+Cauca"
  },
  hero: {
    badge: "14 . 11 . 2026",
    headline: "Hay promesas que no necesitan ruido, solo una fecha para volverse hogar.",
    subheadline:
      "Queremos compartir contigo el inicio de una celebracion que nace del amor sereno, de la eleccion diaria y de la alegria de construir juntos."
  },
  introduction: {
    title: "Una invitacion nacida del amor tranquilo",
    body:
      "Creemos en los vinculos que se sostienen con ternura, presencia y verdad. Nuestro matrimonio no sera un gesto fugaz, sino la confirmacion de una historia construida con paciencia, belleza y una profunda gratitud por el camino compartido. Nos emocionaria que nos acompanaras en este dia."
  },
  story: {
    title: "Nuestra historia",
    chapters: [
      {
        title: "El inicio",
        text: "Todo comenzo con una conversacion sencilla que, sin buscarlo, abrio un espacio de confianza. Desde entonces, descubrimos que habia una calma especial en coincidir."
      },
      {
        title: "La eleccion diaria",
        text: "Con el tiempo entendimos que el amor tambien se escribe en lo cotidiano: en la paciencia, en la escucha, en los pequenos cuidados y en la alegria de seguir eligiendonos."
      },
      {
        title: "El nuevo capitulo",
        text: "Ahora damos un paso que honra lo vivido y abraza lo que viene. Queremos celebrar este comienzo rodeados de las personas que han sido luz en nuestra historia."
      }
    ]
  },
  gallery: {
    title: "Fragmentos de nosotros",
    description:
      "Si aun no agregas tus fotos, la galeria mostrara composiciones limpias y elegantes sin romper el diseno.",
    images: [
      { src: "/images/hero-main.jpg", alt: "Michael y Juliana en un retrato principal" },
      { src: "/images/couple-1.jpg", alt: "Michael y Juliana compartiendo una mirada" },
      { src: "/images/couple-2.jpg", alt: "Michael y Juliana caminando juntos" },
      { src: "/images/couple-3.jpg", alt: "Michael y Juliana en un momento especial" },
      { src: "/images/couple-4.jpg", alt: "Michael y Juliana celebrando su historia" }
    ] satisfies WeddingImage[]
  },
  music: {
    title: "Nuestra cancion",
    trackUrl: "/audio/wedding-song.mp3",
    enabled: true
  },
  details: {
    title: "Detalles del dia",
    notes:
      "Hemos imaginado una celebracion sobria, luminosa y profundamente intima. Tu presencia hara parte de ese equilibrio perfecto."
  },
  rsvp: {
    title: "Confirma tu asistencia",
    description:
      "Nos encantaría contar contigo en este día tan especial. Tu presencia es parte esencial de este momento que estamos construyendo juntos.",
    endpoint: "https://formspree.io/f/xpqkwbzw",
    method: "POST" as const,
    successMessage:
      "Gracias por responder. Tu confirmacion fue recibida y podremos organizar cada detalle con mayor cuidado."
  },
  calendar: {
    title: "Guarda la fecha",
    description:
      "Reserva este momento en tu calendario y acompananos en una celebracion pensada para recordar."
  },
  closing: {
    quote:
      "El amor que perdura no se impone; se queda, sostiene y transforma silenciosamente todo lo que toca.",
    farewell:
      "Nos haria muy felices compartir este dia contigo y celebrar juntos el comienzo de nuestra vida en matrimonio."
  },
  footer: {
    text: "Con amor, gratitud y la alegria de lo que esta por comenzar."
  }
} as const;

export const calendarEventConfig = {
  title: "Boda de Michael y Juliana",
  description:
    "Acompananos a celebrar nuestra boda en Sawa Eventos. Nos encantaria compartir contigo este momento.",
  startDateTime: weddingConfig.event.startDateTime,
  endDateTime: weddingConfig.event.endDateTime,
  location:
    "Sawa Eventos, kilometro 1, via Cali - Puerto Tejada, Cali, Valle del Cauca"
} as const;
