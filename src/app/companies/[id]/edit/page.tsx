"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditCompanyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const { data, error } = await supabase
                    .from("companies")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;

                setForm({
                    name: data.name,
                    description: data.description || "",
                    website: data.website || "",
                    logo_url: data.logo_url || "",
                    industry: data.industry || "",
                    founded_year: data.founded_year?.toString() || "",
                });
            } catch (err) {
                console.error("Error fetching company:", err);
                setToast({ type: "error", message: "Failed to load company data" });
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCompany();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setToast({ type: "error", message: "Company name is required" });
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase
                .from("companies")
                .update({
                    name: form.name.trim(),
                    description: form.description.trim(),
                    website: form.website.trim(),
                    logo_url: form.logo_url.trim(),
                    industry: form.industry,
                    founded_year: form.founded_year ? parseInt(form.founded_year) : null,
                })
                .eq("id", id);

            if (error) throw error;

            setToast({ type: "success", message: "Company updated successfully!" });
            setTimeout(() => {
                router.push(`/companies/${id}`);
                router.refresh();
            }, 1000);
        } catch {
            setToast({ type: "error", message: "Failed to update company. Please try again." });
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
                    Edit <span className="gradient-text">Company</span>
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
                    Update details for {form.name}
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
