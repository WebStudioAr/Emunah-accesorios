/*
  Orion Oeste — Init compartido
  --------------------------------
  Se carga en TODAS las páginas. El header y el footer están escritos
  directamente en cada HTML (no se cargan por fetch), así que el sitio
  funciona abriendo el archivo con doble clic, sin necesidad de servidor.
  Al estar listo el DOM conecta: links de WhatsApp, menú mobile, estado
  del local, visibilidad del botón flotante, reveal y carruseles base.

  Los scripts de cada página (js/pages/*.js) hacen lo mismo para el
  contenido que ellos mismos generan (grillas de productos, etc.).
*/

window.ORION = window.ORION || {};

(function () {
  function renderFooterExtras(root) {
    var scope = root || document;
    var info = window.ORION.storeInfo;

    var yearEl = scope.querySelector("[data-copyright-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (!info) return;

    var addressEl = scope.querySelector("[data-footer-address]");
    if (addressEl) addressEl.textContent = info.address.full;

    var phoneEl = scope.querySelector("[data-footer-phone]");
    if (phoneEl) phoneEl.textContent = info.phone.displayLocal;

    // Oculta redes sociales / email todavía no confirmados por el cliente
    // (quedarían en null en js/data/store-info.js si no se completaron).
    scope.querySelectorAll("[data-social]").forEach(function (el) {
      var key = el.getAttribute("data-social");
      var url = info.social && info.social[key];
      if (url) {
        el.setAttribute("href", url);
      } else {
        el.remove();
      }
    });

    var emailEl = scope.querySelector("[data-footer-email]");
    if (emailEl) {
      if (info.email) {
        emailEl.setAttribute("href", "mailto:" + info.email);
        var emailText = emailEl.querySelector("[data-footer-email-text]");
        if (emailText) emailText.textContent = info.email;
      } else {
        emailEl.remove();
      }
    }
  }

  function initWhatsappFabVisibility() {
    var fab = document.querySelector("[data-whatsapp-fab]");
    var footer = document.querySelector("[data-footer]");
    if (!fab || !footer || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          fab.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);
  }

  function init() {
    renderFooterExtras(document);
    if (window.ORION.whatsapp) window.ORION.whatsapp.bindLinks(document);
    if (window.ORION.menu) window.ORION.menu.init();
    if (window.ORION.cartDrawer) window.ORION.cartDrawer.init();
    if (window.ORION.storeStatus) window.ORION.storeStatus.render(document);
    initWhatsappFabVisibility();
    if (window.ORION.reveal) window.ORION.reveal.init(document);
    if (window.ORION.carousel) window.ORION.carousel.init(document);

    document.dispatchEvent(new CustomEvent("orion:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
