// Nachbau der Bildmarke (Swoosh + Kugel) als SVG, bis das Original-Logo
// aus der .ai-Datei als SVG vorliegt. Dann: /public/logo.svg einsetzen.
export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const light = variant === "light";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 44" className="h-9 w-auto shrink-0" aria-hidden>
        <defs>
          <radialGradient id={`sph-${variant}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={light ? "#ffffff" : "#f2f2f2"} />
            <stop offset="55%" stopColor={light ? "#c9cfdf" : "#9aa0ab"} />
            <stop offset="100%" stopColor={light ? "#8d96b3" : "#4b505b"} />
          </radialGradient>
          <linearGradient id={`sw-${variant}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={light ? "#ffffff" : "#253781"} stopOpacity="0.35" />
            <stop offset="100%" stopColor={light ? "#ffffff" : "#253781"} />
          </linearGradient>
        </defs>
        <circle cx="38" cy="11" r="9" fill={`url(#sph-${variant})`} />
        <path
          d="M2 28 C 16 44, 40 42, 60 14 C 44 34, 22 38, 2 28 Z"
          fill={`url(#sw-${variant})`}
        />
      </svg>
      <span className="leading-none">
        <span
          className={`block text-[17px] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}
        >
          Hammer &amp; Partner <span className="font-normal opacity-70">mbB</span>
        </span>
        <span
          className={`mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] ${light ? "text-white/70" : "text-brand"}`}
        >
          Steuerberater
        </span>
      </span>
    </span>
  );
}
