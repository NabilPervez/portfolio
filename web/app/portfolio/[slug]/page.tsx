import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { bySlug, caseStudies } from "@/lib/caseStudies";
import { CaseStudy } from "@/components/case/CaseStudy";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return { title: "Project Not Found" };
  const description = (p.task || p.role || p.challenge.body).slice(0, 160);
  return pageMeta(`/portfolio/${p.slug}`, p.title, description, p.thumb.src);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = bySlug(slug);
  if (!p) notFound();
  const i = caseStudies.indexOf(p);
  const n = caseStudies[(i + 1) % caseStudies.length];
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, url: `https://nabilpervez.com/portfolio/${p.slug}`, description: p.task || p.challenge.body, creator: { "@type": "Person", name: "Nabil Pervez" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Portfolio", item: "https://nabilpervez.com/portfolio" },
      { "@type": "ListItem", position: 2, name: p.title, item: `https://nabilpervez.com/portfolio/${p.slug}` } ] },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy p={p} next={{ slug: n.slug, title: n.title }} />
    </>
  );
}
