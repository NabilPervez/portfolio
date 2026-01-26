import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Nabil Pervez | Product Manager & Strategist",
  description: "Senior Product Manager, Strategist, and Designer specializing in gaming, esports, and digital innovation.",
  icons: {
    icon: '/logo.jpg',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
            // ... kept as is, but tool requires valid replacement. I'll replace the closing tag area.
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nabil Pervez",
              "url": "https://nabilpervez.com",
              "image": "https://nabilpervez.com/images/nabil-headshot.jpg",
              "jobTitle": "Product Manager",
              "worksFor": {
                "@type": "Organization",
                "name": "Nabil Pervez Consulting"
              },
              "sameAs": [
                "https://www.linkedin.com/in/nabilpervez/",
                "https://nabilpervezconsulting.com/",
                "https://www.behance.net/aoecreative"
              ]
            })
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
