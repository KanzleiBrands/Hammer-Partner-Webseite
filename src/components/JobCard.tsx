import { hy } from "@/lib/hyphen";
import Link from "next/link";
import { ArrowUpRight, Clock, Euro, MapPin } from "lucide-react";
import { formatSalary, type Job } from "@/lib/content";

export function JobCard({ job, dark = false }: { job: Job; dark?: boolean }) {
  const salary = formatSalary(job.gehaltVon, job.gehaltBis);
  return (
    <Link
      href={`/karriere/${job.slug}`}
      className={`group relative flex flex-col gap-6 overflow-hidden rounded-3xl p-7 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${
        dark
          ? "bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.1]"
          : "bg-white ring-1 ring-ink/[0.07] hover:shadow-[0_30px_60px_-30px_rgba(37,55,129,0.35)] hover:ring-brand/30"
      }`}
    >
      <div className="min-w-0">
        <div className={`text-sm font-medium ${dark ? "text-brand-200" : "text-brand"}`}>
          {job.schwerpunkt}
        </div>
        <h3 className={`mt-1 text-2xl font-semibold tracking-tight sm:text-[1.7rem] ${dark ? "text-white" : "text-ink"}`}>
          {hy(job.titel)}
        </h3>
        <div className={`mt-4 flex flex-wrap gap-2 text-sm ${dark ? "text-white/80" : "text-ink/70"}`}>
          <Chip dark={dark} icon={<MapPin className="h-3.5 w-3.5" />}>{job.ort}</Chip>
          <Chip dark={dark} icon={<Clock className="h-3.5 w-3.5" />}>
            {job.anstellung} · {job.stunden}
          </Chip>
          {salary && (
            <Chip dark={dark} icon={<Euro className="h-3.5 w-3.5" />}>
              {salary} / Monat
            </Chip>
          )}
        </div>
      </div>
      <span
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45 ${
          dark ? "bg-white text-brand" : "bg-brand text-white"
        }`}
      >
        <ArrowUpRight className="h-6 w-6" />
      </span>
    </Link>
  );
}

function Chip({ children, icon, dark }: { children: React.ReactNode; icon: React.ReactNode; dark: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
        dark ? "bg-white/10" : "bg-brand-50 text-brand-800"
      }`}
    >
      {icon}
      {children}
    </span>
  );
}
