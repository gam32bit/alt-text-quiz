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
 * The one rule the whole quiz turns on:
 *   What is the key takeaway that a sighted person would get from this image?
 *     - No takeaway (decoration, or icon/label already in nearby text) -> empty alt.
 *     - There is a takeaway -> describe it, concisely.
 *   A nearby CAPTION does not replace alt text — it isn't programmatically tied to
 *   the image, so a captioned photo still needs its own alt.
 *   Complex images (charts, maps) -> summarize the takeaway PLUS offer the data another way.
 */

const DECORATIVE = "(no alt text — mark the image decorative)";

const QUESTIONS = [
  {
    image: "src/images/reu-interns.png",
    screenshotAlt:
      "Screenshot of a VIMS web page section titled “Programs for College Students,” followed by a paragraph of body text about research-experience programs. The question asks about the group photo at the top of the section.",
    prompt:
      "This group photo appears in the “Programs for College Students” section of the Outreach & Education page. What is the best alt text?",
    options: [
      { text: "A group of college students posing for a photo indoors" },
      {
        text:
          "REU interns pose with their certificates at the Batten School & VIMS visitor center",
      },
      { text: "Twelve people in business-casual clothes standing in two rows" },
      { text: "Students" },
    ],
    correctIndex: 1,
    explanation:
      "Any description here beats nothing. But ask what a sighted person actually takes away: a milestone moment — specific people, specific achievement, identifiable place. Most options here capture something real; the best answer is the one that names all three (REU interns, certificates, location) instead of stopping at the visible surface. This is why we say context matters.",
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
      "The swatch gets an empty alt — but not because color never matters. A sighted person’s takeaway from this dot is just “that’s the observed series marker” — and the “Observed” label right beside it already gives them that. The color only means anything together with the chart, and the chart’s real fix is providing its data separately (see the map and SAV questions). No independent takeaway → empty alt.",
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
      "Empty alt. A sighted person glancing at this icon takes away “there's a fish here” — but the “Natural Resources” heading right beside it already supplies the meaningful takeaway. The icon is interchangeable ornament; swapping it for a different icon wouldn't change anything a reader learns. (Contrast the American shad illustration, which IS the content. Same “a fish,” opposite answer, because one is decoration and the other is the point of the page.) Writing “Natural Resources” as the alt would just make a screen reader say it twice.",
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
      "A map has no perfect short answer, so two things matter. First, summarize the takeaway (where the low-oxygen water is) rather than what the map looks like — a reader who can't see the chart needs to know what it shows, not what colors it uses. Second, real accessibility means giving people the underlying data another way, such as a table or download. The best answer does both.",
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
      "Same idea as the oxygen map. Summarize what the chart shows — a general rise since 1980, still short of the goal — rather than describing what it looks like or just naming the dataset. Then, because no sentence can replace a dataset, offer the numbers as a table or download. Charts and maps are the cases where alt text alone is never quite enough.",
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
      "Ask what a sighted person takes away: visitors engaged with science at a specific public event. That’s the meaning the photo communicates, and the alt text has to convey it. “People at tables” is technically true but throws away everything that makes the photo worth including. Naming Marine Life Day and what the visitors are doing is the relevant context.",
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
      "A sighted person gets a clear takeaway from this photo — a young attendee’s delight at holding a blue crab — and that takeaway still needs alt text even though a caption is visible on the page. A caption is ordinary page text: it isn’t programmatically tied to the image and it serves a different purpose. The rule is the same as always: describe what a sighted person would take away. A caption nearby doesn’t change what the image communicates on its own.",
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
      "Aim for the middle. The shortest options are a start but leave out the actual subject; the paragraph-length version is thorough but over-describes details that don’t change what a reader learns. Identify the subject concisely with the relevant context — oyster spat at the Aquaculture Genetics & Breeding Technology Center — and stop there.",
  },
];
