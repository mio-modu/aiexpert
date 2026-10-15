# 지원금모아 (jiwon-moa)

정부지원금 통합 안내 + 근로·자녀장려금 계산기.

## 설계 원칙

### T20 "숫자로 증명하기" (FLAT 그룹)
디자인 유형 시스템의 T20을 적용했습니다.

- **숫자가 주인공** — 금액은 `--fs-display`(최대 4.2rem), 본문과 5배 이상 대비
- **이미지는 오히려 방해** — 사진/일러스트 없음
- **출처를 같이 적기** — 모든 숫자 아래 `.stat-basis`로 기준연도·출처·확인일 병기
- **FLAT 규칙** — 그림자 전부 `none`. 위계는 타입 스케일 대비와 1px 헤어라인, 8px 그리드로만

디자인 교체는 `styles/tokens.css` 한 파일만 바꾸면 됩니다.
`styles/base.css`는 구조 레이어라 건드리지 않습니다.

### 데이터 신뢰 원칙
모든 금액·요건 상수는 다음을 반드시 동반합니다.

- `baseYear` 기준 연도
- `sourceName` / `sourceUrl` 출처
- `verifiedAt` 최종 확인일

제도가 바뀌면 `lib/incentive.ts`와 `data/benefits.ts`의 상수만 고치면
계산기·상세페이지·사이트맵에 일괄 반영됩니다.

## 구조

```
app/
  page.tsx                    홈
  diagnose/                   5문항 진단
  calculator/[slug]/          근로장려금 · 자녀장려금 계산기
  benefit/[slug]/             지원금 상세 (18개)
  benefits/                   전체 목록
  category/[slug]/            분야별 (9개)
  target/[slug]/              대상별 (13개)
  sitemap.ts · robots.ts
lib/
  incentive.ts                장려금 산정 로직 + 산정표 상수
  types.ts                    타입 · 분류 메타
  site.ts                     사이트 설정 (도메인 · AdSense ID)
data/
  benefits.ts                 지원금 데이터셋 + 매칭 엔진
styles/
  tokens.css                  ← 디자인 교체 지점
  base.css                    구조 레이어
```

## 개발

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Vercel 배포

이 프로젝트는 레포 루트가 아니라 `jiwon-moa/` 하위에 있습니다.

1. Vercel에서 이 레포를 Import
2. **Root Directory** 를 `jiwon-moa` 로 지정
3. Framework Preset은 Next.js 자동 감지
4. Environment Variables 설정

| 변수 | 값 | 비고 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://구매한도메인` | 메타데이터·사이트맵에 사용 |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXX` | AdSense 승인 후 설정 |

`NEXT_PUBLIC_ADSENSE_CLIENT`가 비어 있으면 광고 스크립트를 아예 로드하지 않고
플레이스홀더만 표시합니다. 승인 후 값을 넣으면 자동으로 활성화됩니다.

## 도메인 연결 후 할 일

1. Vercel → Settings → Domains 에서 도메인 추가
2. `NEXT_PUBLIC_SITE_URL` 환경변수 갱신 후 재배포
3. Google Search Console 등록 + `sitemap.xml` 제출
4. AdSense 신청 (개인정보처리방침 `/privacy` 이미 포함)
