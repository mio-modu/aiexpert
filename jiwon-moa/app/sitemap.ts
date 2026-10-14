import type { MetadataRoute } from "next";
import { BENEFITS } from "@/data/benefits";
import { CATEGORY_META, TARGET_META } from "@/lib/types";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");

  const stat = ["", "/diagnose", "/benefits", "/about", "/privacy", "/disclaimer"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: (p === "" ? "daily" : "monthly") as "daily" | "monthly",
    priority: p === "" ? 1 : p === "/diagnose" ? 0.9 : 0.5,
  }));

  const calcs = ["geunro-jangryeogeum", "janyeo-jangryeogeum"].map((s) => ({
    url: `${base}/calculator/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  const benefits = BENEFITS.map((b) => ({
    url: `${base}/benefit/${b.slug}`,
    lastModified: new Date(b.verifiedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const cats = Object.values(CATEGORY_META).map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const targets = Object.values(TARGET_META).map((t) => ({
    url: `${base}/target/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...stat, ...calcs, ...benefits, ...cats, ...targets];
}
