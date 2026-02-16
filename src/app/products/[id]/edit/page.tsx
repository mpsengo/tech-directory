"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Company } from "@/lib/types";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const [form, setForm] = useState({
        name: "",
        company_id: "",
        description: "",
        category: "",
        link: "",
        image_url: "",
    });

    const categories = [
        "AI / Machine Learning",
        "Analytics",
        "API",
        "Automation",
        "Cloud Infrastructure",
        "Collaboration",
        "Communication",
        "Database",
        "Developer Tools",
        "Hardware",
        "Mobile App",
        "Platform",
        "Security",
        "Software",
        "Web Application",
        "Other",
    ];

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push("/login");
        });

        const fetchData = async () => {
            try {
                // Fetch product
                const { data: product, error: productError } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (productError) throw productError;

                // Fetch companies for dropdown
                const { data: companiesData, error: companiesError } = await supabase
                    .from("companies")
                    .select("*")
                    .order("name", { ascending: true });

                if (companiesError) throw companiesError;

                setCompanies(companiesData || []);
                setForm({
                    name: product.name,
                    company_id: product.company_id,
                    description: product.description || "",
                    category: product.category || "",
                    link: product.link || "",
                    image_url: product.image_url || "",
                });
            } catch (err) {
                console.error("Error fetching data:", err);
                setToast({ type: "error", message: "Failed to load product data" });
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setToast({ type: "error", message: "Product name is required" });
            return;
        }
        if (!form.company_id) {
            setToast({ type: "error", message: "Please select a company" });
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase
                .from("products")
                .update({
                    name: form.name.trim(),
                    company_id: form.company_id,
                    description: form.description.trim(),
                    category: form.category,
                    link: form.link.trim(),
                    image_url: form.image_url.trim(),
                })
                .eq("id", id);

            if (error) throw error;

            setToast({ type: "success", message: "Product updated successfully!" });
            setTimeout(() => {
                router.push(`/products/${id}`);
                router.refresh();
            }, 1000);
        } catch {
            setToast({ type: "error", message: "Failed to update product. Please try again." });
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
            <div className="fade-in">
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
                    Edit <span className="gradient-text">Product</span>
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
                    Update details for {form.name}
                </p>

                <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Product Name */}
                        <div>
                            <label className="label" htmlFor="name">Product Name *</label>
                            <input
                                id="name"
                                className="input-field"
                                type="text"
                                placeholder="e.g. Google Search"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="label" htmlFor="company_id">Company *</label>
                            <select
                                id="company_id"
                                className="input-field"
                                value={form.company_id}
                                onChange={(e) => setForm({ ...form, company_id: e.target.value })}
                                required
                            >
                                <option value="">Select a company...</option>
                                {companies.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="label" htmlFor="category">Category</label>
                            <select
                                id="category"
                                className="input-field"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            >
                                <option value="">Select category...</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="input-field"
                                placeholder="Brief description of the product..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={4}
                            />
                        </div>

                        {/* Link */}
                        <div>
                            <label className="label" htmlFor="link">Product Link</label>
                            <input
                                id="link"
                                className="input-field"
                                type="url"
                                placeholder="https://product.example.com"
                                value={form.link}
                                onChange={(e) => setForm({ ...form, link: e.target.value })}
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="label" htmlFor="image_url">Image URL</label>
                            <input
                                id="image_url"
                                className="input-field"
                                type="url"
                                placeholder="https://example.com/product-image.png"
                                value={form.image_url}
                                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                            />
                        </div>

                        {/* Image Preview */}
                        {form.image_url && (
                            <div>
                                <span className="label">Preview:</span>
                                <img
                                    src={form.image_url}
                                    alt="Product preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: 200,
                                        borderRadius: 12,
                                        objectFit: "cover",
                                        border: "1px solid rgba(55,65,81,0.5)",
                                        marginTop: 4,
                                    }}
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => router.back()}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={saving}
                                style={{ flex: 1, opacity: saving ? 0.6 : 1 }}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
