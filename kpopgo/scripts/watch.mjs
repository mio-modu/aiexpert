/**
 * What this site rots by, and how to hear about it.
 *
 * A guide stops being true in three ways, and only one of them is visible from
 * inside the repository:
 *
 *   1. A source disappears. Ten external URLs carry the evidence for these
 *      five guides — a Yahoo Finance article, a korea.net press release, the
 *      platforms themselves. When one 404s, the claim it backed is still on
 *      the page, now unsupported, and nobody finds out until a reader clicks.
 *   2. A platform renames itself. This has happened twice in two years and is
 *      the reason the site exists. The brand check below is a crude tripwire
 *      for the third time.
 *   3. A verification ages. lib/freshness.ts handles that one — the page
 *      downgrades itself — and this script reports it early so there is a
 *      window to act before the seal comes down.
 *
 * None of this verifies anything. Verification means a person walked the flow,
 * and no script can do that. What this does is answer "when should someone go
 * and look again", which is the question that otherwise goes unasked until the
 * answer is "months ago".
 *
 *   node scripts/watch.mjs          # check links and freshness
 *   node scripts/watch.mjs --offline # skip the network, check parsing only
 *
 * Exits non-zero when something needs a person.
 */
import { readFile } from "node:fs/promises";

const OFFLINE = process.argv.includes("--offline");
const ROOT = new URL("..", import.meta.url);

const WARN_DAYS = 120;
const EXPIRE_DAYS = 180;

/** Pages whose brand name disappearing is itself the news. */
const BRAND_WATCH = [
  { url: "https://world.nol.com/en/ticket", expect: "NOL" },
  { url: "https://concerts.weverse.io/", expect: "Weverse" },
  { url: "https://ticket.yes24.com/", expect: "YES24" },
];

const findings = [];
const note = (level, msg) => findings.push({ level, msg });

async function read(path) {
  return readFile(new URL(path, ROOT), "utf8");
}

/**
 * The guides are TypeScript and this is a plain script, so the URLs come out
 * by pattern rather than by import. That is fragile in one specific way — a
 * refactor could change the shape and leave this quietly checking nothing — so
 * it asserts a plausible count rather than trusting what it found.
 */
async function sources() {
  const src = await read("content/guides.ts");
  const urls = [...src.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const unique = [...new Set(urls)];
  if (unique.length < 8) {
    throw new Error(
      `Only ${unique.length} source URLs found in content/guides.ts. ` +
        `The extraction pattern has probably stopped matching — fix it rather ` +
        `than lowering this number, or the watch silently checks nothing.`,
    );
  }
  return unique;
}

/**
 * Anchored on indentation, not on proximity.
 *
 * A guide's own fields sit four spaces in; a step's `see: { slug }` sits ten.
 * A pattern that just looks for "slug ... status ... lastVerified" in order
 * matches the cross-link slugs too and then scans forward into whichever guide
 * comes next — which it did, reporting two guides twice and two not at all.
 * So each guide block is cut at the next top-level slug and read inside its
 * own bounds, and the count is checked against the number of blocks found.
 */
async function freshness() {
  const src = await read("content/guides.ts");
  const today = new Date();
  const starts = [...src.matchAll(/^ {4}slug: "([^"]+)",$/gm)];
  if (starts.length === 0) throw new Error("No guides parsed from content/guides.ts");

  const research = src.match(/RESEARCH_DATE\s*=\s*"([\d-]+)"/)?.[1];
  let parsed = 0;
  for (let i = 0; i < starts.length; i++) {
    const slug = starts[i][1];
    const block = src.slice(starts[i].index, starts[i + 1]?.index ?? src.length);
    const status = block.match(/^ {4}status: "(\w+)",$/m)?.[1];
    const rawDate = block.match(/^ {4}lastVerified: (.+),$/m)?.[1];
    if (!status || !rawDate) continue;
    parsed++;
    const date = rawDate.trim() === "RESEARCH_DATE" ? research : rawDate.trim().replace(/"/g, "");
    if (!date) continue;
    const age = Math.floor((today - Date.parse(`${date}T00:00:00Z`)) / 86400000);
    if (status !== "verified") {
      note("info", `${slug} — still a draft (${age}d since ${date})`);
    } else if (age > EXPIRE_DAYS) {
      note("fail", `${slug} — verification EXPIRED, ${age}d since ${date}. The page has downgraded itself.`);
    } else if (age > WARN_DAYS) {
      note("warn", `${slug} — verified ${age}d ago, expires at ${EXPIRE_DAYS}d. Re-walk it.`);
    }
  }
  if (parsed !== starts.length) {
    throw new Error(
      `Found ${starts.length} guides but could only read ${parsed}. ` +
        `The parser has drifted from the file — fix it rather than ignoring it.`,
    );
  }
}

async function hit(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "kpopgo-link-watch/1.0 (+https://kpopgo.app)" },
    });
    return { ok: res.ok, status: res.status, body: res.ok ? await res.text() : "" };
  } catch (e) {
    return { ok: false, status: 0, body: "", error: String(e.message || e) };
  } finally {
    clearTimeout(timer);
  }
}

async function links(urls) {
  for (const url of urls) {
    const r = await hit(url);
    // 403 and 429 are a bot being turned away, not a dead page. Saying so
    // keeps the report honest instead of crying wolf every week.
    if (r.status === 403 || r.status === 429) {
      note("info", `${url} — ${r.status}, refused an automated request. Check by hand if it matters.`);
    } else if (!r.ok) {
      note("fail", `${url} — ${r.status || r.error}. A guide cites this.`);
    }
  }
}

async function brands() {
  for (const { url, expect } of BRAND_WATCH) {
    const r = await hit(url);
    if (!r.ok) continue; // already reported by links()
    if (!r.body.includes(expect)) {
      note("warn", `${url} no longer contains "${expect}". These platforms have renamed twice; check whether it has happened again.`);
    }
  }
}

const t0 = Date.now();
await freshness();
if (OFFLINE) {
  const urls = await sources();
  note("info", `offline — parsed ${urls.length} source URLs, skipped the network`);
} else {
  const urls = await sources();
  await links(urls);
  await brands();
}

const fails = findings.filter((f) => f.level === "fail");
const warns = findings.filter((f) => f.level === "warn");

console.log(`\nkpopgo watch — ${new Date().toISOString().slice(0, 10)} (${((Date.now() - t0) / 1000).toFixed(1)}s)\n`);
for (const level of ["fail", "warn", "info"]) {
  for (const f of findings.filter((x) => x.level === level)) {
    console.log(`  ${{ fail: "✗", warn: "!", info: "·" }[level]} ${f.msg}`);
  }
}
console.log(`\n${fails.length} needing action, ${warns.length} worth a look.\n`);

process.exit(fails.length || warns.length ? 1 : 0);
