export const site = {
  name: "KPOPGO",
  tagline: "Get verified. Get tickets. Go.",
  description:
    "Step-by-step guides for international K-pop fans: ticketing platforms, identity verification, foreign card payments, fan club presales and album orders — checked against the live platforms and dated.",
  /**
   * .app is HTTPS-only and HSTS-preloaded in browsers, so there is no http
   * variant to canonicalise and no certificate to buy — Vercel issues one.
   */
  url: "https://kpopgo.app",
  locale: "en",
  /** Set NEXT_PUBLIC_GA_ID in the environment to switch GA4 on. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
