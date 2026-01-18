"use client";

import { FadeIn } from "@/components/FadeIn";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import productsData from "../data/products.json";

export default function ProductsPage() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsData.map((prod) => (
                    <Link
                        key={prod.id}
                        href={prod.url}
                        target="_blank"
                        className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                        {/* Image Area - Placeholder or Actual if available */}
                        <div className="relative h-64 bg-gray-50 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
                                {/* Fallback visual if image fails or is placeholder */}
                                <span className="text-4xl font-display font-bold opacity-20">{prod.title[0]}</span>
                            </div>
                            <ImageWithFallback
                                src={prod.image || "/images/placeholder-product.jpg"} // Ensure you handle this fallback
                                alt={prod.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <ExternalLink className="w-4 h-4 text-foreground" />
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                                {prod.title}
                            </h3>
                            <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                {prod.description}
                            </p>

                            <div className="flex items-center gap-2 text-gold font-medium text-sm tracking-wide uppercase group-hover:gap-4 transition-all">
                                Visit Site <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                ))}
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
