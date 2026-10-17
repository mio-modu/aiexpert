/**
 * The date arithmetic, checked against fixed dates rather than whatever today
 * happens to be. Run with `node --test scripts/`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

// Mirrors lib/freshness.ts. Kept in step by the assertions at the bottom,
// which read the real thresholds out of the source.
const WARN = 120;
const EXPIRE = 180;
const daysSince = (d, now) =>
  Math.max(0, Math.floor((now.getTime() - Date.parse(`${d}T00:00:00Z`)) / 86400000));

const NOW = new Date("2026-10-17T12:00:00Z");

test("daysSince counts whole days and never goes negative", () => {
  assert.equal(daysSince("2026-10-17", NOW), 0);
  assert.equal(daysSince("2026-10-16", NOW), 1);
  assert.equal(daysSince("2026-01-01", NOW), 289);
  assert.equal(daysSince("2027-01-01", NOW), 0, "a future date is not negative age");
});

test("the thresholds sit where the guide text says they do", () => {
  const atWarn = new Date(Date.parse("2026-10-17") + WARN * 86400000);
  const atExpire = new Date(Date.parse("2026-10-17") + EXPIRE * 86400000);
  assert.equal(daysSince("2026-10-17", atWarn), WARN);
  assert.equal(daysSince("2026-10-17", atExpire), EXPIRE);
  assert.ok(WARN < EXPIRE, "CI must complain before the page degrades");
});

test("source and test agree on the numbers", async () => {
  const src = await (await import("node:fs/promises")).readFile(
    new URL("../lib/freshness.ts", import.meta.url),
    "utf8",
  );
  assert.match(src, new RegExp(`WARN_DAYS = ${WARN}\\b`));
  assert.match(src, new RegExp(`EXPIRE_DAYS = ${EXPIRE}\\b`));
});
