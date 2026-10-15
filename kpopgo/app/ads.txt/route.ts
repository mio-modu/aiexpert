import { ads } from "@/lib/ads";

/**
 * ads.txt — the IAB authorised-sellers file.
 *
 * AdSense warns about and can eventually restrict earnings on a site serving
 * ads without one, so it is generated from the same publisher id the units
 * use. No id configured means no file, which is correct: an ads.txt naming
 * nobody is worse than none.
 */
export const dynamic = "force-static";

export function GET() {
  if (!ads.client) {
    return new Response("", { status: 404 });
  }
  // The publisher id without the "ca-" prefix, as the spec expects.
  const pub = ads.client.replace(/^ca-/, "");
  const body = `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
