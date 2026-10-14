import type { Profile, MatchVerdict } from "@/lib/types";

/** 데이터 최종 확인일 */
export const V = "2026-10-14";

/** 소득 구간 → 대표값(원). 매칭 판정에만 사용 */
const INCOME_MID: Record<NonNullable<Profile["incomeBand"]>, number> = {
  u1000: 7_000_000,
  "1000to2200": 16_000_000,
  "2200to3200": 27_000_000,
  "3200to4400": 38_000_000,
  "4400to7000": 57_000_000,
  over7000: 90_000_000,
};

export function incomeOf(p: Profile): number | null {
  return p.incomeBand ? INCOME_MID[p.incomeBand] : null;
}

export function has(p: Profile, s: string): boolean {
  return p.situations.includes(s);
}

export function isYouth(p: Profile): boolean {
  return p.ageBand === "19to34";
}

export function isSenior(p: Profile): boolean {
  return p.ageBand === "over65";
}

/** 재산 2.4억 이상이면 장려금·수급류 탈락 */
export function assetBlocks(p: Profile): boolean {
  return p.assetBand === "over240";
}

/** 소득이 기준 미만인지. 모르면 null */
export function incomeUnder(p: Profile, limit: number): boolean | null {
  const inc = incomeOf(p);
  if (inc === null) return null;
  return inc < limit;
}

/** 저소득 추정 (기초·차상위 선택했거나 소득 구간이 낮음) */
export function isLowIncome(p: Profile): boolean {
  if (has(p, "lowincome")) return true;
  return p.incomeBand === "u1000" || p.incomeBand === "1000to2200";
}

/** 일하고 있는지 (근로 또는 사업) */
export function isEarning(p: Profile): boolean {
  return has(p, "working") || has(p, "business");
}

/** 조건들을 모아 한 번에 판정하는 헬퍼.
 *  hard: 하나라도 false 면 unlikely
 *  soft: 전부 true 면 likely, 일부만 true 면 maybe */
export function verdict(opts: {
  hard?: (boolean | null)[];
  soft?: (boolean | null)[];
}): MatchVerdict {
  const { hard = [], soft = [] } = opts;
  if (hard.some((v) => v === false)) return "unlikely";
  if (hard.some((v) => v === null)) return "maybe";
  if (soft.length === 0) return "likely";
  if (soft.every((v) => v === true)) return "likely";
  if (soft.some((v) => v === true)) return "maybe";
  return "maybe";
}
