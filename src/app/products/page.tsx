import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 0;

export default async function ProductsPage() {
    const { data: products } = await supabase
        .from("products")
        .select("*, companies(name, logo_url)")
        .order("name");

    // Transform data to match Product type if needed, or rely on Supabase return type compatibility
    // In this case, we pass it directly, assuming ProductGrid handles the structure.
    // We need to cast or ensure the type matches. 
    // For simplicity here, we assume the join return is compatible with our Product type's optional company field.

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >
                <div>
                    <h1 className="hero-title" style={{ fontSize: 36, marginBottom: 8 }}>
                        Explore <span className="gradient-text">Products</span>
                    </h1>
                    <p style={{ color: "#9ca3af" }}>
                        Find the best tools and software for your needs.
                    </p>
                </div>
                <Link href="/products/new" className="btn-primary" style={{ textDecoration: "none" }}>
                    + Add Product
                </Link>
            </div>

            <ProductGrid products={products as any || []} />
        </div>
    );
}
