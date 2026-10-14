import type { Guide } from "@/content/guides";
import { site } from "./site";

/**
 * Structured data serves two jobs here:
 *  - classic rich results for the how-to and FAQ blocks
 *  - giving AI answer engines something quotable and attributable, since a
 *    chunk of this traffic will never reach the page at all
 */
export function guideJsonLd(guide: Guide) {
  const url = `${site.url}/guides/${guide.slug}`;

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.summary,
    url,
    totalTime: `PT${guide.readMinutes}M`,
    dateModified: guide.lastVerified,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    step: guide.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.body,
      url: `${url}#step-${i + 1}`,
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
      { "@type": "ListItem", position: 3, name: guide.name, item: url },
    ],
  };

  return [howTo, faq, breadcrumb];
}
