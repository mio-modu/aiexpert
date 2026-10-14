# KPOPGO

Step-by-step guides for international K-pop fans buying tickets, memberships and albums
from outside Korea.

**Live design preview:** https://claude.ai/artifact/2X8kuEmbiyUuB8UZ3WkSn3

---

## Why this and not a K-pop information site

The schedule and profile niches are taken. Billboard runs a full 2026 K-pop concert list,
Soompi runs a tour masterlist, Vivid Seats has K-pop ticket pages, and there are already
city-level specialists like `bostonkpopconcerts.com`. A new domain does not outrank
Billboard on a schedule query.

The *procedure* niche is not taken. Searching how to actually buy returns travel-agency
blogs (Creatrip, KKday), a prepaid-card company's content marketing (namanecard) and
personal blogs. No high-authority news domain writes how-to content. That is a winnable
competitive set.

And the existing pages are stale in a specific, checkable way:

| What changed | When | Covered by ranking guides |
| --- | --- | --- |
| Interpark Ticket → NOL Ticket (Yanolja Core brand consolidation) | April 2025 | No |
| interpark Global → **NOL World** | 1 December 2025 | No |
| Revised Performances Act takes effect (resale rules) | 28 August 2025 | No |

Platform renames and policy changes also age out whatever an AI answer engine learned, and
a fan who fails the process does not get the ticket — so the search intent is urgent and
the reader needs a source they can date.

## What this site deliberately does not do

- **No identity-check workarounds.** Where a platform requires Korean identity
  verification, the guide says so and describes the official routes open to overseas fans.
- **No idol photos, lyrics or audio.** Every visual is drawn for this site. That removes
  portrait-rights and copyright exposure entirely, and it means a flow can be redrawn the
  day a platform changes it.
- **No scaled page generation.** Roughly 25 guide pages, each with distinct content.
- **No resale promotion for Korean shows.** The revised Performances Act makes above-face
  commercial resale a legal problem; affiliate relationships with resale marketplaces are
  scoped to non-Korean tour dates only, if used at all.

## Content integrity rules

Enforced by the `Guide` type in `content/guides.ts`:

- `sources[]` — every claim links where it came from
- `lastVerified` — the date a human last checked it against the live platform
- `status` — `"draft"` until someone has walked the flow end to end; renders a visible
  banner saying so
- `scope` — what the guide covers and what it does not

Every page currently ships as `status: "draft"`. That is accurate: the content is compiled
from official announcements, platform help pages and press reporting, and nobody has yet
created an account and gone through a purchase. Flipping these to `"verified"` is week 2's
job and is the actual product work.

## Stack

| | |
| --- | --- |
| Framework | Next.js 15 (App Router), statically prerendered |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens |
| Content | Typed TS modules — no database needed at this size |
| SEO | Per-page metadata, `HowTo` + `FAQPage` + `BreadcrumbList` JSON-LD, sitemap, robots |
| Analytics | GA4 via `NEXT_PUBLIC_GA_ID` — engagement time is measured here, **not** in Search Console |
| Deploy | Vercel |

Design: dark-first "Neon Seoul" — Archivo (wide display), Hanken Grotesk (body),
Martian Mono (verification dates and platform codes). Full light theme included.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## 30-day validation plan

| Week | Work | Gate |
| --- | --- | --- |
| 1 | English how-to keyword research; audit the 10 ranking guides for what is stale or wrong | 20 target queries + a documented error list |
| 2 | **Walk NOL World, Weverse and YES24 Global end to end.** Register, verify, reach payment. Record every failure point and real elapsed time | All five guides flipped to `status: "verified"` |
| 3 | Draw the step diagrams; wire GA4; publish | 5 pages live and indexable |
| 4 | Submit to Search Console; share in fan communities | Measure against the gates below |

Week 2 is the whole business. The failure points recorded there are the original data no
competing blog has.

### Stop / continue gates

Separate the three questions instead of collapsing them into one traffic number — a new
domain can take months to index, so low impressions alone does not mean no market.

- **Product:** all five guides accurate after a real walk-through; maintenance under
  5 h/week
- **Demand:** 10+ substantive community responses (questions, corrections, shares)
- **Search:** pages indexed; impressions trending up; GA4 average engagement time above
  2 minutes

Failing *search* alone → diagnose indexing versus content. Failing *product* or *demand* →
stop.

### Monetisation order

1. AdSense, to measure a real page RPM
2. Travel-adjacent programmes (accommodation, eSIM, transport) — confirm sign-up terms
   before assuming anything
3. Direct advertising to the payment and travel companies already doing content marketing
   on these keywords

Raptive's entry is 25,000 monthly pageviews, and between 25,000 and 99,999 it requires 50%
of traffic from the US, UK, Canada, Australia or New Zealand. English procedure queries
skew that way naturally, which is the point of choosing this niche — but it has to be
designed for, not hoped for.

Expect roughly zero revenue for the first three to four months.

---

Not affiliated with any agency, artist or ticketing platform. Not legal, financial or
immigration advice.
