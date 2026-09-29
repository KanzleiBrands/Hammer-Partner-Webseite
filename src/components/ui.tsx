import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? "text-white/75" : "text-brand"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-white/50" : "bg-brand/60"}`} />
      {children}
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "outline" | "outline-light" | "ghost";
  className?: string;
  arrow?: boolean;
};

const variants = {
  primary: "bg-brand text-white hover:bg-brand-600 shadow-[0_10px_30px_-10px_rgba(37,55,129,0.6)]",
  light: "bg-white text-brand hover:bg-brand-50",
  outline: "border border-ink/15 text-ink hover:border-brand hover:text-brand",
  "outline-light": "border border-white/40 text-white hover:bg-white/10",
  ghost: "text-brand hover:text-brand-600 px-0",
};

export function Button({ href, children, variant = "primary", className = "", arrow = true }: BtnProps) {
  const external = href.startsWith("http");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
