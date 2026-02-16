import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="glass-card" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Image */}
                {product.image_url ? (
                    <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden" }}>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            width: "100%",
                            paddingTop: "56.25%",
                            position: "relative",
                            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                            }}
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600 }}>{product.name}</h3>
                        {product.category && (
                            <span className="badge badge-accent" style={{ flexShrink: 0 }}>
                                {product.category}
                            </span>
                        )}
                    </div>

                    {product.description && (
                        <p
                            style={{
                                fontSize: 14,
                                color: "#9ca3af",
                                lineHeight: 1.6,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                flex: 1,
                            }}
                        >
                            {product.description}
                        </p>
                    )}

                    {product.company && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 13,
                                color: "#6b7280",
                                marginTop: "auto",
                                paddingTop: 8,
                                borderTop: "1px solid rgba(55,65,81,0.4)",
                            }}
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 6,
                                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "white",
                                    flexShrink: 0,
                                }}
                            >
                                {product.company.name.charAt(0)}
                            </div>
                            {product.company.name}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
