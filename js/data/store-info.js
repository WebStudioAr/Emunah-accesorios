/*
  Orion Oeste — Información de la tienda
  Único lugar donde se centralizan dirección, horarios, teléfono y datos
  institucionales. Todos los componentes (header, footer, ubicación, JSON-LD)
  leen de acá — no dupliques estos datos en el HTML.
*/

window.ORION = window.ORION || {};

window.ORION.storeInfo = {
  name: "Orion Oeste",
  tagline: "Librería, juguetería, regalería, impresiones y copiados en Hurlingham.",

  address: {
    street: "Tte. Gral. Julio Argentino Roca 999",
    locality: "Hurlingham",
    province: "Buenos Aires",
    postalCode: "B1686",
    country: "Argentina",
    full: "Tte. Gral. Julio Argentino Roca 999, B1686 Hurlingham, Provincia de Buenos Aires",
  },

  // PLACEHOLDER — el cliente no proveyó coordenadas exactas. Reemplazar antes
  // de usarlas en un mapa preciso o en datos estructurados con geo.
  geo: { lat: null, lng: null },

  phone: {
    // Formato provisto por el cliente, tal cual.
    displayLocal: "011 15-5967-4675",
    // Normalizado a formato internacional de WhatsApp Argentina:
    // 54 (país) + 9 (celular) + 11 (área, sin el 0) + 59674675 (número, sin el 15).
    e164: "+5491159674675",
  },

  timezone: "America/Argentina/Buenos_Aires",

  // "ranges" en formato 24hs [inicio, fin]. Sábado con horario cortado.
  hours: [
    { day: "monday", label: "Lunes", ranges: [["09:00", "19:00"]] },
    { day: "tuesday", label: "Martes", ranges: [["09:00", "19:00"]] },
    { day: "wednesday", label: "Miércoles", ranges: [["09:00", "19:00"]] },
    { day: "thursday", label: "Jueves", ranges: [["09:00", "19:00"]] },
    { day: "friday", label: "Viernes", ranges: [["09:00", "19:00"]] },
    { day: "saturday", label: "Sábado", ranges: [["09:00", "13:00"], ["16:00", "19:00"]] },
    { day: "sunday", label: "Domingo", ranges: [] },
  ],

  services: [
    "Retiro en el local",
    "Entrega a domicilio",
    "Compras en tienda",
    "Servicios en el lugar",
    "Visita rápida",
  ],

  accessibility: ["Entrada accesible para personas en silla de ruedas"],

  payments: ["Pagos móviles (NFC)", "Tarjetas de crédito", "Tarjetas de débito"],

  social: {
    instagram: "https://www.instagram.com/OrionOeste",
    facebook: "https://www.facebook.com/orionoeste/",
  },
  email: "info@orionoeste.com.ar",

  mapQuery: "Tte. Gral. Julio Argentino Roca 999, B1686 Hurlingham, Buenos Aires",
};

window.ORION.storeInfo.mapEmbedUrl =
  "https://www.google.com/maps?q=" + encodeURIComponent(window.ORION.storeInfo.mapQuery) + "&output=embed";
window.ORION.storeInfo.mapLink =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(window.ORION.storeInfo.mapQuery);
