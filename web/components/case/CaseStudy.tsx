import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudy as CS, Img } from "@/lib/caseStudies";
import { CaseImage } from "./CaseImage";
import { MediaItem } from "./MediaItem";
import { Reveal } from "./Reveal";

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-12";

function Heading({ lines }: { lines: string[] }) {
  return (
    <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-6xl">
      {lines.map((l, i) => (
        <span key={i} className={`block ${i === lines.length - 1 ? "text-gold" : ""}`}>{l}</span>
      ))}
    </h2>
  );
}

function Chapter({ n, label, heading, children }: { n: string; label: string; heading: string[]; children: ReactNode }) {
  return (
    <div className={`${wrap} reveal grid gap-6 md:grid-cols-12 md:gap-10`}>
      <div className="md:col-span-5">
        <p className="eyebrow">{n} // {label}</p>
        <div className="mt-4"><Heading lines={heading} /></div>
      </div>
      <div className="md:col-span-6 md:col-start-7 md:pt-9">{children}</div>
    </div>
  );
}

const Bleed = ({ image }: { image?: Img | null }) =>
  image ? <div className="reveal mt-14 md:mt-20"><CaseImage img={image} className="h-auto max-h-[90vh] w-full object-cover" /></div> : null;

function Gallery({ images }: { images: Img[] }) {
  if (!images.length) return null;
  const cols = images.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <ul className={`${wrap} mt-14 grid grid-cols-2 gap-4 md:mt-20 md:gap-6 ${cols}`}>
      {images.map((img) => (
        <li key={img.src} className="reveal"><CaseImage img={img} sizes="(min-width: 768px) 33vw, 50vw" /></li>
      ))}
    </ul>
  );
}

const List = ({ items, big }: { items: string[]; big?: boolean }) => (
  <ul className="border-t border-white/15">
    {items.map((b) => <li key={b} className={`border-b border-white/15 py-4 ${big ? "text-lg font-semibold" : "text-white/75"}`}>{b}</li>)}
  </ul>
);

export function CaseStudy({ p, next }: { p: CS; next: { slug: string; title: string } }) {
  const details: [string, string | string[]][] = [
    ["Client", p.client],
    ...(p.org ? [["Studio", p.org] as [string, string]] : []),
    ...(p.year ? [["Year", p.year] as [string, string]] : []),
    ...(p.strategy.length ? [["Strategy", p.strategy] as [string, string[]]] : []),
    ...(p.design.length ? [["Design", p.design] as [string, string[]]] : []),
  ];
  const extra: Img[] = (p.extraImages ?? []).map((src, i) => ({ src, alt: `${p.title} visual ${i + 1}` }));
  const gallery = [...((p.approach.gallery ?? []).filter(Boolean) as Img[]), ...extra];
  const media = p.work.media;

  return (
    <article className="case bg-midnight text-white">
      <Reveal />
      <header className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden bg-black">
        <CaseImage img={p.thumb} eager className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/20" aria-hidden="true" />
        <div className={`${wrap} relative pb-14 pt-40 md:pb-20`}>
          <p className="eyebrow"><Link href="/portfolio" className="hover:text-white">Portfolio</Link> // {p.client}</p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,6.6vw,6.5rem)] font-bold leading-[0.95]">{p.title}</h1>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-white/70">
            {p.tags.map((t) => <span key={t}>{t}</span>)}
            {p.stat && <span className="text-gold">{p.stat}</span>}
          </p>
        </div>
      </header>

      <section className={`${wrap} grid gap-12 py-24 md:grid-cols-12 md:py-32`} aria-label="Project details">
        <div className="reveal md:col-span-6">
          <p className="eyebrow">My Role</p>
          <p className="mt-3 font-display text-2xl font-bold md:text-3xl">{p.org ? "Co-Founder & CTO" : "Product & Project Lead"}</p>
          {p.role && <p className="mt-5 text-lg leading-relaxed text-white/75">{p.role}</p>}
          {p.task && (<><p className="eyebrow mt-10">The Task</p><p className="mt-3 text-xl font-semibold leading-snug md:text-2xl">{p.task}</p></>)}
        </div>
        <dl className="reveal grid content-start gap-8 border-t border-white/15 pt-8 sm:grid-cols-2 md:col-span-5 md:col-start-8">
          {details.map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-3 text-white/70">
                {Array.isArray(v) ? <ul className="space-y-1">{v.map((x) => <li key={x}>{x}</li>)}</ul> : <span className="font-semibold text-white">{v}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {p.challenge.body && (
        <section className="bg-black/30 py-24 md:py-32" aria-label="The challenge">
          <Chapter n="01" label="The Challenge" heading={p.challenge.heading}><p className="text-lg leading-relaxed text-white/80 md:text-xl">{p.challenge.body}</p></Chapter>
          <Bleed image={p.challenge.image} />
        </section>
      )}

      {(p.approach.bullets?.length || p.approach.body) && (
        <section className="py-24 md:py-32" aria-label="The approach">
          <Chapter n="02" label="The Approach" heading={p.approach.heading}>
            {p.approach.bullets?.length ? <List items={p.approach.bullets} /> : <p className="text-lg text-white/80">{p.approach.body}</p>}
          </Chapter>
          <Bleed image={p.approach.image} />
        </section>
      )}

      {(p.work.blocks.length > 0 || media.length > 0 || gallery.length > 0) && (
        <section className="bg-black/30 py-24 md:py-32" aria-label="The work">
          <Chapter n="03" label="The Work" heading={p.work.heading}>
            {p.work.blocks.length > 0 ? (
              <dl className="grid gap-8 sm:grid-cols-2">
                {p.work.blocks.map((b) => (
                  <div key={b.label}><dt className="font-bold">{b.label}</dt><dd className="mt-2 text-white/70">{b.body}</dd></div>
                ))}
              </dl>
            ) : <p className="text-white/60">Selected visuals from the project.</p>}
          </Chapter>
          {media.length > 0 && (
            <div className={`${wrap} mt-14 grid grid-cols-6 items-start gap-4 md:mt-20 md:gap-6`}>
              {media.map((m, k) => <MediaItem key={k} item={m} wide={media.length === 1 || (media.length % 2 === 1 && k === 0)} />)}
            </div>
          )}
          <Gallery images={gallery} />
        </section>
      )}

      {(p.results.stats.length > 0 || p.results.notes.length > 0 || p.results.body) && (
        <section className="py-24 md:py-32" aria-label="The results">
          <Chapter n="04" label="The Results" heading={p.results.heading}>
            {p.results.notes.length > 0 && <List items={p.results.notes} big />}
            {p.results.body && <p className="text-lg leading-relaxed text-white/80">{p.results.body}</p>}
          </Chapter>
          {p.results.stats.length > 0 && (
            <ul className={`${wrap} mt-14 grid grid-cols-2 gap-px md:mt-20 md:grid-cols-4`}>
              {p.results.stats.map((s) => (
                <li key={s.label} className="reveal border-t border-white/15 py-6 pr-4">
                  <p className="font-display text-4xl font-bold text-gold md:text-5xl">{s.value}</p>
                  <p className="mt-2 font-semibold">{s.label}</p>
                  {s.note && <p className="mt-1 text-sm text-white/50">{s.note}</p>}
                </li>
              ))}
            </ul>
          )}
          <Bleed image={p.results.image} />
        </section>
      )}

      <nav className="border-t border-white/10 py-20" aria-label="Next case study">
        <div className={wrap}>
          <p className="eyebrow">Next Case Study</p>
          <Link href={`/portfolio/${next.slug}`} className="mt-3 inline-block font-display text-4xl font-bold transition-colors hover:text-gold md:text-6xl">{next.title} →</Link>
        </div>
      </nav>
    </article>
  );
}
