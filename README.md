# ReLEAF — iGEM 2026 team poster

**Every Farmer a Biomanufacturer** · a stress-responsive optogenetic bioreactor for
precision plant protection.

GEMS Taiwan · iGEM team 6072 · Taipei, Taiwan · Biomanufacturing Village.

This repository holds one thing: the team poster, as a single self-contained web page.
Open `index.html` — there is nothing to build and nothing to install.

---

## What it is

An interactive poster in the shape iGEM asks for: a **visual abstract on the left** and
**documentation on the right**, with the left driving the right.

The difference from a wall of boxes is that the navigation *is* the project. The six
stations on the left are the six stages of the ReLEAF system — Sense, Predict, Induce,
Secrete, Separate, Apply — drawn as a closed circuit with material moving along it.
Choosing a station opens its documentation. The loop is the diagram and the menu at once.

Fifteen sections in all: the six stations, plus Abstract, Problem, Inspiration, Design,
Modelling, Results, What we have not shown, Safety & rules, and Team & thanks.

## Reading it

| | |
|---|---|
| Click a station, or a headline number | opens that section |
| `←` `→` | step around the loop |
| Click any figure | opens it full size, with its legend |
| `Esc` | closes the figure |
| The address bar | carries the open section, e.g. `#separate` — paste that link to send someone straight to it |
| `⌘P` / `Ctrl-P` | prints the whole poster to A0, every section expanded |

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

It also does two things the brief does not ask for. A **print stylesheet** turns the same
file into a real A0 poster with every section opened and set in three columns. And one
section — **What we have not shown** — lists the gaps the team's own pages declare, because
a poster that only lists what worked is not a result.

## Honesty

Every claim here is traceable to the team wiki at <https://2026.igem.wiki/gems-taiwan/>,
and where the wiki scopes a claim, the poster carries the scope with it. In particular the
poster states, on its face, that the loop has never been closed end to end, that no reactor
number is the optogenetic switch doing anything, and that the containment result is two
plates with no quantified log reduction.

## Layout

```
index.html              the poster
assets/poster.css       design tokens, board, loop, documentation, print sheet
assets/poster.js        navigation, deep links, lightbox
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
