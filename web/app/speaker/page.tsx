
import { pageMeta } from "@/lib/seo";
import SpeakerContent from "@/components/speaker/SpeakerContent";
import { Metadata } from "next";

export const metadata: Metadata = pageMeta("/speaker", "Speaker", "Book Nabil Pervez for keynotes on agile creativity, esports and gamer culture, AI adoption and marketing strategy.");

export default function SpeakerPage() {
    return <SpeakerContent />;
}
