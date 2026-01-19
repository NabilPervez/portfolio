"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, BarChart3, Code, PenTool, Brain } from "lucide-react";

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
            {/* Card 1: The Linguist (Center) - Spans 2 columns on desktop for emphasis or just 1 depending on desired layout, but prompt implies 3 distinct cards.
         Let's try a layout where the Center one is actually in the middle visibly.
         Actually, standard Bento is often a grid. Let's make them equal or impactful.
         Prompt says: "Card 1: The Linguist (Center)", "Card 2: The Track Record (Right)", "Card 3: The Philosophy (Bottom)"
         This suggests a 2-row layout or a specific arrangement.
         Row 1: [Linguist] [Track Record]
         Row 2: [Philosophy (Full Width?)]
      */}

            {false && (
                <>
                    {/* Card 1: The Linguist */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 bg-gray-50 border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MessageSquare className="w-32 h-32 text-gold" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-gold border border-gray-100">
                                    <Code size={24} />
                                </div>
                                <h4 className="text-2xl font-display font-bold text-foreground mb-2">The Linguist</h4>
                                <p className="text-secondary text-lg leading-relaxed font-light">
                                    &quot;I speak fluent Engineer, Designer, and C-Suite. No meaning is lost in translation.&quot;
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: The Track Record */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-foreground text-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-center"
                    >
                        <div className="absolute -bottom-4 -right-4 p-4 opacity-20">
                            <BarChart3 className="w-40 h-40 text-background" />
                        </div>
                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-6xl md:text-7xl font-display font-bold text-gold mb-2">10+</h3>
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Years XP</p>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                Delivering for Paramount Pictures, LEGO, and RedBull. Big vision requires big execution.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: The Philosophy */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center justify-center text-center"
                    >
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <p className="text-2xl md:text-3xl font-display font-light">
                                <span className="font-bold text-gold text-nowrap">(Technical Complexity</span> × <span className="font-bold text-gold text-nowrap">Creative Vision)</span> + <span className="font-bold text-white text-nowrap">Tailored Communication</span> = <span className="underline decoration-gold/50 underline-offset-4 text-nowrap">Business Success</span>.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
