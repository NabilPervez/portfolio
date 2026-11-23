// About v2, Nabil 2026-11-22: the full story told in five chapters, then how I work, toolbox, credentials, voices.
import { BadgeCheck, Trophy, GraduationCap } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import testimonials from "@/app/data/testimonials.json";
import { wrap, section, eyebrow, lede, pillDark, pillLine, Head, Chip, certs, skillset, aoeStats, aoeWins } from "@/components/qp";

export const metadata = {
  title: "About",
  description: "From T-Mobile's help desk to agency CTO to AI SME: the story of a nerd translator who makes complex things simple.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Nabil Pervez", url: "https://nabilpervez.com/about" },
};

const AoeCrystal = dynamic(() => import("@/components/AoeCrystal"));

const chapters = [
  {
    n: "01", years: "2011 – 2014", title: "The help desk.", org: "Fujitsu · T-Mobile",
    story: "I started where every user problem lands first. At T-Mobile I was promoted from Tier 1 through Tier 3, then trainer, then Functional Analyst. I learned to listen, to write things down, and to hate fixing the same problem twice.",
    wins: ["Cut average ticket resolution from 24 hours to 8", "98% SLA compliance, 90% first-call resolution", "Training that shortened onboarding by 20%"],
  },
  {
    n: "02", years: "2014 – 2016", title: "The startup years.", org: "MutualMind",
    story: "At a startup there's no one to hand things to, so I learned to be self-sufficient: figure it out, own it, ship it. Wearing every hat turned my interest in technology into a love of building things myself.",
    wins: ["Wore every hat: support, ops and product", "Learned to own problems end to end", "Started building my own tools instead of waiting for them"],
  },
  {
    n: "03", years: "2016 – 2018", title: "The esports years.", org: "PVP Live · Infinite Esports",
    story: "I followed my love of games into esports, first in support, then in marketing and project management. This is where I learned audiences: what makes people show up, share and stay.",
    wins: ["Grew PVP Live to 3M+ monthly active users", "Award-winning Houston Outlaws campaign, 10M+ impressions", "Events of 10K+ attendees each"],
  },
  {
    n: "04", years: "2018 – 2024", title: "Building an award-winning agency.", org: "AOE Creative · Co-founder, CTO & Senior PM",
    story: "We co-founded AOE and grew it into a multi-million-dollar, award-winning agency. I ran product, tech and delivery: websites, SaaS, AR/VR filters, campaigns and brands for the biggest names in games.",
    wins: ["$5M+ portfolio for LEGO, Riot, Activision Blizzard, Coca-Cola, Red Bull", "Teams of up to 30, 95% milestone adherence", "90% referral rate, 3× Agency of the Year finalist"],
  },
  {
    n: "05", years: "2024 – 2025", title: "Going all in on AI.", org: "Prospera Financial · Nabil Pervez Consulting",
    story: "I saw where things were heading and got my hands dirty. I built a RAG system on Microsoft Copilot, automated PC builds end to end, and started consulting on AI strategy and MarTech for other businesses.",
    wins: ["RAG on Microsoft Copilot across company knowledge", "PC build time cut by 90% with PowerShell, Autopilot and Intune", "15% fewer security incidents"],
  },
  {
    n: "06", years: "2025 – now", title: "Back to T-Mobile.", org: "Content Producer · AI SME",
    story: "Thirteen years after the help desk, I came back to automate the repetitive work I used to fight. I'm the AI SME for our digital content org, a Gradial practitioner, and lead content author on Zipline, where I connected an AI intake form, Jira with Rovo, and Gradial so simple site updates run themselves in AEM.",
    wins: ["Zipline automated from request to live page", "12+ Gradial rules built and deployed", "Shaped Gradial's roadmap: real-time ticket feedback, ticket-refinement chatbot"],
  },
];

const principles = [
  { t: "People first.", d: "No manager wins alone. My results are tied to the people I work with, so I invest in them." },
  { t: "Short and honest.", d: "Weekly burn-downs, rapid scrums and real check-ins instead of long meetings." },
  { t: "Big picture, small steps.", d: "Hold the goal, cut the plan into moves people can finish this week." },
  { t: "Fill the gap.", d: "If something important has no owner, I'll own it, even when it's outside my lane." },
];

const _unusedToolbox = [
  { k: "AI & automation", v: ["Gradial", "Claude", "Jira Rovo", "Microsoft Copilot", "n8n", "RAG", "Prompt engineering", "AI-assisted coding"] },
  { k: "Content & MarTech", v: ["Adobe Experience Manager", "AEM Assets", "Adobe Target", "WordPress", "Google Ads"] },
  { k: "Build", v: ["React", "Next.js", "Python", "PowerShell", "GitHub", "Netlify", "Firebase"] },
  { k: "Delivery", v: ["Agile / Scrum", "Jira", "Confluence", "Smartsheet", "UAT / QA", "Roadmaps"] },
];

const awards = [
  "Winner, Best Social Experience: Band Together (Houston Outlaws)",
  "Finalist, Esports Organization of the Year (OpTic Gaming / Houston Outlaws)",
  "3× Finalist, Best Esports Agency of the Year (AOE Creative)",
];

const quoteIds = [10, 3, 6, 5];

export default function AboutPage() {
  const quotes = quoteIds.map((id) => testimonials.find((t) => t.id === id)).filter(Boolean) as typeof testimonials;
  return (
    <div className="overflow-x-hidden pt-[72px]">
      {/* Intro */}
      <section className="py-[clamp(64px,12vh,140px)]">
        <div className={`${wrap} grid md:grid-cols-[7fr_5fr] gap-10 md:gap-16 items-end`}>
          <div className="min-w-0">
            <p className={eyebrow}>About</p>
            <h1 className="mt-4 text-[clamp(34px,4.4vw,62px)] leading-[1.05] font-semibold tracking-[-0.027em] text-foreground [text-wrap:balance]">
              I&apos;m Nabil. <span className="text-secondary">I&apos;m a </span><span className="relative inline-block px-2 -mx-1 rounded-md bg-gold/25 text-g5 [box-decoration-break:clone]">nerd translator</span><span className="text-secondary">.</span>
            </h1>
            <p className={`${lede} mt-6`}>
              Designers, engineers and the business all speak different languages. I speak all three, and I turn them into one plan people can ship. Lately, I turn that plan into automation, too.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              <a href="mailto:nabilpervezgg@gmail.com" className={pillDark}>Let&apos;s talk</a>
              <a href="https://nabilpervez.github.io/resume/" target="_blank" className={pillLine}>Resume</a>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-[420px] md:justify-self-end rounded-2xl overflow-hidden border border-hair">
            <Image src="/images/nabil-headshot.jpg" alt="Nabil Pervez" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className={section}>
        <div className={wrap}>
          <Head eb="The story" title="Six chapters." rest="One thread.">
            Every job taught me a new language: users, audiences, teams, machines. The thread is the same: find what repeats, make it simple, then make it run itself.
          </Head>
          <div className="border-t border-hair">
            {chapters.map((c, i) => (
              <article key={c.n} className="group relative grid md:grid-cols-[1fr_2fr_1.4fr] gap-4 md:gap-10 py-12 px-4 -mx-4 rounded-2xl border-b border-hair [&>*]:min-w-0 transition-colors duration-300 hover:bg-g1/60">
                <div>
                  <p className="flex items-baseline gap-3">
                    <span className="text-[12px] font-medium uppercase tracking-[.18em] text-g4">Chapter</span>
                    <span className={`text-[56px] leading-none font-semibold tracking-[-0.04em] ${i === chapters.length - 1 ? "text-g4" : "text-gold"}`}>{c.n}</span>
                  </p>
                  <p className="mt-3 text-[13px] font-medium text-secondary">{c.years}</p>
                  <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.027em] text-foreground">{c.title}</h3>
                  <p className="mt-1 text-[14px] text-secondary">{c.org}</p>
                </div>
                <p className="text-[16px] leading-relaxed text-foreground/80 md:pt-2">{c.story}</p>
                <ul className="space-y-2 md:pt-2">
                  {c.wins.map((w) => (
                    <li key={w} className="text-[14px] text-secondary pl-4 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-g3">{w}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AOE deep dive (Nabil 2026-11-22) */}
      <section className="relative overflow-hidden bg-midnight text-white py-[clamp(72px,14vh,160px)]">
        <AoeCrystal className="pointer-events-none absolute -left-[25%] top-[10%] w-[90vw] h-[90vw] opacity-30 md:left-auto md:right-[30%] md:top-[-6%] md:w-[min(48vw,680px)] md:h-[min(48vw,680px)] md:opacity-50" />
        <div className={`${wrap} relative`}>
          <p className="text-[13px] font-medium uppercase tracking-[.16em] text-gold">Chapter 04, up close</p>
          <h2 className="mt-4 text-[clamp(28px,3.6vw,44px)] leading-[1.1] font-semibold tracking-[-0.027em] max-w-[20ch] [text-wrap:balance]">
            AOE Creative made my career. <span className="text-white/55">And a lot of other people&apos;s.</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-10 [&>*]:min-w-0">
            <div className="space-y-5 text-[16px] leading-relaxed text-white/75">
              <p>We started AOE in 2018 with a simple idea: games and esports deserved an agency that actually understood them. Six years later we were working with Riot Games, Activision Blizzard, LEGO, Coca-Cola, Red Bull and Paramount+, and we were a three-time finalist for Best Esports Agency of the Year.</p>
              <p>As CTO and senior product manager, I owned how the work got made: websites, SaaS, mobile apps, AR/VR filters, campaigns, brands and even apparel. I ran the sprints, the standups and the retros, managed 10 to 15 direct reports, and led teams of up to 30 across design, engineering and marketing.</p>
              <p>The best part was the people. For a lot of our team, AOE meant their first credits on brands this big. I mentored our project managers and made the team about 20% more efficient, and that&apos;s still the work I&apos;m proudest of.</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden h-fit">
              {aoeStats.map((s) => (
                <div key={s.l} className="bg-midnight/85 backdrop-blur-sm p-6 min-w-0 transition-colors duration-300 hover:bg-[#163a2d]">
                  <p className="text-[32px] font-semibold tracking-[-0.027em] text-gold">{s.v}</p>
                  <p className="mt-1 text-[14px] text-white/65">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={wrap}>
          <Head eb="Agency wins" title="The headlines." rest="What we delivered." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {aoeWins.map((w) => (
              <div key={w.c} className="bg-white p-6 min-w-0 transition-colors duration-300 hover:bg-g1">
                <p className="text-[13px] font-medium text-g4">{w.c}</p>
                <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-foreground">{w.t}</p>
                <p className="mt-2 text-[14px] text-secondary">{w.d}</p>
              </div>
            ))}
          </div>
          <Link href="/portfolio" className={`${pillLine} mt-10`}>See the case studies</Link>
        </div>
      </section>

      {/* How I work */}
      <section className={`${section} bg-g1/60`}>
        <div className={wrap}>
          <Head eb="How I work" title="Four rules." rest="I don't bend them." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {principles.map((p) => (
              <div key={p.t} className="bg-white p-8 min-w-0 transition-colors duration-300 hover:bg-g1">
                <p className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">{p.t}</p>
                <p className="mt-2 text-[14px] text-secondary">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbox */}
      <section className={section}>
        <div className={wrap}>
          <Head eb="Skillset" title="What I bring." rest="Six disciplines, one person." />
          <div className="border-t border-hair">
            {skillset.map((t) => (
              <div key={t.k} className="grid md:grid-cols-[1fr_3fr] gap-3 md:gap-10 py-6 px-3 -mx-3 rounded-xl border-b border-hair [&>*]:min-w-0 transition-colors duration-300 hover:bg-g1">
                <p className="text-[14px] font-medium text-foreground">{t.k}</p>
                <div className="flex flex-wrap gap-2">{t.v.map((x) => <Chip key={x}>{x}</Chip>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials (Nabil 2026-11-23: promo cards, icon left, text right) */}
      <section className={section}>
        <div className={`${wrap} grid md:grid-cols-3 gap-10 [&>*]:min-w-0`}>
          {[
            { k: "Certifications", Icon: BadgeCheck, items: certs },
            { k: "Awards", Icon: Trophy, items: awards },
            { k: "Education", Icon: GraduationCap, items: ["Full Stack Web Development, NuCamp Coding Bootcamp", "Computer Science, University of Texas at Dallas", "A.S., Computer Science, Collin College"] },
          ].map(({ k, Icon, items }) => (
            <div key={k}>
              <p className={eyebrow}>{k}</p>
              <ul className="mt-4 space-y-3">
                {items.map((c) => (
                  <li key={c} className="flex items-center gap-4 p-4 rounded-xl border border-hair bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-g3 hover:bg-g1">
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-g1 text-g4 grid place-items-center"><Icon className="w-5 h-5" /></span>
                    <span className="text-[14px] leading-snug text-foreground/85">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Voices */}
      <section className={section}>
        <div className={wrap}>
          <Head title="In their words." rest="Teammates and clients." />
          <div className="grid md:grid-cols-2 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {quotes.map((q) => (
              <figure key={q.id} className="bg-white p-8 flex flex-col justify-between gap-8 min-w-0 transition-colors duration-300 hover:bg-g1">
                <blockquote className="text-[18px] leading-[1.5] text-foreground [text-wrap:pretty]">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption><p className="text-[14px] font-medium text-foreground">{q.author}</p><p className="text-[13px] text-secondary">{q.role}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-hair">
        <div className={`${wrap} py-[clamp(72px,12vh,140px)] flex flex-col md:flex-row md:items-end justify-between gap-8`}>
          <h2 className="text-[clamp(28px,3.6vw,44px)] leading-[1.1] font-semibold tracking-[-0.027em] text-foreground max-w-[18ch] [text-wrap:balance]">
            That&apos;s my story. <span className="text-g4">What&apos;s yours?</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <a href="mailto:nabilpervezgg@gmail.com" className={pillDark}>Let&apos;s talk</a>
            <Link href="/portfolio" className={pillLine}>See my work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
