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
  "no baked shadow — the page draws its own so it can follow the theme, " +
  "transparent background, " +
  "slightly isometric three-quarter view, clean product-shot composition, " +
  "no people, no hands, no faces, no text, no logos, no lettering. " +
  "Palette strictly: vermilion #E0432C, deep indigo #334A86, bone white #F3ECE1, " +
  "near-black ink #1C1B22, muted gold #C9A24A.";

/**
 * T09 영화 같은 한 장면 has different rules from T13, and they conflict on
 * purpose: here the light comes from BEHIND the subject, the image fills the
 * frame rather than floating on it, and there is no cut-out. T09's documented
 * failure is type sinking into the picture, so every brief below reserves a
 * dark area where the headline sits.
 *
 * On likeness: silhouettes only, anonymous, never traced from a photograph —
 * no faces, no identifiable features, no real lightstick designs (those are
 * individual groups' trademarks). This is the standard language of a concert
 * poster, and it is what keeps the site clear of portrait claims.
 *
 * These are full-bleed, so they do NOT need transparency. JPEG is fine and
 * preferable for file size. Only the cut-out T13 objects need PNG with alpha.
 */
const STAGE =
  "Cinematic concert photograph, strong backlight from behind the subjects, " +
  "warm haze and visible light beams through atmospheric fog, deep shadow in " +
  "the foreground, fine film grain, no lens flare starbursts, shallow depth. " +
  "Subjects are ANONYMOUS SILHOUETTES ONLY — fully backlit, no facial features, " +
  "no recognisable individuals, not traced from any photograph. " +
  "No text, no logos, no brand marks, no readable signage. " +
  "Warm palette: vermilion #E0432C, amber, deep indigo #334A86 shadows, " +
  "near-black #0E0D12 foreground.";

export const artwork: ArtPiece[] = [
  {
    id: "hero-stage",
    file: "hero-stage.jpg",
    width: 1800,
    height: 1012,
    alt: "A backlit concert stage seen from the crowd, with performers in silhouette against warm light beams.",
    placement: "Home hero — full-bleed background behind the headline",
    prompt:
      `${STAGE} Subject: a wide concert stage seen from within the crowd. Four or five ` +
      "performer silhouettes stand mid-pose across the stage, rimmed by strong warm light " +
      "from directly behind them. Beams cut down through haze. The lower third is a dark " +
      "crowd silhouette with scattered raised arms and small points of handheld light. " +
      "Leave the lower-left quarter deep and uncluttered — the headline sits there. " +
      "16:9, wide.",
  },
  {
    id: "band-crowd",
    file: "band-crowd.jpg",
    width: 1800,
    height: 524,
    alt: "A dense crowd seen from behind, arms raised, small lights scattered through the dark.",
    placement: "Narrow band divider between sections",
    prompt:
      `${STAGE} Subject: a dense audience seen from behind at the back of an arena, ` +
      "arms raised, hundreds of small warm points of handheld light scattered through the " +
      "dark. The stage is a distant warm glow on the horizon line. Very wide and short " +
      "letterbox crop, roughly 24:7. No stage detail, no performers.",
  },
  {
    id: "hero",
    file: "hero-still-life.webp",
    width: 1040,
    height: 743,
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
    file: "guide-tickets.webp",
    width: 720,
    height: 420,
    alt: "A vermilion concert ticket with a perforated stub, rendered as a matte clay object.",
    placement: "Guide 01 — how to buy tickets from overseas",
    prompt:
      `${BASE} Subject: a single long vermilion concert ticket, seen three-quarter from above, ` +
      "with a perforated tear line near one end and the stub slightly separated and floating a " +
      "few millimetres away. Blank surface, no printing.",
  },
  {
    id: "guide-nol",
    file: "guide-nol.webp",
    width: 720,
    height: 590,
    alt: "A dark phone showing a blank form screen, beside a navy passport, as matte clay objects.",
    placement: "Guide 02 — NOL World ticketing",
    prompt:
      `${BASE} Subject: a dark charcoal smartphone standing upright with a blank bone-white ` +
      "screen showing three empty rounded input fields and one vermilion rounded button at the " +
      "bottom, with a deep indigo passport booklet lying flat beside it, slightly behind.",
  },
  {
    id: "guide-presale",
    file: "guide-presale.webp",
    width: 720,
    height: 409,
    alt: "A bone-white membership card with a vermilion star, beside a small calendar block, as matte clay objects.",
    placement: "Guide 03 — fan club presale access",
    prompt:
      `${BASE} Subject: a bone-white membership card with a raised vermilion five-pointed star ` +
      "on its face, leaning against a small bone-white calendar block whose top band is deep " +
      "indigo. Both objects blank, no numbers, no text.",
  },
  {
    id: "guide-card",
    file: "guide-card.webp",
    width: 720,
    height: 499,
    alt: "A bone-white bank card with a vermilion cross mark resting on its corner, as matte clay objects.",
    placement: "Guide 04 — foreign card declined",
    prompt:
      `${BASE} Subject: a bone-white bank card with a deep indigo magnetic stripe and a small ` +
      "gold chip, lying flat, with a thick vermilion three-dimensional cross mark (an X) resting " +
      "on its lower-right corner, slightly raised above the card.",
  },
  {
    id: "guide-albums",
    file: "guide-albums.webp",
    width: 720,
    height: 513,
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
