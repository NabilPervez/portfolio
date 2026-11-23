"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";

/**
 * All home-page motion in one GSAP context so React StrictMode / route changes revert cleanly.
 * Effects (modelled on the reference's grammar):
 *  - masked line rise on display headings      [data-lines]
 *  - images wipe up into view                   [data-reveal]
 *  - word-by-word scrubbed reveal              [data-words]
 *  - marquees whose speed and skew follow scroll velocity [data-marquee]
 *  - hero word cycle, count-ups, simple fades  (.h-cycle, [data-count], .h-fade)
 */
export function useHomeMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (reduce) return; // content is fully visible by default; no motion at all

      // ── Masked line reveal ──
      el.querySelectorAll<HTMLElement>("[data-lines]").forEach((h, idx) => {
        // Hand-authored lines (<span.ln><span.li>) or SplitText lines with a mask wrapper
        const explicit = h.querySelectorAll(":scope > .ln > .li");
        const inHero = !!h.closest(".h-hero");
        const rise = (lines: Element[]) => gsap.from(lines, {
          yPercent: 110,
          duration: 1.2,
          ease: EASE,
          stagger: explicit.length ? 0.09 : 0.04,
          delay: inHero ? 0.15 + idx * 0.05 : 0,
          scrollTrigger: inHero ? undefined : { trigger: h, start: "top 97%", once: true },
        });
        if (explicit.length) rise(Array.from(explicit));
        // Per-word masks: same rising-through-a-slot look, wraps naturally at any width
        else rise(SplitText.create(h, { type: "words", mask: "words", wordsClass: "sl" }).words);
      });

      // ── Fades ──
      gsap.utils.toArray<HTMLElement>(".h-fade").forEach((f) => {
        const inHero = !!f.closest(".h-hero");
        gsap.from(f, {
          autoAlpha: 0, y: 20, duration: 0.8, ease: EASE,
          delay: inHero ? 0.55 : 0,
          scrollTrigger: inHero ? undefined : { trigger: f, start: "top 100%", once: true },
        });
      });

      // ── Image reveal: clean wipe up, image settles from a slight zoom ──
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((box) => {
        const img = box.querySelector("img");
        gsap.timeline({ scrollTrigger: { trigger: box, start: "top 97%", once: true } })
          .fromTo(box, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" })
          .from(img, { scale: 1.18, duration: 1.6, ease: EASE }, 0);
      });

      // ── Word-by-word scrubbed reveal ──
      el.querySelectorAll<HTMLElement>("[data-words]").forEach((p) => {
        const split = SplitText.create(p, { type: "words" });
        gsap.fromTo(split.words, { opacity: 0.14 }, {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });

      // ── Count-ups ──
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((dd) => {
        const end = Number(dd.dataset.count);
        const suffix = (dd.textContent || "").replace(/[0-9]/g, "");
        const o = { v: 0 };
        gsap.to(o, {
          v: end, duration: 1.6, ease: "power3.out",
          scrollTrigger: { trigger: dd, start: "top 100%", once: true },
          onUpdate: () => { dd.textContent = Math.round(o.v) + suffix; },
        });
      });

      // ── Hero word cycle: vertical track inside a mask, holds each word ──
      const trk = el.querySelector<HTMLElement>(".h-cycle .trk");
      if (trk) {
        const n = trk.children.length - 1; // last child repeats the first for a seamless loop
        const tl = gsap.timeline({ repeat: -1, delay: 2.2 });
        for (let i = 1; i <= n; i++) tl.to(trk, { yPercent: (-100 / (n + 1)) * i, duration: 0.8, ease: "expo.inOut" }, "+=1.6");
        tl.set(trk, { yPercent: 0 });
      }

      // ── Velocity marquees ──
      const tweens = gsap.utils.toArray<HTMLElement>("[data-marquee]").map((mq) => {
        const ul = mq.querySelector("ul")!;
        const dir = Number(mq.dataset.marquee) || -1;
        const tw = gsap.fromTo(ul, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 40, ease: "none", repeat: -1 });
        return { tw, ul };
      });
      const skewTo = tweens.map(({ ul }) => gsap.quickTo(ul, "skewX", { duration: 0.4, ease: "power3" }));
      let scrollDir = 1;
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v) scrollDir = Math.sign(v);
          const boost = scrollDir * (1 + Math.min(Math.abs(v) / 400, 4));
          tweens.forEach(({ tw }) => gsap.to(tw, { timeScale: boost, duration: 0.3, overwrite: true }));
          const skew = gsap.utils.clamp(-6, 6, v / -300);
          skewTo.forEach((q) => q(skew));
        },
      });
      // ease back to cruising speed when scrolling stops
      const settle = () => {
        tweens.forEach(({ tw }) => gsap.to(tw, { timeScale: scrollDir, duration: 1, overwrite: true }));
        skewTo.forEach((q) => q(0));
      };
      ScrollTrigger.addEventListener("scrollEnd", settle);
      cleanups.push(() => ScrollTrigger.removeEventListener("scrollEnd", settle));
    }, el);

    // re-measure once web fonts land (Anton changes line breaks)
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => { cleanups.forEach((f) => f()); ctx.revert(); };
  }, [root]);
}
