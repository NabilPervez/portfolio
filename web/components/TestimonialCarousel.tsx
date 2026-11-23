"use client";

// Nabil 2026-11-22: testimonials as a carousel — one card per view on mobile, 3 on desktop, arrows + dots, autoplay pauses on hover/touch.
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonialsData from "../app/data/testimonials.json";

export function TestimonialCarousel() {
    const track = useRef<HTMLDivElement>(null);
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const n = testimonialsData.length;

    const go = useCallback((i: number) => {
        const el = track.current;
        if (!el) return;
        const next = (i + n) % n;
        const card = el.children[next] as HTMLElement | undefined;
        if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
        setIdx(next);
    }, [n]);

    useEffect(() => {
        if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = setInterval(() => go(idx + 1), 6000);
        return () => clearInterval(t);
    }, [idx, paused, go]);

    const onScroll = () => {
        const el = track.current;
        if (!el) return;
        const w = (el.children[0] as HTMLElement)?.offsetWidth || 1;
        setIdx(Math.round(el.scrollLeft / (w + 16)));
    };

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            aria-roledescription="carousel"
        >
            <div
                ref={track}
                onScroll={onScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {testimonialsData.map((t) => (
                    <figure
                        key={t.id}
                        className="snap-start shrink-0 w-full md:w-[calc((100%-32px)/3)] bg-white border border-hair rounded-2xl p-8 flex flex-col justify-between gap-8 transition-all duration-300 hover:-translate-y-1 hover:border-g3 hover:shadow-[0_12px_32px_-12px_rgb(15_42_32/.25)] hover:bg-g1/40 my-2"
                    >
                        <blockquote className="text-[17px] leading-[1.55] text-foreground [text-wrap:pretty] line-clamp-[10]">&ldquo;{t.quote}&rdquo;</blockquote>
                        <figcaption>
                            <p className="text-[14px] font-medium text-foreground">{t.author}</p>
                            <p className="text-[13px] text-secondary">{t.role}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex gap-1.5">
                    {testimonialsData.map((t, i) => (
                        <button key={t.id} onClick={() => go(i)} aria-label={`Testimonial ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-g4" : "w-1.5 bg-hair"}`} />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => go(idx - 1)} aria-label="Previous" className="w-10 h-10 rounded-full border border-hair grid place-items-center hover:bg-g1"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => go(idx + 1)} aria-label="Next" className="w-10 h-10 rounded-full border border-hair grid place-items-center hover:bg-g1"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
}
