import type { GuideStatus } from "@/content/guides";

/**
 * The 인장 seal. A Korean seal is a mark of authentication, which is exactly
 * what this badge asserts — so the badge is a seal rather than a tick.
 * 검 is the first character of 검증 (verification).
 */
export function VerifiedBadge({
  status,
  date,
}: {
  status: GuideStatus;
  date: string;
}) {
  return (
    <span className="seal">
      <span className="seal-han">검</span>
      {status === "verified" ? "Verified" : "Draft"} · {date}
    </span>
  );
}

/** Shown until a human has walked the flow end to end. */
export function DraftNotice() {
  return (
    <div className="obj-ju p-5 sm:p-6">
      <p className="data ju">
        Not yet walked end to end{" "}
        <span className="han text-[0.6875rem]">직접 검증 전</span>
      </p>
      <p className="t-sm mt-3">
        Compiled from official announcements, platform help pages and press reporting, all
        linked below. Nobody has yet created an account and gone through this flow
        personally. Until that happens it stays a draft — the point of this site is being
        more accurate than the guides that currently rank, and claiming a verification we
        have not done would make us one of them.
      </p>
      <p className="t-sm mt-3">
        Check the official announcement for your specific show before acting on any step.
      </p>
    </div>
  );
}
