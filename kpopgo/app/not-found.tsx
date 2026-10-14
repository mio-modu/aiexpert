import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-start px-4 py-28 sm:px-6">
      <div
        className="orb animate-float -top-20 left-1/4 size-[26rem]"
        style={{ background: "var(--color-grape-600)" }}
      />
      <p className="relative font-display text-sm font-bold tracking-[0.2em] uppercase text-faint">
        404
      </p>
      <h1 className="relative mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
        That page <span className="grad-text">moved on.</span>
      </h1>
      <p className="relative mt-5 max-w-md text-lg leading-relaxed text-soft">
        Fitting, given half this site is about platforms getting renamed. Try the guides
        instead.
      </p>
      <Link
        href="/guides"
        className="grad-brand relative mt-9 rounded-pill px-6 py-3.5 font-display text-base font-bold text-white shadow-xl shadow-grape-600/30 transition-transform hover:scale-[1.03]"
      >
        All guides
      </Link>
    </div>
  );
}
