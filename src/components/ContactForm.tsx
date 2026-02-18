"use client";

import { useState } from "react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to send message");
            }

            setToast({ type: "success", message: "Message sent! We'll get back to you soon." });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to send message. Please try again.";
            setToast({ type: "error", message: errorMessage });
            setTimeout(() => setToast(null), 5000);
        } finally {
            setLoading(false);
            setForm({ name: "", email: "", subject: "", message: "" });
        }
    };

    return (
        <div className="fade-in">
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Name */}
                    <div>
                        <label className="label" htmlFor="name">Your Name *</label>
                        <input
                            id="name"
                            className="input-field"
                            type="text"
                            placeholder="e.g. John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label" htmlFor="email">Email Address *</label>
                        <input
                            id="email"
                            className="input-field"
                            type="email"
                            placeholder="e.g. john@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="label" htmlFor="subject">Subject *</label>
                        <input
                            id="subject"
                            className="input-field"
                            type="text"
                            placeholder="e.g. Engineering inquiry"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            required
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="label" htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            className="input-field"
                            placeholder="How can we help you?"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            rows={5}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ width: "100%", marginTop: 8, fontSize: 15, opacity: loading ? 0.6 : 1 }}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </form>

            {/* Toast */}
            {toast && (
                <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
