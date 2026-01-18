"use client";

import React, { useEffect, useRef, useState, Children } from "react";

interface MobileAutoCarouselProps {
    children: React.ReactNode;
    desktopGridClassName?: string; // Class for the desktop grid layout (e.g., "hidden md:grid ...")
    mobileItemClassName?: string;  // Class for individual items on mobile
}

export function MobileAutoCarousel({
    children,
    desktopGridClassName = "hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8",
    mobileItemClassName = "min-w-[85vw] snap-center"
}: MobileAutoCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Let's use an interval for snapping to next item
        const interval = setInterval(() => {
            if (!isPaused && scrollContainer) {
                const itemWidth = scrollContainer.children[0]?.clientWidth || 0;
                const gap = 16; // approximate gap
                const currentScroll = scrollContainer.scrollLeft;
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

                let nextScroll = currentScroll + itemWidth + gap;

                if (currentScroll >= maxScroll - 10) {
                    // Wrap to beginning
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollTo({ left: nextScroll, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <>
            {/* Mobile View - Carousel */}
            <div
                ref={scrollRef}
                className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setTimeout(() => setIsPaused(false), 5000)} // Resume after 5s
            >
                {Children.map(children, (child, i) => (
                    <div key={i} className={mobileItemClassName}>
                        {child}
                    </div>
                ))}
            </div>

            {/* Desktop View - Grid */}
            <div className={desktopGridClassName}>
                {children}
            </div>
        </>
    );
}
