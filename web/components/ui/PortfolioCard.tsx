"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    slug: string;
    tags: string[];
    image: string;
}

interface PortfolioCardProps {
    project: Project;
    className?: string;
    priority?: boolean;
}

export function PortfolioCard({ project, className, priority = false }: PortfolioCardProps) {
    return (
        <Link href={`/portfolio/${project.slug}`} className={cn("block group relative", className)}>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full flex flex-col"
            >
                {/* Card Frame - Glassmorphism */}
                <div className="relative overflow-hidden rounded-sm border border-gold/20 bg-white/[0.03] backdrop-blur-sm transition-colors duration-500 group-hover:border-gold/50 group-hover:bg-white/[0.05]">

                    {/* Image Container (16:9) */}
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={priority}
                        />

                        {/* Overlay Gradient (Always visible on mobile, hover on desktop) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Hover Content (Desktop) / Always Visible (Mobile) */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                            <span className="inline-flex items-center gap-2 text-gold font-medium text-sm tracking-widest uppercase mb-2">
                                View Case Study <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>

                    {/* Card Meta Content (Below Image) */}
                    <div className="p-5 border-t border-white/5 bg-midnight/40">
                        <h3 className="text-xl text-white font-serif tracking-tight mb-3 group-hover:text-gold transition-colors duration-300">
                            {project.title}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 text-slate-400 bg-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
