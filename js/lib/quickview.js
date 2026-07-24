/*
  Orion Oeste — Vista rápida de producto
  ------------------------------------------
  Modal liviano que se arma una sola vez (inyectado en <body>) y se
  reutiliza para cualquier [data-quickview="slug"] de la página, vía
  delegación de eventos. No requiere marcado extra en cada página.

  Incluye selector de cantidad + subtotal y dos acciones:
  - "Agregar al carrito": guarda producto+cantidad en ORION.cart (carrito
    local, sin checkout real — ver js/lib/cart.js y cart-drawer.js).
  - "Consultar producto": abre WhatsApp con un mensaje prearmado
    (incluye la cantidad elegida si es más de una unidad).
*/

window.ORION = window.ORION || {};

(function () {
  var root = null;
  var overlay = null;
  var currentProduct = null;
  var currentQty = 1;

  var AVAILABILITY = {
    in_stock: { text: "Disponible", cls: "is-in" },
    low_stock: { text: "Últimas unidades", cls: "is-in" },
    on_request: { text: "A pedido", cls: "is-out" },
    out_of_stock: { text: "Sin stock", cls: "is-out" },
  };

  function icon(name) {
    return window.ORION.icons ? window.ORION.icons.get(name) : "";
  }

  function build() {
    root = document.createElement("div");
    root.className = "quickview";
    root.setAttribute("data-open", "false");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Vista rápida del producto");
    root.innerHTML =
      '<div class="quickview__backdrop" data-qv-backdrop></div>' +
      '<div class="quickview__panel" data-qv-panel>' +
      '<button type="button" class="site-header__icon-btn quickview__close" data-qv-close aria-label="Cerrar vista rápida">' +
      icon("close") +
      "</button>" +
      '<div class="quickview__content" data-qv-content></div>' +
      "</div>";
    document.body.appendChild(root);

    overlay = window.ORION.menu.createOverlay(root);
    root.querySelector("[data-qv-backdrop]").addEventListener("click", overlay.close);
    root.querySelector("[data-qv-close]").addEventListener("click", overlay.close);

    root.addEventListener("click", function (e) {
      var step = e.target.closest("[data-qv-qty]");
      var addBtn = e.target.closest("[data-qv-add-cart]");
      if (step) {
        var dir = step.getAttribute("data-qv-qty");
        setQty(currentQty + (dir === "inc" ? 1 : -1));
      } else if (addBtn && !addBtn.disabled) {
        addToCart(addBtn);
      }
    });
  }

  function subtotalText(product, qty) {
    var r = window.ORION.render;
    return product.price != null ? r.formatPrice(product.price * qty) : "A consultar";
  }

  function setQty(qty) {
    currentQty = Math.max(1, Math.min(99, qty));
    var valueEl = root.querySelector("[data-qv-qty-value]");
    var subtotalEl = root.querySelector("[data-qv-subtotal]");
    var consultLink = root.querySelector("[data-qv-consult]");
    if (valueEl) valueEl.textContent = currentQty;
    if (subtotalEl) subtotalEl.textContent = subtotalText(currentProduct, currentQty);
    if (consultLink && window.ORION.whatsapp) {
      consultLink.setAttribute("href", window.ORION.whatsapp.linkForProduct(currentProduct.name, currentQty));
    }
  }

  function addToCart(btn) {
    window.ORION.cart.add(currentProduct.slug, currentQty);
    var original = btn.innerHTML;
    btn.classList.add("is-added");
    btn.innerHTML = icon("check") + "¡Agregado al carrito!";
    window.setTimeout(function () {
      btn.classList.remove("is-added");
      btn.innerHTML = original;
    }, 1600);
  }

  function checklistHTML() {
    var items = ["Retiro en el local o entrega a domicilio", "Te asesoramos antes de comprar", "Coordinamos todo por WhatsApp"];
    return (
      '<ul class="quickview__checklist">' +
      items
        .map(function (text) {
          return '<li>' + icon("check") + "<span>" + text + "</span></li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function badgesHTML(product, avail) {
    var r = window.ORION.render;
    var chips = [];
    chips.push('<span class="quickview__badge">' + r.categoryLabel(product.category) + "</span>");
    if (product.subcategory) chips.push('<span class="quickview__badge">' + product.subcategory + "</span>");
    chips.push('<span class="quickview__badge quickview__badge--status ' + avail.cls + '"><span class="quickview__badge-dot"></span>' + avail.text + "</span>");
    return '<div class="quickview__badges">' + chips.join("") + "</div>";
  }

  function infoLineHTML(product) {
    var r = window.ORION.render;
    var parts = ['<span><strong>Categoría:</strong> ' + r.categoryLabel(product.category) + "</span>"];
    if (product.ageRange) parts.push('<span><strong>Edad recomendada:</strong> ' + product.ageRange + "</span>");
    return '<div class="quickview__info-line">' + parts.join("") + "</div>";
  }

  function open(product) {
    if (!root) build();
    var r = window.ORION.render;
    var wa = window.ORION.whatsapp;
    currentProduct = product;
    currentQty = 1;

    var avail = AVAILABILITY[product.availability] || AVAILABILITY.in_stock;
    var isOut = product.availability === "out_of_stock";
    var priceText = product.price != null ? r.formatPrice(product.price) : "Consultar precio";
    var content = root.querySelector("[data-qv-content]");

    content.innerHTML =
      '<div class="quickview__media">' +
      '<span class="quickview__media-badge">' + r.categoryLabel(product.category) + "</span>" +
      '<img src="' + product.image + '" alt="' + product.name + '" onerror="ORION.onImgError(this)" />' +
      r.mediaPlaceholderHTML(product.name, r.categoryIcon(product.category)) +
      "</div>" +
      '<div class="quickview__info-col">' +
      "<h3 class=\"quickview__title\">" + product.name + "</h3>" +
      badgesHTML(product, avail) +
      infoLineHTML(product) +
      "<p class=\"quickview__desc\">" + product.description + "</p>" +
      checklistHTML() +
      '<p class="quickview__price">' + priceText + "</p>" +
      '<div class="quickview__order">' +
      '<div class="quickview__field">' +
      '<span class="quickview__field-label">Cantidad</span>' +
      '<div class="qty-stepper">' +
      '<button type="button" data-qv-qty="dec" aria-label="Quitar una unidad"' + (isOut ? " disabled" : "") + ">" + icon("minus") + "</button>" +
      '<span data-qv-qty-value aria-live="polite">1</span>' +
      '<button type="button" data-qv-qty="inc" aria-label="Agregar una unidad"' + (isOut ? " disabled" : "") + ">" + icon("plus") + "</button>" +
      "</div>" +
      "</div>" +
      '<div class="quickview__field quickview__field--end">' +
      '<span class="quickview__field-label">Subtotal</span>' +
      '<strong data-qv-subtotal>' + subtotalText(product, 1) + "</strong>" +
      "</div>" +
      "</div>" +
      '<div class="quickview__actions">' +
      '<button type="button" class="btn btn--primary" data-qv-add-cart' + (isOut ? " disabled" : "") + ">" + icon("cart") + (isOut ? "Sin stock" : "Agregar al carrito") + "</button>" +
      '<a class="btn btn--secondary" data-qv-consult href="' + wa.linkForProduct(product.name, 1) + '" target="_blank" rel="noopener">' + icon("chat") + "Consultar producto</a>" +
      "</div>" +
      "</div>";

    overlay.open();
  }

  function findProduct(slug) {
    return (window.ORION.products || []).filter(function (p) {
      return p.slug === slug;
    })[0];
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-quickview]");
    if (!trigger) return;
    e.preventDefault();
    var product = findProduct(trigger.getAttribute("data-quickview"));
    if (product) open(product);
  });

  window.ORION.quickview = { open: open };
})();
