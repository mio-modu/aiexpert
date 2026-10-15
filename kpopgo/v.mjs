import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const BASE = "http://127.0.0.1:3192";
const routes = ["/", "/guides", "/words", "/about", "/privacy", "/guides/nol-world-ticketing-guide"];
for (const scheme of ["dark", "light"]) {
  for (const w of [320, 360, 390, 768, 1280]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 }, isMobile: w < 768, colorScheme: scheme });
    const fails = [];
    for (const r of routes) {
      await p.goto(BASE + r, { waitUntil: "networkidle" });
      if (await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1))
        fails.push(r);
    }
    console.log(`${fails.length ? "FAIL" : " ok "}  ${scheme.padEnd(5)} ${w}px  ${fails.join(", ")}`);
    await p.close();
  }
}
const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, colorScheme: "dark" });
await m.goto(BASE + "/", { waitUntil: "networkidle" });
await m.waitForTimeout(900);
await m.evaluate(() => document.querySelector("#guides")?.scrollIntoView({ block: "start" }));
await m.waitForTimeout(500);
await m.screenshot({ path: "/tmp/claude-0/dm.png" });
console.log("home height:", await m.evaluate(() => document.body.scrollHeight));
await b.close();
