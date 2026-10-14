import Link from "next/link";
import { guides, platformList, RESEARCH_DATE } from "@/content/guides";
import { accentMap } from "@/lib/site";
import { Glyph } from "@/components/Glyph";
import { VerifiedBadge } from "@/components/Badges";

const marqueeWords = [
  "Seoul",
  "Los Angeles",
  "São Paulo",
  "London",
  "Jakarta",
  "Mexico City",
  "Paris",
  "Manila",
  "Toronto",
  "Sydney",
  "Berlin",
  "Bangkok",
];

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />
        <div
          className="orb animate-float -top-32 -left-24 size-[32rem]"
          style={{ background: "var(--color-grape-600)" }}
        />
        <div
          className="orb animate-float-slow -top-20 right-[-10rem] size-[30rem]"
          style={{ background: "var(--color-bubble-500)" }}
        />
        <div
          className="orb animate-float top-56 left-1/3 size-[22rem] opacity-30"
          style={{ background: "var(--color-aqua-400)" }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-pill border border-[var(--border)] bg-[var(--bg-raised)] px-3.5 py-1.5 font-mono text-[0.64rem] font-semibold tracking-[0.12em] uppercase backdrop-blur-sm">
              <span className="size-2 animate-pulse-dot rounded-full bg-lime-400" aria-hidden="true" />
              Updated for NOL World · Dec 2025 rebrand
            </span>
          </div>

          <h1
            className="animate-rise mt-7 max-w-4xl font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[4.75rem]"
            style={{ animationDelay: "60ms" }}
          >
            Buying K-pop tickets
            <br />
            from outside Korea
            <br />
            <span className="grad-text">shouldn&apos;t be this hard.</span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-soft"
            style={{ animationDelay: "120ms" }}
          >
            Which platform your show is on. What identity check it runs. Why your card
            got declined. Walked step by step, dated, and sourced — so you don&apos;t find
            out at the payment screen.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/guides/buy-k-pop-concert-tickets-from-overseas"
              className="grad-brand group inline-flex items-center gap-2 rounded-pill px-6 py-3.5 font-display text-base font-bold text-white shadow-xl shadow-grape-600/30 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Start with the basics
              <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/guides/foreign-card-declined-korean-ticketing"
              className="inline-flex items-center gap-2 rounded-pill border border-[var(--border-strong)] px-6 py-3.5 font-display text-base font-bold transition-colors hover:bg-[var(--bg-raised)]"
            >
              My card was declined
            </Link>
          </div>

          <dl
            className="animate-rise mt-16 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8"
            style={{ animationDelay: "240ms" }}
          >
            {[
              { k: "5", v: "step-by-step guides" },
              { k: "0", v: "idol photos used" },
              { k: "100%", v: "claims with sources" },
            ].map((stat) => (
              <div key={stat.v}>
                <dt className="sr-only">{stat.v}</dt>
                <dd>
                  <span className="block font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {stat.k}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-faint sm:text-sm">
                    {stat.v}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────────────── City marquee ───────────────────────── */}
      <section aria-hidden="true" className="relative border-y border-[var(--border)] py-4">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="flex items-center gap-10 font-display text-sm font-bold tracking-[0.2em] uppercase text-faint"
            >
              {w}
              <span className="size-1.5 rounded-full bg-[var(--border-strong)]" />
            </span>
          ))}
        </div>
      </section>

      {/* ───────────────────────── The problem ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Most guides online are
            <span className="grad-text"> describing a site that got renamed.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-soft">
            Yanolja Core folded Interpark Ticket into NOL Ticket in April 2025. Then on
            1 December 2025 the overseas-facing interpark Global became NOL World. The
            English guides ranking today still send you to the old name, with screenshots
            of an interface that changed.
          </p>
          <p className="mt-4 text-base leading-relaxed text-soft">
            On top of that, South Korea&apos;s revised Performances Act took effect on
            28 August 2025 and reshaped what resale is allowed. Almost nothing written for
            international fans mentions it.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "Wrong platform",
              d: "Guides map agencies to platforms one-to-one. Agencies switch between tours, and a single tour can split its Korean and global sales.",
            },
            {
              n: "02",
              t: "Wrong verification",
              d: "The identity check you face depends entirely on which site your show is sold on. Preparing for the wrong one wastes the lead time that matters.",
            },
            {
              n: "03",
              t: "Wrong moment",
              d: "Verification processing, bank fraud rules and membership cut-offs all need days. They get discovered at the payment step instead.",
            },
          ].map((item) => (
            <div key={item.n} className="glass glass-hover p-6">
              <span className="font-mono text-[0.64rem] font-semibold tracking-[0.12em] uppercase text-faint">
                Failure {item.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{item.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-soft">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Guides ───────────────────────── */}
      <section id="guides" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            The guides
          </h2>
          <Link
            href="/guides"
            className="text-sm font-semibold text-soft transition-colors hover:text-[var(--text)]"
          >
            See all →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {guides.map((g, i) => {
            const a = accentMap[g.accent];
            return (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className={`glass glass-hover group relative overflow-hidden p-6 sm:p-7 ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-gradient-to-br ${a.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative flex items-start gap-4">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${a.bg} ${a.text}`}>
                    <Glyph name={g.glyph} className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold tracking-[-0.01em]">
                        {g.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-soft">{g.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <VerifiedBadge status={g.status} date={g.lastVerified} />
                      <span className="text-xs text-faint">{g.readMinutes} min read</span>
                      <span className="text-xs text-faint">· {g.steps.length} steps</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────────────────────── Platforms ───────────────────────── */}
      <section id="platforms" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
          Know your platform
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft">
          There is no single K-pop ticketing site. The platform is chosen per tour and
          named in the official announcement. These are the ones that come up — but never
          infer yours from the agency.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {platformList.map((p) => {
            const a = accentMap[p.accent];
            return (
              <li key={p.name} className="glass flex items-start gap-3 p-5">
                <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${a.dot}`} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-base font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-soft">{p.note}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ───────────────────────── Principles ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="ring-grad glass overflow-hidden p-8 sm:p-12">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
            How we write these
          </h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2">
            {[
              {
                t: "Dated, or it doesn't ship",
                d: `Every page carries the day it was last checked against the live platform. Research compiled ${RESEARCH_DATE}.`,
              },
              {
                t: "Sourced, or it doesn't ship",
                d: "Official announcements, platform help pages and press reporting — linked at the bottom of every guide so you can check us.",
              },
              {
                t: "No identity-check workarounds",
                d: "Where a platform requires Korean identity verification we say so and describe the official routes open to overseas fans. We will not help you around a verification.",
              },
              {
                t: "No idol photos",
                d: "Not one. Every visual here is drawn for this site. That keeps us clear of portrait and copyright claims, and it means we can redraw a flow the day a platform changes it.",
              },
            ].map((p) => (
              <div key={p.t} className="flex gap-3.5">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-lime-400" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                <div>
                  <h3 className="font-display text-base font-bold">{p.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
