"use client";

import { motion } from "framer-motion";

interface ScrollingTextProps {
    text: string;
    direction?: "left" | "right";
    velocity?: number;
}

export function ScrollingText({ text, direction = "left", velocity = 5 }: ScrollingTextProps) {
    const movePercent = direction === "left" ? "-50%" : "50%";

    return (
        <div className="flex overflow-hidden whitespace-nowrap bg-black text-white py-4 md:py-8 border-y border-white/10">
            <motion.div
                className="flex gap-8 md:gap-16"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    ease: "linear",
                    duration: 20,
                    repeat: Infinity,
                }}
            >
                {/* Repeat text multiple times to ensure full coverage during scroll */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <h3 key={i} className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter opacity-100 flex items-center">
                        <em className="italic font-serif text-gold mr-4">{text}</em>
                        <span className="w-4 h-4 rounded-full bg-white/20 inline-block align-middle transform translate-y-2"></span>
                    </h3>
                ))}
            </motion.div>
        </div>
    );
}
