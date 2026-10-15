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
 *   · transparent background, because the page behind it is ink in the default
 *     theme and paper in the light one
 *   · no people, no faces, no hands, no idol likeness of any kind
 *   · no text, no logos, no brand marks — type is set in HTML, not baked in
 *
 * One exception to the matte rule, and only one: a photocard's edge really is
 * iridescent, so the foil border on `pc-foil` and on the card inside `fan-kit`
 * is describing the object rather than decorating it. The faces stay matte.
 */

export type ArtPiece = {
  /** Stable id, used as the <Artwork name="..."> key. */
  id: string;
  /** Expected file in public/img/. PNG with alpha for cut-outs. */
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

/**
 * The objects were briefed once in a cream-and-indigo palette, against a
 * passport, a bank card and a parcel box. It rendered well and it was the
 * wrong set: it read as a fintech or a shipping service, and a fan arriving
 * from a fan community saw nothing of their own world in it. The vocabulary is
 * now fandom — lightstick, photocard, ticket stub, slogan banner — in the
 * lightstick trio, because no K-pop surface is monochrome.
 */
const BASE =
  "Matte clay 3D render, soft studio light from the upper left only, " +
  "no gloss, no specular highlights, no reflections, no rim light, " +
  "no baked shadow — the page draws its own so it can follow the theme, " +
  "transparent background, " +
  "slightly isometric three-quarter view, clean product-shot composition, " +
  "no people, no hands, no faces, no text, no logos, no lettering, " +
  "no real brand marks and no existing group's lightstick or album design. " +
  "Palette strictly: vermilion #FF3B2E, electric cyan #00E5FF, " +
  "hot violet #B14BFF, bone white #F3ECE1, near-black #0A0A0F.";

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
  "Cinematic concert photograph, strong backlight from directly behind the " +
  "subjects, warm haze and visible light beams through atmospheric fog, deep " +
  "shadow in the foreground, fine film grain, no lens flare starbursts. " +
  "Subjects are ANONYMOUS SILHOUETTES ONLY — fully backlit, no facial features, " +
  "no recognisable individuals, not traced from any photograph. " +
  "No text, no logos, no brand marks, no readable signage, and no placeholder " +
  "shapes where type will go — the headline is set in HTML over the picture. " +
  "Vermilion #FF3B2E and amber in the light, hot violet #B14BFF in the shadows, " +
  "near-black #0A0A0F foreground.";

export const artwork: ArtPiece[] = [
  {
    id: "hero-stage",
    file: "hero-stage.jpg",
    width: 1800,
    height: 1012,
    alt: "Five dancers in silhouette across a stage, mid-choreography, against strong backlight and fog.",
    placement: "Home hero — full-bleed background behind the headline",
    prompt:
      `${STAGE} Subject: five dancer silhouettes in a line across a stage, ` +
      "mid-choreography, arms extended in formation, lit hard from behind so they read " +
      "as flat black shapes. NO instruments, NO guitars, NO drum kit, NO microphone " +
      "stands — this is a dance stage, not a band. The lower-left quarter stays deep and " +
      "uncluttered. 16:9, wide.",
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
    id: "pc-foil",
    file: "pc-foil.webp",
    width: 720,
    height: 1286,
    alt: "A blank collectible card standing upright, its border a band of iridescent foil.",
    placement: "Home — beside the guides heading, where the photocard idea is introduced",
    prompt:
      `${BASE} Subject: a single blank collectible card standing upright, portrait ` +
      "orientation, rounded corners, bone-white face with NOTHING printed on it, and a " +
      "thin iridescent holographic foil edge running around the border that shifts from " +
      "cyan through violet to vermilion. The face stays matte; only the 2mm border is " +
      "iridescent.",
  },
  {
    id: "lightstick",
    file: "lightstick.webp",
    width: 560,
    height: 881,
    alt: "A generic concert lightstick — a translucent sphere glowing on a straight handle.",
    placement: "Home hero, lower right — the object that names the subject on sight",
    prompt:
      `${BASE} Subject: a single generic concert lightstick — a plain translucent sphere ` +
      "on a straight handle, glowing warm vermilion from within, with a cyan collar and a " +
      "violet band near the base. Completely generic shape, NOT based on any existing " +
      "group's design, no emblem, no character, no logo of any kind.",
  },
  {
    id: "fan-kit",
    file: "fan-kit.webp",
    width: 960,
    height: 620,
    alt: "A ticket with a perforated stub, a foil-edged collectible card, a string of slogan flags and a fabric wristband.",
    placement:
      "Guides index — the header, standing for what a sale actually hands you. " +
      "No file: the flattened export could not be recovered (see public/img/README.md), " +
      "and the page omits the header until a PNG with alpha arrives.",
    prompt:
      `${BASE} Subject: a flat lay of four blank fandom objects slightly overlapping — a ` +
      "long vermilion concert ticket with a perforated stub, a blank collectible card with " +
      "an iridescent edge, a short string of small slogan flags in cyan, violet, bone white " +
      "and black, and a fabric wristband. All blank, no printing, no text.",
  },
  {
    id: "album-stack",
    file: "album-stack.webp",
    width: 820,
    height: 843,
    alt: "Three square album cases stacked at slight angles, in vermilion, violet and bone white.",
    placement: "Guide 05 — buying albums from overseas",
    prompt:
      `${BASE} Subject: three square album cases stacked at slight angles, one vermilion, ` +
      "one deep violet, one bone white, all faces completely blank with no artwork or " +
      "lettering. A photobook-thick spine on each.",
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
    alt: "A dark phone showing a blank form screen, beside a passport, as matte clay objects.",
    placement: "Guide 02 — NOL World ticketing",
    prompt:
      `${BASE} Subject: a dark charcoal smartphone standing upright with a blank bone-white ` +
      "screen showing three empty rounded input fields and one vermilion rounded button at the " +
      "bottom, with a passport booklet lying flat beside it, slightly behind.",
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
      "on its face, leaning against a small calendar block whose top band is hot violet. Both " +
      "objects blank, no numbers, no text.",
  },
  {
    id: "guide-card",
    file: "guide-card.webp",
    width: 720,
    height: 499,
    alt: "A bone-white bank card with a vermilion cross mark resting on its corner, as matte clay objects.",
    placement: "Guide 04 — foreign card declined",
    prompt:
      `${BASE} Subject: a bone-white bank card with a hot violet magnetic stripe and a small ` +
      "cyan chip, lying flat, with a thick vermilion three-dimensional cross mark (an X) resting " +
      "on its lower-right corner, slightly raised above the card.",
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
