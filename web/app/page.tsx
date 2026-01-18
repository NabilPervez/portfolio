"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import clientsData from "./data/clients.json";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";

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
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Split clients into two rows
  const midPoint = Math.ceil(clientsData.length / 2);
  const row1 = clientsData.slice(0, midPoint);
  const row2 = clientsData.slice(midPoint);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden bg-background">
        {/* Parallax Background Text */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <h1 className="text-[15vw] md:text-[20vw] font-display font-bold text-gray-100 uppercase tracking-tighter whitespace-nowrap">
            VISIONARY
          </h1>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          >
            <div className="md:col-span-8">
              <motion.p variants={fadeInUp as any} className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 text-gold">
                Strategist &middot; Product &middot; Branding
              </motion.p>
              <motion.h2 variants={fadeInUp as any} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] text-foreground mb-8">
                I create <br />
                <span className="text-gold">digital solutions</span> <br />
                through innovating.
              </motion.h2>

              <motion.p variants={fadeInUp as any} className="text-lg md:text-xl text-secondary max-w-xl leading-relaxed mb-10">
                Accomplished product manager - specialized in branding.<br />
                Honored with multiple awards and boasting over a decade of expertise.
              </motion.p>

              <motion.div variants={fadeInUp as any} className="flex flex-wrap gap-4">
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-foreground text-white rounded-full text-lg font-medium tracking-wide transition-all hover:bg-gold hover:text-white"
                >
                  View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 px-10 py-5 border border-gray-300 rounded-full text-lg font-medium tracking-wide transition-all hover:border-foreground hover:bg-transparent"
                >
                  About Me
                </Link>
              </motion.div>
            </div>

            {/* Headshot in Hero */}
            <div className="hidden md:block md:col-span-4 relative h-[600px] w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="absolute inset-0 bg-gray-100 rounded-sm overflow-hidden"
              >
                <Image
                  src="/images/nabil-headshot.jpg"
                  alt="Nabil Pervez"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section Below Hero */}
      <section className="bg-black py-0">
        <div className="w-full h-[600px] relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-80"
            src="https://aoecreative.com/uploads/homepage.webm"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>

      {/* Nerd Translator Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[1.1]">
                I&apos;m Nabil - I&apos;m a <br />
                <span className="text-gold">Nerd Translator</span>.
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-xl text-secondary font-light leading-relaxed">
                I&apos;ve led teams of designers, marketers, and developers to create award-winning marketing campaigns, memorable brands, and enjoyable video games.
              </p>
              <p className="text-secondary leading-relaxed">
                My unique ability to bridge the gap between technical complexity and creative vision allows me to translate "nerd" into "business success".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4">My Core Skills</span>
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-foreground">What I Specialize In</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, idx) => (
              <div key={idx} className="group bg-white p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-[#FFF9EA] hover:border-gold/30">
                <h4 className="text-xl font-display font-bold mb-4 group-hover:text-gold transition-colors">{spec.title}</h4>
                <p className="text-secondary text-sm leading-relaxed">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Static Client Grid - Promo Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">My Previous Clients</h2>
            <p className="text-secondary max-w-2xl mx-auto">Trusted by industry leaders.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {clientsData.slice(0, 8).map((client, i) => (
              <div key={i} className="group bg-gray-50 border border-gray-100 aspect-[3/2] flex flex-col items-center justify-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="relative w-full h-12 mb-4">
                  <ImageWithFallback
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-foreground transition-colors">{client.name}</span>
              </div>
            ))}
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
        <div className="flex overflow-hidden mb-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 60, repeat: Infinity }}
          >
            {[...row1, ...row1, ...row1, ...row1].map((client, i) => (
              <div key={`row1-${i}`} className="relative w-[300px] h-[200px] flex-shrink-0 bg-white border border-gray-100 rounded-sm overflow-hidden group shadow-sm">
                <ImageWithFallback
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="flex overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="flex gap-6 px-6"
            initial={{ x: "-50%" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 60, repeat: Infinity }}
          >
            {[...row2, ...row2, ...row2, ...row2].map((client, i) => (
              <div key={`row2-${i}`} className="relative w-[300px] h-[200px] flex-shrink-0 bg-white border border-gray-100 rounded-sm overflow-hidden group shadow-sm">
                <ImageWithFallback
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
