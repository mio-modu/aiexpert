import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "면책 고지",
  description: `${SITE.name}이 제공하는 정보의 성격과 한계를 안내합니다.`,
  alternates: { canonical: "/disclaimer" },
};

export default function Page() {
  return (
    <div className="wrap-narrow section">
      <p className="stat-label">법적 고지</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>
        면책 고지
      </h1>
      <p className="stat-basis" style={{ marginBottom: "calc(var(--u)*4)" }}>최종 개정일 2026-10-14</p>

      <div className="notice notice-warn" style={{ marginBottom: "calc(var(--u)*4)" }}>
        <span className="ni" aria-hidden>!</span>
        <span>
          <strong>{SITE.name}은 정부·공공기관이 운영하는 사이트가 아닙니다.</strong> 공공기관이
          공개한 정보를 알기 쉽게 정리해 안내하는 민간 서비스입니다.
        </span>
      </div>

      <ul className="rule-list">
        <li>
          <strong>안내 정보입니다.</strong> 본 사이트의 내용은 각 제도의 공식 안내를 정리한
          것으로, 법적 효력이 있는 유권해석이나 공식 통지가 아닙니다.
        </li>
        <li>
          <strong>계산 결과는 추정치입니다.</strong> 계산기는 관련 법령의 산정 구조를 따라
          계산한 참고값이며, 실제 지급액은 소관 기관의 산정표와 심사로 결정됩니다. 금액에
          차이가 발생할 수 있습니다.
        </li>
        <li>
          <strong>진단 결과는 가능성입니다.</strong> 5문항 진단은 입력한 내용만으로 대략적인
          가능성을 추린 것입니다. 실제 수급 여부는 소득인정액, 재산, 가구원 구성 등 세부
          심사로 정해집니다.
        </li>
        <li>
          <strong>제도는 수시로 바뀝니다.</strong> 예산 소진, 법령 개정, 지자체 공고 변경으로
          요건과 금액이 달라질 수 있습니다. 각 페이지의 확인일을 참고하시고, 신청 전 공식
          사이트에서 최신 내용을 확인하세요.
        </li>
        <li>
          <strong>책임의 범위.</strong> 본 사이트의 정보를 이용해 발생한 결과에 대해 운영자는
          법적 책임을 지지 않습니다. 최종 판단과 신청은 이용자 본인의 책임입니다.
        </li>
        <li>
          <strong>대행하지 않습니다.</strong> 신청 접수, 서류 대행, 금융상품 중개를 일절 하지
          않으며 어떤 명목의 수수료도 받지 않습니다.
        </li>
      </ul>

      <div className="row" style={{ marginTop: "calc(var(--u)*4)" }}>
        <Link href="/about" className="btn btn-ghost">사이트 소개</Link>
        <Link href="/privacy" className="btn btn-ghost">개인정보처리방침</Link>
      </div>
    </div>
  );
}
