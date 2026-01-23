"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import projectData from "../data/projects.json";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import GridMotion from "@/components/GridMotion";

export default function PortfolioPage() {
    // Transform data to match component interface
    const projects = projectData.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.tags && p.tags.length > 0 ? p.tags[0] : "Development",
        tags: p.tags,
        image: p.image,
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background"
        >
            {/* GridMotion Hero */}
            <div className="w-full h-[60vh] md:h-[80vh] relative mb-24 overflow-hidden">
                <GridMotion items={projectData.map(p => p.heroImage || p.image).filter(Boolean)} gradientColor="black" />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-white text-center drop-shadow-2xl">
                        Portfolio
                    </h1>
                </div>
            </div>

            <div className="w-full px-4 md:px-8 pb-24 max-w-[1920px] mx-auto">

                {/* Header with Behance Button */}
                <div className="flex justify-between items-end mb-12 px-4 md:px-0">
                    <div>
                        <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-2">Projects</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Selected Work</h1>
                    </div>
                    <Link
                        href="https://www.behance.net/aoecreative"
                        target="_blank"
                        className="hidden md:inline-flex px-6 py-3 border border-black/10 rounded-full text-sm font-medium hover:bg-[#1769FF] hover:text-white hover:border-[#1769FF] transition-all items-center gap-2 group"
                    >
                        Behance Portfolio <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Behance Button (Visible only on mobile) */}
                <div className="md:hidden mb-8 px-4">
                    <Link
                        href="https://www.behance.net/aoecreative"
                        target="_blank"
                        className="flex w-full justify-center px-6 py-3 border border-black/10 rounded-full text-sm font-medium bg-[#1769FF] text-white transition-all items-center gap-2"
                    >
                        Behance Portfolio <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>

                {/* Grid - 2 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {projects.map((project) => (
                        <Link href={`/portfolio/${project.slug}`} key={project.slug} className="group block relative h-[50vh] min-h-[400px] overflow-hidden bg-gray-100 border border-gray-200 shadow-sm w-full">
                            <ImageWithFallback
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">{project.title}</h3>
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                    <div className="pt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {project.tags && project.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-wider rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-2 text-gold font-bold uppercase tracking-widest text-sm group-hover:hidden transition-opacity duration-300">
                                    {project.category}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Call to Action */}
                <div className="mt-32 pt-24 border-t border-gray-200 text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-semibold mb-8">
                        Have a project in mind?
                    </h2>
                    <a href="mailto:nabilpervezconsulting@gmail.com" className="inline-block px-10 py-5 bg-foreground text-white rounded-full text-lg tracking-wide hover:bg-gold hover:text-white transition-colors">
                        Let&apos;s Build Together
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
