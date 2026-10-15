import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
await p.goto("http://127.0.0.1:3190/", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/claude-0/k1.png" });
await p.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find(s => s.id === "guides");
  el?.scrollIntoView({ block: "start" });
});
await p.waitForTimeout(500);
// hover the first card to show the foil
await p.hover(".pc");
await p.waitForTimeout(700);
await p.screenshot({ path: "/tmp/claude-0/k2.png" });
const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await m.goto("http://127.0.0.1:3190/", { waitUntil: "networkidle" });
await m.waitForTimeout(1000);
await m.evaluate(() => document.querySelector("#guides")?.scrollIntoView({ block: "start" }));
await m.waitForTimeout(500);
await m.screenshot({ path: "/tmp/claude-0/k3.png" });
console.log("overflow:", await m.evaluate(() =>
  document.documentElement.scrollWidth > document.documentElement.clientWidth));
await b.close();
