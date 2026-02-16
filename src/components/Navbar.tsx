"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/companies", label: "Companies" },
        { href: "/products", label: "Products" },
    ];

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(3, 7, 18, 0.8)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(55, 65, 81, 0.4)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 72,
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
                        T
                    </div>
                    <span
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Tech<span className="gradient-text">Vault</span>
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
                    <Link href="/companies/new" className="btn-primary" style={{ fontSize: 14, padding: "8px 18px", textDecoration: "none" }}>
                        + Add Company
                    </Link>
                    <Link href="/products/new" className="btn-secondary" style={{ fontSize: 14, padding: "8px 18px", textDecoration: "none" }}>
                        + Add Product
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="nav-mobile-btn"
                    style={{
                        display: "none",
                        background: "none",
                        border: "none",
                        color: "#9ca3af",
                        cursor: "pointer",
                        padding: 8,
                    }}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {menuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className="nav-mobile-menu"
                    style={{
                        padding: "12px 24px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        borderTop: "1px solid rgba(55,65,81,0.4)",
                    }}
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                padding: "10px 16px",
                                borderRadius: 8,
                                fontSize: 15,
                                fontWeight: 500,
                                textDecoration: "none",
                                color: pathname === link.href ? "#818cf8" : "#9ca3af",
                                background: pathname === link.href ? "rgba(99,102,241,0.1)" : "transparent",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <Link href="/companies/new" className="btn-primary" style={{ flex: 1, textAlign: "center", fontSize: 14, padding: "10px 18px", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                            + Company
                        </Link>
                        <Link href="/products/new" className="btn-secondary" style={{ flex: 1, textAlign: "center", fontSize: 14, padding: "10px 18px", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                            + Product
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
        </nav>
    );
}
