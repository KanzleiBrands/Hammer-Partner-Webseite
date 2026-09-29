# CMS (Keystatic) & Deployment

Die Website nutzt **Keystatic** als CMS. Alle Inhalte liegen als YAML-Dateien in `/content`,
Bilder in `/public/images/cms`. Es gibt keine Datenbank. Jede Änderung im CMS ist ein Git-Commit,
den Vercel automatisch neu ausliefert.

## Was die Kanzlei im CMS pflegen kann

| Bereich | Inhalt |
|---|---|
| **Karriere → Stellenanzeigen** | Stellen anlegen, online/offline schalten, Aufgaben, Profil, Gehalt, Bild, Ansprechpartner |
| **Karriere → Karriereseite** | Hero-Text, Benefits (mit Icon), FAQ |
| **Inhalte → Startseite** | Hero-Überschrift und -Text, Kennzahlen, Intro |
| **Inhalte → Leistungen** | die 4 Leistungs-Cluster inkl. Bild und Leistungspunkten |
| **Allgemein → Kontakt & Einstellungen** | Telefon, Fax, E-Mail, Adresse, Öffnungszeiten, DATEV-/Fernbetreuungs-Links, **Header-Video** |

Das CMS ist unter **`/keystatic`** erreichbar.

## Lokal

```bash
npm install
npm run dev          # http://localhost:3000, CMS unter http://localhost:3000/keystatic
```

Lokal speichert das CMS direkt in die Dateien (`storage: local`).

## Produktion: CMS für die Kanzlei freischalten (GitHub-Modus)

1. Lokal `npm run dev` starten, in `.env.local` `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` setzen,
   `/keystatic` öffnen und dem Assistenten folgen. Er legt eine GitHub-App an und schreibt die
   Zugangsdaten in `.env.local`.
2. Diese Variablen in Vercel unter *Settings → Environment Variables* eintragen:
   - `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
3. Die Mitarbeitenden der Kanzlei brauchen einen GitHub-Account mit Schreibrechten auf das Repo.
   Sie melden sich unter `https://<domain>/keystatic` mit GitHub an.

## E-Mail-Versand (Kontakt- und Bewerbungsformular)

Versand über [Resend](https://resend.com). Ohne API-Key werden Formulare angenommen, die
E-Mail wird aber nur ins Server-Log geschrieben (Dry-Run). Das ist praktisch für die Vorschau.

| Variable | Beispiel | Pflicht |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | ja, für echten Versand |
| `MAIL_FROM` | `Website Hammer & Partner <website@hammerpartner.de>` | ja (Domain muss in Resend verifiziert sein) |
| `BEWERBUNG_EMAIL` | `m.boehmer@hammerpartner.de,s.klapper@hammerpartner.de` | nein (das ist der Standard) |
| `KONTAKT_EMAIL` | `kanzlei@hammerpartner.de` | nein (das ist der Standard) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.hammerpartner.de` | beim Go-live, schaltet die Indexierung frei |

## Header-Video (B-Roll)

MP4-Datei (H.264, stumm, 10–20 s, max. ~8 MB, 1920×1080) unter `public/video/header.mp4` ablegen
und im CMS unter *Kontakt & Einstellungen → Header-Video* `/video/header.mp4` eintragen. Solange
das Feld leer ist, zeigt der Header eine Foto-Slideshow.

## Logo

`src/components/Logo.tsx` enthält einen SVG-Nachbau der Bildmarke. Sobald das Original als SVG aus
der .ai-Datei exportiert ist, dort ersetzen.
