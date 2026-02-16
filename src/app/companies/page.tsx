import { supabase } from "@/lib/supabase";
import { Company } from "@/lib/types";
import CompanyCard from "@/components/CompanyCard";
import Link from "next/link";

export const revalidate = 0;

export const metadata = {
    title: "Companies — TechVault",
    description: "Browse all technology companies in the TechVault directory.",
};

async function getCompanies(): Promise<Company[]> {
    const { data } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });
    return data || [];
}

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
                        <span className="gradient-text">Companies</span>
                    </h1>
                    <p style={{ color: "#6b7280", fontSize: 15, marginTop: 6 }}>
                        Browse all technology companies in the directory
                    </p>
                </div>
                <Link href="/companies/new" className="btn-primary" style={{ textDecoration: "none", fontSize: 14 }}>
                    + Add Company
                </Link>
            </div>

            {companies.length > 0 ? (
                <div
                    className="stagger-children"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                        gap: 20,
                    }}
                >
                    {companies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                    ))}
                </div>
            ) : (
                <div className="glass-card empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <p style={{ color: "#6b7280", fontSize: 16, marginTop: 12 }}>No companies found</p>
                    <p style={{ color: "#4b5563", fontSize: 14 }}>Be the first to add a company!</p>
                    <Link href="/companies/new" className="btn-primary" style={{ marginTop: 20, textDecoration: "none", fontSize: 14 }}>
                        + Add Company
                    </Link>
                </div>
            )}
        </div>
    );
}
