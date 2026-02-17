<script setup lang="ts">
import { useHead } from "@vueuse/head";

// --- 1. CONFIGURATION (Edit these for each project) ---
const siteUrl = "https://example.com"; // Your live domain (No trailing slash)
const siteName = "Your Brand Name";
const contactEmail = "hello@example.com";

// Legal / Organization Details (Good for Google Trust)
const legalEntityName = "YOUR ENTITY LTD";
const legalEntityNumber = "00000000"; // Registration number
const legalJurisdiction = "US"; // e.g., "England & Wales", "Delaware"

// SEO Defaults
const defaultTitle = "Your Brand | Primary Keyword";
const defaultDescription =
  "A concise, compelling description of your business (150-160 characters) that encourages clicks from search results.";
const defaultKeywords =
  "keyword 1, keyword 2, industry term, location, service name";

// Assets (Ensure these exist in your /public folder)
const themeColor = "#000000"; // Browser toolbar color (mobile)
const ogImage = `${siteUrl}/og.jpg`; // Social share image (1200x630px recommended)
const logoUrl = `${siteUrl}/logo.png`; // Logo for Schema (512x512px recommended)

// --- 2. STRUCTURED DATA (JSON-LD) ---

// Organization Schema (General for any business)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization", // Generalized from 'VideoGameDeveloper'
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: logoUrl,
  description: defaultDescription,
  email: contactEmail,
  // Parent Entity (Optional - remove if not a registered company)
  parentOrganization: {
    "@type": "Organization",
    "@id": `${siteUrl}/#legal-entity`,
    name: legalEntityName,
    identifier: [
      { "@type": "PropertyValue", name: "Company Number", value: legalEntityNumber },
      { "@type": "PropertyValue", name: "Jurisdiction", value: legalJurisdiction },
    ],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contactEmail,
      availableLanguage: ["en"],
    },
  ],
  // Social Profiles (Add/Remove as needed)
  sameAs: [
    "https://www.linkedin.com/company/yourhandle",
    "https://www.twitter.com/yourhandle",
    "https://www.instagram.com/yourhandle",
    "https://www.facebook.com/yourhandle",
  ],
};

// Website Schema (Helps Google understand site structure)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#organization` },
};

// --- 3. INJECT HEAD TAGS ---
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

    // FontAwesome (Comment out if not using)
    // {
    //   rel: "stylesheet",
    //   href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
    // },

    // Favicons - Ensure these files exist in /public
    { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  // Inject JSON-LD Scripts
  script: [
    {
      type: "application/ld+json",
      id: "jsonld-structured-data",
      children: JSON.stringify([organizationJsonLd, websiteJsonLd]),
    },
  ],
});
</script>

<template>
  <!-- If using Vue Router -->
  <router-view />

  <!-- If NOT using Vue Router, replace with your layout component -->
  <!-- <MainLayout /> -->
</template>
