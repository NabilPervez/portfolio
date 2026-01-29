"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HypeScene from '@/components/hype/HypeScene';
import Clock from '@/components/hype/Clock';
import Link from 'next/link';
import Image from 'next/image';

const images = [
    '/images/portfolio/optic-gaming.png',
    '/images/portfolio/lego-27.jpg',
    '/images/portfolio/the-story-mob.png',
    '/images/portfolio/nerd-street-gamers-brand.jpg',
    '/images/portfolio/immortal-gates-of-pyre-kickstarter.png'
];

function FloatingImage({ src, index }: { src: string; index: number }) {
    const yOffset = index % 2 === 0 ? [100, -100] : [-100, 100];
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], yOffset.map(v => v * (index + 1) * 2));

    return (
        <motion.div
            style={{ y }}
            className={`absolute w-64 h-48 opacity-60 rounded-lg overflow-hidden border border-white/10
        ${index % 2 === 0 ? 'left-[10%]' : 'right-[10%]'}
      `}
            initial={{ top: `${20 + (index * 15)}%`, opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
        >
            <Image src={src} alt="Portfolio Work" fill className="object-cover" />
        </motion.div>
    );
}

export default function HypePage() {
    return (
        <div className="relative bg-black min-h-[400vh] text-white">
            {/* Fixed 3D Background */}
            <HypeScene />

            {/* --- SECTION 1: HERO --- */}
            <section className="h-screen flex items-center justify-center sticky top-0 -z-0">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-center max-w-4xl px-4 mix-blend-difference">
                    There is a whole world of possibilities.
                </h1>
            </section>

            {/* Spacer to allow scrolling "through" the hero before the next text hits */}
            <div className="h-[50vh]" />

            {/* --- SECTION 2: THE BUILDER --- */}
            <section className="relative h-[150vh] flex flex-col items-center justify-center z-10">
                <div className="sticky top-1/2 -translate-y-1/2 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-6xl font-light font-display text-gray-200"
                    >
                        I've built these worlds for others.
                    </motion.h2>
                </div>

                {/* Floating "Cubes"/Images Parallax Layer */}
                <div className="absolute inset-0 pointer-events-none">
                    {images.map((src, i) => (
                        <FloatingImage key={i} src={src} index={i} />
                    ))}
                </div>
            </section>

            {/* --- SECTION 3: THE RETURN --- */}
            <section className="h-screen flex items-center justify-center z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600"
                >
                    I can build your dreams into a reality.
                </motion.h2>
            </section>

            {/* --- SECTION 4: THE CLOSE --- */}
            <section className="h-screen flex flex-col items-center justify-center z-10 bg-black/80 backdrop-blur-sm">
                <h3 className="text-2xl font-light uppercase tracking-widest text-gray-400 mb-8">
                    Time is ticking
                </h3>

                <Clock />

                <div className="mt-12 text-center">
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-12">
                        What Are You Waiting For?
                    </h2>

                    <Link
                        href="/contact"
                        className="inline-block px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:scale-110 transition-transform duration-300"
                    >
                        CONTACT NOW
                    </Link>
                </div>
            </section>
        </div>
    );
}
