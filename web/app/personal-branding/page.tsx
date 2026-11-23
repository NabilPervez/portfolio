import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Personal Branding",
  description: "A personal brand that opens doors: profile, site, voice and content for founders, executives and creators.",
  alternates: { canonical: "https://nabilpervez.com/personal-branding" },
  openGraph: { title: "Personal Branding | Nabil Pervez", url: "https://nabilpervez.com/personal-branding" },
};

export default function Page() {
  return (
    <ServicePage
      label="Personal branding" title="Be the name." muted="People already ask for."
      lede="Your profile, your site and your voice, shaped into one clear story about the work you do best."
      sibling={{ href: "/career-consulting", label: "See career strategy" }}
      problemsTitle="Why good people stay unknown." problemsLede="Talent doesn't speak for itself. Your brand does it for you."
      problems={[
        { title: "Your profile undersells you.", text: "Ten years of results reduced to a job title and a stock headshot." },
        { title: "You post, but nothing sticks.", text: "Without a clear point of view, content becomes noise and the algorithm moves on." },
        { title: "There's nowhere to send people.", text: "When someone searches your name, they should land on something you control." },
      ]}
      servicesLede="A brand built around you, then the tools to keep it going."
      services={[
        { title: "Positioning", text: "What you're known for, who it's for and the one line you'll repeat everywhere.", items: ["Story workshop", "Signature line", "Topics you own"] },
        { title: "Profile overhaul", text: "LinkedIn and bios rewritten and redesigned so the right people stop scrolling.", items: ["Headline & about", "Banner & photo direction", "Featured section"] },
        { title: "Personal site", text: "A fast, simple home for your work that you own outright.", items: ["One-page site", "Domain & hosting", "Contact & booking"] },
        { title: "Visual identity", text: "A mark, colours and templates so everything you publish looks like you.", items: ["Monogram", "Colour & type", "Post templates"] },
        { title: "Content system", text: "A repeatable way to turn what you already know into posts, talks and articles.", items: ["Content pillars", "Calendar", "AI-assisted drafts"] },
        { title: "Speaking kit", text: "A one-sheet, headshots and talk outlines for panels, podcasts and conferences.", items: ["Speaker one-sheet", "Talk outlines", "Media bio"] },
      ]}
      proof="I built my own name speaking, leading teams and co-founding an award-winning agency." proofMuted="I'll help you build yours the same way."
      faq={[
        { q: "Who is this for?", a: "Founders, executives, consultants and creators who are good at what they do and want more of the right people to know it." },
        { q: "Do you write my posts for me?", a: "I set up the system and draft the first month with you. After that you can run it yourself or keep me on a retainer." },
      ]}
      closeLead="Make your name" closeGold="work for you." closeText="Book a 20-minute call and we'll find the story worth telling."
    />
  );
}
