import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BENEFITS } from "@/data/benefits";
import { CATEGORY_META, type Category } from "@/lib/types";
import { BenefitGrid } from "@/components/BenefitGrid";
import { AdSlot } from "@/components/Chrome";

const BY_SLUG = Object.entries(CATEGORY_META).reduce<Record<string, Category>>((acc, [k, v]) => {
  acc[v.slug] = k as Category;
  return acc;
}, {});

export function generateStaticParams() {
  return Object.values(CATEGORY_META).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const key = BY_SLUG[slug];
  if (!key) return {};
  const m = CATEGORY_META[key];
  const n = BENEFITS.filter((b) => b.category === key).length;
  const title = `${m.label} 지원금 ${n}개 — 금액·자격·신청방법`;
  return {
    title,
    description: `${m.desc} 금액과 신청기간, 자격 요건을 출처와 함께 정리했습니다.`,
    alternates: { canonical: `/category/${slug}` },
    openGraph: { title, description: m.desc },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = BY_SLUG[slug];
  if (!key) notFound();
  const m = CATEGORY_META[key];
  const items = BENEFITS.filter((b) => b.category === key);

  return (
    <div className="wrap section">
      <p className="stat-label"><Link href="/benefits">전체 지원금</Link> · 분야별</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>
        {m.label} 지원금
      </h1>
      <p className="t-lead" style={{ maxWidth: "52ch", marginBottom: "calc(var(--u)*2)" }}>{m.desc}</p>
      <div className="stat" style={{ marginBottom: "calc(var(--u)*4)" }}>
        <span className="stat-value is-lg">{items.length}개</span>
        <span className="stat-basis">중앙부처 제도 기준 · 지자체 제도 순차 추가</span>
      </div>

      <BenefitGrid items={items} />

      <div style={{ margin: "calc(var(--u)*5) 0" }}><AdSlot /></div>

      <section>
        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>다른 분야도 보기</h2>
        <div className="chips">
          {Object.values(CATEGORY_META).filter((c) => c.slug !== slug).map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="chip">{c.label}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
