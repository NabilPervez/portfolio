// About: editorial view (AboutView), main's 2026-11-22 story.
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = pageMeta("/about", "About", "From T-Mobile’s help desk to agency CTO to AI SME: the story of a nerd translator who makes complex things simple.");

export default function AboutPage() {
  return <AboutView />;
}
