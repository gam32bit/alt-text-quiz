/*
 * Alt Text Quiz — question bank (data only).
 *
 * Each question:
 *   image         path to the screenshot
 *   screenshotAlt the screenshot's OWN alt text — gives a screen-reader user enough
 *                 page context to answer WITHOUT giving the answer away
 *   prompt        the question asked of the learner
 *   options       array of { text } — the candidate alt-text answers
 *   correctIndex  index of the best answer in options
 *   explanation   teaching feedback shown after answering
 *
 * The string "(no alt text — mark the image decorative)" is used as a visible option
 * label for cases where the correct move is an empty alt / decorative image.
 *
 * The one rule the whole quiz turns on (W3C WAI alt decision tree):
 *   Does the image carry information the user doesn't already have in REAL text?
 *     - No  -> empty alt (decorative / redundant).
 *     - Yes -> describe it, concisely.
 *   A nearby CAPTION does not count as that text — it isn't programmatically tied to
 *   the image, so a captioned photo still needs alt.
 *   Complex images (charts, maps) -> a short summary PLUS the data offered another way.
 */

const DECORATIVE = "(no alt text — mark the image decorative)";

const QUESTIONS = [
  {
    image: "src/images/reu-interns.png",
    screenshotAlt:
      "Screenshot of a VIMS web page section titled “Programs for College Students,” followed by a paragraph of body text about research-experience programs. The question asks about the group photo at the top of the section.",
    prompt:
      "This photo appears on a page about the Research Experiences for Undergraduates (REU) program and shows interns receiving their certificates. What is the best alt text?",
    options: [
      { text: "A group of college students posing for a photo indoors" },
      {
        text:
          "REU interns receive their certificates at the Batten School & VIMS visitor center",
      },
      { text: "Eleven people in business-casual clothes standing in two rows" },
      { text: "Summer students at a marine laboratory" },
    ],
    correctIndex: 1,
    explanation:
      "The photo carries information that isn’t in the nearby text — who these people are and what milestone this is — so the alt has to supply it. The best answer keeps the details that matter (REU interns, the certificates, the location). “A group of college students” is too generic, the head-count description fixates on pixels instead of meaning, and “summer students at a marine laboratory” drops the specific context. This is why we say context matters.",
  },
  {
    image: "src/images/tidewatch-legend.png",
    screenshotAlt:
      "Screenshot of a tidewatch water-level forecast chart for Sewells Point. Below the chart is a legend of small colored symbols paired with text labels such as “Observed,” “Astronomic,” and “Residual.” A red arrow has been added pointing to the small red dot next to the “Observed” label. The question asks about that red dot.",
    prompt: "What is the best alt text for the red dot in the legend (marked by the arrow)?",
    options: [
      { text: "Red dot" },
      { text: DECORATIVE },
      { text: "Red marker showing observed water levels" },
      { text: "Observed" },
    ],
    correctIndex: 1,
    explanation:
      "The swatch gets an empty alt — but not because color never matters. It’s redundant: the “Observed” label right beside it already names the series, and the color only means anything together with the chart. And the chart is a complex image whose real fix is providing its data separately (see the map and SAV questions). So the swatch itself adds nothing on its own → empty alt.",
  },
  {
    image: "src/images/american-shad.png",
    screenshotAlt:
      "Screenshot of a species page headed “American shad” with the scientific name “Alosa sapidissima” below it, then a black-and-white scientific illustration of the fish in side profile, followed by descriptive body text. The question asks what alt text the illustration should have.",
    prompt: "What is the best alt text for this fish illustration?",
    options: [
      {
        text:
          "A detailed black-and-white side-profile illustration of a fish with a forked tail, pointed snout, and a row of small spots along the upper body, facing left",
      },
      { text: "American shad" },
      { text: "Fish" },
      { text: DECORATIVE },
    ],
    correctIndex: 1,
    explanation:
      "Unlike the decorative fish icon later in the quiz — which is interchangeable ornament — this illustration is the page’s actual subject, so it’s meaningful content and needs alt text. But keep it concise: “American shad” identifies it, and the detailed anatomy belongs in the body text, not the alt. Don’t pad it into a paragraph, and don’t drop it to a vague “Fish.”",
  },
  {
    image: "src/images/directory-headshot.png",
    screenshotAlt:
      "Screenshot of a staff directory entry: a headshot on the left, and on the right the name “Joseph Caterine,” job title “Web & Content Strategist,” and contact details. The question asks what alt text the headshot should have.",
    prompt: "What is the best alt text for this headshot?",
    options: [
      { text: "Headshot of Joseph Caterine" },
      { text: "Joseph Caterine" },
      { text: "A smiling man with dark hair in a plaid shirt, outdoors" },
      { text: "Photo" },
    ],
    correctIndex: 1,
    explanation:
      "Just the name. Don’t start alt text with “Headshot of,” “Image of,” or “Photo of” — a screen reader already announces it’s an image, so those words are wasted. For a profile photo, the person’s name is the information the reader needs.",
  },
  {
    image: "src/images/natural-resources-icon.png",
    screenshotAlt:
      "Screenshot of a card: a small stylized fish icon sits above a heading that reads “NATURAL RESOURCES,” followed by a sentence about sustainable management of fisheries and aquaculture. The question asks about the fish icon above the heading.",
    prompt: "What is the best alt text for this fish icon?",
    options: [
      { text: "Fish icon" },
      { text: "Natural Resources" },
      { text: DECORATIVE },
      { text: "A stylized fish illustration" },
    ],
    correctIndex: 2,
    explanation:
      "Empty alt. This is the clean decorative case: the icon is interchangeable ornament sitting next to the “Natural Resources” heading, which already carries the meaning — so the icon adds nothing. (Contrast the American shad illustration, which IS the content. Same “a fish,” opposite answer, because one is decoration and the other is information.) Writing “Natural Resources” as the alt would just make a screen reader say it twice.",
  },
  {
    image: "src/images/bottom-oxygen-map.png",
    screenshotAlt:
      "Screenshot of a map titled “Bottom Oxygen: Today’s Forecast, June 7, 2026.” It shows the Chesapeake Bay shaded with a color scale from red (low / hypoxic oxygen) to blue (high / healthy oxygen), with a dissolved-oxygen legend on the right. The question asks what alt text best serves this data map.",
    prompt: "What is the best alt text for this forecast map?",
    options: [
      { text: "A colorful map of the Bay shaded from red to blue, with a legend on the right" },
      { text: "Bottom-oxygen forecast for the Chesapeake Bay, June 7, 2026" },
      {
        text:
          "Low-oxygen waters concentrate in the inner, northern Bay and improve toward the ocean — full data in the table below",
      },
      { text: "Map of the Chesapeake Bay" },
    ],
    correctIndex: 2,
    explanation:
      "A map has no perfect short answer, so two things matter. First, summarize the takeaway (where the low-oxygen water is), not the pixels — the “red to blue” option describes how it looks, not what it means. Second, a title alone (“Bottom-oxygen forecast…”) names the image but conveys nothing; real accessibility means giving people the underlying data another way, such as a table or download. The best answer does both.",
  },
  {
    image: "src/images/sav-coverage-chart.png",
    screenshotAlt:
      "Screenshot of a line/area chart showing submerged aquatic vegetation (SAV) coverage in the Chesapeake Bay in hectares, with years from 1980 to the present along the x-axis and a horizontal line marking a goal of 74,821 hectares. The shaded area trends generally upward across the period. The question asks what alt text best serves this chart.",
    prompt: "What is the best alt text for this chart?",
    options: [
      { text: "A green area chart with a jagged line rising toward a horizontal goal line" },
      { text: "Submerged aquatic vegetation coverage in the Chesapeake Bay, 1980–present" },
      {
        text:
          "Bay underwater-grass (SAV) coverage has generally risen since 1980 but is still below the 74,821-hectare goal — see the data table for values",
      },
      { text: "A line graph of SAV over time" },
    ],
    correctIndex: 2,
    explanation:
      "Same idea as the oxygen map. Summarize what the chart shows — a general rise since 1980, still short of the goal — rather than its shape (“jagged line”) or just its title. Then, because no sentence can replace a dataset, offer the numbers as a table or download. Charts and maps are the cases where alt text alone is never quite enough.",
  },
  {
    image: "src/images/marine-life-day.png",
    screenshotAlt:
      "Screenshot of a “For the Public” page section: a photo of several people seated at a table looking into microscopes at an event, above body text about VIMS public programs. The question asks what alt text the photo should have.",
    prompt: "This photo, from VIMS Marine Life Day, shows visitors using microscopes. What is the best alt text?",
    options: [
      { text: "People at tables" },
      {
        text: "Visitors examine specimens under microscopes at VIMS Marine Life Day",
      },
      { text: "A woman looking into a microscope" },
      { text: DECORATIVE },
    ],
    correctIndex: 1,
    explanation:
      "Meaningful content, so describe it — and the meaning is the event and the activity, which aren’t in the nearby text. “People at tables” is technically true but throws away everything that makes the photo worth including. Naming Marine Life Day and what the visitors are doing is the relevant context.",
  },
  {
    image: "src/images/marine-science-day-crab.png",
    screenshotAlt:
      "Screenshot of a news article about Marine Science Day. It shows a photo of a young child smiling and holding up a small crab, and directly below the photo is a visible caption that reads “James, a young Marine Science Day attendee, holding a blue crab. Photo by Ethan Smith.” The question asks what alt text the photo should have, given that caption.",
    prompt: "This photo has a visible caption on the page (you can see it in the screenshot). What is the best alt text?",
    options: [
      { text: DECORATIVE },
      { text: "A young Marine Science Day attendee holds up a blue crab" },
      { text: "A boy smiling" },
      { text: "Child holding a crab" },
    ],
    correctIndex: 1,
    explanation:
      "A caption is NOT a substitute for alt text — that’s settled guidance, not a preference. A caption is ordinary page text: it isn’t programmatically tied to the image and it serves a different purpose. So a meaningful photo still needs its own concise description with the relevant context. (This is the flip side of the decorative icon: the icon truly adds nothing beyond its heading, but a real photo isn’t “covered” just because a caption sits near it.)",
  },
  {
    image: "src/images/oyster-spat.png",
    screenshotAlt:
      "Screenshot of a “History & Mission” page section: a close-up photo of an open hand holding a cluster of small juvenile oysters, above body text about an oyster-breeding program. There is no caption. The question asks what alt text the photo should have.",
    prompt: "What is the best alt text for this close-up photo?",
    options: [
      { text: "Hand" },
      {
        text:
          "A hand holds juvenile oysters (spat) at the Aquaculture Genetics & Breeding Technology Center",
      },
      {
        text:
          "An open sunlit human palm, fingers slightly curled, cradling roughly a dozen small grey-brown clustered oyster spat, with blurred white aquaculture tanks and equipment visible in the background",
      },
      { text: DECORATIVE },
    ],
    correctIndex: 1,
    explanation:
      "Aim for the middle. “Hand” misses the actual subject (the oyster spat and the breeding program), while the paragraph-length version over-describes details that don’t matter. Identify the subject concisely with the relevant context — oyster spat at the Aquaculture Genetics & Breeding Technology Center — and stop there.",
  },
];
