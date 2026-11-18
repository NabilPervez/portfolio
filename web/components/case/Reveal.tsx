"use client";

import { useEffect } from "react";

/** Adds .in to .reveal elements as they scroll into view. No-op (content visible) without JS or with reduced motion. */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".case .reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach((e) => e.classList.add("in")); return; }
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
