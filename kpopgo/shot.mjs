import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
// Block the ad network so this shows the reserved space with nothing filling
// it — the worst case, and the one that must not collapse.
await p.route("**/*googlesyndication.com/**", r => r.abort());
await p.goto("http://127.0.0.1:3162/guides/nol-world-ticketing-guide", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(1500);
const el = await p.$(".ad-slot");
await el?.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);
await p.screenshot({ path: "/tmp/claude-0/ad.png" });
const box = await el?.boundingBox();
console.log("reserved slot box:", JSON.stringify(box));
await b.close();
