/*
  Orion Oeste — Menú mobile + header sticky
  --------------------------------------------
  - Overlay genérico reutilizable (foco atrapado, Escape cierra, bloquea
    scroll del body) — también lo usa el drawer de filtros del catálogo.
  - Header translúcido sutil al hacer scroll.

  Se inicializa después de que el header/footer (partials) están en el DOM,
  escuchando el evento "orion:partials-loaded" disparado por include-partials.js.
*/

window.ORION = window.ORION || {};

(function () {
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function createOverlay(rootEl, opts) {
    opts = opts || {};
    var lastFocused = null;

    function onKeydown(e) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab") {
        var focusables = Array.prototype.slice
          .call(rootEl.querySelectorAll(FOCUSABLE))
          .filter(function (el) {
            return el.offsetParent !== null;
          });
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function open() {
      lastFocused = document.activeElement;
      rootEl.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeydown);
      var focusables = rootEl.querySelectorAll(FOCUSABLE);
      if (focusables.length) focusables[0].focus();
      if (opts.onOpen) opts.onOpen();
    }

    function close() {
      rootEl.setAttribute("data-open", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      if (opts.onClose) opts.onClose();
    }

    return {
      open: open,
      close: close,
      toggle: function () {
        if (rootEl.getAttribute("data-open") === "true") close();
        else open();
      },
    };
  }

  function initMobileMenu() {
    var panelRoot = document.querySelector("[data-mobile-menu]");
    if (!panelRoot) return;

    var overlay = createOverlay(panelRoot);
    var openBtn = document.querySelector("[data-mobile-menu-open]");
    var closeBtn = panelRoot.querySelector("[data-mobile-menu-close]");
    var backdrop = panelRoot.querySelector(".mobile-menu__backdrop");
    var links = panelRoot.querySelectorAll(".mobile-menu__link");

    if (openBtn) openBtn.addEventListener("click", overlay.open);
    if (closeBtn) closeBtn.addEventListener("click", overlay.close);
    if (backdrop) backdrop.addEventListener("click", overlay.close);
    links.forEach(function (link) {
      link.addEventListener("click", overlay.close);
    });
  }

  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function markActiveNavLink() {
    var current = document.body.getAttribute("data-page");
    if (!current) return;
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      if (link.getAttribute("data-nav-link") === current) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function init() {
    initMobileMenu();
    initStickyHeader();
    markActiveNavLink();
  }

  window.ORION.menu = { init: init, createOverlay: createOverlay };
})();
