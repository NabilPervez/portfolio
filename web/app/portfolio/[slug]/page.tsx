import { notFound } from "next/navigation";
import projectData from "../../data/projects.json";
import { ProjectDetail } from "@/components/ProjectDetail";

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

    // Get next project index for loop navigation
    const currentIndex = projectData.findIndex((p) => p.slug === resolvedParams.slug);
    const nextIndex = (currentIndex + 1) % projectData.length;
    const nextProject = projectData[nextIndex];

    return <ProjectDetail project={project} nextProject={{ slug: nextProject.slug, title: nextProject.title }} />;
}
