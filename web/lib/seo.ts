import type { Metadata } from "next";

// Next.js replaces (not merges) openGraph/twitter from the root layout when a page sets them,
// so every page builds its social tags through this helper to keep the 1200x630 share image.
export const SITE_URL = "https://nabilpervez.com";
export const OG_IMAGE = { url: `${SITE_URL}/images/og.jpg`, width: 1200, height: 630, alt: "Nabil Pervez, Product Manager, Scrum Master & AI SME" };

export function pageMeta(path: string, title: string, description: string, image?: string): Metadata {
  const url = `${SITE_URL}${path}`;
  const full = `${title} | Nabil Pervez`;
  const images = image ? [{ url: image }] : [OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Nabil Pervez", locale: "en_US", url, title: full, description, images },
    twitter: { card: "summary_large_image", title: full, description, images: images.map((i) => i.url) },
  };
}
