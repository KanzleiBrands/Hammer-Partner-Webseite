import type { Metadata } from "next";
import { ArrowUpRight, Cloud, Headset, ScanLine, ChartLine, Upload } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button, Container, Eyebrow } from "@/components/ui";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mandantenbereich – DATEV Unternehmen online & Fernbetreuung",
  description: "Direkter Zugang zu DATEV Unternehmen online und zur Mandanten-Fernbetreuung von Hammer & Partner.",
};

export default async function MandantenPage() {
  const s = await getSettings();
  const tools = [
    {
      icon: Cloud,
      titel: "DATEV Unternehmen online",
      text: "Belege hochladen, Auswertungen ansehen, Zahlungen vorbereiten – deine digitale Buchhaltung an einem Ort.",
      href: s.duoUrl,
      cta: "Zur Anmeldung",
    },
    {
      icon: Headset,
      titel: "Mandanten-Fernbetreuung",
      text: "Du brauchst Hilfe am Bildschirm? Starte die Fernwartung und wir unterstützen dich direkt – sicher und unkompliziert.",
      href: s.fernbetreuungUrl,
      cta: "Fernbetreuung starten",
    },
  ];
  const schritte = [
    { icon: ScanLine, titel: "Beleg erfassen", text: "Mit der App DATEV Upload mobil oder per Scanner." },
    { icon: Upload, titel: "Hochladen", text: "Direkt in Unternehmen online – verschlüsselt und sicher." },
    { icon: ChartLine, titel: "Zahlen sehen", text: "Wir buchen, du siehst deine Auswertungen tagesaktuell." },
  ];
  return (
    <>
      <PageHero
        compact
        eyebrow="Mandantenbereich"
        title="Alles, was du für die Zusammenarbeit brauchst."
        text="Schneller Zugang zu deinen digitalen Werkzeugen – rund um die Uhr."
        image="/images/fotos/schreibtisch.webp"
        position="50% 40%"
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {tools.map((t, i) => (
              <Reveal key={t.titel} delay={i * 0.1}>
                <a
                  href={t.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-brand p-8 text-white transition hover:bg-brand-600 sm:p-12"
                >
                  <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition group-hover:bg-white/20" />
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand"><t.icon className="h-8 w-8" /></span>
                  <h2 className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl">{t.titel}</h2>
                  <p className="mt-4 max-w-md text-lg text-white/80">{t.text}</p>
                  <span className="mt-10 inline-flex items-center gap-2 font-semibold">
                    {t.cta}
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand transition group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-grey-50 py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal><Eyebrow>So funktioniert&apos;s</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Deine Buchhaltung in drei Schritten.</h2>
            </Reveal>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {schritte.map((st, i) => (
              <Reveal as="li" key={st.titel} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-ink/5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand"><st.icon className="h-6 w-6" /></span>
                    <span className="text-5xl font-semibold text-brand/15">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{st.titel}</h3>
                  <p className="mt-2 text-muted">{st.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 ring-1 ring-ink/5 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-semibold">Fragen zur Einrichtung?</h3>
                <p className="mt-1 text-muted">Wir helfen dir beim Start mit Unternehmen online – ruf uns einfach an.</p>
              </div>
              <Button href={`tel:${s.telefonLink}`} arrow={false}>{s.telefon}</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
