import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
    title: "About | Nabil Pervez",
    description: "My journey, philosophy, and experience."
};

const workHistory = [
    {
        year: "2024 - Present",
        role: "Chief Marketing Officer",
        company: "Devhouse Agency",
        description: "Leading marketing strategy and brand development for a video game studio. Managed day-to-day operations, boosted social media visibility by 30%, and facilitated contract negotiations."
    },
    {
        year: "2024 - Present",
        role: "Founder, Principal Consultant",
        company: "Nabil Pervez Consulting (NPC)",
        description: "providing strategic consulting on brand marketing, RFPs, and operations. Developing high-quality deliverables and managing full solution lifecycles."
    },
    {
        year: "2018 - 2024",
        role: "Co-Founder, CTO, Senior Product Manager",
        company: "AOE Creative",
        description: "Led multidisciplinary teams of up to 30 people. Managed a portfolio of over $5M for global clients. Contributed to 20% YOY revenue growth and reduced customer churn by 30%."
    },
    {
        year: "2017 - 2018",
        role: "Marketing Project Manager",
        company: "Infinite Esports",
        description: "Directed award-winning marketing campaigns boosting impressions by 10M+. Managed cross-functional teams for events attracting 10K+ attendees."
    },
    {
        year: "2016 - 2017",
        role: "Marketing Project Manager",
        company: "PVP Live",
        description: "Developed marketing strategies increasing MAU to 3M+. Led project management and collaborated with cross-functional teams to launch esports tournaments."
    },
    {
        year: "2014 - 2015",
        role: "Technical Support Engineer",
        company: "MutualMind",
        description: "Led the ITSM team, achieving 95% first-contact resolution. Optimized support workflows saving $50K annually."
    },
    {
        year: "2012 - 2014",
        role: "Functional Analyst",
        company: "T-Mobile",
        description: "Led the ITSM team, reducing average ticket resolution time from 24 to 8 hours."
    },
    {
        year: "2011 - 2012",
        role: "Service Desk Analyst",
        company: "Fujitsu",
        description: "Administered user accounts and managed endpoint security, reducing support ticket volume by 20%."
    }
];

const expertise = [
    "Branding & Identity", "Agile Project Management", "Go-to-Market Strategy",
    "Product Management", "UI/UX Design", "Digital Marketing",
    "Team Leadership", "Data-Driven Decision Making", "Operations Strategy",
    "Cloud Engineering", "Full Stack Development", "Vendor Management"
];

const testimonials = [
    {
        quote: "Nabil is an absolute pleasure to work with. Professional, caring and a hard worker. Nabil is phenomenal at seeing needs before they arise and setting goals to help drive a team forward.",
        author: "Trenton Pierson",
        role: "Therapeutic Counselor"
    },
    {
        quote: "If there's one thing I can say about Nabil and his presence in a company, it's that he's an X-Factor. He immediately improves the team he's working with and knows how to make their best qualities shine through.",
        author: "Dustin Steiner",
        role: "Senior Associate, Public Relations"
    },
    {
        quote: "Organized, fast, clear communicator. I always look forward to meetings with Nabil leads because I know we're going to get shit done.",
        author: "Colter Hochstetler",
        role: "Founder, SunSpear Games"
    }
];

const clients = [
    "Riot Games", "Blizzard Activision", "Nacon", "LEGO", "Paramount Pictures", "Amazon", "Red Bull", "Coca-Cola"
];

export default function AboutPage() {
    return (
        <FadeIn className="py-24 px-6 md:px-12 max-w-7xl mx-auto">

            {/* Intro Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start mb-32">
                {/* Left Column: Bio */}
                <div className="md:col-span-7 space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-gold">About Me</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
                            Accomplished Product Manager.
                        </h1>
                        <div className="h-1 w-20 bg-black/10" />
                    </div>

                    <div className="prose prose-lg text-secondary leading-relaxed space-y-6 font-light">
                        <p>
                            I’ve led teams of designers, marketers, and developers to create award-winning marketing campaigns, memorable brands, and enjoyable video games.
                        </p>
                        <p>
                            Throughout my career, I've operated on my feet, maintaining a big-picture perspective while prioritizing immediate goals. I believe in leveraging individual strengths within a team to foster a happier, more productive collective.
                        </p>
                        <p>
                            My work style can be described as <strong>creative, relentless, and efficient</strong>. I consistently strive to enhance myself, my projects, and the individuals I work with.
                        </p>
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className="md:col-span-5 space-y-12 animate-fade-in-up [animation-delay:200ms]">
                    <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl rounded-sm">
                        <Image
                            src="/images/nabil-headshot.jpg"
                            alt="Nabil Pervez"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Philosophy & Approach */}
            <div className="mb-32 animate-fade-in-up [animation-delay:300ms]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-6">My Philosophy</h2>
                        <p className="text-secondary leading-relaxed text-lg">
                            Above all, I acknowledge that my success is intricately tied to the teams and individuals I collaborate with. Recognizing that no manager thrives in isolation, I attribute my growth and accomplishments to the people in my professional and personal life. To foster effective communication, I embrace strategies like weekly burn downs, rapid-fire scrums, and regular personal check-ins.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-6">My Approach</h2>
                        <p className="text-secondary leading-relaxed text-lg">
                            Engaging in constructive debate is a vital part of my work, as it sharpens minds and broadens perspectives. With high expectations, I readily assume responsibility, even outside my typical scope, to address voids or gaps. Each day, person, and project holds unique significance, and I am committed to treating them with the attention and respect they deserve.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Competencies */}
            <div className="mb-32 animate-fade-in-up [animation-delay:400ms]">
                <h2 className="text-3xl font-display font-bold mb-10">Core Competencies</h2>
                <div className="flex flex-wrap gap-4">
                    {expertise.map((skill, i) => (
                        <span key={i} className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-secondary hover:bg-foreground hover:text-white transition-colors duration-300 cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Leadership & Teams */}
            <div className="mb-32 animate-fade-in-up [animation-delay:500ms] bg-gray-50 p-12 rounded-sm border border-gray-100">
                <h2 className="text-3xl font-display font-bold mb-8">Leadership & Management</h2>
                <div className="space-y-6 text-secondary text-lg leading-relaxed">
                    <p>
                        I have managed <strong>cross-functional teams of up to 30 people</strong>, including designers, marketers, developers, and videographers. My leadership experience spans from co-founding an agency to leading ITSM teams at major corporations.
                    </p>
                    <p>
                        I focus on mentoring and coaching, having fostered cultures of learning that resulted in measurable efficiency increases. Colleagues and direct reports have noted my ability to "immediately improve the team" and my "supportive approach."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white p-6 shadow-sm border border-gray-100">
                                <p className="italic text-secondary mb-4">"{t.quote}"</p>
                                <div>
                                    <p className="font-bold text-foreground text-sm">{t.author}</p>
                                    <p className="text-gray-400 text-xs uppercase tracking-wide">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Past Clients */}
            <div className="mb-32 animate-fade-in-up [animation-delay:600ms]">
                <h2 className="text-3xl font-display font-bold mb-10">Past Clients</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {clients.map((client, i) => (
                        <div key={i} className="h-24 flex items-center justify-center bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-all">
                            <span className="text-lg font-display font-bold text-gray-400 uppercase tracking-wider">{client}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Section */}
            <div className="max-w-4xl border-t border-gray-200 pt-24 animate-fade-in-up [animation-delay:400ms]">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">The Journey</h2>

                <div className="space-y-16">
                    {workHistory.map((job, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 group">
                            <div className="md:col-span-3">
                                <span className="text-sm font-medium text-gray-400 tracking-wider uppercase">{job.year}</span>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-2xl font-display font-medium mb-1 group-hover:underline underline-offset-4 decoration-1">{job.company}</h3>
                                <p className="text-secondary font-medium mb-4">{job.role}</p>
                                <p className="text-secondary/80 font-light leading-relaxed max-w-2xl">{job.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </FadeIn>
    );
}
