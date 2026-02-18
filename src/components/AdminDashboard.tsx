"use client";

import { useState } from "react";
import Link from "next/link";
import { Company, Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AdminDashboardProps {
    initialCompanies: Company[];
    initialProducts: Product[];
}

export default function AdminDashboard({ initialCompanies, initialProducts }: AdminDashboardProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"companies" | "products">("companies");
    const [companies, setCompanies] = useState(initialCompanies);
    const [products, setProducts] = useState(initialProducts);

    const handleDeleteCompany = async (id: string) => {
        if (!window.confirm("Are you sure? This will delete the company and ALL its products.")) return;
        try {
            const { error } = await supabase.from("companies").delete().eq("id", id);
            if (error) throw error;
            setCompanies(companies.filter(c => c.id !== id));
            // Also remove products associated with this company from local state if needed
            setProducts(products.filter(p => p.company_id !== id));
        } catch (err: unknown) {
            alert("Error deleting company: " + (err instanceof Error ? err.message : "Unknown error"));
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const { error } = await supabase.from("products").delete().eq("id", id);
            if (error) throw error;
            setProducts(products.filter(p => p.id !== id));
        } catch (err: unknown) {
            alert("Error deleting product: " + (err instanceof Error ? err.message : "Unknown error"));
        }
    };

    return (
        <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <h1 className="hero-title" style={{ fontSize: 32, marginBottom: 24 }}>
                Admin <span className="gradient-text">Dashboard</span>
            </h1>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 40 }}>
                <div className="glass-card" style={{ padding: 24, textAlign: "center" }}>
                    <h3 style={{ fontSize: 14, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Companies</h3>
                    <p style={{ fontSize: 36, fontWeight: 800, color: "white", marginTop: 8 }}>{companies.length}</p>
                </div>
                <div className="glass-card" style={{ padding: 24, textAlign: "center" }}>
                    <h3 style={{ fontSize: 14, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Products</h3>
                    <p style={{ fontSize: 36, fontWeight: 800, color: "white", marginTop: 8 }}>{products.length}</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 16, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <button
                    onClick={() => setActiveTab("companies")}
                    style={{
                        background: "none",
                        border: "none",
                        padding: "12px 24px",
                        color: activeTab === "companies" ? "#818cf8" : "#9ca3af",
                        borderBottom: activeTab === "companies" ? "2px solid #818cf8" : "2px solid transparent",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 16
                    }}
                >
                    Companies
                </button>
                <button
                    onClick={() => setActiveTab("products")}
                    style={{
                        background: "none",
                        border: "none",
                        padding: "12px 24px",
                        color: activeTab === "products" ? "#818cf8" : "#9ca3af",
                        borderBottom: activeTab === "products" ? "2px solid #818cf8" : "2px solid transparent",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 16
                    }}
                >
                    Products
                </button>
            </div>

            {/* Table Content */}
            <div className="glass-card" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", color: "#d1d5db", fontSize: 14 }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontWeight: 600 }}>Name</th>
                            <th style={{ padding: "16px 24px", fontWeight: 600 }}>{activeTab === "companies" ? "Industry" : "Category"}</th>
                            <th style={{ padding: "16px 24px", fontWeight: 600, textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeTab === "companies" ? (
                            companies.map(company => (
                                <tr key={company.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td style={{ padding: "16px 24px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            {company.logo_url && <img src={company.logo_url} alt={company.name} style={{ width: 24, height: 24, borderRadius: 4, objectFit: "cover" }} />}
                                            <span style={{ fontWeight: 500, color: "white" }}>{company.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 24px" }}>{company.industry}</td>
                                    <td style={{ padding: "16px 24px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <Link href={`/companies/${company.id}/edit`} className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12, textDecoration: "none" }}>Edit</Link>
                                        <button onClick={() => handleDeleteCompany(company.id)} className="btn-primary" style={{ padding: "6px 12px", fontSize: 12, background: "rgba(239, 68, 68, 0.2)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            products.map(product => (
                                <tr key={product.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td style={{ padding: "16px 24px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            {product.image_url && <img src={product.image_url} alt={product.name} style={{ width: 24, height: 24, borderRadius: 4, objectFit: "cover" }} />}
                                            <span style={{ fontWeight: 500, color: "white" }}>{product.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 24px" }}>{product.category}</td>
                                    <td style={{ padding: "16px 24px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <Link href={`/products/${product.id}/edit`} className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12, textDecoration: "none" }}>Edit</Link>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="btn-primary" style={{ padding: "6px 12px", fontSize: 12, background: "rgba(239, 68, 68, 0.2)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {activeTab === "companies" && companies.length === 0 && (
                            <tr><td colSpan={3} style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>No companies found.</td></tr>
                        )}
                        {activeTab === "products" && products.length === 0 && (
                            <tr><td colSpan={3} style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>No products found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
