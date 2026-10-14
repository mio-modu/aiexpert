import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="data dim">404</p>
      <h1 className="pl mt-4">
        That page <span className="mark">moved on.</span>
      </h1>
      <p className="han-m dim mt-4">그 페이지는 사라졌습니다</p>
      <p className="t-lg mt-6">
        Fitting, given half this site is about platforms getting renamed. Try the guides
        instead.
      </p>
      <Link href="/guides" className="btn mt-8">
        All guides
      </Link>
    </div>
  );
}
