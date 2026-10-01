import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt – Steuerberater in Betzdorf",
  description: "Kontakt zu Hammer & Partner mbB Steuerberater in Betzdorf: Telefon, E-Mail, Öffnungszeiten und Kontaktformular.",
};

export default async function KontaktPage() {
  const s = await getSettings();
  const cards = [
    { icon: Phone, label: "Telefon", value: s.telefon, href: `tel:${s.telefonLink}` },
    { icon: Mail, label: "E-Mail", value: s.email, href: `mailto:${s.email}` },
    { icon: MapPin, label: "Adresse", value: `${s.strasse}, ${s.ort}`, href: "https://www.google.com/maps/search/?api=1&query=Hammer+%26+Partner+mbB+Moltkestra%C3%9Fe+71+57518+Betzdorf" },
  ];
  return (
    <>
      <PageHero
        compact
        eyebrow="Kontakt"
        title="Lass uns sprechen."
        text="Ob Erstgespräch, Wechsel oder eine konkrete Frage: Wir nehmen uns Zeit für Dich."
        image="/images/fotos/empfang-hund.webp"
        position="50% 48%"
      />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="min-w-0 space-y-5 lg:col-span-5">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5 rounded-3xl bg-grey-50 p-6 transition hover:bg-brand hover:text-white"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-brand">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted transition group-hover:text-white/70">{c.label}</span>
                    <span className="block text-lg font-semibold [overflow-wrap:anywhere]">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 opacity-40 transition group-hover:rotate-45 group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-ink/10 p-6">
                <div className="flex items-center gap-3 font-semibold"><Clock className="h-5 w-5 text-brand" /> Öffnungszeiten</div>
                <div className="mt-4 space-y-3">
                  {s.oeffnungszeiten.map((o) => (
                    <div key={o.tage} className="flex justify-between gap-4 border-b border-ink/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-muted">{o.tage}</span>
                      <span className="font-medium">{o.zeiten}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                <Image src="/images/fotos/gebaeude.webp" alt="Die Kanzlei in Betzdorf" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
