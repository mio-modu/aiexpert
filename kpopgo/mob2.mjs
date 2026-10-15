import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await p.goto("http://127.0.0.1:3181/", { waitUntil: "networkidle" });
await p.waitForTimeout(900);

const shots = [
  [0, "v1-hero"],
  [900, "v2-numbers"],
  [2100, "v3-gap"],
  [3400, "v4-guides"],
];
for (const [y, name] of shots) {
  await p.evaluate(yy => window.scrollTo(0, yy), y);
  await p.waitForTimeout(400);
  await p.screenshot({ path: `/tmp/claude-0/${name}.png` });
}
const h = await p.evaluate(() => document.body.scrollHeight);
console.log("home scrollHeight:", h);

await p.goto("http://127.0.0.1:3181/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const gh = await p.evaluate(() => document.body.scrollHeight);
console.log("guide scrollHeight:", gh);
await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/v5-screens.png" });
await p.evaluate(() => window.scrollTo(0, 1800));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/v6-steps.png" });
await b.close();
