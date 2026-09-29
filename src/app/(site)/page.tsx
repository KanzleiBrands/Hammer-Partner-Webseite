import { hy } from "@/lib/hyphen";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight, Cloud, ChartLine, HandHeart, Handshake, MessageCircle, ScanLine, ShieldCheck, Sparkles,
} from "lucide-react";
import { HomeHero } from "@/components/HomeHero";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/Parallax";
import { Marquee } from "@/components/Marquee";
import { JobCard } from "@/components/JobCard";
import { Button, Container, Eyebrow } from "@/components/ui";
import { getHome, getJobs, getLeistungen, getSettings } from "@/lib/content";

const werte = [
  { icon: HandHeart, titel: "Wertschätzend", text: "Wir begegnen dir auf Augenhöhe – ob Solo-Selbstständige oder Mittelständler." },
  { icon: MessageCircle, titel: "Ehrlich & transparent", text: "Klare Worte statt Fachchinesisch. Du weißt immer, woran du bist." },
  { icon: ShieldCheck, titel: "Zuverlässig", text: "Fristen, Zahlen, Zusagen: Auf uns kannst du dich verlassen." },
  { icon: Handshake, titel: "Vertrauensvoll", text: "Viele Mandate begleiten wir seit Jahrzehnten – das ist kein Zufall." },
];

const digitalSteps = [
  { icon: ScanLine, titel: "Beleg hochladen", text: "Per App, Scanner oder E-Mail – direkt in DATEV Unternehmen online." },
  { icon: Cloud, titel: "Wir buchen", text: "Deine Belege landen sicher in der Cloud und werden laufend verarbeitet." },
  { icon: ChartLine, titel: "Zahlen in Echtzeit", text: "Auswertungen, offene Posten und Liquidität – jederzeit abrufbar." },
];

export default async function HomePage() {
  const [home, settings, leistungen, jobs] = await Promise.all([
    getHome(), getSettings(), getLeistungen(), getJobs(),
  ]);

  return (
    <>
      <HomeHero
        eyebrow={home.heroEyebrow}
        title={home.heroTitel}
        text={home.heroText}
        video={settings.heroVideo || undefined}
        phone={settings.telefon}
        phoneLink={settings.telefonLink}
      />

      {/* Kennzahlen */}
      <section className="relative z-10 -mt-14 sm:-mt-16">
        <Container>
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgba(14,22,54,0.45)] ring-1 ring-ink/5 lg:grid-cols-4">
            {home.kennzahlen.map((k, i) => (
              <Reveal
                key={k.label}
                delay={i * 0.08}
                className={`p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-grey-100" : ""} ${i > 1 ? "border-t border-grey-100 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <div className="flex items-baseline text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
                  {k.praefix && <span className="mr-1.5 text-lg font-medium text-brand/70 sm:text-xl">{k.praefix}</span>}
                  <Counter value={k.wert ?? 0} />
                  {k.suffix && <span>{k.suffix}</span>}
                </div>
                <p className="mt-2 text-sm leading-snug text-muted sm:text-[15px]">{k.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Für uns steht der Mensch im Mittelpunkt</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {home.introTitel}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-pretty mt-8 text-lg leading-relaxed text-muted">{home.introText}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button href="/ueber-uns">Lerne uns kennen</Button>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {["arbeitsplatz-1", "arbeitsplatz-2", "arbeitsplatz-3", "arbeitsplatz-4"].map((n) => (
                      <span key={n} className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white">
                        <Image src={`/images/fotos/${n}.webp`} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                  <span className="text-sm leading-tight text-muted">
                    <strong className="block text-ink">15 Menschen</strong>ein Team, per Du
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="relative lg:col-span-6">
            <Reveal>
              <ParallaxImage
                src="/images/fotos/partner.webp"
                alt="Die Partner Markus Böhmer und Simone Klapper vor der Kanzlei"
                className="aspect-[4/5] rounded-[2rem]"
                strength={40}
              />
            </Reveal>
            <Reveal delay={0.25} className="absolute -bottom-10 -left-4 w-[46%] sm:-left-10">
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl ring-8 ring-white">
                <Image src="/images/fotos/hammer-detail.webp" alt="Der Holzhammer im Besprechungsraum" fill sizes="300px" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.4} className="absolute top-8 -right-2 sm:-right-6">
              <div className="rounded-2xl bg-white/90 px-5 py-4 shadow-xl ring-1 ring-ink/5 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Sparkles className="h-4 w-4 text-brand" /> Dienstleister aus Leidenschaft
                </div>
                <p className="mt-1 text-xs text-muted">Respektvoll · ehrlich · offen</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Leistungen */}
      <section className="bg-grey-50 py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Reveal><Eyebrow>Leistungen</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                  Mehr als Steuererklärungen. <span className="text-brand">Echte Begleitung.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="max-w-md">
              <p className="text-lg leading-relaxed text-muted">
                Die Pflicht ist für uns selbstverständlich. Den Unterschied machen Weitblick, digitale
                Prozesse und ein Team, das dein Unternehmen wirklich versteht.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 [&>*]:min-w-0">
            {leistungen.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 2) * 0.1}>
                <Link
                  href={`/leistungen#${l.slug}`}
                  className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] bg-brand-900 p-8 text-white sm:p-10"
                >
                  {l.bild && (
                    <Image
                      src={l.bild}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-80 transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/55 to-transparent" />
                  <span className="absolute top-8 left-8 text-sm font-medium text-white/60 sm:left-10">
                    0{i + 1}
                  </span>
                  <span className="absolute top-7 right-7 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-brand">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <div className="relative">
                    <h3 className="text-[1.7rem] font-semibold leading-tight tracking-tight sm:text-4xl">{hy(l.titel)}</h3>
                    <p className="mt-4 max-w-md text-white/75">{l.kurz}</p>
                    <div className="grid grid-rows-[0fr] transition-all duration-700 group-hover:grid-rows-[1fr]">
                      <ul className="flex flex-wrap gap-2 overflow-hidden">
                        {l.punkte.slice(0, 4).map((p) => (
                          <li key={p} className="mt-5 rounded-full bg-white/10 px-3 py-1.5 text-sm backdrop-blur">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Digital */}
      <section className="grain relative overflow-hidden bg-brand-900 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-brand/60 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-brand-400/30 blur-[120px]" />
        <Container className="relative grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal><Eyebrow light>Digitale Kanzlei</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Papierlos. Schnell. <span className="text-brand-200">Mit DATEV.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                Keine Pendelordner, keine Wartezeiten: Mit DATEV Unternehmen online arbeiten wir
                gemeinsam in Echtzeit – sicher, digital und von überall.
              </p>
            </Reveal>
            <ol className="mt-12 space-y-4">
              {digitalSteps.map((s, i) => (
                <Reveal as="li" key={s.titel} delay={0.25 + i * 0.1}>
                  <div className="flex gap-5 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-brand">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-brand-200">Schritt {i + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{s.titel}</h3>
                      <p className="mt-1 text-sm text-white/70">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/leistungen#digitale-buchhaltung-und-lohn" variant="light">So funktioniert&apos;s</Button>
                <Button href="/mandantenbereich" variant="outline-light">Zum Mandantenbereich</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="relative">
            <ParallaxImage
              src="/images/fotos/schreibtisch.webp"
              alt="Digitaler Arbeitsplatz mit DATEV"
              className="aspect-[4/5] rounded-[2rem] ring-1 ring-white/10"
              strength={50}
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-white p-5 text-ink shadow-2xl sm:left-auto sm:w-72">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Offene Belege</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">Live</span>
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                {[40, 65, 50, 80, 60, 92, 74].map((h, i) => (
                  <span key={i} className="flex-1 rounded-t-md bg-brand/80" style={{ height: `${h * 0.6}px` }} />
                ))}
              </div>
              <div className="mt-3 text-sm font-semibold">Alle Zahlen tagesaktuell</div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Branchen */}
      <section className="overflow-hidden border-b border-grey-100 py-20 text-brand">
        <Container>
          <Reveal>
            <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.22em] text-muted">
              Wir sind zu Hause bei Unternehmern &amp; Selbstständigen
            </p>
          </Reveal>
        </Container>
        <Marquee items={["Handel", "Handwerk", "Maschinenbau", "Gesundheit", "Freiberufler", "Selbstständige", "Existenzgründer"]} />
      </section>

      {/* Werte */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal><Eyebrow>Unser Versprechen</Eyebrow></Reveal>
                <Reveal delay={0.1}>
                  <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                    Ob wir besser sind? Das entscheidest du.
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 text-lg leading-relaxed text-muted">
                    Was wir versprechen: Wir behandeln unsere Mandanten und unser Team wertschätzend
                    und auf Augenhöhe. Jeden Tag.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {werte.map((w, i) => (
                <Reveal key={w.titel} delay={i * 0.08}>
                  <div className="group h-full rounded-3xl bg-grey-50 p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-brand hover:text-white">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand shadow-sm transition-colors duration-500">
                      <w.icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-8 text-xl font-semibold">{w.titel}</h3>
                    <p className="mt-3 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">
                      {w.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team-Banner */}
      <section className="relative">
        <ParallaxImage
          src="/images/fotos/team-innen.webp"
          alt="Das gesamte Team von Hammer & Partner in der Kanzlei"
          className="h-[80vh] min-h-[520px]"
          strength={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-16 text-white">
          <Reveal>
            <h2 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              15 Menschen. Ein Team. Per Du – vom Azubi bis zum Chef.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/ueber-uns" variant="light">Über uns</Button>
              <Button href="/karriere" variant="outline-light">Werde Teil des Teams</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Karriere */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><Eyebrow>Karriere</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                Du suchst mehr als einen Job? <span className="text-brand">Wir auch.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Flache Hierarchien, selbstständiges Arbeiten, flexible Zeiten und ein Team, das
                zusammenhält. Dazu 13,3 Gehälter, 30 Tage Urlaub und vieles mehr.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {["13,3 Gehälter", "30 Tage Urlaub", "Homeoffice", "e-Bike", "bKV", "Weiterbildung"].map((b) => (
                  <li key={b} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800">{b}</li>
                ))}
              </ul>
            </Reveal>
            <div className="mt-10 space-y-4">
              {jobs.map((job, i) => (
                <Reveal key={job.slug} delay={0.35 + i * 0.1}>
                  <JobCard job={job} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.5}>
              <div className="mt-8">
                <Button href="/karriere" variant="outline">Alles zur Karriere</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative">
            <div className="grid h-full grid-cols-2 gap-4">
              <div className="relative row-span-2 min-h-[380px] overflow-hidden rounded-[2rem]">
                <Image src="/images/fotos/kolleginnen-ordner.webp" alt="Zwei Kolleginnen lachen gemeinsam" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="relative min-h-[180px] overflow-hidden rounded-[2rem]">
                <Image src="/images/fotos/buerohund.webp" alt="Der Bürohund liegt unter dem Schreibtisch" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative min-h-[180px] overflow-hidden rounded-[2rem]">
                <Image src="/images/fotos/stehpult.webp" alt="Arbeiten am höhenverstellbaren Schreibtisch" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Kontakt-CTA */}
      <section className="relative overflow-hidden">
        <Image src="/images/fotos/gebaeude.webp" alt="Die Kanzlei Hammer & Partner in der Moltkestraße 71 in Betzdorf" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-brand-900/80" />
        <Container className="relative grid gap-12 py-24 text-white sm:py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal><Eyebrow light>Kontakt</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Lass uns über deine Ziele sprechen.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-white/75">
                Ob Gründung, Wechsel oder eine konkrete Frage: Wir nehmen uns Zeit für dich – in
                Betzdorf oder digital.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/kontakt" variant="light">Termin anfragen</Button>
                <Button href={`tel:${settings.telefonLink}`} variant="outline-light" arrow={false}>
                  {settings.telefon}
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/20 backdrop-blur-md sm:p-10">
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">So findest du uns</div>
              <p className="mt-4 text-2xl font-semibold">
                {settings.strasse}
                <br />
                {settings.ort}
              </p>
              <div className="mt-8 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-2">
                {settings.oeffnungszeiten.map((o) => (
                  <div key={o.tage}>
                    <div className="text-sm text-white/60">{o.tage}</div>
                    <div className="mt-1 font-semibold">{o.zeiten}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hammer+%26+Partner+mbB+Moltkestra%C3%9Fe+71+57518+Betzdorf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Route planen <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
