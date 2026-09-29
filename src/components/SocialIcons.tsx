type Network = "facebook" | "instagram" | "linkedin";

const labels: Record<Network, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

// Markenfarben der Plattformen
const bg: Record<Network, string> = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
  linkedin: "bg-[#0A66C2]",
};

function Glyph({ network }: { network: Network }) {
  if (network === "facebook")
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M14.2 8.4V6.5c0-.9.6-1.1 1-1.1h2.6V1.6L14.2 1.6c-4 0-4.9 3-4.9 4.9v1.9H7v4h2.3V22.4h4.9V12.4h3.3l.4-4h-3.7z" />
      </svg>
    );
  if (network === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="currentColor" aria-hidden>
        <path d="M5.1 3.2a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6zM3.1 9.2h4v11.7h-4zM9.6 9.2h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.7 2.6 4.7 6v7.1h-4v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.4h-4z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialIcons({ links }: { links: Partial<Record<Network, string | null>> }) {
  const items = (Object.keys(labels) as Network[]).filter((n) => links[n]);
  if (items.length === 0) return null;
  return (
    <ul className="flex gap-3">
      {items.map((n) => (
        <li key={n}>
          <a
            href={links[n]!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Hammer & Partner auf ${labels[n]}`}
            className={`grid h-12 w-12 place-items-center rounded-2xl text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${bg[n]}`}
          >
            <Glyph network={n} />
          </a>
        </li>
      ))}
    </ul>
  );
}
