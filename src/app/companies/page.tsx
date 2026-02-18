import Link from "next/link";
import { supabase } from "@/lib/supabase";
import CompanyGrid from "@/components/CompanyGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CompaniesPage() {
    const [sessionData, companiesData] = await Promise.all([
        supabase.auth.getSession(),
        supabase.from("companies").select("*").order("name")
    ]);

    const session = sessionData.data.session;
    const companies = companiesData.data;

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >
                <div>
                    <h1 className="hero-title" style={{ fontSize: 36, marginBottom: 8 }}>
                        Discover <span className="gradient-text">Companies</span>
                    </h1>
                    <p style={{ color: "#9ca3af" }}>
                        Explore the innovative tech companies in our directory.
                    </p>
                </div>
                {session && (
                    <Link href="/companies/new" className="btn-primary" style={{ textDecoration: "none" }}>
                        + Add Company
                    </Link>
                )}
            </div>

            <CompanyGrid companies={companies || []} />
        </div>
    );
}
