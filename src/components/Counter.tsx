"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const isYear = value >= 1900 && value <= 2100;
  const from = isYear ? value - 60 : 0;
  const [display, setDisplay] = useState(reduce ? value : from);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, from]);

  return (
    <span ref={ref} className={className}>
      {isYear ? display : display.toLocaleString("de-DE")}
    </span>
  );
}
