export const SITE = {
  name: "받을돈",
  tagline: "안 받으면 사라지는 돈, 60초 만에 확인",
  description:
    "근로장려금·자녀장려금부터 청년월세·부모급여까지. 5가지 질문에 답하면 내가 받을 수 있는 정부지원금을 금액·마감일과 함께 찾아드립니다.",
  /** 운영 도메인. Vercel 환경변수 NEXT_PUBLIC_SITE_URL 로 덮어쓸 수 있습니다 */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://badeuldon.co.kr",
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
