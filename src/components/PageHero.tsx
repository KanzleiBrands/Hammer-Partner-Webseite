import Image from "next/image";
import { Container, Eyebrow } from "./ui";
import { RevealWords, Reveal } from "./Reveal";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  children,
  compact = false,
  position = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
  position?: string;
}) {
  return (
    <section
      className={`grain relative flex items-end overflow-hidden bg-brand-900 text-white ${
        compact ? "min-h-[46vh] pt-32 pb-14" : "min-h-[78vh] pt-36 pb-20"
      }`}
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          preload
          sizes="100vw"
          className="animate-kenburns object-cover"
          style={{ objectPosition: position }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/40 to-brand-900/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/70 via-brand-900/10 to-transparent" />
      <Container className="relative">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="text-balance mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <RevealWords text={title} delay={0.1} />
        </h1>
        {text && (
          <Reveal delay={0.35}>
            <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{text}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.5}>{children}</Reveal>}
      </Container>
    </section>
  );
}
