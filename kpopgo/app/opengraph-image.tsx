import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Most of this site's early distribution is a link pasted into a
 * fan community, so the card is the first impression far more often than the
 * home page is.
 *
 * Latin only, no Hangul: ImageResponse ships a Latin font and would render
 * Korean glyphs as tofu. The Korean belongs on the page, not here.
 */
export default function OpengraphImage() {
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
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 54,
              height: 54,
              borderRadius: 12,
              border: "4px solid #d8341f",
              color: "#d8341f",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            K
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#14131a",
            }}
          >
            KPOP<span style={{ color: "#d8341f" }}>GO</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "#14131a",
            maxWidth: 940,
          }}
        >
          Buying K-pop tickets from outside Korea
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(20,19,26,0.66)", maxWidth: 720 }}>
            Which platform. Which identity check. Why your card got declined.
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 8,
              border: "3px solid #d8341f",
              color: "#d8341f",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            DATED · SOURCED
          </div>
        </div>
      </div>
    ),
    size,
  );
}
