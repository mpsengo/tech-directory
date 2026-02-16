export interface Company {
    id: string;
    name: string;
    description: string;
    website: string;
    logo_url: string;
    industry: string;
    founded_year: number | null;
    created_at: string;
}

export interface Product {
    id: string;
    company_id: string;
    name: string;
    description: string;
    category: string;
    link: string;
    image_url: string;
    created_at: string;
    company?: Company;
}
