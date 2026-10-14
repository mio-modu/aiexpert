import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { BENEFITS } from "@/data/benefits";

export const metadata: Metadata = {
  title: "사이트 소개",
  description: `${SITE.name}이 어떤 서비스이고, 정보를 어떻게 검증하며, 무엇을 하지 않는지 밝힙니다.`,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <div className="wrap-narrow section">
      <p className="stat-label">소개</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*3)" }}>
        {SITE.name}은 어떤 서비스인가요
      </h1>

      <div className="stack" style={{ ["--gap" as string]: "calc(var(--u)*4)" }}>
        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>왜 만들었나</h2>
          <p className="t-soft">
            정부지원금은 종류가 많고 소관 부처가 제각각이라, 정작 받을 수 있는 사람이
            제도가 있는 줄 몰라 놓치는 일이 잦습니다. 공식 사이트들은 제도별로 흩어져 있고
            &ldquo;나는 받을 수 있나&rdquo;라는 가장 중요한 질문에 한 번에 답해주지 않습니다.
            {SITE.name}은 그 질문 하나에 답하려고 만들었습니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>정보를 다루는 원칙</h2>
          <ul className="rule-list">
            <li>
              <strong>모든 숫자에 근거를 붙입니다.</strong> 금액·요건에는 기준 연도, 출처 기관,
              내용을 마지막으로 확인한 날짜를 함께 표시합니다.
            </li>
            <li>
              <strong>추정치는 추정치라고 적습니다.</strong> 계산기 결과는 법령의 산정 구조를
              따른 참고값이며, 확정 금액은 소관 기관의 심사로 정해집니다.
            </li>
            <li>
              <strong>공식 링크를 숨기지 않습니다.</strong> 모든 제도 페이지에서 공식 신청
              사이트로 바로 연결합니다.
            </li>
            <li>
              <strong>개인정보를 수집하지 않습니다.</strong> 진단과 계산은 브라우저 안에서만
              이루어지고, 입력값은 서버로 전송하거나 저장하지 않습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>하지 않는 것</h2>
          <ul className="rule-list">
            <li>정부·공공기관이 운영하는 사이트가 아닙니다.</li>
            <li>신청을 대행하거나 접수하지 않습니다. 수수료를 받지 않습니다.</li>
            <li>대출·보험 등 금융상품을 중개하거나 모집하지 않습니다.</li>
            <li>심사 결과나 지급을 보장하지 않습니다.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>현재 수록 범위</h2>
          <div className="stat">
            <span className="stat-value is-lg">{BENEFITS.length}개</span>
            <span className="stat-basis">
              중앙부처 소관 제도 기준. 지자체별 제도는 순차적으로 추가하고 있습니다.
            </span>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>오류 제보</h2>
          <p className="t-soft">
            내용이 실제와 다르거나 제도가 바뀐 것을 발견하시면 알려주세요. 확인 후 바로
            고치고 확인일을 갱신합니다. 문의: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
          </p>
        </section>

        <div className="row">
          <Link href="/diagnose" className="btn btn-primary">지원금 진단 시작</Link>
          <Link href="/disclaimer" className="btn btn-ghost">면책 고지 보기</Link>
        </div>
      </div>
    </div>
  );
}
