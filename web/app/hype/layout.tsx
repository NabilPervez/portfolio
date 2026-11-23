import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/hype", "Hype Reel", "Studio work from AOE Creative for OpTic Gaming, LEGO, Nerd Street Gamers and more.");

export default function HypeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
