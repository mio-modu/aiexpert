import type { Benefit } from "@/lib/types";
import { V, has, incomeOf, assetBlocks, isEarning } from "./shared";

export const TAX_BENEFITS: Benefit[] = [
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
      if (!isEarning(p)) return "unlikely";
      const inc = incomeOf(p);
      if (inc === null || !p.household) return "maybe";
      const cutoff = p.household === "single" ? 22_000_000 : p.household === "single_earner" ? 32_000_000 : 44_000_000;
      if (inc >= cutoff) return "unlikely";
      return p.assetBand === "170to240" ? "maybe" : "likely";
    },
  },

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

  {
    slug: "wolse-segong-je",
    name: "월세 세액공제",
    agency: "국세청",
    category: "tax",
    targets: ["tenant", "worker", "youth"],
    summary:
      "월세로 사는 무주택 근로자가 1년에 낸 월세의 일부를 세금에서 직접 빼주는 제도. 연말정산이나 종합소득세 신고 때 신청합니다.",
    amount: "연 월세액(한도 내)의 15~17%를 세액에서 공제",
    amountMax: 1_700_000,
    period: "연말정산 1~2월 / 종합소득세 신고 5월 / 놓쳤다면 경정청구로 5년 내",
    conditions: [
      "무주택 세대주인 근로소득자 (세대원도 요건 충족 시 가능)",
      "총급여액이 기준 이하인 근로자",
      "국민주택규모 이하 또는 기준시가 이하 주택에 거주",
      "임대차계약서의 주소와 주민등록 주소가 같아야 함",
    ],
    howTo: [
      "임대차계약서 사본과 월세 이체 내역(계좌이체 확인서)을 준비합니다.",
      "주민등록등본으로 전입신고가 되어 있는지 확인합니다.",
      "연말정산 때 회사에 제출하거나, 홈택스 종합소득세 신고 시 직접 입력합니다.",
      "놓쳤다면 홈택스 경정청구로 최대 5년치를 돌려받을 수 있습니다.",
    ],
    applyUrl: "https://www.hometax.go.kr",
    sourceUrl: "https://www.nts.go.kr",
    sourceName: "국세청",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "현금영수증을 못 받았는데 괜찮나요?",
        a: "계좌이체 내역만 있어도 됩니다. 임대인 동의 없이도 홈택스에서 '주택임차료 현금영수증'을 직접 신청할 수 있습니다." },
      { q: "월세 세액공제와 주택임차차입금 소득공제를 같이 받나요?",
        a: "월세 세액공제와 전세자금 대출 원리금 상환액 공제는 성격이 달라 요건을 각각 충족하면 함께 적용받을 수 있습니다." },
      { q: "전입신고를 늦게 했습니다.",
        a: "전입신고한 날 이후 낸 월세분만 공제됩니다. 이사 후 바로 전입신고하는 것이 유리합니다." },
    ],
    related: ["cheongnyeon-wolse", "gyeongjeong-cheonggu", "jugeo-geubyeo"],
    match: (p) => {
      if (p.housing !== "wolse") return p.housing === null ? "maybe" : "unlikely";
      if (!has(p, "working")) return "maybe";
      return "likely";
    },
  },

  {
    slug: "gyeongjeong-cheonggu",
    name: "경정청구 (놓친 공제 환급)",
    agency: "국세청",
    category: "tax",
    targets: ["worker", "soleproprietor"],
    summary:
      "연말정산이나 종합소득세 신고 때 빠뜨린 공제를 최대 5년치까지 소급해 돌려받는 제도. 신청하지 않으면 그냥 사라집니다.",
    amount: "누락 공제액에 따라 수만~수백만원 환급",
    amountMax: null,
    period: "법정신고기한이 지난 후 5년 이내 상시",
    conditions: [
      "과거에 연말정산 또는 종합소득세 신고를 한 사람",
      "의료비·교육비·월세·기부금·부양가족 공제 등을 빠뜨린 경우",
      "법정신고기한으로부터 5년이 지나지 않았을 것",
    ],
    howTo: [
      "홈택스에 로그인해 '지급명세서 등 제출내역'에서 과거 신고 내용을 확인합니다.",
      "누락된 공제 항목과 증빙서류를 모읍니다.",
      "홈택스 '경정청구'에서 해당 연도를 선택해 수정 내용을 입력합니다.",
      "심사 후 보통 2개월 이내에 환급금이 계좌로 들어옵니다.",
    ],
    applyUrl: "https://www.hometax.go.kr",
    sourceUrl: "https://www.nts.go.kr",
    sourceName: "국세청",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "회사에 알려지나요?",
        a: "본인이 홈택스에서 직접 경정청구하면 회사를 거치지 않습니다. 환급금도 본인 계좌로 직접 들어옵니다." },
      { q: "어떤 항목이 많이 누락되나요?",
        a: "월세 세액공제, 따로 사는 부모님 부양가족 공제, 안경·콘택트렌즈 구입비, 중고생 교복비, 기부금이 대표적입니다." },
      { q: "퇴사했는데 가능한가요?",
        a: "가능합니다. 퇴사 후 중도 연말정산만 받은 경우 누락된 공제가 많아 환급액이 큰 편입니다." },
    ],
    related: ["wolse-segong-je", "geunro-jangryeogeum", "jonghap-sodeukse"],
    match: (p) => (has(p, "working") || has(p, "business") ? "likely" : "maybe"),
  },

  {
    slug: "jonghap-sodeukse",
    name: "종합소득세 환급 (프리랜서 3.3%)",
    agency: "국세청",
    category: "tax",
    targets: ["soleproprietor", "worker", "youth"],
    summary:
      "프리랜서·아르바이트로 3.3%를 떼인 사람이 5월에 신고하면 대부분 환급을 받습니다. 소득이 적을수록 환급액이 큽니다.",
    amount: "원천징수된 3.3% 중 상당액 환급",
    amountMax: null,
    period: "매년 5월 1~31일 (성실신고 대상은 6월 말까지)",
    conditions: [
      "사업소득(프리랜서·배달·강사 등)으로 3.3%가 원천징수된 사람",
      "여러 곳에서 근로소득이 있거나 근로 외 소득이 있는 사람",
      "소득이 적어 결정세액보다 많이 떼인 경우 환급 발생",
    ],
    howTo: [
      "홈택스에 로그인해 '종합소득세 신고'로 들어갑니다.",
      "'모두채움 신고'가 떠 있으면 금액 확인 후 그대로 제출하면 됩니다.",
      "모두채움이 아니면 수입금액과 경비, 공제 항목을 입력합니다.",
      "신고 후 보통 6월 말~7월에 환급금이 지급됩니다.",
    ],
    applyUrl: "https://www.hometax.go.kr",
    sourceUrl: "https://www.nts.go.kr",
    sourceName: "국세청",
    baseYear: 2026,
    verifiedAt: V,
    faq: [
      { q: "소득이 적으면 신고 안 해도 되나요?",
        a: "신고 의무가 없더라도 원천징수된 세금이 있다면 신고해야 돌려받습니다. 신고하지 않으면 환급도 없습니다." },
      { q: "근로장려금도 같이 신청되나요?",
        a: "5월은 종합소득세 신고와 근로·자녀장려금 정기신청 기간이 겹칩니다. 홈택스에서 이어서 신청할 수 있습니다." },
      { q: "지난 몇 년치도 가능한가요?",
        a: "신고하지 않은 과거분은 기한후신고로, 신고했지만 더 받을 게 있으면 경정청구로 5년 내 처리할 수 있습니다." },
    ],
    related: ["gyeongjeong-cheonggu", "geunro-jangryeogeum", "duruunuri"],
    match: (p) => (has(p, "business") ? "likely" : has(p, "working") ? "maybe" : "unlikely"),
  },
];
