import type { HouseholdType } from "./types";

/* ============================================================
   근로장려금 · 자녀장려금 산정 로직
   ------------------------------------------------------------
   ⚠️ 모든 수치는 아래 TABLE 상수에만 존재합니다.
      제도가 바뀌면 이 파일의 상수만 고치면 사이트 전체가 갱신됩니다.
      각 상수에는 baseYear / sourceUrl / verifiedAt 이 함께 붙습니다.
   ============================================================ */

export const MAN = 10_000; // 1만원

/** 소득 구간별 산정 구조 (점증 → 평탄 → 점감) */
export interface Bracket {
  /** 최대 지급액 (원) */
  max: number;
  /** 점증구간 끝 = 평탄구간 시작 (원) */
  phaseInEnd: number;
  /** 평탄구간 끝 = 점감구간 시작 (원) */
  plateauEnd: number;
  /** 지급 상한 소득 (원, 이 금액 이상이면 미지급) */
  cutoff: number;
}

export interface IncentiveTable {
  id: string;
  label: string;
  /** 귀속 연도 (소득 기준 연도) */
  baseYear: number;
  /** 신청 연도 */
  claimYear: number;
  status: "current" | "proposed";
  statusNote?: string;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
  brackets: Record<HouseholdType, Bracket>;
}

/* ---------- 근로장려금: 현행 ---------- */
export const EITC_CURRENT: IncentiveTable = {
  id: "eitc-current",
  label: "현행 기준",
  baseYear: 2025,
  claimYear: 2026,
  status: "current",
  sourceName: "국세청 근로·자녀장려금 안내",
  sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2302&cntntsId=7707",
  verifiedAt: "2026-10-14",
  brackets: {
    single:        { max: 165 * MAN, phaseInEnd:  400 * MAN, plateauEnd:  900 * MAN, cutoff: 2200 * MAN },
    single_earner: { max: 285 * MAN, phaseInEnd:  700 * MAN, plateauEnd: 1400 * MAN, cutoff: 3200 * MAN },
    dual_earner:   { max: 330 * MAN, phaseInEnd:  800 * MAN, plateauEnd: 1700 * MAN, cutoff: 4400 * MAN },
  },
};

/* ---------- 근로장려금: 2026 세제개편안 (국회 통과 전) ---------- */
export const EITC_PROPOSED: IncentiveTable = {
  id: "eitc-proposed",
  label: "2026 세제개편안",
  baseYear: 2026,
  claimYear: 2027,
  status: "proposed",
  statusNote:
    "정부가 발표한 2026년 세제개편안에 담긴 인상안입니다. 국회 통과 여부와 적용 시점이 확정되지 않았으므로 참고용으로만 보세요.",
  sourceName: "2026 세제개편안 보도",
  sourceUrl: "https://v.daum.net/v/95kLlpUZkc",
  verifiedAt: "2026-10-14",
  brackets: {
    single:        { max: 180 * MAN, phaseInEnd:  400 * MAN, plateauEnd:  900 * MAN, cutoff: 2200 * MAN },
    single_earner: { max: 310 * MAN, phaseInEnd:  700 * MAN, plateauEnd: 1400 * MAN, cutoff: 3200 * MAN },
    dual_earner:   { max: 360 * MAN, phaseInEnd:  800 * MAN, plateauEnd: 1700 * MAN, cutoff: 4400 * MAN },
  },
};

/* ---------- 재산 요건 (근로·자녀장려금 공통) ---------- */
export const ASSET_RULE = {
  /** 이 금액 미만이면 100% 지급 */
  fullBelow: 170_000_000,
  /** fullBelow ~ halfBelow 구간은 50% 지급 */
  halfBelow: 240_000_000,
  baseDateNote: "전년도 6월 1일 기준 가구원 재산 합계",
  sourceName: "국세청 장려금 재산요건 안내",
  sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2302&cntntsId=7707",
  verifiedAt: "2026-10-14",
} as const;

/* ---------- 자녀장려금 ---------- */
export const CTC_CURRENT = {
  id: "ctc-current",
  label: "현행 기준",
  baseYear: 2025,
  claimYear: 2026,
  /** 자녀 1인당 최대 지급액 */
  perChildMax: 100 * MAN,
  /** 자녀 1인당 최소 지급액 (상한 소득 지점) */
  perChildMin: 50 * MAN,
  /** 이 소득 미만이면 1인당 최대액 */
  plateauEnd: 2100 * MAN,
  /** 총소득 상한 (이 금액 이상이면 미지급) */
  cutoff: 7000 * MAN,
  sourceName: "국세청 자녀장려금 안내",
  sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2302&cntntsId=7707",
  verifiedAt: "2026-10-14",
  formulaNote:
    "총소득 2,100만원 미만이면 자녀 1인당 100만원, 2,100만원 이상 7,000만원 미만이면 자녀 1인당 100만원에서 초과소득에 비례해 50만원까지 줄어드는 구조로 계산했습니다.",
} as const;

export type AssetTier = "full" | "half" | "none";

export function assetTier(asset: number): AssetTier {
  if (asset < ASSET_RULE.fullBelow) return "full";
  if (asset < ASSET_RULE.halfBelow) return "half";
  return "none";
}

export interface EitcResult {
  /** 감액 전 산정액 */
  base: number;
  /** 재산 감액 후 최종 예상액 */
  final: number;
  assetTier: AssetTier;
  /** 소득 구간 설명 */
  phase: "phase_in" | "plateau" | "phase_out" | "over";
  bracket: Bracket;
  table: IncentiveTable;
}

/** 근로장려금 예상액 */
export function calcEitc(
  income: number,
  household: HouseholdType,
  asset: number,
  table: IncentiveTable = EITC_CURRENT
): EitcResult {
  const b = table.brackets[household];
  const tier = assetTier(asset);

  let base = 0;
  let phase: EitcResult["phase"];

  if (income <= 0) {
    base = 0;
    phase = "phase_in";
  } else if (income < b.phaseInEnd) {
    base = (income / b.phaseInEnd) * b.max;
    phase = "phase_in";
  } else if (income <= b.plateauEnd) {
    base = b.max;
    phase = "plateau";
  } else if (income < b.cutoff) {
    base = b.max * (1 - (income - b.plateauEnd) / (b.cutoff - b.plateauEnd));
    phase = "phase_out";
  } else {
    base = 0;
    phase = "over";
  }

  base = Math.max(0, roundTo(base, 1_000));
  const factor = tier === "full" ? 1 : tier === "half" ? 0.5 : 0;
  const final = Math.max(0, roundTo(base * factor, 1_000));

  return { base, final, assetTier: tier, phase, bracket: b, table };
}

export interface CtcResult {
  base: number;
  final: number;
  perChild: number;
  assetTier: AssetTier;
  eligible: boolean;
}

/** 자녀장려금 예상액 */
export function calcCtc(income: number, children: number, asset: number): CtcResult {
  const tier = assetTier(asset);
  const t = CTC_CURRENT;

  if (children <= 0 || income >= t.cutoff) {
    return { base: 0, final: 0, perChild: 0, assetTier: tier, eligible: false };
  }

  let perChild: number;
  if (income < t.plateauEnd) {
    perChild = t.perChildMax;
  } else {
    const span = t.cutoff - t.plateauEnd;
    const drop = (t.perChildMax - t.perChildMin) * ((income - t.plateauEnd) / span);
    perChild = t.perChildMax - drop;
  }
  perChild = Math.max(t.perChildMin, roundTo(perChild, 1_000));

  const base = roundTo(perChild * children, 1_000);
  const factor = tier === "full" ? 1 : tier === "half" ? 0.5 : 0;
  const final = Math.max(0, roundTo(base * factor, 1_000));

  return { base, final, perChild, assetTier: tier, eligible: final > 0 };
}

function roundTo(n: number, unit: number) {
  return Math.round(n / unit) * unit;
}

/** 1,234,000 → "123만 4,000원" */
export function formatKRW(n: number): string {
  if (!Number.isFinite(n)) return "-";
  if (n === 0) return "0원";
  const eok = Math.floor(n / 100_000_000);
  const rest = n % 100_000_000;
  const man = Math.floor(rest / 10_000);
  const won = rest % 10_000;
  const parts: string[] = [];
  if (eok) parts.push(`${eok.toLocaleString("ko-KR")}억`);
  if (man) parts.push(`${man.toLocaleString("ko-KR")}만`);
  if (won) parts.push(`${won.toLocaleString("ko-KR")}`);
  return parts.join(" ") + "원";
}

export function formatPlain(n: number): string {
  return n.toLocaleString("ko-KR");
}

/** 산정표 미리보기 행 (상세 페이지 표 용) */
export function sampleRows(household: HouseholdType, table: IncentiveTable = EITC_CURRENT) {
  const b = table.brackets[household];
  const points = [
    0,
    b.phaseInEnd / 2,
    b.phaseInEnd,
    (b.phaseInEnd + b.plateauEnd) / 2,
    b.plateauEnd,
    b.plateauEnd + (b.cutoff - b.plateauEnd) / 3,
    b.plateauEnd + ((b.cutoff - b.plateauEnd) * 2) / 3,
    b.cutoff - 1,
  ];
  return points.map((income) => {
    const r = calcEitc(income, household, 0, table);
    return { income: Math.round(income / 10_000) * 10_000, amount: r.base };
  });
}
