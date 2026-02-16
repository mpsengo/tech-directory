import Link from "next/link";

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid rgba(55, 65, 81, 0.4)",
                padding: "40px 24px",
                marginTop: 80,
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 16,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: 14,
                            color: "white",
                        }}
                    >
                        X
                    </div>
                    <span style={{ fontSize: 14, color: "#6b7280" }}>
                        xTekMart — Future Tech Directory
                    </span>
                </div>
                <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#6b7280" }}>
                    <Link href="/companies" style={{ color: "inherit", textDecoration: "none" }}>
                        Companies
                    </Link>
                    <Link href="/products" style={{ color: "inherit", textDecoration: "none" }}>
                        Products
                    </Link>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}
