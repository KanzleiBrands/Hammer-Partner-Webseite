"use client";

import Image from "@/components/FImage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { RevealWords } from "./Reveal";

const slides = [
  { src: "/images/fotos/team-aussen.webp", alt: "Das Team von Hammer & Partner vor der Kanzlei in Betzdorf" },
  { src: "/images/fotos/besprechung-lachen.webp", alt: "Beratungsgespräch im Besprechungsraum" },
  { src: "/images/fotos/kollegen-lachen.webp", alt: "Zwei Kollegen lachen gemeinsam am Arbeitsplatz" },
  { src: "/images/fotos/empfang-hund.webp", alt: "Empfang der Kanzlei mit Bürohund" },
  { src: "/images/fotos/stehpult.webp", alt: "Moderner Arbeitsplatz mit Stehpult" },
];

const DURATION = 6500;

// Text und Bild liegen nebeneinander (Desktop) bzw. untereinander (Mobil):
// So liegt nie Schrift über Gesichtern.
export function HomeHero({
  eyebrow,
  title,
  text,
  video,
  phone,
  phoneLink,
}: {
  eyebrow: string;
  title: string;
  text: string;
  video?: string;
  phone: string;
  phoneLink: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (video || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => clearInterval(t);
  }, [video, reduce]);

  return (
    <section className="grain relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-brand/70 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:pt-28 lg:pb-24">
      {/* Bild: mobil oben (unter dem Header), Desktop als Karte rechts mit festem Seitenverhältnis */}
      <div className="relative mt-20 aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:order-2 lg:col-span-7 lg:mt-0 lg:aspect-[6/5] lg:rounded-[2.5rem] lg:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] lg:ring-1 lg:ring-white/10 xl:aspect-[5/4]">
        {video ? (
          <video className="absolute inset-0 h-full w-full object-cover" src={video} autoPlay muted loop playsInline poster={slides[0].src} />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                preload={index === 0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}
        {!video && (
          <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-md sm:right-6 sm:bottom-6">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1} anzeigen`}
                className="relative h-1 w-6 overflow-hidden rounded-full bg-white/30 sm:w-9"
              >
                {i === index && (
                  <motion.span
                    key={`p-${index}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-white/70" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="relative px-4 pt-10 pb-24 sm:px-6 sm:pb-28 lg:order-1 lg:col-span-5 lg:px-0 lg:py-0">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur-md sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {eyebrow}
          </motion.span>

          <h1 className="text-balance mt-6 text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[3.2rem] xl:text-[3.9rem]">
            <RevealWords text={title} delay={0.2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-pretty mt-5 max-w-xl text-[17px] leading-relaxed text-white/80 sm:mt-6 sm:text-xl"
          >
            {text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-brand transition hover:bg-brand-50 sm:py-4"
            >
              Erstgespräch vereinbaren
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${phoneLink}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10 sm:py-4"
            >
              <Phone className="h-4 w-4" /> {phone}
            </a>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
