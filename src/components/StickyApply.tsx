"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

export function StickyApply({ label, sub }: { label: string; sub?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("bewerben");
      const past = window.scrollY > 600;
      const atForm = form ? form.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(past && !atForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6"
        >
          <a href="#bewerben" className="group flex items-center justify-between gap-6 rounded-full bg-brand py-2.5 pr-2.5 pl-6 text-white shadow-[0_20px_50px_-10px_rgba(37,55,129,0.7)]">
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold">{label}</span>
              {sub && <span className="block text-xs text-white/70">{sub}</span>}
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand transition group-hover:translate-x-0.5">
              <ArrowRight className="h-5 w-5" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
