"use client";

import { useEffect, useRef } from "react";

/** Muted looping video that only downloads/plays while on screen. Static poster under reduced motion. */
export function LazyVideo({ src, poster, className = "", eager = false, label }: { src: string; poster?: string; className?: string; eager?: boolean; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!el.src) el.src = src; el.play().catch(() => {}); }
      else el.pause();
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    />
  );
}
