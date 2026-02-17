import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Bold weights for display
});

// --- SEO CONFIGURATION ---
const siteUrl = "https://nabilpervez.com";
const siteName = "Nabil Pervez";
const contactEmail = "nabilpervezconsulting@gmail.com";
const defaultTitle = "Nabil Pervez | Product Manager & Strategist";
const defaultDescription = "Senior Product Manager, Strategist, and Designer specializing in gaming, esports, and digital innovation. Helping businesses bridge the gap between technical complexity and creative vision.";
const ogImage = `${siteUrl}/images/nabil-headshot.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Product Manager", "Strategist", "Designer", "Gaming", "Esports",
    "Digital Innovation", "Nabil Pervez", "Consultant", "Brand Strategy",
    "Creative Direction", "Agile Leadership", "User Research"
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
  icons: {
    icon: '/favicon.png', // Ensure this exists in public/
    shortcut: '/favicon.ico', // Ensure this exists in public/
    apple: '/apple-touch-icon.png', // Ensure this exists in public/
  },
  manifest: '/site.webmanifest', // Ensure this exists in public/
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
        alt: "Nabil Pervez - Product Manager & Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
    creator: "@nabilpervez", // Update if specific handle exists
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

// --- STRUCTURED DATA (JSON-LD) ---
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
    name: "Nabil Pervez Consulting",
  },
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
    <html lang="en">
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
      <body className={`${inter.variable} ${syne.variable} antialiased font-sans bg-background text-foreground overflow-x-hidden selection:bg-black selection:text-white`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
