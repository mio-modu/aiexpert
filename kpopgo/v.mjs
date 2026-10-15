import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const BASE = "http://127.0.0.1:3184";
const routes = ["/", "/guides", "/words", "/about", "/privacy", "/guides/nol-world-ticketing-guide"];

for (const w of [320, 360, 390, 414]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 }, isMobile: true });
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
const r = await p.evaluate(() => {
  const small = [...document.querySelectorAll("a,button")]
    .map(el => ({ t: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 20),
                  b: el.getBoundingClientRect() }))
    .filter(x => x.b.width > 2 && x.b.height > 2 && x.b.height < 44)
    .map(x => `${x.t} ${Math.round(x.b.width)}x${Math.round(x.b.height)}`);
  return { height: document.body.scrollHeight, shortTargets: small };
});
console.log("home:", JSON.stringify(r, null, 1));
await p.evaluate(() => window.scrollTo(0, 820));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/ok-proof.png" });
await p.goto(BASE + "/guides/nol-world-ticketing-guide", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
await p.evaluate(() => window.scrollTo(0, 400));
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/claude-0/ok-screen.png" });
await b.close();
