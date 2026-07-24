# Assets pendientes — Orion Oeste

Ya están en uso 2 imágenes reales que envió el cliente:

- `assets/images/hero/hero_bg.webp` — fondo del hero (home).
- `assets/images/brand/postit_1.webp`, `postit_2.webp`, `postit_3.webp` —
  fotos de post-it usadas en la sección "Beneficios". Hay 4 beneficios y
  solo 3 fotos distintas: por ahora `postit_1` (naranja) se repite en
  "Atención personalizada" hasta que llegue una 4ª foto (ver abajo).

El resto de las imágenes del sitio **todavía no existen**: el diseño está
preparado para mostrar un **placeholder identificado** (ícono + texto) en
cada lugar donde falta una foto real. En cuanto el archivo exista en la
ruta indicada, aparece automáticamente — no hace falta tocar ningún
componente ni archivo de código.

## Pendiente más próximo: 4ª foto de post-it

`js/pages/home.js` → función `renderBenefits()`: cuando llegue la 4ª foto,
guardarla (por ejemplo `assets/images/brand/postit_4.webp`) y cambiar la
línea del beneficio "Atención personalizada" para que apunte a ese archivo
en vez de reusar `postit_1.webp`.

## Cómo reemplazar una imagen

1. Guardá el archivo real con el mismo nombre (o cambiá el campo `image`
   correspondiente en `js/data/*.js`) dentro de la carpeta indicada.
2. Formatos recomendados: WebP (o JPG si no es posible), buena compresión.
3. Recomendado: fotos cuadradas (1:1) para productos y juguetes, 4:3 u
   horizontal para fotos del local.

## Logo

- `assets/images/brand/logo.svg` (o `.png` transparente) — **no existe
  todavía**. Mientras tanto, el header/footer usan un isotipo triangular
  dibujado en CSS/SVG + el nombre "Orion Oeste" en tipografía de marca,
  para no mostrar un logo inventado.

## Fotos del local (galería — `assets/images/store/`)

Rutas usadas por `js/data/gallery.js`:

| Archivo | Foto necesaria |
|---|---|
| `fachada.jpg` | Fachada del local |
| `triangulo-techo.jpg` | El triángulo naranja del techo (elemento central de marca) |
| `interior.jpg` | Interior del local |
| `gondolas.jpg` | Góndolas |
| `sector-juguetes.jpg` | Sector de juguetes |
| `sector-libreria.jpg` | Sector de librería |
| `sector-impresiones.jpg` | Sector de impresiones |
| `atencion.jpg` | Personal atendiendo |
| `productos.jpg` | Productos reales en exhibición |

## Fotos de campaña (`assets/images/campaigns/`)

- `vuelta-al-cole.jpg` — usada por `js/data/campaigns.js`. Al cambiar de
  campaña, actualizar también esta imagen.

## Fotos de productos (`assets/images/products/`) y juguetes (`assets/images/toys/`)

Cada producto de `js/data/products.js` tiene un campo `image` con la ruta
esperada (18 productos de demostración en total). Todas están vacías hoy.

## Equipo (`assets/images/store/` o `brand/`)

- Foto del equipo para la sección "Nosotros" de `index.html` (actualmente
  un placeholder).

## Íconos

`assets/images/icons/` queda reservada para íconos de marca a futuro; hoy
el sitio usa un set de íconos SVG dibujados a mano en `js/lib/icons.js`
(sin dependencias externas), así que no es necesario cargarla para que el
sitio funcione.
