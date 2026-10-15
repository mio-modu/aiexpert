import { ImageResponse } from "next/og";
import { getGuide, guides } from "@/content/guides";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

/**
 * Per-guide share card. It carries the verification date, because a dated page
 * is the one claim this site makes that the stale guides it competes with
 * cannot — and the card is where someone decides whether to click.
 *
 * Latin only: ImageResponse ships a Latin font and would render Hangul as tofu.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);

  const title = guide?.title ?? site.name;
  const steps = guide ? `${String(guide.steps.length).padStart(2, "0")} STEPS` : "";
  const stamp = guide ? `${guide.status === "verified" ? "VERIFIED" : "DRAFT"} · ${guide.lastVerified}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f4ef",
          padding: "68px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#14131a",
            }}
          >
            KPOP<span style={{ color: "#d8341f" }}>GO</span>
          </div>
          {stamp ? (
            <div
              style={{
                display: "flex",
                padding: "9px 18px",
                borderRadius: 8,
                border: "3px solid #d8341f",
                color: "#d8341f",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              {stamp}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 52 ? 62 : 76,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: "#14131a",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", width: 72, height: 6, background: "#d8341f" }} />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "rgba(20,19,26,0.6)",
            }}
          >
            {steps}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
