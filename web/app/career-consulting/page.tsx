import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Career Strategy",
  description: "Resume strategy, LinkedIn and interview preparation for leaders going after the roles they deserve.",
  alternates: { canonical: "https://nabilpervez.com/career-consulting" },
  openGraph: { title: "Career Strategy | Nabil Pervez", url: "https://nabilpervez.com/career-consulting" },
};

export default function Page() {
  return (
    <ServicePage
      label="Career strategy" title="Get selected." muted="Not filtered out."
      lede="Resumes, profiles and interview prep that make your experience impossible to skip."
      sibling={{ href: "/personal-branding", label: "See personal branding" }}
      problemsTitle="Why great candidates get skipped." problemsLede="Hiring is a branding problem. Most resumes lose before a human reads them."
      problems={[
        { title: "The system screens you out.", text: "Applicant tracking software rejects strong resumes for the wrong format or missing keywords." },
        { title: "Duties, not results.", text: "A list of responsibilities tells recruiters what you were asked to do, not what you achieved." },
        { title: "One resume for every job.", text: "Generic applications blend in. Tailored ones get interviews." },
      ]}
      servicesLede="Everything you need to go from applicant to shortlist."
      services={[
        { title: "Resume strategy", text: "A results-first resume that passes the software and reads well to the person who decides.", items: ["ATS-ready format", "Impact bullets", "Tailoring guide"] },
        { title: "LinkedIn profile", text: "A profile recruiters find, read and message.", items: ["Headline & about", "Experience rewrite", "Keyword tuning"] },
        { title: "Career positioning", text: "A clear story about where you have been and where you are going next.", items: ["Target roles", "Pitch", "Narrative"] },
        { title: "Interview prep", text: "Practice sessions with honest feedback and stories that prove your value.", items: ["Mock interviews", "Story bank", "Feedback"] },
        { title: "Job search plan", text: "A focused weekly plan instead of applying to everything.", items: ["Target list", "Outreach scripts", "Tracker"] },
        { title: "Offer support", text: "Prepare for the negotiation so you start at the right level.", items: ["Market research", "Talking points", "Counteroffers"] },
      ]}
      proof="I've hired, managed and mentored creative and technical teams for over ten years." proofMuted="I know what makes a hiring manager say yes."
      faq={[
        { q: "Who do you work with?", a: "Mid-career professionals, managers and executives, especially in creative, marketing, product and tech roles." },
        { q: "How fast can you turn around a resume?", a: "Usually within one week of our first session, with one round of revisions included." },
      ]}
      closeLead="Go after the role" closeGold="you deserve." closeText="Book a 20-minute call and we'll plan your next move."
    />
  );
}
