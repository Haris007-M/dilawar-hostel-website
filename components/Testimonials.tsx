"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);
  const t = TESTIMONIALS[i];
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x max-w-3xl text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">What residents say</h2>
          <div className="relative mt-10 min-h-[220px] rounded-3xl bg-white p-8 shadow-sm ring-1 ring-mist">
            <Quote className="mx-auto text-sun" size={32} />
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                <p className="mt-4 text-xl leading-relaxed">{t.text}</p>
                <p className="mt-5 font-display font-bold">{t.name}</p>
                <p className="text-sm text-ink/60">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-ink" : "w-2.5 bg-ink/25"}`} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
