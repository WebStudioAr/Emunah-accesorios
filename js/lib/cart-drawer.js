/*
  Orion Oeste — Panel de carrito
  ---------------------------------
  Muestra el contenido de ORION.cart (localStorage) y arma el pedido final
  por WhatsApp. Se abre desde el ícono de carrito del header (ver
  [data-cart-open] en el HTML) y también actualiza el contador del header
  cada vez que el carrito cambia (agregar desde el quickview, sacar una
  línea, etc.).
*/

window.ORION = window.ORION || {};

(function () {
  var root = null;
  var overlay = null;

  function icon(name) {
    return window.ORION.icons ? window.ORION.icons.get(name) : "";
  }

  function build() {
    root = document.createElement("div");
    root.className = "cart-drawer";
    root.setAttribute("data-open", "false");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Tu carrito");
    root.innerHTML =
      '<div class="cart-drawer__backdrop" data-cart-backdrop></div>' +
      '<div class="cart-drawer__panel">' +
      '<div class="cart-drawer__head">' +
      "<h2>" + icon("cart") + "Tu carrito</h2>" +
      '<button type="button" class="site-header__icon-btn" data-cart-close aria-label="Cerrar carrito">' + icon("close") + "</button>" +
      "</div>" +
      '<div class="cart-drawer__body" data-cart-body></div>' +
      '<div class="cart-drawer__footer" data-cart-footer></div>' +
      "</div>";
    document.body.appendChild(root);

    overlay = window.ORION.menu.createOverlay(root);
    root.querySelector("[data-cart-backdrop]").addEventListener("click", overlay.close);
    root.querySelector("[data-cart-close]").addEventListener("click", overlay.close);

    root.querySelector("[data-cart-body]").addEventListener("click", function (e) {
      var stepBtn = e.target.closest("[data-cart-step]");
      var removeBtn = e.target.closest("[data-cart-remove]");
      if (stepBtn) {
        var slug = stepBtn.getAttribute("data-cart-step");
        var dir = stepBtn.getAttribute("data-dir");
        var line = window.ORION.cart.getLines().filter(function (l) { return l.product.slug === slug; })[0];
        if (!line) return;
        window.ORION.cart.setQty(slug, line.qty + (dir === "inc" ? 1 : -1));
      } else if (removeBtn) {
        window.ORION.cart.remove(removeBtn.getAttribute("data-cart-remove"));
      }
    });
  }

  function lineHTML(line) {
    var render = window.ORION.render;
    var subtotalText = line.hasPrice ? render.formatPrice(line.subtotal) : "A consultar";
    return (
      '<div class="cart-line">' +
      '<div class="cart-line__media">' +
      '<img src="' + line.product.image + '" alt="' + line.product.name + '" loading="lazy" onerror="ORION.onImgError(this)" />' +
      render.mediaPlaceholderHTML(line.product.name, render.categoryIcon(line.product.category)) +
      "</div>" +
      '<div class="cart-line__body">' +
      '<p class="cart-line__name">' + line.product.name + "</p>" +
      '<p class="cart-line__price">' + (line.hasPrice ? render.formatPrice(line.product.price) + " c/u" : "Consultar precio") + "</p>" +
      '<div class="cart-line__row">' +
      '<div class="qty-stepper qty-stepper--sm">' +
      '<button type="button" data-cart-step="' + line.product.slug + '" data-dir="dec" aria-label="Quitar una unidad de ' + line.product.name + '">' + icon("minus") + "</button>" +
      '<span aria-live="polite">' + line.qty + "</span>" +
      '<button type="button" data-cart-step="' + line.product.slug + '" data-dir="inc" aria-label="Agregar una unidad de ' + line.product.name + '">' + icon("plus") + "</button>" +
      "</div>" +
      '<span class="cart-line__subtotal">' + subtotalText + "</span>" +
      "</div>" +
      "</div>" +
      '<button type="button" class="cart-line__remove" data-cart-remove="' + line.product.slug + '" aria-label="Quitar ' + line.product.name + ' del carrito">' + icon("trash") + "</button>" +
      "</div>"
    );
  }

  function renderDrawer() {
    if (!root) return;
    var body = root.querySelector("[data-cart-body]");
    var footer = root.querySelector("[data-cart-footer]");
    var lines = window.ORION.cart.getLines();

    if (!lines.length) {
      body.innerHTML =
        '<div class="empty-state">' +
        '<span class="empty-state__icon">' + icon("cart") + "</span>" +
        "<h3>Tu carrito está vacío</h3>" +
        "<p>Agregá productos desde el catálogo para armar tu pedido.</p>" +
        "</div>";
      footer.innerHTML = "";
      return;
    }

    body.innerHTML = lines.map(lineHTML).join("");

    var total = window.ORION.cart.getTotal();
    var hasUnpriced = window.ORION.cart.hasUnpricedLines();
    var totalText = window.ORION.render.formatPrice(total) + (hasUnpriced ? " + productos a consultar" : "");
    var waHref = window.ORION.whatsapp.linkForCart(lines);

    footer.innerHTML =
      '<div class="cart-drawer__total">' +
      "<span>Total aproximado</span>" +
      "<strong>" + totalText + "</strong>" +
      "</div>" +
      '<a class="btn btn--primary btn--lg btn--block" href="' + waHref + '" target="_blank" rel="noopener">' +
      icon("chat") + "Finalizar por WhatsApp" +
      "</a>";
  }

  function updateBadges() {
    var count = window.ORION.cart.getCount();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  function open() {
    if (!root) build();
    renderDrawer();
    overlay.open();
  }

  function init() {
    updateBadges();
    document.querySelectorAll("[data-cart-open]").forEach(function (btn) {
      btn.addEventListener("click", open);
    });
    window.ORION.cart.onChange(function () {
      updateBadges();
      if (root && root.getAttribute("data-open") === "true") renderDrawer();
    });
  }

  window.ORION.cartDrawer = { open: open, init: init };
})();
