import { chromium } from "playwright";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
for (const route of ["/", "/guides/nol-world-ticketing-guide"]) {
  await p.goto("http://127.0.0.1:3183" + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(700);
  const bad = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 60),
          left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
          txt: (el.textContent || "").trim().slice(0, 30),
        });
      }
    }
    return { vw, out: out.slice(0, 10), total: out.length };
  });
  console.log(route, JSON.stringify(bad, null, 1));
}
await b.close();
