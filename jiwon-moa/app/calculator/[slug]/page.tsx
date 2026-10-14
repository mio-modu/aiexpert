import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EitcCalculator, CtcCalculator } from "@/components/Calculators";
import { AdSlot, SourceStrip } from "@/components/Chrome";
import { getBenefit } from "@/data/benefits";
import { EITC_CURRENT, CTC_CURRENT, MAN } from "@/lib/incentive";

const CALCS = {
  "geunro-jangryeogeum": {
    benefitSlug: "geunro-jangryeogeum",
    title: "근로장려금 계산기",
    h1: "근로장려금, 얼마 받을까요?",
    desc: `가구 유형과 연간 총급여액, 재산만 넣으면 ${EITC_CURRENT.baseYear}년 귀속 근로장려금 예상 수령액을 바로 계산합니다. 단독 ${EITC_CURRENT.brackets.single.max / MAN}만원, 홑벌이 ${EITC_CURRENT.brackets.single_earner.max / MAN}만원, 맞벌이 ${EITC_CURRENT.brackets.dual_earner.max / MAN}만원이 현행 최대입니다.`,
  },
  "janyeo-jangryeogeum": {
    benefitSlug: "janyeo-jangryeogeum",
    title: "자녀장려금 계산기",
    h1: "자녀장려금, 얼마 받을까요?",
    desc: `자녀 수와 부부 합산 총소득, 재산을 넣으면 ${CTC_CURRENT.baseYear}년 귀속 자녀장려금 예상 수령액을 계산합니다. 자녀 1명당 최대 ${CTC_CURRENT.perChildMax / MAN}만원입니다.`,
  },
} as const;

type Slug = keyof typeof CALCS;

export function generateStaticParams() {
  return Object.keys(CALCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CALCS[slug as Slug];
  if (!c) return {};
  return {
    title: c.title,
    description: c.desc,
    alternates: { canonical: `/calculator/${slug}` },
    openGraph: { title: c.title, description: c.desc },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CALCS[slug as Slug];
  if (!c) notFound();

  const benefit = getBenefit(c.benefitSlug)!;
  const isEitc = slug === "geunro-jangryeogeum";

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: benefit.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="wrap-narrow section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <p className="stat-label">{benefit.agency} · 계산기</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>{c.h1}</h1>
      <p className="t-lead" style={{ marginBottom: "calc(var(--u)*3)" }}>{c.desc}</p>

      <div style={{ marginBottom: "calc(var(--u)*4)" }}>
        <SourceStrip
          sourceName={benefit.sourceName}
          sourceUrl={benefit.sourceUrl}
          baseYear={benefit.baseYear}
          verifiedAt={benefit.verifiedAt}
        />
      </div>

      {isEitc ? <EitcCalculator /> : <CtcCalculator />}

      <div style={{ margin: "calc(var(--u)*5) 0" }}>
        <AdSlot />
      </div>

      <section style={{ marginBottom: "calc(var(--u)*5)" }}>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>신청 방법</h2>
        <ol className="flow">
          {benefit.howTo.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </section>

      <section style={{ marginBottom: "calc(var(--u)*5)" }}>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>자주 묻는 질문</h2>
        {benefit.faq.map((f, i) => (
          <details className="faq" key={i}>
            <summary>{f.q}</summary>
            <div className="faq-body">{f.a}</div>
          </details>
        ))}
      </section>

      <section>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>함께 보면 좋은 지원금</h2>
        <div className="chips">
          <Link href={`/benefit/${benefit.slug}`} className="chip">{benefit.name} 자세히 보기</Link>
          {benefit.related.map((r) => {
            const rb = getBenefit(r);
            return rb ? <Link key={r} href={`/benefit/${r}`} className="chip">{rb.name}</Link> : null;
          })}
          <Link href="/diagnose" className="chip">전체 지원금 진단</Link>
        </div>
      </section>
    </div>
  );
}
