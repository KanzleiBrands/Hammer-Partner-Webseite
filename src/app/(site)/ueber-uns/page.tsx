import type { Metadata } from "next";
import Image from "@/components/FImage";
import { ArrowUpRight, HandHeart, Handshake, Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/Parallax";
import { Counter } from "@/components/Counter";
import { Button, Container, Eyebrow } from "@/components/ui";
import { contacts, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Über uns – das Team von Hammer & Partner in Betzdorf",
  description:
    "Steuerberatung in Betzdorf seit 1965: Lerne das Team von Hammer & Partner kennen – wertschätzend, ehrlich, digital und per Du.",
};

const werte = [
  { icon: Heart, titel: "Dienstleister aus Leidenschaft", text: "Wir machen unseren Job gern – und das merkt man." },
  { icon: HandHeart, titel: "Wertschätzend", text: "Wir begegnen Mandanten und Kollegen mit Respekt und auf Augenhöhe." },
  { icon: MessageCircle, titel: "Ehrlich & offen", text: "Transparente Kommunikation, auch wenn die Nachricht mal unbequem ist." },
  { icon: ShieldCheck, titel: "Zuverlässig", text: "Was wir zusagen, halten wir. Fristen inklusive." },
  { icon: Handshake, titel: "Vertrauensvoll", text: "Deine Zahlen sind bei uns in guten Händen – diskret und sicher." },
  { icon: Sparkles, titel: "Zukunftsorientiert", text: "Digitale Prozesse und vorausschauende Beratung sind unser Standard." },
];

const geschichte = [
  { jahr: "1965", titel: "Gründung", text: "Karl Heinz Hammer gründet in Betzdorf sein Steuerberatungsbüro und führt es bis 2000 als Einzelkanzlei." },
  { jahr: "2001", titel: "Die nächste Generation", text: "Seine Tochter Simone Klapper tritt ein – die Kanzlei wird zu „Hammer & Klapper“." },
  { jahr: "2012", titel: "Partnerschaft", text: "Mit Markus Böhmer entsteht die Partnerschaftsgesellschaft Hammer & Partner." },
  { jahr: "Heute", titel: "Hammer & Partner mbB", text: "Zwei Partner, 15 Menschen und eine digitale Kanzlei – mit derselben Haltung wie 1965." },
];

const galerie = [
  "arbeitsplatz-1", "arbeitsplatz-2", "arbeitsplatz-3", "arbeitsplatz-4", "arbeitsplatz-5", "arbeitsplatz-6",
  "headset", "arbeitsplatz-lachen",
];

export default async function UeberUnsPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Menschen, die Steuern mit Herz machen."
        text="Seit 1965 begleiten wir Unternehmer, Selbstständige und Familien in der Region – heute mit 15 Menschen, modernen Prozessen und derselben Haltung wie am ersten Tag."
        image="/images/fotos/team-innen.webp"
        compact
        wideImage
      />

      {/* Story */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Unsere Haltung</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <p className="text-balance mt-8 text-3xl font-medium leading-[1.3] tracking-tight text-ink sm:text-4xl">
                „Ob wir besser sind als andere, ist relativ. Aber wir behandeln unsere Mandanten und
                unser Team <span className="text-brand">wertschätzend und auf Augenhöhe</span>. Denn bei
                allen steuerlichen und unternehmerischen Entscheidungen geht es am Ende um den
                Menschen dahinter.“
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-muted">— Markus Böhmer &amp; Simone Klapper, Partner</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 self-end lg:col-span-5">
            {[
              { v: 1965, p: "seit ", l: "in Betzdorf zu Hause" },
              { v: 15, p: "", l: "Menschen im Team" },
              { v: 2, p: "", l: "Partner, ein Team" },
              { v: 100, p: "", s: " %", l: "digital mit DATEV" },
            ].map((k, i) => (
              <Reveal key={k.l} delay={i * 0.08}>
                <div className="rounded-3xl bg-grey-50 p-6">
                  <div className="text-4xl font-semibold tracking-tight text-brand">
                    {k.p && <span className="text-lg font-medium">{k.p}</span>}
                    <Counter value={k.v} />
                    {k.s}
                  </div>
                  <div className="mt-1 text-sm text-muted">{k.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>


      {/* Geschichte */}
      <section className="grain relative overflow-hidden bg-brand-900 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-brand/70 blur-[140px]" />
        <Container className="relative">
          <div className="max-w-2xl">
            <Reveal><Eyebrow light>Unsere Geschichte</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Ein Familienbetrieb, der mit der Zeit geht.</h2>
            </Reveal>
          </div>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <div className="absolute top-[11px] right-0 left-0 hidden h-px bg-white/20 md:block" />
            {geschichte.map((g, i) => (
              <Reveal as="li" key={g.jahr} delay={i * 0.1} className="relative">
                <span className="relative z-10 block h-6 w-6 rounded-full border-4 border-brand-900 bg-brand-200 ring-1 ring-white/30" />
                <div className="mt-6 text-5xl font-semibold tracking-tight text-white">{g.jahr}</div>
                <h3 className="mt-3 text-lg font-semibold text-brand-200">{g.titel}</h3>
                <p className="mt-2 text-white/70">{g.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Partner */}
      <section className="bg-grey-50 py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ParallaxImage src="/images/fotos/partner.webp" alt="Markus Böhmer und Simone Klapper vor der Kanzlei" className="aspect-[4/5] rounded-[2rem]" strength={40} />
          </Reveal>
          <div>
            <Reveal><Eyebrow>Die Partner</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Zwei Partner, eine Idee: Steuerberatung auf Augenhöhe.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Simone Klapper und Markus Böhmer führen die Kanzlei gemeinsam – Simone in zweiter
                Generation nach ihrem Vater und Kanzleigründer Karl Heinz Hammer. Beide stehen für
                eine Kanzleikultur, in der man sich duzt, sich gegenseitig hilft und Mandanten
                ehrlich berät.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[contacts.boehmer, contacts.klapper].map((c, i) => (
                <Reveal key={c.name} delay={0.3 + i * 0.1}>
                  <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-ink/5">
                    <div className="text-xl font-semibold">{c.name}</div>
                    <div className="mt-1 text-sm text-muted">{c.rolle}</div>
                    <div className="mt-4 space-y-1 text-sm font-semibold text-brand">
                      <a href={`tel:${c.telefonLink}`} className="block hover:underline">{c.telefon}</a>
                      <a href={`mailto:${c.email}`} className="block hover:underline">{c.email}</a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Werte */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <Reveal><Eyebrow>Unsere Werte</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Was uns wichtig ist.</h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {werte.map((w, i) => (
              <Reveal key={w.titel} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-3xl border border-ink/10 p-8 transition-all duration-500 hover:border-brand hover:bg-brand hover:text-white">
                  <w.icon className="h-8 w-8 text-brand transition-colors group-hover:text-white" strokeWidth={1.5} />
                  <h3 className="mt-8 text-xl font-semibold">{w.titel}</h3>
                  <p className="mt-2 text-muted transition-colors group-hover:text-white/80">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Galerie */}
      <section className="grain relative overflow-hidden bg-brand-900 py-24 text-white sm:py-32">
        <Container className="relative">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Reveal><Eyebrow light>Das Team</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Vom Azubi bis zum Chef – alle per Du.</h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-md text-lg text-white/75">Flache Hierarchien, gegenseitige Unterstützung und ein Empfang, bei dem sich jeder willkommen fühlt.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[220px] md:grid-cols-4">
            {galerie.map((g, i) => (
              <Reveal
                key={g}
                delay={(i % 4) * 0.06}
                className={`relative overflow-hidden rounded-3xl ${i === 0 || i === 3 || i === 5 || i === 6 ? "col-span-2" : ""}`}
              >
                <Image src={`/images/fotos/${g}.webp`} alt="Teammitglied bei der Arbeit" fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] hover:scale-105" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/karriere" variant="light">Werde Teil des Teams</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Standort */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><Eyebrow>Standort</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Zu Hause in Betzdorf.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Unsere Kanzlei findest du in der {settings.strasse} in {settings.ort.replace(/^\d+\s/, "")} –
                im markanten weißen Haus mit dem runden Turm. Parkplätze direkt vor der Tür, und wer
                nicht vorbeikommen möchte, arbeitet einfach digital mit uns.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 grid gap-4 rounded-3xl bg-grey-50 p-6 sm:grid-cols-2">
                {settings.oeffnungszeiten.map((o) => (
                  <div key={o.tage}>
                    <div className="text-sm text-muted">{o.tage}</div>
                    <div className="font-semibold">{o.zeiten}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/kontakt">Kontakt aufnehmen</Button>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hammer+%26+Partner+mbB+Moltkestra%C3%9Fe+71+57518+Betzdorf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-[15px] font-semibold transition hover:border-brand hover:text-brand"
                >
                  Route planen <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Reveal className="col-span-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
                <Image src="/images/fotos/gebaeude.webp" alt="Das Kanzleigebäude in Betzdorf" fill sizes="30vw" className="object-cover" />
              </div>
            </Reveal>
            <div className="col-span-2 grid gap-4">
              <Reveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                  <Image src="/images/fotos/eingang-schild.webp" alt="Eingang mit Kanzleischild" fill sizes="20vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                  <Image src="/images/fotos/empfang.webp" alt="Empfang der Kanzlei" fill sizes="20vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
