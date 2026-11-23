
import ProductsContent from "@/components/products/ProductsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Apps and games built and shipped by Nabil Pervez: Halal Passport, Lift More, Chess Roguelite, Pile Up Poker, Iqra, Noor and more. Available on Google Play.",
    alternates: { canonical: "/products" },
    openGraph: {
        title: "Products | Nabil Pervez",
        description: "Discover innovative SaaS and digital tools built for productivity and impact.",
        url: "https://nabilpervez.com/products",
    },
};

export default function ProductsPage() {
    return <ProductsContent />;
}
