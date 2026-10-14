"use client";
import { motion } from "framer-motion";
import { BookOpen, Droplets, Shield, Shirt, Sparkles, Utensils, Wifi, Zap } from "lucide-react";
import { AMENITIES } from "@/lib/data";
import Reveal from "./Reveal";

const ICONS = { wifi: Wifi, utensils: Utensils, shield: Shield, zap: Zap, droplets: Droplets, shirt: Shirt, book: BookOpen, sparkles: Sparkles } as const;

export default function Amenities() {
  return (
    <section id="amenities" className="scroll-mt-16 bg-sunsoft py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Everything you need is included</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/70">Every Al-Salih hostel comes with these facilities, so you can focus on study or work.</p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((a, i) => {
            const Icon = ICONS[a.icon as keyof typeof ICONS];
            return (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}>
                <motion.div whileHover={{ rotate: -8, scale: 1.1 }} className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-sun"><Icon size={22} /></motion.div>
                <h3 className="mt-4 font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-1 text-sm text-ink/75">{a.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
