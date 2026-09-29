"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/karriere", label: "Karriere" },
  { href: "/mandantenbereich", label: "Mandantenbereich" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header({
  jobCount,
  phone,
  phoneLink,
}: {
  jobCount: number;
  phone: string;
  phoneLink: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Menü gilt nur für die Seite, auf der es geöffnet wurde – nach Navigation automatisch zu.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-white/85 shadow-[0_1px_0_rgba(15,21,38,0.06)] backdrop-blur-xl"
            : "bg-gradient-to-b from-black/30 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            solid ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" aria-label="Hammer & Partner – Startseite" className="relative z-10">
            <Logo variant={solid ? "dark" : "light"} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                    solid
                      ? active
                        ? "text-brand"
                        : "text-ink/80 hover:text-brand"
                      : active
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.href === "/karriere" && jobCount > 0 && (
                    <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-white ring-2 ring-white/40">
                      {jobCount}
                    </span>
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${solid ? "bg-brand" : "bg-white"}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${phoneLink}`}
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all xl:flex ${
                solid
                  ? "text-ink hover:text-brand"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Phone className="h-4 w-4" /> {phone}
            </a>
            <Link
              href="/kontakt"
              className={`hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:flex ${
                solid
                  ? "bg-brand text-white hover:bg-brand-600"
                  : "bg-white text-brand hover:bg-brand-50"
              }`}
            >
              Termin anfragen <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpenFor(open ? null : pathname)}
              className={`relative z-10 grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                solid ? "text-ink hover:bg-grey-100" : "text-white hover:bg-white/10"
              }`}
              aria-expanded={open}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-white px-4 pt-24 pb-8 sm:px-6 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile Navigation">
              {[{ href: "/", label: "Start" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between border-b border-grey-100 py-4 text-3xl font-semibold tracking-tight text-ink"
                  >
                    {item.label}
                    {item.href === "/karriere" && jobCount > 0 && (
                      <span className="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">
                        {jobCount} {jobCount === 1 ? "Stelle" : "Stellen"}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto grid gap-3">
              <a
                href={`tel:${phoneLink}`}
                className="flex items-center justify-center gap-2 rounded-full border border-grey px-6 py-4 font-semibold text-ink"
              >
                <Phone className="h-5 w-5" /> {phone}
              </a>
              <Link
                href="/kontakt"
                className="flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-semibold text-white"
              >
                Termin anfragen <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
