"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/lib/types";

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [query, setQuery] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.company?.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <SearchBar onSearch={setQuery} placeholder="Search products, categories..." />
            </div>

            <div
                className="grid-container"
            >
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
                    No products found matching "{query}"
                </div>
            )}
        </div>
    );
}
