import { chromium } from "playwright";

const BASE = "http://127.0.0.1:3170";
const routes = ["/", "/guides", "/words", "/about", "/privacy",
                "/guides/nol-world-ticketing-guide", "/nope-404"];

const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});

const problems = [];
const page = await b.newPage({ viewport: { width: 1280, height: 900 } });
page.on("console", m => { if (m.type() === "error") problems.push(`console: ${m.text()}`); });
page.on("pageerror", e => problems.push(`pageerror: ${e.message}`));

for (const r of routes) {
  const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
  const status = res?.status();
  const a = await page.evaluate(() => {
    const imgs = [...document.images];
    const h1 = document.querySelectorAll("h1").length;
    return {
      title: document.title,
      h1,
      imgsMissingAlt: imgs.filter(i => !i.hasAttribute("alt")).length,
      svgNoLabel: [...document.querySelectorAll("svg")]
        .filter(s => !s.hasAttribute("aria-hidden") && !s.hasAttribute("aria-label")).length,
      linksEmpty: [...document.querySelectorAll("a")]
        .filter(x => !x.textContent.trim() && !x.getAttribute("aria-label")).length,
      jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  const bad = [];
  if (r === "/nope-404" ? status !== 404 : status !== 200) bad.push(`status ${status}`);
  if (r !== "/nope-404" && a.h1 !== 1) bad.push(`h1 count ${a.h1}`);
  if (a.imgsMissingAlt) bad.push(`${a.imgsMissingAlt} img without alt`);
  if (a.svgNoLabel) bad.push(`${a.svgNoLabel} svg unlabelled`);
  if (a.linksEmpty) bad.push(`${a.linksEmpty} empty link`);
  if (a.overflow) bad.push("horizontal overflow");
  console.log(`${bad.length ? "FAIL" : " ok "}  ${r.padEnd(42)} ld=${a.jsonLd} ${bad.join("; ")}`);
}

// phone width, dark theme
const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true,
                            colorScheme: "dark" });
for (const r of ["/", "/words", "/guides/nol-world-ticketing-guide"]) {
  await m.goto(BASE + r, { waitUntil: "networkidle" });
  const over = await m.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`${over ? "FAIL" : " ok "}  phone/dark ${r}`);
}
await m.screenshot({ path: "/tmp/claude-0/final-mobile.png" });

if (problems.length) console.log("\nRuntime problems:\n" + problems.join("\n"));
else console.log("\nNo console or page errors.");
await b.close();
