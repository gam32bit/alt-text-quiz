/*
 * Alt Text Quiz — state machine and rendering.
 * Framework-free. Reads the QUESTIONS array from questions.js.
 */

(function () {
  "use strict";

  // answers[i] = the option index the user chose for question i (undefined if unanswered).
  // Score is derived from this array, so going back and forward never double-counts.
  const state = {
    screen: "start", // start | intro | question | results
    currentIndex: 0,
    answers: [],
  };

  // --- element references -------------------------------------------------
  const screens = {
    start: document.getElementById("screen-start"),
    intro: document.getElementById("screen-intro"),
    question: document.getElementById("screen-question"),
    results: document.getElementById("screen-results"),
  };

  const els = {
    progress: document.getElementById("progress"),
    image: document.getElementById("q-image"),
    prompt: document.getElementById("q-prompt"),
    optionsForm: document.getElementById("q-options"),
    backBtn: document.getElementById("back-btn"),
    submitBtn: document.getElementById("submit-btn"),
    nextBtn: document.getElementById("next-btn"),
    feedback: document.getElementById("feedback"),
    liveRegion: document.getElementById("live-region"),
    score: document.getElementById("final-score"),
    resultsMsg: document.getElementById("results-message"),
    scoreLabel: document.getElementById("score-label"),
    shareBtn: document.getElementById("share-btn"),
    shareStatus: document.getElementById("share-status"),
  };

  // --- parent-page bridge (embed mode) ------------------------------------
  // Embedded in a CMS page, the parent owns layout: it sizes the iframe to our
  // content so there is no inner scrollbar, and it does the scrolling, because
  // a cross-origin child cannot scroll its parent. Change PARENT_ORIGIN (and
  // QUIZ_ORIGIN in embed-parent.js) if the quiz moves.
  const PARENT_ORIGIN = "https://www.vims.edu";
  const IS_EMBED = document.documentElement.classList.contains("is-embed");
  const inFrame = IS_EMBED && window.parent !== window;

  // Where the quiz lives publicly. "Share quiz" copies this rather than the
  // GitHub Pages URL (or an iframe's own src), so the link people pass around
  // is the page with the surrounding context.
  const CANONICAL_URL =
    "https://www.vims.edu/intranet/comms_marketing/web_policy/digital-accessibility/alt-text-quiz/";

  // Set by the parent so "Share quiz" copies the CMS page URL, not this
  // iframe's own src.
  let parentUrl = "";

  function postToParent(msg) {
    if (!inFrame) return;
    try {
      window.parent.postMessage(msg, PARENT_ORIGIN);
    } catch (e) {
      // Parent gone or origin mismatch. Embedding is an enhancement; the quiz
      // still works, it just scrolls the way it did before.
    }
  }

  // Measure the body box, not the document. Once the parent has sized the
  // iframe, documentElement.scrollHeight is floored by the iframe's own height,
  // so it can report growth but never a shrink — every question would inherit
  // the tallest screen's height. body is content-sized (and display:flow-root in
  // embed mode keeps child margins from collapsing out of it).
  function sendHeight() {
    const body = document.body;
    postToParent({
      type: "altquiz:height",
      height: Math.ceil(
        Math.max(body.getBoundingClientRect().height, body.scrollHeight)
      ),
    });
  }

  // `top` is an offset in this document to bring to the top of the parent's
  // viewport. Height goes first and the scroll waits a frame, so the parent has
  // already resized the iframe before it works out where to land.
  function requestScroll(top) {
    if (!inFrame) return;
    sendHeight();
    requestAnimationFrame(function () {
      postToParent({
        type: "altquiz:scroll",
        top: Math.max(0, Math.round(top)),
      });
    });
  }

  // The focus moves below are deliberate, but the browser's implicit
  // scroll-into-view would race the parent's scroll. In embed mode the parent
  // owns positioning and focus just moves.
  const FOCUS_OPTS = inFrame ? { preventScroll: true } : undefined;

  if (inFrame) {
    window.addEventListener("message", function (event) {
      if (event.origin !== PARENT_ORIGIN) return;
      const data = event.data;
      if (!data || data.type !== "altquiz:parenturl") return;
      if (typeof data.url === "string") parentUrl = data.url;
      // The parent announcing itself is also our cue to (re)send the height.
      // Its listener may have attached after we sent the first one.
      sendHeight();
    });

    if (window.ResizeObserver) {
      new ResizeObserver(sendHeight).observe(document.body);
    }
    // Images settle after the observer is wired; catch the final size too.
    window.addEventListener("load", sendHeight);
    sendHeight();
  }

  // --- screen routing -----------------------------------------------------
  function showScreen(name) {
    state.screen = name;
    Object.keys(screens).forEach(function (key) {
      screens[key].hidden = key !== name;
    });
  }

  // --- question rendering -------------------------------------------------
  function renderQuestion() {
    const i = state.currentIndex;
    const q = QUESTIONS[i];

    els.progress.textContent = "Question " + (i + 1) + " of " + QUESTIONS.length;
    els.image.src = q.image;
    els.image.alt = q.screenshotAlt;
    els.prompt.textContent = q.prompt;

    // Warm the cache for the next screenshot so advancing feels instant.
    if (QUESTIONS[i + 1]) {
      new Image().src = QUESTIONS[i + 1].image;
    }

    // Build radio options.
    els.optionsForm.innerHTML = "";
    q.options.forEach(function (opt, idx) {
      const id = "opt-" + idx;

      const wrapper = document.createElement("label");
      wrapper.className = "option";
      wrapper.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.id = id;
      input.value = String(idx);
      input.addEventListener("change", function () {
        els.submitBtn.disabled = false;
      });

      const span = document.createElement("span");
      span.className = "option-text";
      span.textContent = opt.text;

      wrapper.appendChild(input);
      wrapper.appendChild(span);
      els.optionsForm.appendChild(wrapper);
    });

    // Back is available on every question except the first.
    els.backBtn.hidden = i === 0;

    // Reset feedback/live region for a clean state.
    els.feedback.hidden = true;
    els.feedback.className = "feedback";
    els.feedback.innerHTML = "";
    els.liveRegion.textContent = "";

    if (state.answers[i] !== undefined) {
      // Previously answered — restore the locked, answered state (no announcement).
      showAnswerState(i, state.answers[i], false);
    } else {
      // Fresh question.
      els.submitBtn.disabled = true;
      els.submitBtn.hidden = false;
      els.nextBtn.hidden = true;
    }
  }

  // Render the answered/locked state for question i with the chosen option.
  function showAnswerState(i, selected, announce) {
    const q = QUESTIONS[i];
    const isCorrect = selected === q.correctIndex;

    const labels = els.optionsForm.querySelectorAll(".option");
    labels.forEach(function (label, idx) {
      const input = label.querySelector("input");
      input.disabled = true;
      input.checked = idx === selected;
      label.classList.remove("is-correct", "is-wrong");
      if (idx === q.correctIndex) {
        label.classList.add("is-correct");
      } else if (idx === selected) {
        label.classList.add("is-wrong");
      }
    });

    const heading = isCorrect ? "✓ Best practice" : "Good start";
    // Option-specific note for the choice the learner made (wrong answers only).
    const note = !isCorrect ? q.options[selected].note : undefined;
    els.feedback.className = "feedback " + (isCorrect ? "is-correct" : "is-wrong");
    // The Cascade note is a secondary aside: the lesson above it is platform-neutral,
    // and most readers of this quiz don't work in Cascade at all.
    const cascade = q.cascadeNote
      ? '<div class="cascade-note">' +
        '<p class="cascade-note-label">In Cascade</p>' +
        "<p>" + escapeHtml(q.cascadeNote) + "</p>" +
        "</div>"
      : "";
    els.feedback.innerHTML =
      '<p class="feedback-heading">' + heading + "</p>" +
      (note ? "<p>" + escapeHtml(note) + "</p>" : "") +
      "<p>" + escapeHtml(q.explanation) + "</p>" +
      cascade;
    els.feedback.hidden = false;

    els.submitBtn.hidden = true;
    els.nextBtn.hidden = false;
    els.nextBtn.textContent =
      i === QUESTIONS.length - 1 ? "See results" : "Next question";

    if (announce) {
      // Focus the feedback region so screen readers read it in full; pushing
      // the explanation through the live region while moving focus elsewhere
      // would cut the announcement off.
      els.feedback.focus(FOCUS_OPTS);
    }
  }

  function getSelectedIndex() {
    const checked = els.optionsForm.querySelector('input[name="answer"]:checked');
    return checked ? parseInt(checked.value, 10) : -1;
  }

  function submitAnswer() {
    const i = state.currentIndex;
    if (state.answers[i] !== undefined) return; // already answered
    const selected = getSelectedIndex();
    if (selected < 0) return;

    state.answers[i] = selected;
    showAnswerState(i, selected, true);
    // Bring the explanation into view, keeping the answered options above it.
    requestScroll(els.feedback.getBoundingClientRect().top + window.scrollY - 120);
  }

  function next() {
    if (state.currentIndex < QUESTIONS.length - 1) {
      state.currentIndex++;
      renderQuestion();
      focusPrompt();
      requestScroll(0);
    } else {
      showResults();
    }
  }

  function back() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
      focusPrompt();
      requestScroll(0);
    }
  }

  function focusPrompt() {
    els.prompt.setAttribute("tabindex", "-1");
    els.prompt.focus(FOCUS_OPTS);
  }

  function computeScore() {
    return state.answers.reduce(function (total, selected, i) {
      return total + (selected === QUESTIONS[i].correctIndex ? 1 : 0);
    }, 0);
  }

  function showResults() {
    showScreen("results");
    const total = QUESTIONS.length;
    const score = computeScore();
    els.score.textContent = score + " / " + total;

    const label = score === 1 ? "best-practice answer" : "best-practice answers";
    els.scoreLabel.textContent = label;

    // Same encouragement at every score: the point is to keep practicing, not to rank.
    const msg =
      "Great job! Keep learning with the resources below, retake the quiz to keep " +
      "practicing, or share the quiz with colleagues!";
    els.resultsMsg.textContent = msg;
    els.liveRegion.textContent =
      "Quiz complete. " + score + " of " + total + " " + label + ". " + msg;

    // Manage focus: #screen-question (which held focus) is now hidden, so move
    // focus into the results screen rather than letting it fall to <body>.
    const title = document.getElementById("results-title");
    title.setAttribute("tabindex", "-1");
    title.focus(FOCUS_OPTS);
    requestScroll(0);
  }

  // moveFocus is false on first paint in embed mode: the quiz opens on question 1
  // there, and focusing the prompt would yank the host page down to the iframe.
  function startQuiz(moveFocus) {
    state.currentIndex = 0;
    state.answers = [];
    els.shareStatus.textContent = "";
    renderQuestion();
    showScreen("question");
    if (moveFocus === false) return;
    focusPrompt();
    requestScroll(0);
  }

  function shareQuiz() {
    const url = parentUrl || CANONICAL_URL;
    function ok() {
      els.shareStatus.textContent = "Link copied to clipboard!";
    }
    function fallback() {
      els.shareStatus.textContent = "Copy this link: " + url;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(ok, fallback);
    } else {
      fallback();
    }
  }

  // --- utilities ----------------------------------------------------------
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // --- wiring -------------------------------------------------------------
  document.getElementById("start-btn").addEventListener("click", function () {
    showScreen("intro");
    const h2 = screens.intro.querySelector("h2");
    h2.setAttribute("tabindex", "-1");
    h2.focus(FOCUS_OPTS);
    requestScroll(0);
  });
  document.getElementById("begin-btn").addEventListener("click", function () {
    startQuiz();
  });
  els.backBtn.addEventListener("click", back);
  // Submit via the button or by pressing Enter anywhere in the form.
  document.getElementById("answer-form").addEventListener("submit", function (e) {
    e.preventDefault();
    submitAnswer();
  });
  els.nextBtn.addEventListener("click", next);
  els.shareBtn.addEventListener("click", shareQuiz);
  document.getElementById("restart-btn").addEventListener("click", function () {
    startQuiz();
  });

  // Embedded, the Cascade page carries the title and the explainer, so there is
  // nothing for a start or intro screen to hold — open on question 1. The
  // standalone quiz still walks through start -> intro -> question.
  if (IS_EMBED) {
    startQuiz(false);
  } else {
    showScreen("start");
  }
})();
