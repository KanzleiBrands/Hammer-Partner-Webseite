import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { datenschutz } from "./text";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } };

// Macht E-Mail-Adressen und URLs im Fließtext klickbar.
function linkify(text: string) {
  const parts = text.split(/(\S+@\S+\.[a-z]{2,}|https?:\/\/\S+?)(?=[.,;:)]?(?:\s|$))/g);
  return parts.map((part, i) => {
    if (/^\S+@\S+\.[a-z]{2,}$/.test(part)) return <a key={i} href={`mailto:${part}`} className="text-brand underline">{part}</a>;
    if (/^https?:\/\//.test(part)) return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-brand underline">{part}</a>;
    return part;
  });
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHero compact eyebrow="Rechtliches" title="Datenschutzbestimmung und Privatsphäre" />
      <section className="py-20">
        <Container className="max-w-3xl text-[17px] leading-relaxed text-ink/80">
          {datenschutz.map((b, i) => {
            if (b.type === "h") {
              if (b.level === 2) return <h2 key={i} className="mt-14 mb-4 text-2xl font-semibold tracking-tight text-ink first:mt-0 sm:text-3xl">{b.text}</h2>;
              if (b.level === 3) return <h3 key={i} className="mt-8 mb-2 text-lg font-semibold text-ink">{b.text}</h3>;
              return <h4 key={i} className="mt-6 mb-2 font-semibold text-ink">{b.text}</h4>;
            }
            if (b.type === "ul") return <ul key={i} className="my-3 list-disc space-y-1 pl-5">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
            return <p key={i} className="my-3 whitespace-pre-line">{linkify(b.text)}</p>;
          })}
        </Container>
      </section>
    </>
  );
}
