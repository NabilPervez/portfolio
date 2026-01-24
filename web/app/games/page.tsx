"use client";

import NavbarSpacer from "@/components/NavbarSpacer";
import Masonry from "@/components/Masonry";
import { games } from "@/app/data/apps_and_games";
import { Navbar } from "@/components/Navbar";

export default function GamesPage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <NavbarSpacer />

            <div className="container mx-auto px-6 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Games</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Interactive games and playful experiments.
                    </p>
                </header>

                <Masonry
                    items={games}
                    scaleOnHover={true}
                    hoverScale={1.05}
                    blurToFocus={true}
                />
            </div>
        </main>
    );
}
