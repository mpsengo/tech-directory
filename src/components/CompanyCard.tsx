import Link from "next/link";
import { Company } from "@/lib/types";

export default function CompanyCard({ company }: { company: Company }) {
    return (
        <Link href={`/companies/${company.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="glass-card" style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {company.logo_url ? (
                        <img
                            src={company.logo_url}
                            alt={company.name}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                objectFit: "cover",
                                border: "1px solid rgba(55,65,81,0.5)",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "white",
                                flexShrink: 0,
                            }}
                        >
                            {company.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                        <h3
                            style={{
                                fontSize: 17,
                                fontWeight: 600,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {company.name}
                        </h3>
                        {company.industry && (
                            <span className="badge" style={{ marginTop: 4 }}>
                                {company.industry}
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                {company.description && (
                    <p
                        style={{
                            fontSize: 14,
                            color: "#9ca3af",
                            lineHeight: 1.6,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            flex: 1,
                        }}
                    >
                        {company.description}
                    </p>
                )}

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#6b7280" }}>
                    {company.website && (
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>
                            {company.website.replace(/^https?:\/\//, "")}
                        </span>
                    )}
                    {company.founded_year && <span>Est. {company.founded_year}</span>}
                </div>
            </div>
        </Link>
    );
}
