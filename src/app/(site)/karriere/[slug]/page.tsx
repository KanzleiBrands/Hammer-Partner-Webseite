import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, Clock, Euro, MapPin, ShieldCheck } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { BenefitIcon } from "@/components/Icons";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ContactPerson } from "@/components/ContactPerson";
import { StickyApply } from "@/components/StickyApply";
import { JobCard } from "@/components/JobCard";
import { Container, Eyebrow } from "@/components/ui";
import { contacts, formatSalary, getJob, getJobs, getKarriere, getSettings } from "@/lib/content";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: PageProps<"/karriere/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const job = await getJob(slug);
  if (!job) return {};
  return {
    title: `${job.titel} – ${job.schwerpunkt} in ${job.ort}`,
    description: job.teaser,
  };
}

export default async function JobPage(props: PageProps<"/karriere/[slug]">) {
  const { slug } = await props.params;
  const [job, karriere, settings, jobs] = await Promise.all([getJob(slug), getKarriere(), getSettings(), getJobs()]);
  if (!job) notFound();
  const salary = formatSalary(job.gehaltVon, job.gehaltBis);
  const contact = contacts[job.ansprechpartner];
  const others = jobs.filter((j) => j.slug !== job.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${job.titel} – ${job.schwerpunkt}`,
    description: `<p>${job.teaser}</p><h3>Deine Aufgaben</h3><ul>${job.aufgaben.map((a) => `<li>${a}</li>`).join("")}</ul><h3>Dein Profil</h3><ul>${job.profil.map((a) => `<li>${a}</li>`).join("")}</ul>`,
    datePosted: job.veroeffentlicht ?? undefined,
    employmentType: ["FULL_TIME", "PART_TIME"],
    hiringOrganization: {
      "@type": "Organization",
      name: "Hammer & Partner mbB Steuerberater",
      sameAs: "https://www.hammerpartner.de",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.strasse,
        postalCode: settings.ort.split(" ")[0],
        addressLocality: settings.ort.split(" ").slice(1).join(" "),
        addressRegion: "Rheinland-Pfalz",
        addressCountry: "DE",
      },
    },
    ...(job.gehaltVon && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: { "@type": "QuantitativeValue", minValue: job.gehaltVon, maxValue: job.gehaltBis ?? job.gehaltVon, unitText: "MONTH" },
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="grain relative overflow-hidden bg-brand-900 pt-32 pb-20 text-white sm:pt-40">
        {job.bild && <Image src={job.bild} alt="" fill preload sizes="100vw" className="animate-kenburns object-cover opacity-40" style={{ objectPosition: "50% 30%" }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/85 to-brand-900/40" />
        <Container className="relative">
          <Reveal>
            <Link href="/karriere" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" /> Zurück zur Karriereseite
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="min-w-0 lg:col-span-8">
              <Reveal delay={0.05}>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Wir stellen ein · {job.start}
                </span>
              </Reveal>
              <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-7xl">
                <RevealWords text={job.titel} delay={0.1} />
              </h1>
              <Reveal delay={0.35}>
                <p className="mt-3 text-2xl font-medium text-brand-200 sm:text-3xl">{job.schwerpunkt}</p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="mt-8 flex flex-wrap gap-2 text-[15px]">
                  {[
                    { icon: MapPin, t: `${settings.ort}` },
                    { icon: Clock, t: `${job.anstellung} · ${job.stunden}` },
                    ...(salary ? [{ icon: Euro, t: `${salary} brutto/Monat` }] : []),
                    { icon: CalendarDays, t: `Start ${job.start}` },
                  ].map((c) => (
                    <span key={c.t} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur">
                      <c.icon className="h-4 w-4 text-brand-200" /> {c.t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.5} className="lg:col-span-4">
              <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-md">
                <p className="text-lg font-medium">Wir suchen dich zur Verstärkung unseres Teams in Betzdorf!</p>
                <a href="#bewerben" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-brand transition hover:bg-brand-50">
                  In 60 Sekunden bewerben
                </a>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-white/60"><ShieldCheck className="h-3.5 w-3.5" /> Ohne Anschreiben · 100 % vertraulich</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Beschreibung */}
      <section className="py-24 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-20 lg:col-span-7">
            <div>
              <Reveal><Eyebrow>Die Stelle</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Darum geht&apos;s</h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-xl leading-relaxed text-ink/80">{job.teaser}</p>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  Bei Hammer &amp; Partner arbeitest du selbstständig, mit modernen digitalen Prozessen
                  und in einem Team, das sich gegenseitig unterstützt. Flache Hierarchien, kurze Wege
                  und ein „Du“ vom ersten Tag an sind bei uns selbstverständlich.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Deine Aufgaben</h2></Reveal>
              <ul className="mt-8 space-y-4">
                {job.aufgaben.map((a, i) => (
                  <Reveal as="li" key={a} delay={i * 0.05}>
                    <div className="flex gap-4 rounded-2xl bg-grey-50 p-5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
                      <span className="text-[17px] leading-relaxed">{a}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <Reveal><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dein Profil</h2></Reveal>
              <ul className="mt-8 space-y-4">
                {job.profil.map((a, i) => (
                  <Reveal as="li" key={a} delay={i * 0.05}>
                    <span className="flex gap-4 text-[17px] leading-relaxed">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand"><Check className="h-4 w-4" /></span>
                      {a}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-5 lg:sticky lg:top-28">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image src="/images/fotos/kolleginnen-ordner.webp" alt="Kolleginnen bei Hammer & Partner" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-5 backdrop-blur">
                    <div className="text-sm text-muted">Gehalt</div>
                    <div className="text-2xl font-semibold tracking-tight text-brand">{salary} <span className="text-base font-medium text-muted">brutto/Monat</span></div>
                    <div className="mt-1 text-sm text-muted">+ Weihnachts- &amp; Urlaubsgeld (13,3 Gehälter)</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-grey-50 py-24 sm:py-28">
        <Container>
          <Reveal><Eyebrow>Deine Vorteile</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Das bieten wir dir.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {karriere.benefits.map((b, i) => (
              <Reveal key={b.titel} delay={(i % 3) * 0.06}>
                <div className="flex h-full gap-4 rounded-3xl bg-white p-6 ring-1 ring-ink/5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white"><BenefitIcon name={b.icon} className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-semibold">{b.titel}</h3>
                    <p className="mt-1 text-[15px] text-muted">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Bewerbung */}
      <section id="bewerben" className="scroll-mt-20 py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Klingt interessant?</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Dann bewirb dich jetzt – in 60 Sekunden.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted">
                Kein Anschreiben, keine Hürden. Beantworte vier kurze Fragen und hinterlasse deine
                Kontaktdaten. Deine Bewerbung behandeln wir selbstverständlich vertraulich.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <ContactPerson {...contact} />
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <ApplicationForm jobTitle={`${job.titel} – ${job.schwerpunkt}`} jobSlug={job.slug} />
          </Reveal>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="pb-24">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight">Weitere offene Stellen</h2>
            <div className="mt-6 space-y-4">{others.map((j) => <JobCard key={j.slug} job={j} />)}</div>
          </Container>
        </section>
      )}

      <StickyApply label="Jetzt bewerben" sub="Dauert nur 60 Sekunden" />
    </>
  );
}
