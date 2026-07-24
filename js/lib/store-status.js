/*
  Orion Oeste — Estado del local (abierto / cerrado)
  -----------------------------------------------------
  Calcula el estado usando la hora real de Argentina (no la del dispositivo
  del visitante) y contempla el horario cortado del sábado.

  Uso en HTML:
    <span class="store-status" data-store-status>
      <span class="store-status__dot" aria-hidden="true"></span>
      <span data-store-status-label>Calculando horario…</span>
    </span>

  El estado nunca depende solo del color: siempre se pinta el texto
  "Abierto ahora" / "Cerrado ahora".
*/

window.ORION = window.ORION || {};

(function () {
  var WEEKDAY_MAP = {
    Monday: "monday",
    Tuesday: "tuesday",
    Wednesday: "wednesday",
    Thursday: "thursday",
    Friday: "friday",
    Saturday: "saturday",
    Sunday: "sunday",
  };

  function timeToMinutes(t) {
    var parts = t.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function getArgentinaNow(timezone) {
    var now = new Date();
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    var map = {};
    parts.forEach(function (p) {
      map[p.type] = p.value;
    });

    var hour = parseInt(map.hour, 10);
    if (hour === 24) hour = 0;

    return {
      day: WEEKDAY_MAP[map.weekday],
      minutes: hour * 60 + parseInt(map.minute, 10),
    };
  }

  function getStatus() {
    var info = window.ORION.storeInfo;
    var now = getArgentinaNow(info.timezone);
    var today = info.hours.filter(function (h) {
      return h.day === now.day;
    })[0];

    if (!today || !today.ranges.length) {
      return { open: false, label: "Cerrado ahora", today: today };
    }

    var isOpen = today.ranges.some(function (range) {
      var start = timeToMinutes(range[0]);
      var end = timeToMinutes(range[1]);
      return now.minutes >= start && now.minutes < end;
    });

    return {
      open: isOpen,
      label: isOpen ? "Abierto ahora" : "Cerrado ahora",
      today: today,
    };
  }

  function render(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll("[data-store-status]");
    if (!nodes.length) return;

    var status = getStatus();

    nodes.forEach(function (node) {
      node.classList.remove("store-status--open", "store-status--closed");
      node.classList.add(status.open ? "store-status--open" : "store-status--closed");
      var label = node.querySelector("[data-store-status-label]");
      if (label) label.textContent = status.label;
    });
  }

  window.ORION.storeStatus = { get: getStatus, render: render };
})();
