"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "backdrop-blur-xl" : ""
      }`}
      style={{
        background: scrolled ? "color-mix(in oklab, var(--bg) 78%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-18 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grad-brand grid size-9 place-items-center rounded-xl font-display text-[15px] font-extrabold tracking-tight text-white shadow-lg shadow-grape-600/25">
            K
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            KPOP<span className="grad-text">GO</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/guides"
            className="rounded-pill px-3 py-2 text-sm font-medium text-soft transition-colors hover:text-[var(--text)]"
          >
            Guides
          </Link>
          <Link
            href="/#platforms"
            className="hidden rounded-pill px-3 py-2 text-sm font-medium text-soft transition-colors hover:text-[var(--text)] sm:block"
          >
            Platforms
          </Link>
          <ThemeToggle />
          <Link
            href="/guides/buy-k-pop-concert-tickets-from-overseas"
            className="grad-brand rounded-pill px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-grape-600/25 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Start here
          </Link>
        </div>
      </nav>
      <span className="sr-only">{site.tagline}</span>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("kpopgo-theme");
    } catch {
      // Private mode or blocked storage — fall back to the OS preference.
    }
    const initial =
      stored === "light" || stored === "dark"
        ? (stored as "light" | "dark")
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("kpopgo-theme", next);
    } catch {
      // Not persisting is acceptable; the page still renders correctly.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="grid size-9 place-items-center rounded-pill border border-[var(--border)] text-soft transition-colors hover:text-[var(--text)]"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        {theme === "light" ? (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
