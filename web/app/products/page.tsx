
import { pageMeta } from "@/lib/seo";
import ProductsContent from "@/components/products/ProductsContent";
import { Metadata } from "next";

export const metadata: Metadata = pageMeta("/products", "Products", "Apps and games built and shipped by Nabil Pervez: Halal Passport, Lift More, Chess Roguelite, Pile Up Poker, Iqra, Noor and more.");

export default function ProductsPage() {
    return <ProductsContent />;
}
