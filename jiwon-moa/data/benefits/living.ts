import type { Benefit } from "@/lib/types";
import { V, has, isSenior, isLowIncome } from "./shared";

export const LIVING_BENEFITS: Benefit[] = [
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
    related: ["jeongi-halin", "dosigaseu-halin", "munhwa-nuri"],
    match: (p) => {
      if (has(p, "lowincome")) return "likely";
      return isSenior(p) ? "maybe" : "unlikely";
    },
  },

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
      { q: "자녀가 셋이면 소득과 상관없나요?",
        a: "다자녀 할인은 소득 요건 없이 주민등록상 자녀 수로 판단합니다. 신청하지 않으면 적용되지 않으니 꼭 신청하세요." },
    ],
    related: ["energy-voucher", "dosigaseu-halin", "tongsin-gammyeon"],
    match: (p) => {
      if (has(p, "lowincome")) return "likely";
      if (p.children >= 3) return "likely";
      if (isSenior(p) || has(p, "disabled")) return "maybe";
      return "unlikely";
    },
  },

  {
    slug: "dosigaseu-halin",
    name: "도시가스 요금 경감",
    agency: "산업통상자원부 · 도시가스사",
    category: "living",
    targets: ["lowincome", "disabled", "parent", "senior65"],
    summary:
      "사회적 배려 대상자의 도시가스 요금을 깎아줍니다. 특히 난방을 많이 쓰는 겨울에 감면폭이 큽니다.",
    amount: "동절기 월 최대 수만원 (대상·계절별 차등)",
    amountMax: null,
    period: "연중 상시 신청",
    conditions: [
      "기초생활수급자, 차상위계층",
      "장애인, 국가유공자, 독립유공자",
      "다자녀 가구, 다문화 가구",
    ],
    howTo: [
      "거주지 도시가스사 고객센터에 신청합니다.",
      "복지로 또는 주민센터에서 일괄 신청할 수도 있습니다.",
      "증빙서류 확인 후 요금에서 자동 감면됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "지역난방도 되나요?",
        a: "지역난방은 도시가스와 별도 체계입니다. 한국지역난방공사 등 공급사에 별도로 문의해야 합니다." },
    ],
    related: ["jeongi-halin", "energy-voucher", "tongsin-gammyeon"],
    match: (p) => {
      if (has(p, "lowincome") || has(p, "disabled")) return "likely";
      if (p.children >= 3) return "maybe";
      return "unlikely";
    },
  },

  {
    slug: "tongsin-gammyeon",
    name: "통신요금 감면",
    agency: "과학기술정보통신부",
    category: "living",
    targets: ["lowincome", "senior65", "disabled"],
    summary:
      "기초수급자·차상위·장애인·65세 이상 기초연금 수급자의 휴대폰 요금을 매월 깎아줍니다. 가구원도 일부 적용됩니다.",
    amount: "대상별 월 최대 2만 6,000원 + 통화료 추가 감면",
    amountMax: 312_000,
    period: "연중 상시 (한 번 신청하면 지속 적용)",
    conditions: [
      "기초생활수급자, 차상위계층",
      "장애인, 국가유공자",
      "만 65세 이상 기초연금 수급자",
    ],
    howTo: [
      "정부24 또는 복지로에서 온라인 신청합니다.",
      "통신사 대리점이나 고객센터(국번없이 1523)에서도 가능합니다.",
      "확인 후 다음 달 요금부터 자동 감면됩니다.",
    ],
    applyUrl: "https://www.gov.kr",
    sourceUrl: "https://www.msit.go.kr",
    sourceName: "과학기술정보통신부",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "알뜰폰도 되나요?",
        a: "감면 제도에 참여하는 알뜰폰 사업자라면 가능합니다. 가입 전 해당 사업자에 확인하세요." },
      { q: "가족도 받나요?",
        a: "기초수급·차상위 가구는 가구원 중 일부도 감면 대상이 될 수 있습니다. 1523으로 문의하세요." },
    ],
    related: ["jeongi-halin", "energy-voucher", "gicho-yeongeum"],
    match: (p) => {
      if (has(p, "lowincome") || has(p, "disabled")) return "likely";
      return isSenior(p) ? "likely" : "unlikely";
    },
  },

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
      { q: "가족이 함께 쓸 수 있나요?",
        a: "1인당 1매이지만 가족 카드끼리 합산해 결제할 수 있는 가맹점이 있습니다." },
    ],
    related: ["energy-voucher", "pyeongsaeng-education", "saenggye-geubyeo"],
    match: (p) => (has(p, "lowincome") ? "likely" : "unlikely"),
  },

  {
    slug: "jaenanjeok-uiryobi",
    name: "재난적의료비 지원",
    agency: "보건복지부 · 국민건강보험공단",
    category: "living",
    targets: ["lowincome", "disabled", "senior65"],
    summary:
      "소득에 비해 과도한 의료비가 발생했을 때 본인부담 의료비의 상당 부분을 지원합니다. 비급여도 일부 포함됩니다.",
    amount: "연간 최대 5,000만원 (소득구간별 50~80% 지원)",
    amountMax: 50_000_000,
    period: "퇴원일 또는 최종 진료일로부터 180일 이내",
    conditions: [
      "기준 중위소득 100% 이하 가구 (초과 시에도 일부 지원 가능)",
      "재산 과세표준액 기준 충족",
      "연간 본인부담 의료비가 가구 연소득의 일정 비율을 초과",
      "입원은 질환 제한 없음, 외래는 중증질환 중심",
    ],
    howTo: [
      "국민건강보험공단 지사에 신청합니다.",
      "진료비 영수증, 소득·재산 서류, 가족관계증명서를 제출합니다.",
      "심사를 거쳐 지원 여부와 금액이 결정됩니다.",
      "퇴원 전 미리 상담하면 중간 지원도 가능합니다.",
    ],
    applyUrl: "https://www.nhis.or.kr",
    sourceUrl: "https://www.nhis.or.kr",
    sourceName: "국민건강보험공단",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "실손보험이 있으면 못 받나요?",
        a: "실손보험금으로 보전받은 금액은 지원 대상에서 제외됩니다. 나머지 본인부담분에 대해 심사합니다." },
      { q: "기한을 놓치면요?",
        a: "퇴원일로부터 180일이 지나면 신청할 수 없습니다. 퇴원 직후 바로 확인하세요." },
    ],
    related: ["uiryo-geubyeo", "gingeub-bokji", "janggi-yoyang"],
    match: (p) => (has(p, "crisis") ? "likely" : isLowIncome(p) ? "maybe" : "unlikely"),
  },

  {
    slug: "jangaein-yeongeum",
    name: "장애인연금·장애수당",
    agency: "보건복지부",
    category: "living",
    targets: ["disabled", "lowincome", "senior65"],
    summary:
      "중증장애인에게 매월 연금을 지급하고, 경증장애인에게는 장애수당을 지급해 생활을 지원합니다.",
    amount: "장애인연금 월 최대 약 43만원 · 장애수당 월 6만원 수준",
    amountMax: 5_160_000,
    period: "연중 상시 신청",
    conditions: [
      "만 18세 이상 등록 장애인",
      "장애인연금은 중증장애인(종전 1~3급 중복) 대상",
      "소득인정액이 선정기준액 이하",
      "경증장애인은 장애수당 대상",
    ],
    howTo: [
      "주소지 행정복지센터 또는 복지로에서 신청합니다.",
      "장애정도 심사가 필요한 경우 국민연금공단에서 진행합니다.",
      "소득·재산 조사 후 결정됩니다.",
      "매월 지정 계좌로 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "기초연금과 같이 받나요?",
        a: "65세가 되면 장애인연금 대신 기초연금으로 전환되는 것이 일반적입니다. 더 유리한 쪽으로 안내받을 수 있습니다." },
      { q: "장애등급이 폐지됐다던데요?",
        a: "등급제는 폐지되고 '장애의 정도가 심한 장애인(중증)·심하지 않은 장애인(경증)'으로 구분됩니다. 연금은 중증이 대상입니다." },
    ],
    related: ["jangaein-hwaldong-jiwon", "uiryo-geubyeo", "gicho-yeongeum"],
    match: (p) => (has(p, "disabled") ? "likely" : "unlikely"),
  },

  {
    slug: "jangaein-hwaldong-jiwon",
    name: "장애인 활동지원서비스",
    agency: "보건복지부",
    category: "living",
    targets: ["disabled", "lowincome"],
    summary:
      "혼자 일상생활이 어려운 장애인에게 활동지원사가 방문해 신체활동·가사·이동을 돕습니다.",
    amount: "월 최대 수백만원 상당 바우처 (종합조사 결과별)",
    amountMax: null,
    period: "연중 상시 신청",
    conditions: [
      "만 6~64세 등록 장애인",
      "서비스지원 종합조사 결과에 따라 구간 결정",
      "소득에 따라 본인부담금 차등 (수급자는 면제)",
    ],
    howTo: [
      "주소지 행정복지센터 또는 복지로에서 신청합니다.",
      "국민연금공단의 서비스지원 종합조사를 받습니다.",
      "구간이 결정되면 활동지원기관과 계약합니다.",
      "국민행복카드로 서비스 비용이 결제됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "65세가 되면 어떻게 되나요?",
        a: "원칙적으로 노인장기요양으로 전환되지만, 요건에 따라 활동지원을 계속 받을 수 있는 특례가 있습니다." },
    ],
    related: ["jangaein-yeongeum", "janggi-yoyang", "uiryo-geubyeo"],
    match: (p) => (has(p, "disabled") ? "likely" : "unlikely"),
  },
];
