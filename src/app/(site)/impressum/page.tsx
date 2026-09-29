import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

// Inhalte wörtlich nach https://www.hammerpartner.de/impressum/ (Stand 29.09.2026).
export default function ImpressumPage() {
  return (
    <>
      <PageHero compact eyebrow="Rechtliches" title="Impressum" />
      <section className="py-20">
        <Container className="max-w-3xl space-y-10 text-[17px] leading-relaxed text-ink/80 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-brand [&_a]:underline">
          <div>
            <p className="text-xl font-semibold text-ink">
              Hammer &amp; Partner mbB
              <br />
              Steuerberater
            </p>
            <p className="mt-2">
              Dipl.-Kauffrau, StBin Simone Klapper
              <br />
              Dipl.-Kaufmann, StB Markus Böhmer
            </p>
          </div>

          <div>
            <h2>Kontaktdaten</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <p>
                <strong className="text-ink">Standort Betzdorf</strong>
                <br />
                Moltkestraße 71
                <br />
                57518 Betzdorf
                <br />
                Telefon: 02741 / 991730
                <br />
                Fax: 02741 / 991759
              </p>
              <p>
                <strong className="text-ink">Standort Müschenbach</strong>
                <br />
                Poststraße 7
                <br />
                57629 Müschenbach
                <br />
                Telefon: 02662 / 94730
                <br />
                Fax: 02662 / 947320
              </p>
            </div>
            <p className="mt-4">
              E-Mail: <a href="mailto:kanzlei@hammerpartner.de">kanzlei@hammerpartner.de</a>
            </p>
          </div>

          <div>
            <h2>Umsatzsteuer-Identifikationsnummer</h2>
            <p>DE212537793</p>
          </div>

          <div>
            <h2>Partnerschaftsregister &amp; Registernummer</h2>
            <p>
              Amtsgericht Koblenz
              <br />
              PR 20143
            </p>
          </div>

          <div>
            <h2>Verantwortlicher / Verantwortliche für journalistisch-redaktionelle Texte</h2>
            <p>
              Dipl.-Kauffrau, StBin Simone Klapper
              <br />
              Dipl.-Kaufmann, StB Markus Böhmer
            </p>
          </div>

          <div>
            <h2>Steuerberater / Steuerberaterin</h2>
            <p>
              Die gesetzliche Berufsbezeichnung Steuerberater / Steuerberaterin wurde verliehen in der
              Bundesrepublik Deutschland (Rheinland-Pfalz).
            </p>
          </div>

          <div>
            <h2>Zuständige Aufsichtsbehörde</h2>
            <p>
              Steuerberaterkammer Rheinland-Pfalz
              <br />
              Hölderlinstraße 1
              <br />
              55131 Mainz
              <br />
              Telefon: 06131 / 952100
              <br />
              Fax: 06131 / 9521040
              <br />
              E-Mail: <a href="mailto:info@sbk-rlp.de">info@sbk-rlp.de</a>
              <br />
              Web: <a href="https://www.sbk-rlp.de" target="_blank" rel="noopener noreferrer">www.sbk-rlp.de</a>
            </p>
          </div>

          <div>
            <h2>Berufsrechtliche Regelungen</h2>
            <p>Der Berufsstand der Steuerberater unterliegt im Wesentlichen den nachstehenden berufsrechtlichen Regelungen:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Steuerberatungsgesetz (StBerG)</li>
              <li>Durchführungsverordnung zum Steuerberatungsgesetz (DVStB)</li>
              <li>Berufsordnung (BOStB)</li>
              <li>Steuerberatervergütungsverordnung (StBVV)</li>
            </ul>
            <p className="mt-3">
              Die berufsrechtlichen Regelungen können bei der zuständigen Steuerberaterkammer eingesehen
              werden. Diese finden Sie auch unter der Homepage der Bundessteuerberaterkammer (
              <a href="https://www.bstbk.de" target="_blank" rel="noopener noreferrer">www.bstbk.de</a>).
            </p>
          </div>

          <div>
            <h2>Angaben zur Berufshaftpflichtversicherung</h2>
            <p>
              Die Berufshaftpflichtversicherung besteht bei der ERGO Versicherung AG, Victoriaplatz 1,
              40198 Düsseldorf. Der räumliche Geltungsbereich des Versicherungsschutzes umfasst
              Tätigkeiten in Europa und genügt damit mindestens den Anforderungen der Vorschriften gemäß
              § 67 Steuerberatungsgesetz (StBerG) und §§ 51 ff. der Verordnung zur Durchführung der
              Vorschriften über Steuerberater, Steuerbevollmächtigte und Steuerberatungsgesellschaften
              (DVStB).
            </p>
          </div>

          <div>
            <h2>Gebühren</h2>
            <p>
              Die Gebühren unserer Dienstleistungen richten sich nach den gesetzlichen Vorschriften, die
              in der Steuerberatervergütungsverordnung (StBVV) zusammengefasst sind.
            </p>
          </div>

          <div>
            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
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
