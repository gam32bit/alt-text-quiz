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
 */

const DECORATIVE = "(no alt text — mark the image decorative)";

const QUESTIONS = [
  {
    image: "src/images/Screenshot 2026-06-07 112036.png",
    screenshotAlt:
      "Screenshot of a VIMS web page section titled “Programs for College Students.” It shows a group photo of people standing together holding certificates, followed by a paragraph of body text about research experience programs. There is no caption describing the photo. The question asks what alt text the photo should have.",
    prompt: "What is the best alt text for this group photo?",
    options: [
      { text: "A group of college students" },
      { text: "Students" },
      {
        text:
          "REU interns hold their certificates at the Batten School & VIMS visitor center",
      },
      { text: DECORATIVE },
    ],
    correctIndex: 2,
    explanation:
      "Context is the whole point here. These aren’t just “college students” — they’re Research Experiences for Undergraduates (REU) interns, and the certificates and location are meaningful details the surrounding text doesn’t fully spell out. Because there’s no caption carrying that information, the alt text has to.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 112153.png",
    screenshotAlt:
      "Screenshot of a tidewatch water-level forecast chart for Sewells Point. Below the chart is a legend made of small colored symbols paired with text labels such as “Observed,” “Astronomic,” and “Residual.” A red arrow has been added pointing to the small red dot symbol next to the “Observed” label. The question asks about that red dot.",
    prompt: "What is the best alt text for the red dot in the legend (marked by the arrow)?",
    options: [
      { text: "Red dot" },
      { text: DECORATIVE },
      { text: "A red circle icon indicating observed sensor data" },
      { text: "Observed water-level legend marker, red" },
    ],
    correctIndex: 1,
    explanation:
      "Trick question! The red dot is decorative. The legend already has a visible text label (“Observed”) right next to it, so describing the dot would just repeat information a screen reader already announces. Decorative images get an empty alt (alt=\"\") so assistive tech skips them.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 112450.png",
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
      "Alt text doesn’t have to be verbose. “American shad” identifies the subject, and the detailed anatomy lives in the body text where it belongs. (The page heading also says “American shad,” but since this is the main content image illustrating the species, naming it briefly is appropriate — just resist the urge to write a paragraph.)",
  },
  {
    image: "src/images/Screenshot 2026-06-07 112539.png",
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
      "Just the name. Don’t start alt text with “Headshot of,” “Image of,” or “Photo of” — screen readers already announce that it’s an image, so those words are redundant. For a profile photo, the person’s name is exactly what the reader needs.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 112636.png",
    screenshotAlt:
      "Screenshot of a decorative card: a small stylized fish icon sits above a heading that reads “NATURAL RESOURCES,” followed by a sentence about sustainable management of fisheries and aquaculture. The question asks about the fish icon above the heading.",
    prompt: "What is the best alt text for this fish icon?",
    options: [
      { text: "Fish icon" },
      { text: "Natural Resources" },
      { text: DECORATIVE },
      { text: "A stylized fish illustration" },
    ],
    correctIndex: 2,
    explanation:
      "Another trick — it’s decorative. The icon is paired with the visible “Natural Resources” heading, which already conveys the meaning. The icon is just visual flair, so it gets an empty alt (alt=\"\"). Writing “Natural Resources” as the alt would make a screen reader announce the same words twice.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 112728.png",
    screenshotAlt:
      "Screenshot of a map titled “Bottom Oxygen: Today’s Forecast, June 7, 2026.” It shows the Chesapeake Bay shaded with a color scale from red (low / hypoxic oxygen) to blue (high / healthy oxygen), with a dissolved-oxygen legend on the right. The question asks what alt text best serves this data map.",
    prompt: "What is the best alt text for this forecast map?",
    options: [
      { text: "Map" },
      { text: "Map of Chesapeake Bay" },
      {
        text:
          "The map shows hypoxic (low-oxygen) waters in the inner Bay, concentrated in the north, with waters becoming healthier closer to the ocean — full data in the table below",
      },
      { text: DECORATIVE },
    ],
    correctIndex: 2,
    explanation:
      "Complex images like maps and charts often have no perfect short answer — you do your best to summarize the key takeaway. But the deeper lesson: real accessibility means giving people the underlying data another way, such as a downloadable file or a data table on the page. Alt text alone can’t make a dense map fully accessible.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 121046.png",
    screenshotAlt:
      "Screenshot of a line/area chart showing submerged aquatic vegetation (SAV) coverage in the Chesapeake Bay in hectares, with years from 1980 to the present along the x-axis and a horizontal line marking a goal of 74,821 hectares. The shaded area trends generally upward across the period. The question asks what alt text best serves this chart.",
    prompt: "What is the best alt text for this chart?",
    options: [
      { text: "Chart" },
      { text: "A line graph going up and down" },
      {
        text:
          "Bay SAV (underwater grass) coverage has generally increased from 1980 to today, though it remains below the 74,821-hectare goal — see the data table for values",
      },
      { text: "SAV" },
    ],
    correctIndex: 2,
    explanation:
      "Like the oxygen map, a data chart has no single perfect alt text. Summarize what the chart actually shows — here, a general upward trend in coverage from 1980 to the present, still short of the goal line — then, for genuine accessibility, provide the data as a table or download so people can explore the numbers themselves.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 113132.png",
    screenshotAlt:
      "Screenshot of a “For the Public” page section: a photo of several people seated at a table looking into microscopes at an event, above body text about VIMS public programs. The question asks what alt text the photo should have.",
    prompt: "What is the best alt text for this event photo?",
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
      "Context again: naming the event (Marine Life Day) and the activity (examining specimens under microscopes) tells the reader why this photo is here. “People at tables” is technically true but strips out everything that makes the image meaningful.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 112319.png",
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
      "A visible caption is NOT a substitute for alt text. The caption is ordinary page text — it isn’t programmatically tied to the image the way alt text is, and captions and alt text serve different purposes. So the image still needs its own description: name the subject and the context — a young attendee holding a blue crab at Marine Science Day.",
  },
  {
    image: "src/images/Screenshot 2026-06-07 113037.png",
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
      "Aim for the middle. “Hand” misses the actual subject (the oyster spat and the breeding program), while the paragraph-length description over-describes details that don’t matter to the reader. Identify the subject concisely with the relevant context — oyster spat at the Aquaculture Genetics & Breeding Technology Center — and stop there.",
  },
];
