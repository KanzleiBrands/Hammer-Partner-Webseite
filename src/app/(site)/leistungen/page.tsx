import { hy } from "@/lib/hyphen";
import type { Metadata } from "next";
import Image from "next/image";
import { Check, X, CircleAlert } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/Parallax";
import { Marquee } from "@/components/Marquee";
import { Button, Container, Eyebrow } from "@/components/ui";
import { getLeistungen } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leistungen – Steuerberatung, Gestaltung & digitale Buchhaltung",
  description:
    "Laufende Steuerberatung, vorausschauende Steuergestaltung, digitale Buchhaltung mit DATEV und betriebswirtschaftliche Beratung – aus einer Hand in Betzdorf.",
};

const probleme = [
  { titel: "Die Nachzahlung kommt überraschend", text: "Du erfährst erst Monate später, was du hättest zurücklegen müssen." },
  { titel: "Pendelordner und Papierchaos", text: "Belege sammeln, kopieren, vorbeibringen – und dann wochenlang warten." },
  { titel: "Keiner denkt voraus", text: "Dein Steuerberater erledigt die Pflicht, aber niemand zeigt dir Gestaltungsmöglichkeiten." },
  { titel: "Zahlen, die niemand erklärt", text: "Du bekommst Auswertungen, aber keiner bespricht mit dir, was sie bedeuten." },
];

const vergleich = [
  ["Rückblickende Erledigung der Pflichten", "Vorausschauende Planung – bevor Entscheidungen fallen"],
  ["Papier, Ordner und Postweg", "Papierlos mit DATEV Unternehmen online"],
  ["Zahlen erst Monate später", "Auswertungen in Echtzeit"],
  ["Förmlich und distanziert", "Persönlich, auf Augenhöhe und per Du"],
  ["Fachchinesisch", "Klare Worte und ehrliche Einschätzungen"],
];

const prozess = [
  { titel: "Kennenlernen", text: "Im Erstgespräch hören wir zu: Wo stehst du, was hast du vor, wo drückt der Schuh?" },
  { titel: "Analyse", text: "Wir schauen uns deine Unterlagen an und zeigen dir, wo Potenziale und Risiken liegen." },
  { titel: "Umstellung", text: "Wir richten die digitale Zusammenarbeit ein und übernehmen den Wechsel für dich." },
  { titel: "Laufende Begleitung", text: "Wir bleiben dran – mit regelmäßigen Gesprächen und dem Blick nach vorn." },
];

export default async function LeistungenPage() {
  const leistungen = await getLeistungen();
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Steuerberatung, die nach vorn denkt."
        text="Die Pflicht erledigen wir zuverlässig. Den Unterschied machen Weitblick, digitale Prozesse und echte Begleitung für dich und dein Unternehmen."
        image="/images/fotos/besprechung-flipchart.webp"
        position="50% 35%"
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {leistungen.map((l) => (
            <a key={l.slug} href={`#${l.slug}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 backdrop-blur transition hover:bg-white hover:text-brand">
              {l.titel}
            </a>
          ))}
        </div>
      </PageHero>

      {/* Kennst du das */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><Eyebrow>Kennst du das?</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Steuerberatung muss sich nicht so anfühlen.</h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {probleme.map((p, i) => (
              <Reveal key={p.titel} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-grey-50 p-7 ring-1 ring-ink/5">
                  <CircleAlert className="h-7 w-7 text-brand" strokeWidth={1.6} />
                  <h3 className="mt-6 text-lg font-semibold">{p.titel}</h3>
                  <p className="mt-2 text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <p className="max-w-2xl text-xl font-medium sm:text-2xl">Bei uns ist das anders: Wir denken voraus, arbeiten digital und sprechen Klartext.</p>
              <Button href="/kontakt" variant="light">Erstgespräch vereinbaren</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Leistungen im Detail */}
      <div className="space-y-4 pb-8">
        {leistungen.map((l, i) => (
          <section key={l.slug} id={l.slug} className="scroll-mt-20 py-16 sm:py-24">
            <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Reveal>
                  <span className="text-6xl font-semibold tracking-tight text-brand/15 sm:text-8xl">0{i + 1}</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="-mt-4 text-[2.1rem] font-semibold leading-tight tracking-tight sm:text-5xl">{hy(l.titel)}</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-xl leading-relaxed text-ink/80">{l.kurz}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{l.text}</p>
                </Reveal>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {l.punkte.map((p, j) => (
                    <Reveal as="li" key={p} delay={0.2 + j * 0.04}>
                      <span className="flex items-center gap-3 rounded-2xl bg-grey-50 px-4 py-3.5 font-medium">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white"><Check className="h-3.5 w-3.5" /></span>
                        {p}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                {l.bild && <ParallaxImage src={l.bild} alt={l.titel} className="aspect-[4/5] rounded-[2rem]" strength={40} />}
              </Reveal>
            </Container>
          </section>
        ))}
      </div>

      {/* Vergleich */}
      <section className="grain relative overflow-hidden bg-brand-900 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute -right-40 -bottom-40 h-[34rem] w-[34rem] rounded-full bg-brand/70 blur-[140px]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><Eyebrow light>Der Unterschied</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Klassisch – oder Hammer &amp; Partner?</h2>
            </Reveal>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] bg-white/[0.05] p-8 ring-1 ring-white/10 sm:p-10">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Klassisch</div>
                <ul className="mt-8 space-y-5">
                  {vergleich.map(([a]) => (
                    <li key={a} className="flex gap-3 text-white/70"><X className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />{a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-[2rem] bg-white p-8 text-ink shadow-2xl sm:p-10">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Mit Hammer &amp; Partner</div>
                <ul className="mt-8 space-y-5">
                  {vergleich.map(([, b]) => (
                    <li key={b} className="flex gap-3 font-medium"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white"><Check className="h-3 w-3" /></span>{b}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Prozess */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>Zusammenarbeit</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">So starten wir gemeinsam.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-muted">Ein Wechsel zu uns ist einfacher, als du denkst. Wir kümmern uns um alles Organisatorische.</p>
              </Reveal>
              <Reveal delay={0.3}><div className="mt-8"><Button href="/kontakt">Jetzt starten</Button></div></Reveal>
            </div>
          </div>
          <ol className="space-y-5 lg:col-span-8">
            {prozess.map((p, i) => (
              <Reveal as="li" key={p.titel} delay={i * 0.08}>
                <div className="group flex gap-6 rounded-[2rem] bg-grey-50 p-7 transition-colors duration-500 hover:bg-brand hover:text-white sm:gap-10 sm:p-10">
                  <span className="text-5xl font-semibold tracking-tight text-brand/30 transition-colors group-hover:text-white/40 sm:text-7xl">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl font-semibold">{p.titel}</h3>
                    <p className="mt-2 text-lg text-muted transition-colors group-hover:text-white/80">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="overflow-hidden border-y border-grey-100 py-16 text-brand">
        <Marquee items={["Handel", "Handwerk", "Maschinenbau", "Gesundheit", "Freiberufler", "Selbstständige", "Existenzgründer"]} />
      </section>

      <section className="relative overflow-hidden">
        <Image src="/images/fotos/beratung-gespraech.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-brand-900/80" />
        <Container className="relative py-24 text-center text-white sm:py-32">
          <Reveal>
            <h2 className="text-balance mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Bereit für eine Steuerberatung, die mitdenkt?</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/kontakt" variant="light">Erstgespräch vereinbaren</Button>
              <Button href="/ueber-uns" variant="outline-light">Mehr über uns</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
