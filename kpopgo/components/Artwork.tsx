import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getArt } from "@/content/artwork";

/**
 * Renders a generated image when one has been dropped into public/img/, and the
 * drawn SVG fallback until then.
 *
 * The check runs at build time on the server, so there is no client-side probe
 * and no flash of a missing image. A piece that has not been rendered yet simply
 * keeps its SVG — which is why the site has always been shippable without any
 * image assets.
 */
export function Artwork({
  name,
  fallback,
  priority = false,
  className,
}: {
  name: string;
  fallback: React.ReactNode;
  priority?: boolean;
  className?: string;
}) {
  const art = getArt(name);
  if (!art) return <>{fallback}</>;

  const file = path.join(process.cwd(), "public", "img", art.file);
  if (!fs.existsSync(file)) return <>{fallback}</>;

  return (
    <Image
      src={`/img/${art.file}`}
      alt={art.alt}
      width={art.width}
      height={art.height}
      priority={priority}
      className={className}
      sizes="(max-width: 900px) 100vw, 50vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
}
