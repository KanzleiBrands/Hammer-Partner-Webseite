import { Plus } from "lucide-react";

export function Faq({ items }: { items: readonly { frage: string; antwort: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f) => (
        <details key={f.frage} className="group py-2">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-ink transition-colors hover:text-brand sm:text-xl">
            {f.frage}
            <span className="faq-icon grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand transition-transform duration-300 group-open:bg-brand group-open:text-white">
              <Plus className="h-5 w-5" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[17px] leading-relaxed text-muted">{f.antwort}</p>
        </details>
      ))}
    </div>
  );
}
