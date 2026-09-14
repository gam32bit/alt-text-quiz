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
| `styles.css` | 2026 brand theme (Marine Blue / Midnight Blue / WM Gold); responsive; respects reduced motion. |
| `quiz.js` | Screen routing, scoring, and feedback rendering. |
| `questions.js` | The question bank — **edit content here**, no logic changes needed. |
| `enhance.js` | Progressive enhancements on top of `quiz.js`: segmented progress tracker and the click-to-enlarge screenshot overlay. |
| `embed-parent.js` | Runs on the *host* page, not in the quiz. Sizes the iframe, scrolls the page, and posts the visible viewport strip to the quiz. See "Embed in Cascade". |
| `src/images/` | The screenshots used in the quiz. |

## Editing the quiz

All questions live in `questions.js` as the `QUESTION_BANK` array. Each item has the image
path, the screenshot's own alt text (`screenshotAlt` — page context, written so it doesn't
give the answer away), the `prompt`, the answer `options`, the `correctIndex`, and the
`explanation` shown after answering. Each non-best option can also carry a `note` — a short,
option-specific reason it falls short, shown above the general explanation when the learner
picks it. Add, remove, or reword freely — the logic is fully data-driven.

To take a question out of rotation without losing it, add `retired: true` to it. `QUESTIONS`
— what the quiz actually asks — is `QUESTION_BANK` minus the retired ones, and everything
that counts questions (the progress label, the segment tracker, the score) reads that, so
nothing else needs editing. Delete the flag to put the question back. The staff-directory
headshot question is retired right now.

Learners can move **Back** to revisit earlier questions (their previous answer and its
feedback are preserved); Back is hidden on the first question. The results screen has a
**Share quiz** button that copies the page URL to the clipboard.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Settings → Pages → deploy from the `main` branch, root (`/`).
3. The quiz will be served at `https://<user>.github.io/<repo>/`.

## Embed in Cascade (or any CMS)

The quiz embeds as an iframe, plus a small script on the **host** page that sizes the
iframe to the quiz's content and does the scrolling. Without that script you get a
scrollbar inside a scrollbar, and "Next question" leaves you stranded wherever you
were — a cross-origin iframe cannot resize itself or scroll its parent.

### 1. The iframe, in the page's WYSIWYG

```html
<iframe src="https://gam32bit.github.io/alt-text-quiz/?embed=1"
        title="Alt Text Quiz" width="100%" height="900"
        allow="clipboard-write" style="border:0; display:block; width:100%;"></iframe>
```

- `?embed=1` turns on embed mode: the quiz skips its own start screen (the host page
  already has the title and lede), drops the card chrome and tinted background so the
  content sits straight on white, shrinks the results photo, and goes two-column on the
  question screen at 900px and wider — screenshot right, question and answers left. (The
  intro's two-column head — prose left, example photo top right — is not embed-specific;
  it applies in both modes at 700px and wider.)
- `allow="clipboard-write"` is **required** for the "Share quiz" button. Without it the
  browser blocks the Clipboard API in a cross-origin frame and the button silently
  falls back to printing the link on screen.
- Keep `height="900"`. It is the fallback if the script below never loads — the embed
  then behaves like a plain iframe rather than collapsing. For the same reason, do
  **not** add `scrolling="no"`.

### 2. The host-page script, via INCLUDES_EXTRA

Following W&M Web & Design's pattern for JavaScript in Cascade:

1. Create a `_scripts` folder in the section holding the page.
2. Add `embed-parent.js` from this repo to it (as `alt-text-quiz-embed.js`, say).
3. Create a **Velocity** format in a `_formats` folder — name it to match the script,
   e.g. `alt-text-quiz-embed` — whose entire contents is the one line that loads it:
   ```html
   <script src="/path/to/_scripts/alt-text-quiz-embed.js"></script>
   ```
   Velocity, not XSLT: a Velocity format passes through anything that isn't a `#`
   directive or a `$` reference, so this needs no templating at all. XSLT serializes
   empty elements as self-closing, and a `<script src="..."/>` makes HTML parsers
   swallow the rest of the page as script content.
4. On the quiz page, Configure tab, assign that format in the **INCLUDES_EXTRA** region.
5. Publish the `_scripts` file, then republish the quiz page. The format itself is not
   a publishable asset — it is applied when the page renders — so the page needs a
   republish to pick it up.

Nothing here touches the quiz's CSS, so the Cascade template has nothing to block —
the stylesheet stays inside the iframe, where it also cannot collide with the site
theme (this stylesheet sets `*`, `html`, `body`, `h1`–`h3`, `a`, and generic class
names like `.btn` and `.sr-only`, so it is not safe to load on a CMS page as-is).

### 3. Tune the header offset

`embed-parent.js` has a `HEADER_OFFSET` constant, default `90`, so scroll targets don't
land underneath the sticky site header. Measure the real one once — select the header
in devtools and run `$0.getBoundingClientRect().height` — and set it.

### Moving the quiz off GitHub Pages

Two constants, one in each file: `PARENT_ORIGIN` in `quiz.js` (the page the quiz is
embedded on) and `QUIZ_ORIGIN` in `embed-parent.js` (where the quiz is served). Both
are checked on every message; neither is ever `"*"`.

### The messages

| Message | Direction | Effect |
|---|---|---|
| `altquiz:height` | quiz → host | Host sets the iframe's height. No inner scrollbar. |
| `altquiz:scroll` | quiz → host | Host scrolls so the given offset sits below the header. Sent on Next, Back, Submit, and results. |
| `altquiz:parenturl` | host → quiz | Tells the quiz the host URL (for Share) and prompts a height. |

## Accessibility

The quiz is built to model good accessibility: keyboard-operable controls (including
Enter to submit an answer), visible focus styles, grouped radio options in a labelled
fieldset, focus moved to the feedback region after each answer so screen readers read it
in full, an `aria-live` region that announces the final score, correct/incorrect signaled
with text + symbols (not color alone), and a skip link. Each screenshot has alt text giving enough page context
to engage with the question without revealing the answer.
