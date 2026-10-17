import type { Guide, GuideStatus } from "@/content/guides";

/**
 * How a verification ages.
 *
 * The site's whole claim is that it is not stale, and the guides it competes
 * with are stale precisely because someone checked them once and the page kept
 * saying so for years. A stored `status: "verified"` has the same failure
 * built in: it is a claim made on one day that keeps being displayed on every
 * day after.
 *
 * So what renders is derived, not stored. `status` in the content is what a
 * person did; `displayStatus` is what the page is still entitled to say about
 * it. After EXPIRE_DAYS the seal comes down on its own — nobody has to
 * remember, which is the point, because nobody does.
 *
 * "stale" is deliberately not the same as "draft". Draft means nobody ever
 * walked it. Stale means somebody did, on a date you can see, and that date is
 * now old enough that you should check the official announcement yourself.
 * Collapsing the two would throw away true information.
 */

/** Past this, CI complains but the page is unchanged — time to act. */
export const WARN_DAYS = 120;

/** Past this, the page stops claiming the verification. */
export const EXPIRE_DAYS = 180;

export type DisplayStatus = GuideStatus | "stale";

/** Whole days between a YYYY-MM-DD date and now. Negative dates read as 0. */
export function daysSince(date: string, now: Date = new Date()): number {
  const then = Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((now.getTime() - then) / 86_400_000));
}

export function displayStatus(guide: Guide, now: Date = new Date()): DisplayStatus {
  if (guide.status !== "verified") return guide.status;
  return daysSince(guide.lastVerified, now) > EXPIRE_DAYS ? "stale" : "verified";
}

/** True once a verified guide is close enough to expiry to be worth re-walking. */
export function needsAttention(guide: Guide, now: Date = new Date()): boolean {
  return guide.status === "verified" && daysSince(guide.lastVerified, now) > WARN_DAYS;
}
