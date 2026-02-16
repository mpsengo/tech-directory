import { supabase } from "@/lib/supabase";
import { Company, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getCompany(id: string): Promise<Company | null> {
    const { data } = await supabase.from("companies").select("*").eq("id", id).single();
    return data;
}

async function getCompanyProducts(companyId: string): Promise<Product[]> {
    const { data } = await supabase
        .from("products")
        .select("*, company:companies(*)")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false });
    return (data || []).map((p) => ({ ...p, company: p.company || undefined }));
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const company = await getCompany(id);

    if (!company) return notFound();

    const products = await getCompanyProducts(id);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            {/* Back link */}
            <Link
                href="/companies"
                style={{ color: "#818cf8", fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}
            >
                ← Back to Companies
            </Link>

            {/* Company Header */}
            <div className="glass-card fade-in" style={{ padding: 32, marginBottom: 40 }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                    {/* Logo */}
                    {company.logo_url ? (
                        <img
                            src={company.logo_url}
                            alt={company.name}
                            style={{ width: 72, height: 72, borderRadius: 16, objectFit: "cover", border: "1px solid rgba(55,65,81,0.5)" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: 16,
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 28,
                                fontWeight: 800,
                                color: "white",
                                flexShrink: 0,
                            }}
                        >
                            {company.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>
                                {company.name}
                            </h1>
                            {company.industry && <span className="badge">{company.industry}</span>}
                            {company.founded_year && (
                                <span style={{ fontSize: 13, color: "#6b7280" }}>
                                    Est. {company.founded_year}
                                </span>
                            )}
                        </div>

                        {company.description && (
                            <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7, marginBottom: 16 }}>
                                {company.description}
                            </p>
                        )}

                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    color: "#818cf8",
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                {company.website.replace(/^https?:\/\//, "")}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>
                    Products <span style={{ color: "#6b7280", fontWeight: 400 }}>({products.length})</span>
                </h2>
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
                    <p style={{ color: "#6b7280", fontSize: 15, marginTop: 12 }}>No products yet</p>
                    <Link href="/products/new" className="btn-primary" style={{ marginTop: 16, textDecoration: "none", fontSize: 14 }}>
                        + Add Product for {company.name}
                    </Link>
                </div>
            )}
        </div>
    );
}
