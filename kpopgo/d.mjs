import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 860 }, colorScheme: "dark" });
await p.goto("http://127.0.0.1:3191/", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/claude-0/d1.png" });
await p.evaluate(() => document.querySelector("#guides")?.scrollIntoView({ block: "start" }));
await p.waitForTimeout(400);
await p.hover(".pc");
await p.waitForTimeout(700);
await p.screenshot({ path: "/tmp/claude-0/d2.png" });
await p.evaluate(() => document.querySelector("#platforms")?.scrollIntoView({ block: "start" }));
await p.waitForTimeout(500);
await p.screenshot({ path: "/tmp/claude-0/d3.png" });
await b.close();
