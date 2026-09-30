"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { focusCentered } from "@/lib/faces";

export function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 60,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  mobileAspect,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  sizes?: string;
  /** Seitenverhältnis unter 1024 px (per className setzen, z. B. aspect-square → 1):
   *  Personen werden dort mittig gesetzt, Parallax nur ab Desktop. */
  mobileAspect?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    if (!mobileAspect) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mobileAspect]);
  const still = reduce || (mobileAspect !== undefined && !desktop);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [-strength, strength]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className} ${mobileAspect ? "lg:[--mpos:initial]" : ""}`}
      style={mobileAspect ? ({ "--mpos": focusCentered(src, mobileAspect) } as React.CSSProperties) : undefined}
    >
      <motion.div style={{ y }} className={`absolute inset-x-0 ${mobileAspect && !desktop ? "inset-y-0" : "-inset-y-[80px]"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={mobileAspect ? { objectPosition: "var(--mpos, 50% 50%)" } : undefined}
        />
      </motion.div>
    </div>
  );
}
