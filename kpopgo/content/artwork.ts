/**
 * The artwork manifest.
 *
 * Every illustration on the site starts as inline SVG in components/Objects.tsx,
 * which means the site is complete and shippable with no image assets at all.
 * This manifest is the upgrade path: drop a rendered file into `public/img/`
 * under the `file` name below and <Artwork> swaps it in. Nothing else changes.
 *
 * `prompt` lives in the repo on purpose. Art direction that only exists in a
 * chat window drifts; when a platform changes and a piece has to be re-rendered
 * six months from now, the brief has to be sitting next to the code.
 *
 * Hard constraints on every piece, derived from T13 보송한 3D 사물:
 *   · matte clay surfaces — 반짝임 금지, no specular highlight, no gloss
 *   · one soft light from the upper left, for every piece, so the whole site
 *     reads as one photographed set
 *   · transparent background, because the page behind it is paper in the light
 *     theme and ink in the dark one
 *   · no people, no faces, no hands, no idol likeness of any kind
 *   · no text, no logos, no brand marks — type is set in HTML, not baked in
 */

export type ArtPiece = {
  /** Stable id, used as the <Artwork name="..."> key. */
  id: string;
  /** Expected file in public/img/. PNG with alpha. */
  file: string;
  /** Rendered width and height. Used for layout, so it must match the file. */
  width: number;
  height: number;
  /** Alt text. Describes the objects, never the brand. */
  alt: string;
  /** Where it appears, for whoever is briefing the render. */
  placement: string;
  /** The generation brief. */
  prompt: string;
};

const BASE =
  "Matte clay 3D render, soft studio light from the upper left only, " +
  "no gloss, no specular highlights, no reflections, no rim light, " +
  "soft contact shadow directly beneath, transparent background, " +
  "slightly isometric three-quarter view, clean product-shot composition, " +
  "no people, no hands, no faces, no text, no logos, no lettering. " +
  "Palette strictly: vermilion #E0432C, deep indigo #334A86, bone white #F3ECE1, " +
  "near-black ink #1C1B22, muted gold #C9A24A.";

export const artwork: ArtPiece[] = [
  {
    id: "hero",
    file: "hero-still-life.png",
    width: 1040,
    height: 960,
    alt: "A navy passport, a vermilion concert ticket, a bone-white bank card and a dark phone, arranged as matte clay objects.",
    placement: "Home page hero, right column",
    prompt:
      `${BASE} Subject: four objects arranged loosely overlapping on an invisible surface — ` +
      "a deep indigo passport booklet with a muted gold embossed emblem, a long vermilion " +
      "concert ticket with a perforated tear line and a torn stub, a bone-white bank card " +
      "with a small gold chip, and a dark charcoal smartphone standing slightly upright " +
      "with a blank bone-white screen. The ticket sits in front and is the largest object. " +
      "Square-ish composition, generous empty space around the group.",
  },
  {
    id: "guide-tickets",
    file: "guide-tickets.png",
    width: 720,
    height: 560,
    alt: "A vermilion concert ticket with a perforated stub, rendered as a matte clay object.",
    placement: "Guide 01 — how to buy tickets from overseas",
    prompt:
      `${BASE} Subject: a single long vermilion concert ticket, seen three-quarter from above, ` +
      "with a perforated tear line near one end and the stub slightly separated and floating a " +
      "few millimetres away. Blank surface, no printing.",
  },
  {
    id: "guide-nol",
    file: "guide-nol.png",
    width: 720,
    height: 560,
    alt: "A dark phone showing a blank form screen, beside a navy passport, as matte clay objects.",
    placement: "Guide 02 — NOL World ticketing",
    prompt:
      `${BASE} Subject: a dark charcoal smartphone standing upright with a blank bone-white ` +
      "screen showing three empty rounded input fields and one vermilion rounded button at the " +
      "bottom, with a deep indigo passport booklet lying flat beside it, slightly behind.",
  },
  {
    id: "guide-presale",
    file: "guide-presale.png",
    width: 720,
    height: 560,
    alt: "A bone-white membership card with a vermilion star, beside a small calendar block, as matte clay objects.",
    placement: "Guide 03 — fan club presale access",
    prompt:
      `${BASE} Subject: a bone-white membership card with a raised vermilion five-pointed star ` +
      "on its face, leaning against a small bone-white calendar block whose top band is deep " +
      "indigo. Both objects blank, no numbers, no text.",
  },
  {
    id: "guide-card",
    file: "guide-card.png",
    width: 720,
    height: 560,
    alt: "A bone-white bank card with a vermilion cross mark resting on its corner, as matte clay objects.",
    placement: "Guide 04 — foreign card declined",
    prompt:
      `${BASE} Subject: a bone-white bank card with a deep indigo magnetic stripe and a small ` +
      "gold chip, lying flat, with a thick vermilion three-dimensional cross mark (an X) resting " +
      "on its lower-right corner, slightly raised above the card.",
  },
  {
    id: "guide-albums",
    file: "guide-albums.png",
    width: 720,
    height: 560,
    alt: "A small sealed parcel box beside a square album case, as matte clay objects.",
    placement: "Guide 05 — buying albums from overseas",
    prompt:
      `${BASE} Subject: a small bone-white parcel box, closed and sealed with a single vermilion ` +
      "tape strip across the top, with a square deep indigo album case leaning against it. Both " +
      "blank, no labels, no printing.",
  },
  {
    id: "seal",
    file: "seal.png",
    width: 420,
    height: 420,
    alt: "A square vermilion seal stamp, as a matte clay object.",
    placement: "Optional — the verification mark, currently drawn as SVG",
    prompt:
      `${BASE} Subject: a single square traditional East Asian seal stamp standing upright on ` +
      "its base, carved from matte vermilion material, with a plain square top face. The carved " +
      "face is blank — no characters, no text, no engraving. Simple, solid, slightly rounded " +
      "corners.",
  },
];

export function getArt(id: string): ArtPiece | undefined {
  return artwork.find((a) => a.id === id);
}
