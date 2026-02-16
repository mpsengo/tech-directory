import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 0;

export const metadata = {
    title: "Products — TechVault",
    description: "Browse all technology products in the TechVault directory.",
};

async function getProducts(): Promise<Product[]> {
    const { data } = await supabase
        .from("products")
        .select("*, company:companies(*)")
        .order("created_at", { ascending: false });
    return (data || []).map((p) => ({ ...p, company: p.company || undefined }));
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
                        <span className="gradient-text">Products</span>
                    </h1>
                    <p style={{ color: "#6b7280", fontSize: 15, marginTop: 6 }}>
                        Browse all technology products in the directory
                    </p>
                </div>
                <Link href="/products/new" className="btn-primary" style={{ textDecoration: "none", fontSize: 14 }}>
                    + Add Product
                </Link>
            </div>

            {products.length > 0 ? (
                <div
                    className="stagger-children"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 20,
                    }}
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="glass-card empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <p style={{ color: "#6b7280", fontSize: 16, marginTop: 12 }}>No products found</p>
                    <p style={{ color: "#4b5563", fontSize: 14 }}>Be the first to add a product!</p>
                    <Link href="/products/new" className="btn-primary" style={{ marginTop: 20, textDecoration: "none", fontSize: 14 }}>
                        + Add Product
                    </Link>
                </div>
            )}
        </div>
    );
}
