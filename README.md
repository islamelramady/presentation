# Installing & Exploring Peachtree Complete Accounting — Presentation Website

A ready-to-present website (slide deck) for your college lab. It follows the official
course manual of the lab **"Installing Peachtree on a Single / Stand-Alone Computer"**
— every step from inserting the CD (step 1) to the *Installation Completed* window
(steps 15–16), then starting the program, exploring **Bellwether Garden Supply**, the
menu bar, and the **Navigating Bar / Navigating Center**.

---

## 1. Open it

Double-click **`index.html`**. That is all — no server, no install, works offline.

```
peachtree-pca-presentation/
├── index.html            ← open this
├── assets/
│   ├── css/style.css
│   ├── js/slides.js      ← ALL the content lives here (edit text here)
│   ├── js/main.js        ← the engine (navigation, overview, notes, zoom)
│   └── img/              ← PUT YOUR SCREENSHOTS HERE
└── README.md
```

---

## 2. Where do I put my screenshots?  ← read this part

Every screenshot box on the slides tells you the **exact file name** it expects.
Save the picture in **`assets/img/`** with that name (`.svg` and `.png` work; `.jpg` /
`.jpeg` / `.webp` are detected automatically).

* While a picture is **missing**, the slide shows a dashed placeholder that says
  *"what to capture"* and shows the file name.
* Click the file name to copy the path.
* The moment you save the file with the right name and refresh the page (F5), the
  picture replaces the placeholder automatically. Nothing else to do.
* The last slide (**Appendix → Screenshot checklist**) ticks a box automatically for
  every picture you have already added — use it as your to-do list.

### The 14 screenshots used in the presentation

| # | File name | What to capture |
|---|-----------|-----------------|
| 1 | `17-peachtree-welcome` | Welcome screen with Explore a Sample Company |
| 2 | `18-sample-company-list` | Bellwether Garden Supply selected |
| 3 | `20-full-interface` | Complete Peachtree program interface |
| 4 | `20-title-bar` | Title bar with company name |
| 5 | `21-menu-bar` | Main menu bar |
| 6 | `menu-file` | File menu opened |
| 7 | `menu-edit` | Edit menu opened |
| 8 | `22-list-menu` | List menu opened |
| 9 | `23-maintain-menu` | Maintain menu opened |
| 10 | `menu-analysis` | Analysis menu opened |
| 11 | `menu-options` | Options menu opened |
| 12 | `menu-reports-forms` | Reports & Forms menu opened |
| 13 | `menu-services` | Services menu opened |
| 14 | `menu-help` | Help menu opened |

The cover already has an illustration, so no extra cover screenshot is needed. The menu
slides use the supplied screenshots. Installation is shown as a brief comparison of the
CD method and the instructor-provided download link/Product Key.
The uninstall steps are shown as text because no Control Panel screenshot was provided.

---

## 3. Controls

| Key | Action |
|-----|--------|
| `→` `↓` `Space` `PageDown` | Next slide |
| `←` `↑` `PageUp` | Previous slide |
| `Home` / `End` | First / last slide |
| `O` | Slide **overview** (grid of all slides — click any one to jump) |
| `N` | **Presenter notes** (your talking points appear at the bottom + a timer) |
| `F` | **Fullscreen** (start the presentation with this) |
| `A` | Show / hide the **appendix** (the screenshot checklist) |
| `P` | **Print** → *Save as PDF* (a clean handout of all slides) |
| `Esc` | Close any overlay |
| `?` | Shortcut help |

Also: on-screen buttons, dot navigation, swipe on touch screens, and
`index.html#12` style links open a specific slide directly.

### Arabic / English

The **عربي** button in the top bar switches the whole deck — interface, slide text and
direction (RTL) — between English and Arabic. Your choice is remembered.

---

## 4. Editing the content

Everything you may want to change lives in **`assets/js/slides.js`**, one object per
slide inside the `SLIDES` array:

```js
{
  id: "s01",
  layout: "split",
  section: "install",
  kicker: t("Step 01", "الخطوة ٠١"),          // small label above the title
  title:  t("Insert the Peachtree compact disc", "أدخل قرص Peachtree"),
  sub:    t("Put the installation CD …", "ضع قرص التثبيت …"),
  bullets:[ t("…", "…") ],                     // bullet points
  shots:  [ shot("01-insert-cd-autorun", "caption EN", "عنوان عربي", "what to capture EN", "ما يجب تصويره") ],
  note:   t("Your talking point while this slide is on screen", "ملاحظتك أثناء عرض الشريحة")
}
```

* `t("English", "العربية")` = a bilingual string — **always keep both**.
* `shot("file-name", …)` = a screenshot slot; `file-name` has **no extension**.
* Add a slide? Copy any object, give it a new `id`, and it appears automatically in
  the deck and in the overview.
* `note:` text is what you see in **Presenter notes** — it never shows on the
  projected slide, so write the things you want to *say*, not what's already written.

---

## 5. Presenting (a concise 13-slide plan)

1. `F` for fullscreen, start on slide 1.
2. Slide 2 — compare CD installation with download link/Product Key.
3. Slide 3 — introduce the four welcome-screen options.
4. Slide 4 — choose **Explore a Sample Company** and open **Bellwether Garden Supply**.
5. Slide 5 — show the complete program interface.
6. Slide 6 — point out the title bar and menu bar.
7. Slides 7–10 — explain the menu groups through the File/Edit, List/Maintain, Analysis/Options, and Reports/Services/Help screenshots.
8. Slide 11 — focus on the File menu and show how to back up company data.
9. Slide 12 — explain uninstalling Peachtree through Control Panel.
10. Slide 13 — invite questions.

The deck is condensed to 13 presentation slides and follows the lecture topics. The
installation details beyond the two methods are intentionally left for the presenter to explain.

---

## 6. Troubleshooting

| Problem | Fix |
|---------|-----|
| A picture does not appear | File name must match exactly (lowercase, hyphens, no spaces). Refresh with `F5`. |
| Slides look too small / big | Press `F` for fullscreen. Slide text is fluid, so it fits any screen. |
| The deck feels slow | Add pictures one at a time and refresh; very large PNGs can be resized to ~1400 px wide. |
| I want to hand out the slides | Press `P` → choose *Save as PDF* → paper size **A4**, orientation **Landscape**, tick *Background graphics*. |
