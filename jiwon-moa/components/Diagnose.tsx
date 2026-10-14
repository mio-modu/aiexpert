"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EMPTY_PROFILE, type Profile, CATEGORY_META } from "@/lib/types";
import { matchBenefits } from "@/data/benefits";

const STEPS = 5;

const SITUATIONS = [
  { id: "working", label: "직장에 다니고 있어요" },
  { id: "business", label: "사업·프리랜서 소득이 있어요" },
  { id: "jobseeking", label: "구직 중이에요" },
  { id: "childcare", label: "아이를 키우고 있어요" },
  { id: "pregnant", label: "임신 중이거나 곧 출산해요" },
  { id: "study", label: "공부·자격증을 준비해요" },
  { id: "moving", label: "이사를 계획 중이에요" },
  { id: "startup", label: "창업을 준비해요" },
  { id: "lowincome", label: "기초수급·차상위 대상이에요" },
  { id: "crisis", label: "갑작스러운 실직·질병을 겪었어요" },
];

export function Diagnose() {
  const [step, setStep] = useState(0);
  const [p, setP] = useState<Profile>(EMPTY_PROFILE);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((o) => ({ ...o, [k]: v }));

  const toggleSituation = (id: string) =>
    setP((o) => ({
      ...o,
      situations: o.situations.includes(id)
        ? o.situations.filter((s) => s !== id)
        : [...o.situations, id],
    }));

  const canNext = [
    p.ageBand !== null,
    p.household !== null,
    p.incomeBand !== null,
    p.housing !== null,
    true, // 상황은 선택 안 해도 넘어갈 수 있음
  ][step];

  const results = useMemo(() => (done ? matchBenefits(p) : []), [done, p]);

  if (done) {
    const likely = results.filter((r) => r.verdict === "likely");
    const maybe = results.filter((r) => r.verdict === "maybe");

    return (
      <div className="stack" style={{ ["--gap" as string]: "calc(var(--u)*3)" }}>
        <div className="result-panel">
          <div className="stat">
            <span className="stat-label">받을 가능성이 있는 지원금</span>
            <span className="stat-value is-hero">{results.length}개</span>
            <span className="stat-basis">
              가능성 높음 {likely.length}개 · 확인 필요 {maybe.length}개 ·
              입력하신 정보는 저장되지 않았습니다
            </span>
          </div>
        </div>

        {likely.length > 0 && (
          <section>
            <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>
              받을 가능성이 높아요
            </h2>
            <div className="grid grid-2">
              {likely.map(({ benefit: b }) => (
                <Link key={b.slug} href={`/benefit/${b.slug}`} className="card card-link">
                  <div className="row" style={{ marginBottom: "calc(var(--u)*1.5)" }}>
                    <span className="badge badge-ok">가능성 높음</span>
                    <span className="badge badge-plain">{CATEGORY_META[b.category].label}</span>
                  </div>
                  <h3 className="card-title" style={{ marginBottom: "calc(var(--u))" }}>{b.name}</h3>
                  <p className="card-amount">
                    {b.amount}
                  </p>
                  <p className="card-sub" style={{ marginBottom: "calc(var(--u)*1.5)" }}>{b.summary}</p>
                  <p className="stat-basis">신청 {b.period}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {maybe.length > 0 && (
          <section>
            <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "calc(var(--u)*2)" }}>
              조건을 확인해보세요
            </h2>
            <div className="grid grid-2">
              {maybe.map(({ benefit: b }) => (
                <Link key={b.slug} href={`/benefit/${b.slug}`} className="card card-link">
                  <div className="row" style={{ marginBottom: "calc(var(--u)*1.5)" }}>
                    <span className="badge badge-warn">확인 필요</span>
                    <span className="badge badge-plain">{CATEGORY_META[b.category].label}</span>
                  </div>
                  <h3 className="card-title" style={{ marginBottom: "calc(var(--u))" }}>{b.name}</h3>
                  <p className="card-amount">
                    {b.amount}
                  </p>
                  <p className="card-sub">{b.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.length === 0 && (
          <div className="notice notice-info">
            <span className="ni" aria-hidden>ℹ</span>
            <span>
              입력하신 조건으로는 바로 추천할 제도를 찾지 못했습니다. 지자체마다 별도 지원이
              있으니 <Link href="/benefits">전체 지원금 목록</Link>도 확인해보세요.
            </span>
          </div>
        )}

        <div className="notice notice-warn">
          <span className="ni" aria-hidden>!</span>
          <span>
            이 결과는 입력하신 내용만으로 <strong>대략적인 가능성</strong>을 추려본 것입니다.
            실제 수급 여부는 소득인정액·재산·가구원 구성 등 세부 심사로 결정되므로, 반드시 각
            제도의 공식 사이트에서 확인하세요.
          </span>
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => { setDone(false); setStep(0); setP(EMPTY_PROFILE); }}
          >
            다시 진단하기
          </button>
          <Link href="/benefits" className="btn btn-ghost">전체 지원금 보기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stack" style={{ ["--gap" as string]: "calc(var(--u)*3)" }}>
      <div>
        <div className="row-between" style={{ marginBottom: "calc(var(--u))" }}>
          <span className="stat-label">질문 {step + 1} / {STEPS}</span>
          <span className="t-xs t-muted">입력값은 서버로 전송되지 않습니다</span>
        </div>
        <div className="progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS}>
          <i style={{ width: `${((step + 1) / STEPS) * 100}%` }} />
        </div>
      </div>

      <div className="card card-pad-lg">
        {step === 0 && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: "var(--fs-h2)", fontWeight: 700, marginBottom: "calc(var(--u)*2)" }}>
              나이가 어떻게 되시나요?
            </legend>
            <div className="radio-grid">
              {[
                ["under19", "18세 이하"],
                ["19to34", "19~34세 (청년)"],
                ["35to64", "35~64세"],
                ["over65", "65세 이상"],
              ].map(([v, label]) => (
                <label className="radio-card" key={v}>
                  <input type="radio" name="age" checked={p.ageBand === v}
                    onChange={() => set("ageBand", v as Profile["ageBand"])} />
                  <span className="rc-title">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: "var(--fs-h2)", fontWeight: 700, marginBottom: "calc(var(--u)*2)" }}>
              가구 형태를 알려주세요
            </legend>
            <div className="radio-grid">
              {[
                ["single", "단독가구", "배우자·부양자녀·70세 이상 직계존속이 없음"],
                ["single_earner", "홑벌이가구", "배우자나 부양가족이 있고 배우자 총급여 300만원 미만"],
                ["dual_earner", "맞벌이가구", "배우자 총급여가 300만원 이상"],
              ].map(([v, label, desc]) => (
                <label className="radio-card" key={v}>
                  <input type="radio" name="hh" checked={p.household === v}
                    onChange={() => set("household", v as Profile["household"])} />
                  <span>
                    <span className="rc-title">{label}</span><br />
                    <span className="rc-desc">{desc}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="field" style={{ marginTop: "calc(var(--u)*3)" }}>
              <span className="label">18세 미만 자녀 수</span>
              <div className="chips">
                {[0, 1, 2, 3, 4].map((n) => (
                  <button key={n} type="button" className="chip" aria-pressed={p.children === n}
                    onClick={() => set("children", n)}>
                    {n === 0 ? "없음" : `${n}명`}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: "var(--fs-h2)", fontWeight: 700, marginBottom: "calc(var(--u)*2)" }}>
              연간 소득은 어느 정도인가요?
            </legend>
            <p className="t-sm t-muted" style={{ marginBottom: "calc(var(--u)*2)" }}>
              세전 기준입니다. 맞벌이는 부부 합산으로 골라주세요.
            </p>
            <div className="radio-grid">
              {[
                ["u1000", "1,000만원 미만"],
                ["1000to2200", "1,000만~2,200만원"],
                ["2200to3200", "2,200만~3,200만원"],
                ["3200to4400", "3,200만~4,400만원"],
                ["4400to7000", "4,400만~7,000만원"],
                ["over7000", "7,000만원 이상"],
              ].map(([v, label]) => (
                <label className="radio-card" key={v}>
                  <input type="radio" name="inc" checked={p.incomeBand === v}
                    onChange={() => set("incomeBand", v as Profile["incomeBand"])} />
                  <span className="rc-title">{label}</span>
                </label>
              ))}
            </div>
            <div className="field" style={{ marginTop: "calc(var(--u)*3)" }}>
              <span className="label">가구원 재산 합계 (대략)</span>
              <div className="chips">
                {[
                  ["u170", "1.7억 미만"],
                  ["170to240", "1.7억~2.4억"],
                  ["over240", "2.4억 이상"],
                ].map(([v, label]) => (
                  <button key={v} type="button" className="chip" aria-pressed={p.assetBand === v}
                    onClick={() => set("assetBand", v as Profile["assetBand"])}>
                    {label}
                  </button>
                ))}
              </div>
              <span className="hint">장려금류는 재산 기준으로 감액되거나 제외됩니다.</span>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: "var(--fs-h2)", fontWeight: 700, marginBottom: "calc(var(--u)*2)" }}>
              주거 상황은 어떤가요?
            </legend>
            <div className="radio-grid">
              {[
                ["wolse", "월세로 살고 있어요"],
                ["jeonse", "전세로 살고 있어요"],
                ["own", "자가 주택이에요"],
                ["none", "부모님 집 등 그 외"],
              ].map(([v, label]) => (
                <label className="radio-card" key={v}>
                  <input type="radio" name="housing" checked={p.housing === v}
                    onChange={() => set("housing", v as Profile["housing"])} />
                  <span className="rc-title">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: "var(--fs-h2)", fontWeight: 700, marginBottom: "calc(var(--u)*2)" }}>
              해당하는 상황을 모두 골라주세요
            </legend>
            <p className="t-sm t-muted" style={{ marginBottom: "calc(var(--u)*2)" }}>
              여러 개를 선택할 수 있습니다. 해당 없으면 그냥 넘어가세요.
            </p>
            <div className="chips">
              {SITUATIONS.map((s) => (
                <button key={s.id} type="button" className="chip"
                  aria-pressed={p.situations.includes(s.id)}
                  onClick={() => toggleSituation(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <div className="row">
        {step > 0 && (
          <button type="button" className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
            이전
          </button>
        )}
        <div className="spacer" />
        {step < STEPS - 1 ? (
          <button type="button" className="btn btn-primary btn-lg" disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}>
            다음
          </button>
        ) : (
          <button type="button" className="btn btn-primary btn-lg" onClick={() => setDone(true)}>
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
}
