
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "A showcase of selected works in product management, branding, and digital strategy.",
    openGraph: {
        title: "Portfolio | Nabil Pervez",
        description: "Explore my work in product strategy, branding, and digital innovation.",
        url: "https://nabilpervez.com/portfolio",
    },
};

export default function PortfolioPage() {
    return <PortfolioContent />;
}
