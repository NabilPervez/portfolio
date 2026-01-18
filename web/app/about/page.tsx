import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export const metadata = {
    title: "About | Nabil Pervez",
    description: "My journey, philosophy, and experience."
};

const workHistory = [
    {
        year: "2024 - Present",
        role: "Founder, Principal Consultant",
        company: "Nabil Pervez Consulting (NPC)",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Consulted on brand marketing, strategy, RFPs, and operations for agencies and businesses.</li>
                <li>Measured and analyzed business processes, identified gaps, and suggested improvements to align solutions with organizational goals.</li>
                <li>Developed and delivered high-quality, customer-facing deliverables and presentations.</li>
                <li>Engaged in a full solution lifecycle, from initial scoping to post-implementation support.</li>
                <li>Led the process of scope of work creation, contract negotiation, billing, and reconciliation for new partnerships and RFPs.</li>
            </ul>
        )
    },
    {
        year: "2024 - Present",
        role: "Chief Marketing Officer",
        company: "Devhouse Agency (Video Game Studio)",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Managed the day-to-day marketing operations and administration for the agency, focused on driving brand growth and recognition.</li>
                <li>Developed and implemented processes... boosting social media visibility by 30% and improving SEO performance by 20%.</li>
                <li>Facilitated the process of scope of work creation, contract negotiation, billing, and reconciliation for new partnerships and RFPs.</li>
                <li>Led brand positioning and executed customer-centric marketing campaigns, achieving a 15% increase in engagement and customer satisfaction.</li>
                <li>Acted as brand manager, producer, and video editor for a self published video game - Our Tribe Above All (OTAA).</li>
            </ul>
        )
    },
    {
        year: "2018 - 2024",
        role: "Co-Founder, Chief Technical Officer, Senior Product Manager",
        company: "AOE Creative",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Leadership:</strong> Led multidisciplinary teams of 30+ (designers, marketers, developers) to launch digital products, websites, SaaS, mobile apps, and marketing campaigns.</li>
                <li><strong>Growth:</strong> Contributed to a 20% YOY revenue growth by upselling and cross-selling, generating an additional $1M in annual revenue.</li>
                <li><strong>Impact:</strong> Managed a portfolio of over $5M for global clients like Riot Games, LEGO, Coca-Cola, Paramount Pictures, and Activision Blizzard.</li>
                <li><strong>Results:</strong> Reduced customer churn rate by 30% over three years through proactive support and customer success strategies.</li>
                <li><strong>Strategy:</strong> Utilized Agile methodologies to define roadmaps, sprint planning, and product requirements, improving productivity by 20%.</li>
            </ul>
        )
    },
    {
        year: "2017 - 2018",
        role: "Marketing Project Manager",
        company: "Infinite Esports",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Directed the marketing efforts of an award-winning campaign that boosted brand visibility and engagement by 10M+ impressions.</li>
                <li>Created and executed distinctive events, including block parties and pop-up shops, each attracting 10K+ attendees.</li>
                <li>Spearheaded initiatives resulting in a 25% increase in social media followers and a 20% rise in event participation.</li>
                <li>Led the project management team, overseeing daily standups and sprint planning to ensure adherence to Agile methodologies.</li>
            </ul>
        )
    },
    {
        year: "2016 - 2017",
        role: "Marketing Project Manager",
        company: "PVP Live",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Developed comprehensive marketing strategies to increase monthly active users (MAU) to 3M+ and enhance social media following.</li>
                <li>Scouted and signed an influencer roster, implementing targeted marketing that generated massive community engagement.</li>
                <li>Collaborated with cross-functional teams to launch successful esports tournaments and leagues.</li>
                <li>Implemented strategies that drove a 15% increase in sales and a 20% boost in overall revenue.</li>
            </ul>
        )
    },
    {
        year: "2014 - 2015",
        role: "Technical Support Engineer",
        company: "MutualMind",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Provided expert support across multiple operating systems (Windows, macOS, Linux) while leading the ITSM team.</li>
                <li>Achieved a 95% first-contact resolution rate and boosted customer satisfaction scores by 20%.</li>
                <li>Conducted training sessions increasing client self-sufficiency; optimized workflows saving the company $50K annually.</li>
            </ul>
        )
    },
    {
        year: "2012 - 2014",
        role: "Functional Analyst",
        company: "T-Mobile",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Led the ITSM team, achieving 98% SLA compliance by streamlining support processes.</li>
                <li>Decreased average ticket resolution time from 24 hours to 8 hours, resulting in a 50% increase in customer satisfaction scores.</li>
                <li>Developed training programs that improved support, reducing onboarding time for new hires by 20%.</li>
            </ul>
        )
    },
    {
        year: "2011 - 2012",
        role: "Service Desk Analyst",
        company: "Fujitsu",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Administered user accounts in Active Directory, improving access efficiency.</li>
                <li>Managed endpoint security and firewall maintenance, resulting in a 15% reduction in security incidents.</li>
                <li>Provided timely support achieving a 90% first-contact resolution rate.</li>
            </ul>
        )
    }
];

const expertise = [
    "Branding & Identity", "Agile Project Management", "Go-to-Market Strategy",
    "Product Management", "UI/UX Design", "Digital Marketing",
    "Team Leadership", "Data-Driven Decision Making", "Operations Strategy",
    "Cloud Engineering", "Full Stack Development", "Vendor Management"
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
                        <a
                            href="/resume.md"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-full font-medium hover:bg-gold transition-colors mt-6"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download MD Resume
                        </a>
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

            {/* Curiosity Section */}
            <div className="mb-32 animate-fade-in-up [animation-delay:250ms]">
                <div className="bg-gray-50 p-12 md:p-16 rounded-sm border border-gray-100/50">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                        Curiosity is my <span className="text-gold">Operating System</span>.
                    </h2>
                    <div className="prose prose-lg text-secondary leading-relaxed font-light max-w-4xl">
                        <p>
                            I’ve always refused to stay in a single lane. To me, a great product isn't just code, and it isn't just a pretty design—it's the seamless integration of both.
                        </p>
                        <p>
                            That curiosity led me to master the spectrum: from the logic of Python to the psychology of Marketing, and the structure of Product Management.
                        </p>
                        <p>
                            This polymath approach allows me to sit in any room—with engineers, creatives, or executives—and speak their language. I don't just manage teams; I align them. I ensure the 'nerd' details support the business goals, delivering complex projects that are as joyfully creative as they are technically sound.
                        </p>
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

                    <div className="mt-12 -mx-12 md:-mx-0">
                        <TestimonialCarousel />
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
