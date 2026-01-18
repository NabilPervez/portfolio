"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white text-black border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-6 md:px-12 h-24 flex items-center justify-between">

                    {/* Logo / Brand Name */}
                    <Link href="/" className="text-lg font-display font-bold tracking-tighter hover:opacity-70 transition-opacity z-50 pointer-events-auto">
                        NABIL PERVEZ
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-12 pointer-events-auto">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
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
                        <Link
                            href="mailto:nabilpervezconsulting@gmail.com"
                            className="px-6 py-2 border border-white/30 rounded-full text-sm font-medium hover:bg-gold hover:text-white transition-all"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Menu Button - Using mix-blend-difference allows visible white text on both white/black backgrounds */}
                    <button
                        className="md:hidden z-50 p-2 pointer-events-auto"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, pointerEvents: "auto", y: 0 },
                    closed: { opacity: 0, pointerEvents: "none", y: "-100%" }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-40 bg-foreground text-background md:hidden flex flex-col justify-center items-center gap-10"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-display font-bold tracking-tight hover:text-gray-400 transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </motion.div>
        </>
    );
}
