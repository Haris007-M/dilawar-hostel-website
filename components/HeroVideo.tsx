"use client";
import { useEffect, useRef, useState } from "react";

// Video on the right side of the hero. The left side stays solid, with a shade fading between.
// Put your video at /public/videos/hero.mp4 (and optionally /public/images/hero-poster.jpg).
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);

  if (failed) return null;
  return (
    <div aria-hidden className="absolute inset-y-0 -right-20 w-full lg:w-[50%]">
      <video
        ref={ref} autoPlay muted loop playsInline preload="metadata"
        poster="/images/hero-poster.jpg" onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* even tint so text and price cards stay readable */}
      <div className="absolute inset-0 bg-ink/55 lg:bg-ink/30" />
      {/* shade: solid colour on the left blending into the video */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:via-ink/50" />
      {/* soft fade into the stats strip */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
