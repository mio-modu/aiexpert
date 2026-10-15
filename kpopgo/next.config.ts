import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // The site has no forms and no uploads, so framing it serves nobody
          // but a clickjacker.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send the origin to third parties, never the full path. An ad
          // network does not need to know which guide somebody was reading.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here uses these, and AdSense should not acquire them
          // through a frame either.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
      {
        // Cut-outs and stage frames are content-addressed by name and only
        // change when the artwork does, so they can be cached hard.
        source: "/img/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
