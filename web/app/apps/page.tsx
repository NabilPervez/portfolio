import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Apps",
    description: "Islamic, productivity, and fitness apps built by Nabil Pervez.",
    openGraph: {
        title: "Apps | Nabil Pervez",
        description: "Islamic, productivity, and fitness apps built by Nabil Pervez.",
        url: "https://nabilpervez.com/apps",
    },
};

type App = { name: string; blurb: string; site: string };

const sections: { title: string; apps: App[] }[] = [
    {
        title: "Islamic",
        apps: [
            { name: "Quran Reflections", blurb: "Your personal tadabbur journal", site: "quran-reflections" },
            { name: "Solo Hifz Partner", blurb: "Quran memorization practice", site: "quran-memorization-app" },
            { name: "Hadith Reflection", blurb: "Daily hadith to reflect on", site: "hadith-reflection" },
            { name: "Dhikr Flow", blurb: "Daily dhikr and remembrance", site: "dhikrflow" },
            { name: "Ayah Echo", blurb: "Practice and perfect your recitation", site: "ayahecho" },
            { name: "Zaman", blurb: "Islamic daily companion", site: "zamanhomepage" },
            { name: "Muhasabah", blurb: "Digital Islamic bullet journal", site: "muhasabah" },
            { name: "Duaa Connect", blurb: "Find your supplication", site: "nameandneed" },
            { name: "Asmaul Husna", blurb: "Learn the Names of Allah", site: "learnthenamesofallah" },
            { name: "The Sacred Stream", blurb: "The Quran as an audiobook", site: "quran-audiobook" },
        ],
    },
    {
        title: "Productivity",
        apps: [
            { name: "Bullet Journal", blurb: "A digital bullet journal", site: "bullet-journal-app" },
            { name: "Murmur", blurb: "Private voice transcription", site: "transcribe-pwa" },
            { name: "Serenity", blurb: "Daily action plan", site: "serenity-v2-app" },
            { name: "KinKeep", blurb: "Stay in touch with family and friends", site: "kinkeep" },
        ],
    },
    {
        title: "Health & Fitness",
        apps: [
            { name: "Lift More", blurb: "Functional lift tracker", site: "lift-more" },
        ],
    },
];

export default function AppsPage() {
    return (
        <main className="min-h-screen px-4 pt-32 pb-20">
            <div className="mx-auto max-w-5xl">
                <header className="mb-12 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-midnight">Apps</h1>
                    <p className="mt-3 text-secondary">Things I&apos;ve built. Tap to open.</p>
                </header>

                {sections.map((section) => (
                    <section key={section.title} className="mb-10">
                        <h2 className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-midnight">
                            <span aria-hidden className="h-px w-6 bg-gold" />
                            {section.title}
                        </h2>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {section.apps.map((app) => (
                                <li key={app.site}>
                                    <a
                                        href={`https://${app.site}.netlify.app`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-midnight/10 bg-white px-5 py-4 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-midnight hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                                    >
                                        {/* Fill that sweeps up from the bottom on hover */}
                                        <span
                                            aria-hidden
                                            className="absolute inset-0 origin-bottom scale-y-0 bg-midnight transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                                        />
                                        <span className="relative">
                                            <span className="block font-semibold text-midnight transition-colors duration-300 group-hover:text-white">{app.name}</span>
                                            <span className="block text-sm text-secondary transition-colors duration-300 group-hover:text-gold">{app.blurb}</span>
                                        </span>
                                        <ArrowUpRight className="relative h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
