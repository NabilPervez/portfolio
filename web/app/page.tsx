"use client";

// Editorial home (Nabil 2026-11-23): miguelrecio.es layout grammar + GSAP, carrying the
// Nabil 2026-11-23: win interest first. Why → How → What, then proof (work, AOE, apps, voices). The journey lives on /about.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import testimonialsData from "./data/testimonials.json";
import products from "./data/products.json";
import { bySlug, cardVisual } from "@/lib/caseStudies";
import { skillset, aoeStats, aoeWins } from "@/components/qp";
import { LazyVideo } from "@/components/LazyVideo";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import "./home.css";

const CONTACT = "mailto:nabilpervezgg@gmail.com";
const RESUME = "https://nabilpervez.github.io/resume/";

const still = (slug: string) => {
  const c = bySlug(slug);
  return c ? { title: c.title, image: cardVisual(c).image } : { title: slug, image: "" };
};

// Work, ordered by client size (largest first). Three cards, then the list.
const featured = [
  { slug: "coca-cola", name: "Coca-Cola", kind: "Campaign", sector: "Gaming campaign" },
  { slug: "paramount-players", name: "Paramount", kind: "Campaign", sector: "Funny or Die · Players" },
  { slug: "redbull", name: "Red Bull", kind: "Experiential", sector: "Arcade activation" },
];
const list = [
  { slug: "lego_27", name: "LEGO", tag: "Brand", sector: "LEGO Games" },
  { slug: "call-of-duty-league", name: "Call of Duty League", tag: "Social", sector: "Activision Blizzard" },
  { slug: "overwatch-league", name: "Overwatch League", tag: "Campaign", sector: "Activision Blizzard" },
  { slug: "emea-championships", name: "Riot Games", tag: "Event", sector: "EMEA Championships" },
  { slug: "session", name: "NACON", tag: "Key art", sector: "Session: Skate Sim" },
  { slug: "one-piece-x-cloud9", name: "Cloud9 × One Piece", tag: "Brand collab", sector: "Esports × Anime" },
  { slug: "optic-gaming", name: "OpTic Gaming", tag: "Brand", sector: "Esports" },
  { slug: "evolution-championship-series", name: "EVO", tag: "Web", sector: "Fighting games" },
  { slug: "stay-plugged-in", name: "Stay Plugged In", tag: "Campaign", sector: "Brand" },
  { slug: "houston-outlaws", name: "Houston Outlaws", tag: "Award winner", sector: "Overwatch League" },
  { slug: "boston-breach", name: "Boston Breach", tag: "Brand", sector: "Call of Duty League" },
  { slug: "ellevens", name: "Ellevens", tag: "Brand", sector: "Esports" },
  { slug: "immortal-gates-of-pyre", name: "Immortal: Gates of Pyre", tag: "Product", sector: "Sunspear Games" },
];

const how = [
  { n: "01", t: "Find what repeats.", d: "I map the work before I touch it: where requests stall, where people retype, where handoffs break. The real problem is usually one layer below the one in the ticket.", proof: "Ticket time cut from 24h to 8h" },
  { n: "02", t: "Make it simple.", d: "One plan everyone can read. Short sprints, honest check-ins, and scope cut into moves a team can finish this week. Designers, engineers and execs all know what happens next.", proof: "95% milestone adherence, teams of 30" },
  { n: "03", t: "Make it run itself.", d: "Then I automate the boring parts with AI: intake, tickets, authoring, reporting. People get their time back for the work only they can do.", proof: "Request to live page, no retyping" },
];

const what: Record<string, string> = {
  "Product & delivery": "Roadmaps, scoping and go-live ownership. I take an idea to launch and keep it on time.",
  "AI & automation": "Practical AI adoption: workflows people actually use, built on the tools you already pay for.",
  "Content & MarTech": "AEM, Target and the content stack, set up so marketing can move without waiting on IT.",
  "Brand & marketing": "Brands, campaigns and go-to-market for audiences that can smell inauthentic from a mile away.",
  "Leadership": "Teams of designers, engineers and marketers who ship together, and get better while they do it.",
  "Build & IT": "I build the thing too: web apps, prototypes and automation, so ideas get tested in days, not quarters.",
};

const appPicks = ["halal-passport", "chess-roguelite", "iqra", "noor"];
const marqueeA = ["Product management", "Agile / Scrum", "AI workflow design", "Gradial", "Adobe Experience Manager", "Jira + Rovo", "RAG", "Go-to-market"];
const marqueeB = ["Riot Games", "Activision Blizzard", "LEGO", "Coca-Cola", "Red Bull", "Paramount+", "T-Mobile", "Call of Duty League"];
const clients = ["Coca-Cola", "Paramount+", "Red Bull", "LEGO", "Activision Blizzard", "Riot Games", "T-Mobile", "Call of Duty League", "Overwatch League", "NACON", "Cloud9", "OpTic Gaming", "EVO", "Houston Outlaws"];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  const [proof, setProof] = useState(0);
  const proofs = testimonialsData.slice(0, 3);
  const apps = appPicks.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  useHomeMotion(root);

  // Hero quote rotator with progress bars (pauses on hover)
  const paused = useRef(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => !paused.current && !document.hidden && setProof((i) => (i + 1) % proofs.length), 6500);
    return () => clearInterval(id);
  }, [proofs.length]);

  return (
    <div ref={root} className="home">
      {/* ── Hero ── */}
      <section className="h-hero wrap" aria-labelledby="h1">
        <div className="h-hero-copy">
          <h1 id="h1" className="h-display" data-lines>
            <span className="ln"><span className="li">I make</span></span>
            <span className="ln"><span className="li">complex</span></span>
            <span className="ln"><span className="li">things</span></span>
            <span className="ln"><span className="li a-gold">simple.</span></span>
          </h1>
          <p className="h-mono h-fade">■ Product manager · Scrum master · AI SME</p>
        </div>

        <figure className="h-portrait h-fade">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nabil-headshot.jpg" alt="Nabil Pervez" width={800} height={1000} fetchPriority="high" />
        </figure>

        <div className="h-hero-foot">
          <div className="h-fade">
            <p className="h-lede">
              Former CTO and co-founder of AOE Creative, a multi-million-dollar, award-winning agency trusted by Riot Games, Activision Blizzard, LEGO and Coca-Cola. Today I lead AI adoption at enterprise scale.
            </p>
            <div className="h-ctas">
              <a className="h-btn h-btn-ink" href={CONTACT}><span className="dot"><ArrowRight size={16} /></span> Let&rsquo;s talk</a>
              <Link className="h-btn h-btn-line" href="/portfolio"><span className="dot"><ArrowUpRight size={16} /></span> View portfolio</Link>
            </div>
          </div>

          <div className="h-proof h-fade" onPointerEnter={() => (paused.current = true)} onPointerLeave={() => (paused.current = false)}>
            {proofs.map((t, i) => (
              <figure key={t.id} className={i === proof ? "on" : ""} aria-hidden={i !== proof}>
                <blockquote>&ldquo;{t.quote.split(". ")[0].replace(/\.$/, "")}.&rdquo;</blockquote>
                <figcaption className="h-mono">{t.author} — {t.role}</figcaption>
              </figure>
            ))}
            <div className="pbar">
              {proofs.map((t, i) => (
                <button key={t.id} type="button" aria-label={`Show quote ${i + 1}`} className={i === proof ? "on" : ""} onClick={() => setProof(i)}><i /></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquees (speed + skew follow scroll velocity) ── */}
      <div className="h-marquees" aria-hidden="true">
        <div className="mq" data-marquee="-1"><ul>{[...marqueeA, ...marqueeA].map((s, i) => <li key={i}>{s}<b>✦</b></li>)}</ul></div>
        <div className="mq mq-ink" data-marquee="1"><ul>{[...marqueeB, ...marqueeB].map((s, i) => <li key={i}>{s}<b>✦</b></li>)}</ul></div>
      </div>

      {/* ── Why ── */}
      <section className="h-sec wrap h-why" aria-labelledby="why-h">
        <p id="why-h" className="h-mono h-label">01 · Why</p>
        <p className="h-words a-statement" data-words>
          Great ideas rarely die from a lack of talent. They die in the gaps: between design and engineering, between the brief and the build, between what the business wants and what actually ships.
        </p>
        <p className="h-intro h-fade">I&rsquo;ve spent fourteen years working in those gaps, for teams at Riot Games, Activision Blizzard, LEGO, Coca-Cola and T-Mobile. I speak every side&rsquo;s language, so the work keeps moving.</p>
      </section>

      {/* ── How (ink) ── */}
      <section className="h-ink" aria-labelledby="how-h">
        <div className="h-sec wrap">
          <header className="h-sec-head h-split">
            <div>
              <p className="h-mono h-label">02 · How</p>
              <h2 id="how-h" className="h-display h-h2" data-lines>Simple first. Then it runs itself.</h2>
            </div>
            <p className="h-intro h-fade">The same three moves, whether it&rsquo;s a game launch, a brand campaign or an enterprise AI rollout.</p>
          </header>
          <ol className="h-how">
            {how.map((s) => (
              <li key={s.n} className="h-fade">
                <span className="h-display">{s.n}</span>
                <h3 className="h-display">{s.t}</h3>
                <p>{s.d}</p>
                <span className="h-mono">{s.proof}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── What (accordion) ── */}
      <section className="h-sec wrap" id="skills" aria-labelledby="skills-h">
        <header className="h-sec-head h-split">
          <div>
            <p className="h-mono h-label">03 · What</p>
            <h2 id="skills-h" className="h-display h-h2" data-lines>What you get. Six disciplines, one person.</h2>
          </div>
          <p className="h-intro h-fade">Most teams hire separately for product, AI, MarTech, brand, leadership and engineering. I bring all six, so nothing gets lost in the handoff.</p>
        </header>
        <div className="h-panels h-panels-paper">
          {skillset.map((g, i) => {
            const isOpen = open === i;
            return (
              <article key={g.k} className={`h-panel${isOpen ? " open" : ""}`}>
                <button type="button" className="h-panel-btn" aria-expanded={isOpen} aria-controls={`sk-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="h-mono">0{i + 1}</span>
                  <span className="h-display h-panel-title">{g.k}</span>
                  <span className="h-plus"><Plus size={20} /></span>
                </button>
                <div id={`sk-${i}`} className="h-panel-body" role="region">
                  <div className="h-panel-in">
                    {what[g.k] && <p className="h-what-out">{what[g.k]}</p>}
                    <ul className="h-chips">{g.v.map((x) => <li key={x} className="h-mono">{x}</li>)}</ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Selected work ── */}
      <section className="h-sec wrap" id="work" aria-labelledby="work-h">
        <header className="h-sec-head">
          <p className="h-mono h-label">Selected work</p>
          <h2 id="work-h" className="h-display h-h2" data-lines>The biggest names in games called us.</h2>
          <p className="h-intro h-fade">Six years at AOE Creative as co-founder, CTO and senior product manager. Ordered by client, largest first.</p>
        </header>

        <div className="h-cards">
          {featured.map((f, i) => {
            const c = still(f.slug);
            return (
              <Link key={f.slug} href={`/portfolio/${f.slug}`} className="h-card h-fade">
                <div className="h-pix" data-reveal>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <span className="h-mono h-chip-abs">● {f.kind}</span>
                </div>
                <div className="h-card-meta">
                  <div>
                    <h3>{f.name}</h3>
                    <p className="h-mono">{f.sector} · 0{i + 1}</p>
                  </div>
                  <span className="h-arrow"><ArrowUpRight size={18} /></span>
                </div>
              </Link>
            );
          })}
        </div>

        <ul className="h-rows">
          {list.map((r) => {
            const c = still(r.slug);
            return (
              <li key={r.slug} className="h-row-li">
                <Link href={`/portfolio/${r.slug}`} className="h-row">
                  <span className="h-mono h-row-sector">{r.sector}</span>
                  <span className="h-row-title">{r.name}</span>
                  <span className="h-mono h-tag">{r.tag}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <span className="h-row-peek" aria-hidden="true"><img src={c.image} alt="" loading="lazy" /></span>
                  <ArrowRight className="h-row-arrow" size={22} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-center h-fade">
          <Link className="h-btn h-btn-ink" href="/portfolio"><span className="dot"><ArrowRight size={16} /></span> View all work</Link>
        </div>
      </section>

      {/* ── AOE (ink): stats, reel, wins ── */}
      <section className="h-ink" aria-labelledby="aoe-h">
        <div className="h-sec wrap">
          <header className="h-sec-head h-split">
            <div>
              <p className="h-mono h-label">2018 – 2024 · AOE Creative</p>
              <h2 id="aoe-h" className="h-display h-h2" data-lines>We built the agency. I was its CTO.</h2>
            </div>
            <p className="h-intro h-fade">I co-founded AOE Creative and grew it into a multi-million-dollar, award-winning agency, running product, tech and delivery for Riot Games, Activision Blizzard, LEGO, Coca-Cola, Red Bull, Paramount+ and the Call of Duty and Overwatch leagues.</p>
          </header>
          <dl className="h-aoe-stats">
            {aoeStats.map((s) => (
              <div key={s.l} className="h-fade"><dd className="h-display">{s.v}</dd><dt className="h-mono">{s.l}</dt></div>
            ))}
          </dl>
          <div className="h-reel h-fade">
            <LazyVideo src="/media/home-reel.mp4" poster="/media/home-reel-poster.webp" label="AOE Creative highlight reel" className="h-reel-v" />
          </div>
          <div className="h-voices h-wins">
            {aoeWins.map((w) => (
              <figure key={w.c} className="h-voice h-fade">
                <figcaption><span className="h-mono">{w.c}</span></figcaption>
                <blockquote><strong className="h-display h-win-t">{w.t}</strong><br />{w.d}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── After hours: apps ── */}
      <section className="h-sec wrap h-about" aria-labelledby="apps-h">
        <div>
          <p className="h-mono h-label">After hours</p>
          <h2 id="apps-h" className="h-display h-h2" data-lines>I build to think. Then I ship it.</h2>
          <p className="h-intro h-fade">Most product managers write the spec. I also build the thing, with AI as my pair: 35+ apps shipped and 100+ GitHub repos, from faith tools to games to a RAG over the Quran and Hadith.</p>
          <div className="h-ctas h-fade">
            <Link className="h-btn h-btn-ink" href="/products"><span className="dot"><ArrowRight size={16} /></span> See all products</Link>
            <a className="h-btn h-btn-line" href="https://github.com/NabilPervez" target="_blank" rel="noopener"><span className="dot"><ArrowUpRight size={16} /></span> GitHub</a>
          </div>
        </div>
        <ul className="h-apps">
          {apps.map((a) => (
            <li key={a.id} className="h-fade">
              <a href={a.url} target="_blank" rel="noopener">
                <span className="h-app-dot" style={{ background: a.bgColor }} aria-hidden="true" />
                <strong className="h-display">{a.title}</strong>
                <span>{a.description}</span>
                <ArrowUpRight className="h-row-arrow" size={18} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Voices ── */}
      <section className="h-sec wrap" aria-labelledby="voices-h">
        <header className="h-sec-head">
          <p className="h-mono h-label">In their words</p>
          <h2 id="voices-h" className="h-display h-h2" data-lines>People I&rsquo;ve worked with.</h2>
        </header>
        <div className="h-voices a-voices">
          {testimonialsData.slice(0, 6).map((t) => (
            <figure key={t.id} className="h-voice h-fade">
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption><strong>{t.author}</strong><span className="h-mono">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Logos ── */}
      <section className="h-logos wrap" aria-labelledby="logos-lb">
        <p id="logos-lb" className="h-mono h-label">Trusted by</p>
        <ul>{clients.map((c) => <li key={c} className="h-fade">{c}</li>)}</ul>
      </section>

      {/* ── Close band (gold) ── */}
      <section className="h-close" aria-labelledby="close-h">
        <div className="wrap">
          <p className="h-mono h-label">Got a process that repeats?</p>
          <h2 id="close-h" className="h-display h-close-title" data-lines>
            <span className="ln"><span className="li">Let&rsquo;s make it</span></span>
            <span className="ln"><span className="li">run itself.</span></span>
          </h2>
          <div className="h-ctas">
            <a className="h-btn h-btn-ink" href={CONTACT}><span className="dot"><ArrowRight size={16} /></span> Let&rsquo;s talk</a>
            <a className="h-btn h-btn-line" href={RESUME} target="_blank" rel="noopener"><span className="dot"><ArrowUpRight size={16} /></span> Resume</a>
          </div>
        </div>
      </section>

      <a className="h-float h-mono" href={CONTACT}>● Let&rsquo;s talk</a>
    </div>
  );
}
