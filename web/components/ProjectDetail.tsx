"use client";

import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectDetailProps {
    project: {
        title: string;
        slug: string;
        tags: string[];
        image: string;
        content: {
            scope: string;
            challenge: string;
            solution: string;
            outcome?: string;
        };
        images?: string[];
        behanceId?: string;
    };
    nextProject?: {
        slug: string;
        title: string;
    };
}

export function ProjectDetail({ project, nextProject }: ProjectDetailProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Helper to determine if a string contains HTML
    const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

    // Helper to render a section
    const renderSection = (title: string, content: string) => {
        if (!content) return null;
        return (
            <div className="mb-16">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground text-opacity-40">{title}</h3>
                {isHtml(content) ? (
                    <div className="prose prose-lg prose-neutral max-w-none text-secondary font-light leading-relaxed dangerously-scope" dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <div className="prose prose-lg prose-neutral max-w-none text-secondary font-light leading-relaxed">
                        {content.split('\n').map((line, i) => (
                            <p key={i} className="mb-4">{line}</p>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const category = project.tags && project.tags.length > 0 ? project.tags[0] : "Project";

    return (
        <FadeIn className="min-h-screen bg-background text-foreground pb-24">

            {/* Top Navigation Back Button */}
            <div className="absolute top-24 left-6 md:left-12 z-50">
                <Link href="/portfolio" className="inline-flex items-center gap-2 p-3 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:bg-black hover:text-white transition-all group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Hero Section - Full Width Image */}
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-100 overflow-hidden">
                <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                {/* Hero Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-gold font-bold uppercase tracking-widest mb-4 text-sm md:text-base">{category}</p>
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1] mb-6 max-w-4xl drop-shadow-lg">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Wrapper */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">

                {/* Project Meta Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 pb-12">
                    {/* Tags - Left Side (1/3) */}
                    <div className="md:col-span-4">
                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-4">Role / Services</span>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium uppercase tracking-wider text-secondary border border-gray-200 px-3 py-1.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Narrative Content - Centered */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 lg:col-start-3">
                        {/* Scope moved here to center */}
                        <div className="mb-16">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground text-opacity-40">The Scope</h3>
                            <div className="prose prose-lg prose-neutral max-w-none text-secondary font-light leading-relaxed">
                                {isHtml(project.content.scope) ? (
                                    <div dangerouslySetInnerHTML={{ __html: project.content.scope }} />
                                ) : (
                                    <p>{project.content.scope || "Strategy & Execution"}</p>
                                )}
                            </div>
                        </div>

                        {renderSection("The Challenge", project.content.challenge)}
                        {renderSection("The Solution", project.content.solution)}
                        {renderSection("The Outcome", project.content.outcome || "")}
                    </div>
                </div>

                {/* Behance Embed - Moved below narrative or keep at top? 
                   Previous design had it in the meta grid. 
                   If I move Scope down, the meta grid is just tags. 
                   Let's place Behance embed at the bottom of the narrative or in a separate full-width block. 
                   Actually, line 125 had it in the meta grid row. 
                   I'll keep it there or properly separate it. 
                   Let's put it AFTER the narrative content for better flow if it's large.
                   Or keep it in the top grid (col-span-12) if it's meant to be a showcase.
                   I will keep it in a separate full-width block between Meta and Narrative or after Narrative.
                   Let's place it *after* the narrative for now as it's usually long visual content.
                */}

                {/* Behance Embed */}
                {project.behanceId && (
                    <div className="w-full mb-24 flex justify-center">
                        <iframe
                            src={`https://www.behance.net/embed/project/${project.behanceId}?ilo0=1`}
                            height="100%"
                            width="100%"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                            allow="clipboard-write"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full min-h-[1200px] border border-gray-200 rounded-sm shadow-sm"
                        ></iframe>
                    </div>
                )}

            </div>

            {/* Horizontal Scroll Gallery */}
            {project.images && project.images.length > 0 && (
                <div className="mt-24 py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
                    <div className="px-6 md:px-12 mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Project Visuals</h3>
                    </div>

                    {/* Carousel Container */}
                    <div className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 scrollbar-hide snap-x snap-mandatory">
                        {project.images.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative flex-none w-[85vw] md:w-[60vw] aspect-video bg-white shadow-xl rounded-sm overflow-hidden snap-center border border-gray-200 cursor-zoom-in"
                                onClick={() => setSelectedImage(img)}
                            >
                                <ImageWithFallback
                                    src={img}
                                    alt={`${project.title} - Visual ${idx + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full max-w-7xl h-auto max-h-[90vh] aspect-video">
                        <ImageWithFallback
                            src={selectedImage}
                            alt="Project Detail View"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <button className="absolute top-8 right-8 text-white hover:text-gold transition-colors">
                        <X className="w-8 h-8" />
                    </button>
                </div>
            )}

            {/* Next Project Nav */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 flex justify-end">
                {nextProject ? (
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Next Case Study</p>
                        <Link href={`/portfolio/${nextProject.slug}`} className="group inline-flex items-center gap-4 text-3xl md:text-5xl font-display font-bold text-foreground hover:text-gold transition-colors">
                            {nextProject.title} <ArrowLeft className="w-8 h-8 rotate-180 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <Link href="/portfolio" className="group inline-flex items-center gap-4 text-3xl md:text-5xl font-display font-bold text-gray-300 hover:text-foreground transition-colors">
                        All Projects <ArrowLeft className="w-8 h-8 rotate-180 group-hover:translate-x-2 transition-transform" />
                    </Link>
                )}
            </div>

        </FadeIn>
    );
}
