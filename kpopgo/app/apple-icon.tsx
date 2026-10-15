import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon. Same mark, with room for the full wordmark's weight. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d8341f",
          color: "#fffaf6",
          fontSize: 124,
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        K
      </div>
    ),
    size,
  );
}
