/*
 * Alt Text Quiz — parent-page embed helper.
 *
 * This file runs on the page that HOSTS the quiz iframe, not inside the quiz.
 * In Cascade: copy it into a "_scripts" folder, load it from a Velocity format,
 * and assign that format in the INCLUDES_EXTRA region on the quiz page's
 * Configure tab. The README has the full recipe.
 *
 * It does three things the iframe cannot do for itself:
 *   1. Sizes the iframe to the quiz's content, so the reader never gets a
 *      scrollbar inside a scrollbar.
 *   2. Scrolls the host page when the quiz asks it to — a cross-origin child
 *      cannot scroll its parent.
 *   3. Tells the quiz which strip of its own document is currently on screen,
 *      so the click-to-enlarge overlay can land in the reader's viewport
 *      rather than in the middle of a very tall iframe.
 *
 * If this script is ever blocked or unpublished, the iframe falls back to its
 * height attribute and behaves exactly as it did before. Nothing breaks.
 */
(function () {
  "use strict";

  // Where the quiz is served from. Change this together with PARENT_ORIGIN in
  // quiz.js and enhance.js if the quiz moves off GitHub Pages.
  var QUIZ_ORIGIN = "https://gam32bit.github.io";
  var QUIZ_SRC_PREFIX = QUIZ_ORIGIN + "/alt-text-quiz";

  // Height of the sticky site header, so scroll targets don't land underneath
  // it. Measure the real one once in devtools — select the header element and
  // run $0.getBoundingClientRect().height — then set it here.
  var HEADER_OFFSET = 90;

  // Matched on src rather than id: Cascade's WYSIWYG may drop attributes it
  // doesn't recognize when the iframe is pasted into a page.
  var iframe = document.querySelector('iframe[src^="' + QUIZ_SRC_PREFIX + '"]');
  if (!iframe) return;

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function post(msg) {
    if (!iframe.contentWindow) return;
    iframe.contentWindow.postMessage(msg, QUIZ_ORIGIN);
  }

  // The visible strip of the iframe's document, in the iframe's own
  // coordinates: where it starts and how tall it is.
  function sendViewport() {
    var rect = iframe.getBoundingClientRect();
    var visibleTop = Math.max(0, -rect.top);
    var visibleBottom = Math.min(rect.height, window.innerHeight - rect.top);
    post({
      type: "altquiz:viewport",
      top: Math.round(visibleTop),
      height: Math.round(Math.max(0, visibleBottom - visibleTop))
    });
  }

  var viewportTick = null;
  function queueViewport() {
    if (viewportTick) return;
    viewportTick = window.requestAnimationFrame(function () {
      viewportTick = null;
      sendViewport();
    });
  }

  window.addEventListener("scroll", queueViewport, { passive: true });
  window.addEventListener("resize", queueViewport);

  window.addEventListener("message", function (event) {
    if (event.origin !== QUIZ_ORIGIN) return;
    if (event.source !== iframe.contentWindow) return;

    var data = event.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "altquiz:height" && typeof data.height === "number") {
      // Sanity-bound it so a bad value can't collapse or balloon the page.
      if (data.height > 0 && data.height < 20000) {
        iframe.style.height = data.height + "px";
        queueViewport();
      }
      return;
    }

    if (data.type === "altquiz:scroll" && typeof data.top === "number") {
      var target =
        window.pageYOffset +
        iframe.getBoundingClientRect().top +
        data.top -
        HEADER_OFFSET;
      window.scrollTo({
        top: Math.max(0, target),
        behavior: reduceMotion ? "auto" : "smooth"
      });
      window.setTimeout(sendViewport, 600);
    }
  });

  // Announce the host page to the quiz. This tells it what URL the "Share quiz"
  // button should copy, and prompts it to send its height — which covers the
  // case where this script loads after the iframe has already finished.
  function announce() {
    post({ type: "altquiz:parenturl", url: window.location.href });
    sendViewport();
  }

  iframe.addEventListener("load", announce);
  announce();
})();
