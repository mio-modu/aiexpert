import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BENEFITS } from "@/data/benefits";
import { TARGET_META, type Target } from "@/lib/types";
import { BenefitGrid } from "@/components/BenefitGrid";
import { AdSlot } from "@/components/Chrome";

const BY_SLUG = Object.entries(TARGET_META).reduce<Record<string, Target>>((acc, [k, v]) => {
  acc[v.slug] = k as Target;
  return acc;
}, {});

export function generateStaticParams() {
  return Object.values(TARGET_META).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const key = BY_SLUG[slug];
  if (!key) return {};
  const m = TARGET_META[key];
  const items = BENEFITS.filter((b) => b.targets.includes(key));
  const title = `${m.label} 지원금 ${items.length}개 — 금액·자격·신청방법`;
  return {
    title,
    description: `${m.label}이 받을 수 있는 정부지원금 ${items.length}개를 금액과 신청기간, 자격 요건과 함께 정리했습니다. ${items.slice(0, 4).map((b) => b.name).join(", ")} 등.`,
    alternates: { canonical: `/target/${slug}` },
    openGraph: { title },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = BY_SLUG[slug];
  if (!key) notFound();
  const m = TARGET_META[key];
  const items = BENEFITS.filter((b) => b.targets.includes(key));
  const totalMax = items.reduce((s, b) => s + (b.amountMax ?? 0), 0);

  return (
    <div className="wrap section">
      <p className="stat-label"><Link href="/benefits">전체 지원금</Link> · 대상별</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*3)" }}>
        {m.label} 지원금
      </h1>

      <div className="stat-row" style={{ marginBottom: "calc(var(--u)*4)" }}>
        <div className="stat">
          <span className="stat-label">해당 제도</span>
          <span className="stat-value is-lg">{items.length}개</span>
          <span className="stat-basis">중앙부처 기준</span>
        </div>
        {totalMax > 0 && (
          <div className="stat">
            <span className="stat-label">금액 상한 합계</span>
            <span className="stat-value is-lg" style={{ color: "var(--c-accent)" }}>
              {(totalMax / 10000).toLocaleString("ko-KR")}만원
            </span>
            <span className="stat-basis">
              각 제도 최대액의 단순 합. 모두 동시에 받는다는 뜻은 아닙니다
            </span>
          </div>
        )}
        <div className="stat">
          <span className="stat-label">내게 맞는지 확인</span>
          <span className="stat-value is-lg">60초</span>
          <span className="stat-basis">5문항 진단</span>
        </div>
      </div>

      <div style={{ marginBottom: "calc(var(--u)*4)" }}>
        <Link href="/diagnose" className="btn btn-primary">내가 받을 수 있는지 진단하기</Link>
      </div>

      <BenefitGrid items={items} />

      <div style={{ margin: "calc(var(--u)*5) 0" }}><AdSlot /></div>

      <section>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>다른 대상도 보기</h2>
        <div className="chips">
          {Object.values(TARGET_META).filter((t) => t.slug !== slug).map((t) => (
            <Link key={t.slug} href={`/target/${t.slug}`} className="chip">{t.label}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
