"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./MotionHero.css";

export default function MotionHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="phero" ref={ref} aria-labelledby="hero-title">
      <div className="pattern dim" aria-hidden="true" />
      <div className="ring" aria-hidden="true"><div className="pattern" /></div>
      <div className="ring" aria-hidden="true"><div className="pattern" /></div>
      <div className="clear" aria-hidden="true" />
      <div className="lockup">
        <p className="kicker enter">Product Manager · Scrum Master · AI SME</p>
        <h1 id="hero-title" className="enter d1">
          I make complex things <span className="shine">simple.</span>
          <span className="cont">Then I make them run themselves.</span>
        </h1>
        <p className="lede enter d2">Former CTO and co-founder of AOE Creative, a multi-million-dollar, award-winning agency trusted by Riot Games, Activision Blizzard, LEGO and Coca-Cola. Today I lead AI adoption at enterprise scale.</p>
        <div className="ctas enter d2">
          <Link className="btn btn-gold" href="/portfolio">See my work</Link>
          <Link className="btn btn-line" href="/about">About me</Link>
        </div>
      </div>
      <div className="sheen" aria-hidden="true" />
    </section>
  );
}
