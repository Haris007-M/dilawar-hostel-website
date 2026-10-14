"use client";
import { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { HOSTELS, SITE, waLink } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  const [name, setName] = useState("");
  const [hostel, setHostel] = useState(HOSTELS[0].name);
  const [room, setRoom] = useState("Two Seater");
  const [error, setError] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name."); return; }
    setError("");
    window.open(waLink(`Hello! My name is ${name}. I want to book a ${room} at ${hostel}. Please share availability.`), "_blank");
  };
  const field = "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-ink";

  return (
    <section id="contact" className="scroll-mt-16 bg-ink py-20 text-paper sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Book a bed today</h2>
          <p className="mt-4 max-w-md text-lg text-paper/80">Beds fill quickly at the start of each semester. Message us to check availability.</p>
          <div className="mt-8 space-y-4">
            <a href={waLink("Hello! I want to know about hostel rooms.")} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-semibold hover:text-sun"><MessageCircle className="text-wa" /> WhatsApp: {SITE.phoneDisplay}</a>
            <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-3 font-semibold hover:text-sun"><Phone className="text-sun" /> Call: {SITE.phoneDisplay}</a>
            {SITE.email && <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 font-semibold hover:text-sun"><Mail className="text-sun" /> {SITE.email}</a>}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={send} className="space-y-4 rounded-3xl bg-paper p-6 text-ink sm:p-8" noValidate>
            <h3 className="font-display text-xl font-bold">Send your request on WhatsApp</h3>
            <div>
              <label htmlFor="n" className="mb-1 block text-sm font-medium">Your name</label>
              <input id="n" className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" />
              {error && <p role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            <div>
              <label htmlFor="h" className="mb-1 block text-sm font-medium">Hostel</label>
              <select id="h" className={field} value={hostel} onChange={(e) => setHostel(e.target.value)}>
                {HOSTELS.map((h) => <option key={h.id}>{h.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="r" className="mb-1 block text-sm font-medium">Room type</label>
              <select id="r" className={field} value={room} onChange={(e) => setRoom(e.target.value)}>
                {["Single Seater", "Two Seater", "Three Bed Room", "Four Bed Room"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-wa py-3 font-semibold text-white hover:brightness-95"><Send size={17} />Send on WhatsApp</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
