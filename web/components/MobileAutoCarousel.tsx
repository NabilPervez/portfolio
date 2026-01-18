"use client";

import React, { useEffect, useRef, useState } from "react";

interface MobileAutoCarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    desktopGridClassName?: string; // Class for the desktop grid layout (e.g., "hidden md:grid ...")
    mobileItemClassName?: string;  // Class for individual items on mobile
}

export function MobileAutoCarousel<T>({
    items,
    renderItem,
    desktopGridClassName = "hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8",
    mobileItemClassName = "min-w-[85vw] snap-center"
}: MobileAutoCarouselProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollAmount = 0;
        const scrollSpeed = 2; // Pixels per frame approx
        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                // If we reached the end, snap back to start (infinite loop illusion is harder without duplicating items, 
                // so we will just scroll back to start or bounce. 
                // User asked for "rotates through", implying loop.
                // Simple shuffle loop: check remaining scroll width.

                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // For smooth continuous auto-scroll, we might just increment scroll. 
                    // But "Carousel" usually implies page-by-page or item-by-item.
                    // Let's do a simple interval based scroll to next snap point maybe?
                    // Actually, a slow continuous drift is "premium". 
                    // But user said "swiped and rotates through".
                    // Let's implement a timer that scrolls to the next item every few seconds.
                }
            }
        };

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
                {items.map((item, i) => (
                    <div key={i} className={mobileItemClassName}>
                        {renderItem(item, i)}
                    </div>
                ))}
            </div>

            {/* Desktop View - Grid */}
            <div className={desktopGridClassName}>
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        {renderItem(item, i)}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
