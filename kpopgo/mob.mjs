import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const BASE = "http://127.0.0.1:3180";
const p = await b.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

for (const [route, name] of [
  ["/", "m-home"],
  ["/guides/nol-world-ticketing-guide", "m-guide"],
  ["/words", "m-words"],
]) {
  await p.goto(BASE + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `/tmp/claude-0/${name}.png`, fullPage: true });
}

// Measurements that matter on a phone
await p.goto(BASE + "/", { waitUntil: "networkidle" });
const m = await p.evaluate(() => {
  const doc = document.documentElement;
  const tapTooSmall = [...document.querySelectorAll("a,button")]
    .map(el => ({ t: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24),
                  r: el.getBoundingClientRect() }))
    .filter(x => x.r.width > 0 && (x.r.height < 44 || x.r.width < 44))
    .map(x => `${x.t} ${Math.round(x.r.width)}x${Math.round(x.r.height)}`);
  const h1 = document.querySelector("h1");
  const cs = h1 ? getComputedStyle(h1) : null;
  return {
    scrollW: doc.scrollWidth, clientW: doc.clientWidth,
    h1Font: cs?.fontSize, h1Box: h1 ? Math.round(h1.getBoundingClientRect().height) : 0,
    heroH: Math.round(document.querySelector(".stage")?.getBoundingClientRect().height || 0),
    tapTooSmall: tapTooSmall.slice(0, 12),
    tapCount: tapTooSmall.length,
  };
});
console.log(JSON.stringify(m, null, 1));

// narrow Android
const n = await b.newPage({ viewport: { width: 360, height: 800 }, isMobile: true });
await n.goto(BASE + "/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
const over = await n.evaluate(() => ({
  over: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  w: document.documentElement.scrollWidth,
}));
console.log("360px guide:", JSON.stringify(over));
await n.screenshot({ path: "/tmp/claude-0/m360.png" });
await b.close();
