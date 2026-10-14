export const site = {
  name: "KPOPGO",
  tagline: "Get verified. Get tickets. Go.",
  description:
    "Step-by-step guides for international K-pop fans: ticketing platforms, identity verification, foreign card payments, fan club presales and album orders — checked against the live platforms and dated.",
  url: "https://kpopgo.example",
  locale: "en",
  /** Set NEXT_PUBLIC_GA_ID in the environment to switch GA4 on. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export const accentMap = {
  grape: {
    text: "text-grape-400",
    bg: "bg-grape-500/15",
    dot: "bg-grape-400",
    glow: "from-grape-500/25",
  },
  bubble: {
    text: "text-bubble-400",
    bg: "bg-bubble-500/15",
    dot: "bg-bubble-400",
    glow: "from-bubble-500/25",
  },
  aqua: {
    text: "text-aqua-300",
    bg: "bg-aqua-400/15",
    dot: "bg-aqua-400",
    glow: "from-aqua-400/25",
  },
  tangerine: {
    text: "text-tangerine-400",
    bg: "bg-tangerine-400/15",
    dot: "bg-tangerine-400",
    glow: "from-tangerine-400/25",
  },
  lime: {
    text: "text-lime-400",
    bg: "bg-lime-400/15",
    dot: "bg-lime-400",
    glow: "from-lime-400/25",
  },
} as const;

export type Accent = keyof typeof accentMap;
