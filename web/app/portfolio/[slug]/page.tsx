"use client";
import { notFound } from "next/navigation";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import projectData from "../../data/projects.json";
import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";

// Force static generation for these paths
export async function generateStaticParams() {
    return projectData.map((project) => ({
        slug: project.slug,
    }));
}

// Data fetching helper
function getProject(slug: string) {
    return projectData.find((p) => p.slug === slug);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProject(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    // Helper to check if string contains HTML
    const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

    // Split content into paragraphs for better visual rhythm or render HTML
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
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[1] mb-6 max-w-4xl">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Wrapper */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">

                {/* Project Meta Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 border-b border-gray-200 pb-16">
                    {/* Tags */}
                    <div className="md:col-span-4">
                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-4">Role / Services</span>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium uppercase tracking-wider text-secondary border border-gray-200 px-3 py-1.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Scope */}
                    <div className="md:col-span-8">
                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-4">The Scope</span>
                        <div className="text-lg md:text-xl font-light leading-relaxed text-secondary">
                            {isHtml(project.content.scope) ? (
                                <div dangerouslySetInnerHTML={{ __html: project.content.scope }} />
                            ) : (
                                <p>{project.content.scope || "Strategy & Execution"}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Narrative Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 lg:col-start-3">
                        {renderSection("The Challenge", project.content.challenge)}
                        {renderSection("The Solution", project.content.solution)}
                        {renderSection("The Outcome", project.content.outcome || "")}
                    </div>
                </div>

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
                            <div key={idx} className="relative flex-none w-[85vw] md:w-[60vw] aspect-video bg-white shadow-xl rounded-sm overflow-hidden snap-center border border-gray-200">
                                <ImageWithFallback
                                    src={img}
                                    alt={`${project.title} - Visual ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Next Project Nav */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 flex justify-end">
                <Link href="/portfolio" className="group inline-flex items-center gap-4 text-3xl md:text-5xl font-display font-bold text-gray-300 hover:text-foreground transition-colors">
                    Next Project <ArrowLeft className="w-8 h-8 rotate-180 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

        </FadeIn>
    );
}
