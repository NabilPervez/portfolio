"use client";

import { useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/caseStudies";
import { CaseImage } from "./CaseImage";

function Video({ m }: { m: Extract<Media, { video: string }> }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m.loop) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.controls = true; return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => { el.controls = true; });
      else el.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [m.loop]);
  return (
    <video
      ref={ref}
      className="h-auto w-full bg-black"
      poster={m.poster}
      width={m.w}
      height={m.h}
      preload="none"
      playsInline
      muted={m.loop}
      loop={m.loop}
      controls={!m.loop}
      aria-label={m.title}
    >
      <source src={m.video} type="video/mp4" />
    </video>
  );
}

function YouTube({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  if (on)
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  return (
    <button onClick={() => setOn(true)} className="group relative block aspect-video w-full overflow-hidden bg-black" aria-label={`Play video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
      <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-midnight">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}

export function MediaItem({ item, wide }: { item: Media; wide?: boolean }) {
  const portrait = "video" in item && !!item.w && !!item.h && item.h > item.w;
  const span = portrait ? "col-span-3 md:col-span-2" : wide ? "col-span-6" : "col-span-6 md:col-span-3";
  return (
    <figure className={`reveal ${span}`}>
      {"embed" in item ? <iframe className="aspect-video w-full bg-black" src={item.embed} title={item.title} loading="lazy" allow="autoplay; fullscreen" allowFullScreen /> : "youtube" in item ? <YouTube id={item.youtube} title={item.title} /> : "video" in item ? <Video m={item} /> : <CaseImage img={item} sizes="50vw" />}
      {"title" in item && <figcaption className="mt-2 text-sm text-white/50">{item.title}</figcaption>}
    </figure>
  );
}
