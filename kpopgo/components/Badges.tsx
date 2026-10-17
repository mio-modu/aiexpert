import type { Guide } from "@/content/guides";
import { displayStatus, daysSince, type DisplayStatus } from "@/lib/freshness";

/**
 * The 인장 seal. A Korean seal is a mark of authentication, which is exactly
 * what this badge asserts — so the badge is a seal rather than a tick.
 * 검 is the first character of 검증 (verification).
 *
 * It takes the guide rather than a status, because what it is entitled to say
 * depends on how old the verification is, not only on what the content claims.
 */
export function VerifiedBadge({ guide }: { guide: Guide }) {
  const state = displayStatus(guide);
  const label =
    state === "verified" ? "Verified" : state === "stale" ? "Expired" : "Draft";
  return (
    <span className={`seal${state === "stale" ? " seal-stale" : ""}`}>
      <span className="seal-han">검</span>
      {label} · {guide.lastVerified}
    </span>
  );
}

/**
 * Shown until a person has walked the flow, and again once that walk is old
 * enough to stop vouching for itself.
 *
 * The two notices are deliberately different. Draft means nobody ever went
 * through it. Expired means somebody did, on a date you can see, and enough
 * time has passed that the platform may have moved since — which is a weaker
 * claim than the first one, not the same claim.
 */
export function StatusNotice({ guide }: { guide: Guide }) {
  const state: DisplayStatus = displayStatus(guide);
  if (state === "verified") return null;

  if (state === "stale") {
    return (
      <div className="obj-ju p-5 sm:p-6">
        <p className="data ju">
          Verification has expired{" "}
          <span className="han text-[0.6875rem]">검증 만료</span>
        </p>
        <p className="t-sm mt-3">
          Someone did walk this flow, on {guide.lastVerified} —{" "}
          {daysSince(guide.lastVerified)} days ago. That is long enough for a platform
          to have changed a step, and these platforms have been renamed twice in two
          years, so the seal comes down by itself rather than waiting for anyone to
          remember. The steps below are what was true then.
        </p>
        <p className="t-sm mt-3">
          Check the official announcement for your specific show before acting on any
          step.
        </p>
      </div>
    );
  }

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
