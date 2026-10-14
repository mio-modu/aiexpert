import Link from "next/link";
import type { Benefit } from "@/lib/types";
import { CATEGORY_META } from "@/lib/types";

export function BenefitGrid({ items }: { items: Benefit[] }) {
  if (items.length === 0) {
    return (
      <div className="notice notice-info">
        <span className="ni" aria-hidden>ℹ</span>
        <span>해당하는 지원금이 아직 등록되지 않았습니다. 순차적으로 추가하고 있습니다.</span>
      </div>
    );
  }
  return (
    <div className="grid grid-2">
      {items.map((b) => (
        <Link key={b.slug} href={`/benefit/${b.slug}`} className="card card-link">
          <div className="row" style={{ marginBottom: "calc(var(--u)*1.5)" }}>
            <span className="badge badge-primary">{CATEGORY_META[b.category].label}</span>
            <span className="badge badge-plain">{b.agency}</span>
          </div>
          <h3 className="card-title" style={{ marginBottom: "calc(var(--u))" }}>{b.name}</h3>
          <p className="stat-value is-md" style={{ color: "var(--c-accent)", fontSize: "1.05rem", marginBottom: "calc(var(--u))" }}>
            {b.amount}
          </p>
          <p className="card-sub" style={{ marginBottom: "calc(var(--u)*1.5)" }}>{b.summary}</p>
          <p className="stat-basis">신청 {b.period} · {b.baseYear}년 기준 · 확인 {b.verifiedAt}</p>
        </Link>
      ))}
    </div>
  );
}
