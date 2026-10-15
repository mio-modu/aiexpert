# Rendered artwork

Drop files here and they replace the drawn SVG automatically. Nothing else to
change — `components/Artwork.tsx` checks for the file at build time and falls
back to the SVG when it is missing, so the site builds and ships either way.

| File | Size | Where it appears |
| --- | --- | --- |
| `hero-still-life.png` | 1040 × 960 | Home hero |
| `guide-tickets.png` | 720 × 560 | Guide 01 — buying from overseas |
| `guide-nol.png` | 720 × 560 | Guide 02 — NOL World |
| `guide-presale.png` | 720 × 560 | Guide 03 — fan club presale |
| `guide-card.png` | 720 × 560 | Guide 04 — card declined |
| `guide-albums.png` | 720 × 560 | Guide 05 — albums from overseas |
| `seal.png` | 420 × 420 | Optional — the verification mark |

The generation briefs live in `content/artwork.ts`, beside the file names, so
the art direction is versioned with the code rather than sitting in a chat.

## Requirements

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
