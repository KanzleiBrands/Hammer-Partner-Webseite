import { config, fields, collection, singleton } from "@keystatic/core";

// Lokal (npm run dev) speichert das CMS direkt in die Dateien unter /content.
// In Produktion auf Vercel: NEXT_PUBLIC_KEYSTATIC_STORAGE=github setzen –
// dann schreibt das CMS Änderungen als Commits ins GitHub-Repo (siehe docs/cms.md).
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({
        kind: "github",
        repo: "kanzleibrands/hammer-partner-webseite",
        branchPrefix: "cms/",
      } as const)
    : ({ kind: "local" } as const);

const stringList = (label: string) =>
  fields.array(fields.text({ label }), {
    label,
    itemLabel: (props) => props.value || "Neuer Eintrag",
  });

export default config({
  storage,
  locale: "de-DE",
  ui: {
    brand: { name: "Hammer & Partner" },
    navigation: {
      Karriere: ["stellen", "karriere"],
      Inhalte: ["startseite", "leistungen"],
      Allgemein: ["einstellungen"],
    },
  },
  singletons: {
    einstellungen: singleton({
      label: "Kontakt & Einstellungen",
      path: "content/einstellungen",
      schema: {
        telefon: fields.text({ label: "Telefon (Anzeige)" }),
        telefonLink: fields.text({
          label: "Telefon (Link, international)",
          description: "z. B. +492741991730",
        }),
        fax: fields.text({ label: "Fax" }),
        email: fields.text({ label: "E-Mail (Anzeige)" }),
        strasse: fields.text({ label: "Straße & Hausnummer" }),
        ort: fields.text({ label: "PLZ & Ort" }),
        oeffnungszeiten: fields.array(
          fields.object({
            tage: fields.text({ label: "Tage" }),
            zeiten: fields.text({ label: "Uhrzeit" }),
          }),
          {
            label: "Öffnungszeiten",
            itemLabel: (props) =>
              `${props.fields.tage.value}: ${props.fields.zeiten.value}`,
          },
        ),
        duoUrl: fields.url({ label: "Link DATEV Unternehmen online" }),
        fernbetreuungUrl: fields.url({ label: "Link Mandanten-Fernbetreuung" }),
        facebookUrl: fields.url({ label: "Facebook" }),
        heroVideo: fields.text({
          label: "Header-Video (optional)",
          description:
            "Pfad oder URL zu einer MP4-Datei (z. B. /video/header.mp4). Leer = Foto-Slideshow.",
        }),
      },
    }),
    startseite: singleton({
      label: "Startseite",
      path: "content/startseite",
      schema: {
        heroEyebrow: fields.text({ label: "Hero: Zeile über der Überschrift" }),
        heroTitel: fields.text({ label: "Hero: Überschrift" }),
        heroText: fields.text({ label: "Hero: Text", multiline: true }),
        kennzahlen: fields.array(
          fields.object({
            wert: fields.integer({ label: "Zahl" }),
            praefix: fields.text({ label: "Vor der Zahl (optional)" }),
            suffix: fields.text({ label: "Nach der Zahl (optional)" }),
            label: fields.text({ label: "Beschriftung" }),
          }),
          {
            label: "Kennzahlen",
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        introTitel: fields.text({ label: "Intro: Überschrift" }),
        introText: fields.text({ label: "Intro: Text", multiline: true }),
      },
    }),
    karriere: singleton({
      label: "Karriereseite",
      path: "content/karriere",
      schema: {
        heroTitel: fields.text({ label: "Hero: Überschrift" }),
        heroText: fields.text({ label: "Hero: Text", multiline: true }),
        benefits: fields.array(
          fields.object({
            titel: fields.text({ label: "Titel" }),
            text: fields.text({ label: "Text", multiline: true }),
            icon: fields.select({
              label: "Icon",
              defaultValue: "star",
              options: [
                { label: "Geld", value: "euro" },
                { label: "Geschenk", value: "gift" },
                { label: "Urlaub", value: "palm" },
                { label: "Uhr", value: "clock" },
                { label: "Haus", value: "home" },
                { label: "Fahrrad", value: "bike" },
                { label: "Auto", value: "car" },
                { label: "Herz / Gesundheit", value: "heart" },
                { label: "Weiterbildung", value: "graduation" },
                { label: "Schild / Sicherheit", value: "shield" },
                { label: "Team", value: "users" },
                { label: "Party", value: "party" },
                { label: "Karte", value: "card" },
                { label: "Stern", value: "star" },
              ],
            }),
          }),
          {
            label: "Benefits",
            itemLabel: (props) => props.fields.titel.value,
          },
        ),
        faq: fields.array(
          fields.object({
            frage: fields.text({ label: "Frage" }),
            antwort: fields.text({ label: "Antwort", multiline: true }),
          }),
          {
            label: "Häufige Fragen",
            itemLabel: (props) => props.fields.frage.value,
          },
        ),
      },
    }),
  },
  collections: {
    stellen: collection({
      label: "Stellenanzeigen",
      slugField: "titel",
      path: "content/stellen/*",
      columns: ["titel", "aktiv"],
      schema: {
        titel: fields.slug({
          name: { label: "Stellentitel", description: "z. B. Steuerfachangestellte (m/w/d)" },
        }),
        aktiv: fields.checkbox({
          label: "Online",
          description: "Nur aktive Stellen erscheinen auf der Website.",
          defaultValue: true,
        }),
        schwerpunkt: fields.text({ label: "Schwerpunkt / Untertitel" }),
        teaser: fields.text({ label: "Kurzbeschreibung", multiline: true }),
        bild: fields.image({
          label: "Bild",
          directory: "public/images/cms",
          publicPath: "/images/cms/",
        }),
        ort: fields.text({ label: "Arbeitsort", defaultValue: "Betzdorf" }),
        anstellung: fields.text({
          label: "Anstellungsart",
          defaultValue: "Vollzeit oder Teilzeit",
        }),
        stunden: fields.text({ label: "Wochenstunden", defaultValue: "20–40 Std." }),
        gehaltVon: fields.integer({ label: "Gehalt von (€ brutto/Monat)" }),
        gehaltBis: fields.integer({ label: "Gehalt bis (€ brutto/Monat)" }),
        start: fields.text({ label: "Start", defaultValue: "ab sofort" }),
        veroeffentlicht: fields.date({ label: "Veröffentlicht am" }),
        aufgaben: stringList("Deine Aufgaben"),
        profil: stringList("Dein Profil"),
        ansprechpartner: fields.select({
          label: "Ansprechpartner",
          defaultValue: "klapper",
          options: [
            { label: "Simone Klapper", value: "klapper" },
            { label: "Markus Böhmer", value: "boehmer" },
          ],
        }),
      },
    }),
    leistungen: collection({
      label: "Leistungen",
      slugField: "titel",
      path: "content/leistungen/*",
      schema: {
        titel: fields.slug({ name: { label: "Titel" } }),
        reihenfolge: fields.integer({ label: "Reihenfolge", defaultValue: 1 }),
        kurz: fields.text({ label: "Kurzbeschreibung", multiline: true }),
        text: fields.text({ label: "Ausführlicher Text", multiline: true }),
        bild: fields.image({
          label: "Bild",
          directory: "public/images/cms",
          publicPath: "/images/cms/",
        }),
        punkte: stringList("Leistungspunkte"),
      },
    }),
  },
});
