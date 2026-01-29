"use client";

import { useEffect, useState, useRef } from 'react';

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const indicators = Array.from({ length: 60 }).map((_, i) => {
        const isMinuteMark = i % 5 === 0; // Usually clock ticks are emphasized every 5, but snippet says % 2 for TICK/TOCK
        // Snippet logic:
        // if i % 2 == 0 -> content "TICK"
        // else -> height smaller, top adjusted, content "TOCK"

        // SCSS loop uses 1-based indexing for nth-child usually in CSS, but let's confirm logic.
        // "$i from 0 through 60".
        // nth-child is 1-based.
        // Actually the snippet usually implies an element list.
        // I will stick to the index i (0 to 59).

        // Wait, the SCSS iterates 0 through 60? That's 61 items.
        // But a clock usually has 60 ticks.
        // And the HTML shows many div.indicator lines.
        // Let's assume 60 indicators.

        // Adjusting for React (0-59):
        // Note: SCSS starts at 0. Code snippet selector `.indicator:nth-child(#{$i})`.
        // If i=0 in SCSS loop, nth-child(0) is invalid/selects nothing?
        // Actually sass loops can be tricky.
        // Assuming 60 steps for 360 degrees.

        // Let's implement the logic based on visual description:
        // Even (0, 2, 4...) -> TICK, full height
        // Odd (1, 3, 5...) -> TOCK, slightly shorter, offset top

        const isEven = i % 2 === 0;
        const rotation = i * 6; // 360 / 60 = 6 degrees

        // Active state: based on seconds.
        // In the snippet JS:
        // indicators[secondsValue].classList.add("active");

        const isActive = time ? time.getSeconds() === i : false;

        return (
            <div
                key={i}
                className={`indicator absolute left-0 right-0 mx-auto w-0 origin-bottom transition-all duration-200 ${isActive ? 'active' : ''}`}
                style={{
                    height: isEven ? 'calc(var(--clock-size) * 0.5)' : 'calc(var(--clock-size) * 0.44)',
                    top: isEven ? '0' : 'calc(var(--clock-size) * 0.06)',
                    transform: `rotate(${rotation}deg)`
                }}
            >
                <span
                    className={`absolute left-1/2 -translate-x-1/2 -top-[10%] text-2xl font-league-gothic transition-all duration-250 ${isActive ? 'text-[#ffd60a] drop-shadow-[0_0_#ffd60a]' : 'text-[#535353]'}`}
                    style={{
                        textShadow: isActive ? '0 0 10px #ffd60a' : 'none'
                    }}
                >
                    {isEven ? 'TICK' : 'TOCK'}
                </span>
            </div>
        );
    });

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    if (!time) return null; // Avoid hydration mismatch on first render if possible, or just render fallback

    return (
        <div className="flex flex-col items-center justify-center py-20 bg-black/90 rounded-3xl p-8 mb-8 border border-white/10">
            {/* Import Font */}
            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=League+Gothic&display=swap");
                .font-league-gothic {
                    font-family: "League Gothic", sans-serif;
                }
            `}</style>

            <div
                className="clock relative m-auto"
                style={{
                    '--clock-size': '400px',
                    width: 'var(--clock-size)',
                    height: 'var(--clock-size)',
                } as React.CSSProperties}
            >
                {indicators}

                <div
                    className="time absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md flex justify-center items-center text-4xl border border-black text-black font-league-gothic z-10"
                    style={{
                        height: 'calc(var(--clock-size) * 0.2)', // Increased height
                        width: 'calc(var(--clock-size) * 0.5)',  // Increased width
                    }}
                >
                    <div className="flex flex-col items-center leading-none">
                        <span>IT&apos;S YOUR</span>
                        <span>TURN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
