// Colophon footer (Quiet Precision): asymmetric grid, brand column carries the weight. Nabil, 2026-11-21.
import Link from "next/link";

const col = "text-[13px] font-medium uppercase tracking-[.16em] text-white/45 mb-4";
const link = "block text-[14px] text-white/75 hover:text-white py-1";

export function Footer() {
    return (
        <footer className="bg-midnight text-white">
            <div className="mx-auto max-w-[1200px] px-[clamp(16px,5vw,64px)] py-16 grid gap-10 md:grid-cols-[2.4fr_1fr_1fr_1.4fr]">
                <div className="min-w-0">
                    <p className="text-[22px] font-semibold tracking-[-0.027em]">Nabil Pervez.</p>
                    <p className="text-[14px] text-white/60 mt-2 max-w-[34ch]">I make complex things simple. Dallas–Fort Worth.</p>
                    <p className="text-[13px] text-white/45 mt-6">
                        I also run <a className="text-gold hover:text-white" href="https://nabilpervezconsulting.com/" target="_blank">Nabil Pervez Consulting</a> for client work.
                    </p>
                </div>
                <div>
                    <p className={col}>Navigate</p>
                    <Link className={link} href="/portfolio">Work</Link>
                    <Link className={link} href="/about">About</Link>
                    <Link className={link} href="/speaker">Speaking</Link>
                </div>
                <div>
                    <p className={col}>Elsewhere</p>
                    <a className={link} href="https://www.linkedin.com/in/perveznabil" target="_blank">LinkedIn</a>
                    <a className={link} href="https://github.com/NabilPervez" target="_blank">GitHub</a>
                    <a className={link} href="https://www.behance.net/aoecreative" target="_blank">Behance</a>
                </div>
                <div>
                    <p className={col}>Contact</p>
                    <a className={link} href="mailto:nabilpervezgg@gmail.com">nabilpervezgg@gmail.com</a>
                    <a className={link} href="https://nabilpervez.github.io/resume/" target="_blank">Resume</a>
                </div>
            </div>
            <div className="border-t border-white/10">
                <p className="mx-auto max-w-[1200px] px-[clamp(16px,5vw,64px)] py-6 text-[13px] text-white/40">© {new Date().getFullYear()} Nabil Pervez</p>
            </div>
        </footer>
    );
}
