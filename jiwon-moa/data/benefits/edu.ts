import type { Benefit } from "@/lib/types";
import { V, has, isYouth, isLowIncome, isEarning } from "./shared";

export const EDU_BENEFITS: Benefit[] = [
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
    related: ["k-digital", "guminchuieop-jiwon", "pyeongsaeng-education"],
    match: (p) =>
      has(p, "jobseeking") || isEarning(p) || has(p, "study") ? "likely" : "maybe",
  },

  {
    slug: "k-digital",
    name: "K-디지털 트레이닝",
    agency: "고용노동부",
    category: "edu",
    targets: ["jobseeker", "youth", "student"],
    summary:
      "AI·데이터·클라우드 등 디지털 분야 실무 교육을 거의 전액 무료로 받을 수 있는 훈련 과정입니다. 훈련장려금도 나옵니다.",
    amount: "훈련비 전액 또는 대부분 지원 + 훈련장려금 월 최대 약 31만원",
    amountMax: null,
    period: "과정별 모집 (연중 수시)",
    conditions: [
      "국민내일배움카드 발급자",
      "과정별 선발 절차(서류·면접·코딩테스트 등) 통과",
      "출석률 요건을 충족해야 장려금 지급",
    ],
    howTo: [
      "먼저 국민내일배움카드를 발급받습니다.",
      "고용24에서 K-디지털 트레이닝 과정을 검색합니다.",
      "훈련기관에 직접 지원해 선발 절차를 거칩니다.",
      "수강하면서 출석 요건을 채우면 훈련장려금이 지급됩니다.",
    ],
    applyUrl: "https://www.work24.go.kr",
    sourceUrl: "https://www.work24.go.kr",
    sourceName: "고용24",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "비전공자도 되나요?",
        a: "비전공자 대상 과정이 많습니다. 다만 인기 과정은 선발 경쟁이 있으니 지원 동기와 학습 계획을 잘 준비하세요." },
      { q: "재직 중에도 들을 수 있나요?",
        a: "대부분 전일제 과정이라 재직자는 어렵습니다. 재직자용 야간·주말 과정을 따로 찾아보세요." },
    ],
    related: ["naeil-baeumcard", "guminchuieop-jiwon", "cheongnyeon-doyak-jangryeogeum"],
    match: (p) => {
      if (has(p, "study") && (isYouth(p) || has(p, "jobseeking"))) return "likely";
      if (has(p, "jobseeking")) return "likely";
      return "maybe";
    },
  },

  {
    slug: "gukga-janghakgeum",
    name: "국가장학금",
    agency: "한국장학재단",
    category: "edu",
    targets: ["student", "youth", "lowincome"],
    summary:
      "소득 수준에 따라 대학 등록금을 지원합니다. 기초·차상위 가구는 등록금 전액까지 지원받을 수 있습니다.",
    amount: "소득분위별 연 최대 등록금 전액",
    amountMax: null,
    period: "1학기 11~12월 / 2학기 5~6월 (1차 신청 기간 준수 필수)",
    conditions: [
      "국내 대학에 재학 중인 대한민국 국적 학생",
      "소득인정액 기준 구간(1~8구간 등) 해당",
      "직전 학기 성적 기준 충족 (신입생은 면제)",
    ],
    howTo: [
      "한국장학재단 홈페이지 또는 앱에서 신청합니다.",
      "가구원 동의와 금융정보 제공 동의를 완료합니다.",
      "소득 구간 산정 결과를 확인합니다.",
      "학교로 등록금이 차감되거나 환급됩니다.",
    ],
    applyUrl: "https://www.kosaf.go.kr",
    sourceUrl: "https://www.kosaf.go.kr",
    sourceName: "한국장학재단",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "1차 신청을 놓쳤습니다.",
        a: "2차 신청 기간이 있지만 신입생·편입생·재입학생이 아닌 재학생은 2차에 신청하면 지원이 제한될 수 있습니다. 1차 기간을 꼭 지키세요." },
      { q: "가구원 동의가 안 되면요?",
        a: "부모 등 가구원의 정보제공 동의가 없으면 소득 구간 산정이 되지 않아 탈락합니다. 기한 내 동의가 필수입니다." },
    ],
    related: ["chwieop-sanghwan-daechul", "pyeongsaeng-education", "k-digital"],
    match: (p) => (has(p, "study") && (isYouth(p) || p.ageBand === "under19") ? "likely" : "unlikely"),
  },

  {
    slug: "chwieop-sanghwan-daechul",
    name: "취업 후 상환 학자금대출",
    agency: "한국장학재단",
    category: "edu",
    targets: ["student", "youth"],
    summary:
      "재학 중에는 이자를 내지 않고, 취업해서 일정 소득이 생긴 뒤부터 갚는 학자금 대출입니다.",
    amount: "등록금 전액 + 생활비 (학기당 한도 내)",
    amountMax: null,
    period: "학기별 신청 기간",
    conditions: [
      "학자금 지원 구간 기준 이하 대학생",
      "만 35세 이하 (일부 예외)",
      "성적 기준 충족",
    ],
    howTo: [
      "한국장학재단에서 국가장학금과 함께 신청합니다.",
      "심사 후 대출 실행 절차를 진행합니다.",
      "재학 중 이자는 면제되거나 유예됩니다.",
      "상환기준소득을 넘는 소득이 생기면 국세청을 통해 자동 상환됩니다.",
    ],
    applyUrl: "https://www.kosaf.go.kr",
    sourceUrl: "https://www.kosaf.go.kr",
    sourceName: "한국장학재단",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "취업을 못 하면요?",
        a: "소득이 상환기준 미만이면 상환 의무가 유예됩니다. 소득이 생길 때까지 갚지 않아도 됩니다." },
    ],
    related: ["gukga-janghakgeum", "haetsalron-youth", "cheongnyeon-doyak"],
    match: (p) => (has(p, "study") && isYouth(p) ? "maybe" : "unlikely"),
  },

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
    related: ["naeil-baeumcard", "munhwa-nuri", "k-digital"],
    match: (p) => (has(p, "study") ? "likely" : isLowIncome(p) ? "maybe" : "unlikely"),
  },
];
