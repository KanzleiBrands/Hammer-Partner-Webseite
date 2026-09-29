import Image from "@/components/FImage";
import { Container, Eyebrow } from "./ui";
import { RevealWords, Reveal } from "./Reveal";
import type { ReactNode } from "react";

// Unterseiten-Header: Text links, Foto als Karte rechts (Desktop) bzw. Foto über dem
// Text (Mobil). Festes Seitenverhältnis → Gesichter werden weder verdeckt noch abgeschnitten.
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  children,
  compact = false,
  wideImage = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
  /** Breiteres Seitenverhältnis für Gruppenfotos */
  wideImage?: boolean;
}) {
  if (!image) {
    return (
      <section className="grain relative overflow-hidden bg-brand-900 text-white">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-brand/70 blur-[140px]" />
        <Container className="relative flex min-h-[40vh] items-end pt-36 pb-14">
          <div>
            <Reveal><Eyebrow light>{eyebrow}</Eyebrow></Reveal>
            <h1 className="text-balance mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              <RevealWords text={title} delay={0.1} />
            </h1>
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="grain relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-brand/70 blur-[140px]" />
      <div
        className={`relative mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:pt-32 lg:pb-20 ${
          compact ? "" : "lg:min-h-[78vh]"
        }`}
      >
        <div
          className={`relative mt-16 overflow-hidden lg:order-2 lg:mt-0 lg:rounded-[2.5rem] lg:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] lg:ring-1 lg:ring-white/10 ${
            wideImage ? "aspect-[3/2] lg:col-span-7" : "aspect-[4/3] sm:aspect-[16/10] lg:col-span-6 lg:aspect-[4/3]"
          }`}
        >
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            preload
            sizes={wideImage ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 48vw, 100vw"}
            className="object-cover"
          />
        </div>
        <div className={`relative px-4 pt-10 pb-16 sm:px-6 lg:order-1 lg:px-0 lg:py-0 ${wideImage ? "lg:col-span-5" : "lg:col-span-6"}`}>
          <Reveal>
            <Eyebrow light>{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="text-balance mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-5xl xl:text-6xl">
            <RevealWords text={title} delay={0.1} />
          </h1>
          {text && (
            <Reveal delay={0.35}>
              <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{text}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.5}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
