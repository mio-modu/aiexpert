import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/guides";
import { accentMap } from "@/lib/site";
import { Glyph } from "@/components/Glyph";
import { VerifiedBadge } from "@/components/Badges";

export const metadata: Metadata = {
  title: "All guides",
  description:
    "Every KPOPGO guide: ticketing platforms, identity verification, fan club presales, foreign card payments and overseas album orders.",
};

export default function GuidesIndex() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="orb animate-float -top-40 left-1/4 size-[28rem]"
        style={{ background: "var(--color-grape-600)" }}
      />
      <div className="relative mx-auto max-w-4xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          All <span className="grad-text">guides</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
          Each one is a sequence you can follow start to finish, with the thing that
          actually goes wrong called out at every step.
        </p>
      </div>

      <ul className="relative mx-auto max-w-4xl space-y-4 px-4 pb-10 sm:px-6">
        {guides.map((g) => {
          const a = accentMap[g.accent];
          return (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="glass glass-hover group block p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${a.bg} ${a.text}`}>
                    <Glyph name={g.glyph} className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl font-bold tracking-[-0.01em]">
                      {g.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-soft">{g.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <VerifiedBadge status={g.status} date={g.lastVerified} />
                      <span className="text-xs text-faint">
                        {g.readMinutes} min · {g.steps.length} steps
                      </span>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" className="mt-3 hidden size-5 shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-1 sm:block" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
