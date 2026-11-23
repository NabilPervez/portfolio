import Link from "next/link";
import NavbarSpacer from "@/components/NavbarSpacer";

const BOOK = "https://calendar.app.google/VbQNoKnwrgNyx6kRA";
type Item = { title: string; text: string; items?: string[] };
export type ServicePageProps = {
  label: string; title: string; muted: string; lede: string;
  problemsTitle: string; problemsLede: string; problems: Item[];
  servicesLede: string; services: Item[];
  proof: string; proofMuted: string;
  faq: { q: string; a: string }[];
  closeLead: string; closeGold: string; closeText: string;
  sibling: { href: string; label: string };
};

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-12";

export function ServicePage(p: ServicePageProps) {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <NavbarSpacer />
      <section className={`${wrap} pt-20 pb-24 md:pt-28`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{p.label}</p>
        <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] md:text-7xl">{p.title}<span className="block text-white/50">{p.muted}</span></h1>
        <p className="mt-8 max-w-2xl text-lg text-white/75 md:text-xl">{p.lede}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={BOOK} target="_blank" rel="noopener" className="rounded-full bg-gold px-7 py-4 font-semibold text-midnight transition-opacity hover:opacity-90">Book a 20-minute call</a>
          <Link href={p.sibling.href} className="rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:border-gold">{p.sibling.label}</Link>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/30 py-24">
        <div className={wrap}>
          <h2 className="font-display text-3xl font-bold md:text-5xl">{p.problemsTitle}</h2>
          <p className="mt-4 max-w-xl text-white/60">{p.problemsLede}</p>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {p.problems.map((x) => (
              <li key={x.title} className="border-t border-white/15 pt-6"><h3 className="text-xl font-bold">{x.title}</h3><p className="mt-3 text-white/65">{x.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24">
        <div className={wrap}>
          <h2 className="font-display text-3xl font-bold md:text-5xl">What you get.</h2>
          <p className="mt-4 max-w-xl text-white/60">{p.servicesLede}</p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.services.map((s) => (
              <li key={s.title} className="rounded-2xl border border-white/10 p-7">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-white/65">{s.text}</p>
                {s.items && <ul className="mt-5 flex flex-wrap gap-2">{s.items.map((t) => <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{t}</li>)}</ul>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/30 py-24">
        <div className={wrap}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Proof</p>
          <p className="mt-5 max-w-4xl font-display text-3xl font-bold leading-tight md:text-5xl">{p.proof} <span className="text-white/50">{p.proofMuted}</span></p>
        </div>
      </section>

      <section className="py-24">
        <div className={wrap}>
          <h2 className="font-display text-3xl font-bold md:text-5xl">Questions.</h2>
          <dl className="mt-10 border-t border-white/15">
            {p.faq.map((f) => (
              <div key={f.q} className="border-b border-white/15 py-6 md:grid md:grid-cols-2 md:gap-10"><dt className="text-lg font-bold">{f.q}</dt><dd className="mt-2 text-white/70 md:mt-0">{f.a}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-white/10 py-28 text-center">
        <div className={wrap}>
          <h2 className="font-display text-4xl font-bold md:text-6xl">{p.closeLead} <span className="text-gold">{p.closeGold}</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">{p.closeText}</p>
          <a href={BOOK} target="_blank" rel="noopener" className="mt-10 inline-block rounded-full bg-gold px-10 py-5 font-semibold text-midnight transition-opacity hover:opacity-90">Book a 20-minute call</a>
        </div>
      </section>
    </div>
  );
}
