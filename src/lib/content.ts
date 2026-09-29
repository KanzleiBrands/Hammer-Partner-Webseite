import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export const getSettings = cache(async () => {
  const s = await reader.singletons.einstellungen.readOrThrow();
  return s;
});

export const getHome = cache(() => reader.singletons.startseite.readOrThrow());
export const getKarriere = cache(() => reader.singletons.karriere.readOrThrow());

export const getLeistungen = cache(async () => {
  const all = await reader.collections.leistungen.all();
  return all
    .map((e) => ({ slug: e.slug, ...e.entry }))
    .sort((a, b) => (a.reihenfolge ?? 0) - (b.reihenfolge ?? 0));
});

export const getJobs = cache(async () => {
  const all = await reader.collections.stellen.all();
  return all
    .map((e) => ({ slug: e.slug, ...e.entry }))
    .filter((j) => j.aktiv);
});

export const getJob = cache(async (slug: string) => {
  const job = await reader.collections.stellen.read(slug);
  if (!job || !job.aktiv) return null;
  return { slug, ...job };
});

export type Job = NonNullable<Awaited<ReturnType<typeof getJob>>>;
export type Leistung = Awaited<ReturnType<typeof getLeistungen>>[number];
export type Settings = Awaited<ReturnType<typeof getSettings>>;

export const contacts = {
  klapper: {
    name: "Simone Klapper",
    rolle: "Dipl.-Kauffrau, Steuerberaterin, Partnerin",
    label: "Deine Ansprechpartnerin",
    imagePos: "72% 22%",
    email: "s.klapper@hammerpartner.de",
    telefon: "02741 991736",
    telefonLink: "+492741991736",
  },
  boehmer: {
    name: "Markus Böhmer",
    rolle: "Dipl.-Kaufmann, Steuerberater, Partner",
    label: "Dein Ansprechpartner",
    imagePos: "30% 22%",
    email: "m.boehmer@hammerpartner.de",
    telefon: "02741 991737",
    telefonLink: "+492741991737",
  },
} as const;

export function formatSalary(von?: number | null, bis?: number | null) {
  const f = (n: number) => n.toLocaleString("de-DE");
  if (von && bis) return `${f(von)} – ${f(bis)} €`;
  if (von) return `ab ${f(von)} €`;
  return null;
}
