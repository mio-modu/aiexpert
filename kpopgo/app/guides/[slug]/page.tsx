import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/content/guides";
import { accentMap } from "@/lib/site";
import { guideJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/Glyph";
import { VerifiedBadge, DraftNotice } from "@/components/Badges";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.summary, type: "article" },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const a = accentMap[guide.accent];
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <article className="relative overflow-hidden">
      {guideJsonLd(guide).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <div
        className="orb animate-float -top-44 -left-20 size-[30rem]"
        style={{ background: "var(--color-grape-600)" }}
      />
      <div
        className="orb animate-float-slow -top-28 right-[-8rem] size-[24rem] opacity-35"
        style={{ background: "var(--color-bubble-500)" }}
      />

      {/* ─────────── Header ─────────── */}
      <header className="relative mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-faint">
          <Link href="/" className="transition-colors hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="transition-colors hover:text-[var(--text)]">
            Guides
          </Link>
        </nav>

        <span className={`mt-7 inline-grid size-14 place-items-center rounded-2xl ${a.bg} ${a.text}`}>
          <Glyph name={guide.glyph} className="size-7" />
        </span>

        <h1 className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-5xl">
          {guide.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-soft">{guide.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <VerifiedBadge status={guide.status} date={guide.lastVerified} />
          <span className="text-xs text-faint">{guide.readMinutes} min read</span>
          {guide.platforms.map((p) => (
            <span
              key={p}
              className="rounded-pill border border-[var(--border)] px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-wide uppercase text-soft"
            >
              {p}
            </span>
          ))}
        </div>
      </header>

      {/* ─────────── Scope + draft notice ─────────── */}
      <div className="relative mx-auto mt-10 max-w-3xl space-y-4 px-4 sm:px-6">
        <div className="glass p-5 sm:p-6">
          <h2 className="font-display text-xs font-bold tracking-[0.16em] uppercase text-faint">
            What this covers
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-soft">{guide.scope}</p>
        </div>
        {guide.status === "draft" ? <DraftNotice /> : null}
      </div>

      {/* ─────────── Intro ─────────── */}
      <div className="relative mx-auto mt-14 max-w-3xl px-4 sm:px-6">
        <div className="space-y-5">
          {guide.intro.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-lg leading-relaxed font-medium"
                  : "text-base leading-relaxed text-soft"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* ─────────── Steps ─────────── */}
      <section className="relative mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
          Step by step
        </h2>

        <ol className="mt-9 space-y-4">
          {guide.steps.map((step, i) => (
            <li key={step.title} id={`step-${i + 1}`} className="glass glass-hover p-6 sm:p-7">
              <div className="flex items-start gap-4 sm:gap-5">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${a.bg} font-display text-base font-extrabold ${a.text}`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-bold tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    {step.takes ? (
                      <span className="shrink-0 rounded-pill bg-[var(--bg-raised-strong)] px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-wide uppercase text-faint">
                        {step.takes}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-[0.95rem] leading-relaxed text-soft">{step.body}</p>

                  {step.pitfall ? (
                    <div className="mt-4 flex gap-3 rounded-xl border border-tangerine-400/25 bg-tangerine-400/[0.07] p-4">
                      <svg viewBox="0 0 24 24" className="mt-0.5 size-4.5 shrink-0 text-tangerine-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 8.5v5M12 16.5h.01" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                      <p className="text-sm leading-relaxed">
                        <span className="font-display font-bold text-tangerine-400">
                          Where this breaks:{" "}
                        </span>
                        <span className="text-soft">{step.pitfall}</span>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="relative mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
          Questions people actually ask
        </h2>
        <div className="mt-8 space-y-3">
          {guide.faq.map((item) => (
            <details key={item.q} className="glass group p-5 sm:p-6">
              <summary className="flex cursor-pointer items-start justify-between gap-4 font-display text-base font-bold marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3.5 text-[0.95rem] leading-relaxed text-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─────────── Sources ─────────── */}
      <section className="relative mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="ring-grad glass p-7 sm:p-8">
          <h2 className="font-display text-xl font-extrabold tracking-[-0.01em]">
            Sources
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-soft">
            Last checked {guide.lastVerified}. If one of these has moved on since, the
            official announcement for your show is the authority — not this page.
          </p>
          <ul className="mt-5 space-y-2.5">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group inline-flex items-start gap-2 text-sm text-soft transition-colors hover:text-[var(--text)]"
                >
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-faint" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 5h5v5M19 5l-8 8M18 14v4a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V7.5A1.5 1.5 0 0 1 6.5 6H10" />
                  </svg>
                  <span className="underline decoration-[var(--border-strong)] underline-offset-4 transition-colors group-hover:decoration-current">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── Next ─────────── */}
      <section className="relative mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-xl font-extrabold tracking-[-0.01em]">Next</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {others.map((g) => {
            const oa = accentMap[g.accent];
            return (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="glass glass-hover block h-full p-5">
                  <span className={`grid size-9 place-items-center rounded-lg ${oa.bg} ${oa.text}`}>
                    <Glyph name={g.glyph} className="size-4.5" />
                  </span>
                  <h3 className="mt-3.5 font-display text-sm font-bold leading-snug">
                    {g.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-faint">
                    {g.readMinutes} min · {g.steps.length} steps
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
