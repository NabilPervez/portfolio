
import {
    Heart,
    Zap,
    BookOpen,
    Star,
    Activity,
    Map,
    Loader,
    Clock,
    Calendar,
    Gamepad2,
    Calculator,
    Link,
    HelpCircle
} from "lucide-react";
import React from "react";

export const apps = [
    {
        id: "kinkeep",
        name: "KinKeep",
        url: "https://kinkeepmarketing.netlify.app/",
        icon: React.createElement(Heart, { className: "w-8 h-8" }),
        bgColor: "#E11D48",
        height: 250
    },
    {
        id: "baraka-boost",
        name: "Baraka Boost",
        url: "https://barakaboostmarketing.netlify.app/",
        icon: React.createElement(Zap, { className: "w-8 h-8" }),
        bgColor: "#CA8A04",
        height: 300
    },
    {
        id: "muhasaba",
        name: "Muhasaba",
        url: "https://muhasabah.netlify.app/",
        icon: React.createElement(BookOpen, { className: "w-8 h-8" }),
        bgColor: "#16A34A",
        height: 280
    },
    {
        id: "learn-names-allah",
        name: "Learn The Names Of Allah",
        url: "https://learnthenamesofallah.netlify.app/",
        icon: React.createElement(Star, { className: "w-8 h-8" }),
        bgColor: "#2563EB",
        height: 260
    },
    {
        id: "ayah-echo",
        name: "Ayah Echo",
        url: "https://ayahecho.netlify.app/",
        icon: React.createElement(Activity, { className: "w-8 h-8" }),
        bgColor: "#7C3AED",
        height: 320
    },
    {
        id: "the-journey",
        name: "The Journey",
        url: "https://thejourneyhome.netlify.app/",
        icon: React.createElement(Map, { className: "w-8 h-8" }),
        bgColor: "#EA580C",
        height: 350
    },
    {
        id: "infinity-loader",
        name: "Infinity Loader",
        url: "https://infinity-loader.netlify.app/",
        icon: React.createElement(Loader, { className: "w-8 h-8" }),
        bgColor: "#475569",
        height: 240
    },
    {
        id: "podomo-power",
        name: "Podomo Power",
        url: "https://podomopower.netlify.app/",
        icon: React.createElement(Clock, { className: "w-8 h-8" }),
        bgColor: "#DC2626",
        height: 290
    },
    {
        id: "zaman-homepage",
        name: "Zaman Homepage",
        url: "https://zamanhomepage.netlify.app/",
        icon: React.createElement(Calendar, { className: "w-8 h-8" }),
        bgColor: "#0D9488",
        height: 310
    },
];

export const games = [
    {
        id: "hangman-survival",
        name: "Hangman Survival",
        url: "https://wheel-of-fortune-game.netlify.app/",
        icon: React.createElement(HelpCircle, { className: "w-8 h-8" }),
        bgColor: "#0891b2",
        height: 300
    },
    {
        id: "lexilink",
        name: "LexiLink",
        url: "https://lexilinkgame.netlify.app/",
        icon: React.createElement(Link, { className: "w-8 h-8" }),
        bgColor: "#4f46e5",
        height: 260
    },
    {
        id: "math-boat",
        name: "Math Boat",
        url: "https://math-boat.netlify.app/",
        icon: React.createElement(Calculator, { className: "w-8 h-8" }),
        bgColor: "#be123c",
        height: 280
    },
];
