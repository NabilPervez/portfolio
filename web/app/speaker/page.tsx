"use client";

import { FadeIn } from "@/components/FadeIn";
import { Navbar } from "@/components/Navbar";
import NavbarSpacer from "@/components/NavbarSpacer";
import StarBorder from "@/components/StarBorder";
import { Download, Mic, Monitor, User, Users, Zap, Video, Gamepad2, Briefcase, ChevronRight, Smartphone, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SpeakerPage() {
    const [formData, setFormData] = useState({
        eventDate: "",
        location: "",
        audienceSize: "",
        budget: "",
        challenge: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Speaker Inquiry: ${formData.eventDate} - ${formData.location}`;
        const body = `
Event Date & Location: ${formData.eventDate}, ${formData.location}
Audience Size: ${formData.audienceSize}
Biggest Challenge: ${formData.challenge}
        `;
        window.location.href = `mailto:nabilpervezconsulting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="bg-black min-h-screen text-white selection:bg-gold selection:text-black">
            <Navbar />
            <NavbarSpacer />

            <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">

                {/* 1. Hero Section */}
                <FadeIn className="mb-24 md:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <span className="block text-gold font-medium tracking-widest uppercase mb-4 text-sm">Speaker Profile</span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                                Scaling Creativity through <span className="text-gold">Chaos</span>.
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
                                The intersection of Agile Systems, Entertainment Culture, and Enterprise Marketing.
                            </p>
                            <p className="text-gray-400 max-w-lg mb-8">
                                Co-Founder & Tech-Marketer behind campaigns for Riot Games, LEGO, and Coca-Cola. Helping teams bridge the gap between creative vision and technical execution.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#book"
                                    className="bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors"
                                >
                                    Book Nabil
                                </Link>
                                <a
                                    href="/speaker-kit.zip"
                                    className="border border-white/20 px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    Download Kit
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative group">
                                <div className="absolute inset-0 bg-[url('https://nabilpervezportfolio.netlify.app/images/nabil-headshot.jpg')] bg-cover bg-center opacity-100 transition-all duration-700"></div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Bar */}
                    <div className="border-t border-b border-white/10 py-8">
                        <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Trusted By Teams At</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {["Coca-Cola", "LEGO", "Paramount Pictures", "RedBull", "The Kraft Group", "Riot Games", "Activision", "Blizzard Entertainment", "OniStudios", "SypherPK", "NACON"].map(brand => (
                                <span key={brand} className="text-xl md:text-2xl font-display font-bold text-white/80">{brand}</span>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* 2. Bio Section */}
                <FadeIn className="mb-32 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                        <div>
                            <h2 className="text-3xl font-display font-bold mb-4">The Story</h2>
                            <div className="w-12 h-1 bg-gold mb-8"></div>

                        </div>
                        <div>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                Creativity without process is just chaos. Nabil Pervez knows this better than anyone. Starting his career in the trenches of IT Service Desk support, Nabil learned the critical importance of systems, uptime, and efficiency. But he didn&apos;t stay in the server room.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                Pivoting to the fast-paced world of digital marketing, Nabil Co-Founded AOE Creative, where he served as Lead Project Manager and CTO. There, he didn&apos;t just run campaigns; he built the engines that ran them. He managed a $5M+ portfolio and led cross-functional teams to sell out clothing lines for Fortnite creators and drive 45 million views for Activision Blizzard.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Over the years, Nabil has moderated, spoken, shoutcasted, and hosted hundreds of events. The largest crowd Nabil has spoken in front of was 70,000 people.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed mt-6">
                                His unique brand of optimism, charisma, and honesty has been freshing in world of buzzwords.
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* 3. Speaking Topics */}
                <FadeIn className="mb-32">
                    <div className="text-center mb-16">
                        <span className="text-gold font-mono uppercase tracking-widest text-sm">Signature Talks</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">Keynote Topics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Topic 1 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-colors group">
                            <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">The Agile Creative</h3>
                            <div className="mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">Strategy</span>
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                Creatives hate &quot;process,&quot; but they need it to scale. How to use Scrum/Agile (typically for software) to manage design and marketing.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Run a &quot;Creative Sprint&quot; without killing inspiration.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>The &quot;Definition of Done&quot; for ambiguous assets.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Case Study: Shipping 40 assets for LEGO in record time.</li>
                            </ul>
                        </div>

                        {/* Topic 2 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-colors group">
                            <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <Gamepad2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Decoding the Gamer Generation</h3>
                            <div className="mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">Culture</span>
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                Gaming isn&apos;t just a hobby; it&apos;s the dominant culture of the next generation. Lessons from the frontlines of Esports.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>&quot;Authenticity&quot; is the only currency that matters.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Community as a Moat: Lessons from SypherPK.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>How to speak &quot;Internet&quot; without sounding like a bot.</li>
                            </ul>
                        </div>

                        {/* Topic 3 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-colors group">
                            <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <Monitor className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">The CTO in the Marketing Department</h3>
                            <div className="mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">Tech Ops</span>
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                Marketing is now a technical discipline. If your marketing leader doesn&apos;t understand the tech stack, you&apos;re losing money.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Bridging the gap between IT and Marketing.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Using automation to reduce &quot;grunt work&quot; by 20%.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Building a &quot;MarTech&quot; stack that scales.</li>
                            </ul>
                        </div>

                        {/* Topic 4 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-colors group">
                            <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Branding For A Digital Audience</h3>
                            <div className="mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">Branding</span>
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                Digital-first branding isn&apos;t just about a logo; it&apos;s about how you show up in the feed.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Visual Identity Systems for Social Media.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Voice & Tone validation.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Case Study: Paramount Pictures.</li>
                            </ul>
                        </div>

                        {/* Topic 5 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-colors group">
                            <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">How To Build An Engaging Creative Brief</h3>
                            <div className="mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">Process</span>
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                The brief is the most important creative asset. Learn how to write one that inspires rather than restricts.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>The 4 essential components of every brief.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Eliminating ambiguity.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Briefing for Gen Z campaigns.</li>
                            </ul>
                        </div>

                        {/* Topic 6 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold/50 transition-colors group">
                            <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">The Importance Of Understanding Your Audience</h3>
                            <div className="mb-6">
                                <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">Insights</span>
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                Data doesn&apos;t tell the whole story. You need to understand the subcultures and communities you are speaking to.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Moving beyond demographics.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Community listening strategies.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></div>Case Study: Houston Outlaws.</li>
                            </ul>
                        </div>
                    </div>
                </FadeIn>

                {/* 4. Social Proof / Case Studies */}
                <FadeIn className="mb-32">
                    <div className="text-center mb-16">
                        <span className="text-gold font-mono uppercase tracking-widest text-sm">Proven Results</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">Case Studies</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <Users className="text-gold" /> Viral Marketing & Brand Growth
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { title: "Houston Outlaws", win: "Directed award-winning campaign with pop-up shops.", metric: "10M+ impressions, 10k+ attendees." },
                                    { title: "AOE Creative", win: "Scaled operations for a $5M portfolio.", metric: "90% client referral rate." },
                                    { title: "Activision Blizzard", win: "Built 4th most connected TikTok account from scratch.", metric: "45M views in 4 months." },
                                    { title: "Coca-Cola", win: "High-impact advertising campaign across social.", metric: "2.2M reach at 50% industry cost." },
                                    { title: "SypherPK", win: "End-to-end brand build for apparel line.", metric: "Sold-out clothing line upon launch." },
                                    { title: "Paramount Pictures' \"Players\"", win: "Branding for mockumentary.", metric: "25% rise in trailer views." },
                                    { title: "Boston Breach", win: "GTM strategy for CDL team.", metric: "#1 most engaged team in league." },
                                    { title: "Immortal: Gates of Pyre", win: "Kickstarter launch strategy.", metric: "5X'd funding goal." },
                                    { title: "World Series of Warzone", win: "Content production for tournament.", metric: "40% increase in social impressions." },
                                    { title: "Riot Games", win: "Interactive Map of EMEA.", metric: "40% boost in user interaction." },
                                    { title: "Voyagers of Nera", win: "Lore and gameplay website launch.", metric: "30% traffic increase." },
                                ].map((study, i) => (
                                    <div key={i} className="border-l-2 border-white/10 pl-6 hover:border-gold transition-colors">
                                        <h4 className="font-bold text-lg text-white">{study.title}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{study.win}</p>
                                        <p className="text-gold text-sm font-medium mt-1">{study.metric}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <Briefcase className="text-gold" /> Tech Ops, Systems & ROI
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { title: "Session Skate Sim", win: "Led design teams for key art.", metric: "30% surge in pre-order sales." },
                                    { title: "A-KON", win: "Brand identity and marketing strategy.", metric: "Record-high attendance." },
                                    { title: "The Story Mob", win: "Technical overhaul of digital presence.", metric: "Reduced load times by 75%." },
                                    { title: "T-Mobile (Content Ops)", win: "Streamlined AEM workflows.", metric: "Primary ops contact driving efficiencies." },
                                    { title: "Prospera Financial Services", win: "AI integration in pipelines.", metric: "Enhanced scalability via automation." },
                                    { title: "The Devhouse Agency", win: "Marketing ops and ad tech stack.", metric: "30% boost in social visibility." },
                                    { title: "MutualMind", win: "Optimized support and vendor contracts.", metric: "Saved $50k annually." },
                                    { title: "T-Mobile (ITSM)", win: "Led ITSM teams.", metric: "Reduced ticket time from 24h to 8h." },
                                    { title: "Fujitsu", win: "Endpoint security management.", metric: "15% reduction in security incidents." },
                                ].map((study, i) => (
                                    <div key={i} className="border-l-2 border-white/10 pl-6 hover:border-gold transition-colors">
                                        <h4 className="font-bold text-lg text-white">{study.title}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{study.win}</p>
                                        <p className="text-gold text-sm font-medium mt-1">{study.metric}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* 5. Media Kit */}
                <FadeIn className="mb-32" id="media-kit">
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-3xl font-display font-bold mb-2">Event Planner Toolkit</h3>
                            <p className="text-gray-400 max-w-xl">
                                Everything you need to market Nabil for your event. Includes high-res headshots, intro scripts, and technical rider.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="/speaker-kit.zip"
                                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                            >
                                <Download className="w-4 h-4" /> Download Assets
                            </a>
                        </div>
                    </div>
                </FadeIn>

                {/* 6. Contact Form */}
                <FadeIn id="book" className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold mb-4">Ready to level up your event?</h2>
                        <p className="text-gray-400">Tell me about your event and let&apos;s see if we&apos;re a match.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                        <p className="text-xl text-white font-medium mb-6">Send me an email telling me more about your event:</p>
                        <div className="space-y-4 mb-8 text-gray-300">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                <span>Event Date</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                <span>Location</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                <span>Est. Audience Size</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                <span>What is the biggest challenge your audience is facing?</span>
                            </div>
                        </div>

                        <StarBorder
                            as="a"
                            href={`mailto:nabilpervezconsulting@gmail.com?subject=Speaker Inquiry&body=${encodeURIComponent("Event Date:\nLocation:\nEst. Audience Size:\nWhat is the biggest challenge your audience is facing?:\n")}`}
                            className="w-full flex justify-center py-4 text-cyan-400 font-bold tracking-widest uppercase cursor-pointer"
                        >
                            Send Inquiry
                        </StarBorder>
                    </div>
                </FadeIn>
            </div >
        </main >
    );
}
