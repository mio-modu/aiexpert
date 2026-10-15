import Link from "next/link";
import { SITE, NAV } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>원</span>
          {SITE.name}
        </Link>
        <nav className="nav" aria-label="주요 메뉴">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} className={i > 0 ? "nav-hide-sm" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cols">
          <div>
            <h3>지원금 찾기</h3>
            <ul>
              <li><Link href="/diagnose">5문항 지원금 진단</Link></li>
              <li><Link href="/benefits">전체 지원금 목록</Link></li>
              <li><Link href="/target/youth">청년 지원금</Link></li>
              <li><Link href="/target/parent">양육 지원금</Link></li>
            </ul>
          </div>
          <div>
            <h3>계산기</h3>
            <ul>
              <li><Link href="/calculator/geunro-jangryeogeum">근로장려금 계산기</Link></li>
              <li><Link href="/calculator/janyeo-jangryeogeum">자녀장려금 계산기</Link></li>
            </ul>
          </div>
          <div>
            <h3>안내</h3>
            <ul>
              <li><Link href="/about">사이트 소개</Link></li>
              <li><Link href="/privacy">개인정보처리방침</Link></li>
              <li><Link href="/disclaimer">면책 고지</Link></li>
            </ul>
          </div>
        </div>

        <hr className="hr" />

        <p className="t-xs">
          {SITE.name}은 공공기관이 공개한 정보를 알기 쉽게 정리해 안내하는 민간 서비스입니다.
          정부·공공기관이 운영하는 사이트가 아니며, 신청 접수나 지급을 대행하지 않습니다.
          실제 지급 여부와 금액은 반드시 각 제도의 공식 사이트에서 확인하세요.
        </p>
        <p className="t-xs" style={{ marginTop: "0.6rem" }}>
          입력하신 소득·가구 정보는 브라우저 안에서만 계산에 사용되며 서버로 전송하거나 저장하지 않습니다.
        </p>
        <p className="t-xs" style={{ marginTop: "0.9rem" }}>
          © {new Date().getFullYear()} {SITE.name} · 문의 {SITE.contactEmail}
        </p>
      </div>
    </footer>
  );
}

/** AdSense 승인 전에는 자리만 잡아두고, 승인 후 client id 를 넣으면 노출됩니다. */
export function AdSlot({ label = "광고" }: { label?: string }) {
  if (!SITE.adsenseClient) {
    return (
      <div className="ad-slot" aria-hidden>
        {label} 영역 · 승인 후 노출
      </div>
    );
  }
  return (
    <div className="ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={SITE.adsenseClient}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function SourceStrip({
  sourceName, sourceUrl, baseYear, verifiedAt,
}: { sourceName: string; sourceUrl: string; baseYear: number; verifiedAt: string }) {
  return (
    <div className="meta-strip">
      <span><strong>기준</strong> {baseYear}년</span>
      <span><strong>확인일</strong> {verifiedAt}</span>
      <span>
        <strong>출처</strong>{" "}
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow">
          {sourceName} ↗
        </a>
      </span>
    </div>
  );
}
