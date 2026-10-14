import type { Benefit } from "@/lib/types";
import { V, has, incomeOf, isYouth, isEarning } from "./shared";

export const JOB_BENEFITS: Benefit[] = [
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
    related: ["sieopgeubyeo", "naeil-baeumcard", "geunro-jangryeogeum"],
    match: (p) => {
      if (!has(p, "jobseeking")) return "unlikely";
      const inc = incomeOf(p);
      if (inc !== null && inc > 44_000_000) return "maybe";
      return "likely";
    },
  },

  {
    slug: "sieopgeubyeo",
    name: "실업급여 (구직급여)",
    agency: "고용노동부",
    category: "job",
    targets: ["jobseeker", "worker"],
    summary:
      "고용보험에 가입한 근로자가 비자발적으로 퇴사했을 때 재취업할 때까지 생계를 지원하는 급여입니다.",
    amount: "이직 전 평균임금의 60% · 연령과 가입기간에 따라 120~270일",
    amountMax: null,
    period: "퇴사 다음 날부터 12개월 이내 (늦을수록 손해)",
    conditions: [
      "이직 전 18개월 동안 고용보험 가입 기간이 180일 이상",
      "경영상 해고, 계약만료, 권고사직 등 비자발적 이직",
      "근로 의사와 능력이 있고 적극적으로 재취업 활동을 할 것",
      "자발적 퇴사는 원칙적으로 제외 (정당한 사유가 인정되면 예외)",
    ],
    howTo: [
      "회사가 고용보험 상실신고와 이직확인서를 제출했는지 확인합니다.",
      "고용24에서 구직 등록을 하고 수급자격 신청 교육을 온라인으로 듣습니다.",
      "거주지 고용센터를 방문해 수급자격 인정을 신청합니다.",
      "인정되면 1~4주 간격으로 실업인정을 받으며 급여를 받습니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "권고사직도 받을 수 있나요?",
        a: "네. 권고사직은 비자발적 이직으로 인정되는 것이 일반적입니다. 이직확인서의 이직 사유 코드가 중요하니 꼭 확인하세요." },
      { q: "퇴사한 지 1년이 넘었습니다.",
        a: "퇴사 다음 날부터 12개월이 지나면 남은 일수가 있어도 지급이 종료됩니다. 퇴사 직후 바로 신청하는 것이 중요합니다." },
      { q: "계약직 계약만료도 되나요?",
        a: "계약기간 만료로 인한 이직은 비자발적 이직으로 인정됩니다. 재계약을 거부한 주체가 누구인지가 쟁점이 될 수 있습니다." },
    ],
    related: ["guminchuieop-jiwon", "naeil-baeumcard", "gingeub-bokji"],
    match: (p) => (has(p, "jobseeking") ? "likely" : "unlikely"),
  },

  {
    slug: "cheongnyeon-doyak-jangryeogeum",
    name: "청년일자리도약장려금",
    agency: "고용노동부",
    category: "job",
    targets: ["youth", "jobseeker", "soleproprietor"],
    summary:
      "취업이 어려운 청년을 정규직으로 채용한 중소기업에 인건비를 지원합니다. 청년 본인에게도 근속 인센티브가 지급됩니다.",
    amount: "기업에 최대 720만원 · 청년 근속 인센티브 별도",
    amountMax: 7_200_000,
    period: "연중 상시 (예산 소진 시까지)",
    conditions: [
      "만 15~34세 취업애로청년",
      "5인 이상 중소기업에 정규직으로 채용",
      "채용 전 4개월 이상 실업 상태 등 요건 충족",
      "기업이 신청하는 제도이며 청년은 대상 요건을 갖춰야 함",
    ],
    howTo: [
      "청년은 고용24에서 취업애로청년 요건 확인을 받습니다.",
      "채용 기업이 고용24에서 참여 신청을 합니다.",
      "승인 후 청년을 정규직으로 채용합니다.",
      "기업은 인건비를, 청년은 근속 기간에 따라 인센티브를 받습니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "제가 직접 신청하나요?",
        a: "지원금은 기업이 신청합니다. 다만 청년 본인이 취업애로청년 요건을 충족하는지 미리 확인해두면 구직 시 유리합니다." },
    ],
    related: ["guminchuieop-jiwon", "naeil-baeumcard", "goyongchokjin"],
    match: (p) => {
      if (isYouth(p) && has(p, "jobseeking")) return "likely";
      if (has(p, "business")) return "maybe";
      return "unlikely";
    },
  },

  {
    slug: "goyongchokjin",
    name: "고용촉진장려금",
    agency: "고용노동부",
    category: "job",
    targets: ["jobseeker", "soleproprietor", "disabled", "singleparent"],
    summary:
      "장기 실업자, 장애인, 한부모 등 취업이 어려운 사람을 채용한 사업주에게 인건비를 지원합니다.",
    amount: "1인당 연 최대 720만원 (최대 1년)",
    amountMax: 7_200_000,
    period: "연중 상시",
    conditions: [
      "지정 취업지원프로그램을 이수한 실업자를 채용",
      "중증장애인, 여성가장, 한부모 등 취업취약계층",
      "고용보험 피보험자로 6개월 이상 고용 유지",
      "채용 전후 감원이 없어야 함",
    ],
    howTo: [
      "구직자는 지정된 취업지원프로그램을 이수합니다.",
      "사업주가 해당 구직자를 채용합니다.",
      "고용24에서 사업주가 장려금을 신청합니다.",
      "6개월 단위로 심사 후 지급됩니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "구직자에게 직접 주는 돈인가요?",
        a: "아닙니다. 채용한 사업주에게 지급됩니다. 다만 이 제도 덕분에 취업취약계층의 채용 가능성이 높아집니다." },
    ],
    related: ["cheongnyeon-doyak-jangryeogeum", "guminchuieop-jiwon", "jangaein-yeongeum"],
    match: (p) => {
      if (has(p, "business")) return "maybe";
      if (has(p, "jobseeking") && (has(p, "disabled") || has(p, "singleparent"))) return "likely";
      return "unlikely";
    },
  },

  {
    slug: "chulsan-yukgai-goyong",
    name: "출산·육아기 고용안정장려금",
    agency: "고용노동부",
    category: "job",
    targets: ["parent", "pregnant", "worker", "soleproprietor"],
    summary:
      "육아휴직이나 육아기 단축근무를 허용한 사업주를 지원해, 근로자가 눈치 보지 않고 제도를 쓸 수 있게 돕습니다.",
    amount: "근로자 1인당 월 30만~90만원 수준 (유형별 상이)",
    amountMax: null,
    period: "연중 상시",
    conditions: [
      "우선지원대상기업(중소기업) 사업주",
      "소속 근로자에게 육아휴직 또는 육아기 근로시간 단축을 30일 이상 허용",
      "대체인력을 채용한 경우 추가 지원",
    ],
    howTo: [
      "근로자가 육아휴직 또는 육아기 단축근무를 사용합니다.",
      "사업주가 고용24에서 장려금을 신청합니다.",
      "심사 후 지급됩니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "근로자가 받는 육아휴직급여와 다른 건가요?",
        a: "네. 육아휴직급여는 근로자에게, 고용안정장려금은 사업주에게 지급됩니다. 두 제도는 함께 작동합니다." },
    ],
    related: ["yukgai-hyujik", "bumo-geumyeo", "duruunuri"],
    match: (p) => (has(p, "business") ? "maybe" : has(p, "childcare") || has(p, "pregnant") ? "maybe" : "unlikely"),
  },

  {
    slug: "yukgai-hyujik",
    name: "육아휴직급여",
    agency: "고용노동부",
    category: "job",
    targets: ["parent", "pregnant", "worker"],
    summary:
      "만 8세 이하 자녀를 키우기 위해 육아휴직을 쓴 고용보험 가입 근로자에게 매월 급여를 지급합니다.",
    amount: "통상임금의 일정 비율 (상한액 적용) · 부모가 함께 쓰면 상향",
    amountMax: null,
    period: "육아휴직 시작 1개월 후부터 종료 후 12개월 이내",
    conditions: [
      "만 8세 이하 또는 초등학교 2학년 이하 자녀",
      "육아휴직을 30일 이상 사용",
      "고용보험 피보험 단위기간이 180일 이상",
    ],
    howTo: [
      "회사에 육아휴직을 신청하고 확인서를 받습니다.",
      "고용24에서 육아휴직급여를 신청합니다.",
      "매월 또는 일괄로 신청해 지급받습니다.",
      "복직 후 일정 기간 근무하면 사후지급분이 지급되는 경우가 있습니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "부부가 같이 쓰면 더 받나요?",
        a: "같은 자녀에 대해 부모가 모두 육아휴직을 사용하면 급여가 상향되는 특례가 운영됩니다. 사용 순서와 기간 요건을 확인하세요." },
      { q: "프리랜서도 되나요?",
        a: "고용보험 가입이 전제입니다. 예술인·노무제공자 고용보험 가입자는 별도 기준이 적용됩니다." },
    ],
    related: ["chulsan-yukgai-goyong", "bumo-geumyeo", "adong-sudang"],
    match: (p) => {
      if (!has(p, "childcare") && !has(p, "pregnant")) return "unlikely";
      return has(p, "working") ? "likely" : "maybe";
    },
  },

  {
    slug: "duruunuri",
    name: "두루누리 사회보험료 지원",
    agency: "고용노동부 · 국민연금공단",
    category: "job",
    targets: ["worker", "soleproprietor"],
    summary:
      "소규모 사업장의 저임금 근로자와 사업주에게 국민연금·고용보험료의 일부를 지원해 부담을 덜어줍니다.",
    amount: "보험료의 최대 80% 지원",
    amountMax: null,
    period: "연중 상시",
    conditions: [
      "근로자 수 10명 미만 사업장",
      "월 평균보수가 기준액 미만인 근로자",
      "재산·종합소득 기준 충족",
      "신규 가입 근로자 중심으로 지원",
    ],
    howTo: [
      "사업주 또는 근로자가 국민연금공단·근로복지공단에 신청합니다.",
      "4대보험 취득신고 시 함께 신청할 수 있습니다.",
      "지원 결정 후 보험료 고지서에서 차감됩니다.",
    ],
    applyUrl: "https://www.insurancesupport.or.kr",
    sourceUrl: "https://www.insurancesupport.or.kr",
    sourceName: "두루누리 사회보험",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "이미 가입된 근로자도 되나요?",
        a: "원칙적으로 신규 가입자 중심이지만 요건에 따라 기존 가입자도 지원되는 경우가 있습니다. 공단에 확인하세요." },
    ],
    related: ["1in-soasanggongin-goyongboheom", "geunro-jangryeogeum", "jonghap-sodeukse"],
    match: (p) => (has(p, "working") || has(p, "business") ? "maybe" : "unlikely"),
  },
];
