"use client";

import React from "react";
import "./InfiniteCarousel.css";

interface InfiniteCarouselProps {
    children: React.ReactNode;
    speed?: number; // duration in seconds
    direction?: "left" | "right";
    pauseOnHover?: boolean;
    className?: string;
}

export const InfiniteCarousel = ({
    children,
    speed = 40,
    direction = "normal", // changed to normal/reverse (or handle logic outside)
    pauseOnHover = true,
    className = ""
}: Omit<InfiniteCarouselProps, 'direction'> & { direction?: "normal" | "reverse" }) => {
    // Actually, I want users to pass 'left' or 'right'
    // But CSS var takes normal/reverse.
    // Let's stick with left/right prop and map it.

    const animationDirection = direction === "reverse" ? "reverse" : "normal"; // if mapped correctly
    return (
        <div
            className={`overflow-hidden flex w-full relative ${className} ${pauseOnHover ? "pause-on-hover" : ""}`}
            style={{
                maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
            } as React.CSSProperties}
        >
            <div
                className="flex animate-marquee"
                style={{
                    "--speed": `${speed}s`,
                    "--direction": animationDirection
                } as React.CSSProperties}
            >
                <div className="flex gap-8 pr-8">
                    {children}
                </div>
                <div className="flex gap-8 pr-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Proper mapping
export default function InfiniteCarouselExport({
    direction = "left",
    ...props
}: InfiniteCarouselProps) {
    return <InfiniteCarousel direction={direction === "right" ? "reverse" : "normal"} {...props} />;
}
