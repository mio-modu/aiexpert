import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap-narrow section">
      <p className="stat-label">404</p>
      <h1 style={{ fontSize: "var(--fs-h1)", margin: "calc(var(--u)*1.5) 0 calc(var(--u)*2)" }}>
        찾으시는 페이지가 없습니다
      </h1>
      <p className="t-lead" style={{ marginBottom: "calc(var(--u)*3)" }}>
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
      </p>
      <div className="row">
        <Link href="/diagnose" className="btn btn-primary">지원금 진단하기</Link>
        <Link href="/benefits" className="btn btn-ghost">전체 지원금 보기</Link>
      </div>
    </div>
  );
}
