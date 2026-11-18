"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { caseStudies } from "@/lib/caseStudies";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";
import { BentoGrid } from "@/components/BentoGrid";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { MobileAutoCarousel } from "@/components/MobileAutoCarousel";
import MotionHero from "@/components/MotionHero";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const specializations = [
  { title: "Brand Strategy", description: "Crafting unique identities and narratives that resonate with global audiences." },
  { title: "Product Management", description: "Leading cross-functional teams to build and ship exceptional digital products and games." },
  { title: "Creative Direction", description: "Guiding visual and interactive experiences from concept to award-winning execution." },
  { title: "Marketing Campaigns", description: "Designing and executing go-to-market strategies that drive engagement and growth." },
  { title: "Agile Leadership", description: "Ensuring on-time delivery through Agile methodologies and clear barrier-busting communication." },
  { title: "User Research", description: "Uncovering user needs and behaviors to inform product decisions and design tailored solutions." },
  { title: "Data Analysis", description: "Leveraging analytics to measure performance, identify trends, and drive data-informed improvements." },
  { title: "Go-to-Market", description: "Orchestrating successful product launches with integrated marketing and sales strategies." },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Clients logic for static grid (keep if used by MobileAutoCarousel in clients section)
  // Actually, MobileAutoCarousel takes children, so we probably just map clientsData there directly in the JSX?
  // Checking original file: Lines 179 maps clientsData slice.
  // Lines 52-54 defined row1/row2 which were ONLY used in the bottom section I just replaced.
  // So I can replace row1/row2 definition with project logic.

  // Filter valid projects
  const validProjects = caseStudies
    .filter(p => p.thumb.src && !p.thumb.src.includes("default.jpg"))
    .map(p => ({ slug: p.slug, title: p.title, image: p.thumb.src, video: p.cardVideo }));

  const midPoint = Math.ceil(validProjects.length / 2);
  const projectRow1 = validProjects.slice(0, midPoint);
  const projectRow2 = validProjects.slice(midPoint);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">

      {/* Hero Section */}
      <MotionHero />

      {/* Video Section Below Hero */}
      <section className="bg-black py-0">
        <div className="w-full h-[600px] relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-80"
            src="/media/home-reel.mp4"
            poster="/media/home-reel-poster.webp"
            aria-label="Showreel"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>

      {/* Nerd Translator Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-12">
            {/* Left Column: All Text */}
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4">Who Am I</span>
              <h3 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8">
                I&apos;m Nabil - I&apos;m a <br />
                <span className="text-gold">Nerd Translator</span>.
              </h3>
              <div className="text-lg text-secondary font-light leading-relaxed max-w-lg space-y-6">
                <p>
                  My unique ability to bridge the gap between <strong>technical complexity</strong> and <strong>creative vision</strong> allows me to translate these different languages (marketing, design, development) into &quot;business success&quot;.
                </p>
              </div>
            </div>

            {/* Right Column: Headshot */}
            <div className="order-1 md:order-2 flex justify-end items-end">
              <div className="relative h-[500px] w-full max-w-md rounded-lg overflow-hidden border border-gray-200 shadow-xl">
                <Image
                  src="/images/nabil-headshot.jpg"
                  alt="Nabil Pervez"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <BentoGrid />


        </div>
      </section>

      {/* Previous Clients - logo lockup */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">My Previous Clients</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Trusted by industry leaders.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/client-logos.webp"
            width={1116}
            height={569}
            loading="lazy"
            alt="Client logos: The Story Mob, Kraft Group, Team Liquid, Sansar, Paramount+, Red Bull, Sunspear Games, Overwatch League, OpTic Gaming, Oni Studios, Nerd Street Gamers, McCown Evans, LEGO, Houston Outlaws, Funny or Die, Freshcut, Flashpoint, FCFL, EVO, Ellevens, Cloud9, Call of Duty League, Axiomatic, Activision Blizzard"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* The Integration Section */}
      {/* 
      <section className="py-24 bg-background border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-6">The Intersection</span>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">The Integration</h3>

          <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-secondary">
            <p>
              &quot;The designers want art, the developers want efficiency, and the business wants ROI.
              Most projects fail at the intersection because of a failure to communicate expectations&quot;
            </p>
            <p className="font-medium text-foreground">
              I live at that intersection.
            </p>
            <p>
              I am the translator who ensures your creative vision survives the technical build, and your business goals aren&apos;t lost in the code. I make the complex simple, and the simple powerful.
            </p>
          </div>
        </div>
      </section>
      */}

      {/* Specializations Section */}
      <section className="py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4">My Core Skills</span>
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-foreground">What I Specialize In</h3>
          </div>

          <MobileAutoCarousel
            desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {specializations.map((spec, idx) => (
              <div key={idx} className="h-full group bg-white p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-[#FFF9EA] hover:border-gold/30 rounded-sm">
                <h4 className="text-xl font-display font-bold mb-4 group-hover:text-gold transition-colors">{spec.title}</h4>
                <p className="text-secondary text-sm leading-relaxed">{spec.description}</p>
              </div>
            ))}
          </MobileAutoCarousel>
        </div>
      </section>



      {/* Testimonials Section - Carousel */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col items-center text-center">
          <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4">What People Say</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Testimonials</h2>
        </div>

        {/* Full Width Carousel */}
        <div className="w-full">
          <div className="max-w-[1400px] mx-auto">
            {/* Actually BentoGrid is above, this is TestimonialCarousel */}
            <div className="mt-12">
              {/* Dynamic Import or direct usage if client component */}
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Moving Rows + View My Work Section */}
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
                  <video src={project.video} poster={project.image} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                  <video src={project.video} poster={project.image} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

    </div>
  );
}
