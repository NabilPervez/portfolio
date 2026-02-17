
import { notFound } from "next/navigation";
import projectData from "../../data/projects.json";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const project = getProject(resolvedParams.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const title = `${project.title} | Portfolio`;
    const description = project.content?.scope?.replace(/<[^>]*>?/gm, '').substring(0, 160) || "Explore this project in detail.";

    return {
        title: project.title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `https://nabilpervez.com/portfolio/${project.slug}`,
            images: project.heroImage || project.image ? [{ url: project.heroImage || project.image }] : [],
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProject(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    // Get next project index for loop navigation
    const currentIndex = projectData.findIndex((p) => p.slug === resolvedParams.slug);
    const nextIndex = (currentIndex + 1) % projectData.length;
    const nextProject = projectData[nextIndex];

    return <ProjectDetail project={project} nextProject={{ slug: nextProject.slug, title: nextProject.title }} />;
}
