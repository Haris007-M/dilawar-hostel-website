"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink("Hello! I want to know about hostel rooms.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} whileHover={{ scale: 1.1 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lg"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-wa/40" aria-hidden />
      <MessageCircle className="relative" />
    </motion.a>
  );
}
