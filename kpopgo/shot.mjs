import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 760 } });
await p.goto("http://127.0.0.1:3141/", { waitUntil: "networkidle" });
await p.waitForTimeout(1400);
await p.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find(s =>
    s.getAttribute("aria-label")?.includes("crowd"));
  el?.scrollIntoView({ block: "center" });
});
await p.waitForTimeout(900);
await p.screenshot({ path: "/tmp/claude-0/s-band2.png" });
// mobile check
const m = await b.newPage({ viewport: { width: 390, height: 780 }, isMobile: true });
await m.goto("http://127.0.0.1:3141/", { waitUntil: "networkidle" });
await m.waitForTimeout(1200);
await m.screenshot({ path: "/tmp/claude-0/s-mobile.png" });
const overflow = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
console.log("mobile horizontal overflow:", overflow);
await b.close();
