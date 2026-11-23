"use client";

// Speaking (editorial, 2026-11-23): same grammar as home/about.
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Download, Plus } from "lucide-react";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import "../home.css";

const EMAIL = "nabilpervezconsulting@gmail.com";

const topics = [
  { tag: "Strategy", t: "The Agile Creative", d: "Creatives hate process, but they need it to scale. How to use Scrum, built for software, to run design and marketing.", points: ["Run a creative sprint without killing inspiration", "A definition of done for ambiguous assets", "Case study: shipping 40 assets for LEGO in record time"] },
  { tag: "AI", t: "AI That People Actually Use", d: "Most AI rollouts stall after the demo. What it takes to get from pilot to a workflow that runs itself in a real enterprise.", points: ["Start with what repeats, not with the model", "Teaching AI tools your rules, not the other way round", "Case study: automating website updates end to end at T-Mobile"] },
  { tag: "Culture", t: "Decoding the Gamer Generation", d: "Gaming isn't a hobby; it's the dominant culture of the next generation. Lessons from the front lines of esports.", points: ["Authenticity is the only currency that matters", "Community as a moat", "How to speak internet without sounding like a bot"] },
  { tag: "Tech ops", t: "The CTO in the Marketing Department", d: "Marketing is now a technical discipline. If your marketing leader doesn't understand the stack, you're losing money.", points: ["Bridging IT and marketing", "Using automation to cut grunt work by 20%", "Building a MarTech stack that scales"] },
  { tag: "Branding", t: "Branding for a Digital Audience", d: "Digital-first branding isn't a logo; it's how you show up in the feed.", points: ["Visual identity systems for social", "Voice and tone that hold up", "Case study: Paramount Pictures"] },
  { tag: "Process", t: "The Creative Brief That Inspires", d: "The brief is the most important creative asset. How to write one that sets teams free instead of boxing them in.", points: ["The four parts every brief needs", "Killing ambiguity early", "Briefing for Gen Z campaigns"] },
];

const results = [
  { c: "Activision Blizzard", w: "Built a TikTok account from zero", m: "45M views in 4 months" },
  { c: "Houston Outlaws", w: "Award-winning campaign with pop-up shops", m: "10M+ impressions, 10K+ attendees" },
  { c: "Coca-Cola", w: "High-impact social ad campaign", m: "2.2M reach at half the industry cost" },
  { c: "Riot Games", w: "Interactive map of EMEA", m: "+40% user interaction" },
  { c: "World Series of Warzone", w: "Content production for the tournament", m: "+40% social impressions" },
  { c: "Boston Breach", w: "Go-to-market for a CDL team", m: "#1 most engaged team in the league" },
  { c: "Immortal: Gates of Pyre", w: "Kickstarter launch strategy", m: "5× the funding goal" },
  { c: "Paramount Pictures", w: "Branding for the mockumentary Players", m: "+25% trailer views" },
  { c: "AOE Creative", w: "Scaled an agency to a $5M+ portfolio", m: "90% client referral rate" },
];

const brands = ["Coca-Cola", "LEGO", "Paramount Pictures", "Red Bull", "Riot Games", "Activision Blizzard", "T-Mobile", "NACON", "The Kraft Group", "SypherPK"];

export default function SpeakerView() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  const [f, setF] = useState({ date: "", location: "", audience: "", budget: "", challenge: "" });
  useHomeMotion(root);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Speaker inquiry: ${f.date || "date TBD"}, ${f.location || "location TBD"}`;
    const body = `Event date: ${f.date}\nLocation: ${f.location}\nEst. audience size: ${f.audience}\nBudget: ${f.budget}\nBiggest challenge your audience faces: ${f.challenge}\n`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div ref={root} className="home">
      {/* ── Hero ── */}
      <section className="h-hero a-hero wrap" aria-labelledby="sp-h1">
        <div className="h-hero-copy">
          <p className="h-mono h-label">Speaking</p>
          <h1 id="sp-h1" className="h-display" data-lines>
            <span className="ln"><span className="li">Creativity</span></span>
            <span className="ln"><span className="li">needs a</span></span>
            <span className="ln"><span className="li a-gold">system.</span></span>
          </h1>
        </div>
        <figure className="h-portrait h-fade">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nabil-headshot.jpg" alt="Nabil Pervez" width={800} height={1000} fetchPriority="high" />
        </figure>
        <div className="h-hero-foot">
          <div className="h-fade">
            <p className="h-lede">
              Keynotes, panels and workshops on agile creativity, AI adoption, gamer culture and MarTech, from the person who ran the work for Riot Games, LEGO and Coca-Cola.
            </p>
            <div className="h-ctas">
              <a className="h-btn h-btn-ink" href="#book"><span className="dot"><ArrowRight size={16} /></span> Book Nabil</a>
              <a className="h-btn h-btn-line" href="/speaker-kit.zip"><span className="dot"><Download size={16} /></span> Speaker kit</a>
            </div>
          </div>
          <dl className="h-stats a-stats h-fade">
            <div><dt className="h-mono">Events</dt><dd className="h-display">100s</dd></div>
            <div><dt className="h-mono">Largest crowd</dt><dd className="h-display" data-count>70K</dd></div>
            <div><dt className="h-mono">Topics</dt><dd className="h-display" data-count>{topics.length}</dd></div>
          </dl>
        </div>
      </section>

      <div className="h-marquees" aria-hidden="true">
        <div className="mq mq-ink" data-marquee="-1"><ul>{[...brands, ...brands].map((s, i) => <li key={i}>{s}<b>✦</b></li>)}</ul></div>
      </div>

      {/* ── Bio ── */}
      <section className="h-sec wrap" aria-labelledby="bio-h">
        <p id="bio-h" className="h-mono h-label">On stage</p>
        <p className="h-words a-statement" data-words>
          Creativity without process is just chaos. I learned systems on the help desk, then spent six years as CTO of an esports agency building the engines behind the campaigns. Now I bring AI into the enterprise.
        </p>
        <p className="h-intro h-fade">I&rsquo;ve moderated, spoken, shoutcasted and hosted hundreds of events, for crowds of up to 70,000. Expect honesty, optimism and zero buzzwords.</p>
      </section>

      {/* ── Topics ── */}
      <section className="h-ink" aria-labelledby="topics-h">
        <div className="h-sec wrap">
          <header className="h-sec-head">
            <p className="h-mono h-label">Signature talks</p>
            <h2 id="topics-h" className="h-display h-h2" data-lines>Six talks. All tailored.</h2>
          </header>
          <div className="h-panels s-topics">
            {topics.map((t, i) => {
              const isOpen = open === i;
              return (
                <article key={t.t} className={`h-panel${isOpen ? " open" : ""}`}>
                  <button type="button" className="h-panel-btn a-job-btn" aria-expanded={isOpen} aria-controls={`tp-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="h-mono a-year">0{i + 1} · {t.tag}</span>
                    <span className="h-display h-panel-title a-job">{t.t}</span>
                    <span className="h-plus"><Plus size={20} /></span>
                  </button>
                  <div id={`tp-${i}`} className="h-panel-body" role="region">
                    <div className="h-panel-in a-job-in">
                      <div><p className="h-panel-text">{t.d}</p></div>
                      <ul className="a-points">{t.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="h-sec wrap" aria-labelledby="res-h">
        <header className="h-sec-head">
          <p className="h-mono h-label">Proven results</p>
          <h2 id="res-h" className="h-display h-h2" data-lines>The stories behind the talks.</h2>
        </header>
        <div className="h-voices h-wins">
          {results.map((r) => (
            <figure key={r.c} className="h-voice h-fade">
              <figcaption><span className="h-mono">{r.c}</span></figcaption>
              <blockquote><strong className="h-display h-win-t">{r.m}</strong><br />{r.w}</blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Book ── */}
      <section className="h-close" id="book" aria-labelledby="book-h">
        <div className="wrap">
          <p className="h-mono h-label">Book Nabil</p>
          <h2 id="book-h" className="h-display h-close-title" data-lines>
            <span className="ln"><span className="li">Tell me about</span></span>
            <span className="ln"><span className="li">your event.</span></span>
          </h2>
          <form className="s-form" onSubmit={send}>
            <label><span className="h-mono">Event date</span><input value={f.date} onChange={set("date")} placeholder="e.g. March 2027" /></label>
            <label><span className="h-mono">Location</span><input value={f.location} onChange={set("location")} placeholder="City or virtual" /></label>
            <label><span className="h-mono">Audience size</span><input value={f.audience} onChange={set("audience")} placeholder="e.g. 300" /></label>
            <label><span className="h-mono">Budget</span><input value={f.budget} onChange={set("budget")} placeholder="Range is fine" /></label>
            <label className="full"><span className="h-mono">Biggest challenge your audience faces</span><textarea rows={3} value={f.challenge} onChange={set("challenge")} /></label>
          </form>
          <div className="h-ctas">
            <button type="button" className="h-btn h-btn-ink" onClick={send}><span className="dot"><ArrowRight size={16} /></span> Send inquiry</button>
            <a className="h-btn h-btn-line" href="/speaker-kit.zip"><span className="dot"><ArrowUpRight size={16} /></span> Download speaker kit</a>
          </div>
        </div>
      </section>
    </div>
  );
}
