/*
  Orion Oeste — Carrusel táctil genérico
  -----------------------------------------
  Funciona sobre cualquier bloque con esta forma:

    <div class="carousel" data-carousel>
      <button class="carousel__nav carousel__nav--prev" data-carousel-prev aria-label="Anterior">‹</button>
      <div class="carousel__track" data-carousel-track>
        <div class="carousel__item">...</div>
        ...
      </div>
      <button class="carousel__nav carousel__nav--next" data-carousel-next aria-label="Siguiente">›</button>
      <div class="carousel__dots" data-carousel-dots></div>
    </div>

  Los dots son triángulos (ver .carousel__dot en components.css), no
  círculos, para mantener el sistema visual del triángulo.
*/

window.ORION = window.ORION || {};

(function () {
  function initOne(root) {
    if (root.dataset.carouselInit === "true") return;
    root.dataset.carouselInit = "true";

    var track = root.querySelector("[data-carousel-track]");
    if (!track) return;

    var items = Array.prototype.slice.call(track.children);
    var dotsWrap = root.querySelector("[data-carousel-dots]");
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    // Opt-in: solo los carruseles con data-carousel-edges deshabilitan las
    // flechas al llegar al principio/final (para no cambiar el
    // comportamiento de los carruseles existentes que no lo pidan).
    var edgeAware = root.hasAttribute("data-carousel-edges");

    if (dotsWrap && items.length > 1) {
      dotsWrap.innerHTML = "";
      items.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel__dot";
        dot.setAttribute("aria-label", "Ir al elemento " + (i + 1));
        dot.setAttribute("aria-current", i === 0 ? "true" : "false");
        dot.addEventListener("click", function () {
          items[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        });
        dotsWrap.appendChild(dot);
      });
    }

    function scrollByAmount(dir) {
      var itemWidth = items[0] ? items[0].getBoundingClientRect().width : 200;
      track.scrollBy({ left: dir * (itemWidth + 16), behavior: "smooth" });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { scrollByAmount(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { scrollByAmount(1); });

    var ticking = false;
    function updateDots() {
      if (!dotsWrap) return;
      var trackRect = track.getBoundingClientRect();
      var closestIndex = 0;
      var closestDist = Infinity;
      items.forEach(function (item, i) {
        var dist = Math.abs(item.getBoundingClientRect().left - trackRect.left);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.setAttribute("aria-current", i === closestIndex ? "true" : "false");
      });
    }

    function updateEdges() {
      if (!edgeAware) return;
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      if (prevBtn) {
        prevBtn.disabled = atStart;
        prevBtn.setAttribute("aria-disabled", String(atStart));
      }
      if (nextBtn) {
        nextBtn.disabled = atEnd;
        nextBtn.setAttribute("aria-disabled", String(atEnd));
      }
    }

    track.addEventListener("scroll", function () {
      // updateEdges() es una comparación barata: se corre siempre, sin
      // esperar el rAF (que algunos navegadores pausan si la pestaña no
      // está en primer plano). updateDots() sí se agrupa por rAF porque
      // hace varios getBoundingClientRect().
      updateEdges();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateDots();
        ticking = false;
      });
    });

    updateEdges();
  }

  function init(root) {
    var scope = root || document;
    var carousels = scope.querySelectorAll("[data-carousel]");
    carousels.forEach(initOne);
  }

  window.ORION.carousel = { init: init };
})();
