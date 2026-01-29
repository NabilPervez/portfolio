"use client";

import { motion } from 'framer-motion';
import HypeScene from '@/components/hype/HypeScene';
import Clock from '@/components/hype/Clock';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
    { name: 'OpTic Gaming', src: '/images/portfolio/optic-gaming.png' },
    { name: 'LEGO', src: '/images/portfolio/lego-27.jpg' },
    { name: 'The Story Mob', src: '/images/portfolio/the-story-mob.png' },
    { name: 'Nerd Street Gamers', src: '/images/portfolio/nerd-street-gamers-brand.jpg' },
    { name: 'Immortal Gates of Pyre', src: '/images/portfolio/immortal-gates-of-pyre-kickstarter.png' }
];

export default function HypePage() {
    return (
        <div className="relative min-h-[100vh]">
            {/* Fixed 3D Background - Visible only in the first section effectively due to others having black bg */}
            <HypeScene />

            {/* --- SECTION 1: HERO --- */}
            <section className="h-screen flex items-center justify-center relative z-10">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-center max-w-5xl px-4 text-white drop-shadow-2xl">
                    There are infinite possibilities
                </h1>
            </section>

            {/* --- SECTION 2: FULL WIDTH IMAGES --- */}
            <section className="bg-black relative z-20 py-20 flex flex-col gap-0">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-[70vh] group overflow-hidden border-b border-white/10"
                    >
                        <Image
                            src={project.src}
                            alt={project.name}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 easing-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-10 left-4 md:left-20 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter">
                                {project.name}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* --- SECTION 3: THE BRIDGE --- */}
            <section className="h-[80vh] flex items-center justify-center bg-black relative z-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 max-w-5xl px-6 leading-tight"
                >
                    I built these possibilities into these realities
                </motion.h2>
            </section>

            {/* --- SECTION 4: THE CLOCK / CLOSE --- */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-black relative z-20 pb-20">
                <div className="scale-75 md:scale-100 mb-12">
                    <Clock />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center z-10"
                >
                    <Link
                        href="/contact"
                        className="inline-block px-16 py-6 bg-white text-black text-2xl font-black tracking-widest rounded-full hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        CONTACT
                    </Link>
                </motion.div>
            </section>
        </div>
    );
    */
}
