/** 가구 유형 (근로장려금 기준) */
export type HouseholdType = "single" | "single_earner" | "dual_earner";

export const HOUSEHOLD_LABEL: Record<HouseholdType, string> = {
  single: "단독가구",
  single_earner: "홑벌이가구",
  dual_earner: "맞벌이가구",
};

export const HOUSEHOLD_DESC: Record<HouseholdType, string> = {
  single: "배우자·부양자녀·70세 이상 직계존속이 모두 없는 가구",
  single_earner: "배우자 또는 부양자녀·직계존속이 있고, 배우자 총급여가 300만원 미만인 가구",
  dual_earner: "배우자의 총급여액이 300만원 이상인 가구",
};

/** 지원금 분류 */
export type Category =
  | "cash"      // 현금성 지원
  | "tax"       // 세금 환급·장려금
  | "housing"   // 주거
  | "job"       // 일자리·취업
  | "child"     // 임신·출산·양육
  | "senior"    // 노년
  | "business"  // 창업·소상공인
  | "edu"       // 교육·자기계발
  | "living";   // 생활·에너지·문화

export const CATEGORY_META: Record<Category, { label: string; slug: string; desc: string }> = {
  tax:      { label: "세금 환급·장려금", slug: "tax",      desc: "국세청이 현금으로 돌려주는 장려금과 환급 제도" },
  cash:     { label: "현금성 지원",       slug: "cash",     desc: "조건을 만족하면 현금으로 직접 지급되는 지원금" },
  housing:  { label: "주거·월세",         slug: "housing",  desc: "월세·보증금·전세대출 이자를 덜어주는 지원" },
  job:      { label: "일자리·취업",       slug: "job",      desc: "구직·재취업·고용 유지를 돕는 수당과 장려금" },
  child:    { label: "임신·출산·양육",    slug: "child",    desc: "아이를 낳고 기르는 전 과정의 현금·바우처 지원" },
  senior:   { label: "노년·돌봄",         slug: "senior",   desc: "65세 이상과 돌봄이 필요한 가구를 위한 지원" },
  business: { label: "창업·소상공인",     slug: "business", desc: "사업자를 위한 자금·컨설팅·고용 지원" },
  edu:      { label: "교육·자기계발",     slug: "edu",      desc: "직업훈련과 평생학습 비용을 지원하는 제도" },
  living:   { label: "생활·에너지·문화",  slug: "living",   desc: "공공요금·문화생활 부담을 줄여주는 지원" },
};

/** 대상 태그 (대상별 탐색 페이지로 연결) */
export type Target =
  | "youth" | "newlywed" | "parent" | "pregnant" | "senior65"
  | "jobseeker" | "worker" | "lowincome" | "soleproprietor"
  | "student" | "singleparent" | "disabled" | "tenant";

export const TARGET_META: Record<Target, { label: string; slug: string }> = {
  youth:          { label: "청년",        slug: "youth" },
  newlywed:       { label: "신혼부부",    slug: "newlywed" },
  parent:         { label: "자녀 양육",   slug: "parent" },
  pregnant:       { label: "임신·출산",   slug: "pregnant" },
  senior65:       { label: "65세 이상",   slug: "senior" },
  jobseeker:      { label: "구직자",      slug: "jobseeker" },
  worker:         { label: "근로자",      slug: "worker" },
  lowincome:      { label: "저소득 가구", slug: "low-income" },
  soleproprietor: { label: "소상공인",    slug: "small-business" },
  student:        { label: "학생",        slug: "student" },
  singleparent:   { label: "한부모",      slug: "single-parent" },
  disabled:       { label: "장애인",      slug: "disabled" },
  tenant:         { label: "세입자",      slug: "tenant" },
};

/** 진단 입력 프로필 */
export interface Profile {
  ageBand: "under19" | "19to34" | "35to64" | "over65" | null;
  household: HouseholdType | null;
  children: number;           // 부양자녀 수
  incomeBand: "u1000" | "1000to2200" | "2200to3200" | "3200to4400" | "4400to7000" | "over7000" | null;
  housing: "none" | "jeonse" | "wolse" | "own" | null;
  situations: string[];       // 복수 선택
  assetBand: "u170" | "170to240" | "over240" | null; // 재산 (백만원 단위 구간)
}

export const EMPTY_PROFILE: Profile = {
  ageBand: null, household: null, children: 0,
  incomeBand: null, housing: null, situations: [], assetBand: null,
};

/** 매칭 판정 결과 */
export type MatchVerdict = "likely" | "maybe" | "unlikely";

export interface Benefit {
  slug: string;
  name: string;
  agency: string;
  category: Category;
  targets: Target[];
  /** 한 줄 요약 — 검색결과 description 으로도 사용 */
  summary: string;
  /** 지원 금액 표시 문자열 */
  amount: string;
  /** 정렬·강조용 상한 (원). 모르면 null */
  amountMax: number | null;
  /** 신청 기간 안내 */
  period: string;
  /** 자격 조건 (사용자 표시용) */
  conditions: string[];
  /** 신청 절차 */
  howTo: string[];
  /** 공식 신청 페이지 */
  applyUrl: string;
  /** 제도 안내 출처 */
  sourceUrl: string;
  sourceName: string;
  /** 기준 연도 */
  baseYear: number;
  /** 내용 최종 확인일 (YYYY-MM-DD) */
  verifiedAt: string;
  /** 계산기 연결 */
  calculator?: "eitc" | "ctc";
  faq: { q: string; a: string }[];
  /** 관련 지원금 slug */
  related: string[];
  /** 진단 매칭 로직 */
  match: (p: Profile) => MatchVerdict;
}
