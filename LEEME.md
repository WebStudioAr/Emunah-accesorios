# Emunah Creaciones — Landing page

Landing simple, cálida y 100% responsive, lista para subir a hosting. Hecha en HTML/CSS/JS puro: **no necesita instalar nada ni compilar nada**.

---

## 📁 Qué hay en esta carpeta

| Archivo / carpeta | Para qué es |
|---|---|
| `index.html` | La página. Es lo principal. |
| `styles.css` | Los estilos (colores, tipografías, diseño). |
| `main.js` | Las animaciones suaves e interacciones. |
| `lib/` | Librerías de animación (GSAP). No tocar. |
| `assets/` | Imágenes e ícono. Acá van las fotos reales más adelante. |
| `.htaccess` | Configuración de caché para Hostinger (importante, subirlo igual). |
| `tools/` | Solo para desarrollo. **No hace falta subirlo.** |

---

## 🚀 Cómo subirla a internet (Hostinger u otro)

1. Entrá al **Administrador de archivos** de tu hosting (o por FTP).
2. Subí **todo el contenido** de esta carpeta a la carpeta `public_html` (o la raíz de tu dominio).
   - Asegurate de subir también el archivo `.htaccess` (a veces queda oculto).
   - No hace falta subir la carpeta `tools/`.
3. Listo: entrá a tu dominio y ya se ve la página.

> En Netlify o Vercel: arrastrá esta carpeta a la ventana y se publica sola.

---

## 🖼️ Cambiar los dibujos por las fotos reales

Hoy los productos muestran **placeholders elegantes** (bloques de color con un ícono y el cartel "Foto referencial"). Cuando tengas las fotos reales:

**Opción fácil (recomendada):** pasámelas y yo las coloco en su lugar. Ideal: 1 foto por producto, cuadradas o verticales, bien iluminadas.

**Opción manual:** poné las fotos en `assets/img/` (por ejemplo `neceser.jpg`) y reemplazá en `index.html` el bloque del visual del producto por una imagen. Si te animás te paso el paso a paso, pero es más cómodo que lo haga yo.

Lo mismo aplica a la **galería** y a la imagen de la sección "Nosotras".

---

## 🏷️ Agregar el logo

Ahora el nombre está escrito con una tipografía elegante (y hay un monograma "e"). Cuando tengas el logo en buena calidad (PNG con fondo transparente o SVG), pasámelo y lo coloco en el encabezado y el pie de página.

---

## ✅ Cosas que ya están resueltas

- **Botón de WhatsApp** en el encabezado, el hero, los productos, el cierre y un **botón flotante** siempre visible. Todos abren un mensaje listo para enviar.
- Número usado: **+54 9 11 2265-6110**.
- **Instagram** enlazado: @emunah_creacionescf.
- **Envíos a toda Argentina** destacado. Ubicación: Moreno, Buenos Aires (sin mapa, como pediste).
- **Sin carrito de compras** y **sin precios** inventados.
- Preguntas frecuentes, beneficios, galería y sección "Nosotras".
- Se ve excelente en celular y muy bien en PC.

---

## 🔁 Si actualizás la página más adelante

Cuando cambies algún archivo y lo vuelvas a subir, conviene cambiar el numerito de versión en `index.html` (buscá `?v=20260604` y poné la fecha del día, ej. `?v=20260815`). Eso evita que el navegador muestre la versión vieja.

---

¿Dudas o querés ajustar textos, colores o agregar las fotos? Avisame y lo hacemos.
