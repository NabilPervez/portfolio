<script setup lang="ts">
import { useHead } from "@vueuse/head";

// --- 1. CONFIGURATION (Edit these for each project) ---
const siteUrl = "https://nabilpervez.com"; // Your live domain (No trailing slash)
const siteName = "Nabil Pervez";
const contactEmail = "nabilpervezconsulting@gmail.com";

// Legal / Organization Details (Good for Google Trust)
const legalEntityName = "Nabil Pervez Consulting";
const legalEntityNumber = ""; // Registration number (Optional/Not found)
const legalJurisdiction = "US"; // e.g., "England & Wales", "Delaware"

// SEO Defaults
const defaultTitle = "Nabil Pervez | Product Manager & Strategist";
const defaultDescription =
  "Senior Product Manager, Strategist, and Designer specializing in gaming, esports, and digital innovation. Helping businesses bridge the gap between technical complexity and creative vision.";
const defaultKeywords =
  "Product Manager, Strategist, Designer, Gaming, Esports, Digital Innovation, Nabil Pervez, Consultant, Brand Strategy, Creative Direction";

// Assets (Ensure these exist in your /public folder)
const themeColor = "#000000"; // Browser toolbar color (mobile)
const ogImage = `${siteUrl}/images/nabil-headshot.jpg`; // Social share image
const logoUrl = `${siteUrl}/logo.jpg`; // Logo for Schema

// --- 2. STRUCTURED DATA (JSON-LD) ---

// Person Schema (More relevant for a personal portfolio)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteName,
  url: siteUrl,
  image: ogImage,
  jobTitle: "Product Manager & Strategist",
  worksFor: {
    "@type": "Organization",
    name: legalEntityName,
  },
  sameAs: [
    "https://www.linkedin.com/in/nabilpervez/",
    "https://nabilpervezconsulting.com/",
    "https://www.behance.net/aoecreative",
  ],
  description: defaultDescription,
  email: contactEmail,
};

// Website Schema (Helps Google understand site structure)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#person` },
};

// --- 3. INJECT HEAD TAGS ---
// Note: In Next.js App Router, this is done via export const metadata and layout.tsx
// This file serves as the specificaton source of truth.

/*
useHead({
  title: defaultTitle,
  htmlAttrs: { lang: "en" },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: themeColor },

    { name: "description", content: defaultDescription },
    { name: "keywords", content: defaultKeywords },

    { name: "robots", content: "index,follow" },
    {
      name: "googlebot",
      content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    },

    // Open Graph (Facebook, LinkedIn, Discord)
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: siteName },
    { property: "og:url", content: siteUrl },
    { property: "og:title", content: defaultTitle },
    { property: "og:description", content: defaultDescription },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: defaultTitle },
    { name: "twitter:description", content: defaultDescription },
    { name: "twitter:image", content: ogImage },

    { name: "format-detection", content: "telephone=no,address=no,email=no" },
  ],
  link: [
    { rel: "canonical", href: siteUrl },
    { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon.png" }, // Adjusted based on file existence
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }, // Assuming exists or generic
    { rel: "shortcut icon", href: "/favicon.ico" }, // Assuming exists
  ],
  // Inject JSON-LD Scripts
  script: [
    {
      type: "application/ld+json",
      id: "jsonld-structured-data",
      children: JSON.stringify([personJsonLd, websiteJsonLd]),
    },
  ],
});
*/
</script>
