import Link from "next/link";
import type { Metadata } from "next";
import { BENEFITS } from "@/data/benefits";
import { CATEGORY_META, TARGET_META } from "@/lib/types";
import { EITC_CURRENT, CTC_CURRENT, formatKRW, MAN } from "@/lib/incentive";
import { AdSlot } from "@/components/Chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} — 내가 받을 수 있는 지원금, 60초 만에`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

const HERO_MAX = EITC_CURRENT.brackets.dual_earner.max;

export default function Home() {
  const featured = ["geunro-jangryeogeum", "janyeo-jangryeogeum", "cheongnyeon-wolse", "bumo-geumyeo"]
    .map((s) => BENEFITS.find((b) => b.slug === s)!)
    .filter(Boolean);

  const hidden = ["sumeun-boheomgeum", "hyumyeon-yegeum", "card-point", "gukse-hwangeupgeum", "gangbo-sanghanje", "toejik-yeongeum-micheonggu"]
    .map((s) => BENEFITS.find((b) => b.slug === s)!)
    .filter(Boolean);

  const categories = Object.values(CATEGORY_META);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "근로장려금은 얼마까지 받을 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `가구 유형에 따라 단독가구 ${EITC_CURRENT.brackets.single.max / MAN}만원, 홑벌이가구 ${EITC_CURRENT.brackets.single_earner.max / MAN}만원, 맞벌이가구 ${EITC_CURRENT.brackets.dual_earner.max / MAN}만원이 현행 최대 지급액입니다. 실제 금액은 소득 구간과 재산에 따라 달라집니다.`,
        },
      },
      {
        "@type": "Question",
        name: "근로장려금과 자녀장려금을 같이 받을 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네. 두 제도는 요건이 달라 중복 수급이 가능합니다. 홈택스에서 한 번 신청하면 두 장려금이 함께 심사됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "지원금모아는 정부 사이트인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "아닙니다. 공공기관이 공개한 정보를 알기 쉽게 정리해 안내하는 민간 서비스이며, 신청 접수나 지급을 대행하지 않습니다.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ───────── HERO : 숫자가 주인공 ───────── */}
      <section className="section">
        <div className="wrap">
          <p className="stat-label" style={{ marginBottom: "calc(var(--u)*2)" }}>
            정부지원금 통합 안내
          </p>

          <h1
            style={{
              fontSize: "var(--fs-h1)",
              maxWidth: "20ch",
              marginBottom: "calc(var(--u)*3)",
            }}
          >
            안 받으면 그냥 사라지는 돈,
            <br />
            지금 확인하세요
          </h1>

          <div className="stat" style={{ marginBottom: "calc(var(--u)*2)" }}>
            <span className="stat-label">근로장려금 연간 최대</span>
            <span className="stat-value is-hero">{(HERO_MAX / MAN).toLocaleString("ko-KR")}만원</span>
            <span className="stat-basis">
              맞벌이가구 기준 · {EITC_CURRENT.baseYear}년 귀속 소득 기준 ·{" "}
              <a href={EITC_CURRENT.sourceUrl} target="_blank" rel="noopener noreferrer nofollow">
                {EITC_CURRENT.sourceName} ↗
              </a>{" "}
              · 확인 {EITC_CURRENT.verifiedAt}
            </span>
          </div>

          <p className="t-lead" style={{ maxWidth: "48ch", marginBottom: "calc(var(--u)*3)" }}>
            정부지원금 {BENEFITS.length}개와 이미 내 이름으로 쌓여 있는 숨은 돈을
            한곳에서 찾습니다. 가입도, 로그인도 필요 없습니다.
          </p>

          <div className="row">
            <Link href="/diagnose" className="btn btn-primary btn-lg">
              60초 지원금 진단 시작
            </Link>
            <Link href="/calculator/geunro-jangryeogeum" className="btn btn-ghost btn-lg">
              근로장려금 얼마인지 계산
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 핵심 숫자 ───────── */}
      <section className="section-sm">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat">
              <span className="stat-label">정리된 제도</span>
              <span className="stat-value is-lg">{BENEFITS.length}개</span>
              <span className="stat-basis">지원금 {BENEFITS.filter((b) => b.category !== "hidden").length}개 + 숨은 돈 {BENEFITS.filter((b) => b.category === "hidden").length}개</span>
            </div>
            <div className="stat">
              <span className="stat-label">자녀장려금 1인당 최대</span>
              <span className="stat-value is-lg">{CTC_CURRENT.perChildMax / MAN}만원</span>
              <span className="stat-basis">총소득 {CTC_CURRENT.plateauEnd / MAN}만원 미만 가구</span>
            </div>
            <div className="stat">
              <span className="stat-label">진단 소요 시간</span>
              <span className="stat-value is-lg">60초</span>
              <span className="stat-basis">5문항 · 입력값은 서버로 전송되지 않음</span>
            </div>
            <div className="stat">
              <span className="stat-label">이용 비용</span>
              <span className="stat-value is-lg">0원</span>
              <span className="stat-basis">가입·로그인 없음</span>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap section-sm">
        <AdSlot />
      </div>

      {/* ───────── 숨은 돈 찾기 ───────── */}
      <section className="section-sm">
        <div className="wrap">
          <div className="row-between" style={{ marginBottom: "calc(var(--u))" }}>
            <h2 style={{ fontSize: "var(--fs-h2)" }}>이미 내 돈인데 안 찾아간 것</h2>
            <Link href="/category/hidden" className="t-sm">전부 보기 →</Link>
          </div>
          <p className="t-lead" style={{ maxWidth: "52ch", marginBottom: "calc(var(--u)*2)" }}>
            지원금은 자격을 심사받아야 하지만, 이건 다릅니다. 이미 내 이름으로 쌓여 있는데
            찾아가지 않아 묶여 있는 돈입니다. 조회는 전부 공식 기관에서 무료입니다.
          </p>

          <div className="grid grid-3">
            {hidden.map((b) => (
              <Link key={b.slug} href={`/benefit/${b.slug}`} className="card card-link">
                <span className="badge badge-accent">{b.agency}</span>
                <h3 className="card-title" style={{ margin: "calc(var(--u)*1.5) 0 calc(var(--u))" }}>
                  {b.name}
                </h3>
                <p className="card-sub">{b.summary}</p>
              </Link>
            ))}
          </div>

          <div className="notice notice-warn" style={{ marginTop: "calc(var(--u)*2)" }}>
            <span className="ni" aria-hidden>!</span>
            <span>
              <strong>수수료를 받고 대신 찾아준다는 업체는 이용할 이유가 없습니다.</strong>{" "}
              위 서비스는 모두 협회·공단·금융감독원이 직접 운영하는 무료 조회이며,
              본인인증만 하면 누구나 몇 분 안에 직접 확인하고 청구할 수 있습니다.
            </span>
          </div>
        </div>
      </section>

      {/* ───────── 많이 찾는 지원금 ───────── */}
      <section className="section-sm">
        <div className="wrap">
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>
            많이 찾는 지원금
          </h2>
          <div className="grid grid-2">
            {featured.map((b) => (
              <Link key={b.slug} href={`/benefit/${b.slug}`} className="card card-link">
                <div className="row" style={{ marginBottom: "calc(var(--u)*1.5)" }}>
                  <span className="badge badge-primary">{CATEGORY_META[b.category].label}</span>
                  <span className="badge badge-plain">{b.agency}</span>
                </div>
                <h3 className="card-title" style={{ marginBottom: "calc(var(--u))" }}>{b.name}</h3>
                <p className="card-amount">
                  {b.amount}
                </p>
                <p className="card-sub" style={{ marginBottom: "calc(var(--u)*1.5)" }}>{b.summary}</p>
                <p className="stat-basis">
                  {b.baseYear}년 기준 · 출처 {b.sourceName} · 확인 {b.verifiedAt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 분야별 ───────── */}
      <section className="section-sm">
        <div className="wrap">
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>분야별로 찾기</h2>
          <div className="chips">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="chip">
                {c.label}
              </Link>
            ))}
          </div>

          <h2 style={{ fontSize: "var(--fs-h2)", margin: "calc(var(--u)*4) 0 calc(var(--u)*2)" }}>
            대상별로 찾기
          </h2>
          <div className="chips">
            {Object.values(TARGET_META).map((t) => (
              <Link key={t.slug} href={`/target/${t.slug}`} className="chip">
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 신뢰 고지 ───────── */}
      <section className="section-sm">
        <div className="wrap">
          <div className="notice notice-info">
            <span className="ni" aria-hidden>ℹ</span>
            <span>
              <strong>지원금모아는 정부 사이트가 아닙니다.</strong> 공공기관이 공개한 정보를
              알기 쉽게 정리해 안내하는 민간 서비스이며, 신청 접수나 지급을 대행하지 않습니다.
              모든 금액과 요건에는 기준 연도·출처·확인일을 함께 표기하지만, 제도는 수시로
              바뀌므로 신청 전 반드시 공식 사이트에서 최종 확인하세요.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
