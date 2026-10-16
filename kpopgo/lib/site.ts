/**
 * The canonical origin, and everything derived from it.
 *
 * `url` is not cosmetic. It builds every canonical tag (through the layout's
 * metadataBase), every entry in sitemap.xml, the sitemap line in robots.txt
 * and every @id in the structured data. Point it at a host the site is not
 * actually served from and each page tells Google its real address is
 * somewhere else — which, if that somewhere does not resolve, is an
 * instruction to drop the page.
 *
 * So it is overridable. Deploying to the free `*.vercel.app` host to collect
 * Search Console data before committing to a domain is a reasonable thing to
 * do, and it needs this set to that host for the duration. Set
 * NEXT_PUBLIC_SITE_URL in the Vercel project (no trailing slash); the default
 * stays the production domain so a forgotten variable cannot silently
 * canonicalise the live site onto a preview host.
 */
const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kpopgo.app").replace(/\/+$/, "");

export const site = {
  name: "KPOPGO",
  tagline: "Get verified. Get tickets. Go.",
  description:
    "Step-by-step guides for international K-pop fans: ticketing platforms, identity verification, foreign card payments, fan club presales and album orders — checked against the live platforms and dated.",
  /**
   * .app is HTTPS-only and HSTS-preloaded in browsers, so there is no http
   * variant to canonicalise and no certificate to buy — Vercel issues one.
   */
  url: origin,
  /** The bare host, for the places that show an address rather than link one. */
  host: origin.replace(/^https?:\/\//, ""),
  locale: "en",
  /** Set NEXT_PUBLIC_GA_ID in the environment to switch GA4 on. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
