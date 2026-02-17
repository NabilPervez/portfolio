
import SpeakerContent from "@/components/speaker/SpeakerContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speaker",
    description: "Book Nabil Pervez for keynotes on agile creativity, esports culture, and marketing strategy.",
    openGraph: {
        title: "Speaker | Nabil Pervez",
        description: "Keynotes on scaling creativity, understanding gamer culture, and bridging tech with marketing.",
        url: "https://nabilpervez.com/speaker",
    },
};

export default function SpeakerPage() {
    return <SpeakerContent />;
}
