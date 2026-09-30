# Bilder in höherer Auflösung

Die aktuellen Fotos sind 1741 px breit. Auf großen und Retina-Bildschirmen braucht ein
bildschirmfüllendes Foto aber bis zu ~3000 px, sonst wirkt es weich.

## Export-Einstellungen

- **Format:** JPG
- **Größe:** lange Seite **3200 px** (oder Originalgröße, falls kleiner)
- **Qualität:** 85–90 %
- Dateigröße danach: ca. 0,8–1,5 MB pro Bild. Die Website komprimiert beim Ausliefern selbst weiter (AVIF/WebP).

## Diese 38 Bilder werden verwendet

Hochladen nach `public/images/originale/`, **Dateinamen unverändert lassen** (z. B. `Hammer&Partner-006.jpg`).
Die Zuordnung übernimmt Claude.

| Original | Verwendet als |
|---|---|
| 001 | team-innen |
| 003 | team-eingang |
| 006 | team-aussen (Hero) |
| 024 | empfang-hund (Hero) |
| 026 | arbeitsplatz-6 |
| 050 | kolleginnen-ordner |
| 058 | headset (auch Stellenbild) |
| 062 | kollegen-bildschirm (Leistung) |
| 071 | arbeitsplatz-4 |
| 080 | team-jung |
| 084 | arbeitsplatz-2 |
| 092 | besprechung-lachen (Hero) |
| 096 | besprechung-team |
| 103 | beratung-gespraech (Leistung) |
| 105 | unterlagen |
| 110 | besprechung-flipchart (Leistung) |
| 115 | besprechung-logo |
| 122 | arbeitsplatz-3 |
| 128 | quartett (Karriere-Hero) |
| 133 | partner-himmel |
| 137 | partner |
| 140 | gebaeude |
| 144 | eingang-schild |
| 145 | flur-gespraech |
| 146 | arbeitsplatz-1 |
| 150 | schreibtisch |
| 151 | arbeitsplatz-5 |
| 157 | kollegen-lachen (Hero) |
| 160 | buerohund |
| 162 | belegablage |
| 165 | arbeitsplatz-lachen (Leistung) |
| 168 | stehpult (Hero) |
| 172 | konferenzraum |
| 174 | hammer-detail |
| 176 | pflanze |
| 177 | flur |
| 183 | empfang |
| 196 | rechner |

## Gesichter und Bildausschnitte

- Die Header aller Seiten sind (auf Wunsch) wieder vollflächige Fotos mit Text darauf.
  Die frühere Regel "kein Text über Fotos mit Menschen" gilt nicht mehr.
- Beibehalten wurden zwei gezielte Korrekturen:
  - Startseite: Das "seit 1965"-Badge liegt mobil unter dem Partnerfoto statt auf den Gesichtern.
  - Leistungen: Mobil wird das Bild mittig auf Herrn Böhmer ausgerichtet
    (`mobileAspect` in `src/components/Parallax.tsx`, Daten aus `src/lib/faces.ts`).
- `npm run test:faces` prüft weiterhin alle Seiten, meldet aber jetzt bewusst Text über
  Gesichtern in den Headern. Das Skript dient nur noch als Hilfe bei neuen Fotos.
