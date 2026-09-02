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
 *   explanation   teaching feedback shown after answering
 *   cascadeNote   (optional) Cascade-specific footnote rendered below the explanation,
 *                 for the cases where our templates constrain what an editor can
 *                 actually do. Deliberately secondary — the quiz is for the whole
 *                 campus, not only the people working in Cascade.
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
 *   Complex images (charts, maps) -> summarize the takeaway; when feasible, also offer
 *   the data another way — an accessible table, paragraph or download.
 *   Naming the image type ("map," "chart," "line drawing") helps when the type is
 *   itself information; "photo of" / "image of" never is.
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
        text:
          "REU interns pose with their certificates at the Batten School & VIMS visitor center",
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
      "Ask what a sighted person actually takes away: a milestone moment — specific people, specific achievement, identifiable place. The best answer names all three (REU interns, certificates, location) instead of stopping at the visible surface. This is why context matters.",
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
      "The swatch gets an empty alt — but not because color never matters. A sighted person’s takeaway from this dot is just “that’s the observed series marker,” and the “Observed” label right beside it already gives them that. No independent takeaway → empty alt.",
    cascadeNote:
      "Deciding an image is decorative and being able to act on it are two different things. Some of our templates require an Image Description, so you can’t always leave the field empty even when empty is the right answer. Make the judgment anyway, put the least redundant thing you can in the field, and tell the web team which template is forcing your hand — that’s a template fix, not a writing problem.",
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
          "Thorough, but the anatomical detail belongs in the body text — alt text this long is a chore to listen to and doesn’t add meaning.",
      },
      {
        text: "American shad",
        note:
          "Close, and defensible. But the page is already headed “American shad,” so this alt mostly repeats the title — a reader hears the species name twice and still doesn’t learn the page holds a drawing of it.",
      },
      { text: "Scientific line drawing of an American shad" },
      {
        text: DECORATIVE,
        note:
          "A serious answer, and the reasoning behind it is sound: the page title already names the species, so the alt looks redundant. What the image adds isn’t the name, though — it’s what the species looks like. Mark it decorative and a screen-reader user never learns the illustration is there at all.",
      },
    ],
    correctIndex: 2,
    explanation:
      "It’s content, not ornament — and naming what kind of image it is does real work here. The case against alt text is a good one: the page is headed “American shad,” so why describe the picture? Because the takeaway isn’t the species’ name, it’s the species’ shape, and a title can’t carry that. Calling it a scientific line drawing also sets the right expectation — an identification illustration, not a photograph. That’s the test for naming an image type: do it when the type is itself information (map, chart, line drawing), skip it when it’s just “photo of” or “image of.” Leave the anatomy to the body text.",
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
          "Good instinct — and on the merits, arguably the right one. The name is right there as the page title, so there’s a real case that the photo adds nothing. Our directory templates just don’t offer that choice, which is why the name is what we advise here.",
      },
    ],
    correctIndex: 1,
    explanation:
      "Two things going on. First: don’t start alt text with “Headshot of,” “Image of,” or “Photo of” — a screen reader already announces it’s an image, so those words are wasted. (Naming the image type earns its keep only when the type is information, the way “line drawing” did on the shad page.) Second, the honest version of this answer: on a directory page the person’s name is already the adjacent page title, so there’s a strong argument the headshot is decorative. Where that option is on the table, take it. Where it isn’t, the name is the right fallback — accurate, brief, and it costs a listener almost nothing.",
    cascadeNote:
      "This is the clearest case of a template making the decision for you. Filza advises treating a directory headshot as decorative, precisely because the name is already the page title beside it. But directory images can’t be marked decorative in our templates, so in this specific scenario we advise using the person’s name.",
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
      "Empty alt. Try the removal test: if this icon vanished, the card would say exactly the same thing, because the “Natural Resources” heading carries all the meaning. That’s what “decorative” means here — not that the image is pretty, but that removing it costs the reader nothing. Contrast the American shad illustration earlier: remove that and the page loses its picture of the very species it’s about. Two pictures of a fish, opposite calls — what separates them is whether anything goes missing when the image does. (And to be clear about what an empty alt does: the screen reader simply skips the image — it doesn’t announce “decorative image.”)",
    cascadeNote:
      "Whether this icon is decorative isn’t the editor’s call in our templates — the template decides. Worth knowing so you don’t go hunting for a field that isn’t there. If you find one of these marked up the wrong way, that’s a note for the web team rather than something to write around.",
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
      "A map has no perfect short answer, so a few things matter. Say it’s a map — naming the image type orients the reader before the details arrive. Then summarize the takeaway (where the low-oxygen water is) rather than what the map looks like; the type alone, as in “Map of the Chesapeake Bay,” isn’t enough. The best answer does both. One more thing worth knowing: when it’s feasible to offer the underlying data another way — an accessible table, paragraph or download — that’s the gold standard for a data map. “Accessible” is carrying weight in that sentence: a table only helps if it’s built as a real data table with header cells, and a download only helps if the file itself is accessible. Neither is accessible just by existing. When none of that is feasible, a clear summary of the takeaway is doing the real work.",
    cascadeNote:
      "The body content area below the image is usually where that alternative goes. A short paragraph giving the same numbers is the most reliably accessible option available to you, and the easiest to keep current — no table markup to get right, no file to re-export.",
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
      "Same idea as the oxygen map. Name the image type (“chart”) to orient the reader, then summarize what it shows — a general rise since 1980, still short of the goal — rather than describing what it looks like. But the type alone isn’t enough: “A line graph of SAV over time” names the chart without conveying anything it says. And because no sentence can fully replace a dataset, offering the numbers another way — an accessible table, paragraph or download — is the gold standard when it’s feasible, with the same caveat as the map: the alternative only counts if it’s accessible in its own right. Charts and maps are the cases where a good summary carries the most weight.",
  },
  {
    image: "src/images/marine-life-day.png",
    screenshotAlt:
      "Screenshot of a “For the Public” page section: a photo of several people seated at a table looking into microscopes at an event, above body text about VIMS public programs. The question asks what alt text the photo should have.",
    prompt: "This photo, from VIMS Marine Life Day, shows visitors using microscopes. What is the best alt text?",
    options: [
      {
        text: "People at tables",
        note:
          "Technically true, but it throws away everything that makes the photo worth including — the science, the event, the engagement.",
      },
      {
        text: "Visitors examine specimens under microscopes at VIMS Marine Life Day",
      },
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
      "Ask what a sighted person takes away: visitors engaged with science at a specific public event. That’s the meaning the photo communicates, and the alt text has to convey it. Naming Marine Life Day and what the visitors are doing is the relevant context.",
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
          "A visible caption doesn’t make the image decorative — a caption is ordinary page text and isn’t programmatically tied to the image the way alt text is.",
      },
      { text: "A young Marine Science Day attendee holds up a blue crab" },
      {
        text: "A boy smiling",
        note:
          "This misses the moment the photo captures — the crab, the event, the delight of holding it.",
      },
      {
        text: "Child holding a crab",
        note:
          "A solid start, and with the caption right below it, not unreasonable — but the best answer ties the photo to the event and the species without leaning on text elsewhere on the page.",
      },
    ],
    correctIndex: 1,
    explanation:
      "A sighted person gets a clear takeaway from this photo — a young attendee’s delight at holding a blue crab — and that takeaway still needs alt text even though a caption is visible on the page. A caption is ordinary page text: it isn’t tied to the image in the code the way alt text is. Notice the best answer says nearly the same thing as the caption — that’s fine. The rule isn’t that alt text must be different from the caption; it’s that a caption alone can’t do the alt text’s job. (One subtlety: a screen reader reads the alt text and then the caption, so a user hears the information twice. That’s a far better problem than hearing nothing — but it’s why some writers shorten the alt when a full caption sits right below.)",
    cascadeNote:
      "Our main content templates work differently from the example above: there, the Image Description field feeds both the alt text and the visible caption, so a single string has to do both jobs. Two practical consequences — write it as a sentence that reads well on the page, since it may be shown, and keep photo credit out of it, since a credit line is noise to a screen-reader user.",
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
      "Aim for the middle. The shortest options leave out the actual subject; the paragraph-length version is thorough but over-describes. Identify the subject concisely with the relevant context — oyster spat at the Aquaculture Genetics & Breeding Technology Center — and stop there.",
  },
];
