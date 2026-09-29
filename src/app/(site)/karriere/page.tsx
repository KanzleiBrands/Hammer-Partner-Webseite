import type { Metadata } from "next";
import Image from "next/image";
import { Check, X, Clock, Euro, Palmtree, Users } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ParallaxImage } from "@/components/Parallax";
import { BenefitIcon } from "@/components/Icons";
import { JobImageCard } from "@/components/JobImageCard";
import { Faq } from "@/components/Faq";
import { ContactPerson } from "@/components/ContactPerson";
import { Button, Container, Eyebrow } from "@/components/ui";
import { contacts, getJobs, getKarriere } from "@/lib/content";

export const metadata: Metadata = {
  title: "Karriere – Jobs als Steuerfachangestellte in Betzdorf",
  description:
    "Arbeite bei Hammer & Partner in Betzdorf: per Du, flexible Arbeitszeiten, Homeoffice, 13,3 Gehälter, 30 Tage Urlaub und ein Team, das zusammenhält.",
};

const passt = [
  "Du bist freundlich, hilfsbereit und hast Freude an deiner Arbeit.",
  "Du arbeitest gerne selbstständig und übernimmst Verantwortung.",
  "Du magst digitale Prozesse und DATEV ist für dich kein Fremdwort.",
  "Du willst dich weiterentwickeln – fachlich und persönlich.",
  "Du bist ein Teamplayer und hilfst Kolleginnen und Kollegen gern.",
];
const passtNicht = [
  "Du arbeitest lieber allein als im Team.",
  "Ellenbogen sind für dich wichtiger als Zusammenhalt.",
  "Pendelordner und Papierstapel sind dir lieber als digitale Abläufe.",
  "Weiterentwicklung ist dir eigentlich egal.",
];

const schritte = [
  { titel: "Bewirb dich in 60 Sekunden", text: "Ein paar Klicks, kein Anschreiben. Lebenslauf? Gerne, aber kein Muss." },
  { titel: "Wir melden uns persönlich", text: "Wir rufen dich an und lernen uns in einem kurzen, lockeren Gespräch kennen." },
  { titel: "Kennenlernen vor Ort", text: "Du besuchst uns in Betzdorf, lernst das Team kennen und stellst alle deine Fragen." },
  { titel: "Willkommen im Team", text: "Passt es für beide Seiten, bekommst du deine Zusage – und wir starten gemeinsam." },
];

const gallery = [
  { src: "/images/fotos/kolleginnen-ordner.webp", cls: "row-span-2" },
  { src: "/images/fotos/arbeitsplatz-3.webp", cls: "" },
  { src: "/images/fotos/buerohund.webp", cls: "" },
  { src: "/images/fotos/team-jung.webp", cls: "col-span-2" },
  { src: "/images/fotos/headset.webp", cls: "row-span-2" },
  { src: "/images/fotos/stehpult.webp", cls: "row-span-2" },
  { src: "/images/fotos/besprechung-team.webp", cls: "" },
  { src: "/images/fotos/flur-gespraech.webp", cls: "col-span-2" },
  { src: "/images/fotos/arbeitsplatz-5.webp", cls: "" },
  { src: "/images/fotos/rechner.webp", cls: "col-span-2" },
];

export default async function KarrierePage() {
  const [karriere, jobs] = await Promise.all([getKarriere(), getJobs()]);
  const contact = contacts.klapper;

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-brand-900 pt-32 pb-16 text-white">
        <Image src="/images/fotos/quartett.webp" alt="Teammitglieder von Hammer & Partner vor der Kanzlei" fill preload sizes="100vw" className="animate-kenburns object-cover" style={{ objectPosition: "50% 30%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/55 to-brand-900/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 via-brand-900/10 to-transparent" />
        <Container className="relative">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Karriere bei Hammer &amp; Partner · Betzdorf
            </span>
          </Reveal>
          <h1 className="text-balance mt-6 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[5.6rem]">
            <RevealWords text={karriere.heroTitel} delay={0.15} />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{karriere.heroText}</p>
          </Reveal>
          <Reveal delay={0.65}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#stellen" variant="light">Offene Stellen ansehen</Button>
              <Button href="/karriere/initiativbewerbung" variant="outline-light">Initiativ bewerben</Button>
            </div>
          </Reveal>
          <Reveal delay={0.8}>
            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 ring-1 ring-white/15 backdrop-blur-md sm:grid-cols-4">
              {[
                { icon: Users, value: 15, suffix: "", label: "Kolleginnen & Kollegen" },
                { icon: Palmtree, value: 30, suffix: " Tage", label: "Urlaub im Jahr" },
                { icon: Euro, value: 13, suffix: ",3", label: "Gehälter pro Jahr" },
                { icon: Clock, value: 20, suffix: "–40 h", label: "Wochenstunden frei wählbar" },
              ].map((s) => (
                <div key={s.label} className="bg-brand-900/40 p-5 sm:p-6">
                  <s.icon className="h-5 w-5 text-brand-200" />
                  <dd className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    <Counter value={s.value} />
                    {s.suffix}
                  </dd>
                  <dt className="mt-1 text-sm text-white/70">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Über uns */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <ParallaxImage src="/images/fotos/team-innen.webp" alt="Das Team von Hammer & Partner" className="aspect-[5/4] rounded-[2rem]" strength={40} />
            <div className="absolute -right-3 -bottom-8 rounded-3xl bg-brand px-6 py-5 text-white shadow-2xl sm:-right-8">
              <div className="text-4xl font-semibold tracking-tight">„Du“</div>
              <div className="text-sm text-white/80">vom Azubi bis zum Chef</div>
            </div>
          </Reveal>
          <div>
            <Reveal><Eyebrow>Über uns</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                Eine Kanzlei, in der man gerne ankommt.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Seit 1965 begleiten wir Unternehmer und Selbstständige in der Region. Was uns
                ausmacht? Ein sehr freundliches, offenes Team, in dem jeder gerne zur Arbeit kommt. Wir
                sprechen uns alle mit „Du“ an, unterstützen uns gegenseitig und arbeiten
                selbstständig – mit flachen Hierarchien und kurzen Wegen.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {["Flache Hierarchien und selbstständiges Arbeiten", "Ein Team, das sich gegenseitig hilft", "Moderne, digitale Arbeitsplätze in Betzdorf"].map((t, i) => (
                <Reveal as="li" key={t} delay={0.3 + i * 0.08}>
                  <span className="flex items-center gap-3 font-medium">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white"><Check className="h-4 w-4" /></span>
                    {t}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Passt das zu dir */}
      <section className="bg-grey-50 py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <Reveal><Eyebrow>Ehrlich gesagt</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                Passt das zu dir? <span className="text-brand">Finde es heraus.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted">
                Uns ist wichtig, dass es menschlich passt. Sei ehrlich zu dir – dann wissen wir beide
                schnell, ob wir zusammengehören.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <div className="h-full rounded-[2rem] bg-brand p-8 text-white sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand"><Check className="h-6 w-6" /></span>
                <h3 className="mt-6 text-2xl font-semibold">Das passt zu dir</h3>
                <ul className="mt-6 space-y-4">
                  {passt.map((p) => (
                    <li key={p} className="flex gap-3 text-[17px]"><Check className="mt-1 h-5 w-5 shrink-0 text-brand-200" />{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="h-full rounded-[2rem] bg-white p-8 ring-1 ring-ink/10 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-grey-100 text-ink/60"><X className="h-6 w-6" /></span>
                <h3 className="mt-6 text-2xl font-semibold">Das passt eher nicht</h3>
                <ul className="mt-6 space-y-4 text-muted">
                  {passtNicht.map((p) => (
                    <li key={p} className="flex gap-3 text-[17px]"><X className="mt-1 h-5 w-5 shrink-0 text-ink/40" />{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Offene Stellen */}
      <section id="stellen" className="scroll-mt-20 py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal><Eyebrow>Offene Stellen</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Aktuell suchen wir <span className="text-brand">dich</span>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <span className="text-muted">{jobs.length} {jobs.length === 1 ? "offene Stelle" : "offene Stellen"} in Betzdorf</span>
            </Reveal>
          </div>
          <div className="mt-12 space-y-5">
            {jobs.map((job, i) => (
              <Reveal key={job.slug} delay={i * 0.1}><JobImageCard job={job} /></Reveal>
            ))}
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border-2 border-dashed border-brand/25 p-8 sm:flex-row sm:items-center sm:p-10">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">Nichts Passendes dabei?</h3>
                  <p className="mt-2 text-muted">Wir freuen uns immer über Menschen, die zu uns passen. Bewirb dich einfach initiativ.</p>
                </div>
                <Button href="/karriere/initiativbewerbung" variant="outline">Initiativ bewerben</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="grain relative overflow-hidden bg-brand-900 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute -top-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand/70 blur-[140px]" />
        <Container className="relative">
          <div className="max-w-2xl">
            <Reveal><Eyebrow light>Deine Vorteile</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                Das erwartet dich bei uns.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-white/75">Wir wollen, dass du dich wohlfühlst und gerne zur Arbeit kommst. Deshalb gibt es bei uns mehr als nur ein gutes Gehalt.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {karriere.benefits.map((b, i) => (
              <Reveal key={b.titel} delay={(i % 4) * 0.06}>
                <div className="group h-full rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:text-ink">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white transition-colors duration-500 group-hover:bg-brand">
                    <BenefitIcon name={b.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{b.titel}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65 transition-colors duration-500 group-hover:text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Einblicke */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Reveal><Eyebrow>Einblicke</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">So sieht dein Arbeitsalltag aus.</h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-md text-lg text-muted">Helle Büros, höhenverstellbare Schreibtische, zwei Bildschirme – und ab und zu Besuch auf vier Pfoten.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
            {gallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 4) * 0.06} className={`relative overflow-hidden rounded-3xl ${g.cls}`}>
                <Image src={g.src} alt="Arbeitsalltag bei Hammer & Partner" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] hover:scale-105" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Bewerbungsprozess */}
      <section className="bg-brand-50 py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><Eyebrow>Bewerbung</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">So läuft deine Bewerbung.</h2>
            </Reveal>
          </div>
          <ol className="relative mt-16 grid gap-5 md:grid-cols-4">
            <div className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-brand/20 md:block" />
            {schritte.map((s, i) => (
              <Reveal as="li" key={s.titel} delay={i * 0.1} className="relative">
                <div className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-2xl font-semibold text-white">{i + 1}</span>
                  <h3 className="mt-6 text-xl font-semibold">{s.titel}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ + Kontakt */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>Häufige Fragen</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Noch Fragen?</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-muted">Frag uns einfach – wir antworten dir persönlich.</p>
              </Reveal>
              <Reveal delay={0.3} className="mt-10">
                <ContactPerson {...contact} />
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <Faq items={karriere.faq} />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-brand px-6 py-20 text-center text-white sm:px-16">
          <Image src="/images/fotos/team-aussen.webp" alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="relative">
            <Reveal>
              <h2 className="text-balance mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Klingt gut? Dann lass uns kennenlernen.</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">Deine Bewerbung dauert nur 60 Sekunden und wird selbstverständlich vertraulich behandelt.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                {jobs[0] && <Button href={`/karriere/${jobs[0].slug}#bewerben`} variant="light">Jetzt bewerben</Button>}
                <Button href="/karriere/initiativbewerbung" variant="outline-light">Initiativ bewerben</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
