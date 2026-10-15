import type { Metadata } from "next";
import { Diagnose } from "@/components/Diagnose";
import { AdSlot } from "@/components/Chrome";

export const metadata: Metadata = {
  title: "지원금 진단 — 5문항으로 내가 받을 수 있는 지원금 찾기",
  description:
    "나이·가구형태·소득·주거·상황 5가지만 답하면 받을 수 있는 정부지원금을 금액과 신청기간까지 한 번에 확인합니다. 가입 없이 무료, 입력값은 저장되지 않습니다.",
  alternates: { canonical: "/diagnose" },
};

export default function Page() {
  return (
    <div className="wrap-narrow section">
      <p className="stat-label">지원금 진단</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>
        5가지만 답하면 됩니다
      </h1>
      <p className="t-lead" style={{ marginBottom: "calc(var(--u)*4)" }}>
        입력하신 정보는 브라우저 안에서만 쓰이고 서버로 전송하거나 저장하지 않습니다.
      </p>
      <Diagnose />
      <div style={{ marginTop: "calc(var(--u)*5)" }}>
        <AdSlot />
      </div>
    </div>
  );
}
