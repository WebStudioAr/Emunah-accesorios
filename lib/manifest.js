(function () {
  "use strict";

  // Link base de WhatsApp (brief). El texto se puede personalizar por producto.
  var WA = "https://wa.me/5491122656110";
  function wa(msg) {
    return WA + "?text=" + encodeURIComponent(msg);
  }

  window.__BRAND__ = {
    name: "Emunah Creaciones",
    tagline: "Accesorios textiles para vos y tu hogar.",
    instagram: "https://www.instagram.com/emunah_creacionescf/",
    instagramHandle: "@emunah_creacionescf",
    location: "Moreno, Buenos Aires",
    whatsapp: {
      base: WA,
      // CTA general
      catalogo: wa("Hola Emunah, quiero consultar por sus productos textiles"),
    },
    wa: wa,

    // Palabras del marquee suave entre secciones
    marquee: [
      "Neceseres", "Mochilas", "Bolsos", "Cartucheras",
      "Antifaces", "Toallones", "Almohadones", "Pedidos personalizados"
    ],

    // Productos (orden de prioridad del brief). El HTML ya los trae escritos;
    // estos datos quedan disponibles por si se quiere enriquecer desde JS.
    products: [
      { id: "neceser",    name: "Neceser",     desc: "Para tus cosméticos y esenciales, prolijo y con onda." },
      { id: "mochila",    name: "Mochilas",    desc: "Cómodas y resistentes para acompañarte cada día." },
      { id: "bolso",      name: "Bolsos",      desc: "Espaciosos y livianos para llevar a todos lados." },
      { id: "cartuchera", name: "Cartucheras", desc: "Organizá útiles y accesorios con estilo." },
      { id: "antifaz",    name: "Antifaces",   desc: "Suaves y delicados para descansar mejor." },
      { id: "toallon",    name: "Toallones",   desc: "Suavidad y diseño para tu rutina." },
      { id: "almohadon",  name: "Almohadones", desc: "El detalle textil que tu hogar estaba esperando." }
    ]
  };
})();
