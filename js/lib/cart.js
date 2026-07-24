/*
  Orion Oeste — Carrito local (WhatsApp)
  -----------------------------------------
  El sitio no tiene checkout ni pagos online: todo el negocio se resuelve
  por WhatsApp. Este "carrito" es 100% local (localStorage, igual que los
  favoritos de juguetes en home.js) y sirve para armar un pedido con
  varios productos + cantidades, que se termina de resolver mandando un
  mensaje de WhatsApp con el detalle (ver cart-drawer.js).

  No hay servidor ni sincronización entre dispositivos: es solo una
  ayuda para no tener que escribir el pedido a mano.
*/

window.ORION = window.ORION || {};

(function () {
  var KEY = "orion:cart";
  var CHANGE_EVENT = "orion:cart-changed";

  function readRaw() {
    try {
      var raw = JSON.parse(window.localStorage.getItem(KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch (e) {
      return [];
    }
  }

  function writeRaw(items) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      /* localStorage no disponible: el carrito sigue siendo usable, solo no persiste. */
    }
    document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }

  function add(slug, qty) {
    qty = Math.max(1, Number(qty) || 1);
    var items = readRaw();
    var existing = items.filter(function (it) { return it.slug === slug; })[0];
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ slug: slug, qty: qty });
    }
    writeRaw(items);
  }

  function setQty(slug, qty) {
    qty = Math.floor(Number(qty) || 0);
    var items = readRaw();
    if (qty <= 0) {
      items = items.filter(function (it) { return it.slug !== slug; });
    } else {
      items.forEach(function (it) {
        if (it.slug === slug) it.qty = qty;
      });
    }
    writeRaw(items);
  }

  function remove(slug) {
    writeRaw(readRaw().filter(function (it) { return it.slug !== slug; }));
  }

  function clear() {
    writeRaw([]);
  }

  // Une el carrito guardado (slug + qty) con los datos reales del producto.
  // Si un producto ya no existe en products.js, esa línea se descarta sola.
  function getLines() {
    var products = window.ORION.products || [];
    return readRaw()
      .map(function (it) {
        var product = products.filter(function (p) { return p.slug === it.slug; })[0];
        if (!product) return null;
        var hasPrice = product.price != null;
        return {
          product: product,
          qty: it.qty,
          hasPrice: hasPrice,
          subtotal: hasPrice ? product.price * it.qty : null,
        };
      })
      .filter(Boolean);
  }

  function getCount() {
    return getLines().reduce(function (sum, line) { return sum + line.qty; }, 0);
  }

  function getTotal() {
    return getLines().reduce(function (sum, line) { return sum + (line.hasPrice ? line.subtotal : 0); }, 0);
  }

  function hasUnpricedLines() {
    return getLines().some(function (line) { return !line.hasPrice; });
  }

  function onChange(cb) {
    document.addEventListener(CHANGE_EVENT, cb);
  }

  window.ORION.cart = {
    add: add,
    setQty: setQty,
    remove: remove,
    clear: clear,
    getLines: getLines,
    getCount: getCount,
    getTotal: getTotal,
    hasUnpricedLines: hasUnpricedLines,
    onChange: onChange,
  };
})();
