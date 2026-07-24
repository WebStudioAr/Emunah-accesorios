/*
  Orion Oeste — Campaña de temporada
  -----------------------------------
  Sección editable de la home (sin tocar el componente BackToSchoolCampaign
  en js/pages/home.js). Para cambiar de campaña (Día del Niño, Navidad,
  vacaciones de invierno, regalos para docentes, etc.) alcanza con editar
  este objeto: eyebrow, título, texto, imagen de fondo, post-it, accesos
  rápidos, beneficios y los dos botones.

  backgroundImage: ruta real dentro del proyecto (no hay carpeta
  /assets suelta — las imágenes viven en assets/images/<categoría>/).
  Si el archivo no existe todavía, el fondo cae a un color sólido cálido
  (ver CSS) sin romper el layout.
*/

window.ORION = window.ORION || {};

window.ORION.activeCampaign = {
  active: true,
  eyebrow: "Campaña activa",
  title: "Vuelta al cole en Orion Oeste",
  description:
    "Encontrá todo lo que pide la lista escolar en un solo lugar: cuadernos, lápices, mochilas, librería e impresiones, con el asesoramiento personalizado que necesitás.",
  backgroundImage: "assets/images/brand/vuelta_al_cole_bg.webp",
  backgroundImageAlt: "",
  postItText: "Todo para empezar",

  // Cada acceso apunta a una ruta/categoría que ya existe en el sitio.
  // "Mochilas y cartucheras" no tiene categoría propia en el catálogo
  // (esos productos están dentro de "escolar"), así que comparte esa
  // misma ruta en vez de inventar una categoría nueva.
  categories: [
    { label: "Listas escolares", icon: "clipboard", href: "catalogo.html?categoria=escolar" },
    { label: "Cuadernos y escritura", icon: "notebook", href: "catalogo.html?categoria=cuadernos" },
    { label: "Mochilas y cartucheras", icon: "backpack", href: "catalogo.html?categoria=escolar" },
    { label: "Impresiones y copiados", icon: "print", href: "#impresiones" },
  ],

  benefits: [
    { title: "Retiro en tienda", description: "Rápido y sin esperas", icon: "store" },
    { title: "Entrega a domicilio", description: "En toda la zona", icon: "truck" },
    { title: "Asesoramiento personalizado", description: "Te ayudamos con tu lista", icon: "person" },
  ],

  primaryAction: { label: "Ver productos escolares", href: "catalogo.html?categoria=escolar" },
  whatsappAction: { label: "Consultar por WhatsApp", waKey: "school" },
};
