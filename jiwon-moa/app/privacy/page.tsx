import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE.name}의 개인정보처리방침입니다. 어떤 정보를 수집하지 않는지, 광고 쿠키가 어떻게 쓰이는지 안내합니다.`,
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <div className="wrap-narrow section">
      <p className="stat-label">법적 고지</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>
        개인정보처리방침
      </h1>
      <p className="stat-basis" style={{ marginBottom: "calc(var(--u)*4)" }}>최종 개정일 2026-10-14</p>

      <div className="stack" style={{ ["--gap" as string]: "calc(var(--u)*4)" }}>
        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>1. 수집하지 않는 정보</h2>
          <p className="t-soft">
            {SITE.name}은 회원가입을 받지 않으며 이름, 주민등록번호, 연락처, 계좌번호 등
            개인을 식별할 수 있는 정보를 일절 수집하지 않습니다.
          </p>
          <p className="t-soft" style={{ marginTop: "calc(var(--u)*1.5)" }}>
            지원금 진단과 계산기에 입력하는 나이·가구형태·소득·재산 정보는{" "}
            <strong>이용자의 브라우저 안에서만 계산에 사용</strong>되며, 서버로 전송하거나
            저장하지 않습니다. 페이지를 닫으면 사라집니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>2. 쿠키와 광고</h2>
          <p className="t-soft">
            본 사이트는 운영을 위해 제3자 광고를 게재할 수 있습니다. Google을 포함한 제3자
            공급업체는 쿠키를 사용하여 이용자의 본 사이트 또는 다른 사이트 방문 기록을
            바탕으로 광고를 게재할 수 있습니다.
          </p>
          <ul className="rule-list" style={{ marginTop: "calc(var(--u)*1.5)" }}>
            <li>
              Google이 광고 쿠키를 사용함으로써 이용자에게 맞춤 광고를 게재할 수 있습니다.
            </li>
            <li>
              이용자는{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow">
                Google 광고 설정 ↗
              </a>
              에서 맞춤 광고를 해제할 수 있습니다.
            </li>
            <li>
              제3자 공급업체의 쿠키 사용은{" "}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer nofollow">
                aboutads.info ↗
              </a>
              에서 해제할 수 있습니다.
            </li>
            <li>브라우저 설정에서 쿠키를 차단해도 사이트의 모든 기능을 이용할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>3. 접속 기록</h2>
          <p className="t-soft">
            서비스 운영과 오류 파악을 위해 호스팅 제공자가 IP 주소, 브라우저 종류, 방문 시각
            등 일반적인 접속 기록을 자동으로 남길 수 있습니다. 이 기록은 개인을 특정하는
            용도로 사용하지 않습니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>4. 외부 링크</h2>
          <p className="t-soft">
            본 사이트는 홈택스·복지로·고용24 등 공식 사이트로 연결되는 링크를 제공합니다.
            연결된 사이트의 개인정보 처리에는 해당 사이트의 방침이 적용되며 본 사이트는
            책임지지 않습니다.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*1.5)" }}>5. 문의</h2>
          <p className="t-soft">
            개인정보 처리에 관한 문의는 <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>로
            보내주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
