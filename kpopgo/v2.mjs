import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const BASE = "http://127.0.0.1:3185";
const routes = ["/", "/guides", "/words", "/about", "/privacy", "/guides/nol-world-ticketing-guide"];
for (const w of [320, 360, 390, 414, 768]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 }, isMobile: w < 768 });
  const fails = [];
  for (const r of routes) {
    await p.goto(BASE + r, { waitUntil: "networkidle" });
    const o = await p.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (o) fails.push(r);
  }
  console.log(`${fails.length ? "FAIL" : " ok "}  ${w}px  ${fails.join(", ")}`);
  await p.close();
}
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
console.log("short targets:", JSON.stringify(await p.evaluate(() =>
  [...document.querySelectorAll("a,button")]
    .map(el => ({ t: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 18),
                  b: el.getBoundingClientRect() }))
    .filter(x => x.b.width > 2 && x.b.height > 2 && x.b.height < 44)
    .map(x => `${x.t} ${Math.round(x.b.width)}x${Math.round(x.b.height)}`))));
await p.evaluate(() => window.scrollTo(0, 830));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/z-proof.png" });
await p.evaluate(() => window.scrollTo(0, 3150));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/z-cards.png" });
await p.goto(BASE + "/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
await p.evaluate(() => window.scrollTo(0, 380));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/z-screen.png" });
await b.close();
