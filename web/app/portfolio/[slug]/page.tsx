import { notFound } from "next/navigation";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import projectData from "../../data/projects.json";
import { FadeIn } from "@/components/FadeIn";

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
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground">{title}</h3>
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
        <FadeIn className="min-h-screen bg-background text-foreground">

            {/* Wrapper */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-24">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Sticky Sidebar (Project Info) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-auto lg:h-[calc(100vh-8rem)] flex flex-col z-20">
                        {/* Back Button */}
                        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-gold mb-12 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back into Grid
                        </Link>

                        {/* Glassy Background Panel for Sticky Content */}
                        <div className="bg-white/80 backdrop-blur-md border border-white/20 p-8 shadow-sm rounded-sm">
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-[1.1] mb-4">
                                    {project.title}
                                </h1>
                                <p className="text-lg text-gold font-medium uppercase tracking-widest">{category}</p>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-gray-100">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Scope</span>
                                    {isHtml(project.content.scope) ? (
                                        <div className="prose prose-sm text-base font-medium prose-ul:list-disc prose-ul:pl-4 prose-li:mb-1" dangerouslySetInnerHTML={{ __html: project.content.scope }} />
                                    ) : (
                                        <span className="text-base font-medium">{project.content.scope ? project.content.scope : "Strategy & Execution"}</span>
                                    )}
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Tags</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-midnight bg-gold/20 px-2 py-1 rounded-sm">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (Scrollable) */}
                    <div className="lg:col-span-8 space-y-24">
                        {/* Hero Image - No Filter */}
                        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden shadow-lg border border-black/5">
                            <ImageWithFallback
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Brief / Challenge */}
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-12">
                            {renderSection("The Challenge", project.content.challenge)}
                        </div>

                        {/* Solution / Outcome */}
                        <div className="grid grid-cols-1 gap-12">
                            {renderSection("The Solution", project.content.solution)}
                            {renderSection("The Outcome", project.content.outcome || "")}
                        </div>

                        {/* Gallery Section - MOVED TO BOTTOM */}
                        {project.images && project.images.length > 0 && (
                            <div className="space-y-8 pt-12 border-t border-gray-100">
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground">Visuals</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.images.map((img, idx) => (
                                        <div key={idx} className={`relative w-full bg-gray-100 overflow-hidden ${idx % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'}`}>
                                            <ImageWithFallback
                                                src={img}
                                                alt={`${project.title || 'Project'} - Image ${idx + 1}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Next Project Nav (Simplified) */}
                        <div className="border-t border-gray-200 pt-12 flex justify-end">
                            <Link href="/portfolio" className="text-2xl font-display font-bold hover:underline decoration-1 underline-offset-8">
                                Next Project &rarr;
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </FadeIn>
    );
}
