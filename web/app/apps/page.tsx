import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Apps",
    description: "Islamic, productivity, and lifestyle apps built by Nabil Pervez.",
    openGraph: {
        title: "Apps | Nabil Pervez",
        description: "Islamic, productivity, and lifestyle apps built by Nabil Pervez.",
        url: "https://nabilpervez.com/apps",
    },
};

type App = { name: string; blurb: string; site: string };

const sections: { title: string; apps: App[] }[] = [
    {
        title: "Islamic",
        apps: [
            { name: "Baraka Boost", blurb: "Islamic habits tracker", site: "barakaboostapp" },
            { name: "Quran Reflections", blurb: "Your personal tadabbur journal", site: "quran-reflections" },
            { name: "The Sacred Stream", blurb: "The Quran as an audiobook", site: "quran-audiobook" },
            { name: "Solo Hifz Partner", blurb: "Quran memorization practice", site: "quran-memorization-app" },
            { name: "Hadith Reflection", blurb: "Daily hadith to reflect on", site: "hadith-reflection" },
            { name: "Reflecting on the Names of Allah", blurb: "A book on the 99 Names", site: "reflecting-on-the-names-of-allah-book" },
            { name: "Halal Passport", blurb: "DFW halal spots", site: "halal-passport" },
            { name: "DFW Halal", blurb: "A halal foodie journal for Dallas–Fort Worth", site: "dfw-halal-foodie-journal" },
        ],
    },
    {
        title: "Productivity",
        apps: [
            { name: "Bullet Journal", blurb: "A digital bullet journal", site: "bullet-journal-app" },
            { name: "LearnLoop", blurb: "Sprint-based learning", site: "learnloopapp" },
            { name: "Recurr", blurb: "Make it recurring", site: "makeitrecurring" },
            { name: "Murmur", blurb: "Private voice transcription", site: "transcribe-pwa" },
            { name: "Serenity", blurb: "Daily action plan", site: "serenity-v2-app" },
        ],
    },
    {
        title: "Health & Fitness",
        apps: [
            { name: "Lift More", blurb: "Functional lift tracker", site: "lift-more" },
        ],
    },
    {
        title: "Creative & Design",
        apps: [
            { name: "Spectrum Keys", blurb: "Built key by key", site: "spectrum-keys" },
            { name: "NPC Design System", blurb: "A design system for my products", site: "npc-design-system" },
        ],
    },
];

export default function AppsPage() {
    return (
        <main className="min-h-screen px-4 pt-32 pb-20">
            <div className="mx-auto max-w-xl">
                <header className="mb-12 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Apps</h1>
                    <p className="mt-3 text-secondary">Things I&apos;ve built. Tap to open.</p>
                </header>

                {sections.map((section) => (
                    <section key={section.title} className="mb-10">
                        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                            {section.title}
                        </h2>
                        <ul className="flex flex-col gap-3">
                            {section.apps.map((app) => (
                                <li key={app.site}>
                                    <a
                                        href={`https://${app.site}.netlify.app`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md"
                                    >
                                        <span>
                                            <span className="block font-semibold">{app.name}</span>
                                            <span className="block text-sm text-secondary">{app.blurb}</span>
                                        </span>
                                        <ArrowUpRight className="h-5 w-5 shrink-0 text-secondary transition group-hover:text-foreground" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}
