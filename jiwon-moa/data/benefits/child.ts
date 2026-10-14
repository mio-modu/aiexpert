import type { Benefit } from "@/lib/types";
import { V, has, isLowIncome } from "./shared";

export const CHILD_BENEFITS: Benefit[] = [
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
    related: ["adong-sudang", "cheotmannam", "boyukryo-jiwon"],
    match: (p) => (has(p, "childcare") || has(p, "pregnant") ? "likely" : p.children > 0 ? "maybe" : "unlikely"),
  },

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
    related: ["bumo-geumyeo", "imsin-chulsan-jinryo", "adong-sudang"],
    match: (p) => (has(p, "pregnant") || has(p, "childcare") ? "likely" : "unlikely"),
  },

  {
    slug: "imsin-chulsan-jinryo",
    name: "임신·출산 진료비 지원",
    agency: "보건복지부 · 국민건강보험공단",
    category: "child",
    targets: ["pregnant"],
    summary:
      "임신하면 국민행복카드에 진료비 바우처를 넣어줍니다. 산전검사·분만비·약제비에 쓸 수 있습니다.",
    amount: "단태아 100만원 · 다태아 140만원 (분만취약지 추가)",
    amountMax: 1_400_000,
    period: "임신 확인 후부터 분만예정일 이후 2년까지 사용",
    conditions: [
      "임신이 확인된 건강보험 가입자 또는 피부양자",
      "소득·재산 요건 없음",
      "의료기관에서 임신확인서 발급 필요",
    ],
    howTo: [
      "산부인과에서 임신확인서를 발급받습니다.",
      "카드사·은행 또는 정부24·공단에서 국민행복카드를 신청합니다.",
      "바우처가 카드에 충전됩니다.",
      "산부인과·약국 등에서 결제 시 자동 차감됩니다.",
    ],
    applyUrl: "https://www.nhis.or.kr",
    sourceUrl: "https://www.nhis.or.kr",
    sourceName: "국민건강보험공단",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "첫만남이용권과 같은 카드인가요?",
        a: "둘 다 국민행복카드로 받지만 별개 바우처입니다. 사용처와 기한이 다르므로 잔액을 따로 확인하세요." },
      { q: "유산한 경우에도 쓸 수 있나요?",
        a: "임신 중단 시에도 관련 진료비에 사용할 수 있는 경우가 있습니다. 공단에 확인이 필요합니다." },
    ],
    related: ["cheotmannam", "bumo-geumyeo", "sanhu-joli"],
    match: (p) => (has(p, "pregnant") ? "likely" : "unlikely"),
  },

  {
    slug: "boyukryo-jiwon",
    name: "영유아 보육료·유아학비 지원",
    agency: "보건복지부 · 교육부",
    category: "child",
    targets: ["parent"],
    summary:
      "어린이집에 다니는 0~5세 아동의 보육료와 유치원에 다니는 3~5세 아동의 학비를 지원합니다.",
    amount: "연령별 정부지원 단가 전액 (기관 유형별 차액 발생 가능)",
    amountMax: null,
    period: "연중 상시 (입소·입학 전 신청)",
    conditions: [
      "어린이집·유치원에 다니는 0~5세 아동",
      "소득·재산 요건 없음",
      "국민행복카드(아이행복카드)로 결제",
    ],
    howTo: [
      "국민행복카드를 발급받습니다.",
      "복지로 또는 주민센터에서 보육료·유아학비를 신청합니다.",
      "어린이집·유치원에 등록하면 카드로 자동 결제됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "부모급여와 중복되나요?",
        a: "0~1세는 부모급여가 보육료 바우처로 전환되어 지급됩니다. 중복 수급이 아니라 형태가 바뀌는 구조입니다." },
      { q: "가정양육하면 못 받나요?",
        a: "기관을 이용하지 않으면 가정양육수당 또는 부모급여 현금 지급으로 받습니다." },
    ],
    related: ["bumo-geumyeo", "aidolbom", "adong-sudang"],
    match: (p) => (has(p, "childcare") || p.children > 0 ? "likely" : "unlikely"),
  },

  {
    slug: "aidolbom",
    name: "아이돌봄서비스",
    agency: "여성가족부",
    category: "child",
    targets: ["parent", "singleparent", "worker"],
    summary:
      "맞벌이 등으로 아이를 돌보기 어려운 가정에 아이돌보미가 방문해 돌봐줍니다. 소득에 따라 이용요금을 지원합니다.",
    amount: "소득 구간별 이용요금의 15~90% 지원",
    amountMax: null,
    period: "연중 상시 신청",
    conditions: [
      "만 12세 이하 아동이 있는 가정",
      "맞벌이, 한부모, 다자녀, 장애부모 등 돌봄 공백 가정 우선",
      "소득 구간(가형~라형)에 따라 지원 비율 차등",
    ],
    howTo: [
      "아이돌봄서비스 홈페이지 또는 주민센터에서 정부지원 판정을 신청합니다.",
      "소득 판정 결과를 통보받습니다.",
      "홈페이지·앱에서 서비스를 신청하고 돌보미와 연결됩니다.",
      "국민행복카드로 결제하면 지원금이 차감됩니다.",
    ],
    applyUrl: "https://www.idolbom.go.kr",
    sourceUrl: "https://www.idolbom.go.kr",
    sourceName: "아이돌봄서비스",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "대기가 길다던데요?",
        a: "지역과 시간대에 따라 대기가 발생합니다. 정기 이용을 원한다면 미리 신청해두는 것이 좋습니다." },
    ],
    related: ["boyukryo-jiwon", "hanbumo-yangyukbi", "bumo-geumyeo"],
    match: (p) => {
      if (p.children <= 0 && !has(p, "childcare")) return "unlikely";
      if (p.household === "dual_earner" || has(p, "singleparent")) return "likely";
      return "maybe";
    },
  },

  {
    slug: "hanbumo-yangyukbi",
    name: "한부모가족 아동양육비",
    agency: "여성가족부",
    category: "child",
    targets: ["singleparent", "parent", "lowincome"],
    summary:
      "저소득 한부모·조손 가정의 자녀 양육비를 매월 현금으로 지원합니다. 청소년 한부모는 더 많이 받습니다.",
    amount: "자녀 1명당 월 21만원 수준 (청소년 한부모는 상향)",
    amountMax: 2_520_000,
    period: "연중 상시 신청",
    conditions: [
      "18세 미만(취학 시 22세 미만) 자녀를 양육하는 한부모·조손가정",
      "가구 소득인정액이 기준 중위소득 63% 이하",
      "청소년 한부모(만 24세 이하)는 기준 완화 및 추가 지원",
    ],
    howTo: [
      "주소지 행정복지센터 또는 복지로에서 한부모가족 지원을 신청합니다.",
      "가족관계증명서와 소득·재산 서류를 제출합니다.",
      "소득 조사 후 한부모가족증명서가 발급됩니다.",
      "매월 지정 계좌로 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.mogef.go.kr",
    sourceName: "여성가족부",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "이혼하지 않고 별거 중이어도 되나요?",
        a: "법률혼 관계가 유지되면 원칙적으로 한부모가족으로 인정되기 어렵습니다. 다만 배우자의 장기 부재 등 예외 사유가 있으니 상담받으세요." },
      { q: "자녀장려금과 중복되나요?",
        a: "네. 소관 부처가 달라 요건을 각각 충족하면 함께 받을 수 있습니다." },
    ],
    related: ["janyeo-jangryeogeum", "aidolbom", "saenggye-geubyeo"],
    match: (p) => {
      if (!has(p, "singleparent")) return "unlikely";
      if (p.children <= 0) return "maybe";
      return isLowIncome(p) ? "likely" : "maybe";
    },
  },

  {
    slug: "sanhu-joli",
    name: "산후조리 비용 지원",
    agency: "지방자치단체",
    category: "child",
    targets: ["pregnant", "parent"],
    summary:
      "출산 가정의 산후조리원 이용료나 산모·신생아 건강관리 서비스 비용을 지자체가 지원합니다.",
    amount: "지자체별 상이 (산모·신생아 건강관리 바우처 포함)",
    amountMax: null,
    period: "출산 전 40일부터 출산 후 30일 이내 신청이 일반적",
    conditions: [
      "해당 지자체에 일정 기간 이상 주민등록을 둔 출산 가정",
      "산모·신생아 건강관리 서비스는 기준 중위소득 150% 이하가 기본 (지자체별 확대)",
      "지자체마다 금액과 요건이 크게 다름",
    ],
    howTo: [
      "거주지 보건소 또는 복지로에서 산모·신생아 건강관리 서비스를 신청합니다.",
      "지자체 자체 산후조리비 지원은 시·군·구청 공고를 확인합니다.",
      "국민행복카드로 바우처를 사용합니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "우리 동네는 얼마나 주나요?",
        a: "지자체마다 금액과 요건이 완전히 다릅니다. 거주지 시·군·구청 또는 보건소 공고를 직접 확인하셔야 합니다." },
    ],
    related: ["imsin-chulsan-jinryo", "cheotmannam", "bumo-geumyeo"],
    match: (p) => (has(p, "pregnant") ? "likely" : has(p, "childcare") ? "maybe" : "unlikely"),
  },
];
