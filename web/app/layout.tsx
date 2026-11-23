import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Quiet Precision: one family, three weights with fixed jobs (600 display, 500 UI, 400 prose).
// Self-hosted (no third-party calls on load).
const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    { path: "./fonts/outfit-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/outfit-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/outfit-latin-600-normal.woff2", weight: "600" },
  ],
});

// --- SEO CONFIGURATION ---
const siteUrl = "https://nabilpervez.com";
const siteName = "Nabil Pervez";
const contactEmail = "nabilpervezconsulting@gmail.com";
const defaultTitle = "Nabil Pervez | Product Manager, Scrum Master & AI SME";
const defaultDescription = "Product manager, scrum master and AI SME in Dallas–Fort Worth. Former CTO of AOE Creative, shipping work for Riot Games, LEGO and Coca-Cola.";
const ogImage = `${siteUrl}/images/og.jpg`; // 1200x630
const headshot = `${siteUrl}/images/nabil-headshot.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Nabil Pervez", "Product Manager", "Scrum Master", "AI SME", "AI Product Manager",
    "Enterprise AI adoption", "Gradial", "Adobe Experience Manager", "MarTech",
    "AOE Creative", "Agency CTO", "Esports agency", "Dallas product manager"
  ],
  authors: [{ name: "Nabil Pervez", url: siteUrl }],
  creator: "Nabil Pervez",
  publisher: "Nabil Pervez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/n-logo.png', apple: '/n-logo.png' },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Nabil Pervez, Product Manager, Scrum Master & AI SME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F2A20",
};

// --- STRUCTURED DATA (JSON-LD) ---
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteName,
  url: siteUrl,
  image: headshot,
  jobTitle: "Product Manager, Scrum Master & AI SME",
  worksFor: {
    "@type": "Organization",
    name: "Nabil Pervez Consulting",
    url: "https://nabilpervezconsulting.com/",
  },
  address: { "@type": "PostalAddress", addressLocality: "Dallas–Fort Worth", addressRegion: "TX", addressCountry: "US" },
  alumniOf: { "@type": "Organization", name: "AOE Creative" },
  knowsAbout: ["Product management", "Scrum", "Enterprise AI adoption", "Adobe Experience Manager", "Gradial", "MarTech"],
  sameAs: [
    "https://www.linkedin.com/in/perveznabil/",
    "https://nabilpervezconsulting.com/",
    "https://www.behance.net/aoecreative",
  ],
  description: defaultDescription,
  email: contactEmail,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EMBSNPSZCT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EMBSNPSZCT');
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} antialiased font-sans bg-background text-foreground overflow-x-hidden selection:bg-g2 selection:text-foreground`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
