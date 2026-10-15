"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calcEitc, calcCtc, formatKRW, formatPlain, sampleRows,
  EITC_CURRENT, EITC_PROPOSED, CTC_CURRENT, ASSET_RULE, MAN,
} from "@/lib/incentive";
import { HOUSEHOLD_LABEL, HOUSEHOLD_DESC, type HouseholdType } from "@/lib/types";

/* 입력창에 1,234,000 형태로 보여주기 */
function useWonInput(initial: number) {
  const [raw, setRaw] = useState(String(initial));
  const value = Number(raw.replace(/[^\d]/g, "")) || 0;
  const display = value ? value.toLocaleString("ko-KR") : "";
  return {
    value,
    display,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRaw(e.target.value),
    setValue: (n: number) => setRaw(String(n)),
  };
}

function AssetField({
  asset, onChange,
}: { asset: number; onChange: (n: number) => void }) {
  return (
    <div className="field">
      <label className="label" htmlFor="asset">가구원 재산 합계</label>
      <div className="input-affix">
        <input
          id="asset"
          className="input input-num"
          inputMode="numeric"
          value={asset ? asset.toLocaleString("ko-KR") : ""}
          onChange={(e) => onChange(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
          placeholder="0"
          aria-describedby="asset-hint"
        />
        <span className="affix">원</span>
      </div>
      <span className="hint" id="asset-hint">
        {ASSET_RULE.baseDateNote}. 1억 7,000만원 이상이면 50%만 지급되고, 2억 4,000만원 이상이면 지급되지 않습니다.
      </span>
      <div className="chips" style={{ marginTop: "calc(var(--u))" }}>
        {[0, 100_000_000, 170_000_000, 200_000_000, 250_000_000].map((v) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={asset === v}
            onClick={() => onChange(v)}
          >
            {v === 0 ? "없음" : `${(v / 100_000_000).toLocaleString("ko-KR")}억`}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════ 근로장려금 ══════════════════ */
export function EitcCalculator() {
  const income = useWonInput(0);
  const [household, setHousehold] = useState<HouseholdType>("single");
  const [asset, setAsset] = useState(0);
  const [useProposed, setUseProposed] = useState(false);

  const table = useProposed ? EITC_PROPOSED : EITC_CURRENT;
  const r = useMemo(
    () => calcEitc(income.value, household, asset, table),
    [income.value, household, asset, table]
  );
  const rows = useMemo(() => sampleRows(household, table), [household, table]);

  const phaseText: Record<typeof r.phase, string> = {
    phase_in: "소득이 늘수록 지급액도 함께 늘어나는 구간입니다.",
    plateau: "최대 지급액을 받는 구간입니다.",
    phase_out: "소득이 늘수록 지급액이 줄어드는 구간입니다.",
    over: "소득이 지급 기준을 넘어 지급 대상이 아닙니다.",
  };

  return (
    <div className="stack" style={{ ["--gap" as string]: "calc(var(--u)*3)" }}>
      {/* 입력 */}
      <div className="card card-pad-lg stack" style={{ ["--gap" as string]: "calc(var(--u)*3)" }}>
        <div className="field">
          <span className="label">가구 유형</span>
          <div className="radio-grid">
            {(Object.keys(HOUSEHOLD_LABEL) as HouseholdType[]).map((h) => (
              <label className="radio-card" key={h}>
                <input
                  type="radio"
                  name="household"
                  value={h}
                  checked={household === h}
                  onChange={() => setHousehold(h)}
                />
                <span>
                  <span className="rc-title">{HOUSEHOLD_LABEL[h]}</span>
                  <br />
                  <span className="rc-desc">{HOUSEHOLD_DESC[h]}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="income">연간 총급여액 등</label>
          <div className="input-affix">
            <input
              id="income"
              className="input input-num"
              inputMode="numeric"
              value={income.display}
              onChange={income.onChange}
              placeholder="0"
              aria-describedby="income-hint"
            />
            <span className="affix">원</span>
          </div>
          <span className="hint" id="income-hint">
            근로소득은 총급여액, 사업소득은 수입금액에 업종별 조정률을 곱한 금액입니다.
            맞벌이는 부부 합산으로 넣으세요.
          </span>
          <div className="chips" style={{ marginTop: "calc(var(--u))" }}>
            {[12_000_000, 20_000_000, 28_000_000, 36_000_000].map((v) => (
              <button key={v} type="button" className="chip" onClick={() => income.setValue(v)}>
                {(v / MAN).toLocaleString("ko-KR")}만원
              </button>
            ))}
          </div>
        </div>

        <AssetField asset={asset} onChange={setAsset} />
      </div>

      {/* 결과 */}
      <div className="result-panel stack" style={{ ["--gap" as string]: "calc(var(--u)*2)" }}>
        <div className="stat">
          <span className="stat-label">예상 수령액</span>
          {income.value === 0 ? (
            <>
              <span className="stat-value is-hero is-empty">—</span>
              <span className="stat-basis">연간 총급여액을 입력하면 예상액이 바로 계산됩니다.</span>
            </>
          ) : (
            <>
              <span className="stat-value is-hero">{formatKRW(r.final)}</span>
              <span className="stat-basis">
                {HOUSEHOLD_LABEL[household]} · 총급여 {formatPlain(income.value)}원 · 재산{" "}
                {formatPlain(asset)}원 기준 · {table.label} ({table.baseYear}년 귀속)
              </span>
            </>
          )}
        </div>

        {income.value > 0 && r.assetTier === "half" && (
          <div className="notice notice-warn">
            <span className="ni" aria-hidden>!</span>
            <span>
              재산이 1억 7,000만원 이상 2억 4,000만원 미만이라 <strong>산정액의 50%</strong>만
              지급됩니다. 감액 전 산정액은 {formatKRW(r.base)}입니다.
            </span>
          </div>
        )}
        {income.value > 0 && r.assetTier === "none" && (
          <div className="notice notice-warn">
            <span className="ni" aria-hidden>!</span>
            <span>재산 합계가 2억 4,000만원 이상이면 근로장려금이 지급되지 않습니다.</span>
          </div>
        )}
        {income.value > 0 && r.phase === "over" && r.assetTier !== "none" && (
          <div className="notice notice-warn">
            <span className="ni" aria-hidden>!</span>
            <span>
              {HOUSEHOLD_LABEL[household]}의 소득 상한은{" "}
              {(r.bracket.cutoff / MAN).toLocaleString("ko-KR")}만원입니다. 입력하신 소득은 이
              기준을 넘습니다.
            </span>
          </div>
        )}
        {r.phase !== "over" && income.value > 0 && (
          <p className="t-sm t-soft">{phaseText[r.phase]}</p>
        )}

        <label className="radio-card" style={{ alignItems: "center" }}>
          <input type="checkbox" checked={useProposed} onChange={(e) => setUseProposed(e.target.checked)} />
          <span>
            <span className="rc-title">2026 세제개편안 기준으로 보기</span>
            <br />
            <span className="rc-desc">{EITC_PROPOSED.statusNote}</span>
          </span>
        </label>

        <div className="notice notice-info">
          <span className="ni" aria-hidden>ℹ</span>
          <span>
            이 계산기는 조세특례제한법의 산정 구조(점증 → 평탄 → 점감)를 따라 계산한
            <strong> 참고용 추정치</strong>입니다. 실제 지급액은 국세청 산정표에 따라 결정되며
            수천 원에서 수만 원 차이가 날 수 있습니다. 확정 금액은{" "}
            <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow">
              홈택스 ↗
            </a>
            에서 확인하세요.
          </span>
        </div>

        <div className="row">
          <a
            href="https://www.hometax.go.kr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn btn-primary"
          >
            홈택스에서 신청하기 ↗
          </a>
          <Link href="/calculator/janyeo-jangryeogeum" className="btn btn-ghost">
            자녀장려금도 계산하기
          </Link>
        </div>
      </div>

      {/* 산정표 */}
      <div className="card card-pad-lg">
        <h2 style={{ fontSize: "var(--fs-h3)", marginBottom: "calc(var(--u)*2)" }}>
          {HOUSEHOLD_LABEL[household]} 소득 구간별 지급액
        </h2>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th className="num">연간 총급여액</th>
                <th className="num">예상 지급액</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="num">{formatPlain(row.income)}원</td>
                  <td className="num">{formatPlain(row.amount)}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="stat-basis" style={{ marginTop: "calc(var(--u)*1.5)" }}>
          {table.label} · {table.baseYear}년 귀속 · 재산 감액 적용 전 ·{" "}
          <a href={table.sourceUrl} target="_blank" rel="noopener noreferrer nofollow">
            {table.sourceName} ↗
          </a>{" "}
          · 확인 {table.verifiedAt}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════ 자녀장려금 ══════════════════ */
export function CtcCalculator() {
  const income = useWonInput(0);
  const [children, setChildren] = useState(1);
  const [asset, setAsset] = useState(0);

  const r = useMemo(() => calcCtc(income.value, children, asset), [income.value, children, asset]);

  return (
    <div className="stack" style={{ ["--gap" as string]: "calc(var(--u)*3)" }}>
      <div className="card card-pad-lg stack" style={{ ["--gap" as string]: "calc(var(--u)*3)" }}>
        <div className="field">
          <label className="label" htmlFor="children">18세 미만 부양자녀 수</label>
          <div className="chips">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className="chip"
                aria-pressed={children === n}
                onClick={() => setChildren(n)}
              >
                {n}명
              </button>
            ))}
          </div>
          <input id="children" type="hidden" value={children} readOnly />
          <span className="hint">
            연간 소득이 100만원 이하인 18세 미만 자녀가 대상입니다. 위탁아동과 입양자도 포함됩니다.
          </span>
        </div>

        <div className="field">
          <label className="label" htmlFor="ctc-income">부부 합산 연간 총소득</label>
          <div className="input-affix">
            <input
              id="ctc-income"
              className="input input-num"
              inputMode="numeric"
              value={income.display}
              onChange={income.onChange}
              placeholder="0"
            />
            <span className="affix">원</span>
          </div>
          <div className="chips" style={{ marginTop: "calc(var(--u))" }}>
            {[18_000_000, 30_000_000, 45_000_000, 60_000_000].map((v) => (
              <button key={v} type="button" className="chip" onClick={() => income.setValue(v)}>
                {(v / MAN).toLocaleString("ko-KR")}만원
              </button>
            ))}
          </div>
        </div>

        <AssetField asset={asset} onChange={setAsset} />
      </div>

      <div className="result-panel stack" style={{ ["--gap" as string]: "calc(var(--u)*2)" }}>
        <div className="stat">
          <span className="stat-label">예상 수령액</span>
          {income.value === 0 ? (
            <>
              <span className="stat-value is-hero is-empty">—</span>
              <span className="stat-basis">부부 합산 총소득을 입력하면 예상액이 바로 계산됩니다.</span>
            </>
          ) : (
            <>
              <span className="stat-value is-hero">{formatKRW(r.final)}</span>
              <span className="stat-basis">
                자녀 {children}명 · 총소득 {formatPlain(income.value)}원 · 재산{" "}
                {formatPlain(asset)}원 기준 · {CTC_CURRENT.baseYear}년 귀속
              </span>
            </>
          )}
        </div>

        {income.value > 0 && r.perChild > 0 && (
          <p className="t-sm t-soft">
            자녀 1명당 <strong>{formatKRW(r.perChild)}</strong> × {children}명
            {r.assetTier === "half" ? " (재산 기준으로 50% 감액 적용)" : ""}
          </p>
        )}

        {income.value > 0 && income.value >= CTC_CURRENT.cutoff && (
          <div className="notice notice-warn">
            <span className="ni" aria-hidden>!</span>
            <span>
              자녀장려금은 부부 합산 총소득{" "}
              {(CTC_CURRENT.cutoff / MAN).toLocaleString("ko-KR")}만원 미만 가구가 대상입니다.
            </span>
          </div>
        )}
        {income.value > 0 && r.assetTier === "none" && (
          <div className="notice notice-warn">
            <span className="ni" aria-hidden>!</span>
            <span>재산 합계가 2억 4,000만원 이상이면 자녀장려금이 지급되지 않습니다.</span>
          </div>
        )}

        <div className="notice notice-info">
          <span className="ni" aria-hidden>ℹ</span>
          <span>
            {CTC_CURRENT.formulaNote} <strong>참고용 추정치</strong>이며 확정 금액은{" "}
            <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow">
              홈택스 ↗
            </a>
            에서 확인하세요.
          </span>
        </div>

        <div className="row">
          <a
            href="https://www.hometax.go.kr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn btn-primary"
          >
            홈택스에서 신청하기 ↗
          </a>
          <Link href="/calculator/geunro-jangryeogeum" className="btn btn-ghost">
            근로장려금도 계산하기
          </Link>
        </div>
      </div>
    </div>
  );
}
