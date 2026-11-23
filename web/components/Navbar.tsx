"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StaggeredMenu } from "./StaggeredMenu";
import "./Navbar.css";

const RESUME = "https://nabilpervez.github.io/resume/";
const CONTACT = "mailto:nabilpervezgg@gmail.com";

const navLinks: { name: string; href: string; target?: string }[] = [
    { name: "Work", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Speaking", href: "/speaker" },
    { name: "Resume", href: RESUME, target: "_blank" },
];

/**
 * Full-width header after the miguelrecio.es pattern:
 *  - top of page: transparent, wordmark logo, plain mono links
 *  - scrolled: compact translucent bar, links become divided cells, logo swaps to the N mark
 * Hover on any item fills gold with black text.
 */
export function Navbar() {
    const pathname = usePathname();
    const [compact, setCompact] = useState(false);

    useEffect(() => {
        let ticking = false;
        const update = () => { ticking = false; setCompact(window.scrollY > 40); };
        const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    return (
        <header className={`np-hdr${compact ? " is-compact" : ""}`}>
            <div className="np-row">
                <Link href="/" aria-label="Nabil Pervez, home" className="np-cell np-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="np-word" src="/images/nabil-pervez-wordmark.png" alt="Nabil Pervez" width={480} height={224} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="np-mark" src="/n-logo.png" alt="" aria-hidden="true" width={500} height={500} />
                </Link>

                <nav aria-label="Main" className="np-links">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                target={link.target}
                                rel={link.target ? "noopener" : undefined}
                                aria-current={isActive ? "page" : undefined}
                                className="np-cell np-link"
                            >
                                {link.name}{link.target === "_blank" && <span aria-hidden="true">&nbsp;↗</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="np-right">
                    <a className="np-cell np-pill" href="https://nabilpervezconsulting.com/" target="_blank" rel="noopener">
                        <i aria-hidden="true" /> Consulting ↗
                    </a>
                    <a className="np-cell np-book" href={CONTACT}>Let&apos;s talk</a>
                </div>

                {/* Phones and tablets: existing staggered sheet */}
                <div className="np-mobile">
                    <div className="np-mobile-layer">
                    <StaggeredMenu
                        position="right"
                        items={[
                            { label: "Home", ariaLabel: "Home", link: "/" },
                            { label: "Work", ariaLabel: "Work", link: "/portfolio" },
                            { label: "About", ariaLabel: "About", link: "/about" },
                            { label: "Products", ariaLabel: "Products", link: "/products" },
                            { label: "Speaking", ariaLabel: "Speaking", link: "/speaker" },
                            { label: "Resume", ariaLabel: "Resume", link: RESUME, target: "_blank" },
                        ]}
                        ctaItems={[{ label: "Let's talk", link: CONTACT }]}
                        socialItems={[
                            { label: "LinkedIn", link: "https://www.linkedin.com/in/perveznabil" },
                            { label: "GitHub", link: "https://github.com/NabilPervez" },
                            { label: "Behance", link: "https://www.behance.net/aoecreative" },
                            { label: "Google Play", link: "https://play.google.com/store/apps/dev?id=7829300357127754405" },
                        ]}
                        displaySocials
                        displayItemNumbering={true}
                        menuButtonColor="#111111"
                        openMenuButtonColor="#111111"
                        changeMenuColorOnOpen={true}
                        colors={['#C6A87C', '#F4F4F4']}
                        accentColor="#C6A87C"
                    />
                    </div>
                </div>
            </div>
        </header>
    );
}
