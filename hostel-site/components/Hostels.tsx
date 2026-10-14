"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Users, X, Expand } from "lucide-react";
import { HOSTELS, SITE, fmt, waLink, type Hostel, type RoomType } from "@/lib/data";
import RoomImage from "./RoomImage";
import Reveal from "./Reveal";

const ALL_PRICES = HOSTELS.flatMap((h) => h.rooms.map((r) => r.price));
const MIN = Math.min(...ALL_PRICES), MAX = Math.max(...ALL_PRICES);
const BED_FILTERS = [{ v: 0, label: "All rooms" }, { v: 1, label: "Single" }, { v: 2, label: "2 beds" }, { v: 3, label: "3 beds" }, { v: 4, label: "4 beds" }];

function RoomModal({ room, hostel, onClose }: { room: RoomType; hostel: Hostel; onClose: () => void }) {
  const imgs = [room.image, ...(room.gallery ?? [])];
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + imgs.length) % imgs.length);

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  });

  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={room.title}
        initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl bg-paper md:grid-cols-2">
        <div className="relative aspect-[4/3] bg-ink md:aspect-auto md:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <RoomImage src={imgs[i]} alt={`${room.title} photo ${i + 1}`} />
            </motion.div>
          </AnimatePresence>
          {imgs.length > 1 && (
            <>
              <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-paper/90 hover:bg-paper"><ChevronLeft /></button>
              <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-paper/90 hover:bg-paper"><ChevronRight /></button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {imgs.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-sun" : "w-2 bg-paper/70"}`} />)}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-ink/60">{hostel.name}</p>
              <h3 className="font-display text-2xl font-extrabold">{room.title}</h3>
            </div>
            <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-mist hover:bg-ink hover:text-paper"><X size={18} /></button>
          </div>
          <p className="mt-4"><span className="text-3xl font-extrabold">{fmt(room.price)}</span><span className="text-ink/60"> / bed / month</span></p>
          <p className="mt-1 text-sm text-ink/70">{room.beds} {room.beds === 1 ? "bed" : "beds"} in this room. Whole room cost: {fmt(room.price * room.beds)} / month.</p>
          <ul className="mt-5 grid gap-2 text-sm">
            {room.features.map((f) => <li key={f} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-sunsoft"><Check size={12} /></span>{f}</li>)}
          </ul>
          <p className="mt-5 flex items-start gap-2 text-sm text-ink/70"><MapPin size={16} className="mt-0.5 shrink-0" />{hostel.address}</p>
          <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
            <a href={waLink(`Hello! I am interested in the ${room.title} (${fmt(room.price)}/month) at ${hostel.name}. Is a bed available?`)} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wa py-3 font-semibold text-white hover:brightness-95"><MessageCircle size={17} />WhatsApp</a>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink py-3 font-semibold text-paper hover:bg-ink2"><Phone size={17} />Call</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hostels() {
  const [active, setActive] = useState(HOSTELS[0].id);
  const [beds, setBeds] = useState(0);
  const [budget, setBudget] = useState(MAX);
  const [selected, setSelected] = useState<RoomType | null>(null);
  const hostel = HOSTELS.find((h) => h.id === active)!;
  const rooms = useMemo(() => hostel.rooms.filter((r) => (beds === 0 || r.beds === beds) && r.price <= budget), [hostel, beds, budget]);

  return (
    <section id="hostels" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Choose your hostel and room</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/70">Prices are per bed, per month. Pick a hostel, filter by room type or budget, and tap a room for photos and details.</p>
        </Reveal>

        {/* Hostel selector */}
        <div role="tablist" aria-label="Hostels" className="mt-10 grid gap-4 md:grid-cols-2">
          {HOSTELS.map((h) => {
            const from = Math.min(...h.rooms.map((r) => r.price));
            const on = active === h.id;
            return (
              <button key={h.id} role="tab" aria-selected={on} onClick={() => setActive(h.id)}
                className={`relative overflow-hidden rounded-2xl p-5 text-left ring-1 transition ${on ? "text-paper ring-ink" : "bg-white ring-mist hover:-translate-y-1 hover:shadow-lg"}`}>
                {on && <motion.span layoutId="hostel-bg" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative flex items-center justify-between gap-4">
                  <span>
                    <span className="block font-display text-xl font-bold">{h.name}</span>
                    <span className={`mt-1 flex items-center gap-1.5 text-sm ${on ? "text-paper/75" : "text-ink/60"}`}><MapPin size={14} />{h.area}, {SITE.city}</span>
                  </span>
                  <span className="text-right">
                    <span className={`block text-xs ${on ? "text-paper/70" : "text-ink/60"}`}>from</span>
                    <span className={`font-display text-lg font-extrabold ${on ? "text-sun" : ""}`}>{fmt(from)}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={hostel.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} role="tabpanel">
            <div className="mt-6 grid gap-6 rounded-3xl bg-sunsoft p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-lg text-ink/85">{hostel.blurb}</p>
                <p className="mt-4 flex items-start gap-2 text-sm"><MapPin size={16} className="mt-0.5 shrink-0" />{hostel.address}</p>
                <p className="mt-1 flex items-center gap-2 text-sm"><Users size={16} className="shrink-0" />Best for: {hostel.audience}</p>
                <a href={hostel.mapLink} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink2">Open in Google Maps</a>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {hostel.highlights.map((x) => <li key={x} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium"><Check size={14} className="text-ink2" />{x}</li>)}
              </ul>
            </div>

            {/* Filters */}
            <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-white p-4 ring-1 ring-mist md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by room type">
                {BED_FILTERS.map((f) => (
                  <button key={f.v} onClick={() => setBeds(f.v)} aria-pressed={beds === f.v}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${beds === f.v ? "text-paper" : "bg-mist hover:bg-mist/60"}`}>
                    {beds === f.v && <motion.span layoutId="bed-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{f.label}</span>
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-3 text-sm font-medium">
                Max budget
                <input type="range" min={MIN} max={MAX} step={500} value={budget} onChange={(e) => setBudget(+e.target.value)} className="h-2 w-40 cursor-pointer accent-ink" />
                <span className="w-24 font-display font-bold">{fmt(budget)}</span>
              </label>
            </div>

            <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {rooms.map((r) => (
                  <motion.article layout key={r.id}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    whileHover={{ y: -6 }}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-mist hover:shadow-xl">
                    <button onClick={() => setSelected(r)} aria-label={`View ${r.title} details`} className="relative aspect-[4/3] overflow-hidden text-left">
                      <RoomImage src={r.image} alt={`${r.title} at ${hostel.name}`} />
                      {r.popular && <span className="absolute left-3 top-3 rounded-full bg-sun px-3 py-1 text-xs font-bold">Most booked</span>}
                      <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-paper">{r.beds} {r.beds === 1 ? "bed" : "beds"}</span>
                      <span className="absolute inset-0 grid place-items-center bg-ink/40 opacity-0 transition group-hover:opacity-100"><span className="flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold"><Expand size={15} />View photos</span></span>
                    </button>
                    <div className="flex flex-1 flex-col p-5">
                      <h4 className="font-display text-xl font-bold">{r.title}</h4>
                      <p className="mt-1"><span className="text-2xl font-extrabold">{fmt(r.price)}</span><span className="text-sm text-ink/60"> / bed / month</span></p>
                      <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
                        {r.features.map((f) => <li key={f} className="flex items-center gap-2"><Check size={14} className="text-ink2" />{f}</li>)}
                      </ul>
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                        <a href={waLink(`Hello! I am interested in the ${r.title} (${fmt(r.price)}/month) at ${hostel.name}. Is a bed available?`)} target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-wa px-3 py-2.5 text-sm font-semibold text-white hover:brightness-95"><MessageCircle size={15} />WhatsApp</a>
                        <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2.5 text-sm font-semibold text-paper hover:bg-ink2"><Phone size={15} />Call</a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {rooms.length === 0 && (
              <div className="mt-6 rounded-2xl bg-white p-8 text-center ring-1 ring-mist">
                <p className="font-display text-xl font-bold">No rooms match this budget</p>
                <p className="mt-1 text-ink/70">Raise the budget or choose another room type.</p>
                <button onClick={() => { setBeds(0); setBudget(MAX); }} className="mt-4 rounded-full bg-ink px-5 py-2 font-semibold text-paper">Reset filters</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>{selected && <RoomModal room={selected} hostel={hostel} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
