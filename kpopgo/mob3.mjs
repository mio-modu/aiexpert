import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const BASE = "http://127.0.0.1:3182";
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });

await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(900);
const home = await p.evaluate(() => {
  const small = [...document.querySelectorAll("a,button")]
    .map(el => ({ t: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 22),
                  r: el.getBoundingClientRect() }))
    .filter(x => x.r.width > 2 && x.r.height > 2 && (x.r.height < 44 || x.r.width < 44));
  return {
    height: document.body.scrollHeight,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    small: small.map(x => `${x.t} ${Math.round(x.r.width)}x${Math.round(x.r.height)}`),
  };
});
console.log("HOME", JSON.stringify(home, null, 1));

await p.evaluate(() => window.scrollTo(0, 820));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/f-proof.png" });
await p.evaluate(() => window.scrollTo(0, 3100));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/f-cards.png" });

await p.goto(BASE + "/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const g = await p.evaluate(() => ({
  height: document.body.scrollHeight,
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  h1: document.querySelector("h1")?.textContent?.trim(),
}));
console.log("GUIDE", JSON.stringify(g));
await p.evaluate(() => window.scrollTo(0, 420));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/f-screen.png" });

for (const w of [320, 360, 414]) {
  const n = await b.newPage({ viewport: { width: w, height: 800 }, isMobile: true });
  await n.goto(BASE + "/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
  const o = await n.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`${o ? "FAIL" : " ok "}  ${w}px overflow`);
  await n.close();
}
await b.close();
