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
  title: "NABIL PERVEZ | Strategist & Designer",
  description: "Senior Frontend Architect and UI/UX Designer.",
  icons: {
    icon: '/logo.jpg',
  },
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
