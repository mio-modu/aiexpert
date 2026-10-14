import type { Benefit } from "@/lib/types";
import { V, has, incomeOf, isYouth, isLowIncome, isEarning } from "./shared";

export const CASH_BENEFITS: Benefit[] = [
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
      { q: "청년내일저축계좌와 같이 되나요?",
        a: "두 제도는 운영 부처가 다르며 동시 가입이 가능한 경우가 있습니다. 가입 전 각 기관에 중복 가능 여부를 확인하세요." },
    ],
    related: ["cheongnyeon-naeil-jeochuk", "geunro-jangryeogeum", "haetsalron-youth"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 75_000_000) return "unlikely";
      if (!isEarning(p)) return "maybe";
      return "likely";
    },
  },

  {
    slug: "cheongnyeon-naeil-jeochuk",
    name: "청년내일저축계좌",
    agency: "보건복지부",
    category: "cash",
    targets: ["youth", "lowincome", "worker"],
    summary:
      "일하는 저소득 청년이 월 10만원을 저축하면 정부가 10만~30만원을 더 얹어주는 통장. 3년 만기 시 목돈이 됩니다.",
    amount: "본인 저축 월 10만원 + 정부 지원 월 10만~30만원 (3년)",
    amountMax: 10_800_000,
    period: "연 1회 집중 신청 (보통 5월경)",
    conditions: [
      "만 19~34세 (기초생활수급·차상위는 만 15~39세)",
      "근로·사업소득이 월 50만원 초과 230만원 이하",
      "가구 소득이 기준 중위소득 100% 이하",
      "가구 재산 기준 충족 (대도시·중소도시·농어촌별 상이)",
    ],
    howTo: [
      "복지로 또는 주소지 행정복지센터에서 집중 신청 기간에 신청합니다.",
      "소득·재산 조사를 거쳐 대상자로 선정됩니다.",
      "안내받은 은행에서 계좌를 개설하고 매월 저축합니다.",
      "3년간 근로를 유지하고 교육을 이수하면 만기 시 전액 수령합니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "중간에 퇴사하면 어떻게 되나요?",
        a: "근로 활동이 중단되면 적립이 중지될 수 있습니다. 일정 기간 내 재취업하면 유지되는 경우가 있으니 담당 기관에 바로 알리세요." },
      { q: "매년 신청할 수 있나요?",
        a: "집중 신청 기간이 연 1회 정도 운영됩니다. 그해 탈락했다면 다음 해에 다시 신청할 수 있습니다." },
    ],
    related: ["cheongnyeon-doyak", "huimang-jeochuk", "geunro-jangryeogeum"],
    match: (p) => {
      if (!isYouth(p) && !has(p, "lowincome")) return "unlikely";
      if (!isEarning(p)) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 32_000_000) return "maybe";
      return isLowIncome(p) ? "likely" : "maybe";
    },
  },

  {
    slug: "huimang-jeochuk",
    name: "희망저축계좌",
    agency: "보건복지부",
    category: "cash",
    targets: ["lowincome", "worker", "singleparent"],
    summary:
      "기초생활수급·차상위 가구의 근로자가 저축하면 정부가 근로소득장려금을 매칭해 적립해주는 자산형성 통장입니다.",
    amount: "본인 저축 월 10만원 + 정부 매칭 월 10만~30만원 (3년)",
    amountMax: 10_800_000,
    period: "연 1회 집중 신청 (보통 상반기)",
    conditions: [
      "Ⅰ유형: 생계·의료급여 수급 가구의 근로자",
      "Ⅱ유형: 주거·교육급여 수급 또는 차상위 가구의 근로자",
      "가구 전체 소득이 기준 중위소득 이하",
      "근로·사업소득이 있어야 함",
    ],
    howTo: [
      "복지로 또는 행정복지센터에서 신청합니다.",
      "소득·재산 조사 후 선정됩니다.",
      "지정 은행에서 계좌를 만들고 매월 저축합니다.",
      "3년간 근로 유지와 교육 이수를 충족하면 만기에 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "청년내일저축계좌와 중복되나요?",
        a: "같은 자산형성지원 사업이라 중복 가입은 되지 않습니다. 본인 조건에 맞는 하나를 선택해야 합니다." },
    ],
    related: ["cheongnyeon-naeil-jeochuk", "saenggye-geubyeo", "geunro-jangryeogeum"],
    match: (p) => {
      if (!has(p, "lowincome")) return "unlikely";
      return isEarning(p) ? "likely" : "maybe";
    },
  },

  {
    slug: "saenggye-geubyeo",
    name: "생계급여 (기초생활보장)",
    agency: "보건복지부",
    category: "cash",
    targets: ["lowincome", "senior65", "singleparent", "disabled"],
    summary:
      "소득인정액이 기준 중위소득 32% 이하인 가구에 매월 현금을 지급해 최저 생활을 보장합니다.",
    amount: "기준액에서 소득인정액을 뺀 차액을 매월 지급",
    amountMax: null,
    period: "연중 상시 신청",
    conditions: [
      "가구 소득인정액이 기준 중위소득 32% 이하",
      "부양의무자 기준은 대부분 폐지 (고소득·고재산 부양의무자는 예외)",
      "소득인정액 = 소득평가액 + 재산의 소득환산액",
    ],
    howTo: [
      "주소지 행정복지센터를 방문하거나 복지로에서 온라인 신청합니다.",
      "금융정보 제공 동의서 등 서류를 제출합니다.",
      "소득·재산 조사를 거쳐 보통 30일 내 결정됩니다.",
      "선정되면 매월 20일 전후로 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "부모님 소득 때문에 안 된다고 들었습니다.",
        a: "생계급여의 부양의무자 기준은 대부분 폐지됐습니다. 다만 부양의무자의 소득·재산이 매우 높은 경우에는 여전히 제외될 수 있습니다." },
      { q: "일을 하면 급여가 끊기나요?",
        a: "근로소득의 일정 비율을 공제해주는 근로소득공제가 적용되므로, 일한다고 바로 탈락하지 않습니다. 오히려 근로장려금까지 함께 받을 수 있습니다." },
    ],
    related: ["uiryo-geubyeo", "jugeo-geubyeo", "gingeub-bokji"],
    match: (p) => (has(p, "lowincome") ? "likely" : isLowIncome(p) ? "maybe" : "unlikely"),
  },

  {
    slug: "uiryo-geubyeo",
    name: "의료급여",
    agency: "보건복지부",
    category: "cash",
    targets: ["lowincome", "senior65", "disabled"],
    summary:
      "저소득 가구의 병원비 본인부담을 크게 낮춰주는 제도. 건강보험 대신 의료급여 수급자로 진료를 받습니다.",
    amount: "외래 1,000~2,000원 수준 등 본인부담 대폭 경감",
    amountMax: null,
    period: "연중 상시 신청",
    conditions: [
      "가구 소득인정액이 기준 중위소득 40% 이하",
      "1종·2종으로 구분되며 본인부담금이 다름",
      "이재민, 의상자, 입양아동 등 별도 수급권자 포함",
    ],
    howTo: [
      "행정복지센터에서 기초생활보장 급여와 함께 신청합니다.",
      "소득·재산 조사를 거쳐 수급자로 결정됩니다.",
      "의료급여증 또는 신분증으로 병원·약국을 이용합니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.bokjiro.go.kr",
    sourceName: "복지로",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "건강보험료를 따로 내나요?",
        a: "의료급여 수급자는 건강보험 가입 대상에서 제외되어 보험료를 내지 않습니다." },
      { q: "모든 진료가 무료인가요?",
        a: "아닙니다. 비급여 항목과 일부 본인부담금은 있습니다. 다만 일반 건강보험보다 부담이 훨씬 적습니다." },
    ],
    related: ["saenggye-geubyeo", "jaenanjeok-uiryobi", "gingeub-bokji"],
    match: (p) => (has(p, "lowincome") ? "likely" : isLowIncome(p) ? "maybe" : "unlikely"),
  },

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
    related: ["saenggye-geubyeo", "sieopgeubyeo", "jaenanjeok-uiryobi"],
    match: (p) => (has(p, "crisis") ? "likely" : has(p, "lowincome") ? "maybe" : "unlikely"),
  },

  {
    slug: "haetsalron-youth",
    name: "햇살론유스",
    agency: "서민금융진흥원",
    category: "cash",
    targets: ["youth", "student", "jobseeker"],
    summary:
      "소득이 적거나 사회초년생인 청년에게 낮은 금리로 생활자금을 빌려주는 정책 서민금융 상품입니다.",
    amount: "최대 1,200만원 (연 3%대 고정금리)",
    amountMax: 12_000_000,
    period: "연중 상시",
    conditions: [
      "만 19~34세 청년",
      "연소득 3,500만원 이하",
      "대학(원)생, 취업준비생, 사회초년생(중소기업 재직 1년 이하) 등",
      "신용 요건은 상품별로 상이",
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
        a: "햇살론유스는 대출 상품입니다. 상환 부담이 없는 지원을 원한다면 국민취업지원제도나 청년월세 지원을 먼저 확인하세요." },
    ],
    related: ["soaek-saenggyebi", "cheongnyeon-doyak", "guminchuieop-jiwon"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 35_000_000) return "unlikely";
      return "maybe";
    },
  },

  {
    slug: "soaek-saenggyebi",
    name: "소액생계비대출",
    agency: "서민금융진흥원",
    category: "cash",
    targets: ["lowincome", "jobseeker"],
    summary:
      "제도권 금융을 이용하기 어려운 저소득·저신용자에게 당장 필요한 생계비를 최대 100만원까지 당일 빌려주는 제도입니다.",
    amount: "최초 50만원, 요건 충족 시 최대 100만원",
    amountMax: 1_000_000,
    period: "연중 상시 (사전 예약제)",
    conditions: [
      "만 19세 이상",
      "신용평점 하위 20% 이하",
      "연소득 3,500만원 이하",
      "불법사금융 피해 예방 목적의 긴급 소액 자금",
    ],
    howTo: [
      "서민금융진흥원 앱 또는 콜센터로 방문 예약을 합니다.",
      "서민금융통합지원센터를 방문해 상담을 받습니다.",
      "요건이 확인되면 당일 지급됩니다.",
      "이자 납입 실적에 따라 추가 한도와 금리 인하가 적용됩니다.",
    ],
    applyUrl: "https://www.kinfa.or.kr",
    sourceUrl: "https://www.kinfa.or.kr",
    sourceName: "서민금융진흥원",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "신용점수가 더 떨어지나요?",
        a: "정책서민금융 상품으로 일반 대부업 대출과 달리 취급됩니다. 다만 대출인 만큼 연체 시에는 불이익이 있습니다." },
    ],
    related: ["haetsalron-youth", "gingeub-bokji", "saenggye-geubyeo"],
    match: (p) => (has(p, "crisis") || has(p, "lowincome") ? "maybe" : "unlikely"),
  },
];
