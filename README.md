# Alt Text Quiz

An interactive quiz that teaches how to write good alt text, using real screenshots
from the VIMS website. Static, framework-free (HTML/CSS/JS) — no build step.

## Run locally

Just open `index.html` in a browser. (No server required, though a simple static
server avoids any browser file:// quirks: `python3 -m http.server` then visit
<http://localhost:8000>.)

## Files

| File | Purpose |
|------|---------|
| `index.html` | All four screens (start / intro / question / results) as sections. |
| `styles.css` | VIMS blue–silver–white theme; responsive; respects reduced motion. |
| `quiz.js` | Screen routing, scoring, and feedback rendering. |
| `questions.js` | The question bank — **edit content here**, no logic changes needed. |
| `src/images/` | The screenshots used in the quiz. |

## Editing the quiz

All questions live in `questions.js` as the `QUESTIONS` array. Each item has the image
path, the screenshot's own alt text (`screenshotAlt` — page context, written so it doesn't
give the answer away), the `prompt`, the answer `options`, the `correctIndex`, and the
`explanation` shown after answering. Add, remove, or reword freely — the logic is fully
data-driven.

Learners can move **Back** to revisit earlier questions (their previous answer and its
feedback are preserved); Back is hidden on the first question. The results screen has a
**Share quiz** button that copies the page URL to the clipboard.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Settings → Pages → deploy from the `main` branch, root (`/`).
3. The quiz will be served at `https://<user>.github.io/<repo>/`.

## Embed in Cascade (or any CMS)

The whole quiz is self-contained, so it embeds via an iframe:

```html
<iframe src="https://<user>.github.io/<repo>/" width="100%" height="900"
        title="Alt Text Quiz" style="border:0;"></iframe>
```

## Accessibility

The quiz is built to model good accessibility: keyboard-operable controls (including
Enter to submit an answer), visible focus styles, grouped radio options in a labelled
fieldset, focus moved to the feedback region after each answer so screen readers read it
in full, an `aria-live` region that announces the final score, correct/incorrect signaled
with text + symbols (not color alone), and a skip link. Each screenshot has alt text giving enough page context
to engage with the question without revealing the answer.
