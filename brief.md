# Brief — Orion Oeste

> Brief funcional del proyecto, tal como fue provisto por el cliente/agencia. Es la fuente de verdad para contenido, alcance y decisiones de diseño del sitio.

## 1. Instrucción principal

Antes de escribir código:

1. Leé completo el archivo `brief.md`.
2. Analizá el negocio, sus servicios, público, objetivos y dirección visual.
3. Revisá la estructura actual del proyecto, en caso de que ya exista.
4. No borres componentes, configuraciones ni dependencias útiles sin justificación.
5. Creá una propuesta visual con identidad propia, evitando completamente el aspecto de plantilla genérica.
6. Priorizá mobile desde el comienzo. La versión desktop debe ser una evolución de la versión mobile, no al revés.

El resultado debe sentirse como una librería moderna, creativa, juvenil y cercana, pero también profesional, organizada y comercial.
No quiero una estética excesivamente infantil ni una web escolar genérica.

## 2. Sobre el negocio

- **Nombre:** Orion Oeste
- **Rubro:** Librería, impresiones, copiados, juguetería y regalería.
- **Ubicación:** Tte. Gral. Julio Argentino Roca 999, B1686 Hurlingham, Provincia de Buenos Aires.

**Objetivos principales de la web:**

- Mostrar el catálogo completo.
- Generar consultas y ventas.
- Llevar personas al local físico.
- Facilitar consultas por WhatsApp.
- Promocionar juguetes, productos destacados y servicios de impresión.
- Permitir que el usuario encuentre productos de manera rápida.
- Mostrar información clara sobre ubicación, horarios, envíos y retiro.

La web debe funcionar como una combinación entre: sitio institucional, catálogo comercial, canal de consultas y vidriera digital del local.

## 3. Concepto visual central

La fachada de Orion Oeste tiene un elemento muy reconocible: el comercio se encuentra en una esquina y posee un techo o remate que sobresale formando un triángulo naranja vibrante. Ese triángulo es el principal recurso visual e identificador de la nueva marca digital.

Usar el triángulo en: recortes de fondos, separadores entre secciones, máscaras de imágenes, esquinas de cards, patrones gráficos, indicadores del carrusel, botones o flechas, transiciones visuales, detalles decorativos, esquinas dobladas de papel.

No repetir triángulos de forma excesiva. Deben funcionar como un sistema visual reconocible, no como una textura invasiva.

## 4. Paleta de colores

Distribución aproximada: 60% blanco cálido o blanco roto, 25% naranja pastel, 5% naranja vibrante, 10% celeste pastel.

El naranja vibrante debe utilizarse principalmente para: botones importantes, llamadas a la acción, detalles de marca, elementos triangulares, estados activos, indicadores, pequeños acentos. No cubrir toda la web con naranja fuerte.

El celeste pastel debe servir como contraste en: sector de juguetes, etiquetas, fondos secundarios, categorías, detalles gráficos.

Se pueden incorporar pequeñas cantidades de: amarillo crema, grafito suave para textos, gris cálido para bordes y fondos secundarios.

Evitar: rosa como color predominante, gradientes genéricos de startup, neones, colores primarios demasiado saturados, fondos oscuros dominantes, glow excesivo.

## 5. Recursos gráficos de librería

Presentes en toda la experiencia, con equilibrio: post-its, hojas de cuaderno, líneas de papel, subrayados con marcador, lápices, clips, reglas, cinta adhesiva, etiquetas, stickers, sellos, esquinas dobladas, trazos dibujados, formas recortadas de papel, patrones sutiles de lápices/clips/útiles, pequeñas anotaciones manuscritas, separadores similares a pestañas de carpeta.

Deben verse diseñados, limpios y modernos. No quiero: elementos flotando por todos lados, papeles inclinados de manera aleatoria, cards con rotaciones exageradas, dibujos escolares genéricos, sombras grandes y artificiales, texturas que dificulten la lectura, estética de jardín de infantes, recursos visuales diferentes en cada sección sin conexión entre sí.

Las cards tipo post-it deben reservarse principalmente para beneficios, avisos o mensajes cortos. No utilizar post-its para todos los productos.

## 6. Tipografía

Combinación tipográfica moderna, amigable y legible.

- **Principal (títulos):** con personalidad, redondeada o ligeramente geométrica, funciona bien en títulos grandes, transmite creatividad sin parecer infantil.
- **Secundaria (cuerpo):** muy legible, funciona en catálogo/filtros/textos pequeños, buenos pesos tipográficos.
- **Manuscrita:** únicamente para una palabra puntual, una anotación, un subrayado, una etiqueta pequeña, un recurso decorativo. No usar en párrafos, navegación, precios o información importante.

## 7. Arquitectura del sitio

Mínimo: `/` Inicio, `/catalogo`, `/juguetes`, `/impresiones`, `/nosotros`, `/contacto`.

Si la tecnología lo permite, preparar rutas dinámicas: `/producto/[slug]`, `/categoria/[slug]`.

Si falta información para páginas internas completas, dejar arquitectura y componentes preparados.

## 8. Header

Mobile first, compacto y funcional.

**Mobile:** logo, botón de búsqueda, acceso rápido al catálogo, botón/ícono de WhatsApp, menú hamburguesa. No debe ocupar demasiado espacio vertical. El menú desplegable incluye: Inicio, Catálogo, Juguetes, Impresiones, Nosotros, Contacto, Cómo llegar, WhatsApp.

**Desktop:** navegación horizontal completa + detalle visual inferior/lateral inspirado en el triángulo naranja de la fachada. Puede hacerse levemente translúcido al hacer scroll (sin glass excesivo). `position: sticky` o equivalente.

## 9. Hero principal

Mayor impacto visual. Composición editorial inspirada en un escritorio creativo/mesa de librería vista desde arriba: hojas, cuadernos, lápices, marcadores, clips, regla, post-its, algún producto real, un juguete pequeño, formas triangulares naranjas, texturas de papel sutiles. Espacio libre para el texto, sin sobrecargar.

**Copy principal:** "Todo para estudiar, crear, regalar y jugar."
**Texto secundario:** "Librería, juguetería, regalería, impresiones y copiados en Hurlingham."
**CTA principal:** Ver catálogo. **CTA secundario:** Cómo llegar.
**Prueba de confianza:** "4,5 estrellas · Más de 120 reseñas" (estática editable si no hay conexión dinámica).

**Mobile:** texto primero, botones grandes y fáciles de tocar, imagen no debe tapar contenido, sin altura excesiva, negocio entendible en los primeros 5 segundos, elementos importantes en zona segura.

## 10. Accesos rápidos por categoría

Después del hero. Categorías: Escolar, Artística, Oficina, Cuadernos, Escritura, Juguetes, Regalería, Impresiones.

**Mobile:** carrusel horizontal con desplazamiento táctil. Cada acceso puede inspirarse en un elemento de librería (escolar: hoja de cuaderno; artística: recorte/mancha controlada; oficina: carpeta; juguetes: sticker/etiqueta; regalería: tarjeta; impresiones: hoja impresa), todo dentro del mismo sistema visual. Estados hover en desktop y pressed claros en mobile.

## 11. Sección de juguetes destacados

**Título:** "También hay lugar para jugar" (alternativa: "Los favoritos de los más chicos").

Mostrar 6–10 productos de ejemplo. Cada producto: imagen, nombre, categoría, edad recomendada (si existe), precio (si existe), disponibilidad, etiqueta opcional ("Nuevo", "Favorito", "Para regalar"), botón "Consultar". No inventar precios, edades, stock ni nombres reales. Usar placeholders centralizados en un archivo de datos editable cuando falten datos.

**Diseño:** fondo celeste pastel muy suave, detalles naranjas, etiquetas tipo sticker, carrusel táctil en mobile, dos o más productos visibles parcialmente, cards limpias no infantiles, buena jerarquía.

## 12. Introducción al catálogo

La home no contiene el catálogo completo, solo un acceso/vista previa.

**Título:** "Encontrá lo que estás buscando". Incluye buscador grande, botones de filtros rápidos, productos destacados, botón "Ver catálogo completo".

**Filtros rápidos:** Vuelta al cole, Cuadernos, Escritura, Arte, Oficina, Juguetes, Regalos.

El buscador debe ser visualmente protagonista (inspirado en etiqueta de carpeta o barra escrita sobre una hoja).

## 13. Página de catálogo

**Funciones:** búsqueda por nombre, filtros por categoría/subcategoría, ordenamiento, destacados, disponibilidad, etiquetas de novedades, botón de consulta por WhatsApp, vista rápida, URL individual por producto (si la estructura lo permite), botón limpiar filtros, estado vacío de búsqueda, skeletons/estados de carga si corresponde.

**Mobile:** dos columnas cuando el ancho lo permita, una columna en pantallas muy pequeñas, filtros en drawer/bottom sheet, barra de búsqueda visible, botones táctiles ≥44px, no usar sidebar desktop comprimida.

**Datos:** archivo centralizado (`data/products.ts` / `data/products.json` / BD/CMS si existiera). Cada producto: `id`, `slug`, `name`, `category`, `subcategory`, `description`, `price`, `availability`, `featured`, `image`, `tags`, `ageRange` (si corresponde), `whatsappMessage`. No inventar datos comerciales reales; usar datos demo claramente identificados como temporales, preparando el sistema para reemplazo sin tocar componentes.

## 14. Consulta y venta por WhatsApp

**Número:** 011 15-5967-4675. Normalizar correctamente para enlaces de WhatsApp de Argentina.

Mensaje por producto: "Hola, quería consultar por [nombre del producto] que vi en la web de Orion Oeste."

Mensajes específicos para: consulta general, disponibilidad, envíos, retiro en tienda, impresiones, juguetes, productos escolares.

Botón flotante de WhatsApp discreto, que no tape acciones ni contenidos en mobile.

## 15. Sección de impresiones y copiados

**Título:** "Imprimimos eso que necesitás".

**Servicios posibles** (mostrar solo confirmados; dejar estructura preparada si no): impresiones blanco y negro, impresiones a color, fotocopias, anillados, plastificados, trabajos prácticos, documentos.

**Diseño:** inspirado en hoja impresa (bordes de papel, marcas gráficas, sellos, líneas de impresión, botón tipo etiqueta adhesiva).

**CTA:** "Enviar archivo por WhatsApp" → mensaje específico para solicitar impresión. No afirmar que se puede subir archivos desde la web si esa función no está implementada.

## 16. Campaña o temporada

Sección flexible y editable (ej.: Vuelta al cole, Día del Niño, Vacaciones de invierno, Regalos para docentes, Navidad, Inicio de clases, productos de temporada). Cambiable vía archivo de configuración sin rehacer el componente.

**Diseño:** gran composición triangular naranja como fondo/marco. Incluye eyebrow/etiqueta de campaña, título, texto breve, CTA, imagen real o placeholder reemplazable. Evitar llamarla siempre "Promociones".

## 17. Beneficios

Cuatro beneficios: retiro en el local, entrega a domicilio, amplia variedad, atención personalizada.

Diseñar cada uno como post-it diferente: naranja pastel, celeste pastel, amarillo crema, blanco cálido. Pequeñas diferencias de posición permitidas, pero grilla organizada, sin rotación exagerada, no más de cuatro.

## 18. Galería del local

Espacios para: fachada, triángulo naranja del techo, interior, góndolas, sector de juguetes, sector de librería, sector de impresiones, personal atendiendo, productos reales.

**Mobile:** una foto principal + carrusel horizontal secundario, controles táctiles, lightbox si no afecta rendimiento.
**Desktop:** puede ser collage editorial, recortes de papel/cinta/triángulos sutiles, no inclinar todas las fotos.

No usar imágenes generadas por IA como sustituto permanente de fotografías reales del negocio. Placeholders claramente identificables cuando falten fotos.

## 19. Reseñas y confianza

Calificación 4,5, +120 reseñas, dos o tres testimonios, CTA para ver reseñas. No inventar testimonios; si no hay textos reales, usar placeholder "REEMPLAZAR POR RESEÑA REAL". Cards inspiradas en tickets/recibos/fragmentos de papel/notas cortas, buena legibilidad.

## 20. Ubicación, horarios y contacto

Sección prioritaria (objetivo: llevar gente al local).

**Dirección:** Tte. Gral. Julio Argentino Roca 999, B1686 Hurlingham, Provincia de Buenos Aires.

**Horarios:**
- Lunes a viernes: 9:00 a 19:00.
- Sábado: 9:00 a 13:00 y 16:00 a 19:00.
- Domingo: cerrado.

**Información adicional:** entrada accesible para personas en silla de ruedas, entrega a domicilio, retiro en tienda, compras en tienda, servicios en el lugar, visita rápida, pagos móviles NFC, tarjetas de crédito, tarjetas de débito.

**Mobile:** tres botones grandes primero (Cómo llegar, WhatsApp, Llamar), luego estado "Abierto ahora"/"Cerrado" (calculado correctamente, contemplando el horario cortado del sábado, sin depender únicamente del color), horarios, dirección, mapa, servicios y accesibilidad.

## 21. CTA final

Antes del footer.

**Copy:** "¿Buscás algo en particular? Escribinos y te ayudamos a encontrarlo."
**Botones:** Consultar por WhatsApp, Explorar catálogo.

**Diseño:** composición inspirada en hoja de cuaderno grande; el triángulo naranja como esquina doblada, fondo parcial, recorte o flecha hacia el CTA. Se puede agregar lápiz o subrayado animado sin afectar la lectura.

## 22. Footer

Incluir: logo, descripción corta, dirección, horarios resumidos, teléfono, WhatsApp, redes sociales, navegación, métodos de pago, entrega y retiro, accesibilidad, enlaces legales, copyright dinámico.

Fondo naranja pastel, naranja vibrante como remate gráfico. No hacer un footer negro genérico.

## 23. Animaciones e interacciones

Suaves y funcionales: aparición de subrayados, post-its que se acomodan sutilmente, triángulos que revelan imágenes, lápiz que dibuja una línea, categorías con microinteracciones, carruseles táctiles, cambios suaves de color en botones, entrada progresiva de elementos al hacer scroll.

Evitar: parallax excesivo, animaciones constantes, objetos flotando sin propósito, rotaciones grandes, efectos pesados, scroll hijacking, cursores personalizados incómodos, animaciones que retrasen el acceso al catálogo.

Respetar `prefers-reduced-motion`.

## 24. Mobile first

Jerarquía clara, botones grandes, tipografía legible, espaciado cómodo, navegación simple, carruseles táctiles, filtros adaptados, formularios sencillos, no depender de hover, no comprimir diseños desktop, evitar alturas excesivas y textos demasiado largos, mantener CTAs importantes visibles. Revisar anchos 320/360/375/390/430px, y también tablet/laptop/desktop grande. No limitar el diseño a un ancho específico.

## 25. UX y accesibilidad

HTML semántico, ARIA cuando corresponda, navegación por teclado, foco visible, contraste suficiente, textos alternativos, botones con nombres accesibles, formularios con labels, mensajes de error claros, tamaños táctiles adecuados, `prefers-reduced-motion`, jerarquía correcta de títulos, menú mobile accesible, cierre del menú con Escape, bloqueo correcto del scroll al abrir overlays. No esconder textos importantes dentro de imágenes.

## 26. Rendimiento

Imágenes optimizadas, WebP/AVIF, `srcset`/tamaños responsive, lazy loading, carga prioritaria del hero, evitar librerías innecesarias, evitar videos pesados de fondo, evitar filtros CSS costosos, fuentes optimizadas, componentes reutilizables, código limpio, buen puntaje de Lighthouse. No sacrificar rendimiento por animaciones decorativas.

## 27. SEO local

Preparar para búsquedas como: librería en Hurlingham, librería Hurlingham, juguetería en Hurlingham, impresiones en Hurlingham, fotocopias en Hurlingham, útiles escolares en Hurlingham, regalería en Hurlingham, Orion Oeste, librería cerca de mí.

Implementar: títulos/descripciones por página, Open Graph, datos estructurados de negocio local (dirección, horarios, teléfono, coordenadas si están disponibles), sitemap, robots.txt, URLs limpias, textos semánticos, breadcrumbs en categorías/productos. No forzar keywords artificialmente.

## 28. Contenido y datos no disponibles

No inventar: productos reales, precios, stock, marcas, promociones, descuentos, testimonios, fotografías, servicios no confirmados, políticas comerciales, redes sociales, email, logo, envíos fuera de zonas confirmadas.

Cuando falte información: crear placeholder visible, centralizarlo en archivos de datos/configuración, agregar comentario indicando qué debe reemplazarse, no escribir afirmaciones falsas en la interfaz final.

## 29. Sistema de componentes

Construir componentes reutilizables, ejemplo: `Header`, `MobileMenu`, `Hero`, `CategoryScroller`, `SectionHeading`, `ProductCard`, `ProductGrid`, `ProductCarousel`, `SearchBar`, `FilterDrawer`, `PostItCard`, `CampaignBanner`, `PrintServices`, `Gallery`, `ReviewCard`, `StoreStatus`, `LocationSection`, `WhatsAppButton`, `FinalCTA`, `Footer`. Variantes mediante props, no duplicar componentes. Contenido y presentación separados.

## 30. Assets requeridos

Carpeta organizada para reemplazar imágenes fácilmente:

```
public/images/
  brand/
  hero/
  categories/
  products/
  toys/
  store/
  campaigns/
  icons/
```

**Lista de imágenes que debe proveer el cliente:** logo en SVG o PNG transparente, foto de fachada, foto donde se vea el triángulo naranja, fotos interiores, sector de juguetes, sector de librería, sector de impresiones, productos destacados, fotos del equipo, imágenes de campañas, imágenes de cada producto del catálogo.

No generar logos falsos. Si se necesitan placeholders, deben ser neutros y fáciles de localizar.

## 31. Resultado esperado

Web visualmente desarrollada (no wireframe): diseño completo, responsive real, mobile first, navegación funcional, catálogo funcional con datos centralizados, buscador, filtros, carruseles, consultas por WhatsApp, ubicación y horarios, estados interactivos, animaciones sutiles, SEO básico, accesibilidad, componentes reutilizables, código ordenado.

**Debe sentirse:** creativa, juvenil, moderna, cercana, organizada, colorida con control, comercial, propia de Orion Oeste.

**No debe sentirse:** genérica, infantil, saturada, plantilla de ecommerce, juguetería exclusivamente, papelería corporativa fría, web generada automáticamente.

## 32. Proceso de trabajo

1. Analizar `brief.md`.
2. Inspeccionar tecnología y estructura actual.
3. Definir arquitectura y sistema de componentes.
4. Definir tokens de color, tipografía, espaciado, bordes y sombras.
5. Construir primero navegación y home mobile.
6. Crear versiones tablet y desktop.
7. Construir catálogo y filtros.
8. Implementar páginas internas.
9. Agregar animaciones.
10. Revisar accesibilidad.
11. Optimizar rendimiento.
12. Verificar enlaces, rutas y CTAs.
13. Corregir errores de consola.
14. Entregar resumen de lo realizado.

## 33. Informe final

Indicar: archivos creados, archivos modificados, páginas implementadas, cómo se cargan los productos, cómo se cambian categorías/campañas, qué assets faltan reemplazar, qué datos reales faltan confirmar, cómo ejecutar el proyecto, decisiones tomadas para mobile, optimizaciones aplicadas, funciones preparadas para una segunda etapa.

Revisar visualmente que cada sección tenga identidad propia, pero que toda la página conserve un sistema visual coherente basado en: papel, útiles de librería, post-its, lápices, triángulos, naranja, celeste pastel, espacios blancos, fotografías reales del negocio.
