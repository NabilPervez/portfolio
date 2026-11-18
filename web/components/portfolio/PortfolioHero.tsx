"use client";

import { useEffect, useRef } from "react";
import "./PortfolioHero.css";

export default function PortfolioHero({ count }: { count: number }) {
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
    <section className="phero" ref={ref} aria-labelledby="portfolio-title">
      <div className="pattern dim" aria-hidden="true" />
      <div className="ring" aria-hidden="true"><div className="pattern" /></div>
      <div className="ring" aria-hidden="true"><div className="pattern" /></div>
      <div className="clear" aria-hidden="true" />
      <div className="lockup">
        <p className="kicker enter">Nabil Pervez · Portfolio</p>
        <h1 id="portfolio-title" className="enter d1">
          <span className="nw">Brand. Campaigns.</span> <span className="nw">Product. Web.</span>
          <br /><span className="shine">Shipped.</span>
        </h1>
        <p className="lede enter d2">{count} case studies from LEGO, Riot, Activision Blizzard, Coca-Cola, Lenovo Legion and more. Co-founder &amp; CTO of AOE Creative, 3× Best Esports Agency of the Year Finalist.</p>
        <div className="ctas enter d2">
          <a className="btn btn-gold" href="#work">See the work</a>
          <a className="btn btn-line" href="/about">About me</a>
        </div>
      </div>
      <div className="sheen" aria-hidden="true" />
    </section>
  );
}
