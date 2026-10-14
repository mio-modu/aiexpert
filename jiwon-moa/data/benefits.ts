import type { Benefit, Profile, MatchVerdict } from "@/lib/types";

const V = "2026-10-14"; // 데이터 최종 확인일

/* 소득 구간 → 대표값(원) : 매칭 판정에만 사용 */
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
function has(p: Profile, s: string) { return p.situations.includes(s); }
function isYouth(p: Profile) { return p.ageBand === "19to34"; }

/** 재산 구간이 2.4억 이상이면 장려금류 탈락 */
function assetBlocks(p: Profile) { return p.assetBand === "over240"; }

export const BENEFITS: Benefit[] = [
  /* ──────────────────── 1. 근로장려금 ──────────────────── */
  {
    slug: "geunro-jangryeogeum",
    name: "근로장려금",
    agency: "국세청",
    category: "tax",
    targets: ["worker", "lowincome", "soleproprietor"],
    summary:
      "일은 하지만 소득이 적은 가구에 국세청이 현금을 지급하는 제도. 가구 유형에 따라 연 최대 330만원까지 받습니다.",
    amount: "연 최대 165만~330만원 (가구 유형별)",
    amountMax: 3_300_000,
    period: "정기신청 5월 1~31일 / 반기신청 3월·9월 / 기한 후 신청 6월~11월 30일",
    conditions: [
      "근로·사업·종교인 소득이 있는 가구",
      "가구 유형별 연간 총소득이 기준 미만 (단독 2,200만원 / 홑벌이 3,200만원 / 맞벌이 4,400만원)",
      "전년도 6월 1일 기준 가구원 재산 합계 2억 4,000만원 미만",
      "재산이 1억 7,000만원 이상이면 산정액의 50%만 지급",
    ],
    howTo: [
      "국세청에서 보내준 안내문(카톡·우편·문자)의 개별인증번호를 확인합니다.",
      "홈택스 또는 손택스 앱에 접속해 '근로·자녀장려금 신청'을 선택합니다.",
      "안내 대상자는 주민번호와 인증번호만 넣으면 신청이 끝납니다.",
      "안내문을 못 받았다면 직접 소득·재산 자료를 입력해 신청합니다.",
      "심사 후 정기신청은 보통 8월 말, 반기신청은 심사 완료 후 지급됩니다.",
    ],
    applyUrl: "https://www.hometax.go.kr",
    sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2302&cntntsId=7707",
    sourceName: "국세청 근로·자녀장려금 안내",
    baseYear: 2025,
    verifiedAt: V,
    calculator: "eitc",
    faq: [
      { q: "근로장려금과 자녀장려금을 같이 받을 수 있나요?",
        a: "네. 두 제도는 요건이 달라 중복 수급이 가능합니다. 홈택스에서 한 번 신청하면 두 장려금을 함께 심사합니다." },
      { q: "안내문을 못 받았는데 신청할 수 있나요?",
        a: "가능합니다. 안내 대상이 아니어도 요건을 충족하면 홈택스에서 직접 신청할 수 있습니다. 다만 소득·재산 자료를 직접 입력해야 하고 심사에 시간이 더 걸립니다." },
      { q: "5월 신청을 놓쳤습니다.",
        a: "기한 후 신청이 11월 30일까지 가능합니다. 다만 산정액의 95%만 지급되므로 정기신청 기간을 지키는 것이 유리합니다." },
      { q: "재산이 1억 8천만원이면 얼마를 받나요?",
        a: "1억 7,000만원 이상 2억 4,000만원 미만 구간이므로 산정액의 50%를 받습니다. 2억 4,000만원 이상이면 지급되지 않습니다." },
    ],
    related: ["janyeo-jangryeogeum", "guminchuieop-jiwon", "cheongnyeon-doyak"],
    match: (p) => {
      if (assetBlocks(p)) return "unlikely";
      if (!has(p, "working") && !has(p, "business")) return "unlikely";
      const inc = incomeOf(p);
      if (inc === null || !p.household) return "maybe";
      const cutoff = p.household === "single" ? 22_000_000 : p.household === "single_earner" ? 32_000_000 : 44_000_000;
      if (inc >= cutoff) return "unlikely";
      return p.assetBand === "170to240" ? "maybe" : "likely";
    },
  },

  /* ──────────────────── 2. 자녀장려금 ──────────────────── */
  {
    slug: "janyeo-jangryeogeum",
    name: "자녀장려금",
    agency: "국세청",
    category: "tax",
    targets: ["parent", "lowincome", "worker", "singleparent"],
    summary:
      "18세 미만 자녀를 키우는 저소득 가구에 자녀 1명당 최대 100만원을 현금으로 지급합니다. 근로장려금과 중복으로 받을 수 있습니다.",
    amount: "자녀 1명당 연 50만~100만원",
    amountMax: 1_000_000,
    period: "정기신청 5월 1~31일 / 기한 후 신청 6월~11월 30일",
    conditions: [
      "18세 미만 부양자녀가 있는 가구",
      "부부 합산 연간 총소득 7,000만원 미만",
      "전년도 6월 1일 기준 가구원 재산 합계 2억 4,000만원 미만",
      "재산이 1억 7,000만원 이상이면 산정액의 50%만 지급",
    ],
    howTo: [
      "국세청 안내문의 개별인증번호를 준비합니다.",
      "홈택스·손택스에서 '근로·자녀장려금 신청'을 선택합니다.",
      "부양자녀 정보가 맞는지 확인합니다. 누락된 자녀가 있으면 추가로 입력합니다.",
      "근로장려금과 함께 한 번에 신청됩니다.",
    ],
    applyUrl: "https://www.hometax.go.kr",
    sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2302&cntntsId=7707",
    sourceName: "국세청 근로·자녀장려금 안내",
    baseYear: 2025,
    verifiedAt: V,
    calculator: "ctc",
    faq: [
      { q: "아동수당을 받고 있어도 자녀장려금을 받을 수 있나요?",
        a: "네. 아동수당은 보건복지부, 자녀장려금은 국세청 제도로 서로 별개입니다. 둘 다 받을 수 있습니다." },
      { q: "자녀세액공제와 중복되나요?",
        a: "자녀장려금을 받으면 같은 자녀에 대한 자녀세액공제는 적용되지 않습니다. 둘 중 유리한 쪽으로 적용됩니다." },
      { q: "자녀가 3명이면 300만원인가요?",
        a: "소득이 2,100만원 미만이라면 1명당 100만원씩 최대 300만원입니다. 소득이 높아질수록 1명당 금액이 50만원까지 줄어듭니다." },
    ],
    related: ["geunro-jangryeogeum", "adong-sudang", "bumo-geumyeo"],
    match: (p) => {
      if (assetBlocks(p)) return "unlikely";
      if (p.children <= 0) return "unlikely";
      const inc = incomeOf(p);
      if (inc === null) return "maybe";
      if (inc >= 70_000_000) return "unlikely";
      return p.assetBand === "170to240" ? "maybe" : "likely";
    },
  },

  /* ──────────────────── 3. 청년도약계좌 ──────────────────── */
  {
    slug: "cheongnyeon-doyak",
    name: "청년도약계좌",
    agency: "서민금융진흥원",
    category: "cash",
    targets: ["youth", "worker"],
    summary:
      "청년이 5년간 적립하면 정부가 기여금을 얹어주는 적금. 이자소득 비과세까지 더해 목돈 마련 효과가 큽니다.",
    amount: "월 최대 70만원 납입 · 정부기여금 월 최대 3.3만원 + 비과세",
    amountMax: null,
    period: "매월 가입 신청 (취급 은행 앱)",
    conditions: [
      "만 19~34세 청년 (병역 이행 기간은 나이에서 제외)",
      "직전 과세기간 총급여 7,500만원 이하 (기여금 지급은 6,000만원 이하)",
      "가구소득이 기준 중위소득의 250% 이하",
      "금융소득종합과세 대상자는 제외",
    ],
    howTo: [
      "취급 은행 앱에서 가입 신청 기간에 신청합니다.",
      "서민금융진흥원이 소득·가구소득 요건을 심사합니다.",
      "가입 가능 통보를 받으면 은행에서 계좌를 개설합니다.",
      "매월 자유롭게 납입하면 정부기여금이 함께 적립됩니다.",
    ],
    applyUrl: "https://ylaccount.kinfa.or.kr",
    sourceUrl: "https://www.kinfa.or.kr",
    sourceName: "서민금융진흥원",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "중도 해지하면 어떻게 되나요?",
        a: "원칙적으로 정부기여금과 비과세 혜택을 받을 수 없습니다. 다만 혼인·출산, 생애최초 주택구입 등 특별중도해지 사유에 해당하면 혜택을 유지한 채 해지할 수 있습니다." },
      { q: "청년희망적금을 가입했었는데 중복되나요?",
        a: "만기 또는 해지했다면 청년도약계좌에 가입할 수 있습니다. 동시 보유는 불가합니다." },
    ],
    related: ["geunro-jangryeogeum", "haetsalron-youth", "guminchuieop-jiwon"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 75_000_000) return "unlikely";
      if (!has(p, "working") && !has(p, "business")) return "maybe";
      return "likely";
    },
  },

  /* ──────────────────── 4. 국민취업지원제도 ──────────────────── */
  {
    slug: "guminchuieop-jiwon",
    name: "국민취업지원제도",
    agency: "고용노동부",
    category: "job",
    targets: ["jobseeker", "youth", "lowincome"],
    summary:
      "구직자에게 월 50만원의 구직촉진수당을 최대 6개월 지급하고 취업 상담·훈련까지 연계하는 제도입니다.",
    amount: "구직촉진수당 월 50만원 × 6개월 + 부양가족 추가 지원",
    amountMax: 3_000_000,
    period: "연중 상시 신청",
    conditions: [
      "15~69세 구직자",
      "Ⅰ유형: 가구소득이 기준 중위소득 60% 이하이고 재산 4억원 이하 (청년은 5억원 이하)",
      "최근 2년 안에 100일 또는 800시간 이상 취업 경험 (요건심사형)",
      "Ⅱ유형: 소득 요건이 더 완화되며 취업활동비용을 지원",
    ],
    howTo: [
      "고용24(work24.go.kr)에서 온라인으로 신청하거나 거주지 고용센터를 방문합니다.",
      "약 1개월간 자격 심사를 받습니다.",
      "수급 자격이 인정되면 상담사와 취업활동계획을 수립합니다.",
      "계획에 따라 구직활동을 이행하면 매월 수당이 지급됩니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "실업급여와 동시에 받을 수 있나요?",
        a: "아니요. 실업급여(구직급여)를 받는 기간에는 구직촉진수당이 지급되지 않습니다. 실업급여가 끝난 뒤 신청하는 것이 일반적입니다." },
      { q: "수당을 받으면서 아르바이트를 해도 되나요?",
        a: "소득이 발생하면 신고해야 하며, 월 소득이 일정 기준을 넘으면 수당이 감액되거나 중단될 수 있습니다." },
    ],
    related: ["naeil-baeumcard", "geunro-jangryeogeum", "cheongnyeon-doyak"],
    match: (p) => {
      if (!has(p, "jobseeking")) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 44_000_000) return "maybe";
      return "likely";
    },
  },

  /* ──────────────────── 5. 청년월세 특별지원 ──────────────────── */
  {
    slug: "cheongnyeon-wolse",
    name: "청년 월세 특별지원",
    agency: "국토교통부",
    category: "housing",
    targets: ["youth", "tenant"],
    summary:
      "무주택 청년의 월세를 월 최대 20만원씩 최장 12개월 지원합니다. 실제 납부한 임대료 범위에서 지급됩니다.",
    amount: "월 최대 20만원 × 최장 12개월 (최대 240만원)",
    amountMax: 2_400_000,
    period: "지자체별 모집 공고 시 신청 (연중 수시)",
    conditions: [
      "만 19~34세 무주택 청년",
      "보증금 5,000만원 이하, 월세 60만원 이하 주택에 거주 (보증금 환산액 합계 70만원 이하면 가능)",
      "청년 본인 소득이 기준 중위소득 60% 이하, 재산 1억 2,200만원 이하",
      "원가구 소득이 기준 중위소득 100% 이하, 재산 4억 7,000만원 이하",
    ],
    howTo: [
      "복지로 또는 마이홈포털에서 모집 공고를 확인합니다.",
      "복지로 온라인 신청 또는 주소지 행정복지센터를 방문합니다.",
      "임대차계약서, 월세 이체 증빙, 가족관계증명서를 제출합니다.",
      "소득·재산 조사 후 선정되면 매월 지정 계좌로 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.myhome.go.kr",
    sourceName: "마이홈포털",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "부모님 집에 살면서 전입신고만 따로 해도 되나요?",
        a: "안 됩니다. 실제로 임대차계약을 맺고 월세를 납부하며 독립 거주해야 합니다. 부모 소유 주택에 거주하는 경우는 제외됩니다." },
      { q: "기존에 지자체 월세 지원을 받고 있으면요?",
        a: "같은 성격의 월세 지원은 중복되지 않는 경우가 많습니다. 거주지 지자체 공고의 중복 불가 항목을 반드시 확인하세요." },
    ],
    related: ["cheongnyeon-jeonwolse-loan", "cheongnyeon-doyak", "geunro-jangryeogeum"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      if (p.housing === "own") return "unlikely";
      if (p.housing !== "wolse") return "maybe";
      const inc = incomeOf(p);
      if (inc !== null && inc > 32_000_000) return "maybe";
      return "likely";
    },
  },

  /* ──────────────────── 6. 청년 전월세보증금 대출 ──────────────────── */
  {
    slug: "cheongnyeon-jeonwolse-loan",
    name: "청년 전용 전월세보증금 대출",
    agency: "주택도시기금 · 국토교통부",
    category: "housing",
    targets: ["youth", "tenant", "newlywed"],
    summary:
      "청년 세입자가 낮은 금리로 전세·월세 보증금을 빌릴 수 있는 정책 대출입니다. 시중 전세대출보다 금리가 크게 낮습니다.",
    amount: "전세자금 최대 2억원 · 보증금 대출 최대 3,500만원 (저금리)",
    amountMax: null,
    period: "연중 상시 (임대차계약 후 잔금일 기준 기한 내)",
    conditions: [
      "만 19~34세 무주택 세대주 또는 예정자",
      "부부 합산 연소득 5,000만원 이하 (조건별 상이)",
      "순자산 기준 충족",
      "임대차계약을 체결하고 보증금의 5% 이상을 지급한 상태",
    ],
    howTo: [
      "주택도시기금 포털에서 상품별 요건을 확인합니다.",
      "기금 수탁 은행(우리·KB·신한·NH·하나)에 방문하거나 앱으로 신청합니다.",
      "임대차계약서, 소득·재직 증빙, 주민등록 서류를 제출합니다.",
      "심사 후 잔금일에 임대인 계좌로 대출금이 지급됩니다.",
    ],
    applyUrl: "https://nhuf.molit.go.kr",
    sourceUrl: "https://nhuf.molit.go.kr",
    sourceName: "주택도시기금",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "월세 지원과 같이 받을 수 있나요?",
        a: "성격이 다른 제도이므로 일반적으로 병행이 가능합니다. 다만 상품별 중복 제한이 있을 수 있어 은행 상담 시 확인이 필요합니다." },
      { q: "잔금을 이미 다 치렀는데 신청할 수 있나요?",
        a: "잔금을 전액 지급한 뒤에는 신청이 어렵습니다. 계약 후 잔금일 이전 또는 전입신고 후 3개월 이내 등 상품별 기한을 지켜야 합니다." },
    ],
    related: ["cheongnyeon-wolse", "cheongnyeon-doyak"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      if (p.housing === "own") return "unlikely";
      if (p.housing === "jeonse" || p.housing === "wolse" || has(p, "moving")) return "likely";
      return "maybe";
    },
  },

  /* ──────────────────── 7. 아동수당 ──────────────────── */
  {
    slug: "adong-sudang",
    name: "아동수당",
    agency: "보건복지부",
    category: "child",
    targets: ["parent"],
    summary:
      "8세 미만 모든 아동에게 소득과 무관하게 월 10만원을 지급합니다. 소득·재산 조사가 없습니다.",
    amount: "아동 1명당 월 10만원 (8세 미만)",
    amountMax: 1_200_000,
    period: "출생 후 언제든 신청 (신청한 달부터 지급)",
    conditions: [
      "만 8세 미만(0~95개월) 아동",
      "대한민국 국적의 주민등록 아동",
      "소득·재산 요건 없음",
    ],
    howTo: [
      "출생신고와 함께 '행복출산 원스톱 서비스'로 한 번에 신청하면 가장 편합니다.",
      "이미 출생신고를 했다면 복지로 또는 정부24에서 온라인 신청합니다.",
      "주민센터 방문 신청도 가능합니다.",
      "신청한 달부터 매월 25일 전후로 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "소득이 높아도 받을 수 있나요?",
        a: "네. 아동수당은 보편 수당이라 소득·재산과 무관하게 8세 미만 모든 아동에게 지급됩니다." },
      { q: "늦게 신청하면 소급해서 받나요?",
        a: "소급 지급되지 않습니다. 신청한 달부터 지급되므로 출생신고 때 함께 신청하는 것이 좋습니다." },
    ],
    related: ["bumo-geumyeo", "cheotmannam", "janyeo-jangryeogeum"],
    match: (p) => (p.children > 0 || has(p, "childcare") ? "likely" : "unlikely"),
  },

  /* ──────────────────── 8. 부모급여 ──────────────────── */
  {
    slug: "bumo-geumyeo",
    name: "부모급여",
    agency: "보건복지부",
    category: "child",
    targets: ["parent", "pregnant"],
    summary:
      "0~1세 아기를 키우는 가정에 매월 현금을 지급합니다. 어린이집을 이용하면 보육료 바우처로 전환됩니다.",
    amount: "0세 월 100만원 · 1세 월 50만원",
    amountMax: 12_000_000,
    period: "출생 후 60일 이내 신청 권장 (소급 지급 가능)",
    conditions: [
      "만 0~1세(0~23개월) 아동을 양육하는 가정",
      "소득·재산 요건 없음",
      "어린이집·종일제 아이돌봄 이용 시 바우처로 전환 지급",
    ],
    howTo: [
      "출생신고 시 '행복출산 원스톱 서비스'에서 함께 신청합니다.",
      "복지로 온라인 또는 주민센터 방문으로도 신청할 수 있습니다.",
      "출생 후 60일 이내에 신청하면 출생월부터 소급 지급됩니다.",
      "매월 25일 전후 지정 계좌로 입금됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "아동수당과 중복으로 받나요?",
        a: "네. 부모급여와 아동수당은 별개 제도로 함께 받을 수 있습니다." },
      { q: "어린이집에 보내면 못 받나요?",
        a: "현금 대신 보육료 바우처로 지급됩니다. 0세의 경우 보육료를 차감한 차액을 현금으로 받을 수 있습니다." },
    ],
    related: ["adong-sudang", "cheotmannam", "janyeo-jangryeogeum"],
    match: (p) => (has(p, "childcare") || has(p, "pregnant") ? "likely" : p.children > 0 ? "maybe" : "unlikely"),
  },

  /* ──────────────────── 9. 첫만남이용권 ──────────────────── */
  {
    slug: "cheotmannam",
    name: "첫만남이용권",
    agency: "보건복지부",
    category: "child",
    targets: ["pregnant", "parent"],
    summary:
      "출생 아동에게 200만원(둘째 이상 300만원) 상당의 바우처를 한 번에 지급합니다. 국민행복카드로 사용합니다.",
    amount: "첫째 200만원 · 둘째 이상 300만원 (일시금 바우처)",
    amountMax: 3_000_000,
    period: "출생일로부터 1년 이내 신청",
    conditions: [
      "2022년 1월 1일 이후 출생해 주민등록된 아동",
      "소득·재산 요건 없음",
      "바우처 사용 기한은 출생일로부터 2년",
    ],
    howTo: [
      "국민행복카드를 먼저 발급받습니다 (카드사 앱·은행·주민센터).",
      "복지로 또는 정부24에서 첫만남이용권을 신청합니다.",
      "출생신고 시 행복출산 원스톱 서비스로 함께 신청하면 편합니다.",
      "승인되면 국민행복카드에 포인트가 적립됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "어디에 쓸 수 있나요?",
        a: "유흥·사행업종 등 일부를 제외하고 대부분의 업종에서 사용할 수 있습니다. 산후조리원, 육아용품, 병원비 등에 많이 쓰입니다." },
      { q: "기한을 넘기면 어떻게 되나요?",
        a: "출생일로부터 2년이 지나면 잔액이 소멸됩니다. 신청은 출생 후 1년 이내에 해야 합니다." },
    ],
    related: ["bumo-geumyeo", "adong-sudang"],
    match: (p) => (has(p, "pregnant") || has(p, "childcare") ? "likely" : "unlikely"),
  },

  /* ──────────────────── 10. 기초연금 ──────────────────── */
  {
    slug: "gicho-yeongeum",
    name: "기초연금",
    agency: "보건복지부",
    category: "senior",
    targets: ["senior65", "lowincome"],
    summary:
      "65세 이상 어르신 중 소득 하위 70%에게 매월 연금을 지급합니다. 국민연금과 함께 받을 수 있습니다.",
    amount: "월 최대 약 34만원 (부부 동시 수급 시 각 20% 감액)",
    amountMax: 4_100_000,
    period: "만 65세 생일이 속한 달의 1개월 전부터 신청 가능",
    conditions: [
      "만 65세 이상 대한민국 국적자로 국내 거주",
      "가구 소득인정액이 선정기준액 이하 (소득 하위 70%)",
      "공무원연금 등 특수직역연금 수급자는 원칙적으로 제외",
    ],
    howTo: [
      "복지로에서 온라인 신청하거나 주민센터·국민연금공단 지사를 방문합니다.",
      "신분증, 통장 사본, 소득·재산 신고서를 제출합니다.",
      "소득인정액 조사 후 결과를 통보받습니다.",
      "매월 25일 지정 계좌로 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://basicpension.mohw.go.kr",
    sourceName: "기초연금 공식 사이트",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "국민연금을 받으면 기초연금이 깎이나요?",
        a: "국민연금 수령액이 많으면 기초연금이 일부 감액될 수 있습니다. 다만 두 연금을 함께 받는 것 자체는 가능합니다." },
      { q: "자녀 소득도 보나요?",
        a: "아니요. 본인과 배우자의 소득·재산만 봅니다. 다만 자녀 명의 고가 주택에 거주하면 무료임차소득이 반영될 수 있습니다." },
    ],
    related: ["energy-voucher", "munhwa-nuri", "gingeub-bokji"],
    match: (p) => (p.ageBand === "over65" ? (p.assetBand === "over240" ? "maybe" : "likely") : "unlikely"),
  },

  /* ──────────────────── 11. 에너지바우처 ──────────────────── */
  {
    slug: "energy-voucher",
    name: "에너지바우처",
    agency: "한국에너지공단",
    category: "living",
    targets: ["lowincome", "senior65", "disabled"],
    summary:
      "취약계층의 전기·도시가스·난방 요금을 바우처로 지원합니다. 여름·겨울 냉난방비 부담을 줄여줍니다.",
    amount: "가구원 수에 따라 연 약 30만~70만원 (여름+겨울)",
    amountMax: 700_000,
    period: "여름 바우처 5~9월 / 겨울 바우처 10월~다음해 4월 (신청은 보통 5~12월)",
    conditions: [
      "생계·의료·주거·교육급여 수급자",
      "세대원 중 노인, 영유아, 장애인, 임산부, 중증·희귀질환자, 한부모·소년소녀가정 등 포함",
      "보장시설 수급자 등 일부 제외",
    ],
    howTo: [
      "주민센터를 방문하거나 복지로에서 온라인 신청합니다.",
      "신분증과 바우처 사용 희망 방식(요금 차감 또는 국민행복카드)을 선택합니다.",
      "승인되면 전기·가스 요금에서 자동 차감되거나 카드로 사용합니다.",
    ],
    applyUrl: "https://www.energyvoucher.or.kr",
    sourceUrl: "https://www.energyvoucher.or.kr",
    sourceName: "에너지바우처",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "전기요금 복지할인과 중복되나요?",
        a: "네. 에너지바우처와 전기요금 복지할인은 별개 제도로 함께 적용받을 수 있습니다." },
      { q: "안 쓰면 다음 해로 넘어가나요?",
        a: "이월되지 않습니다. 사용 기간이 지나면 잔액이 소멸하므로 기간 내에 사용해야 합니다." },
    ],
    related: ["gicho-yeongeum", "munhwa-nuri", "gingeub-bokji"],
    match: (p) => {
      if (!has(p, "lowincome")) return p.ageBand === "over65" ? "maybe" : "unlikely";
      return "likely";
    },
  },

  /* ──────────────────── 12. 국민내일배움카드 ──────────────────── */
  {
    slug: "naeil-baeumcard",
    name: "국민내일배움카드",
    agency: "고용노동부",
    category: "edu",
    targets: ["jobseeker", "worker", "youth", "soleproprietor"],
    summary:
      "직업훈련 비용을 5년간 300만~500만원까지 지원합니다. 재직자·구직자·자영업자 모두 발급받을 수 있습니다.",
    amount: "5년간 300만~500만원 (훈련비의 45~85% 지원)",
    amountMax: 5_000_000,
    period: "연중 상시 발급",
    conditions: [
      "구직자, 재직자, 자영업자 등 대부분의 국민",
      "현직 공무원, 사립학교 교직원, 졸업까지 2년 넘게 남은 재학생 등은 제외",
      "연 매출 1억 5,000만원 이상 자영업자는 제외",
    ],
    howTo: [
      "고용24(work24.go.kr)에서 온라인 발급 신청합니다.",
      "훈련 안내 동영상을 시청하고 직업훈련 상담을 받습니다.",
      "카드 발급 후 원하는 훈련 과정을 검색해 수강 신청합니다.",
      "자기부담금을 제외한 훈련비가 카드에서 결제됩니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "훈련비를 전액 지원받을 수 있나요?",
        a: "과정과 요건에 따라 45~85%를 지원하고 나머지는 자기부담입니다. 국가기간전략산업직종 등 일부 과정은 전액 지원됩니다." },
      { q: "국민취업지원제도와 함께 쓸 수 있나요?",
        a: "네. 국민취업지원제도 참여자는 내일배움카드로 훈련을 받으며 수당을 함께 받을 수 있습니다." },
    ],
    related: ["guminchuieop-jiwon", "pyeongsaeng-education"],
    match: (p) =>
      has(p, "jobseeking") || has(p, "working") || has(p, "business") || has(p, "study") ? "likely" : "maybe",
  },

  /* ──────────────────── 13. 햇살론유스 ──────────────────── */
  {
    slug: "haetsalron-youth",
    name: "햇살론유스",
    agency: "서민금융진흥원",
    category: "cash",
    targets: ["youth", "student", "jobseeker"],
    summary:
      "소득이 적거나 사회초년생인 청년에게 낮은 금리로 생활자금을 빌려주는 정책 서민금융 상품입니다.",
    amount: "최대 1,200만원 (연 3.6% 수준 고정금리)",
    amountMax: 12_000_000,
    period: "연중 상시",
    conditions: [
      "만 19~34세 청년",
      "연소득 3,500만원 이하",
      "대학(원)생, 취업준비생, 사회초년생(중소기업 재직 1년 이하) 등",
      "신용평점 하위 20% 이하 등 요건은 상품별 상이",
    ],
    howTo: [
      "서민금융진흥원 앱 또는 서민금융통합지원센터에서 상담합니다.",
      "보증 심사를 받습니다.",
      "승인되면 협약 은행에서 대출을 실행합니다.",
    ],
    applyUrl: "https://www.kinfa.or.kr",
    sourceUrl: "https://www.kinfa.or.kr",
    sourceName: "서민금융진흥원",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "대출이라 부담스러운데 지원금은 없나요?",
        a: "햇살론유스는 대출 상품입니다. 상환 부담이 없는 지원금을 원한다면 국민취업지원제도나 청년월세 지원을 먼저 확인하세요." },
    ],
    related: ["cheongnyeon-doyak", "guminchuieop-jiwon"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 35_000_000) return "unlikely";
      return "maybe";
    },
  },

  /* ──────────────────── 14. 소상공인 정책자금 ──────────────────── */
  {
    slug: "sosanggongin-jageum",
    name: "소상공인 정책자금",
    agency: "소상공인시장진흥공단",
    category: "business",
    targets: ["soleproprietor"],
    summary:
      "소상공인에게 시중보다 낮은 금리로 창업·운영 자금을 융자합니다. 자금 종류별로 한도와 요건이 다릅니다.",
    amount: "자금 종류별 최대 7,000만원~2억원 (저금리 융자)",
    amountMax: null,
    period: "연초 공고 후 예산 소진 시까지 (수시)",
    conditions: [
      "상시근로자 수와 매출액이 소상공인 기준을 충족하는 사업자",
      "자금 종류별 업종·업력·신용 요건 충족",
      "유흥업 등 일부 제외 업종 있음",
    ],
    howTo: [
      "소상공인정책자금 누리집에서 자금 종류와 공고를 확인합니다.",
      "온라인으로 신청하고 서류를 제출합니다.",
      "공단 또는 은행에서 신용·사업성 평가를 받습니다.",
      "승인되면 직접대출 또는 은행 대리대출로 자금이 지급됩니다.",
    ],
    applyUrl: "https://ols.sbiz.or.kr",
    sourceUrl: "https://www.semas.or.kr",
    sourceName: "소상공인시장진흥공단",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "신용점수가 낮으면 안 되나요?",
        a: "자금 종류에 따라 다릅니다. 저신용 소상공인을 위한 전용 자금이 별도로 운영되므로 해당 공고를 확인하세요." },
      { q: "근로장려금도 같이 받을 수 있나요?",
        a: "네. 사업소득이 있는 소상공인도 소득 요건을 충족하면 근로장려금을 받을 수 있습니다." },
    ],
    related: ["geunro-jangryeogeum", "naeil-baeumcard"],
    match: (p) => (has(p, "business") ? "likely" : has(p, "startup") ? "maybe" : "unlikely"),
  },

  /* ──────────────────── 15. 긴급복지지원 ──────────────────── */
  {
    slug: "gingeub-bokji",
    name: "긴급복지지원",
    agency: "보건복지부",
    category: "cash",
    targets: ["lowincome"],
    summary:
      "갑작스러운 실직·질병·사고로 생계가 어려워진 가구에 생계비·의료비·주거비를 신속하게 지원합니다.",
    amount: "4인 가구 생계비 약 월 183만원 (최대 6개월) · 의료비 최대 300만원",
    amountMax: 3_000_000,
    period: "위기 상황 발생 시 즉시 (상시)",
    conditions: [
      "주 소득자의 사망·실직·질병 등으로 생계유지가 곤란한 위기 상황",
      "소득이 기준 중위소득 75% 이하",
      "재산 및 금융재산 기준 충족",
    ],
    howTo: [
      "보건복지상담센터(129) 또는 주민센터에 지원을 요청합니다.",
      "현장 확인을 거쳐 선지원 후 사후 조사가 이루어집니다.",
      "통상 신청 후 며칠 안에 지원이 결정됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "기초생활수급자도 받을 수 있나요?",
        a: "이미 동일한 내용의 지원을 받고 있으면 중복 지원되지 않습니다. 다만 의료비 등 항목에 따라 가능한 경우가 있어 상담이 필요합니다." },
      { q: "얼마나 빨리 받을 수 있나요?",
        a: "선지원 원칙이라 위기 상황이 확인되면 수일 내에 지원됩니다." },
    ],
    related: ["energy-voucher", "gicho-yeongeum", "guminchuieop-jiwon"],
    match: (p) => (has(p, "crisis") ? "likely" : has(p, "lowincome") ? "maybe" : "unlikely"),
  },

  /* ──────────────────── 16. 문화누리카드 ──────────────────── */
  {
    slug: "munhwa-nuri",
    name: "문화누리카드",
    agency: "한국문화예술위원회",
    category: "living",
    targets: ["lowincome", "senior65", "disabled"],
    summary:
      "기초생활수급자·차상위계층에게 문화·여행·체육 활동에 쓸 수 있는 연간 바우처를 지급합니다.",
    amount: "1인당 연 14만원",
    amountMax: 140_000,
    period: "보통 2월~11월 발급·충전 (연내 사용)",
    conditions: [
      "6세 이상 기초생활수급자 또는 차상위계층",
      "1인당 1매 발급",
    ],
    howTo: [
      "문화누리카드 누리집 또는 주민센터에서 발급 신청합니다.",
      "기존 카드 보유자는 자동 재충전되는 경우가 많습니다.",
      "공연·영화·도서·여행·체육시설 등 가맹점에서 사용합니다.",
    ],
    applyUrl: "https://www.mnuri.kr",
    sourceUrl: "https://www.mnuri.kr",
    sourceName: "문화누리카드",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "잔액이 남으면 이월되나요?",
        a: "이월되지 않고 연말에 소멸합니다. 기간 내에 사용해야 합니다." },
    ],
    related: ["energy-voucher", "gicho-yeongeum"],
    match: (p) => (has(p, "lowincome") ? "likely" : "unlikely"),
  },

  /* ──────────────────── 17. 평생교육이용권 ──────────────────── */
  {
    slug: "pyeongsaeng-education",
    name: "평생교육이용권",
    agency: "교육부 · 국가평생교육진흥원",
    category: "edu",
    targets: ["lowincome", "jobseeker", "youth", "senior65"],
    summary:
      "성인 학습자에게 평생교육 강좌 수강료를 지원하는 바우처입니다. 어학·자격증·취미 강좌에 쓸 수 있습니다.",
    amount: "1인당 연 35만원 (장애인은 추가 지원)",
    amountMax: 350_000,
    period: "연 1~2회 모집 (보통 상반기)",
    conditions: [
      "만 19세 이상 성인",
      "기초생활수급자·차상위계층 우선, 기준 중위소득 65% 이하 등 소득 요건",
      "선정 인원 제한으로 경쟁 선발",
    ],
    howTo: [
      "평생교육바우처 누리집에서 모집 공고 기간에 신청합니다.",
      "소득 증빙 서류를 제출합니다.",
      "선정되면 이용권이 발급되고 지정 기관 강좌를 수강합니다.",
    ],
    applyUrl: "https://www.lllcard.kr",
    sourceUrl: "https://www.lllcard.kr",
    sourceName: "평생교육바우처",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "내일배움카드와 중복되나요?",
        a: "목적이 다른 제도로 병행이 가능한 경우가 많습니다. 다만 같은 강좌에 두 지원을 동시에 쓸 수는 없습니다." },
    ],
    related: ["naeil-baeumcard", "munhwa-nuri"],
    match: (p) => (has(p, "study") ? "likely" : has(p, "lowincome") ? "maybe" : "unlikely"),
  },

  /* ──────────────────── 18. 전기요금 복지할인 ──────────────────── */
  {
    slug: "jeongi-halin",
    name: "전기요금 복지할인",
    agency: "한국전력공사",
    category: "living",
    targets: ["lowincome", "senior65", "disabled", "parent"],
    summary:
      "취약계층과 다자녀·대가족 가구의 전기요금을 매월 깎아줍니다. 한 번 신청하면 계속 적용됩니다.",
    amount: "월 최대 1만 6,000원 할인 (여름철 상향)",
    amountMax: 192_000,
    period: "연중 상시 (한 번 신청하면 지속 적용)",
    conditions: [
      "기초생활수급자, 차상위계층, 장애인, 상이·독립유공자",
      "3자녀 이상 다자녀 가구, 5인 이상 대가족, 출산 가구",
      "사회복지시설 등",
    ],
    howTo: [
      "한전 사이버지점 또는 복지로에서 온라인 신청합니다.",
      "한전 고객센터(123) 전화로도 신청할 수 있습니다.",
      "주민센터에서 다른 복지 신청 시 함께 접수할 수 있습니다.",
      "적용되면 매월 청구서에서 자동 할인됩니다.",
    ],
    applyUrl: "https://cyber.kepco.co.kr",
    sourceUrl: "https://cyber.kepco.co.kr",
    sourceName: "한국전력 사이버지점",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "전세로 살아도 받을 수 있나요?",
        a: "전기요금 명의자가 본인이면 가능합니다. 관리비에 포함되어 한전과 직접 계약이 없는 경우에는 관리사무소를 통해 확인해야 합니다." },
      { q: "에너지바우처와 중복되나요?",
        a: "네. 두 제도는 별개로 함께 받을 수 있습니다." },
    ],
    related: ["energy-voucher", "munhwa-nuri", "adong-sudang"],
    match: (p) => {
      if (has(p, "lowincome")) return "likely";
      if (p.children >= 3) return "likely";
      if (p.ageBand === "over65") return "maybe";
      return "unlikely";
    },
  },
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
