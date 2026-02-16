import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getProduct(id: string): Promise<Product | null> {
    const { data } = await supabase
        .from("products")
        .select("*, company:companies(*)")
        .eq("id", id)
        .single();
    if (!data) return null;
    return { ...data, company: data.company || undefined };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) return notFound();

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
            {/* Back link */}
            <Link
                href="/products"
                style={{ color: "#818cf8", fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}
            >
                ← Back to Products
            </Link>

            <div className="glass-card fade-in" style={{ overflow: "hidden" }}>
                {/* Image */}
                {product.image_url && (
                    <div style={{ width: "100%", maxHeight: 400, overflow: "hidden" }}>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                    </div>
                )}

                <div style={{ padding: 32 }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>
                                {product.name}
                            </h1>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {product.category && <span className="badge badge-accent">{product.category}</span>}
                            </div>
                        </div>

                        {product.link && (
                            <a
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{ textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0 }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                Visit Product
                            </a>
                        )}
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div style={{ marginBottom: 24 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#9ca3af" }}>About</h2>
                            <p style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.8 }}>
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* Company Info */}
                    {product.company && (
                        <div
                            style={{
                                borderTop: "1px solid rgba(55,65,81,0.4)",
                                paddingTop: 20,
                                marginTop: 20,
                            }}
                        >
                            <h2 style={{ fontSize: 14, fontWeight: 500, color: "#6b7280", marginBottom: 12 }}>MADE BY</h2>
                            <Link
                                href={`/companies/${product.company.id}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    textDecoration: "none",
                                    color: "inherit",
                                    padding: 16,
                                    borderRadius: 12,
                                    border: "1px solid rgba(55,65,81,0.4)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {product.company.logo_url ? (
                                    <img
                                        src={product.company.logo_url}
                                        alt={product.company.name}
                                        style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "white",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {product.company.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 600 }}>{product.company.name}</div>
                                    {product.company.industry && (
                                        <span style={{ fontSize: 13, color: "#6b7280" }}>{product.company.industry}</span>
                                    )}
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Meta */}
                    <div style={{ marginTop: 20, fontSize: 12, color: "#4b5563" }}>
                        Added: {new Date(product.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                </div>
            </div>
        </div>
    );
}
