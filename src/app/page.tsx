import { supabase } from "@/lib/supabase";
import { Company, Product } from "@/lib/types";
import CompanyCard from "@/components/CompanyCard";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCompanies(): Promise<Company[]> {
  const { data } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);
  return data || [];
}

async function getProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*, company:companies(*)")
    .order("created_at", { ascending: false })
    .limit(6);
  return (data || []).map((p) => ({ ...p, company: p.company || undefined }));
}

export default async function HomePage() {
  const [sessionData, companies, products] = await Promise.all([
    supabase.auth.getSession(),
    getCompanies(),
    getProducts()
  ]);
  const session = sessionData.data.session;

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 24px 60px",
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div className="fade-in">
          <span className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>
            ⚡ Discover & Manage Tech Companies
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            The Ultimate{" "}
            <span className="gradient-text">xTekMart</span>
            <br />
            Product Directory
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#9ca3af",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 32px",
            }}
          >
            Explore innovative tech companies and their cutting-edge products.
            {session && " Add new entries and build the definitive tech catalog."}
          </p>
          {session && (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/companies/new" className="btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "14px 28px" }}>
                + Add Company
              </Link>
              <Link href="/products/new" className="btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "14px 28px" }}>
                + Add Product
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 60px",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Companies", value: companies.length },
          { label: "Products", value: products.length },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 800 }} className="gradient-text">
              {stat.value}+
            </div>
            <div style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Companies Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>
            Latest <span className="gradient-text">Companies</span>
          </h2>
          <Link href="/companies" style={{ color: "#818cf8", fontSize: 14, textDecoration: "none" }}>
            View all →
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
            <p style={{ color: "#6b7280", fontSize: 15 }}>No companies yet.</p>
            {session && (
              <Link href="/companies/new" className="btn-primary" style={{ marginTop: 16, textDecoration: "none", fontSize: 14 }}>
                Add Your First Company
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Products Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>
            Latest <span className="gradient-text">Products</span>
          </h2>
          <Link href="/products" style={{ color: "#818cf8", fontSize: 14, textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        {products.length > 0 ? (
          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <p style={{ color: "#6b7280", fontSize: 15 }}>No products yet.</p>
            {session && (
              <Link href="/products/new" className="btn-primary" style={{ marginTop: 16, textDecoration: "none", fontSize: 14 }}>
                Add Your First Product
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
