import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BENEFITS, getBenefit } from "@/data/benefits";
import { CATEGORY_META, TARGET_META } from "@/lib/types";
import { AdSlot, SourceStrip } from "@/components/Chrome";

export function generateStaticParams() {
  return BENEFITS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBenefit(slug);
  if (!b) return {};
  const title = `${b.name} — 금액·자격조건·신청방법 (${b.baseYear}년 기준)`;
  return {
    title,
    description: `${b.summary} 지원 금액 ${b.amount}. ${b.period}. 자격 요건과 신청 절차를 출처와 함께 정리했습니다.`,
    alternates: { canonical: `/benefit/${slug}` },
    openGraph: { title, description: b.summary },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBenefit(slug);
  if (!b) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: b.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="wrap-narrow section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <p className="stat-label">
        <Link href={`/category/${CATEGORY_META[b.category].slug}`}>{CATEGORY_META[b.category].label}</Link>
        {" · "}{b.agency}
      </p>

      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>{b.name}</h1>
      <p className="t-lead" style={{ marginBottom: "calc(var(--u)*4)" }}>{b.summary}</p>

      {/* 핵심 숫자 — T20 */}
      <div className="stat-row" style={{ marginBottom: "calc(var(--u)*3)" }}>
        <div className="stat">
          <span className="stat-label">지원 금액</span>
          <span className="stat-value is-md" style={{ color: "var(--c-accent)" }}>{b.amount}</span>
          <span className="stat-basis">{b.baseYear}년 기준</span>
        </div>
        <div className="stat">
          <span className="stat-label">신청 기간</span>
          <span className="stat-value is-md" style={{ fontSize: "1rem", lineHeight: 1.4 }}>{b.period}</span>
          <span className="stat-basis">연도별로 달라질 수 있음</span>
        </div>
        <div className="stat">
          <span className="stat-label">소관 기관</span>
          <span className="stat-value is-md" style={{ fontSize: "1rem", lineHeight: 1.4 }}>{b.agency}</span>
          <span className="stat-basis">확인 {b.verifiedAt}</span>
        </div>
      </div>

      <div style={{ marginBottom: "calc(var(--u)*3)" }}>
        <SourceStrip sourceName={b.sourceName} sourceUrl={b.sourceUrl} baseYear={b.baseYear} verifiedAt={b.verifiedAt} />
      </div>

      <div className="row" style={{ marginBottom: "calc(var(--u)*5)" }}>
        <a href={b.applyUrl} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-primary btn-lg">
          공식 사이트에서 신청 ↗
        </a>
        {b.calculator && (
          <Link href={`/calculator/${b.slug}`} className="btn btn-ghost btn-lg">
            얼마 받는지 계산하기
          </Link>
        )}
      </div>

      <section style={{ marginBottom: "calc(var(--u)*5)" }}>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>자격 조건</h2>
        <ul className="rule-list">
          {b.conditions.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </section>

      <div style={{ marginBottom: "calc(var(--u)*5)" }}><AdSlot /></div>

      <section style={{ marginBottom: "calc(var(--u)*5)" }}>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>신청 방법</h2>
        <ol className="flow">
          {b.howTo.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </section>

      <section style={{ marginBottom: "calc(var(--u)*5)" }}>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>자주 묻는 질문</h2>
        {b.faq.map((f, i) => (
          <details className="faq" key={i}>
            <summary>{f.q}</summary>
            <div className="faq-body">{f.a}</div>
          </details>
        ))}
      </section>

      <section style={{ marginBottom: "calc(var(--u)*5)" }}>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>관련 지원금</h2>
        <div className="grid grid-2">
          {b.related.map((r) => {
            const rb = getBenefit(r);
            if (!rb) return null;
            return (
              <Link key={r} href={`/benefit/${r}`} className="card card-link">
                <h3 className="card-title" style={{ marginBottom: "calc(var(--u)*0.5)" }}>{rb.name}</h3>
                <p className="stat-value is-md" style={{ color: "var(--c-accent)", fontSize: "1rem", marginBottom: "calc(var(--u))" }}>
                  {rb.amount}
                </p>
                <p className="card-sub">{rb.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: "calc(var(--u)*4)" }}>
        <div className="chips">
          {b.targets.map((t) => (
            <Link key={t} href={`/target/${TARGET_META[t].slug}`} className="chip">
              {TARGET_META[t].label} 지원금
            </Link>
          ))}
        </div>
      </section>

      <div className="notice notice-warn">
        <span className="ni" aria-hidden>!</span>
        <span>
          이 페이지는 {b.sourceName}이 공개한 내용을 정리한 안내입니다. 제도는 예산·법령 개정에
          따라 수시로 바뀌므로, 신청 전 반드시{" "}
          <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer nofollow">공식 안내 ↗</a>에서
          최신 요건과 금액을 확인하세요.
        </span>
      </div>
    </div>
  );
}
