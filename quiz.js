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
      els.feedback.focus();
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
  }

  function next() {
    if (state.currentIndex < QUESTIONS.length - 1) {
      state.currentIndex++;
      renderQuestion();
      focusPrompt();
    } else {
      showResults();
    }
  }

  function back() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
      focusPrompt();
    }
  }

  function focusPrompt() {
    els.prompt.setAttribute("tabindex", "-1");
    els.prompt.focus();
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
    title.focus();
  }

  function startQuiz() {
    state.currentIndex = 0;
    state.answers = [];
    els.shareStatus.textContent = "";
    renderQuestion();
    showScreen("question");
    focusPrompt();
  }

  function shareQuiz() {
    const url = window.location.href;
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
    h2.focus();
  });
  document.getElementById("begin-btn").addEventListener("click", startQuiz);
  els.backBtn.addEventListener("click", back);
  // Submit via the button or by pressing Enter anywhere in the form.
  document.getElementById("answer-form").addEventListener("submit", function (e) {
    e.preventDefault();
    submitAnswer();
  });
  els.nextBtn.addEventListener("click", next);
  els.shareBtn.addEventListener("click", shareQuiz);
  document.getElementById("restart-btn").addEventListener("click", startQuiz);

  showScreen("start");
})();
