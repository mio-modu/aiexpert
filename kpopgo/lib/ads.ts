/**
 * AdSense configuration.
 *
 * Everything here is read from the environment, and every ad slot renders
 * nothing at all when its id is missing. That matters for more than tidiness:
 * AdSense will not approve a site before it has content and traffic, so the
 * site has to look finished — not peppered with empty grey boxes — for weeks
 * before the first unit is ever allowed to fill.
 *
 * Fill these in from the AdSense dashboard once the site is approved:
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-0000000000000000
 *   NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=0000000000
 *   NEXT_PUBLIC_ADSENSE_SLOT_FOOT=0000000000
 *   NEXT_PUBLIC_ADSENSE_SLOT_LIST=0000000000
 */

export const ads = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    /** Mid-article, between steps. The strongest position on a how-to page. */
    article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "",
    /** After the content ends, before the sources. */
    foot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOT ?? "",
    /** Below a list of guides. */
    list: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST ?? "",
  },
} as const;

export type AdPlacement = keyof typeof ads.slots;

export function adEnabled(placement: AdPlacement): boolean {
  return Boolean(ads.client && ads.slots[placement]);
}

/** True once the account is configured at all — gates the loader script. */
export const adsConfigured = Boolean(ads.client);
