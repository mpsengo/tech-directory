"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setToast(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setToast({ type: "success", message: "Check your email for the confirmation link!" });
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/");
                router.refresh();
            }
        } catch (error: unknown) {
            setToast({ type: "error", message: (error instanceof Error ? error.message : "Authentication failed") });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "60px auto", padding: "0 24px" }}>
            <div className="glass-card fade-in" style={{ padding: 40 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", marginBottom: 32 }}>
                    {isSignUp ? "Join xTekMart today" : "Sign in to manage your listings"}
                </p>

                <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ marginTop: 8 }}
                    >
                        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                <div style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "#9ca3af" }}>
                    {isSignUp ? "Already have an account?" : "Don&apos;t have an account?"}{" "}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#818cf8",
                            cursor: "pointer",
                            fontWeight: 600,
                            padding: 0,
                        }}
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>

            {toast && (
                <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
