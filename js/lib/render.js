/*
  Orion Oeste — Componentes de render (ProductCard, ProductGrid, PostItCard,
  ReviewCard, CategoryScroller, placeholders de imagen)
  ------------------------------------------------------------------------
  Funciones puras que devuelven HTML a partir de datos. Se usan desde
  js/pages/*.js. Mantener presentación acá, contenido en js/data/*.js.
*/

window.ORION = window.ORION || {};

(function () {
  function icon(name) {
    return window.ORION.icons ? window.ORION.icons.get(name) : "";
  }

  function categoryLabel(slug) {
    var found = (window.ORION.categories || []).filter(function (c) {
      return c.slug === slug;
    })[0];
    return found ? found.label : slug;
  }

  function categoryIcon(slug) {
    var found = (window.ORION.categories || []).filter(function (c) {
      return c.slug === slug;
    })[0];
    return found ? found.icon : "star";
  }

  function formatPrice(price) {
    if (price == null) return null;
    try {
      return price.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
    } catch (e) {
      return "$" + price;
    }
  }

  var AVAILABILITY = {
    in_stock: { text: "Disponible", cls: "product-card__availability--in" },
    low_stock: { text: "Últimas unidades", cls: "product-card__availability--in" },
    on_request: { text: "A pedido", cls: "product-card__availability--out" },
    out_of_stock: { text: "Sin stock", cls: "product-card__availability--out" },
  };

  // Fallback automático: si la imagen del producto no existe todavía
  // (el cliente no la envió), se oculta y aparece un placeholder con
  // ícono + nombre. En cuanto exista el archivo real en esa ruta, se
  // muestra solo, sin tocar ningún componente.
  function onImgError(img) {
    img.style.display = "none";
    var fallback = img.nextElementSibling;
    if (fallback) fallback.hidden = false;
  }
  window.ORION.onImgError = onImgError;

  function mediaPlaceholderHTML(label, iconName) {
    return (
      '<span class="media-placeholder" data-fallback hidden>' +
      '<span class="media-placeholder__icon">' + icon(iconName || "image") + "</span>" +
      "<span>" + label + "</span>" +
      "</span>"
    );
  }

  // imageFit "contain" es para fotos con fondo transparente o composición
  // aislada (se define por producto en products.js); por defecto "cover".
  function productMediaHTML(product) {
    var isContain = product.imageFit === "contain";
    var cls = isContain ? " product-card__img--contain" : "";
    return (
      '<img class="product-card__img' + cls + '" src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="ORION.onImgError(this)" />' +
      mediaPlaceholderHTML(product.name, categoryIcon(product.category))
    );
  }

  function productCardHTML(product, opts) {
    opts = opts || {};
    var badge = product.tags && product.tags[0] ? '<span class="product-card__badge">' + product.tags[0] + "</span>" : "";
    var priceHTML =
      product.price != null
        ? '<span class="product-card__price">' + formatPrice(product.price) + "</span>"
        : '<span class="product-card__price product-card__price--muted">Consultar precio</span>';
    var avail = AVAILABILITY[product.availability] || AVAILABILITY.in_stock;
    var ageHTML = product.ageRange ? '<p class="product-card__meta">Edad recomendada: ' + product.ageRange + "</p>" : "";
    var waHref = window.ORION.whatsapp ? window.ORION.whatsapp.linkForProduct(product.name) : "#";

    return (
      '<article class="product-card tri-corner"' + (opts.reveal ? " data-reveal" : "") + ">" +
      '<div class="product-card__media">' +
      '<a class="stretched-link" href="#" data-quickview="' + product.slug + '" aria-label="Vista rápida de ' + product.name + '"></a>' +
      badge +
      '<button type="button" class="product-card__quickview" data-quickview="' + product.slug + '" aria-label="Vista rápida de ' + product.name + '">' +
      icon("eye") +
      "</button>" +
      productMediaHTML(product) +
      "</div>" +
      '<div class="product-card__body">' +
      '<span class="product-card__category">' + categoryLabel(product.category) + (product.subcategory ? " · " + product.subcategory : "") + "</span>" +
      '<h3 class="product-card__name"><a href="#" data-quickview="' + product.slug + '">' +
      '<span class="product-card__name-text">' + product.name + "</span>" +
      '<svg class="product-card__name-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>' +
      "</a></h3>" +
      ageHTML +
      '<div class="product-card__footer">' +
      priceHTML +
      '<span class="product-card__availability ' + avail.cls + '">' + avail.text + "</span>" +
      "</div>" +
      '<a class="btn btn--primary btn--sm btn--block" href="' + waHref + '" target="_blank" rel="noopener">Consultar</a>' +
      "</div>" +
      "</article>"
    );
  }

  function renderProductGrid(container, products, opts) {
    opts = opts || {};
    if (!container) return;
    if (!products.length) {
      container.innerHTML =
        '<div class="empty-state">' +
        '<span class="empty-state__icon">' + icon("search") + "</span>" +
        "<h3>No encontramos productos</h3>" +
        "<p>Probá con otra búsqueda o limpiá los filtros.</p>" +
        "</div>";
      return;
    }
    container.innerHTML = products
      .map(function (p) {
        return productCardHTML(p, opts);
      })
      .join("");
    if (opts.reveal && window.ORION.reveal) window.ORION.reveal.init(container);
  }

  function skeletonGridHTML(count) {
    var card = '<div class="skeleton-card"><div class="skeleton" style="aspect-ratio:1/1"></div><div style="padding:16px"><div class="skeleton" style="height:14px;width:70%;margin-bottom:8px"></div><div class="skeleton" style="height:14px;width:40%"></div></div></div>';
    return new Array(count || 8).fill(card).join("");
  }

  function categoryCardHTML(cat) {
    return (
      '<a class="category-card carousel__item" href="catalogo.html?categoria=' + cat.slug + '">' +
      '<span class="category-card__icon">' + icon(cat.icon) + "</span>" +
      '<span class="category-card__label">' + cat.label + "</span>" +
      "</a>"
    );
  }

  function postitHTML(opts) {
    return (
      '<div class="postit postit--' + opts.variant + '" data-reveal>' +
      '<span class="postit__icon">' + icon(opts.icon) + "</span>" +
      '<p class="postit__title">' + opts.title + "</p>" +
      '<p class="postit__text">' + opts.text + "</p>" +
      "</div>"
    );
  }

  // Variante con foto real (assets/images/brand/postit_*.webp). opts.image
  // es la ruta a esa foto.
  function postitPhotoHTML(opts) {
    return (
      '<div class="postit-photo" data-reveal>' +
      '<img src="' + opts.image + '" alt="" loading="lazy" />' +
      '<div class="postit-photo__body">' +
      '<span class="postit-photo__icon">' + icon(opts.icon) + "</span>" +
      '<p class="postit-photo__title">' + opts.title + "</p>" +
      '<p class="postit-photo__text">' + opts.text + "</p>" +
      "</div>" +
      "</div>"
    );
  }

  // Calificación con estrellas — dos capas superpuestas (base apagada +
  // relleno naranja recortado por ancho) para poder mostrar fracciones
  // (ej. 4,5) sin depender de un glifo de "media estrella" ni de emojis.
  function starRatingHTML(rating, opts) {
    opts = opts || {};
    var pct = Math.max(0, Math.min(1, rating / 5)) * 100;
    var starIcon = icon("star");
    var row = '<span class="star-rating__row" aria-hidden="true">' + new Array(5).fill(starIcon).join("") + "</span>";
    var label = opts.label || rating + " de 5 estrellas";
    return (
      '<span class="star-rating' + (opts.className ? " " + opts.className : "") + '" role="img" aria-label="' + label + '">' +
      '<span class="star-rating__base">' + row + "</span>" +
      '<span class="star-rating__fill" style="width:' + pct + '%">' + row + "</span>" +
      "</span>"
    );
  }

  // Reseña sobre hoja de papel real (assets/images/brand/reseña*.webp).
  // El HTML de contenido va superpuesto (position:relative, z-index:2);
  // la hoja es solo decoración (alt vacío) y nunca lleva texto adentro.
  function reviewPaperCardHTML(review, index) {
    var verifiedBadge = review.verified
      ? '<span class="review-card__verified" role="img" aria-label="Reseña verificada">' + icon("verifiedBadge") + "</span>"
      : "";
    return (
      '<article class="review-card review-card--' + (index + 1) + '" data-reveal role="listitem">' +
      '<img class="review-card__paper" src="' + review.paperImage + '" alt="" aria-hidden="true" loading="lazy" width="512" height="512" />' +
      '<span class="review-card__quote" aria-hidden="true">&#8221;</span>' +
      '<div class="review-card__content">' +
      '<div class="review-card__panel">' +
      '<div class="review-card__head">' +
      '<span class="review-card__avatar" style="background:' + review.avatarBg + ';color:' + review.avatarFg + '" aria-hidden="true">' + review.initial + "</span>" +
      "<div>" +
      '<h3 class="review-card__name">' + review.name + "</h3>" +
      '<p class="review-card__source">' + review.source + verifiedBadge + "</p>" +
      "</div>" +
      "</div>" +
      starRatingHTML(review.rating, { className: "review-card__stars" }) +
      '<p class="review-card__text">' + review.text + "</p>" +
      '<div class="review-card__footer">' +
      '<span class="review-card__date">' + review.date + "</span>" +
      '<span class="review-card__google-logo" aria-hidden="true">' + icon("googleG") + "</span>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function galleryCellHTML(item, extraClass) {
    return (
      '<div class="gallery__cell' + (extraClass ? " " + extraClass : "") + '">' +
      '<img src="' + item.image + '" alt="' + item.label + '" loading="lazy" onerror="ORION.onImgError(this)" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)" />' +
      mediaPlaceholderHTML(item.label, "image") +
      "</div>"
    );
  }

  window.ORION.render = {
    formatPrice: formatPrice,
    categoryLabel: categoryLabel,
    categoryIcon: categoryIcon,
    productCardHTML: productCardHTML,
    renderProductGrid: renderProductGrid,
    skeletonGridHTML: skeletonGridHTML,
    categoryCardHTML: categoryCardHTML,
    postitHTML: postitHTML,
    postitPhotoHTML: postitPhotoHTML,
    starRatingHTML: starRatingHTML,
    reviewPaperCardHTML: reviewPaperCardHTML,
    galleryCellHTML: galleryCellHTML,
    mediaPlaceholderHTML: mediaPlaceholderHTML,
  };
})();
