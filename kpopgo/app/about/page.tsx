import type { Metadata } from "next";
import Link from "next/link";
import { guides, RESEARCH_DATE } from "@/content/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who writes KPOPGO, how each guide is checked, and what this site will not do.",
  alternates: { canonical: "/about" },
};

/**
 * AdSense reviewers look for a real publisher behind a site, and readers
 * deciding whether to trust a procedure want the same thing. One page answers
 * both — including the part that is least flattering, which is that nothing
 * here has been walked end to end yet.
 */
export default function About() {
  const drafts = guides.filter((g) => g.status === "draft").length;

  return (
    <div className="wrap py-12 sm:py-16">
      <h1 className="pl max-w-[20ch]">About this site</h1>
      <p className="han-m dim mt-3.5">이 사이트에 대하여</p>

      <div className="mt-10 grid max-w-[68ch] gap-8">
        <section>
          <p className="t-lg">
            KPOPGO exists because the English guides that rank for &quot;how to buy K-pop
            concert tickets&quot; describe a ticketing site that has since been renamed,
            under rules that have since changed.
          </p>
        </section>

        <section>
          <h2 className="pm">What we do</h2>
          <p className="t mt-3">
            We write the procedure an international fan actually has to follow: which
            platform a show is sold on, which identity check that platform runs, how a
            fan club presale is qualified for, and why an overseas card gets declined at
            the payment step. Each guide is a sequence you can work through, with the
            point where it usually goes wrong called out at every step.
          </p>
        </section>

        <section>
          <h2 className="pm">How a guide is checked</h2>
          <ul className="t mt-3 grid gap-2.5">
            <li>
              Every claim links its source — an official announcement, a platform help
              page, or press reporting.
            </li>
            <li>
              Every page carries the date it was last checked against the live platform.
            </li>
            <li>
              A guide is marked <strong>Draft</strong> until a person has created an
              account and walked the flow personally.
            </li>
          </ul>
          <p className="t mt-3">
            {drafts === guides.length
              ? `All ${guides.length} guides are currently drafts. The research is compiled from official sources, all linked, but nobody has yet gone through these flows end to end — and we would rather say so than claim a verification we have not done. That is the whole reason this site has any right to exist alongside the ones that are out of date.`
              : `${guides.length - drafts} of ${guides.length} guides have been walked end to end. The rest are marked as drafts until they are.`}
          </p>
          <p className="data dim mt-4">Research compiled {RESEARCH_DATE}</p>
        </section>

        <section>
          <h2 className="pm">What we will not do</h2>
          <ul className="t mt-3 grid gap-2.5">
            <li>
              <strong>Help you around an identity check.</strong> Where a platform
              requires Korean 본인인증 we say so, and describe the official routes open to
              overseas fans instead.
            </li>
            <li>
              <strong>Use idol photographs.</strong> Not one. Every object and figure on
              this site was drawn or photographed for it, and every silhouette is
              anonymous.
            </li>
            <li>
              <strong>Take payment for a recommendation.</strong> Advertising is labelled
              and no advertiser has any say over what a guide says.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="pm">Independence</h2>
          <p className="t mt-3">
            KPOPGO is an independent fan resource. It is not affiliated with, endorsed by
            or operated by any agency, artist or ticketing platform. Platform rules change
            — the official announcement for your show always overrides anything written
            here.
          </p>
        </section>

        <section>
          <h2 className="pm">Contact</h2>
          <p className="t mt-3">
            Corrections are the most useful thing you can send. If a step has changed, or
            a guide cost you a sale, we want to know:{" "}
            <span className="ju">hello@{site.host}</span>
          </p>
          <p className="t mt-3">
            See also the <Link href="/privacy" className="ju underline underline-offset-4">privacy policy</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
