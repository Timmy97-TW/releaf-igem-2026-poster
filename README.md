# ReLEAF — iGEM 2026 team poster

**Every Farmer a Biomanufacturer** · a stress-responsive optogenetic bioreactor for
precision plant protection.

GEMS Taiwan · iGEM team 6072 · Taipei, Taiwan · Biomanufacturing Village.

This repository holds one thing: the team poster, as a single self-contained web page.
Open `index.html` — there is nothing to build and nothing to install.

---

## Two views of one poster

The switch at the corner of the page moves between them. They share every sentence: the
sheet is composed from the board's own markup at load, so the two cannot drift apart.

**Interactive** — the shape iGEM asks for: a **visual abstract on the left** and
**documentation on the right**, with the left driving the right. The difference from a wall
of boxes is that the navigation *is* the project. The six stations are the six stages of the
ReLEAF system — Sense, Predict, Induce, Secrete, Separate, Apply — drawn as a closed circuit
with material moving along it. Choosing a station opens its documentation. The loop is the
diagram and the menu at once. Fifteen sections in all: the six stations, plus Abstract,
Problem, Inspiration, Design, Modelling, Results, What we have not shown, Safety & rules,
and Team & thanks.

**Poster** — a real academic poster, **A0 portrait, 841 × 1189 mm**, set in points and
measured to the millimetre. Masthead, author band, a full-width graphical abstract, then ten
numbered sections down three columns, ending on a conclusion card and the acknowledgements.
It is scaled to fit the window on screen and prints at 1:1 on one sheet.

## The look

Both views are drawn in the wiki's own soft language — the one the Integrated Human
Practices page set and the Project pages took: `#1d1d1f` ink on `#f5f5f7`, white cards at a
28 px radius, frosted segmented controls, shadows that are wide and faint rather than dark,
and nothing given a hard border where a soft one will do. The leaf greens came off the team
hoodie. Tokens are copied from `static/assets/css/engage.css` and `tokens.css` in the wiki
repository, so the poster reads as part of the same body of work.

## Reading it

| | |
|---|---|
| The switch at the corner | moves between the interactive view and the A0 poster |
| Click a station, or a headline number | opens that section |
| `←` `→` | step around the loop |
| Click any figure | opens it full size, with its legend |
| `Esc` | closes the figure |
| The address bar | carries the open section, e.g. `#separate`, or `#poster` for the A0 sheet — paste either to send someone straight there |
| `⌘P` / `Ctrl-P` | prints whichever view is open: the sheet at A0 1:1, or the interactive view as an A0 with every section expanded |

## How it meets the iGEM poster brief

Built against <https://2020.igem.org/Competition/Deliverables/Poster>.

- **One screen, not an endless scroll.** The board is fixed to the viewport and capped at
  the 1600 px ceiling; at 1280 × 800 the document height is exactly 800 px. Only the
  documentation column scrolls.
- **It stands alone.** No outward links in the documentation, no references a judge has to
  follow. Every figure legend is the legend from the wiki, and every number appears in the
  section it belongs to.
- **No video.** The only motion is the flow along the circuit, and it stops for
  `prefers-reduced-motion`.
- **A visual abstract first.** The left column carries the title, the one-paragraph claim,
  the system diagram and six headline results without a single click.

It also does two things the brief does not ask for. The **second view is a real A0 poster**,
for a printed session rather than a screen. And one section — **What we have not shown** —
lists the gaps the team's own pages declare, because a poster that only lists what worked is
not a result.

## Honesty

Every claim here is traceable to the team wiki at <https://2026.igem.wiki/gems-taiwan/>,
and where the wiki scopes a claim, the poster carries the scope with it. In particular the
poster states, on its face, that the loop has never been closed end to end, that no reactor
number is the optogenetic switch doing anything, and that the containment result is two
plates with no quantified log reduction.

## Layout

```
index.html              both views, and the sections they share
assets/poster.css       tokens, the board, the loop, the A0 sheet, print
assets/poster.js        navigation, deep links, lightbox, and the sheet builder
assets/fonts/           Inter variable, subset (SIL OFL 1.1)
assets/figures/         figures and photographs, taken from the team wiki
```

Everything the page needs is in the repository — the font included — so it has no external
request of any kind and works offline. The whole thing is 2.8 MB.

The palette, the type and the figure conventions are the wiki's own tokens, so the poster
reads as part of the same body of work. The leaf greens came off the team hoodie.

## Licence

Content is licensed **CC BY 4.0**, the same licence as the team wiki. The bundled Inter
typeface is under the SIL Open Font License 1.1. See [LICENSE](LICENSE).

The repository used to create the team wiki is at `gitlab.igem.org/2026/gems-taiwan`.
