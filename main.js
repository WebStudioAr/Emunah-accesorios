(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- Header sticky ---------- */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menú mobile ---------- */
  function initMobileMenu() {
    var toggle = $("[data-nav-toggle]");
    var menu = $("[data-mobile-menu]");
    if (!toggle || !menu) return;

    var close = function () {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };
    var open = function () {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
    };
    toggle.addEventListener("click", function () {
      if (menu.hidden) open(); else close();
    });
    // Cerrar al tocar un enlace o el CTA
    $$("a", menu).forEach(function (a) { a.addEventListener("click", close); });
    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { close(); toggle.focus(); }
    });
    // Cerrar si se agranda la ventana a desktop
    matchMedia("(min-width: 960px)").addEventListener("change", function (e) {
      if (e.matches) close();
    });
  }

  /* ---------- Smooth scroll para anclas ---------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 80) + 12;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;

    // Stagger: asignar delays a hijos de [data-stagger]
    $$("[data-stagger]").forEach(function (group) {
      $$(":scope > *", group).forEach(function (child, i) {
        child.style.setProperty("--d", (i % 8) * 70 + "ms");
      });
    });

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -4% 0px" });
    items.forEach(function (el) { io.observe(el); });

    // Red de seguridad: a los 6s revela lo que siga oculto en viewport
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Tilt 3D suave en cards ---------- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (card) {
      var raf = null;
      function move(e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.style.transform = "translateY(-6px) perspective(800px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 6).toFixed(2) + "deg)";
        });
      }
      function leave() {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = "";
      }
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
    });
  }

  /* ---------- Marquee: duplicar contenido para loop continuo ---------- */
  function initMarquee() {
    var track = $("[data-marquee]");
    if (!track || track.dataset.cloned) return;
    track.dataset.cloned = "1";
    track.innerHTML = track.innerHTML + track.innerHTML;
  }

  /* ---------- FAQ: cerrar otros al abrir uno (acordeón) ---------- */
  function initFaq() {
    var list = $("[data-faq]");
    if (!list) return;
    var items = $$("details", list);
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          items.forEach(function (other) { if (other !== item) other.open = false; });
        }
      });
    });
  }

  /* ---------- Año dinámico ---------- */
  function initYear() {
    var y = $("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initHeader, "initHeader");
    safe(initMobileMenu, "initMobileMenu");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initMarquee, "initMarquee");
    safe(initFaq, "initFaq");
    safe(initYear, "initYear");
    safe(initReveals, "initReveals");
    safe(initTilt, "initTilt");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
    }
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
