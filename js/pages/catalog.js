/*
  Orion Oeste — Catálogo
  -------------------------
  Búsqueda + filtro por categoría/subcategoría + orden, con estado
  reflejado en la URL (?q=&categoria=&sub=&orden=) para que sea
  compartible/bookmarkeable. Drawer de filtros en mobile, barra fija
  en desktop (sin comprimir el mismo diseño de mobile).
*/

(function () {
  var products = window.ORION.products || [];
  var categories = window.ORION.categories || [];
  var render = window.ORION.render;

  var state = { q: "", category: "all", subcategory: "all", sort: "relevance", page: 1 };

  var PAGE_SIZE = 8;

  var grid = document.getElementById("catalog-grid");
  var resultsCount = document.getElementById("results-count");
  var searchInput = document.getElementById("catalog-search-input");
  var searchForm = document.getElementById("catalog-search-form");
  var pagination = document.getElementById("catalog-pagination");
  var pageNumbers = pagination ? pagination.querySelector("[data-page-numbers]") : null;
  var prevBtn = pagination ? pagination.querySelector("[data-page-prev]") : null;
  var nextBtn = pagination ? pagination.querySelector("[data-page-next]") : null;

  function normalize(str) {
    return (str || "")
      .toString()
      .toLowerCase()
      .replace(/[áàäâ]/g, "a")
      .replace(/[éèëê]/g, "e")
      .replace(/[íìïî]/g, "i")
      .replace(/[óòöô]/g, "o")
      .replace(/[úùüû]/g, "u")
      .replace(/ñ/g, "n");
  }

  function parseStateFromURL() {
    var params = new URLSearchParams(window.location.search);
    state.q = params.get("q") || "";
    state.category = params.get("categoria") || "all";
    state.subcategory = params.get("sub") || "all";
    state.sort = params.get("orden") || "relevance";
    state.page = parseInt(params.get("pagina"), 10) || 1;
  }

  function syncURL() {
    var params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.category !== "all") params.set("categoria", state.category);
    if (state.subcategory !== "all") params.set("sub", state.subcategory);
    if (state.sort !== "relevance") params.set("orden", state.sort);
    if (state.page > 1) params.set("pagina", state.page);
    var qs = params.toString();
    var newUrl = window.location.pathname + (qs ? "?" + qs : "");
    window.history.replaceState({}, "", newUrl);
  }

  function getSubcategoriesFor(category) {
    var scoped = category === "all" ? products : products.filter(function (p) { return p.category === category; });
    var seen = {};
    var list = [];
    scoped.forEach(function (p) {
      if (p.subcategory && !seen[p.subcategory]) {
        seen[p.subcategory] = true;
        list.push(p.subcategory);
      }
    });
    return list;
  }

  function getFiltered() {
    var list = products.slice();

    if (state.category !== "all") {
      list = list.filter(function (p) { return p.category === state.category; });
    }
    if (state.subcategory !== "all") {
      list = list.filter(function (p) { return p.subcategory === state.subcategory; });
    }
    if (state.q) {
      var nq = normalize(state.q);
      list = list.filter(function (p) {
        return normalize(p.name).indexOf(nq) > -1 || normalize(p.description).indexOf(nq) > -1;
      });
    }

    if (state.sort === "price-asc") {
      list.sort(function (a, b) { return (a.price == null ? Infinity : a.price) - (b.price == null ? Infinity : b.price); });
    } else if (state.sort === "price-desc") {
      list.sort(function (a, b) { return (b.price == null ? -Infinity : b.price) - (a.price == null ? -Infinity : a.price); });
    } else if (state.sort === "name-asc") {
      list.sort(function (a, b) { return a.name.localeCompare(b.name, "es"); });
    } else {
      list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    }

    return list;
  }

  function chipHTML(value, label, active) {
    return (
      '<button type="button" class="filter-chip" data-value="' + value + '" aria-pressed="' + (active ? "true" : "false") + '">' +
      label +
      "</button>"
    );
  }

  function renderCategoryChips() {
    var html =
      chipHTML("all", "Todas", state.category === "all") +
      categories
        .map(function (c) {
          return chipHTML(c.slug, c.label, state.category === c.slug);
        })
        .join("");
    document.querySelectorAll("[data-category-chips]").forEach(function (el) {
      el.innerHTML = html;
    });
  }

  function renderSubcategoryChips() {
    var subs = getSubcategoriesFor(state.category);
    var containers = document.querySelectorAll("[data-subcategory-chips]");
    if (state.category === "all" || !subs.length) {
      containers.forEach(function (el) {
        el.innerHTML = "";
        el.closest(".filter-drawer__group") && (el.closest(".filter-drawer__group").hidden = true);
      });
      return;
    }
    var html =
      chipHTML("all", "Todas", state.subcategory === "all") +
      subs
        .map(function (s) {
          return chipHTML(s, s, state.subcategory === s);
        })
        .join("");
    containers.forEach(function (el) {
      el.innerHTML = html;
      el.closest(".filter-drawer__group") && (el.closest(".filter-drawer__group").hidden = false);
    });
  }

  function syncSortSelects() {
    document.querySelectorAll("[data-sort-select]").forEach(function (el) {
      el.value = state.sort;
    });
  }

  // Siempre al menos 3 números de página visibles (si hay resultados para
  // eso): con PAGE_SIZE=8 y ~26 productos alcanza para 3-4 páginas sin
  // filtros. Con pocos resultados filtrados puede haber 1 sola página.
  function renderPagination(totalItems, totalPages) {
    if (!pagination) return;
    var hide = totalItems === 0 || totalPages <= 1;
    pagination.hidden = hide;
    if (hide) return;

    if (pageNumbers) {
      var html = "";
      for (var i = 1; i <= totalPages; i++) {
        html +=
          '<button type="button" class="pagination__page' +
          (i === state.page ? " is-active" : "") +
          '" data-page="' +
          i +
          '" aria-current="' +
          (i === state.page ? "page" : "false") +
          '" aria-label="Ir a la página ' +
          i +
          '">' +
          i +
          "</button>";
      }
      pageNumbers.innerHTML = html;
    }

    if (prevBtn) {
      prevBtn.disabled = state.page <= 1;
      prevBtn.setAttribute("aria-disabled", String(state.page <= 1));
    }
    if (nextBtn) {
      nextBtn.disabled = state.page >= totalPages;
      nextBtn.setAttribute("aria-disabled", String(state.page >= totalPages));
    }
  }

  function scrollToResultsTop() {
    var target = document.querySelector(".breadcrumbs") || grid;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToPage(page, opts) {
    state.page = page;
    update();
    if (!opts || opts.scroll !== false) scrollToResultsTop();
  }

  function update() {
    var fullList = getFiltered();
    var totalItems = fullList.length;
    var totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    state.page = Math.min(Math.max(1, state.page), totalPages);

    var start = (state.page - 1) * PAGE_SIZE;
    var pageList = fullList.slice(start, start + PAGE_SIZE);

    render.renderProductGrid(grid, pageList, { reveal: false });
    var countText =
      totalItems === 1
        ? "1 producto encontrado"
        : totalItems + " productos encontrados" + (totalPages > 1 ? " · página " + state.page + " de " + totalPages : "");
    var filterIcon = window.ORION.icons ? window.ORION.icons.get("filter") : "";
    resultsCount.innerHTML = '<span class="catalog-results-count__icon" aria-hidden="true">' + filterIcon + "</span>" + countText;
    renderCategoryChips();
    renderSubcategoryChips();
    syncSortSelects();
    renderPagination(totalItems, totalPages);
    syncURL();
    if (window.ORION.whatsapp) window.ORION.whatsapp.bindLinks(grid);
  }

  function bindPagination() {
    if (!pagination) return;
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (state.page > 1) goToPage(state.page - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToPage(state.page + 1);
      });
    }
    if (pageNumbers) {
      pageNumbers.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-page]");
        if (!btn) return;
        goToPage(parseInt(btn.getAttribute("data-page"), 10));
      });
    }
  }

  function bindScrollTop() {
    document.querySelectorAll("[data-scroll-top]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function bindChipDelegation() {
    document.querySelectorAll("[data-category-chips]").forEach(function (container) {
      container.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-chip");
        if (!btn) return;
        state.category = btn.getAttribute("data-value");
        state.subcategory = "all";
        state.page = 1;
        update();
      });
    });
    document.querySelectorAll("[data-subcategory-chips]").forEach(function (container) {
      container.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-chip");
        if (!btn) return;
        state.subcategory = btn.getAttribute("data-value");
        state.page = 1;
        update();
      });
    });
  }

  function bindSortSelects() {
    document.querySelectorAll("[data-sort-select]").forEach(function (el) {
      el.addEventListener("change", function () {
        state.sort = el.value;
        state.page = 1;
        update();
      });
    });
  }

  function bindClearFilters() {
    document.querySelectorAll("[data-clear-filters]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.category = "all";
        state.subcategory = "all";
        state.sort = "relevance";
        state.q = "";
        state.page = 1;
        if (searchInput) searchInput.value = "";
        update();
      });
    });
  }

  function bindSearch() {
    if (!searchForm || !searchInput) return;
    searchInput.value = state.q;
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      state.q = searchInput.value.trim();
      state.page = 1;
      update();
    });
    // Búsqueda instantánea mientras se escribe (sin esperar el submit).
    searchInput.addEventListener("input", function () {
      state.q = searchInput.value.trim();
      state.page = 1;
      update();
    });
  }

  function initFilterDrawer() {
    var drawer = document.querySelector("[data-filter-drawer]");
    if (!drawer) return;
    var overlay = window.ORION.menu.createOverlay(drawer);
    document.querySelectorAll("[data-filter-drawer-open]").forEach(function (btn) {
      btn.addEventListener("click", overlay.open);
    });
    drawer.querySelectorAll("[data-filter-drawer-close]").forEach(function (btn) {
      btn.addEventListener("click", overlay.close);
    });
  }

  function focusSearchIfHash() {
    if (window.location.hash === "#buscar" && searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  parseStateFromURL();
  bindChipDelegation();
  bindSortSelects();
  bindClearFilters();
  bindSearch();
  bindPagination();
  bindScrollTop();
  initFilterDrawer();
  update();
  focusSearchIfHash();
})();
