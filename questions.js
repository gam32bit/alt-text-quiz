/*
 * Alt Text Quiz — question bank (data only).
 *
 * Each question:
 *   image         path to the screenshot
 *   screenshotAlt the screenshot's OWN alt text — gives a screen-reader user enough
 *                 page context to answer WITHOUT giving the answer away
 *   prompt        the question asked of the learner
 *   options       array of { text, note } — the candidate alt-text answers.
 *                 `note` (optional) is shown when the learner picks that option and
 *                 it isn't the best one: a short, specific reason why it falls short.
 *   correctIndex  index of the best answer in options
 *   explanation   teaching feedback shown after answering. Keep it to two sentences.
 *   cascadeNote   (optional) one sentence on how our Cascade templates constrain the
 *                 choice. Rendered as a secondary aside — the quiz is for the whole
 *                 campus, not only the people working in Cascade.
 *
 * The string "(no alt text — mark the image decorative)" is used as a visible option
 * label for cases where the correct move is an empty alt / decorative image.
 *
 * The one rule the whole quiz turns on:
 *   What is the key takeaway that a sighted person would get from this image?
 *     - No takeaway (purely aesthetic, or meaning already in nearby text) -> empty alt.
 *     - There is a takeaway -> describe it, concisely.
 *   A CAPTION is visible page text and can carry names, credit and context; alt text is
 *   what a screen reader gets. Provide both, and don't make them identical.
 *   Complex images (charts, maps) -> summarize the takeaway; when feasible, also offer
 *   the data another way — an accessible table, paragraph or download.
 */

const DECORATIVE = "(no alt text — mark the image decorative)";

const QUESTIONS = [
  {
    image: "src/images/reu-interns.png",
    screenshotAlt:
      "Screenshot of a VIMS web page section titled “Programs for College Students,” followed by a paragraph of body text about research-experience programs. The question asks about the group photo at the top of the section.",
    prompt:
      "This photo appears on the Outreach & Education page and shows REU interns with their certificates. What is the best alt text?",
    options: [
      {
        text: "A group of college students posing for a photo indoors",
        note:
          "True as far as it goes, but it drops the specifics that make the photo meaningful — who these students are and what they’re celebrating.",
      },
      {
        text: "REU interns pose with their certificates at the Batten School & VIMS visitor center",
      },
      {
        text: "Twelve people in business-casual clothes standing in two rows",
        note:
          "An accurate visual inventory, but it stops at the surface — a reader learns what the photo looks like, not what it means.",
      },
      {
        text: "Students",
        note:
          "Better than nothing, but so brief it gives a reader almost none of what a sighted visitor takes away from the photo.",
      },
    ],
    correctIndex: 1,
    explanation:
      "Ask what a sighted person actually takes away: specific people, a specific achievement, an identifiable place. The best answer names all three instead of stopping at the visible surface.",
  },
  {
    image: "src/images/tidewatch-legend.png",
    screenshotAlt:
      "Screenshot of a tidewatch water-level forecast chart for Sewells Point. Below the chart is a legend of small colored symbols paired with text labels such as “Observed,” “Astronomic,” and “Residual.” A red arrow has been added pointing to the small red dot next to the “Observed” label. The question asks about that red dot.",
    prompt: "What is the best alt text for the red dot in the legend (marked by the arrow)?",
    options: [
      {
        text: "Red dot",
        note:
          "Hearing “red dot” gives a screen-reader user nothing to act on — the meaning of the dot lives in the label beside it.",
      },
      { text: DECORATIVE },
      {
        text: "Red marker showing observed water levels",
        note:
          "This restates what the adjacent “Observed” label already says, so a screen reader would deliver the same information twice.",
      },
      {
        text: "Observed",
        note:
          "This duplicates the visible text label right next to the dot — a screen reader would read “Observed, Observed.”",
      },
    ],
    correctIndex: 1,
    explanation:
      "The dot carries no meaning the “Observed” label beside it doesn’t already give. No independent takeaway, so the alt is empty.",
    cascadeNote:
      "Cascade requires alt text in the “Display Name” field, so leaving it empty isn’t always an option.",
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
        note:
          "This level of detail isn’t necessary to meet alt text compliance — the anatomy belongs in the body text.",
      },
      {
        text: "American shad",
        note:
          "Close, but the page is already headed “American shad,” so this repeats the title without telling the reader a drawing of the species is there.",
      },
      { text: "Scientific line drawing of an American shad" },
      {
        text: DECORATIVE,
        note:
          "Defensible — the title already names the species. But what the image adds isn’t the name, it’s the shape, and marking it decorative hides that entirely.",
      },
    ],
    correctIndex: 2,
    explanation:
      "The takeaway isn’t the species’ name, which the page title already gives — it’s what the species looks like. Naming the image type earns its keep here: “line drawing” sets a different expectation than a photograph.",
  },
  {
    image: "src/images/directory-headshot.png",
    screenshotAlt:
      "Screenshot of a staff directory entry: a headshot on the left, and on the right the name “Joseph Caterine,” job title “Web & Content Strategist,” and contact details. The question asks what alt text the headshot should have.",
    prompt: "What is the best alt text for this headshot?",
    options: [
      {
        text: "Headshot of Joseph Caterine",
        note:
          "Very close! But “Headshot of” is wasted words — a screen reader already announces that this is an image.",
      },
      { text: "Joseph Caterine" },
      {
        text: "A smiling man with dark hair in a plaid shirt, outdoors",
        note:
          "This describes appearance instead of identity — in a staff directory, the person’s name is the information the reader needs.",
      },
      {
        text: DECORATIVE,
        note:
          "Good instinct — W&M’s Digital Accessibility Office advises exactly this for directory pages, since the name is already the page title. Our templates just don’t offer it.",
      },
    ],
    correctIndex: 1,
    explanation:
      "Skip “Headshot of,” “Image of,” and “Photo of” — a screen reader already announces it’s an image. On a directory page the person’s name is the information the reader needs.",
    cascadeNote:
      "Directory images can’t be marked decorative in our templates, so we advise using the person’s name.",
  },
  {
    image: "src/images/natural-resources-icon.png",
    screenshotAlt:
      "Screenshot of a card: a small stylized fish icon sits above a heading that reads “NATURAL RESOURCES,” followed by a sentence about sustainable management of fisheries and aquaculture. The question asks about the fish icon above the heading.",
    prompt: "What is the best alt text for this fish icon?",
    options: [
      {
        text: "Fish icon",
        note:
          "This tells the reader an icon exists, but the icon carries no meaning that the “Natural Resources” heading doesn’t already supply.",
      },
      {
        text: "Natural Resources",
        note:
          "The heading right beside the icon already says this — a screen reader would announce “Natural Resources” twice in a row.",
      },
      { text: DECORATIVE },
      {
        text: "A stylized fish illustration",
        note:
          "This describes ornament — swapping this icon for a different one wouldn’t change anything a reader learns from the card.",
      },
    ],
    correctIndex: 2,
    explanation:
      "Try the removal test: if this icon vanished, the card would say exactly the same thing, because the heading carries all the meaning. Contrast the shad drawing, where removing the image loses the one thing the page can’t say in words.",
    cascadeNote: "Our templates control this icon’s alt text — it isn’t the editor’s call.",
  },
  {
    image: "src/images/bottom-oxygen-map.png",
    screenshotAlt:
      "Screenshot of a map titled “Bottom Oxygen: Today’s Forecast, June 7, 2026.” It shows the Chesapeake Bay shaded with a color scale from red (low / hypoxic oxygen) to blue (high / healthy oxygen), with a dissolved-oxygen legend on the right. The question asks what alt text best serves this data map.",
    prompt: "What is the best alt text for this forecast map?",
    options: [
      {
        text: "A colorful map of the Bay shaded from red to blue, with a legend on the right",
        note:
          "This describes what the map looks like rather than what it shows — a reader still doesn’t learn where the low-oxygen water is.",
      },
      {
        text: "Bottom-oxygen forecast for the Chesapeake Bay, June 7, 2026",
        note:
          "A solid title, but a title isn’t a takeaway — the reader learns what the map is about without learning what it says.",
      },
      {
        text:
          "Map showing low-oxygen waters concentrated in the inner, northern Bay, improving toward the ocean",
      },
      {
        text: "Map of the Chesapeake Bay",
        note:
          "This identifies the subject but none of the information the map exists to communicate.",
      },
    ],
    correctIndex: 2,
    explanation:
      "Name the image type to orient the reader, then summarize the takeaway — where the low-oxygen water is — rather than what the map looks like. When it’s feasible, offering the underlying data another way is the gold standard for a data map.",
    cascadeNote:
      "The body content below the map is where that data usually goes — a short paragraph of the same numbers.",
  },
  {
    image: "src/images/sav-coverage-chart.png",
    screenshotAlt:
      "Screenshot of a line/area chart showing submerged aquatic vegetation (SAV) coverage in the Chesapeake Bay in hectares, with years from 1980 to the present along the x-axis and a horizontal line marking a goal of 74,821 hectares. The question asks what alt text best serves this chart.",
    prompt: "What is the best alt text for this chart?",
    options: [
      {
        text: "A green area chart with a jagged line rising toward a horizontal goal line",
        note:
          "This describes the chart’s appearance, not its meaning — colors and line shapes aren’t the information.",
      },
      {
        text: "Submerged aquatic vegetation coverage in the Chesapeake Bay, 1980–present",
        note:
          "A good title, but a title isn’t a takeaway — the trend (rising, still below the goal) is the point of the chart.",
      },
      {
        text:
          "Chart showing Bay underwater-grass (SAV) coverage generally rising since 1980 but still below the 74,821-hectare goal",
      },
      {
        text: "A line graph of SAV over time",
        note:
          "This names the chart type and topic without conveying anything the chart actually shows.",
      },
    ],
    correctIndex: 2,
    explanation:
      "Same idea as the map: name the type, then say what it shows — a general rise since 1980, still short of the goal. No sentence fully replaces a dataset, so offer the numbers another way when you can.",
  },
  {
    image: "src/images/marine-life-day.png",
    screenshotAlt:
      "Screenshot of a “For the Public” page section: a photo of several people seated at a table looking into microscopes at an event, above body text about VIMS public programs. The question asks what alt text the photo should have.",
    prompt:
      "This photo, from VIMS Marine Life Day, shows visitors using microscopes. What is the best alt text?",
    options: [
      {
        text: "People at tables",
        note:
          "Technically true, but it throws away everything that makes the photo worth including — the science, the event, the engagement.",
      },
      { text: "Visitors examine specimens under microscopes at VIMS Marine Life Day" },
      {
        text: "A woman looking into a microscope",
        note:
          "This zooms in on one detail and misses the bigger picture — a public event full of visitors doing hands-on science.",
      },
      {
        text: DECORATIVE,
        note:
          "This photo communicates real content — visitors engaged with science at a public event — so hiding it from screen readers loses that.",
      },
    ],
    correctIndex: 1,
    explanation:
      "What a sighted person takes away is visitors doing hands-on science at a specific public event. Naming the event and the activity is the context that matters.",
  },
  {
    image: "src/images/marine-science-day-crab.png",
    screenshotAlt:
      "Screenshot of a news article about Marine Science Day. It shows a photo of a young child smiling and holding up a small crab, and directly below the photo is a visible caption that reads “James, a young Marine Science Day attendee, holding a blue crab. Photo by Ethan Smith.” The question asks what alt text the photo should have, given that caption.",
    prompt:
      "This photo of a boy holding a crab appears in a news article, with a visible caption directly below it. What is the best alt text?",
    options: [
      {
        text: DECORATIVE,
        note:
          "A visible caption doesn’t make an image decorative — a caption is ordinary page text, not the image’s alternative.",
      },
      {
        text: "A young Marine Science Day attendee holds up a blue crab",
        note:
          "Nearly word-for-word the caption below it, so a screen-reader user hears the same sentence twice.",
      },
      {
        text: "A boy smiling",
        note: "This misses the crab, which is the reason the photo is on the page.",
      },
      { text: "A grinning boy holds up a blue crab" },
    ],
    correctIndex: 3,
    explanation:
      "The caption already supplies his name, the event and the photo credit, so the alt covers what the picture actually shows. Alt text and a caption should work together, not repeat each other word for word.",
    cascadeNote:
      "In our main content area the Image Description field is both the alt text and the visible caption.",
  },
  {
    image: "src/images/oyster-spat.png",
    screenshotAlt:
      "Screenshot of a “History & Mission” page section: a close-up photo of an open hand holding a cluster of small juvenile oysters, above body text about an oyster-breeding program. There is no caption. The question asks what alt text the photo should have.",
    prompt: "What is the best alt text for this close-up photo?",
    options: [
      {
        text: "Hand",
        note:
          "The hand isn’t the subject — the juvenile oysters it holds are the reason this photo is on the page.",
      },
      {
        text:
          "A hand holds juvenile oysters (spat) at the Aquaculture Genetics & Breeding Technology Center",
      },
      {
        text:
          "An open sunlit human palm, fingers slightly curled, cradling roughly a dozen small grey-brown clustered oyster spat, with blurred white aquaculture tanks and equipment visible in the background",
        note:
          "Thorough, but it over-describes — the lighting, finger position, and blurred background don’t change what a reader learns.",
      },
      {
        text: DECORATIVE,
        note:
          "This photo shows the actual subject of the section — the breeding program’s oysters — so it’s content, not decoration.",
      },
    ],
    correctIndex: 1,
    explanation:
      "Aim for the middle: the shortest options leave out the subject, and the paragraph-length one over-describes. Identify the subject concisely with the context that matters, then stop.",
  },
];
