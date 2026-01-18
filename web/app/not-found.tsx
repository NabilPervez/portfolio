import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export default function NotFound() {
    return (
        <FadeIn className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-9xl font-display font-bold text-gold mb-4">404</h1>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">Object Not Found</h2>
            <p className="text-secondary text-lg max-w-md mb-12">
                Usually this happens when valid input yields an unexpected null result. In human terms: this page doesn&apos;t exist.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
                <Link
                    href="/"
                    className="px-8 py-3 bg-foreground text-white rounded-full font-medium hover:bg-gold transition-colors"
                >
                    Return Home
                </Link>
                <Link
                    href="/portfolio"
                    className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                    View Portfolio
                </Link>
            </div>
        </FadeIn>
    );
}
