/*
  Orion Oeste — WhatsApp
  ------------------------
  Único lugar donde se arma el número y los mensajes prearmados de
  WhatsApp. No hardcodees links wa.me en el HTML: usá siempre
  ORION.whatsapp.link(...) o los helpers de mensajes de acá.
*/

window.ORION = window.ORION || {};

(function () {
  var NUMBER_E164 = (window.ORION.storeInfo && window.ORION.storeInfo.phone.e164) || "+5491159674675";
  var NUMBER_WA = NUMBER_E164.replace("+", "");

  var messages = {
    general: "Hola! Quería hacer una consulta sobre productos de Orion Oeste.",
    availability: "Hola! Quería consultar la disponibilidad de un producto de Orion Oeste.",
    shipping: "Hola! Quería consultar por envíos a domicilio de Orion Oeste.",
    pickup: "Hola! Quería consultar por el retiro en el local de Orion Oeste.",
    prints: "Hola! Quería consultar por un trabajo de impresión o copiado.",
    toys: "Hola! Quería consultar por productos de juguetería de Orion Oeste.",
    school: "Hola, quería consultar por los productos de vuelta al cole de Orion Oeste.",
    contact: "Hola, quería hacer una consulta a Orion Oeste.",
    catalog: "Hola, quería consultar por un producto del catálogo de Orion Oeste.",
  };

  function link(message) {
    var text = message ? "?text=" + encodeURIComponent(message) : "";
    return "https://wa.me/" + NUMBER_WA + text;
  }

  function buildProductMessage(productName, qty) {
    var prefix = qty && qty > 1 ? qty + " unidades de " : "";
    return "Hola, quería consultar por " + prefix + productName + " que vi en la web de Orion Oeste.";
  }

  // Arma un pedido con varios productos (carrito local) para terminar de
  // resolverlo por WhatsApp. `lines` viene de ORION.cart.getLines():
  // [{ product, qty, hasPrice, subtotal }]. No hay checkout real: esto solo
  // ahorra escribir el detalle a mano.
  function buildCartMessage(lines) {
    var render = window.ORION.render;
    var items = lines
      .map(function (line) {
        var priceText = line.hasPrice && render ? " (" + render.formatPrice(line.product.price) + " c/u)" : "";
        return "• " + line.qty + "x " + line.product.name + priceText;
      })
      .join("\n");
    var hasAnyPrice = lines.some(function (l) { return l.hasPrice; });
    var total = lines.reduce(function (sum, l) { return sum + (l.hasPrice ? l.subtotal : 0); }, 0);
    var totalLine = hasAnyPrice && render ? "\n\nTotal aproximado: " + render.formatPrice(total) : "";
    return "Hola! Quería consultar por estos productos:\n" + items + totalLine + "\n\n¿Podrían confirmarme disponibilidad?";
  }

  function linkFor(key) {
    return link(messages[key] || messages.general);
  }

  function linkForCart(lines) {
    return link(buildCartMessage(lines));
  }

  // Enlaza automáticamente cualquier elemento [data-wa="clave"] al mensaje
  // correspondiente, para no tener que codificar URLs de WhatsApp a mano
  // en el HTML. Claves válidas: las de `messages` arriba.
  function bindLinks(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll("[data-wa]");
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-wa");
      el.setAttribute("href", linkFor(key));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  window.ORION.whatsapp = {
    number: NUMBER_E164,
    displayLocal: (window.ORION.storeInfo && window.ORION.storeInfo.phone.displayLocal) || "011 15-5967-4675",
    messages: messages,
    link: link,
    linkFor: linkFor,
    linkForProduct: function (productName, qty) {
      return link(buildProductMessage(productName, qty));
    },
    buildProductMessage: buildProductMessage,
    buildCartMessage: buildCartMessage,
    linkForCart: linkForCart,
    bindLinks: bindLinks,
  };
})();
