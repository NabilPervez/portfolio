"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
    slug: string;
    title: string;
    category: string;
    image: string;
    year?: string;
    client?: string;
}

interface MasonryGridProps {
    projects: Project[];
}

export function MasonryGrid({ projects }: MasonryGridProps) {
    // Simple column distribution logic
    // We'll distribute projects into 2 columns for desktop, 1 for mobile
    // For a more robust solution we could use a library, but this keeps it lightweight

    const [columns, setColumns] = useState<Project[][]>([[], []]);

    useEffect(() => {
        const cols: Project[][] = [[], []];
        projects.forEach((project, i) => {
            // Alternate between columns
            const colIndex = i % 2;
            cols[colIndex].push(project);
        });
        setColumns(cols);
    }, [projects]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {columns.map((col, colIndex) => (
                <div key={colIndex} className={`flex flex-col gap-12 ${colIndex === 1 ? 'md:mt-24' : ''}`}>
                    {col.map((project, idx) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group"
                        >
                            <Link href={`/portfolio/${project.slug}`} className="block">
                                <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />

                                    {/* Hover Overlay Icon */}
                                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white p-3 rounded-full shadow-lg">
                                            <ArrowUpRight className="w-5 h-5 text-black" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start border-t border-gray-200 pt-4">
                                    <div>
                                        <h3 className="text-2xl font-display font-medium text-foreground mb-1 group-hover:underline decoration-1 underline-offset-4 decoration-gray-400">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-secondary uppercase tracking-widest">{project.category}</p>
                                    </div>
                                    <span className="text-sm text-gray-400 font-mono hidden md:block">{project.year || '2023'}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ))}
        </div>
    );
}
