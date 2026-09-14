/*
 * Alt Text Quiz — parent-page embed helper.
 *
 * This file runs on the page that HOSTS the quiz iframe, not inside the quiz.
 * In Cascade: copy it into a "_scripts" folder, load it from a Velocity format,
 * and assign that format in the INCLUDES_EXTRA region on the quiz page's
 * Configure tab. The README has the full recipe.
 *
 * It does two things the iframe cannot do for itself:
 *   1. Sizes the iframe to the quiz's content, so the reader never gets a
 *      scrollbar inside a scrollbar.
 *   2. Scrolls the host page when the quiz asks it to — a cross-origin child
 *      cannot scroll its parent.
 *
 * If this script is ever blocked or unpublished, the iframe falls back to its
 * height attribute and behaves exactly as it did before. Nothing breaks.
 */
(function () {
  "use strict";

  // Where the quiz is served from. Change this together with PARENT_ORIGIN in
  // quiz.js if the quiz moves off GitHub Pages.
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

  window.addEventListener("message", function (event) {
    if (event.origin !== QUIZ_ORIGIN) return;
    if (event.source !== iframe.contentWindow) return;

    var data = event.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "altquiz:height" && typeof data.height === "number") {
      // Sanity-bound it so a bad value can't collapse or balloon the page.
      if (data.height > 0 && data.height < 20000) {
        iframe.style.height = data.height + "px";
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
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  });

  // Announce the host page to the quiz. This tells it what URL the "Share quiz"
  // button should copy, and prompts it to send its height — which covers the
  // case where this script loads after the iframe has already finished.
  function announce() {
    if (!iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      { type: "altquiz:parenturl", url: window.location.href },
      QUIZ_ORIGIN
    );
  }

  iframe.addEventListener("load", announce);
  announce();
})();
