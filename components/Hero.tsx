"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BedDouble, MessageCircle } from "lucide-react";
import { HOSTELS, SITE, STATS, fmt, waLink } from "@/lib/data";
import CountUp from "./CountUp";
import HeroVideo from "./HeroVideo";

const cheapest = Math.min(...HOSTELS.flatMap((h) => h.rooms.map((r) => r.price)));
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

export default function Hero() {
  const tags = [1, 2, 3, 4].map((beds) => ({
    beds,
    from: Math.min(...HOSTELS.flatMap((h) => h.rooms.filter((r) => r.beds === beds).map((r) => r.price))),
  }));
  const names = ["Single seater", "Two seater", "Three bed", "Four bed"];

  // Soft mouse parallax on the glow shapes
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const bx = useTransform(sx, (v) => v * -0.04), by = useTransform(sy, (v) => v * -0.04);

  return (
    <section
      id="top"
      onMouseMove={(e) => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
      className="relative overflow-hidden bg-ink pt-28 text-paper sm:pt-36"
    >
      <motion.div aria-hidden style={{ x: bx, y: by }} className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sun/25 blur-3xl" />
      <motion.div aria-hidden style={{ x: sx, y: sy, scale: 0.5 }} className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-ink2 blur-3xl" />
      <HeroVideo />
      <div className="container-x relative grid items-center gap-12 pb-16 lg:grid-cols-[1.2fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-4 inline-flex items-center gap-2 rounded-full border border-paper/25 px-3 py-1 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-wa" /> Beds available in {HOSTELS.length} hostels in {SITE.city}
          </motion.p>
          <motion.h1 variants={item} className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            A room that feels like home, from {fmt(cheapest)} a month.
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg text-paper/80">{SITE.tagline}</motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#hostels" className="rounded-full bg-sun px-6 py-3 font-semibold text-ink">See rooms and prices</motion.a>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href={waLink("Hello! I want to know about hostel rooms.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-semibold hover:bg-paper/10">
              <MessageCircle size={18} /> Chat on WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="mx-auto w-full max-w-sm">
          <p className="mb-3 text-sm text-paper/70">Starting price per bed, per month</p>
          <ul className="space-y-3">
            {tags.map((t, i) => (
              <motion.li key={t.beds}
                initial={{ opacity: 0, x: 60, rotate: 3 }} animate={{ opacity: 1, x: 0, rotate: i % 2 ? 1 : -1 }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 120, damping: 14 }}
                whileHover={{ rotate: 0, scale: 1.04, x: -6 }}
                className="flex cursor-default items-center justify-between rounded-2xl bg-paper px-5 py-4 text-ink shadow-xl">
                <span className="flex items-center gap-3 font-display text-lg font-bold">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sun"><BedDouble size={20} /></span>{names[i]}
                </span>
                <span className="font-semibold">{fmt(t.from)}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-paper/10 bg-ink2/60">
        <dl className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-3 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-3xl font-extrabold text-sun sm:text-4xl"><CountUp to={s.value} suffix={s.suffix} /></dd>
              <dt className="text-sm text-paper/75">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
