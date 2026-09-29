import { LETTERS, MARK_VIEWBOX, SPHERE, SWOOSH } from "./logo-paths";

// Bildmarke aus den Originalvektoren (Swoosh + „H&P“), Kugel als SVG-Verlauf,
// Wortmarke typografisch in Inter für maximale Schärfe auf jedem Bildschirm.
export function LogoMark({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const light = variant === "light";
  const id = `hp-${variant}`;
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-sw`} x1="66" y1="140" x2="132" y2="110" gradientUnits="userSpaceOnUse">
          {light ? (
            <>
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="1" stopColor="#ffffff" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#2c43a3" />
              <stop offset=".55" stopColor="#253781" />
              <stop offset="1" stopColor="#1b2865" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`${id}-sp`} cx="107.6" cy="109.4" r="13.5" fx="106.8" fy="108.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".18" stopColor="#d9dadd" />
          <stop offset=".55" stopColor={light ? "#9095a3" : "#7d8088"} />
          <stop offset=".85" stopColor={light ? "#555a66" : "#3b3e45"} />
          <stop offset="1" stopColor={light ? "#3d414b" : "#26282d"} />
        </radialGradient>
        <linearGradient id={`${id}-lt`} x1="0" y1="126" x2="0" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={light ? "#e7e9ef" : "#a3a6ad"} />
          <stop offset="1" stopColor={light ? "#c3c8d4" : "#83868e"} />
        </linearGradient>
      </defs>
      <path d={SWOOSH} fill={`url(#${id}-sw)`} />
      <circle cx={SPHERE.cx} cy={SPHERE.cy} r={SPHERE.r} fill={`url(#${id}-sp)`} />
      <path d={LETTERS} fill={`url(#${id}-lt)`} />
    </svg>
  );
}

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const light = variant === "light";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark variant={variant} className="h-11 w-auto shrink-0" />
      <span className="leading-none">
        <span className={`block text-[17px] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          Hammer &amp; Partner <span className="font-normal opacity-70">mbB</span>
        </span>
        <span className={`mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] ${light ? "text-white/70" : "text-brand"}`}>
          Steuerberater
        </span>
      </span>
    </span>
  );
}
