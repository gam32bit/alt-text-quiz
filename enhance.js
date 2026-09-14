/*
 * Alt Text Quiz — progressive enhancements layered on top of quiz.js.
 * Loaded AFTER quiz.js. Touches nothing quiz.js owns, so the quiz still works
 * if this file fails to load.
 *
 *   1. Segment progress tracker, driven by the text quiz.js writes into
 *      #progress ("Question 3 of 10").
 *   2. Click-to-enlarge lightbox for the screenshot. In embed mode the parent
 *      tells us which strip of this document is actually on screen, so the
 *      overlay lands in the reader's viewport instead of the middle of a very
 *      tall iframe.
 */
(function () {
  "use strict";

  var PARENT_ORIGIN = "https://www.vims.edu";
  var IS_EMBED = document.documentElement.classList.contains("is-embed");
  var inFrame = IS_EMBED && window.parent !== window;

  /* ---- 1. progress tracker --------------------------------------------- */
  var progress = document.getElementById("progress");
  var track;

  if (progress) {
    var meta = document.createElement("div");
    meta.className = "q-meta";
    progress.parentNode.insertBefore(meta, progress);
    meta.appendChild(progress);
    track = document.createElement("div");
    track.className = "progress-track";
    track.setAttribute("aria-hidden", "true"); // #progress already says it in words
    meta.appendChild(track);

    var paint = function () {
      var m = /(\d+)\s+of\s+(\d+)/.exec(progress.textContent || "");
      if (!m) return;
      var current = parseInt(m[1], 10);
      var total = parseInt(m[2], 10);
      if (track.childNodes.length !== total) {
        track.innerHTML = "";
        for (var i = 0; i < total; i++) {
          track.appendChild(document.createElement("span"));
        }
      }
      for (var n = 0; n < total; n++) {
        var seg = track.childNodes[n];
        seg.className =
          "progress-seg" +
          (n + 1 < current ? " is-done" : n + 1 === current ? " is-current" : "");
      }
    };

    paint();
    new MutationObserver(paint).observe(progress, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  /* ---- 2. lightbox ----------------------------------------------------- */
  var img = document.getElementById("q-image");
  var zoom = document.querySelector(".q-zoom");
  if (!img || !zoom) return;

  // Where the parent says the visible strip of this document is.
  var strip = null;
  if (inFrame) {
    window.addEventListener("message", function (event) {
      if (event.origin !== PARENT_ORIGIN) return;
      var d = event.data;
      if (!d || d.type !== "altquiz:viewport") return;
      if (typeof d.top !== "number" || typeof d.height !== "number") return;
      strip = { top: d.top, height: d.height };
      if (overlay) place();
    });
  }

  var overlay = null;
  var lastFocus = null;

  function place() {
    if (!overlay) return;
    if (strip && strip.height > 120) {
      overlay.classList.add("is-positioned");
      overlay.style.top = strip.top + "px";
      overlay.style.height = strip.height + "px";
    } else {
      overlay.classList.remove("is-positioned");
      overlay.style.top = "";
      overlay.style.height = "";
    }
  }

  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.removeEventListener("keydown", onKey);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  function open() {
    if (overlay) return;
    lastFocus = document.activeElement;

    overlay = document.createElement("div");
    overlay.className = "lb";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Enlarged screenshot");

    var big = document.createElement("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lb-close";
    btn.textContent = "Close";

    overlay.appendChild(big);
    overlay.appendChild(btn);
    document.body.appendChild(overlay);
    place();

    overlay.addEventListener("click", close);
    btn.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    btn.focus({ preventScroll: true });
  }

  zoom.addEventListener("click", open);
})();
