import Image from "@/components/FImage";
import { Mail, Phone } from "lucide-react";

export function ContactPerson({
  name, rolle, email, telefon, telefonLink, label = "Dein Kontakt", imagePos = "50% 20%", image = "/images/fotos/partner-himmel.webp", dark = false,
}: {
  name: string; rolle: string; email: string; telefon: string; telefonLink: string; label?: string; imagePos?: string; image?: string; dark?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-6 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:p-8 ${dark ? "bg-white/[0.06] text-white ring-1 ring-white/10" : "bg-white ring-1 ring-ink/5 shadow-xl"}`}>
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl">
        <Image data-single-face src={image} alt={name} fill sizes="240px" className="object-cover" style={{ objectPosition: imagePos, transform: "scale(1.9)", transformOrigin: imagePos }} />
      </div>
      <div>
        <div className={`text-sm ${dark ? "text-white/60" : "text-muted"}`}>{label}</div>
        <div className="mt-1 text-2xl font-semibold tracking-tight">{name}</div>
        <div className={`text-sm ${dark ? "text-white/70" : "text-muted"}`}>{rolle}</div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
          <a href={`tel:${telefonLink}`} className={`inline-flex items-center gap-2 ${dark ? "hover:text-brand-200" : "text-brand hover:text-brand-600"}`}>
            <Phone className="h-4 w-4" /> {telefon}
          </a>
          <a href={`mailto:${email}`} className={`inline-flex items-center gap-2 ${dark ? "hover:text-brand-200" : "text-brand hover:text-brand-600"}`}>
            <Mail className="h-4 w-4" /> {email}
          </a>
        </div>
      </div>
    </div>
  );
}
