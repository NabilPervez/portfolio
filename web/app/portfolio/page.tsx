
import { pageMeta } from "@/lib/seo";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { Metadata } from "next";

export const metadata: Metadata = pageMeta("/portfolio", "Portfolio", "Case studies in product management, brand and digital strategy for Riot Games, Activision Blizzard, LEGO, Coca-Cola and more.");

export default function PortfolioPage() {
    return <PortfolioContent />;
}
