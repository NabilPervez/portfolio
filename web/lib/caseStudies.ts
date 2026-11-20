// Unified case-study data. AOE cases come from caseStudies.json (rich, chapter layout);
// everything else is adapted from the legacy projects.json so every slug renders in the same template.
import aoe from "@/app/data/caseStudies.json";
import legacy from "@/app/data/projects.json";

export type Tag = "Campaigns" | "Brand Identity" | "Experiential" | "Esports" | "Product & Web";
export const TAGS: Tag[] = ["Campaigns", "Brand Identity", "Experiential", "Esports", "Product & Web"];

export type Img = { src: string; alt: string; srcSet?: string; w?: number; h?: number };
export type Media = Img | { video: string; poster?: string; title: string; loop?: boolean; w?: number; h?: number } | { youtube: string; title: string } | { embed: string; title: string };
export type Stat = { value: string; label: string; note?: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  org?: string;
  year?: string;
  tags: Tag[];
  stat?: string;
  featured?: boolean;
  thumb: Img;
  role: string;
  task?: string;
  strategy: string[];
  design: string[];
  challenge: { heading: string[]; body: string; image?: Img | null };
  approach: { heading: string[]; bullets?: string[]; body?: string; image?: Img | null; gallery?: (Img | null)[] };
  work: { heading: string[]; blocks: { label: string; body: string }[]; media: Media[] };
  results: { heading: string[]; stats: Stat[]; notes: string[]; body?: string; image?: Img | null };
  extraImages?: string[];
  cardVideo?: string;
};

const LEGACY_TAGS: Record<string, Tag[]> = {
  "voyagers-of-nera": ["Brand Identity"], session: ["Campaigns"], "one-piece-x-cloud9": ["Esports", "Campaigns"],
  "mccown-evans": ["Product & Web"], "optic-gaming": ["Esports"], "stay-plugged-in": ["Campaigns"],
  "the-story-mob": ["Brand Identity"], redbull: ["Experiential"], metaview: ["Product & Web"], freshcut: ["Product & Web"],
  geekletes: ["Esports"], fcfl: ["Brand Identity"], "a-kon": ["Experiential"], "aoe-creative-website": ["Product & Web"],
  "nerd-street-gamers-brand": ["Brand Identity", "Esports"], "blast-radius": ["Esports"], "world-series-of-warzone": ["Esports", "Experiential"],
  ellevens: ["Brand Identity"], "boston-breach": ["Esports", "Brand Identity"], "pvp-live": ["Product & Web"], "igda-dallas": ["Experiential"],
  "aoe-creative": ["Brand Identity"], "evolution-championship-series": ["Experiential", "Esports"],
  "overwatch-league-in-game-sprays": ["Esports", "Brand Identity"], fancurve: ["Product & Web"], alloy: ["Product & Web"],
  "tourney-locator": ["Product & Web"], newbreed: ["Brand Identity", "Campaigns"], "oxg-esports": ["Brand Identity", "Esports"],
  "immortal-gates-of-pyre-logo-faction-icons": ["Brand Identity"], "immortal-gates-of-pyre-lorebook-videos": ["Campaigns"],
  "immortal-gates-of-pyre-kickstarter": ["Campaigns"], "immortal-gates-of-pyre-ui-producing": ["Product & Web"],
  "immortal-gates-of-pyre-video-producing": ["Campaigns"], "immortal-gates-of-pyre-web-development": ["Product & Web"],
};

// Legacy sub-pages that should borrow video from a richer AOE case.
const BORROW_MEDIA: Record<string, string> = {
  "immortal-gates-of-pyre-lorebook-videos": "immortal-gates-of-pyre",
  "immortal-gates-of-pyre-video-producing": "immortal-gates-of-pyre",
  "overwatch-league-in-game-sprays": "overwatch-league",
};

// Legacy pages with an Adobe-hosted Behance video.
const EMBEDS: Record<string, Media> = {
  newbreed: { embed: "https://www-ccv.adobe.io/v1/player/ccv/DL73Ia7W3B6/embed", title: "NEWBREED launch video" },
  "oxg-esports": { embed: "https://www-ccv.adobe.io/v1/player/ccv/PwvfuEC3mvI/embed", title: "Oxygen Esports video" },
};

const strip = (s?: string) => (s ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const sentences = (s: string) => s.match(/[^.!?]+[.!?]+/g)?.map((x) => x.trim()) ?? (s ? [s] : []);

const rich = aoe as unknown as CaseStudy[];
const richSlugs = new Set(rich.map((c) => c.slug));

type LegacyProject = { slug: string; title: string; image: string; heroImage?: string; images?: string[]; content: { scope?: string; challenge?: string; solution?: string; outcome?: string } };

function adapt(p: LegacyProject): CaseStudy {
  const name = p.title.replace(/\s+-\s+/, ": ").replace(/\s{2,}/g, " & ");
  const solution = strip(p.content.solution);
  const borrowed = BORROW_MEDIA[p.slug] ? rich.find((c) => c.slug === BORROW_MEDIA[p.slug])?.work.media ?? [] : [];
  return {
    slug: p.slug,
    title: name,
    client: name.split(":")[0],
    tags: LEGACY_TAGS[p.slug] ?? ["Brand Identity"],
    thumb: { src: p.heroImage || p.image, alt: name },
    role: strip(p.content.scope),
    strategy: [],
    design: [],
    challenge: { heading: ["The", "Challenge"], body: strip(p.content.challenge) },
    approach: { heading: ["The", "Approach"], bullets: sentences(solution) },
    work: { heading: ["The", "Work"], blocks: [], media: EMBEDS[p.slug] ? [EMBEDS[p.slug]] : borrowed },
    results: { heading: ["The", "Outcome"], stats: [], notes: [], body: strip(p.content.outcome) },
    cardVideo: BORROW_MEDIA[p.slug]?.startsWith("immortal") ? rich.find((c) => c.slug === "immortal-gates-of-pyre")?.cardVideo : undefined,
    extraImages: (p.images ?? []).filter((i) => i !== (p.heroImage || p.image)),
  };
}

export const caseStudies: CaseStudy[] = [
  ...rich,
  ...(legacy as LegacyProject[]).filter((p) => !richSlugs.has(p.slug)).map(adapt),
];

export const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const isImg = (m: Media): m is Img => "src" in m;
