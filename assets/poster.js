/* ============================================================================
   ReLEAF poster — behaviour

   Three jobs, and nothing else:
     1. the system loop drives the documentation pane,
     2. a figure can be opened large enough to read,
     3. the address bar carries the open section, so a judge can be sent
        straight to one.

   The poster is readable with JavaScript off: every pane is in the HTML, and
   the no-js rule in the page head simply shows them all.
   ========================================================================== */

(function () {
  "use strict";

  var board = document.querySelector(".board");
  if (!board) return;

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-goes]"));
  var panes = Array.prototype.slice.call(document.querySelectorAll(".pane"));
  var pin = document.querySelector(".docs-head .pin");
  var heading = document.querySelector(".docs-head h2");
  var body = document.querySelector(".docs-body");

  /* --- showing a section ------------------------------------------------ */

  function show(id, push) {
    var pane = document.getElementById("pane-" + id);
    if (!pane) return;

    panes.forEach(function (p) { p.classList.toggle("on", p === pane); });

    nodes.forEach(function (n) {
      n.setAttribute("aria-current", n.getAttribute("data-goes") === id ? "true" : "false");
    });

    if (pin) pin.textContent = pane.getAttribute("data-pin") || "";
    if (heading) heading.textContent = pane.getAttribute("data-title") || "";
    if (body) body.scrollTop = 0;

    if (push && history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }
  }

  nodes.forEach(function (n) {
    n.addEventListener("click", function (e) {
      e.preventDefault();
      show(n.getAttribute("data-goes"), true);
    });

    /* an SVG <g> is not focusable or keyboard-activated on its own */
    n.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        show(n.getAttribute("data-goes"), true);
      }
    });
  });

  /* --- stepping through the loop with the arrow keys -------------------- */

  var order = nodes
    .filter(function (n) { return n.hasAttribute("data-step"); })
    .map(function (n) { return n.getAttribute("data-goes"); })
    .filter(function (v, i, a) { return a.indexOf(v) === i; });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;

    var current = order.indexOf(currentId());
    if (current === -1) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      show(order[(current + 1) % order.length], true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      show(order[(current - 1 + order.length) % order.length], true);
    }
  });

  function currentId() {
    var on = document.querySelector(".pane.on");
    return on ? on.id.replace(/^pane-/, "") : "";
  }

  /* --- the lightbox ----------------------------------------------------- */

  var lens = document.querySelector(".lens");
  var lensImg = lens && lens.querySelector("img");
  var lensCap = lens && lens.querySelector("figcaption");
  var lastFocus = null;

  function openLens(src, caption, alt) {
    if (!lens) return;
    lastFocus = document.activeElement;
    lensImg.src = src;
    lensImg.alt = alt || "";
    lensCap.innerHTML = caption || "";
    lens.classList.add("on");
    lens.setAttribute("aria-hidden", "false");
    lens.querySelector(".lens-x").focus();
  }

  function closeLens() {
    if (!lens) return;
    lens.classList.remove("on");
    lens.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", function (e) {
    var zoom = e.target.closest ? e.target.closest("[data-zoom]") : null;
    if (zoom) {
      var fig = zoom.closest("figure");
      var img = zoom.querySelector("img");
      var cap = fig ? fig.querySelector("figcaption") : null;
      openLens(
        zoom.getAttribute("data-zoom") || (img && img.src),
        cap ? cap.innerHTML : "",
        img ? img.alt : ""
      );
      return;
    }
    if (lens && lens.classList.contains("on")) {
      if (e.target === lens || (e.target.closest && e.target.closest(".lens-x"))) {
        closeLens();
      }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lens && lens.classList.contains("on")) closeLens();
  });

  /* --- opening state ---------------------------------------------------- */

  function fromHash(fallback) {
    var h = (location.hash || "").replace(/^#/, "");
    return document.getElementById("pane-" + h) ? h : fallback;
  }

  /* a link pasted into a tab that is already open must still move the pane */
  window.addEventListener("hashchange", function () {
    var id = fromHash(null);
    if (id && id !== currentId()) show(id, false);
  });

  show(fromHash("abstract"), false);

  document.documentElement.classList.add("ready");
})();
