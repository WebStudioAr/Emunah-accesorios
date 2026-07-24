/*
  Orion Oeste — Reseñas y confianza
  ----------------------------------
  El puntaje y la cantidad de reseñas fueron indicados por el cliente como
  dato estático editable (no hay conexión dinámica a Google todavía).

  IMPORTANTE — contenido pendiente de confirmación final:
  Los nombres y textos de `window.ORION.reviews` reproducen la referencia
  visual entregada para el rediseño de esta sección. Antes de publicar,
  confirmar con el cliente que corresponden a reseñas reales de Google
  (o reemplazarlos por las reseñas reales que envíe) — no deben quedar
  testimonios inventados presentados como reales en producción.
*/

window.ORION = window.ORION || {};

window.ORION.trust = {
  score: 4.5,
  scoreLabel: "4,5",
  count: 120,
  countLabel: "Más de 120 reseñas en Google",
  ctaLabel: "Ver todas las reseñas",
  // PLACEHOLDER — completar con el link directo al perfil/reseñas de Google
  // Business cuando esté disponible. Mientras tanto se reutiliza el enlace
  // a Google Maps ya centralizado en store-info.js (mapLink).
  ctaHref: null,
};

window.ORION.reviews = [
  {
    id: "review-1",
    name: "María Luján",
    initial: "M",
    avatarBg: "#CFEFAE",
    avatarFg: "#4A9A28",
    rating: 5,
    text: "Excelente atención, tienen de todo y te asesoran siempre con la mejor onda.",
    date: "Hace 2 días",
    source: "Google",
    verified: true,
    paperImage: "assets/images/brand/reseña1.webp",
  },
  {
    id: "review-2",
    name: "Facundo R.",
    initial: "F",
    avatarBg: "#CFE2FC",
    avatarFg: "#3272C5",
    rating: 5,
    text: "Muy buena variedad de productos y precios. Retiro rápido y sin problemas.",
    date: "Hace 1 semana",
    source: "Google",
    verified: true,
    paperImage: "assets/images/brand/reseña2.webp",
  },
  {
    id: "review-3",
    name: "Sofía G.",
    initial: "S",
    avatarBg: "#E4C7F7",
    avatarFg: "#8751B7",
    rating: 5,
    text: "Imprimí trabajos para la facultad y quedaron perfectos. Súper recomendados.",
    date: "Hace 2 semanas",
    source: "Google",
    verified: true,
    paperImage: "assets/images/brand/reseña3.webp",
  },
];
