/* ============================================================================
   ReLEAF poster — behaviour

   Four jobs:
     1. the system loop drives the documentation pane,
     2. a figure can be opened large enough to read,
     3. the address bar carries the open section,
     4. the same content composes a second time as an A0 portrait sheet.

   The sheet is built from the board's own markup, so there is one copy of
   every sentence and the two views cannot drift apart. SHEET below is the
   whole editorial decision: which section goes in which column, and which
   parts of each pane a poster has room for.

   The poster is readable with JavaScript off: every pane is in the HTML and
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
  var docsBody = document.querySelector(".docs-body");

  /* ---------------------------------------------------- showing a section */

  function show(id, push) {
    var pane = document.getElementById("pane-" + id);
    if (!pane) return;

    panes.forEach(function (p) { p.classList.toggle("on", p === pane); });

    nodes.forEach(function (n) {
      n.setAttribute("aria-current", n.getAttribute("data-goes") === id ? "true" : "false");
    });

    if (pin) pin.textContent = pane.getAttribute("data-pin") || "";
    if (heading) heading.textContent = pane.getAttribute("data-title") || "";
    if (docsBody) docsBody.scrollTop = 0;

    if (push && history.replaceState) history.replaceState(null, "", "#" + id);
  }

  nodes.forEach(function (n) {
    n.addEventListener("click", function (e) {
      e.preventDefault();
      show(n.getAttribute("data-goes"), true);
    });
    /* an SVG <g> is neither focusable nor key-activated on its own */
    n.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        show(n.getAttribute("data-goes"), true);
      }
    });
  });

  function currentId() {
    var on = document.querySelector(".pane.on");
    return on ? on.id.replace(/^pane-/, "") : "";
  }

  /* ------------------------------------- stepping the loop with the arrows */

  var order = nodes
    .filter(function (n) { return n.hasAttribute("data-step"); })
    .map(function (n) { return n.getAttribute("data-goes"); })
    .filter(function (v, i, a) { return a.indexOf(v) === i; });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (document.body.classList.contains("view-sheet")) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;

    var at = order.indexOf(currentId());
    if (at === -1) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      show(order[(at + 1) % order.length], true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      show(order[(at - 1 + order.length) % order.length], true);
    }
  });

  /* ------------------------------------------------------------ lightbox */

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
      if (e.target === lens || (e.target.closest && e.target.closest(".lens-x"))) closeLens();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lens && lens.classList.contains("on")) closeLens();
  });

  /* =======================================================================
     THE SHEET

     Each entry is one boxed section of the printed poster. `from` names the
     pane it is built out of and `take` lists, in order, what a poster has
     room for; `tone` picks the card, `col` the column. Everything else in
     the pane stays on the board, where there is room to scroll.
     ===================================================================== */

  var SHEET = [
    /* the graphical abstract runs across the sheet, above the columns */
    { col: "wide", from: null, extras: "ps-system" },

    { col: 0, no: "01", title: "Introduction", from: "problem", tone: "",
      take: ["p.lede", ".rows", "figure"] },

    { col: 0, no: "02", title: "Inspiration", from: "inspiration", tone: "well",
      take: ["p.lede", "li:nth-of-type(1)", "li:nth-of-type(2)", "li:nth-of-type(4)", "figure"] },

    { col: 0, no: "03", title: "Safety and regulation", from: "safety", tone: "",
      take: ["p.lede", "p:nth-of-type(2)", ".rows"] },

    { col: 1, no: "04", title: "Design", from: "design", tone: "",
      take: ["p.lede", "figure:nth-of-type(1)", ".rows:nth-of-type(1)"] },

    { col: 1, no: "05", title: "Modelling", from: "modelling", tone: "well",
      take: ["p.lede", "p:nth-of-type(2)", ".caveat"] },

    { col: 1, no: "06", title: "Results", from: "results", tone: "",
      take: ["p.lede", ".rows:nth-of-type(1)", "figure:nth-of-type(1)", ".rows:nth-of-type(2)"] },

    { col: 2, no: "07", title: "Containment", from: "separate", tone: "",
      take: ["p.lede", "figure:nth-of-type(1)"] },

    { col: 2, no: "08", title: "What we have not shown", from: "limits", tone: "well",
      take: [".caveat", "li:nth-of-type(1)", "li:nth-of-type(5)", "li:nth-of-type(7)",
             "li:nth-of-type(9)", "li:nth-of-type(12)"] },

    { col: 2, no: "09", title: "Conclusion", from: null, tone: "dark",
      extras: "ps-conclusion" },

    { col: 2, no: "10", title: "Acknowledgements", from: "team", tone: "leaf",
      take: [".thanks", "p:nth-of-type(3)"] }
  ];

  var figureCount = 0;

  /* a board figure becomes a printed figure: no button, no zoom, numbered */
  function toSheetFigure(src) {
    var img = src.querySelector("img");
    var cap = src.querySelector("figcaption");
    if (!img) return null;

    figureCount += 1;
    var fig = document.createElement("figure");
    fig.className = "ps-fig";

    var copy = document.createElement("img");
    copy.src = img.getAttribute("src");
    copy.alt = img.getAttribute("alt") || "";
    fig.appendChild(copy);

    var fc = document.createElement("figcaption");
    fc.innerHTML = '<span class="ps-fignum">Figure ' + figureCount + ".</span> " +
      (cap ? cap.innerHTML : "");
    fig.appendChild(fc);
    return fig;
  }

  function buildSheet() {
    var cols = [
      document.getElementById("ps-col-1"),
      document.getElementById("ps-col-2"),
      document.getElementById("ps-col-3")
    ];
    if (!cols[0]) return;

    SHEET.forEach(function (spec) {
      /* the wide band already exists in the markup; everything else is a card */
      var wide = spec.col === "wide";
      var sec = wide
        ? document.getElementById("ps-wide")
        : document.createElement("section");
      if (!sec) return;

      if (!wide) {
        sec.className = "ps-sec" + (spec.tone ? " ps-sec--" + spec.tone : "");
        var h = document.createElement("h2");
        h.className = "ps-h";
        h.innerHTML = '<span class="ps-no">' + spec.no + "</span>" + spec.title;
        sec.appendChild(h);
      }

      if (spec.extras) {
        var tpl = document.getElementById(spec.extras);
        if (tpl) sec.appendChild(tpl.content.cloneNode(true));
      }

      var pane = spec.from ? document.getElementById("pane-" + spec.from) : null;
      if (pane) {
        spec.take.forEach(function (sel) {
          var found = pane.querySelector(sel);
          if (!found) return;
          if (found.tagName === "FIGURE") {
            var f = toSheetFigure(found);
            if (f) sec.appendChild(f);
          } else if (found.tagName === "LI") {
            var list = sec.querySelector("ul.ps-list");
            if (!list) {
              list = document.createElement("ul");
              list.className = "ps-list";
              sec.appendChild(list);
            }
            list.appendChild(found.cloneNode(true));
          } else {
            sec.appendChild(found.cloneNode(true));
          }
        });
      }

      if (!wide) cols[spec.col].appendChild(sec);
    });

    /* the loop, reused as the poster's system figure */
    var holder = document.querySelector(".ps-loop");
    var svg = document.querySelector(".loop svg");
    if (holder && svg) {
      var clone = svg.cloneNode(true);
      clone.removeAttribute("role");
      clone.setAttribute("aria-hidden", "true");
      Array.prototype.forEach.call(clone.querySelectorAll("[tabindex]"), function (n) {
        n.removeAttribute("tabindex");
        n.removeAttribute("role");
        n.removeAttribute("data-goes");
        n.removeAttribute("aria-current");
      });
      holder.appendChild(clone);
    }

    /* fill in the figure count wherever the sheet promises one */
    var tally = document.querySelector("[data-figure-tally]");
    if (tally) tally.textContent = figureCount;
  }

  /* --- scaling the sheet to the window -------------------------------- */

  var sheet = document.querySelector(".sheet");
  var sheetWrap = document.querySelector(".sheetwrap");

  function fitSheet() {
    if (!sheet || !sheetWrap) return;
    if (!document.body.classList.contains("view-sheet")) return;

    /* offsetWidth / offsetHeight are layout values: the transform does not
       change them, so the sheet can be measured while it is already scaled */
    var w = sheet.offsetWidth;
    var h = sheet.offsetHeight;
    if (!w) return;

    var avail = Math.min(window.innerWidth, 1700) - 40;
    var fit = Math.min(1, avail / w);
    sheet.style.setProperty("--fit", fit);
    sheetWrap.style.minHeight = Math.ceil(h * fit + 80) + "px";
  }

  if (window.ResizeObserver && sheet) {
    new ResizeObserver(fitSheet).observe(sheet);
  }
  window.addEventListener("resize", fitSheet);

  /* --- the view switch ------------------------------------------------- */

  var switchBtns = Array.prototype.slice.call(
    document.querySelectorAll(".viewswitch button")
  );
  var built = false;

  function setView(view, push) {
    var isSheet = view === "sheet";
    document.body.classList.toggle("view-sheet", isSheet);

    switchBtns.forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-view") === view ? "true" : "false");
    });

    if (isSheet) {
      if (!built) { buildSheet(); built = true; }
      fitSheet();
      window.scrollTo(0, 0);
      if (push && history.replaceState) history.replaceState(null, "", "#poster");
      return;
    }

    /* arriving on the board — from a #poster link, say — it may never have
       been given an open section, and an empty column is not a poster */
    if (!currentId()) show("abstract", false);
    if (push && history.replaceState) {
      history.replaceState(null, "", "#" + (currentId() || "abstract"));
    }
  }

  switchBtns.forEach(function (b) {
    b.addEventListener("click", function () { setView(b.getAttribute("data-view"), true); });
  });

  /* printing should give whichever view is open, so Cmd-P needs no thought */

  /* --- opening state --------------------------------------------------- */

  function hashNow() { return (location.hash || "").replace(/^#/, ""); }

  function applyHash() {
    var h = hashNow();
    /* the board always gets an open section, even when the sheet opens first */
    show(document.getElementById("pane-" + h) ? h : "abstract", false);
    setView(h === "poster" || h === "sheet" ? "sheet" : "board", false);
  }

  window.addEventListener("hashchange", function () {
    var h = hashNow();
    if (h === "poster" || h === "sheet") { setView("sheet", false); return; }
    if (document.body.classList.contains("view-sheet")) setView("board", false);
    if (h && h !== currentId()) show(h, false);
  });

  applyHash();
  document.documentElement.classList.add("ready");
})();
