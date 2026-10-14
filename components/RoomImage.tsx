"use client";
import { useState } from "react";
import { BedDouble } from "lucide-react";

// Shows the room photo. If the file is missing, shows a neat placeholder instead.
export default function RoomImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink2 to-ink text-paper/70">
        <div className="text-center"><BedDouble className="mx-auto mb-1" size={34} /><span className="text-xs">Photo coming soon</span></div>
      </div>
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />;
}
