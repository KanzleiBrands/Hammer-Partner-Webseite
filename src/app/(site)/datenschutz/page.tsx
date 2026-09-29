import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } };

// ENTWURF – vor Go-live durch die Kanzlei bzw. einen Datenschutzbeauftragten prüfen lassen.
export default async function DatenschutzPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero compact eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <section className="py-20">
        <Container className="max-w-3xl space-y-10 text-[17px] leading-relaxed text-ink/80 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
          <div>
            <h2>1. Verantwortliche Stelle</h2>
            <p>
              Hammer &amp; Partner mbB Steuerberater, {s.strasse}, {s.ort}, Telefon {s.telefon},
              E-Mail <a className="text-brand underline" href={`mailto:${s.email}`}>{s.email}</a>.
            </p>
          </div>
          <div>
            <h2>2. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA,
              gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten (z. B.
              IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser) in Server-Logfiles, um die
              Website sicher und stabil bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel
              besteht ein Vertrag zur Auftragsverarbeitung; die Übermittlung in die USA erfolgt auf
              Grundlage des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln.
            </p>
          </div>
          <div>
            <h2>3. Cookies und Tracking</h2>
            <p>
              Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken und bindet keine
              Tracking-Dienste ein. Schriftarten werden lokal von unserem Server geladen; es findet
              keine Verbindung zu Google Fonts statt.
            </p>
          </div>
          <div>
            <h2>4. Kontaktformular und E-Mail</h2>
            <p>
              Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst, verarbeiten wir deine
              Angaben (Name, E-Mail, ggf. Telefon, Unternehmen und Nachricht), um deine Anfrage zu
              bearbeiten (Art. 6 Abs. 1 lit. b und f DSGVO). Für den Versand der Formularinhalte an
              uns nutzen wir den E-Mail-Dienst Resend (Plus Five Five, Inc., USA) als
              Auftragsverarbeiter. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht
              mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </div>
          <div>
            <h2>5. Bewerbungen</h2>
            <p>
              Wenn du dich über unser Bewerbungsformular bewirbst, verarbeiten wir deine Angaben und
              ggf. deinen Lebenslauf ausschließlich zur Durchführung des Bewerbungsverfahrens (§ 26
              BDSG, Art. 6 Abs. 1 lit. b DSGVO). Die Übermittlung erfolgt verschlüsselt per E-Mail
              über Resend an die zuständigen Personen in unserer Kanzlei. Kommt kein
              Beschäftigungsverhältnis zustande, löschen wir deine Daten spätestens sechs Monate nach
              Abschluss des Verfahrens, sofern du nicht in eine längere Speicherung eingewilligt hast.
            </p>
          </div>
          <div>
            <h2>6. Externe Links</h2>
            <p>
              Unsere Website enthält Links zu externen Angeboten (z. B. DATEV, Google Maps, Facebook).
              Erst wenn du einen solchen Link anklickst, werden Daten an den jeweiligen Anbieter
              übertragen. Für deren Datenverarbeitung ist der jeweilige Anbieter verantwortlich.
            </p>
          </div>
          <div>
            <h2>7. Deine Rechte</h2>
            <p>Du hast jederzeit das Recht auf:</p>
            <ul>
              <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO) und Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              <li>
                Beschwerde bei einer Aufsichtsbehörde, z. B. beim Landesbeauftragten für den
                Datenschutz und die Informationsfreiheit Rheinland-Pfalz
              </li>
            </ul>
          </div>
          <div>
            <h2>8. Datensicherheit</h2>
            <p>Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung für alle Übertragungen.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
