import { Metadata } from "next";
import Image from "next/image";
import {
    ArrowUpRight,
    AudioLines,
    BookOpenText,
    Dumbbell,
    Gem,
    HandHeart,
    Headphones,
    Mic,
    NotebookPen,
    NotebookTabs,
    Repeat2,
    ScrollText,
    Sparkles,
    Sun,
    Users,
    type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Apps",
    description: "Free, private Islamic and productivity apps for the Ummah, built by Nabil Pervez.",
    openGraph: {
        title: "Apps | Nabil Pervez",
        description: "Free, private Islamic and productivity apps for the Ummah, built by Nabil Pervez.",
        url: "https://nabilpervez.com/apps",
    },
};

// Jewel tones, one per app.
const jewel = {
    emerald: "#047857",
    sapphire: "#1D4ED8",
    ruby: "#9F1239",
    amethyst: "#6D28D9",
    topaz: "#B45309",
    jade: "#0F766E",
    garnet: "#881337",
    lapis: "#1E3A8A",
    tourmaline: "#BE185D",
    peridot: "#4D7C0F",
    citrine: "#A16207",
    teal: "#115E59",
    plum: "#701A75",
    onyx: "#334155",
};

type App = { name: string; blurb: string; site: string; icon: LucideIcon; color: string };

const sections: { title: string; apps: App[] }[] = [
    {
        title: "Islamic",
        apps: [
            { name: "Quran Reflections", blurb: "Reflect on one ayah at a time and journal it", site: "quran-reflections", icon: BookOpenText, color: jewel.emerald },
            { name: "Solo Hifz Partner", blurb: "Memorize the Quran with a partner in your pocket", site: "quran-memorization-app", icon: Repeat2, color: jewel.sapphire },
            { name: "Hadith Reflection", blurb: "Read the major collections, one hadith at a time", site: "hadith-reflection", icon: ScrollText, color: jewel.topaz },
            { name: "Dhikr Flow", blurb: "Keep your tongue moist with daily dhikr", site: "dhikrflow", icon: Sparkles, color: jewel.amethyst },
            { name: "Ayah Echo", blurb: "Practice your recitation until it's perfect", site: "ayahecho", icon: AudioLines, color: jewel.jade },
            { name: "Muhasabah", blurb: "Hold yourself to account with a daily journal", site: "muhasabah", icon: NotebookPen, color: jewel.garnet },
            { name: "Duaa Connect", blurb: "Find the right duaa for whatever you're facing", site: "nameandneed", icon: HandHeart, color: jewel.tourmaline },
            { name: "Asmaul Husna", blurb: "Learn the 99 Names of Allah and their meanings", site: "learnthenamesofallah", icon: Gem, color: jewel.lapis },
            { name: "The Sacred Stream", blurb: "Listen to the Quran straight through, like an audiobook", site: "quran-audiobook", icon: Headphones, color: jewel.teal },
        ],
    },
    {
        title: "Productivity",
        apps: [
            { name: "Bullet Journal", blurb: "Capture goals, tasks, and notes one line at a time", site: "bullet-journal-app", icon: NotebookTabs, color: jewel.ruby },
            { name: "Murmur", blurb: "Turn your voice into text, privately in your browser", site: "transcribe-pwa", icon: Mic, color: jewel.plum },
            { name: "Serenity", blurb: "Start each day with a clear, calm action plan", site: "serenity-v2-app", icon: Sun, color: jewel.citrine },
            { name: "KinKeep", blurb: "Never lose touch with the people who matter", site: "kinkeep", icon: Users, color: jewel.onyx },
        ],
    },
    {
        title: "Health & Fitness",
        apps: [
            { name: "Lift More", blurb: "Log your lifts and watch your strength grow", site: "lift-more", icon: Dumbbell, color: jewel.peridot },
        ],
    },
];

const allApps = sections.flatMap((s) => s.apps);
const featured = [
    { site: "quran-reflections", pitch: "Slow down with the Quran. Read, listen, and write your own reflections, saved only on your device." },
    { site: "hadith-reflection", pitch: "Sahih al-Bukhari, Sahih Muslim and more, one narration at a time. No ads, no clutter, works offline." },
    { site: "bullet-journal-app", pitch: "A journal that keeps score. Every line is a goal, task, event, or note, and lands where it belongs." },
].map((f) => ({ ...f, app: allApps.find((a) => a.site === f.site)! }));

const promises = ["Free", "Private", "Mobile or desktop"];

const href = (site: string) => `https://${site}.netlify.app`;

export default function AppsPage() {
    return (
        <main className="min-h-screen px-4 pt-32 pb-20">
            <div className="mx-auto max-w-5xl">
                <header className="mb-12 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">For the Ummah</p>
                    <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-midnight">Apps</h1>
                    <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-midnight">
                        {promises.map((p) => (
                            <li key={p} className="flex items-center gap-2">
                                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                                {p}
                            </li>
                        ))}
                    </ul>
                </header>

                {/* Featured promo cards */}
                <section aria-labelledby="featured" className="mb-14">
                    <h2 id="featured" className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-midnight">
                        <span aria-hidden className="h-px w-6 bg-gold" />
                        Featured
                    </h2>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {featured.map(({ app, pitch }) => (
                            <li key={app.site}>
                                <a
                                    href={href(app.site)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ backgroundColor: app.color }}
                                    className="group flex h-full flex-col overflow-hidden rounded-3xl text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                                >
                                    <div className="p-6 pb-0">
                                        <span className="block font-display text-2xl font-bold">{app.name}</span>
                                        <span className="mt-2 block text-sm leading-relaxed text-white/85">{pitch}</span>
                                        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-midnight transition group-hover:bg-gold group-hover:text-white">
                                            Open app
                                            <ArrowUpRight aria-hidden className="h-4 w-4" />
                                            <span className="sr-only">(opens in a new tab)</span>
                                        </span>
                                    </div>
                                    {/* Phone-style screenshot peeking up from the bottom */}
                                    <div className="mt-6 flex flex-1 items-end justify-center px-10">
                                        <div className="relative aspect-[390/560] w-full max-w-[220px] overflow-hidden rounded-t-[1.75rem] border-4 border-b-0 border-black/80 bg-black shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                            <Image
                                                src={`/images/apps/${app.site}.png`}
                                                alt={`${app.name} app screenshot`}
                                                fill
                                                sizes="220px"
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                {sections.map((section) => (
                    <section key={section.title} className="mb-10">
                        <h2 className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-midnight">
                            <span aria-hidden className="h-px w-6 bg-gold" />
                            {section.title}
                        </h2>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {section.apps.map((app) => {
                                const Icon = app.icon;
                                return (
                                    <li key={app.site}>
                                        <a
                                            href={href(app.site)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ ["--jewel" as string]: app.color }}
                                            className="group relative flex h-full min-h-[76px] items-center gap-4 overflow-hidden rounded-2xl border border-midnight/10 bg-white px-4 py-4 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--jewel)] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                                        >
                                            {/* Fill that sweeps up from the bottom on hover, focus, or tap */}
                                            <span
                                                aria-hidden
                                                className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--jewel)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 group-active:scale-y-100"
                                            />
                                            <span
                                                aria-hidden
                                                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--jewel)] text-white transition-colors duration-300 group-hover:bg-white/15 group-active:bg-white/15"
                                            >
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span className="relative min-w-0 flex-1">
                                                <span className="block font-semibold text-midnight transition-colors duration-300 group-hover:text-white group-active:text-white">{app.name}</span>
                                                <span className="block text-sm text-secondary transition-colors duration-300 group-hover:text-white/85 group-active:text-white/85">{app.blurb}</span>
                                            </span>
                                            <ArrowUpRight aria-hidden className="relative h-5 w-5 shrink-0 text-[var(--jewel)] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-active:text-white" />
                                            <span className="sr-only">(opens in a new tab)</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}

                <footer className="mt-16 rounded-3xl bg-midnight px-6 py-10 text-center text-white">
                    <p className="font-display text-2xl font-bold">Feedback?</p>
                    <p className="mt-2 text-sm text-white/75">Found a bug or have an idea for an app? I&apos;d love to hear it.</p>
                    <a
                        href="mailto:nabilpervezconsulting@gmail.com?subject=App%20feedback"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-midnight transition hover:bg-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Contact me
                    </a>
                </footer>
            </div>
        </main>
    );
}
