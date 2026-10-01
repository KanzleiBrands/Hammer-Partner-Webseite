import { hy } from "@/lib/hyphen";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Euro, MapPin } from "lucide-react";
import { formatSalary, type Job } from "@/lib/content";
import { focus } from "@/lib/faces";

export function JobImageCard({ job }: { job: Job }) {
  const salary = formatSalary(job.gehaltVon, job.gehaltBis);
  return (
    <article className="group relative overflow-hidden rounded-[2rem] bg-brand-900 text-white">
      {job.bild && (
        <Image src={job.bild} alt="" fill sizes="(min-width:1024px) 80vw, 100vw" className="object-cover opacity-50 transition-all duration-[1.2s] group-hover:scale-105 group-hover:opacity-35" style={{ objectPosition: focus(job.bild) }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-brand-900/20" />
      <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Jetzt offen · {job.start}
          </span>
          <h3 className="mt-5 text-[1.9rem] font-semibold leading-tight tracking-tight sm:text-5xl">{hy(job.titel)}</h3>
          <p className="mt-2 text-lg text-brand-200">{job.schwerpunkt}</p>
          <p className="mt-5 max-w-xl text-white/75">{job.teaser}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur"><MapPin className="h-3.5 w-3.5" />{job.ort}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur"><Clock className="h-3.5 w-3.5" />{job.anstellung} · {job.stunden}</span>
            {salary && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur"><Euro className="h-3.5 w-3.5" />{salary} brutto/Monat</span>}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href={`/karriere/${job.slug}#bewerben`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-brand transition hover:bg-brand-50">
            Jetzt bewerben
          </Link>
          <Link href={`/karriere/${job.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold transition hover:bg-white/10">
            Mehr erfahren <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </article>
  );
}
