"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewCompanyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        website: "",
        logo_url: "",
        industry: "",
        founded_year: "",
    });

    const industries = [
        "Artificial Intelligence",
        "Cloud Computing",
        "Cybersecurity",
        "Data Analytics",
        "E-Commerce",
        "FinTech",
        "HealthTech",
        "IoT",
        "SaaS",
        "Semiconductors",
        "Social Media",
        "Telecommunications",
        "Other",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setToast({ type: "error", message: "Company name is required" });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("companies").insert({
                name: form.name.trim(),
                description: form.description.trim(),
                website: form.website.trim(),
                logo_url: form.logo_url.trim(),
                industry: form.industry,
                founded_year: form.founded_year ? parseInt(form.founded_year) : null,
            });

            if (error) throw error;

            setToast({ type: "success", message: "Company added successfully!" });
            setTimeout(() => {
                router.push("/companies");
                router.refresh();
            }, 1000);
        } catch {
            setToast({ type: "error", message: "Failed to add company. Please try again." });
            setTimeout(() => setToast(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
            <div className="fade-in">
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
                    Add <span className="gradient-text">Company</span>
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
                    Add a new technology company to the directory
                </p>

                <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Name */}
                        <div>
                            <label className="label" htmlFor="name">Company Name *</label>
                            <input
                                id="name"
                                className="input-field"
                                type="text"
                                placeholder="e.g. Google"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* Industry */}
                        <div>
                            <label className="label" htmlFor="industry">Industry</label>
                            <select
                                id="industry"
                                className="input-field"
                                value={form.industry}
                                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                            >
                                <option value="">Select industry...</option>
                                {industries.map((ind) => (
                                    <option key={ind} value={ind}>{ind}</option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="input-field"
                                placeholder="Brief description of the company..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={4}
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="label" htmlFor="website">Website URL</label>
                            <input
                                id="website"
                                className="input-field"
                                type="url"
                                placeholder="https://example.com"
                                value={form.website}
                                onChange={(e) => setForm({ ...form, website: e.target.value })}
                            />
                        </div>

                        {/* Logo URL */}
                        <div>
                            <label className="label" htmlFor="logo_url">Logo URL</label>
                            <input
                                id="logo_url"
                                className="input-field"
                                type="url"
                                placeholder="https://example.com/logo.png"
                                value={form.logo_url}
                                onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                            />
                        </div>

                        {/* Founded Year */}
                        <div>
                            <label className="label" htmlFor="founded_year">Founded Year</label>
                            <input
                                id="founded_year"
                                className="input-field"
                                type="number"
                                placeholder="e.g. 1998"
                                min="1900"
                                max={new Date().getFullYear()}
                                value={form.founded_year}
                                onChange={(e) => setForm({ ...form, founded_year: e.target.value })}
                            />
                        </div>

                        {/* Logo Preview */}
                        {form.logo_url && (
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span className="label" style={{ marginBottom: 0 }}>Preview:</span>
                                <img
                                    src={form.logo_url}
                                    alt="Logo preview"
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 10,
                                        objectFit: "cover",
                                        border: "1px solid rgba(55,65,81,0.5)",
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
                            {loading ? "Adding..." : "Add Company"}
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
