"use client";

// Nabil, 2026-11-21: nav cut from 9 items to 4 + one CTA (Quiet Precision: logo · centred links · one CTA).
// Consulting / Products / Book Me move to the agency brand. Transparent over the dark hero, frosted white after scroll.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { StaggeredMenu } from "./StaggeredMenu";

const RESUME = "https://nabilpervez.github.io/resume/";
const CONTACT = "mailto:nabilpervezgg@gmail.com";

const navLinks: { name: string; href: string; target?: string }[] = [
    { name: "Work", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Speaking", href: "/speaker" },
    { name: "Resume", href: RESUME, target: "_blank" },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const onDark = pathname === "/" && !scrolled;

    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 40);
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 border-b transition-colors duration-500",
                onDark ? "bg-transparent border-transparent text-white" : "bg-white/85 backdrop-blur-xl border-hair text-foreground"
            )}
        >
            <div className="mx-auto max-w-[1200px] px-[clamp(16px,5vw,64px)] h-[72px] grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">
                <Link href="/" className="text-[16px] font-semibold tracking-[-0.02em] min-w-0">
                    Nabil Pervez
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((l) => {
                        const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                target={l.target}
                                className={cn(
                                    "text-[14px] font-medium transition-opacity",
                                    active ? "opacity-100" : "opacity-60 hover:opacity-100"
                                )}
                            >
                                {l.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:flex justify-end">
                    <a
                        href={CONTACT}
                        className={cn(
                            "inline-flex items-center h-10 px-5 rounded-full text-[14px] font-medium transition-colors active:scale-[.97]",
                            "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-g4",
                            onDark ? "bg-white text-g5 hover:bg-g1" : "bg-g4 text-white hover:bg-g5"
                        )}
                    >
                        Let&apos;s talk
                    </a>
                </div>

                <div className="md:hidden z-[60] fixed top-0 right-0 w-full h-full pointer-events-none">
                    <StaggeredMenu
                        position="right"
                        items={[
                            { label: "Home", ariaLabel: "Home", link: "/" },
                            { label: "Work", ariaLabel: "Work", link: "/portfolio" },
                            { label: "About", ariaLabel: "About", link: "/about" },
                            { label: "Speaking", ariaLabel: "Speaking", link: "/speaker" },
                            { label: "Personal Branding", ariaLabel: "Personal branding", link: "/personal-branding" },
                            { label: "Career", ariaLabel: "Career consulting", link: "/career-consulting" },
                            { label: "Resume", ariaLabel: "Resume", link: RESUME, target: "_blank" },
                        ]}
                        ctaItems={[{ label: "Let's talk", link: CONTACT }, { label: "NPC", link: "https://nabilpervezconsulting.com/", target: "_blank" }]}
                        socialItems={[
                            { label: "LinkedIn", link: "https://www.linkedin.com/in/perveznabil" },
                            { label: "GitHub", link: "https://github.com/NabilPervez" },
                            { label: "Behance", link: "https://www.behance.net/aoecreative" },
                        ]}
                        displaySocials
                        displayItemNumbering
                        menuButtonColor={onDark ? "#ffffff" : "#0F1A15"}
                        openMenuButtonColor="#0F1A15"
                        changeMenuColorOnOpen
                        colors={["#C5DFD0", "#FFFFFF"]}
                        accentColor="#1F6B4A"
                    />
                </div>
            </div>
        </header>
    );
}
