/*
  Orion Oeste — Scroll reveal
  -----------------------------
  Entrada progresiva y sutil de elementos marcados con [data-reveal] al
  entrar en viewport. Respeta prefers-reduced-motion (la animación queda
  desactivada por CSS; acá solo evitamos trabajo innecesario).
*/

window.ORION = window.ORION || {};

(function () {
  function init(root) {
    var scope = root || document;
    var items = Array.prototype.slice.call(scope.querySelectorAll("[data-reveal]")).filter(function (el) {
      return el.dataset.revealInit !== "true";
    });
    if (!items.length) return;
    items.forEach(function (el) {
      el.dataset.revealInit = "true";
    });

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      observer.observe(el);
    });
  }

  window.ORION.reveal = { init: init };
})();
