import type { Metadata } from "next";
import Link from "next/link";
import { wordGroups, wordCount } from "@/content/words";
import { RESEARCH_DATE } from "@/content/guides";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Korean words on a ticketing screen",
  description:
    `The ${wordCount} Korean words that carry a K-pop booking, grouped by where you meet them: ` +
    "signing up, finding the sale, choosing seats, paying, and collecting.",
  alternates: { canonical: "/words" },
};

/**
 * The most useful Korean a fan outside Korea can have, and the page most
 * likely to be linked by other people — a reference someone bookmarks is worth
 * more than a guide they read once.
 */
export default function Words() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Korean words on a K-pop ticketing screen",
    url: `${site.url}/words`,
    hasDefinedTerm: wordGroups.flatMap((g) =>
      g.words.map((w) => ({
        "@type": "DefinedTerm",
        name: w.ko,
        description: w.en,
        inDefinedTermSet: `${site.url}/words`,
      })),
    ),
  };

  return (
    <div className="wrap py-12 sm:py-16">
      <JsonLd data={jsonLd} />

      <h1 className="pl max-w-[20ch]">Korean words on a ticketing screen</h1>
      <p className="han-m dim mt-3.5">예매 화면에서 보게 될 단어</p>

      <p className="t-lg mt-6">
        An untranslated booking page is not hard because Korean is hard. About{" "}
        {wordCount} words carry the whole flow, and missing one at the wrong moment costs
        the ticket.
      </p>
      <p className="t mt-4">
        Grouped by where you meet them rather than alphabetically, because the question is
        never what a word means in the abstract — it is what this screen is asking you.
        Romanisation is Revised Romanization, the Korean government standard.
      </p>

      <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
        {wordGroups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="chip data-sm hover:text-[var(--ink)]">
            {g.ko}
          </a>
        ))}
      </nav>

      {/* The whole set at once. The argument this page makes is that the
          Korean on a booking screen is finite, and that is something you see
          rather than read. */}
      <ul className="wall mt-10" aria-label={`All ${wordCount} words`}>
        {wordGroups.flatMap((g) => g.words).map((w, i) => (
          <li
            key={w.ko}
            className={`sticker ${["", "sticker-cy", "sticker-vi"][i % 3]}`}
            title={w.en}
          >
            <span className="ko">{w.ko}</span>
            <span className="en">{w.roman}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-10">
        {wordGroups.map((g, gi) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="pm">{g.title}</h2>
              <span className="han ju text-[1.05rem]">{g.ko}</span>
            </div>
            <p className="t-sm dim mt-2 max-w-[62ch]">{g.intro}</p>

            <div className="obj mt-5 px-5 pt-2 pb-1">
              <div className="scroller">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th className="w-[22%]">한글</th>
                      <th className="w-[22%]">Romanisation</th>
                      <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.words.map((w, i) => (
                      <tr
                        key={w.ko}
                        style={i === g.words.length - 1 ? { borderBottom: 0 } : undefined}
                      >
                        <td>
                          <span className="han ju text-[1.0625rem]">{w.ko}</span>
                        </td>
                        <td>
                          <span className="data-sm">{w.roman}</span>
                        </td>
                        <td style={{ color: "var(--ink)" }}>
                          {w.en}
                          {w.note ? (
                            <span className="t-sm dim block pt-1.5">{w.note}</span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {gi === 1 ? <AdSlot placement="article" /> : null}
          </section>
        ))}
      </div>

      <div className="obj-ju mt-12 p-6">
        <p className="data ju">One word to get right</p>
        <p className="t-sm mt-3">
          <span className="han ju text-[1.0625rem]">본인인증</span> — identity
          verification. On the Korean-language sites it generally depends on a Korean
          mobile number, which in practice needs Korean residency documentation. The
          overseas-facing sites exist for exactly this case and verify by passport
          instead. Which one applies to you follows from which platform your show is sold
          on, and that is named in the official announcement.
        </p>
        <p className="t-sm mt-3">
          <Link
            href="/guides/buy-k-pop-concert-tickets-from-overseas"
            className="ju underline underline-offset-4"
          >
            Start with the basics →
          </Link>
        </p>
      </div>

      <p className="data dim mt-10">Last checked {RESEARCH_DATE}</p>
    </div>
  );
}
