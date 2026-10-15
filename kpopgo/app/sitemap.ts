import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/words`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: new Date(g.lastVerified),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
