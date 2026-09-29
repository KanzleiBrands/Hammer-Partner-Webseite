import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui";
import type { Settings } from "@/lib/content";

export function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-grey text-ink">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/70">
              Steuerberatung in Betzdorf – digital, vorausschauend und persönlich. Für uns steht
              der Mensch im Mittelpunkt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Termin anfragen <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/karriere"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm font-semibold transition hover:border-brand hover:text-brand"
              >
                Karriere
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Kontakt</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    {settings.strasse}
                    <br />
                    {settings.ort}
                  </span>
                </li>
                <li>
                  <a href={`tel:${settings.telefonLink}`} className="flex gap-3 hover:text-brand">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {settings.telefon}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Printer className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {settings.fax}
                </li>
                <li>
                  <a href={`mailto:${settings.email}`} className="flex gap-3 hover:text-brand">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {settings.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                Öffnungszeiten
              </h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {settings.oeffnungszeiten.map((o) => (
                  <li key={o.tage}>
                    <span className="block font-medium">{o.tage}</span>
                    <span className="text-ink/70">{o.zeiten}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Kanzlei</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {[
                  ["/leistungen", "Leistungen"],
                  ["/ueber-uns", "Über uns"],
                  ["/karriere", "Karriere"],
                  ["/mandantenbereich", "Mandantenbereich"],
                  ["/kontakt", "Kontakt"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-brand">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hammer &amp; Partner mbB Steuerberater</p>
          <div className="flex flex-wrap gap-6">
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Facebook
              </a>
            )}
            <Link href="/impressum" className="hover:text-brand">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-brand">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
