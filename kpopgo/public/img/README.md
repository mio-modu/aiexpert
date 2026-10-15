# Rendered artwork

Drop files here and they replace the drawn SVG automatically. Nothing else to
change — `components/Artwork.tsx` checks for the file at build time and falls
back to the SVG when it is missing, so the site builds and ships either way.

| File | Size | Where it appears |
| --- | --- | --- |
| `hero-stage.jpg` | 1800 × 1012 | Home hero — **in place** |
| `band-crowd.jpg` | 1800 × 524 | Crowd band — **in place** |
| `lightstick.webp` | 560 × 834 | Hero, laid over the photograph — **in place** |
| `pc-foil.webp` | 720 × 1001 | Home, beside the guides heading — **in place** |
| `fan-kit.webp` | 960 × 620 | Guides index header — **in place** |
| `album-stack.webp` | 820 × 840 | Guide 05 — **in place** |
| `guide-tickets.webp` | 720 × 420 | Guide 01 — **in place** |
| `guide-nol.webp` | 720 × 590 | Guide 02 — **in place** |
| `guide-presale.webp` | 720 × 409 | Guide 03 — still on the drawn fallback |
| `guide-card.webp` | 720 × 499 | Guide 04 — still on the drawn fallback |
| `seal.png` | 420 × 420 | Optional — the verification mark |

The generation briefs live in `content/artwork.ts`, beside the file names, so
the art direction is versioned with the code rather than sitting in a chat.

## Requirements

The two cinematic pieces are full-bleed JPEGs and need no transparency. The
rules below apply to the cut-out objects.

- **PNG with a transparent background.** The page behind the image is ink in
  the default theme and paper in the light one, so a baked-in background breaks
  one of them.
- **No people, faces, hands, or idol likeness of any kind.** This is the rule the
  whole site rests on: it keeps us clear of portrait and copyright claims.
- **No text, no logos, no brand marks.** Type is set in HTML so it stays
  translatable, selectable and crisp at every size. This applies to the
  photographs too — the hero came back with a brush mark painted where the
  headline goes, because the brief told the generator the headline went there.
- **No real lightstick or album designs.** Those are individual groups'
  trademarks. Generic shapes only.
- **Matte surfaces only,** with one exception: the iridescent edge on a
  photocard, which is describing the object rather than decorating it.
- **One light, upper left,** across every piece, so the set looks photographed
  together rather than assembled.

Run the output through an optimiser before committing. Anything over ~250 KB per
file is worth another pass — these sit above the fold and count against LCP.

## A note on flattened renders

Most of these arrived as JPEGs whose transparency had already been flattened
onto a checkerboard. That is invertible, and `/tmp/claude-0/cut/uncheck2.py`
holds the script, but it took two goes to get right and the failure is worth
knowing about.

The first version identified the checker by its local brightest-to-darkest
ratio, which is constant on a two-tone neutral grid and needs no phase
reconstruction. It has one blind spot: a **bone-white part touching the
checker** puts the cap's white and the checker's grey inside the same window,
which produces exactly the checker's own ratio, and the fill walks into the
object. The lightstick's end cap went that way, and guides 03 and 04 still
carry fallbacks for the same reason.

The fix is a second test. A checkerboard is not just high-contrast, it is
*two-valued* — nearly every pixel in a window sits at one of exactly two
levels, while any shaded surface runs continuously between them. Both tests
have to agree. That is strict enough to reject real checker where JPEG smeared
a square boundary, so a third step removes the stranded crumbs by size:
erode the object mask, then grow what survives back inside its own outline.

So: export PNG with the alpha channel intact. Recovering it afterwards works,
and it costs a morning each time it doesn't.
