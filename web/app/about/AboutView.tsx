"use client";

// About (editorial, 2026-11-23): main's six-chapter story in the home.css / useHomeMotion grammar.
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import testimonials from "@/app/data/testimonials.json";
import { certs, skillset, aoeStats, aoeWins } from "@/components/qp";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import "../home.css";

const CONTACT = "mailto:nabilpervezgg@gmail.com";
const RESUME = "https://nabilpervez.github.io/resume/";

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

const awards = [
  "Winner, Best Social Experience: Band Together (Houston Outlaws)",
  "Finalist, Esports Organization of the Year (OpTic Gaming / Houston Outlaws)",
  "3× Finalist, Best Esports Agency of the Year (AOE Creative)",
];

const education = ["Full Stack Web Development, NuCamp Coding Bootcamp", "Computer Science, University of Texas at Dallas", "A.S., Computer Science, Collin College"];
const quoteIds = [10, 3, 6, 5];

export default function AboutView() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(chapters.length - 1);
  const quotes = quoteIds.map((id) => testimonials.find((t) => t.id === id)).filter(Boolean) as typeof testimonials;
  const skillWords = skillset.flatMap((g) => g.v.slice(0, 3));
  useHomeMotion(root);

  return (
    <div ref={root} className="home">
      {/* ── Hero ── */}
      <section className="h-hero a-hero wrap" aria-labelledby="about-h1">
        <div className="h-hero-copy">
          <p className="h-mono h-label">About</p>
          <h1 id="about-h1" className="h-display" data-lines>
            <span className="ln"><span className="li">I&rsquo;m Nabil.</span></span>
            <span className="ln"><span className="li">Nerd</span></span>
            <span className="ln"><span className="li a-gold">translator.</span></span>
          </h1>
        </div>
        <figure className="h-portrait h-fade">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nabil-headshot.jpg" alt="Nabil Pervez" width={800} height={1000} fetchPriority="high" />
        </figure>
        <div className="h-hero-foot">
          <div className="h-fade">
            <p className="h-lede">
              Designers, engineers and the business all speak different languages. I speak all three, and I turn them into one plan people can ship. Lately, I turn that plan into automation, too.
            </p>
            <div className="h-ctas">
              <a className="h-btn h-btn-ink" href={CONTACT}><span className="dot"><ArrowRight size={16} /></span> Let&rsquo;s talk</a>
              <a className="h-btn h-btn-line" href={RESUME} target="_blank" rel="noopener"><span className="dot"><ArrowUpRight size={16} /></span> Resume</a>
            </div>
          </div>
          <dl className="h-stats a-stats h-fade">
            <div><dt className="h-mono">Years</dt><dd className="h-display" data-count="14">14+</dd></div>
            <div><dt className="h-mono">Team size led</dt><dd className="h-display" data-count="30">30</dd></div>
            <div><dt className="h-mono">Portfolio</dt><dd className="h-display">$5M+</dd></div>
          </dl>
        </div>
      </section>

      {/* ── Statement ── */}
      <section className="h-sec wrap">
        <p className="h-mono h-label">One thread</p>
        <p className="h-words a-statement" data-words>
          Every job taught me a new language: users, audiences, teams, machines. The thread is the same: find what repeats, make it simple, then make it run itself.
        </p>
      </section>

      {/* ── Chapters (ink accordion) ── */}
      <section className="h-ink" aria-labelledby="career-h">
        <div className="h-sec wrap">
          <header className="h-sec-head">
            <p className="h-mono h-label">The story</p>
            <h2 id="career-h" className="h-display h-h2" data-lines>Six chapters. One thread.</h2>
          </header>
          <div className="h-panels">
            {chapters.map((c, i) => {
              const isOpen = open === i;
              return (
                <article key={c.n} className={`h-panel${isOpen ? " open" : ""}`}>
                  <button type="button" className="h-panel-btn a-job-btn" aria-expanded={isOpen} aria-controls={`ch-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="h-mono a-year">{c.n} · {c.years}</span>
                    <span className="h-display h-panel-title a-job">{c.title}</span>
                    <span className="h-plus"><Plus size={20} /></span>
                  </button>
                  <div id={`ch-${i}`} className="h-panel-body" role="region">
                    <div className="h-panel-in a-job-in">
                      <div>
                        <p className="h-mono a-role">{c.org}</p>
                        <p className="h-panel-text">{c.story}</p>
                      </div>
                      <ul className="a-points">{c.wins.map((w) => <li key={w}>{w}</li>)}</ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AOE up close ── */}
      <section className="h-sec wrap" aria-labelledby="aoe-h">
        <header className="h-sec-head h-split">
          <div>
            <p className="h-mono h-label">Chapter 04, up close</p>
            <h2 id="aoe-h" className="h-display h-h2" data-lines>AOE Creative made my career.</h2>
          </div>
          <div className="h-fade">
            <p className="h-intro">We started AOE in 2018 with a simple idea: games and esports deserved an agency that actually understood them. Six years later we were working with Riot Games, Activision Blizzard, LEGO, Coca-Cola, Red Bull and Paramount+, and we were a three-time finalist for Best Esports Agency of the Year.</p>
            <p className="h-intro">As CTO and senior product manager, I owned how the work got made: websites, SaaS, mobile apps, AR/VR filters, campaigns and brands. I ran the sprints, standups and retros, managed 10 to 15 direct reports, and led teams of up to 30.</p>
            <p className="h-intro">The best part was the people. For a lot of our team, AOE meant their first credits on brands this big, and that&rsquo;s still the work I&rsquo;m proudest of.</p>
          </div>
        </header>
        <dl className="h-aoe-stats a-aoe-stats">
          {aoeStats.map((s) => (
            <div key={s.l} className="h-fade"><dd className="h-display">{s.v}</dd><dt className="h-mono">{s.l}</dt></div>
          ))}
        </dl>
        <div className="h-voices h-wins">
          {aoeWins.map((w) => (
            <figure key={w.c} className="h-voice h-fade">
              <figcaption><span className="h-mono">{w.c}</span></figcaption>
              <blockquote><strong className="h-display h-win-t">{w.t}</strong><br />{w.d}</blockquote>
            </figure>
          ))}
        </div>
        <div className="h-center h-fade">
          <Link className="h-btn h-btn-ink" href="/portfolio"><span className="dot"><ArrowRight size={16} /></span> See the case studies</Link>
        </div>
      </section>

      {/* ── How I work (ink) ── */}
      <section className="h-ink" aria-labelledby="principles-h">
        <div className="h-sec wrap">
          <header className="h-sec-head">
            <p className="h-mono h-label">How I work</p>
            <h2 id="principles-h" className="h-display h-h2" data-lines>Four rules. I don&rsquo;t bend them.</h2>
          </header>
          <div className="a-principles a-principles-4">
            {principles.map((p, i) => (
              <article key={p.t} className="a-principle h-fade">
                <span className="h-mono">0{i + 1}</span>
                <h3 className="h-display">{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skillset ── */}
      <div className="h-marquees" aria-hidden="true">
        <div className="mq" data-marquee="-1"><ul>{[...skillWords, ...skillWords].map((s, i) => <li key={i}>{s}<b>✦</b></li>)}</ul></div>
      </div>
      <section className="h-sec wrap" aria-labelledby="skills-h">
        <header className="h-sec-head">
          <p className="h-mono h-label">Skillset</p>
          <h2 id="skills-h" className="h-display h-h2" data-lines>Six disciplines, one person.</h2>
        </header>
        <div className="a-skills">
          {skillset.map((g) => (
            <div key={g.k} className="a-skill h-fade">
              <p className="h-display">{g.k}</p>
              <ul className="h-chips">{g.v.map((x) => <li key={x} className="h-mono">{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="h-ink" aria-labelledby="cred-h">
        <div className="h-sec wrap">
          <header className="h-sec-head">
            <p className="h-mono h-label">Credentials</p>
            <h2 id="cred-h" className="h-display h-h2" data-lines>Certified, awarded, schooled.</h2>
          </header>
          <div className="a-creds">
            {[{ k: "Certifications", items: certs }, { k: "Awards", items: awards }, { k: "Education", items: education }].map(({ k, items }) => (
              <div key={k} className="h-fade">
                <p className="h-mono h-label">{k}</p>
                <ul>{items.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voices ── */}
      <section className="h-sec wrap" aria-labelledby="voices-h">
        <header className="h-sec-head">
          <p className="h-mono h-label">In their words</p>
          <h2 id="voices-h" className="h-display h-h2" data-lines>Teammates and clients.</h2>
        </header>
        <div className="h-voices a-voices">
          {quotes.map((t) => (
            <figure key={t.id} className="h-voice h-fade">
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption><strong>{t.author}</strong><span className="h-mono">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Close ── */}
      <section className="h-close" aria-labelledby="close-h">
        <div className="wrap">
          <p className="h-mono h-label">That&rsquo;s my story</p>
          <h2 id="close-h" className="h-display h-close-title" data-lines>
            <span className="ln"><span className="li">What&rsquo;s</span></span>
            <span className="ln"><span className="li">yours?</span></span>
          </h2>
          <div className="h-ctas">
            <a className="h-btn h-btn-ink" href={CONTACT}><span className="dot"><ArrowRight size={16} /></span> Let&rsquo;s talk</a>
            <Link className="h-btn h-btn-line" href="/portfolio"><span className="dot"><ArrowUpRight size={16} /></span> See my work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
