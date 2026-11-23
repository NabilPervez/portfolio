"use client";

// Homepage v2, Nabil 2026-11-22: story-first (Why → How → What).
// hero → why (the help-desk origin) → Zipline case → numbers → builder → career arc → AOE work → certs → voices → close.
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import MotionHero from "@/components/MotionHero";
import { LazyVideo } from "@/components/LazyVideo";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { caseStudies, cardVisual } from "@/lib/caseStudies";
import testimonials from "@/app/data/testimonials.json";
import products from "@/app/data/products.json";
import { wrap, section, eyebrow, lede, pillDark, pillLine, Head, Stat, Chip, certs, skillset, aoeStats, aoeWins } from "@/components/qp";

const flow = [
  { n: "01", t: "AI intake form", d: "Requesters describe the change in plain words. The form asks the follow-up questions a good producer would." },
  { n: "02", t: "Jira + Rovo AI", d: "Rovo turns the request into a complete, verbose ticket: page, component, copy, asset, CTA." },
  { n: "03", t: "Gradial", d: "Jira hands the ticket to Gradial. My skills and rules teach it to author the change correctly in AEM." },
  { n: "04", t: "Live in production", d: "Copy, CTAs, image swaps and experience fragments go live. A human checks; nobody retypes." },
];

const arc = [
  { y: "2011", t: "Help desk", d: "Fujitsu, then T-Mobile. Tier 1 to Functional Analyst." },
  { y: "2014", t: "Esports", d: "MutualMind, PVP Live, Infinite Esports. 3M+ monthly users." },
  { y: "2018", t: "Agency", d: "Co-founded AOE Creative. CTO and senior PM, $5M+ portfolio." },
  { y: "2024", t: "AI & IT", d: "Prospera Financial and NPC. RAG on Copilot, automation everywhere." },
  { y: "2025", t: "Back to T-Mobile", d: "Content producer and AI SME. Automating Zipline." },
];

const appPicks = ["kinkeep", "quran-reflections", "serenity-daily", "islamic-rag-quran-and-hadith", "babysync", "islamic-estate-calculator", "recurr", "lexilink"];
const quoteIds = [3, 5, 10];

export default function Home() {
  const apps = appPicks.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  const validProjects = caseStudies
    .filter((p) => p.thumb.src && !p.thumb.src.includes("default.jpg"))
    .map((p) => ({ slug: p.slug, title: p.title, ...cardVisual(p) }));
  const midPoint = Math.ceil(validProjects.length / 2);
  const projectRow1 = validProjects.slice(0, midPoint);
  const projectRow2 = validProjects.slice(midPoint);
  const quotes = quoteIds.map((id) => testimonials.find((t) => t.id === id)).filter(Boolean) as typeof testimonials;

  return (
    <div className="overflow-x-hidden">
      <MotionHero />

      {/* 1 · Why — the origin story */}
      <section className="py-[clamp(72px,14vh,160px)]">
        <div className={`${wrap} grid md:grid-cols-[7fr_5fr] gap-10 md:gap-16 items-center`}>
          <div className="min-w-0">
            <p className={eyebrow}>Why I do this</p>
            <p className="mt-6 text-[clamp(22px,2.4vw,32px)] leading-[1.3] font-semibold tracking-[-0.027em] text-foreground [text-wrap:balance]">
              I started on T-Mobile&apos;s help desk in 2012, fixing the same problems over and over.{" "}
              <span className="text-secondary">That&apos;s where I learned the rule I still work by: if a task repeats, it should be simple, and then it should run itself.</span>
            </p>
            <p className={`${lede} mt-8`}>
              Thirteen years, one agency and a lot of shipped products later, I came back to T-Mobile to do exactly that, with AI.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-[420px] md:justify-self-end rounded-2xl overflow-hidden border border-hair">
            <Image src="/images/nabil-headshot.jpg" alt="Nabil Pervez" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 2 · Zipline — the flagship story */}
      <section className={`${section} bg-g1/60`}>
        <div className={wrap}>
          <Head eb="Now · T-Mobile" title="I automated Zipline." rest="End to end, with AI.">
            Zipline is how T-Mobile ships fast, simple website updates: copy, CTAs, image swaps and experience fragments, straight to production in Adobe Experience Manager. I&apos;m its lead content author.
          </Head>

          <div className="grid md:grid-cols-3 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {[
              { k: "The reality", v: "Every request arrived half-written. Producers chased missing details, retyped tickets, then authored each change by hand in AEM. Small updates, big drag." },
              { k: "My move", v: "I rebuilt the pipe: an AI intake form, Jira with Rovo AI to write complete tickets, and Jira connected to Gradial, with the skills and rules that tell Gradial how to author each ticket correctly." },
              { k: "The payoff", v: "Zipline runs itself, from request to live page. And my feedback shaped Gradial's roadmap: real-time ticket feedback and a ticket-refinement chatbot." },
            ].map((b, i) => (
              <div key={b.k} className={`p-8 min-w-0 ${i === 2 ? "bg-g5 text-white" : "bg-white"}`}>
                <p className={`text-[13px] font-medium uppercase tracking-[.16em] ${i === 2 ? "text-gold" : "text-g4"}`}>{b.k}</p>
                <p className={`mt-4 text-[16px] leading-relaxed ${i === 2 ? "text-white/85" : "text-secondary"}`}>{b.v}</p>
              </div>
            ))}
          </div>

          {/* Flow */}
          <ol className="mt-12 grid md:grid-cols-4 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {flow.map((f) => (
              <li key={f.n} className="bg-white p-6 min-w-0">
                <p className="text-[13px] font-medium text-gold">{f.n}</p>
                <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-foreground">{f.t}</p>
                <p className="mt-2 text-[14px] text-secondary">{f.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[16px] text-secondary max-w-[60ch]">
            Think of it like a restaurant. Before, every order came in on a napkin. Now the order writes itself, goes straight to the kitchen, and the cook already knows the recipe.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            <Chip>AI SME, digital content org</Chip><Chip>Gradial Practitioner</Chip><Chip>12+ Gradial rules shipped</Chip><Chip>Adobe Experience Manager</Chip><Chip>Jira + Rovo</Chip>
          </div>
        </div>
      </section>

      {/* 3 · Numbers */}
      <section className={section}>
        <div className={wrap}>
          <Head title="By the numbers." rest="Ten-plus years of shipping." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            <Stat v="10+" l="Years in tech, product and marketing" />
            <Stat v="$5M+" l="Agency portfolio managed" />
            <Stat v="35+" l="Apps built and shipped" dark />
            <Stat v="100+" l="GitHub repositories" />
            <Stat v="90%" l="Client referral rate at AOE" />
            <Stat v="3×" l="Agency of the Year finalist" />
          </div>
        </div>
      </section>

      {/* 4 · Builder */}
      <section className={section}>
        <div className={wrap}>
          <Head eb="After hours" title="I build to think." rest="Then I ship it.">
            Most product managers write the spec. I also build the thing, with AI as my pair. Faith tools, fitness trackers, games, a RAG over the Quran and Hadith. Every one taught me something I bring to work.
          </Head>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {apps.map((a) => (
              <a key={a.id} href={a.url} target="_blank" className="group bg-white p-6 min-w-0 flex flex-col gap-3 hover:bg-g1 transition-colors">
                <span className="w-8 h-8 rounded-lg" style={{ background: a.bgColor }} aria-hidden />
                <p className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">{a.title}</p>
                <p className="text-[14px] text-secondary line-clamp-2">{a.description}</p>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            <Link href="/products" className={pillLine}>See all products <ArrowRight className="w-4 h-4" /></Link>
            <a href="https://github.com/NabilPervez" target="_blank" className={pillLine}>GitHub</a>
          </div>
        </div>
      </section>

      {/* 5 · Career arc */}
      <section className={section}>
        <div className={wrap}>
          <Head eb="The path" title="From help desk to AI." rest="Every stop added a language." >
            Support taught me users. Esports taught me audiences. The agency taught me teams and clients. AI ties them together.
          </Head>
          <ol className="grid md:grid-cols-5 border-t border-hair">
            {arc.map((a, i) => (
              <li key={a.y} className="py-6 md:pr-6 border-b md:border-b-0 border-hair min-w-0">
                <p className={`text-[13px] font-medium ${i === arc.length - 1 ? "text-g4" : "text-gold"}`}>{a.y}</p>
                <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-foreground">{a.t}</p>
                <p className="mt-1 text-[14px] text-secondary">{a.d}</p>
              </li>
            ))}
          </ol>
          <Link href="/about" className={`${pillLine} mt-10`}>Read the full story <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* 6a · AOE — the agency years (Nabil 2026-11-22: "these made careers") */}
      <section className="bg-midnight text-white pt-[clamp(72px,14vh,160px)] pb-12">
        <div className={wrap}>
          <p className="text-[13px] font-medium uppercase tracking-[.16em] text-gold">2018 – 2024 · AOE Creative</p>
          <h2 className="mt-4 text-[clamp(34px,4.4vw,62px)] leading-[1.05] font-semibold tracking-[-0.027em] max-w-[16ch] [text-wrap:balance]">
            We built the agency the biggest names in games called. <span className="text-white/55">I was its CTO.</span>
          </h2>
          <p className="mt-6 text-[18px] text-white/70 max-w-[52ch] [text-wrap:pretty]">
            I co-founded AOE Creative and grew it into a multi-million-dollar, award-winning agency. As CTO and senior product manager I ran product, tech and delivery for Riot Games, Activision Blizzard, LEGO, Coca-Cola, Red Bull, Paramount+ and the Call of Duty and Overwatch leagues. Work that launched careers, including a few of mine.
          </p>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {aoeStats.map((s) => (
              <div key={s.l} className="bg-midnight p-6 md:p-8 min-w-0">
                <p className="text-[32px] font-semibold tracking-[-0.027em] text-gold">{s.v}</p>
                <p className="mt-1 text-[14px] text-white/65">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6a+ · Highlight reel (Markel's site reel, self-hosted) */}
      <section className="bg-midnight pb-[clamp(72px,14vh,160px)]">
        <div className={wrap}>
          <p className="text-[13px] font-medium uppercase tracking-[.16em] text-gold mb-6">Highlight reel</p>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
            <LazyVideo src="/media/home-reel.mp4" poster="/media/home-reel-poster.webp" label="AOE Creative highlight reel" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 6b · AOE — headline wins */}
      <section className={section}>
        <div className={wrap}>
          <Head eb="Agency wins" title="Results people still talk about." rest="Eight of them.">
            Each one was a team effort I led from scope to launch: the strategy, the build and the people.
          </Head>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {aoeWins.map((w, i) => (
              <div key={w.c} className={`p-6 min-w-0 ${i === 0 ? "bg-g5 text-white" : "bg-white"}`}>
                <p className={`text-[13px] font-medium ${i === 0 ? "text-gold" : "text-g4"}`}>{w.c}</p>
                <p className={`mt-2 text-[18px] font-semibold tracking-[-0.02em] ${i === 0 ? "text-white" : "text-foreground"}`}>{w.t}</p>
                <p className={`mt-2 text-[14px] ${i === 0 ? "text-white/75" : "text-secondary"}`}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6c · View My Work (kept as-is, Nabil 2026-11-22) */}
      <section className="bg-background overflow-hidden py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col items-center text-center">
          <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4">Portfolio</span>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8">View My Work</h3>

          <Link href="/portfolio" className="inline-flex items-center gap-3 px-12 py-6 bg-foreground text-white rounded-full text-xl font-bold tracking-wide transition-all hover:bg-gold hover:text-white transform hover:scale-105 shadow-xl">
            See Full Portfolio <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Row 1 - Moving Left */}
        <div className="flex overflow-hidden mb-8">
          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 120, repeat: Infinity }}
          >
            {[...projectRow1, ...projectRow1].map((project, i) => (
              <Link href={`/portfolio/${project.slug}`} key={`p-row1-${i}`} aria-label={project.title} className="relative w-[320px] h-[200px] md:w-[560px] md:h-[350px] flex-shrink-0 bg-black rounded-sm overflow-hidden group shadow-sm">
                {project.video ? (
                  <LazyVideo src={project.video} poster={project.image} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <ImageWithFallback src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="font-display font-bold text-white text-lg md:text-2xl">{project.title}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 px-6"
            initial={{ x: "-50%" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 120, repeat: Infinity }}
          >
            {[...projectRow2, ...projectRow2].map((project, i) => (
              <Link href={`/portfolio/${project.slug}`} key={`p-row2-${i}`} aria-label={project.title} className="relative w-[320px] h-[200px] md:w-[560px] md:h-[350px] flex-shrink-0 bg-black rounded-sm overflow-hidden group shadow-sm">
                {project.video ? (
                  <LazyVideo src={project.video} poster={project.image} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <ImageWithFallback src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="font-display font-bold text-white text-lg md:text-2xl">{project.title}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7a · Skillset */}
      <section className={section}>
        <div className={wrap}>
          <Head eb="Skillset" title="What I bring." rest="Six disciplines, one person.">
            Most teams hire separately for product, AI, MarTech, brand, leadership and engineering. I&apos;ve done all six for real clients.
          </Head>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {skillset.map((g) => (
              <div key={g.k} className="bg-white p-6 md:p-8 min-w-0">
                <p className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">{g.k}</p>
                <div className="flex flex-wrap gap-2 mt-4">{g.v.map((x) => <Chip key={x}>{x}</Chip>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Certifications */}
      <section className={section}>
        <div className={wrap}>
          <Head title="Certified." rest="AI, AEM and delivery." />
          <div className="flex flex-wrap gap-2">{certs.map((c) => <Chip key={c}>{c}</Chip>)}</div>
        </div>
      </section>

      {/* 8 · Voices */}
      <section className={section}>
        <div className={wrap}>
          <Head title="In their words." rest="People I've worked with." />
          <div className="grid md:grid-cols-3 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
            {quotes.map((q) => (
              <figure key={q.id} className="bg-white p-8 flex flex-col justify-between gap-8 min-w-0">
                <blockquote className="text-[18px] leading-[1.5] text-foreground [text-wrap:pretty]">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption><p className="text-[14px] font-medium text-foreground">{q.author}</p><p className="text-[13px] text-secondary">{q.role}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · Close */}
      <section className="border-t border-hair">
        <div className={`${wrap} py-[clamp(72px,12vh,140px)] flex flex-col md:flex-row md:items-end justify-between gap-8`}>
          <h2 className="text-[clamp(28px,3.6vw,44px)] leading-[1.1] font-semibold tracking-[-0.027em] text-foreground max-w-[18ch] [text-wrap:balance]">
            Got a process that repeats? <span className="text-g4">Let&apos;s make it run itself.</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <a href="mailto:nabilpervezgg@gmail.com" className={pillDark}>Let&apos;s talk</a>
            <a href="https://nabilpervez.github.io/resume/" target="_blank" className={pillLine}>Resume</a>
          </div>
        </div>
      </section>
    </div>
  );
}
