import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

export default async function ImpressumPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero compact eyebrow="Rechtliches" title="Impressum" />
      <section className="py-20">
        <Container className="max-w-3xl space-y-10 text-[17px] leading-relaxed text-ink/80 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
          <div>
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>
              Hammer &amp; Partner mbB Steuerberater
              <br />
              Partnerschaftsgesellschaft mit beschränkter Berufshaftung
              <br />
              {s.strasse}
              <br />
              {s.ort}
            </p>
          </div>
          <div>
            <h2>Vertreten durch die Partner</h2>
            <p>
              Dipl.-Kauffrau, StBin Simone Klapper
              <br />
              Dipl.-Kaufmann, StB Markus Böhmer
            </p>
          </div>
          <div>
            <h2>Kontakt</h2>
            <p>
              Telefon: {s.telefon}
              <br />
              Fax: {s.fax}
              <br />
              E-Mail: <a className="text-brand underline" href={`mailto:${s.email}`}>{s.email}</a>
            </p>
          </div>
          <div>
            <h2>Register</h2>
            <p>
              Partnerschaftsregister: Amtsgericht Koblenz, PR 20143
              <br />
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE212537793
            </p>
          </div>
          <div>
            <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>
              Die gesetzliche Berufsbezeichnung Steuerberater/Steuerberaterin wurde in der
              Bundesrepublik Deutschland (Rheinland-Pfalz) verliehen.
            </p>
            <p className="mt-3">
              Zuständige Kammer und Aufsichtsbehörde: Steuerberaterkammer Rheinland-Pfalz, Körperschaft
              des öffentlichen Rechts, Hölderlinstraße 1, 55131 Mainz, Telefon 06131 952100,{" "}
              <a className="text-brand underline" href="https://www.sbk-rlp.de" target="_blank" rel="noopener noreferrer">www.sbk-rlp.de</a>
            </p>
            <p className="mt-3">Es gelten insbesondere folgende berufsrechtliche Regelungen:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Steuerberatungsgesetz (StBerG)</li>
              <li>Durchführungsverordnung zum Steuerberatungsgesetz (DVStB)</li>
              <li>Berufsordnung der Steuerberater (BOStB)</li>
              <li>Steuerberatervergütungsverordnung (StBVV)</li>
            </ul>
            <p className="mt-3">
              Die Regelungen können bei der Bundessteuerberaterkammer unter{" "}
              <a className="text-brand underline" href="https://www.bstbk.de" target="_blank" rel="noopener noreferrer">www.bstbk.de</a>{" "}
              eingesehen werden.
            </p>
          </div>
          <div>
            <h2>Berufshaftpflichtversicherung</h2>
            <p>
              ERGO Versicherung AG, Victoriaplatz 1, 40198 Düsseldorf. Räumlicher Geltungsbereich:
              Tätigkeiten in Europa; der Versicherungsschutz genügt mindestens den Anforderungen des §
              67 StBerG und der §§ 51 ff. DVStB.
            </p>
          </div>
          <div>
            <h2>Verantwortlich für den Inhalt</h2>
            <p>Dipl.-Kauffrau, StBin Simone Klapper und Dipl.-Kaufmann, StB Markus Böhmer, Anschrift wie oben.</p>
          </div>
          <div>
            <h2>Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
