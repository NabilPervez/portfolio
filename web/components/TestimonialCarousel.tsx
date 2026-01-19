"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialsData from "../app/data/testimonials.json";

export function TestimonialCarousel() {
    return (
        <div className="w-full overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
            <div className="flex gap-6 w-max px-6 md:px-0">
                {testimonialsData.map((t) => (
                    <motion.div
                        key={t.id}
                        whileHover={{ y: -5, backgroundColor: "#FFF9EA" }}
                        className="snap-center bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all w-[300px] md:w-[400px] flex-shrink-0 flex flex-col justify-between"
                    >
                        <div>
                            <Quote className="w-8 h-8 text-gold mb-4 opacity-50" />
                            <p className="text-secondary text-base lg:text-lg italic leading-relaxed mb-6">
                                &quot;{t.quote}&quot;
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-foreground text-sm">{t.author}</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{t.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
