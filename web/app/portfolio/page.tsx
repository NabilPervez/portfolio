"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import projectData from "../data/projects.json";
import { motion } from "framer-motion";

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
            className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-8"
        >
            <div className="w-full">
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
