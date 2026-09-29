# Projekt-Briefing – Website Hammer & Partner mbB

Stand: 28.09.2026 · Quellen: Kundenonboarding-Formular, Stelleneinreichung „Steuerfachangestellter (Schwerpunkt Lohn)“, Fathom-Zusammenfassung Onboarding-Call 04.08., öffentliche Verzeichnisse (hammerpartner.de selbst war aus der Build-Umgebung nicht erreichbar).

Legende: ✅ geklärt · ⚠️ widersprüchlich / zu bestätigen · ❌ offen

---

## 1. Kunde & Positionierung

| Punkt | Inhalt | Status |
|---|---|---|
| Firmenname | Hammer & Partner mbB Steuerberater (Partnerschaftsgesellschaft mbB) | ✅ |
| Register | Partnerschaftsregister AG Koblenz, PR 20143 | ✅ (Verzeichnisse – im Impressum gegenprüfen) |
| Partner | Dipl.-Kfm. StB Markus Böhmer, Dipl.-Kffr. StBin Simone Klapper | ✅ |
| Hauptsitz | Moltkestraße 71, 57518 Betzdorf (Rheinland-Pfalz) | ✅ |
| 2. Standort | Poststraße 7, 57629 Müschenbach – **auf der Website nicht mehr zeigen** (Call) | ⚠️ siehe offene Punkte |
| Telefon / Fax | Zentrale 02741 991730 · Fax 02741 991759 · (Böhmer direkt 02741 991737) | ✅ |
| Öffnungszeiten | Mo–Do 07:30–17:00, Fr 07:30–13:30 | ⚠️ aus Verzeichnis, bestätigen |
| Historie | „seit fast 60 Jahren“ | ⚠️ Gründungsjahr bestätigen |
| Mitarbeitende | 15 | ✅ |
| Zielgruppe | Alle Branchen, Fokus Unternehmer & Selbstständige: Handel, Handwerk, Maschinenbau, Gesundheit, Freiberufler | ✅ |
| Wettbewerber | Ragsch, Weiler, Meyer · Steuerquartier Köhler · Sadowski und Kollegen | ✅ |
| Claim | **„Für uns steht der Mensch im Mittelpunkt.“** – „Bei allen steuerlichen oder unternehmerischen Entscheidungen geht es am Ende immer noch um den Menschen dahinter.“ | ✅ |
| USP | Digitale Kanzlei (papierlos, DATEV Unternehmen online), betriebswirtschaftliche Beratung / Krisenbegleitung, Mensch im Mittelpunkt, wertschätzend & auf Augenhöhe | ✅ |
| Werte / Markenversprechen | Dienstleister aus Leidenschaft; respektvoll, ehrlich, vertrauensvoll, offen, transparent, zuverlässig, wertschätzend | ✅ |
| Kultur | Flache Hierarchie, alle per „Du“ vom Azubi bis Chef, extrem hilfsbereites Team, jeder wird freundlich empfangen | ✅ |
| Tonalität | Locker, dynamisch, zukunftsorientiert, seriös ohne Förmlichkeit. Karriere: **Du**. Mandanten: ⚠️ Du oder Sie? | ⚠️ |
| Erfolgskriterium | Feedback „modern, dynamisch, nahbar“ von Mandanten & Team binnen 3 Monaten | ✅ |

## 2. Ziele / CTAs

- Mandanten: Kontakt (Telefon + Formular) → ❌ Empfänger-Adresse für Mandantenanfragen fehlt (info@?)
- Bewerber: Bewerbung → an **m.boehmer@hammerpartner.de** und **s.klapper@hammerpartner.de** ✅
- Bestandsmandanten: schneller Zugang zu Unternehmen online, Fernbetreuung, Personalfragebögen ✅

## 3. Seitenstruktur (aus Call abgeleitet)

```
Start            – Wow-Header (B-Roll-Video / Drohne Betzdorf), Claim, USP-Kacheln, Team-Teaser, Karriere-Teaser, Kontakt
Über uns         – EINE Seite fürs ganze Team (keine Einzelprofile), Werte, Kultur, Standort Betzdorf
Leistungen       – EINE Seite, thematische Cluster statt Einzelseiten (z. B. „Laufende Beratung“,
                   „Vorausschauende Steuerberatung / Gestaltung“, „Digitale Buchhaltung & Lohn“,
                   „Betriebswirtschaftliche Beratung & Krisenbegleitung“)
Mandantenbereich – Links: DATEV Unternehmen online, Mandanten-Fernbetreuung
                   Downloads: nur Personalfragebögen (Festangestellte, Minijob, Azubi, ggf. 4. Variante)
                   ENTFÄLLT: DATEV-Demos, Newsfeed, Steuerkalender, übrige Formulare
Karriere         – Arbeitgeberprofil, Kultur, Benefits, Stellenmodul, Recruiting-Reels
Kontakt          – Formular, Telefon, Karte Betzdorf, Öffnungszeiten
Impressum / Datenschutz
```

## 4. CI

| Punkt | Inhalt | Status |
|---|---|---|
| Logo | Drive-Kundenordner: `Illustrator Logo mit Schriftzug_neu` als .ai, .eps, .jpg (hochauflösend) | ✅ – SVG-Export aus .ai nötig |
| Hausfarbe | **PANTONE Blue 072 U** (CMYK 100/88/0/5) – aus Logo-Metadaten; Web-Näherung ≈ `#10069F` | ⚠️ exakten HEX bestätigen |
| Farbsystem | Blau / Weiß / Grau (Logo-Farben beibehalten) | ✅ |
| Schrift | Logo: Arial Bold. Web-Hausschrift nicht definiert → Vorschlag: moderne Grotesk (z. B. Inter / Manrope), lokal gehostet | ⚠️ |
| CI-Guide | Keiner vorhanden | ✅ (wird aus Logo abgeleitet) |

## 5. Bilder & Video

- Fotos vom Drehtag (07.09.): **105 PNGs** (`Hammer&Partner-001 … -195.png`, je 3–4,5 MB) im Drive-Ordner `1N8u-b3z0udauqbTxKdRBP3-18xU7ITGp` ✅
- Videos (Recruiting-Reels, Mandanten-Reels, B-Roll für Header, Drohne Betzdorf) → ❌ noch nicht geliefert
- Müschenbach-Fotos: nicht verwenden ✅

## 6. Karriere / Stelle

- **Steuerfachangestellte/r (m/w/d) – Schwerpunkt Lohn**, 2 Stellen
- Aufgaben: selbständige Lohnbearbeitung (Abrechnungen, Meldungen, LSt- & SV-Prüfungen), Beratung Lohnoptimierung; Fokus Lohn, aber auch Fibu
- Profil: DATEV-Kenntnisse (Pflicht), mehrjährige Erfahrung, kommunikativ, Teamplayer; freundlich, hilfsbereit, positive Ausstrahlung
- Umfang: 20–40 Std. (Voll- oder Teilzeit)
- Gehalt: 3.500–5.000 € brutto/Monat (Vollzeit)
- Benefits: 13,3 Gehälter inkl. Weihnachts- & Urlaubsgeld, Prämie, 30 Tage Urlaub, bKV, Fahrtkostenzuschuss, Edenred-Gutscheinkarte, Betriebsveranstaltungen, e-Bike-Leasing, ggf. Firmen-PKW, Homeoffice, flexible Arbeitszeiten, Weiterbildung, sicherer Arbeitsplatz
- Einzugsgebiet: 30–35 km um Betzdorf
- Kein Bewerbermanagement-Portal → Bewerbungen per Formular/E-Mail

## 7. Social / Trust

- Facebook: facebook.com/hammerundpartner (Admin-Zugang aktuell blockiert, DW Digital) · kein Instagram, kein LinkedIn, kein Kununu
- Trust-Elemente: keine hochgeladen

## 8. Technik

- Next.js + Tailwind, Hosting Vercel, Repo `kanzleibrands/hammer-partner-webseite`
- Formularversand: Vorschlag Resend (API-Key als Vercel-Env-Variable)
- CMS: im Call „performantes CMS-Setup“ erwähnt → ❌ klären, ob Kunde selbst pflegen soll

## 9. Entscheidungen (29.09.)

- Mandanten werden **geduzt**
- Farben: **#253781** (Akzent), **#FFFFFF**, **#DDDDDD** (Footer, Flächen)
- Schrift: **Inter** (lokal eingebunden, DSGVO-konform)
- Personalfragebögen vorerst nicht nötig → dafür eine vollwertige Karriereseite nach kanzleijobs-Vorbild
- Leistungs-Cluster freigegeben
- CMS für die Kanzlei gewünscht → Keystatic (siehe `docs/cms.md`)
- Domain/DNS kommt später

## 10. Aus der alten Website übernommen

- Gründung **1965** durch Karl Heinz Hammer · 2001 Eintritt Simone Klapper (Tochter) · 2012 Partnerschaft mit Markus Böhmer · 2016 „Hammer & Partner mbB“
- Allgemeine E-Mail: **kanzlei@hammerpartner.de**
- Durchwahlen: Klapper 02741 991736 · Böhmer 02741 991737
- Links: DATEV Unternehmen online `https://duo.datev.de` · Fernbetreuung `https://go.datev.de/mfb-kunde`
- Impressum: USt-IdNr. DE212537793 · Berufshaftpflicht ERGO Versicherung AG · StBK Rheinland-Pfalz, Mainz

## 11. Noch offen

- Logo als SVG (Export aus der .ai-Datei)
- B-Roll-Video für den Header (MP4)
- Resend-Account + verifizierte Absender-Domain für den Formularversand
- Standort Müschenbach: gibt es ihn noch? Die alte Website und das Impressum nennen ihn, im Call hieß es „nur Betzdorf zeigen“
- Bildzuordnung bestätigen: Mann/Frau auf `partner.webp` = Markus Böhmer / Simone Klapper?
- Datenschutzerklärung juristisch prüfen lassen (Entwurf auf Basis der tatsächlich genutzten Dienste)
- Echte Zitate aus dem Team für eine „Stimmen“-Sektion (optional)
