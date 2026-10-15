import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * The favicon, generated rather than shipped as a file so it stays in step
 * with the palette. A K in 주朱 against the ink ground — the same two colours the
 * wordmark uses, which is all that survives at 32px anyway.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff3b2e",
          color: "#0a0a0f",
          fontSize: 24,
          fontWeight: 900,
          fontFamily: "sans-serif",
          borderRadius: 7,
        }}
      >
        K
      </div>
    ),
    size,
  );
}
