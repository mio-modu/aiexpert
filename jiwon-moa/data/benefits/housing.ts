import type { Benefit } from "@/lib/types";
import { V, has, incomeOf, isYouth, isLowIncome } from "./shared";

export const HOUSING_BENEFITS: Benefit[] = [
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
      "보증금 5,000만원 이하, 월세 60만원 이하 주택에 거주",
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
      { q: "월세 세액공제와 같이 되나요?",
        a: "제도 성격이 달라 병행이 가능한 경우가 많지만, 지원받은 월세분에 대한 세액공제는 제한될 수 있어 확인이 필요합니다." },
    ],
    related: ["jugeo-geubyeo", "cheongnyeon-jeonwolse-loan", "wolse-segong-je"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      if (p.housing === "own") return "unlikely";
      if (p.housing !== "wolse") return "maybe";
      const inc = incomeOf(p);
      if (inc !== null && inc > 32_000_000) return "maybe";
      return "likely";
    },
  },

  {
    slug: "jugeo-geubyeo",
    name: "주거급여",
    agency: "국토교통부",
    category: "housing",
    targets: ["lowincome", "tenant", "senior65", "singleparent"],
    summary:
      "저소득 가구의 월세를 지원하거나 자가 주택의 수리비를 지원합니다. 청년은 부모와 따로 받을 수도 있습니다.",
    amount: "지역·가구원 수별 기준임대료 범위에서 월세 지원 (자가는 수선비)",
    amountMax: null,
    period: "연중 상시 신청",
    conditions: [
      "가구 소득인정액이 기준 중위소득 48% 이하",
      "임차가구는 실제 임차료, 자가가구는 주택 노후도에 따라 지원",
      "부양의무자 기준 폐지",
      "수급가구 내 만 19~30세 미혼 청년은 분리지급 신청 가능",
    ],
    howTo: [
      "주소지 행정복지센터 또는 복지로에서 신청합니다.",
      "임대차계약서와 임차료 증빙을 제출합니다.",
      "소득·재산 조사와 주택조사를 받습니다.",
      "선정되면 매월 20일 전후 지급됩니다.",
    ],
    applyUrl: "https://www.bokjiro.go.kr",
    sourceUrl: "https://www.myhome.go.kr",
    sourceName: "마이홈포털",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "부모님이 수급자인데 저는 따로 삽니다.",
        a: "주거급여 수급가구의 만 19~30세 미혼 자녀가 취학·구직 등으로 따로 거주하면 청년 주거급여 분리지급을 신청할 수 있습니다." },
      { q: "자가 주택이면 못 받나요?",
        a: "자가 가구는 현금 대신 주택 수선 지원을 받습니다. 노후도에 따라 경보수·중보수·대보수로 구분됩니다." },
    ],
    related: ["saenggye-geubyeo", "cheongnyeon-wolse", "lh-maeip-imdae"],
    match: (p) => {
      if (has(p, "lowincome")) return "likely";
      if (p.housing === "own") return "maybe";
      return isLowIncome(p) ? "maybe" : "unlikely";
    },
  },

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
    period: "연중 상시 (임대차계약 후 기한 내)",
    conditions: [
      "만 19~34세 무주택 세대주 또는 예정자",
      "부부 합산 연소득 5,000만원 이하 (상품별 상이)",
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
    related: ["beotimmok-sinhon", "cheongnyeon-wolse", "cheongnyeon-jutaekdream"],
    match: (p) => {
      if (!isYouth(p)) return "unlikely";
      if (p.housing === "own") return "unlikely";
      if (p.housing === "jeonse" || p.housing === "wolse" || has(p, "moving")) return "likely";
      return "maybe";
    },
  },

  {
    slug: "beotimmok-sinhon",
    name: "신혼부부 전세자금대출 (버팀목)",
    agency: "주택도시기금 · 국토교통부",
    category: "housing",
    targets: ["newlywed", "tenant"],
    summary:
      "혼인 7년 이내 신혼부부에게 일반 버팀목보다 더 낮은 금리와 높은 한도로 전세자금을 빌려주는 정책 대출입니다.",
    amount: "수도권 최대 3억원 · 그 외 2억원 (우대금리 적용)",
    amountMax: null,
    period: "연중 상시 (임대차계약 후 기한 내)",
    conditions: [
      "혼인 기간 7년 이내 또는 3개월 이내 결혼 예정",
      "부부 합산 연소득 기준 이하",
      "순자산 기준 충족",
      "무주택 세대주",
    ],
    howTo: [
      "주택도시기금 포털에서 요건과 한도를 확인합니다.",
      "기금 수탁 은행에 방문하거나 기금e든든에서 신청합니다.",
      "혼인관계증명서, 임대차계약서, 소득 증빙을 제출합니다.",
      "심사 후 잔금일에 지급됩니다.",
    ],
    applyUrl: "https://nhuf.molit.go.kr",
    sourceUrl: "https://nhuf.molit.go.kr",
    sourceName: "주택도시기금",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "결혼 예정인데 미리 받을 수 있나요?",
        a: "결혼 예정일이 가까운 경우 예비 신혼부부로 신청할 수 있는 상품이 있습니다. 대출 후 기한 내 혼인신고 서류를 제출해야 합니다." },
      { q: "디딤돌 대출과 같이 쓸 수 있나요?",
        a: "전세자금(버팀목)과 주택구입자금(디딤돌)은 목적이 달라 동시에 이용할 수 없습니다." },
    ],
    related: ["didimdol-loan", "cheongnyeon-jeonwolse-loan", "haengbok-jutaek"],
    match: (p) => {
      if (!has(p, "newlywed") && !has(p, "moving")) return "unlikely";
      if (p.housing === "own") return "unlikely";
      return "maybe";
    },
  },

  {
    slug: "didimdol-loan",
    name: "디딤돌 주택구입자금 대출",
    agency: "주택도시기금 · 국토교통부",
    category: "housing",
    targets: ["newlywed", "worker", "parent"],
    summary:
      "무주택 서민이 집을 살 때 낮은 고정금리로 주택구입자금을 빌려주는 정책 대출입니다. 신혼·다자녀는 우대금리가 더해집니다.",
    amount: "최대 2억 5,000만원 (신혼·다자녀 우대 시 상향)",
    amountMax: null,
    period: "연중 상시 (소유권 이전등기 후 3개월 이내)",
    conditions: [
      "무주택 세대주",
      "부부 합산 연소득 6,000만원 이하 (신혼·다자녀 등은 완화)",
      "순자산 기준 충족",
      "주택 가격과 전용면적 기준 충족",
    ],
    howTo: [
      "주택도시기금 포털 또는 기금e든든에서 사전 자격을 확인합니다.",
      "매매계약 후 기금 수탁 은행에 신청합니다.",
      "소득·재직 증빙과 매매계약서를 제출합니다.",
      "심사 후 잔금일에 매도인 계좌로 지급됩니다.",
    ],
    applyUrl: "https://nhuf.molit.go.kr",
    sourceUrl: "https://nhuf.molit.go.kr",
    sourceName: "주택도시기금",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "생애최초면 더 유리한가요?",
        a: "생애최초 주택구입자는 금리 우대와 함께 취득세 감면 등 별도 혜택을 함께 확인해볼 수 있습니다." },
    ],
    related: ["beotimmok-sinhon", "cheongnyeon-jutaekdream", "haengbok-jutaek"],
    match: (p) => (has(p, "moving") && p.housing !== "own" ? "maybe" : "unlikely"),
  },

  {
    slug: "cheongnyeon-jutaekdream",
    name: "청년 주택드림 청약통장",
    agency: "국토교통부",
    category: "housing",
    targets: ["youth", "worker", "student"],
    summary:
      "청년에게 높은 이율과 소득공제를 주는 청약통장. 당첨되면 분양대금 대출까지 저금리로 연계됩니다.",
    amount: "우대금리 적용 · 연 납입액 소득공제 · 분양 시 저리 대출 연계",
    amountMax: null,
    period: "연중 상시 가입",
    conditions: [
      "만 19~34세 무주택 청년",
      "연소득 기준 이하",
      "기존 청약저축 보유자는 전환 가입 가능",
    ],
    howTo: [
      "청약통장 취급 은행 앱 또는 지점에서 가입합니다.",
      "무주택 확인과 소득 요건 서류를 제출합니다.",
      "매월 자유롭게 납입합니다.",
      "연말정산에서 납입액 소득공제를 신청합니다.",
    ],
    applyUrl: "https://www.applyhome.co.kr",
    sourceUrl: "https://nhuf.molit.go.kr",
    sourceName: "주택도시기금",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "기존 청약통장이 있으면 손해인가요?",
        a: "기존 납입 회차와 금액을 인정받으며 전환 가입할 수 있는 경우가 많습니다. 은행에서 전환 가능 여부를 확인하세요." },
    ],
    related: ["cheongnyeon-doyak", "didimdol-loan", "haengbok-jutaek"],
    match: (p) => (isYouth(p) && p.housing !== "own" ? "likely" : "unlikely"),
  },

  {
    slug: "haengbok-jutaek",
    name: "행복주택",
    agency: "LH · 지방공사",
    category: "housing",
    targets: ["youth", "newlywed", "student", "tenant"],
    summary:
      "청년·신혼부부·대학생에게 시세보다 싼 임대료로 공급하는 공공임대주택입니다. 직장과 학교가 가까운 곳에 짓습니다.",
    amount: "주변 시세의 60~80% 수준 임대료",
    amountMax: null,
    period: "단지별 입주자 모집 공고 시",
    conditions: [
      "대학생·청년·신혼부부·고령자·주거급여수급자 등 계층별 요건",
      "무주택 요건 및 소득·자산 기준 충족",
      "계층에 따라 거주 기간 제한 (보통 6~10년)",
    ],
    howTo: [
      "LH청약플러스 또는 지방공사 홈페이지에서 모집 공고를 확인합니다.",
      "온라인으로 청약 신청합니다.",
      "서류 심사와 자격 검증을 거칩니다.",
      "당첨되면 계약 후 입주합니다.",
    ],
    applyUrl: "https://apply.lh.or.kr",
    sourceUrl: "https://www.myhome.go.kr",
    sourceName: "마이홈포털",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "경쟁률이 높다던데요?",
        a: "인기 단지는 경쟁이 치열합니다. 다만 모집이 수시로 있으므로 마이홈포털에서 알림을 설정해두고 꾸준히 지원하는 것이 좋습니다." },
    ],
    related: ["lh-maeip-imdae", "cheongnyeon-wolse", "jugeo-geubyeo"],
    match: (p) => {
      if (p.housing === "own") return "unlikely";
      if (isYouth(p) || has(p, "newlywed") || has(p, "study")) return "likely";
      return "maybe";
    },
  },

  {
    slug: "lh-maeip-imdae",
    name: "매입임대주택",
    agency: "LH · 지방공사",
    category: "housing",
    targets: ["lowincome", "tenant", "singleparent", "senior65"],
    summary:
      "공공이 기존 주택을 사들여 저소득층에게 시세의 30~50% 수준 임대료로 다시 빌려주는 임대주택입니다.",
    amount: "주변 시세의 30~50% 수준 임대료",
    amountMax: null,
    period: "수시 모집 공고",
    conditions: [
      "기초생활수급자, 차상위계층, 한부모가족 등 1순위",
      "월평균 소득과 자산 기준 충족",
      "무주택 세대구성원",
    ],
    howTo: [
      "LH청약플러스 또는 지자체 공고에서 모집을 확인합니다.",
      "주소지 행정복지센터 또는 온라인으로 신청합니다.",
      "자격 심사와 순위 결정을 거칩니다.",
      "예비입주자로 등록되어 순번이 오면 계약합니다.",
    ],
    applyUrl: "https://apply.lh.or.kr",
    sourceUrl: "https://www.myhome.go.kr",
    sourceName: "마이홈포털",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "대기 기간이 얼마나 되나요?",
        a: "지역과 순위에 따라 수개월에서 수년까지 차이가 큽니다. 예비입주자로 등록해두고 기다리는 구조입니다." },
    ],
    related: ["jugeo-geubyeo", "haengbok-jutaek", "saenggye-geubyeo"],
    match: (p) => {
      if (p.housing === "own") return "unlikely";
      return has(p, "lowincome") ? "likely" : isLowIncome(p) ? "maybe" : "unlikely";
    },
  },

  {
    slug: "jeonse-sagi-jiwon",
    name: "전세사기 피해자 지원",
    agency: "국토교통부 · HUG",
    category: "housing",
    targets: ["tenant", "youth", "newlywed"],
    summary:
      "전세사기 피해자로 인정받으면 긴급 주거지원, 저리 대출, 경·공매 절차 지원 등을 받을 수 있습니다.",
    amount: "긴급 주거지원 · 저리 대환대출 · 경·공매 대행 등",
    amountMax: null,
    period: "연중 상시 (피해 발생 시)",
    conditions: [
      "임차보증금 반환이 지연되거나 불가능한 상황",
      "전세사기피해지원위원회의 피해자 결정 필요",
      "보증금 규모 등 요건 충족",
    ],
    howTo: [
      "거주지 시·도청에 전세사기 피해자 결정을 신청합니다.",
      "임대차계약서, 보증금 미반환 증빙 등을 제출합니다.",
      "위원회 심의를 거쳐 피해자로 결정됩니다.",
      "결정문으로 긴급 주거지원과 금융지원을 신청합니다.",
    ],
    applyUrl: "https://www.khug.or.kr",
    sourceUrl: "https://www.molit.go.kr",
    sourceName: "국토교통부",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "아직 계약 기간이 남았는데 불안합니다.",
        a: "보증금 반환 문제가 실제로 발생하기 전이라면 전세보증금반환보증 가입 여부부터 확인하세요. HUG·HF·SGI에서 가입할 수 있습니다." },
    ],
    related: ["jugeo-geubyeo", "lh-maeip-imdae", "gingeub-bokji"],
    match: (p) => (has(p, "jeonsesagi") ? "likely" : "unlikely"),
  },
];
