"use client";

import Image from "@/components/FImage";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Parallax nur ab Desktop-Breite: Auf dem Handy würde das Vergrößern des Bildes
// Köpfe am Rand abschneiden.
export function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 60,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const active = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], active ? [-strength, strength] : [0, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, top: active ? -strength : 0, bottom: active ? -strength : 0 }} className="absolute inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
