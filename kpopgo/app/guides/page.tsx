import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/guides";
import { ObjectMark } from "@/components/Objects";
import { VerifiedBadge } from "@/components/Badges";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All guides",
  description:
    "Every KPOPGO guide: ticketing platforms, identity verification, fan club presales, foreign card payments and overseas album orders.",
};

export default function GuidesIndex() {
  return (
    <div className="wrap py-12 sm:py-16">
      <h1 className="pl">
        All <span className="mark">guides</span>
      </h1>
      <p className="han-m dim mt-4">전체 가이드</p>
      <p className="t-lg mt-6">
        Each one is a sequence you can follow start to finish, with the thing that actually
        goes wrong called out at every step.
      </p>

      <ul className="mt-10 grid gap-3.5">
        {guides.map((g, i) => (
          <li key={g.slug} className="obj obj-lift p-6">
            <Link href={`/guides/${g.slug}`} className="card-row">
              <ObjectMark name={g.glyph} />
              <div className="w-full min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="data ju shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="pm min-w-0">{g.title}</h2>
                </div>
                <p className="han-lb mt-1.5">{g.koLine}</p>
                <p className="t-sm mt-2 max-w-[62ch]">{g.summary}</p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="chip data-sm">
                    {String(g.steps.length).padStart(2, "0")} steps
                  </span>
                  <span className="chip data-sm">
                    {String(g.readMinutes).padStart(2, "0")} min
                  </span>
                  <VerifiedBadge status={g.status} date={g.lastVerified} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <AdSlot placement="list" />
    </div>
  );
}
