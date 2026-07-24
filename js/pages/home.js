/*
  Orion Oeste — Home
  --------------------
  Rellena las secciones dinámicas de index.html a partir de los datos
  centralizados (products.js, campaigns.js, reviews.js, gallery.js).
  Corre de forma síncrona (los <script> de datos ya se ejecutaron antes),
  no depende de que los partials de header/footer estén cargados.
*/

(function () {
  var render = window.ORION.render;
  var products = window.ORION.products || [];
  var categories = window.ORION.categories || [];

  function wrapCarouselItem(html) {
    return '<div class="carousel__item" data-reveal>' + html + "</div>";
  }

  function renderCategories() {
    var track = document.getElementById("category-track");
    if (!track) return;
    track.innerHTML = categories.map(render.categoryCardHTML).map(wrapCarouselItem).join("");
    if (window.ORION.reveal) window.ORION.reveal.init(track);
  }

  /* =========================================================
     Juguetes destacados — ToyCard / ExploreToysCard
     -----------------------------------------------------------
     Componente propio de esta sección (no usa render.productCardHTML,
     que sigue mostrando precio y se comparte con el catálogo). Nunca
     muestra precio: la sección es una vidriera, no un listado técnico.
     ========================================================= */
  var TOY_FAVORITES_KEY = "orion:toyFavorites";

  function getToyFavorites() {
    try {
      return JSON.parse(window.localStorage.getItem(TOY_FAVORITES_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function isToyFavorite(slug) {
    return getToyFavorites().indexOf(slug) > -1;
  }

  // Favorito 100% local (localStorage), sin backend: no se guarda ni
  // envía a ningún lado, es solo una preferencia visual del navegador.
  function toggleToyFavorite(slug) {
    var favs = getToyFavorites();
    var idx = favs.indexOf(slug);
    if (idx > -1) {
      favs.splice(idx, 1);
    } else {
      favs.push(slug);
    }
    try {
      window.localStorage.setItem(TOY_FAVORITES_KEY, JSON.stringify(favs));
    } catch (e) {
      /* localStorage no disponible: el corazón sigue siendo usable, solo no persiste. */
    }
    return idx === -1;
  }

  var TOY_AVAILABILITY = {
    in_stock: { text: "Disponible", cls: "" },
    low_stock: { text: "Disponible", cls: "" },
    on_request: { text: "Consultar disponibilidad", cls: "toy-card__availability--pending" },
    out_of_stock: { text: "Sin stock", cls: "toy-card__availability--pending" },
  };

  function toyBadgeClass(tag) {
    if (tag === "Nuevo") return "toy-card__badge--nuevo";
    if (tag === "Para regalar") return "toy-card__badge--regalar";
    return ""; // "Favorito" y por defecto: naranja principal.
  }

  function toyCardHTML(product) {
    var badge = product.tags && product.tags[0]
      ? '<span class="toy-card__badge ' + toyBadgeClass(product.tags[0]) + '">' + product.tags[0] + "</span>"
      : "";
    var avail = TOY_AVAILABILITY[product.availability] || TOY_AVAILABILITY.in_stock;
    var ageText = product.ageRange ? "Edad recomendada: " + product.ageRange : "Edad recomendada: consultar";
    var waHref = window.ORION.whatsapp ? window.ORION.whatsapp.linkForProduct(product.name) : "#";
    // imageFit "contain" es para PNGs con transparencia (se define por
    // producto en products.js); por defecto "cover", como el resto.
    var isContain = product.imageFit === "contain";
    var mediaClass = "toy-card__media" + (isContain ? " toy-card__media--contain" : "");
    var mediaStyle = isContain && product.imageBg ? ' style="--toy-media-bg:' + product.imageBg + '"' : "";
    var favPressed = isToyFavorite(product.slug);
    var favLabel = (favPressed ? "Quitar " : "Marcar ") + product.name + (favPressed ? " de favoritos" : " como favorito");

    return (
      '<article class="toy-card carousel__item toy-carousel__item" data-reveal role="listitem">' +
      '<div class="' + mediaClass + '"' + mediaStyle + ">" +
      badge +
      '<button type="button" class="toy-card__favorite" data-toy-favorite="' + product.slug + '" aria-pressed="' + (favPressed ? "true" : "false") + '" aria-label="' + favLabel + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z"/></svg>' +
      "</button>" +
      '<a class="stretched-link" href="#" data-quickview="' + product.slug + '" aria-label="Vista rápida de ' + product.name + '"></a>' +
      '<img src="' + product.image + '" alt="' + (product.imageAlt || product.name) + '" loading="lazy" onerror="ORION.onImgError(this)" />' +
      render.mediaPlaceholderHTML(product.name, render.categoryIcon(product.category)) +
      "</div>" +
      '<div class="toy-card__body">' +
      '<span class="toy-card__category">' + render.categoryLabel(product.category) + (product.subcategory ? " · " + product.subcategory : "") + "</span>" +
      '<h3 class="toy-card__name"><a href="#" data-quickview="' + product.slug + '">' + product.name + "</a></h3>" +
      '<p class="toy-card__age">' + ageText + "</p>" +
      '<hr class="toy-card__sep" />' +
      '<p class="toy-card__availability ' + avail.cls + '"><span class="toy-card__dot" aria-hidden="true"></span>' + avail.text + "</p>" +
      '<a class="toy-card__cta" href="' + waHref + '" target="_blank" rel="noopener" aria-label="Consultar por ' + product.name + ' por WhatsApp">Consultar</a>' +
      "</div>" +
      "</article>"
    );
  }

  function toyExploreCardHTML() {
    return (
      '<div class="toy-explore-card carousel__item toy-carousel__item" role="listitem">' +
      '<a class="toy-explore-card__link" href="catalogo.html?categoria=juguetes" aria-label="Explorar todos los juguetes">' +
      '<span class="toy-explore-card__deco" aria-hidden="true">' +
      '<svg style="top:14px;left:14px;width:38px" viewBox="0 0 40 24" fill="#DDEFF6"><path d="M6 18c-3 0-5-2-5-5s2-5 5-5c1-3 4-5 8-5s7 2 8 5c3 0 5 2 5 5s-2 5-5 5Z"/></svg>' +
      '<svg style="top:8px;right:20px;width:18px" viewBox="0 0 24 24" fill="#F9C94B"><path d="m12 2 2.6 5.9L21 9l-4.5 4.3L17.6 20 12 16.9 6.4 20l1.1-6.7L3 9l6.4-1.1Z"/></svg>' +
      '<svg style="bottom:18px;left:16px;width:30px" viewBox="0 0 34 24" fill="none" stroke="#BBDCEB" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20 30 6 20 12l3 8-6-6-6 4Z"/></svg>' +
      '<svg style="bottom:22px;right:14px;width:44px" viewBox="0 0 50 20" fill="none" stroke="#F5B337" stroke-width="1.6" stroke-dasharray="3 5" stroke-linecap="round"><path d="M2 16c10 2 20-10 46-10"/></svg>' +
      '<svg style="bottom:36px;right:8px;width:12px" viewBox="0 0 24 24" fill="#F9C94B"><path d="m12 2 2.6 5.9L21 9l-4.5 4.3L17.6 20 12 16.9 6.4 20l1.1-6.7L3 9l6.4-1.1Z"/></svg>' +
      "</span>" +
      '<span class="toy-explore-card__circle" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>' +
      "</span>" +
      '<p class="toy-explore-card__title">Explorar más juguetes</p>' +
      '<p class="toy-explore-card__desc">Descubrí más opciones para jugar y aprender.</p>' +
      "</a>" +
      "</div>"
    );
  }

  function initToyFavorites(track) {
    track.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-toy-favorite]");
      if (!btn) return;
      e.preventDefault();
      var slug = btn.getAttribute("data-toy-favorite");
      var nowFav = toggleToyFavorite(slug);
      btn.setAttribute("aria-pressed", nowFav ? "true" : "false");
      var product = products.filter(function (p) { return p.slug === slug; })[0];
      var name = product ? product.name : "este juguete";
      btn.setAttribute("aria-label", (nowFav ? "Quitar " : "Marcar ") + name + (nowFav ? " de favoritos" : " como favorito"));
    });
  }

  function renderToys() {
    var track = document.getElementById("toys-track");
    if (!track) return;
    var toys = products
      .filter(function (p) {
        return p.category === "juguetes";
      })
      .slice(0, 4);
    track.innerHTML = toys.map(toyCardHTML).join("") + toyExploreCardHTML();
    initToyFavorites(track);
  }

  /* =========================================================
     Campaña "Vuelta al cole" — BackToSchoolCampaign
     -----------------------------------------------------------
     Todo el contenido sale de window.ORION.activeCampaign
     (js/data/campaigns.js). Cambiar de campaña en el futuro es
     editar ese objeto, no este componente.
     ========================================================= */
  function schoolCategoryCardHTML(cat) {
    return (
      '<a class="school-category-card" href="' + cat.href + '">' +
      icon(cat.icon) +
      "<span>" + cat.label + "</span>" +
      "</a>"
    );
  }

  function schoolBenefitHTML(b) {
    return (
      '<div class="school-benefit">' +
      '<span class="school-benefit__icon" aria-hidden="true">' + icon(b.icon) + "</span>" +
      "<div>" +
      '<p class="school-benefit__title">' + b.title + "</p>" +
      '<p class="school-benefit__desc">' + b.description + "</p>" +
      "</div>" +
      "</div>"
    );
  }

  function icon(name) {
    return window.ORION.icons ? window.ORION.icons.get(name) : "";
  }

  function renderCampaign() {
    var container = document.getElementById("campaign-container");
    var campaign = window.ORION.activeCampaign;
    if (!container || !campaign || !campaign.active) return;

    var waHref = window.ORION.whatsapp ? window.ORION.whatsapp.linkFor(campaign.whatsappAction.waKey) : "#";

    container.innerHTML =
      '<div class="back-to-school-banner" data-reveal>' +
      '<div class="back-to-school-banner__bg" style="background-image:url(\'' + campaign.backgroundImage + '\')" aria-hidden="true">' +
      '<div class="campaign-postit" data-reveal>' +
      '<div>' +
      '<p class="campaign-postit__text">' + campaign.postItText + "</p>" +
      '<svg class="campaign-postit__underline" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M2 6c15-5 70-5 96 1" fill="none" stroke-width="3" stroke-linecap="round"/></svg>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="back-to-school-content">' +
      '<span class="campaign-badge">' + icon("megaphone") + campaign.eyebrow + "</span>" +
      '<h2 id="campaign-title">' + campaign.title + "</h2>" +
      '<p class="back-to-school-content__desc">' + campaign.description + "</p>" +
      '<div class="school-category-grid">' + campaign.categories.map(schoolCategoryCardHTML).join("") + "</div>" +
      '<div class="school-benefits">' + campaign.benefits.map(schoolBenefitHTML).join("") + "</div>" +
      '<div class="school-actions">' +
      '<a class="school-actions__btn school-actions__btn--primary" href="' + campaign.primaryAction.href + '">' +
      campaign.primaryAction.label +
      icon("arrowRight") +
      "</a>" +
      '<a class="school-actions__btn school-actions__btn--whatsapp" href="' + waHref + '" target="_blank" rel="noopener" aria-label="' + campaign.whatsappAction.label + ' sobre la campaña de vuelta al cole">' +
      '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.35.66 4.55 1.8 6.42L4 28l5.68-1.75a11.9 11.9 0 0 0 6.36 1.82h.01c6.63 0 12.03-5.4 12.03-12.03C28.08 9.4 22.68 4 16.04 4Zm0 21.9h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.37 1.04 1.06-3.28-.24-.34a9.86 9.86 0 0 1-1.53-5.29c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.45 9.47-9.31 9.47Z"></path></svg>' +
      campaign.whatsappAction.label +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  function renderBenefits() {
    var grid = document.getElementById("benefits-grid");
    if (!grid) return;
    // Fotos reales de post-it provistas por el cliente. Todavía no hay
    // una 4ª foto distinta, así que por pedido se reutiliza postit_1
    // (naranja) en "Atención personalizada" hasta que la envíen.
    var benefits = [
      { image: "assets/images/brand/postit_1.webp", icon: "pin", title: "Retiro en el local", text: "Comprá y retirá cuando quieras, sin esperas." },
      { image: "assets/images/brand/postit_3.webp", icon: "truck", title: "Entrega a domicilio", text: "Te lo acercamos hasta la puerta de tu casa." },
      { image: "assets/images/brand/postit_2.webp", icon: "variety", title: "Amplia variedad", text: "Librería, juguetería, regalería e impresiones en un solo lugar." },
      { image: "assets/images/brand/postit_1.webp", icon: "heart", title: "Atención personalizada", text: "Te ayudamos a encontrar justo lo que necesitás." },
    ];
    grid.innerHTML = benefits.map(render.postitPhotoHTML).join("");
  }

  var galleryOrder = [];

  function renderGallery() {
    var gallery = window.ORION.gallery || [];
    var mainEl = document.getElementById("gallery-main");
    var stripEl = document.getElementById("gallery-strip");
    if (!mainEl || !stripEl) return;

    var main = gallery.filter(function (g) { return g.main; })[0] || gallery[0];
    var rest = gallery.filter(function (g) { return g !== main; });
    galleryOrder = [main].concat(rest).filter(Boolean);

    if (main) {
      mainEl.innerHTML =
        '<button type="button" class="gallery__trigger" data-gallery-index="0" aria-label="Ampliar foto: ' + main.label + '">' +
        '<img src="' + main.image + '" alt="' + main.label + '" loading="eager" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)" onerror="ORION.onImgError(this)" />' +
        render.mediaPlaceholderHTML(main.label, "image") +
        "</button>";
    }

    stripEl.innerHTML = rest
      .map(function (item, i) {
        return (
          '<div class="gallery__thumb" role="listitem">' +
          '<button type="button" class="gallery__trigger" data-gallery-index="' + (i + 1) + '" aria-label="Ampliar foto: ' + item.label + '">' +
          '<img src="' + item.image + '" alt="' + item.label + '" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="ORION.onImgError(this)" />' +
          render.mediaPlaceholderHTML(item.label, "image") +
          "</button>" +
          "</div>"
        );
      })
      .join("");
  }

  /* =========================================================
     Lightbox de la galería del local
     -----------------------------------------------------------
     Al tocar la foto principal o una miniatura, se agranda sobre un
     fondo oscuro. Cierra con la X, con Escape o tocando afuera de la
     imagen (el backdrop). Reutiliza ORION.menu.createOverlay (foco
     atrapado + bloqueo de scroll), igual que el quickview de producto.
     ========================================================= */
  var lightboxRoot = null;
  var lightboxOverlay = null;

  function buildLightbox() {
    lightboxRoot = document.createElement("div");
    lightboxRoot.className = "gallery-lightbox";
    lightboxRoot.setAttribute("data-open", "false");
    lightboxRoot.setAttribute("role", "dialog");
    lightboxRoot.setAttribute("aria-modal", "true");
    lightboxRoot.setAttribute("aria-label", "Foto ampliada del local");
    lightboxRoot.innerHTML =
      '<div class="gallery-lightbox__backdrop" data-lightbox-backdrop></div>' +
      '<button type="button" class="site-header__icon-btn gallery-lightbox__close" data-lightbox-close aria-label="Cerrar imagen ampliada">' +
      icon("close") +
      "</button>" +
      '<figure class="gallery-lightbox__figure"><img class="gallery-lightbox__img" data-lightbox-img src="" alt="" /></figure>';
    document.body.appendChild(lightboxRoot);

    lightboxOverlay = window.ORION.menu.createOverlay(lightboxRoot);
    lightboxRoot.querySelector("[data-lightbox-backdrop]").addEventListener("click", lightboxOverlay.close);
    lightboxRoot.querySelector("[data-lightbox-close]").addEventListener("click", lightboxOverlay.close);
  }

  function openLightbox(index) {
    var item = galleryOrder[index];
    if (!item) return;
    if (!lightboxRoot) buildLightbox();
    var img = lightboxRoot.querySelector("[data-lightbox-img]");
    img.src = item.image;
    img.alt = item.label;
    lightboxOverlay.open();
  }

  function initGalleryLightbox() {
    var root = document.getElementById("gallery-root");
    if (!root) return;
    root.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-gallery-index]");
      if (!trigger) return;
      openLightbox(Number(trigger.getAttribute("data-gallery-index")));
    });
  }

  /* =========================================================
     Reseñas (Google) — ReviewsSection
     -----------------------------------------------------------
     Resumen (cápsula 4,5 + botón "Ver todas las reseñas") y carrusel
     de tres hojas de papel (assets/images/brand/reseña*.webp) con el
     contenido real superpuesto en HTML. Datos en js/data/reviews.js.
     ========================================================= */
  function renderReviewsSummary() {
    var wrap = document.getElementById("reviews-summary");
    var trust = window.ORION.trust;
    var heroEl = document.getElementById("hero-trust-text");
    if (heroEl && trust) heroEl.textContent = trust.scoreLabel + " · " + trust.countLabel;
    if (!wrap || !trust) return;

    var info = window.ORION.storeInfo;
    // ctaHref es un placeholder explícito (ver js/data/reviews.js) hasta que
    // el cliente confirme el link directo a sus reseñas de Google; mientras
    // tanto se reutiliza el link a Maps ya centralizado en store-info.js.
    var href = trust.ctaHref || (info && info.mapLink) || "#";

    wrap.innerHTML =
      '<div class="rating-pill">' +
      '<span class="rating-pill__score">' + trust.scoreLabel + "</span>" +
      render.starRatingHTML(trust.score, { className: "rating-pill__stars", label: trust.scoreLabel + " de 5 en Google" }) +
      '<span class="rating-pill__count">' + trust.countLabel + "</span>" +
      "</div>" +
      '<a class="google-reviews-btn" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="' + trust.ctaLabel + ' (abre Google Maps en una pestaña nueva)">' +
      '<span class="google-reviews-btn__icon" aria-hidden="true">' + icon("googleG") + "</span>" +
      trust.ctaLabel +
      '<span class="google-reviews-btn__ext" aria-hidden="true">' + icon("externalLink") + "</span>" +
      "</a>";
  }

  function renderReviewsCarousel() {
    var track = document.getElementById("reviews-track");
    var reviews = window.ORION.reviews || [];
    if (!track) return;
    track.innerHTML = reviews.map(function (review, i) { return render.reviewPaperCardHTML(review, i); }).join("");
    if (window.ORION.reveal) window.ORION.reveal.init(track);
  }

  /* =========================================================
     Ubicación, horarios y contacto — VisitSection
     -----------------------------------------------------------
     Todo sale de window.ORION.storeInfo (js/data/store-info.js):
     dirección, horarios, mapEmbedUrl/mapLink ya centralizados —
     nada se repite a mano acá. El estado abierto/cerrado lo llena
     store-status.js (ya contempla el sábado cortado).
     ========================================================= */
  var WA_ICON_SVG =
    '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.35.66 4.55 1.8 6.42L4 28l5.68-1.75a11.9 11.9 0 0 0 6.36 1.82h.01c6.63 0 12.03-5.4 12.03-12.03C28.08 9.4 22.68 4 16.04 4Zm0 21.9h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.37 1.04 1.06-3.28-.24-.34a9.86 9.86 0 0 1-1.53-5.29c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.45 9.47-9.31 9.47Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.08 4.48.71.3 1.26.49 1.69.63.71.22 1.35.19 1.86.12.57-.09 1.75-.71 2-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.35Z"></path></svg>';

  function hoursRowHTML(day, time, closed) {
    return (
      '<div class="hours-row">' +
      icon("calendar") +
      '<span class="hours-row__day">' + day + "</span>" +
      '<span class="hours-row__time' + (closed ? " hours-row__time--closed" : "") + '">' + time + "</span>" +
      "</div>"
    );
  }

  function serviceChipHTML(variant, iconName, label) {
    return (
      '<span class="service-chip service-chip--' + variant + '">' +
      icon(iconName) +
      "<span>" + label + "</span>" +
      "</span>"
    );
  }

  function renderVisitSection() {
    var container = document.getElementById("visit-container");
    var info = window.ORION.storeInfo;
    if (!container || !info) return;

    var waHref = window.ORION.whatsapp ? window.ORION.whatsapp.linkFor("contact") : "#";
    var rings = new Array(7).fill("<span></span>").join("");

    container.innerHTML =
      '<div class="visit-header">' +
      '<div class="visit-header__content">' +
      '<p class="visit-eyebrow">Visitanos</p>' +
      '<h2 class="visit-title" id="contacto-title">' +
      "Ubicación, horarios y contacto" +
      '<svg class="visit-title__underline" viewBox="0 0 210 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9c40-8 130-8 206 2" fill="none" stroke-width="4" stroke-linecap="round"/></svg>' +
      "</h2>" +
      '<p class="visit-desc">' +
      "Te esperamos en nuestra librería para ayudarte a elegir, crear y disfrutar." +
      '<svg class="visit-desc__accent" viewBox="0 0 24 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="14" x2="8" y2="2"/><line x1="10" y1="14" x2="14" y2="4"/><line x1="17" y1="14" x2="20" y2="7"/></svg>' +
      "</p>" +
      "</div>" +
      '<div class="visit-postit" data-reveal>' +
      "<div>" +
      '<p class="visit-postit__text">Estamos en Hurlingham, te esperamos</p>' +
      '<svg class="visit-postit__heart" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z"/></svg>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="visit-columns">' +
      '<div class="notebook-card" data-reveal>' +
      '<span class="notebook-card__rings" aria-hidden="true">' + rings + "</span>" +
      '<h3 class="notebook-card__title">' + icon("clock") + "Horarios de atención</h3>" +
      '<span class="store-status" data-store-status>' +
      '<span class="store-status__dot" aria-hidden="true"></span>' +
      '<span data-store-status-label>Calculando horario…</span>' +
      "</span>" +
      '<div class="hours-list">' +
      hoursRowHTML("Lunes a viernes", "9:00 a 19:00", false) +
      hoursRowHTML("Sábado", "9:00 a 13:00 y 16:00 a 19:00", false) +
      hoursRowHTML("Domingo", "Cerrado", true) +
      "</div>" +
      '<hr class="notebook-card__divider" />' +
      '<h3 class="notebook-card__title">' + icon("wheelchair") + "Servicios y accesibilidad</h3>" +
      '<div class="service-chips">' +
      serviceChipHTML("retiro", "store", "Retiro en el local") +
      serviceChipHTML("entrega", "truck", "Entrega a domicilio") +
      serviceChipHTML("compras", "bag", "Compras en tienda") +
      serviceChipHTML("accesible", "wheelchair", "Entrada accesible") +
      serviceChipHTML("pagos", "nfc", "Pagos NFC") +
      "</div>" +
      "</div>" +
      '<div class="map-card" data-reveal>' +
      '<span class="map-card__clip" aria-hidden="true">' +
      '<svg viewBox="0 0 46 82" fill="none" stroke="#9a8a78" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 8a15 15 0 0 1 15 15v42a9 9 0 0 1-18 0V27a4.5 4.5 0 0 1 9 0v33"/></svg>' +
      "</span>" +
      '<span class="map-card__fold" aria-hidden="true"></span>' +
      '<div class="map-card__header">' +
      '<h3 class="map-card__title">' + icon("pin") + "¿Cómo llegar?</h3>" +
      '<p class="map-card__address">' + info.address.full + "</p>" +
      "</div>" +
      '<div class="map-card__frame">' +
      '<iframe src="' + info.mapEmbedUrl + '" title="Mapa de ubicación de Orion Oeste" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
      '<a class="map-card__open-btn" href="' + info.mapLink + '" target="_blank" rel="noopener noreferrer" aria-label="Abrir la ubicación de Orion Oeste en Google Maps">' +
      icon("map") + "Abrir en Maps" + icon("externalLink") +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="whatsapp-strip" data-reveal>' +
      '<svg class="whatsapp-strip__deco whatsapp-strip__deco--star" viewBox="0 0 24 24" fill="#F5BE38" aria-hidden="true"><path d="m12 2 2.6 5.9L21 9l-4.5 4.3L17.6 20 12 16.9 6.4 20l1.1-6.7L3 9l6.4-1.1Z"/></svg>' +
      '<div class="whatsapp-strip__left">' +
      '<span class="whatsapp-strip__icon" aria-hidden="true">' + WA_ICON_SVG + "</span>" +
      "<div>" +
      '<p class="whatsapp-strip__title">¿Tenés dudas o querés consultar?</p>' +
      '<p class="whatsapp-strip__desc">Escribinos por WhatsApp y te respondemos enseguida.</p>' +
      "</div>" +
      "</div>" +
      '<a class="whatsapp-strip__btn" href="' + waHref + '" target="_blank" rel="noopener" aria-label="Enviar mensaje por WhatsApp a Orion Oeste">' +
      WA_ICON_SVG +
      "Enviar mensaje por WhatsApp" +
      "</a>" +
      "</div>";
  }

  renderCategories();
  renderToys();
  renderCampaign();
  renderBenefits();
  renderGallery();
  initGalleryLightbox();
  renderReviewsSummary();
  renderReviewsCarousel();
  renderVisitSection();
})();
