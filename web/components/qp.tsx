// Quiet Precision building blocks for nabilpervez.com (Nabil, 2026-11-22).
// One font, closed scale (62/32/24/22/18/16/14/13), hairlines over boxes, green ramp + NPC gold.
import type { ReactNode } from "react";

export const wrap = "mx-auto max-w-[1200px] px-[clamp(16px,5vw,64px)]";
export const section = "py-[clamp(72px,14vh,160px)] border-t border-hair";
export const eyebrow = "text-[13px] font-medium uppercase tracking-[.16em] text-g4";
export const lede = "text-[18px] leading-[1.55] text-secondary max-w-[40ch] [text-wrap:pretty]";
export const pillDark = "inline-flex items-center gap-2 h-11 px-6 rounded-full bg-g4 text-white text-[14px] font-medium hover:bg-g5 transition-colors active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-g4";
export const pillLine = "inline-flex items-center gap-2 h-11 px-6 rounded-full border border-foreground text-foreground text-[14px] font-medium hover:bg-foreground hover:text-white transition-colors active:scale-[.97]";

export function Head({ eb, title, rest, children }: { eb?: string; title: string; rest?: string; children?: ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-end mb-10 md:mb-16 [&>*]:min-w-0">
      <div>
        {eb && <p className={`${eyebrow} mb-4`}>{eb}</p>}
        <h2 className="text-[24px] leading-[1.2] font-semibold tracking-[-0.027em] text-foreground [text-wrap:balance]">
          {title} {rest && <span className="text-secondary font-medium">{rest}</span>}
        </h2>
      </div>
      {children && <div className={lede}>{children}</div>}
    </div>
  );
}

export function Stat({ v, l, dark }: { v: string; l: string; dark?: boolean }) {
  return (
    <div className={`p-6 md:p-8 min-w-0 ${dark ? "bg-g5" : "bg-white"}`}>
      <p className={`text-[32px] font-semibold tracking-[-0.027em] ${dark ? "text-white" : "text-foreground"}`}>{v}</p>
      <p className={`mt-1 text-[14px] ${dark ? "text-white/70" : "text-secondary"}`}>{l}</p>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center h-8 px-4 rounded-full border border-g2 bg-white text-[13px] font-medium text-g5">{children}</span>;
}

export const certs = [
  "Gradial Practitioner",
  "Anthropic · AI Fluency: Framework & Foundations",
  "Anthropic · Teaching the AI Fluency Framework",
  "Adobe Experience Manager Foundations",
  "Adobe Target Foundations",
  "Scrum Master Certified",
  "Microsoft Azure Fundamentals (AZ-900)",
];

// Skillset (Nabil, 2026-11-22: add full skillset to home + about).
export const skillset = [
  { k: "Product & delivery", v: ["Product management", "Roadmaps", "Scoping & SOWs", "Go-live ownership", "UAT / QA", "Agile / Scrum", "Waterfall", "Risk management"] },
  { k: "AI & automation", v: ["AI workflow design", "Gradial", "Claude", "Jira Rovo", "Microsoft Copilot", "RAG architecture", "Prompt engineering", "AI-assisted coding", "n8n"] },
  { k: "Content & MarTech", v: ["Adobe Experience Manager", "AEM Assets (DAM)", "Adobe Target", "Experience fragments", "WordPress", "Google Ads", "SEO"] },
  { k: "Brand & marketing", v: ["Brand strategy", "Creative direction", "Go-to-market", "Campaigns", "Influencer marketing", "Community building"] },
  { k: "Leadership", v: ["Teams of up to 30", "Executive communication", "Client relationships", "Mentoring PMs", "Cross-functional alignment", "Enablement & training"] },
  { k: "Build & IT", v: ["React", "Next.js", "Python", "PowerShell", "GitHub", "Netlify", "Firebase", "Azure AD / Intune", "ITSM"] },
];

// AOE Creative: the career-making years.
export const aoeStats = [
  { v: "$5M+", l: "Client portfolio managed" },
  { v: "270M+", l: "Impressions for Call of Duty League" },
  { v: "45M+", l: "Views in 4 months on a new Activision Blizzard TikTok" },
  { v: "3×", l: "Best Esports Agency of the Year finalist" },
  { v: "30", l: "People led at peak" },
  { v: "90%", l: "Client referral rate" },
];

export const aoeWins = [
  { c: "Activision Blizzard", t: "Launched a TikTok from zero.", d: "45M+ views in its first four months, for one of the biggest publishers in the world." },
  { c: "Call of Duty League", t: "270M+ impressions.", d: "Season-long social and content for the official league." },
  { c: "Riot Games", t: "+30% fan engagement.", d: "Plus a 40% lift in user interaction and 25% more web traffic." },
  { c: "Coca-Cola", t: "2.2M+ reach at half the cost.", d: "A gaming campaign delivered at about half the industry-standard CPM." },
  { c: "Houston Outlaws", t: "Award winner.", d: "Band Together won Best Social Experience, with 10M+ impressions." },
  { c: "Immortal: Gates of Pyre", t: "$151K on Kickstarter.", d: "Brand, lore, UI and web for an indie RTS, end to end." },
  { c: "LEGO Games", t: "A new global identity.", d: "Brand work for a household name." },
  { c: "World Series of Warzone", t: "+40% social impressions.", d: "Event marketing for Activision's flagship Warzone tournament." },
];
