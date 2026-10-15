import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 820 } });
await p.goto("http://127.0.0.1:3150/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
await p.waitForTimeout(1400);
await p.screenshot({ path: "/tmp/claude-0/g-light.png" });
await p.emulateMedia({ colorScheme: "dark" });
await p.evaluate(() => { try { localStorage.setItem("kpopgo-theme", "dark"); } catch {} });
await p.reload({ waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/claude-0/g-dark.png" });
await b.close();
console.log("ok");
