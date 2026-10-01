import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ContactPerson } from "@/components/ContactPerson";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { contacts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Initiativbewerbung",
  description: "Du möchtest Teil des Teams von Hammer & Partner in Betzdorf werden? Bewirb Dich initiativ – in 60 Sekunden.",
};

export default function InitiativPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Initiativbewerbung"
        title="Du passt zu uns? Dann lass uns reden."
        text="Auch wenn gerade keine passende Stelle ausgeschrieben ist: Wir lernen gute Leute immer gerne kennen."
        image="/images/fotos/flur-gespraech.webp"
        position="50% 40%"
      />
      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>So einfach geht&apos;s</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight">Vier Fragen, Deine Kontaktdaten – fertig.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted">Wir melden uns persönlich bei Dir und schauen gemeinsam, was passen könnte – ob Steuerfachangestellter (m/w/d), Bilanzbuchhaltung, Ausbildung oder Quereinstieg.</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <ContactPerson {...contacts.klapper} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7" >
            <div id="bewerben"><ApplicationForm jobTitle="Initiativbewerbung" jobSlug="initiativ" /></div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
