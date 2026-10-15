import type { Metadata } from "next";
import Link from "next/link";
import { BENEFITS } from "@/data/benefits";
import { CATEGORY_META, TARGET_META, type Category } from "@/lib/types";
import { BenefitGrid } from "@/components/BenefitGrid";
import { AdSlot } from "@/components/Chrome";

export const metadata: Metadata = {
  title: "전체 지원금 목록 — 정부지원금 한눈에 보기",
  description:
    "근로장려금·자녀장려금·청년월세·부모급여·기초연금 등 받을 수 있는 정부지원금을 금액과 신청기간, 출처와 함께 한곳에 정리했습니다.",
  alternates: { canonical: "/benefits" },
};

const ORDER: Category[] = ["hidden", "tax", "cash", "child", "housing", "job", "senior", "edu", "business", "living"];

export default function Page() {
  return (
    <div className="wrap section">
      <p className="stat-label">전체 목록</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>
        정부지원금 {BENEFITS.length}개
      </h1>
      <p className="t-lead" style={{ maxWidth: "52ch", marginBottom: "calc(var(--u)*3)" }}>
        각 제도마다 금액·자격조건·신청방법을 기준 연도와 출처, 확인일과 함께 정리했습니다.
      </p>

      <div className="chips" style={{ marginBottom: "calc(var(--u)*4)" }}>
        <Link href="/diagnose" className="chip chip-on">내게 맞는 것만 찾기 →</Link>
        {Object.values(TARGET_META).map((t) => (
          <Link key={t.slug} href={`/target/${t.slug}`} className="chip">{t.label}</Link>
        ))}
      </div>

      {ORDER.map((cat, idx) => {
        const items = BENEFITS.filter((b) => b.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} style={{ marginBottom: "calc(var(--u)*6)" }}>
            <div className="row-between" style={{ marginBottom: "calc(var(--u)*2)" }}>
              <h2 style={{ fontSize: "var(--fs-h2)" }}>{CATEGORY_META[cat].label}</h2>
              <Link href={`/category/${CATEGORY_META[cat].slug}`} className="t-sm">
                이 분야만 보기 →
              </Link>
            </div>
            <BenefitGrid items={items} />
            {idx === 1 && <div style={{ marginTop: "calc(var(--u)*4)" }}><AdSlot /></div>}
          </section>
        );
      })}
    </div>
  );
}
