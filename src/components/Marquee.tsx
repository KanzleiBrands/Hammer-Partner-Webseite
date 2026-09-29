export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-4xl font-semibold tracking-tight sm:text-6xl">
            {item}
            <span className="h-3 w-3 rounded-full bg-current opacity-30" />
          </span>
        ))}
      </div>
    </div>
  );
}
