"use client";

import NavbarSpacer from "@/components/NavbarSpacer";
import Masonry from "@/components/Masonry";
import { apps } from "@/app/data/apps_and_games";
import { Navbar } from "@/components/Navbar";

export default function AppsPage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <NavbarSpacer />

            <div className="container mx-auto px-6 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Apps</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A collection of useful applications and tools I've built.
                    </p>
                </header>

                <Masonry
                    items={apps}
                    scaleOnHover={true}
                    hoverScale={1.05}
                    blurToFocus={true}
                />
            </div>
        </main>
    );
}
