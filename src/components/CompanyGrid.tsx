"use client";

import { useState } from "react";
import CompanyCard from "@/components/CompanyCard";
import SearchBar from "@/components/SearchBar";
import { Company } from "@/lib/types";

interface CompanyGridProps {
    companies: Company[];
}

export default function CompanyGrid({ companies }: CompanyGridProps) {
    const [query, setQuery] = useState("");

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.industry?.toLowerCase().includes(query.toLowerCase()) ||
        company.description?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <SearchBar onSearch={setQuery} placeholder="Search companies, industries..." />
            </div>

            <div
                className="grid-container"
            >
                {filteredCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>

            {filteredCompanies.length === 0 && (
                <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
                    No companies found matching "{query}"
                </div>
            )}
        </div>
    );
}
