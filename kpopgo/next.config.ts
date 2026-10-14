import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Guides are statically rendered and revalidated — no database needed for the MVP.
  // When platform steps change we edit content/guides.ts and redeploy.
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
