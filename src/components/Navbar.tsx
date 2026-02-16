"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const links = [
        { label: "Home", href: "/" },
        { label: "Companies", href: "/companies" },
        { label: "Products", href: "/products" },
    ];

    return (
        <nav
            style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                position: "sticky",
                top: 0,
                zIndex: 50,
                backgroundColor: "rgba(3, 7, 18, 0.8)",
                backdropFilter: "blur(12px)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 24px",
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: 18,
                            color: "white",
                        }}
                    >
                        X
                    </div>
                    <span
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        xTek<span className="gradient-text">Mart</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                    className="nav-desktop"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                padding: "8px 16px",
                                borderRadius: 8,
                                fontSize: 14,
                                fontWeight: 500,
                                textDecoration: "none",
                                color:
                                    pathname === link.href
                                        ? "#818cf8"
                                        : "#9ca3af",
                                background:
                                    pathname === link.href
                                        ? "rgba(99, 102, 241, 0.1)"
                                        : "transparent",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ width: 1, height: 24, background: "#374151", margin: "0 8px" }} />

                    {session ? (
                        <>
                            <Link href="/companies/new" className="btn-primary" style={{ fontSize: 14, padding: "8px 18px", textDecoration: "none" }}>
                                + Add Company
                            </Link>
                            <Link href="/products/new" className="btn-secondary" style={{ fontSize: 14, padding: "8px 18px", textDecoration: "none" }}>
                                + Add Product
                            </Link>
                            <Link href="/admin" className="btn-secondary" style={{ fontSize: 14, padding: "8px 18px", textDecoration: "none", marginLeft: 4 }}>
                                Admin
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="btn-secondary"
                                style={{ fontSize: 14, padding: "8px 18px", marginLeft: 8 }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="btn-primary" style={{ fontSize: 14, padding: "8px 18px", textDecoration: "none" }}>
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="nav-mobile-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {isOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className="glass-card"
                    style={{
                        position: "absolute",
                        top: 70,
                        left: 0,
                        right: 0,
                        padding: 24,
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: 16,
                                fontWeight: 500,
                                textDecoration: "none",
                                color: pathname === link.href ? "#818cf8" : "#d1d5db",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ height: 1, background: "#374151", margin: "8px 0" }} />

                    {session ? (
                        <>
                            <Link
                                href="/companies/new"
                                onClick={() => setIsOpen(false)}
                                className="btn-primary"
                                style={{ textAlign: "center", textDecoration: "none" }}
                            >
                                + Add Company
                            </Link>
                            <Link
                                href="/products/new"
                                onClick={() => setIsOpen(false)}
                                className="btn-secondary"
                                style={{ textAlign: "center", textDecoration: "none" }}
                            >
                                + Add Product
                            </Link>
                            <button
                                onClick={() => {
                                    handleSignOut();
                                    setIsOpen(false);
                                }}
                                className="btn-secondary"
                                style={{ width: "100%" }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="btn-primary"
                            style={{ textAlign: "center", textDecoration: "none" }}
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
