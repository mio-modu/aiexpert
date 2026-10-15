import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://127.0.0.1:3171/words", { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
await p.screenshot({ path: "/tmp/claude-0/words.png" });
await b.close();
