"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { supabase } from "@/lib/supabase";
import { Company } from "@/lib/types";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);
    const [customCategory, setCustomCategory] = useState("");

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
            if (!session) router.push("/login"); // Redirect to login if no session
        });

        const fetchCompanies = async () => {
            const { data } = await supabase
                .from("companies")
                .select("*")
                .order("name", { ascending: true });
            setCompanies(data || []);
        };
        fetchCompanies();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setToast({ type: "error", message: "Product name is required" });
            setTimeout(() => setToast(null), 3000);
            return;
        }
        if (!form.company_id) {
            setToast({ type: "error", message: "Please select a company" });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        const finalCategory = form.category === "Other" ? customCategory.trim() : form.category;

        if (form.category === "Other" && !finalCategory) {
            setToast({ type: "error", message: "Please specify the custom category" });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("products").insert({
                name: form.name.trim(),
                company_id: form.company_id,
                description: form.description.trim(),
                category: finalCategory,
                link: form.link.trim(),
                image_url: form.image_url.trim(),
            });

            if (error) throw error;

            setToast({ type: "success", message: "Product added successfully!" });
            setTimeout(() => {
                router.push("/products");
                router.refresh();
            }, 1000);
        } catch {
            setToast({ type: "error", message: "Failed to add product. Please try again." });
            setTimeout(() => setToast(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
            <div className="fade-in">
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
                    Add <span className="gradient-text">Product</span>
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
                    Add a new tech product to the directory
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
                            {companies.length === 0 && (
                                <p style={{ fontSize: 13, color: "#f59e0b", marginTop: 6 }}>
                                    No companies found. <a href="/companies/new" style={{ color: "#818cf8" }}>Add a company first</a>.
                                </p>
                            )}
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
                            <ImageUpload
                                label="Product Image"
                                value={form.image_url}
                                onChange={(url) => setForm({ ...form, image_url: url })}
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

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ width: "100%", marginTop: 8, fontSize: 15, opacity: loading ? 0.6 : 1 }}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
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
