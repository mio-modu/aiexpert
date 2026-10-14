import type { Benefit, Profile, MatchVerdict } from "@/lib/types";
import { HIDDEN_BENEFITS } from "./hidden";
import { TAX_BENEFITS } from "./tax";
import { CASH_BENEFITS } from "./cash";
import { HOUSING_BENEFITS } from "./housing";
import { JOB_BENEFITS } from "./job";
import { CHILD_BENEFITS } from "./child";
import { SENIOR_BENEFITS } from "./senior";
import { BUSINESS_BENEFITS } from "./business";
import { EDU_BENEFITS } from "./edu";
import { LIVING_BENEFITS } from "./living";

export { incomeOf } from "./shared";

export const BENEFITS: Benefit[] = [
  ...HIDDEN_BENEFITS,
  ...TAX_BENEFITS,
  ...CASH_BENEFITS,
  ...HOUSING_BENEFITS,
  ...JOB_BENEFITS,
  ...CHILD_BENEFITS,
  ...SENIOR_BENEFITS,
  ...BUSINESS_BENEFITS,
  ...EDU_BENEFITS,
  ...LIVING_BENEFITS,
];

export const BENEFIT_MAP: Record<string, Benefit> = Object.fromEntries(
  BENEFITS.map((b) => [b.slug, b])
);

export function getBenefit(slug: string): Benefit | undefined {
  return BENEFIT_MAP[slug];
}

const VERDICT_RANK: Record<MatchVerdict, number> = { likely: 0, maybe: 1, unlikely: 2 };

export interface MatchedBenefit {
  benefit: Benefit;
  verdict: MatchVerdict;
}

/** 진단 결과: likely → maybe 순으로, 금액 큰 것 우선 */
export function matchBenefits(p: Profile): MatchedBenefit[] {
  return BENEFITS.map((benefit) => ({ benefit, verdict: benefit.match(p) }))
    .filter((m) => m.verdict !== "unlikely")
    .sort((a, b) => {
      const r = VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict];
      if (r !== 0) return r;
      return (b.benefit.amountMax ?? 0) - (a.benefit.amountMax ?? 0);
    });
}

/** related 에 적힌 slug 중 실제로 존재하는 것만 반환 */
export function relatedOf(b: Benefit): Benefit[] {
  return b.related.map(getBenefit).filter((x): x is Benefit => Boolean(x));
}
