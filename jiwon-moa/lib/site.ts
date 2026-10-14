export const SITE = {
  name: "지원금모아",
  tagline: "내가 받을 수 있는 지원금, 60초 만에",
  description:
    "근로장려금·자녀장려금부터 청년월세·부모급여까지. 5가지 질문에 답하면 내가 받을 수 있는 정부지원금을 금액·마감일과 함께 찾아드립니다.",
  /** 도메인 구매 후 여기만 교체하면 전체 메타데이터·사이트맵에 반영됩니다 */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jiwon-moa.vercel.app",
  locale: "ko_KR",
  /** AdSense 승인 후 ca-pub-XXXX 를 넣으면 광고 슬롯이 활성화됩니다 */
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  contactEmail: "psen7747@gmail.com",
} as const;

export const NAV = [
  { href: "/diagnose", label: "지원금 진단" },
  { href: "/calculator/geunro-jangryeogeum", label: "근로장려금 계산" },
  { href: "/calculator/janyeo-jangryeogeum", label: "자녀장려금 계산" },
  { href: "/benefits", label: "전체 지원금" },
];
