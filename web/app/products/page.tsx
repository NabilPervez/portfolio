
import ProductsContent from "@/components/products/ProductsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Explore my collection of SaaS products, digital tools, and applications.",
    openGraph: {
        title: "Products | Nabil Pervez",
        description: "Discover innovative SaaS and digital tools built for productivity and impact.",
        url: "https://nabilpervez.com/products",
    },
};

export default function ProductsPage() {
    return <ProductsContent />;
}
