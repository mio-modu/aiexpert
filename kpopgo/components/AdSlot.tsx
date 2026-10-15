"use client";

import { useEffect, useRef } from "react";
import { ads, adEnabled, type AdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One AdSense unit.
 *
 * Three things this does on purpose:
 *
 *  · Reserves its height before the unit loads. An ad that pushes the article
 *    down as it arrives is a Cumulative Layout Shift, which Google measures and
 *    ranks on — so an unreserved ad slot costs search position to buy
 *    impressions, which is the wrong trade on a site whose whole channel is
 *    search.
 *
 *  · Labels itself. AdSense requires ads be distinguishable from content, and
 *    on a page whose product is "you can trust what this says", an ad that
 *    reads as a recommendation does more damage than it earns.
 *
 *  · Renders nothing when unconfigured, rather than an empty box.
 */
export function AdSlot({
  placement,
  className = "",
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!adEnabled(placement) || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // A blocked or failed loader leaves the reserved space empty, which is
      // the correct outcome — never a broken page.
    }
  }, [placement]);

  if (!adEnabled(placement)) return null;

  return (
    <aside
      className={`ad-slot ${className}`.trim()}
      aria-label="Advertisement"
      // Not part of the guide, so it stays out of the reading order's content.
      role="complementary"
    >
      <p className="data-sm dim ad-label">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ads.client}
        data-ad-slot={ads.slots[placement]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
