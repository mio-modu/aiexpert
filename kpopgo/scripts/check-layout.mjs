/**
 * The pre-push layout check.
 *
 * Every route, both themes, five widths. What it reports is horizontal
 * overflow, which is the failure this site keeps having: a utility class that
 * quietly sets `display` and overrides Tailwind's `hidden`, a nav bar that runs
 * past the viewport at 320px, an object that does not shrink. None of it shows
 * at desktop width, and all of it shows to most of the traffic.
 *
 *   npm run build && npm run start &
 *   node scripts/check-layout.mjs [outputDir]
 *
 * Screenshots land in the output directory at 390 and 1280. The browser is the
 * one already in the container — never run `playwright install`.
 */
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] || ".layout-check";
const BASE = process.env.BASE_URL || "http://localhost:3000";
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["guides", "/guides"],
  ["guide", "/guides/buy-k-pop-albums-from-overseas"],
  ["words", "/words"],
  ["about", "/about"],
];
const WIDTHS = [320, 360, 390, 768, 1280];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});

let bad = 0;
for (const theme of ["dark", "light"]) {
  for (const [name, path] of ROUTES) {
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({
        viewport: { width: w, height: 900 },
        deviceScaleFactor: 1,
        colorScheme: theme,
      });
      const page = await ctx.newPage();
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      // Walk the page before measuring. Everything below the fold loads lazily,
      // and a full-page screenshot does not reliably trigger it — which cost an
      // hour once, chasing a decorative image that was rendering correctly and
      // simply had not been fetched when the shot was taken.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      const h = await page.evaluate(() => document.body.scrollHeight);
      if (over > 0) {
        bad++;
        console.log(`  ✗ OVERFLOW ${theme} ${name} @${w}: +${over}px`);
      }
      if (w === 390 || w === 1280) {
        await page.screenshot({
          path: `${OUT}/${theme}-${name}-${w}.png`,
          fullPage: w === 1280,
        });
      }
      if (w === 1280 && theme === "dark") console.log(`  ${name}: ${h}px tall`);
      await ctx.close();
    }
  }
}
await browser.close();
console.log(bad === 0 ? "ALL CLEAN — no horizontal overflow" : `${bad} OVERFLOWS`);
process.exit(bad === 0 ? 0 : 1);
