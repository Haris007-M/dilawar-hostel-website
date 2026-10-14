"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/data";

const LINKS = [
  { href: "#hostels", label: "Hostels & prices" },
  { href: "#amenities", label: "Facilities" },
  { href: "#process", label: "How to join" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((l) => { const el = document.querySelector(l.href); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", on); obs.disconnect(); };
  }, []);

  // Light text on the dark hero, dark text once the bar turns solid.
  const solid = scrolled || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? "bg-paper/95 text-ink shadow-sm backdrop-blur" : "bg-transparent text-paper"}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-sun text-sm text-ink">AS</span>
          {SITE.name}
        </a>
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="relative rounded-full px-3 py-2 transition hover:opacity-80">
              {active === l.href && <motion.span layoutId="nav-active" className={`absolute inset-0 rounded-full ${solid ? "bg-mist" : "bg-paper/15"}`} />}
              <span className="relative">{l.label}</span>
            </a>
          ))}
          <a href={`tel:${SITE.phoneTel}`} className="ml-2 inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 font-semibold text-ink transition hover:brightness-95">
            <Phone size={15} /> Call now
          </a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-sun" />
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col gap-1 pb-5">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-medium hover:bg-mist">{l.label}</a>
              ))}
              <a href={`tel:${SITE.phoneTel}`} className="mt-2 rounded-full bg-ink py-3 text-center font-medium text-paper">Call {SITE.phoneDisplay}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
