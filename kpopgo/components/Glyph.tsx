type GlyphName = "ticket" | "id" | "card" | "star" | "parcel";

const paths: Record<GlyphName, React.ReactNode> = {
  ticket: (
    <>
      <path d="M3 9.5V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5Z" />
      <path d="M12 7.5v9" strokeDasharray="2 2.5" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="11" r="2.25" />
      <path d="M5.75 16.25c.7-1.6 1.85-2.4 3.25-2.4s2.55.8 3.25 2.4M14.75 10h3.5M14.75 13.5h3.5" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19M6 14.5h3.5" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.5 6 .85-4.35 4.3 1.05 6-5.3-2.9-5.3 2.9 1.05-6L3.4 9.85l6-.85Z" />
  ),
  parcel: (
    <>
      <path d="M3.5 8.25 12 4l8.5 4.25v7.5L12 20l-8.5-4.25Z" />
      <path d="M3.5 8.25 12 12.5l8.5-4.25M12 12.5V20" />
    </>
  ),
};

export function Glyph({
  name,
  className = "size-6",
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
