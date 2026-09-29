import Image from "@/components/FImage";
import Link from "next/link";
import { ArrowUpRight, Clock, Euro, MapPin } from "lucide-react";
import { formatSalary, type Job } from "@/lib/content";
import { hy } from "@/lib/hyphen";

// Stellenkarte: Foto und Text nebeneinander (Desktop) bzw. Foto oben (Mobil).
export function JobImageCard({ job }: { job: Job }) {
  const salary = formatSalary(job.gehaltVon, job.gehaltBis);
  return (
    <article className="group grid overflow-hidden rounded-[2rem] bg-brand-900 text-white lg:grid-cols-12">
      <div className="relative aspect-[3/2] overflow-hidden lg:order-2 lg:col-span-5 lg:aspect-auto">
        {job.bild && (
          <Image src={job.bild} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
        )}
      </div>
      <div className="relative flex min-w-0 flex-col justify-between gap-8 p-8 sm:p-12 lg:col-span-7">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Jetzt offen · {job.start}
          </span>
          <h3 className="mt-5 text-[1.9rem] font-semibold leading-tight tracking-tight sm:text-5xl">{hy(job.titel)}</h3>
          <p className="mt-2 text-lg text-brand-200">{job.schwerpunkt}</p>
          <p className="mt-5 max-w-xl text-white/75">{job.teaser}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><MapPin className="h-3.5 w-3.5" />{job.ort}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Clock className="h-3.5 w-3.5" />{job.anstellung} · {job.stunden}</span>
            {salary && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Euro className="h-3.5 w-3.5" />{salary} brutto/Monat</span>}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
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
