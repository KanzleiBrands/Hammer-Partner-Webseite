"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { RevealWords } from "./Reveal";

const slides = [
  { src: "/images/fotos/team-aussen.webp", alt: "Das Team von Hammer & Partner vor der Kanzlei in Betzdorf", pos: "50% 60%" },
  { src: "/images/fotos/besprechung-lachen.webp", alt: "Beratungsgespräch im Besprechungsraum", pos: "50% 35%" },
  { src: "/images/fotos/kollegen-lachen.webp", alt: "Zwei Kollegen lachen gemeinsam am Arbeitsplatz", pos: "50% 40%" },
  { src: "/images/fotos/empfang-hund.webp", alt: "Empfang der Kanzlei mit Bürohund", pos: "50% 45%" },
  { src: "/images/fotos/stehpult.webp", alt: "Moderner Arbeitsplatz mit Stehpult", pos: "50% 40%" },
];

const DURATION = 6500;

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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    if (video || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => clearInterval(t);
  }, [video, reduce]);

  return (
    <section ref={ref} className="grain relative min-h-[100svh] overflow-hidden bg-brand-900 text-white sm:min-h-[640px]">
      <motion.div style={{ scale }} className="absolute inset-0">
        {video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            poster={slides[0].src}
          />
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
                data-face-exempt
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                preload={index === 0}
                sizes="100vw"
                className="animate-kenburns object-cover"
                style={{ objectPosition: slides[index].pos }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/25 to-brand-900/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/70 via-brand-900/10 to-transparent" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pt-28 pb-24 sm:min-h-[640px] sm:px-6 sm:pt-32 sm:pb-32 lg:px-8"
      >
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

        <h1 className="text-balance mt-6 max-w-5xl text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-7xl lg:text-[5.6rem]">
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
          className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-brand sm:py-4 transition hover:bg-brand-50"
          >
            Erstgespräch vereinbaren
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${phoneLink}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm sm:py-4 transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4" /> {phone}
          </a>
        </motion.div>
      </motion.div>

      {!video && (
        <div className="absolute right-4 bottom-10 flex items-center gap-2 sm:right-8 lg:right-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              className="relative h-1 w-8 overflow-hidden rounded-full bg-white/25 sm:w-12"
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

      <div className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60 md:flex">
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-white" />
        </span>
      </div>
    </section>
  );
}
