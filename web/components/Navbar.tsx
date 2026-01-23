"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import StarBorder from "./StarBorder";
import { StaggeredMenu } from "./StaggeredMenu";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Products", href: "/products" },
    {
        name: "Apps",
        href: "#",
        dropdown: [
            { name: "KinKeep", href: "https://kinkeepmarketing.netlify.app/" },
            { name: "Baraka Boost", href: "/apps/barakaboost" },
            { name: "Muhasaba", href: "/apps/muhasaba" },
            { name: "Learn The Names Of Allah", href: "/apps/learnthenamesofallah" },
            { name: "Ayah Echo", href: "/apps/ayah-echo" },
            { name: "The Journey", href: "/apps/the-journey" },
            { name: "Infinity Loader", href: "https://infinity-loader.netlify.app/" },
            { name: "Podomo Power", href: "https://podomopower.netlify.app/" },
            { name: "Zaman Homepage", href: "https://zamanhomepage.netlify.app/" },
        ]
    },
    {
        name: "Games",
        href: "#",
        dropdown: [
            { name: "Hangman Survival", href: "/games/hangman-survival" },
            { name: "LexiLink", href: "/games/lexilink" },
            { name: "Math Boat", href: "/games/math-boat" },
        ]
    }
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-white text-black border-gray-100"
                        : "bg-transparent text-white border-transparent"
                )}
            >
                <div className="mx-auto max-w-7xl px-6 md:px-12 h-24 flex items-center justify-between">

                    {/* Logo / Brand Name */}
                    <Link href="/" className="text-lg font-display font-bold tracking-tighter hover:opacity-70 transition-opacity z-50 pointer-events-auto">
                        NABIL PERVEZ
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12 pointer-events-auto">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            if (link.dropdown) {
                                return (
                                    <div key={link.name} className="relative group">
                                        <button className={cn(
                                            "flex items-center gap-1 text-sm font-medium tracking-wide transition-all duration-300 opacity-70 hover:opacity-100 hover:text-gold",
                                            isScrolled ? "text-black" : "text-white"
                                        )}>
                                            {link.name}
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px]">
                                            <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl shadow-xl p-2 flex flex-col gap-1">
                                                {link.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        target={subItem.href.startsWith('http') ? "_blank" : "_self"}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gold rounded-lg transition-colors whitespace-nowrap text-left"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium tracking-wide transition-all duration-300 relative group",
                                        isActive ? "text-gold" : "opacity-70 hover:opacity-100 hover:text-gold"
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300",
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    )} />
                                </Link>
                            );
                        })}
                        <div className="flex items-center gap-4">
                            {/* Social Icons */}
                            <Link href="https://www.linkedin.com/in/perveznabil" target="_blank" className="hover:text-gold transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </Link>
                            <Link href="https://github.com/NabilPervez" target="_blank" className="hover:text-gold transition-colors mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            </Link>
                            <Link href="https://www.behance.net/aoecreative" target="_blank" className="hover:text-gold transition-colors mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-presentation"><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="M7 21h10" /></svg>
                            </Link>

                            <Link
                                href="https://nabilpervezconsulting.com/"
                                target="_blank"
                                className="px-6 py-2 border border-current rounded-full text-sm font-medium hover:bg-gold hover:text-white transition-all hover:border-gold"
                            >
                                Consulting
                            </Link>
                            <Link
                                href="mailto:nabilpervezconsulting@gmail.com"
                                className="px-6 py-2 border border-current rounded-full text-sm font-medium hover:bg-gold hover:text-white transition-all hover:border-gold"
                            >
                                Contact
                            </Link>
                            <StarBorder
                                as={Link}
                                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0kZar29aYDXn9vfvL2JZVskJndufzirA6liCU2CDAtOy8WH6iAmvJj_05lGjat4NuH2U-QO_4-"
                                target="_blank"
                                color="cyan"
                                speed="5s"
                            >
                                Book Me
                            </StarBorder>
                        </div>
                    </nav>


                    {/* Mobile Menu - StaggeredMenu */}
                    <div className="md:hidden z-[60] fixed top-0 right-0 w-full h-full pointer-events-none">
                        <div className="h-full pointer-events-none">
                            <StaggeredMenu
                                position="right"
                                items={[
                                    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
                                    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
                                    { label: 'Portfolio', ariaLabel: 'View our portfolio', link: '/portfolio' },
                                    { label: 'Products', ariaLabel: 'View our products', link: '/products' },
                                    { label: 'Apps', ariaLabel: 'Apps section', link: '#' },
                                    { label: 'KinKeep', ariaLabel: 'KinKeep App', link: 'https://kinkeepmarketing.netlify.app/' },
                                    { label: 'Baraka Boost', ariaLabel: 'Baraka Boost App', link: '/apps/barakaboost' },
                                    { label: 'Muhasaba', ariaLabel: 'Muhasaba App', link: '/apps/muhasaba' },
                                    { label: 'Names Of Allah', ariaLabel: 'Learn Names Of Allah', link: '/apps/learnthenamesofallah' },
                                    { label: 'Ayah Echo', ariaLabel: 'Ayah Echo App', link: '/apps/ayah-echo' },
                                    { label: 'The Journey', ariaLabel: 'The Journey App', link: '/apps/the-journey' },
                                    { label: 'Infinity Loader', ariaLabel: 'Infinity Loader', link: 'https://infinity-loader.netlify.app/' },
                                    { label: 'Podomo Power', ariaLabel: 'Podomo Power', link: 'https://podomopower.netlify.app/' },
                                    { label: 'Zaman HP', ariaLabel: 'Zaman Homepage', link: 'https://zamanhomepage.netlify.app/' },
                                    { label: 'Games', ariaLabel: 'Games section', link: '#' },
                                    { label: 'Hangman', ariaLabel: 'Hangman Survival', link: '/games/hangman-survival' },
                                    { label: 'LexiLink', ariaLabel: 'LexiLink Game', link: '/games/lexilink' },
                                    { label: 'Math Boat', ariaLabel: 'Math Boat Game', link: '/games/math-boat' }
                                ]}
                                socialItems={[
                                    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/perveznabil' },
                                    { label: 'GitHub', link: 'https://github.com/NabilPervez' },
                                    { label: 'Behance', link: 'https://www.behance.net/aoecreative' }
                                ]}
                                displaySocials
                                displayItemNumbering={true}
                                menuButtonColor={isScrolled ? "#000000" : "#ffffff"}
                                openMenuButtonColor="#000000"
                                changeMenuColorOnOpen={true}
                                colors={['#FFD700', '#FFFFFF']} // Gold and White
                                accentColor="#FFD700"
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
