# Rendered artwork

Drop files here and they replace the drawn SVG automatically. Nothing else to
change — `components/Artwork.tsx` checks for the file at build time and falls
back to the SVG when it is missing, so the site builds and ships either way.

| File | Size | Where it appears |
| --- | --- | --- |
| `hero-stage.jpg` | 1800 × 1012 | Home hero — **in place** |
| `band-crowd.jpg` | 1800 × 524 | Crowd band — **in place** |
| `guide-tickets.webp` | 720 × 422 | Guide 01 — **in place** |
| `guide-nol.webp` | 720 × 577 | Guide 02 — **in place** |
| `guide-presale.webp` | 720 × 409 | Guide 03 — still on the drawn fallback |
| `guide-card.webp` | 720 × 489 | Guide 04 — still on the drawn fallback |
| `guide-albums.webp` | 720 × 513 | Guide 05 — **in place** |
| `seal.png` | 420 × 420 | Optional — the verification mark |

The generation briefs live in `content/artwork.ts`, beside the file names, so
the art direction is versioned with the code rather than sitting in a chat.

## Requirements

The two cinematic pieces are full-bleed JPEGs and need no transparency. The
rules below apply to the cut-out objects.

- **PNG with a transparent background.** The page behind the image is paper in
  the light theme and ink in the dark one, so a baked-in background breaks one
  of them.
- **No people, faces, hands, or idol likeness of any kind.** This is the rule the
  whole site rests on: it keeps us clear of portrait and copyright claims.
- **No text, no logos, no brand marks.** Type is set in HTML so it stays
  translatable, selectable and crisp at every size.
- **Matte surfaces only.** T13's rule is 반짝임 금지 · 표면은 보송하게. A glossy
  render reads as a different style and will not sit next to the rest.
- **One light, upper left,** across every piece, so the set looks photographed
  together rather than assembled.

Run the output through an optimiser before committing. Anything over ~250 KB per
file is worth another pass — these sit above the fold and count against LCP.

## A note on flattened renders

Three of these were recovered from JPEGs whose transparency had already been
flattened onto a checkerboard. That is invertible — the checkerboard is neutral
and two-toned, so a local brightest-to-darkest ratio identifies it without
reconstructing the grid — and `/tmp` holds the script that did it.

It is not reliable for every subject. Bone-white objects sit right inside the
checker's own luminance band, and on those the edges either keep a fringe or get
eaten. Guides 03 and 04 are exactly that case and stay on their drawn fallbacks
until a real PNG arrives.

So: export PNG with the alpha channel intact. Recovering it afterwards works
often enough to be worth trying and not often enough to rely on.
