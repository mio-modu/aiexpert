import Link from "next/link";
import { guides, RESEARCH_DATE } from "@/content/guides";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-28 border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grad-brand grid size-8 place-items-center rounded-lg font-display text-sm font-extrabold text-white">
              K
            </span>
            <span className="font-display text-base font-extrabold tracking-tight">
              KPOP<span className="grad-text">GO</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-soft">
            {site.description}
          </p>
          <p className="mt-5 text-xs leading-relaxed text-faint">
            An independent fan resource. Not affiliated with, endorsed by or operated by any
            agency, artist or ticketing platform. Platform rules change — the official
            announcement for your show always overrides anything written here.
          </p>
        </div>

        <nav aria-label="Guides">
          <h2 className="font-display text-sm font-bold tracking-wide uppercase text-faint">
            Guides
          </h2>
          <ul className="mt-4 space-y-2.5">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="text-sm text-soft transition-colors hover:text-[var(--text)]"
                >
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wide uppercase text-faint">
            How this works
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            <li>Every page carries a verification date.</li>
            <li>Every claim links its source.</li>
            <li>No identity-check workarounds, ever.</li>
            <li>No idol photos — we draw our own diagrams.</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-[var(--border)] px-4 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Research compiled {RESEARCH_DATE}. Not legal, financial or immigration advice.</p>
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
