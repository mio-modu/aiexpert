import type { GuideStatus } from "@/content/guides";

export function VerifiedBadge({
  status,
  date,
}: {
  status: GuideStatus;
  date: string;
}) {
  const verified = status === "verified";
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-1.5 font-mono text-[0.64rem] font-medium tracking-wide uppercase">
      <span
        className={`size-2 rounded-full ${
          verified ? "animate-pulse-dot bg-lime-400" : "bg-tangerine-400"
        }`}
        aria-hidden="true"
      />
      {verified ? "Verified" : "Research draft"}
      <span className="text-faint">· {date}</span>
    </span>
  );
}

/** The honesty banner. Shown until a human has walked the flow end to end. */
export function DraftNotice() {
  return (
    <div className="ring-grad glass overflow-hidden p-5 sm:p-6">
      <div className="flex gap-4">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-tangerine-400/15 text-tangerine-400">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M12 8.5v5M12 16.5h.01" />
            <path d="M10.3 3.9 2.6 17.2A1.9 1.9 0 0 0 4.3 20h15.4a1.9 1.9 0 0 0 1.7-2.8L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z" />
          </svg>
        </span>
        <div>
          <h2 className="font-display text-base font-bold">Research draft — not yet walked end to end</h2>
          <p className="mt-2 text-sm leading-relaxed text-soft">
            This page is compiled from official announcements, platform help pages and
            press reporting, all linked at the bottom. Nobody has yet created an account
            and gone through this flow personally. Until that happens it stays marked as a
            draft, because the whole point of this site is being more accurate than the
            guides that currently rank — and claiming a verification we have not done
            would make us one of them.
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-soft">
            Check the official announcement for your specific show before acting on any step.
          </p>
        </div>
      </div>
    </div>
  );
}
