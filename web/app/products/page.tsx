"use client";

import { FadeIn } from "@/components/FadeIn";
import Link from "next/link";
import Masonry from "@/components/Masonry";
import productsData from "../data/products.json";
import {
    Heart,
    Zap,
    BookOpen,
    Star,
    Activity,
    Map,
    Loader,
    Clock,
    Calendar,
    HelpCircle,
    Link as LinkIcon,
    Calculator
} from "lucide-react";
import React from "react";

// Helper to map icon names to components
const IconMap: { [key: string]: React.ElementType } = {
    "Heart": Heart,
    "Zap": Zap,
    "BookOpen": BookOpen,
    "Star": Star,
    "Activity": Activity,
    "Map": Map,
    "Loader": Loader,
    "Clock": Clock,
    "Calendar": Calendar,
    "HelpCircle": HelpCircle,
    "LinkIcon": LinkIcon,
    "Calculator": Calculator
};

export default function ProductsPage() {
    // Transform data to include React Nodes for icons
    const items = productsData.map(item => {
        const IconComponent = IconMap[item.iconName] || HelpCircle;
        return {
            ...item,
            icon: <IconComponent className="w-8 h-8" />
        };
    });

    return (
        <FadeIn className="pt-32 pb-24 px-6 md:px-12 max-w-8xl mx-auto">
            <div className="mb-24">
                <span className="block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4">My Products</span>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[0.9] mb-8">
                    SaaS & <br />
                    <span className="text-gold">Digital Tools</span>.
                </h1>
                <p className="text-xl text-secondary font-light max-w-2xl leading-relaxed">
                    A collection of digital products, apps, and tools I&apos;ve built to solve problems, enhance spirituality, and boost productivity.
                </p>
            </div>

            <div className="w-full">
                <Masonry items={items} scaleOnHover={true} />
            </div>

            <div className="mt-24 text-center">
                <p className="text-secondary mb-8">Want to build something together?</p>
                <Link
                    href="mailto:nabilpervezconsulting@gmail.com"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-white rounded-full font-medium transition-all hover:bg-gold hover:text-white"
                >
                    Let&apos;s Talk Product
                </Link>
            </div>
        </FadeIn>
    );
}
